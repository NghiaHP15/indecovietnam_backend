import { AppDataSource } from "../database/data-source";
import { Notification } from "../entity/Notification";

export const notificationRepo = AppDataSource.getRepository(Notification);