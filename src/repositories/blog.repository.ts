import { AppDataSource } from "../database/data-source";
import { Blog } from "../entity/Blog";

export const blogRepo = AppDataSource.getRepository(Blog)