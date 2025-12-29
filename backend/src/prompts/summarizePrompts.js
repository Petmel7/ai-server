export function buildSummarizePrompt({ text, style }) {
    return [
        {
            role: "user",
            parts: [
                {
                    text: `
Ти експерт з аналізу тексту.

ЗАВДАННЯ:
Скороти наведений текст у 3 ключові пункти.

ВИМОГИ:
- Пиши українською
- Формат: маркований список (3 пункти)
- Стиль: ${STYLE_INSTRUCTIONS[style] ?? STYLE_INSTRUCTIONS.short}
- Без вступів і висновків
- Без води

ТЕКСТ:
"""
${text}
"""
          `.trim(),
                },
            ],
        },
    ];
}

const STYLE_INSTRUCTIONS = {
    short: "максимально коротко, TL;DR",
    blog: "зрозуміло та читабельно для блогу",
    youtube: "як опис для YouTube відео, залучаюче",
};
