import { ResponseProductVariantDto } from "../dto/productVariant.dto";
import { ProductVariant } from "../entity/ProductVariant";

export const toResponseProductVariantDto = (productVariant: ProductVariant): ResponseProductVariantDto => ({
    id: productVariant.id,
    sku: productVariant.sku,
    color: { id: productVariant.color.id, name: productVariant.color.name, code: productVariant.color.code },
    size: productVariant.size,
    image: productVariant.image,
    price: productVariant.price,
    discount: productVariant.discount,
    quantity_in_stock: productVariant.quantity_in_stock,
    quantity_reserved: productVariant.quantity_reserved,
    quantity_selled: productVariant.quantity_selled,
    is_active: productVariant.is_active,
    product: { id: productVariant.product.id, name: productVariant.product.name, },
}) 