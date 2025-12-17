
import { buildChatPrompt } from "../prompts/promptBuilder.js";
import { buildSummarizePrompt } from "../prompts/summarizePrompts.js";
import { buildClassificationPrompt } from "../prompts/classifyPrompt.js";
import { runGemini } from "./geminiExecutor.js";
import { safeJsonParse } from "../utils/parseJson.js";

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

export async function classifyText({ text, labels }) {
    const contents = buildClassificationPrompt({ text, labels });

    const response = await runGemini({
        contents,
        temperature: 0,
        maxOutputTokens: 50,
    });

    return safeJsonParse(response);
}
