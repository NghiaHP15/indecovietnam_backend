import { RoomCategory } from "../entity/RoomCategory";
import { ProductCategoryDto } from "./productCategory.dto";

export interface RoomCategoryDto {
    id: string;
    title: string;
    slug: string;
    image?: string;
    description?: string;
    featured: boolean;
}

export interface ResponseRoomCategoryDto {
    id: string;
    title: string;
    slug: string;
    image?: string;
    description?: string;
    featured: boolean;
    productCategories?: ProductCategoryDto[];
}

export interface CreateRoomCategoryDto {
    title: string;
    slug: string;
    image: string;
    description?: string;
    featured: boolean;
}

export interface UpdateRoomCategoryDto {
    title: string;
    slug: string;
    image: string;
    description?: string;
    featured: boolean;
}

export interface QueryRoomCategoryDto {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: keyof RoomCategory;
    order?: 'asc' | 'desc';
}