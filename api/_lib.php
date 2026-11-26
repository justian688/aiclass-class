<?php
/* OKAI課程網 API 共用函式。資料存在網站目錄外：/home/<帳號>/okaiclass_data/ */
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
$ROOT = dirname(__DIR__, 2) . '/okaiclass_data';
if (!is_dir($ROOT)) @mkdir($ROOT, 0700, true);
function out($code, $arr) { http_response_code($code); echo json_encode($arr, JSON_UNESCAPED_UNICODE); exit; }
function clean($s, $max) {
  $s = is_string($s) ? $s : '';
  $s = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $s);
  $s = trim(preg_replace("/\r\n?/", "\n", $s));
  return mb_substr($s, 0, $max, 'UTF-8');
}
function load($file) { if (!is_file($file)) return []; $j = json_decode((string)@file_get_contents($file), true); return is_array($j) ? $j : []; }
function body() { $in = json_decode(file_get_contents('php://input'), true); if (!is_array($in)) out(400, ['ok' => false, 'error' => '資料格式不正確']); return $in; }
/* 講師金鑰：第一次用到時自動產生，存在 okaiclass_data/admin_key.txt（到 cPanel 檔案管理員可以看到） */
function admin_key() {
  global $ROOT; $f = "$ROOT/admin_key.txt";
  if (!is_file($f)) { @file_put_contents($f, bin2hex(random_bytes(12))); @chmod($f, 0600); }
  return trim((string)@file_get_contents($f));
}
function is_admin($k) { $real = admin_key(); return is_string($k) && strlen($k) >= 16 && hash_equals($real, $k); }
function rate_limit($name, $sec) {
  if (getenv('OKAI_TEST') === '1' && PHP_SAPI === 'cli-server') return hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? '') . 'okai'); /* 只在本機測試伺服器關掉 */
  global $ROOT; $ip = hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? '') . 'okai');
  $f = "$ROOT/.rate-$name.json"; $r = load($f); $now = time();
  if (isset($r[$ip]) && $now - $r[$ip] < $sec) out(429, ['ok' => false, 'error' => "太快了，請 $sec 秒後再試"]);
  $r = array_filter($r, fn($t) => $now - $t < 3600); $r[$ip] = $now;
  @file_put_contents($f, json_encode($r), LOCK_EX);
  return $ip;
}
/* 鎖住檔案 → 讀 → 用 $fn 改 → 寫回 */
function locked_update($file, $fn) {
  $fp = fopen($file, 'c+'); if (!$fp) out(500, ['ok' => false, 'error' => '暫時無法儲存，請稍後再試']);
  flock($fp, LOCK_EX);
  $data = json_decode(stream_get_contents($fp), true); if (!is_array($data)) $data = [];
  $res = $fn($data);
  ftruncate($fp, 0); rewind($fp); fwrite($fp, json_encode($data, JSON_UNESCAPED_UNICODE)); fflush($fp);
  flock($fp, LOCK_UN); fclose($fp);
  return $res;
}

/* 新訊息寄信給講師。收件信箱寫在 okaiclass_data/notify_email.txt（沒有就用 service@wgs.tw） */
function notify($subject, $body) {
  global $ROOT; $f = "$ROOT/notify_email.txt";
  if (!is_file($f)) @file_put_contents($f, 'service@wgs.tw');
  $to = trim((string)@file_get_contents($f)); if (!filter_var($to, FILTER_VALIDATE_EMAIL)) return;
  $headers = "From: OKAI課程網 <noreply@okaiclass.com>\r\nContent-Type: text/plain; charset=UTF-8\r\n";
  @mail($to, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body . "\n\n— 到講師後台處理：https://okaiclass.com/admin.html", $headers);
}
function need_admin($k) { if (!is_admin($k)) out(403, ['ok' => false, 'error' => '需要講師金鑰']); }
function course_files($dir) { $r = []; foreach (glob("$dir/c*.json") ?: [] as $f) $r[basename($f, '.json')] = $f; return $r; }
