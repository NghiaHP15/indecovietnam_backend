import { ResponseCustomerDto } from "../dto/customer.dto";
import { Customer } from "../entity/Customer";

export const toResponseCustomerDto = (customer: Customer): ResponseCustomerDto => {
    return {
        id: customer.id,
        email: customer.email,
        firstname: customer.firstname,
        lastname: customer.lastname,
        phone: customer.phone,
        gender: customer.gender,
        date_of_birth: customer.date_of_birth,
        level: customer.level,
        avatar: customer.avatar,
        provider: customer.provider,
        addresses: customer.addresses && customer.addresses.map(address => ({ 
            id: address.id, 
            receiver_name: address.receiver_name, 
            address_line: address.address_line, 
            ward: address.ward, 
            district: address.district,
            city: address.city,
            default: address.default
        }))
    }
}