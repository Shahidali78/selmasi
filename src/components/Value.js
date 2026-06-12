'use client'
import { useReveal } from '@/hooks/useReveal'
import { value } from '@/data/siteContent'
import { IconBolt, IconInbox, IconRefresh, IconLayers, IconWhatsApp, IconClock } from '@/components/Icons'

const icons = [IconBolt, IconInbox, IconRefresh, IconLayers, IconWhatsApp, IconClock]

export default function Value() {
  const ref = useReveal()
  return (
    <section ref={ref} id="value" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="reveal text-center mb-14">
          <p className="section-label">{value.label}</p>
          <h2 className="section-title mx-auto">{value.title}</h2>
          <p className="text-muted text-base leading-relaxed max-w-lg mx-auto">{value.subtitle}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {value.items.map((item, i) => {
            const Icon = icons[i % icons.length]
            return (
              <div
                key={item.title}
                className="reveal flex items-start gap-4 bg-cream rounded-2xl border border-beige-md p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <div className="w-11 h-11 rounded-xl bg-beige border border-sand-lt flex items-center justify-center text-sand flex-shrink-0">
                  <Icon className="w-[18px] h-[18px]" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-brown mb-1">{item.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
