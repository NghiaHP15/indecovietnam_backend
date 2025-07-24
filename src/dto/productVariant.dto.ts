import { ProductVariant } from "../entity/ProductVariant";

export interface ProductVariantDto {
    id: string;
    sku: string;
    color: string;
    size: string;
    price: string;
    discount: string;
    image?:string;
    is_active: boolean;
    product?: {
        id: string;
    };
}

export interface ResponseProductVariantDto {
    id: string;
    sku: string;
    color: string;
    size: string;
    price: string;
    discount: string;
    image?:string;
    is_active: boolean;
    product?: {
        id: string;
    };
}

export interface CreateProductVariantDto {
    sku: string;
    color: string;
    size: string;
    price: string;
    discount: string;
    image?:string;
    is_active: boolean;
    product: { 
        id: string 
    };
}

export interface UpdateProductVariantDto {
    sku: string;
    color: string;
    size: string;
    price: string;
    discount: string;
    image?:string;
    is_active: boolean;
    product: { 
        id: string 
    };
}

export interface QueryProductVariantDto {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: keyof ProductVariant;
  order?: 'asc' | 'desc';
}