import { customerRepo } from '../repositories/customer.repository';
import { CreateCustomerDto, QueryCustomerDto, ResponseCustomerDto, UpdateCustomerDto } from '../dto/customer.dto';
import bcrypt from 'bcryptjs';
import { toResponseCustomerDto } from '../automapper/customer.mapper';
import { Like } from 'typeorm';

export const getAllCustomers = async (query: QueryCustomerDto): Promise<ResponseCustomerDto[]> => {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const where = query.search ? [
        { email: Like(`%${query.search}%`) },
        { firstname: Like(`%${query.search}%`) },
        { lastname: Like(`%${query.search}%`) },
    ] : {};

    const [customers] = await customerRepo.findAndCount({ 
        where,
        relations: ['addresses', 'orders'],
        order: {
            [query.sortBy || 'created_at']: query.order || 'desc',
        },
        take: limit,
        skip
    });
    return customers.map(toResponseCustomerDto);
};

export const getCustomerByEmail = async (email: string): Promise<ResponseCustomerDto | null> => {
  const customer = await customerRepo.findOne({ 
    where: { email },
    relations: ['addresses', 'orders', 'orders.products', 'orders.products.product_variant'],
   });
  return customer ? toResponseCustomerDto(customer) : null;
};

export const getCustomerById = async (id: string): Promise<ResponseCustomerDto | null> => {
  const customer = await customerRepo.findOne({
    where: { id },
    relations: ['addresses', 'orders'],
  });
  return customer ? toResponseCustomerDto(customer) : null;
};

export const createCustomer = async (dto: CreateCustomerDto): Promise<ResponseCustomerDto> => {
  const password_hash = await bcrypt.hash(dto.password, 10);
  const customer = customerRepo.create({ ...dto, password_hash });
  await customerRepo.save(customer);
  return toResponseCustomerDto(customer);
}

export const updateCustomer = async (id: string, dto: UpdateCustomerDto): Promise<ResponseCustomerDto | null> => {
  const customer = await customerRepo.findOneBy({ id });
  if (!customer) return null;
  Object.assign(customer, dto);
  await customerRepo.save(customer);
  return toResponseCustomerDto(customer);
};

export const deleteCustomer = async (id: string): Promise<boolean> => {
  const result = await customerRepo.delete({ id });
  return result.affected !== 0; // Trả về true nếu có bản ghi bị xóa
};