<?php
/* OKAI課程網 跨裝置同步 API（用「同步碼」，不需要密碼）
 * GET  ?code=XXXX-XXXX-XXXX          → {ts, data}
 * POST {code?, ts, data}             → 存檔；沒有 code 就產生新的
 * data 只接受 aic- 開頭的學習紀錄，總大小 200KB 以內
 */
require __DIR__ . '/_lib.php';
$DATA = "$ROOT/sync"; if (!is_dir($DATA)) @mkdir($DATA, 0700, true);
$okCode = fn($c) => is_string($c) && preg_match('/^[A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{4}$/', $c);
$file = fn($c) => "$DATA/" . hash('sha256', $c) . '.json';
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
if ($method === 'GET') {
  $c = strtoupper($_GET['code'] ?? '');
  if (!$okCode($c)) out(400, ['ok' => false, 'error' => '同步碼格式不正確']);
  if (!is_file($file($c))) out(404, ['ok' => false, 'error' => '找不到這個同步碼']);
  $d = load($file($c));
  out(200, ['ok' => true, 'ts' => $d['ts'] ?? 0, 'data' => $d['data'] ?? []]);
}
if ($method !== 'POST') out(405, ['ok' => false, 'error' => '不支援的操作']);
$in = body();
$c = strtoupper($in['code'] ?? '');
if ($c === '') {
  rate_limit('sync-new', 30);
  $abc = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; $c = '';
  for ($i = 0; $i < 12; $i++) { $c .= $abc[random_int(0, 31)]; if ($i === 3 || $i === 7) $c .= '-'; }
} elseif (!$okCode($c)) out(400, ['ok' => false, 'error' => '同步碼格式不正確']);
$data = $in['data'] ?? [];
if (!is_array($data)) out(400, ['ok' => false, 'error' => '資料格式不正確']);
$clean = [];
foreach ($data as $k => $v) if (is_string($k) && preg_match('/^aic-[\w-]{1,60}$/', $k) && is_string($v)) $clean[$k] = $v;
$json = json_encode(['ts' => (int)($in['ts'] ?? time() * 1000), 'data' => $clean], JSON_UNESCAPED_UNICODE);
if (strlen($json) > 200000) out(413, ['ok' => false, 'error' => '資料太大']);
file_put_contents($file($c), $json, LOCK_EX);
out(200, ['ok' => true, 'code' => $c]);
