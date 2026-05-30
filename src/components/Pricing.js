'use client'
import { useReveal } from '@/hooks/useReveal'
import { pricing } from '@/data/siteContent'

export default function Pricing() {
  const ref = useReveal()
  return (
    <section ref={ref} id="pricing" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-5">
        <div className="reveal text-center mb-14">
          <p className="section-label">{pricing.label}</p>
          <h2 className="section-title mx-auto">{pricing.title}</h2>
          <p className="text-muted text-base leading-relaxed max-w-lg mx-auto">{pricing.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-14">
          {pricing.plans.map((plan, i) => (
            <div key={plan.name} className="reveal rounded-2xl border border-beige-md bg-cream overflow-hidden">
              <div className={`p-8 pb-6 ${i === 1 ? 'bg-brown' : 'bg-beige'}`}>
                <h3 className={`font-display text-2xl font-bold mb-1 ${i === 1 ? 'text-sand' : 'text-sand-dk'}`}>
                  {plan.name}
                </h3>
                <p className={`text-xs mb-4 ${i === 1 ? 'text-white/50' : 'text-muted'}`}>Setup Fee (One-time)</p>
                <div className={`font-display text-4xl md:text-5xl font-bold mb-3 ${i === 1 ? 'text-white' : 'text-brown'}`}>
                  R{plan.setup.toLocaleString()}
                </div>
                <div className={`text-sm font-medium mb-1 ${i === 1 ? 'text-white/80' : 'text-brown'}`}>Monthly:</div>
                <p className={`text-sm leading-relaxed ${i === 1 ? 'text-white/60' : 'text-muted'}`}>
                  R{plan.monthly.toLocaleString()} (up to 300 kids)<br />
                  + R5/child (over 300 kids)
                </p>
              </div>

              <div className={`h-[3px] ${i === 1 ? 'bg-sand' : 'bg-sand-lt'}`} />

              <div className="p-8">
                <p className="text-[11px] font-semibold tracking-widest uppercase text-muted mb-5">What's included</p>
                <ul className="flex flex-col gap-3.5 mb-6">
                  {plan.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[15px] text-brown leading-snug">
                      <span className="text-green-600 mt-0.5 flex-shrink-0 font-bold text-sm">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="bg-beige rounded-xl p-4 border border-beige-md">
                  <p className="text-sm text-muted leading-relaxed">
                    <strong className="text-brown">Best for:</strong> {plan.bestFor}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="reveal">
          <h3 className="font-display text-xl font-bold text-brown mb-2">Monthly Pricing Examples</h3>
          <p className="text-muted text-sm mb-5">First 300 learners: R1,500 flat. Each additional learner: +R5/month.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {pricing.examples.map((ex) => {
              const extraKids = ex.extra > 0 ? ex.kids - pricing.learnerLimit : 0
              return (
                <div
                  key={ex.kids}
                  className={`rounded-xl p-4 border text-sm ${
                    ex.extra > 0
                      ? 'bg-sand-lt/30 border-sand-lt'
                      : 'bg-cream border-beige-md'
                  }`}
                >
                  <div className="font-semibold text-brown mb-2">{ex.kids} Learners</div>
                  {ex.extra === 0 ? (
                    <p className="text-muted text-xs leading-relaxed">Flat rate — within 300 limit</p>
                  ) : (
                    <p className="text-muted text-xs leading-relaxed">
                      R1,500 + {extraKids} × R5 = <span className="text-sand-dk font-semibold">+R{ex.extra.toLocaleString()}</span>
                    </p>
                  )}
                  <p className="font-display font-bold text-brown text-lg mt-2">
                    R{ex.monthly.toLocaleString()}<span className="text-xs font-normal text-muted">/month</span>
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        <div className="text-center mt-10">
          <a
            href="#calculator"
            className="inline-flex items-center gap-2 bg-sand hover:bg-sand-dk text-white font-semibold text-[15px] px-8 py-3.5 rounded-lg transition-all hover:-translate-y-0.5"
          >
            Calculate Your Total →
          </a>
        </div>
      </div>
    </section>
  )
}
