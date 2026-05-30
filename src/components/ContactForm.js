'use client'
import { useState } from 'react'
import { useReveal } from '@/hooks/useReveal'
import { contact, site } from '@/data/siteContent'
import { IconPhone, IconMail, IconWhatsApp } from '@/components/Icons'

const INITIAL = { name: '', business: '', phone: '', email: '', message: '' }

export default function ContactForm() {
  const ref = useReveal()
  const [form, setForm] = useState(INITIAL)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = async () => {
    setError('')
    if (!form.name.trim() || !form.email.trim()) { setError('Please fill in your name and email.'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || '')
      setSuccess(true)
      setForm(INITIAL)
      setTimeout(() => setSuccess(false), 8000)
    } catch (err) { setError(err.message || 'Something went wrong. Please try WhatsApp or email us directly.') }
    finally { setLoading(false) }
  }

  const inputCls = 'w-full bg-beige border-[1.5px] border-beige-md focus:border-sand focus:ring-2 focus:ring-sand/20 rounded-xl px-4 py-3.5 text-brown text-[15px] outline-none transition'

  return (
    <section ref={ref} id="contact" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="reveal">
            <p className="section-label">{contact.label}</p>
            <h2 className="section-title">{contact.title}</h2>
            <p className="text-muted text-base leading-relaxed mb-8">{contact.text}</p>

            {[
              { Icon: IconWhatsApp, label: 'WhatsApp', value: site.phone, href: site.whatsappUrl },
              { Icon: IconPhone, label: 'Landline', value: site.landline, href: `tel:${site.landline.replace(/ /g,'')}` },
              { Icon: IconMail, label: 'Email', value: site.email, href: `mailto:${site.email}` },
            ].map((c) => (
              <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 mb-4 bg-beige border border-beige-md rounded-xl p-4 hover:border-sand transition-colors">
                <div className="w-11 h-11 rounded-xl bg-cream flex items-center justify-center text-sand flex-shrink-0">
                  <c.Icon className="w-[18px] h-[18px]" />
                </div>
                <div>
                  <p className="text-xs text-muted">{c.label}</p>
                  <strong className="text-[15px] text-brown">{c.value}</strong>
                </div>
              </a>
            ))}
          </div>

          <div className="reveal bg-cream border border-beige-md rounded-2xl p-8 shadow-lg">
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-brown mb-2">Name</label>
                <input className={inputCls} placeholder="Your name" value={form.name} onChange={update('name')} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-brown mb-2">Phone Number</label>
                <input className={inputCls} type="tel" placeholder="Your phone" value={form.phone} onChange={update('phone')} />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-brown mb-2">School / Business Name</label>
              <input className={inputCls} placeholder="Your school or business" value={form.business} onChange={update('business')} />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-brown mb-2">Email Address</label>
              <input className={inputCls} type="email" placeholder="your@email.com" value={form.email} onChange={update('email')} />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-brown mb-2">Message</label>
              <textarea className={`${inputCls} min-h-[120px] resize-y`} placeholder="Tell us about your needs..." value={form.message} onChange={update('message')} />
            </div>
            {error && <div className="mb-4 bg-red-50 border border-red-200 rounded-xl p-3 text-red-700 text-sm">{error}</div>}
            <button onClick={submit} disabled={loading}
              className="w-full bg-brown hover:bg-accent disabled:opacity-60 text-white font-semibold text-[15px] py-4 rounded-xl transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2">
              {loading ? 'Sending…' : `${contact.btnText} →`}
            </button>
            {success && <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-4 text-green-800 text-sm">{contact.successMsg}</div>}
          </div>
        </div>
      </div>
    </section>
  )
}
