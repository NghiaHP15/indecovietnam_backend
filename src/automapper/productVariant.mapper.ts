import { ResponseProductVariantDto } from "../dto/productVariant.dto";
import { ProductVariant } from "../entity/ProductVariant";

export const toResponseProductVariantDto = (productVariant: ProductVariant): ResponseProductVariantDto => ({
    id: productVariant.id,
    sku: productVariant.sku,
    color: productVariant.color,
    size: productVariant.size,
    image: productVariant.image,
    price: productVariant.price,
    discount: productVariant.discount,
    quatity: productVariant.quatity,
    is_active: productVariant.is_active,
    product: { id: productVariant.product.id },
}) 