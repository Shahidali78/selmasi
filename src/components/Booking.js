'use client'
import { useReveal } from '@/hooks/useReveal'
import { booking, waLink, waMessages } from '@/data/siteContent'
import { IconCalendar } from '@/components/Icons'

export default function Booking() {
  const ref = useReveal()
  return (
    <section ref={ref} id="booking" className="bg-beige section-pad">
      <div className="container-x">
        <div className="reveal text-center max-w-2xl mx-auto">
          <p className="section-label">{booking.label}</p>
          <h2 className="section-title mx-auto">{booking.title}</h2>
        </div>
        <div className="reveal max-w-4xl mx-auto mt-8 rounded-3xl p-10 md:p-14 text-center text-white relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #2a1a0e 0%, #8b5e2e 100%)' }}>
          <div className="relative z-10">
            <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">Let's Discuss Your Needs</h3>
            <p className="text-white/75 max-w-md mx-auto mb-8 text-base leading-relaxed">{booking.text}</p>
            <a href={waLink(waMessages.consultation)}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-sand hover:bg-sand-dk text-white font-semibold text-[15px] px-8 py-4 rounded-xl transition-all hover:-translate-y-0.5">
              <IconCalendar className="w-4 h-4" /> {booking.btnText}
            </a>
            <p className="text-white/40 text-sm mt-4">Booked via WhatsApp — or scroll up to use the contact form.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
