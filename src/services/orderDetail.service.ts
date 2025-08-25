import { Like } from "typeorm";
import { CreateOrderDetailDto, QueryOrderDetailDto, ResponseOrderDetailDto, UpdateOrderDetailDto } from "../dto/orderDetail.dto";
import { orderDetailRepo } from "../repositories/orderDetail.repository";
import { toResponseOrderDetailDto } from "../automapper/orderDetail.mapper";
import { generateSku, generateSlug } from "../config/contant";


export const getAllOrderDetails = async (query: QueryOrderDetailDto): Promise<ResponseOrderDetailDto[]> => {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const [orderDetails] = await orderDetailRepo.findAndCount({ 
        relations: ['product_variant'],
        order: {
            [query.sortBy || 'created_at']: query.order || 'desc',
        },
        take: limit,
        skip
    });
    return orderDetails.map(toResponseOrderDetailDto);
};

export const getOrderDetailById = async (id: string): Promise<ResponseOrderDetailDto | null> => {
  const orderDetail = await orderDetailRepo.findOne({ 
    where: { id },
    relations: ['product_variant'],
  });
  return orderDetail ? toResponseOrderDetailDto(orderDetail) : null;
};

export const createOrderDetail = async (dto: CreateOrderDetailDto): Promise<ResponseOrderDetailDto> => {
    const orderDetail = orderDetailRepo.create({ ...dto });
    await orderDetailRepo.save(orderDetail);
    return toResponseOrderDetailDto(orderDetail);
}

export const updateOrderDetail = async (id: string, dto: UpdateOrderDetailDto): Promise<ResponseOrderDetailDto | null> => {
  const orderDetail = await orderDetailRepo.findOneBy({ id });
  if (!orderDetail) return null;
  Object.assign(orderDetail, dto);
  await orderDetailRepo.save(orderDetail);
  return toResponseOrderDetailDto(orderDetail);
};

export const deleteOrderDetail = async (id: string): Promise<boolean> => {
  const result = await orderDetailRepo.delete({ id });
  return result.affected !== 0; // Trả về true nếu có bản ghi bị xóa
};
