<?php
/**
 * PayFast configuration TEMPLATE.
 * ---------------------------------------------------------------
 * SETUP (on the cPanel server):
 *   1. Copy this file to `config.local.php` in the SAME folder.
 *   2. Fill in your real PayFast credentials below.
 *   3. `config.local.php` is git-ignored and blocked from the web
 *      (.htaccess), so your merchant key & passphrase stay private.
 *
 * ⚠️ THE #1 CAUSE OF "signature does not match" IS THE PASSPHRASE.
 *    The `passphrase` below MUST be byte-for-byte identical to the
 *    "Security passphrase" / "Salt passphrase" set in your PayFast
 *    dashboard (Settings → Integration). If the dashboard has NO
 *    passphrase, leave this as an empty string ''. They must match.
 *
 * The sandbox merchant_id / merchant_key below are PayFast's public
 * test credentials. For live, replace all three with your approved values.
 */

return [
    // ── PayFast merchant credentials (KEEP PRIVATE) ──
    'merchant_id'  => '10000100',       // sandbox test ID  (replace for live)
    'merchant_key' => '46f0cd694581a',  // sandbox test key (replace for live)
    'passphrase'   => '',               // MUST equal the dashboard passphrase (or '' if none)

    // 'sandbox' while testing, 'live' for production.
    'env' => 'sandbox',

    // ── Public URLs (absolute, https in production) ──
    'return_url' => 'https://selmasi.africa/payment/success/',
    'cancel_url' => 'https://selmasi.africa/payment/cancelled/',
    'notify_url' => 'https://selmasi.africa/payfast/notify.php',
];
