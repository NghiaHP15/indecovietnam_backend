import jwt, { JwtPayload } from "jsonwebtoken";

interface otpPayload extends JwtPayload { 
    otp: number,
    email: string,
}

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string || "indeco-access-token-secret";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string || "indeco-refresh-token-secret";
const JWT_SECRET = process.env.JWT_SECRET as string;

export const generateAccessToken = (payload: object) => jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "30m" });
export const generateRefreshToken = (payload: object) => jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
export const generateOtp = (payload: object) => jwt.sign(payload, JWT_SECRET, { expiresIn: "5m" });
export const verifyAccessToken = (token: string) => jwt.verify(token, ACCESS_TOKEN_SECRET);
export const verifyRefreshToken = (token: string) => jwt.verify(token, REFRESH_TOKEN_SECRET);
export const verifyOtp = (token: string) => jwt.verify(token, JWT_SECRET) as otpPayload;