<?php
/* OKAI課程網 課程許願池
 * GET                                  → 願望清單（票數高的在前）
 * POST {title, desc, website}          → 許願
 * POST {action:'vote', id}             → 投票（同一個網路位址每個願望一票）
 * POST {action:'delete'|'status', id, status?, key} → 講師管理（status：開課中、已開課）
 */
require __DIR__ . '/_lib.php';
$F = "$ROOT/wishes.json";
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$pub = fn($x) => ['id' => $x['id'], 'title' => $x['title'], 'desc' => $x['desc'], 'votes' => count($x['voters'] ?? []), 'status' => $x['status'] ?? '', 't' => $x['t']];
if ($method === 'GET') {
  $l = array_map($pub, load($F));
  usort($l, fn($a, $b) => [$b['votes'], $b['t']] <=> [$a['votes'], $a['t']]);
  out(200, ['ok' => true, 'items' => array_slice($l, 0, 300)]);
}
if ($method !== 'POST') out(405, ['ok' => false, 'error' => '不支援的操作']);
$in = body(); $act = $in['action'] ?? ''; $id = (string)($in['id'] ?? '');
if ($act === 'delete' || $act === 'status') {
  need_admin($in['key'] ?? ''); $st = clean($in['status'] ?? '', 10);
  locked_update($F, function (&$l) use ($act, $id, $st) { if ($act === 'delete') $l = array_values(array_filter($l, fn($x) => $x['id'] !== $id)); else foreach ($l as &$x) if ($x['id'] === $id) $x['status'] = $st; });
  out(200, ['ok' => true]);
}
$ip = hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? '') . 'okai');
if ($act === 'vote') {
  $r = locked_update($F, function (&$l) use ($id, $ip) { foreach ($l as &$x) if ($x['id'] === $id) { $v = $x['voters'] ?? []; if (in_array($ip, $v, true)) return -1; $v[] = $ip; $x['voters'] = $v; return count($v); } return 0; });
  if ($r === 0) out(404, ['ok' => false, 'error' => '找不到這個願望']);
  if ($r === -1) out(200, ['ok' => false, 'error' => '你已經投過這個願望了']);
  out(200, ['ok' => true, 'votes' => $r]);
}
if (!empty($in['website'])) out(200, ['ok' => true]);
$title = clean($in['title'] ?? '', 40); $desc = clean($in['desc'] ?? '', 300);
if (mb_strlen($title, 'UTF-8') < 4) out(400, ['ok' => false, 'error' => '課程名稱至少 4 個字']);
if (preg_match('#https?://#i', $title . $desc)) out(400, ['ok' => false, 'error' => '不能放網址']);
rate_limit('wishes', 60);
$item = ['id' => bin2hex(random_bytes(6)), 'title' => $title, 'desc' => $desc, 'voters' => [$ip], 't' => time()];
locked_update($F, function (&$l) use ($item) { $l[] = $item; });
notify('【OKAI 新許願】' . $title, $desc);
out(200, ['ok' => true, 'item' => $pub($item)]);
