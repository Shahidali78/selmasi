'use client'
import { useReveal } from '@/hooks/useReveal'
import { services, waLink, waMessages } from '@/data/siteContent'
import { IconBolt, IconCalendar, IconRefresh, IconChat, IconBell, IconWhatsApp } from '@/components/Icons'

const icons = [IconBolt, IconCalendar, IconRefresh, IconChat, IconBell]

export default function Services() {
  const ref = useReveal()
  return (
    <section ref={ref} id="services" className="bg-beige py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-5">
        <div className="reveal">
          <p className="section-label">{services.label}</p>
          <h2 className="section-title">{services.title}</h2>
          <p className="section-sub">{services.subtitle}</p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.items.map((s, i) => {
            const Icon = icons[i % icons.length]
            return (
              <div
                key={s.title}
                className="reveal group bg-cream rounded-2xl p-8 border border-beige-md relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-sand to-sand-dk scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 rounded-t-2xl" />
                <div className="w-[52px] h-[52px] rounded-xl bg-beige border border-sand-lt flex items-center justify-center text-sand mb-5">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-display text-[1.35rem] font-bold text-brown mb-3">{s.title}</h3>
                <p className="text-muted text-[15px] leading-relaxed mb-6 flex-1">{s.desc}</p>
                <a
                  href={waLink(waMessages.service(s.title))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-sand-dk hover:text-brown transition-colors"
                >
                  <IconWhatsApp className="w-4 h-4 text-[#25D366]" />
                  Enquire on WhatsApp →
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
