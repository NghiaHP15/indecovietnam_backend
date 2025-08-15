import { Like, Raw } from 'typeorm';
import { productCategoryRepo } from '../repositories/productCategory.repository';
import { toResponseProductCategoryDto } from '../automapper/productCategory.mapper';
import { CreateProductCategoryDto, QueryProductCategoryDto, ResponseProductCategoryDto, UpdateProductCategoryDto } from '../dto/productCategory.dto';
import slugify from 'slugify';
import { generateNormalized } from '../config/contant';

export const getAllProductCategories = async (query: QueryProductCategoryDto): Promise<ResponseProductCategoryDto[]> => {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const where = {
      ...(query.search ? { 
        title_normalized: Raw(alias => `${alias} LIKE :search`, {
          search: `%${generateNormalized(query.search).toLowerCase()}%`
        }),
      } : {}),
    }

    const [productCategories] = await productCategoryRepo.findAndCount({ 
        where,
        relations: ['roomCategory'],
        order: {
            [query.sortBy || 'created_at']: query.order || 'desc',
        },
        take: limit,
        skip
    });
    return productCategories.map(toResponseProductCategoryDto);
};

export const getProductCategoryById = async (id: string): Promise<ResponseProductCategoryDto | null> => {
  const productCategory = await productCategoryRepo.findOne({ 
    where: { id },
    relations: ['roomCategory']
  });
  return productCategory ? toResponseProductCategoryDto(productCategory) : null;
};

export const CreateProductCategory = async (dto: CreateProductCategoryDto): Promise<ResponseProductCategoryDto> => {
  dto.slug = generateSlug(dto.title);
  const productCategory = productCategoryRepo.create({ ...dto });
  await productCategoryRepo.save(productCategory);
  return toResponseProductCategoryDto(productCategory);
}

export const updateProductCategory = async (id: string, dto: UpdateProductCategoryDto): Promise<ResponseProductCategoryDto | null> => {
  const productCategory = await productCategoryRepo.findOneBy({ id });
  if (!productCategory) return null;
  Object.assign(productCategory, dto);
  productCategory.slug = generateSlug(dto.title);
  await productCategoryRepo.save(productCategory);
  return toResponseProductCategoryDto(productCategory);
};

export const deleteProductCategory = async (id: string): Promise<boolean> => {
  const result = await productCategoryRepo.delete({ id });
  return result.affected !== 0; // Trả về true nếu có bản ghi bị xóa
};

export const generateSlug = (title: string): string => {
  return slugify(title, { lower: true, strict: true, locale: 'vi' });
}
