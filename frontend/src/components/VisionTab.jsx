import { useState } from "react";
import { vision } from "../api/ai";
import { buttonClass } from "../styles/ui";

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
        <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Vision</h2>

            <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="block w-full text-sm text-gray-600
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-lg file:border-0
                            file:bg-blue-50 file:text-blue-700
                            hover:file:bg-blue-100"
            />

            <button
                className={`${buttonClass} mt-4`}
                onClick={handleSubmit}
                disabled={loading}>
                {loading ? "Analyzing..." : "Analyze image"}
            </button>

            {result && (
                <pre className="mt-4 p-4 bg-gray-50 rounded-lg text-sm">
                    {result}
                </pre>
            )}
        </div>
    );
}
