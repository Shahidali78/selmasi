'use client'
import { useReveal } from '@/hooks/useReveal'
import { pricing, waLink, waMessages } from '@/data/siteContent'
import { IconWhatsApp, IconCheck } from '@/components/Icons'

export default function Pricing() {
  const ref = useReveal()
  return (
    <section ref={ref} id="packages" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-5">
        <div className="reveal text-center mb-14">
          <p className="section-label">{pricing.label}</p>
          <h2 className="section-title mx-auto">{pricing.title}</h2>
          <p className="text-muted text-base leading-relaxed max-w-lg mx-auto">{pricing.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-14">
          {pricing.plans.map((plan) => {
            const featured = !!plan.featured
            return (
              <div key={plan.name} className="reveal rounded-2xl border border-beige-md bg-cream overflow-hidden flex flex-col">
                <div className={`p-8 pb-6 relative ${featured ? 'bg-brown' : 'bg-beige'}`}>
                  {featured && (
                    <span className="absolute top-5 right-5 text-[10px] font-semibold uppercase tracking-widest bg-sand text-white rounded-full px-3 py-1">
                      Most Complete
                    </span>
                  )}
                  <h3 className={`font-display text-2xl font-bold mb-1 ${featured ? 'text-sand' : 'text-sand-dk'}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-xs mb-4 ${featured ? 'text-white/50' : 'text-muted'}`}>Setup Fee (One-time)</p>
                  <div className={`font-display text-4xl md:text-5xl font-bold mb-3 ${featured ? 'text-white' : 'text-brown'}`}>
                    R{plan.setup.toLocaleString()}
                  </div>
                  <div className={`text-sm font-medium mb-1 ${featured ? 'text-white/80' : 'text-brown'}`}>Monthly:</div>
                  <p className={`text-sm leading-relaxed ${featured ? 'text-white/60' : 'text-muted'}`}>
                    R{plan.monthly.toLocaleString()} (up to {pricing.learnerLimit} learners)<br />
                    + R{pricing.extraPerLearner}/learner (over {pricing.learnerLimit})
                  </p>
                </div>

                <div className={`h-[3px] ${featured ? 'bg-sand' : 'bg-sand-lt'}`} />

                <div className="p-8 flex flex-col flex-1">
                  <p className="text-[11px] font-semibold tracking-widest uppercase text-muted mb-5">What's included</p>
                  <ul className="flex flex-col gap-3.5 mb-6">
                    {plan.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[15px] text-brown leading-snug">
                        <IconCheck className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="bg-beige rounded-xl p-4 border border-beige-md mb-6">
                    <p className="text-sm text-muted leading-relaxed">
                      <strong className="text-brown">Best for:</strong> {plan.bestFor}
                    </p>
                  </div>

                  <div className="mt-auto grid sm:grid-cols-2 gap-3">
                    <a
                      href={waLink(waMessages.packageEnquiry(plan.name))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5c] text-white font-semibold text-sm px-5 py-3.5 rounded-xl transition-all hover:-translate-y-0.5"
                    >
                      <IconWhatsApp className="w-4 h-4" />
                      {pricing.enquireBtn}
                    </a>
                    <a
                      href="#contact"
                      className="inline-flex items-center justify-center gap-2 bg-cream border-2 border-brown text-brown hover:bg-brown hover:text-white font-semibold text-sm px-5 py-3.5 rounded-xl transition-all"
                    >
                      {pricing.detailsBtn}
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="reveal">
          <h3 className="font-display text-xl font-bold text-brown mb-2">Monthly Pricing Examples</h3>
          <p className="text-muted text-sm mb-5">
            First {pricing.learnerLimit} learners: R{pricing.plans[0].monthly.toLocaleString()} flat.
            Each additional learner: +R{pricing.extraPerLearner}/month.
          </p>
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
                    <p className="text-muted text-xs leading-relaxed">Flat rate — within {pricing.learnerLimit} limit</p>
                  ) : (
                    <p className="text-muted text-xs leading-relaxed">
                      R1,500 + {extraKids} × R{pricing.extraPerLearner} = <span className="text-sand-dk font-semibold">+R{ex.extra.toLocaleString()}</span>
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
            Estimate Your Package →
          </a>
        </div>
      </div>
    </section>
  )
}
