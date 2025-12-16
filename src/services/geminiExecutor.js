import { gemini } from "../config/gemini.js";

const DEFAULTS = {
    models: [
        "gemini-2.5-flash",
        "gemini-2.5-flash-lite",
        "gemini-2.5-pro"
    ],
    temperature: 0.4,
    maxOutputTokens: 600,
    maxRetries: 3,
    baseDelayMs: 500,
};

export async function runGemini({
    contents,
    temperature = DEFAULTS.temperature,
    maxOutputTokens = DEFAULTS.maxOutputTokens,
    models = DEFAULTS.models,
}) {
    let lastError;

    for (const model of models) {
        for (let attempt = 1; attempt <= DEFAULTS.maxRetries; attempt++) {
            try {
                const result = await gemini.models.generateContent({
                    model,
                    contents,
                    generationConfig: {
                        temperature,
                        maxOutputTokens,
                    },
                });

                return result.text;
            } catch (err) {
                lastError = err;

                if (err?.status !== 503) {
                    throw err;
                }

                if (attempt === DEFAULTS.maxRetries) {
                    break;
                }

                const delay = DEFAULTS.baseDelayMs * attempt;
                await sleep(delay);
            }
        }
    }

    throw lastError;
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}