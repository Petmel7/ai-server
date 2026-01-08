
import { useState } from "react";
import { useChat } from "../hooks/useChat";
import { inputClass, buttonClass } from "../styles/ui";

export default function ChatTab() {
    const [input, setInput] = useState("");
    const { messages, loading, sendMessage, clearChat, bottomRef } = useChat();

    return (
        <div className="bg-white p-6 rounded-xl shadow flex flex-col h-[600px]">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Chat</h2>
                <button
                    onClick={clearChat}
                    className="text-sm text-red-500 hover:underline"
                >
                    Clear chat
                </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                {messages
                    .filter(m => m.role !== "system")
                    .map((msg, i) => (
                        <div
                            key={i}
                            className={`max-w-[80%] p-3 rounded-lg text-sm whitespace-pre-wrap
                ${msg.role === "user"
                                    ? "ml-auto bg-blue-600 text-white"
                                    : "bg-gray-100 text-gray-900"}
              `}
                        >
                            {msg.content}
                        </div>
                    ))}

                {loading && (
                    <div className="text-sm italic text-gray-500">
                        Assistant is typing…
                    </div>
                )}

                <div ref={bottomRef} />
            </div>

            <div className="mt-4 flex gap-2">
                <input
                    className={inputClass}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && sendMessage(input) && setInput("")}
                    placeholder="Write a message..."
                />
                <button
                    className={buttonClass}
                    onClick={() => {
                        sendMessage(input);
                        setInput("");
                    }}
                    disabled={loading}
                >
                    Send
                </button>
            </div>
        </div>
    );
}
