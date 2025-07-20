import cors from "cors";
import app from "./app";
import { AppDataSource } from "./database/data-source";

app.use(cors({
  origin: "http://localhost:3000", // hoặc domain thực tế của bạn
  credentials: true,               // cho phép cookie / auth header
}));

const PORT = process.env.PORT || 3001;

AppDataSource.initialize()
  .then(() => {
    console.log("📦 Connected to database");
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error during DB init", err);
  });