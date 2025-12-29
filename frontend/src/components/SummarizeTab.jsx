import { useState } from "react";
import { classify } from "../api/ai";

export default function ClassifyTab() {
    const [text, setText] = useState("");
    const [labels, setLabels] = useState("positive,negative,neutral");
    const [result, setResult] = useState("");

    const handleClassify = async () => {
        const res = await classify(
            text,
            labels.split(",").map(l => l.trim())
        );
        setResult(res.label);
    };

    return (
        <div>
            <h2>Classify</h2>

            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Text to classify"
            />

            <input
                value={labels}
                onChange={(e) => setLabels(e.target.value)}
                placeholder="labels,comma,separated"
            />

            <button onClick={handleClassify}>Classify</button>

            {result && <p>Result: <b>{result}</b></p>}
        </div>
    );
}
