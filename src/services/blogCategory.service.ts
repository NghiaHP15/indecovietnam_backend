import { Like, Raw } from 'typeorm';
import { CreateBlogCategoryDto, QueryBlogCategoryDto, ResponseBlogCategoryDto, UpdateBlogCategoryDto } from '../dto/blogCategory.dto';
import { blogCategoryRepo } from '../repositories/blogCategory.repository';
import { toResponseBlogCategoryDto } from '../automapper/blogCategory.mapper';
import { generateNormalized, generateSlug } from '../config/contant';

export const getAllBlogCategories = async (query: QueryBlogCategoryDto): Promise<ResponseBlogCategoryDto[]> => {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const where = {
      ...(query.search ? { 
        title_normalized: Raw(alias => `${alias} LIKE :search`, {
          search: `%${generateNormalized(query.search).toLowerCase()}%`
        }),
      } : {}),
    }

    const [productCategories] = await blogCategoryRepo.findAndCount({ 
        where,
        order: {
            [query.sortBy || 'created_at']: query.order || 'desc',
        },
        take: limit,
        skip
    });
    return productCategories.map(toResponseBlogCategoryDto);
};

export const getBlogCategoryById = async (id: string): Promise<ResponseBlogCategoryDto | null> => {
  const blogCategory = await blogCategoryRepo.findOne({ 
    where: { id },
  });
  return blogCategory ? toResponseBlogCategoryDto(blogCategory) : null;
};

export const CreateBlogCategory = async (dto: CreateBlogCategoryDto): Promise<ResponseBlogCategoryDto> => {
  dto.slug = generateSlug(dto.title);
  const blogCategory = blogCategoryRepo.create({ ...dto });
  await blogCategoryRepo.save(blogCategory);
  return toResponseBlogCategoryDto(blogCategory);
}

export const updateBlogCategory = async (id: string, dto: UpdateBlogCategoryDto): Promise<ResponseBlogCategoryDto | null> => {
  const blogCategory = await blogCategoryRepo.findOneBy({ id });
  if (!blogCategory) return null;
  Object.assign(blogCategory, dto);
  blogCategory.slug = generateSlug(dto.title);
  await blogCategoryRepo.save(blogCategory);
  return toResponseBlogCategoryDto(blogCategory);
};

export const deleteProductCategory = async (id: string): Promise<boolean> => {
  const result = await blogCategoryRepo.delete({ id });
  return result.affected !== 0; // Trả về true nếu có bản ghi bị xóa
};