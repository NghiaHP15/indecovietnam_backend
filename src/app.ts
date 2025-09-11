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
// app.use(cors({
//   origin: [
//     process.env.CLIENT_URL || "http://localhost:3000",
//     process.env.ADMIN_URL || "http://localhost:3001",
//   ],
//   credentials: true,               // nếu dùng cookie / axios withCredentials
// }));
const allowedOrigins = [
  process.env.CLIENT_URL || "http://localhost:3000",
  process.env.ADMIN_URL || "http://localhost:3001",
];

app.use(cors({
  origin: function (origin, callback) {
    // Nếu request không có origin (VD: Postman), cho phép luôn
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS: " + origin), false);
    }
  },
  credentials: true,
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

routes(app);

export default app;