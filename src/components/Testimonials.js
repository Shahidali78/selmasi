'use client'
import { useReveal } from '@/hooks/useReveal'
import { testimonials } from '@/data/siteContent'
import { IconStar } from '@/components/Icons'

export default function Testimonials() {
  const ref = useReveal()
  return (
    <section ref={ref} id="testimonials" className="bg-beige py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-5">
        <div className="reveal text-center mb-14">
          <p className="section-label">{testimonials.label}</p>
          <h2 className="section-title mx-auto">{testimonials.title}</h2>
          <p className="text-muted text-base leading-relaxed max-w-lg mx-auto">{testimonials.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.items.map((t, i) => (
            <figure
              key={t.name}
              className="reveal bg-cream rounded-2xl border border-beige-md p-8 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="flex gap-1 text-sand mb-5" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, s) => (
                  <IconStar key={s} className="w-4 h-4" />
                ))}
              </div>
              <blockquote className="text-brown text-[15px] leading-relaxed mb-6 flex-1">
                “{t.quote}”
              </blockquote>
              <figcaption className="flex items-center gap-3.5 border-t border-beige-md pt-5">
                <div className="w-11 h-11 rounded-full bg-sand/15 border border-sand-lt flex items-center justify-center text-sand-dk font-display font-bold text-base flex-shrink-0">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-brown text-sm">{t.name}</p>
                  <p className="text-muted text-xs">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
