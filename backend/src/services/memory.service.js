
import { redis } from "../config/redis.js";

const TTL = 60 * 60 * 24; // 24h

export async function addMessage(conversationId, role, content) {
    const key = `chat:${conversationId}:messages`;

    await redis.rpush(key, JSON.stringify({ role, content }));
    await redis.expire(key, TTL);
}

export async function getMessages(conversationId) {
    const key = `chat:${conversationId}:messages`;
    const raw = await redis.lrange(key, 0, -1);
    return raw.map(JSON.parse);
}

export async function incrementMessageCount(conversationId) {
    return redis.incr(`conv:${conversationId}:count`);
}

export async function clearMessages(conversationId) {
    const keys = [
        `conv:${conversationId}:messages`,
        `conv:${conversationId}:count`,
        `chat:${conversationId}:messages`,
        `chat:${conversationId}:trimCount`,
    ];

    await redis.del(...keys);

    console.log("🧹 Cleared messages for conversation:", conversationId);
}


