import app from "./app";
import { AppDataSource } from "./database/data-source";
import http from "http";
import { initWebSocket } from "./websocket/ws-server";

const PORT = process.env.PORT || 5000;
const server = http.createServer(app); // 👈 Tạo server từ Express

AppDataSource.initialize()
  .then(() => {
    console.log("📦 Connected to database");
    initWebSocket(server); // 👈 Gắn WebSocket
    server.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error during DB init", err);
  });