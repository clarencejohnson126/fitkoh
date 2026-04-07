"use client";

import { useState, useRef, useEffect, useCallback, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";

interface Message {
  role: "assistant" | "user";
  content: string;
  timestamp: string;
}

function getTimestamp(): string {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content:
    "Hey! \u{1F44B} I'm the FitKoh AI assistant. I can answer questions about our programs, pricing, accommodation, and help you book. What would you like to know?",
  timestamp: getTimestamp(),
};

const BOOKING_KEYWORDS = ["yes", "book", "sign up", "register", "let's go", "i want to", "book now"];

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 mb-3">
      <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-card-bg max-w-[80%]">
        <div className="flex gap-1.5 items-center h-5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-2 h-2 rounded-full bg-green"
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showBadge, setShowBadge] = useState(true);
  const [showBookButton, setShowBookButton] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  useEffect(() => {
    if (isOpen) {
      setShowBadge(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = async (e?: FormEvent) => {
    e?.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: text,
      timestamp: getTimestamp(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);
    setShowBookButton(false);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.ok) throw new Error("Chat request failed");

      const data = await res.json();
      const botContent: string = data.message ?? data.content ?? "Sorry, I couldn't process that. Please try again.";

      const botMessage: Message = {
        role: "assistant",
        content: botContent,
        timestamp: getTimestamp(),
      };

      setMessages((prev) => [...prev, botMessage]);

      // Check if user is trying to book
      const lower = text.toLowerCase();
      const isBookingIntent = BOOKING_KEYWORDS.some((kw) => lower.includes(kw));
      const botMentionsPackage =
        /package|program|book|pricing|price|\bthb\b|\bbaht\b/i.test(botContent) ||
        isBookingIntent;

      if (botMentionsPackage) {
        setShowBookButton(true);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
          timestamp: getTimestamp(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat bubble */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={() => setIsOpen(true)}
            className="chat-bounce fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 flex items-center justify-center hover:shadow-[#25D366]/50 hover:scale-105 transition-shadow duration-200 cursor-pointer"
            aria-label="Open chat"
          >
            <MessageCircle size={26} />
            {/* Notification badge */}
            {showBadge && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-orange text-white text-[11px] font-bold flex items-center justify-center">
                1
              </span>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed z-50
              bottom-0 right-0 w-screen h-screen
              sm:bottom-24 sm:right-6 sm:w-[380px] sm:h-[500px] sm:rounded-2xl
              flex flex-col overflow-hidden
              border-0 sm:border border-card-border
              shadow-2xl shadow-black/10 bg-white"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-green shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm">
                  FK
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm leading-tight">
                    FitKoh AI Assistant
                  </h4>
                  <p className="text-white/70 text-xs flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/90 inline-block" />
                    Online
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1 scrollbar-thin bg-white">
              {/* Date stamp */}
              <div className="flex justify-center mb-4">
                <span className="text-[10px] text-muted bg-card-bg px-3 py-1 rounded-full">
                  Today
                </span>
              </div>

              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex mb-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`relative max-w-[82%] px-3.5 py-2.5 text-[13.5px] leading-relaxed
                      ${
                        msg.role === "user"
                          ? "bg-green/10 text-foreground rounded-2xl rounded-br-sm"
                          : "bg-card-bg text-foreground rounded-2xl rounded-bl-sm"
                      }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                    <span
                      className={`block text-[10px] mt-1.5 ${
                        msg.role === "user" ? "text-muted text-right" : "text-muted"
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {isLoading && <TypingIndicator />}

              {/* Inline Book Now button */}
              {showBookButton && !isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start mb-3"
                >
                  <a
                    href="#pricing"
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green text-white text-sm font-semibold hover:bg-green/90 transition-colors duration-200"
                  >
                    Book Now &rarr;
                  </a>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <form
              onSubmit={handleSend}
              className="shrink-0 flex items-center gap-2 px-3 py-3 border-t border-card-border bg-card-bg"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                disabled={isLoading}
                className="flex-1 bg-white border border-card-border rounded-full px-4 py-2.5 text-sm text-foreground placeholder:text-muted/50 outline-none focus:border-green/50 transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 rounded-full bg-green text-white flex items-center justify-center shrink-0 hover:bg-green/90 transition-colors disabled:opacity-40 disabled:hover:bg-green cursor-pointer"
                aria-label="Send message"
              >
                <Send size={16} className="translate-x-[1px]" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
