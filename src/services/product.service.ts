import { Like, Raw } from 'typeorm';
import { CreateProductDto, QueryProductDto, ResponseProductDto, UpdateProductDto } from '../dto/product.dto';
import { productRepo } from '../repositories/product.repository';
import { toResponseProductDto } from '../automapper/product.mapper';
import { generateNormalized } from '../config/contant';
import { productVariantRepo } from '../repositories/productVariant.repository';
import { createProductVariant, deleteProductVariant, getProductVariantById, updaterProductVariant } from './productVariant.service';

export const getAllProducts = async (query: QueryProductDto): Promise<ResponseProductDto[]> => {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const where: any = {
        ...(query.search ? { 
          name_normalized: Raw(alias => `${alias} LIKE :search`, {
            search: `%${generateNormalized(query.search).toLowerCase()}%`
          }),
        } : {}),
        ...(query.status ? { status: query.status } : {}),
        ...(query.featured ? { featured: query.featured } : {}),
        // ...(query.productCategory ? { productCategory: { id: query.productCategory } } : {}),
        // ...(query.category ? { productCategory: { slug: query.category } } : {}),
        // ...(query.room ? { productCategory: { roomCategory: { slug: query.room } } } : {}),
    };

    // Khởi tạo điều kiện productCategory + room
    if (query.room) {
      // nếu có room, ưu tiên lọc room trước
      where.productCategory = {
        roomCategory: { slug: query.room }
      };

      if (query.category) {
        // nếu có category sau khi đã có room, thêm slug cho productCategory
        where.productCategory.slug = query.category;
      }

    } else if (query.category) {
      // nếu không có room nhưng có category
      where.productCategory = {
        slug: query.category
      };
    }

    // Nếu còn filter bằng id của productCategory riêng (nếu bạn muốn)
    if (query.productCategory) {
      // nếu vừa có room & category & productCategory thì phụ thêm id
      if (!where.productCategory) {
        where.productCategory = {};
      }
      where.productCategory.id = query.productCategory;
    }

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
    const product = await productRepo.save(productRepo.create({ ...dto }));
    if(dto.variants) {
      await Promise.all(dto.variants.map(detail =>
        createProductVariant({ ...detail, product: { id: product.id }})
      ));
    }
    return toResponseProductDto(product);
}

export const updaterProduct = async ( id: string, dto: UpdateProductDto ): Promise<ResponseProductDto | null> => {
  const product = await productRepo.findOne({
    where: { id },
    relations: [ 'productCategory', 'productCategory.roomCategory', 'variants', 'variants.color' ],
  });

  if (!product) return null;

  // Tách variant ra để xử lý riêng
  const { variants: variantsDto, ...productDto } = dto;

  // Cập nhật product chính
  Object.assign(product, productDto);
  await productRepo.save(product);

  if (variantsDto) {
    const oldVariants = product.variants || [];
    const newVariantIds = variantsDto.map((v) => v.id);

    // Xoá những variant cũ không có trong dto
    const variantsToDelete = oldVariants.filter(
      (v) => !newVariantIds.includes(v.id)
    );
    if (variantsToDelete.length) {
      await Promise.all(
        variantsToDelete.map((v) => deleteProductVariant(v.id))
      );
    }

    // Update hoặc create
    await Promise.all(
      variantsDto.map(async (detail) => {
        const exists = await getProductVariantById(detail.id);
        if (exists) {
          return updaterProductVariant(detail.id, {
            ...detail,
            product: { id: product.id },
          });
        } else {
          return createProductVariant({
            ...detail,
            product: { id: product.id },
          });
        }
      })
    );
  }

  // Trả về DTO mới nhất
  const updatedProduct = await productRepo.findOne({
    where: { id },
    relations: [
      'productCategory',
      'productCategory.roomCategory',
      'variants',
      'variants.color',
    ],
  });

  return updatedProduct ? toResponseProductDto(updatedProduct) : null;
};

export const deleteProduct = async (id: string): Promise<boolean> => {
  const result = await productRepo.delete({ id });
  return result.affected !== 0; // Trả về true nếu có bản ghi bị xóa
};

export const viewProduct = async (id: string): Promise<boolean> => {
  const product = await productRepo.findOne({ where: { id } });
  if (!product) return false;
  product.views += 2;
  await productRepo.save(product);
  return true;
}


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