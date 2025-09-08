import { Employee } from "../entity/Employee";
import { Gender, Position, Status_active } from "../utils/enum";

export interface ResponseAuthDto {
    id?: string;
    email?: string;
    fullname?: string;
    phone?: string;
    gender: Gender;
    avatar?: string;
    address?: string;
    position?: Position;
    role?:string;
}

export interface ResponseEmployeeDto {
    id: string;
    email: string;
    fullname: string;
    phone?: string;
    gender: Gender;
    address?: string;
    position: Position;
    date_of_birth?: Date;
    status_active: Status_active;
    avatar?: string;
    role: {
        id: string,
        name: string,
        permission: string
    };
    created_at: Date;
    updated_at: Date;
}

export interface CreateEmployeeDto {
    email: string;
    fullname: string;
    phone?: string;
    gender: Gender;
    address?: string;
    position?: Position;
    date_of_birth?: Date;
    status_active: Status_active;
    avatar?: string;
    role: {
        id: string,
    };
    password?: string;
}

export interface UpdateEmployeeDto {
    email?: string;
    fullname?: string;
    phone?: string;
    gender?: Gender;
    address?: string;
    position?: Position;
    date_of_birth?: Date;
    status_active?: Status_active;
    avatar?: string;
    role: {
        id: string,
    };
    password?: string;
}

export interface LoginEmployeeDto {
    email: string;
    password: string;
}

export interface ResetEmployeeDto {
    email: string;
    oldPassword: string;
    newPassword: string;
}

export interface QueryEmployeeDto {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: keyof Employee;
    order?: 'asc' | 'desc';
}
