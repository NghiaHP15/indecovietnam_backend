import { NextFunction, Request, Response } from "express";
// @ts-ignore
import { validationResult } from "express-validator";

export const handleValidationError = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      message: "Validation failed",
      errors: errors.array(),
    });
    return; // chỉ return để dừng hàm, KHÔNG return response
  }

  next();
};