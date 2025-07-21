import { Request, Response } from "express";
import * as authService from "../services/authCustomer.service";
import { errorResponse, singleResponse } from "../utils/response";
import { LoginCustomerDto, RegisterCustomerDto, SocialLoginCustomerDto } from "../dto/customer.dto";

export const register = async (req: Request, res: Response) => {
  try {
    const dto: RegisterCustomerDto = req.body;
    dto.userAgent = req.headers["user-agent"] || "";
    const result = await authService.register(dto);
    const { refreshToken, accessToken, ...user} = result;
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    singleResponse(res,"Register success", { accessToken, user });
  } catch (err: any) {
    errorResponse(res, err);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const dto: LoginCustomerDto = req.body;
    dto.userAgent = req.headers["user-agent"] || "";
    const result = await authService.login(dto);
    const { refreshToken, accessToken, ...user} = result;
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    singleResponse(res,"Login success", { accessToken, user });
  } catch (err: any) {
    errorResponse(res, err);
  }
};

export const loginWithSocial = async (req: Request, res: Response) => {
  try {
    const dto: SocialLoginCustomerDto = req.body;
    dto.userAgent = req.headers["user-agent"] || "";
    const result = await authService.socialLogin(dto);
    const { refreshToken, accessToken, ...user} = result;
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    singleResponse(res,"Login success", { accessToken, user });
  } catch (err: any) {
    errorResponse(res, err);
  }
}

export const refresh = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;
  try {
    const result = await authService.refreshAccessToken(token);
    const { refreshToken, accessToken, ...user} = result;
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    singleResponse(res,"Login success", { accessToken, user });
  } catch (err: any) {
    errorResponse(res, err);
  }
};

export const logout = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  try {
    res.clearCookie("refreshToken");
    const user = await authService.logout(refreshToken);
    singleResponse(res,"Logout success", user);
  } catch (err: any) {
    errorResponse(res, err);
  }
};
