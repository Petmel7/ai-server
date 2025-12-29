import { useState } from "react";
import { summarize } from "../api/ai";

export default function SummarizeTab() {
    const [text, setText] = useState("");
    const [result, setResult] = useState("");

    const handleSummarize = async () => {
        const res = await summarize(text, "short");
        setResult(res.summary);
    };

    return (
        <div>
            <h2>Summarize</h2>

            <textarea
                rows={6}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste long text here..."
            />

            <button onClick={handleSummarize}>Summarize</button>

            {result && <pre>{result}</pre>}
        </div>
    );
}
