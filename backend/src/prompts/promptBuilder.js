// export function buildChatPrompt({ systemPrompt, summary, messages }) {
//     const contents = [];

//     if (systemPrompt) {
//         contents.push({
//             role: "user",
//             parts: [{ text: systemPrompt }],
//         });
//     }

//     if (summary) {
//         contents.push({
//             role: "user",
//             parts: [{ text: `Conversation summary:\n${summary}` }],
//         });
//     }

//     for (const m of messages) {
//         contents.push({
//             role: m.role === "assistant" ? "model" : "user", // 👈 КЛЮЧ
//             parts: [{ text: m.content }],
//         });
//     }

//     return contents;
// }


const RECENT_MESSAGES_LIMIT = 6;

export function buildChatPrompt({ systemPrompt, summary, messages }) {
    const contents = [];

    // system
    if (systemPrompt) {
        contents.push({
            role: "user",
            parts: [{ text: systemPrompt }],
        });
    }

    // summary
    if (summary) {
        contents.push({
            role: "user",
            parts: [{ text: `Conversation summary:\n${summary}` }],
        });
    }

    // 🔑 тільки останні N повідомлень
    const recent = messages.slice(-RECENT_MESSAGES_LIMIT);

    for (const m of recent) {
        contents.push({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: m.content }],
        });
    }

    return contents;
}
