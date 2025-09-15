import { AppDataSource } from "../database/data-source";
import { Policy } from "../entity/Policy";

export const policyRepo = AppDataSource.getRepository(Policy);