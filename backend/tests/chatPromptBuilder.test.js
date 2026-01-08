
// import { describe, test, expect } from "vitest";
// import { buildChatPrompt } from "../src/prompts/promptBuilder.js";

// describe("buildChatPrompt", () => {
//     test("builds valid Gemini contents", () => {
//         const contents = buildChatPrompt({
//             role: "default",
//             userMessage: "Hello",
//         });

//         expect(Array.isArray(contents)).toBe(true);
//         expect(contents.length).toBeGreaterThan(0);

//         for (const msg of contents) {
//             expect(msg).toHaveProperty("role");
//             expect(["user", "model"]).toContain(msg.role);
//             expect(msg.parts?.[0]?.text).toBeTruthy();
//         }
//     });
// });

