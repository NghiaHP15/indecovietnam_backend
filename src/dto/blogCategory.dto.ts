import { BlogCategory } from "../entity/BlogCategory";

export interface BlogCategoryDto {
    id: string;
    title: string;
    slug: string;
    description?: string;
}

export interface ResponseBlogCategoryDto {
    id: string;
    title: string;
    slug: string;
    description?: string;
}

export interface CreateBlogCategoryDto {
    title: string;
    slug: string;
    description: string;
}

export interface UpdateBlogCategoryDto {
    title: string;
    slug: string;
    description: string;
}

export interface QueryBlogCategoryDto {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: keyof BlogCategory;
  order?: 'asc' | 'desc';
}