'use client'
import { useState } from 'react'
import { useReveal } from '@/hooks/useReveal'
import { mountainClimbing, waLink, waMessages } from '@/data/siteContent'
import { IconWhatsApp, IconMountain } from '@/components/Icons'

const PEOPLE_OPTIONS = [1, 2, 3, 4]

export default function MountainClimbing() {
  const ref = useReveal()
  const [people, setPeople] = useState(1)

  const total = people * mountainClimbing.pricePerPerson

  return (
    <section ref={ref} id="mountain-climbing" className="bg-beige py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-5">
        <div className="reveal max-w-xl mx-auto">
          <p className="section-label">{mountainClimbing.label}</p>
          <h2 className="section-title">{mountainClimbing.title}</h2>
          <p className="text-muted text-base leading-relaxed mb-8">{mountainClimbing.text}</p>

          <div className="bg-cream rounded-2xl border-2 border-beige-md p-8 md:p-10">
            {/* Price note */}
            <div className="mb-6 bg-beige rounded-xl p-4 border border-beige-md flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-cream border border-sand-lt flex items-center justify-center text-sand flex-shrink-0">
                <IconMountain className="w-4 h-4" />
              </div>
              <p className="text-sm font-medium text-brown">{mountainClimbing.priceNote}</p>
            </div>

            {/* People selector */}
            <label className="block text-sm font-semibold text-brown mb-3">
              {mountainClimbing.fieldLabel}
            </label>
            <div className="grid grid-cols-4 gap-3 mb-6">
              {PEOPLE_OPTIONS.map((n) => (
                <button
                  key={n}
                  onClick={() => setPeople(n)}
                  className={`py-3.5 px-4 rounded-xl text-sm font-semibold border-2 transition-all ${
                    people === n
                      ? 'border-sand bg-sand/10 text-brown'
                      : 'border-beige-md bg-beige text-muted hover:border-sand-lt'
                  }`}
                >
                  {n}
                  <span className="block text-xs font-normal mt-0.5 opacity-70">
                    {n === 1 ? 'person' : 'people'}
                  </span>
                </button>
              ))}
            </div>

            {/* Total display */}
            <div className="bg-beige rounded-xl border border-beige-md p-5 mb-6">
              <div className="flex items-baseline justify-between mb-1">
                <p className="text-xs text-muted font-medium">{mountainClimbing.title}</p>
                <p className="text-xs text-muted">
                  {people} {people === 1 ? 'person' : 'people'} × R{mountainClimbing.pricePerPerson}
                </p>
              </div>
              <p className="font-display text-3xl md:text-4xl font-bold text-brown">
                R{total}
              </p>
              <p className="text-xs text-muted mt-1">{mountainClimbing.totalLabel}</p>
            </div>

            {/* Booking CTA — enquiry only, no payment */}
            <a
              href={waLink(waMessages.mountain(people, total))}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#1ebe5c] text-white font-semibold text-[15px] py-4 rounded-xl transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2.5"
            >
              <IconWhatsApp className="w-[18px] h-[18px]" />
              {mountainClimbing.btnText}
            </a>

            <p className="mt-4 text-xs text-center text-muted leading-relaxed">
              {mountainClimbing.note}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
