'use client'
import { useState, useRef, useEffect } from 'react'
import { faqs } from '@/data/siteContent'
import { IconChat, IconBot, IconSend } from '@/components/Icons'

export default function ChatbotFAQ() {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState([{ from: 'bot', text: 'Hi! Welcome to Selmasi. What can I help you with?' }])
  const [input, setInput] = useState('')
  const [showFaqs, setShowFaqs] = useState(true)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs])

  const addMsg = (userText, botText) => {
    setMsgs((m) => [...m, { from: 'user', text: userText }, { from: 'bot', text: botText }])
    setShowFaqs(false)
  }

  const matchFaq = (text) => {
    const lower = text.toLowerCase()
    for (const faq of faqs) {
      const words = faq.q.toLowerCase().split(' ')
      if (words.some((w) => w.length > 3 && lower.includes(w))) return faq.a
    }
    return 'Thanks for your message! Contact us at Info@selmasi.africa or WhatsApp 061 134 0644.'
  }

  const send = () => {
    const t = input.trim()
    if (!t) return
    setInput('')
    setTimeout(() => addMsg(t, matchFaq(t)), 200)
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-brown hover:bg-accent text-white flex items-center justify-center shadow-2xl transition-all hover:scale-105"
        aria-label="Open chatbot"
      >
        {open ? (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
        ) : (
          <IconChat className="w-5 h-5" />
        )}
      </button>

      {open && (
        <div className="chat-open fixed bottom-24 right-6 z-50 w-[min(360px,calc(100vw-48px))] bg-white border border-beige-md rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          <div className="bg-brown px-5 py-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-sand flex items-center justify-center text-white flex-shrink-0">
              <IconBot className="w-4 h-4" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Selmasi Assistant</p>
              <p className="text-white/60 text-xs">Usually replies instantly</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 p-4 h-[260px] overflow-y-auto bg-beige">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  m.from === 'bot'
                    ? 'bg-white text-brown border border-beige-md self-start rounded-bl-sm'
                    : 'bg-brown text-white self-end rounded-br-sm'
                }`}
              >
                {m.text}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {showFaqs && (
            <div className="px-3 py-2 flex flex-wrap gap-1.5 bg-beige border-t border-beige-md">
              {faqs.map((f) => (
                <button
                  key={f.q}
                  onClick={() => addMsg(f.q, f.a)}
                  className="text-[11px] bg-white border border-beige-md rounded-full px-3 py-1 text-brown hover:bg-brown hover:text-white transition-colors"
                >
                  {f.q}
                </button>
              ))}
            </div>
          )}

          <div className="flex gap-2 p-3 bg-white border-t border-beige-md">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="Type a message…"
              className="flex-1 bg-beige border border-beige-md rounded-full px-4 py-2 text-sm text-brown outline-none focus:border-sand transition"
            />
            <button onClick={send} className="w-9 h-9 rounded-full bg-brown text-white flex items-center justify-center flex-shrink-0 hover:bg-accent transition">
              <IconSend className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
