import { ResponseAddressDto } from "../dto/address.dto";
import { Address } from "../entity/Address";

export const toResponseAddressDto = (address: Address): ResponseAddressDto => {
    return {
        id: address.id,
        receiver_name: address.receiver_name,
        phone: address.phone,
        address_line: address.address_line,
        ward: address.ward,
        district: address.district,
        city: address.city,
        default: address.default,
        customer: {
            id: address.customer.id,
            email: address.customer.email,
            firstname: address.customer.firstname,
            lastname: address.customer.lastname,
        }
    }
}