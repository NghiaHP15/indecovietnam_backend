import { AppDataSource } from "../database/data-source";
import { Order } from "../entity/Order";

export const orderRepo = AppDataSource.getRepository(Order);