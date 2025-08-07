import { OrderDetail } from "../entity/OrderDetail";

export interface OrderDetailDto {
    id: string;
    name: string;
    slug: string;
    total_price: number;
    quantity: number;
    order: {
        id: string;
    };
    product_variant: {
        id: string;
    };
}

export interface ResponseOrderDetailDto {
    id: string;
    name: string;
    slug: string;
    total_price: number;
    quantity: number;
    product_variant: {
        id: string;
    };
    order: {
        id: string;
    };
}

export interface CreateOrderDetailDto {
    name: string;
    slug: string;
    total_price: number;
    quantity: number;
    product_variant: {
        id: string;
    };
    order: {
        id: string;
    };
}

export interface UpdateOrderDetailDto {
    name: string;
    slug: string;
    total_price?: string;
    quantity?: number;
    product_variant?: {
        id: string;
    };
    order?: {
        id: string;
    };
}

export interface QueryOrderDetailDto {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: keyof OrderDetail;
    order?: 'asc' | 'desc';
}