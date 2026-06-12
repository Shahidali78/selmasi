'use client'
import { useReveal } from '@/hooks/useReveal'
import { value } from '@/data/siteContent'
import { IconBolt, IconInbox, IconRefresh, IconLayers, IconWhatsApp, IconClock } from '@/components/Icons'

// One unique colour identity per benefit card
const tiles = [
  { Icon: IconBolt,     cls: 'bg-gradient-to-br from-amber-400 to-orange-500 shadow-md shadow-orange-400/40' },
  { Icon: IconInbox,    cls: 'bg-gradient-to-br from-sky-400 to-blue-600 shadow-md shadow-blue-400/40' },
  { Icon: IconRefresh,  cls: 'bg-gradient-to-br from-violet-400 to-purple-600 shadow-md shadow-purple-400/40' },
  { Icon: IconLayers,   cls: 'bg-gradient-to-br from-teal-400 to-cyan-600 shadow-md shadow-teal-400/40' },
  { Icon: IconWhatsApp, cls: 'bg-gradient-to-br from-emerald-400 to-green-600 shadow-md shadow-green-400/40' },
  { Icon: IconClock,    cls: 'bg-gradient-to-br from-rose-400 to-pink-600 shadow-md shadow-rose-400/40' },
]

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
            const { Icon, cls } = tiles[i % tiles.length]
            return (
              <div
                key={item.title}
                className="reveal group flex items-start gap-4 bg-cream rounded-2xl border border-beige-md p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${cls}`}>
                  <Icon className="w-5 h-5" />
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
