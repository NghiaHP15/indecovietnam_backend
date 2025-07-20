import { Request, Response } from "express";
import * as authService from "../services/authCustomer.service";
import { errorResponse, singleResponse } from "../utils/response";
import { LoginCustomerDto, RegisterCustomerDto, SocialLoginCustomerDto } from "../dto/customer.dto";

export const register = async (req: Request, res: Response) => {
  try {
    const dto: RegisterCustomerDto = req.body;
    dto.userAgent = req.headers["user-agent"] || "";
    const user = await authService.register(dto);
    singleResponse(res,"Register success", user);
  } catch (err: any) {
    errorResponse(res, err);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const dto: LoginCustomerDto = req.body;
    dto.userAgent = req.headers["user-agent"] || "";
    const user = await authService.login(dto);
    singleResponse(res,"Login success", user);
  } catch (err: any) {
    errorResponse(res, err);
  }
};

export const loginWithSocial = async (req: Request, res: Response) => {
  try {
    const dto: SocialLoginCustomerDto = req.body;
    dto.userAgent = req.headers["user-agent"] || "";
    const user = await authService.socialLogin(dto);
    singleResponse(res,"Login success", user);
  } catch (err: any) {
    errorResponse(res, err);
  }
}

export const refresh = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  try {
    const user = await authService.refreshAccessToken(refreshToken);
    singleResponse(res,"Login success", user);
  } catch (err: any) {
    errorResponse(res, err);
  }
};

export const logout = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  try {
    const user = await authService.logout(refreshToken);
    singleResponse(res,"Logout success", user);
  } catch (err: any) {
    errorResponse(res, err);
  }
};
