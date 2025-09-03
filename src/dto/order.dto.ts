import { Order } from "../entity/Order";
import { OrderStatus, PaymentMethod, PaymentStatus } from "../utils/enum";
import { CreateOrderDetailDto, OrderDetailDto } from "./orderDetail.dto";


export interface OrderDto {
    id: string;
    txnRef: string;
    order_date: Date;
    status: OrderStatus;
    total_amount: number;
    payment_status: PaymentStatus;
    address: {
        id: string;
        receiver_name?: string;
        phone?: string;
        address_line: string;
        ward: string;
        district: string;
        city: string;
    };
    note: string;
    paymentmethod: PaymentMethod;
    products?: OrderDetailDto[];
}

export interface ResponseOrderDto {
    id: string;
    txnRef: string;
    order_date: Date;
    status: OrderStatus;
    total_amount: number;
    payment_status: PaymentStatus;
    address: {
        id: string;
        receiver_name?: string;
        phone?: string;
        address_line: string;
        ward: string;
        district: string;
        city: string;
    };
    note: string;
    paymentmethod: PaymentMethod;
    customer: {
        id: string;
        email: string;
        firstname: string;
        lastname: string;
        avatar: string | undefined;
    }
    products: OrderDetailDto[];
    created_at: Date;
    updated_at: Date;
}

export interface CreateOrderDto {
    id: string;
    txnRef: string;
    order_date: Date;
    status: OrderStatus;
    total_amount: number;
    payment_status: PaymentStatus;
    note: string;
    paymentmethod: PaymentMethod;
    address: {
        id: string;
        receiver_name?: string;
        phone?: string;
        address_line: string;
        ward: string;
        district: string;
        city: string;
    };
    customer: {
        id: string;
        email: string;
        firstname: string;
        lastname: string;
    },
    products: CreateOrderDetailDto[];
}

export interface UpdateOrderDto {
    txnRef?: string;
    order_date?: Date;
    status: OrderStatus;
    total_amount?: number;
    payment_status: PaymentStatus;
    note?: string;
    paymentmethod?: PaymentMethod;
    address: {
        id: string;
        receiver_name?: string;
        phone?: string;
        address_line: string;
        ward: string;
        district: string;
        city: string;
    };
    customer?: {
        id: string;
        email: string;
        firstname: string;
        lastname: string;
    }
    products: CreateOrderDetailDto[];
}

export interface QueryOrderDto {
    page?: number;
    limit?: number;
    search?: string;
    status?: OrderStatus;
    customer?: string;
    sortBy?: keyof Order;
    order?: 'asc' | 'desc';
}