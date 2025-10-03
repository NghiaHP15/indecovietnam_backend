import { ResponseProductDto } from "../dto/product.dto";
import { Product } from "../entity/Product";

export const toResponseProductDto = (product: Product): ResponseProductDto => {
    return {
        id: product.id,
        name: product.name,
        slug: product.slug,
        image: product.image,
        description: product.description,
        status: product.status,
        featured: product.featured,
        views: product.views,
        max_price: product.max_price,
        min_price: product.min_price,
        body: product.body,
        policy: product.policy,
        productCategory: {
            id: product.productCategory.id,
            title: product.productCategory.title,
            slug: product.productCategory.slug,
            roomCategory: product.productCategory.roomCategory && {
                id: product.productCategory.roomCategory.id,
                title: product.productCategory.roomCategory.title,
                slug: product.productCategory.roomCategory.slug
            }
        },
        variants: product.variants.map(variant => ({
            id: variant.id,
            sku: variant.sku,
            image: variant.image,
            size: variant.size,
            price: variant.price,
            color: {
                id: variant.color.id,
                name: variant.color.name,
                code: variant.color.code,
            },
            quantity_in_stock: variant.quantity_in_stock,
            quantity_reserved: variant.quantity_reserved,
            quantity_selled: variant.quantity_selled,
            discount: variant.discount,
            is_active: variant.is_active
        }))
    }
}