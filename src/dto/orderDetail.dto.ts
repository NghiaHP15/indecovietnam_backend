import { OrderDetail } from "../entity/OrderDetail";

export interface OrderDetailDto {
    id: string;
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