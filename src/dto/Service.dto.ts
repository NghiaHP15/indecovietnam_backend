import { Service } from "../entity/Service";

export interface ResponseServiceDto {
    id: string;
    title: string;
    slug: string;
    image?: string;
    description?: string;
    published_at?: Date;
    tag?: string[];
    body?: string;
    category: {
        id: string;
        title: string;
        slug: string;
    },
}

export interface CreateServiceDto {
    title: string;
    slug: string;
    image: string;
    description: string;
    body: string;
    published_at: Date;
    tag?: string[];
    category: { id: string };
}

export interface UpdateServiceDto {
    title: string;
    slug: string;
    image: string;
    description: string;
    body: string;
    published_at: Date;
    tag?: string[];
    category: { id: string };
}

export interface QueryServiceDto {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: keyof Service;
  order?: 'asc' | 'desc';
}