import { redis } from "../redis/redisClient.js";

export async function addMessage(conversationId, role, content) {
    const key = `chat:${conversationId}:messages`;
    await redis.rpush(key, JSON.stringify({ role, content }));
}

export async function getMessages(conversationId) {
    const key = `chat:${conversationId}:messages`;
    const raw = await redis.lrange(key, 0, -1);
    return raw.map(JSON.parse);
}

export async function incrementMessageCount(conversationId) {
    return redis.incr(`conv:${conversationId}:count`);
}

