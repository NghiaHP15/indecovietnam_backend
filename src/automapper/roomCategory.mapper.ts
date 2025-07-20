import { ResponseRoomCategoryDto } from "../dto/roomCategory.dto";
import { RoomCategory } from "../entity/RoomCategory";

export const toResponseRoomCategoryDto = (roomCategory: RoomCategory): ResponseRoomCategoryDto => ({
    id: roomCategory.id,
    title: roomCategory.title,
    slug: roomCategory.slug,
    image: roomCategory.image,
    featured: roomCategory.featured
}) 