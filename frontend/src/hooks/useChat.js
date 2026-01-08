import { useEffect, useRef, useState } from "react";
import { useChatSocket } from "./useChatSocket";

const STORAGE_KEY = "ai-chat-history";
const MAX_MESSAGES = 20;

export function useChat() {
    const [messages, setMessages] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved
            ? JSON.parse(saved)
            : [{ role: "system", content: "You are a helpful AI assistant." }];
    });

    const [loading, setLoading] = useState(false);
    const bottomRef = useRef(null);

    /* ---------- WS ---------- */
    const { send } = useChatSocket({
        onChunk: text => {
            setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                    role: "assistant",
                    content: updated.at(-1).content + text,
                };
                return updated;
            });
        },
        onEnd: () => setLoading(false),
        onError: msg => {
            setLoading(false);
            console.error(msg);
        },
    });

    /* ---------- AUTO SCROLL ---------- */
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    /* ---------- STORAGE ---------- */
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }, [messages]);

    /* ---------- SEND MESSAGE ---------- */
    const sendMessage = input => {
        if (!input.trim() || loading) return;

        setMessages(prev => [
            ...prev,
            { role: "user", content: input },
            { role: "assistant", content: "" },
        ]);

        setLoading(true);

        send({
            type: "chat",
            message: input,
        });
    };

    /* ---------- CLEAR ---------- */
    const clearChat = () => {
        const system = messages.find(m => m.role === "system");
        setMessages(system ? [system] : []);
        localStorage.removeItem(STORAGE_KEY);
    };

    return {
        messages,
        loading,
        sendMessage,
        clearChat,
        bottomRef,
    };
}

