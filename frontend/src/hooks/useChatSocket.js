import { useEffect, useRef } from "react";

export function useChatSocket({ onChunk, onEnd, onError }) {
    const wsRef = useRef(null);

    const handlersRef = useRef({
        onChunk,
        onEnd,
        onError,
    });

    // 🔁 оновлюємо handlers БЕЗ пересоздання WS
    useEffect(() => {
        handlersRef.current = { onChunk, onEnd, onError };
    }, [onChunk, onEnd, onError]);

    useEffect(() => {
        const sessionId =
            localStorage.getItem("wsSessionId") ?? crypto.randomUUID();

        localStorage.setItem("wsSessionId", sessionId);

        const ws = new WebSocket(
            `ws://localhost:5000/ws?sessionId=${sessionId}`
        );

        ws.onopen = () => {
            console.log("✅ WS open");
        };

        ws.onmessage = event => {
            const data = JSON.parse(event.data);
            const h = handlersRef.current;

            if (data.type === "chunk") h.onChunk?.(data.text);
            if (data.type === "end") h.onEnd?.();
            if (data.type === "error") h.onError?.(data.message);
        };

        ws.onerror = err => {
            console.error("❌ WS error", err);
        };

        ws.onclose = () => {
            console.log("❌ WS closed");
        };

        wsRef.current = ws;

        return () => {
            ws.close();
        };
    }, []); // 👈 навмисно []

    const send = payload => {
        wsRef.current?.send(JSON.stringify(payload));
    };

    return { send };
}

