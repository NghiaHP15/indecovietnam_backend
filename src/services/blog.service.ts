import { Like } from 'typeorm';
import { CreateBlogDto, QueryBlogDto, ResponseBlogDto, UpdateBlogDto } from '../dto/blog.dto';
import { blogRepo } from '../repositories/blog.repository';
import { toResponseBlogDto } from '../automapper/blog.mapper';
import { generateSlug } from '../config/contant';

export const getAllBlogs = async (query: QueryBlogDto): Promise<ResponseBlogDto[]> => {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const where = {
      ...(query.search ? { title: Like(`%${query.search}%`) } : {}),
      ...(query.latest_blog ? { type: query.latest_blog } : {}),
    };

    const [blogs] = await blogRepo.findAndCount({ 
        where,
        relations: ['category', 'author'],
        order: {
            [query.sortBy || 'created_at']: query.order || 'desc',
        },
        take: limit,
        skip
    });
    console.log(blogs);
    
    return blogs.map(toResponseBlogDto);
};

export const getBlogById = async (id: string): Promise<ResponseBlogDto | null> => {
  const blogCategory = await blogRepo.findOne({ 
    where: { id },
    relations: ['category', 'author'],
  });
  return blogCategory ? toResponseBlogDto(blogCategory) : null;
};

export const CreateBlog = async (dto: CreateBlogDto): Promise<ResponseBlogDto> => {
  dto.slug = generateSlug(dto.title);
  const blog = blogRepo.create({ ...dto });
  await blogRepo.save(blog);
  return toResponseBlogDto(blog);
}

export const updateBlog = async (id: string, dto: UpdateBlogDto): Promise<ResponseBlogDto | null> => {
  const blog = await blogRepo.findOneBy({ id });
  if (!blog) return null;
  Object.assign(blog, dto);
  blog.slug = generateSlug(dto.title);
  await blogRepo.save(blog);
  return toResponseBlogDto(blog);
};

export const deleteBlog = async (id: string): Promise<boolean> => {
  const result = await blogRepo.delete({ id });
  return result.affected !== 0; // Trả về true nếu có bản ghi bị xóa
};