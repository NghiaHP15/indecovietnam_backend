import { Like } from 'typeorm';
import { CreateAddressDto, QueryAddressDto, ResponseAddressDto, UpdateAddressDto } from '../dto/address.dto';
import { addressRepo } from '../repositories/address.repository';
import { toResponseAddressDto } from '../automapper/address.mapper';

export const getAllAddresses = async (query: QueryAddressDto): Promise<ResponseAddressDto[]> => {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const where = query.search ? [
        { receiver_name: Like(`%${query.search}%`) },
        { phone: Like(`%${query.phone}%`) },
    ] : {};

    const [addresses] = await addressRepo.findAndCount({ 
        where,
        relations: ['customer'],
        order: {
            [query.sortBy || 'created_at']: query.order || 'desc',
        },
        take: limit,
        skip
    });
    return addresses.map(toResponseAddressDto);
};

export const getAddressById = async (id: string): Promise<ResponseAddressDto | null> => {
  const address = await addressRepo.findOne({ 
    where: { id },
    relations: ['customer'],
  });
  return address ? toResponseAddressDto(address) : null;
};

export const CreateAddress = async (dto: CreateAddressDto): Promise<ResponseAddressDto> => {
  const address = addressRepo.create({ ...dto });
  await addressRepo.save(address);
  return toResponseAddressDto(address);
}

export const updateAddress = async (id: string, dto: UpdateAddressDto): Promise<ResponseAddressDto | null> => {
  const address = await addressRepo.findOne({ 
    where: { id },
    relations: ['customer'],
  });
  if (!address) return null;
  Object.assign(address, dto);
  await addressRepo.save(address);
  return toResponseAddressDto(address);
};

export const deleteAddress = async (id: string): Promise<boolean> => {
  const result = await addressRepo.delete({ id });
  return result.affected !== 0; // Trả về true nếu có bản ghi bị xóa
};