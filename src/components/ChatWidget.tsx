"use client";

import { useState, useRef, useEffect } from "react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    {
      role: "assistant",
      content: "Hello! I am the ZENIVIXON AI Consultant. How can I help you automate or grow your business today?",
    },
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // ব্রাউজার রিলোড হলে ইউজারের জন্য একটি ইউনিক সেশন আইডি তৈরি হবে (মেমরির জন্য)
  useEffect(() => {
    setSessionId("session_" + Math.random().toString(36).substring(2, 10));
    
    // Render-এর ফ্রি সার্ভার "Sleep" মোড থেকে জাগানোর জন্য (Cold Start কমানোর জন্য) ব্যাকগ্রাউন্ডে একটি রিকোয়েস্ট পাঠানো
    fetch("https://zenivixon-ai-consultant.onrender.com/").catch(() => {});
  }, []);

  // নতুন মেসেজ এলে অটো-স্ক্রল করে নিচে চলে যাবে
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

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
      const response = await fetch("https://zenivixon-ai-consultant.onrender.com/api/chat/stream", {
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
                        const newMessages = [...prev];
                        newMessages[newMessages.length - 1].content += data.content;
                        return newMessages;
                      });
                    }
                  } catch (e) {
                    console.error("Error parsing stream chunk:", jsonStr, e);
                  }
                }
              }
            }
          }
        }
      }
    } catch (error) {
      setIsLoading(false);
      setMessages((prev) => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1].content = "সার্ভার এরর! দয়া করে কিছুক্ষন পর আবার চেষ্টা করুন।";
        return newMessages;
      });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="w-[calc(100vw-3rem)] sm:w-[400px] h-[550px] max-h-[80vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-4 transition-all duration-300 transform origin-bottom-right">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white flex justify-between items-center shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-wide">ZENIVIXON AI</h3>
                <p className="text-xs text-blue-100">Intelligent Consultant</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-2 rounded-full transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-slate-50 dark:bg-slate-950 flex flex-col gap-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.role === "user" 
                    ? "bg-blue-600 text-white rounded-br-none" 
                    : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-700 rounded-bl-none"
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-4 rounded-2xl rounded-bl-none shadow-sm flex gap-2 items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={sendMessage} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about AI..."
              className="flex-1 bg-slate-100 dark:bg-slate-800 text-sm rounded-full px-4 py-3 outline-none border border-transparent focus:border-blue-500 transition text-slate-800 dark:text-slate-100"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-full p-3 flex items-center justify-center transition shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
            </button>
          </form>
        </div>
      )}

      {/* Floating Action Button (FAB) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"} transition-all duration-300 bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-blue-500/50 text-white p-4 rounded-full shadow-lg flex items-center justify-center`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
      </button>
    </div>
  );
}
