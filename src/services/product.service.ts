import { Like, Raw } from 'typeorm';
import { CreateProductDto, QueryProductDto, ResponseProductDto, UpdateProductDto } from '../dto/product.dto';
import { productRepo } from '../repositories/product.repository';
import { toResponseProductDto } from '../automapper/product.mapper';
import { generateNormalized, generateSlug } from '../config/contant';
import { productVariantRepo } from '../repositories/productVariant.repository';

export const getAllProducts = async (query: QueryProductDto): Promise<ResponseProductDto[]> => {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const where = {
        ...(query.search ? { 
          name_normalized: Raw(alias => `${alias} LIKE :search`, {
            search: `%${generateNormalized(query.search).toLowerCase()}%`
          }),
        } : {}),
        ...(query.status ? { status: query.status } : {}),
        ...(query.featured ? { featured: query.featured } : {}),
        ...(query.productCategory ? { productCategory: { id: query.productCategory } } : {}),
    };

    const [products] = await productRepo.findAndCount({ 
        where,
        relations: ['productCategory', 'productCategory.roomCategory', 'variants', 'variants.color'],
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
    relations: ['productCategory', 'productCategory.roomCategory', 'variants', 'variants.color'],
  });
  return product ? toResponseProductDto(product) : null;
};

export const getProductBySlug = async (slug: string): Promise<ResponseProductDto | null> => {
  const product = await productRepo.findOne({ 
    where: { slug },
    relations: ['productCategory', 'productCategory.roomCategory', 'variants', 'variants.color'],
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


export const updateProductMinMaxPrice = async (id: string) => {
  const variants = await productVariantRepo.find({
    where: { product: { id: id } },
  });

  if (!variants.length) {
    await productRepo.update(id, {
      min_price: 0,
      max_price: 0,
    });
    return;
  }

  const prices = variants.map((v) => parseFloat(v.price));
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  await productRepo.update(id, {
    min_price: minPrice,
    max_price: maxPrice,
  });
}