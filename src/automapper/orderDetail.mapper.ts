import { ResponseOrderDetailDto } from "../dto/orderDetail.dto";
import { OrderDetail } from "../entity/OrderDetail";

export const toResponseOrderDetailDto = (orderDetail: OrderDetail): ResponseOrderDetailDto => {
    return {
        id: orderDetail.id,
        name: orderDetail.name,
        slug: orderDetail.slug,
        total_price: orderDetail.total_price,
        quantity: orderDetail.quantity,
        product_variant: { 
            id: orderDetail.product_variant.id 
        },
        order: { 
            id: orderDetail.order.id 
        },
    }
}