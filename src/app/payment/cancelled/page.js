import Link from 'next/link'
import { waLink, waMessages } from '@/data/siteContent'
import { IconWhatsApp } from '@/components/Icons'

export const metadata = {
  title: 'Payment Cancelled – Selmasi',
  robots: { index: false, follow: false },
}

export default function PaymentCancelled() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-cream px-5 py-20">
      <div className="max-w-md w-full text-center bg-white rounded-3xl border border-beige-md shadow-xl p-9 md:p-12">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-rose-400 to-pink-600 shadow-lg shadow-rose-400/40 flex items-center justify-center text-white">
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </div>
        <h1 className="font-display text-3xl font-bold text-brown mb-3">Payment Cancelled</h1>
        <p className="text-muted text-base leading-relaxed mb-8">
          Your payment was cancelled. You can try again or contact Selmasi on WhatsApp for assistance.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/#packages"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-brown hover:bg-accent text-white font-semibold text-[15px] py-3.5 rounded-xl transition-all hover:-translate-y-0.5"
          >
            Try Again
          </Link>
          <a
            href={waLink(waMessages.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5c] text-white font-semibold text-[15px] py-3.5 rounded-xl transition-all hover:-translate-y-0.5"
          >
            <IconWhatsApp className="w-[18px] h-[18px]" />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </main>
  )
}
