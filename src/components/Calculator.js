'use client'
import { useState } from 'react'
import { useReveal } from '@/hooks/useReveal'
import { pricing, calculator, waLink, waMessages } from '@/data/siteContent'
import { IconWhatsApp } from '@/components/Icons'

function formatRand(n) {
  return `R${n.toLocaleString('en-US')}`
}

export default function Calculator() {
  const ref = useReveal()
  const [learners, setLearners] = useState('')
  const [planIdx, setPlanIdx] = useState(0)

  const plan = pricing.plans[planIdx]
  const n = parseInt(learners)
  const hasLearners = Number.isInteger(n) && n > 0
  const hasMonthlyRate = typeof plan.monthly === 'number' && plan.monthly > 0

  let result = null
  if (hasLearners) {
    const extra = n > pricing.learnerLimit ? (n - pricing.learnerLimit) * pricing.extraPerLearner : 0
    result = {
      setup: plan.setup,
      baseMonthly: plan.monthly,
      extra,
      extraLearners: Math.max(0, n - pricing.learnerLimit),
      monthly: hasMonthlyRate ? plan.monthly + extra : null,
    }
  }

  return (
    <section ref={ref} id="calculator" className="bg-beige py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-5">
        <div className="reveal max-w-xl mx-auto">
          <p className="section-label">{calculator.label}</p>
          <h2 className="section-title">{calculator.title}</h2>
          <p className="text-muted text-base leading-relaxed mb-8">{calculator.text}</p>

          <div className="bg-cream rounded-2xl border-2 border-beige-md p-8 md:p-10">
            {/* Package selection */}
            <label className="block text-sm font-semibold text-brown mb-3">Select Package</label>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {pricing.plans.map((p, i) => (
                <button
                  key={p.name}
                  onClick={() => setPlanIdx(i)}
                  className={`py-3.5 px-4 rounded-xl text-sm font-semibold border-2 transition-all ${
                    planIdx === i
                      ? 'border-sand bg-sand/10 text-brown'
                      : 'border-beige-md bg-beige text-muted hover:border-sand-lt'
                  }`}
                >
                  {p.name}
                  <span className="block text-xs font-normal mt-0.5 opacity-70">
                    Setup: {formatRand(p.setup)}
                  </span>
                </button>
              ))}
            </div>

            {/* Learner input */}
            <label htmlFor="learner-count" className="block text-sm font-semibold text-brown mb-2">
              {calculator.fieldLabel}
            </label>
            <input
              id="learner-count"
              type="number"
              min="1"
              placeholder="e.g. 350"
              value={learners}
              onChange={(e) => setLearners(e.target.value)}
              className="w-full bg-beige border-[1.5px] border-beige-md focus:border-sand focus:ring-2 focus:ring-sand/20 rounded-xl px-4 py-3.5 text-brown text-base outline-none transition mb-6"
            />

            {/* Estimate breakdown */}
            {result && (
              <div className="bg-beige rounded-xl border border-beige-md p-5 mb-6">
                <div className="flex items-baseline justify-between mb-1">
                  <p className="text-xs text-muted font-medium">{plan.name}</p>
                  <p className="text-xs text-muted">Setup Fee (one-time)</p>
                </div>
                <p className="font-display text-3xl md:text-4xl font-bold text-brown mb-4">
                  {formatRand(result.setup)}
                </p>

                {result.monthly !== null ? (
                  <div className="border-t border-beige-md pt-3 space-y-2">
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm text-muted">Base monthly</span>
                      <span className="text-sm font-medium text-brown">{formatRand(result.baseMonthly)}</span>
                    </div>
                    {result.extra > 0 && (
                      <div className="flex items-baseline justify-between">
                        <span className="text-sm text-muted">
                          {result.extraLearners} extra learners × R{pricing.extraPerLearner}
                        </span>
                        <span className="text-sm font-medium text-sand-dk">+{formatRand(result.extra)}</span>
                      </div>
                    )}
                    <div className="flex items-baseline justify-between border-t border-beige-md pt-2">
                      <span className="text-base font-semibold text-brown">Estimated monthly</span>
                      <span className="text-base font-bold text-brown">{formatRand(result.monthly)}/month</span>
                    </div>
                  </div>
                ) : (
                  <p className="border-t border-beige-md pt-3 text-sm text-muted">
                    {calculator.rateUnconfirmed}
                  </p>
                )}
              </div>
            )}

            {/* Enquiry CTA — opens WhatsApp with prefilled package + learner count */}
            <a
              href={hasLearners ? waLink(waMessages.calculator(plan.name, n)) : undefined}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={!hasLearners}
              onClick={(e) => { if (!hasLearners) e.preventDefault() }}
              className={`w-full font-semibold text-[15px] py-4 rounded-xl transition-all flex items-center justify-center gap-2.5 ${
                hasLearners
                  ? 'bg-[#25D366] hover:bg-[#1ebe5c] text-white hover:-translate-y-0.5 shadow-sm cursor-pointer'
                  : 'bg-beige-md text-muted cursor-not-allowed'
              }`}
            >
              <IconWhatsApp className="w-[18px] h-[18px]" />
              {hasLearners ? calculator.btnText : 'Enter learner count to enquire'}
            </a>

            <p className="mt-4 text-xs text-center text-muted leading-relaxed">
              {calculator.disclaimer}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
