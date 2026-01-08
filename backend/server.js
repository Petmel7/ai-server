import http from "http";
import app from "./src/app.js";
import { initWebSocketServer } from "./src/ws/wsServer.js";

const PORT = process.env.PORT;

if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is missing at startup");
}

const server = http.createServer(app);

initWebSocketServer(server);

server.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
