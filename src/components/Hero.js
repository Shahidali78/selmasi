'use client'
import { useReveal } from '@/hooks/useReveal'
import { hero, site } from '@/data/siteContent'
import { IconWhatsApp, IconBolt, IconCalendar, IconRefresh, IconChat } from '@/components/Icons'

export default function Hero() {
  const ref = useReveal()

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden pt-16">
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
                href={site.whatsappUrl}
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

          <div className="hidden md:block reveal">
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  Icon: IconBolt,
                  title: 'Faster Responses',
                  desc: 'Automated follow-ups help reduce missed leads',
                  dark: false,
                },
                {
                  Icon: IconCalendar,
                  title: 'Save Admin Time',
                  desc: 'Reduce repetitive manual tasks each week',
                  dark: false,
                },
                {
                  Icon: IconRefresh,
                  title: 'Always-On Systems',
                  desc: 'Keep enquiries and follow-ups moving 24/7',
                  dark: false,
                },
                {
                  Icon: IconChat,
                  title: 'Fewer Missed Enquiries',
                  desc: 'WhatsApp and form enquiries handled faster',
                  dark: true,
                },
              ].map((card, i) => (
                <div
                  key={card.title}
                  className={`rounded-2xl p-6 transition-shadow hover:shadow-lg ${
                    card.dark
                      ? 'bg-brown border border-brown'
                      : 'bg-white border border-beige-md shadow-sm'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
                      card.dark
                        ? 'bg-sand/20 text-sand'
                        : 'bg-beige border border-sand-lt text-sand'
                    }`}
                  >
                    <card.Icon className="w-4 h-4" />
                  </div>
                  <h3
                    className={`font-display text-lg font-bold mb-1.5 ${
                      card.dark ? 'text-white' : 'text-brown'
                    }`}
                  >
                    {card.title}
                  </h3>
                  <p
                    className={`text-sm leading-snug ${
                      card.dark ? 'text-white/60' : 'text-muted'
                    }`}
                  >
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
