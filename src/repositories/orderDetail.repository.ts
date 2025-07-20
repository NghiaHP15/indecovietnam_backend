import { AppDataSource } from "../database/data-source";
import { OrderDetail } from "../entity/OrderDetail";

export const orderDetailRepo = AppDataSource.getRepository(OrderDetail);