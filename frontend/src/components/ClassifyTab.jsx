import { useState } from "react";
import { summarize } from "../api/ai";
import { inputClass, buttonClass } from "../styles/ui";

export default function SummarizeTab() {
    const [text, setText] = useState("");
    const [result, setResult] = useState("");

    const handleSummarize = async () => {
        const res = await summarize(text, "short");
        setResult(res.summary);
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Summarize</h2>

            <textarea
                rows={6}
                className={inputClass}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste long text here..."
            />

            <button
                className={`${buttonClass} mt-3`}
                onClick={handleSummarize}>
                Summarize
            </button>

            {result &&
                <pre className="mt-4 p-4 bg-gray-50 rounded-lg text-sm">
                    {result}
                </pre>}
        </div>
    );
}
