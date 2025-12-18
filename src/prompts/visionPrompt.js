export function buildVisionPrompt() {
    return [
        {
            role: "user",
            parts: [
                {
                    text: `
You are an AI system that analyzes images.

Tasks:
- Describe the image
- Explain what is happening in the scene
- List visible objects clearly

Respond in JSON only.
Format:
{
  "description": "...",
  "scene": "...",
  "objects": ["...", "..."]
}
          `.trim(),
                },
            ],
        },
    ];
}
