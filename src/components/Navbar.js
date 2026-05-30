'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { site, nav } from '@/data/siteContent'
import { IconWhatsApp } from '@/components/Icons'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-cream/95 backdrop-blur-md shadow-sm border-b border-beige-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex items-center justify-between h-16 md:h-[72px]">
          <a href="#" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Selmasi" width={52} height={52} className="rounded-full shadow-sm" priority />
            <span className="font-display text-2xl font-bold text-brown">Selmasi</span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {nav.links.map((l) => (
              <a key={l.href} href={l.href} className="text-[13px] font-medium text-muted hover:text-brown transition-colors">
                {l.label}
              </a>
            ))}
          </nav>

          <a
            href={site.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1DAF54] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all hover:-translate-y-0.5 shadow-sm"
          >
            <IconWhatsApp className="w-4 h-4" />
            WhatsApp
          </a>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex flex-col gap-1.5 p-1"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-brown rounded transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-brown rounded transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-brown rounded transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-cream border-t border-beige-md px-5 py-4 flex flex-col gap-3">
          {nav.links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-2 text-base font-medium text-brown border-b border-beige-md">
              {l.label}
            </a>
          ))}
          <a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}
            className="mt-1 flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold py-3 rounded-full text-sm">
            <IconWhatsApp className="w-4 h-4" /> Chat on WhatsApp
          </a>
        </div>
      )}
    </header>
  )
}
