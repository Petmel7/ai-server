
import { redis } from "../config/redis.js";

const SUMMARY_TTL = 60 * 60 * 24; // 24h

export async function setSummary(conversationId, summary) {
    const key = `chat:${conversationId}:summary`;

    await redis.set(key, summary, "EX", SUMMARY_TTL);
}

export async function getSummary(conversationId) {
    return redis.get(`chat:${conversationId}:summary`);
}

export async function clearSummary(conversationId) {
    await redis.del(`conv:${conversationId}:summary`);
}

