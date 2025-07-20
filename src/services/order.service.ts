import { Like } from "typeorm";
import { CreateOrderDto, QueryOrderDto, ResponseOrderDto, UpdateOrderDto } from "../dto/order.dto";
import { orderRepo } from "../repositories/order.repository";
import { toResponseOrderDto } from "../automapper/order.mapper";
import { generateSku, generateUUID } from "../config/contant";
import * as orderDetailService from "./orderDetail.service";


export const getAllOrders = async (query: QueryOrderDto): Promise<ResponseOrderDto[]> => {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const where = query.search ? [
        { code: Like(`%${query.search}%`) },
    ] : {};

    const [orders] = await orderRepo.findAndCount({ 
        where,
        relations: ['paymentmethod', 'customer', 'products', 'products.product_variant', 'products.order' ],
        order: {
            [query.sortBy || 'created_at']: query.order || 'desc',
        },
        take: limit,
        skip
    });
    orders.map((item: any) => console.log(item));
    return orders.map(toResponseOrderDto);
};

export const getOrderById = async (id: string): Promise<ResponseOrderDto | null> => {
  const order = await orderRepo.findOne({ 
    where: { id },
    relations: ['paymentmethod', 'customer', 'products', 'products.product_variant', 'products.order'],
  });
  return order ? toResponseOrderDto(order) : null;
};

export const createOrder = async (dto: CreateOrderDto): Promise<ResponseOrderDto> => {
    dto.id = generateUUID();
    dto.code = generateSku("Order", dto.customer.id);
    const order = orderRepo.create({ ...dto });
    await orderRepo.save(order);
    const detailPromises = dto.products.map(detail =>
      orderDetailService.createOrderDetail({ 
        ...detail,
        product_variant: { id: detail.product_variant.id }, 
        order: { id: order.id } })
    );
    await Promise.all(detailPromises);
    return toResponseOrderDto(order);
}

export const updateOrder = async (id: string, dto: UpdateOrderDto): Promise<ResponseOrderDto | null> => {
  const order = await orderRepo.findOneBy({ id });
  if (!order) return null;
  Object.assign(order, dto);
  await orderRepo.save(order);
  return toResponseOrderDto(order);
};

export const deleteOrder = async (id: string): Promise<boolean> => {
  const result = await orderRepo.delete({ id });
  return result.affected !== 0; // Trả về true nếu có bản ghi bị xóa
};
