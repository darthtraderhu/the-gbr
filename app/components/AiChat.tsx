"use client";

import { useState, useRef, useEffect } from "react";

type ChatMessage = { sender: "user" | "ai"; text: string };

export default function AiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: "ai",
      text: "Üdvözlöm. Én a THE GBR neurális asszisztense vagyok. Milyen rendszer architektúrára van szüksége?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // VALÓDI API HÍVÁS AZ OPENAI FELÉ
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg = inputValue;
    const currentHistory = [...messages]; // Elmentjük a memóriát

    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setInputValue("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          history: currentHistory,
        }),
      });

      const data = await response.json();
      setMessages((prev) => [...prev, { sender: "ai", text: data.reply }]);
    } catch (error) {
      console.error("Chat hívási hiba:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "SYS.ERROR: Hálózati hiba lépett fel." },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-28 md:bottom-6 right-4 md:right-6 z-[100] font-mono">
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-[320px] sm:w-[380px] bg-[#050505] border border-white/20 rounded-xl shadow-[0_0_40px_rgba(231,255,0,0.15)] overflow-hidden flex flex-col transform transition-all duration-300 origin-bottom-right">
          <div className="bg-[#0a0a0a] border-b border-white/10 px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#e7ff00] animate-pulse"></span>
              <span className="text-[10px] text-gray-300 uppercase tracking-widest font-bold">
                Sys: GBR_AI_NODE
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>

          <div className="h-[350px] p-4 overflow-y-auto flex flex-col gap-4 bg-cubes-pattern bg-opacity-5 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] pointer-events-none"></div>

            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`relative z-10 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded text-xs leading-relaxed ${msg.sender === "user" ? "bg-white/10 text-white border border-white/5 rounded-br-none" : "bg-[#e7ff00]/10 text-[#e7ff00] border border-[#e7ff00]/20 rounded-bl-none"}`}
                >
                  {msg.sender === "ai" && (
                    <div className="text-[8px] font-black uppercase tracking-widest mb-1 opacity-50">
                      GBR_AI
                    </div>
                  )}
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start relative z-10">
                <div className="bg-[#e7ff00]/10 border border-[#e7ff00]/20 p-3 rounded rounded-bl-none flex gap-1 items-center">
                  <div
                    className="w-1.5 h-1.5 bg-[#e7ff00] rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-1.5 h-1.5 bg-[#e7ff00] rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="w-1.5 h-1.5 bg-[#e7ff00] rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={handleSendMessage}
            className="border-t border-white/10 bg-[#0a0a0a] p-3 flex gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Adjon meg egy parancsot..."
              className="flex-1 bg-transparent border-none text-xs text-white focus:outline-none focus:ring-0 placeholder-gray-600"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="p-2 bg-[#e7ff00] text-black rounded hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative flex items-center justify-center w-14 h-14 rounded-full bg-[#0a0a0a] border-2 ${isOpen ? "border-white/20 text-gray-500" : "border-[#e7ff00] text-[#e7ff00] shadow-[0_0_20px_rgba(231,255,0,0.3)] hover:scale-110"} transition-all duration-300 group`}
      >
        {!isOpen && (
          <>
            <span className="absolute inset-0 rounded-full border border-[#e7ff00] animate-ping opacity-20"></span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              ></path>
            </svg>
            <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-[#050505] border border-white/10 px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center gap-2 whitespace-nowrap hidden md:flex">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e7ff00] animate-pulse"></span>
              <span className="text-[9px] uppercase tracking-widest text-white">AI Segéd</span>
            </div>
          </>
        )}
        {isOpen && (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        )}
      </button>
    </div>
  );
}
