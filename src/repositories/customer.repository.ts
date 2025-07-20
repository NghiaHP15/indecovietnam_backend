import { AppDataSource } from "../database/data-source";
import { Customer } from "../entity/Customer";

export const customerRepo = AppDataSource.getRepository(Customer);