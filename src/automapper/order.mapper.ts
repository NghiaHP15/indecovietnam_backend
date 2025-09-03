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
        note: order.note,
        paymentmethod: order.paymentmethod,
        address: {
            id: order.address.id,
            receiver_name: order.address.receiver_name,
            phone: order.address.phone,
            address_line: order.address.address_line,
            ward: order.address.ward,
            district: order.address.district,
            city: order.address.city
        },
        customer: {
            id: order.customer.id,
            email: order.customer.email,
            firstname: order.customer.firstname,
            lastname: order.customer.lastname,
            avatar: order.customer.avatar
        },
        products: order.products.map(product => ({
            id: product.id,
            name: product.name,
            slug: product.slug,
            total_price: product.total_price,
            quantity: product.quantity,
            product_variant: {
                id: product.product_variant.id,
                image: product.product_variant.image,
                sku: product.product_variant.sku,
                price: product.product_variant.price,
                discount: product.product_variant.discount,
                color: product.product_variant.color ? {
                    id: product.product_variant.color.id,
                    name: product.product_variant.color.name,
                    code: product.product_variant.color.code
                } : undefined,
            },
            order: {
                id: order.id
            }
        })),
        created_at: order.created_at,
        updated_at: order.updated_at
    }
}