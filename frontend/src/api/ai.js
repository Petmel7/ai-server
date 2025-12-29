const API_URL = "http://localhost:5000/ai";

export async function chat(message) {
    const res = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
    });
    return res.json();
}

export async function summarize(text, style = "short") {
    const res = await fetch(`${API_URL}/summarize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, style }),
    });
    return res.json();
}

export async function classify(text, labels) {
    const res = await fetch(`${API_URL}/classify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, labels }),
    });
    return res.json();
}

export async function vision(imageFile) {
    const formData = new FormData();
    formData.append("image", imageFile);

    const res = await fetch(`${API_URL}/vision`, {
        method: "POST",
        body: formData,
    });

    return res.json();
}

