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
    quantity_in_stock: number;
    quantity_reserved: number;
    quantity_selled: number;
    product?: {
        id: string;
        name: string;
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
    quantity_in_stock: number;
    quantity_reserved: number;
    quantity_selled: number;
    product?: {
        id: string;
        name: string;
    };
}

export interface CreateProductVariantDto {
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
    quantity_in_stock: number;
    product: { 
        id: string 
    };
}

export interface UpdateProductVariantDto {
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
    quantity_in_stock: number;
    product: { 
        id: string 
    };
}

export interface QueryProductVariantDto {
  page?: number;
  limit?: number;
  search?: string;
  product?: string;
  sortBy?: keyof ProductVariant;
  order?: 'asc' | 'desc';
}