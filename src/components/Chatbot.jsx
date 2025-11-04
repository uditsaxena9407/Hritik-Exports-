// src/components/Chatbot.jsx
import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { motion } from "framer-motion";
import { MessageCircle, X, Send, Zap, ChevronDown, ChevronUp, Sparkles } from "lucide-react";

const WHATSAPP_NUMBER = "918299789304";
const WHATSAPP_MESSAGE = "Hello! I'm interested in bulk potato export pricing.";

const FAQ = [
  { q: "Minimum order?", a: "**500 kg** for any variety." },
  { q: "Best for chips?", a: "**Chipsona** – Golden crisp, low sugar." },
  { q: "Global export?", a: "Yes, **5 continents**, full docs." },
  { q: "Transit storage?", a: "**Reefer containers**, climate‑controlled." },
  { q: "Custom packaging?", a: "**200/250/500 kg/Custom Kg Bags**, private label." },
  { q: "Where grown?", a: "**Farrukhabad, UP** – Potato Capital." },
  { q: "Shelf life?", a: "**45–60 days** with cold chain." },
  { q: "Certified?", a: "**APEDA, FSSAI, GlobalGAP**" },
  { q: "Sample?", a: "**5–10 kg** at cost. Ask on WhatsApp." },
];

// Memoized Message Bubble
const ChatMessage = memo(({ text, isBot, time }) => (
  <div className={`flex ${isBot ? "justify-start" : "justify-end"} mb-4`}>
    <div className={`flex gap-3 max-w-[82%] ${isBot ? "flex-row" : "flex-row-reverse"}`}>
      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shadow-md ${isBot ? "bg-gradient-to-br from-lime-400 to-green-500 text-green-900" : "bg-gradient-to-br from-green-600 to-emerald-700 text-white"}`}>
        {isBot ? "H" : "U"}
      </div>
      <div>
        <div
          className={`px-4 py-3 rounded-2xl text-sm shadow-md border backdrop-blur-sm ${
            isBot
              ? "bg-white/90 text-gray-800 border-gray-100 rounded-tl-sm"
              : "bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-tr-sm"
          }`}
          dangerouslySetInnerHTML={{ __html: text }}
        />
        <p className="text-[10px] mt-1 text-gray-400 opacity-70">{time}</p>
      </div>
    </div>
  </div>
));

// Typing Indicator with Pulse
const TypingIndicator = () => (
  <div className="flex justify-start mb-4">
    <div className="flex gap-3 items-end">
      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-lime-400 to-green-500 flex items-center justify-center shadow-md">
        <Zap className="w-5 h-5 text-green-900 animate-pulse" />
      </div>
      <div className="bg-white/90 backdrop-blur-sm px-4 py-3 rounded-2xl rounded-tl-sm border border-gray-100 shadow-md">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 100}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Quick Reply Chip
const QuickChip = memo(({ q, onClick }) => (
  <button
    onClick={onClick}
    className="text-xs px-3.5 py-1.5 rounded-full bg-gradient-to-r from-lime-50 to-green-50 border border-lime-200 hover:from-lime-100 hover:to-green-100 text-green-800 font-semibold transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105"
  >
    {q}
  </button>
));

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi, I'm **HRITIK Bot**!", isBot: true, time: formatTime() },
    { text: "Ask me about **export‑grade potatoes**", isBot: true, time: formatTime() },
  ]);
  const [isTyping, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  // Auto-scroll to bottom
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, []);

  useEffect(() => scrollToBottom(), [messages, isTyping]);
  useEffect(() => { if (isOpen) inputRef.current?.focus(); }, [isOpen]);

  // Send message
  const sendMsg = useCallback((text, isBot) => {
    setMessages(prev => [...prev, { text, isBot, time: formatTime() }]);
  }, []);

  // Handle FAQ click
  const handleAsk = useCallback((q, a) => {
    if (isTyping) return;
    sendMsg(q, false);
    setTyping(true);
    setTimeout(() => {
      sendMsg(a, true);
      setTyping(false);
    }, 800 + Math.random() * 400);
  }, [isTyping, sendMsg]);

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userQ = input;
    setInput("");
    handleAsk(userQ, "Connecting you to a **human expert** on WhatsApp");
  };

  const top5 = FAQ.slice(0, 5);
  const more = FAQ.slice(5);

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-4 md:bottom-28 md:right-6 z-[1000] w-16 h-16 rounded-full bg-gradient-to-br from-green-600 to-emerald-700 shadow-2xl border-4 border-white/30 flex items-center justify-center hover:scale-110 transition-all duration-300 group"
        aria-label="Open chatbot"
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {isOpen ? (
            <X className="w-7 h-7 text-white" />
          ) : (
            <MessageCircle className="w-7 h-7 text-white group-hover:animate-pulse" />
          )}
        </motion.div>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-44 right-4 md:bottom-48 md:right-6 w-80 md:w-96 h-[540px] bg-white/95 backdrop-blur-xl rounded-3xl border border-white/30 shadow-2xl z-[999] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-green-700 via-emerald-600 to-lime-600 text-white p-4 flex justify-between items-center shadow-lg">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 animate-pulse" />
              <strong className="text-lg font-bold">HRITIK BOT</strong>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-white">
            {messages.map((m, i) => (
              <ChatMessage key={i} {...m} />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <div className="p-3 border-t bg-white/80 backdrop-blur-sm">
            <div className="flex flex-wrap gap-2 mb-2">
              {top5.map((item, i) => (
                <QuickChip key={i} q={item.q} onClick={() => handleAsk(item.q, item.a)} />
              ))}
            </div>
            {more.length > 0 && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="text-xs text-emerald-700 flex items-center gap-1 hover:gap-2 transition-all font-medium"
              >
                {showAll ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                {showAll ? "Hide" : "More FAQs"}
              </button>
            )}
            {showAll && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-wrap gap-2 mt-2 overflow-hidden"
              >
                {more.map((item, i) => (
                  <QuickChip key={i} q={item.q} onClick={() => handleAsk(item.q, item.a)} />
                ))}
              </motion.div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="flex p-3 border-t bg-white/90 backdrop-blur-sm gap-2">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 px-4 py-2.5 text-sm rounded-full border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none bg-white/70 backdrop-blur-sm"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-green-600 to-emerald-700 p-3 rounded-full text-white hover:from-green-700 hover:to-emerald-800 shadow-lg transform hover:scale-110 transition-all"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>

          {/* WhatsApp CTA */}
          <a
            href={whatsappURL}
            target="_blank"
            rel="noreferrer"
            className="bg-gradient-to-r from-emerald-600 to-green-700 text-white p-3.5 flex justify-center items-center gap-2 hover:from-emerald-700 hover:to-green-800 transition-all font-semibold text-sm shadow-inner"
          >
            <MessageCircle className="w-5 h-5" />
            Continue on WhatsApp
          </a>
        </motion.div>
      )}
    </>
  );
};

// Helper
const formatTime = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

export default Chatbot;