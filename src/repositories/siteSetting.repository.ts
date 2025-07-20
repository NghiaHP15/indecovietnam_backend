import { AppDataSource } from "../database/data-source";
import { SiteSetting } from "../entity/SiteSetting";

export const siteSettingRepo = AppDataSource.getRepository(SiteSetting);