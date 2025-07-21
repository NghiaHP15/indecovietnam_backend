import cors from "cors";
import express from "express";
import routes from "./routes";
import corsMiddleware from "./middlewares/cors.middleware";
import cookieParser from "cookie-parser";

const app = express();
app.use(corsMiddleware)
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL, // hoặc domain thật nếu deploy frontend
  credentials: true,               // nếu dùng cookie / axios withCredentials
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

routes(app);

export default app;