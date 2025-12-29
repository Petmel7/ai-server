import app from "./src/app.js";

const PORT = process.env.PORT;

if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is missing at startup");
}

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
