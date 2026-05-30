'use client'
import { useReveal } from '@/hooks/useReveal'
import { testimonials } from '@/data/siteContent'
import { IconChat } from '@/components/Icons'

export default function Testimonials() {
  const ref = useReveal()
  return (
    <section ref={ref} id="testimonials" className="bg-beige py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-5">
        <div className="reveal">
          <p className="section-label">{testimonials.label}</p>
          <h2 className="section-title">{testimonials.title}</h2>
        </div>
        <div className="reveal mt-10 bg-cream border-2 border-dashed border-beige-md rounded-2xl p-14 text-center">
          <div className="w-12 h-12 rounded-full bg-beige mx-auto flex items-center justify-center text-muted/40 mb-4">
            <IconChat className="w-6 h-6" />
          </div>
          <h4 className="font-display text-xl text-muted mb-2">Coming Soon</h4>
          <p className="text-sm text-muted/60">{testimonials.placeholder}</p>
        </div>
      </div>
    </section>
  )
}
