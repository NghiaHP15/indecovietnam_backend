import qs from "qs";
import crypto from "crypto";
import { Request } from "express";

/** ✅ Sắp xếp params theo key */
export const sortParams = (params: Record<string, any>): Record<string, any> => 
  Object.keys(params)
    .sort()
    .reduce((obj, key) => ({ ...obj, [key]: params[key] }), {});

/** ✅ Tạo chữ ký HMAC SHA512 */
export const createHmac = (params: Record<string, any>, secret: string): string => {
  const query = qs.stringify(params, { encode: false });
  return crypto.createHmac("sha512", secret).update(Buffer.from(query, "utf-8")).digest("hex");
};

export const getClientIp = (req: Request): string => {
  const rawIp =
    (req.headers["x-forwarded-for"] as string)?.split(",")[0].trim() ||
    req.socket.remoteAddress ||
    "127.0.0.1";
  return rawIp.replace("::1", "127.0.0.1").replace("::ffff:", "");
};
