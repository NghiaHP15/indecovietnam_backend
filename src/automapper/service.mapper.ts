import { ResponseGalleryDto } from "../dto/gallery.dto"
import { ResponseServiceDto } from "../dto/Service.dto"
import { Gallery } from "../entity/Gallery"
import { Service } from "../entity/Service"

export const toResponseServiceDto = (serive: Service): ResponseServiceDto => {
    return {
        id: serive.id,
        title: serive.title,
        slug: serive.slug,
        image: serive.image,
        description: serive.description,
        published_at: serive.published_at,
        tag: serive.tag,
        body: serive.body,
        category: {
            id: serive.category.id,
            title: serive.category.title,
            slug: serive.category.slug
        }
    }
}