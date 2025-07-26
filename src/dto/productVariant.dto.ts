import { ProductVariant } from "../entity/ProductVariant";

export interface ProductVariantDto {
    id: string;
    sku: string;
    color: {
        id: string,
        name: string,
        code: string
    }
    size: string;
    price: string;
    discount: string;
    image?:string;
    is_active: boolean;
    quatity: number;
    product?: {
        id: string;
    };
}

export interface ResponseProductVariantDto {
    id: string;
    sku: string;
    color: {
        id: string,
        name: string,
        code: string
    }
    size: string;
    price: string;
    discount: string;
    image?:string;
    is_active: boolean;
    quatity: number;
    product?: {
        id: string;
    };
}

export interface CreateProductVariantDto {
    sku: string;
    color: {
        id: string,
        name: string,
        code: string
    }
    size: string;
    price: string;
    discount: string;
    image?:string;
    is_active: boolean;
    quatity: number;
    product: { 
        id: string 
    };
}

export interface UpdateProductVariantDto {
    sku: string;
    color: {
        id: string,
        name: string,
        code: string
    }
    size: string;
    price: string;
    discount: string;
    image?:string;
    is_active: boolean;
    quatity: number;
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