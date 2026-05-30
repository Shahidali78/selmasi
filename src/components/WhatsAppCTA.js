'use client'
import { useReveal } from '@/hooks/useReveal'
import { whatsapp, site } from '@/data/siteContent'
import { IconWhatsApp } from '@/components/Icons'

export default function WhatsAppCTA() {
  const ref = useReveal()
  return (
    <section ref={ref} className="py-16 text-center bg-cream border-y border-beige-md">
      <div className="max-w-6xl mx-auto px-5">
        <p className="reveal text-muted text-base md:text-lg mb-6">{whatsapp.text}</p>
        <a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer"
          className="reveal inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1DAF54] text-white font-semibold px-8 py-4 rounded-full transition-all hover:-translate-y-0.5 text-[15px] shadow-md">
          <IconWhatsApp className="w-5 h-5" /> {whatsapp.btnText}
        </a>
      </div>
    </section>
  )
}
