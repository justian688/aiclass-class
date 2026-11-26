<?php
/* OKAI課程網 作業 API
 * POST {course, name, link, text, website}          → 繳交，回傳 id（學員自己存著查進度）
 * GET  ?course=c105&ids=a,b                          → 查自己繳交的作業與講師回饋
 * GET  ?recent=1&key=                                → 講師：所有作業
 * POST {action:'grade', course, id, feedback, pass, key} → 講師批改
 * POST {action:'delete', course, id, key}            → 講師刪除
 */
require __DIR__ . '/_lib.php';
$DATA = "$ROOT/homework"; if (!is_dir($DATA)) @mkdir($DATA, 0700, true);
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$okCourse = fn($c) => is_string($c) && preg_match('/^c\d{1,4}$/', $c);
if ($method === 'GET' && isset($_GET['recent'])) {
  need_admin($_GET['key'] ?? '');
  $all = [];
  foreach (course_files($DATA) as $cid => $f) foreach (load($f) as $x) { $x['course'] = $cid; $all[] = $x; }
  usort($all, fn($a, $b) => $b['t'] <=> $a['t']);
  out(200, ['ok' => true, 'items' => array_slice($all, 0, 300)]);
}
if ($method === 'GET') {
  $c = $_GET['course'] ?? ''; if (!$okCourse($c)) out(400, ['ok' => false, 'error' => '課程代號不正確']);
  $ids = array_filter(explode(',', (string)($_GET['ids'] ?? '')), fn($i) => preg_match('/^[0-9a-f]{12}$/', $i));
  $mine = array_values(array_filter(load("$DATA/$c.json"), fn($x) => in_array($x['id'], $ids, true)));
  out(200, ['ok' => true, 'items' => $mine]);
}
if ($method !== 'POST') out(405, ['ok' => false, 'error' => '不支援的操作']);
$in = body(); $c = $in['course'] ?? ''; if (!$okCourse($c)) out(400, ['ok' => false, 'error' => '課程代號不正確']);
$act = $in['action'] ?? '';
if ($act === 'grade' || $act === 'delete') {
  need_admin($in['key'] ?? ''); $id = (string)($in['id'] ?? '');
  $fb = clean($in['feedback'] ?? '', 1500); $pass = !empty($in['pass']);
  $hit = locked_update("$DATA/$c.json", function (&$list) use ($id, $fb, $pass, $act) {
    if ($act === 'delete') { $b = count($list); $list = array_values(array_filter($list, fn($x) => $x['id'] !== $id)); return $b !== count($list); }
    foreach ($list as &$x) if ($x['id'] === $id) { $x['feedback'] = $fb; $x['pass'] = $pass; $x['gt'] = time(); return true; } return false;
  });
  out($hit ? 200 : 404, ['ok' => (bool)$hit]);
}
if (!empty($in['website'])) out(200, ['ok' => true]);
$name = clean($in['name'] ?? '', 20); if ($name === '') $name = '學員';
$link = clean($in['link'] ?? '', 300); $text = clean($in['text'] ?? '', 2000);
if ($link !== '' && !preg_match('#^https?://[^\s]+$#i', $link)) out(400, ['ok' => false, 'error' => '連結要用 http:// 或 https:// 開頭']);
if ($link === '' && mb_strlen($text, 'UTF-8') < 10) out(400, ['ok' => false, 'error' => '請貼上作品連結，或至少寫 10 個字說明']);
rate_limit('homework', 30);
$item = ['id' => bin2hex(random_bytes(6)), 'name' => $name, 'link' => $link, 'text' => $text, 't' => time()];
locked_update("$DATA/$c.json", function (&$list) use ($item) { $list[] = $item; if (count($list) > 3000) $list = array_slice($list, -3000); });
notify("【OKAI 新作業】$c $name", ($link ? "連結：$link\n" : '') . $text);
out(200, ['ok' => true, 'item' => $item]);
