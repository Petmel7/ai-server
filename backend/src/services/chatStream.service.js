
import { addMessage, getMessages, incrementMessageCount } from "./memory.service.js";
import { getSummary } from "./summaryStore.js";
import { runGeminiStream } from "./geminiStreamExecutor.js";
import { buildChatPrompt } from "../prompts/promptBuilder.js";
import { SYSTEM_PROMPTS } from "../prompts/systemPrompts.js";
import { queueAutoSummary } from "./autoSummary.service.js";

const SUMMARY_EVERY = 8;

export async function streamChat({ ws, conversationId, message }) {
    // 1️⃣ save user message
    await addMessage(conversationId, "user", message);

    // 2️⃣ load memory
    const messages = await getMessages(conversationId);
    console.log("🧠 messages from Redis:", messages);

    const summary = await getSummary(conversationId);

    console.log("🧠 conversationId:", conversationId);

    // 3️⃣ build prompt (single source of truth)
    const contents = buildChatPrompt({
        systemPrompt: SYSTEM_PROMPTS.default,
        summary,
        messages,
    });

    console.log("🧠 PROMPT TO GEMINI:", contents);

    let assistantText = "";

    // 4️⃣ stream response
    for await (const chunk of runGeminiStream({ contents })) {
        assistantText += chunk;
        ws.send(JSON.stringify({ type: "chunk", text: chunk }));
    }

    ws.send(JSON.stringify({ type: "end" }));

    // 5️⃣ save assistant message
    await addMessage(conversationId, "assistant", assistantText);

    // 6️⃣ auto - summary trigger 👇
    const count = await incrementMessageCount(conversationId);

    if (count % SUMMARY_EVERY === 0) {
        // queueAutoSummary(conversationId);

        if (typeof queueAutoSummary === "function") {
            queueAutoSummary(conversationId);
        }
    }
}