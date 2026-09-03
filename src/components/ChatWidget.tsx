"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { MessageCircle, X } from "lucide-react";

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
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      // NOTE: লাইভ করার পর http://127.0.0.1:8000 পরিবর্তন করে আপনার Render/Railway লিংক বসাতে হবে
      const response = await fetch("https://zenivixon-ai-consultant.onrender.com/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, session_id: sessionId }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: "দুঃখিত, সার্ভারের সাথে কানেক্ট করতে সমস্যা হচ্ছে।" }]);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { role: "assistant", content: "সার্ভার এরর! দয়া করে আপনার লোকাল ব্যাকএন্ড চালু আছে কিনা চেক করুন।" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="w-[350px] sm:w-[400px] h-[550px] max-h-[80vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-4 transition-all duration-300 transform origin-bottom-right">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white flex justify-between items-center shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center overflow-hidden">
                <Image src="/logo.png" alt="Zenivixon AI" width={32} height={32} className="object-contain" />
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
        className={`${isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"} 
          transition-all duration-300 w-16 h-16 
          bg-gradient-to-tr from-blue-600 to-indigo-500 
          hover:from-blue-700 hover:to-indigo-600 
          text-white shadow-xl hover:shadow-2xl hover:shadow-blue-500/30 
          rounded-full flex items-center justify-center 
          relative group transform hover:-translate-y-1`}
      >
        <MessageCircle size={32} strokeWidth={2} className="group-hover:scale-110 transition-transform duration-300 animate-pulse-slow" />
        
        {/* Unread badge / indicator dot */}
        <span className="absolute top-0 right-0 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-400 border-2 border-white dark:border-slate-900"></span>
        </span>
      </button>
    </div>
  );
}
