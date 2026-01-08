import { trimMessagesToTokenLimit } from "../utils/tokenUtils.js";

const MAX_CHAT_TOKENS = 2500;

export function buildMemory(messages) {
    return trimMessagesToTokenLimit(messages, MAX_CHAT_TOKENS);
}
