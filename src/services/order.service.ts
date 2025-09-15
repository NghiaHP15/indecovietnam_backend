import { LessThan, ILike } from "typeorm";
import { CreateOrderDto, QueryOrderDto, ResponseOrderDto, UpdateOrderDto } from "../dto/order.dto";
import { orderRepo } from "../repositories/order.repository";
import { toResponseOrderDto } from "../automapper/order.mapper";
import * as orderDetailService from "./orderDetail.service";
import * as productVariantService from "./productVariant.service";
import { addressRepo } from "../repositories/address.repository";
import { OrderStatus, PaymentMethod, PaymentStatus } from "../utils/enum";


export const getAllOrders = async (query: QueryOrderDto): Promise<ResponseOrderDto[]> => {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const where = {
      ...(query.search ? { txnRef: ILike(`%${query.search}%`) } : {}),
      ...(query.status ? { status: query.status } : {}),
      ...(query.customer ? { customer: { id: query.customer } } : {}),
    }

    const [orders] = await orderRepo.findAndCount({ 
        where,
        relations: ['customer', 'products', 'address', 'products.product_variant', 'products.product_variant.color'],
        order: {
            [query.sortBy || 'created_at']: query.order || 'desc',
        },
        take: limit,
        skip
    });
    return orders.map(toResponseOrderDto);
};

export const getOrderById = async (id: string): Promise<ResponseOrderDto | null> => {
  const order = await orderRepo.findOne({ 
    where: { id },
    relations: ['customer', 'products', 'address', 'products.product_variant', 'products.order'],
  });
  return order ? toResponseOrderDto(order) : null;
};

export const getOrderByTxnRef = async (txnRef: string): Promise<ResponseOrderDto | null> => {
  const order = await orderRepo.findOne({ 
    where: { txnRef },
    relations: ['customer', 'products', 'address', 'products.product_variant', 'products.order'],
  });
  
  return order ? toResponseOrderDto(order) : null;
};

export const createOrder = async (dto: CreateOrderDto): Promise<ResponseOrderDto> => {
    const allowed = await canCreateOrder(dto);
    if (!allowed) throw new Error('You can only have 3 pending orders at a time.');
    let resultAddress: any;
    
    dto.products = await Promise.all(
      dto.products.map(async (item) => {
        const variant = await productVariantService.getProductVariantById(item.product_variant.id);
        await productVariantService.reserve(item.product_variant.id, item.quantity);
        const total_price = Number(variant?.price ?? 0) * item.quantity;
        return { 
          ...item, 
          total_price, 
          product_variant: { id: item.product_variant.id } 
        };
      })
    );

    const address = await addressRepo.findOne({
      where: { customer: { id: dto.customer.id }, phone: dto.address?.phone }
    });
    
    if (!address) {
       resultAddress = await addressRepo.save(addressRepo.create({ ...dto.address, customer: { id: dto.customer.id } }));
    } else {
      Object.assign(address, dto.address);
      resultAddress = await addressRepo.save(address);
    }

    dto.total_amount = dto.products.reduce((sum, p) => sum + p.total_price, 0);
    dto.address.id =  resultAddress.id; 

    const order = await orderRepo.save(orderRepo.create({ ...dto }));

    await Promise.all(dto.products.map(detail =>
      orderDetailService.createOrderDetail({ ...detail, order: { id: order.id } })
    ));

    return toResponseOrderDto(order);
}

export const updateOrder = async (id: string, dto: UpdateOrderDto): Promise<ResponseOrderDto | null> => {
  const order = await orderRepo.findOne({ 
    where: { id },
    relations: ['customer', 'products', 'address', 'products.product_variant', 'products.order'],
  });
  if (!order) return null;
  // ==============================
  // ✅ Rule 1: Check PaymentStatus hợp lệ
  // ==============================
  if (order.payment_status === PaymentStatus.PAID &&
      [PaymentStatus.PENDING, PaymentStatus.FAILED, PaymentStatus.CANCELLED, PaymentStatus.AWAITTING_CONFIRMATION].includes(dto.payment_status)) {
    throw new Error("Không thể thay đổi payment_status từ PAID sang trạng thái khác.");
  }

  if ([PaymentStatus.CANCELLED, PaymentStatus.FAILED].includes(order.payment_status) &&
      dto.payment_status === PaymentStatus.PAID) {
    throw new Error("Không thể đổi payment_status từ CANCELLED/FAILED sang PAID.");
  }

  if (order.payment_status === PaymentStatus.AWAITTING_CONFIRMATION &&
      dto.payment_status === PaymentStatus.PENDING) {
    throw new Error("Không thể đổi payment_status từ AWAITING_CONFIRMATION sang PENDING.");
  }

  // ==============================
  // ✅ Rule 2: Check OrderStatus hợp lệ
  // ==============================
  if (order.status === OrderStatus.DELIVERED &&
      dto.status !== OrderStatus.DELIVERED) {
    throw new Error("Không thể thay đổi status từ DELIVERED sang trạng thái khác.");
  }

  if (order.status === OrderStatus.CANCELLED &&
      dto.status !== OrderStatus.CANCELLED) {
    throw new Error("Không thể thay đổi status từ CANCELLED sang trạng thái khác.");
  }

  // Transition hợp lệ theo flow
  const validOrderTransitions: Record<OrderStatus, OrderStatus[]> = {
    [OrderStatus.PENDING]: [OrderStatus.PENDING, OrderStatus.PROCESSING, OrderStatus.CANCELLED],
    [OrderStatus.PROCESSING]: [OrderStatus.PROCESSING, OrderStatus.SHIPPED, OrderStatus.CANCELLED],
    [OrderStatus.SHIPPED]: [OrderStatus.SHIPPED, OrderStatus.DELIVERED],
    [OrderStatus.DELIVERED]: [OrderStatus.DELIVERED],
    [OrderStatus.CANCELLED]: [OrderStatus.CANCELLED],
  };

  if (dto.status && !validOrderTransitions[order.status].includes(dto.status)) {
    throw new Error(`Không thể thay đổi order.status từ ${order.status} sang ${dto.status}.`);
  }

  // ==============================
  // ✅ Rule 3: Logic BANK confirm inventory
  // ==============================
  if (order.paymentmethod === PaymentMethod.BANK &&
      order.payment_status === PaymentStatus.AWAITTING_CONFIRMATION &&
      dto.payment_status === PaymentStatus.PAID) {
    await Promise.all(
      order.products.map(item => 
        productVariantService.confirm(item.product_variant.id, item.quantity)
      )
    );
  }

  // ==============================
  // ✅ Apply update nếu hợp lệ
  // ==============================
  Object.assign(order, dto);
  await orderRepo.save(order);
  return toResponseOrderDto(order);
};

export const cancelOrder = async (id: string): Promise<boolean> => {
  const order = await getOrderById(id);
  
  if (!order) return false;
  const isPendingUnpaid = order.status === OrderStatus.PENDING && [PaymentStatus.PENDING, PaymentStatus.FAILED].includes(order.payment_status);
  if(!isPendingUnpaid) {
    throw new Error("Cannot delete order that is not pending or has been paid.");
  }
  
  await Promise.all(
    order.products.map(item =>
      productVariantService.release(item.product_variant.id, item.quantity)
    )
  );
  order.status = OrderStatus.CANCELLED;
  order.payment_status = PaymentStatus.CANCELLED;
  
  await orderRepo.save(order);
  return true;
};

export const canCreateOrder = async (dto: CreateOrderDto): Promise<boolean> => {
  const count = await orderRepo.count({
    where: {
      customer: { id: dto.customer.id },
      status: OrderStatus.PENDING,
      payment_status: PaymentStatus.PENDING
    }
  })
  return count < 3;
}

export const getSearchOrders = async (query: any): Promise<ResponseOrderDto[]> => {
  const { page = 1, limit = 10, type, value, sortBy, order } = query;
  const skip = (page - 1) * limit;

  let where: any = {};

  if (type && value) {
    if (type === "email") {
      where = { customer: { email: value } };
    } else if (type === "phone") {
      where = { address: { phone: value } };
    }
  } else if (value) {
    // nếu không có type thì tìm theo email OR phone
    where = [
      { customer: { email: value } },
      { address: { phone: value } },
    ];
  }

  const [orders] = await orderRepo.findAndCount({
    where,
    relations: [
      "customer",
      "products",
      "address",
      "products.product_variant",
      "products.product_variant.color",
    ],
    order: {
      [sortBy || "created_at"]: order || "desc",
    },
    take: limit,
    skip,
  });

  return orders.map(toResponseOrderDto);
};

export const autoCancelOrders = async (): Promise<void> => {
  const orders = await orderRepo.find({
    where: {
      status: OrderStatus.PENDING,
      payment_status: PaymentStatus.PENDING,
      order_date: LessThan(new Date(Date.now() - 30 * 60 * 1000)) // 30 phút trước
    },
    relations: ['products', 'products.product_variant'],
  });

  for (const order of orders) {
    order.status = OrderStatus.CANCELLED;
    order.payment_status = PaymentStatus.CANCELLED;
    await orderRepo.save(order);
    
    // Trả lại hàng đã đặt
    await Promise.all(
      order.products.map(item =>
        productVariantService.release(item.product_variant.id, item.quantity)
      )
    );
  }
}