import { AppDataSource } from "../database/data-source";
import { ServiceCategory } from "../entity/ServiceCategory";

export const serviceCategoryRepo = AppDataSource.getRepository(ServiceCategory);