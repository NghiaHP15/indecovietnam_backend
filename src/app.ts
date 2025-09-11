import cors from "cors";
import express from "express";
import routes from "./routes";
import corsMiddleware from "./middlewares/cors.middleware";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import "./workers/email.worker"; 

dotenv.config();
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(corsMiddleware)
// app.use(cors());

routes(app);

export default app;