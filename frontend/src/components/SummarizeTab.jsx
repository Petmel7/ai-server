import { useState } from "react";
import { classify } from "../api/ai";
import { inputClass, buttonClass } from "../styles/ui";

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
        <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Classify</h2>

            <input
                className={`${inputClass} mb-2`}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Text to classify"
            />

            <input
                className={inputClass}
                value={labels}
                onChange={(e) => setLabels(e.target.value)}
                placeholder="labels,comma,separated"
            />

            <button
                className={`${buttonClass} mt-3`}
                onClick={handleClassify}>
                Classify
            </button>

            {result && (
                <div className="mt-4 text-lg">
                    Result:
                    <span className="ml-2 font-bold text-blue-600">{result}</span>
                </div>
            )}
        </div>
    );
}
