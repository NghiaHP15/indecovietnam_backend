import { AppDataSource } from "../database/data-source";
import { Role } from "../entity/Role";

export const roleRepo = AppDataSource.getRepository(Role);