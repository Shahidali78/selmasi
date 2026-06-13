<?php
/**
 * Selmasi – PayFast "create payment" endpoint.
 * ---------------------------------------------------------------
 * Flow:
 *   1. Browser POSTs only { type, qty? } here (no amount, no secrets).
 *   2. We validate the type and compute the AUTHORITATIVE amount server-side.
 *   3. We build the PayFast payload and sign it with the private passphrase.
 *   4. We render an auto-submitting form that redirects the buyer to PayFast.
 *
 * Allowed types: entry_level | premium | mountain_climbing  (see pf_prices()).
 */

require __DIR__ . '/payfast.php';

// Accept POST (preferred); allow GET as a graceful fallback.
$type = isset($_POST['type']) ? $_POST['type'] : (isset($_GET['type']) ? $_GET['type'] : '');
$qty  = isset($_POST['qty'])  ? $_POST['qty']  : (isset($_GET['qty'])  ? $_GET['qty']  : null);

// 1 + 2: validate and resolve the amount on the server.
$resolved = pf_resolve($type, $qty);
if (!$resolved['ok']) {
    pf_render_error($resolved['error'], 400);
    exit;
}

$cfg = pf_config();
if ($cfg['merchant_id'] === '' || $cfg['merchant_key'] === '') {
    pf_render_error('Online payments are not configured yet. Please contact us on WhatsApp and we will help you complete your payment.', 500);
    exit;
}

// TEMPORARY: write a detailed signature breakdown to .ht_payfast.log so we can
// debug "signature does not match" errors. Secrets are NEVER logged (merchant_key
// is redacted; passphrase is never included). Set to false once payments work.
$PF_DEBUG = true;

// Unique reference we can match against the ITN later.
$mPaymentId = 'SELMASI-' . strtoupper(bin2hex(random_bytes(5)));

// 3: build the payload in PayFast's CANONICAL field order. The form below
// submits the fields in this same order, and the signature is generated over
// the same fields (excluding `signature`). Note: PayFast's documented order
// places all custom_int* fields BEFORE custom_str* fields.
$amount = number_format($resolved['amount'], 2, '.', ''); // always 2 decimals e.g. 8500.00

$data = [
    'merchant_id'  => $cfg['merchant_id'],
    'merchant_key' => $cfg['merchant_key'],
    'return_url'   => $cfg['return_url'],
    'cancel_url'   => $cfg['cancel_url'],
    'notify_url'   => $cfg['notify_url'],
    'm_payment_id' => $mPaymentId,
    'amount'       => $amount,
    'item_name'    => $resolved['item'],
];
// custom_int1 (learners / people) comes BEFORE custom_str1 per PayFast docs.
if ($resolved['qty'] !== null) {
    $data['custom_int1'] = (string) $resolved['qty'];
}
$data['custom_str1'] = $type; // payment type, echoed back in the ITN

// Safety net: drop any accidentally-empty field (preserves key order).
$data = array_filter($data, function ($v) { return $v !== '' && $v !== null; });

// 4: sign (over the exact fields above, in this exact order) and redirect.
$signature = pf_signature($data, $cfg['passphrase']);
$data['signature'] = $signature;

pf_log('payment.created', [
    'm_payment_id' => $mPaymentId,
    'type'         => $type,
    'amount'       => $amount,
]);

if ($PF_DEBUG) {
    // Redacted copy of the signature base string — merchant_key hidden,
    // passphrase never present here (pf_signature_base excludes it).
    $redacted = $data;
    unset($redacted['signature']);
    if (isset($redacted['merchant_key'])) {
        $redacted['merchant_key'] = '***REDACTED***';
    }
    pf_log('debug.signature', [
        'env'                   => $cfg['env'],
        'process_url'           => pf_process_url(),
        'merchant_id'           => $cfg['merchant_id'],        // not secret (sent in the form)
        'type'                  => $type,
        'amount'                => $amount,
        'passphrase_used'       => ($cfg['passphrase'] !== '' ? 'yes' : 'no'),
        'passphrase_len'        => strlen($cfg['passphrase']), // length only, never the value
        'param_string_redacted' => pf_signature_base($redacted),
        'signature'             => $signature,
        'submitted_fields'      => array_keys($data),
    ]);
}

pf_render_redirect(pf_process_url(), $data);
