'use client'
import { useState } from 'react'
import { useReveal } from '@/hooks/useReveal'
import { pricing, calculator, site } from '@/data/siteContent'
import { IconWhatsApp } from '@/components/Icons'

function formatRand(n) {
  return `R${n.toLocaleString('en-US')}`
}

export default function CalculatorPayment() {
  const ref = useReveal()
  const [learners, setLearners] = useState('')
  const [plan, setPlan] = useState(0)
  const [result, setResult] = useState(null)
  const [payStatus, setPayStatus] = useState('idle') // idle | loading | notice
  const [payMsg, setPayMsg] = useState('')

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
    setPayStatus('idle')
    setPayMsg('')
  }

  const handlePlan = (idx) => {
    setPlan(idx)
    calc(learners, idx)
    setPayStatus('idle')
    setPayMsg('')
  }

  const handlePayment = async () => {
    if (!result) return
    setPayMsg('')
    setPayStatus('loading')

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
        setPayStatus('notice')
        setPayMsg(data.error || 'Online payment is being finalized. Please contact us to proceed.')
        return
      }

      if (data.redirectUrl) {
        window.open(data.redirectUrl, '_blank')
        setPayStatus('idle')
      } else {
        setPayStatus('notice')
        setPayMsg('Online payment is being finalized. Please contact us to proceed while the PayGate setup is completed.')
      }
    } catch {
      setPayStatus('notice')
      setPayMsg('Online payment is being finalized. Please contact us to proceed while the PayGate setup is completed.')
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

            {/* Learner input */}
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

            {/* Results breakdown */}
            {result && (
              <div className="bg-beige rounded-xl border border-beige-md p-5 mb-6">
                <div className="flex items-baseline justify-between mb-1">
                  <p className="text-xs text-muted font-medium">{result.planName}</p>
                  <p className="text-xs text-muted">Setup Fee (one-time)</p>
                </div>
                <p className="font-display text-3xl md:text-4xl font-bold text-brown mb-4">
                  {formatRand(result.setup)}
                </p>

                <div className="border-t border-beige-md pt-3 space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-muted">Base monthly</span>
                    <span className="text-sm font-medium text-brown">{formatRand(result.baseMonthly)}</span>
                  </div>
                  {result.extra > 0 && (
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm text-muted">
                        {result.n - pricing.learnerLimit} extra learners × R{pricing.extraPerLearner}
                      </span>
                      <span className="text-sm font-medium text-sand-dk">+{formatRand(result.extra)}</span>
                    </div>
                  )}
                  <div className="flex items-baseline justify-between border-t border-beige-md pt-2">
                    <span className="text-base font-semibold text-brown">Monthly total</span>
                    <span className="text-base font-bold text-brown">{formatRand(result.monthly)}/month</span>
                  </div>
                </div>
              </div>
            )}

            {/* Payment action */}
            <button
              onClick={handlePayment}
              disabled={!result || payStatus === 'loading'}
              className="w-full bg-brown hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-[15px] py-4 rounded-xl transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              {payStatus === 'loading' ? 'Processing…' : `${calculator.btnText} →`}
            </button>

            {/* Single payment notice — only one, not two */}
            {payStatus === 'notice' && payMsg ? (
              <div className="mt-4 bg-sand-lt/30 border border-sand-lt rounded-xl p-4 text-center">
                <p className="text-sm text-brown leading-relaxed">{payMsg}</p>
                <a
                  href={`${site.whatsappUrl}?text=Hi%20Selmasi%2C%20I'd%20like%20to%20proceed%20with%20payment%20for%20the%20${encodeURIComponent(result?.planName || '')}%20package.`}
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
                {calculator.pendingNotice}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
