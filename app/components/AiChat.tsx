"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useChatOpenRequests } from "./chat-bus";

type ChatMessage = { sender: "user" | "ai"; text: string };

const INITIAL_MESSAGE: ChatMessage = {
  sender: "ai",
  text: "Szia! Segítek eligazodni az oldalon. Kérlek, ne írj ide személyes adatot — ha ajánlatot szeretnél, a kapcsolati űrlap a jó hely.",
};

export default function AiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useChatOpenRequests(useCallback(() => setIsOpen(true), []));

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg = inputValue;
    const currentHistory = [...messages];

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
        { sender: "ai", text: "A kérés nem sikerült. Próbáld újra, vagy írj: gabor@thegbr.eu" },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* ===== ASZTALI INDÍTÓGOMB ===== */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          data-theme="dark"
          className="hidden md:flex fixed right-6 bottom-6 z-[70] items-center gap-[10px] px-5 py-[14px] border border-[var(--rule)] hover:border-[var(--signal)] transition-colors [font-family:var(--font-mono)] text-[10.5px] tracking-[0.18em] uppercase"
          style={{ backgroundColor: "var(--ground)", color: "var(--ink)" }}
        >
          <span className="w-[6px] h-[6px] bg-[var(--signal)] block animate-pulse" />
          Kérdésed van?
        </button>
      )}

      {/* ===== PANEL ===== */}
      {isOpen && (
        <div
          data-theme="dark"
          className="fixed z-[80] right-0 left-0 bottom-0 md:left-auto md:right-6 md:bottom-6 w-auto md:w-[400px] md:max-w-[calc(100vw-40px)] border-t md:border border-[var(--rule)] flex flex-col max-h-[88vh] md:max-h-[min(640px,calc(100vh-48px))]"
          style={{ backgroundColor: "var(--ground)", color: "var(--ink)" }}
        >
          <div className="flex items-center gap-3 px-[18px] py-[14px] border-b border-[var(--rule)]">
            <div>
              <div className="font-display font-bold text-[14px] tracking-[-0.02em]">GBR AI</div>
              <div className="[font-family:var(--font-mono)] text-[9px] tracking-[0.18em] uppercase text-[var(--dim)]">
                Válaszol · nem ajánl
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Bezárás"
              className="ml-auto text-[var(--mid)] hover:text-[var(--ink)] transition-colors [font-family:var(--font-mono)] text-[15px]"
            >
              ✕
            </button>
          </div>

          <div className="px-[18px] py-[10px] border-b border-[var(--rule)] [font-family:var(--font-mono)] text-[9px] tracking-[0.14em] uppercase text-[var(--dim)]">
            AI válaszol · árat és határidőt ember mond
          </div>

          <div className="px-[18px] py-[18px] overflow-y-auto flex-1">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`grid grid-cols-[64px_1fr] gap-3 py-[11px] border-b border-[color-mix(in_srgb,var(--rule)_60%,transparent)] last:border-b-0`}
              >
                <span
                  className={`[font-family:var(--font-mono)] text-[9px] tracking-[0.16em] uppercase pt-[3px] ${
                    msg.sender === "ai" ? "text-[var(--signal)]" : "text-[var(--dim)]"
                  }`}
                >
                  {msg.sender === "ai" ? "GBR AI" : "Te"}
                </span>
                <p
                  className={`m-0 text-[15px] leading-[1.55] ${
                    msg.sender === "ai" ? "text-[var(--ink-2)]" : "text-[var(--ink)]"
                  }`}
                >
                  {msg.text}
                </p>
              </div>
            ))}

            {isTyping && (
              <div className="grid grid-cols-[64px_1fr] gap-3 py-[11px]">
                <span className="[font-family:var(--font-mono)] text-[9px] tracking-[0.16em] uppercase text-[var(--signal)] pt-[3px]">
                  GBR AI
                </span>
                <p className="m-0 text-[15px] text-[var(--dim)] animate-pulse">…</p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={handleSendMessage}
            className="border-t border-[var(--rule)] flex items-center gap-[10px] px-[18px] py-[12px]"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Írj egy kérdést…"
              className="flex-1 bg-transparent border-0 text-[15px] py-[6px] text-[var(--ink)] placeholder:text-[var(--dim)] focus:outline-none"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="[font-family:var(--font-mono)] text-[11px] tracking-[0.1em] uppercase px-[14px] py-[9px] bg-[var(--signal)] text-[#101400] disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
            >
              Küld
            </button>
          </form>
        </div>
      )}
    </>
  );
}
