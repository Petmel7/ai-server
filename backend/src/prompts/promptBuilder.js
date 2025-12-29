import { SYSTEM_PROMPTS } from "./systemPrompts.js";
import { FEW_SHOT_EXAMPLES } from "./fewShotExamples.js";

export function buildChatPrompt({ role, userMessage }) {
    return [
        {
            role: "user",
            parts: [{ text: SYSTEM_PROMPTS[role] ?? SYSTEM_PROMPTS.default }],
        },
        ...(FEW_SHOT_EXAMPLES[role] ?? []),
        {
            role: "user",
            parts: [{ text: userMessage }],
        },
    ];
}
