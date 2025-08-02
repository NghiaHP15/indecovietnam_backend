import { Customer } from "../entity/Customer";
import { Gender, Level, Provider } from "../utils/enum";
import { AddressDto } from "./address.dto";
import { OrderDto } from "./order.dto";


export interface CreateCustomerDto {
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
  password: string;
  gender?: Gender;
  date_of_birth: Date;
  level?: Level;
  avatar?: string;
  provider?: Provider;
  provider_id?: string;
}

export interface UpdateCustomerDto {
  email?: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  password?: string;
  gender?: Gender;
  date_of_birth?: Date;
  level?: Level;
  avatar?: string;
  provider?: Provider;
  provider_id?: string;
}

export interface RegisterCustomerDto {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  ip: string;
  userAgent: string;
}

export interface LoginCustomerDto {
  email: string;
  password: string;
  ip: string;
  userAgent: string;
}

export interface SocialLoginCustomerDto {
  email: string;
  firstname: string;
  lastname: string;
  avatar?: string;
  provider: Provider;
  provider_id: string;
  ip: string;
  userAgent: string;
}

export interface ResponseCustomerDto {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  phone?: string;
  gender?: Gender;
  date_of_birth?: Date;
  level?: Level;
  avatar?: string;
  provider?: Provider;
  addresses?: AddressDto[];
  orders?: OrderDto[];
}

export interface QueryCustomerDto {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: keyof Customer;
  order?: 'asc' | 'desc';
}