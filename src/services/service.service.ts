import { Like, Raw } from "typeorm";
import { CreateServiceDto, QueryServiceDto, ResponseServiceDto, UpdateServiceDto } from "../dto/Service.dto";
import { serviceRepo } from "../repositories/service.repository";
import { toResponseServiceDto } from "../automapper/service.mapper";
import { generateNormalized, generateSlug } from "../config/contant";

export const getAllServices = async (query: QueryServiceDto): Promise<ResponseServiceDto[]> => {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const where = {
      ...(query.search ? { 
        title_normalized: Raw(alias => `${alias} LIKE :search`, {
          search: `%${generateNormalized(query.search).toLowerCase()}%`
        }),
      } : {}),
    };

    const [services] = await serviceRepo.findAndCount({ 
        where,
        relations: ['category'],
        order: {
            [query.sortBy || 'created_at']: query.order || 'desc',
        },
        take: limit,
        skip
    });
    
    return services.map(toResponseServiceDto);
};

export const getServiceById = async (id: string): Promise<ResponseServiceDto | null> => {
  const service = await serviceRepo.findOne({ 
    where: { id },
    relations: ['category'],
  });
  return service ? toResponseServiceDto(service) : null;
};

export const getServiceBySlug = async (slug: string): Promise<ResponseServiceDto | null> => {
  const service = await serviceRepo.findOne({ 
    where: { slug },
    relations: ['category'],
  });
  return service ? toResponseServiceDto(service) : null;
};

export const createService = async (dto: CreateServiceDto): Promise<ResponseServiceDto> => {
  const service = serviceRepo.create({ ...dto });
  await serviceRepo.save(service);
  return toResponseServiceDto(service);
}

export const updateService = async (id: string, dto: UpdateServiceDto): Promise<ResponseServiceDto | null> => {
  const service = await serviceRepo.findOneBy({ id });
  if (!service) return null;
  Object.assign(service, dto);
  await serviceRepo.save(service);
  return toResponseServiceDto(service);
};

export const deleteService = async (id: string): Promise<boolean> => {
  const result = await serviceRepo.delete({ id });
  return result.affected !== 0; // Trả về true nếu có bản ghi bị xóa
};