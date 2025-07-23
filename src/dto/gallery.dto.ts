import { Gallery } from "../entity/Gallery";
import { TypeGallery } from "../utils/enum"

export interface ResponseGalleryDto {
    id: string;
    title: string;
    href?: string;
    description?: string;
    image?: string;
    type: TypeGallery;
}

export interface CreateGalleryDto {
    title: string;
    href?: string;
    description?: string;
    image?: string;
    type: TypeGallery;
}

export interface UpdateGalleryDto {
    title: string;
    href?: string;
    description?: string;
    image?: string;
    type: TypeGallery;
}

export interface QueryGalleryDto {
    page?: number;
    limit?: number;
    search?: string;
    type?: TypeGallery;
    sortBy?: keyof Gallery;
    order?: 'asc' | 'desc';
}