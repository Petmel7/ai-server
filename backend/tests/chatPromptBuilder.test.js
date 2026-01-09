import { describe, it, expect } from "vitest";
import { buildChatPrompt } from "../src/prompts/promptBuilder.js";

describe("buildChatPrompt", () => {
    it("includes system, summary and recent messages", () => {
        const contents = buildChatPrompt({
            systemPrompt: "You are helpful",
            summary: "User wants fitness plans",
            messages: [
                { role: "user", content: "Hi" },
                { role: "assistant", content: "Hello" },
                { role: "user", content: "Plan workout" },
            ],
        });

        expect(contents.length).toBeGreaterThan(0);

        expect(contents[0].parts[0].text).toContain("You are helpful");
        expect(contents[1].parts[0].text).toContain("Conversation summary");
        expect(contents.at(-1).parts[0].text).toBe("Plan workout");
    });

    it("maps assistant role to model", () => {
        const contents = buildChatPrompt({
            messages: [{ role: "assistant", content: "Answer" }],
        });

        expect(contents[0].role).toBe("model");
    });
});


