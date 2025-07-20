import { AppDataSource } from "../database/data-source";
import { Paymentmethod } from "../entity/Paymentmethod";

export const paymentMethodRepo = AppDataSource.getRepository(Paymentmethod);