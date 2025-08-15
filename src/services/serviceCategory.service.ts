import { Like, Raw } from "typeorm";
import { CreateServiceCategoryDto, QueryServiceCategoryDto, ResponseServiceCategoryDto, UpdateServiceCategoryDto } from "../dto/serviceCategory";
import { serviceCategoryRepo } from "../repositories/serviceCategory.repository";
import { toResponseServiceCategoryDto } from "../automapper/serviceCategory";
import { generateNormalized, generateSlug } from "../config/contant";


export const getAllServiceCategories = async (query: QueryServiceCategoryDto): Promise<ResponseServiceCategoryDto[]> => {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const where = {
      ...(query.search ? { 
        title_normalized: Raw(alias => `${alias} LIKE :search`, {
          search: `%${generateNormalized(query.search).toLowerCase()}%`
        }),
      } : {}),
    }
    

    const [serviceCategorys] = await serviceCategoryRepo.findAndCount({ 
        where,
        order: {
            [query.sortBy || 'created_at']: query.order || 'desc',
        },
        take: limit,
        skip
    });
    
    return serviceCategorys.map(toResponseServiceCategoryDto);
};

export const getServiceCategoryById = async (id: string): Promise<ResponseServiceCategoryDto | null> => {
  const serviceCategory = await serviceCategoryRepo.findOneBy({ id });
  return serviceCategory ? toResponseServiceCategoryDto(serviceCategory) : null;
};


export const createServiceCategory = async (dto: CreateServiceCategoryDto): Promise<ResponseServiceCategoryDto> => {
  const serviceCategory = serviceCategoryRepo.create({ ...dto });
  await serviceCategoryRepo.save(serviceCategory);
  return toResponseServiceCategoryDto(serviceCategory);
}

export const updateServiceCategory = async (id: string, dto: UpdateServiceCategoryDto): Promise<ResponseServiceCategoryDto | null> => {
  const serviceCategory = await serviceCategoryRepo.findOneBy({ id });
  if (!serviceCategory) return null;
  Object.assign(serviceCategory, dto);
  await serviceCategoryRepo.save(serviceCategory);
  return toResponseServiceCategoryDto(serviceCategory);
};

export const deleteServiceCategory = async (id: string): Promise<boolean> => {
  const result = await serviceCategoryRepo.delete({ id });
  return result.affected !== 0; // Trả về true nếu có bản ghi bị xóa
};