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
        })),
        orders: customer.orders && customer.orders.map(order => ({
            id: order.id,
            txnRef: order.txnRef,
            order_date: order.order_date,
            status: order.status,
            total_amount: order.total_amount,
            payment_status: order.payment_status,
            address: order.address,
            note: order.note,
            paymentmethod: order.paymentmethod,
        }))
    }
}