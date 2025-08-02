import { ResponseOrderDto } from "../dto/order.dto";
import { Order } from "../entity/Order";

export const toResponseOrderDto = (order: Order): ResponseOrderDto => {
    return {
        id: order.id,
        txnRef: order.txnRef,
        order_date: order.order_date,
        status: order.status,
        total_amount: order.total_amount,
        payment_status: order.payment_status,
        address: order.address,
        note: order.note,
        paymentmethod: order.paymentmethod,
        customer: {
            id: order.customer.id,
            email: order.customer.email,
            firstname: order.customer.firstname,
            lastname: order.customer.lastname
        },
        products: order.products.map(product => ({
            id: product.id,
            name: product.name,
            total_price: product.total_price,
            quantity: product.quantity,
            product_variant: {
                id: product.product_variant.id,
                image: product.product_variant.image,
                sku: product.product_variant.sku,
                price: product.product_variant.price
            },
            order: {
                id: order.id
            }
        })),
        created_at: order.created_at,
        updated_at: order.updated_at
    }
}