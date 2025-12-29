import { useState } from "react";
import { chat } from "../api/ai";

export default function ChatTab() {
    const [input, setInput] = useState("");
    const [answer, setAnswer] = useState("");

    const handleSend = async () => {
        const res = await chat(input);
        setAnswer(res.reply);
    };

    console.log("answer", answer);

    return (
        <div>
            <h2>Chat</h2>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Write a message..."
            />
            <button onClick={handleSend}>Send</button>

            {answer && <pre>{answer}</pre>}
        </div>
    );
}
