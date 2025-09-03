import { WebSocketServer, WebSocket } from "ws";
import type { Server as HttpServer } from "http"; 

let wss: WebSocketServer | undefined;

export const initWebSocket = (server: HttpServer) => {
  wss = new WebSocketServer({ server });
  wss.on("connection", (ws: WebSocket) => {
    console.log("Admin connected");
    ws.on("message", (msg) => {
      console.log("📩 Received:", msg);
      wss?.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(`Echo: ${msg}`);
        }
      });
    });
  });
};

export const broadcast = (data: any) => {
  if (!wss) return;

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};
