
import { buildChatPrompt } from "../prompts/promptBuilder.js";
import { buildSummarizePrompt } from "../prompts/summarizePrompts.js";
import { runGemini } from "./geminiExecutor.js";

export async function generateChat(message) {
    const contents = buildChatPrompt({
        role: "fitness",
        userMessage: message,
    });

    return runGemini({
        contents,
        temperature: 0.4,
        maxOutputTokens: 600,
    });
}

export async function summarizeText({ text, style }) {
    const contents = buildSummarizePrompt({ text, style });

    return runGemini({
        contents,
        temperature: 0.3,
        maxOutputTokens: 200,
    });
}