import { AppDataSource } from "../database/data-source";
import { Product } from "../entity/Product";

export const productRepo = AppDataSource.getRepository(Product);