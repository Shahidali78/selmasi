<?php
/**
 * Selmasi – PayFast ITN (Instant Transaction Notification) endpoint.
 * ---------------------------------------------------------------
 * PayFast POSTs payment results here server-to-server. We must:
 *   1. Verify the signature.
 *   2. Verify the request came from a PayFast server IP.
 *   3. Re-confirm the data directly with PayFast (server postback).
 *   4. Re-calculate the expected amount ourselves and compare.
 *   5. Log the result and ALWAYS return HTTP 200 (PayFast only checks for 200).
 *
 * NOTE: there is no database yet. Successful payments are written to a
 * protected log file. TODO: persist payments + email confirmations.
 */

require __DIR__ . '/payfast.php';

// PayFast posts application/x-www-form-urlencoded.
$post = $_POST;
$raw  = file_get_contents('php://input');

// Respond 200 regardless of validation outcome — PayFast retries on non-200.
http_response_code(200);

// Guard: nothing posted (e.g. someone opened the URL in a browser).
if (empty($post)) {
    echo 'OK';
    exit;
}

// ── Run the four validation checks ──
$checks = [
    'signature' => pf_itn_valid_signature($post),
    'source_ip' => pf_itn_valid_ip(isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : ''),
    'confirmed' => pf_itn_server_confirm($raw),
];

// Re-derive the expected amount from the echoed type/qty and compare.
$type        = isset($post['custom_str1']) ? $post['custom_str1'] : '';
$qty         = isset($post['custom_int1']) ? $post['custom_int1'] : null;
$resolved    = pf_resolve($type, $qty);
$amountGross = isset($post['amount_gross']) ? (float) $post['amount_gross'] : null;
$checks['amount'] = $resolved['ok'] && $amountGross !== null
    && abs($resolved['amount'] - $amountGross) < 0.01;

$allValid = !in_array(false, $checks, true);
$status   = isset($post['payment_status']) ? $post['payment_status'] : 'UNKNOWN';

if ($allValid && $status === 'COMPLETE') {
    // Payment is genuine and complete.
    pf_log('payment.complete', [
        'm_payment_id'  => isset($post['m_payment_id'])  ? $post['m_payment_id']  : '',
        'pf_payment_id' => isset($post['pf_payment_id']) ? $post['pf_payment_id'] : '',
        'type'          => $type,
        'amount_gross'  => $amountGross,
        'email'         => isset($post['email_address']) ? $post['email_address'] : '',
    ]);
    // TODO: persist this payment to a database and/or email a confirmation
    //       to Selmasi + the customer. For now it is recorded in .ht_payfast.log.
} else {
    // Failed/invalid/incomplete — log for manual review, do NOT fulfil.
    pf_log('payment.invalid', [
        'status'       => $status,
        'checks'       => $checks,
        'm_payment_id' => isset($post['m_payment_id']) ? $post['m_payment_id'] : '',
    ]);
    // TODO: flag for manual review (e.g. alert email).
}

echo 'OK';
