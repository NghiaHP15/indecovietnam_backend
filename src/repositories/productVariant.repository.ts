import { AppDataSource } from "../database/data-source";
import { ProductVariant } from "../entity/ProductVariant";

export const productVariantRepo = AppDataSource.getRepository(ProductVariant);