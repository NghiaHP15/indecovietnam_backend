import { AppDataSource } from "../database/data-source";
import { Employee } from "../entity/Employee";

export const employeeRepo = AppDataSource.getRepository(Employee);