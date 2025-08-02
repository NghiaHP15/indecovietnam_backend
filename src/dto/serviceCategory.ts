import { ServiceCategory } from "../entity/ServiceCategory";

export interface ResponseServiceCategoryDto {
    id: string;
    title: string;
    slug: string;
    description?: string;
}

export interface CreateServiceCategoryDto {
    title: string;
    slug: string;
    description: string;
}

export interface UpdateServiceCategoryDto {
    title: string;
    slug: string;
    description: string;
}

export interface QueryServiceCategoryDto {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: keyof ServiceCategory;
  order?: 'asc' | 'desc';
}