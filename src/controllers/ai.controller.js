import { generateChat, summarizeText, classifyText } from "../services/ai.service.js";

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

export async function classify(req, res, next) {
    try {
        const { text, labels } = req.body;

        if (!text || !labels?.length) {
            return res.status(400).json({ error: "text and labels are required" });
        }

        const result = await classifyText({ text, labels });
        res.json(result);
    } catch (err) {
        next(err);
    }
}

