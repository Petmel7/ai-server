let ws;

export function connectWS({ sessionId, onMessage }) {
    ws = new WebSocket("ws://localhost:5000");

    ws.onopen = () => {
        ws.send(JSON.stringify({
            type: "init",
            sessionId,
        }));
    };

    ws.onmessage = (e) => {
        const data = JSON.parse(e.data);

        if (data.type === "ready") {
            localStorage.setItem("wsSessionId", data.sessionId);
        }

        onMessage(data);
    };

    return ws;
}

export function sendChat(message) {
    ws.send(JSON.stringify({
        type: "chat",
        message,
    }));
}
