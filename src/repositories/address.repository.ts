import { AppDataSource } from "../database/data-source";
import { Address } from "../entity/Address";

export const addressRepo = AppDataSource.getRepository(Address)