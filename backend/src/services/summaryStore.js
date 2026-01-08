import { redis } from "../config/redis.js";

export async function saveSummary(conversationId, summary) {
    const key = `conversation:summary:${conversationId}`;
    await redis.set(key, summary, "EX", 60 * 60 * 24 * 7);
}

export async function getSummary(conversationId) {
    return redis.get(`conversation:summary:${conversationId}`);
}

export async function setSummary(conversationId, summary) {
    return redis.set(`conv:${conversationId}:summary`, summary);
}
