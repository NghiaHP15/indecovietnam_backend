import { AppDataSource } from "../database/data-source";
import { BlogCategory } from "../entity/BlogCategory";

export const blogCategoryRepo = AppDataSource.getRepository(BlogCategory);