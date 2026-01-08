
export function buildChatPrompt({
    systemPrompt,
    summary,
    messages,
}) {
    const contents = [];

    if (systemPrompt) {
        contents.push({
            role: "user",
            parts: [{ text: systemPrompt }],
        });
    }

    if (summary) {
        contents.push({
            role: "user",
            parts: [{ text: `Conversation summary:\n${summary}` }],
        });
    }

    for (const m of messages) {
        contents.push({
            role: "user",
            parts: [{ text: `${m.role}: ${m.content}` }],
        });
    }

    return contents;
}

