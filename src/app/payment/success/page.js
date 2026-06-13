import Link from 'next/link'
import { waLink, waMessages } from '@/data/siteContent'
import { IconCheck, IconWhatsApp } from '@/components/Icons'

export const metadata = {
  title: 'Payment Received – Selmasi',
  robots: { index: false, follow: false },
}

export default function PaymentSuccess() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-cream px-5 py-20">
      <div className="max-w-md w-full text-center bg-white rounded-3xl border border-beige-md shadow-xl p-9 md:p-12">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-emerald-400 to-green-600 shadow-lg shadow-green-400/40 flex items-center justify-center text-white">
          <IconCheck className="w-8 h-8" />
        </div>
        <h1 className="font-display text-3xl font-bold text-brown mb-3">Payment Received</h1>
        <p className="text-muted text-base leading-relaxed mb-8">
          Thank you. Your payment has been received. Selmasi will contact you shortly with the next steps.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-brown hover:bg-accent text-white font-semibold text-[15px] py-3.5 rounded-xl transition-all hover:-translate-y-0.5"
          >
            Back to Home
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
