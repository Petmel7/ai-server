
import { streamChat } from "../services/chatStream.service.js";

export async function handleMessage(ws, data) {
    switch (data.type) {
        case "chat":
            return streamChat({
                ws,
                conversationId: ws.conversationId,
                message: data.message,
            });

        case "clear":
            // later: clear conversation memory
            ws.send(JSON.stringify({ type: "cleared" }));
            break;

        default:
            ws.send(JSON.stringify({
                type: "error",
                message: "Unknown message type",
            }));
    }
}

