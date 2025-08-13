import { Blog } from "../entity/Blog";

export interface ResponseBlogDto {
    id: string;
    title: string;
    slug: string;
    image?: string;
    description?: string;
    latest_blog: boolean;
    published_at?: Date;
    tag?: string[];
    body?: string;
    created_at: Date;
    updated_at: Date;
    category: {
        id: string;
        title: string;
        slug: string;
    },
    author: {
        id: string;
        fullname: string;
    }
}

export interface CreateBlogDto {
    title: string;
    image: string;
    description: string;
    latest_blog: boolean;
    body: string;
    published_at: Date;
    tag?: string[];
    category: {
        id: string;
    };
    author: {
        id: string;
    };
}

export interface UpdateBlogDto {
    title: string;
    image?: string;
    description?: string;
    latest_blog?: boolean;
    body?: string;
    published_at?: Date;
    tag?: string[];
    category?: {
        id: string;
    };
    author?: {
        id: string;
    };
}

export interface QueryBlogDto {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  tag?: string;
  latest_blog?: boolean;
  sortBy?: keyof Blog;
  order?: 'asc' | 'desc';
}