<?php
/* OKAI課程網 單元留言 API
 * GET  ?course=c105                                   → 這門課的留言
 * POST {course, lesson, name, text, website, parent?, key?}  → 新增留言；帶講師金鑰 = 講師回覆
 * POST {action:'delete', course, id, key}            → 講師刪除留言
 * 講師金鑰在 /home/<帳號>/okaiclass_data/admin_key.txt
 */
require __DIR__ . '/_lib.php';
$DATA = "$ROOT/comments"; if (!is_dir($DATA)) @mkdir($DATA, 0700, true);
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'GET' && isset($_GET['recent'])) {   // 講師後台：所有課程最新留言
  need_admin($_GET['key'] ?? '');
  $all = [];
  foreach (course_files($DATA) as $cid => $f) foreach (load($f) as $x) { $x['course'] = $cid; $all[] = $x; }
  usort($all, fn($a, $b) => ($b['t'] ?? 0) <=> ($a['t'] ?? 0));
  out(200, ['ok' => true, 'items' => array_slice($all, 0, 400)]);
}
if ($method === 'GET') {
  $course = $_GET['course'] ?? '';
  if (!preg_match('/^c\d{1,4}$/', $course)) out(400, ['ok' => false, 'error' => '課程代號不正確']);
  $list = load("$DATA/$course.json");
  usort($list, fn($a, $b) => ($b['t'] ?? 0) <=> ($a['t'] ?? 0));
  $res = ['ok' => true, 'items' => array_slice($list, 0, 500)];
  if (isset($_GET['key'])) $res['admin'] = is_admin($_GET['key']);
  out(200, $res);
}
if ($method !== 'POST') out(405, ['ok' => false, 'error' => '不支援的操作']);

$in = body();
$course = $in['course'] ?? '';
if (!preg_match('/^c\d{1,4}$/', $course)) out(400, ['ok' => false, 'error' => '課程代號不正確']);
$admin = is_admin($in['key'] ?? '');

if (($in['action'] ?? '') === 'delete') {
  if (!$admin) out(403, ['ok' => false, 'error' => '只有講師可以刪除']);
  $id = (string)($in['id'] ?? '');
  $n = locked_update("$DATA/$course.json", function (&$list) use ($id) { $b = count($list); $list = array_values(array_filter($list, fn($x) => ($x['id'] ?? '') !== $id && ($x['parent'] ?? '') !== $id)); return $b - count($list); });
  out(200, ['ok' => true, 'removed' => $n]);
}

if (!empty($in['website'])) out(200, ['ok' => true]);   // 防機器人
$lesson = $in['lesson'] ?? '';
$name = clean($in['name'] ?? '', 20);
$text = clean($in['text'] ?? '', 1000);
$parent = preg_match('/^[0-9a-f]{12}$/', $in['parent'] ?? '') ? $in['parent'] : '';
if (!preg_match('/^\d{1,2}-\d{1,3}$/', $lesson)) out(400, ['ok' => false, 'error' => '單元資料不正確']);
if ($name === '') $name = $admin ? '講師' : '學員';
if (mb_strlen($text, 'UTF-8') < 2) out(400, ['ok' => false, 'error' => '留言至少 2 個字']);
if (!$admin && preg_match_all('#https?://#i', $text) > 2) out(400, ['ok' => false, 'error' => '留言裡的網址太多']);
if (!$admin) rate_limit('comments', 20);

$item = ['id' => bin2hex(random_bytes(6)), 'lesson' => $lesson, 'name' => $name, 'text' => $text, 't' => time()];
if ($parent) $item['parent'] = $parent;
if ($admin) $item['teacher'] = true;
locked_update("$DATA/$course.json", function (&$list) use ($item) { $list[] = $item; if (count($list) > 3000) $list = array_slice($list, -3000); });
if (!$admin) notify("【OKAI 新留言】$course 單元 $lesson", "$name 說：\n$text");
out(200, ['ok' => true, 'item' => $item]);
