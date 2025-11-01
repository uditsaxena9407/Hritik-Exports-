import React, { useState, useEffect, useRef, useCallback } from "react";
import { MessageCircle, X, Send, Zap, ChevronDown, ChevronUp } from "lucide-react";

const WHATSAPP_NUMBER = "918299789304";
const WHATSAPP_MESSAGE = "Hello! I'm interested in bulk potato export pricing.";

const FAQ = [
  { q: "Minimum order?", a: "**50 kg** for any variety." },
  { q: "Best for chips?", a: "**Chipsona** – Golden crisp, low sugar." },
  { q: "Global export?", a: "Yes, **5 continents**, full docs." },
  { q: "Transit storage?", a: "**Reefer containers**, climate-controlled." },
  { q: "Custom packaging?", a: "**10/25/50 kg bags**, private label." },
  { q: "Where grown?", a: "**Farrukhabad, UP** – Potato Capital." },
  { q: "Shelf life?", a: "**45–60 days** with cold chain." },
  { q: "Certified?", a: "**APEDA, FSSAI, GlobalGAP**" },
  { q: "Sample?", a: "**5–10 kg** at cost. Ask on WhatsApp." },
];

const ChatMessage = React.memo(({ text, isBot, time }) => (
  <div className={`flex ${isBot ? "justify-start" : "justify-end"} mb-3`}>
    <div className={`flex gap-2 max-w-[78%] ${isBot ? "flex-row" : "flex-row-reverse"}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${isBot ? "bg-lime-400 text-green-900" : "bg-green-700 text-white"}`}>
        {isBot ? "H" : "U"}
      </div>
      <div>
        <div
          className={`px-4 py-2.5 rounded-2xl text-sm shadow-sm border ${isBot ? "bg-white text-gray-800 border-gray-100 rounded-tl-sm" : "bg-gradient-to-r from-green-600 to-lime-600 text-white rounded-tr-sm"}`}
          dangerouslySetInnerHTML={{ __html: text }}
        />
        <p className="text-[10px] mt-1 text-gray-400 text-right">{time}</p>
      </div>
    </div>
  </div>
));

const TypingIndicator = () => (
  <div className="flex justify-start mb-3">
    <div className="flex gap-2 items-end">
      <div className="w-8 h-8 rounded-full bg-lime-400 flex items-center justify-center">
        <Zap className="w-5 h-5 text-green-900 animate-pulse" />
      </div>
      <div className="bg-white px-4 py-2.5 rounded-2xl rounded-tl-sm border border-gray-100 shadow-sm">
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></div>
        </div>
      </div>
    </div>
  </div>
);

const QuickChip = React.memo(({ q, onClick }) => (
  <button
    onClick={onClick}
    className="text-xs px-3 py-1.5 rounded-full bg-gradient-to-r from-lime-50 to-green-50 border border-lime-200 hover:from-lime-100 hover:to-green-100 text-green-800 font-medium transition-all duration-200 shadow-sm"
  >
    {q}
  </button>
));

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi, I'm **HRITIK Bot**!", isBot: true, time: formatTime() },
    { text: "Ask me about potato exports", isBot: true, time: formatTime() },
  ]);
  const [isTyping, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => scrollToBottom(), [messages, isTyping]);
  useEffect(() => { if (isOpen) inputRef.current?.focus(); }, [isOpen]);

  const sendMsg = useCallback((text, isBot) => {
    setMessages(prev => [...prev, { text, isBot, time: formatTime() }]);
  }, []);

  const handleAsk = (q, a) => {
    if (isTyping) return;
    sendMsg(q, false);
    setTyping(true);
    setTimeout(() => {
      sendMsg(a, true);
      setTyping(false);
    }, 900);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userQ = input;
    setInput("");
    handleAsk(userQ, "Connecting you to a human on WhatsApp");
  };

  const top5 = FAQ.slice(0, 5);
  const more = FAQ.slice(5);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-4 md:bottom-28 md:right-6 z-[1000] w-16 h-16 rounded-full bg-white shadow-2xl border flex items-center justify-center hover:scale-110 transition"
      >
        {isOpen ? <X className="w-7 h-7 text-gray-700" /> : <MessageCircle className="w-7 h-7 text-green-600" />}
      </button>

      {isOpen && (
        <div className="fixed bottom-44 right-4 md:bottom-48 md:right-6 w-80 md:w-96 h-[520px] bg-white rounded-3xl border shadow-2xl z-[999] overflow-hidden">
          <div className="bg-gradient-to-r from-green-700 to-lime-600 text-white p-4 flex justify-between items-center">
            <strong>HRITIK BOT</strong>
            <button onClick={() => setIsOpen(false)}><X className="w-5 h-5" /></button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {messages.map((m, i) => <ChatMessage key={i} {...m} />)}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t bg-white">
            <div className="flex flex-wrap gap-2 mb-2">
              {top5.map((item, i) => (
                <QuickChip key={i} q={item.q} onClick={() => handleAsk(item.q, item.a)} />
              ))}
            </div>
            {more.length > 0 && (
              <button onClick={() => setShowAll(!showAll)} className="text-xs text-green-700 flex items-center gap-1">
                {showAll ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                {showAll ? "Hide" : "More"}
              </button>
            )}
            {showAll && (
              <div className="flex flex-wrap gap-2 mt-2">
                {more.map((item, i) => (
                  <QuickChip key={i} q={item.q} onClick={() => handleAsk(item.q, item.a)} />
                ))}
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex p-3 border-t gap-2 bg-white">
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 px-4 py-2 text-sm rounded-full border focus:ring-2 focus:ring-green-500 outline-none"
            />
            <button className="bg-green-700 p-3 rounded-full text-white hover:bg-green-800">
              <Send className="w-5 h-5" />
            </button>
          </form>

          <a href={whatsappURL} target="_blank" rel="noreferrer" className="bg-green-700 text-white p-3 flex justify-center items-center gap-2 hover:bg-green-800">
            <MessageCircle className="w-5 h-5" /> WhatsApp Chat
          </a>
        </div>
      )}
    </>
  );
};

const formatTime = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
export default Chatbot;