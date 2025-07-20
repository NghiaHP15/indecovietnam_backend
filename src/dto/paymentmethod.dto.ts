import { Paymentmethod } from "../entity/Paymentmethod";

export interface ResponsePaymentMethodDto {
    id: string;
    name: string;
    description: string;
    active: boolean;
}

export interface CreatePaymentMethodDto {
    name: string;
    description: string;
    active: boolean;
}

export interface UpdatePaymentMethodDto {
    name?: string;
    description?: string;
    active?: boolean;
}

export interface QueryPaymentMethodDto {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: keyof Paymentmethod;
    order?: 'asc' | 'desc';
}