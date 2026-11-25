<?php
/* OKAI課程網 單元留言 API
 * GET  /api/comments.php?course=c105            → 這門課的留言（新到舊，最多 300 則）
 * POST /api/comments.php  {course, lesson, name, text, website}  → 新增留言
 * 資料存在網站目錄外：/home/<帳號>/okaiclass_data/comments/<課程>.json
 * 刪除留言：到 cPanel 檔案管理員編輯上面那個 JSON 檔，把該則刪掉即可。
 */
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

$DATA = dirname(__DIR__, 2) . '/okaiclass_data/comments';
if (!is_dir($DATA)) @mkdir($DATA, 0700, true);

function out($code, $arr) { http_response_code($code); echo json_encode($arr, JSON_UNESCAPED_UNICODE); exit; }
function clean($s, $max) {
  $s = is_string($s) ? $s : '';
  $s = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $s);
  $s = trim(preg_replace("/\r\n?/", "\n", $s));
  return mb_substr($s, 0, $max, 'UTF-8');
}
function load($file) {
  if (!is_file($file)) return [];
  $j = json_decode((string)@file_get_contents($file), true);
  return is_array($j) ? $j : [];
}

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'GET') {
  $course = $_GET['course'] ?? '';
  if (!preg_match('/^c\d{1,4}$/', $course)) out(400, ['ok' => false, 'error' => '課程代號不正確']);
  $list = load("$DATA/$course.json");
  usort($list, fn($a, $b) => ($b['t'] ?? 0) <=> ($a['t'] ?? 0));
  out(200, ['ok' => true, 'items' => array_slice($list, 0, 300)]);
}

if ($method === 'POST') {
  $in = json_decode(file_get_contents('php://input'), true);
  if (!is_array($in)) out(400, ['ok' => false, 'error' => '資料格式不正確']);
  if (!empty($in['website'])) out(200, ['ok' => true]);              // 防機器人：隱藏欄位有填就當作成功但不存
  $course = $in['course'] ?? '';
  $lesson = $in['lesson'] ?? '';
  $name = clean($in['name'] ?? '', 20);
  $text = clean($in['text'] ?? '', 1000);
  if (!preg_match('/^c\d{1,4}$/', $course) || !preg_match('/^\d{1,2}-\d{1,3}$/', $lesson)) out(400, ['ok' => false, 'error' => '單元資料不正確']);
  if ($name === '') $name = '學員';
  if (mb_strlen($text, 'UTF-8') < 2) out(400, ['ok' => false, 'error' => '留言至少 2 個字']);
  if (preg_match_all('#https?://#i', $text) > 2) out(400, ['ok' => false, 'error' => '留言裡的網址太多']);

  // 同一個網路位址 20 秒內只能留一則
  $ip = hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? '') . 'okai');
  $rateFile = "$DATA/.rate.json";
  $rate = load($rateFile); $now = time();
  if (isset($rate[$ip]) && $now - $rate[$ip] < 20) out(429, ['ok' => false, 'error' => '留言太快了，請 20 秒後再試']);
  $rate = array_filter($rate, fn($t) => $now - $t < 3600); $rate[$ip] = $now;
  @file_put_contents($rateFile, json_encode($rate), LOCK_EX);

  $file = "$DATA/$course.json";
  $fp = fopen($file, 'c+');
  if (!$fp) out(500, ['ok' => false, 'error' => '暫時無法留言，請稍後再試']);
  flock($fp, LOCK_EX);
  $list = json_decode(stream_get_contents($fp), true); if (!is_array($list)) $list = [];
  $item = ['id' => bin2hex(random_bytes(6)), 'lesson' => $lesson, 'name' => $name, 'text' => $text, 't' => $now];
  $list[] = $item;
  if (count($list) > 2000) $list = array_slice($list, -2000);
  ftruncate($fp, 0); rewind($fp); fwrite($fp, json_encode($list, JSON_UNESCAPED_UNICODE)); fflush($fp);
  flock($fp, LOCK_UN); fclose($fp);
  out(200, ['ok' => true, 'item' => $item]);
}

out(405, ['ok' => false, 'error' => '不支援的操作']);
