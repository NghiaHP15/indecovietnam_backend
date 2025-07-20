import { ResponseOrderDto } from "../dto/order.dto";
import { Order } from "../entity/Order";

export const toResponseOrderDto = (order: Order): ResponseOrderDto => {
    return {
        id: order.id,
        code: order.code,
        order_date: order.order_date,
        status: order.status,
        total_amount: order.total_amount,
        payment_status: order.payment_status,
        address: order.address,
        note: order.note,
        paymentmethod: {
            id: order.paymentmethod.id,
            name: order.paymentmethod.name
        },
        customer: {
            id: order.customer.id,
            email: order.customer.email,
            firstname: order.customer.firstname,
            lastname: order.customer.lastname
        },
        products: order.products.map(product => ({
            id: product.id,
            total_price: product.total_price,
            quantity: product.quantity,
            product_variant: {
                id: product.product_variant.id
            },
            order: {
                id: order.id
            }
        })),
        created_at: order.created_at,
        updated_at: order.updated_at
    }
}