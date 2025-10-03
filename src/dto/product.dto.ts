import { Product } from "../entity/Product";
import { StatusProduct } from "../utils/enum";
import { CreateProductVariantDto, ProductVariantDto, UpdateProductVariantDto } from "./productVariant.dto";

export interface ResponseProductDto {
    id: string;
    name: string;
    slug: string;
    image?: string;
    description?: string;
    status: StatusProduct;
    featured: boolean;
    views: number;
    max_price: number;
    min_price: number;
    body?: string;
    policy?: string;
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
    policy?: string;
    productCategory: { id: string };
    variants?: CreateProductVariantDto[];
}

export interface UpdateProductDto {
    name: string;
    slug: string;
    image?: string;
    description?: string;
    status: StatusProduct;
    featured: boolean;
    body?: string;
    policy?: string;
    productCategory: { id: string };
    variants?: UpdateProductVariantDto[];
}

export interface QueryProductDto {
    page?: number;
    limit?: number;
    search?: string;
    status?: StatusProduct;
    productCategory?: string;
    room?: string;
    category?: string;
    featured?: boolean;
    sortBy?: keyof Product;
    order?: 'asc' | 'desc';
}