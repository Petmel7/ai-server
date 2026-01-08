import { getMessages } from "./memory.service.js";
import { getSummary, setSummary } from "./summaryStore.js";
import { runGemini } from "./geminiExecutor.js";
import { buildSummaryPrompt } from "../prompts/summaryPrompt.js";

const SUMMARY_MESSAGE_COUNT = 12;

export async function autoSummarizeConversation(conversationId) {
    const messages = await getMessages(conversationId);

    if (messages.length < SUMMARY_MESSAGE_COUNT) return null;

    const previousSummary = await getSummary(conversationId);

    const recentMessages = messages.slice(-SUMMARY_MESSAGE_COUNT);

    const contents = buildSummaryPrompt({
        previousSummary,
        messages: recentMessages,
    });

    const summary = await runGemini({
        contents,
        temperature: 0.2,
        maxOutputTokens: 200,
    });

    await setSummary(conversationId, summary);

    return summary;
}

const pending = new Set();

export function queueAutoSummary(conversationId) {
    if (pending.has(conversationId)) return;

    pending.add(conversationId);

    setTimeout(async () => {
        try {
            await autoSummarizeConversation(conversationId);
        } finally {
            pending.delete(conversationId);
        }
    }, 3000);
}
