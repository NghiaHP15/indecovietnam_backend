import { Role } from "../entity/Role";

export interface ResponseRoleDto {
    id: string;
    name: string;
    description?: string;
    permission: string;
}

export interface CreateRoleDto {
    name: string;
    description?: string;
    permission: string;
}

export interface UpdateRoleDto {
    name: string;
    description?: string;
    permission?: string;
}

export interface QueryRoleDto {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: keyof Role;
    order?: 'asc' | 'desc';
}