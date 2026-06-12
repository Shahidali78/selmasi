'use client'
import Image from 'next/image'
import { site, footer, services, waLink, waMessages } from '@/data/siteContent'
import { IconWhatsApp } from '@/components/Icons'

export default function Footer() {
  return (
    <footer className="bg-brown text-white pt-14 pb-8">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image src="/logo.png" alt="Selmasi" width={48} height={48} className="rounded-full brightness-110" />
              <span className="font-display text-2xl font-bold">Selmasi</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-[280px] mb-5">
              {footer.description}
            </p>
            <a
              href={waLink(waMessages.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5c] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all hover:-translate-y-0.5"
            >
              <IconWhatsApp className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </div>

          <div>
            <h5 className="text-[11px] font-semibold uppercase tracking-widest text-sand mb-4">Quick Links</h5>
            <ul className="flex flex-col gap-2">
              {footer.quickLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-white/60 hover:text-sand text-sm transition-colors">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-[11px] font-semibold uppercase tracking-widest text-sand mb-4">Services</h5>
            <ul className="flex flex-col gap-2">
              {services.items.map((s) => (
                <li key={s.title}>
                  <a href="#services" className="text-white/60 hover:text-sand text-sm transition-colors">{s.title}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-[11px] font-semibold uppercase tracking-widest text-sand mb-4">Contact</h5>
            <ul className="flex flex-col gap-2">
              <li><a href={`tel:${site.phone.replace(/ /g, '')}`} className="text-white/60 hover:text-sand text-sm transition-colors">{site.phone}</a></li>
              <li><a href={`tel:${site.landline.replace(/ /g, '')}`} className="text-white/60 hover:text-sand text-sm transition-colors">{site.landline}</a></li>
              <li><a href={`mailto:${site.email}`} className="text-white/60 hover:text-sand text-sm transition-colors">{site.email}</a></li>
              <li><a href={waLink(waMessages.general)} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-sand text-sm transition-colors">WhatsApp Chat</a></li>
              <li><a href="#booking" className="text-white/60 hover:text-sand text-sm transition-colors">Book a Consultation</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/35">
          <span>{footer.copy}</span>
          <span>{footer.tagline}</span>
        </div>
      </div>
    </footer>
  )
}
