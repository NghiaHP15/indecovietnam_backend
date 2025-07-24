import { Product } from "../entity/Product";
import { StatusProduct } from "../utils/enum";
import { ProductVariantDto } from "./productVariant.dto";

export interface ResponseProductDto {
    id: string;
    name: string;
    slug: string;
    image?: string;
    description?: string;
    status: StatusProduct;
    featured: boolean;
    body?: string;
    productCategory: {
        id: string;
        title: string;
        slug: string
        roomCategory: {
            id: string;
            title: string;
            slug: string
        }
    };
    variants?: ProductVariantDto[];
}

export interface CreateProductDto {
    name: string;
    slug: string;
    image?: string;
    description?: string;
    status: StatusProduct;
    featured: boolean;
    body?: string;
    productCategory: { id: string };
}

export interface UpdateProductDto {
    name: string;
    slug: string;
    image?: string;
    description?: string;
    status: StatusProduct;
    featured: boolean;
    body?: string;
    productCategory: { id: string };
}

export interface QueryProductDto {
    page?: number;
    limit?: number;
    search?: string;
    status?: StatusProduct;
    featured?: boolean;
    sortBy?: keyof Product;
    order?: 'asc' | 'desc';
}