
export function buildSummaryPrompt({ previousSummary, messages }) {
    const history = messages
        .map(m => `${m.role}: ${m.content}`)
        .join("\n");

    return [
        {
            role: "user",
            parts: [
                {
                    text: `
You are a memory compression system.

Previous summary:
${previousSummary ?? "None"}

Recent conversation:
${history}

TASK:
Write a concise updated summary (max 5 bullet points).
Focus on user intent, preferences, and important facts.
Ignore chit-chat.
          `.trim(),
                },
            ],
        },
    ];
}
