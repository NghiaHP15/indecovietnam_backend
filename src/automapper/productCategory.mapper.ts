import { ResponseProductCategoryDto } from "../dto/productCategory.dto";
import { ProductCategory } from "../entity/ProductCategory";

export const toResponseProductCategoryDto = (productCategory: ProductCategory): ResponseProductCategoryDto => {
    return {
        id: productCategory.id,
        title: productCategory.title,
        slug: productCategory.slug,
        image: productCategory.image,
        description: productCategory.description,
        featured: productCategory.featured,
        roomCategory: productCategory.roomCategory && {
            id: productCategory.roomCategory.id,
            title: productCategory.roomCategory.title,
            slug: productCategory.roomCategory.slug
        }
    };
}