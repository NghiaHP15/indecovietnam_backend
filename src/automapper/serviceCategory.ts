import { ServiceCategory } from './../entity/ServiceCategory';
import { ResponseGalleryDto } from "../dto/gallery.dto"
import { Gallery } from "../entity/Gallery"
import { ResponseServiceCategoryDto } from '../dto/serviceCategory';

export const toResponseServiceCategoryDto = (serviceCategory: ServiceCategory): ResponseServiceCategoryDto => {
    return {
        id: serviceCategory.id,
        title: serviceCategory.title,
        slug: serviceCategory.slug,
        description: serviceCategory.description
    }
}