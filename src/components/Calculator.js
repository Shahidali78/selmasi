'use client'
import { useState } from 'react'
import { useReveal } from '@/hooks/useReveal'
import { pricing, calculator, payfast, waLink, waMessages } from '@/data/siteContent'
import { IconWhatsApp } from '@/components/Icons'
import PayfastButton from '@/components/PayfastButton'

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
    <section ref={ref} id="calculator" className="bg-beige section-pad">
      <div className="container-x">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left — explanation + package summary */}
          <div className="reveal">
            <p className="section-label">{calculator.label}</p>
            <h2 className="section-title">{calculator.title}</h2>
            <p className="text-muted text-lg leading-relaxed mb-8">{calculator.text}</p>

            <div className="space-y-3">
              {pricing.plans.map((p, i) => (
                <button
                  key={p.name}
                  onClick={() => setPlanIdx(i)}
                  className={`w-full text-left flex items-center justify-between gap-4 rounded-xl border-2 px-5 py-4 transition-all ${
                    planIdx === i
                      ? 'border-sand bg-cream shadow-sm'
                      : 'border-beige-md bg-beige hover:border-sand-lt'
                  }`}
                >
                  <span>
                    <span className="block text-[15px] font-semibold text-brown">{p.name}</span>
                    <span className="block text-[13px] text-muted">{p.bestFor.split(' looking')[0].split(' ready')[0]}</span>
                  </span>
                  <span className="text-right flex-shrink-0">
                    <span className="block font-display text-lg font-bold text-brown">{formatRand(p.setup)}</span>
                    <span className="block text-[11px] text-muted uppercase tracking-wide">setup</span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right — calculator card */}
          <div className="reveal bg-cream rounded-2xl border-2 border-beige-md p-7 md:p-9 shadow-lg">
            <div className="flex items-center justify-between gap-3 pb-5 mb-6 border-b border-beige-md">
              <span className="text-[15px] font-semibold text-brown">Your estimate</span>
              <span className="text-xs font-semibold text-sand-dk bg-sand/10 rounded-full px-3 py-1">{plan.name}</span>
            </div>

            {/* Learner input */}
            <label htmlFor="learner-count" className="block text-[15px] font-semibold text-brown mb-2">
              {calculator.fieldLabel}
            </label>
            <input
              id="learner-count"
              type="number"
              min="1"
              placeholder="e.g. 350"
              value={learners}
              onChange={(e) => setLearners(e.target.value)}
              className="w-full bg-beige border-[1.5px] border-beige-md focus:border-sand focus:ring-2 focus:ring-sand/20 rounded-xl px-5 py-4 text-brown text-base outline-none transition mb-7"
            />

            {/* Empty-state helper */}
            {!result && (
              <div className="bg-beige rounded-xl border border-dashed border-beige-md p-6 mb-7 text-center">
                <p className="text-sm text-muted leading-relaxed">
                  Enter your learner count above to see the <strong className="text-brown">{plan.name}</strong> setup fee and estimated monthly cost.
                </p>
              </div>
            )}

            {/* Estimate breakdown */}
            {result && (
              <div className="bg-beige rounded-xl border border-beige-md p-6 mb-7">
                <div className="flex items-baseline justify-between mb-1">
                  <p className="text-[13px] text-muted font-medium">{plan.name}</p>
                  <p className="text-[13px] text-muted">Setup Fee (one-time)</p>
                </div>
                <p className="font-display text-4xl md:text-5xl font-bold text-brown mb-4">
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

            {/* Actions — pay the once-off setup fee online, or enquire on WhatsApp */}
            <div className="space-y-3">
              <PayfastButton
                type={plan.payType}
                qty={hasLearners ? n : undefined}
                label={`Pay Setup Fee · ${formatRand(plan.setup)}`}
                className="w-full inline-flex items-center justify-center gap-2.5 bg-sand hover:bg-sand-dk text-white font-semibold text-base py-[18px] rounded-xl transition-all hover:-translate-y-0.5 shadow-sm"
              />
              <a
                href={hasLearners ? waLink(waMessages.calculator(plan.name, n)) : undefined}
                target="_blank"
                rel="noopener noreferrer"
                aria-disabled={!hasLearners}
                onClick={(e) => { if (!hasLearners) e.preventDefault() }}
                className={`w-full font-semibold text-base py-[18px] rounded-xl transition-all flex items-center justify-center gap-2.5 ${
                  hasLearners
                    ? 'bg-[#25D366] hover:bg-[#1ebe5c] text-white hover:-translate-y-0.5 shadow-sm cursor-pointer'
                    : 'bg-beige-md text-muted cursor-not-allowed'
                }`}
              >
                <IconWhatsApp className="w-5 h-5" />
                {hasLearners ? calculator.btnText : 'Enter learner count to enquire'}
              </a>
            </div>

            <p className="mt-4 text-[13px] text-center text-muted leading-relaxed">
              {calculator.disclaimer}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
