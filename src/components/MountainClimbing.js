'use client'
import { useState } from 'react'
import { useReveal } from '@/hooks/useReveal'
import { mountainClimbing, site } from '@/data/siteContent'
import { IconWhatsApp } from '@/components/Icons'

const PEOPLE_OPTIONS = [1, 2, 3, 4]

export default function MountainClimbing() {
  const ref = useReveal()
  const [people, setPeople] = useState(1)
  const [payStatus, setPayStatus] = useState('idle') // idle | loading | notice
  const [payMsg, setPayMsg] = useState('')

  const total = people * mountainClimbing.pricePerPerson

  const handleSelect = (n) => {
    setPeople(n)
    setPayStatus('idle')
    setPayMsg('')
  }

  const handlePayment = async () => {
    setPayMsg('')
    setPayStatus('loading')

    try {
      const res = await fetch('/api/paygate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: total,
          planName: 'Mountain Climbing',
          learners: people,
        }),
      })
      const data = await res.json()

      if (!res.ok) {
        setPayStatus('notice')
        setPayMsg(data.error || 'Online payment is being finalized. Please contact us to proceed.')
        return
      }

      if (data.redirectUrl) {
        window.open(data.redirectUrl, '_blank')
        setPayStatus('idle')
      } else {
        setPayStatus('notice')
        setPayMsg('Online payment is being finalized. Please contact us to proceed.')
      }
    } catch {
      setPayStatus('notice')
      setPayMsg('Online payment is being finalized. Please contact us to proceed.')
    }
  }

  return (
    <section ref={ref} id="mountain-climbing" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-5">
        <div className="reveal max-w-xl mx-auto">
          <p className="section-label">{mountainClimbing.label}</p>
          <h2 className="section-title">{mountainClimbing.title}</h2>
          <p className="text-muted text-base leading-relaxed mb-8">{mountainClimbing.text}</p>

          <div className="bg-cream rounded-2xl border-2 border-beige-md p-8 md:p-10">
            {/* Price note */}
            <div className="flex items-center gap-3 mb-6 bg-beige rounded-xl p-4 border border-beige-md">
              <span className="text-2xl leading-none">⛰️</span>
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
                  onClick={() => handleSelect(n)}
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
                <p className="text-xs text-muted font-medium">Mountain Climbing</p>
                <p className="text-xs text-muted">
                  {people} {people === 1 ? 'person' : 'people'} × R{mountainClimbing.pricePerPerson}
                </p>
              </div>
              <p className="font-display text-3xl md:text-4xl font-bold text-brown">
                R{total}
              </p>
              <p className="text-xs text-muted mt-1">{mountainClimbing.totalLabel}</p>
            </div>

            {/* Payment button */}
            <button
              onClick={handlePayment}
              disabled={payStatus === 'loading'}
              className="w-full bg-brown hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-[15px] py-4 rounded-xl transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              {payStatus === 'loading' ? 'Processing…' : `${mountainClimbing.btnText} →`}
            </button>

            {/* Fallback notice */}
            {payStatus === 'notice' && payMsg ? (
              <div className="mt-4 bg-sand-lt/30 border border-sand-lt rounded-xl p-4 text-center">
                <p className="text-sm text-brown leading-relaxed">{payMsg}</p>
                <a
                  href={`${site.whatsappUrl}?text=Hi%20Selmasi%2C%20I'd%20like%20to%20pay%20for%20${people}%20${people === 1 ? 'person' : 'people'}%20for%20Mountain%20Climbing%20(R${total}).`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-3 text-sm font-semibold text-[#25D366] hover:underline"
                >
                  <IconWhatsApp className="w-4 h-4" />
                  Contact us on WhatsApp
                </a>
              </div>
            ) : (
              <p className="mt-3 text-xs text-center text-muted leading-relaxed">
                {mountainClimbing.pendingNotice}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
