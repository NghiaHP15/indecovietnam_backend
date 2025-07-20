import { AppDataSource } from "../database/data-source";
import { RefreshToken } from "../entity/RefreshToken";

export const refreshTokenRepo = AppDataSource.getRepository(RefreshToken);