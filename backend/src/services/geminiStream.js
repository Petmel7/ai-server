import { gemini } from "../config/gemini.js";

export async function runGeminiStream({ contents, model = "gemini-2.5-flash" }) {
    const stream = await gemini.models.generateContentStream({
        model,
        contents,
    });

    if (!stream?.[Symbol.asyncIterator]) {
        throw new Error("Gemini SDK did not return a stream");
    }

    return stream;
}
