
import { buildSummarizePrompt } from "../prompts/summarizePrompts.js";
import { buildClassificationPrompt } from "../prompts/classifyPrompt.js";
import { buildVisionPrompt } from "../prompts/visionPrompt.js";
import { runGemini } from "./geminiExecutor.js";
import { safeJsonParse } from "../utils/parseJson.js";

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

export async function analyzeImage({ buffer, mimeType }) {
    const contents = buildVisionPrompt();

    contents[0].parts.push({
        inlineData: {
            data: buffer.toString("base64"),
            mimeType,
        },
    });

    const response = await runGemini({
        contents,
        temperature: 0.2,
        maxOutputTokens: 400,
    });

    return safeJsonParse(response);
}