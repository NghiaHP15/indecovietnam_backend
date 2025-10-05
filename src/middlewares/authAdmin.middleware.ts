import { RequestHandler } from "express";
import { verifyAccessToken, verifyRefreshToken } from "../utils/jwt";

export const authAdminMiddleware: RequestHandler = (req, res, next) => {

  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const decoded = verifyRefreshToken(token);
    (req as any).user = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};
