<?php
/**
 * TEMPORARY diagnostic — confirms the server can read config.local.php.
 * It NEVER prints the real merchant key or passphrase, only whether they
 * are present and how many characters they contain.
 *
 * ⚠️ DELETE THIS FILE after testing (see instructions).
 */

require __DIR__ . '/payfast.php';
header('Content-Type: text/plain; charset=utf-8');

$cfg = pf_config();

function pf_present($v) {
    $v = (string) $v;
    return $v === '' ? 'no' : 'yes (' . strlen($v) . ' chars)';
}

echo "PayFast configuration diagnostic\n";
echo "================================\n";
echo 'env:                  ' . ($cfg['env'] !== '' ? $cfg['env'] : '(empty)') . "\n";
echo 'payment URL in use:   ' . pf_process_url() . "\n";
echo 'merchant_id present:  ' . pf_present($cfg['merchant_id']) . "\n";
echo 'merchant_key present: ' . pf_present($cfg['merchant_key']) . "\n";
echo 'passphrase present:   ' . pf_present($cfg['passphrase']) . "\n";
echo 'return_url:           ' . $cfg['return_url'] . "\n";
echo 'cancel_url:           ' . $cfg['cancel_url'] . "\n";
echo 'notify_url:           ' . $cfg['notify_url'] . "\n";
echo "--------------------------------\n";
echo 'PHP version:          ' . PHP_VERSION . "\n";
echo 'cURL available:       ' . (function_exists('curl_init') ? 'yes' : 'no (ITN postback will fail)') . "\n";
echo "\nIf passphrase present says 'no' but your PayFast dashboard has a\n";
echo "Security/Salt passphrase set (or vice-versa), that is your signature\n";
echo "mismatch. The two must be identical (or both empty).\n";
