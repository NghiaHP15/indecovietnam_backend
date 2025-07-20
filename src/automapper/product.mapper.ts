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
        body: product.body,
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
            color: variant.color,
            size: variant.size,
            price: variant.price,
            discount: variant.discount,
            is_active: variant.is_active
        }))
    }
}