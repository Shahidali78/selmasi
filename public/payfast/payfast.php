<?php
/**
 * Selmasi – PayFast server-side helper library.
 * ---------------------------------------------------------------
 * This file runs on the cPanel server (PHP). It is the ONLY place
 * that knows the merchant credentials, the real prices and the
 * signing passphrase. The static Next.js front-end never sees any
 * of these — it only POSTs a payment `type` (+ optional quantity)
 * to create.php.
 *
 * Responsibilities:
 *   - Load private credentials (config.local.php or env vars).
 *   - Hold the AUTHORITATIVE price list and compute amounts server-side.
 *   - Build & MD5-sign the PayFast payload.
 *   - Validate incoming ITN (notify) callbacks per PayFast docs.
 *   - Log payment events to a protected file (TODO: move to a DB).
 */

// ── Configuration ──────────────────────────────────────────────
/**
 * Loads config from public/payfast/config.local.php if present,
 * otherwise falls back to environment variables (PAYFAST_*).
 * config.local.php is git-ignored and never shipped to the browser.
 */
function pf_config() {
    static $cfg = null;
    if ($cfg !== null) return $cfg;

    $defaults = [
        'merchant_id'  => getenv('PAYFAST_MERCHANT_ID')  ?: '',
        'merchant_key' => getenv('PAYFAST_MERCHANT_KEY') ?: '',
        'passphrase'   => getenv('PAYFAST_PASSPHRASE')   ?: '',
        'env'          => getenv('PAYFAST_ENV')          ?: 'sandbox',
        'return_url'   => getenv('PAYFAST_RETURN_URL')   ?: '',
        'cancel_url'   => getenv('PAYFAST_CANCEL_URL')   ?: '',
        'notify_url'   => getenv('PAYFAST_NOTIFY_URL')   ?: '',
    ];

    $local = __DIR__ . '/config.local.php';
    if (is_readable($local)) {
        $cfg = array_merge($defaults, (array) require $local);
    } else {
        $cfg = $defaults;
    }

    // Trim every credential / URL so the value we SIGN is byte-for-byte the
    // value we SUBMIT. A trailing space or newline in config.local.php is a
    // very common cause of "Generated signature does not match" errors.
    foreach (['merchant_id', 'merchant_key', 'passphrase', 'env', 'return_url', 'cancel_url', 'notify_url'] as $k) {
        if (isset($cfg[$k]) && is_string($cfg[$k])) {
            $cfg[$k] = trim($cfg[$k]);
        }
    }
    return $cfg;
}

// PayFast endpoints depend on the environment (sandbox vs live).
function pf_process_host() {
    return pf_config()['env'] === 'live' ? 'www.payfast.co.za' : 'sandbox.payfast.co.za';
}
function pf_process_url()  { return 'https://' . pf_process_host() . '/eng/process'; }
function pf_validate_url() { return 'https://' . pf_process_host() . '/eng/query/validate'; }

// ── Authoritative price list ───────────────────────────────────
/**
 * The prices the server trusts. NEVER take an amount from the browser.
 * These must stay in sync with the display values in src/data/siteContent.js.
 */
function pf_prices() {
    return [
        'entry_level'       => ['amount' => 8500.00,  'item' => 'Selmasi Entry Level Package',       'qty' => false],
        'premium'           => ['amount' => 16500.00, 'item' => 'Selmasi Premium Package',           'qty' => false],
        'mountain_climbing' => ['per'    => 60.00,    'item' => 'Selmasi Mountain Climbing Booking', 'qty' => true],
    ];
}

/**
 * Resolve a request to an authoritative amount + item name.
 * Returns: ['ok'=>bool, 'amount'=>float, 'item'=>string, 'qty'=>int|null, 'error'=>string]
 */
function pf_resolve($type, $qtyRaw) {
    $prices = pf_prices();
    if (!is_string($type) || !isset($prices[$type])) {
        return ['ok' => false, 'error' => 'Unknown payment type.'];
    }
    $p = $prices[$type];

    if (!empty($p['qty'])) {
        // Quantity-based (mountain climbing): qty must be a positive integer.
        $qty = filter_var($qtyRaw, FILTER_VALIDATE_INT);
        if ($qty === false || $qty < 1 || $qty > 500) {
            return ['ok' => false, 'error' => 'Please enter a valid number of people (1–500).'];
        }
        return ['ok' => true, 'amount' => round($p['per'] * $qty, 2), 'item' => $p['item'], 'qty' => $qty];
    }

    // Fixed-price (school package setup fee). qty (learner count) is optional metadata only.
    $qty = filter_var($qtyRaw, FILTER_VALIDATE_INT);
    if ($qty === false || $qty < 1) $qty = null;
    return ['ok' => true, 'amount' => round($p['amount'], 2), 'item' => $p['item'], 'qty' => $qty];
}

// ── Signature ──────────────────────────────────────────────────
/**
 * Build the parameter string for signing — the fields IN ORDER, empty
 * values skipped, each value urlencode()'d (spaces -> '+', uppercase hex).
 * This is PayFast's reference algorithm. The `signature` field must never
 * be part of this; callers pass data that excludes it.
 *
 * Returned WITHOUT the passphrase so it is safe to log (after redacting
 * merchant_key). The passphrase is only ever appended inside pf_signature().
 */
function pf_signature_base(array $data) {
    $pairs = [];
    foreach ($data as $k => $v) {
        if ($v === '' || $v === null) continue;
        if ($k === 'signature') continue; // never sign the signature itself
        $pairs[] = $k . '=' . urlencode(trim((string) $v));
    }
    return implode('&', $pairs);
}

/**
 * Generate the PayFast MD5 signature. Appends &passphrase=... ONLY when a
 * non-empty passphrase is configured (sandbox default account has none).
 */
function pf_signature(array $data, $passphrase = '') {
    $str = pf_signature_base($data);
    if ($passphrase !== '' && $passphrase !== null) {
        $str .= '&passphrase=' . urlencode(trim($passphrase));
    }
    return md5($str);
}

// ── Rendering helpers (create.php) ─────────────────────────────
/** Auto-submitting form that POSTs the buyer to PayFast checkout. */
function pf_render_redirect($url, array $fields) {
    header('Content-Type: text/html; charset=utf-8');
    echo '<!doctype html><html lang="en"><head><meta charset="utf-8">'
       . '<meta name="viewport" content="width=device-width, initial-scale=1">'
       . '<title>Redirecting to PayFast…</title></head>'
       . '<body style="font-family:system-ui,sans-serif;text-align:center;padding:64px 20px;color:#2a1a0e;background:#fdfaf6">'
       . '<p style="font-size:1.05rem">Redirecting you to the secure PayFast checkout…</p>'
       . '<form id="pf" action="' . htmlspecialchars($url, ENT_QUOTES) . '" method="POST">';
    foreach ($fields as $k => $v) {
        echo '<input type="hidden" name="' . htmlspecialchars($k, ENT_QUOTES)
           . '" value="' . htmlspecialchars((string) $v, ENT_QUOTES) . '">';
    }
    echo '<noscript><button type="submit" style="background:#c9a96e;color:#fff;border:0;padding:14px 28px;border-radius:10px;font-size:1rem;cursor:pointer">Continue to PayFast</button></noscript>'
       . '</form><script>document.getElementById("pf").submit();</script>'
       . '</body></html>';
}

/** Friendly error page if a payment cannot be started. */
function pf_render_error($msg, $code = 400) {
    http_response_code($code);
    header('Content-Type: text/html; charset=utf-8');
    echo '<!doctype html><html lang="en"><head><meta charset="utf-8">'
       . '<meta name="viewport" content="width=device-width, initial-scale=1">'
       . '<title>Payment could not start</title></head>'
       . '<body style="font-family:system-ui,sans-serif;max-width:480px;margin:64px auto;text-align:center;color:#2a1a0e;padding:0 20px">'
       . '<h1 style="font-size:1.4rem;margin-bottom:8px">Payment could not start</h1>'
       . '<p style="color:#7a6350;line-height:1.6">' . htmlspecialchars($msg, ENT_QUOTES) . '</p>'
       . '<p style="margin-top:24px"><a href="/" style="color:#a07840;text-decoration:none">&larr; Back to site</a>'
       . ' &nbsp;&middot;&nbsp; <a href="https://wa.me/27611340644" style="color:#25d366;text-decoration:none">Chat on WhatsApp</a></p>'
       . '</body></html>';
}

// ── Logging (TODO: replace/augment with DB persistence) ─────────
/**
 * Appends an event to a protected log file. The leading ".ht" prefix means
 * Apache's default config denies direct web access to it, and .htaccess
 * blocks it too. Replace with a database insert when one is configured.
 */
function pf_log($message, array $context = []) {
    $line = '[' . date('c') . '] ' . $message;
    if ($context) $line .= ' ' . json_encode($context, JSON_UNESCAPED_SLASHES);
    @file_put_contents(__DIR__ . '/.ht_payfast.log', $line . PHP_EOL, FILE_APPEND | LOCK_EX);
}

// ── ITN (notify) validation helpers ────────────────────────────
// Step 1: recompute the signature from the posted data and compare.
function pf_itn_valid_signature(array $post) {
    if (empty($post['signature'])) return false;
    $data = $post;
    unset($data['signature']);
    $sig = pf_signature($data, pf_config()['passphrase']);
    return hash_equals($sig, $post['signature']);
}

// Step 2: confirm the request really came from a PayFast server IP.
function pf_itn_valid_ip($remoteIp) {
    if (!$remoteIp) return false;
    $hosts = ['www.payfast.co.za', 'sandbox.payfast.co.za', 'w1w.payfast.co.za', 'w2w.payfast.co.za'];
    $valid = [];
    foreach ($hosts as $h) {
        $ips = gethostbynamel($h);
        if ($ips) $valid = array_merge($valid, $ips);
    }
    return in_array($remoteIp, array_unique($valid), true);
}

// Step 3: server-to-server confirmation — post the raw ITN body back to PayFast.
function pf_itn_server_confirm($rawBody) {
    if (!function_exists('curl_init')) return false; // cURL required
    $ch = curl_init(pf_validate_url());
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => $rawBody,
        CURLOPT_HTTPHEADER     => ['Content-Type: application/x-www-form-urlencoded'],
        CURLOPT_SSL_VERIFYPEER => true,
        CURLOPT_TIMEOUT        => 15,
    ]);
    $res = curl_exec($ch);
    curl_close($ch);
    return trim((string) $res) === 'VALID';
}
