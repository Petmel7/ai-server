
import { gemini } from "../config/gemini.js";

export async function* runGeminiStream({
    contents,
    model = "gemini-2.5-flash",
    temperature = 0.4,
    maxOutputTokens = 800,
}) {
    const stream = await gemini.models.generateContentStream({
        model,
        contents,
        generationConfig: {
            temperature,
            maxOutputTokens,
        },
    });

    for await (const chunk of stream) {
        const text =
            chunk?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (text) {
            yield text;
        }
    }
}

