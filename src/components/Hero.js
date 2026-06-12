'use client'
import { useReveal } from '@/hooks/useReveal'
import { hero, waLink, waMessages } from '@/data/siteContent'
import { IconWhatsApp, IconBolt, IconCalendar, IconUser, IconBell, IconCheck } from '@/components/Icons'

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

      <div className="relative max-w-6xl mx-auto px-5 w-full py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <div className="reveal inline-flex items-center gap-2.5 bg-beige border border-sand-lt rounded-full px-5 py-2 mb-7">
              <IconBolt className="w-3.5 h-3.5 text-sand" />
              <span className="text-xs font-semibold tracking-widest uppercase text-accent">
                Practical Automation
              </span>
            </div>

            <h1 className="reveal font-display text-[2.6rem] md:text-[3.2rem] lg:text-[3.8rem] font-bold text-brown leading-[1.08] mb-6">
              Smart Business Automation for{' '}
              <span className="text-sand">Growing Companies</span>
            </h1>

            <p className="reveal text-muted text-[1.1rem] md:text-lg leading-relaxed mb-9 max-w-[540px]">
              {hero.subheading}
            </p>

            <div className="reveal flex flex-col sm:flex-row gap-3.5 mb-10">
              <a
                href="#contact"
                className="inline-flex justify-center items-center gap-2 bg-brown hover:bg-accent text-white font-semibold text-[15px] px-8 py-4 rounded-lg transition-all hover:-translate-y-0.5 shadow-md"
              >
                {hero.cta1} →
              </a>
              <a
                href={waLink(waMessages.general)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center items-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5c] text-white font-semibold text-[15px] px-8 py-4 rounded-lg transition-all hover:-translate-y-0.5 shadow-sm"
              >
                <IconWhatsApp className="w-[18px] h-[18px]" />
                {hero.cta2}
              </a>
            </div>

            <p className="reveal text-[15px] text-muted leading-relaxed border-t border-beige-md pt-7 max-w-[500px]">
              {hero.intro}
            </p>
          </div>

          {/* Automation flow mockup — how an enquiry moves through the system */}
          <div className="hidden md:block reveal">
            <div className="bg-white rounded-3xl border border-beige-md shadow-xl p-6 max-w-[420px] mx-auto">
              <div className="flex items-center justify-between pb-4 border-b border-beige-md mb-5">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] pulse-dot" />
                  <span className="text-sm font-semibold text-brown">Automation in action</span>
                </div>
                <span className="text-[11px] font-medium text-muted bg-beige rounded-full px-3 py-1">Live flow</span>
              </div>

              <div className="space-y-3.5">
                {[
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
                ].map((step, i, arr) => (
                  <div key={step.title} className="relative flex items-start gap-3.5">
                    {i < arr.length - 1 && (
                      <span className="absolute left-[19px] top-10 bottom-[-14px] w-px bg-beige-md" aria-hidden="true" />
                    )}
                    <div className={`relative w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${step.iconCls}`}>
                      <step.Icon className="w-[18px] h-[18px]" />
                    </div>
                    <div className="flex-1 bg-beige/60 border border-beige-md rounded-xl px-4 py-3">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <p className="text-[13px] font-semibold text-brown">{step.title}</p>
                        <span className="text-[10px] text-muted flex-shrink-0">{step.time}</span>
                      </div>
                      <p className="text-xs text-muted leading-snug">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-beige-md flex items-center justify-center gap-2 text-xs font-medium text-muted">
                <IconCheck className="w-3.5 h-3.5 text-[#25D366]" />
                Handled automatically — no admin time spent
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
