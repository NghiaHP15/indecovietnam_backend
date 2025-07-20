import { AppDataSource } from "../database/data-source";
import { RoomCategory } from "../entity/RoomCategory";

export const roomCategoryRepo = AppDataSource.getRepository(RoomCategory);