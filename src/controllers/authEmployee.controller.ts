import { Request, Response } from "express";
import { LoginEmployeeDto } from "../dto/employee.dto";
import * as authService from "../services/authEmployee.service";
import { errorResponse, singleResponse } from "../utils/response";

export const login = async (req: Request, res: Response) => {
  try {
    const dto: LoginEmployeeDto = req.body;
    const result = await authService.login(dto);
    const { token, user} = result;
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    singleResponse(res,"Login success", { token, user });
  } catch (err: any) {
    errorResponse(res, err);
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token");
    singleResponse(res,"Logout success", null);
  } catch (err: any) {
    errorResponse(res, err);
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const result = await authService.resetPassword(req.body);
    singleResponse(res,"Mật khẩu đã được thay đổi", result);
  } catch (err: any) {
    errorResponse(res, err);
  }
};