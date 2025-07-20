import { AppDataSource } from "../database/data-source";
import { ProductCategory } from "../entity/ProductCategory";

export const productCategoryRepo = AppDataSource.getRepository(ProductCategory);