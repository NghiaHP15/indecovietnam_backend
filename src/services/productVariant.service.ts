import { Like } from 'typeorm';
import { productVariantRepo } from '../repositories/productVariant.repository';
import { toResponseProductVariantDto } from '../automapper/productVariant.mapper';
import { CreateProductVariantDto, ResponseProductVariantDto, UpdateProductVariantDto, QueryProductVariantDto } from './../dto/productVariant.dto';
import { generateSku } from '../config/contant';

export const getAllProductVariants = async (query: QueryProductVariantDto): Promise<ResponseProductVariantDto[]> => {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const where = query.search ? [
        { sku: Like(`%${query.search}%`) },
    ] : {};

    const [productVariants] = await productVariantRepo.findAndCount({ 
        where,
        relations: ['product'],
        order: {
            [query.sortBy || 'created_at']: query.order || 'desc',
        },
        take: limit,
        skip
    });
    return productVariants.map(toResponseProductVariantDto);
};

export const getProductVariantById = async (id: string): Promise<ResponseProductVariantDto | null> => {
  const productVariant = await productVariantRepo.findOne({
    where: { id },
    relations: ['product']
  });
  return productVariant ? toResponseProductVariantDto(productVariant) : null;
};

export const CreateProductVariant = async (dto: CreateProductVariantDto): Promise<ResponseProductVariantDto> => {
  dto.sku = generateSku("Product Variant", dto.product.id);
  const productVariant = productVariantRepo.create({ ...dto });
  await productVariantRepo.save(productVariant);
  return toResponseProductVariantDto(productVariant);
}

export const updaterProductVariant = async (id: string, dto: UpdateProductVariantDto): Promise<ResponseProductVariantDto | null> => {
  const productVariant = await productVariantRepo.findOneBy({ id });
  if (!productVariant) return null;
  Object.assign(productVariant, dto);
  await productVariantRepo.save(productVariant);
  return toResponseProductVariantDto(productVariant);
};

export const deleteProductVariant = async (id: string): Promise<boolean> => {
  const result = await productVariantRepo.delete({ id });
  return result.affected !== 0;
};