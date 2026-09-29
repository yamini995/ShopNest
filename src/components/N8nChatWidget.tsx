import React, { useEffect, useState, useRef } from 'react';
import { Bot, Send, X, RefreshCw, Check, Sparkles, AlertCircle, ShoppingBag, ExternalLink } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatPrice } from '../utils/formatters';

const N8N_WEBHOOK_URL = 'https://yana1100.app.n8n.cloud/webhook/23eb6481-fff8-4365-bb1f-06d511222d1a/chat';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  isError?: boolean;
  suggestedProducts?: string[];
}

declare global {
  interface Window {
    openN8nChat?: () => void;
  }
}

export const N8nChatWidget: React.FC = () => {
  const { products, openProduct, setActivePage } = useShop();
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sessionId] = useState(() => 'sess_' + Math.random().toString(36).substring(2, 11));
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: 'Hi there! 👋 Welcome to ShopNest. I am your retail assistant connected to your n8n workflow.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
    {
      id: 'welcome-2',
      sender: 'assistant',
      text: 'Ask me anything about our 180 store products, order tracking, shipping policies, or today\'s discounts!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Expose global hook for Header and Footer buttons
  useEffect(() => {
    window.openN8nChat = () => {
      setIsOpen(true);
    };

    return () => {
      delete window.openN8nChat;
    };
  }, []);

  // Helper to find matching products from catalog
  const findMatchingProducts = (query: string) => {
    const q = query.toLowerCase();
    return products
      .filter((p) => {
        const titleStr = (p.name || p.title || '').toLowerCase();
        const catStr = (p.category || '').toLowerCase();
        const subStr = (p.subcategory || '').toLowerCase();
        const brandStr = (p.brand || '').toLowerCase();
        return (
          titleStr.includes(q) ||
          catStr.includes(q) ||
          subStr.includes(q) ||
          brandStr.includes(q)
        );
      })
      .slice(0, 3)
      .map((p) => p.id);
  };

  // Send message directly to n8n webhook
  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isSending) return;

    const userMsg: ChatMessage = {
      id: 'usr_' + Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsSending(true);

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'sendMessage',
          chatInput: text,
          sessionId: sessionId,
        }),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data) {
        const replyText =
          data.output ||
          data.text ||
          data.message ||
          (typeof data === 'string' ? data : JSON.stringify(data));

        const isWorkflowError = data.message === 'Error in workflow';
        const matched = findMatchingProducts(text);

        setMessages((prev) => [
          ...prev,
          {
            id: 'bot_' + Date.now(),
            sender: 'assistant',
            text: isWorkflowError
              ? `⚠️ Connected to n8n webhook, but n8n returned: "Error in workflow". Please verify your workflow canvas in n8n cloud (ensure AI Agent or LLM credential node is connected and active).`
              : replyText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isError: isWorkflowError,
            suggestedProducts: matched.length > 0 ? matched : undefined,
          },
        ]);
      } else {
        const matched = findMatchingProducts(text);
        setMessages((prev) => [
          ...prev,
          {
            id: 'bot_' + Date.now(),
            sender: 'assistant',
            text: `Webhook responded with status ${response.status}. (Ensure your n8n workflow is toggled to Active).`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isError: true,
            suggestedProducts: matched.length > 0 ? matched : undefined,
          },
        ]);
      }
    } catch (err: any) {
      const matched = findMatchingProducts(text);
      setMessages((prev) => [
        ...prev,
        {
          id: 'bot_' + Date.now(),
          sender: 'assistant',
          text: `Unable to reach n8n webhook: ${err.message || 'Network request failed'}.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isError: true,
          suggestedProducts: matched.length > 0 ? matched : undefined,
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const quickPrompts = [
    "Today's top deals",
    'Popular laptops',
    'Return policy',
    'Track order SN-2026-89412',
  ];

  return (
    <>
      {/* Prominent Floating n8n Chat Launcher */}
      <aside aria-label="n8n Chatbot Support" className="fixed bottom-5 right-5 z-50">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center gap-2.5 bg-[#0F766E] hover:bg-[#0d655e] text-white px-4 py-3 rounded-full shadow-xl transition-all hover:scale-105 active:scale-95 border-2 border-white/20 group cursor-pointer"
          aria-label={isOpen ? 'Close chat' : 'Open n8n chatbot'}
        >
          <div className="relative">
            <Bot size={20} className="text-white group-hover:rotate-6 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0F766E] animate-pulse" />
          </div>
          <div className="text-left">
            <div className="text-[12px] font-bold leading-tight tracking-wide flex items-center gap-1.5">
              <span>Chat with AI</span>
              <span className="bg-white/20 text-[9px] font-semibold px-1 py-0.2 rounded uppercase tracking-wider text-emerald-100">
                n8n
              </span>
            </div>
            <div className="text-[10px] text-emerald-100/90 leading-tight">Online • 24/7 Support</div>
          </div>
        </button>
      </aside>

      {/* Interactive Chat Window Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:justify-end p-0 sm:p-5 bg-black/25 backdrop-blur-2xs">
          <div className="bg-[#FFFFFF] w-full sm:w-[420px] h-[85vh] sm:h-[580px] rounded-t-2xl sm:rounded-2xl shadow-2xl border border-[#E5E5E2] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-200">
            {/* Header */}
            <div className="bg-[#0F766E] text-white px-4 py-3.5 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center border border-white/20 shrink-0">
                  <Bot size={20} className="text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm leading-none text-white">ShopNest Assistant</h3>
                    <span className="bg-white/20 text-white text-[10px] font-medium px-1.5 py-0.5 rounded">n8n Cloud</span>
                  </div>
                  <p className="text-[11px] text-white/80 mt-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 inline-block animate-pulse" />
                    yana1100.app.n8n.cloud
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close chat window"
              >
                <X size={18} />
              </button>
            </div>

            {/* Webhook Connectivity Info Banner */}
            <div className="bg-[#F7F7F5] border-b border-[#E5E5E2] px-3.5 py-1.5 text-[11px] text-[#5C5C5C] flex items-center justify-between">
              <span className="truncate max-w-[270px]">
                Webhook: <code className="text-[#0F766E] font-mono text-[10px]">.../webhook/23eb6481.../chat</code>
              </span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-1.5 py-0.5 rounded flex items-center gap-1">
                <Check size={10} /> Active
              </span>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FAFAF8]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-2xs ${
                      msg.sender === 'user'
                        ? 'bg-[#0F766E] text-white rounded-br-xs'
                        : msg.isError
                        ? 'bg-amber-50 text-amber-900 border border-amber-200 rounded-bl-xs'
                        : 'bg-[#FFFFFF] text-[#1A1A1A] border border-[#E5E5E2] rounded-bl-xs'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  </div>
                  <span className="text-[10px] text-[#8C8C8C] mt-1 px-1">{msg.timestamp}</span>

                  {/* Optional Suggested Product Cards */}
                  {msg.suggestedProducts && msg.suggestedProducts.length > 0 && (
                    <div className="mt-2 space-y-1.5 w-full max-w-[88%]">
                      <p className="text-[10px] font-semibold text-[#5C5C5C] uppercase tracking-wider">
                        Matching Catalog Items:
                      </p>
                      {msg.suggestedProducts.map((prodId) => {
                        const item = products.find((p) => p.id === prodId);
                        if (!item) return null;
                        return (
                          <div
                            key={item.id}
                            onClick={() => {
                              openProduct(item.id);
                              setIsOpen(false);
                            }}
                            className="flex items-center gap-2.5 p-2 bg-[#FFFFFF] border border-[#E5E5E2] hover:border-[#0F766E] rounded-xl cursor-pointer transition-colors"
                          >
                            <img
                              src={item.images[0]}
                              alt={item.name || item.title || 'Product'}
                              className="w-10 h-10 object-contain bg-[#F7F7F5] rounded-md shrink-0"
                            />
                            <div className="min-w-0 flex-1">
                              <p className="text-[11px] font-semibold text-[#1A1A1A] truncate">{item.name || item.title}</p>
                              <p className="text-[11px] font-bold text-[#0F766E]">{formatPrice(item.price)}</p>
                            </div>
                            <ExternalLink size={12} className="text-[#8C8C8C] shrink-0" />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}

              {isSending && (
                <div className="flex items-center gap-2 text-xs text-[#5C5C5C] bg-white border border-[#E5E5E2] rounded-full px-3 py-1.5 w-fit">
                  <RefreshCw size={12} className="animate-spin text-[#0F766E]" />
                  <span>Sending to n8n webhook...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts Bar */}
            <div className="px-3.5 py-2 bg-[#FFFFFF] border-t border-[#E5E5E2] overflow-x-auto flex items-center gap-1.5 no-scrollbar">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSendMessage(prompt)}
                  disabled={isSending}
                  className="shrink-0 text-[11px] bg-[#F7F7F5] hover:bg-[#E5E5E2] text-[#1A1A1A] font-medium px-2.5 py-1 rounded-full border border-[#E5E5E2] transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-[#FFFFFF] border-t border-[#E5E5E2] flex items-center gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about products, orders, returns..."
                disabled={isSending}
                className="flex-1 bg-[#F7F7F5] border border-[#E5E5E2] focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] text-xs text-[#1A1A1A] px-3.5 py-2.5 rounded-xl outline-none placeholder:text-[#8C8C8C]"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isSending}
                className="bg-[#0F766E] hover:bg-[#0d655e] text-white p-2.5 rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0 cursor-pointer"
                aria-label="Send message to n8n"
              >
                <Send size={15} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
