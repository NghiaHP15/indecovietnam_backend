import { AppDataSource } from "../database/data-source";
import { Menu } from "../entity/Menu";

export const menuRepo = AppDataSource.getRepository(Menu);