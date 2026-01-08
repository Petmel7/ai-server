export const FEW_SHOT_EXAMPLES = {
    default: [],

    fitness: [
        {
            role: "user",
            parts: [{ text: "Склади простий план тренувань для початківця." }],
        },
        {
            role: "model",
            parts: [
                {
                    text: [
                        "Ось приклад простого плану:",
                        "1. Розминка – 5 хвилин",
                        "2. Присідання – 3×10",
                        "3. Віджимання – 3×8",
                        "4. Планка – 3×20 сек",
                        "5. Розтяжка – 5 хвилин",
                    ].join("\n"),
                },
            ],
        },
    ],

    classify: [
        {
            role: "user",
            parts: [
                {
                    text: JSON.stringify({
                        text: "Цей телефон дуже повільний і постійно зависає",
                        labels: ["positive", "negative", "neutral"],
                    }),
                },
            ],
        },
        {
            role: "model",
            parts: [{ text: JSON.stringify({ label: "negative" }) }],
        },
    ],

    summarize: [
        {
            role: "user",
            parts: [
                {
                    text: "Скороти текст у 3 ключові пункти. Текст: React — це бібліотека для побудови UI.",
                },
            ],
        },
        {
            role: "model",
            parts: [
                {
                    text: [
                        "1. React — бібліотека для UI",
                        "2. Дозволяє будувати компоненти",
                        "3. Використовується для SPA",
                    ].join("\n"),
                },
            ],
        },
    ],
};
