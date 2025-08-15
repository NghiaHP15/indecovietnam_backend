import { ResponseRoomCategoryDto } from "../dto/roomCategory.dto";
import { RoomCategory } from "../entity/RoomCategory";

export const toResponseRoomCategoryDto = (roomCategory: RoomCategory): ResponseRoomCategoryDto => ({
    id: roomCategory.id,
    title: roomCategory.title,
    slug: roomCategory.slug,
    image: roomCategory.image,
    description: roomCategory.description,
    featured: roomCategory.featured,
    productCategories: roomCategory.productCategories && roomCategory.productCategories.map(productCategory => ({
        id: productCategory.id,
        title: productCategory.title,
        slug: productCategory.slug,
        featured: productCategory.featured,
        roomCategory: productCategory.roomCategory
    }))
}) 
