'use client'
import { payfast } from '@/data/siteContent'
import { IconLock } from '@/components/Icons'

/**
 * Reusable "Pay with PayFast" button.
 *
 * Renders a real HTML form that POSTs to the server-side PHP endpoint
 * (/payfast/create.php). The browser only ever sends a payment `type`
 * (and optional `qty`) — NEVER an amount. The server validates the type,
 * calculates the authoritative amount, signs the PayFast payload with the
 * private passphrase, and redirects the buyer to PayFast checkout.
 *
 * Props:
 *   type     – 'entry_level' | 'premium' | 'mountain_climbing'
 *   qty      – optional learner/people count (sent as metadata)
 *   label    – button text
 *   disabled – disable the button (e.g. invalid input)
 *   className – override styling
 */
export default function PayfastButton({ type, qty, label, disabled = false, className = '' }) {
  if (!payfast.enabled) return null

  const base =
    'w-full inline-flex items-center justify-center gap-2 bg-sand hover:bg-sand-dk text-white font-semibold text-sm px-5 py-3.5 rounded-xl transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0'

  return (
    // `display:contents` keeps the form transparent to the parent layout
    // (grid/flex), so the button aligns like any other child element.
    <form action={payfast.createUrl} method="POST" className="contents">
      <input type="hidden" name="type" value={type} />
      {qty != null && qty !== '' && <input type="hidden" name="qty" value={qty} />}
      <button type="submit" disabled={disabled} className={className || base}>
        <IconLock className="w-4 h-4" />
        {label || payfast.payBtn}
      </button>
    </form>
  )
}
