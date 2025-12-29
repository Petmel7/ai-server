export const FEW_SHOT_EXAMPLES = {
    fitness: [
        {
            role: "user",
            parts: [{ text: "Склади план тренувань на 3 дні" }],
        },
        {
            role: "model",
            parts: [
                {
                    text: `
День 1: Груди + Трицепс
- Жим лежачи: 4x8
- Віджимання: 3x15

День 2: Спина + Біцепс
- Підтягування: 4x6

День 3: Ноги + Плечі
- Присідання: 4x10
          `.trim(),
                },
            ],
        },
    ],

    default: [],
};
