<?php
/* OKAI課程網 課程評價 API
 * GET  ?course=c105                     → {items, count, avg}
 * POST {course, stars(1-5), name, text, website}  → 新增或更新（同一個網路位址每門課一則）
 * POST {action:'delete', course, id, key}  → 講師刪除
 */
require __DIR__ . '/_lib.php';
$DATA = "$ROOT/reviews"; if (!is_dir($DATA)) @mkdir($DATA, 0700, true);
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$pub = fn($x) => ['id' => $x['id'], 'stars' => $x['stars'], 'name' => $x['name'], 'text' => $x['text'], 't' => $x['t'], 'reply' => $x['reply'] ?? '', 'rt' => $x['rt'] ?? 0];

if ($method === 'GET' && isset($_GET['summary'])) {   // 每門課的平均星等，給課程卡用
  $sum = [];
  foreach (course_files($DATA) as $cid => $f) { $l = load($f); $n = count($l); if ($n) $sum[$cid] = ['avg' => round(array_sum(array_column($l, 'stars')) / $n, 1), 'count' => $n]; }
  out(200, ['ok' => true, 'courses' => $sum]);
}
if ($method === 'GET' && isset($_GET['recent'])) {
  need_admin($_GET['key'] ?? '');
  $all = [];
  foreach (course_files($DATA) as $cid => $f) foreach (load($f) as $x) { $y = $pub($x); $y['course'] = $cid; $all[] = $y; }
  usort($all, fn($a, $b) => $b['t'] <=> $a['t']);
  out(200, ['ok' => true, 'items' => array_slice($all, 0, 300)]);
}
if ($method === 'GET') {
  $course = $_GET['course'] ?? '';
  if (!preg_match('/^c\d{1,4}$/', $course)) out(400, ['ok' => false, 'error' => '課程代號不正確']);
  $list = load("$DATA/$course.json");
  usort($list, fn($a, $b) => ($b['t'] ?? 0) <=> ($a['t'] ?? 0));
  $n = count($list); $avg = $n ? round(array_sum(array_column($list, 'stars')) / $n, 1) : 0;
  out(200, ['ok' => true, 'count' => $n, 'avg' => $avg, 'items' => array_map($pub, array_slice($list, 0, 300))]);
}
if ($method !== 'POST') out(405, ['ok' => false, 'error' => '不支援的操作']);
$in = body();
$course = $in['course'] ?? '';
if (!preg_match('/^c\d{1,4}$/', $course)) out(400, ['ok' => false, 'error' => '課程代號不正確']);
if (($in['action'] ?? '') === 'delete') {
  if (!is_admin($in['key'] ?? '')) out(403, ['ok' => false, 'error' => '只有講師可以刪除']);
  $id = (string)($in['id'] ?? '');
  locked_update("$DATA/$course.json", function (&$list) use ($id) { $list = array_values(array_filter($list, fn($x) => ($x['id'] ?? '') !== $id)); });
  out(200, ['ok' => true]);
}
if (($in['action'] ?? '') === 'reply') {
  need_admin($in['key'] ?? '');
  $id = (string)($in['id'] ?? ''); $reply = clean($in['reply'] ?? '', 800);
  $hit = locked_update("$DATA/$course.json", function (&$list) use ($id, $reply) { foreach ($list as &$x) if (($x['id'] ?? '') === $id) { $x['reply'] = $reply; $x['rt'] = time(); return true; } return false; });
  out($hit ? 200 : 404, ['ok' => (bool)$hit]);
}
if (!empty($in['website'])) out(200, ['ok' => true]);
$stars = (int)($in['stars'] ?? 0);
$name = clean($in['name'] ?? '', 20); if ($name === '') $name = '學員';
$text = clean($in['text'] ?? '', 800);
if ($stars < 1 || $stars > 5) out(400, ['ok' => false, 'error' => '請選 1～5 顆星']);
if (mb_strlen($text, 'UTF-8') < 5) out(400, ['ok' => false, 'error' => '評價至少寫 5 個字']);
if (preg_match('#https?://#i', $text)) out(400, ['ok' => false, 'error' => '評價裡不能放網址']);
$ip = rate_limit('reviews', 30);
$item = ['id' => bin2hex(random_bytes(6)), 'stars' => $stars, 'name' => $name, 'text' => $text, 't' => time(), 'ip' => $ip];
locked_update("$DATA/$course.json", function (&$list) use ($item) {
  $list = array_values(array_filter($list, fn($x) => ($x['ip'] ?? '') !== $item['ip']));  // 同一人只留最新一則
  $list[] = $item;
});
notify("【OKAI 新評價】$course {$stars} 顆星", "{$name}：\n$text");
out(200, ['ok' => true, 'item' => $pub($item)]);
