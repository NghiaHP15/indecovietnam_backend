import cors from "cors";
import express from "express";
import routes from "./routes";
import corsMiddleware from "./middlewares/cors.middleware";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import "./workers/email.worker"; 

dotenv.config();
const app = express();
app.use(corsMiddleware)
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:3000", // client dev
  "http://localhost:3001", // admin dev
  process.env.CLIENT_URL, // client prod
  process.env.ADMIN_URL,  // admin prod
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // Cho phép Postman, curl, v.v.
      if (allowedOrigins.includes(origin)) {
        return callback(null, origin); // ✅ Trả đúng origin request
      }
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true, // nếu dùng cookie/authorization header
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

routes(app);

export default app;