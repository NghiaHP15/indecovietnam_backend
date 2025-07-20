import { ResponseBlogDto } from "../dto/blog.dto";
import { Blog } from "../entity/Blog";

export const toResponseBlogDto = (blog: Blog): ResponseBlogDto => {
    return {
        id: blog.id,
        title: blog.title,
        slug: blog.slug,
        image: blog.image,
        latest_blog: blog.latest_blog,
        body: blog.body,
        description: blog.description,
        tag: blog.tag,
        published_at: blog.published_at,
        created_at: blog.created_at,
        updated_at: blog.updated_at,
        category: {
            id: blog.category.id,
            title: blog.category.title,
            slug: blog.category.slug
        },
        author: {
            id: blog.author.id,
            fullname: blog.author.fullname
        }
    }
}