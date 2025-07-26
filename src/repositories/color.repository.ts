import { AppDataSource } from "../database/data-source";
import { Color } from "../entity/Color";


export const colorRepo = AppDataSource.getRepository(Color);