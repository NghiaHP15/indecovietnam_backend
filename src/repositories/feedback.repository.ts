import { AppDataSource } from "../database/data-source";
import { Feedback } from "../entity/Feedback";

export const feedbackRepo = AppDataSource.getRepository(Feedback);