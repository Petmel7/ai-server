import { useState } from "react";
import { chat } from "../api/ai";
import { inputClass, buttonClass } from "../styles/ui";

export default function ChatTab() {
    const [input, setInput] = useState("");
    const [answer, setAnswer] = useState("");

    const handleSend = async () => {
        const res = await chat(input);
        setAnswer(res.reply);
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Chat</h2>
            <input
                className={inputClass}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Write a message..."
            />
            <button
                className={`${buttonClass} mt-3`}
                onClick={handleSend}
            >Send
            </button>

            {answer &&
                <pre className="mt-4 p-4 bg-gray-50 rounded-lg text-sm whitespace-pre-wrap">
                    {answer}
                </pre>}
        </div>
    );
}
