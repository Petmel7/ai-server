import { SYSTEM_PROMPTS } from "./systemPrompts.js";

export function buildConversationPrompt({
    role = "default",
    messages = [],
}) {
    if (!Array.isArray(messages) || messages.length === 0) {
        throw new Error("messages are required");
    }

    const contents = [
        {
            role: "user",
            parts: [{ text: SYSTEM_PROMPTS[role] }],
        },
    ];

    for (const msg of messages) {
        if (!msg.content?.trim()) continue;

        contents.push({
            role: msg.role === "assistant" ? "model" : "user",
            parts: [{ text: msg.content }],
        });
    }

    return contents;
}
