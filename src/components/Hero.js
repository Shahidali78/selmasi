'use client'
import { useState, useEffect } from 'react'
import { useReveal } from '@/hooks/useReveal'
import { hero, waLink, waMessages } from '@/data/siteContent'
import { IconWhatsApp, IconBolt, IconCalendar, IconUser, IconBell, IconCheck } from '@/components/Icons'

const FLOW_STEPS = [
  {
    Icon: IconWhatsApp,
    iconCls: 'bg-[#25D366]/10 text-[#25D366]',
    title: 'WhatsApp enquiry received',
    desc: '“Hi, do you have space for Grade 4 next year?”',
    time: '14:02',
  },
  {
    Icon: IconBolt,
    iconCls: 'bg-sand/15 text-sand-dk',
    title: 'Automated response sent',
    desc: 'Instant reply with enrollment info & next steps',
    time: '14:02',
  },
  {
    Icon: IconCalendar,
    iconCls: 'bg-sand/15 text-sand-dk',
    title: 'Visit booked & follow-up set',
    desc: 'School tour scheduled, reminder queued',
    time: '14:05',
  },
  {
    Icon: IconUser,
    iconCls: 'bg-sand/15 text-sand-dk',
    title: 'Customer details captured',
    desc: 'Name, contact & grade saved automatically',
    time: '14:05',
  },
  {
    Icon: IconBell,
    iconCls: 'bg-brown/10 text-brown',
    title: 'Business notified',
    desc: 'New qualified lead ready for the team',
    time: '14:06',
  },
]

const STEP_MS = 1700
const HOLD_MS = 3800

function AutomationMockup() {
  const [active, setActive] = useState(0)
  const done = active === FLOW_STEPS.length - 1

  useEffect(() => {
    const t = setTimeout(
      () => setActive((a) => (a + 1) % FLOW_STEPS.length),
      done ? HOLD_MS : STEP_MS
    )
    return () => clearTimeout(t)
  }, [active, done])

  return (
    <div className="float-card bg-white rounded-3xl border border-beige-md shadow-xl p-7 max-w-[480px] mx-auto">
      <div className="flex items-center justify-between pb-4 border-b border-beige-md mb-6">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] pulse-dot" />
          <span className="text-[15px] font-semibold text-brown">Automation in action</span>
        </div>
        <span className="text-xs font-medium text-muted bg-beige rounded-full px-3.5 py-1.5">Live flow</span>
      </div>

      <div className="space-y-4">
        {FLOW_STEPS.map((step, i, arr) => {
          const isActive = i === active
          const isDone = i < active
          const isPending = i > active
          return (
            <div key={step.title} className="relative flex items-start gap-4">
              {i < arr.length - 1 && (
                <span
                  className={`absolute left-[21px] top-11 bottom-[-16px] w-px transition-colors duration-500 ${
                    isDone ? 'bg-[#25D366]/40' : 'bg-beige-md'
                  }`}
                  aria-hidden="true"
                />
              )}
              <div
                key={isActive ? `icon-active-${active}` : `icon-${i}`}
                className={`relative w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-500 ${step.iconCls} ${
                  isActive ? 'icon-pop ring-2 ring-sand/50 shadow-md' : ''
                } ${isPending ? 'opacity-40' : ''}`}
              >
                <step.Icon className="w-5 h-5" />
              </div>
              <div
                className={`flex-1 rounded-xl px-4 py-3.5 border transition-all duration-500 ${
                  isActive
                    ? 'bg-white border-sand shadow-lg scale-[1.02]'
                    : isDone
                    ? 'bg-beige/60 border-beige-md'
                    : 'bg-beige/40 border-beige-md opacity-40'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <p className="text-sm font-semibold text-brown">{step.title}</p>
                  <span className="flex items-center gap-1.5 text-[11px] text-muted flex-shrink-0">
                    {isDone && <IconCheck className="w-3 h-3 text-[#25D366]" />}
                    {step.time}
                  </span>
                </div>
                {isActive && !isDone ? (
                  <div className="flex items-center gap-2">
                    <p className="text-[13px] text-muted leading-snug step-in">{step.desc}</p>
                  </div>
                ) : (
                  <p className="text-[13px] text-muted leading-snug">{step.desc}</p>
                )}
                {isActive && i < arr.length - 1 && (
                  <div className="flex gap-1 mt-2" aria-hidden="true">
                    <span className="typing-dot w-1.5 h-1.5 rounded-full bg-sand" />
                    <span className="typing-dot w-1.5 h-1.5 rounded-full bg-sand" />
                    <span className="typing-dot w-1.5 h-1.5 rounded-full bg-sand" />
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div
        className={`mt-6 pt-4 border-t border-beige-md flex items-center justify-center gap-2 text-[13px] font-medium transition-all duration-500 ${
          done ? 'text-[#25D366]' : 'text-muted'
        }`}
      >
        <IconCheck className={`w-4 h-4 text-[#25D366] transition-transform duration-500 ${done ? 'scale-125' : ''}`} />
        Handled automatically — no admin time spent
      </div>
    </div>
  )
}

export default function Hero() {
  const ref = useReveal()

  return (
    <section ref={ref} id="home" className="relative min-h-screen flex items-center overflow-hidden pt-16">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 65% 65% at 85% 35%, #e8d5b0 0%, transparent 60%),' +
            'radial-gradient(ellipse 50% 50% at 15% 75%, #ede3d5 0%, transparent 55%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8 w-full py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <div className="reveal inline-flex items-center gap-2.5 bg-beige border border-sand-lt rounded-full px-5 py-2.5 mb-8">
              <IconBolt className="w-4 h-4 text-sand" />
              <span className="text-[13px] font-semibold tracking-widest uppercase text-accent">
                Practical Automation
              </span>
            </div>

            <h1 className="reveal font-display text-[2.9rem] md:text-[3.8rem] lg:text-[4.5rem] font-bold text-brown leading-[1.06] mb-7">
              Smart Business Automation for{' '}
              <span className="text-sand">Growing Companies</span>
            </h1>

            <p className="reveal text-muted text-lg md:text-xl leading-relaxed mb-10 max-w-[580px]">
              {hero.subheading}
            </p>

            <div className="reveal flex flex-col sm:flex-row gap-4 mb-11">
              <a
                href="#contact"
                className="inline-flex justify-center items-center gap-2 bg-brown hover:bg-accent text-white font-semibold text-base px-9 py-[18px] rounded-xl transition-all hover:-translate-y-0.5 shadow-md"
              >
                {hero.cta1} →
              </a>
              <a
                href={waLink(waMessages.general)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center items-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5c] text-white font-semibold text-base px-9 py-[18px] rounded-xl transition-all hover:-translate-y-0.5 shadow-sm"
              >
                <IconWhatsApp className="w-5 h-5" />
                {hero.cta2}
              </a>
            </div>

            <p className="reveal text-base text-muted leading-relaxed border-t border-beige-md pt-8 max-w-[540px]">
              {hero.intro}
            </p>
          </div>

          <div className="hidden md:block reveal">
            <AutomationMockup />
          </div>
        </div>
      </div>
    </section>
  )
}
