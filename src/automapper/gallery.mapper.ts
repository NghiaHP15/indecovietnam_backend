import { ResponseGalleryDto } from "../dto/gallery.dto"
import { Gallery } from "../entity/Gallery"

export const toResponseGalleryDto = (gallery: Gallery): ResponseGalleryDto => {
    return {
        id: gallery.id,
        title: gallery.title,
        href: gallery.href,
        description: gallery.desciption,
        image: gallery.image,
        type: gallery.type
    }
}