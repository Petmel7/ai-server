
import { useState } from "react";
import ChatTab from "./components/ChatTab";
import SummarizeTab from "./components/SummarizeTab";
import ClassifyTab from "./components/ClassifyTab";
import VisionTab from "./components/VisionTab";

export default function App() {
  const [tab, setTab] = useState("chat");

  return (
    <div style={{ padding: 20 }}>
      <h1>AI Dashboard</h1>

      <nav>
        <button onClick={() => setTab("chat")}>Chat</button>
        <button onClick={() => setTab("summarize")}>Summarize</button>
        <button onClick={() => setTab("classify")}>Classify</button>
        <button onClick={() => setTab("vision")}>Vision</button>
      </nav>

      <hr />

      {tab === "chat" && <ChatTab />}
      {tab === "summarize" && <SummarizeTab />}
      {tab === "classify" && <ClassifyTab />}
      {tab === "vision" && <VisionTab />}
    </div>
  );
}

