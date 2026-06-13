# Selmasi

Marketing site for **Selmasi Business Automation** — built with Next.js (App Router) and
Tailwind CSS, exported as a **static site** (`output: 'export'`) and hosted on HostAfrica
cPanel at <https://selmasi.africa>.

All primary CTAs are enquiry-based (WhatsApp + contact form). **PayFast** is offered as an
optional online-payment path for school-package setup fees and mountain-climbing bookings.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export -> ./out
```

> The PayFast endpoints are PHP and only run on the cPanel server, so the **Pay with PayFast**
> buttons will not complete a payment during `npm run dev` (the form POSTs to `/payfast/create.php`,
> which doesn't exist locally). Everything else works normally.

## Deployment (cPanel)

`npm run build` writes the whole site to `out/`, **including** the PHP backend
(`public/payfast/*` is copied verbatim into `out/payfast/`). Zip the **contents** of `out/`
(from *inside* the folder, so paths use forward slashes) and extract into `public_html`.

---

## PayFast Setup

The payment flow is fully server-side so credentials and the signing passphrase are never
exposed to the browser:

```
Browser  ──POST { type, qty? }──▶  /payfast/create.php  (PHP, computes amount + signature)
                                          │
                                          ▼  redirect (auto-submit form)
                                   PayFast checkout
                                          │
            ┌── buyer returns ────────────┼──────────── PayFast server posts ITN ──┐
            ▼                              ▼                                        ▼
   /payment/success/            /payment/cancelled/                       /payfast/notify.php
```

### 1. Required configuration

Copy the template and fill in your real credentials **on the server**:

```bash
cp public/payfast/config.example.php public/payfast/config.local.php
```

`config.local.php` (git-ignored, blocked from the web by `.htaccess`):

| Key            | Description                                                        |
| -------------- | ------------------------------------------------------------------ |
| `merchant_id`  | PayFast Merchant ID                                                |
| `merchant_key` | PayFast Merchant Key                                               |
| `passphrase`   | Passphrase set in your PayFast dashboard (used for the signature)  |
| `env`          | `sandbox` for testing, `live` for production                       |
| `return_url`   | `https://selmasi.africa/payment/success/`                          |
| `cancel_url`   | `https://selmasi.africa/payment/cancelled/`                        |
| `notify_url`   | `https://selmasi.africa/payfast/notify.php`                        |

The same names exist in `.env.example` if you prefer cPanel environment variables
(`getenv()`); `config.local.php` takes precedence when present.

> **Prices live on the server** in `public/payfast/payfast.php` (`pf_prices()`):
> Entry Level R8,500 · Premium R16,500 · Mountain Climbing R60/person. The browser only
> sends a payment *type*; the server calculates and validates the amount. Keep these in sync
> with the display values in `src/data/siteContent.js`.

### 2. Sandbox testing

1. Set `env => 'sandbox'` and use PayFast's sandbox credentials (defaults are in the template).
2. In the [PayFast sandbox](https://sandbox.payfast.co.za) configure the same passphrase.
3. Run a payment from the site and complete it with sandbox test card details.
4. Confirm the buyer lands on `/payment/success/` and an entry appears in
   `public/payfast/.ht_payfast.log` (`payment.complete`).

### 3. Switching to production

1. Set `env => 'live'` and replace `merchant_id` / `merchant_key` / `passphrase` with your
   live PayFast values.
2. In the PayFast dashboard set the **Notify URL** to `https://selmasi.africa/payfast/notify.php`
   and ensure the passphrase matches `config.local.php`.
3. Confirm the site is served over **HTTPS** (PayFast requires it for live).

### 4. URLs to configure in PayFast

| Purpose | URL |
| ------- | --- |
| Return  | `https://selmasi.africa/payment/success/` |
| Cancel  | `https://selmasi.africa/payment/cancelled/` |
| Notify (ITN) | `https://selmasi.africa/payfast/notify.php` |

### 5. Testing checklist

- [ ] Entry Level "Pay Setup Fee" button starts a R8,500 payment
- [ ] Premium "Pay Setup Fee" button starts a R16,500 payment
- [ ] Calculator pays the selected package's setup fee (learner count passed as metadata)
- [ ] Mountain Climbing pays `people × R60` (server-calculated)
- [ ] `/payment/success/` page renders correctly
- [ ] `/payment/cancelled/` page renders correctly
- [ ] Invalid/unknown payment type is rejected with a friendly error
- [ ] No PayFast merchant key or passphrase appears anywhere in the browser/JS
- [ ] ITN writes to `public/payfast/.ht_payfast.log` and `config.local.php`/logs are not web-accessible
- [ ] WhatsApp enquiry buttons still work on every section
- [ ] Layout is clean on mobile and desktop; no console errors

### Notes / TODO

- Payments are currently logged to `public/payfast/.ht_payfast.log`. There is **no database
  yet** — `notify.php` contains `TODO` markers for persisting payments and sending confirmation
  emails.
- PayFast is enabled via `payfast.enabled` in `src/data/siteContent.js` (set to `false` to hide
  all Pay buttons without removing code).
