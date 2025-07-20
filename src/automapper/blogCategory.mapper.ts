import { ResponseBlogCategoryDto } from "../dto/blogCategory.dto"
import { BlogCategory } from "../entity/BlogCategory"

export const toResponseBlogCategoryDto = (blogCategory: BlogCategory): ResponseBlogCategoryDto => {
    return {
        id: blogCategory.id,
        title: blogCategory.title,
        slug: blogCategory.slug,
        description: blogCategory.description
    }
}