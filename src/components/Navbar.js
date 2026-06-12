'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { nav, waLink, waMessages } from '@/data/siteContent'
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
        scrolled || open ? 'bg-cream/95 backdrop-blur-md shadow-sm border-b border-beige-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex items-center justify-between h-[72px] md:h-20">
          <a href="#home" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Selmasi" width={56} height={56} className="rounded-full shadow-sm" priority />
            <span className="font-display text-[1.7rem] font-bold text-brown">Selmasi</span>
          </a>

          <nav className="hidden lg:flex items-center gap-9">
            {nav.links.map((l) => (
              <a key={l.href} href={l.href} className="text-base font-semibold text-brown/75 hover:text-brown transition-colors relative after:absolute after:left-0 after:-bottom-1.5 after:h-0.5 after:w-0 after:bg-sand after:transition-all after:duration-300 hover:after:w-full">
                {l.label}
              </a>
            ))}
          </nav>

          <a
            href={waLink(waMessages.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5c] text-white text-base font-semibold px-6 py-3 rounded-full transition-all hover:-translate-y-0.5 shadow-sm hover:shadow-md"
          >
            <IconWhatsApp className="w-5 h-5" />
            WhatsApp
          </a>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden flex flex-col gap-1.5 p-2 -mr-2"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className={`block w-6 h-0.5 bg-brown rounded transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-brown rounded transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-brown rounded transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-cream border-t border-beige-md px-5 py-4 flex flex-col gap-3 max-h-[calc(100vh-64px)] overflow-y-auto">
          {nav.links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-2.5 text-base font-medium text-brown border-b border-beige-md">
              {l.label}
            </a>
          ))}
          <a href={waLink(waMessages.general)} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}
            className="mt-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5c] text-white font-semibold py-3.5 rounded-full text-sm transition-colors">
            <IconWhatsApp className="w-4 h-4" /> Chat on WhatsApp
          </a>
        </div>
      )}
    </header>
  )
}
