"use client";

import { FormEvent, useState } from "react";
import { Bot, MessageSquare, Send, X } from "lucide-react";
import { Portal } from "@/components/portals/Portal";
import { analyze } from "@/lib/api";

const examples = [
  "Which toy niche is growing fastest this week?",
  "Show competitors with aggressive price drops",
  "Which product category has low competition and rising demand?",
  "Create a short market report for this week"
];

type Message = {
  role: "user" | "assistant";
  text: string;
};

export function AiAnalystPanel() {
  const [open, setOpen] = useState(true);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Ask me about Etsy toy niches, competitor price moves, TikTok signals, or weekly opportunities."
    }
  ]);

  async function ask(question: string) {
    if (!question.trim()) {
      return;
    }
    setMessages((items) => [...items, { role: "user", text: question }]);
    setInput("");
    setLoading(true);
    const response = await analyze(question);
    setMessages((items) => [...items, { role: "assistant", text: response.data.answer }]);
    setLoading(false);
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    void ask(input);
  }

  return (
    <Portal>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-2xl bg-ink px-4 py-3 text-sm font-semibold text-white shadow-glow"
        >
          <MessageSquare size={18} />
          AI Analyst
        </button>
      )}
      {open && (
        <aside className="fixed bottom-5 right-5 z-40 flex h-[min(78vh,680px)] w-[min(94vw,390px)] flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-soft">
          <div className="flex items-center justify-between border-b border-line p-4">
            <div className="flex items-center gap-3">
              <span className="rounded-2xl bg-blue-50 p-2 text-blue-600">
                <Bot size={20} />
              </span>
              <div>
                <p className="font-semibold text-ink">AI Analyst</p>
                <p className="text-xs text-muted">Mock LLM over mock market data</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-ink" aria-label="Close AI Analyst">
              <X size={18} />
            </button>
          </div>
          <div className="flex-1 space-y-3 overflow-auto p-4">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={message.role === "user" ? "ml-8 rounded-2xl bg-ink p-3 text-sm text-white" : "mr-8 rounded-2xl bg-slate-50 p-3 text-sm leading-6 text-slate-700"}>
                {message.text}
              </div>
            ))}
            {loading && <div className="mr-8 rounded-2xl bg-slate-50 p-3 text-sm text-slate-500">Analyzing mock signals...</div>}
            <div className="grid gap-2 pt-2">
              {examples.map((example) => (
                <button key={example} onClick={() => ask(example)} className="rounded-xl border border-line px-3 py-2 text-left text-xs text-slate-600 hover:border-blue-200 hover:bg-blue-50">
                  {example}
                </button>
              ))}
            </div>
          </div>
          <form onSubmit={submit} className="flex gap-2 border-t border-line p-3">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about the market..."
              className="min-w-0 flex-1 rounded-2xl border border-line px-3 py-2 text-sm outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
            />
            <button className="rounded-2xl bg-blue-600 p-2.5 text-white hover:bg-blue-700" aria-label="Send message">
              <Send size={18} />
            </button>
          </form>
        </aside>
      )}
    </Portal>
  );
}
