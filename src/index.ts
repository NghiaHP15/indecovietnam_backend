import app from "./app";
import { AppDataSource } from "./database/data-source";

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