import { WebSocketServer } from "ws";
import crypto from "crypto";
import { redis } from "../config/redis.js";
import { handleMessage } from "./wsHandlers.js";

const SESSION_TTL = 60 * 60; // 1 hour

export function initWebSocketServer(httpServer) {
    const wss = new WebSocketServer({
        server: httpServer,
        path: "/ws",
    });

    wss.on("connection", async (ws, req) => {
        try {
            const url = new URL(req.url, "http://localhost");
            let sessionId = url.searchParams.get("sessionId");

            if (!sessionId) {
                sessionId = crypto.randomUUID();
            }

            let conversationId = await redis.get(`ws:session:${sessionId}`);

            if (!conversationId) {
                conversationId = crypto.randomUUID();

                await redis.set(
                    `ws:session:${sessionId}`,
                    conversationId,
                    "EX",
                    SESSION_TTL
                );
            }

            ws.sessionId = sessionId;
            ws.conversationId = conversationId;

            console.log("🔌 WS connected");
            console.log("🧠 sessionId:", sessionId);
            console.log("🧠 conversationId:", conversationId);

            ws.send(JSON.stringify({
                type: "ready",
                sessionId,
                conversationId,
            }));

            ws.on("message", raw => {
                handleMessage(ws, raw);
            });

            ws.on("close", () => {
                console.log("❌ WS disconnected", sessionId);
            });

        } catch (err) {
            console.error("WS connection error:", err);
            ws.close();
        }
    });

    console.log("⚡ WebSocket server ready on /ws");
}


