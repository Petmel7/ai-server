import { useState } from "react";
import { vision } from "../api/ai";

export default function VisionTab() {
    const [file, setFile] = useState(null);
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!file) return;

        setLoading(true);
        try {
            const res = await vision(file);
            setResult(res.description || res.result || JSON.stringify(res, null, 2));
        } catch (err) {
            setResult("Error analyzing image", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Vision</h2>

            <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
            />

            <button onClick={handleSubmit} disabled={loading}>
                {loading ? "Analyzing..." : "Analyze image"}
            </button>

            {result && <pre>{result}</pre>}
        </div>
    );
}
