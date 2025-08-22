import { Address } from "../entity/Address";

export interface AddressDto {
    id: string;
    receiver_name?: string;
    phone?: string;
    address_line: string;
    ward: string;
    district: string;
    city: string;
    default: boolean;
}

export interface ResponseAddressDto {
    id: string;
    receiver_name?: string;
    phone?: string;
    address_line: string;
    ward: string;
    district: string;
    city: string;
    default: boolean;
    customer: {
        id: string;
        email: string;
        firstname: string;
        lastname: string;
    };
}

export interface CreateAddressDto {
    receiver_name?: string;
    phone?: string;
    address_line: string;
    ward: string;
    district: string;
    city: string;
    default: boolean;
    customer: {
        id: string;
    };
}

export interface UpdateAddressDto {
    receiver_name?: string;
    phone?: string;
    address_line?: string;
    ward?: string;
    district?: string;
    city?: string;
    default?: string;
}

export interface QueryAddressDto {
  page?: number;
  limit?: number;
  search?: string;
  phone?: string;
  sortBy?: keyof Address;
  order?: 'asc' | 'desc';
}