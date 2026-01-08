const AVG_CHARS_PER_TOKEN = 4;

export function estimateTokens(text = "") {
    return Math.ceil(text.length / AVG_CHARS_PER_TOKEN);
}

export function trimMessagesToTokenLimit(messages, maxTokens) {
    let total = 0;
    const trimmed = [];

    // йдемо з кінця (останні повідомлення важливіші)
    for (let i = messages.length - 1; i >= 0; i--) {
        const msg = messages[i];
        const tokens = estimateTokens(msg.content);

        if (total + tokens > maxTokens) break;

        total += tokens;
        trimmed.unshift(msg);
    }

    return trimmed;
}
