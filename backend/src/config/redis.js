import Redis from "ioredis";

export const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    retryStrategy: (times) => {
        if (times > 10) return null;
        return Math.min(times * 200, 2000);
    },
});

redis.on("connect", () => {
    console.log("🧠 Redis connected");
});

redis.on("error", (err) => {
    console.error("❌ Redis error:", err.message);
});
