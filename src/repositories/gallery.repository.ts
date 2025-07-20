import { AppDataSource } from "../database/data-source";
import { Gallery } from "../entity/Gallery";

export const galleryRepo = AppDataSource.getRepository(Gallery);