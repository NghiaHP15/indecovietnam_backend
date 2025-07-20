import { Like } from 'typeorm';
import { CreateProductDto, QueryProductDto, ResponseProductDto, UpdateProductDto } from '../dto/product.dto';
import { productRepo } from '../repositories/product.repository';
import { toResponseProductDto } from '../automapper/product.mapper';
import { generateSlug } from '../config/contant';

export const getAllProducts = async (query: QueryProductDto): Promise<ResponseProductDto[]> => {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const where = query.search ? [
        { name: Like(`%${query.search}%`) },
    ] : {};

    const [products] = await productRepo.findAndCount({ 
        where,
        relations: ['productCategory', 'productCategory.roomCategory', 'variants'],
        order: {
            [query.sortBy || 'created_at']: query.order || 'desc',
        },
        take: limit,
        skip
    });
    return products.map(toResponseProductDto);
};

export const getProductById = async (id: string): Promise<ResponseProductDto | null> => {
  const product = await productRepo.findOne({ 
    where: { id },
    relations: ['productCategory', 'productCategory.roomCategory', 'variants'],
  });
  return product ? toResponseProductDto(product) : null;
};

export const CreateProduct = async (dto: CreateProductDto): Promise<ResponseProductDto> => {
    dto.slug = generateSlug(dto.name);
    const product = productRepo.create({ ...dto });
    await productRepo.save(product);
    return toResponseProductDto(product);
}

export const updaterProduct = async (id: string, dto: UpdateProductDto): Promise<ResponseProductDto | null> => {
  const product = await productRepo.findOneBy({ id });
  if (!product) return null;
  Object.assign(product, dto);
  product.slug = generateSlug(dto.name);
  await productRepo.save(product);
  return toResponseProductDto(product);
};

export const deleteProduct = async (id: string): Promise<boolean> => {
  const result = await productRepo.delete({ id });
  return result.affected !== 0; // Trả về true nếu có bản ghi bị xóa
};
