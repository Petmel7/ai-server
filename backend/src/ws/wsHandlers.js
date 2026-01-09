import { streamChat } from "../services/chatStream.service.js";
import { clearMessages } from "../services/memory.service.js";
import { clearSummary } from "../services/summaryStore.js";

export async function handleMessage(ws, raw) {
    let data;

    try {
        data = JSON.parse(raw.toString());
    } catch {
        ws.send(JSON.stringify({
            type: "error",
            message: "Invalid JSON",
        }));
        return;
    }

    switch (data.type) {
        case "chat":
            if (!data.message?.trim()) return;

            return streamChat({
                ws,
                conversationId: ws.conversationId,
                message: data.message,
            });

        case "clear":
            await clearMessages(ws.conversationId);
            await clearSummary(ws.conversationId);

            ws.send(JSON.stringify({ type: "cleared" }));
            break;

        case "ping":
            ws.send(JSON.stringify({ type: "pong" }));
            break;

        default:
            ws.send(JSON.stringify({
                type: "error",
                message: "Unknown message type",
            }));
    }
}


