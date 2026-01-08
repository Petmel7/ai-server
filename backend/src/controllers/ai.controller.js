import { summarizeText, classifyText, analyzeImage } from "../services/ai.service.js";

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

export async function vision(req, res, next) {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "Image file is required" });
        }

        const result = await analyzeImage({
            buffer: req.file.buffer,
            mimeType: req.file.mimetype,
        });

        res.json(result);
    } catch (err) {
        next(err);
    }
}