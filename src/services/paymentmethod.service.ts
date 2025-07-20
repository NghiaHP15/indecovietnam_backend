import { Like } from "typeorm";
import { toResponsePaymentmethodDto } from "../automapper/paymentmethod.mapper";
import { CreatePaymentMethodDto, QueryPaymentMethodDto, ResponsePaymentMethodDto, UpdatePaymentMethodDto } from "../dto/paymentmethod.dto";
import { paymentMethodRepo } from "../repositories/paymentmethod.repository";



export const getAllPaymentMethods = async (query: QueryPaymentMethodDto): Promise<ResponsePaymentMethodDto[]> => {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;
    
    const where = query.search ? [
        { name: Like(`%${query.search}%`) },
    ] : {};
        
    const [paymentMethods] = await paymentMethodRepo.findAndCount({ 
        where,
        order: {
            [query.sortBy || 'created_at']: query.order || 'desc',
        },
        take: limit,
        skip
    });
    return paymentMethods.map(toResponsePaymentmethodDto);
};

export const getPaymentMethodById = async (id: string): Promise<ResponsePaymentMethodDto | null> => {
  const paymentMethod = await paymentMethodRepo.findOne({ 
    where: { id },
  });
  return paymentMethod ? toResponsePaymentmethodDto(paymentMethod) : null;
};

export const createPaymentMethod = async (dto: CreatePaymentMethodDto): Promise<ResponsePaymentMethodDto> => {
  const paymentMethod = paymentMethodRepo.create({ ...dto });
  await paymentMethodRepo.save(paymentMethod);
  return toResponsePaymentmethodDto(paymentMethod);
}

export const updatePaymentMethod = async (id: string, dto: UpdatePaymentMethodDto): Promise<ResponsePaymentMethodDto | null> => {
  const paymentMethod = await paymentMethodRepo.findOneBy({ id });
  if (!paymentMethod) return null;
  Object.assign(paymentMethod, dto);
  await paymentMethodRepo.save(paymentMethod);
  return toResponsePaymentmethodDto(paymentMethod);
};

export const deletePaymentMethod = async (id: string): Promise<boolean> => {
  const result = await paymentMethodRepo.delete({ id });
  return result.affected !== 0;
};