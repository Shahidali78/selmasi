'use client'
import { useState } from 'react'
import { useReveal } from '@/hooks/useReveal'
import { mountainClimbing, waLink, waMessages } from '@/data/siteContent'
import { IconWhatsApp, IconMountain } from '@/components/Icons'

const QUICK_OPTIONS = [1, 2, 5, 10]

export default function MountainClimbing() {
  const ref = useReveal()
  const [value, setValue] = useState('1')

  const people = parseInt(value)
  const validPeople = Number.isInteger(people) && people > 0
  const total = validPeople ? people * mountainClimbing.pricePerPerson : 0

  return (
    <section ref={ref} id="mountain-climbing" className="bg-beige py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="reveal max-w-2xl mx-auto">
          <p className="section-label">{mountainClimbing.label}</p>
          <h2 className="section-title">{mountainClimbing.title}</h2>
          <p className="text-muted text-lg leading-relaxed mb-9">{mountainClimbing.text}</p>

          <div className="bg-cream rounded-2xl border-2 border-beige-md p-8 md:p-12">
            {/* Price note */}
            <div className="mb-7 bg-beige rounded-xl p-5 border border-beige-md flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-cream border border-sand-lt flex items-center justify-center text-sand flex-shrink-0">
                <IconMountain className="w-5 h-5" />
              </div>
              <p className="text-base font-medium text-brown">{mountainClimbing.priceNote}</p>
            </div>

            {/* People selector — quick picks + free custom input */}
            <label htmlFor="mc-people" className="block text-[15px] font-semibold text-brown mb-3">
              {mountainClimbing.fieldLabel}
            </label>
            <div className="grid grid-cols-4 gap-3 mb-4">
              {QUICK_OPTIONS.map((n) => (
                <button
                  key={n}
                  onClick={() => setValue(String(n))}
                  className={`py-3.5 px-4 rounded-xl text-[15px] font-semibold border-2 transition-all ${
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
            <input
              id="mc-people"
              type="number"
              min="1"
              placeholder="Or type any number, e.g. 25"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full bg-beige border-[1.5px] border-beige-md focus:border-sand focus:ring-2 focus:ring-sand/20 rounded-xl px-5 py-4 text-brown text-base outline-none transition mb-7"
            />

            {/* Total display */}
            <div className="bg-beige rounded-xl border border-beige-md p-6 mb-7">
              <div className="flex items-baseline justify-between mb-1">
                <p className="text-[13px] text-muted font-medium">{mountainClimbing.title}</p>
                <p className="text-[13px] text-muted">
                  {validPeople
                    ? `${people} ${people === 1 ? 'person' : 'people'} × R${mountainClimbing.pricePerPerson}`
                    : `R${mountainClimbing.pricePerPerson} per person`}
                </p>
              </div>
              <p className="font-display text-4xl md:text-5xl font-bold text-brown">
                {validPeople ? `R${total.toLocaleString('en-US')}` : '—'}
              </p>
              <p className="text-[13px] text-muted mt-1.5">{mountainClimbing.totalLabel}</p>
            </div>

            {/* Booking CTA — enquiry only, no payment */}
            <a
              href={validPeople ? waLink(waMessages.mountain(people, total)) : undefined}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={!validPeople}
              onClick={(e) => { if (!validPeople) e.preventDefault() }}
              className={`w-full font-semibold text-base py-[18px] rounded-xl transition-all flex items-center justify-center gap-2.5 ${
                validPeople
                  ? 'bg-[#25D366] hover:bg-[#1ebe5c] text-white hover:-translate-y-0.5 cursor-pointer'
                  : 'bg-beige-md text-muted cursor-not-allowed'
              }`}
            >
              <IconWhatsApp className="w-5 h-5" />
              {validPeople ? mountainClimbing.btnText : 'Enter number of people'}
            </a>

            <p className="mt-4 text-[13px] text-center text-muted leading-relaxed">
              {mountainClimbing.note}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
