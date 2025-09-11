import { Request, Response, NextFunction } from "express";

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  process.env.CLIENT_URL,
  process.env.ADMIN_URL
];

const corsMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  res.header("Access-Control-Allow-Origin", allowedOrigins.includes(req.headers.origin) ? req.headers.origin : "");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");

  if (req.method === "OPTIONS") {
    res.sendStatus(200); // ✅ Không cần return kiểu Response
  } else {
    next();
  }
};

export default corsMiddleware;