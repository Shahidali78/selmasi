'use client'
import { useState } from 'react'
import { useReveal } from '@/hooks/useReveal'
import { pricing, calculator } from '@/data/siteContent'

function formatRand(n) {
  return `R${n.toLocaleString('en-US')}`
}

export default function CalculatorPayment() {
  const ref = useReveal()
  const [learners, setLearners] = useState('')
  const [plan, setPlan] = useState(0)
  const [result, setResult] = useState(null)
  const [payLoading, setPayLoading] = useState(false)
  const [payError, setPayError] = useState('')

  const calc = (val, planIdx) => {
    const n = parseInt(val)
    if (!n || n < 1) { setResult(null); return }
    const p = pricing.plans[planIdx]
    const extra = n > pricing.learnerLimit ? (n - pricing.learnerLimit) * pricing.extraPerLearner : 0
    const monthly = p.monthly + extra
    setResult({ n, setup: p.setup, monthly, extra, planName: p.name, baseMonthly: p.monthly })
  }

  const handleInput = (e) => {
    setLearners(e.target.value)
    calc(e.target.value, plan)
  }

  const handlePlan = (idx) => {
    setPlan(idx)
    calc(learners, idx)
  }

  const handlePayment = async () => {
    if (!result) return
    setPayError('')
    setPayLoading(true)

    try {
      const res = await fetch('/api/paygate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: result.setup,
          planName: result.planName,
          learners: result.n,
          monthlyTotal: result.monthly,
        }),
      })
      const data = await res.json()

      if (!res.ok) {
        setPayError(data.error || 'Payment setup is being finalized. Please contact us to proceed.')
        return
      }

      if (data.redirectUrl) {
        window.open(data.redirectUrl, '_blank')
      } else {
        setPayError('Online payment will be activated once merchant setup is complete.')
      }
    } catch {
      setPayError('Payment setup is being finalized. Please contact us to proceed.')
    } finally {
      setPayLoading(false)
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
            <label className="block text-sm font-semibold text-brown mb-3">Select Package</label>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {pricing.plans.map((p, i) => (
                <button
                  key={p.name}
                  onClick={() => handlePlan(i)}
                  className={`py-3.5 px-4 rounded-xl text-sm font-semibold border-2 transition-all ${
                    plan === i
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

            <label className="block text-sm font-semibold text-brown mb-2">
              {calculator.fieldLabel}
            </label>
            <input
              type="number"
              min="1"
              placeholder="e.g. 350"
              value={learners}
              onChange={handleInput}
              className="w-full bg-beige border-[1.5px] border-beige-md focus:border-sand focus:ring-2 focus:ring-sand/20 rounded-xl px-4 py-3.5 text-brown text-base outline-none transition mb-6"
            />

            {result && (
              <div className="bg-beige rounded-xl border border-beige-md p-5 mb-5">
                <p className="text-xs text-muted font-medium mb-1">{result.planName} — Setup Fee</p>
                <p className="font-display text-4xl font-bold text-brown mb-3">
                  {formatRand(result.setup)}
                </p>
                <div className="text-sm text-muted space-y-1.5">
                  <p className="font-medium text-brown text-base">
                    Monthly: {formatRand(result.monthly)}/month
                  </p>
                  <p>Base monthly: {formatRand(result.baseMonthly)}</p>
                  {result.extra > 0 && (
                    <p>+ {result.n - pricing.learnerLimit} extra learners × R{pricing.extraPerLearner} = {formatRand(result.extra)}</p>
                  )}
                  {result.extra === 0 && (
                    <p>No extra learner fee (within 300 limit)</p>
                  )}
                </div>
              </div>
            )}

            {payError && (
              <div className="mb-4 bg-sand-lt/40 border border-sand-lt rounded-xl p-3.5 text-center">
                <p className="text-xs font-semibold text-sand-dk mb-0.5">Payment Notice</p>
                <p className="text-xs text-muted leading-relaxed">{payError}</p>
              </div>
            )}

            <button
              onClick={handlePayment}
              disabled={!result || payLoading}
              className="w-full bg-brown hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-[15px] py-4 rounded-xl transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              {payLoading ? 'Processing…' : `${calculator.btnText} →`}
            </button>

            <div className="mt-4 bg-sand-lt/40 border border-sand-lt rounded-xl p-3.5 text-center">
              <p className="text-xs font-semibold text-sand-dk mb-0.5">Payment Setup Pending</p>
              <p className="text-xs text-muted leading-relaxed">{calculator.pendingNotice}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
