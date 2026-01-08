import { WebSocketServer } from "ws";
import crypto from "crypto";
import { redis } from "../config/redis.js";
import { handleMessage } from "./wsHandlers.js";

export function initWebSocketServer(httpServer) {
    const wss = new WebSocketServer({
        server: httpServer,
        path: "/ws",
    });

    wss.on("connection", async (ws, req) => {
        console.log("🔌 WS connected");

        const url = new URL(req.url, "http://localhost");
        const sessionId = url.searchParams.get("sessionId");

        let conversationId = null;

        if (sessionId) {
            conversationId = await redis.get(`ws:session:${sessionId}`);
        }

        if (!conversationId) {
            conversationId = crypto.randomUUID();
            if (sessionId) {
                await redis.set(
                    `ws:session:${sessionId}`,
                    conversationId
                );
            }
        }

        ws.conversationId = conversationId;

        console.log("🧠 conversationId:", conversationId);

        ws.on("message", async raw => {
            try {
                const data = JSON.parse(raw.toString());
                await handleMessage(ws, data);
            } catch (err) {
                ws.send(JSON.stringify({
                    type: "error",
                    message: err.message,
                }));
            }
        });

        ws.on("close", () => {
            console.log("❌ WS disconnected");
        });
    });

    console.log("⚡ WebSocket server ready on /ws");
}

