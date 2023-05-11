import express from "express";
import cors from "cors";
import { WebSocket, WebSocketServer } from "ws";

const app = express();
app.use(cors());

const server = app.listen(3000, () =>
  console.log("server running on port 3000")
);

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  // Server sending message on connection with the client
  ws.send("Hello From server");

  // When the client send a message to the server
  ws.on("message", (data) => {
    // const messageUser = JSON.parse(data.toString());
    wss.clients.forEach((wsClient) => {
      if (wsClient !== ws && wsClient.readyState === WebSocket.OPEN) {
        wsClient.send(JSON.stringify({ message: data })); // separar lógica do JSON?
      }
    });
  });

  // On error
  ws.on("error", (err) => console.log(err));
});
