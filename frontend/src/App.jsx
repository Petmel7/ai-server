
import { useState } from "react";
import ChatTab from "./components/ChatTab";
import SummarizeTab from "./components/SummarizeTab";
import ClassifyTab from "./components/ClassifyTab";
import VisionTab from "./components/VisionTab";

export default function App() {
  const [tab, setTab] = useState("chat");

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">AI Dashboard</h1>

        <nav className="flex gap-2 mb-6">
          {["chat", "summarize", "classify", "vision"].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition
        ${tab === t
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-200"}
      `}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </nav>

        {tab === "chat" && <ChatTab />}
        {tab === "summarize" && <SummarizeTab />}
        {tab === "classify" && <ClassifyTab />}
        {tab === "vision" && <VisionTab />}
      </div>
    </div>
  );
}

