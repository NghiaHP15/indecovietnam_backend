import { RoomCategory } from "../entity/RoomCategory";

export interface RoomCategoryDto {
    id: string;
    title: string;
    slug: string;
    image?: string;
    featured: boolean;
}

export interface ResponseRoomCategoryDto {
    id: string;
    title: string;
    slug: string;
    image?: string;
    featured: boolean;
}

export interface CreateRoomCategoryDto {
    title: string;
    slug: string;
    image: string;
    featured: boolean;
}

export interface UpdateRoomCategoryDto {
    title: string;
    slug: string;
    image: string;
    featured: boolean;
}

export interface QueryRoomCategoryDto {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: keyof RoomCategory;
    order?: 'asc' | 'desc';
}