import { AppDataSource } from "../database/data-source";
import { Service } from "../entity/Service";

export const serviceRepo = AppDataSource.getRepository(Service);