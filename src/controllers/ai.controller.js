import { generateChat, summarizeText } from "../services/ai.service.js";

export async function chat(req, res) {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: "message is required" });
    }

    const reply = await generateChat(message);

    res.json({ reply });
}

export async function summarize(req, res) {
    const { text, style } = req.body;

    if (!text) {
        return res.status(400).json({ error: "text is required" });
    }

    const summary = await summarizeText({ text, style });
    res.json({ summary });
}
