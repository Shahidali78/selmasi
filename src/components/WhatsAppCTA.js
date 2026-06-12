'use client'
import { useReveal } from '@/hooks/useReveal'
import { whatsapp, waLink, waMessages } from '@/data/siteContent'
import { IconWhatsApp } from '@/components/Icons'

export default function WhatsAppCTA() {
  const ref = useReveal()
  return (
    <section ref={ref} className="py-16 md:py-20 text-center bg-cream border-y border-beige-md">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <p className="reveal text-muted text-base md:text-lg mb-6 max-w-md mx-auto leading-relaxed">
          {whatsapp.text}
        </p>
        <a
          href={waLink(waMessages.general)}
          target="_blank"
          rel="noopener noreferrer"
          className="reveal inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5c] text-white font-semibold px-8 py-4 rounded-full transition-all hover:-translate-y-0.5 text-[15px] shadow-md hover:shadow-lg"
        >
          <IconWhatsApp className="w-[18px] h-[18px]" />
          {whatsapp.btnText}
        </a>
      </div>
    </section>
  )
}
