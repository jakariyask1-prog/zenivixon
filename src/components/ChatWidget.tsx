"use client";

import { useState, useRef, useEffect } from "react";

interface ChatWidgetProps {
  apiUrl?: string;
}

/**
 * Global helper to trigger the chat widget open from anywhere
 * (Navbar buttons, Hero section CTA, floating action pills, etc.)
 */
export function openZenivixonChat() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-zenivixon-chat"));
  }
}

export function toggleZenivixonChat() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("toggle-zenivixon-chat"));
  }
}

export default function ChatWidget({ apiUrl }: ChatWidgetProps = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(() => "session_" + Math.random().toString(36).substring(2, 10));
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    {
      role: "assistant",
      content: "Hello! I am the ZENIVIXON AI Consultant. How can I help you automate or grow your business today?",
    },
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const aiConsultantUrl = apiUrl || process.env.NEXT_PUBLIC_AI_CONSULTANT_URL || "https://zenivixon-ai-consultant.onrender.com";

  // Global event listener for external triggers (Navbar, Hero buttons)
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    const handleToggle = () => setIsOpen((prev) => !prev);
    window.addEventListener("open-zenivixon-chat", handleOpen);
    window.addEventListener("toggle-zenivixon-chat", handleToggle);
    return () => {
      window.removeEventListener("open-zenivixon-chat", handleOpen);
      window.removeEventListener("toggle-zenivixon-chat", handleToggle);
    };
  }, []);

  // Ping consultant backend in background to mitigate cold start
  useEffect(() => {
    fetch(aiConsultantUrl).catch(() => {});
  }, [aiConsultantUrl]);

  // নতুন মেসেজ এলে অটো-স্ক্রল করে নিচে চলে যাবে
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleResetSession = () => {
    setMessages([
      {
        role: "assistant",
        content: "Hello! I am the ZENIVIXON AI Consultant. How can I help you automate or grow your business today?",
      },
    ]);
    setSessionId("session_" + Math.random().toString(36).substring(2, 10));
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    
    // Add user message to UI
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    
    // Add empty assistant message to UI that we will stream text into
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);
    setIsLoading(true);

    try {
      const response = await fetch(`${aiConsultantUrl}/api/chat/stream`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, session_id: sessionId }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setIsLoading(false); // Stop bounce loader once stream starts
      
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      
      if (reader) {
        let done = false;
        let buffer = "";
        while (!done) {
          const { value, done: readerDone } = await reader.read();
          done = readerDone;
          if (value) {
            buffer += decoder.decode(value, { stream: true });
            
            let newlineIndex;
            // Parse complete events separated by \n\n
            while ((newlineIndex = buffer.indexOf("\n\n")) >= 0) {
              const chunk = buffer.slice(0, newlineIndex);
              buffer = buffer.slice(newlineIndex + 2);
              
              // Process each line in the chunk
              const lines = chunk.split("\n");
              for (const line of lines) {
                if (line.trim().startsWith("data: ")) {
                  const jsonStr = line.trim().substring(6);
                  if (jsonStr === "[DONE]") continue;
                  
                  try {
                    const data = JSON.parse(jsonStr);
                    if (data.content) {
                      setMessages((prev) => {
                        const lastIndex = prev.length - 1;
                        const lastMsg = prev[lastIndex];
                        // Skip duplicate chunks
                        if (lastMsg && lastMsg.content === data.content) {
                          return prev;
                        }
                        return prev.map((msg, i) =>
                          i === lastIndex
                            ? { ...msg, content: msg.content + data.content }
                            : msg
                        );
                      });
                    }
                  } catch (err) {
                    console.error("Error parsing stream chunk:", jsonStr, err);
                  }
                }
              }
            }
          }
        }
      }
    } catch {
      setIsLoading(false);
      const isBangla = /[\u0980-\u09FF]/.test(userMessage);
      const errorText = isBangla
        ? "সার্ভার এরর! দয়া করে কিছুক্ষণ পর আবার চেষ্টা করুন অথবা সরাসরি আমাদের সাথে যোগাযোগ করুন: contact@zenivixon.com"
        : "Unable to connect to the consultant service right now. Please try again shortly or contact us directly at contact@zenivixon.com.";

      setMessages((prev) => {
        const newMessages = [...prev];
        if (newMessages.length > 0 && newMessages[newMessages.length - 1].role === "assistant" && !newMessages[newMessages.length - 1].content) {
          newMessages[newMessages.length - 1].content = errorText;
        } else {
          newMessages.push({ role: "assistant", content: errorText });
        }
        return newMessages;
      });
    }
  };

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end pointer-events-none">
      {/* 🌟 Chat Window Container */}
      {isOpen && (
        <div className="relative group transition-all duration-300 transform origin-bottom-right pointer-events-auto">
          {/* 🌟 1. Ambient Cosmic Glow Aura around the entire chatbox */}
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 rounded-[30px] blur-xl opacity-35 group-hover:opacity-55 transition duration-700 animate-pulse -z-10 pointer-events-none" />

          {/* 🌟 2. Glowing Animated Gradient Border Frame */}
          <div className="p-[1.5px] bg-gradient-to-b from-blue-400/60 via-indigo-500/40 to-cyan-400/60 rounded-[28px] shadow-[0_20px_50px_-10px_rgba(15,23,42,0.85),0_0_30px_rgba(59,130,246,0.25)]">
            
            {/* 🌟 3. Main Chatbox Box with Backdrop Blur — Responsive across Web/PC, Tablet, Mobile */}
            <div className="w-[calc(100vw-2rem)] sm:w-[380px] md:w-[400px] h-[470px] sm:h-[500px] md:h-[520px] max-h-[calc(100dvh-90px)] sm:max-h-[calc(100dvh-115px)] bg-slate-950/95 dark:bg-slate-950/95 backdrop-blur-2xl rounded-[26px] flex flex-col overflow-hidden text-slate-100">
              
              {/* 🌟 4. Ultra-Premium Top Navbar / Header of Chat Widget */}
              <div className="relative bg-gradient-to-b from-slate-900/90 to-slate-950/90 backdrop-blur-xl border-b border-white/10 px-3.5 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between shadow-lg overflow-hidden shrink-0">
                {/* Ambient Top Light Beam */}
                <div className="absolute top-0 right-0 w-44 h-24 bg-gradient-to-bl from-blue-500/25 via-indigo-500/10 to-transparent blur-2xl pointer-events-none" />
                <div className="absolute top-0 left-1/4 w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

                {/* Left Brand Identity */}
                <div className="flex items-center gap-2.5 sm:gap-3 relative z-10">
                  {/* Holographic Glowing Avatar */}
                  <div className="relative">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl p-[1.5px] bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-600 shadow-md shadow-blue-500/30">
                      <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="12 2 2 7 12 12 22 7 12 2" />
                          <polyline points="2 17 12 22 22 17" />
                          <polyline points="2 12 12 17 22 12" />
                        </svg>
                      </div>
                    </div>
                    {/* Live Emerald Radar Pulse */}
                    <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400 border-2 border-slate-950 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
                    </span>
                  </div>

                  {/* Brand Titles */}
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <h3 className="font-extrabold text-xs sm:text-sm tracking-wide bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent">
                        ZENIVIXON AI
                      </h3>
                      <span className="text-[8.5px] sm:text-[9px] uppercase tracking-wider font-bold bg-blue-500/20 text-cyan-300 border border-blue-400/30 px-1.5 py-0.5 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                        Active
                      </span>
                    </div>
                    <p className="text-[10px] sm:text-[11px] font-medium text-slate-400 flex items-center gap-1.5">
                      <span>Intelligent Consultant</span>
                      <span className="w-1 h-1 rounded-full bg-slate-500" />
                      <span className="text-cyan-400">24/7 Live</span>
                    </p>
                  </div>
                </div>

                {/* Right Controls: New Session & Close */}
                <div className="flex items-center gap-1 relative z-10">
                  {/* Clear / New Session Button */}
                  <button
                    onClick={handleResetSession}
                    title="Start New Chat Session"
                    aria-label="Start New Chat Session"
                    className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 active:bg-white/20 transition-all duration-200 active:rotate-180"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                      <path d="M3 3v5h5" />
                    </svg>
                  </button>

                  {/* Minimize / Close Window */}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 active:bg-white/20 transition-all duration-200"
                    aria-label="Close Chat"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Messages Area with smooth overscroll-contain */}
              <div className="flex-1 p-3 sm:p-3.5 overflow-y-auto overscroll-contain bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950 flex flex-col gap-3 scroll-smooth">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} transition-all duration-200`}>
                    <div
                      className={`max-w-[88%] sm:max-w-[85%] p-3 sm:p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap shadow-md ${
                        msg.role === "user"
                          ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white rounded-br-none shadow-blue-500/25 border border-blue-400/20"
                          : "bg-slate-900/90 text-slate-100 border border-white/10 rounded-bl-none shadow-black/40 backdrop-blur-md"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-slate-900/90 border border-white/10 p-3 rounded-2xl rounded-bl-none shadow-sm flex gap-2 items-center">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                      <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Footer Area: text-base on mobile avoids iOS Safari auto-zoom */}
              <form onSubmit={sendMessage} className="p-2.5 sm:p-3 bg-slate-900/95 backdrop-blur-xl border-t border-white/10 flex gap-2 items-center shrink-0">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything about AI or business..."
                  className="flex-1 bg-slate-950/80 text-base sm:text-sm rounded-full px-4 py-2.5 sm:py-3 outline-none border border-white/10 focus:border-cyan-400/80 focus:ring-2 focus:ring-cyan-400/20 transition-all text-slate-100 placeholder-slate-500"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:opacity-95 disabled:opacity-40 text-white rounded-full p-2.5 sm:p-3 flex items-center justify-center transition shadow-lg shadow-blue-500/30 active:scale-95 shrink-0"
                  aria-label="Send message"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m22 2-7 20-4-9-9-4Z" />
                    <path d="M22 2 11 13" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button (FAB) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="pointer-events-auto transition-all duration-300 relative group flex items-center justify-center gap-2.5 sm:gap-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-1 rounded-full shadow-2xl hover:shadow-blue-500/50 cursor-pointer hover:scale-105 active:scale-95"
          aria-label="Open AI Consultant Chat"
        >
          <div className="absolute inset-0 bg-white/20 rounded-full blur-md group-hover:blur-lg transition-all animate-pulse" />
          <div className="relative flex items-center gap-2.5 sm:gap-3 bg-slate-900/30 backdrop-blur-md px-4 sm:px-5 py-2.5 sm:py-3 rounded-full border border-white/25 overflow-hidden">
            {/* Shine effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
            
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 bg-white/40 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
              <svg className="text-white relative z-10 w-5 h-5 sm:w-5.5 sm:h-5.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
              </svg>
            </div>
            
            <span className="text-white font-semibold text-xs sm:text-sm tracking-wide whitespace-nowrap flex items-center gap-1">
              Ask anything 
              <span className="inline-flex gap-0.5">
                <span className="animate-bounce" style={{ animationDelay: '0ms' }}>.</span>
                <span className="animate-bounce" style={{ animationDelay: '150ms' }}>.</span>
                <span className="animate-bounce" style={{ animationDelay: '300ms' }}>.</span>
              </span>
            </span>
          </div>
        </button>
      )}
    </div>
  );
}
