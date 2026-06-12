'use client'
import { useReveal } from '@/hooks/useReveal'
import { about } from '@/data/siteContent'

export default function About() {
  const ref = useReveal()
  return (
    <section ref={ref} className="bg-brown-md py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex flex-col md:flex-row md:items-center gap-10 md:gap-16">
          <div className="flex-1 reveal">
            <p className="section-label text-sand">{about.label}</p>
            <p className="text-white/80 text-lg md:text-xl leading-relaxed">{about.text}</p>
          </div>
          <div className="flex gap-10 md:gap-16 flex-shrink-0 reveal">
            {about.stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-4xl md:text-5xl font-bold text-sand">{s.value}</div>
                <div className="text-white/50 text-[11px] uppercase tracking-widest mt-2">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
