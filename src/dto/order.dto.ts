import { Order } from "../entity/Order";
import { OrderStatus, PaymentStatus } from "../utils/enum";
import { CreateOrderDetailDto, OrderDetailDto } from "./orderDetail.dto";

export interface ResponseOrderDto {
    id: string;
    code: string;
    order_date: Date;
    status: OrderStatus;
    total_amount: number;
    payment_status: PaymentStatus;
    address: string;
    note: string;
    paymentmethod: {
        id: string;
        name: string;
    }
    customer: {
        id: string;
        email: string;
        firstname: string;
        lastname: string;
    }
    products: OrderDetailDto[];
    created_at: Date;
    updated_at: Date;
}

export interface CreateOrderDto {
    id: string;
    code: string;
    order_date: Date;
    status: OrderStatus;
    total_amount: number;
    payment_status: PaymentStatus;
    address: string;
    note: string;
    paymentmethod: {
        id: string;
    }
    customer: {
        id: string;
    },
    products: CreateOrderDetailDto[];
}

export interface UpdateOrderDto {
    code: string;
    order_date?: Date;
    status?: OrderStatus;
    total_amount?: string;
    payment_status?: PaymentStatus;
    address?: string;
    note?: string;
    paymentmethod: {
        id?: string;
    }
    customer: {
        id?: string;
    }
}

export interface QueryOrderDto {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: keyof Order;
    order?: 'asc' | 'desc';
}