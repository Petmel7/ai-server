
export function buildClassificationPrompt({ text, labels }) {
    return [
        {
            role: "user",
            parts: [
                {
                    text: `
You are a professional text classification engine.

Rules:
- Classify the given text using ONLY the provided labels
- Choose the most appropriate label
- Respond ONLY with valid JSON
- Do not explain your reasoning
- Do not add extra text
          `.trim(),
                },
            ],
        },
        {
            role: "user",
            parts: [
                {
                    text: `
Text:
"${text}"

Labels:
${labels.join(", ")}

Return format:
{ "label": "<one_of_the_labels>" }
          `.trim(),
                },
            ],
        },
    ];
}
