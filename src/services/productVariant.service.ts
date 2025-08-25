import { ILike } from 'typeorm';
import { productVariantRepo } from '../repositories/productVariant.repository';
import { toResponseProductVariantDto } from '../automapper/productVariant.mapper';
import { CreateProductVariantDto, ResponseProductVariantDto, UpdateProductVariantDto, QueryProductVariantDto } from './../dto/productVariant.dto';
import { generateSku } from '../config/contant';
import { updateProductMinMaxPrice } from './product.service';

export const getAllProductVariants = async (query: QueryProductVariantDto): Promise<ResponseProductVariantDto[]> => {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const where = {
      ...(query.search ? { sku: ILike(`%${query.search}%`) } : {}),
      ...(query.product ? { product: { id: query.product } } : {}),
    };

    const [productVariants] = await productVariantRepo.findAndCount({ 
        where,
        relations: ['product', 'color'],
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
    relations: ['product', 'color']
  });
  return productVariant ? toResponseProductVariantDto(productVariant) : null;
};

export const createProductVariant = async (dto: CreateProductVariantDto): Promise<ResponseProductVariantDto> => {
  const productVariant = productVariantRepo.create({ ...dto });
  await productVariantRepo.save(productVariant);
  await updateProductMinMaxPrice(dto.product.id);
  return toResponseProductVariantDto(productVariant);
}

export const updaterProductVariant = async (id: string, dto: UpdateProductVariantDto): Promise<ResponseProductVariantDto | null> => {
  const productVariant = await productVariantRepo.findOneBy({ id });
  if (!productVariant) return null;
  Object.assign(productVariant, dto);
  await productVariantRepo.save(productVariant);
  await updateProductMinMaxPrice(dto.product.id);
  return toResponseProductVariantDto(productVariant);
};

export const deleteProductVariant = async (id: string): Promise<boolean> => {
  const productVariant = await productVariantRepo.findOne({
    where: { id },
    relations: ['product']
  });
  if (!productVariant) return false;
  const result = await productVariantRepo.delete({ id });
  await updateProductMinMaxPrice(productVariant.product.id);
  return result.affected !== 0;
};

export const reserve = async(id: string, qty: number) =>  {
  const pv = await productVariantRepo.findOneBy({ id });
  if(!pv) throw new Error('Variant not found');
  if(pv.quantity_in_stock - pv.quantity_reserved < qty) throw new Error('Not enough stock');
  pv.quantity_reserved += qty;
  await productVariantRepo.save(pv);
}

export const confirm = async(id: string, qty: number) =>  {
  const pv = await productVariantRepo.findOneBy({ id });
  if(!pv) throw new Error('Variant not found');
  pv.quantity_in_stock -= qty;
  pv.quantity_reserved -= qty;
  pv.quantity_selled += qty;
  if(pv.quantity_in_stock < 0) pv.quantity_in_stock = 0;
  if(pv.quantity_reserved < 0) pv.quantity_reserved = 0;
  await productVariantRepo.save(pv);
}

export const release = async(id: string, qty: number) =>  {
  const pv = await productVariantRepo.findOneBy({ id });
  if(!pv) throw new Error('Variant not found');
  if(pv.quantity_reserved < qty) throw new Error('Not enough reserved stock');
  pv.quantity_reserved -= qty;
  if(pv.quantity_reserved < 0) pv.quantity_reserved = 0;
  await productVariantRepo.save(pv);
}