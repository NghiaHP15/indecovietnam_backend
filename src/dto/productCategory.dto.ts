import { ProductCategory } from "../entity/ProductCategory";
import { RoomCategoryDto } from "./roomCategory.dto";

export interface ProductCategoryDto {
    id: string;
    title: string;
    slug: string;
    image?: string;
    description?: string;
    featured: boolean;
    roomCategory: RoomCategoryDto;
}

export interface ResponseProductCategoryDto {
    id: string;
    title: string;
    slug: string;
    image?: string;
    description?: string;
    featured: boolean;
    roomCategory: {
        id: string,
        title: string,
        slug: string
    };
}

export interface CreateProductCategoryDto {
    title: string;
    slug: string;
    image: string;
    description: string;
    featured: boolean;
    roomCategory: { id: string };
}

export interface UpdateProductCategoryDto {
    title: string;
    slug: string;
    image?: string;
    description?: string;
    featured: boolean;
    roomCategory: { id: string };
}

export interface QueryProductCategoryDto {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: keyof ProductCategory;
  order?: 'asc' | 'desc';
}