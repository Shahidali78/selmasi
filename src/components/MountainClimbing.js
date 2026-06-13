'use client'
import { useState } from 'react'
import { useReveal } from '@/hooks/useReveal'
import { mountainClimbing, payfast, waLink, waMessages } from '@/data/siteContent'
import { IconWhatsApp, IconMountain } from '@/components/Icons'
import PayfastButton from '@/components/PayfastButton'

export default function MountainClimbing() {
  const ref = useReveal()
  const [value, setValue] = useState('')

  const people = parseInt(value)
  const validPeople = Number.isInteger(people) && people > 0
  const total = validPeople ? people * mountainClimbing.pricePerPerson : 0

  return (
    <section ref={ref} id="mountain-climbing" className="section-pad-sm">
      <div className="container-x">
        <div className="reveal max-w-5xl mx-auto rounded-2xl border border-beige-md bg-beige overflow-hidden grid md:grid-cols-[1.1fr_1fr]">
          {/* Left — context / optional activity */}
          <div className="p-7 md:p-9 flex flex-col justify-center">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-9 h-9 rounded-xl bg-cream border border-sand-lt flex items-center justify-center text-sand flex-shrink-0">
                <IconMountain className="w-[18px] h-[18px]" />
              </span>
              <span className="text-[12px] font-semibold tracking-[0.16em] uppercase text-sand">{mountainClimbing.label}</span>
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-brown mb-2">{mountainClimbing.title}</h2>
            <p className="text-muted text-[15px] leading-relaxed mb-4">{mountainClimbing.text}</p>
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-brown">
              <span className="bg-sand/15 text-sand-dk rounded-full px-3 py-1">{mountainClimbing.priceNote}</span>
            </p>
          </div>

          {/* Right — compact booking widget */}
          <div className="bg-cream border-t md:border-t-0 md:border-l border-beige-md p-7 md:p-9">
            <label htmlFor="mc-people" className="block text-sm font-semibold text-brown mb-2">
              {mountainClimbing.fieldLabel}
            </label>
            <input
              id="mc-people"
              type="number"
              min="1"
              placeholder="e.g. 10"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full bg-beige border-[1.5px] border-beige-md focus:border-sand focus:ring-2 focus:ring-sand/20 rounded-xl px-4 py-3.5 text-brown text-base outline-none transition mb-4"
            />

            <div className="flex items-baseline justify-between mb-5">
              <span className="text-sm text-muted">{mountainClimbing.totalLabel}</span>
              <span className="font-display text-2xl font-bold text-brown">
                {validPeople ? `R${total.toLocaleString('en-US')}` : '—'}
              </span>
            </div>

            <div className="space-y-2.5">
              {/* Pay the calculated total online */}
              <PayfastButton
                type={payfast.types.mountain}
                qty={validPeople ? people : undefined}
                disabled={!validPeople}
                label={validPeople ? `Pay R${total.toLocaleString('en-US')} with PayFast` : 'Enter number of people'}
              />
              {/* Or book via WhatsApp (enquiry only) */}
              <a
                href={validPeople ? waLink(waMessages.mountain(people, total)) : undefined}
                target="_blank"
                rel="noopener noreferrer"
                aria-disabled={!validPeople}
                onClick={(e) => { if (!validPeople) e.preventDefault() }}
                className={`w-full font-semibold text-[15px] py-3.5 rounded-xl transition-all flex items-center justify-center gap-2.5 ${
                  validPeople
                    ? 'bg-[#25D366] hover:bg-[#1ebe5c] text-white hover:-translate-y-0.5 cursor-pointer'
                    : 'bg-beige-md text-muted cursor-not-allowed'
                }`}
              >
                <IconWhatsApp className="w-[18px] h-[18px]" />
                {validPeople ? mountainClimbing.btnText : 'Enter number of people'}
              </a>
            </div>

            <p className="mt-3 text-[12px] text-center text-muted leading-relaxed">
              {mountainClimbing.note}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
