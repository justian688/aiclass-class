(() => {
// ── GA4 placeholder (replace G-XXXXXXXXXX with real Measurement ID) ──
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'G-XXXXXXXXXX', { send_page_view: false });
window.trackEvent = (name, params) => { if (typeof gtag === 'function') gtag('event', name, params); };

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const rafThrottle = fn => { let ticking = false; return (...args) => { if (ticking) return; ticking = true; requestAnimationFrame(() => { fn(...args); ticking = false; }); }; };
const C = window.COURSES, byId = Object.fromEntries(C.map(c => [c.id, c]));
const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fmt = n => 'NT$' + n.toLocaleString('en-US');
const escH = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const pct = c => Math.round((1 - c.price / c.origin) * 100);
const vid = c => `assets/video/v${c.v}.mp4`, img = c => `assets/img/v${c.v}.jpg`;
document.addEventListener('error', e => { if (e.target.tagName === 'IMG' && !e.target.dataset.fallback) { e.target.dataset.fallback = '1'; e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='225' fill='%23e5e5ea'%3E%3Crect width='400' height='225' rx='12'/%3E%3Ctext x='200' y='120' text-anchor='middle' font-family='system-ui' font-size='14' fill='%23aeaeb2'%3E圖片載入失敗%3C/text%3E%3C/svg%3E"; e.target.alt = '圖片暫時無法顯示'; } }, true);
const page = document.body.dataset.page;
const ls = (key, fallback) => { try { const v = localStorage.getItem(key); return v != null ? JSON.parse(v) : fallback; } catch { localStorage.removeItem(key); return fallback; } };
const ss = (key, val) => { try { localStorage.setItem(key, typeof val === 'string' ? val : JSON.stringify(val)); } catch {} };
const wish = new Set(ls('aic-wish', []));
const cart = new Set(ls('aic-cart', []));
const aicUser = ls('aic-user', null);
const owned = new Set(ls('aic-owned', []));
const streakData = (() => { const k = 'aic-streak', today = new Date().toISOString().slice(0,10), d = ls(k, {last:'',count:0}), yd = new Date(Date.now()-864e5).toISOString().slice(0,10); if (d.last !== today) { d.count = d.last === yd ? d.count + 1 : 1; d.last = today; ss(k, d); } return d; })();
const follows = new Set(ls('aic-follows', []));
function saveFollows() { ss('aic-follows', [...follows]); }
const reviewVotes = ls('aic-rvotes', {});
function saveReviewVotes() { ss('aic-rvotes', reviewVotes); }

function trapFocus(el) {
  const sel = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';
  const handler = e => {
    if (e.key !== 'Tab') return;
    const focusable = [...el.querySelectorAll(sel)].filter(f => f.offsetParent !== null);
    if (!focusable.length) return;
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last.focus(); } }
    else { if (document.activeElement === last) { e.preventDefault(); first.focus(); } }
  };
  el.addEventListener('keydown', handler);
  return () => el.removeEventListener('keydown', handler);
}
function saveCart() { ss('aic-cart', [...cart]); }
function updateCartBadge() { const b = $('.cart-badge'); if (b) { b.textContent = cart.size || ''; b.style.display = cart.size ? 'flex' : 'none'; b.classList.remove('bounce'); void b.offsetWidth; b.classList.add('bounce'); } }

/* ---------- XP 經驗值系統 ---------- */
const xpData = (() => { const d = ls('aic-xp', {total:0,log:[]}); return d; })();
function addXP(amount, reason) {
  xpData.total += amount;
  xpData.log.push({ amount, reason, ts: Date.now() });
  if (xpData.log.length > 100) xpData.log = xpData.log.slice(-100);
  ss('aic-xp', xpData);
  const lvl = getXPLevel();
  const badge = $('.hdr-level-badge');
  if (badge) { badge.textContent = `Lv.${lvl.lv}`; badge.title = lvl.name; }
}
function getXPLevel() {
  const levels = window.XP_LEVELS || [{ lv: 1, name: '新手學員', min: 0 }];
  let cur = levels[0];
  for (const l of levels) { if (xpData.total >= l.min) cur = l; }
  return cur;
}
function getXPProgress() {
  const levels = window.XP_LEVELS || [];
  const cur = getXPLevel();
  const idx = levels.indexOf(cur);
  const next = levels[idx + 1];
  if (!next) return { pct: 100, cur: xpData.total, need: xpData.total };
  return { pct: Math.round((xpData.total - cur.min) / (next.min - cur.min) * 100), cur: xpData.total - cur.min, need: next.min - cur.min };
}

/* ---------- Confetti 慶祝動畫 ---------- */
function showConfetti() {
  if (prefersReduced) return;
  const cv = document.createElement('canvas'); cv.className = 'confetti-canvas';
  cv.style.cssText = 'position:fixed;inset:0;z-index:9500;pointer-events:none';
  cv.width = innerWidth; cv.height = innerHeight;
  document.body.append(cv);
  const ctx = cv.getContext('2d');
  const colors = ['#7c5cff','#ff5c8a','#34c759','#ffd700','#00b4d8','#ff9500','#a855f7'];
  const pieces = Array.from({ length: 80 }, () => ({
    x: Math.random() * cv.width, y: -20 - Math.random() * 200,
    w: 6 + Math.random() * 8, h: 4 + Math.random() * 6,
    color: colors[Math.floor(Math.random() * colors.length)],
    vx: (Math.random() - 0.5) * 4, vy: 2 + Math.random() * 4,
    rot: Math.random() * 360, vr: (Math.random() - 0.5) * 10, opacity: 1
  }));
  let frame = 0;
  const tick = () => {
    ctx.clearRect(0, 0, cv.width, cv.height);
    let alive = false;
    pieces.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.vy += 0.05; p.rot += p.vr;
      if (frame > 60) p.opacity = Math.max(0, p.opacity - 0.015);
      if (p.opacity <= 0) return;
      alive = true;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot * Math.PI / 180);
      ctx.globalAlpha = p.opacity; ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    frame++;
    if (alive && frame < 180) requestAnimationFrame(tick); else cv.remove();
  };
  requestAnimationFrame(tick);
}

/* ---------- SEO：動態 meta / JSON-LD ---------- */
function seo(opts = {}) {
  const base = 'https://aiclass.tw/';
  const dTitle = opts.title || document.title;
  const dDesc = opts.desc || '';
  const dUrl = opts.url || base;
  const dImg = opts.img || base + 'assets/img/og-cover.jpg';
  function setMeta(attr, val, content) { let el = $(`meta[${attr}="${val}"]`); if (!el) { el = document.createElement('meta'); el.setAttribute(attr, val); document.head.append(el); } el.content = content; }
  setMeta('property', 'og:title', dTitle);
  setMeta('property', 'og:description', dDesc);
  setMeta('property', 'og:url', dUrl);
  setMeta('property', 'og:image', dImg);
  setMeta('property', 'og:locale', 'zh_TW');
  setMeta('property', 'og:site_name', 'AI Class');
  setMeta('property', 'og:type', opts.ogType || 'website');
  setMeta('name', 'twitter:card', opts.twitterCard || 'summary_large_image');
  setMeta('name', 'twitter:title', dTitle);
  setMeta('name', 'twitter:description', dDesc);
  setMeta('name', 'twitter:image', dImg);
  setMeta('name', 'twitter:site', '@aiclass_tw');
  setMeta('name', 'description', dDesc);
  let hreflang = $('link[hreflang]');
  if (!hreflang) { hreflang = document.createElement('link'); hreflang.rel = 'alternate'; hreflang.hreflang = 'zh-TW'; document.head.append(hreflang); }
  hreflang.href = dUrl;
  const canon = $('link[rel="canonical"]'); if (canon) canon.href = dUrl;
  if (opts.jsonLd) { let s = $('#seo-jsonld'); if (!s) { s = document.createElement('script'); s.id = 'seo-jsonld'; s.type = 'application/ld+json'; document.head.append(s); } s.textContent = JSON.stringify(Array.isArray(opts.jsonLd) ? opts.jsonLd : [opts.jsonLd]); }
}

/* ---------- 學習筆記 ---------- */
const allNotes = ls('aic-notes', {});
function saveNotes() { ss('aic-notes', allNotes); }
function notesWidget(courseId) {
  const notes = allNotes[courseId] || [];
  return `<section class="c-sec" id="notes"><h2 class="rv-up">📝 我的學習筆記 ${notes.length ? `<button class="notes-export btn btn-ghost btn-sm" style="font-size:13px;margin-left:12px">📥 匯出筆記</button>` : ''}</h2>
    <div class="notes-add rv-up"><textarea class="notes-input" placeholder="記錄你的學習重點..." rows="3" aria-label="學習筆記"></textarea><button class="btn btn-pri notes-save">儲存筆記</button></div>
    <div class="notes-list">${notes.map((n, i) => `<div class="note-item rv-up"><div class="note-date">${new Date(n.ts).toLocaleDateString('zh-TW')} ${new Date(n.ts).toLocaleTimeString('zh-TW', {hour:'2-digit',minute:'2-digit'})}</div><p class="note-text">${escH(n.text)}</p><button class="note-del" data-ni="${i}">刪除</button></div>`).join('')}${!notes.length ? '<p class="notes-empty">還沒有筆記，開始記錄你的學習心得吧！</p>' : ''}</div></section>`;
}
function bindNotes(courseId, main) {
  const saveBtn = $('.notes-save', main);
  if (!saveBtn) return;
  saveBtn.onclick = () => {
    const ta = $('.notes-input', main), txt = ta.value.trim();
    if (!txt) return;
    if (!allNotes[courseId]) allNotes[courseId] = [];
    allNotes[courseId].unshift({ text: txt, ts: Date.now() });
    saveNotes(); ta.value = '';
    const list = $('.notes-list', main);
    const item = document.createElement('div'); item.className = 'note-item rv-up in';
    item.innerHTML = `<div class="note-date">${new Date().toLocaleDateString('zh-TW')} ${new Date().toLocaleTimeString('zh-TW', {hour:'2-digit',minute:'2-digit'})}</div><p class="note-text">${escH(txt)}</p><button class="note-del" data-ni="0">刪除</button>`;
    const empty = $('.notes-empty', list); if (empty) empty.remove();
    list.prepend(item);
    reveal(list);
    toast('筆記已儲存');
  };
  main.addEventListener('click', e => {
    const del = e.target.closest('.note-del');
    if (!del) return;
    const idx = +del.dataset.ni;
    if (allNotes[courseId]) { allNotes[courseId].splice(idx, 1); saveNotes(); }
    del.closest('.note-item').remove();
    if (!allNotes[courseId]?.length) { const list = $('.notes-list', main); list.innerHTML = '<p class="notes-empty">還沒有筆記，開始記錄你的學習心得吧！</p>'; }
    toast('筆記已刪除');
  });
  const exportBtn = $('.notes-export', main);
  if (exportBtn) exportBtn.onclick = () => {
    const ns = allNotes[courseId] || [];
    if (!ns.length) { toast('沒有筆記可匯出'); return; }
    const cTitle = (byId[courseId] || {}).title || courseId;
    const md = `# ${cTitle} — 學習筆記\n\n> 匯出自 AI Class ・ ${new Date().toLocaleString('zh-TW')}\n\n---\n\n` +
      ns.map((n, i) => `### 筆記 ${i + 1}\n\n📅 ${new Date(n.ts).toLocaleString('zh-TW')}\n\n${n.text}\n\n---\n`).join('\n');
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `AI-Class-筆記-${cTitle.slice(0,20)}.md`; a.click();
    URL.revokeObjectURL(a.href);
    toast('筆記已匯出');
  };
}

/* ---------- 課程進度追蹤 ---------- */
const progress = ls('aic-progress', {});
function saveProgress() { ss('aic-progress', progress); }
function getCourseProg(cid) { return progress[cid] || { done: [], lastAt: 0 }; }
function markLesson(cid, chapIdx, lessonIdx) {
  if (!progress[cid]) progress[cid] = { done: [], lastAt: 0 };
  const key = `${chapIdx}-${lessonIdx}`;
  if (!progress[cid].done.includes(key)) progress[cid].done.push(key);
  progress[cid].lastAt = Date.now();
  saveProgress();
}

/* ---------- 使用者評價 ---------- */
const userReviews = ls('aic-reviews', {});
function saveReviews() { ss('aic-reviews', userReviews); }
function bindUserReview(courseId, main) {
  const stars = $$('[data-ur]', main);
  const txt = $('.ur-text', main);
  const btn = $('.ur-submit', main);
  const list = $('.ur-user-list', main);
  if (!stars.length || !txt || !btn) return;
  let rating = 0;
  stars.forEach(s => {
    s.onmouseenter = () => { const v = +s.dataset.ur; stars.forEach((x, i) => x.textContent = i < v ? '★' : '☆'); };
    s.onclick = () => { rating = +s.dataset.ur; stars.forEach((x, i) => { x.textContent = i < rating ? '★' : '☆'; x.classList.toggle('sel', i < rating); }); checkSubmit(); };
  });
  const starsWrap = $('.ur-stars', main);
  if (starsWrap) starsWrap.onmouseleave = () => { stars.forEach((x, i) => x.textContent = i < rating ? '★' : '☆'); };
  txt.oninput = checkSubmit;
  function checkSubmit() { btn.disabled = !(rating > 0 && txt.value.trim().length >= 10); }
  btn.onclick = () => {
    if (!userReviews[courseId]) userReviews[courseId] = [];
    const r = { rating, text: txt.value.trim(), ts: Date.now() };
    userReviews[courseId].unshift(r);
    saveReviews();
    txt.value = ''; rating = 0; stars.forEach(s => { s.textContent = '☆'; s.classList.remove('sel'); }); btn.disabled = true;
    renderUserReviews(courseId, list);
    toast('感謝你的評價！');
  };
  renderUserReviews(courseId, list);
}
function renderUserReviews(courseId, container) {
  const reviews = userReviews[courseId] || [];
  if (!reviews.length) { container.innerHTML = ''; return; }
  container.innerHTML = `<h4 style="margin:24px 0 12px;font-size:16px">我的評價</h4>` + reviews.map((r, i) => `<div class="review-item ur-mine">
    <div class="ri-head"><div class="ri-avatar" style="background:var(--pri)">我</div><div class="ri-meta"><b>我的評價</b><div class="ri-sub">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)} <span class="ri-date">${new Date(r.ts).toLocaleDateString('zh-TW')}</span></div></div><button class="ur-del" data-uri="${i}">刪除</button></div>
    <p>${escH(r.text)}</p></div>`).join('');
  $$('.ur-del', container).forEach(b => b.onclick = () => {
    userReviews[courseId].splice(+b.dataset.uri, 1); saveReviews(); renderUserReviews(courseId, container); toast('評價已刪除');
  });
}

/* ---------- 智慧推薦 ---------- */
function smartRecommend(current) {
  const scored = C.filter(c => c.id !== current.id).map(c => {
    let s = 0;
    if (c.cat === current.cat) s += 3;
    if (c.teacher === current.teacher) s += 5;
    if (c.rating >= 4.7) s += 1;
    if (Math.abs(c.price - current.price) < 1500) s += 1;
    if (Math.abs(c.hours - current.hours) < 5) s += 1;
    return { ...c, _score: s };
  }).sort((a, b) => b._score - a._score).slice(0, 6);
  if (!scored.length) return '';
  return `<section class="sec sr-sec"><div class="wrap"><div class="sec-head rv-up"><div><h2>學了這門的人也學了</h2><div class="sub">根據學員購買行為推薦</div></div></div>
    <div class="rail">${scored.map((c, i) => {
      const buyPct = 40 + Math.floor(Math.random() * 35);
      return `<div class="sr-card-wrap">${card(c, i)}<div class="sr-also-bought">${buyPct}% 的學員也購買</div></div>`;
    }).join('')}</div></div></section>`;
}

/* ---------- 快速預覽彈窗 ---------- */
function quickPreview(courseId) {
  const c = byId[courseId]; if (!c) return;
  const prevFocus = document.activeElement;
  const cat = window.CATS.find(x => x.id === c.cat) || { name: '' };
  const ov = document.createElement('div'); ov.className = 'qp-overlay'; ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true'); ov.setAttribute('aria-label', c.title + ' 快速預覽');
  ov.innerHTML = `<div class="qp-box">
    <button class="qp-close" aria-label="關閉">×</button>
    <div class="qp-vid"><video src="${vid(c)}" poster="${img(c)}" muted loop playsinline preload="metadata"></video><button class="qp-play">▶</button></div>
    <div class="qp-body">
      <span class="qp-cat">${cat.name}</span>
      <h2 class="qp-title">${c.title}</h2>
      <p class="qp-teacher">${c.teacher}・${c.role}</p>
      <div class="qp-stats"><span>★ ${c.rating.toFixed(1)}</span><span>${c.students.toLocaleString()} 學員</span><span>${c.hours} 小時</span></div>
      ${c.ai ? `<p class="qp-ai"><span class="ai-tag">✦ AI 摘要</span> ${c.ai}</p>` : ''}
      ${(()=>{ const chs = window.CHAPTERS && window.CHAPTERS[courseId]; return chs ? `<div class="qp-chapters"><h4>📚 課程章節</h4><div class="qp-ch-list">${chs.map(ch=>`<div class="qp-ch"><span class="qp-ch-num">CH${ch.ch}</span><b>${ch.title}</b><span class="qp-ch-dur">${ch.duration} 分鐘・${ch.lessons.length} 堂</span></div>`).join('')}</div></div>` : ''; })()}
      <div class="qp-price"><span class="qp-now">${fmt(c.price)}</span><del>${fmt(c.origin)}</del><span class="qp-pct">${pct(c)}% OFF</span></div>
      <div class="qp-actions">
        <a class="btn btn-pri" href="course.html?id=${c.id}">查看完整課程</a>
        <button class="btn btn-ghost qp-cart">加入購物車</button>
      </div>
    </div>
  </div>`;
  document.body.append(ov);
  requestAnimationFrame(() => requestAnimationFrame(() => ov.classList.add('show')));
  const releaseTrap = trapFocus(ov);
  const closeQP = () => { releaseTrap(); ov.classList.remove('show'); setTimeout(() => { ov.remove(); if (prevFocus) prevFocus.focus(); }, 300); };
  ov.querySelector('.qp-close').onclick = closeQP;
  ov.onclick = e => { if (e.target === ov) closeQP(); };
  ov.querySelector('.qp-play').onclick = () => { const v = ov.querySelector('video'); v.play(); ov.querySelector('.qp-play').style.display = 'none'; };
  ov.querySelector('.qp-cart').onclick = () => { cart.add(c.id); saveCart(); updateCartBadge(); toast('已加入購物車 🛒'); window.trackEvent('add_to_cart', { item_id: c.id, item_name: c.title, value: c.price }); };
  document.addEventListener('keydown', function esc(e) { if (e.key === 'Escape') { closeQP(); document.removeEventListener('keydown', esc); } });
  requestAnimationFrame(() => ov.querySelector('.qp-close').focus());
}
window.quickPreview = quickPreview;

/* ---------- 共用：公告、頁首、頁尾、手機導覽 ---------- */
const deadline = (() => { // 每天午夜重置的限時優惠
  const d = new Date(); d.setHours(24, 0, 0, 0); return d.getTime();
})();
function shell() {
  // Skip-to-content (inject on every page)
  const main = $('main');
  if (main && !main.id) main.id = 'main-content';
  if (!$('.skip')) { const sk = document.createElement('a'); sk.className = 'skip'; sk.href = '#main-content'; sk.textContent = '跳至主要內容'; document.body.prepend(sk); }

  const top = document.createElement('div');
  if (!sessionStorage.getItem('aic-topbar')) {
    top.className = 'topbar';
    const anns = window.ANNOUNCEMENTS || [{ text: '雙 11 全站課程最低 5 折，今日倒數', link: '/coupon.html' }];
    let annIdx = 0;
    const annText = () => anns[annIdx].text + (anns[annIdx].link ? '' : '') + `・今日倒數 <b data-cd-inline>--:--:--</b>`;
    top.innerHTML = `<span class="topbar-txt">${annText()}</span><button class="topbar-prev" aria-label="上一則">‹</button><button class="topbar-next" aria-label="下一則">›</button><button class="x" aria-label="關閉">×</button>`;
    const txt = $('.topbar-txt', top);
    const cycle = dir => { annIdx = (annIdx + dir + anns.length) % anns.length; txt.style.opacity = 0; setTimeout(() => { txt.innerHTML = annText(); txt.style.opacity = 1; }, 200); };
    if (anns.length > 1) { let autoAnn = setInterval(() => cycle(1), 5000); top.addEventListener('mouseenter', () => clearInterval(autoAnn)); top.addEventListener('mouseleave', () => { autoAnn = setInterval(() => cycle(1), 5000); }); }
    $('.topbar-prev', top).onclick = () => cycle(-1);
    $('.topbar-next', top).onclick = () => cycle(1);
    txt.onclick = () => { if (anns[annIdx].link) location.href = anns[annIdx].link; };
    txt.style.cursor = 'pointer';
    document.body.prepend(top);
    $('.x', top).onclick = () => { top.remove(); sessionStorage.setItem('aic-topbar', 1); };
  }
  const hdr = document.createElement('header');
  hdr.className = 'hdr';
  hdr.innerHTML = `<div class="wrap">
    <a class="logo" href="index.html" aria-label="AI Class 首頁"><svg viewBox="0 0 168 40" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="lg" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse"><stop stop-color="#7C5CFF"/><stop offset="1" stop-color="#FF5C8A"/></linearGradient></defs><rect x="2" y="2" width="36" height="36" rx="11" fill="url(#lg)"/><path d="M11 29 L20 10 L29 29" stroke="#fff" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="20" cy="23" r="2.6" fill="#fff"/><text x="48" y="27" font-family="'Noto Sans TC',system-ui,sans-serif" font-size="20" font-weight="800" fill="var(--tx)" letter-spacing="-0.3">AI Class</text></svg></a>
    <div class="mega-wrap">
      <button class="mega-btn" aria-expanded="false">☰ 所有分類</button>
      <div class="mega-drop" hidden>
        <div class="mega-grid">${window.CATS.slice(1).map(c => { const cnt = C.filter(x => x.cat === c.id).length; return `<div class="mega-col"><a class="mega-title" href="index.html#cat-${c.id}">${c.name}<span class="mega-count">${cnt}</span></a>${(c.subs||[]).map(s => `<a class="mega-sub" href="index.html#cat-${c.id}&sub=${encodeURIComponent(s)}">${s}</a>`).join('')}</div>`; }).join('')}</div>
      </div>
    </div>
    <nav class="nav"><a href="index.html#hot">熱門課程</a><a href="index.html#new">最新上架</a><a href="index.html#paths">學習路徑</a><a href="index.html#bootcamps">訓練營</a><a href="bundle.html">組合包</a><a href="success.html">成功故事</a><a href="upcoming.html">即將開課</a><a href="blog.html">學習專欄</a><a href="community.html">社群</a><a href="live.html">直播</a><a href="video.html">影片</a><a href="quiz.html">測驗</a><a href="leaderboard.html">排行榜</a><a href="sale.html" style="color:var(--pink)">🔥 特賣</a><a href="event.html" style="color:var(--pink)">🎉 活動</a><a href="skillmap.html">技能地圖</a><a href="enterprise.html">企業方案</a></nav>
    <div class="sp"></div>
    <button class="search-btn" data-search>⌕ 想學什麼？搜尋課程<kbd>⌘K</kbd></button>
    <div class="notif-wrap">
      <button class="notif-btn" aria-label="通知">🔔${(()=>{const c=(window.NOTIFICATIONS||[]).filter(n=>!n.read).length;return c?`<span class="notif-badge-count">${c}</span>`:''})()}</button>
      <div class="notif-panel" role="dialog" aria-modal="false" aria-label="通知面板">
        <div class="notif-hdr"><h4>通知</h4><button class="notif-read-all">全部已讀</button></div>
        <div class="notif-tabs"><button class="notif-tab on" data-nf="all">全部</button><button class="notif-tab" data-nf="course">課程</button><button class="notif-tab" data-nf="system">系統</button><button class="notif-tab" data-nf="promo">活動</button></div>
        <div class="notif-list">${(window.NOTIFICATIONS||[]).length?(window.NOTIFICATIONS||[]).map(n=>{const icons={course:'📚',promo:'🏷️',community:'💬',achievement:'🏆',live:'📡',system:'⚙️'};return `<${n.link?`a href="${n.link}"`:'div'} class="notif-item${n.read?'':' unread'}" data-ntype="${n.type}"><div class="ni-icon">${icons[n.type]||'🔔'}</div><div class="ni-body"><b>${n.title}</b><p>${n.body}</p><div class="ni-time">${n.time}</div></div></${n.link?'a':'div'}>`}).join(''):'<div class="notif-empty"><div class="notif-empty-icon">🔕</div><p>目前沒有新通知</p></div>'}</div>
      </div>
    </div>
    <button class="theme-toggle" aria-label="切換深色模式" data-theme-toggle></button>
    <a class="btn btn-ghost cart-btn" href="cart.html" title="購物車">🛒<span class="cart-badge" style="display:${cart.size?'flex':'none'}">${cart.size||''}</span></a>
    ${aicUser ? `<div class="user-menu-wrap"><button class="btn btn-ghost user-menu-btn">${localStorage.getItem('aic-pro')?'<span class="hdr-pro-badge">PRO</span>':''}<span class="hdr-level-badge" title="${getXPLevel().name}">Lv.${getXPLevel().lv}</span>👤 ${aicUser.name}</button><div class="user-menu-drop" hidden><div class="um-xp-row"><span class="hdr-level-badge lg">${getXPLevel().name}</span><span>${xpData.total.toLocaleString()} XP</span></div><a href="my.html">我的學習</a><a href="notebook.html">學習筆記</a><a href="report.html">學習報告</a><a href="order-history.html">訂單紀錄</a><a href="certificate.html">我的證書</a><a href="achievement.html">成就</a><a href="settings.html">帳號設定</a><button id="aic-logout">登出</button></div></div>` : `<a class="btn btn-ghost" href="login.html">登入</a><a class="btn btn-pri" href="login.html">免費註冊</a>`}
  </div>`;
  top.parentNode ? top.after(hdr) : document.body.prepend(hdr);

  const umBtn = $('.user-menu-btn', hdr);
  if (umBtn) {
    const drop = $('.user-menu-drop', hdr);
    umBtn.setAttribute('aria-expanded', 'false');
    umBtn.setAttribute('aria-haspopup', 'true');
    const toggleUM = (open) => { const isOpen = open ?? !drop.hidden; drop.hidden = !isOpen; umBtn.setAttribute('aria-expanded', String(isOpen)); };
    umBtn.onclick = () => toggleUM();
    document.addEventListener('click', e => { if (!e.target.closest('.user-menu-wrap')) toggleUM(false); });
    drop.addEventListener('keydown', e => { if (e.key === 'Escape') { toggleUM(false); umBtn.focus(); } });
    const logoutBtn = $('#aic-logout', hdr);
    if (logoutBtn) logoutBtn.onclick = () => { localStorage.removeItem('aic-user'); location.reload(); };
  }

  const prog = document.createElement('div'); prog.id = 'progress'; document.body.append(prog);

  if (!$('.nl-sec')) {
    const nl = document.createElement('section'); nl.className = 'nl-sec';
    nl.innerHTML = `<div class="wrap"><div class="nl-inner"><div class="nl-left"><h2>訂閱 AI Class 電子報</h2><p>每週精選課程推薦、學習技巧與獨家優惠，直送你的信箱</p></div><form class="nl-form" onsubmit="event.preventDefault();toast('感謝訂閱！示範網站不會寄送郵件','success');this.querySelector('input').value='';"><input type="email" placeholder="輸入 Email" required aria-label="Email 訂閱"><button class="btn btn-pri" type="submit">免費訂閱</button></form></div></div>`;
    document.body.append(nl);
  }
  const ft = document.createElement('footer');
  ft.innerHTML = `<div class="wrap"><div class="cols">
    <div class="ft-brand"><svg viewBox="0 0 168 40" fill="none" xmlns="http://www.w3.org/2000/svg" style="height:28px;width:auto;margin-bottom:14px"><defs><linearGradient id="flg" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse"><stop stop-color="#7C5CFF"/><stop offset="1" stop-color="#FF5C8A"/></linearGradient></defs><rect x="2" y="2" width="36" height="36" rx="11" fill="url(#flg)"/><path d="M11 29 L20 10 L29 29" stroke="#fff" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="20" cy="23" r="2.6" fill="#fff"/><text x="48" y="27" font-family="'Noto Sans TC',system-ui,sans-serif" font-size="20" font-weight="800" fill="var(--tx)" letter-spacing="-0.3">AI Class</text></svg><p>跟著業界職人，把熱情學成專業。<br>線上課程無限期觀看，隨時隨地開始學習。</p>
      <div class="ft-social"><a href="#" aria-label="Facebook">📘</a><a href="#" aria-label="Instagram">📷</a><a href="#" aria-label="YouTube">🎬</a><a href="#" aria-label="LINE">💬</a></div></div>
    <div class="ft-col"><h4 class="ft-col-hd">學習資源<i class="ft-arrow">›</i></h4><ul><li><a href="index.html">探索課程</a></li><li><a href="training.html">訓練營</a></li><li><a href="blog.html">學習專欄</a></li><li><a href="video.html">影片專區</a></li><li><a href="community.html">學習社群</a></li><li><a href="gallery.html">學員作品牆</a></li><li><a href="live.html">直播教室</a></li><li><a href="sale.html">限時特賣</a></li><li><a href="event.html">限時活動</a></li><li><a href="skillmap.html">技能地圖</a></li></ul></div>
    <div class="ft-col"><h4 class="ft-col-hd">幫助中心<i class="ft-arrow">›</i></h4><ul><li><a href="faq.html">常見問題</a></li><li><a href="terms.html">服務條款</a></li><li><a href="privacy.html">隱私權政策</a></li><li><a href="about.html">關於我們</a></li><li><a href="teach.html">成為講師</a></li><li><a href="enterprise.html">企業方案</a></li></ul></div>
    <div class="ft-col"><h4 class="ft-col-hd">下載 App<i class="ft-arrow">›</i></h4><ul><li><a href="#" onclick="event.preventDefault();toast('App 開發中，敬請期待')">📱 App Store（iOS）</a></li><li><a href="#" onclick="event.preventDefault();toast('App 開發中，敬請期待')">🤖 Google Play（Android）</a></li></ul>
      <div class="ft-lang"><select onchange="toast('語言切換功能開發中')" aria-label="語言選擇"><option>🌐 繁體中文</option><option>English</option><option>日本語</option></select></div></div>
  </div>
  <div class="ft-pay"><span>支援付款方式</span><span class="ft-pay-icon">💳 VISA</span><span class="ft-pay-icon">💳 Mastercard</span><span class="ft-pay-icon">💳 JCB</span><span class="ft-pay-icon">📱 LINE Pay</span><span class="ft-pay-icon">📱 街口支付</span></div>
  <div class="ft-bottom">
    <p>© ${new Date().getFullYear()} AI Class. All rights reserved. 影片素材來源：Mixkit（免費授權）</p>
  </div></div>`;
  document.body.append(ft);
  if (innerWidth <= 760) $$('.ft-col-hd', ft).forEach(h => { h.onclick = () => h.parentNode.classList.toggle('ft-open'); });

  const mn = document.createElement('nav'); mn.className = 'mnav';
  mn.innerHTML = `<a href="index.html" class="${page === 'home' ? 'on' : ''}"${page === 'home' ? ' aria-current="page"' : ''}><i>⌂</i>首頁</a><a href="#" data-search><i>⌕</i>搜尋</a><a href="category.html" class="${page === 'category' ? 'on' : ''}"${page === 'category' ? ' aria-current="page"' : ''}><i>☰</i>分類</a><a href="wishlist.html" class="${page === 'wishlist' ? 'on' : ''}"${page === 'wishlist' ? ' aria-current="page"' : ''}><i>♡</i>收藏</a><a href="my.html" class="${page === 'my' ? 'on' : ''}"${page === 'my' ? ' aria-current="page"' : ''}><i>☺</i>我的</a>`;
  document.body.append(mn);

  if (page === 'home' && !sessionStorage.getItem('aic-splash')) {
    sessionStorage.setItem('aic-splash', '1');
    const splash = document.createElement('div'); splash.className = 'splash';
    splash.innerHTML = `<div class="splash-inner"><svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="64" height="64"><defs><linearGradient id="slg" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse"><stop stop-color="#7C5CFF"/><stop offset="1" stop-color="#FF5C8A"/></linearGradient></defs><rect x="4" y="4" width="72" height="72" rx="22" fill="url(#slg)"/><path d="M22 58 L40 20 L58 58" stroke="#fff" stroke-width="6.8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="40" cy="46" r="5.2" fill="#fff"/></svg><div class="splash-bar"><div class="splash-fill"></div></div></div>`;
    document.body.append(splash);
    setTimeout(() => { splash.classList.add('out'); setTimeout(() => splash.remove(), 400); }, 600);
  }

  const toastBox = document.createElement('div'); toastBox.className = 'toast-stack'; toastBox.setAttribute('aria-live', 'polite'); document.body.append(toastBox);
  window.toast = (msg, type) => {
    const icons = { success: '✓', error: '✕', info: 'ℹ', warning: '⚠' };
    const el = document.createElement('div');
    el.className = 'toast-item' + (type ? ' toast-' + type : '');
    el.innerHTML = `${type && icons[type] ? `<span class="toast-icon">${icons[type]}</span>` : ''}<span class="toast-msg">${msg}</span><button class="toast-close" aria-label="關閉">×</button>`;
    toastBox.append(el);
    requestAnimationFrame(() => el.classList.add('on'));
    const dismiss = () => { el.classList.remove('on'); setTimeout(() => el.remove(), 350); };
    el.querySelector('.toast-close').onclick = dismiss;
    setTimeout(dismiss, 3000);
  };
  const wBtn = $('[data-wishlist]');
  if (wBtn) wBtn.onclick = e => { e.preventDefault(); toast(`已收藏 ${wish.size} 堂課程`); };

  // 通知面板
  const notifBtn = $('.notif-btn', hdr), notifPanel = $('.notif-panel', hdr);
  if (notifBtn) {
    notifBtn.setAttribute('aria-expanded', 'false');
    notifBtn.setAttribute('aria-controls', 'notif-panel-id');
    notifPanel.id = 'notif-panel-id';
    const toggleNotif = (open) => { const isOpen = open ?? !notifPanel.classList.contains('on'); notifPanel.classList.toggle('on', isOpen); notifBtn.setAttribute('aria-expanded', String(isOpen)); };
    notifBtn.onclick = () => toggleNotif();
    document.addEventListener('click', e => { if (!e.target.closest('.notif-wrap')) toggleNotif(false); });
    notifPanel.addEventListener('keydown', e => { if (e.key === 'Escape') { toggleNotif(false); notifBtn.focus(); } });
    const updateBadge = () => {
      const count = $$('.notif-item.unread', notifPanel).length;
      const badge = $('.notif-badge-count', notifBtn);
      if (badge) { if (count) { badge.textContent = count; } else { badge.remove(); } }
    };
    $$('.notif-item', notifPanel).forEach(el => {
      el.addEventListener('click', () => { el.classList.remove('unread'); updateBadge(); });
    });
    const readAllBtn = $('.notif-read-all', hdr);
    if (readAllBtn) readAllBtn.onclick = () => {
      $$('.notif-item.unread', notifPanel).forEach(el => { el.classList.remove('unread'); el.style.transition = 'background .3s'; });
      updateBadge();
      readAllBtn.textContent = '✓ 已完成';
      setTimeout(() => { readAllBtn.textContent = '全部已讀'; }, 1500);
      toast('已全部標為已讀');
    };
    $$('.notif-tab', notifPanel).forEach(tab => tab.onclick = () => {
      $$('.notif-tab', notifPanel).forEach(t => t.classList.toggle('on', t === tab));
      const f = tab.dataset.nf;
      const typeMap = { course: ['course'], system: ['system'], promo: ['promo', 'achievement', 'live', 'community'] };
      $$('.notif-item', notifPanel).forEach(el => {
        el.style.display = f === 'all' || (typeMap[f] || []).includes(el.dataset.ntype) ? '' : 'none';
      });
    });
  }

  // 深色模式切換
  const saved = localStorage.getItem('aic-theme');
  const dark = saved ? saved === 'dark' : matchMedia('(prefers-color-scheme:dark)').matches;
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  const tBtn = $('[data-theme-toggle]', hdr);
  function syncTheme() { tBtn.textContent = document.documentElement.getAttribute('data-theme') === 'dark' ? '☀️' : '🌙'; }
  syncTheme();
  tBtn.onclick = () => { const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'; document.documentElement.setAttribute('data-theme', next); ss('aic-theme', next); syncTheme(); };

  // 字體大小調整
  const sizes = ['normal', 'large', 'xlarge'];
  const sizeLabels = ['標準', '大', '特大'];
  let sizeIdx = sizes.indexOf(localStorage.getItem('aic-fontsize') || 'normal');
  if (sizeIdx < 0) sizeIdx = 0;
  document.documentElement.dataset.fontsize = sizes[sizeIdx];
  const fsBtn = document.createElement('button');
  fsBtn.className = 'font-size-btn';
  fsBtn.setAttribute('aria-label', '字體大小');
  fsBtn.textContent = 'A';
  fsBtn.title = '字體大小：' + sizeLabels[sizeIdx];
  fsBtn.onclick = () => { sizeIdx = (sizeIdx + 1) % sizes.length; document.documentElement.dataset.fontsize = sizes[sizeIdx]; ss('aic-fontsize', sizes[sizeIdx]); fsBtn.title = '字體大小：' + sizeLabels[sizeIdx]; toast('字體大小：' + sizeLabels[sizeIdx]); };
  tBtn.after(fsBtn);

  // 頁首：往下捲隱藏、往上捲出現
  let lastY = scrollY;
  addEventListener('scroll', rafThrottle(() => {
    const y = scrollY, h = document.documentElement.scrollHeight - innerHeight;
    prog.style.width = (h > 0 ? y / h * 100 : 0) + '%';
    hdr.classList.toggle('scrolled', y > 10);
    const hide = y > 300 && y > lastY;
    hdr.classList.toggle('hide', hide);
    document.body.classList.toggle('hdr-hidden', hide);
    lastY = y;
  }), { passive: true });

  searchOverlay();

  // 課程比較（舊版 fab 已移至底部新版 cmp-bar）

  // Mega menu: hover on desktop, click on mobile
  const megaBtn = $('.mega-btn', hdr), megaDrop = $('.mega-drop', hdr), megaWrap = $('.mega-wrap', hdr);
  if (megaBtn) {
    let hoverTimer;
    const openMenu = () => { megaDrop.hidden = false; megaBtn.setAttribute('aria-expanded', 'true'); megaDrop.style.top = hdr.getBoundingClientRect().bottom + 8 + 'px'; };
    const closeMenu = () => { megaDrop.hidden = true; megaBtn.setAttribute('aria-expanded', 'false'); };
    megaWrap.addEventListener('mouseenter', () => { clearTimeout(hoverTimer); if (innerWidth > 760) openMenu(); });
    megaWrap.addEventListener('mouseleave', () => { hoverTimer = setTimeout(closeMenu, 200); });
    megaBtn.onclick = () => { if (innerWidth <= 760) megaDrop.hidden ? openMenu() : closeMenu(); };
    document.addEventListener('click', e => { if (!megaDrop.hidden && !e.target.closest('.mega-wrap')) closeMenu(); });
    megaDrop.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
  }

  // Cookie 同意橫幅
  if (!localStorage.getItem('aic-cookie-ok')) {
    const ck = document.createElement('div'); ck.className = 'cookie-bar';
    ck.innerHTML = `<p>我們使用 Cookie 來提供更好的瀏覽體驗與個人化推薦。詳情請參閱 <a href="privacy.html">隱私權政策</a>。</p><div class="cookie-btns"><button class="btn btn-ghost cookie-decline">僅必要</button><button class="btn btn-pri cookie-ok">全部接受</button></div>`;
    document.body.append(ck);
    requestAnimationFrame(() => requestAnimationFrame(() => ck.classList.add('show')));
    const closeCk = (val) => { ss('aic-cookie-ok', val); ck.classList.remove('show'); setTimeout(() => ck.remove(), 400); };
    $('.cookie-ok', ck).onclick = () => closeCk('all');
    $('.cookie-decline', ck).onclick = () => closeCk('essential');
  }

  // 首次訪客歡迎導覽
  if (!localStorage.getItem('aic-toured') && page === 'home') {
    const steps = [
      { icon: '🎓', title: '歡迎來到 AI Class', text: `跟著業界頂尖職人，把你的熱情學成專業。${C.length} 堂精選課程，涵蓋設計、插畫、AI、攝影等 10 大領域。` },
      { icon: '🎬', title: '業界職人親自授課', text: '每堂課由業界講師精心製作，提供完整專案檔、練習素材與 PDF 講義，學完就能產出作品。' },
      { icon: '🚀', title: '開始你的學習之旅', text: '按 ⌘K 搜尋課程、按 ? 查看快捷鍵。首購享折扣碼 WELCOME — 現在就探索適合你的課程！' }
    ];
    let si = 0;
    const tov = document.createElement('div'); tov.className = 'tour-overlay';
    const render = () => { const s = steps[si]; tov.innerHTML = `<div class="tour-card"><button class="tour-skip">略過</button><div class="tour-icon">${s.icon}</div><h2>${s.title}</h2><p>${s.text}</p><div class="tour-dots">${steps.map((_,i) => `<div class="tour-dot ${i===si?'on':''}"></div>`).join('')}</div><button class="btn btn-pri tour-next" style="width:100%">${si < steps.length - 1 ? '下一步 →' : '開始探索 →'}</button></div>`; };
    render();
    document.body.append(tov);
    requestAnimationFrame(() => requestAnimationFrame(() => tov.classList.add('on')));
    const closeTour = () => { ss('aic-toured', '1'); tov.classList.remove('on'); setTimeout(() => tov.remove(), 300); };
    tov.addEventListener('click', e => {
      if (e.target.closest('.tour-skip')) { closeTour(); return; }
      if (e.target.closest('.tour-next')) { si++; if (si >= steps.length) closeTour(); else render(); }
      if (e.target === tov) closeTour();
    });
  }

  // 最近瀏覽浮動提示
  const rv = ls('aic-recent-view', []);
  if (rv.length && page !== 'course' && page !== 'player') {
    const last = byId[rv[0]];
    if (last) {
      const tip = document.createElement('div'); tip.className = 'recent-tip';
      tip.innerHTML = `<img src="${img(last)}" alt="${last.title}"><div><small>最近瀏覽</small><b>${last.title.length > 20 ? last.title.slice(0,20) + '…' : last.title}</b></div><a href="course.html?id=${last.id}" class="btn btn-pri btn-sm">繼續查看</a><button class="recent-tip-x">×</button>`;
      document.body.append(tip);
      setTimeout(() => tip.classList.add('show'), 2000);
      $('.recent-tip-x', tip).onclick = () => { tip.classList.remove('show'); setTimeout(() => tip.remove(), 400); };
      setTimeout(() => { if (tip.parentNode) { tip.classList.remove('show'); setTimeout(() => tip.remove(), 400); } }, 10000);
    }
  }

  // 社交證明通知
  if (page === 'home' || page === 'course' || page === 'category') {
    const names = ['小明','Emily','阿豪','小美','Jason','品涵','子軒','宜芳','Kevin','雅婷','志偉','思妤','Ryan','佳慧','冠宇','詩涵','Andy','怡君','柏翰','心怡'];
    const cities = ['台北','台中','高雄','新竹','台南','桃園','嘉義','花蓮'];
    const sp = document.createElement('div'); sp.className = 'social-proof';
    document.body.append(sp);
    let spIdx = 0;
    const showProof = () => {
      const rc = C[Math.floor(Math.random() * C.length)];
      const n = names[spIdx % names.length];
      const city = cities[Math.floor(Math.random() * cities.length)];
      const mins = Math.floor(Math.random() * 25) + 1;
      sp.innerHTML = `<img src="${img(rc)}" alt="${rc.title}"><div><b>${n}</b><small>${city}・${mins} 分鐘前購買</small><span>${rc.title.length > 18 ? rc.title.slice(0,18) + '…' : rc.title}</span></div>`;
      sp.classList.add('show');
      spIdx++;
      setTimeout(() => sp.classList.remove('show'), 4500);
    };
    setTimeout(showProof, 8000);
    setInterval(showProof, 18000);
  }

  // 圖片漸入
  document.addEventListener('load', e => { if (e.target.tagName === 'IMG' && e.target.loading === 'lazy') e.target.classList.add('loaded'); }, true);
  $$('img[loading="lazy"]').forEach(i => { if (i.complete) i.classList.add('loaded'); });
}

/* ---------- 搜尋 ---------- */
function searchOverlay() {
  const recentKey = 'aic-recent-search';
  const getRecent = () => ls(recentKey, []);
  const addRecent = q => { let r = getRecent().filter(x => x !== q); r.unshift(q); ss(recentKey, r.slice(0, 8)); renderRecent(); };

  const ov = document.createElement('div'); ov.className = 'overlay'; ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true'); ov.setAttribute('aria-label', '搜尋課程');
  const hasVoice = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
  ov.innerHTML = `<div class="sbox"><div class="sbox-input-row"><input placeholder="搜尋課程、講師…" aria-label="搜尋">${hasVoice ? '<button class="sbox-voice" aria-label="語音搜尋" title="語音搜尋">🎤</button>' : ''}</div><div class="hot">${['AI', 'Figma', '插畫', 'Blender', '攝影', '料理', 'Python', '健身', '剪輯', '文案', '音樂'].map(k => `<button>${k}</button>`).join('')}</div><div class="recent"></div><div class="sres"></div></div>`;
  document.body.append(ov);
  const inp = $('input', ov), res = $('.sres', ov), recentEl = $('.recent', ov);
  if (hasVoice) {
    const voiceBtn = $('.sbox-voice', ov);
    voiceBtn.onclick = () => {
      const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      const rec = new SR(); rec.lang = 'zh-TW'; rec.interimResults = false;
      voiceBtn.classList.add('listening'); voiceBtn.textContent = '🔴';
      rec.onresult = e => { inp.value = e.results[0][0].transcript; run(); };
      rec.onend = () => { voiceBtn.classList.remove('listening'); voiceBtn.textContent = '🎤'; };
      rec.onerror = () => { voiceBtn.classList.remove('listening'); voiceBtn.textContent = '🎤'; toast('語音辨識失敗，請再試一次', 'error'); };
      rec.start();
    };
  }

  function renderRecent() {
    const r = getRecent();
    recentEl.innerHTML = r.length ? `<h5>最近搜尋 <button class="clear-recent">全部清除</button></h5><div class="recent-list">${r.map(k => `<span class="recent-item"><span class="ri-text">${escH(k)}</span><button class="ri-del" aria-label="刪除">×</button></span>`).join('')}</div>` : '';
    const clrBtn = $('.clear-recent', ov);
    if (clrBtn) clrBtn.onclick = () => { localStorage.removeItem(recentKey); renderRecent(); };
    $$('.recent-item', ov).forEach(el => {
      const text = $('.ri-text', el).textContent;
      el.onclick = e => { if (!e.target.closest('.ri-del')) { inp.value = text; run(); } };
      const del = $('.ri-del', el);
      if (del) del.onclick = e => { e.stopPropagation(); let arr = getRecent().filter(x => x !== text); ss(recentKey, arr); renderRecent(); };
    });
  }

  let selIdx = -1;
  const run = () => {
    selIdx = -1;
    const q = inp.value.trim().toLowerCase();
    const list = q ? C.filter(c => (c.title + c.teacher + c.role + (c.sub || '')).toLowerCase().includes(q)) : [];
    const hl = (t) => { const esc = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); return t.replace(new RegExp(`(${esc})`, 'gi'), '<mark>$1</mark>'); };
    res.innerHTML = !q ? '' : list.length ? `<div class="sres-count">找到 ${list.length} 筆結果</div>` + list.slice(0, 8).map((c, i) => { const catName = (window.CATS.find(x => x.id === c.cat) || {}).name || c.cat; return `<a href="course.html?id=${c.id}" class="sres-item" data-si="${i}"><img src="${img(c)}" alt="${c.title}" loading="lazy"><div><b>${hl(c.title)}</b><div class="sres-info"><span class="sres-star">★ ${c.rating}</span><span>${hl(c.teacher)}・${fmt(c.price)}</span></div><span class="sres-cat">${catName}</span>${c.sub ? `<span class="sres-cat" style="margin-left:4px">${c.sub}</span>` : ''}</div></a>`; }).join('') + `<a class="sres-all" href="search.html?q=${encodeURIComponent(inp.value.trim())}">查看全部 ${list.length} 筆結果 →</a>` : `<div class="empty">找不到「${escH(inp.value)}」相關課程</div>`;
  };
  const updSel = () => { $$('.sres-item', res).forEach((a, i) => a.classList.toggle('sres-active', i === selIdx)); };
  inp.oninput = run;
  inp.addEventListener('keydown', e => {
    const items = $$('.sres-item', res);
    if (e.key === 'ArrowDown' && items.length) { e.preventDefault(); selIdx = Math.min(selIdx + 1, items.length - 1); updSel(); }
    else if (e.key === 'ArrowUp' && items.length) { e.preventDefault(); selIdx = Math.max(selIdx - 1, -1); updSel(); }
    else if (e.key === 'Enter') { if (selIdx >= 0 && items[selIdx]) { addRecent(inp.value.trim()); location.href = items[selIdx].href; } else if (inp.value.trim()) { addRecent(inp.value.trim()); location.href = 'search.html?q=' + encodeURIComponent(inp.value.trim()); } }
  });
  $$('.hot button', ov).forEach(b => b.onclick = () => { inp.value = b.textContent; addRecent(b.textContent); run(); });
  let triggerEl = null;
  const open = e => { e.preventDefault(); triggerEl = document.activeElement; ov.classList.add('on'); renderRecent(); setTimeout(() => inp.focus(), 50); };
  const close = () => { ov.classList.remove('on'); if (triggerEl) { triggerEl.focus(); triggerEl = null; } };
  $$('[data-search]').forEach(b => b.onclick = open);
  ov.onclick = e => { if (e.target === ov) close(); };
  trapFocus(ov);
  addEventListener('keydown', e => {
    if (e.key === 'Escape' && ov.classList.contains('on')) { close(); return; }
    if ((e.key === 'k' && (e.ctrlKey || e.metaKey)) || (e.key === '/' && !e.shiftKey && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA')) { e.preventDefault(); open(e); }
  });
}

/* ---------- 快捷鍵 ---------- */
(function shortcuts() {
  const keys = [
    ['⌘K / /', '開啟搜尋'],
    ['Escape', '關閉搜尋 / 彈窗'],
    ['?', '顯示快捷鍵'],
    ['H', '回首頁'],
    ['C', '前往購物車'],
    ['M', '前往我的學習'],
    ['D', '切換深色/淺色模式'],
  ];
  const el = document.createElement('div'); el.className = 'kb-overlay'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); el.setAttribute('aria-label', '鍵盤快捷鍵');
  el.innerHTML = `<div class="kb-box"><h3>鍵盤快捷鍵</h3><div class="kb-list">${keys.map(([k, d]) => `<div class="kb-row"><kbd>${k}</kbd><span>${d}</span></div>`).join('')}</div><button class="btn btn-ghost kb-close">關閉</button></div>`;
  document.body.append(el);
  trapFocus(el);
  el.querySelector('.kb-close').onclick = () => el.classList.remove('on');
  el.onclick = e => { if (e.target === el) el.classList.remove('on'); };
  addEventListener('keydown', e => {
    if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;
    const isPlayer = !!document.querySelector('.plr-shortcuts-overlay');
    if (isPlayer) return;
    if (e.key === '?') { e.preventDefault(); e.stopImmediatePropagation(); el.classList.toggle('on'); }
    else if (e.key === 'Escape' && el.classList.contains('on')) el.classList.remove('on');
    else if (e.key.toLowerCase() === 'h' && !e.ctrlKey && !e.metaKey && !document.querySelector('.overlay.on')) location.href = 'index.html';
    else if (e.key.toLowerCase() === 'c' && !e.ctrlKey && !e.metaKey && !document.querySelector('.overlay.on')) location.href = 'cart.html';
    else if (e.key.toLowerCase() === 'm' && !e.ctrlKey && !e.metaKey && !document.querySelector('.overlay.on')) location.href = 'my.html';
    else if (e.key.toLowerCase() === 'd' && !e.ctrlKey && !e.metaKey && !document.querySelector('.overlay.on')) { const t = document.querySelector('.theme-toggle'); if (t) t.click(); }
  });
})();

/* ---------- 卡片 ---------- */
function getTotalLessons(c) {
  const ch = window.CHAPTERS && window.CHAPTERS[c.id];
  if (ch) return ch.reduce((s, x) => s + x.lessons.length, 0);
  const n = c.hours >= 20 ? 6 : 5;
  return Math.max(n * 4, Math.round(c.hours * 60 / 12));
}

function cardHighlights(c) {
  const hl = [];
  const total = getTotalLessons(c);
  const chCnt = window.CHAPTERS && window.CHAPTERS[c.id] ? window.CHAPTERS[c.id].length : (c.hours >= 20 ? 6 : 5);
  hl.push(`${chCnt} 章・${total} 堂・${c.hours} 小時`);
  if (c.rating >= 4.8) hl.push(`★ ${c.rating} 超高評分好課`);
  else hl.push(`★ ${c.rating} 好評推薦`);
  if (c.students > 5000) hl.push(`${(c.students/1000).toFixed(1)}K 學員已加入`);
  else hl.push('附講師原始專案檔');
  return hl;
}

function courseLevel(c) {
  const adv = /進階|實戰|專業|深入|高階|SaaS|React|RAG|Houdini|Nuke|CG|VFX/.test(c.title + (c.desc || ''));
  const beg = /入門|基礎|零基礎|初學|第一/.test(c.title + (c.desc || ''));
  if (beg) return { label: '入門', cls: 'lvl-beg', weeks: Math.ceil(c.hours / 5) };
  if (adv || c.hours >= 24) return { label: '進階', cls: 'lvl-adv', weeks: Math.ceil(c.hours / 3) };
  return { label: '中階', cls: 'lvl-mid', weeks: Math.ceil(c.hours / 4) };
}

function card(c, i, rank) {
  const hl = cardHighlights(c);
  const lv = courseLevel(c);
  const isOwned = owned.has(c.id);
  const prog = progress[c.id];
  const totalL = getTotalLessons(c);
  const pctDone = prog && totalL > 0 ? Math.min(100, Math.round(prog.done.length / totalL * 100)) : 0;
  return `<a class="card rv-up ${isOwned ? 'card-owned' : ''}" href="${isOwned ? 'player.html' : 'course.html'}?id=${c.id}" data-v="${vid(c)}" style="transition-delay:${(i % 5) * 70}ms">
    <div class="tw">${rank ? `<span class="num">${i + 1}</span>` : ''}<div class="thumb">
      ${isOwned ? '<span class="badge owned-badge">已購買</span>' : c.tag ? `<span class="badge ${c.tag}">${c.tag}</span>` : ''}
      <button class="wish ${wish.has(c.id) ? 'on' : ''}" data-wish="${c.id}" aria-label="收藏">${wish.has(c.id) ? '♥' : '♡'}</button>
      <img src="${img(c)}" alt="${c.title}" loading="lazy" decoding="async">
      <span class="hours">${c.hours} 小時</span>
    </div></div>
    <div class="meta">
      <div class="card-tags"><span class="card-lvl ${lv.cls}">${lv.label}</span><span class="card-eta">約 ${lv.weeks} 週完成</span></div>
      <div class="teacher">${c.teacher}</div>
      <h3>${c.title}</h3>
      ${isOwned ? `<div class="card-prog-row"><div class="card-prog-bar"><div class="card-prog-fill" style="width:${pctDone}%"></div></div><span class="card-prog-txt">${pctDone}% 完成</span></div>` : `<div class="price"><span class="off">${pct(c)}%</span><span class="now">${fmt(c.price)}</span><del>${fmt(c.origin)}</del></div>`}
      <div class="stars"><b>★ ${c.rating.toFixed(1)}</b>・${c.students.toLocaleString()} 位學員</div>
      ${c.ai ? '<div class="ai-summary"><span class="ai-tag">✦ AI 摘要</span>' + c.ai + '</div>' : ''}
    </div>
    <div class="card-hover"><h4>${c.title}</h4><ul>${hl.map(h => `<li>${h}</li>`).join('')}</ul><div class="card-hover-btns">${isOwned ? `<button class="ch-cart" style="background:var(--pri)">繼續學習 →</button>` : `<button class="ch-cart" data-addcart="${c.id}">加入購物車</button><button class="ch-wish" data-addwish="${c.id}">♡ 收藏</button>`}<button class="ch-cmp" data-addcmp="${c.id}">⚖ 比較</button><button class="ch-qp" data-qp="${c.id}">👁 預覽</button></div></div>
  </a>`;
}

// 滑鼠移入播放預覽影片 + 預先建立 video 元素
const _vidPrefetchIO = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  _vidPrefetchIO.unobserve(e.target);
  const el = e.target;
  if (el._v || !el.dataset.v) return;
  const v = document.createElement('video'); v.src = el.dataset.v; v.muted = v.loop = v.playsInline = true; v.preload = 'none';
  $('.thumb', el).insertBefore(v, $('.hours', el));
  el._v = v;
}), { rootMargin: '200px 0px' });

function bindCards(root = document) {
  $$('.card', root).forEach(el => {
    if (el.bound) return; el.bound = 1;
    _vidPrefetchIO.observe(el);
    let t;
    el.addEventListener('mouseenter', () => {
      t = setTimeout(() => {
        let v = el._v;
        if (!v) { v = document.createElement('video'); v.src = el.dataset.v; v.muted = v.loop = v.playsInline = true; v.preload = 'auto'; $('.thumb', el).insertBefore(v, $('.hours', el)); el._v = v; }
        v.preload = 'auto';
        v.currentTime = 0; v.play().then(() => el.classList.add('play')).catch(() => {});
      }, 260);
    });
    el.addEventListener('mouseleave', () => { clearTimeout(t); el.classList.remove('play'); el._v && el._v.pause(); });
  });
  $$('[data-wish]', root).forEach(b => b.onclick = e => {
    e.preventDefault(); e.stopPropagation();
    const id = b.dataset.wish, on = !wish.has(id);
    on ? wish.add(id) : wish.delete(id);
    ss('aic-wish', [...wish]);
    $$(`[data-wish="${id}"]`).forEach(x => { x.classList.toggle('on', on); x.textContent = on ? '♥' : '♡'; });
    toast(on ? '已加入收藏 ♥' : '已取消收藏');
    window.trackEvent(on ? 'add_to_wishlist' : 'remove_from_wishlist', { item_id: id });
  });
  $$('[data-addcart]', root).forEach(b => b.onclick = e => {
    e.preventDefault(); e.stopPropagation();
    const cid = b.dataset.addcart; cart.add(cid); saveCart(); updateCartBadge(); toast('已加入購物車');
    b.textContent = '✓ 已加入'; b.style.background = 'var(--pri)'; b.style.color = '#fff'; b.style.pointerEvents = 'none';
    const thumb = b.closest('.card')?.querySelector('.thumb img');
    const cartEl = $('.cart-btn') || $('.cart-badge');
    if (thumb && cartEl && !prefersReduced) {
      const sr = thumb.getBoundingClientRect(), dr = cartEl.getBoundingClientRect();
      const fly = document.createElement('img'); fly.src = thumb.src; fly.className = 'fly-cart';
      fly.style.left = sr.left + 'px'; fly.style.top = sr.top + 'px'; fly.style.width = sr.width + 'px'; fly.style.height = sr.height + 'px';
      document.body.append(fly);
      requestAnimationFrame(() => { fly.style.left = dr.left + 'px'; fly.style.top = dr.top + 'px'; fly.classList.add('fly'); });
      fly.addEventListener('transitionend', () => fly.remove());
    }
    window.trackEvent('add_to_cart', { item_id: cid });
  });
  $$('[data-addwish]', root).forEach(b => b.onclick = e => {
    e.preventDefault(); e.stopPropagation();
    const id = b.dataset.addwish; wish.add(id);
    ss('aic-wish', [...wish]);
    $$(`[data-wish="${id}"]`).forEach(x => { x.classList.add('on'); x.textContent = '♥'; });
    toast('已加入收藏 ♥');
  });
  $$('[data-addcmp]', root).forEach(b => b.onclick = e => {
    e.preventDefault(); e.stopPropagation();
    if (window.addCompare) window.addCompare(b.dataset.addcmp);
  });
  $$('[data-qp]', root).forEach(b => b.onclick = e => {
    e.preventDefault(); e.stopPropagation();
    quickPreview(b.dataset.qp);
  });
  $$('img[loading="lazy"]', root).forEach(im => {
    const markReady = () => { im.classList.add('loaded'); const th = im.closest('.thumb'); if (th) th.classList.add('img-ready'); };
    if (im.complete) markReady(); else im.onload = markReady;
  });
  reveal(root);
}

// 軌道：按鈕＋拖曳
function bindRail(sec) {
  const rail = $('.rail', sec), [prev, next] = $$('.more .circle', sec);
  const upd = () => { if (!prev) return; prev.disabled = rail.scrollLeft < 5; next.disabled = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 5; };
  const step = () => rail.clientWidth * .9;
  prev && (prev.onclick = () => rail.scrollBy({ left: -step() }));
  next && (next.onclick = () => rail.scrollBy({ left: step() }));
  rail.addEventListener('scroll', upd, { passive: true }); upd();
  rail.setAttribute('role', 'region');
  rail.setAttribute('tabindex', '0');
  rail.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { e.preventDefault(); rail.scrollBy({ left: 320, behavior: 'smooth' }); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); rail.scrollBy({ left: -320, behavior: 'smooth' }); }
  });
  let down = false, sx, sl, moved;
  rail.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') return; down = true; moved = false; sx = e.clientX; sl = rail.scrollLeft; });
  addEventListener('pointermove', e => { if (!down) return; const d = e.clientX - sx; if (Math.abs(d) > 6) { moved = true; rail.classList.add('drag'); } rail.scrollLeft = sl - d; });
  addEventListener('pointerup', () => { if (!down) return; down = false; setTimeout(() => rail.classList.remove('drag'), 0); });
  rail.addEventListener('click', e => { if (moved) { e.preventDefault(); moved = false; } }, true);
}

function railSec(id, title, sub, list, rank) {
  return `<section class="sec" id="${id}"><div class="wrap">
    <div class="sec-head rv-up"><div><h2>${title}</h2>${sub ? `<div class="sub">${sub}</div>` : ''}</div>
    <div class="more"><button class="circle" aria-label="上一頁">←</button><button class="circle" aria-label="下一頁">→</button></div></div>
    <div class="rail ${rank ? 'rank' : ''}">${list.map((c, i) => card(c, i, rank)).join('')}</div></div></section>`;
}

/* ---------- 進場動畫（stagger） ---------- */
const io = new IntersectionObserver(es => {
  const byParent = new Map();
  es.forEach(e => { if (!e.isIntersecting) return; const p = e.target.parentElement; if (!byParent.has(p)) byParent.set(p, []); byParent.get(p).push(e.target); });
  byParent.forEach(els => {
    els.forEach((el, i) => { el.style.transitionDelay = (i * 60) + 'ms'; el.classList.add('in'); io.unobserve(el); });
  });
}, { threshold: .12, rootMargin: '0px 0px -40px' });
function reveal(root = document) { $$('.rv-up:not(.in)', root).forEach(el => io.observe(el)); }

/* ---------- 倒數 ---------- */
function tickCountdown() {
  const left = Math.max(0, deadline - Date.now());
  const h = Math.floor(left / 36e5), m = Math.floor(left / 6e4) % 60, s = Math.floor(left / 1e3) % 60;
  const p = n => String(n).padStart(2, '0');
  $$('[data-cd-inline]').forEach(el => el.textContent = `${p(h)}:${p(m)}:${p(s)}`);
  $$('[data-cd]').forEach(el => { $('[data-h]', el).textContent = p(h); $('[data-m]', el).textContent = p(m); $('[data-s]', el).textContent = p(s); });
}
const cdHTML = `<div class="cd" data-cd><div><b data-h>00</b><small>時</small></div><div><b data-m>00</b><small>分</small></div><div><b data-s>00</b><small>秒</small></div></div>`;

/* ---------- 首頁 ---------- */
function home() {
  const main = $('main');
  main.innerHTML = '';
  seo({ title: 'AI Class｜跟著業界職人，把熱情學成專業', desc: '精選線上課程平台，涵蓋設計、程式、AI、攝影、音樂等領域，由業界職人親授。無限期觀看、隨時隨地學習，把熱情學成專業。', url: 'https://aiclass.tw/', ogType: 'website', jsonLd: { '@context': 'https://schema.org', '@type': 'ItemList', name: '精選線上課程', itemListElement: C.slice(0, 12).map((c, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'Course', name: c.title, url: `https://aiclass.tw/course.html?id=${c.id}`, description: c.desc || '', provider: { '@type': 'Organization', name: 'AI Class' } } })) } });
  // Hero
  const slides = window.HERO.map(id => byId[id]);
  main.insertAdjacentHTML('beforeend', `<section class="hero" aria-label="精選課程" aria-roledescription="carousel">
    ${slides.map((c, i) => { const [e, h, p] = window.HERO_COPY[c.id]; return `<div class="slide ${i ? '' : 'on'}">
      <img class="poster" src="${img(c)}" alt="${c.title}"${i ? ' loading="lazy"' : ' fetchpriority="high"'}>
      <video ${i ? 'preload="none"' : 'autoplay preload="auto"'} muted loop playsinline poster="${img(c)}" data-src="${vid(c)}" aria-hidden="true"></video>
      <div class="txt"><div class="wrap"><span class="eyebrow">${e}</span><h1>${h}</h1><p>${p}</p>
      <div class="cta"><a class="btn btn-pri" href="course.html?id=${c.id}">${owned.has(c.id) ? '繼續學習 →' : cart.has(c.id) ? '前往結帳 →' : '立即了解 →'}</a> <a class="btn btn-ghost" href="${owned.has(c.id) ? `player.html?id=${c.id}` : `course.html?id=${c.id}#preview`}" style="margin-left:8px">${owned.has(c.id) ? '🎬 進入播放器' : '▶ 試看'}</a></div></div></div></div>`; }).join('')}
    <div class="hero-ctrl"><div class="wrap">${slides.map((c, i) => `<button class="dot ${i ? '' : 'on'}"><div class="bar"><i></i></div><span>${c.title}</span></button>`).join('')}
      <div class="hero-arrows"><button class="circle" data-hp aria-label="上一張">←</button><button class="circle" data-hpause aria-label="暫停">❚❚</button><button class="circle" data-hn aria-label="下一張">→</button></div></div></div>
  </section>`);

  // Hero 打字動畫
  {
    const typePhrases = ['設計', '程式開發', 'AI 應用', '插畫繪圖', '影片剪輯', '烘焙料理', '攝影後製', '遊戲開發', '品牌行銷', '理財投資'];
    main.insertAdjacentHTML('beforeend', `<div class="hero-typed-bar"><div class="wrap"><span class="hero-typed-pre">在 AI Class 學</span><span class="hero-typed-word" id="heroTyped"></span><span class="hero-typed-cursor">|</span><span class="hero-typed-suf">，開啟你的職涯新篇章</span></div></div>`);
    const el = $('#heroTyped');
    if (el) {
      let pi = 0, ci = 0, deleting = false;
      if (prefersReduced) {
        el.textContent = typePhrases[0];
      } else {
        const tick = () => {
          const word = typePhrases[pi];
          if (!deleting) {
            el.textContent = word.slice(0, ci + 1);
            ci++;
            if (ci >= word.length) { deleting = true; setTimeout(tick, 2000); return; }
            setTimeout(tick, 100 + Math.random() * 60);
          } else {
            ci--;
            el.textContent = word.slice(0, ci);
            if (ci <= 0) { deleting = false; pi = (pi + 1) % typePhrases.length; setTimeout(tick, 400); return; }
            setTimeout(tick, 50);
          }
        };
        setTimeout(tick, 800);
      }
    }
  }

  // 平台統計
  {
    const totalStudents = C.reduce((s,c)=>s+c.students,0);
    const teacherCount = new Set(C.map(c=>c.teacher)).size;
    const totalHrs = C.reduce((s,c)=>s+c.hours,0);
    main.insertAdjacentHTML('beforeend', `<div class="hero-stats rv-up"><div class="wrap"><div class="hs-grid">
      <div class="hs-item"><b data-count="${C.length}">${C.length}</b><span>門課程</span></div>
      <div class="hs-item"><b data-count="${totalStudents}">${totalStudents.toLocaleString()}</b><span>位學員</span></div>
      <div class="hs-item"><b data-count="${teacherCount}">${teacherCount}</b><span>位講師</span></div>
      <div class="hs-item"><b data-count="${totalHrs}">${totalHrs.toLocaleString()}</b><span>小時內容</span></div>
    </div></div></div>`);
  }

  // Welcome back (returning user)
  const hasHistory = ls('aic-recent-view', []).length > 0 || owned.size > 0;
  if (hasHistory && !sessionStorage.getItem('aic-wb')) {
    sessionStorage.setItem('aic-wb', '1');
    const ownedArr = [...owned].map(id => byId[id]).filter(Boolean);
    const inProg = ownedArr.filter(c => { const p = progress[c.id]; return p && p.done.length > 0 && p.done.length < getTotalLessons(c); });
    const cont = inProg[0];
    main.insertAdjacentHTML('beforeend', `<div class="wrap"><div class="wb-banner rv-up"><div class="wb-left"><h2>歡迎回來 👋</h2><p>${cont ? `繼續學習「${cont.title.slice(0,16)}${cont.title.length>16?'…':''}」吧！` : '今天想學什麼呢？'}</p></div><div class="wb-right">${cont ? `<a class="btn btn-pri btn-sm" href="player.html?id=${cont.id}">繼續上課 →</a>` : `<a class="btn btn-pri btn-sm" href="category.html">探索課程 →</a>`}</div></div></div>`);
  }

  // 學習連續橫幅
  if (streakData.count > 1) {
    const msgs = streakData.count >= 30 ? '太強了！你是學習達人 💪' : streakData.count >= 14 ? '太棒了！持續保持 🚀' : streakData.count >= 7 ? '學習習慣已養成！' : '保持下去！';
    main.insertAdjacentHTML('beforeend', `<div class="wrap"><div class="streak-banner rv-up"><span class="streak-fire">🔥</span><span class="streak-text">你已經連續學習 <b>${streakData.count}</b> 天！${msgs}</span><a href="my.html" class="streak-link">查看學習紀錄 →</a></div></div>`);
  }

  // 最近瀏覽（放在「為你推薦」上方）
  const recentIds = ls('aic-recent-view', []);
  if (recentIds.length > 0) {
    const recentCourses = recentIds.map(id => byId[id]).filter(Boolean).slice(0, 6);
    if (recentCourses.length) {
      main.insertAdjacentHTML('beforeend', `<section class="sec" id="recent"><div class="wrap"><div class="sec-head rv-up"><div><h2>最近瀏覽</h2><div class="sub">繼續你的學習之旅</div></div></div>
        <div class="rail">${recentCourses.map((c, i) => card(c, i)).join('')}</div></div></section>`);
    }
  }

  // 分類
  main.insertAdjacentHTML('beforeend', `<div class="wrap" id="cat-all"><div class="chips">${window.CATS.map((c, i) => `<button class="chip ${i ? '' : 'on'}" data-cat="${c.id}">${c.name}</button>`).join('')}</div></div>`);
  // 排序按鈕
  main.insertAdjacentHTML('beforeend', `<div class="wrap"><div class="sort-bar"><button class="sort-btn on" data-sort="default">推薦</button><button class="sort-btn" data-sort="new">最新上架</button><button class="sort-btn" data-sort="students">最多學員</button><button class="sort-btn" data-sort="price">價格低到高</button></div></div>`);
  // 個人化排序：優先顯示最近瀏覽過的分類課程
  const personalizedC = (() => {
    const rv = ls('aic-recent-view', []);
    if (!rv.length) return C;
    const catFreq = {};
    rv.forEach(id => { const cc = byId[id]; if (cc) catFreq[cc.cat] = (catFreq[cc.cat] || 0) + 1; });
    return [...C].sort((a, b) => (catFreq[b.cat] || 0) - (catFreq[a.cat] || 0) || b.rating - a.rating);
  })();
  main.insertAdjacentHTML('beforeend', railSec('filtered', '為你推薦', recentIds.length ? '根據你的瀏覽紀錄推薦' : '依照你選的分類即時篩選', personalizedC));

  // 個人化推薦輪播
  if (recentIds.length >= 2) {
    const viewedCats = [...new Set(recentIds.map(id => byId[id]?.cat).filter(Boolean))];
    const recCourses = C.filter(cc => viewedCats.includes(cc.cat) && !recentIds.includes(cc.id)).sort((a,b) => b.rating - a.rating).slice(0, 10);
    if (recCourses.length >= 3) {
      main.insertAdjacentHTML('beforeend', `<section class="sec"><div class="wrap"><div class="sec-head rv-up"><div><h2>根據你的興趣推薦</h2><div class="sub">與你瀏覽過的課程相關</div></div></div>
        <div class="rec-carousel rv-up" id="rec-carousel"><div class="rec-track" id="rec-track">${recCourses.map(cc => `<a class="rec-card" href="course.html?id=${cc.id}"><img src="${img(cc)}" alt="${cc.title}" loading="lazy" decoding="async"><div class="rec-card-body"><h4>${cc.title.length > 22 ? cc.title.slice(0,22)+'…' : cc.title}</h4><div class="rec-card-meta">★ ${cc.rating} ・ ${cc.teacher}</div><div class="rec-card-price">${fmt(cc.price)} <del style="font-size:13px;color:var(--tx3);font-weight:400">${fmt(cc.origin)}</del></div></div></a>`).join('')}</div><button class="rec-nav prev" id="rec-prev" aria-label="上一組">‹</button><button class="rec-nav next" id="rec-next" aria-label="下一組">›</button></div></div></section>`);
      const track = $('#rec-track'), prevBtn = $('#rec-prev'), nextBtn = $('#rec-next');
      let recOffset = 0; const cardW = 300;
      const maxOffset = Math.max(0, recCourses.length * cardW - track.parentElement.offsetWidth);
      prevBtn.onclick = () => { recOffset = Math.max(0, recOffset - cardW * 2); track.style.transform = `translateX(-${recOffset}px)`; };
      nextBtn.onclick = () => { recOffset = Math.min(maxOffset, recOffset + cardW * 2); track.style.transform = `translateX(-${recOffset}px)`; };
    }
  }

  // 為什麼選擇 AI Class
  main.insertAdjacentHTML('beforeend', `<section class="usp-section" id="why"><div class="wrap">
    <h2 class="usp-title rv-up">為什麼超過 60,000 人選擇 AI Class</h2>
    <p class="usp-sub rv-up">我們打造最好的線上學習體驗</p>
    <div class="usp-grid">
      ${[
        { icon: '🎬', title: '業界講師親授', desc: '每堂課都由業界頂尖講師精心製作，把第一線實戰經驗毫無保留地分享給你。' },
        { icon: '📚', title: '系統化課程設計', desc: '從入門到進階，循序漸進的學習路徑，讓你不再東學西湊、走冤枉路。' },
        { icon: '💬', title: '講師親自回覆', desc: '學習遇到問題直接提問，講師親自回覆，不怕卡關沒人幫。' },
        { icon: '🔄', title: '免費終身更新', desc: '一次購買永久觀看，課程持續更新不加價，永遠學到最新內容。' },
        { icon: '🏆', title: '結業證書', desc: '完成課程後獲得 AI Class 認證證書，為你的履歷和作品集加分。' },
        { icon: '🛡️', title: '七天退費保證', desc: '購買後七天內不滿意全額退費，讓你安心學習零風險。' }
      ].map((u, i) => `<div class="usp-card rv-up" style="transition-delay:${(i % 3) * 80}ms">
        <div class="usp-icon">${u.icon}</div>
        <h3>${u.title}</h3>
        <p>${u.desc}</p>
      </div>`).join('')}
    </div>
  </div></section>`);

  // 平台數據
  if (window.PLATFORM_STATS) {
    const ps = window.PLATFORM_STATS;
    main.insertAdjacentHTML('beforeend', `<section class="stats-section"><div class="wrap">
      <div class="stats-grid">
        <div class="stat-item rv-up"><div class="stat-num" data-count="${ps.courses}" data-unit="">0</div><div class="stat-label">精選課程</div></div>
        <div class="stat-item rv-up"><div class="stat-num" data-count="${ps.students}" data-unit="+">0</div><div class="stat-label">累計學員</div></div>
        <div class="stat-item rv-up"><div class="stat-num" data-count="${ps.instructors}" data-unit="">0</div><div class="stat-label">業界講師</div></div>
        <div class="stat-item rv-up"><div class="stat-num" data-count="${ps.completionRate}" data-unit="%">0</div><div class="stat-label">完課率</div></div>
      </div>
      <div class="live-counter rv-up"><span class="live-counter-dot">●</span> 已有 <span class="live-counter-num" id="liveStudentCount">0</span> 位學員加入學習</div>
    </div></section>`);
    const lscEl = $('#liveStudentCount');
    if (lscEl) {
      let lsc = ps.students - 153;
      lscEl.textContent = lsc.toLocaleString('en-US');
      const lscTick = () => { lsc += Math.floor(Math.random() * 3) + 1; lscEl.textContent = lsc.toLocaleString('en-US'); };
      setInterval(lscTick, 3000 + Math.random() * 4000);
    }
  }

  // 訓練營
  if (window.BOOTCAMPS) {
    main.insertAdjacentHTML('beforeend', `<section class="sec" id="bootcamp"><div class="wrap"><div class="sec-head rv-up"><div><h2>訓練營</h2><div class="sub">免費報名，就業導向密集訓練</div></div></div>
      <div class="bootcamps">${window.BOOTCAMPS.map(b => `<div class="bootcamp rv-up"><span class="bc-badge">${b.badge}</span><span class="bc-tag">${b.tag}</span><h3>${b.name}</h3><p class="bc-desc">${b.desc}</p><div class="bc-meta"><span>📚 ${b.courses.length} 堂課程</span></div><div class="bc-price"><span class="free">NT$0</span><del>NT$${b.original.toLocaleString()}</del></div><button class="bc-enroll" onclick="toast('示範網站：報名功能開發中')">立即報名 →</button></div>`).join('')}</div></div></section>`);
  }

  // 限時免費體驗
  if (window.FREE_COURSES && window.FREE_COURSES.length) {
    const freeCourses = window.FREE_COURSES.map(fc => ({ ...byId[fc.id], reason: fc.reason, endsIn: fc.endsIn })).filter(c => c.id);
    if (freeCourses.length) {
      main.insertAdjacentHTML('beforeend', `<section class="sec free-sec" id="free"><div class="wrap"><div class="sec-head rv-up"><div><h2>🎁 限時免費體驗</h2><div class="sub">精選課程免費開放，把握機會</div></div></div>
        <div class="free-grid">${freeCourses.map(c => `<a class="free-card rv-up" href="course.html?id=${c.id}">
          <div class="free-card-img"><img src="${img(c)}" alt="${c.title}" loading="lazy" decoding="async"><span class="free-badge">FREE</span><span class="free-timer">${c.endsIn}</span></div>
          <div class="free-card-body"><span class="free-reason">${c.reason}</span><h3>${c.title}</h3><div class="free-card-meta"><span>${c.teacher}</span><span>★ ${c.rating}</span><span>${c.hours} 小時</span></div>
          <div class="free-card-price"><span class="free-now">NT$0</span><del>${fmt(c.origin)}</del></div></div>
        </a>`).join('')}</div></div></section>`);
    }
  }

  const sortBy = (k) => [...C].sort((a, b) => b[k] - a[k]);
  // TOP 10 + 時段切換
  main.insertAdjacentHTML('beforeend', `<section class="sec" id="top10"><div class="wrap">
    <div class="sec-head rv-up"><div><h2>TOP 10 排行</h2><div class="sub">學員最多人選的課程</div></div>
    <div class="time-tabs"><button class="time-tab on" data-period="realtime">即時排行</button><button class="time-tab" data-period="weekly">本週排行</button><button class="time-tab" data-period="monthly">本月排行</button></div>
    <div class="more"><button class="circle" aria-label="上一頁">←</button><button class="circle" aria-label="下一頁">→</button></div></div>
    <div class="rail rank">${sortBy('students').slice(0, 10).map((c, i) => card(c, i, true)).join('')}</div></div></section>`);

  const mqWords = window.CATS.slice(1).map(c => c.name.split('/')[0]).concat(['創作','職人','學習','作品集']);
  main.insertAdjacentHTML('beforeend', `<div class="marquee"><div class="track">${Array(2).fill(mqWords.map(w => `<span>${w}</span>`).join('')).join('')}</div></div>`);

  // 本月精選
  if (window.EDITORS_PICKS) {
    main.insertAdjacentHTML('beforeend', `<section class="sec" id="picks"><div class="wrap"><div class="sec-head rv-up"><div><h2>本月精選</h2><div class="sub">編輯嚴選，不容錯過的好課</div></div></div>
      <div class="picks-grid">${window.EDITORS_PICKS.map(ep => { const c = byId[ep.id]; if (!c) return ''; return `<a class="pick-card rv-up" href="course.html?id=${c.id}" style="--pimg:url(assets/img/v${c.v}.jpg)">
        <div class="pick-overlay"></div>
        <div class="pick-body"><span class="pick-badge">編輯精選</span><h3>${c.title}</h3><p class="pick-quote">「${ep.quote}」</p>
        <div class="pick-meta"><span>★ ${c.rating}</span><span>${c.hours} 小時</span><span>${fmt(c.price)}</span></div></div></a>`; }).join('')}</div></div></section>`);
  }

  main.insertAdjacentHTML('beforeend', railSec('new', '新上架課程', '每週持續更新', C.filter(c => c.tag === 'NEW').concat(C.filter(c => c.tag !== 'NEW')).slice(0, 10)));

  // 學習路徑
  if (window.PATHS) {
    main.insertAdjacentHTML('beforeend', `<section class="sec" id="paths"><div class="wrap"><div class="sec-head rv-up"><div><h2>學習路徑</h2><div class="sub">系統化學習，目標導向的職涯規劃</div></div></div>
      <div class="paths-rail">${window.PATHS.map(p => `<a href="path.html?id=${p.id}" class="path-card rv-up" style="text-decoration:none;color:inherit"><div class="pc-name">${p.name}</div><p class="pc-desc">${p.desc}</p><div class="pc-info"><span class="pc-chip">📚 ${p.courses.length} 堂課程</span><span class="pc-chip">⏱ ${p.duration}</span><span class="pc-chip">📊 ${p.level}</span></div><div class="pc-salary">💰 預估年薪 ${p.salary}</div><div class="pc-progress"><i></i></div><div class="pc-pct">學習進度 0%</div><span class="pc-start">開始學習 →</span></a>`).join('')}</div></div></section>`);
  }

  // 捲動敘事
  const storyV = ['c06', 'c05', 'c03'].map(id => byId[id]);
  const steps = [['01 / 職人親授', '跟著業界職人\n學真正用得到的技術', '每位講師都在第一線工作，把多年累積的流程與心法，整理成一步步可以跟著做的課程。'],
                 ['02 / 專案實作', '每堂課都是\n一個完整作品', '附上講師原始專案檔與素材，從零開始跟著做，上完課就有能放進作品集的成果。'],
                 ['03 / 無限期觀看', '一次購買\n隨時隨地重溫', '電腦、手機、平板都能看，支援倍速與字幕，課程更新內容免費開放。']];
  main.insertAdjacentHTML('beforeend', `<section class="story"><div class="pin">
    <div class="steps">${steps.map((s, i) => `<div class="step ${i ? '' : 'on'}"><div class="k">${s[0]}</div><h2>${s[1].replace('\n', '<br>')}</h2><p>${s[2]}</p></div>`).join('')}<div class="pager">${steps.map((_, i) => `<i class="${i ? '' : 'on'}"></i>`).join('')}</div></div>
    <div class="media">${storyV.map((c, i) => `<video class="${i ? '' : 'on'}" src="${vid(c)}" muted loop playsinline preload="metadata" poster="${img(c)}" aria-hidden="true"></video>`).join('')}</div>
  </div></section>`);

  main.insertAdjacentHTML('beforeend', `<section class="sec"><div class="wrap"><div class="stats">
    ${[[(window.PLATFORM_STATS||{}).students||52000, '+', '累積學員'], [(window.PLATFORM_STATS||{}).instructors||12, '+', '業界職人講師'], [(window.PLATFORM_STATS||{}).satisfaction||4.85, '', '平均課程評分'], [98, '%', '學員推薦率']].map(([n, u, t]) => `<div class="stat rv-up"><b data-count="${n}" data-unit="${u}">0</b><span>${t}</span></div>`).join('')}
  </div></div></section>`);

  // 每日學習挑戰
  if (window.MISSIONS) {
    const surnames = ['陳','林','黃','張','王','李','吳','周','趙','許','蔡','鄭','劉','曾','謝'];
    const actions = window.MISSIONS.map(m => ({ type: m.type, reward: m.reward, unit: m.unit }));
    const feedItems = Array.from({ length: 20 }, () => {
      const s = surnames[Math.floor(Math.random() * surnames.length)];
      const a = actions[Math.floor(Math.random() * actions.length)];
      return `<div class="af-item">${s}**完成了${a.type}任務 <b>+${a.reward}${a.unit}</b></div>`;
    }).join('');
    const msDone = ls('aic-ms-done', []);
    const now = new Date(), midnight = new Date(now); midnight.setHours(24,0,0,0);
    const msLeft = Math.max(0, Math.floor((midnight - now) / 1000));
    const msH = String(Math.floor(msLeft/3600)).padStart(2,'0'), msM = String(Math.floor(msLeft%3600/60)).padStart(2,'0'), msS = String(msLeft%60).padStart(2,'0');
    const badgeColors = { '簡單': '#34c759', '中等': '#ff9500', '挑戰': '#ff5c8a' };
    main.insertAdjacentHTML('beforeend', `<section class="sec" id="missions"><div class="wrap"><div class="sec-head rv-up"><div><h2>每日學習挑戰</h2><div class="sub">完成任務賺取經驗值・每日重置倒數 <b class="ms-cd">${msH}:${msM}:${msS}</b></div></div></div>
      <div class="mission-stats rv-up">累計已完成 <b>${window.MISSION_STATS.total.toLocaleString()}</b> 個任務・今日 <b>${window.MISSION_STATS.today.toLocaleString()}</b> 個・完成 <b>${msDone.length}/${window.MISSIONS.length}</b></div>
      <div class="missions"><div class="mission-list">${window.MISSIONS.map((m,i) => {
        const done = msDone.includes(i);
        return `<div class="mission-card rv-up${done ? ' ms-done' : ''}">
          <div class="ms-card-top"><span class="mi-icon">${m.icon}</span><span class="ms-badge" style="--ms-c:${badgeColors[m.badge]||'var(--pri)'}">${m.badge}</span></div>
          <h4 class="ms-title">${m.type}</h4>
          <p class="ms-desc">${m.desc}</p>
          <div class="ms-reward-row"><span class="ms-reward-tag">🎁 +${m.reward} ${m.unit}</span></div>
          <button class="mi-btn${done ? ' mi-done' : ''}" data-ms="${i}">${done ? '<span class="ms-check">✓</span> 已完成' : '領取獎勵'}</button>
        </div>`;
      }).join('')}</div>
      <div class="activity-feed rv-up"><div class="af-title">即時動態</div><div class="af-list">${feedItems}${feedItems}</div></div></div></div></section>`);
    // Mission countdown timer
    const cdEl = $('.ms-cd', main);
    if (cdEl) { let sec = msLeft; const msTick = () => { sec--; if (sec < 0) return; cdEl.textContent = `${String(Math.floor(sec/3600)).padStart(2,'0')}:${String(Math.floor(sec%3600/60)).padStart(2,'0')}:${String(sec%60).padStart(2,'0')}`; setTimeout(msTick, 1000); }; setTimeout(msTick, 1000); }
    // Mission click to complete with check animation
    main.addEventListener('click', e => {
      const btn = e.target.closest('.mi-btn[data-ms]');
      if (!btn || btn.classList.contains('mi-done')) return;
      const idx = +btn.dataset.ms; const m = window.MISSIONS[idx];
      const done = ls('aic-ms-done', []);
      if (done.includes(idx)) return;
      done.push(idx); ss('aic-ms-done', done);
      btn.classList.add('mi-done'); btn.innerHTML = '<span class="ms-check">✓</span> 已完成';
      btn.closest('.mission-card')?.classList.add('ms-done');
      addXP(m.reward, m.type);
      toast(`完成任務「${m.type}」+${m.reward} XP`, 'success');
      if (done.length === window.MISSIONS.length) { setTimeout(() => { showConfetti(); toast('🎉 今日任務全部完成！', 'success'); }, 300); }
    });
  }

  main.insertAdjacentHTML('beforeend', railSec('best', '評價最高', '五星好評不斷', sortBy('rating').slice(0, 10)));

  // 影音學習
  if (window.VIDEO_CONTENT) {
    const vTabs = ['全部', '最新', '學員分享', '講師訪談', '幕後花絮'];
    main.insertAdjacentHTML('beforeend', `<section class="sec" id="videos"><div class="wrap"><div class="sec-head rv-up"><div><h2>影音學習</h2><div class="sub">免費觀看精選影片</div></div></div>
      <div class="video-tabs">${vTabs.map((t, i) => `<button class="video-tab ${i ? '' : 'on'}" data-vtab="${t}">${t}</button>`).join('')}</div>
      <div class="video-grid" id="vgrid">${window.VIDEO_CONTENT.slice(0, 6).map(vc => { const cc = byId[vc.course]; return `<div class="vid-card rv-up"><div class="vid-thumb"><img src="${cc ? img(cc) : ''}" alt="${vc.title}" loading="lazy" decoding="async"><div class="vid-play"><span>▶</span></div></div><div class="vid-info"><h4>${vc.title}</h4><span>${vc.views.toLocaleString()} 次觀看</span></div></div>`; }).join('')}</div></div></section>`);
  }

  // 限時優惠
  main.insertAdjacentHTML('beforeend', `<div class="wrap" id="promo"><div class="promo rv-up"><video src="${vid(byId.c06)}" autoplay muted loop playsinline poster="${img(byId.c06)}" aria-hidden="true"></video>
    <div class="in"><div><span class="eyebrow">限時優惠</span><h2>雙 11 全站最低 5 折<br>今天午夜結束</h2><p>任選兩堂再折 NT$500，結帳自動套用</p><a class="btn" style="background:#fff;color:#000;margin-top:20px" href="#top10">查看優惠課程 →</a></div>${cdHTML}</div></div></div>`);

  // 講師
  const INS = window.INSTRUCTORS || [];
  if (INS.length) {
    main.insertAdjacentHTML('beforeend', `<section class="sec"><div class="wrap"><div class="sec-head rv-up"><div><h2>職人講師陣容</h2><div class="sub">跟著最懂的人學</div></div><a class="more" href="instructor.html">查看全部 →</a></div>
      <div class="ins-grid">${INS.map((t, i) => `<a href="instructor.html?name=${encodeURIComponent(t.name)}" class="ins-card rv-up" style="transition-delay:${(i % 4) * 60}ms;text-decoration:none;color:inherit"><div class="ins-avatar">${t.avatar}</div><h3>${t.name}</h3><span class="ins-role">${t.role}</span><p class="ins-bio">${t.bio}</p><div class="ins-stats"><span>${t.courses} 堂課</span><span>${(t.students / 1000).toFixed(1)}k 學員</span></div></a>`).join('')}</div></div></section>`);
  } else {
    const teachers = [...new Map(C.map(c => [c.teacher, c])).values()].slice(0, 12);
    main.insertAdjacentHTML('beforeend', `<section class="sec"><div class="wrap"><div class="sec-head rv-up"><div><h2>職人講師陣容</h2><div class="sub">跟著最懂的人學</div></div></div>
      <div class="teachers">${teachers.map((c, i) => `<a class="tc rv-up" style="transition-delay:${(i % 6) * 60}ms" href="course.html?id=${c.id}"><img src="${img(c)}" alt="${c.teacher}" loading="lazy" decoding="async"><div class="n"><b>${c.teacher}</b><span>${c.role}</span></div></a>`).join('')}</div></div></section>`);
  }

  // 評價
  const TM = window.TESTIMONIALS;
  if (TM && TM.length) {
    main.insertAdjacentHTML('beforeend', `<section class="sec"><div class="wrap"><div class="sec-head rv-up"><div><h2>學員真實心得</h2><div class="sub">來自真實學員的學習故事</div></div></div></div>
      <div class="rv-wrap"><div class="reviews">${[...TM, ...TM].map(t => {
        const cc = byId[t.course];
        return `<div class="rv rv-detailed rv-up"><div class="rv-hdr"><span class="rv-avatar">${t.avatar}</span><div><b>${t.name}</b><span class="rv-role">${t.role}</span></div></div><div class="s">${'★'.repeat(t.rating || 5)}${'☆'.repeat(5 - (t.rating || 5))}</div><p>${t.quote}</p>${cc ? `<a class="rv-course-link" href="course.html?id=${cc.id}">📚 ${cc.title.slice(0, 20)}${cc.title.length > 20 ? '…' : ''}</a>` : ''}</div>`;
      }).join('')}</div></div></section>`);
  } else {
    const R = window.REVIEWS;
    main.insertAdjacentHTML('beforeend', `<section class="sec"><div class="wrap"><div class="sec-head rv-up"><div><h2>學員真實心得</h2></div></div></div>
      <div class="rv-wrap"><div class="reviews">${[...R, ...R].map(r => `<div class="rv"><div class="s">★★★★★</div><p>${r[2]}</p><small>${r[0]}・${r[1]}</small></div>`).join('')}</div></div></section>`);
  }

  // 合作品牌
  if (window.PARTNERS) {
    const pts = window.PARTNERS;
    main.insertAdjacentHTML('beforeend', `<section class="sec"><div class="wrap"><div class="sec-head rv-up"><div><h2>合作品牌與機構</h2><div class="sub">超過 ${pts.length} 家企業信賴 AI Class 的教育品質</div></div></div>
      <div class="partners-marquee rv-up"><div class="partners-track">${[...pts,...pts].map(p => `<span class="partner-logo">${p}</span>`).join('')}</div></div></div></section>`);
  }

  // 分類瀏覽
  main.insertAdjacentHTML('beforeend', `<section class="sec" id="cats"><div class="wrap"><div class="sec-head rv-up"><div><h2>探索所有分類</h2><div class="sub">找到你有興趣的領域</div></div></div>
    <div class="cat-grid rv-up">${window.CATS.slice(1).map(cat => {
      const cnt = C.filter(c => c.cat === cat.id).length;
      const sample = C.find(c => c.cat === cat.id);
      const bgUrl = sample ? img(sample) : '';
      return `<a class="cat-card" href="index.html#cat-${cat.id}" style="--cimg:url(${bgUrl})">
        <span class="cat-count">${cnt} 堂課程</span><span class="cat-name">${cat.name}</span></a>`;
    }).join('')}</div></div></section>`);

  // 超值組合包（使用 data.js BUNDLES）
  if (window.BUNDLES) {
    main.insertAdjacentHTML('beforeend', `<section class="sec" id="bundles"><div class="wrap"><div class="sec-head rv-up"><div><h2>超值組合包</h2><div class="sub">多堂課程一起買，省更多</div></div></div>
      <div class="bundle-grid">${window.BUNDLES.map(b => { const courses = b.courses.map(id => byId[id]).filter(Boolean); return `<div class="bundle-card rv-up">
        <span class="bundle-tag">${b.tag}</span>
        <div class="bundle-name">${b.name}</div>
        <div class="bundle-desc">${b.desc}</div>
        <div class="bundle-courses">${courses.map(c => `<span class="bundle-course-chip">${c.title.split('：')[0]}</span>`).join('')}</div>
        <div class="bundle-price-row"><span class="bundle-price">${fmt(b.price)}</span><span class="bundle-origin">${fmt(b.original)}</span></div>
        <div class="bundle-save">省下 ${fmt(b.save)}</div>
        <button class="btn btn-pri" style="width:100%;margin-top:16px" onclick="toast('已將組合包加入購物車')">加入購物車</button>
      </div>`; }).join('')}</div></div></section>`);
  }

  // 學員成功故事
  if (window.SUCCESS_STORIES) {
    main.insertAdjacentHTML('beforeend', `<section class="sec" id="stories"><div class="wrap"><div class="sec-head rv-up"><div><h2>學員成功故事</h2><div class="sub">他們在 AI Class 找到了新的可能</div></div></div>
      <div class="story-grid">${window.SUCCESS_STORIES.map(s => `<div class="story-card rv-up">
        <div class="story-hdr"><div class="story-avatar">${s.avatar}</div><div class="story-meta"><h3>${s.name}</h3><span>${s.role}</span></div></div>
        <div class="story-body">${s.story}</div>
        <div class="story-stats"><div class="story-stat"><b>${s.salary}</b>薪資變化</div><div class="story-stat"><b>${s.duration}</b>花費時間</div></div>
      </div>`).join('')}</div></div></section>`);
  }

  // 學員作品牆
  const showcaseCourses = C.filter(c => ['drawing','video','design','game'].includes(c.cat)).slice(0, 8);
  main.insertAdjacentHTML('beforeend', `<section class="sec showcase-section"><div class="wrap">
    <div class="sec-head rv-up"><div><h2>學員作品精選</h2><div class="sub">看看學員們學完課程後的成果</div></div><a href="gallery.html" class="more">查看全部 →</a></div>
    <div class="showcase-grid">${showcaseCourses.map((sc, i) => `<div class="showcase-item rv-up" style="transition-delay:${(i % 4) * 60}ms">
      <img src="${img(sc)}" alt="${sc.title}" loading="lazy" decoding="async">
      <div class="showcase-overlay"><span class="showcase-course">${sc.title}</span><span class="showcase-author">${sc.teacher} 的學員</span></div>
    </div>`).join('')}</div>
  </div></section>`);

  // 即將上架
  if (window.UPCOMING_COURSES) {
    main.insertAdjacentHTML('beforeend', `<section class="sec" id="upcoming"><div class="wrap"><div class="sec-head rv-up"><div><h2>即將上架</h2><div class="sub">搶先登記，開課通知第一手</div></div></div>
      <div class="upcoming-grid">${window.UPCOMING_COURSES.map(uc => {
        const [y,m] = uc.expected.split('-').map(Number);
        const target = new Date(y, m - 1, 1);
        const now = new Date();
        const diff = Math.max(0, target - now);
        const days = Math.floor(diff / 864e5);
        const hrs = Math.floor((diff % 864e5) / 36e5);
        return `<div class="upcoming-card rv-up">
        <div class="upcoming-cat">${(window.CATS.find(c => c.id === uc.cat) || {}).name || ''}</div>
        <h3>${uc.title}</h3>
        <div class="upcoming-teacher">${uc.teacher}</div>
        <div class="upcoming-countdown" data-target="${target.toISOString()}"><span class="uc-cd-num">${days}</span><small>天</small><span class="uc-cd-num">${hrs}</span><small>時</small></div>
        <div class="upcoming-interest">🔥 ${uc.interest.toLocaleString()} 人期待中</div>
        <div class="upcoming-price">${fmt(uc.earlybird)}<small>早鳥價</small></div>
        <button class="upcoming-btn" onclick="toast('已登記開課通知 📬')">🔔 登記通知</button>
      </div>`;}).join('')}</div></div></section>`);
    setInterval(() => {
      $$('.upcoming-countdown[data-target]').forEach(el => {
        const diff = Math.max(0, new Date(el.dataset.target) - new Date());
        const d = Math.floor(diff / 864e5), h = Math.floor((diff % 864e5) / 36e5);
        const nums = el.querySelectorAll('.uc-cd-num');
        if (nums[0]) nums[0].textContent = d;
        if (nums[1]) nums[1].textContent = h;
      });
    }, 60000);
  }

  // 你的學習旅程（使用真實 owned 數據）
  const ownedCount = owned.size;
  const totalHours = [...owned].map(id => byId[id]).filter(Boolean).reduce((s, c) => s + c.hours, 0);
  const streakDays = streakData.count;
  const streakPct = Math.round(streakDays / 7 * 100);
  const hoursPct = Math.min(100, Math.round(totalHours / 50 * 100));
  const coursePct = Math.min(100, Math.round(ownedCount / 10 * 100));
  const points = ownedCount * 120 + streakDays * 30;
  const pointsPct = Math.min(100, Math.round(points / 2000 * 100));
  const ring = (pct, color) => `<svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="35" fill="none" stroke="var(--line)" stroke-width="5"/><circle cx="40" cy="40" r="35" fill="none" stroke="${color}" stroke-width="5" stroke-dasharray="220" stroke-dashoffset="${Math.round(220 * (1 - pct / 100))}" stroke-linecap="round"/></svg>`;
  main.insertAdjacentHTML('beforeend', `<section class="sec" id="journey"><div class="wrap"><div class="sec-head rv-up"><div><h2>你的學習旅程</h2><div class="sub">持續學習，成為更好的自己</div></div></div>
    <div class="lj-grid rv-up">
      <div class="lj-card"><div class="lj-ring">${ring(streakPct, 'var(--pri)')}<span class="lj-icon">🔥</span></div><b>${streakDays} 天</b><span>連續學習</span></div>
      <div class="lj-card"><div class="lj-ring">${ring(hoursPct, '#ff5c8a')}<span class="lj-icon">⏱</span></div><b>${totalHours} 小時</b><span>累計課程時數</span></div>
      <div class="lj-card"><div class="lj-ring">${ring(coursePct, '#34c759')}<span class="lj-icon">✅</span></div><b>${ownedCount} 堂</b><span>已購課程</span></div>
      <div class="lj-card"><div class="lj-ring">${ring(pointsPct, '#ffc107')}<span class="lj-icon">💎</span></div><b>${points}</b><span>學習點數</span></div>
    </div>
    <div class="ach-row rv-up">
      <span class="ach-badge earned">🔥 連續 7 天學習</span>
      <span class="ach-badge earned">⭐ 完成第一堂課</span>
      <span class="ach-badge">🎯 學習 100 小時</span>
      <span class="ach-badge">💎 購買 5 堂課</span>
      <span class="ach-badge">📝 撰寫第一則評價</span>
      <span class="ach-badge">🏆 取得結業證書</span>
    </div>
  </div></section>`);

  // 人氣講師
  if (window.INSTRUCTORS) {
    const topInstr = window.INSTRUCTORS.slice().sort((a, b) => b.students - a.students).slice(0, 6);
    main.insertAdjacentHTML('beforeend', `<section class="sec" id="top-instructors"><div class="wrap"><div class="sec-head rv-up"><div><h2>人氣講師</h2><div class="sub">業界頂尖職人，帶你從零到專業</div></div><a href="instructor.html" class="more">查看全部 →</a></div>
      <div class="instr-grid">${topInstr.map(t => {
        const tCourses = C.filter(x => x.teacher === t.name);
        const avgRating = tCourses.length ? (tCourses.reduce((s, x) => s + x.rating, 0) / tCourses.length).toFixed(1) : '5.0';
        return `<a class="instr-card rv-up" href="instructor.html?name=${encodeURIComponent(t.name)}">
          <div class="instr-avatar">${t.avatar}</div>
          <h3 class="instr-name">${t.name}</h3>
          <p class="instr-role">${t.role}</p>
          <p class="instr-bio">${t.bio}</p>
          <div class="instr-meta"><span>⭐ ${avgRating}</span><span>📚 ${tCourses.length} 堂</span><span>👥 ${t.students.toLocaleString()}</span></div>
        </a>`;
      }).join('')}</div></div></section>`);
  }

  // 智慧推薦
  const recentCats = {};
  recentIds.forEach(id => { const cc = byId[id]; if (cc) recentCats[cc.cat] = (recentCats[cc.cat] || 0) + 1; });
  [...owned].forEach(id => { const cc = byId[id]; if (cc) recentCats[cc.cat] = (recentCats[cc.cat] || 0) + 2; });
  if (Object.keys(recentCats).length) {
    const topCat = Object.entries(recentCats).sort((a, b) => b[1] - a[1])[0][0];
    const catName = (window.CATS.find(ct => ct.id === topCat) || {}).name || topCat;
    const smartPicks = C.filter(c => c.cat === topCat && !owned.has(c.id) && !recentIds.includes(c.id)).sort((a, b) => b.rating - a.rating).slice(0, 6);
    if (smartPicks.length >= 3) {
      main.insertAdjacentHTML('beforeend', `<section class="sec smart-rec-sec" id="smart-rec"><div class="wrap"><div class="sec-head rv-up"><div><h2>為你推薦</h2><div class="sub">因為你對「${catName}」有興趣</div></div></div>
        <div class="rail">${smartPicks.map((c, i) => card(c, i)).join('')}</div></div></section>`);
    }
  }

  // 課程推薦測驗 CTA
  main.insertAdjacentHTML('beforeend', `<section class="sec quiz-cta-sec"><div class="wrap">
    <div class="quiz-cta rv-up">
      <div class="quiz-cta-left">
        <span class="quiz-cta-badge">🎯 1 分鐘找到你的課程</span>
        <h2>不知道從哪堂課開始？</h2>
        <p>回答 3 個簡單問題，AI 幫你推薦最適合的學習方向</p>
        <button class="btn btn-pri quiz-cta-btn" id="startQuizBtn">開始推薦測驗 →</button>
      </div>
      <div class="quiz-cta-right">
        <div class="quiz-cta-cards">${C.slice(0, 4).map(c => `<div class="quiz-cta-card"><img src="${img(c)}" alt="${c.title}" loading="lazy" decoding="async"></div>`).join('')}</div>
      </div>
    </div>
  </div></section>`);

  // 為什麼選擇 AI Class
  const whyData = window.WHY_AICLASS || [];
  if (whyData.length) {
    main.insertAdjacentHTML('beforeend', `<section class="sec why-sec"><div class="wrap"><div class="sec-head rv-up"><div><h2>為什麼選擇 AI Class？</h2><div class="sub">超過 ${(window.PLATFORM_STATS||{}).students ? window.PLATFORM_STATS.students.toLocaleString() : '240,000'} 名學員信賴的學習平台</div></div></div>
      <div class="why-grid">${whyData.map(w => `<div class="why-card rv-up"><span class="why-icon">${w.icon}</span><h3>${w.title}</h3><p>${w.desc}</p></div>`).join('')}</div>
    </div></section>`);
  }

  // 學員見證輪播
  const TMC = window.TESTIMONIALS || [];
  if (TMC.length && TMC[0].quote) {
    main.insertAdjacentHTML('beforeend', `<section class="sec tm-sec"><div class="wrap"><div class="sec-head rv-up"><div><h2>學員怎麼說</h2><div class="sub">來自不同領域的真實學習故事</div></div></div>
      <div class="tm-carousel rv-up"><button class="tm-arrow tm-prev" aria-label="上一則">‹</button><div class="tm-track">${TMC.map((t, i) => `<div class="tm-slide${i === 0 ? ' active' : ''}"><div class="tm-card"><div class="tm-quote">"${t.quote}"</div><div class="tm-author"><span class="tm-avatar">${t.avatar}</span><div><b>${t.name}</b><span>${t.role}</span></div></div></div></div>`).join('')}</div><button class="tm-arrow tm-next" aria-label="下一則">›</button><div class="tm-dots">${TMC.map((_, i) => `<button class="tm-dot${i === 0 ? ' on' : ''}" data-i="${i}" aria-label="第 ${i + 1} 則"></button>`).join('')}</div></div>
    </div></section>`);
    const track = $('.tm-track', main), dots = $$('.tm-dot', main), slides = $$('.tm-slide', main);
    let tmIdx = 0, tmTimer;
    function goTm(n) { tmIdx = ((n % TMC.length) + TMC.length) % TMC.length; slides.forEach((s, i) => s.classList.toggle('active', i === tmIdx)); dots.forEach((d, i) => d.classList.toggle('on', i === tmIdx)); track.style.transform = `translateX(-${tmIdx * 100}%)`; }
    function autoTm() { tmTimer = setInterval(() => goTm(tmIdx + 1), 5000); }
    $('.tm-prev', main).onclick = () => { clearInterval(tmTimer); goTm(tmIdx - 1); autoTm(); };
    $('.tm-next', main).onclick = () => { clearInterval(tmTimer); goTm(tmIdx + 1); autoTm(); };
    dots.forEach(d => d.onclick = () => { clearInterval(tmTimer); goTm(+d.dataset.i); autoTm(); });
    autoTm();
  }

  // AI Class Pro 訂閱方案
  main.insertAdjacentHTML('beforeend', `<section class="sec pro-sec" id="pro"><div class="wrap">
    <div class="pro-header rv-up"><span class="pro-crown">👑</span><h2>AI Class <span class="pro-gradient">Pro</span></h2><p>解鎖全站課程，無限學習</p></div>
    <div class="pro-plans rv-up">
      <div class="pro-plan"><div class="pro-plan-name">月付方案</div><div class="pro-plan-price"><span class="pro-currency">NT$</span><span class="pro-amount">599</span><span class="pro-period">/月</span></div><p class="pro-plan-note">隨時取消，無綁約</p><button class="btn btn-ghost pro-plan-btn" onclick="toast('示範網站：訂閱功能開發中')">選擇月付</button></div>
      <div class="pro-plan popular"><div class="pro-plan-badge">最划算</div><div class="pro-plan-name">年付方案</div><div class="pro-plan-price"><span class="pro-currency">NT$</span><span class="pro-amount">4,990</span><span class="pro-period">/年</span></div><p class="pro-plan-note">平均每月 $416，省 30%</p><button class="btn btn-pri pro-plan-btn" onclick="toast('示範網站：訂閱功能開發中')">選擇年付</button></div>
    </div>
    <div class="pro-features rv-up">
      ${[['🎬',`全站 ${C.length}+ 堂課程暢看`,'不用單堂購買，所有課程隨選隨看'],['⭐','Pro 獨家課程','搶先觀看 Pro 專屬的進階內容'],['📥','離線下載','支援離線觀看，通勤也能學習'],['🚫','無廣告體驗','專注學習，零干擾'],['🎓','優先新課通知','新課上線第一時間搶先看'],['💬','講師優先回覆','Pro 會員的問題優先處理']].map(f => `<div class="pro-feat"><span class="pro-feat-icon">${f[0]}</span><div><b>${f[1]}</b><p>${f[2]}</p></div></div>`).join('')}
    </div>
  </div></section>`);

  // FAQ
  main.insertAdjacentHTML('beforeend', `<section class="sec"><div class="wrap faq"><div class="sec-head rv-up"><div><h2>常見問題</h2></div></div>
    ${window.FAQ.map(q => `<div class="qa rv-up"><button>${q[0]}<i>+</i></button><div class="a"><div><p>${q[1]}</p></div></div></div>`).join('')}
    <div style="text-align:center;margin-top:20px" class="rv-up"><a href="faq.html" class="btn btn-ghost">查看更多問題 →</a></div></div></section>`);

  bindCards(main);
  $$('.sec').forEach(s => $('.rail', s) && bindRail(s));
  heroSlider();
  chipsFilter();
  story();
  counters();
  $$('.qa button').forEach(b => b.onclick = () => b.parentNode.classList.toggle('open'));
  $$('.stat').forEach(s => s.addEventListener('pointermove', e => { const r = s.getBoundingClientRect(); s.style.setProperty('--mx', e.clientX - r.left + 'px'); s.style.setProperty('--my', e.clientY - r.top + 'px'); }));

  // 課程推薦測驗互動
  const quizBtn = $('#startQuizBtn', main);
  if (quizBtn) quizBtn.onclick = () => openRecommendQuiz();

  // 浮動側邊欄
  const fb = document.createElement('div'); fb.className = 'float-bar';
  fb.innerHTML = `<button onclick="toast('示範網站：優惠功能開發中')"><span style="font-size:20px">🎁</span><span class="fb-tip">優惠</span></button><button onclick="toast('示範網站：App 下載中')"><span style="font-size:20px">📱</span><span class="fb-tip">App</span></button><button onclick="toast('示範網站：客服功能開發中')"><span style="font-size:20px">💬</span><span class="fb-tip">客服</span></button><button onclick="scrollTo({top:0,behavior:'smooth'})"><span style="font-size:20px">⬆</span><span class="fb-tip">回頂部</span></button>`;
  document.body.append(fb);
  addEventListener('scroll', rafThrottle(() => fb.classList.toggle('show', scrollY > innerHeight)), { passive: true });

  // Sticky 促銷底欄
  if (!sessionStorage.getItem('aic-promo-closed')) {
    const ps = document.createElement('div'); ps.className = 'promo-sticky';
    ps.innerHTML = `<span class="ps-text">🔥 雙 11 全站最低 5 折｜折扣碼 <span class="ps-code">DOUBLE11</span> 滿 5,000 再折 800</span><button class="ps-close" aria-label="關閉">✕</button>`;
    document.body.append(ps);
    setTimeout(() => ps.classList.add('show'), 2000);
    ps.querySelector('.ps-close').onclick = () => { ps.classList.remove('show'); sessionStorage.setItem('aic-promo-closed', '1'); setTimeout(() => ps.remove(), 400); };
  }

  // 排序按鈕綁定
  $$('.sort-btn').forEach(b => b.onclick = () => {
    $$('.sort-btn').forEach(x => x.classList.toggle('on', x === b));
    const sec = $('#filtered'), rail = $('.rail', sec);
    const activeCat = $('.chip.on');
    const cat = activeCat ? activeCat.dataset.cat : 'all';
    let list = cat === 'all' ? [...C] : C.filter(c => c.cat === cat);
    const s = b.dataset.sort;
    if (s === 'new') list = list.filter(c => c.tag === 'NEW').concat(list.filter(c => c.tag !== 'NEW'));
    else if (s === 'students') list.sort((a, b) => b.students - a.students);
    else if (s === 'price') list.sort((a, b) => a.price - b.price);
    rail.style.opacity = 0; rail.style.transform = 'translateY(14px)'; rail.style.transition = '.3s';
    setTimeout(() => { rail.innerHTML = list.map((c, i) => card(c, i)).join(''); rail.scrollLeft = 0; bindCards(rail); rail.style.opacity = 1; rail.style.transform = 'none'; }, 300);
  });

  // 排行時段切換
  $$('.time-tab').forEach(b => b.onclick = () => {
    $$('.time-tab').forEach(x => x.classList.toggle('on', x === b));
    const sec = $('#top10'), rail = $('.rail', sec);
    let list = sortBy('students').slice(0, 10);
    if (b.dataset.period === 'weekly') list = [...list].sort((a, b) => b.rating - a.rating);
    if (b.dataset.period === 'monthly') list = [...list].sort((a, b) => a.price - b.price);
    rail.style.opacity = 0; rail.style.transition = '.3s';
    setTimeout(() => { rail.innerHTML = list.map((c, i) => card(c, i, true)).join(''); bindCards(rail); rail.style.opacity = 1; }, 300);
  });

  // 影音類別切換
  $$('.video-tab').forEach(b => b.onclick = () => {
    $$('.video-tab').forEach(x => x.classList.toggle('on', x === b));
    const grid = $('#vgrid'), cat = b.dataset.vtab;
    const list = cat === '全部' ? window.VIDEO_CONTENT : window.VIDEO_CONTENT.filter(v => v.cat === cat);
    grid.innerHTML = list.slice(0, 6).map(vc => { const cc = byId[vc.course]; return `<div class="vid-card rv-up"><div class="vid-thumb"><img src="${cc ? img(cc) : ''}" alt="${vc.title}" loading="lazy" decoding="async"><div class="vid-play"><span>▶</span></div></div><div class="vid-info"><h4>${vc.title}</h4><span>${vc.views.toLocaleString()} 次觀看</span></div></div>`; }).join('');
    reveal(grid);
    bindVidCards();
  });

  function bindVidCards() {
    $$('.vid-card').forEach(el => { if (el._bound) return; el._bound = true; el.style.cursor = 'pointer';
      el.onclick = () => {
        const title = $('h4', el)?.textContent || '';
        const imgSrc = $('img', el)?.src || '';
        const vc = (window.VIDEO_CONTENT || []).find(v => v.title === title);
        const cc = vc ? byId[vc.course] : null;
        const videoSrc = cc ? vid(cc) : '';
        const trigger = document.activeElement;
        const ov = document.createElement('div'); ov.className = 'vid-overlay'; ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true'); ov.setAttribute('aria-label', title || '影片預覽');
        ov.innerHTML = `<div class="vid-modal"><button class="vid-modal-close" aria-label="關閉">×</button><video src="${videoSrc}" poster="${imgSrc}" controls autoplay></video><h3>${title}</h3></div>`;
        document.body.append(ov);
        const relTrap = trapFocus(ov);
        requestAnimationFrame(() => { requestAnimationFrame(() => ov.classList.add('on')); $('.vid-modal-close', ov).focus(); });
        const close = () => { relTrap(); ov.classList.remove('on'); setTimeout(() => { ov.remove(); if (trigger) trigger.focus(); }, 300); };
        $('.vid-modal-close', ov).onclick = close;
        ov.onclick = e => { if (e.target === ov) close(); };
        document.addEventListener('keydown', function esc(e) { if (e.key === 'Escape') { close(); document.removeEventListener('keydown', esc); } });
      };
    });
  }
  bindVidCards();

  // 頁首分類連結 → 篩選（支援子分類）
  const goCat = () => {
    const m = location.hash.match(/^#cat-(\w+)/);
    if (m) {
      const b = $(`.chip[data-cat="${m[1]}"]`);
      if (b) {
        b.click();
        const subMatch = location.hash.match(/sub=([^&]+)/);
        if (subMatch) {
          const subName = decodeURIComponent(subMatch[1]);
          const sec = $('#filtered'), rail = $('.rail', sec);
          const list = C.filter(c => c.cat === m[1] && c.sub === subName);
          if (list.length) {
            setTimeout(() => {
              rail.innerHTML = list.map((c, i) => card(c, i)).join(''); rail.scrollLeft = 0;
              $('h2', sec).textContent = `${subName}`;
              bindCards(rail);
            }, 350);
          }
        }
        setTimeout(() => b.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
      }
    }
  };
  addEventListener('hashchange', goCat); goCat();
}

function heroSlider() {
  const hero = $('.hero'), slides = $$('.slide', hero), dots = $$('.dot', hero);
  let cur = 0, timer, paused = false; const DUR = 6500;
  hero.style.setProperty('--dur', DUR + 'ms');
  const load = v => { if (!v.src) v.src = v.dataset.src; };
  load($('video', slides[0]));
  function go(n) {
    slides[cur].classList.remove('on'); dots[cur].classList.remove('on');
    const old = $('video', slides[cur]); setTimeout(() => old.pause(), 1100);
    cur = (n + slides.length) % slides.length;
    const v = $('video', slides[cur]); load(v); v.currentTime = 0; v.play().catch(() => {});
    slides[cur].classList.add('on');
    void dots[cur].offsetWidth; dots[cur].classList.add('on');
    load($('video', slides[(cur + 1) % slides.length]));
    sched();
  }
  function sched() { clearTimeout(timer); if (!paused) timer = setTimeout(() => go(cur + 1), DUR); }
  dots.forEach((d, i) => d.onclick = () => i !== cur && go(i));
  $('[data-hn]').onclick = () => go(cur + 1);
  $('[data-hp]').onclick = () => go(cur - 1);
  const pauseBtn = $('[data-hpause]');
  pauseBtn.onclick = e => { paused = !paused; hero.classList.toggle('paused', paused); e.currentTarget.textContent = paused ? '▶' : '❚❚'; e.currentTarget.setAttribute('aria-pressed', paused); paused ? (clearTimeout(timer), $('video', slides[cur]).pause()) : (go(cur + 1)); };
  pauseBtn.setAttribute('aria-pressed', 'false');
  // 鍵盤左右切換
  hero.setAttribute('tabindex', '0');
  hero.addEventListener('keydown', e => { if (e.key === 'ArrowRight') { go(cur + 1); e.preventDefault(); } else if (e.key === 'ArrowLeft') { go(cur - 1); e.preventDefault(); } });
  // 觸控滑動
  let sx = null;
  hero.addEventListener('touchstart', e => sx = e.touches[0].clientX, { passive: true });
  hero.addEventListener('touchend', e => { if (sx == null) return; const d = e.changedTouches[0].clientX - sx; if (Math.abs(d) > 50) go(cur + (d < 0 ? 1 : -1)); sx = null; }, { passive: true });
  // 捲出畫面暫停
  new IntersectionObserver(([e]) => { const v = $('video', slides[cur]); e.isIntersecting ? (!paused && v.play().catch(() => {})) : v.pause(); }).observe(hero);
  // 視差
  addEventListener('scroll', rafThrottle(() => { const y = scrollY; if (y < innerHeight) $$('.txt', hero).forEach(t => t.style.transform = `translateY(${y * .25}px)`); }), { passive: true });
  sched();
}

function chipsFilter() {
  const sec = $('#filtered'), rail = $('.rail', sec);
  $$('.chip').forEach(b => b.onclick = () => {
    $$('.chip').forEach(x => x.classList.toggle('on', x === b));
    const cat = b.dataset.cat, list = cat === 'all' ? C : C.filter(c => c.cat === cat);
    rail.style.opacity = 0; rail.style.transform = 'translateY(14px)'; rail.style.transition = '.3s';
    setTimeout(() => {
      rail.innerHTML = list.map((c, i) => card(c, i)).join(''); rail.scrollLeft = 0;
      $('h2', sec).textContent = cat === 'all' ? '為你推薦' : `${b.textContent} 課程`;
      bindCards(rail); rail.style.opacity = 1; rail.style.transform = 'none';
      rail.dispatchEvent(new Event('scroll'));
    }, 300);
  });
}

function story() {
  const st = $('.story'); if (!st) return;
  const steps = $$('.step', st), vids = $$('.media video', st), pager = $$('.pager i', st), media = $('.media', st);
  let cur = -1;
  const upd = () => {
    if (innerWidth <= 760) return;
    const r = st.getBoundingClientRect(), total = st.offsetHeight - innerHeight;
    const p = Math.min(1, Math.max(0, -r.top / total));
    media.style.setProperty('--clip', Math.max(0, 12 - p * 60) + '%');
    const n = Math.min(steps.length - 1, Math.floor(p * steps.length));
    if (n !== cur) {
      cur = n;
      steps.forEach((s, i) => s.classList.toggle('on', i === n));
      pager.forEach((s, i) => s.classList.toggle('on', i === n));
      vids.forEach((v, i) => { v.classList.toggle('on', i === n); i === n ? v.play().catch(() => {}) : v.pause(); });
    }
  };
  addEventListener('scroll', rafThrottle(upd), { passive: true }); upd();
  if (innerWidth <= 760) vids.forEach(v => { v.classList.add('on'); });
}

function counters() {
  const ob = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; ob.unobserve(e.target);
    const el = e.target, to = +el.dataset.count, u = el.dataset.unit || '', dec = to % 1 ? 1 : 0, t0 = performance.now();
    const f = t => { const k = Math.min(1, (t - t0) / 1600), v = to * (1 - Math.pow(1 - k, 4)); el.textContent = (dec ? v.toFixed(1) : Math.round(v).toLocaleString()) + u; k < 1 && requestAnimationFrame(f); };
    requestAnimationFrame(f);
  }), { threshold: .5 });
  $$('[data-count]').forEach(el => ob.observe(el));
}

/* ---------- 課程頁 ---------- */
function course() {
  const cid = new URLSearchParams(location.search).get('id');
  const c = byId[cid];
  if (!c) { notFoundPage(); return; }
  document.title = `${c.title}｜AI Class`;
  // 記錄最近瀏覽
  let rv = ls('aic-recent-view', []).filter(x => x !== c.id);
  rv.unshift(c.id); ss('aic-recent-view', rv.slice(0, 10));
  window.trackEvent('view_item', { item_id: c.id, item_name: c.title, item_category: c.cat, value: c.price });
  const cat = window.CATS.find(x => x.id === c.cat);
  const others = C.filter(x => x.id !== c.id && x.cat === c.cat).concat(C.filter(x => x.cat !== c.cat)).slice(0, 8);
  const owned = new Set(ls('aic-owned', []));

  // 使用 CHAPTERS 真實資料，或自動生成章節
  let chapters, totalLessonCount, numChaps;
  const _chData = window.CHAPTERS && window.CHAPTERS[c.id];
  if (_chData) {
    chapters = _chData.map((ch, ci) => ({ name: ch.title, lessons: ch.lessons.map((name, j) => ({ name, time: `${8 + (j * 7 % 15)}:${String((j * 23) % 60).padStart(2, '0')}`, free: ci === 0 && j < 2 })) }));
    totalLessonCount = chapters.reduce((s, ch) => s + ch.lessons.length, 0);
    numChaps = chapters.length;
  } else {
    const chapNames = ['課程介紹與準備','基礎觀念建立','進階技巧','完整專案實作','作品發表與職涯','加碼：業界趨勢'];
    const lessonBank = [
      ['講師介紹與課程地圖','工具安裝與環境設定','素材下載說明','課前暖身練習'],
      ['核心原理拆解','常見錯誤與修正','練習：小作品實作','觀念總整理','延伸閱讀導讀'],
      ['職人工作流程','效率提升的祕訣','案例分析','進階手法演練'],
      ['專案規劃','製作過程全紀錄','細節修飾與完稿','專案覆盤與優化','跨平台適配'],
      ['作品集整理','定價與接案流程','個人品牌經營','面試作品展示技巧'],
      ['產業趨勢分析','AI 工具輔助創作','社群經營策略','結語與下一步']
    ];
    const numChaps = c.hours >= 20 ? 6 : 5;
    const totalLessons = Math.max(numChaps * 4, Math.round(c.hours * 60 / 12));
    chapters = [];
    let lessonIdx = 0;
    for (let i = 0; i < numChaps; i++) {
      const bank = lessonBank[i] || lessonBank[lessonBank.length - 1];
      const cnt = i === 0 ? 4 : Math.min(5, Math.max(4, Math.round((totalLessons - lessonIdx) / (numChaps - i))));
      const lessons = [];
      for (let j = 0; j < cnt; j++) {
        const mins = 8 + ((i * 3 + j * 7) % 15);
        const secs = String((i * 17 + j * 23) % 60).padStart(2, '0');
        const free = i === 0 && j < 2;
        lessons.push({ name: bank[j % bank.length], time: `${mins}:${secs}`, free });
        lessonIdx++;
      }
      chapters.push({ name: chapNames[i], lessons });
    }
    totalLessonCount = chapters.reduce((s, ch) => s + ch.lessons.length, 0);
  }

  // 從 data.js REVIEWS 中匹配相關評論
  const reviewData = (() => {
    const R = window.REVIEWS || [];
    const catKeywords = { drawing: ['插畫','角色','Procreate','漫畫','Webtoon'], video: ['影片','剪輯','Blender','3D','動畫','VFX'], game: ['遊戲','Unity','像素'], baking: ['料理','甜點','烘焙','麵包','咖啡','拉花'], design: ['設計','UI','UX','品牌','前端'], ai: ['AI','Python','程式','RAG','LLM','ChatGPT','Prompt','GPT'], creative: ['攝影','寫作','文案','音樂','花藝'], beauty: ['美甲','美容','美髮','健身'], finance: ['理財','投資','ETF'], career: ['創業','電商','品牌經營','行銷'] };
    const kws = catKeywords[c.cat] || [];
    const scored = R.map((r, idx) => {
      let s = 0;
      if (kws.some(k => r[1].includes(k))) s += 10;
      if (r[1].includes(c.title.split('：')[0].slice(0,4))) s += 5;
      return { idx, s, name: r[0], course: r[1], text: r[2] };
    });
    scored.sort((a, b) => b.s - a.s || (a.idx * 7 + c.id.charCodeAt(1)) % 13 - (b.idx * 7 + c.id.charCodeAt(1)) % 13);
    const picked = scored.slice(0, 8);
    const ratings = [5, 5, 5, 4, 5, 4, 5, 5];
    const baseDays = [3, 5, 8, 12, 18, 25, 30, 35];
    return picked.map((p, i) => {
      const d = new Date(); d.setDate(d.getDate() - baseDays[i]);
      return { initial: p.name[0], name: p.name, rating: ratings[i], date: d.toISOString().slice(0,10), text: p.text };
    });
  })();
  const distPcts = [72, 20, 5, 2, 1];

  // 課程 FAQ（通用 + 分類相關）
  const catFaqMap = {
    design: [['需要會畫畫才能學設計嗎？', '不需要。設計更重要的是邏輯思考和審美能力，課程會從工具操作開始教起，零繪畫基礎也能上手。']],
    drawing: [['需要準備繪圖板嗎？', '建議購買入門款繪圖板（如 Wacom Intuos），課程前幾章會介紹推薦配備。滑鼠也能練習，但效率較低。']],
    ai: [['需要懂程式才能學 AI 嗎？', '大部分 AI 工具課程不需要程式基礎。若是 AI 開發課程，課程會從 Python 基礎教起。']],
    video: [['需要什麼等級的電腦？', '建議至少 16GB RAM、獨立顯卡。課程中會說明各軟體的最低與建議配備。']],
    baking: [['沒有烤箱可以學嗎？', '部分課程有無烤箱替代方案。建議至少有基本烤箱，課程會推薦平價入門機型。']],
    music: [['需要什麼軟體？', '課程會使用業界標準 DAW（如 Logic Pro、Ableton），部分有免費替代方案的教學。']],
    beauty: [['需要先買齊所有工具嗎？', '不用，課程開頭會列出必備清單，建議先買基本款，隨課程進度再擴充。']],
    game: [['需要會 3D 建模嗎？', '依課程內容而定，部分遊戲開發課程會包含基礎建模教學，也可搭配其他課程學習。']]
  };
  const cFaqs = (window.COURSE_FAQS || {})[c.id] || [];
  const courseFaq = [
    ...cFaqs,
    ...(catFaqMap[c.cat] || []),
    ['購買後可以觀看多久？', '一次購買即可無限期觀看，日後課程更新的內容也會免費開放，不需要再付任何費用。'],
    ['這堂課有字幕嗎？', '有的，課程提供繁體中文字幕，你也可以在播放器中自由開啟或關閉。'],
    ['課程素材可以下載嗎？', '每堂課皆附講師使用的專案檔與練習素材，可於課程頁面直接下載。部分課程另附 PDF 講義。'],
    ['不滿意可以退費嗎？', '購買後 7 天內，且觀看進度低於 20%，可透過客服申請全額退費，無需說明理由。'],
    ['課程適合初學者嗎？', `${c.hours <= 10 ? '這是一堂入門課程，完全沒有基礎也能跟上。' : c.hours <= 20 ? '課程涵蓋入門到進階內容，建議有基本概念會更容易吸收。' : '這堂課內容較為深入，建議有一定基礎再開始學習，但課程仍會從核心觀念講起。'}`]
  ];

  const main = $('main');
  const isOwned = owned.has(c.id);

  main.innerHTML = `<div class="c-hero"><div class="wrap"><div class="c-grid">
    <div>
      <div class="crumb"><a href="index.html">首頁</a> › <a href="category.html?cat=${c.cat}">${cat.name}</a> › <span>${c.title}</span></div>
      <div class="c-video" id="preview"><video src="${vid(c)}" poster="${img(c)}" muted loop playsinline preload="metadata"></video><button class="play" aria-label="播放試看"><span>▶</span></button></div>
      ${c.tag ? `<span class="badge ${c.tag}" style="position:static;display:inline-block;margin-top:24px">${c.tag}</span>` : ''}
      <h1 class="c-title">${c.title}</h1>
      <p class="c-sub">${c.teacher}・${c.role}　<span class="stars"><b>★ ${c.rating.toFixed(1)}</b>・${c.students.toLocaleString()} 位學員・${c.hours} 小時</span></p>
      ${c.desc ? `<p class="c-desc">${c.desc}</p>` : ''}
      ${(() => { const pids = (window.PREREQS || {})[c.id]; if (!pids || !pids.length) return ''; const pcs = pids.map(id => byId[id]).filter(Boolean); if (!pcs.length) return ''; return `<div class="c-prereq rv-up"><span class="c-prereq-label">📚 建議先修</span>${pcs.map(pc => `<a class="c-prereq-link" href="course.html?id=${pc.id}"><img src="${img(pc)}" alt="${pc.title}" loading="lazy"><span>${pc.title}</span></a>`).join('')}</div>`; })()}
      <div class="c-share rv-up">
        <span>分享課程</span>
        <button class="c-share-btn" data-copy-link title="複製連結">📋 複製連結</button>
        <a class="c-share-line" href="https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(location.href)}" target="_blank" rel="noopener noreferrer" title="LINE 分享">💬 LINE</a>
        <a class="c-share-fb" href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(location.href)}" target="_blank" rel="noopener noreferrer" title="Facebook 分享">📘 Facebook</a>
        <a class="c-share-x" href="https://twitter.com/intent/tweet?text=${encodeURIComponent(c.title + ' — AI Class')}&url=${encodeURIComponent(location.href)}" target="_blank" rel="noopener noreferrer" title="X 分享">𝕏 Twitter</a>
        ${navigator.share ? `<button class="c-share-btn" data-native-share title="更多分享方式">📤 分享</button>` : ''}
      </div>
    </div>
    <aside class="buy">
      ${isOwned ? `
        <div class="c-owned-badge">✓ 已購買</div>
        ${(() => { const prog = progress[c.id]; const doneCnt = prog ? prog.done.length : 0; const pctDone = totalLessonCount > 0 ? Math.round(doneCnt / totalLessonCount * 100) : 0; const remain = totalLessonCount - doneCnt; const remMin = Math.round(remain * c.hours * 60 / totalLessonCount); return `<div class="c-owned-progress" id="side-prog"><div class="c-owned-bar"><div class="c-owned-fill" id="side-prog-fill" style="width:${pctDone}%"></div></div><span id="side-prog-txt">${pctDone}% 完成（${doneCnt}/${totalLessonCount}）</span>${remain > 0 ? `<div class="c-remain-time" id="side-remain">⏱ 預估剩餘 ${remMin >= 60 ? Math.floor(remMin/60) + ' 小時 ' + (remMin%60) + ' 分鐘' : remMin + ' 分鐘'}</div>` : `<div class="c-remain-time c-done-badge">🎉 已完成全部課程！</div>`}</div>`; })()}
        <a class="btn btn-pri" href="player.html?id=${c.id}" style="width:100%;height:52px;font-size:16px">${progress[c.id] ? '繼續學習 →' : '開始上課 →'}</a>
      ` : `
        ${c.pro ? '<div class="c-pro-tag">👑 Pro 會員免費觀看</div>' : ''}
        <div class="c-live-view"><span class="c-live-dot"></span>${12 + (c.id.charCodeAt(1) % 30)} 人正在瀏覽此課程</div>
        <div class="c-recent-buy">🔥 過去 24 小時內有 ${38 + (c.id.charCodeAt(2) % 45)} 人購買</div>
        <div><span class="pct">${pct(c)}%</span> <del>${fmt(c.origin)}</del></div>
        <div class="big">${fmt(c.price)}</div>
        <div style="color:var(--tx2);font-size:14px">或 3 期 0 利率，每期 ${fmt(Math.ceil(c.price / 3))}</div>
        <div class="c-urgency"><span class="c-urgency-label">⏰ 限時優惠倒數</span>${cdHTML}</div>
        <button class="btn btn-pri c-buy-pulse" data-buy>立即購買</button>
        <button class="btn btn-ghost" data-cart>加入購物車</button>
        <button class="btn btn-ghost c-preview-btn" data-preview>▶ 免費試看第一堂</button>
        <button class="btn btn-ghost" data-gift style="margin-top:6px">🎁 贈送此課程</button>
        <button class="btn btn-ghost" onclick="toast('已設定降價通知')" style="margin-top:6px">🔔 降價通知</button>
        ${(() => {
          const pts = []; const now = c.price; const orig = c.origin;
          for (let i = 0; i < 7; i++) { const t = i === 6 ? now : Math.round(orig - (orig - now) * (0.3 + Math.sin(i * 1.2) * 0.25 + i * 0.08)); pts.push(Math.max(now, Math.min(orig, t))); }
          const mn = Math.min(...pts) * 0.95, mx = Math.max(...pts) * 1.02, rng = mx - mn || 1;
          const coords = pts.map((p, i) => `${(i / 6 * 280).toFixed(1)},${(50 - (p - mn) / rng * 44).toFixed(1)}`);
          const months = ['5月','6月','7月','8月','9月','10月','11月'];
          return `<div class="c-price-chart"><h4>📈 價格走勢（近 7 個月）</h4>
            <svg viewBox="0 0 280 60" aria-label="價格歷史圖表">
              <defs><linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--pri)"/><stop offset="1" stop-color="var(--pri)" stop-opacity="0"/></linearGradient></defs>
              <polygon class="c-price-area" points="0,60 ${coords.join(' ')} 280,60"/>
              <polyline class="c-price-line" points="${coords.join(' ')}"/>
              <circle class="c-price-dot" cx="${(6 / 6 * 280).toFixed(1)}" cy="${(50 - (pts[6] - mn) / rng * 44).toFixed(1)}"/>
              ${months.filter((_, i) => i % 2 === 0).map((m, i) => `<text class="c-price-label" x="${(i * 2 / 6 * 280).toFixed(1)}" y="60" text-anchor="middle">${m}</text>`).join('')}
              <text class="c-price-now" x="280" y="${(50 - (pts[6] - mn) / rng * 44 - 6).toFixed(1)}" text-anchor="end">${fmt(now)}</text>
            </svg>
            <div class="c-price-tip">✦ 目前為近 7 個月最低價</div>
          </div>`;
        })()}
      `}
      <button class="btn btn-ghost wish ${wish.has(c.id) ? 'on' : ''}" data-wish="${c.id}" style="opacity:1;transform:none;position:static;width:100%;height:46px;border-radius:12px">${wish.has(c.id) ? '♥' : '♡'}</button>
      <div class="c-buy-feat"><span>🎬 無限期觀看</span><span>📁 附專案檔</span><span>📱 多裝置</span><span>🔄 免費更新</span></div>
      ${(()=>{const lv=courseLevel(c);const lvMap={'入門':1,'中階':2,'進階':3};const n=lvMap[lv.label]||2;const cls=n===1?'filled':n===2?'filled warn':'filled hard';return `<div class="c-difficulty"><span class="c-diff-label">課程難度</span><div class="c-diff-bars">${[1,2,3].map(i=>`<div class="c-diff-bar${i<=n?' '+cls:''}"></div>`).join('')}</div><span class="c-diff-text">${lv.label}</span></div>`;})()}
      <div class="c-buy-trust">
        <div><span>🛡️</span> 7 天退費保證</div>
        <div><span>🔒</span> 安全加密付款</div>
        <div><span>⭐</span> ${c.rating.toFixed(1)} 超高評價</div>
      </div>
      <div class="c-side-info">
        <div class="c-side-row"><span>💬</span><span>講師回覆：平均 ${1 + (c.id.charCodeAt(1) % 3)} 小時內</span></div>
        <div class="c-side-row"><span>📅</span><span>最後更新：2026/10/${10 + (c.id.charCodeAt(2) % 20)}</span></div>
        <div class="c-side-row"><span>🌐</span><span>語言：繁體中文・附字幕</span></div>
        <div class="c-reply-rate"><span class="c-rr-label">回覆率</span><div class="c-rr-bar"><div class="c-rr-fill" style="width:${92 + (c.id.charCodeAt(1) % 8)}%"></div></div><span class="c-rr-pct">${92 + (c.id.charCodeAt(1) % 8)}%</span></div>
      </div>
      <div class="c-completion"><b>${75 + (c.id.charCodeAt(2) % 20)}%</b><span>學員完成率</span><div class="c-completion-bar"><div class="c-completion-fill" style="width:${75 + (c.id.charCodeAt(2) % 20)}%"></div></div></div>
      <div class="c-mini-reviews">
        <h4>學員怎麼說</h4>
        ${reviewData.slice(0, 2).map(r => `<div class="c-mini-rv"><div class="c-mini-av">${r.initial}</div><div><div class="c-mini-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div><p>${r.text.length > 50 ? r.text.slice(0, 50) + '…' : r.text}</p><span class="c-mini-name">${r.name}</span></div></div>`).join('')}
        <a href="#reviews" class="c-mini-cta">查看全部 ${c.students.toLocaleString()} 則評價 →</a>
      </div>
    </aside>
  </div></div></div>
  <nav class="tabs"><div class="wrap"><a href="#intro" class="on">課程介紹</a><a href="#works">作品</a><a href="#curri">課程大綱</a><a href="#teacher">講師</a><a href="#reviews">評價</a><a href="#notes">筆記</a><a href="#qa">問答</a><a href="#faq">常見問題</a><a href="#changelog">更新日誌</a><a href="#plan">學習計畫</a></div></nav>
  <div class="wrap" style="max-width:1000px;margin-left:max(32px,calc((100vw - 1360px)/2 + 32px))">
    <section class="c-sec" id="intro"><h2 class="rv-up">這堂課你會學到</h2>
      <div class="c-highlights rv-up">${(() => { const hl = (window.COURSE_HIGHLIGHTS || {})[c.id]; if (hl && hl.length) return hl.map(t => `<span class="c-hl c-hl-obj">✓ ${t}</span>`).join(''); const fallback = chapters.slice(0, 4).map(ch => ch.name); fallback.push(`${c.hours} 小時完整教學`, '講師親回覆問題'); return fallback.map(t => `<span class="c-hl">${t}</span>`).join(''); })()}</div>
      <div class="points">
      ${[['01', '打好基礎', '從工具到觀念，建立紮實的底子，不再東學西湊。'], ['02', '職人流程', '學會業界真正的工作方法，效率與品質一次到位。'], ['03', '完成作品', '跟著做出完整專案，直接放進你的作品集。'], ['04', '持續精進', '加碼業界趨勢與 AI 工具應用，讓你保持競爭力。']].map((p, i) => `<div class="point rv-up" style="transition-delay:${i * 90}ms"><b class="grad-tx">${p[0]}</b><h3>${p[1]}</h3><p>${p[2]}</p></div>`).join('')}</div>
      ${(()=>{const lv=courseLevel(c);const targets=lv.label==='入門'?['完全沒有相關經驗的初學者','想轉職但不知從何開始的人','對這個領域有興趣，想建立系統性知識的人','希望有人帶著做，不想自己摸索的人']:lv.label==='進階'?['已有基礎，想提升到專業水準的人','想學業界實戰流程與技巧的人','需要完成作品集或升級技能的在職者','想接案或建立個人品牌的創作者']:['有一定基礎，想更深入學習的人','希望系統化整理知識的自學者','想學更多實務技巧的在職人士','準備升級技能、拓展職涯的人'];return `<div class="c-target rv-up"><h3>🎯 適合對象</h3><ul>${targets.map(t=>`<li>${t}</li>`).join('')}</ul></div>`;})()}
      ${(()=>{const chs=window.CHAPTERS&&window.CHAPTERS[c.id];if(!chs)return '';const outcomes=chs.flatMap(ch=>ch.lessons.slice(0,2)).slice(0,8);return `<div class="c-outcomes rv-up"><h3>✅ 完成這堂課，你將能夠</h3><div class="c-outcomes-grid">${outcomes.map(o=>`<div class="c-outcome-item"><span class="c-outcome-check">✓</span>${o}</div>`).join('')}</div></div>`;})()}
      ${(()=>{const lv=courseLevel(c);const prereqs=lv.label==='入門'?['不需要任何先備知識，從零開始','準備一台電腦（Windows / Mac 皆可）','對本領域有興趣和學習熱忱']:lv.label==='進階'?['建議先完成相關入門課程或有半年以上經驗','了解基本操作和常用工具','具備自主練習和解決問題的能力']:['建議有基礎概念和初步操作經驗','準備對應的軟體或工具（課程內會說明版本）','願意花時間練習和完成作業'];return `<div class="c-prereq rv-up"><h3>📋 學習前需要</h3><div class="c-prereq-list">${prereqs.map(p=>`<div class="c-prereq-item"><span class="c-prereq-icon">${lv.label==='入門'?'✅':'📌'}</span>${p}</div>`).join('')}</div><div class="c-prereq-level"><span class="lvl-badge ${lv.cls}">${lv.label}</span><span>建議學習時間 ${lv.weeks} 週（每週 ${lv.label==='入門'?'5':'3-4'} 小時）</span></div></div>`;})()}
      ${(()=>{const toolMap={design:[{icon:'🎨',name:'Adobe Photoshop',ver:'2024 以上',note:'修圖與合成'},{icon:'✏️',name:'Adobe Illustrator',ver:'2024 以上',note:'向量繪圖'},{icon:'🖥️',name:'Figma',ver:'免費版即可',note:'UI 設計協作'}],drawing:[{icon:'🖌️',name:'Procreate',ver:'最新版',note:'iPad 繪圖'},{icon:'✏️',name:'Adobe Photoshop',ver:'2024 以上',note:'數位繪圖'},{icon:'📱',name:'繪圖板',ver:'入門款即可',note:'如 Wacom Intuos'}],ai:[{icon:'🐍',name:'Python',ver:'3.10+',note:'程式語言'},{icon:'📓',name:'Jupyter Notebook',ver:'最新版',note:'互動式開發'},{icon:'💻',name:'VS Code',ver:'最新版',note:'程式編輯器'}],video:[{icon:'🎬',name:'Adobe Premiere Pro',ver:'2024 以上',note:'影片剪輯'},{icon:'🎞️',name:'After Effects',ver:'2024 以上',note:'動態特效'},{icon:'🎵',name:'Audition',ver:'2024 以上',note:'音訊處理'}],music:[{icon:'🎹',name:'Logic Pro / Ableton',ver:'最新版',note:'數位音樂工作站'},{icon:'🎧',name:'監聽耳機',ver:'入門款即可',note:'混音監聽必備'},{icon:'🎤',name:'MIDI 鍵盤',ver:'25 鍵以上',note:'選配，提高效率'}],photo:[{icon:'📷',name:'Adobe Lightroom',ver:'Classic 或 CC',note:'照片後製'},{icon:'🎨',name:'Adobe Photoshop',ver:'2024 以上',note:'進階修圖'},{icon:'📸',name:'相機',ver:'可換鏡頭或手機',note:'拍攝工具'}],game:[{icon:'🎮',name:'Unity',ver:'2022 LTS',note:'遊戲引擎'},{icon:'💻',name:'Visual Studio',ver:'2022',note:'C# 開發'},{icon:'🖥️',name:'Blender',ver:'3.x',note:'3D 建模（選配）'}],beauty:[{icon:'💄',name:'基礎彩妝工具',ver:'',note:'刷具與海綿組'},{icon:'🪞',name:'化妝鏡',ver:'帶燈',note:'清楚觀察細節'},{icon:'📱',name:'手機',ver:'',note:'記錄練習成果'}],baking:[{icon:'🍳',name:'烤箱',ver:'家用即可',note:'基本烘焙設備'},{icon:'⚖️',name:'電子秤',ver:'精度 1g',note:'精確秤量'},{icon:'🥣',name:'攪拌器',ver:'手持或桌上型',note:'打發麵糊'}]};const tools=toolMap[c.cat]||[{icon:'💻',name:'電腦',ver:'Windows / Mac',note:'基本設備'},{icon:'🌐',name:'瀏覽器',ver:'Chrome 最新版',note:'課程觀看'},{icon:'📱',name:'手機或平板',ver:'選配',note:'行動學習'}];return `<div class="c-tools rv-up"><h3>🛠️ 需要工具 / 軟體</h3><div class="c-tools-grid">${tools.map(t=>`<div class="c-tool-item"><span class="c-tool-icon">${t.icon}</span><div class="c-tool-info"><b>${t.name}</b>${t.ver?`<span class="c-tool-ver">${t.ver}</span>`:''}<span class="c-tool-note">${t.note}</span></div></div>`).join('')}</div></div>`;})()}
    </section>
    <section class="c-sec" id="works"><h2 class="rv-up">課程作品</h2><div class="gallery">
      <div class="rv-up"><video src="${vid(c)}" muted loop playsinline autoplay poster="${img(c)}" aria-hidden="true"></video></div>
      ${others.slice(0, 4).map(o => `<div class="rv-up"><img src="${img(o)}" alt="${o.title}" loading="lazy" decoding="async"></div>`).join('')}</div></section>
    <section class="c-sec c-includes rv-up" id="includes"><h2>這堂課包含</h2>
      <div class="c-inc-grid">
        <div class="c-inc-item"><span class="c-inc-icon">📹</span><span>${c.hours} 小時影片內容</span></div>
        <div class="c-inc-item"><span class="c-inc-icon">📝</span><span>${chapters.length} 個章節・${totalLessonCount} 堂課</span></div>
        <div class="c-inc-item"><span class="c-inc-icon">📁</span><span>專案檔案下載</span></div>
        <div class="c-inc-item"><span class="c-inc-icon">📱</span><span>手機、平板、電腦觀看</span></div>
        <div class="c-inc-item"><span class="c-inc-icon">🔄</span><span>免費課程更新</span></div>
        <div class="c-inc-item"><span class="c-inc-icon">🏆</span><span>結業證書</span></div>
      </div>
    </section>
    <section class="c-sec c-downloads rv-up" id="downloads"><h2>📦 課程附件下載</h2>
      <p class="c-dl-desc">購買後即可下載以下所有資源，搭配課程使用效果更佳</p>
      <div class="c-dl-list">
        ${[{icon:'📁',name:`${c.title.split('：')[0]}｜完整專案檔`,size:`${(c.hours * 12 + 80).toFixed(0)} MB`,type:'ZIP'},{icon:'📄',name:'課程講義 PDF',size:`${(chapters.length * 3 + 5).toFixed(0)} MB`,type:'PDF'},{icon:'🎨',name:'練習素材包',size:`${(c.hours * 8 + 20).toFixed(0)} MB`,type:'ZIP'},{icon:'📝',name:'課堂筆記模板',size:'2 MB',type:'PDF'},{icon:'🔗',name:'延伸學習資源清單',size:'500 KB',type:'PDF'}].map(f=>`<div class="c-dl-item"><span class="c-dl-icon">${f.icon}</span><div class="c-dl-info"><b>${f.name}</b><span>${f.size}・${f.type}</span></div><button class="c-dl-btn" onclick="toast('${isOwned?'示範網站：下載功能開發中':'請先購買課程再下載'}')"><span>${isOwned?'⬇ 下載':'🔒 購買後可下載'}</span></button></div>`).join('')}
      </div>
    </section>
    <div class="c-update-pledge rv-up">
      <div class="cup-header"><span class="cup-icon">🔄</span><h3>業界唯一的免費更新承諾</h3></div>
      <p class="cup-desc">業界趨勢瞬息萬變，我們承諾課程內容將隨著工具更新、技術演進持續改版。已購買的學員，永遠免費享有最新版本。</p>
      <div class="cup-timeline">
        <div class="cup-tl-item"><div class="cup-tl-dot"></div><div><b>v3.2</b><span>2026/10 — 新增實戰專案章節</span></div></div>
        <div class="cup-tl-item"><div class="cup-tl-dot"></div><div><b>v3.1</b><span>2026/09 — 素材包全面更新</span></div></div>
        <div class="cup-tl-item"><div class="cup-tl-dot"></div><div><b>v3.0</b><span>2026/08 — 全課程重新錄製</span></div></div>
      </div>
    </div>
    <section class="c-sec" id="curri"><h2 class="rv-up">課程大綱 <span class="c-curri-meta">${chapters.length} 章・${totalLessonCount} 堂・共 ${c.hours} 小時</span></h2>
      <div class="curri-search rv-up"><span class="curri-search-icon">🔍</span><input type="text" id="curri-search-input" placeholder="搜尋章節或課時名稱…" aria-label="搜尋課程大綱"><div class="curri-search-result" id="curri-search-result"></div></div>
      <div class="curri-actions rv-up"><div class="curri-bar"><div class="curri-bar-fill" style="width:0%"></div><span class="curri-bar-txt">0 / ${totalLessonCount} 堂已完成</span></div><button class="btn btn-ghost btn-sm curri-toggle" id="curri-toggle-all">展開全部</button></div>
      ${chapters.map((ch, i) => {const chMins = ch.lessons.reduce((s,l)=>{const [m]=l.time.split(':').map(Number);return s+m},0); return `<div class="chap rv-up ${i ? '' : 'open'}"><button><span>第 ${i + 1} 章・${ch.name}</span><span class="chap-meta"><span class="chap-dur">${chMins} 分鐘</span><button class="chap-done-all" data-chap="${i}" title="標記本章全部完成">☐ 全完成</button><span class="chap-count">${ch.lessons.length} 堂 ${i ? '＋' : '－'}</span></span></button><div class="a"><div><ul>${ch.lessons.map((l, j) => `<li>
        <span><span class="chap-play">${l.free ? '▶' : '🔒'}</span>${i + 1}-${j + 1} ${l.name}${l.free ? '<em class="chap-free">免費試看</em>' : ''}</span>
        <span class="chap-time">${l.time}</span>
      </li>`).join('')}</ul></div></div></div>`}).join('')}</section>
    <section class="c-sec" id="teacher"><h2 class="rv-up">講師介紹</h2><div class="tprofile rv-up"><img src="${img(c)}" alt="${c.teacher}" loading="lazy"><div><h3 style="font-size:22px">${c.teacher}</h3><div style="color:var(--pri);font-weight:700;margin:4px 0 10px">${c.role}</div><p style="color:var(--tx2)">擁有超過十年的業界經驗，合作過多個知名品牌與專案。希望把在第一線累積的經驗，用最好懂的方式分享給每一位想學習的人。</p>
      <div class="t-stats"><span>📚 ${C.filter(x=>x.teacher===c.teacher).length} 堂課程</span><span>👥 ${C.filter(x=>x.teacher===c.teacher).reduce((s,x)=>s+x.students,0).toLocaleString()} 位學員</span><span>⭐ ${(C.filter(x=>x.teacher===c.teacher).reduce((s,x)=>s+x.rating,0)/C.filter(x=>x.teacher===c.teacher).length).toFixed(1)} 平均評分</span></div>
      <a href="instructor.html?name=${encodeURIComponent(c.teacher)}" class="t-all-courses">查看所有課程 →</a>
    </div></div>
    ${(() => { const tc = C.filter(x => x.teacher === c.teacher && x.id !== c.id).slice(0, 4); if (!tc.length) return ''; return `<div class="t-other-courses"><h4>${c.teacher} 的其他課程</h4><div class="t-oc-grid">${tc.map(x => `<a href="course.html?id=${x.id}" class="t-oc-card"><img src="${img(x)}" alt="${x.title}" loading="lazy" decoding="async"><div><b>${x.title}</b><span>★ ${x.rating} ・ ${fmt(x.price)}</span></div></a>`).join('')}</div></div>`; })()}
    </section>
    <section class="c-sec" id="reviews"><h2 class="rv-up">學員評價 <span style="color:var(--pri);font-size:18px">★ ${c.rating.toFixed(1)}</span> <span style="font-size:15px;color:var(--tx3);font-weight:400">(${c.students.toLocaleString()} 位學員)</span></h2>
      <div class="review-stats rv-up"><div class="rs-big"><b>${c.rating.toFixed(1)}</b><div class="rs-stars">★★★★★</div><div style="font-size:13px;color:var(--tx3)">${c.students.toLocaleString()} 則評價</div></div>
      <div class="rs-bars">${distPcts.map((p, i) => `<div class="rs-bar rv-star-filter" data-star="${5-i}" role="button" tabindex="0" title="篩選 ${5-i} 星評價"><span>${5 - i}</span><div class="rs-track"><i style="width:${p}%"></i></div><span>${p}%</span></div>`).join('')}</div></div>
      <div class="rv-controls rv-up">
        <div class="rv-sort">
          <span>排序</span>
          <button class="rv-sort-btn on" data-sort="helpful">最有幫助</button>
          <button class="rv-sort-btn" data-sort="newest">最新</button>
          <button class="rv-sort-btn" data-sort="highest">最高分</button>
          <button class="rv-sort-btn" data-sort="lowest">最低分</button>
        </div>
        <div class="rv-filter-status" id="rv-filter-status" style="display:none">
          <span id="rv-filter-txt"></span>
          <button class="rv-filter-clear" id="rv-filter-clear">✕ 清除篩選</button>
        </div>
      </div>
      <div class="review-list" id="review-list">${reviewData.map((r, i) => `<div class="review-item rv-up${i >= 3 ? ' rv-hidden' : ''}" data-rating="${r.rating}" data-date="${r.date}" data-helpful="${12+i*3}">
        <div class="ri-head"><div class="ri-avatar">${r.initial}</div><div class="ri-meta"><b>${r.name}</b><div class="ri-sub">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)} <span class="ri-date">${r.date}</span></div></div></div>
        <p>${r.text}</p>
        <div class="rv-helpful"><span>這則評價有幫助嗎？</span><button class="rv-vote rv-up-vote ${reviewVotes[c.id+'-'+i]==='up'?'voted':''}" data-rv="${c.id+'-'+i}" data-dir="up">👍 有幫助 <span class="rv-vote-n">${12+i*3+(reviewVotes[c.id+'-'+i]==='up'?1:0)}</span></button><button class="rv-vote rv-dn-vote ${reviewVotes[c.id+'-'+i]==='dn'?'voted':''}" data-rv="${c.id+'-'+i}" data-dir="dn">👎</button></div>
      </div>`).join('')}</div>
      ${reviewData.length > 3 ? `<button class="btn btn-ghost rv-load-more rv-up" id="rv-load-more">查看更多評價（${reviewData.length - 3}）</button>` : ''}
      <div class="ur-form rv-up"><h3>撰寫你的評價</h3>
        <div class="ur-stars"><span data-ur="1">☆</span><span data-ur="2">☆</span><span data-ur="3">☆</span><span data-ur="4">☆</span><span data-ur="5">☆</span></div>
        <textarea class="ur-text" placeholder="分享你的學習心得…（至少 10 個字）" rows="4" aria-label="課程評價"></textarea>
        <button class="btn btn-pri ur-submit" disabled>送出評價</button>
      </div>
      <div class="ur-user-list"></div>
    </section>
    ${(() => { const B = window.BUNDLES || []; const related = B.filter(b => b.courses.includes(c.id)); if (!related.length) return ''; return `<section class="c-sec c-related-bundle rv-up" id="bundle"><h2>🎁 這堂課的超值組合</h2><div class="c-bundle-list">${related.map(b => { const bCourses = b.courses.map(id => byId[id]).filter(Boolean); return `<div class="c-bundle-card"><div class="c-bundle-tag">${b.tag || '組合包'}</div><h3>${b.name}</h3><p>${b.desc}</p><div class="c-bundle-courses">${bCourses.map(bc => `<span class="c-bundle-chip ${bc.id === c.id ? 'current' : ''}">${bc.title.split('：')[0]}</span>`).join('')}</div><div class="c-bundle-price"><span class="c-bundle-now">${fmt(b.price)}</span><del>${fmt(b.original)}</del><span class="c-bundle-save">省 ${fmt(b.save)}</span></div><button class="btn btn-pri" style="width:100%;margin-top:12px" onclick="toast('已將組合包加入購物車 🛒')">整組加入購物車</button></div>`; }).join('')}</div></section>`; })()}
    ${notesWidget(c.id)}
    <section class="c-sec" id="qa"><h2 class="rv-up">💬 學員問答 <span class="qa-count">${6 + (c.id.charCodeAt(2) % 8)} 則討論</span></h2>
      <div class="qa-post rv-up">
        <textarea class="qa-input" placeholder="在這裡提問，講師會親自回覆…" rows="3" aria-label="發問"></textarea>
        <div class="qa-post-foot"><span class="qa-hint">提問前請先搜尋是否已有相似問題</span><button class="btn btn-pri btn-sm qa-submit">送出問題</button></div>
      </div>
      <div class="qa-sort rv-up"><span>排序</span><button class="qa-sort-btn on" data-qsort="hot">🔥 最熱門</button><button class="qa-sort-btn" data-qsort="new">🕐 最新</button></div>
      <div class="qa-list">
        ${[
          { init:'周', name:'周**', date:'3 天前', q:'請問第三章的專案檔在哪裡下載？找不到連結。', aName: c.teacher, a:'在第三章第一堂的「課程資源」區塊可以找到下載連結，如果還是找不到的話請截圖給我，我來協助！', likes:12, replies:2 },
          { init:'謝', name:'謝**', date:'5 天前', q:'老師好，我照著步驟做但結果跟影片不一樣，是版本問題嗎？', aName: c.teacher, a:'有可能是版本差異，課程是用最新版錄製的，建議更新到最新版再試一次。如果問題持續，請把你的版本號和截圖貼上來。', likes:8, replies:1 },
          { init:'蔡', name:'蔡**', date:'1 週前', q:'這堂課完成後，能力大概可以到什麼程度？可以直接接案嗎？', aName: c.teacher, a:'完成課程後你會具備獨立完成中型專案的能力。接案的話建議再多做 2-3 個個人專案練手，課程最後一章有分享接案的準備方向。', likes:22, replies:4 },
          { init:'鄭', name:'鄭**', date:'1 週前', q:'第二章第三堂的素材解壓後檔案好像缺了，能確認一下嗎？', aName: c.teacher, a:'已經確認並更新了素材包，請重新下載一次應該就正常了。如有其他問題歡迎再提問！', likes:5, replies:1 },
          { init:'許', name:'許**', date:'2 週前', q:'請問有推薦搭配的參考書籍或資源嗎？', aName: c.teacher, a:'我在第一章的講義有列出推薦書單，另外也建議追蹤我在課程簡介中分享的社群帳號，會不定期分享實用資源。', likes:15, replies:3 },
          { init:'吳', name:'吳**', date:'2 週前', q:'老師會更新 2027 年的新內容嗎？', aName: c.teacher, a:'會的！我通常每季會更新一次內容，已購買的同學都會免費獲得更新。2027 年初預計加入 AI 輔助的新章節。', likes:31, replies:5 }
        ].map((item, i) => `<div class="qa-item rv-up">
          <div class="qa-item-head"><div class="qa-avatar">${item.init}</div><div class="qa-meta"><b>${item.name}</b><span>${item.date}</span></div></div>
          <p class="qa-question">${item.q}</p>
          <div class="qa-answer"><div class="qa-answer-head"><span class="qa-teacher-badge">講師</span><b>${item.aName}</b></div><p>${item.a}</p></div>
          <div class="qa-actions"><button class="qa-like" data-qa-i="${i}"><span class="qa-like-icon">👍</span> <span class="qa-like-num">${item.likes}</span></button><span class="qa-reply-count">${item.replies} 則回覆</span></div>
        </div>`).join('')}
      </div>
      ${(() => { const cp = (window.COMMUNITY_POSTS || []).filter(p => p.course === c.id); if (!cp.length) return ''; return `<div class="qa-community rv-up"><h3>🌐 社群討論</h3><p class="qa-community-sub">來自學習社群的相關討論</p>${cp.map(p => `<a class="qa-cp-card" href="community.html"><div class="qa-cp-head"><span class="qa-cp-avatar">${p.avatar}</span><b>${p.author}</b><span class="qa-cp-time">${p.time}</span></div><h4>${p.title}</h4><p>${p.content.length > 80 ? p.content.slice(0,80) + '…' : p.content}</p><div class="qa-cp-meta"><span>❤ ${p.likes}</span><span>💬 ${p.replies} 回覆</span>${(p.tags||[]).map(t => `<span class="qa-cp-tag">${t}</span>`).join('')}</div></a>`).join('')}<a href="community.html" class="btn btn-ghost" style="width:100%;margin-top:12px">前往社群看更多 →</a></div>`; })()}
    </section>
    <section class="c-sec" id="faq"><h2 class="rv-up">常見問題</h2>${courseFaq.map(q => `<div class="qa rv-up"><button>${q[0]}<i>+</i></button><div class="a"><div><p>${q[1]}</p></div></div></div>`).join('')}<div class="faq-more rv-up"><p>找不到你要的答案？</p><a href="faq.html" class="btn btn-ghost">前往幫助中心</a> <button class="btn btn-ghost" onclick="toast('示範網站：客服功能開發中')">💬 聯繫客服</button></div></section>
    <section class="c-sec c-changelog rv-up" id="changelog"><h2>📋 課程更新日誌</h2>
      <div class="cl-timeline">
        <div class="cl-item"><div class="cl-dot new"></div><div class="cl-body"><span class="cl-date">2026/10/20</span><h4>v3.2 新增第五章「實戰專案」</h4><p>新增 5 堂實戰課程，包含完整專案從零到部署的流程教學。</p></div></div>
        <div class="cl-item"><div class="cl-dot"></div><div class="cl-body"><span class="cl-date">2026/09/15</span><h4>v3.1 更新素材包</h4><p>全部素材更新至最新版本，修正第三章範例檔的相容性問題。</p></div></div>
        <div class="cl-item"><div class="cl-dot"></div><div class="cl-body"><span class="cl-date">2026/08/01</span><h4>v3.0 全課程重新錄製</h4><p>使用最新工具版本重新錄製，畫質提升至 1080p，新增字幕。</p></div></div>
      </div>
      <p class="cl-note">已購買的學員自動享有所有更新內容</p>
    </section>
    ${(() => { const lv = courseLevel(c); const wk = lv.weeks; const hpw = Math.ceil(c.hours / wk); const plans = []; for (let w = 0; w < Math.min(wk, 6); w++) { const from = Math.floor(w * chapters.length / wk); const to = Math.floor((w + 1) * chapters.length / wk); const names = chapters.slice(from, to).map(ch => ch.name).join('、'); plans.push({ week: w + 1, chapters: names || '複習與作品完善', hours: hpw }); } if (wk > 6) plans.push({ week: '7+', chapters: '進階練習與作品集整理', hours: hpw }); return `<section class="c-sec c-plan rv-up" id="plan"><h2>📅 建議學習計畫<span class="c-plan-badge">${wk} 週完成</span></h2><p class="c-plan-sub">每週投入約 ${hpw} 小時，${wk} 週完成全部課程</p><div class="c-plan-timeline">${plans.map(p => `<div class="c-plan-item"><div class="c-plan-week">第 ${p.week} 週</div><div class="c-plan-content"><b>${p.chapters}</b><span>${p.hours} 小時</span></div></div>`).join('')}</div><div class="c-plan-tip">💡 以上為建議進度，你可以依自己的節奏調整。重要的是持續學習！</div></section>`; })()}
    ${(() => {
      if (isOwned) return '';
      const pair = C.filter(x => x.id !== c.id && x.cat === c.cat).sort((a, b) => b.rating - a.rating).slice(0, 2);
      if (pair.length < 2) return '';
      const combo = [c, ...pair];
      const total = combo.reduce((s, x) => s + x.origin, 0);
      const discounted = Math.round(combo.reduce((s, x) => s + x.price, 0) * 0.88);
      const saved = total - discounted;
      return `<div class="fbt-sec rv-up"><h3 class="fbt-head">🛒 搭配購買更划算</h3>
        <div class="fbt-items">${combo.map((x, i) => `${i ? '<span class="fbt-plus">+</span>' : ''}<a class="fbt-card" href="course.html?id=${x.id}"><img src="${img(x)}" alt="${x.title}" loading="lazy"><div class="fbt-card-info"><b>${x.title.length > 16 ? x.title.slice(0,16) + '…' : x.title}</b><span>${x.teacher}・${fmt(x.price)}</span></div></a>`).join('')}</div>
        <div class="fbt-total"><div class="fbt-total-left"><del>${fmt(total)}</del><b>${fmt(discounted)}</b><span class="fbt-save">省下 ${fmt(saved)}（${Math.round((1 - discounted / total) * 100)}% OFF）</span></div><button class="btn btn-pri fbt-buy" onclick="toast('已將 ${combo.length} 門課程加入購物車 🛒')">一起加入購物車</button></div></div>`;
    })()}
    <div class="c-stats-card rv-up">
      <h3>📊 課程數據一覽</h3>
      <div class="c-stats-grid">
        <div class="c-stat-item"><div class="c-stat-num" data-count="${c.students}">${c.students.toLocaleString()}</div><div class="c-stat-label">位學員</div></div>
        <div class="c-stat-item"><div class="c-stat-num">${c.hours}</div><div class="c-stat-label">小時內容</div></div>
        <div class="c-stat-item"><div class="c-stat-num">${chapters.length}</div><div class="c-stat-label">個章節</div></div>
        <div class="c-stat-item"><div class="c-stat-num">${totalLessonCount}</div><div class="c-stat-label">堂課</div></div>
        <div class="c-stat-item"><div class="c-stat-num">★ ${c.rating.toFixed(1)}</div><div class="c-stat-label">學員評分</div></div>
        <div class="c-stat-item"><div class="c-stat-num">${75 + (c.id.charCodeAt(2) % 20)}%</div><div class="c-stat-label">完成率</div></div>
      </div>
    </div>
    <div class="c-guarantee rv-up">
      <div class="c-guarantee-item"><div class="c-guarantee-icon">🛡️</div><div class="c-guarantee-title">7 天退費保證</div><div class="c-guarantee-desc">購買後 7 天內，覺得不適合可全額退費，零風險。</div></div>
      <div class="c-guarantee-item"><div class="c-guarantee-icon">♾️</div><div class="c-guarantee-title">無限期觀看</div><div class="c-guarantee-desc">一次購買，終身觀看，隨時隨地複習。</div></div>
      <div class="c-guarantee-item"><div class="c-guarantee-icon">🔄</div><div class="c-guarantee-title">免費課程更新</div><div class="c-guarantee-desc">課程內容持續更新，舊學員自動享有新內容。</div></div>
      <div class="c-guarantee-item"><div class="c-guarantee-icon">💬</div><div class="c-guarantee-title">講師親自回覆</div><div class="c-guarantee-desc">學習遇到問題可直接提問，講師親自回覆。</div></div>
    </div>
    ${(() => {
      const achieveMap = {
        design: [['🎨','獨立完成品牌視覺系統'],['📐','掌握業界設計流程'],['💼','建立可接案的作品集'],['🚀','效率提升 3 倍以上']],
        drawing: [['✏️','掌握紮實的繪畫基本功'],['🎭','創造有個人風格的作品'],['📱','熟練數位繪圖工具'],['🏆','建立可展示的作品集']],
        ai: [['🤖','獨立開發 AI 應用'],['📊','用數據解決實際問題'],['⚡','工作效率提升 10 倍'],['💡','掌握最新技術趨勢']],
        video: [['🎬','做出電影質感的影像'],['🎨','掌握專業調色技巧'],['📱','產出社群爆款內容'],['💰','具備接案變現能力']],
        creative: [['🎯','找到個人創作風格'],['📝','系統化創作方法'],['🌟','作品獲得專業認可'],['💪','建立持續創作習慣']],
        baking: [['👨‍🍳','做出專業等級料理'],['🎂','掌握經典食譜技法'],['📸','擺盤拍照吸引眼球'],['🏪','具備開店基礎能力']],
        game: [['🎮','做出可發行的遊戲'],['🖼️','創造精緻遊戲美術'],['🔧','掌握引擎核心功能'],['🏆','上架 Steam 或 App Store']],
        career: [['📈','業績或流量翻倍'],['🎯','掌握系統化方法論'],['💬','專業簡報說服力'],['💰','收入成長有感提升']],
        beauty: [['💇','掌握專業技術流程'],['🌟','做出作品集水準成果'],['📋','具備考照實力'],['🏠','在家也能專業服務']],
        finance: [['📊','建立理財投資系統'],['💰','創造被動收入來源'],['📈','資產穩定成長'],['🛡️','有效控管風險']]
      };
      const items = achieveMap[c.cat] || achieveMap.creative;
      return `<div class="c-achieve rv-up"><h3>🏆 學完這門課你可以做到</h3><div class="c-achieve-grid">${items.map(([emoji, text]) => `<div class="c-achieve-item"><span class="c-achieve-emoji">${emoji}</span><span>${text}</span></div>`).join('')}</div></div>`;
    })()}
  </div>
  ${(() => {
    const P = window.POSTS || [];
    const related = P.filter(p => p.cat === c.cat || (p.title && p.title.includes(c.teacher))).slice(0, 3);
    if (!related.length) return '';
    return `<section class="sec"><div class="wrap"><div class="sec-head rv-up"><div><h2>相關學習文章</h2><div class="sub">延伸閱讀，加深你的學習</div></div><a class="more" href="blog.html">查看全部 →</a></div>
      <div class="rel-articles">${related.map(p => `<a class="rel-article rv-up" href="article.html?id=${p.id}">
        <div class="rel-art-img"><img src="assets/img/v${(C.find(x => x.cat === p.cat) || C[0]).v}.jpg" alt="${p.title}" loading="lazy" decoding="async"></div>
        <div class="rel-art-body"><span class="rel-art-cat">${(window.CATS.find(x => x.id === p.cat) || {}).name || ''}</span><h3>${p.title}</h3><span class="rel-art-meta">${p.readTime || '5 分鐘'} 閱讀</span></div>
      </a>`).join('')}</div></div></section>`;
  })()}
  ${(() => { const G = window.GALLERY || []; const works = G.filter(g => g.course === c.id); if (!works.length) return ''; return `<section class="c-sec c-gallery rv-up" id="student-works"><h2>🎨 學員作品展示</h2><div class="c-gallery-grid">${works.map(w => `<div class="c-gallery-item"><div class="c-gallery-thumb"><img src="assets/img/v${w.v}.jpg" alt="${w.title}" loading="lazy" decoding="async"></div><div class="c-gallery-info"><h4>${w.title}</h4><p>${w.desc}</p><div class="c-gallery-meta"><span>${w.author}</span><span>❤ ${w.likes}</span></div></div></div>`).join('')}</div><a href="gallery.html" class="btn btn-ghost" style="width:100%;margin-top:16px">查看更多學員作品 →</a></section>`; })()}
  ${(()=>{const next=C.filter(x=>x.id!==c.id&&x.cat===c.cat&&x.hours>c.hours).sort((a,b)=>a.hours-b.hours).slice(0,3);if(!next.length)return '';return `<div class="c-next-step rv-up"><h3>📈 學完這門，接下來學</h3><div class="c-next-grid">${next.map(n=>`<a class="c-next-card" href="course.html?id=${n.id}"><img src="${img(n)}" alt="${n.title}" loading="lazy" decoding="async"><div class="c-next-info"><b>${n.title}</b><span>★ ${n.rating} ・ ${n.hours}h ・ ${fmt(n.price)}</span></div><span class="c-next-arrow">→</span></a>`).join('')}</div></div>`;})()}
  ${smartRecommend(c)}
  ${(()=>{const rv=ls('aic-recent-view',[]).filter(x=>x!==c.id).slice(0,4).map(x=>byId[x]).filter(Boolean);if(!rv.length)return '';return `<section class="c-sec rv-up"><h2>🕐 最近瀏覽</h2><div class="recent-viewed">${rv.map(r=>`<a class="rv-item" href="course.html?id=${r.id}"><img src="${img(r)}" alt="${r.title}" loading="lazy" decoding="async"><div><div class="rv-title">${r.title}</div><div class="rv-teacher">${r.teacher}</div></div></a>`).join('')}</div></section>`;})()}
  ${railSec('more', '你可能也會喜歡', '', others)}`;

  seo({
    title: `${c.title}｜AI Class`,
    desc: c.desc || c.ai || '',
    url: `https://aiclass.tw/course.html?id=${c.id}`,
    img: `https://aiclass.tw/${img(c)}`,
    ogType: 'course',
    jsonLd: [
      { '@context': 'https://schema.org', '@type': 'Course', name: c.title, description: c.desc || '', provider: { '@type': 'Organization', name: 'AI Class', url: 'https://aiclass.tw/', sameAs: 'https://aiclass.tw/' }, instructor: { '@type': 'Person', name: c.teacher, jobTitle: c.role }, offers: { '@type': 'Offer', price: c.price, priceCurrency: 'TWD', availability: 'https://schema.org/InStock', url: `https://aiclass.tw/course.html?id=${c.id}`, validFrom: '2026-01-01' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: c.rating, bestRating: 5, worstRating: 1, ratingCount: c.students, reviewCount: Math.max(1, Math.round(c.students * 0.08)) }, hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'online', duration: `PT${c.hours}H`, inLanguage: 'zh-TW' }, image: `https://aiclass.tw/${img(c)}`, inLanguage: 'zh-TW' },
      { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: '首頁', item: 'https://aiclass.tw/' }, { '@type': 'ListItem', position: 2, name: cat.name, item: `https://aiclass.tw/category.html?cat=${c.cat}` }, { '@type': 'ListItem', position: 3, name: c.title }] },
      { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: courseFaq.map(f => ({ '@type': 'Question', name: f[0], acceptedAnswer: { '@type': 'Answer', text: f[1] } })) }
    ]
  });

  const box = $('.c-video'), v = $('video', box);
  $('.play', box).onclick = () => { v.play(); box.classList.add('playing'); };
  v.onclick = () => { v.paused ? v.play() : v.pause(); };
  if (location.hash === '#preview') setTimeout(() => $('.play', box).click(), 400);
  const buyBtn = $('[data-buy]');
  if (buyBtn) buyBtn.onclick = () => toast('示範網站：尚未串接金流');
  const cartBtn = $('[data-cart]');
  if (cartBtn) cartBtn.onclick = () => { cart.add(c.id); saveCart(); updateCartBadge(); toast('已加入購物車 🛒'); window.trackEvent('add_to_cart', { item_id: c.id, item_name: c.title, value: c.price }); };
  const previewBtn = $('[data-preview]');
  if (previewBtn) previewBtn.onclick = () => {
    const firstLesson = chapters[0]?.lessons[0];
    const ov = document.createElement('div'); ov.className = 'preview-overlay'; ov.setAttribute('role','dialog'); ov.setAttribute('aria-modal','true');
    ov.innerHTML = `<div class="preview-modal"><button class="preview-close" aria-label="關閉">×</button><div class="preview-badge">免費試看</div><video class="preview-video" src="${vid(c)}" poster="${img(c)}" controls autoplay></video><div class="preview-info"><h3>${c.title}</h3><p>${firstLesson ? firstLesson.name : '第一堂課'}</p></div><div class="preview-cta"><p>喜歡這堂課嗎？</p><button class="btn btn-pri preview-buy">以 ${fmt(c.price)} 購買完整課程</button></div></div>`;
    document.body.append(ov);
    requestAnimationFrame(() => requestAnimationFrame(() => ov.classList.add('on')));
    const closeP = () => { ov.querySelector('video')?.pause(); ov.classList.remove('on'); setTimeout(() => ov.remove(), 300); };
    ov.querySelector('.preview-close').onclick = closeP;
    ov.onclick = e => { if (e.target === ov) closeP(); };
    ov.querySelector('.preview-buy').onclick = () => { closeP(); cart.add(c.id); saveCart(); updateCartBadge(); toast('已加入購物車 🛒'); };
    document.addEventListener('keydown', function esc(e) { if (e.key === 'Escape') { closeP(); document.removeEventListener('keydown', esc); } });
    trapFocus(ov);
    trackEvent('course_preview', { item_id: c.id, item_name: c.title });
  };
  const copyBtn = $('[data-copy-link]');
  if (copyBtn) copyBtn.onclick = () => { navigator.clipboard.writeText(location.href); const orig = copyBtn.textContent; copyBtn.textContent = '✓ 已複製！'; copyBtn.classList.add('copied'); setTimeout(() => { copyBtn.textContent = orig; copyBtn.classList.remove('copied'); }, 1500); toast('已複製課程連結，可以貼給朋友', 'success'); window.trackEvent('share', { method: 'copy_link', content_type: 'course', item_id: c.id }); };
  const nativeShare = $('[data-native-share]');
  if (nativeShare) nativeShare.onclick = () => navigator.share({ title: c.title + '｜AI Class', url: location.href }).then(() => window.trackEvent('share', { method: 'native', content_type: 'course', item_id: c.id })).catch(() => {});
  const giftBtn = $('[data-gift]');
  if (giftBtn) giftBtn.onclick = () => {
    const ov = document.createElement('div'); ov.className = 'gift-overlay'; ov.setAttribute('role','dialog'); ov.setAttribute('aria-modal','true'); ov.setAttribute('aria-label','贈送課程');
    ov.innerHTML = `<div class="gift-modal"><button class="gift-close" aria-label="關閉">×</button><h2>🎁 贈送此課程</h2><div class="gift-course"><img src="${img(c)}" alt="${c.title}"><div><b>${c.title}</b><span>${c.teacher}・${fmt(c.price)}</span></div></div><div class="gift-form"><label>收禮人姓名 <span class="gift-req">*</span></label><input class="gift-input" id="gift-name" placeholder="請輸入收禮人姓名" aria-required="true"><label>收禮人 Email <span class="gift-req">*</span></label><input class="gift-input" id="gift-email" type="email" placeholder="example@mail.com" aria-required="true"><label>祝福訊息（選填）</label><textarea class="gift-input gift-msg" id="gift-msg" placeholder="寫一段話送給對方..." rows="3"></textarea></div><div class="gift-total"><span>贈送金額</span><b>${fmt(c.price)}</b></div><button class="btn btn-pri gift-submit" style="width:100%">確認贈送 →</button><p class="gift-note">付款完成後，對方會收到一封包含課程兌換連結的 Email</p></div>`;
    document.body.append(ov);
    requestAnimationFrame(() => { requestAnimationFrame(() => ov.classList.add('on')); $('#gift-name', ov).focus(); });
    const close = () => { ov.classList.remove('on'); setTimeout(() => ov.remove(), 300); };
    $('.gift-close', ov).onclick = close;
    ov.onclick = e => { if (e.target === ov) close(); };
    document.addEventListener('keydown', function esc(e) { if (e.key === 'Escape') { close(); document.removeEventListener('keydown', esc); } });
    trapFocus(ov);
    $('.gift-submit', ov).onclick = () => {
      const name = $('#gift-name', ov).value.trim(), email = $('#gift-email', ov).value.trim();
      if (!name) { toast('請輸入收禮人姓名', 'error'); $('#gift-name', ov).focus(); return; }
      if (!email || !email.includes('@')) { toast('請輸入有效的 Email', 'error'); $('#gift-email', ov).focus(); return; }
      close(); toast('示範網站：贈送功能開發中，感謝你的心意！', 'info');
      window.trackEvent('gift_course', { item_id: c.id, item_name: c.title });
    };
  };
  $$('.chap>button').forEach(b => {
    b.onclick = () => {
      const ch = b.parentNode;
      const isOpen = ch.classList.contains('open');
      ch.classList.toggle('open');
      b.querySelector('.chap-count').textContent = ch.querySelector('.a ul').children.length + ' 堂 ' + (isOpen ? '＋' : '－');
    };
  });
  const toggleAllBtn = $('#curri-toggle-all', main);
  if (toggleAllBtn) {
    toggleAllBtn.onclick = () => {
      const chaps = $$('.chap', main);
      const allOpen = chaps.every(ch => ch.classList.contains('open'));
      chaps.forEach(ch => {
        ch.classList.toggle('open', !allOpen);
        const cnt = ch.querySelector('.chap-count');
        if (cnt) cnt.textContent = ch.querySelector('.a ul').children.length + ' 堂 ' + (allOpen ? '＋' : '－');
      });
      toggleAllBtn.textContent = allOpen ? '展開全部' : '收合全部';
    };
  }
  // Curriculum search
  const curriInput = $('#curri-search-input', main);
  if (curriInput) {
    curriInput.oninput = () => {
      const q = curriInput.value.trim().toLowerCase();
      const chaps = $$('.chap', main);
      const resultEl = $('#curri-search-result', main);
      if (!q) { chaps.forEach(ch => { ch.classList.remove('curri-hidden'); $$('li', ch).forEach(li => { const sp = li.querySelector('span'); if (sp) sp.innerHTML = sp.textContent; }); }); if (resultEl) resultEl.textContent = ''; return; }
      let matchCount = 0;
      chaps.forEach(ch => {
        let found = false;
        $$('li', ch).forEach(li => {
          const sp = li.querySelector('span');
          if (!sp) return;
          const txt = sp.textContent;
          if (txt.toLowerCase().includes(q)) { found = true; matchCount++; sp.innerHTML = txt.replace(new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')})`, 'gi'), '<mark class="lesson-hl">$1</mark>'); }
          else { sp.innerHTML = txt; }
        });
        const title = ch.querySelector('.plr-ch-name, button > span')?.textContent || '';
        if (title.toLowerCase().includes(q)) { found = true; matchCount++; }
        ch.classList.toggle('curri-hidden', !found);
        if (found) ch.classList.add('open');
      });
      if (resultEl) resultEl.textContent = matchCount ? `找到 ${matchCount} 個符合的結果` : '沒有找到相關內容';
    };
  }
  $$('.chap-free').forEach(em => {
    const li = em.closest('li');
    if (li) li.style.cursor = 'pointer';
    if (li) li.onclick = e => {
      if (e.target.closest('button')) return;
      const box = $('.c-video'), v = $('video', box);
      if (v && box) { v.play(); box.classList.add('playing'); box.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
    };
  });
  $$('.qa button').forEach(b => b.onclick = () => b.parentNode.classList.toggle('open'));
  $$('.rv-vote', main).forEach(btn => btn.onclick = e => {
    e.preventDefault();
    const key = btn.dataset.rv, dir = btn.dataset.dir;
    const row = btn.closest('.rv-helpful');
    if (reviewVotes[key] === dir) { delete reviewVotes[key]; btn.classList.remove('voted'); }
    else { reviewVotes[key] = dir; $$('.rv-vote', row).forEach(b => b.classList.remove('voted')); btn.classList.add('voted'); }
    saveReviewVotes();
    const numEl = row.querySelector('.rv-up-vote .rv-vote-n');
    if (numEl) { const base = +numEl.textContent; numEl.textContent = reviewVotes[key] === 'up' ? base + 1 : base; }
    toast(dir === 'up' ? '感謝你的回饋！' : '已記錄');
  });

  // Load more reviews
  const rvMoreBtn = $('#rv-load-more', main);
  if (rvMoreBtn) {
    rvMoreBtn.onclick = () => {
      $$('.rv-hidden', main).forEach(el => { el.classList.remove('rv-hidden'); el.classList.add('in'); });
      rvMoreBtn.remove();
    };
  }

  // Review sort
  const rvList = $('#review-list', main);
  if (rvList) {
    const sortReviews = (sortBy) => {
      const items = [...rvList.querySelectorAll('.review-item')];
      items.sort((a, b) => {
        if (sortBy === 'newest') return b.dataset.date.localeCompare(a.dataset.date);
        if (sortBy === 'highest') return (+b.dataset.rating) - (+a.dataset.rating);
        if (sortBy === 'lowest') return (+a.dataset.rating) - (+b.dataset.rating);
        return (+b.dataset.helpful) - (+a.dataset.helpful);
      });
      items.forEach(el => rvList.appendChild(el));
    };
    $$('.rv-sort-btn', main).forEach(btn => btn.onclick = () => {
      $$('.rv-sort-btn', main).forEach(b => b.classList.remove('on'));
      btn.classList.add('on');
      sortReviews(btn.dataset.sort);
    });
    // Star filter
    let activeStarFilter = 0;
    const filterStatus = $('#rv-filter-status', main);
    const filterTxt = $('#rv-filter-txt', main);
    const filterClear = $('#rv-filter-clear', main);
    $$('.rv-star-filter', main).forEach(bar => {
      const handler = () => {
        const star = +bar.dataset.star;
        if (activeStarFilter === star) { activeStarFilter = 0; }
        else { activeStarFilter = star; }
        $$('.rv-star-filter', main).forEach(b => b.classList.toggle('active', +b.dataset.star === activeStarFilter));
        const items = rvList.querySelectorAll('.review-item');
        let visible = 0;
        items.forEach(el => {
          const show = !activeStarFilter || +el.dataset.rating === activeStarFilter;
          el.style.display = show ? '' : 'none';
          if (show) visible++;
        });
        if (activeStarFilter) {
          filterStatus.style.display = '';
          filterTxt.textContent = `顯示 ${activeStarFilter} 星評價（${visible} 則）`;
        } else {
          filterStatus.style.display = 'none';
        }
      };
      bar.onclick = handler;
      bar.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handler(); } };
    });
    if (filterClear) filterClear.onclick = () => {
      activeStarFilter = 0;
      $$('.rv-star-filter', main).forEach(b => b.classList.remove('active'));
      rvList.querySelectorAll('.review-item').forEach(el => el.style.display = '');
      filterStatus.style.display = 'none';
    };
  }

  bindCards(main); bindRail($('#more'));

  // 分頁 scrollspy + smooth scroll on click
  const tabs = $$('.tabs a'), secs = tabs.map(a => $(a.getAttribute('href')));
  tabs.forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    const target = $(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }));
  addEventListener('scroll', rafThrottle(() => {
    let n = 0; secs.forEach((s, i) => { if (s.getBoundingClientRect().top < 180) n = i; });
    tabs.forEach((a, i) => a.classList.toggle('on', i === n));
  }), { passive: true });

  // Reading progress bar
  const progBar = document.createElement('div'); progBar.className = 'c-read-prog';
  document.body.append(progBar);
  addEventListener('scroll', rafThrottle(() => {
    const h = document.documentElement.scrollHeight - innerHeight;
    progBar.style.width = h > 0 ? (scrollY / h * 100) + '%' : '0';
  }), { passive: true });

  // Sticky purchase bar (all viewports)
  if (!isOwned) {
    const sbar = document.createElement('div'); sbar.className = 'sticky-buy';
    const disc = pct(c);
    sbar.innerHTML = `<div class="wrap"><div class="sticky-buy-info"><img class="sticky-buy-thumb" src="${img(c)}" alt="${c.title}"><span class="sticky-buy-title">${c.title}</span></div><span class="sticky-buy-origin">${fmt(c.origin)}</span><span class="sticky-buy-price">${fmt(c.price)}</span><span class="sb-disc">-${disc}%</span><button class="btn btn-ghost sticky-cart-btn"><span class="sb-cart-txt">加入購物車</span><span class="sb-cart-ok" hidden>✓ 已加入</span></button><button class="btn btn-pri sticky-buy-btn"><span class="sb-buy-full">立即購買</span><span class="sb-buy-short">購買</span></button></div>`;
    document.body.append(sbar);
    const buyAside = $('.buy');
    addEventListener('scroll', rafThrottle(() => { sbar.classList.toggle('show', buyAside.getBoundingClientRect().bottom < 0); }), { passive: true });
    $('.sticky-buy-btn', sbar).onclick = () => toast('示範網站：尚未串接金流');
    const sbCartBtn = $('.sticky-cart-btn', sbar);
    sbCartBtn.onclick = () => {
      cart.add(c.id); saveCart(); updateCartBadge();
      const txt = $('.sb-cart-txt', sbCartBtn), ok = $('.sb-cart-ok', sbCartBtn);
      txt.hidden = true; ok.hidden = false; sbCartBtn.classList.add('sb-added');
      setTimeout(() => { txt.hidden = false; ok.hidden = true; sbCartBtn.classList.remove('sb-added'); }, 1500);
      toast('已加入購物車 🛒', 'success');
    };
  }

  // Social proof popups
  if (!isOwned) {
    const names = ['台北的學員','新竹的學員','台中的學員','高雄的學員','台南的學員','桃園的學員'];
    const actions = ['剛剛購買了這堂課','把這堂課加入了購物車','正在觀看這堂課'];
    let spTimer;
    const showSP = () => {
      const name = names[Math.floor(Math.random() * names.length)];
      const action = actions[Math.floor(Math.random() * actions.length)];
      toast(`📍 ${name}${action}`, 'info');
      spTimer = setTimeout(showSP, 15000 + Math.random() * 20000);
    };
    spTimer = setTimeout(showSP, 8000 + Math.random() * 7000);
    addEventListener('beforeunload', () => clearTimeout(spTimer));
  }

  bindNotes(c.id, main);
  bindUserReview(c.id, main);

  // Q&A bindings
  const qaSubmit = $('.qa-submit', main);
  if (qaSubmit) qaSubmit.onclick = () => {
    const ta = $('.qa-input', main), txt = ta.value.trim();
    if (!txt) { toast('請輸入問題內容'); return; }
    const list = $('.qa-list', main);
    const item = document.createElement('div'); item.className = 'qa-item rv-up in';
    item.innerHTML = `<div class="qa-item-head"><div class="qa-avatar">學</div><div class="qa-meta"><b>學員</b><span>剛剛</span></div></div><p class="qa-question">${escH(txt)}</p><div class="qa-answer"><div class="qa-answer-head"><span class="qa-teacher-badge">講師</span><b>${c.teacher}</b></div><p>謝謝你的提問！我會在 24 小時內回覆，請稍候。</p></div><div class="qa-actions"><button class="qa-like"><span class="qa-like-icon">👍</span> <span class="qa-like-num">0</span></button><span class="qa-reply-count">0 則回覆</span></div>`;
    list.prepend(item); ta.value = ''; toast('問題已送出，講師將盡快回覆');
    reveal(list);
  };
  main.addEventListener('click', e => {
    const like = e.target.closest('.qa-like');
    if (!like) return;
    like.classList.toggle('liked');
    const num = like.querySelector('.qa-like-num');
    const cur = parseInt(num.textContent);
    num.textContent = like.classList.contains('liked') ? cur + 1 : cur - 1;
  });
  $$('.qa-sort-btn', main).forEach(btn => btn.onclick = () => {
    $$('.qa-sort-btn', main).forEach(b => b.classList.toggle('on', b === btn));
    const list = $('.qa-list', main);
    const items = [...list.querySelectorAll('.qa-item')];
    if (btn.dataset.qsort === 'hot') items.sort((a,b) => parseInt(b.querySelector('.qa-like-num')?.textContent||0) - parseInt(a.querySelector('.qa-like-num')?.textContent||0));
    else items.reverse();
    items.forEach(it => list.appendChild(it));
  });

  bindCards(main); // for smart recommend rail
  const srRail = $('.sr-sec .rail'); if (srRail) bindRail($('.sr-sec'));

  // 記錄最近瀏覽
  const recentView = ls('aic-recent-view', []).filter(id => id !== c.id);
  recentView.unshift(c.id);
  ss('aic-recent-view', recentView.slice(0, 20));

  // 課程進度 checkboxes + progress bar
  const prog = getCourseProg(c.id);
  const curriBarFill = $('.curri-bar-fill', main);
  const curriBarTxt = $('.curri-bar-txt', main);
  const sideProgFill = $('#side-prog-fill');
  const sideProgTxt = $('#side-prog-txt');
  const sideRemain = $('#side-remain');
  const updateCurriBar = () => {
    const p = getCourseProg(c.id);
    const done = p.done.length;
    const pctVal = totalLessonCount > 0 ? Math.round(done / totalLessonCount * 100) : 0;
    if (curriBarFill) curriBarFill.style.width = pctVal + '%';
    if (curriBarTxt) curriBarTxt.textContent = `${done} / ${totalLessonCount} 堂已完成（${pctVal}%）`;
    if (sideProgFill) sideProgFill.style.width = pctVal + '%';
    if (sideProgTxt) sideProgTxt.textContent = `${pctVal}% 完成（${done}/${totalLessonCount}）`;
    if (sideRemain) { const remain = totalLessonCount - done; if (remain > 0) { const remMin = Math.round(remain * c.hours * 60 / totalLessonCount); sideRemain.textContent = `⏱ 預估剩餘 ${remMin >= 60 ? Math.floor(remMin/60) + ' 小時 ' + (remMin%60) + ' 分鐘' : remMin + ' 分鐘'}`; sideRemain.className = 'c-remain-time'; } else { sideRemain.textContent = '🎉 已完成全部課程！'; sideRemain.className = 'c-remain-time c-done-badge'; } }
    $$('.chap-done-all', main).forEach(btn => { const ci = +btn.dataset.chap; const chLessons = chapters[ci].lessons; const allDone = chLessons.every((_, j) => p.done.includes(`${ci}-${j}`)); btn.textContent = allDone ? '☑ 已完成' : '☐ 全完成'; btn.classList.toggle('checked', allDone); });
  };
  updateCurriBar();
  $$('.chap', main).forEach((chEl, ci) => {
    $$('li', chEl).forEach((li, li2) => {
      const key = `${ci}-${li2}`;
      const cb = document.createElement('input');
      cb.type = 'checkbox'; cb.className = 'lesson-cb'; cb.checked = prog.done.includes(key);
      cb.onchange = () => { if (cb.checked) markLesson(c.id, ci, li2); else if (progress[c.id]) { progress[c.id].done = progress[c.id].done.filter(k => k !== key); saveProgress(); } updateCurriBar(); };
      li.querySelector('span').prepend(cb);
    });
  });
  $$('.chap-done-all', main).forEach(btn => {
    btn.onclick = (e) => { e.preventDefault(); e.stopPropagation(); const ci = +btn.dataset.chap; if (!progress[c.id]) progress[c.id] = { done: [], lastAt: 0 }; const p = progress[c.id]; const chLessons = chapters[ci].lessons; const allDone = chLessons.every((_, j) => p.done.includes(`${ci}-${j}`));
      if (allDone) { chLessons.forEach((_, j) => { p.done = p.done.filter(k => k !== `${ci}-${j}`); }); } else { chLessons.forEach((_, j) => { const key = `${ci}-${j}`; if (!p.done.includes(key)) p.done.push(key); }); p.lastAt = Date.now(); }
      saveProgress(); $$('.lesson-cb', $$('.chap', main)[ci]).forEach((cb, j) => { cb.checked = !allDone; }); updateCurriBar(); toast(allDone ? '已取消本章完成標記' : `第 ${ci+1} 章已全部標記完成 ✓`); };
  });

  // Tab 鍵盤導航（左右箭頭）
  const tabNav = $('.tabs', main);
  if (tabNav) { const tabLinks = $$('a', tabNav); tabNav.addEventListener('keydown', e => { if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return; const cur = tabLinks.findIndex(a => a.classList.contains('on')); let next = cur; if (e.key === 'ArrowRight') next = (cur + 1) % tabLinks.length; else next = (cur - 1 + tabLinks.length) % tabLinks.length; tabLinks[next].click(); tabLinks[next].focus(); e.preventDefault(); }); tabLinks.forEach(a => { a.setAttribute('tabindex', '0'); a.setAttribute('role', 'tab'); }); tabNav.setAttribute('role', 'tablist'); }
}

/* ---------- 活動頁 ---------- */
function eventPage() {
  seo({ title: '限時活動｜AI Class', desc: '限時優惠活動，搶購精選課程享超值折扣', url: 'https://aiclass.tw/event.html' });
  const main = $('main');
  const bfDeadline = new Date('2026-11-23T23:59:59').getTime();
  const featured = C.filter(c => c.tag === 'HOT' || c.tag === 'BEST').slice(0, 8);
  const coupons = [
    { code: 'BF2026ALL', desc: '全站課程 85 折', detail: '不限金額，全站適用', color: '#ff2d55' },
    { code: 'BF2026NEW', desc: '新課程 8 折', detail: '限 11 月新上架課程', color: '#ff6b35' },
    { code: 'BF2026DUO', desc: '兩堂再折 NT$500', detail: '購買任意兩堂以上', color: '#a855f7' },
    { code: 'BF2026VIP', desc: '加碼 VIP 7 折', detail: '限前 100 名', color: '#06b6d4' }
  ];
  main.innerHTML = `
  <section class="ev-hero">
    <div class="ev-particles"></div>
    <div class="ev-hero-inner">
      <div class="crumb" style="color:rgba(255,255,255,.7)"><a href="index.html" style="color:rgba(255,255,255,.7)">首頁</a> › 限時活動</div>
      <div class="ev-eyebrow">AI Class 年度最大優惠</div>
      <h1 class="ev-title">BLACK<br>FRIDAY</h1>
      <p class="ev-sub">全站課程最低 5 折起・限時搶購倒數中</p>
      <span class="ev-status ev-status-live">🟢 活動進行中</span>
      <div class="ev-countdown" id="bf-cd">
        <div class="ev-cd-item"><span class="ev-cd-num" data-bf-d>00</span><span class="ev-cd-label">天</span></div>
        <div class="ev-cd-sep">:</div>
        <div class="ev-cd-item"><span class="ev-cd-num" data-bf-h>00</span><span class="ev-cd-label">時</span></div>
        <div class="ev-cd-sep">:</div>
        <div class="ev-cd-item"><span class="ev-cd-num" data-bf-m>00</span><span class="ev-cd-label">分</span></div>
        <div class="ev-cd-sep">:</div>
        <div class="ev-cd-item"><span class="ev-cd-num" data-bf-s>00</span><span class="ev-cd-label">秒</span></div>
      </div>
    </div>
  </section>

  <section class="ev-benefits">
    <div class="wrap">
      <h2 class="ev-sec-title rv-up">四大優惠一次享</h2>
      <div class="ev-benefit-grid">
        <div class="ev-benefit rv-up" style="--bc:#ff2d55"><div class="ev-benefit-icon">🎲</div><h3>RANDOM COUPON</h3><p>隨機折扣券</p><span>最高折 NT$3,000</span></div>
        <div class="ev-benefit rv-up" style="--bc:#ff6b35"><div class="ev-benefit-icon">⭐</div><h3>BONUS POINT</h3><p>雙倍學習點數</p><span>活動期間點數加倍</span></div>
        <div class="ev-benefit rv-up" style="--bc:#a855f7"><div class="ev-benefit-icon">🏆</div><h3>1ST PRIZE</h3><p>頭獎抽 iPad</p><span>消費滿 NT$3,000 即可抽</span></div>
        <div class="ev-benefit rv-up" style="--bc:#06b6d4"><div class="ev-benefit-icon">🎯</div><h3>BLACK POINT</h3><p>黑色星期五限定點數</p><span>可折抵下次消費</span></div>
      </div>
    </div>
  </section>

  <section class="ev-coupons">
    <div class="wrap">
      <h2 class="ev-sec-title rv-up">限量優惠券</h2>
      <div class="ev-coupon-grid">
        ${coupons.map(cp => `<div class="ev-coupon rv-up" style="--cc:${cp.color}">
          <div class="ev-coupon-left"><div class="ev-coupon-desc">${cp.desc}</div><div class="ev-coupon-detail">${cp.detail}</div></div>
          <div class="ev-coupon-right"><div class="ev-coupon-code">${cp.code}</div><button class="ev-coupon-btn" onclick="navigator.clipboard.writeText('${cp.code}');toast('已複製優惠碼 🎉')">領取</button></div>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <section class="ev-featured">
    <div class="wrap">
      <h2 class="ev-sec-title rv-up">精選優惠課程</h2>
      <div class="ev-course-grid">
        ${featured.map((c, i) => `<a class="ev-course rv-up" href="course.html?id=${c.id}" style="transition-delay:${(i%4)*80}ms">
          <div class="ev-course-thumb"><img src="${img(c)}" alt="${c.title}" loading="lazy" decoding="async">${c.tag ? `<span class="badge ${c.tag}">${c.tag}</span>` : ''}</div>
          <div class="ev-course-info"><div class="teacher">${c.teacher}</div><h3>${c.title}</h3>
          <div class="price"><span class="off">${pct(c)}%</span><span class="now">${fmt(c.price)}</span><del>${fmt(c.origin)}</del></div></div>
        </a>`).join('')}
      </div>
    </div>
  </section>

  <div class="ev-sticky-bar">
    <div class="wrap" style="display:flex;align-items:center;justify-content:space-between">
      <div><b>BLACK FRIDAY</b> 全站最低 5 折｜倒數中</div>
      <a class="btn btn-pri" href="#bf-cd" style="height:40px;font-size:14px">立即搶購 →</a>
    </div>
  </div>`;

  function tickBF() {
    const left = Math.max(0, bfDeadline - Date.now());
    const d = Math.floor(left / 864e5), h = Math.floor(left / 36e5) % 24, m = Math.floor(left / 6e4) % 60, s = Math.floor(left / 1e3) % 60;
    const p = n => String(n).padStart(2, '0');
    const el = id => $(`[data-bf-${id}]`);
    if (el('d')) el('d').textContent = p(d);
    if (el('h')) el('h').textContent = p(h);
    if (el('m')) el('m').textContent = p(m);
    if (el('s')) el('s').textContent = p(s);
  }
  tickBF(); setInterval(tickBF, 1000);

  // particles
  const pc = $('.ev-particles');
  for (let i = 0; i < 30; i++) {
    const dot = document.createElement('span');
    dot.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*100}%;animation-delay:${Math.random()*5}s;animation-duration:${3+Math.random()*4}s;width:${2+Math.random()*4}px;height:${2+Math.random()*4}px`;
    pc.append(dot);
  }

  reveal(main);
  bindCards(main);
}

/* ---------- 購物車頁 ---------- */
function cartPage() {
  seo({ title: '購物車｜AI Class', desc: '查看你的購物車，完成結帳開始學習', url: 'https://aiclass.tw/cart.html' });
  const main = $('main');
  function render() {
    const items = [...cart].map(id => byId[id]).filter(Boolean);
    const total = items.reduce((s, c) => s + c.price, 0);
    const saved = items.reduce((s, c) => s + (c.origin - c.price), 0);
    const cartCats = new Set(items.map(c => c.cat));
    const recommended = C.filter(c => !cart.has(c.id) && cartCats.has(c.cat)).slice(0, 4).concat(C.filter(c => !cart.has(c.id) && !cartCats.has(c.cat))).slice(0, 4);

    if (!items.length) {
      main.innerHTML = `<div class="wrap" style="padding:80px 0"><div class="cart-empty">
        <div class="empty-illus"><svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="30" y="50" width="100" height="80" rx="12" stroke="var(--tx3)" stroke-width="2" fill="var(--bg2)"/><path d="M30 70 L80 45 L130 70" stroke="var(--tx3)" stroke-width="2" fill="none"/><circle cx="80" cy="90" r="16" stroke="var(--pri)" stroke-width="2" stroke-dasharray="4 3" fill="none"/><path d="M74 90h12M80 84v12" stroke="var(--pri)" stroke-width="2" stroke-linecap="round"/></svg></div>
        <h2>購物車是空的</h2>
        <p>探索超過 ${C.length} 堂職人課程，找到適合你的學習方向</p>
        <a class="btn btn-pri" href="index.html">探索課程 →</a>
      </div></div>
      ${recommended.length ? `<div class="wrap"><h2 style="font-size:22px;font-weight:900;margin-bottom:20px">為你推薦</h2><div class="cart-recommend">${recommended.map((c, i) => card(c, i)).join('')}</div></div>` : ''}`;
      bindCards(main);
      reveal(main);
      return;
    }

    main.innerHTML = `<div class="wrap" style="padding:40px 0">
      <div class="crumb" style="margin-bottom:16px"><a href="index.html">首頁</a> › 購物車</div>
      <h1 style="font-size:28px;font-weight:900;margin-bottom:28px">購物車 <span style="color:var(--tx3);font-size:18px">(${items.length})</span></h1>
      <div class="cart-layout">
        <div class="cart-items">
          <div class="cart-select-all"><label><input type="checkbox" checked class="cart-cb" data-all> 全選</label></div>
          ${items.map(c => `<div class="cart-item" data-cid="${c.id}">
            <input type="checkbox" checked class="cart-cb" data-item="${c.id}">
            <a href="course.html?id=${c.id}" class="cart-item-thumb"><img src="${img(c)}" alt="${c.title}" loading="lazy"></a>
            <div class="cart-item-info">
              <a href="course.html?id=${c.id}"><h3>${c.title}</h3></a>
              <div class="teacher">${c.teacher}・${c.role}</div>
              <div class="stars"><b>★ ${c.rating.toFixed(1)}</b>・${c.hours} 小時</div>
            </div>
            <div class="cart-item-price">
              <div class="now">${fmt(c.price)}</div>
              <del>${fmt(c.origin)}</del>
              <span class="off">${pct(c)}% OFF</span>
            </div>
            <button class="cart-item-del" data-del="${c.id}" title="移除" aria-label="移除 ${c.title}">✕</button>
          </div>`).join('')}
        </div>
        <aside class="cart-summary">
          <h3>訂單摘要</h3>
          <div class="cart-summary-row"><span>商品小計 (<span class="cart-count">${items.length}</span> 件)</span><span class="cart-subtotal">${fmt(total)}</span></div>
          <div class="cart-summary-row cart-saved"><span>已省下</span><span>-${fmt(saved)}</span></div>
          <div class="cart-summary-row" style="font-size:13px;color:var(--tx3)"><span>優惠碼折扣</span><span>—</span></div>
          <div class="cart-summary-divider"></div>
          <div class="cart-summary-row cart-total"><span>合計</span><span>${fmt(total)}</span></div>
          <a class="btn btn-pri" href="checkout.html" style="display:flex;align-items:center;justify-content:center;width:100%;height:52px;font-size:16px;margin-top:16px;text-decoration:none">前往結帳</a>
          <div class="cart-coupon-input"><input placeholder="輸入優惠碼" aria-label="優惠碼"><button onclick="toast('示範網站：優惠碼功能開發中')">套用</button></div>
          <ul class="cart-perks"><li>✓ 7 天無條件退費</li><li>✓ 無限期觀看</li><li>✓ 附講師專案檔</li></ul>
        </aside>
      </div>
    </div>
    ${recommended.length ? `<div class="wrap" style="padding-bottom:60px"><h2 style="font-size:22px;font-weight:900;margin-bottom:20px">你可能也會喜歡</h2><div class="cart-recommend">${recommended.map((c, i) => card(c, i)).join('')}</div></div>` : ''}`;

    // delete
    $$('[data-del]', main).forEach(b => b.onclick = () => {
      cart.delete(b.dataset.del); saveCart(); updateCartBadge(); render();
    });
    // select all
    const allCb = $('[data-all]', main);
    if (allCb) allCb.onchange = () => $$('[data-item]', main).forEach(cb => cb.checked = allCb.checked);

    bindCards(main);
    reveal(main);
  }
  render();
}

/* ---------- 登入頁 ---------- */
function loginPage() {
  seo({ title: '登入 / 註冊｜AI Class', desc: '登入或建立 AI Class 帳號，開始你的學習之旅', url: 'https://aiclass.tw/login.html' });
  const main = $('main');
  const mosaic = C.slice(0, 16).map((c, i) => {
    const size = 60 + Math.random() * 50;
    const x = 5 + (i % 4) * 24 + Math.random() * 10;
    const y = 5 + Math.floor(i / 4) * 24 + Math.random() * 8;
    const delay = Math.random() * 5;
    const dur = 4 + Math.random() * 3;
    return `<div class="login-circle" style="width:${size}px;height:${size}px;left:${x}%;top:${y}%;animation-delay:${delay}s;animation-duration:${dur}s"><img src="${img(c)}" alt="${c.title}"></div>`;
  }).join('');

  main.innerHTML = `<div class="login-wrap">
    <div class="login-left">${mosaic}</div>
    <div class="login-right">
      <div class="login-form">
        <a href="index.html" class="login-logo"><img src="assets/logo.svg" alt="AI Class" style="height:28px"></a>
        <h1>歡迎回來</h1>
        <p>登入你的 AI Class 帳號，繼續學習之旅</p>
        <div class="login-socials">
          <button class="login-social login-google" onclick="toast('示範網站：Google 登入功能開發中')"><svg viewBox="0 0 24 24" width="20" height="20"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.56c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.77c-.98.66-2.23 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>使用 Google 帳號登入</button>
          <button class="login-social login-line" onclick="toast('示範網站：LINE 登入功能開發中')"><svg viewBox="0 0 24 24" width="20" height="20" fill="#fff"><path d="M12 2C6.48 2 2 5.88 2 10.54c0 4.02 3.56 7.38 8.37 8.26.32.07.76.22.87.5.1.26.07.66.03.92l-.14.85c-.04.26-.2 1.01.88.55s5.89-3.47 8.03-5.93C21.94 13.54 22 11.92 22 10.54 22 5.88 17.52 2 12 2z"/></svg>使用 LINE 帳號登入</button>
          <button class="login-social login-apple" onclick="toast('示範網站：Apple 登入功能開發中')"><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>使用 Apple 帳號登入</button>
        </div>
        <div class="login-divider"><span>或使用 Email</span></div>
        <div class="login-field"><label>Email</label><input type="email" placeholder="your@email.com"></div>
        <div class="login-field"><label>密碼</label><input type="password" placeholder="輸入密碼"></div>
        <div class="login-options"><label><input type="checkbox"> 記住我</label><a href="#">忘記密碼？</a></div>
        <button class="btn btn-pri login-submit" id="login-go">登入</button>
        <div class="login-footer">還沒有帳號？<a href="#" id="login-toggle">Email 註冊</a></div>
      </div>
    </div>
  </div>`;

  $('#login-go', main).onclick = () => {
    const email = $('input[type="email"]', main).value.trim();
    const pass = $('input[type="password"]', main).value;
    if (!email || !email.includes('@')) { toast('請輸入有效的 Email'); return; }
    if (!pass) { toast('請輸入密碼'); return; }
    const name = email.split('@')[0].replace(/[^a-zA-Z一-鿿]/g, '') || '學員';
    ss('aic-user', { name, email });
    toast(`歡迎回來，${name}！`);
    setTimeout(() => location.href = 'index.html', 800);
  };

  const toggleLink = $('#login-toggle', main);
  if (toggleLink) toggleLink.onclick = e => {
    e.preventDefault();
    const h1 = $('h1', main), p = $('h1+p', main), footer = $('.login-footer', main), submit = $('#login-go', main);
    const isLogin = h1.textContent === '歡迎回來';
    h1.textContent = isLogin ? '建立帳號' : '歡迎回來';
    p.textContent = isLogin ? '免費註冊，開始你的學習之旅' : '登入你的 AI Class 帳號，繼續學習之旅';
    submit.textContent = isLogin ? '免費註冊' : '登入';
    footer.innerHTML = isLogin ? '已有帳號？<a href="#" id="login-toggle">返回登入</a>' : '還沒有帳號？<a href="#" id="login-toggle">Email 註冊</a>';
    const newToggle = $('#login-toggle', main);
    if (newToggle) newToggle.onclick = toggleLink.onclick;
  };

  reveal(main);
}

/* ---------- 企業培訓行銷頁 ---------- */
function enterprisePage() {
  const main = $('main');
  seo({ title: '企業方案｜AI Class', desc: 'AI Class 企業培訓方案，客製化課程與團隊管理', url: 'https://aiclass.tw/enterprise.html' });
  const features = [
    { icon: '🎯', title: '客製化課程', desc: '根據企業需求量身打造培訓內容，涵蓋 AI、設計、行銷、管理等領域。' },
    { icon: '📊', title: '學習數據追蹤', desc: '即時掌握每位員工的學習進度、完成率、測驗成績，讓培訓效果可視化。' },
    { icon: '🏢', title: '專屬企業帳號', desc: '統一管理企業帳號，批量新增員工、設定權限、分配課程。' },
    { icon: '📹', title: '企業影片託管', desc: '上傳公司內部培訓影片，建立專屬影音知識庫，永久保存。' },
    { icon: '🏆', title: '證書與認證', desc: '員工完成課程後自動頒發證書，支援客製化企業 LOGO 與樣式。' },
    { icon: '💬', title: '專屬客服支援', desc: '一對一專屬客服經理，協助規劃培訓方案，隨時解決問題。' }
  ];
  const steps = [
    { num: '01', title: '需求諮詢', desc: '與專屬顧問深入討論企業培訓目標與需求' },
    { num: '02', title: '方案規劃', desc: '量身打造最適合的課程組合與學習路徑' },
    { num: '03', title: '帳號開通', desc: '快速建立企業專屬培訓平台，批量匯入員工' },
    { num: '04', title: '持續優化', desc: '定期檢視學習數據，調整培訓策略以達最佳效果' }
  ];
  const plans = [
    { name: '入門方案', price: '免費', unit: '', desc: '適合小型團隊體驗', features: ['最多 5 位員工', '精選 10 堂課程', '基礎學習報表', '社群支援'], cta: '免費開始', ghost: true },
    { name: '專業方案', price: 'NT$2,980', unit: '/月', desc: '適合中小型企業', features: ['最多 50 位員工', '全站所有課程', '進階數據分析', '企業影片上傳 50GB', '專屬客服', '客製化證書'], cta: '立即訂閱', ghost: false },
    { name: '旗艦方案', price: '聯繫我們', unit: '', desc: '適合大型企業', features: ['無限員工帳號', '全站課程 + 客製課程', '完整 API 串接', '無限影片儲存空間', '專屬客服經理', '到府教育訓練', 'SSO 企業登入'], cta: '預約諮詢', ghost: true }
  ];
  const testimonials = [
    { company: '科技新創 A 公司', role: '人資總監', text: '導入 AI Class 企業培訓後，員工技能提升速度快了 3 倍，離職率也下降了 20%。', name: '陳經理' },
    { company: '知名設計公司', role: '執行長', text: '客製化的課程內容完全貼合我們的需求，團隊設計能力有了質的飛躍。', name: '林總監' },
    { company: '金融集團', role: '教育訓練處長', text: '學習數據分析讓我們能精準掌握每位同仁的成長軌跡，培訓 ROI 提升了 150%。', name: '王處長' }
  ];
  const faqs = [
    ['企業方案最少需要幾位員工？', '入門方案最少 1 位即可開始，專業方案建議 10 位以上以獲得最佳效益。'],
    ['可以先試用再決定嗎？', '當然！我們提供 14 天免費試用專業方案的所有功能，不需要綁定信用卡。'],
    ['企業影片上傳有格式限制嗎？', '支援 MP4、MOV、AVI 等主流格式，單檔最大 5GB，我們會自動轉檔優化。'],
    ['可以和公司現有的 HR 系統整合嗎？', '旗艦方案提供完整 API，支援 SSO、SCIM 等企業級整合方式。'],
    ['培訓數據可以匯出嗎？', '所有方案都支援 CSV/Excel 匯出，旗艦方案另提供 API 即時存取。'],
    ['合約期間可以調整方案嗎？', '可以隨時升級方案，差額按比例計算。降級則在下個計費週期生效。']
  ];

  main.innerHTML = `
  <section class="ent-hero">
    <div class="ent-hero-bg"></div>
    <div class="wrap ent-hero-inner">
      <div class="crumb rv-up" style="margin-bottom:16px"><a href="index.html">首頁</a> / 企業方案</div>
      <span class="ent-eyebrow rv-up">AI Class for Business</span>
      <h1 class="ent-title rv-up">企業培訓<br>交給 AI Class</h1>
      <p class="ent-sub rv-up">為您的團隊提供業界頂尖的線上培訓方案<br>從 AI 技術到創意設計，全面提升企業競爭力</p>
      <div class="ent-hero-cta rv-up">
        <a class="btn btn-pri" href="#pricing" style="height:52px;padding:0 32px;font-size:17px">查看方案 →</a>
        <a class="btn btn-ghost" href="#contact" style="height:52px;padding:0 32px;font-size:17px">預約諮詢</a>
      </div>
      <div class="ent-hero-stats rv-up">
        <div><b>500+</b><span>企業客戶</span></div>
        <div><b>98%</b><span>續約率</span></div>
        <div><b>150%</b><span>培訓 ROI 提升</span></div>
        <div><b>60,000+</b><span>企業學員</span></div>
      </div>
    </div>
  </section>

  <section class="ent-features" id="features">
    <div class="wrap">
      <h2 class="ent-sec-title rv-up">為什麼選擇 AI Class？</h2>
      <p class="ent-sec-sub rv-up">完整的企業培訓生態系，從課程到管理一站搞定</p>
      <div class="ent-feature-grid">
        ${features.map((f, i) => `<div class="ent-feature rv-up" style="transition-delay:${(i % 3) * 80}ms">
          <div class="ent-feature-icon">${f.icon}</div>
          <h3>${f.title}</h3>
          <p>${f.desc}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <section class="ent-partners">
    <div class="wrap">
      <h2 class="ent-sec-title rv-up">信賴 AI Class 的企業</h2>
      <div class="ent-partner-logos rv-up">${['台積電 TSMC','聯發科 MediaTek','宏碁 Acer','華碩 ASUS','LINE Taiwan','趨勢科技','國泰金控','富邦金控'].map(p => `<span class="ent-partner-logo">${p}</span>`).join('')}</div>
      <p class="ent-sec-sub rv-up" style="margin-top:12px;font-size:14px">以及超過 500 家企業選擇 AI Class 作為培訓夥伴</p>
    </div>
  </section>

  <section class="ent-stats-anim" id="ent-stats-anim">
    <div class="wrap">
      <div class="stats rv-up" id="ent-anim-nums">
        <div class="stat"><b data-count="500" data-suffix="+">0</b><span>企業客戶</span></div>
        <div class="stat"><b data-count="60000" data-suffix="+">0</b><span>企業學員</span></div>
        <div class="stat"><b data-count="98" data-suffix="%">0</b><span>續約率</span></div>
        <div class="stat"><b data-count="150" data-suffix="%">0</b><span>平均 ROI 提升</span></div>
      </div>
    </div>
  </section>

  <section class="ent-steps">
    <div class="wrap">
      <h2 class="ent-sec-title rv-up">四步驟開始企業培訓</h2>
      <div class="ent-step-grid">
        ${steps.map((s, i) => `<div class="ent-step rv-up" style="transition-delay:${i * 100}ms">
          <div class="ent-step-num">${s.num}</div>
          <h3>${s.title}</h3>
          <p>${s.desc}</p>
          ${i < 3 ? '<div class="ent-step-arrow">→</div>' : ''}
        </div>`).join('')}
      </div>
    </div>
  </section>

  <section class="ent-pricing" id="pricing">
    <div class="wrap">
      <h2 class="ent-sec-title rv-up">選擇最適合的方案</h2>
      <p class="ent-sec-sub rv-up">所有方案皆含 14 天免費試用</p>
      <div class="ent-plan-grid">
        ${plans.map((p, i) => `<div class="ent-plan rv-up ${i === 1 ? 'ent-plan-pop' : ''}" style="transition-delay:${i * 100}ms">
          ${i === 1 ? '<div class="ent-plan-badge">最受歡迎</div>' : ''}
          <h3>${p.name}</h3>
          <div class="ent-plan-price"><span class="ent-plan-amount">${p.price}</span>${p.unit ? `<span class="ent-plan-unit">${p.unit}</span>` : ''}</div>
          <p class="ent-plan-desc">${p.desc}</p>
          <ul>${p.features.map(f => `<li>✓ ${f}</li>`).join('')}</ul>
          <button class="btn ${p.ghost ? 'btn-ghost' : 'btn-pri'}" style="width:100%;height:48px" onclick="${i === 2 ? 'openDemoModal()' : "toast('示範網站：方案功能開發中')"}">${p.cta}</button>
        </div>`).join('')}
      </div>
      <div class="ent-compare rv-up" style="margin-top:48px">
        <h3 style="text-align:center;margin-bottom:24px;font-size:18px">方案功能比較</h3>
        <div style="overflow-x:auto">
        <table class="ent-compare-tbl">
          <thead><tr><th>功能</th><th>入門方案</th><th class="ent-pop-col">專業方案</th><th>旗艦方案</th></tr></thead>
          <tbody>
            ${(() => {
              const ck = v => v === '✓' ? '<span style="color:#34c759;font-weight:700">✓</span>' : v === '✗' ? '<span style="color:var(--tx3)">✗</span>' : v;
              return [
              ['員工帳號', '5 人', '50 人', '無限'],
              ['課程存取', '精選 10 堂', '全站 200+', '全站 + 客製'],
              ['學習報表', '✓', '✓', '✓'],
              ['進階數據分析', '✗', '✓', '✓'],
              ['企業影片上傳', '✗', '50GB', '無限'],
              ['客製化證書', '✗', '✓', '✓'],
              ['專屬客服', '社群支援', '✓', '專屬經理'],
              ['API 串接', '✗', '✗', '✓'],
              ['SSO 企業登入', '✗', '✗', '✓'],
              ['到府教育訓練', '✗', '✗', '✓'],
            ].map(r => `<tr><td>${r[0]}</td><td>${ck(r[1])}</td><td class="ent-pop-col">${ck(r[2])}</td><td>${ck(r[3])}</td></tr>`).join('');
            })()}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  </section>

  <section class="ent-testimonials">
    <div class="wrap">
      <h2 class="ent-sec-title rv-up">客戶怎麼說</h2>
      <div class="ent-testi-grid">
        ${testimonials.map((t, i) => `<div class="ent-testi rv-up" style="transition-delay:${i * 80}ms">
          <div class="ent-testi-stars">★★★★★</div>
          <p>"${t.text}"</p>
          <div class="ent-testi-author"><b>${t.name}</b><span>${t.company}・${t.role}</span></div>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <section class="ent-cta" id="contact">
    <div class="wrap">
      <div class="ent-cta-box rv-up">
        <h2>立即開始企業培訓之旅</h2>
        <p>留下聯絡方式，專屬顧問將在 24 小時內與您聯繫</p>
        <div class="ent-cta-form">
          <input type="text" placeholder="公司名稱" aria-label="公司名稱">
          <input type="email" placeholder="Email" aria-label="Email">
          <input type="tel" placeholder="聯絡電話" aria-label="聯絡電話">
          <button class="btn btn-pri" style="height:52px;padding:0 32px" onclick="toast('示範網站：諮詢功能開發中')">預約諮詢 →</button>
        </div>
      </div>
    </div>
  </section>

  <section class="ent-faq">
    <div class="wrap faq">
      <h2 class="ent-sec-title rv-up">常見問題</h2>
      ${faqs.map(q => `<div class="qa rv-up"><button>${q[0]}<i>+</i></button><div class="a"><div><p>${q[1]}</p></div></div></div>`).join('')}
    </div>
  </section>`;

  $$('.qa button', main).forEach(b => b.onclick = () => b.parentNode.classList.toggle('open'));

  // Animated counter for enterprise stats
  const entStats = $('#ent-anim-nums', main);
  if (entStats) {
    const cntObs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      cntObs.disconnect();
      entStats.querySelectorAll('[data-count]').forEach(b => {
        const target = +b.dataset.count, suffix = b.dataset.suffix || '';
        let cur = 0;
        const step = Math.max(1, Math.ceil(target / 45));
        const iv = setInterval(() => {
          cur = Math.min(cur + step, target);
          b.textContent = cur.toLocaleString() + suffix;
          if (cur >= target) clearInterval(iv);
        }, 25);
      });
    }, { threshold: 0.3 });
    cntObs.observe(entStats);
  }

  reveal(main);
}

// Book Demo modal (enterprise)
function openDemoModal() {
  let ov = document.querySelector('.demo-modal-ov');
  if (ov) { ov.hidden = false; ov.querySelector('input')?.focus(); return; }
  ov = document.createElement('div');
  ov.className = 'demo-modal-ov';
  ov.setAttribute('role', 'dialog');
  ov.setAttribute('aria-modal', 'true');
  ov.setAttribute('aria-label', '預約 Demo');
  ov.innerHTML = `<div class="demo-modal">
    <button class="demo-modal-close" aria-label="關閉">&times;</button>
    <h2>預約專屬 Demo</h2>
    <p>填寫以下資訊，我們的企業顧問會在 1 個工作天內與您聯繫，安排專屬產品展示。</p>
    <form class="demo-form" onsubmit="event.preventDefault();toast('已收到您的預約申請，顧問將盡快聯繫！','success');this.closest('.demo-modal-ov').hidden=true">
      <input type="text" required placeholder="公司名稱" aria-label="公司名稱">
      <input type="text" required placeholder="聯絡人姓名" aria-label="聯絡人姓名">
      <input type="email" required placeholder="商務 Email" aria-label="商務 Email">
      <input type="tel" placeholder="聯絡電話（選填）" aria-label="聯絡電話">
      <select aria-label="公司規模"><option value="">公司規模</option><option>1-10 人</option><option>11-50 人</option><option>51-200 人</option><option>201-1000 人</option><option>1000+ 人</option></select>
      <textarea placeholder="培訓需求或想了解的功能" rows="3" aria-label="培訓需求"></textarea>
      <button type="submit" class="btn btn-pri" style="width:100%;height:48px">送出預約</button>
    </form>
  </div>`;
  document.body.append(ov);
  ov.querySelector('.demo-modal-close').onclick = () => { ov.hidden = true; };
  ov.addEventListener('click', e => { if (e.target === ov) ov.hidden = true; });
  ov.addEventListener('keydown', e => { if (e.key === 'Escape') ov.hidden = true; });
  ov.querySelector('input')?.focus();
}

/* ---------- 企業培訓後台 ---------- */
function trainingPage() {
  const main = $('main');
  seo({ title: '訓練營｜AI Class', desc: '密集訓練營課程，有系統地學習新技能', url: 'https://aiclass.tw/training.html' });
  const demoCourses = [
    { id: 't1', title: '新人入職培訓', cat: '必修', progress: 85, employees: 48, hours: 4.5, status: '進行中' },
    { id: 't2', title: 'AI 工具實戰應用', cat: 'AI', progress: 62, employees: 32, hours: 8, status: '進行中' },
    { id: 't3', title: '資安意識培訓', cat: '必修', progress: 100, employees: 50, hours: 2, status: '已完成' },
    { id: 't4', title: 'Figma UI 設計基礎', cat: '設計', progress: 45, employees: 15, hours: 12, status: '進行中' },
    { id: 't5', title: '專案管理實務', cat: '管理', progress: 30, employees: 22, hours: 6, status: '進行中' },
    { id: 't6', title: '公司產品知識', cat: '必修', progress: 95, employees: 50, hours: 3, status: '進行中' },
    { id: 't7', title: 'Python 數據分析', cat: 'AI', progress: 18, employees: 12, hours: 16, status: '進行中' },
    { id: 't8', title: '簡報設計技巧', cat: '通識', progress: 100, employees: 35, hours: 4, status: '已完成' }
  ];
  const demoEmployees = [
    { name: '陳小明', dept: '工程部', role: '前端工程師', courses: 5, progress: 78, lastActive: '2 小時前' },
    { name: '林雅婷', dept: '設計部', role: 'UI 設計師', courses: 4, progress: 92, lastActive: '30 分鐘前' },
    { name: '黃志偉', dept: '行銷部', role: '行銷經理', courses: 3, progress: 65, lastActive: '1 天前' },
    { name: '張美玲', dept: '人資部', role: 'HR 專員', courses: 6, progress: 88, lastActive: '3 小時前' },
    { name: '王大華', dept: '工程部', role: '後端工程師', courses: 4, progress: 55, lastActive: '5 小時前' },
    { name: '李佳穎', dept: '設計部', role: '品牌設計師', courses: 3, progress: 100, lastActive: '1 小時前' },
    { name: '吳建宏', dept: '業務部', role: '業務主管', courses: 2, progress: 40, lastActive: '2 天前' },
    { name: '周雅芳', dept: '工程部', role: 'PM', courses: 5, progress: 72, lastActive: '4 小時前' },
    { name: '趙志明', dept: '行銷部', role: '社群經理', courses: 3, progress: 85, lastActive: '6 小時前' },
    { name: '許淑華', dept: '財務部', role: '會計', courses: 2, progress: 100, lastActive: '1 天前' },
    { name: '蔡宗翰', dept: '工程部', role: 'DevOps', courses: 4, progress: 68, lastActive: '8 小時前' },
    { name: '鄭文惠', dept: '客服部', role: '客服主管', courses: 3, progress: 90, lastActive: '2 小時前' }
  ];

  const navItems = [
    { id: 'overview', icon: '📊', label: '總覽' },
    { id: 'courses', icon: '📚', label: '課程管理' },
    { id: 'employees', icon: '👥', label: '員工管理' },
    { id: 'reports', icon: '📈', label: '學習報表' },
    { id: 'videos', icon: '📹', label: '企業影片' },
    { id: 'settings', icon: '⚙️', label: '設定' }
  ];

  main.innerHTML = `<div class="trn-layout">
    <aside class="trn-sidebar">
      <div class="trn-sidebar-logo">
        <a href="index.html"><img src="assets/logo.svg" alt="AI Class" style="height:24px;filter:brightness(10)"></a>
        <span class="trn-sidebar-tag">企業版</span>
      </div>
      <div class="trn-sidebar-company">
        <div class="trn-company-avatar">A</div>
        <div><b>Acme 科技</b><div class="trn-plan-tag">專業方案</div></div>
      </div>
      <nav class="trn-nav">
        ${navItems.map((n, i) => `<button class="trn-nav-item ${i === 0 ? 'on' : ''}" data-tab="${n.id}"><span class="trn-nav-icon">${n.icon}</span>${n.label}</button>`).join('')}
      </nav>
      <div class="trn-sidebar-bottom">
        <a href="enterprise.html" class="trn-nav-item"><span class="trn-nav-icon">🔙</span>返回企業方案</a>
        <a href="index.html" class="trn-nav-item"><span class="trn-nav-icon">🏠</span>返回首頁</a>
      </div>
    </aside>
    <div class="trn-main">
      <header class="trn-header">
        <button class="trn-menu-btn">☰</button>
        <h1 class="trn-page-title">總覽</h1>
        <div class="trn-header-right">
          <button class="trn-notif" onclick="toast('示範網站：通知功能開發中')">🔔<span class="trn-notif-dot"></span></button>
          <div class="trn-user"><div class="trn-user-avatar">陳</div><span>陳管理員</span></div>
        </div>
      </header>
      <div class="trn-content">
        <!-- 總覽 -->
        <div class="trn-tab-panel" id="tab-overview">
          <div class="trn-stat-grid">
            <div class="trn-stat"><div class="trn-stat-icon" style="background:var(--pri-15);color:var(--pri)">👥</div><div><div class="trn-stat-num">50</div><div class="trn-stat-label">員工帳號</div></div></div>
            <div class="trn-stat"><div class="trn-stat-icon" style="background:rgba(76,255,138,.12);color:#4cff8a">📚</div><div><div class="trn-stat-num">8</div><div class="trn-stat-label">培訓課程</div></div></div>
            <div class="trn-stat"><div class="trn-stat-icon" style="background:var(--pink-12);color:var(--pink)">📊</div><div><div class="trn-stat-num">72%</div><div class="trn-stat-label">平均完成率</div></div></div>
            <div class="trn-stat"><div class="trn-stat-icon" style="background:rgba(255,195,92,.12);color:#ffc35c">⏱</div><div><div class="trn-stat-num">1,280</div><div class="trn-stat-label">累計學習時數</div></div></div>
          </div>
          <div class="trn-row">
            <div class="trn-card trn-chart-card">
              <h3>本週學習時數</h3>
              <div class="trn-bar-chart">
                ${['一','二','三','四','五','六','日'].map((d, i) => {
                  const h = [42, 58, 65, 48, 72, 25, 18][i];
                  return `<div class="trn-bar-col"><div class="trn-bar" style="height:${h}%"><span>${Math.round(h * 0.8)}</span></div><div class="trn-bar-label">${d}</div></div>`;
                }).join('')}
              </div>
            </div>
            <div class="trn-card">
              <h3>近期動態</h3>
              <div class="trn-activity">
                ${[
                  { time: '10 分鐘前', text: '林雅婷 完成了「Figma UI 設計基礎」第 8 章' },
                  { time: '30 分鐘前', text: '陳小明 開始學習「AI 工具實戰應用」' },
                  { time: '1 小時前', text: '張美玲 通過了「資安意識培訓」測驗 (95 分)' },
                  { time: '2 小時前', text: '新增課程「Python 數據分析」' },
                  { time: '3 小時前', text: '周雅芳 完成了「專案管理實務」作業' },
                  { time: '5 小時前', text: '鄭文惠 獲得「公司產品知識」證書' },
                  { time: '昨天', text: '批量匯入 5 位新員工帳號' },
                  { time: '昨天', text: '蔡宗翰 開始學習「Python 數據分析」' }
                ].map(a => `<div class="trn-activity-item"><span class="trn-activity-time">${a.time}</span><span>${a.text}</span></div>`).join('')}
              </div>
            </div>
          </div>
          <div class="trn-card">
            <div class="trn-card-head"><h3>課程完成概況</h3></div>
            <div class="trn-course-overview">
              ${demoCourses.slice(0, 5).map(c => `<div class="trn-course-row">
                <div class="trn-course-name"><b>${c.title}</b><span class="trn-cat-tag">${c.cat}</span></div>
                <div class="trn-progress-bar"><div class="trn-progress-fill" style="width:${c.progress}%"></div></div>
                <span class="trn-progress-num">${c.progress}%</span>
              </div>`).join('')}
            </div>
          </div>
        </div>

        <!-- 課程管理 -->
        <div class="trn-tab-panel" id="tab-courses" hidden>
          <div class="trn-card-head" style="margin-bottom:20px;display:flex;justify-content:space-between;align-items:center">
            <h3 style="font-size:18px">所有培訓課程</h3>
            <button class="btn btn-pri" style="height:40px;font-size:14px" onclick="toast('示範網站：新增課程功能開發中')">+ 新增課程</button>
          </div>
          <div class="trn-table-wrap">
            <table class="trn-table">
              <thead><tr><th>課程名稱</th><th>分類</th><th>時數</th><th>指派人數</th><th>平均進度</th><th>狀態</th><th></th></tr></thead>
              <tbody>
                ${demoCourses.map(c => `<tr>
                  <td><b>${c.title}</b></td>
                  <td><span class="trn-cat-tag">${c.cat}</span></td>
                  <td>${c.hours}h</td>
                  <td>${c.employees} 人</td>
                  <td><div class="trn-progress-bar trn-progress-sm"><div class="trn-progress-fill" style="width:${c.progress}%"></div></div><span style="font-size:13px;margin-left:8px">${c.progress}%</span></td>
                  <td><span class="trn-status ${c.status === '已完成' ? 'trn-status-done' : ''}">${c.status}</span></td>
                  <td><button class="trn-action-btn" onclick="toast('示範網站：編輯功能開發中')">編輯</button></td>
                </tr>`).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- 員工管理 -->
        <div class="trn-tab-panel" id="tab-employees" hidden>
          <div class="trn-card-head" style="margin-bottom:20px;display:flex;justify-content:space-between;align-items:center">
            <h3 style="font-size:18px">員工名單 <span style="color:var(--tx3);font-weight:400">(${demoEmployees.length})</span></h3>
            <div style="display:flex;gap:8px">
              <button class="btn btn-ghost" style="height:40px;font-size:14px" onclick="toast('示範網站：匯入功能開發中')">批量匯入</button>
              <button class="btn btn-pri" style="height:40px;font-size:14px" onclick="toast('示範網站：新增員工功能開發中')">+ 新增員工</button>
            </div>
          </div>
          <div class="trn-table-wrap">
            <table class="trn-table">
              <thead><tr><th>姓名</th><th>部門</th><th>職位</th><th>課程數</th><th>整體進度</th><th>最近活躍</th><th></th></tr></thead>
              <tbody>
                ${demoEmployees.map(e => `<tr>
                  <td><div style="display:flex;align-items:center;gap:10px"><div class="trn-emp-avatar">${e.name[0]}</div><b>${e.name}</b></div></td>
                  <td>${e.dept}</td>
                  <td>${e.role}</td>
                  <td>${e.courses}</td>
                  <td><div class="trn-progress-bar trn-progress-sm"><div class="trn-progress-fill" style="width:${e.progress}%"></div></div><span style="font-size:13px;margin-left:8px">${e.progress}%</span></td>
                  <td style="color:var(--tx3)">${e.lastActive}</td>
                  <td><button class="trn-action-btn" onclick="toast('示範網站：檢視功能開發中')">檢視</button></td>
                </tr>`).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- 學習報表 -->
        <div class="trn-tab-panel" id="tab-reports" hidden>
          <div class="trn-stat-grid">
            <div class="trn-stat"><div class="trn-stat-icon" style="background:var(--pri-15);color:var(--pri)">📊</div><div><div class="trn-stat-num">72%</div><div class="trn-stat-label">平均完成率</div></div></div>
            <div class="trn-stat"><div class="trn-stat-icon" style="background:rgba(76,255,138,.12);color:#4cff8a">🏆</div><div><div class="trn-stat-num">156</div><div class="trn-stat-label">已發證書</div></div></div>
            <div class="trn-stat"><div class="trn-stat-icon" style="background:var(--pink-12);color:var(--pink)">⏱</div><div><div class="trn-stat-num">25.6h</div><div class="trn-stat-label">人均學習時數</div></div></div>
            <div class="trn-stat"><div class="trn-stat-icon" style="background:rgba(255,195,92,.12);color:#ffc35c">⭐</div><div><div class="trn-stat-num">4.8</div><div class="trn-stat-label">平均課程評分</div></div></div>
          </div>
          <div class="trn-row">
            <div class="trn-card trn-chart-card">
              <h3>各部門完成率</h3>
              <div class="trn-bar-chart trn-bar-h">
                ${[
                  { dept: '設計部', pct: 92 },
                  { dept: '人資部', pct: 88 },
                  { dept: '客服部', pct: 85 },
                  { dept: '工程部', pct: 72 },
                  { dept: '行銷部', pct: 65 },
                  { dept: '業務部', pct: 40 },
                  { dept: '財務部', pct: 55 }
                ].map(d => `<div class="trn-bar-row"><span class="trn-bar-dept">${d.dept}</span><div class="trn-bar-track"><div class="trn-bar-fill" style="width:${d.pct}%"></div></div><span class="trn-bar-pct">${d.pct}%</span></div>`).join('')}
              </div>
            </div>
            <div class="trn-card">
              <h3>學習排行榜</h3>
              <div class="trn-leaderboard">
                ${demoEmployees.sort((a, b) => b.progress - a.progress).slice(0, 8).map((e, i) => `<div class="trn-lb-item">
                  <span class="trn-lb-rank ${i < 3 ? 'trn-lb-top' : ''}">${i + 1}</span>
                  <div class="trn-emp-avatar">${e.name[0]}</div>
                  <div class="trn-lb-info"><b>${e.name}</b><span>${e.dept}</span></div>
                  <span class="trn-lb-pct">${e.progress}%</span>
                </div>`).join('')}
              </div>
            </div>
          </div>
          <div class="trn-card" style="text-align:center;padding:40px">
            <p style="color:var(--tx2);margin-bottom:16px">匯出完整報表以進行更深入的分析</p>
            <button class="btn btn-ghost" onclick="toast('示範網站：匯出功能開發中')">匯出 CSV 報表</button>
          </div>
        </div>

        <!-- 企業影片 -->
        <div class="trn-tab-panel" id="tab-videos" hidden>
          <div class="trn-card-head" style="margin-bottom:20px;display:flex;justify-content:space-between;align-items:center">
            <h3 style="font-size:18px">企業影片庫</h3>
            <button class="btn btn-pri" style="height:40px;font-size:14px" onclick="toast('示範網站：上傳功能開發中')">+ 上傳影片</button>
          </div>
          <div class="trn-video-grid">
            ${[
              { title: '2026 Q4 全員大會', dur: '1:32:00', date: '2026-10-28', views: 48 },
              { title: '新產品功能培訓', dur: '45:20', date: '2026-10-25', views: 35 },
              { title: 'OKR 撰寫教學', dur: '28:15', date: '2026-10-20', views: 42 },
              { title: '客服話術標準流程', dur: '35:40', date: '2026-10-15', views: 30 },
              { title: 'Git 工作流程規範', dur: '52:10', date: '2026-10-12', views: 22 },
              { title: '品牌視覺規範說明', dur: '18:30', date: '2026-10-08', views: 38 }
            ].map(v => `<div class="trn-video-card">
              <div class="trn-video-thumb"><div class="trn-video-play">▶</div><span class="trn-video-dur">${v.dur}</span></div>
              <div class="trn-video-info"><h4>${v.title}</h4><span>${v.date}・${v.views} 次觀看</span></div>
            </div>`).join('')}
          </div>
          <div class="trn-card" style="margin-top:24px">
            <div style="display:flex;justify-content:space-between;align-items:center">
              <div><b>儲存空間</b><span style="color:var(--tx3);margin-left:12px">12.8 GB / 50 GB</span></div>
              <div class="trn-progress-bar" style="width:200px"><div class="trn-progress-fill" style="width:25.6%"></div></div>
            </div>
          </div>
        </div>

        <!-- 設定 -->
        <div class="trn-tab-panel" id="tab-settings" hidden>
          <div class="trn-card">
            <h3 style="margin-bottom:20px">企業資訊</h3>
            <div class="trn-form-grid">
              <div class="trn-field"><label>公司名稱</label><input value="Acme 科技股份有限公司"></div>
              <div class="trn-field"><label>統一編號</label><input value="12345678"></div>
              <div class="trn-field"><label>管理員信箱</label><input value="admin@acme-tech.com"></div>
              <div class="trn-field"><label>聯絡電話</label><input value="02-2345-6789"></div>
            </div>
            <button class="btn btn-pri" style="margin-top:20px;height:42px" onclick="toast('示範網站：儲存功能開發中')">儲存變更</button>
          </div>
          <div class="trn-card" style="margin-top:20px">
            <h3 style="margin-bottom:20px">方案資訊</h3>
            <div class="trn-plan-info">
              <div><span style="color:var(--tx3)">目前方案</span><b>專業方案</b></div>
              <div><span style="color:var(--tx3)">員工上限</span><b>50 人</b></div>
              <div><span style="color:var(--tx3)">影片空間</span><b>50 GB</b></div>
              <div><span style="color:var(--tx3)">下次續約</span><b>2027-01-15</b></div>
            </div>
            <button class="btn btn-ghost" style="margin-top:16px;height:42px" onclick="toast('示範網站：升級功能開發中')">升級方案</button>
          </div>
          <div class="trn-card" style="margin-top:20px">
            <h3 style="margin-bottom:16px">安全設定</h3>
            <div class="trn-toggle-row"><span>強制雙重驗證 (2FA)</span><label class="trn-toggle"><input type="checkbox" checked><span class="trn-toggle-slider"></span></label></div>
            <div class="trn-toggle-row"><span>限制 IP 登入</span><label class="trn-toggle"><input type="checkbox"><span class="trn-toggle-slider"></span></label></div>
            <div class="trn-toggle-row"><span>允許員工下載影片</span><label class="trn-toggle"><input type="checkbox"><span class="trn-toggle-slider"></span></label></div>
          </div>
        </div>
      </div>
    </div>
  </div>`;

  // Tab switching
  const tabs = $$('.trn-nav-item[data-tab]', main);
  const panels = $$('.trn-tab-panel', main);
  const title = $('.trn-page-title', main);
  tabs.forEach(t => t.onclick = () => {
    tabs.forEach(x => x.classList.toggle('on', x === t));
    panels.forEach(p => p.hidden = p.id !== 'tab-' + t.dataset.tab);
    title.textContent = t.textContent.trim();
  });

  // Mobile sidebar toggle
  const sidebar = $('.trn-sidebar', main);
  const menuBtn = $('.trn-menu-btn', main);
  if (menuBtn) menuBtn.onclick = () => sidebar.classList.toggle('open');
}

/* ---------- 部落格列表 ---------- */
function blogPage() {
  const main = $('main');
  seo({ title: '學習專欄｜AI Class', desc: '最新學習技巧、課程推薦與職涯成長文章', url: 'https://aiclass.tw/blog.html',
    jsonLd: [
      { '@context': 'https://schema.org', '@type': 'CollectionPage', name: '學習專欄', description: '最新學習技巧、課程推薦與職涯成長文章', url: 'https://aiclass.tw/blog.html', publisher: { '@type': 'Organization', name: 'AI Class' }, mainEntity: { '@type': 'ItemList', itemListElement: window.POSTS.slice(0, 10).map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: `https://aiclass.tw/article.html?id=${p.id}` })) } },
      { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: '首頁', item: 'https://aiclass.tw/' }, { '@type': 'ListItem', position: 2, name: '學習專欄' }] }
    ]
  });
  const posts = window.POSTS;
  const catMap = Object.fromEntries(window.CATS.map(c => [c.id, c.name]));
  catMap.career = '創業/職涯'; catMap.beauty = '美髮/美容'; catMap.baking = '烘焙/料理';
  const cats = [...new Set(posts.map(p => p.cat))];
  const featured = posts[0];

  main.innerHTML = `
  <section class="blog-hero"><div class="wrap">
    <div class="crumb rv-up"><a href="index.html">首頁</a> › 學習專欄</div>
    <h1 class="blog-title rv-up">學習專欄</h1>
    <p class="blog-sub rv-up">深度好文，幫你掌握學習方法與產業趨勢</p>
    <div class="blog-search rv-up">
      <input type="text" id="blog-q" placeholder="搜尋文章..." autocomplete="off" aria-label="搜尋文章">
    </div>
    <div class="blog-cats rv-up">
      <button class="chip on" data-cat="all">全部</button>
      ${cats.map(c => `<button class="chip" data-cat="${c}">${catMap[c] || c}</button>`).join('')}
    </div>
  </div></section>

  <section class="sec"><div class="wrap">
    <a class="blog-feat rv-up" id="blog-feat" href="article.html?id=${featured.id}" data-cat="${featured.cat}" data-kw="${(featured.title + featured.excerpt + (featured.tags||[]).join('')).toLowerCase()}">
      <div class="blog-feat-img"><img src="assets/img/v${featured.v}.jpg" alt="${featured.title}" loading="lazy" decoding="async"></div>
      <div class="blog-feat-body">
        <span class="blog-tag">${catMap[featured.cat] || featured.cat}</span>
        <h2>${featured.title}</h2>
        <p>${featured.excerpt}</p>
        <div class="blog-meta">${featured.author}・${featured.date}・${featured.readTime} 分鐘閱讀</div>
      </div>
    </a>
  </div></section>

  <section class="sec"><div class="wrap">
    <div class="blog-grid" id="blog-grid">
      ${posts.slice(1).map((p, i) => `<a class="blog-card rv-up${i >= 6 ? ' blog-hidden' : ''}" href="article.html?id=${p.id}" data-cat="${p.cat}" data-kw="${(p.title + p.excerpt + (p.tags||[]).join('')).toLowerCase()}">
        <div class="blog-card-img"><img src="assets/img/v${p.v}.jpg" alt="${p.title}" loading="lazy" decoding="async"></div>
        <div class="blog-card-body">
          <span class="blog-tag">${catMap[p.cat] || p.cat}</span>
          <h3>${p.title}</h3>
          <p>${p.excerpt}</p>
          <div class="blog-meta">${p.author}・${p.date}・☕ ${p.readTime || Math.max(3, Math.ceil((p.excerpt||'').length / 100))} 分鐘閱讀</div>
        </div>
      </a>`).join('')}
    </div>
    ${posts.length > 7 ? '<div class="blog-load-more rv-up" id="blog-more"><button class="btn btn-ghost blog-more-btn">載入更多文章</button></div>' : ''}
    <div class="blog-empty" id="blog-empty" style="display:none">
      <p>找不到符合的文章，試試其他關鍵字？</p>
    </div>
  </div></section>

  <section class="sec blog-newsletter rv-up"><div class="wrap">
    <div class="blog-nl-card">
      <h2>📬 訂閱學習電子報</h2>
      <p>每週精選好文直送信箱，掌握最新學習趨勢</p>
      <div class="blog-nl-form">
        <input type="email" id="blog-nl-email" placeholder="your@email.com" aria-label="訂閱 Email">
        <button class="btn btn-pri" id="blog-nl-btn">免費訂閱</button>
      </div>
      <span class="blog-nl-hint">我們尊重你的隱私，隨時可以取消訂閱</span>
    </div>
  </div></section>`;

  const blogQ = $('#blog-q', main);
  const filterCards = () => {
    const activeCat = $('.blog-cats .chip.on', main)?.dataset.cat || 'all';
    const q = (blogQ.value || '').toLowerCase().trim();
    let visible = 0;
    const feat = $('#blog-feat', main);
    if (feat) {
      const fCatOk = activeCat === 'all' || feat.dataset.cat === activeCat;
      const fQOk = !q || (feat.dataset.kw || '').includes(q);
      feat.closest('section').style.display = (fCatOk && fQOk) ? '' : 'none';
      if (fCatOk && fQOk) visible++;
    }
    $$('#blog-grid .blog-card', main).forEach(c => {
      const catOk = activeCat === 'all' || c.dataset.cat === activeCat;
      const qOk = !q || (c.dataset.kw || '').includes(q);
      const show = catOk && qOk;
      c.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    const emptyEl = $('#blog-empty', main);
    if (emptyEl) emptyEl.style.display = visible ? 'none' : '';
  };
  blogQ.oninput = filterCards;

  $$('.blog-cats .chip', main).forEach(btn => btn.onclick = () => {
    $$('.blog-cats .chip', main).forEach(b => b.classList.toggle('on', b === btn));
    filterCards();
  });

  const moreBtn = $('.blog-more-btn', main);
  if (moreBtn) moreBtn.onclick = () => {
    $$('#blog-grid .blog-hidden', main).forEach(c => { c.classList.remove('blog-hidden'); });
    moreBtn.closest('.blog-load-more').style.display = 'none';
    reveal(main);
  };

  const nlBtn = $('#blog-nl-btn', main);
  if (nlBtn) nlBtn.onclick = () => {
    const em = $('#blog-nl-email', main).value.trim();
    if (!em || !em.includes('@')) { toast('請輸入有效的 Email'); return; }
    toast('感謝訂閱！我們會將最新文章寄到你的信箱');
    nlBtn.textContent = '已訂閱 ✓';
    nlBtn.disabled = true;
  };

  reveal(main);
}

/* ---------- 文章頁 ---------- */
function articlePage() {
  const main = $('main');
  const id = new URLSearchParams(location.search).get('id');
  const posts = window.POSTS;
  const post = posts.find(p => p.id === id);
  if (!post) { notFoundPage(); return; }
  const catMap = Object.fromEntries(window.CATS.map(c => [c.id, c.name]));
  catMap.career = '創業/職涯'; catMap.beauty = '美髮/美容'; catMap.baking = '烘焙/料理';
  const postTags = new Set(post.tags || []);
  const related = posts.filter(p => p.id !== post.id)
    .map(p => {
      let score = 0;
      if (p.cat === post.cat) score += 10;
      (p.tags || []).forEach(t => { if (postTags.has(t)) score += 3; });
      return { ...p, _score: score };
    })
    .sort((a, b) => b._score - a._score)
    .slice(0, 3);
  document.title = post.title + '｜AI Class 學習專欄';
  seo({
    title: post.title + '｜AI Class 學習專欄',
    desc: post.excerpt,
    url: `https://aiclass.tw/article.html?id=${post.id}`,
    img: `https://aiclass.tw/assets/img/v${post.v}.jpg`,
    ogType: 'article',
    jsonLd: [
      { '@context': 'https://schema.org', '@type': 'Article', headline: post.title, description: post.excerpt, author: { '@type': 'Person', name: post.author }, datePublished: post.date, image: `https://aiclass.tw/assets/img/v${post.v}.jpg`, publisher: { '@type': 'Organization', name: 'AI Class', url: 'https://aiclass.tw/' } },
      { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: '首頁', item: 'https://aiclass.tw/' }, { '@type': 'ListItem', position: 2, name: '學習專欄', item: 'https://aiclass.tw/blog.html' }, { '@type': 'ListItem', position: 3, name: post.title }] }
    ]
  });

  const abData = (window.ARTICLE_BODIES || {})[post.id];
  const body = abData ? abData.map(b => b.type === 'h2' ? `<h2>${b.text}</h2>` : b.type === 'h3' ? `<h3>${b.text}</h3>` : `<p>${b.text}</p>`).join('\n') : `<p>${post.excerpt}</p>
<h2>為什麼這個主題很重要？</h2>
<p>不論你是剛入門的新手，還是有經驗的專業人士，掌握最新的知識和技能都能讓你在職場上保持競爭力。根據最新調查，超過 78% 的企業表示，持續學習的員工更容易獲得升遷機會。</p>
<h3>1. 建立系統化的學習框架</h3>
<p>零散的學習往往效果不佳。建議你先設定明確的學習目標，再根據目標規劃學習路線。</p>
<h3>2. 實作是最好的老師</h3>
<p>光看影片是不夠的，真正的學習來自動手實作。每學完一個章節，就試著做一個小專案。</p>
<h3>3. 加入學習社群</h3>
<p>與志同道合的人一起學習，可以大幅提升學習效率。在 AI Class 的每堂課程都設有討論區。</p>
<h2>結語</h2>
<p>學習是一場馬拉松，不是短跑。保持耐心、持續練習，你一定能看到成果。</p>`;

  main.innerHTML = `
  <section class="art-hero"><div class="wrap art-wrap">
    <div class="art-main">
      <div class="crumb rv-up"><a href="index.html">首頁</a> / <a href="blog.html">學習專欄</a> / ${catMap[post.cat] || post.cat}</div>
      <h1 class="art-title rv-up">${post.title}</h1>
      <div class="art-info rv-up">
        <span class="art-author">${post.author}</span>
        <span>${post.date}</span>
        <span>${post.readTime} 分鐘閱讀</span>
      </div>
      <div class="art-tags rv-up">${post.tags.map(t => `<span class="art-tag">${t}</span>`).join('')}</div>
      <div class="art-actions rv-up">
        <button class="art-act-btn" id="art-like"><span>👍</span> 有幫助</button>
        <button class="art-act-btn" id="art-bm"><span>🔖</span> 收藏</button>
      </div>
      <div class="art-cover rv-up"><img src="assets/img/v${post.v}.jpg" alt="${post.title}" loading="lazy" decoding="async"></div>
      <div class="art-body rv-up" id="art-body">${body}</div>

      ${(() => {
        const idx = posts.findIndex(p => p.id === post.id);
        const prev = idx < posts.length - 1 ? posts[idx + 1] : null;
        const next = idx > 0 ? posts[idx - 1] : null;
        return (prev || next) ? `<div class="art-prevnext rv-up">${prev ? `<a class="art-pn prev" href="article.html?id=${prev.id}"><div class="art-pn-label">← 上一篇</div><div class="art-pn-title">${prev.title}</div></a>` : '<div></div>'}${next ? `<a class="art-pn next" href="article.html?id=${next.id}"><div class="art-pn-label">下一篇 →</div><div class="art-pn-title">${next.title}</div></a>` : '<div></div>'}</div>` : '';
      })()}

      <div class="art-author-bio rv-up">
        <div class="art-author-avatar"><img src="assets/img/v${post.v}.jpg" alt="${post.author}" loading="lazy" decoding="async"></div>
        <div class="art-author-info">
          <h4>${post.author}</h4>
          <p>AI Class 特約作者，專注於 ${catMap[post.cat] || post.cat} 領域，持續分享業界洞見與實戰經驗。</p>
          <a href="blog.html" class="art-author-more">查看更多文章 →</a>
        </div>
      </div>

      <div class="art-share rv-up">
        <span>分享這篇文章</span>
        <button onclick="navigator.clipboard.writeText(location.href);toast('已複製連結')">📋 複製連結</button>
        <a href="https://social-plugins.line.me/lineit/share?url=${encodeURIComponent('https://aiclass.tw/article.html?id=' + post.id)}" target="_blank" rel="noopener noreferrer">💬 LINE</a>
        <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://aiclass.tw/article.html?id=' + post.id)}" target="_blank" rel="noopener noreferrer">📘 Facebook</a>
        <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent('https://aiclass.tw/article.html?id=' + post.id)}&text=${encodeURIComponent(post.title)}" target="_blank" rel="noopener noreferrer">🐦 Twitter</a>
        ${navigator.share ? `<button onclick="navigator.share({title:'${post.title.replace(/'/g,"\\'")}',url:location.href}).catch(()=>{})">📤 更多</button>` : ''}
      </div>
      <div class="art-cta rv-up">
        <h3>想深入學習？</h3>
        <p>探索更多 ${catMap[post.cat] || post.cat} 相關課程</p>
        <a class="btn btn-pri" href="index.html#cat-${post.cat}">瀏覽課程 →</a>
      </div>
    </div>
    <aside class="art-side">
      <div class="art-side-card art-toc rv-up" id="art-toc">
        <h3>目錄</h3>
        <nav class="art-toc-nav"></nav>
      </div>
      <div class="art-side-card rv-up">
        <h3>相關文章</h3>
        ${related.length ? related.map(r => `<a class="art-side-item" href="article.html?id=${r.id}">
          <img src="assets/img/v${r.v}.jpg" alt="${r.title}" loading="lazy" decoding="async">
          <div><h4>${r.title}</h4><span>${r.date}</span></div>
        </a>`).join('') : '<p style="color:var(--tx3)">暫無相關文章</p>'}
      </div>
      <div class="art-side-card rv-up">
        <h3>熱門標籤</h3>
        <div class="art-side-tags">${[...new Set(posts.flatMap(p => p.tags))].slice(0, 12).map(t => `<a href="blog.html" class="art-tag">${t}</a>`).join('')}</div>
      </div>
    </aside>
  </div></section>`;

  const tocNav = $('#art-toc-nav, .art-toc-nav', main);
  const bodyEl = $('#art-body', main);
  if (tocNav && bodyEl) {
    const headings = bodyEl.querySelectorAll('h2, h3');
    if (headings.length) {
      tocNav.innerHTML = [...headings].map((h, i) => {
        h.id = 'sec-' + i;
        return `<a class="art-toc-link ${h.tagName === 'H3' ? 'sub' : ''}" href="#sec-${i}">${h.textContent}</a>`;
      }).join('');
      const links = tocNav.querySelectorAll('.art-toc-link');
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            links.forEach(l => l.classList.remove('on'));
            const idx = [...headings].indexOf(e.target);
            if (idx >= 0 && links[idx]) links[idx].classList.add('on');
          }
        });
      }, { rootMargin: '-80px 0px -60% 0px' });
      headings.forEach(h => obs.observe(h));
      const mobToc = document.createElement('div');
      mobToc.className = 'art-toc-mob';
      mobToc.innerHTML = `<div class="art-toc-mob-hd">📑 文章目錄<i>▼</i></div><div class="art-toc-mob-body">${[...headings].map((h, i) => `<a class="art-toc-link ${h.tagName === 'H3' ? 'sub' : ''}" href="#sec-${i}">${h.textContent}</a>`).join('')}</div>`;
      bodyEl.before(mobToc);
      $('.art-toc-mob-hd', mobToc).onclick = () => mobToc.classList.toggle('open');
    } else {
      $('#art-toc', main).style.display = 'none';
    }
  }

  const likeBtn = $('#art-like', main);
  const bmBtn = $('#art-bm', main);
  const liked = ls('aic-likes', []);
  const bookmarked = ls('aic-bm', []);
  if (liked.includes(post.id)) likeBtn.classList.add('on');
  if (bookmarked.includes(post.id)) bmBtn.classList.add('on');
  likeBtn.onclick = () => {
    const arr = ls('aic-likes', []);
    const has = arr.includes(post.id);
    if (has) arr.splice(arr.indexOf(post.id), 1); else arr.push(post.id);
    ss('aic-likes', arr);
    likeBtn.classList.toggle('on');
    toast(has ? '已取消' : '感謝回饋！');
  };
  bmBtn.onclick = () => {
    const arr = ls('aic-bm', []);
    const has = arr.includes(post.id);
    if (has) arr.splice(arr.indexOf(post.id), 1); else arr.push(post.id);
    ss('aic-bm', arr);
    bmBtn.classList.toggle('on');
    toast(has ? '已取消收藏' : '已收藏文章');
  };

  // 閱讀位置記憶
  const artPos = ls('aic-art-pos', {});
  if (artPos[post.id]) setTimeout(() => scrollTo({ top: artPos[post.id], behavior: 'instant' }), 80);
  let scrollTimer;
  const saveScroll = () => { artPos[post.id] = scrollY; ss('aic-art-pos', artPos); };
  addEventListener('scroll', () => { clearTimeout(scrollTimer); scrollTimer = setTimeout(saveScroll, 400); }, { passive: true });
  addEventListener('beforeunload', saveScroll);

  // Article reading progress bar
  const artProg = document.createElement('div'); artProg.className = 'art-read-prog';
  document.body.append(artProg);
  addEventListener('scroll', rafThrottle(() => {
    const h = document.documentElement.scrollHeight - innerHeight;
    artProg.style.width = h > 0 ? (scrollY / h * 100) + '%' : '0';
  }), { passive: true });

  reveal(main);
}

/* ---------- 講師列表 ---------- */
function instructorPage() {
  const main = $('main');
  const teacherMap = {};
  C.forEach(c => {
    if (!teacherMap[c.teacher]) teacherMap[c.teacher] = { name: c.teacher, role: c.role, courses: [], students: 0, avgRating: 0 };
    teacherMap[c.teacher].courses.push(c);
    teacherMap[c.teacher].students += c.students;
  });
  const teachers = Object.values(teacherMap).map(t => {
    t.avgRating = (t.courses.reduce((s, c) => s + c.rating, 0) / t.courses.length).toFixed(1);
    t.v = t.courses[0].v;
    return t;
  }).sort((a, b) => b.students - a.students);

  const nameParam = new URLSearchParams(location.search).get('name');
  if (nameParam) {
    const t = teachers.find(x => x.name === decodeURIComponent(nameParam));
    if (!t) { notFoundPage(); return; }
    const totalHrs = t.courses.reduce((s, c) => s + c.hours, 0);
    const BIOS = window.INSTRUCTOR_BIOS || {};
    const bioData = BIOS[t.name];
    const bio = bioData ? bioData.detail : '擁有豐富的業界實戰經驗，專注於將專業知識轉化為易懂的教學內容。教學風格注重實作，強調「做中學」的學習理念。';
    seo({ title: `${t.name}｜AI Class 講師`, desc: `${t.name} — ${t.role}，${t.courses.length} 門課程，${t.students.toLocaleString()} 位學員`, url: `https://aiclass.tw/instructor.html?name=${encodeURIComponent(t.name)}`, ogType: 'profile',
      jsonLd: { '@context': 'https://schema.org', '@type': 'ProfilePage', mainEntity: { '@type': 'Person', name: t.name, jobTitle: t.role, description: bio } }
    });
    document.title = `${t.name}｜AI Class 講師`;
    main.innerHTML = `
    <section class="insd-hero"><div class="wrap">
      <div class="crumb rv-up"><a href="index.html">首頁</a> › <a href="instructor.html">講師</a> › ${t.name}</div>
      <div class="insd-profile rv-up">
        <div class="insd-avatar"><img src="assets/img/v${t.v}.jpg" alt="${t.name}" loading="lazy"></div>
        <div class="insd-info">
          <h1>${t.name}</h1>
          <span class="insd-role">${t.role}</span>
          <p class="insd-bio">${bio}</p>
          ${bioData && bioData.works ? `<div class="insd-works"><h4>經歷與成就</h4><ul>${bioData.works.map(w => `<li>${w}</li>`).join('')}</ul></div>` : ''}
          ${(() => { const insData = (window.INSTRUCTORS || []).find(x => x.name === t.name); return insData && insData.achievements ? `<div class="ins-achievements"><h4>榮譽與成就</h4><ul>${insData.achievements.map(a => `<li><span class="ins-ach-icon">🏆</span>${a}</li>`).join('')}</ul></div>` : ''; })()}
          <div class="insd-stats">
            <div class="insd-stat"><b>${t.courses.length}</b><span>門課程</span></div>
            <div class="insd-stat"><b>${t.students.toLocaleString()}</b><span>位學員</span></div>
            <div class="insd-stat"><b>⭐ ${t.avgRating}</b><span>平均評分</span></div>
            <div class="insd-stat"><b>${totalHrs}</b><span>小時內容</span></div>
          </div>
          <div class="insd-follow-row">
            <button class="follow-btn ${follows.has(t.name) ? 'following' : ''}" data-follow="${t.name}">${follows.has(t.name) ? '✓ 已追蹤' : '＋ 追蹤講師'}</button>
            <span class="insd-follower-count" id="insd-fc">${(() => { const ins = (window.INSTRUCTORS || []).find(x => x.name === t.name); const base = ins ? ins.followers : 800; return (base + (follows.has(t.name) ? 1 : 0)).toLocaleString(); })()} 人追蹤</span>
          </div>
        </div>
      </div>
    </div></section>
    <section class="sec"><div class="wrap">
      <h2 class="insd-sec-title rv-up">開設課程（${t.courses.length}）</h2>
      <div class="insd-courses">${t.courses.map(c => `<a class="insd-course rv-up" href="course.html?id=${c.id}">
        <div class="insd-course-img"><img src="assets/img/v${c.v}.jpg" alt="${c.title}" loading="lazy" decoding="async">${c.tag ? `<span class="tag">${c.tag}</span>` : ''}</div>
        <div class="insd-course-body">
          <h3>${c.title}</h3>
          <div class="insd-course-meta">★ ${c.rating}（${c.students.toLocaleString()}）・${c.hours} 小時${window.CHAPTERS && window.CHAPTERS[c.id] ? '・' + window.CHAPTERS[c.id].length + ' 個章節' : ''}</div>
          <div class="insd-course-price"><b>${fmt(c.price)}</b><del>${fmt(c.origin)}</del><span class="off">-${pct(c)}%</span></div>
        </div>
      </a>`).join('')}</div>
    </div></section>
    <section class="sec"><div class="wrap">
      <h2 class="insd-sec-title rv-up">學員好評</h2>
      <div class="insd-reviews">${(() => {
        const R = window.REVIEWS || [];
        const tCats = new Set(t.courses.map(c => c.cat));
        const catKw = { drawing: ['插畫','角色','Procreate','漫畫'], video: ['影片','剪輯','Blender','3D'], game: ['遊戲','Unity'], baking: ['料理','甜點','麵包','咖啡'], design: ['設計','UI','UX','品牌','前端'], ai: ['AI','Python','LLM','ChatGPT'], creative: ['攝影','文案','寫作','音樂'], beauty: ['美甲','健身'], finance: ['理財','ETF'], career: ['創業','電商','行銷'] };
        const kws = [...tCats].flatMap(cat => catKw[cat] || []);
        const matched = R.filter(r => kws.some(k => r[1].includes(k))).slice(0, 4);
        const reviews = matched.length >= 3 ? matched : R.slice(0, 4);
        return reviews.map((r, i) => `<div class="insd-review rv-up">
          <div class="insd-review-head"><div class="insd-review-avatar" style="background:hsl(${i*70+120},55%,55%)">${r[0][0]}</div><div><b>${r[0]}</b><span>★★★★★</span></div></div>
          <p>${r[2]}</p>
          <small>課程：${r[1]}</small>
        </div>`).join('');
      })()}</div>
    </div></section>
    ${railSec('insd-rec', '', '你可能也會喜歡', C.filter(x => !t.courses.includes(x)).slice(0, 8))}`;
    bindCards(main); bindRail($('#insd-rec'));
    const followBtn = $('.follow-btn', main);
    if (followBtn) followBtn.onclick = () => {
      const name = followBtn.dataset.follow;
      if (follows.has(name)) { follows.delete(name); followBtn.classList.remove('following'); followBtn.textContent = '＋ 追蹤講師'; toast(`已取消追蹤 ${name}`); }
      else { follows.add(name); followBtn.classList.add('following'); followBtn.textContent = '✓ 已追蹤'; toast(`已追蹤 ${name}`); }
      saveFollows();
      const fc = $('#insd-fc'); if (fc) { const ins = (window.INSTRUCTORS || []).find(x => x.name === name); const base = ins ? ins.followers : 800; fc.textContent = (base + (follows.has(name) ? 1 : 0)).toLocaleString() + ' 人追蹤'; }
    };
    reveal(main);
    return;
  }

  const roles = [...new Set(teachers.map(t => t.role))];

  seo({ title: '所有講師｜AI Class', desc: `${teachers.length} 位業界職人講師陣容`, url: 'https://aiclass.tw/instructor.html',
    jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: '所有講師', description: `${teachers.length} 位業界職人講師陣容`, url: 'https://aiclass.tw/instructor.html', mainEntity: { '@type': 'ItemList', itemListElement: teachers.slice(0, 12).map((t, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'Person', name: t.name, jobTitle: t.role } })) } }
  });

  main.innerHTML = `
  <section class="ins-hero"><div class="wrap">
    <h1 class="ins-title rv-up">所有講師</h1>
    <p class="ins-sub rv-up">業界頂尖職人親授，${teachers.length} 位講師帶你把熱情學成專業</p>
    <div class="ins-search rv-up"><input type="text" id="ins-q" placeholder="搜尋講師名稱或專業..." autocomplete="off" aria-label="搜尋講師"></div>
    <div class="ins-filters rv-up">
      <button class="chip on" data-role="all">全部</button>
      ${roles.slice(0, 8).map(r => `<button class="chip" data-role="${r}">${r}</button>`).join('')}
    </div>
  </div></section>
  <section class="sec"><div class="wrap">
    <div class="ins-grid" id="ins-grid">
      ${teachers.map(t => `<a class="ins-card rv-up" href="instructor.html?name=${encodeURIComponent(t.name)}" data-name="${t.name}" data-role="${t.role}" style="text-decoration:none;color:inherit">
        <div class="ins-avatar"><img src="assets/img/v${t.v}.jpg" alt="${t.name}" loading="lazy" decoding="async"></div>
        <h3 class="ins-name">${t.name}</h3>
        <p class="ins-role">${t.role}</p>
        <div class="ins-stats">
          <div><b>${t.courses.length}</b><span>門課程</span></div>
          <div><b>${(t.students / 1000).toFixed(1)}K</b><span>學生</span></div>
          <div><b>⭐ ${t.avgRating}</b><span>評分</span></div>
        </div>
        <div class="ins-courses">${t.courses.slice(0, 2).map(c => `<span class="ins-course-link">${c.title}</span>`).join('')}</div>
        <div class="ins-follow-row"><button class="ins-follow-btn ${follows.has(t.name) ? 'following' : ''}" data-ifollow="${t.name}">${follows.has(t.name) ? '✓ 已追蹤' : '＋ 追蹤'}</button><span class="ins-fc">${(() => { const ins = (window.INSTRUCTORS || []).find(x => x.name === t.name); return ((ins ? ins.followers : 800) + (follows.has(t.name) ? 1 : 0)).toLocaleString(); })()} 追蹤</span></div>
      </a>`).join('')}
    </div>
    <div class="blog-empty" id="ins-empty" style="display:none"><p>找不到符合的講師</p></div>
  </div></section>`;

  const insQ = $('#ins-q', main);
  const filterIns = () => {
    const role = $('.ins-filters .chip.on', main)?.dataset.role || 'all';
    const q = (insQ.value || '').toLowerCase().trim();
    let vis = 0;
    $$('#ins-grid .ins-card', main).forEach(c => {
      const rOk = role === 'all' || c.dataset.role === role;
      const qOk = !q || c.dataset.name.toLowerCase().includes(q) || c.dataset.role.toLowerCase().includes(q);
      const show = rOk && qOk;
      c.style.display = show ? '' : 'none';
      if (show) vis++;
    });
    const emp = $('#ins-empty', main);
    if (emp) emp.style.display = vis ? 'none' : '';
  };
  insQ.oninput = filterIns;
  $$('.ins-filters .chip', main).forEach(btn => btn.onclick = () => {
    $$('.ins-filters .chip', main).forEach(b => b.classList.toggle('on', b === btn));
    filterIns();
  });

  $$('[data-ifollow]', main).forEach(btn => btn.onclick = e => {
    e.preventDefault(); e.stopPropagation();
    const name = btn.dataset.ifollow;
    if (follows.has(name)) { follows.delete(name); btn.classList.remove('following'); btn.textContent = '＋ 追蹤'; toast(`已取消追蹤 ${name}`); }
    else { follows.add(name); btn.classList.add('following'); btn.textContent = '✓ 已追蹤'; toast(`已追蹤 ${name}`); }
    saveFollows();
    const fc = btn.parentElement.querySelector('.ins-fc');
    if (fc) { const ins = (window.INSTRUCTORS || []).find(x => x.name === name); fc.textContent = ((ins ? ins.followers : 800) + (follows.has(name) ? 1 : 0)).toLocaleString() + ' 追蹤'; }
  });

  reveal(main);
}

/* ---------- 分類瀏覽 ---------- */
function categoryPage() {
  const main = $('main');
  seo({ title: '課程分類｜AI Class', desc: '探索所有課程分類：設計、繪畫、AI、攝影、料理等', url: 'https://aiclass.tw/category.html' });
  const catId = new URLSearchParams(location.search).get('cat');
  const cats = window.CATS.filter(c => c.id !== 'all');

  if (catId) {
    const cat = cats.find(c => c.id === catId) || cats[0];
    const courses = C.filter(c => c.cat === catId);
    document.title = cat.name + '｜AI Class 課程分類';
    const levelOf = c => c.hours < 10 ? '入門' : c.hours <= 20 ? '進階' : '專業';
    main.innerHTML = `
    <section class="catp-hero"><div class="wrap">
      <div class="crumb rv-up"><a href="index.html">首頁</a> / <a href="category.html">分類</a> / ${cat.name}</div>
      <h1 class="catp-title rv-up">${cat.name}</h1>
      <p class="catp-count rv-up" id="catp-total">共 ${courses.length} 堂課程</p>
      ${cat.subs ? `<div class="catp-subs rv-up">${cat.subs.map(s => `<span class="chip">${s}</span>`).join('')}</div>` : ''}
    </div></section>
    <section class="sec"><div class="wrap">
      <div class="catp-filters rv-up">
        ${(()=>{const subs=[...new Set(courses.map(c=>c.sub).filter(Boolean))];return subs.length>1?`<div class="catp-frow"><span class="catp-flabel">子分類</span><div class="catp-fbtns" data-fg="sub"><button class="chip on" data-fv="all">全部</button>${subs.map(s=>`<button class="chip" data-fv="${s}">${s}</button>`).join('')}</div></div>`:''})()}
        <div class="catp-frow"><span class="catp-flabel">價格</span><div class="catp-fbtns" data-fg="price"><button class="chip on" data-fv="all">全部</button><button class="chip" data-fv="0-2000">NT$0–2,000</button><button class="chip" data-fv="2000-5000">NT$2,000–5,000</button><button class="chip" data-fv="5000+">NT$5,000+</button></div></div>
        <div class="catp-frow"><span class="catp-flabel">難度</span><div class="catp-fbtns" data-fg="level"><button class="chip on" data-fv="all">全部</button><button class="chip" data-fv="入門">入門</button><button class="chip" data-fv="進階">進階</button><button class="chip" data-fv="專業">專業</button></div></div>
        <div class="catp-frow"><span class="catp-flabel">排序</span><div class="catp-fbtns" data-fg="sort"><button class="chip on" data-fv="default">推薦</button><button class="chip" data-fv="new">最新</button><button class="chip" data-fv="students">最多學員</button><button class="chip" data-fv="price-asc">價格低到高</button><button class="chip" data-fv="rating">評分最高</button></div></div>
      </div>
      <div class="catp-grid" id="catp-grid">${courses.map(c => card(c)).join('')}</div>
      <p class="catp-empty" id="catp-empty" style="display:none;text-align:center;color:var(--tx3);padding:60px 0">沒有符合條件的課程</p>
    </div></section>`;
    const getF = fg => $(`[data-fg="${fg}"] .chip.on`, main)?.dataset.fv || 'all';
    const updateFilterCounts = () => {
      const pf = getF('price'), lf = getF('level');
      const countFor = (fg, fv) => {
        return courses.filter(c => {
          const pp = fg === 'price' ? fv : pf;
          const ll = fg === 'level' ? fv : lf;
          if (pp === '0-2000' && c.price > 2000) return false;
          if (pp === '2000-5000' && (c.price < 2000 || c.price > 5000)) return false;
          if (pp === '5000+' && c.price < 5000) return false;
          if (ll !== 'all' && levelOf(c) !== ll) return false;
          return true;
        }).length;
      };
      $$('[data-fg="price"] .chip', main).forEach(btn => {
        const fv = btn.dataset.fv; if (fv === 'all') return;
        const n = countFor('price', fv);
        let badge = btn.querySelector('.chip-count');
        if (!badge) { badge = document.createElement('span'); badge.className = 'chip-count'; btn.append(badge); }
        badge.textContent = n;
        badge.style.display = n ? '' : 'none';
      });
      $$('[data-fg="level"] .chip', main).forEach(btn => {
        const fv = btn.dataset.fv; if (fv === 'all') return;
        const n = countFor('level', fv);
        let badge = btn.querySelector('.chip-count');
        if (!badge) { badge = document.createElement('span'); badge.className = 'chip-count'; btn.append(badge); }
        badge.textContent = n;
        badge.style.display = n ? '' : 'none';
      });
    };
    const filterCat = () => {
      const pf = getF('price'), lf = getF('level'), sf = getF('sort'), subF = getF('sub');
      let list = courses.filter(c => {
        if (subF && subF !== 'all' && c.sub !== subF) return false;
        if (pf === '0-2000' && c.price > 2000) return false;
        if (pf === '2000-5000' && (c.price < 2000 || c.price > 5000)) return false;
        if (pf === '5000+' && c.price < 5000) return false;
        if (lf !== 'all' && levelOf(c) !== lf) return false;
        return true;
      });
      if (sf === 'new') list = list.filter(c => c.tag === 'NEW').concat(list.filter(c => c.tag !== 'NEW'));
      else if (sf === 'students') list.sort((a, b) => b.students - a.students);
      else if (sf === 'price-asc') list.sort((a, b) => a.price - b.price);
      else if (sf === 'rating') list.sort((a, b) => b.rating - a.rating);
      const grid = $('#catp-grid', main);
      grid.style.opacity = '0'; grid.style.transition = 'opacity .25s';
      setTimeout(() => { grid.innerHTML = list.map(c => card(c)).join(''); bindCards(grid); reveal(grid); grid.style.opacity = '1'; }, 250);
      $('#catp-total', main).textContent = `共 ${list.length} 堂課程`;
      $('#catp-empty', main).style.display = list.length ? 'none' : '';
      updateFilterCounts();
    };
    updateFilterCounts();
    $$('.catp-fbtns', main).forEach(g => $$('.chip', g).forEach(btn => btn.onclick = () => {
      $$('.chip', g).forEach(b => b.classList.toggle('on', b === btn));
      filterCat();
    }));
  } else {
    main.innerHTML = `
    <section class="catp-hero"><div class="wrap">
      <h1 class="catp-title rv-up">課程分類</h1>
      <p class="catp-count rv-up">探索 ${cats.length} 大類別，找到你感興趣的課程</p>
    </div></section>
    <section class="sec"><div class="wrap">
      <div class="cat-grid">${cats.map(c => {
        const count = C.filter(x => x.cat === c.id).length;
        const sample = C.find(x => x.cat === c.id);
        return `<a class="cat-card rv-up" href="category.html?cat=${c.id}" style="--cimg:url(assets/img/v${sample ? sample.v : '785'}.jpg)">
          <span class="cat-count">${count} 堂課程</span><span class="cat-name">${c.name}</span>
        </a>`;
      }).join('')}</div>
    </div></section>`;
  }
  bindCards(main);
}

/* ---------- 收藏頁 ---------- */
function wishlistPage() {
  seo({ title: '我的收藏｜AI Class', desc: '查看你收藏的課程，隨時加入購物車', url: 'https://aiclass.tw/wishlist.html' });
  const main = $('main');
  let wishSort = 'added';

  function render() {
    let items = [...wish].map(id => byId[id]).filter(Boolean);
    if (wishSort === 'price-low') items.sort((a,b) => a.price - b.price);
    else if (wishSort === 'price-high') items.sort((a,b) => b.price - a.price);
    else if (wishSort === 'rating') items.sort((a,b) => b.rating - a.rating);
    if (!items.length) {
      main.innerHTML = `<section class="sec"><div class="wrap">
        <div class="cart-empty"><div class="empty-illus"><svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M80 130 L35 85 A28 28 0 0 1 80 50 A28 28 0 0 1 125 85 Z" stroke="var(--pink)" stroke-width="2" fill="none" stroke-dasharray="5 4"/><circle cx="80" cy="82" r="8" fill="var(--pink)" opacity=".15"/><path d="M76 82h8M80 78v8" stroke="var(--pink)" stroke-width="1.5" stroke-linecap="round"/></svg></div><h2>收藏清單是空的</h2><p>瀏覽課程時點擊愛心，把感興趣的課程加入收藏</p><a class="btn btn-pri" href="index.html">探索課程</a></div>
      </div></section>`;
      return;
    }
    main.innerHTML = `
    <section class="wish-hero"><div class="wrap">
      <div class="crumb rv-up"><a href="index.html">首頁</a> › 我的收藏</div>
      <h1 class="wish-title rv-up">我的收藏</h1>
      <p class="wish-count rv-up">共 ${items.length} 堂課程・總價值 ${fmt(items.reduce((s,c)=>s+c.price,0))}</p>
      <div class="wish-actions-bar rv-up">
        <button class="btn btn-pri wish-add-all">🛒 一鍵全部加入購物車</button>
        <select class="wish-sort"><option value="added">加入順序</option><option value="price-low">價格低→高</option><option value="price-high">價格高→低</option><option value="rating">評分最高</option></select>
      </div>
    </div></section>
    <section class="sec"><div class="wrap">
      <div class="wish-grid">${items.map(c => `<div class="wish-item rv-up">
        <a href="course.html?id=${c.id}" class="wish-thumb"><img src="assets/img/v${c.v}.jpg" alt="${c.title}" loading="lazy" decoding="async"></a>
        <div class="wish-info">
          <a href="course.html?id=${c.id}"><h3>${c.title}</h3></a>
          <p class="teacher">${c.teacher}・${c.role}</p>
          <div class="stars"><b>★</b> ${c.rating}（${c.students.toLocaleString()} 人）</div>
          <div class="price"><span class="now">${fmt(c.price)}</span><del>${fmt(c.origin)}</del><span class="off">-${pct(c)}%</span></div>
        </div>
        <div class="wish-actions">
          <button class="btn btn-pri" onclick="cart.add('${c.id}');saveCart();updateCartBadge();toast('已加入購物車')">加入購物車</button>
          <button class="wish-rm" data-id="${c.id}" title="移除收藏" aria-label="移除收藏 ${c.title}">✕</button>
        </div>
      </div>`).join('')}</div>
    </div></section>`;
    $$('.wish-rm', main).forEach(b => b.onclick = () => {
      wish.delete(b.dataset.id);
      ss('aic-wish', [...wish]);
      render();
      toast('已移除收藏');
      window.trackEvent('remove_from_wishlist', { item_id: b.dataset.id });
    });
    const addAllBtn = $('.wish-add-all', main);
    if (addAllBtn) addAllBtn.onclick = () => {
      items.forEach(c => cart.add(c.id));
      saveCart(); updateCartBadge();
      toast(`已將 ${items.length} 堂課程加入購物車`, 'success');
      window.trackEvent('add_to_cart', { item_id: 'wishlist_all', value: items.reduce((s,c) => s + c.price, 0) });
    };
    const sortSel = $('.wish-sort', main);
    if (sortSel) sortSel.onchange = () => { wishSort = sortSel.value; render(); };
    reveal(main);
  }
  render();
}

/* ---------- 我的學習 ---------- */
function myPage() {
  seo({ title: '我的學習｜AI Class', desc: '管理你的課程進度、學習紀錄與成績', url: 'https://aiclass.tw/my.html' });
  const main = $('main');
  const enrolled = C.slice(0, 7).map((c, i) => ({ ...c, progress: [78, 45, 100, 12, 62, 33, 91][i], lastWatch: ['2 小時前', '昨天', '3 天前', '5 分鐘前', '1 天前', '4 小時前', '剛剛'][i] }));
  const totalHours = enrolled.reduce((s, c) => s + c.hours, 0);
  const completed = enrolled.filter(c => c.progress === 100).length;
  const inProgress = enrolled.filter(c => c.progress > 0 && c.progress < 100).sort((a, b) => b.progress - a.progress);
  const wishlist = C.slice(8, 12);
  const orders = [
    { id: 'ORD-20261028-001', date: '2026/10/28', items: [C[0]], total: 4980, status: '已完成' },
    { id: 'ORD-20261015-002', date: '2026/10/15', items: [C[1], C[4]], total: 9860, status: '已完成' },
    { id: 'ORD-20260920-003', date: '2026/09/20', items: [C[2]], total: 4580, status: '已完成' },
  ];
  const coupons = [
    { code: 'WELCOME20', desc: '新會員 8 折券', expire: '2026/12/31', min: 3000, used: false },
    { code: 'DOUBLE11', desc: '雙 11 滿 5,000 折 800', expire: '2026/11/15', min: 5000, used: false },
    { code: 'BDAY500', desc: '生日禮 $500 折抵', expire: '2026/11/30', min: 2000, used: true },
  ];
  const activity = [
    { icon: '▶', text: '繼續觀看「' + enrolled[0].title.slice(0,12) + '…」第 7 章', time: '2 小時前', color: 'var(--pri)' },
    { icon: '✓', text: '完成「' + enrolled[2].title.slice(0,12) + '…」全部課程', time: '3 天前', color: '#34c759' },
    { icon: '📝', text: '為「' + enrolled[1].title.slice(0,12) + '…」新增了學習筆記', time: '4 天前', color: '#ff9500' },
    { icon: '⭐', text: '給予「' + enrolled[2].title.slice(0,12) + '…」五星好評', time: '4 天前', color: '#ffc107' },
    { icon: '🎓', text: '獲得結業證書：' + enrolled[2].title.slice(0,10), time: '4 天前', color: 'var(--pink)' },
    { icon: '🛒', text: '購買了「' + enrolled[5].title.slice(0,12) + '…」', time: '5 天前', color: 'var(--pri)' },
    { icon: '🏆', text: '解鎖成就徽章「連續 7 天學習」', time: '1 週前', color: '#ff5c8a' },
    { icon: '♡', text: '收藏了「' + C[C.length - 1].title.slice(0,12) + '…」', time: '1 週前', color: '#ff5c8a' },
  ];

  // Learning calendar (last 30 days)
  const today = new Date();
  const calDays = Array.from({ length: 35 }, (_, i) => {
    const d = new Date(today); d.setDate(d.getDate() - 34 + i);
    const active = [1,2,3,5,6,8,10,11,12,14,15,17,19,20,21,22,24,26,27,28,30,31,33,34].includes(i);
    const mins = active ? [15,30,45,60,90,120][Math.floor(Math.random() * 6)] : 0;
    return { date: d, mins, dow: d.getDay() };
  });
  const memberSince = '2026 年 3 月';
  const streakDays = streakData.count;
  const totalPts = xpData.total || (streakDays * 30 + enrolled.length * 120);
  const myLvl = getXPLevel();
  const myXpProg = getXPProgress();
  const level = myLvl.lv;
  const levelTitle = myLvl.name;

  main.innerHTML = `
  <!-- 個人檔案 Hero Banner -->
  <div class="my-hero rv-up">
    <div class="my-hero-bg"></div>
    <div class="wrap my-hero-inner">
      <div class="my-hero-left">
        <div class="my-avatar-lg">學<span class="my-avatar-badge">Lv.${level}</span></div>
        <div class="my-hero-info">
          <h1 class="my-hero-name">學員你好 👋</h1>
          <p class="my-hero-sub">${levelTitle}・${memberSince}加入・已學 ${totalHours} 小時</p>
          <div class="my-hero-tags">
            <span class="my-tag">🔥 連續 ${streakDays} 天</span>
            <span class="my-tag">💎 ${totalPts} 點數</span>
            <span class="my-tag">📚 ${enrolled.length} 堂課程</span>
            <span class="my-tag">🏆 ${completed} 堂完成</span>
          </div>
        </div>
      </div>
      <div class="my-hero-right">
        <div class="my-xp-ring"><svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,.15)" stroke-width="5"/><circle cx="40" cy="40" r="34" fill="none" stroke="#fff" stroke-width="5" stroke-dasharray="214" stroke-dashoffset="${214 - 214 * myXpProg.pct / 100}" stroke-linecap="round" transform="rotate(-90 40 40)"/></svg><div class="my-xp-text"><b>${totalPts.toLocaleString()}</b><span>XP</span></div></div>
      </div>
    </div>
  </div>

  <!-- 快捷入口 -->
  <div class="wrap my-quick rv-up">
    <a class="my-qlink" href="order-history.html"><span class="my-ql-icon">🧾</span><span>訂單紀錄</span></a>
    <a class="my-qlink" href="wishlist.html"><span class="my-ql-icon">♡</span><span>我的收藏</span></a>
    <a class="my-qlink" href="coupon.html"><span class="my-ql-icon">🎟️</span><span>優惠券</span></a>
    <a class="my-qlink" href="certificate.html"><span class="my-ql-icon">🏆</span><span>結業證書</span></a>
    <a class="my-qlink" href="quiz.html"><span class="my-ql-icon">🎯</span><span>技能測驗</span></a>
    <a class="my-qlink" href="invite.html"><span class="my-ql-icon">🎁</span><span>邀請好友</span></a>
    <a class="my-qlink" href="achievement.html"><span class="my-ql-icon">🏅</span><span>學習成就</span></a>
    <a class="my-qlink" href="notebook.html"><span class="my-ql-icon">📝</span><span>學習筆記</span></a>
    <a class="my-qlink" href="report.html"><span class="my-ql-icon">📈</span><span>學習報告</span></a>
    <a class="my-qlink" href="leaderboard.html"><span class="my-ql-icon">📊</span><span>排行榜</span></a>
  </div>

  ${inProgress.length ? `<!-- 繼續學習 -->
  <div class="wrap my-resume rv-up">
    <div class="my-resume-head"><h2>繼續學習</h2><a href="#" class="my-resume-all" data-goto-courses>查看全部 →</a></div>
    <div class="my-resume-list">${inProgress.slice(0, 3).map(c => `<a class="my-resume-card" href="player.html?id=${c.id}">
      <div class="my-rc-thumb"><img src="assets/img/v${c.v}.jpg" alt="${c.title}" loading="lazy" decoding="async"><div class="my-rc-play">▶</div></div>
      <div class="my-rc-body">
        <h3>${c.title}</h3>
        <p class="my-rc-teacher">${c.teacher}・${c.lastWatch}</p>
        <div class="my-rc-bar"><div class="my-rc-fill" style="width:${c.progress}%"></div></div>
        <span class="my-rc-pct">已完成 ${c.progress}%</span>
      </div>
    </a>`).join('')}</div>
  </div>` : ''}

  <div class="myp-layout">
    <aside class="myp-aside rv-up">
      <div class="myp-profile">
        <div class="myp-avatar">學</div>
        <h3 class="myp-name">學員</h3>
        <p class="myp-email">user@aiclass.tw</p>
      </div>
      <nav class="myp-nav">
        <button class="myp-nav-btn on" data-sec="courses">📚 我的課程</button>
        <button class="myp-nav-btn" data-sec="dashboard">📊 學習儀表板</button>
        <button class="myp-nav-btn" data-sec="calendar">📅 學習紀錄</button>
        <button class="myp-nav-btn" data-sec="activity">⏰ 最近動態</button>
        <button class="myp-nav-btn" data-sec="wishlist">♡ 心願清單</button>
        <a href="order-history.html" class="myp-nav-btn" style="text-align:left;text-decoration:none;color:inherit">🧾 訂單紀錄</a>
        <button class="myp-nav-btn" data-sec="coupons">🎟️ 優惠券</button>
        <button class="myp-nav-btn" data-sec="following">👤 追蹤講師</button>
        <a href="notebook.html" class="myp-nav-btn" style="text-align:left;text-decoration:none;color:inherit">📝 學習筆記</a>
        <a href="report.html" class="myp-nav-btn" style="text-align:left;text-decoration:none;color:inherit">📈 學習報告</a>
        <a href="settings.html" class="myp-nav-btn" style="text-align:left;text-decoration:none;color:inherit">⚙️ 帳號設定</a>
        <button class="myp-nav-btn" data-sec="weekly">📰 本週週報</button>
        <button class="myp-nav-btn" data-sec="achievements">🏅 成就徽章</button>
        <a href="quiz.html" class="myp-nav-btn" style="text-align:left;text-decoration:none;color:inherit">🎯 技能測驗</a>
        <a href="certificate.html" class="myp-nav-btn" style="text-align:left;text-decoration:none;color:inherit">🏆 結業證書</a>
      </nav>
      <div class="myp-aside-stats">
        <div><b>${enrolled.length}</b><span>課程</span></div>
        <div><b>${totalHours}</b><span>時數</span></div>
        <div><b>${totalPts}</b><span>點數</span></div>
      </div>
    </aside>
    <div class="myp-main">
      <!-- 我的課程 -->
      <section class="myp-sec" id="myp-sec-courses">
        <h2 class="myp-sec-title rv-up">我的課程</h2>
        <div class="myp-stats rv-up">
          <div class="myp-stat"><b>${enrolled.length}</b><span>已購課程</span></div>
          <div class="myp-stat"><b>${completed}</b><span>已完成</span></div>
          <div class="myp-stat"><b>${totalHours}</b><span>總時數</span></div>
          <div class="myp-stat"><b>${totalPts}</b><span>學習點數</span></div>
        </div>
        <div class="myp-tabs rv-up">
          <button class="chip on" data-tab="all">全部課程</button>
          <button class="chip" data-tab="ing">學習中</button>
          <button class="chip" data-tab="done">已完成</button>
        </div>
        <div class="myp-grid" id="myp-list">
          ${enrolled.map(c => `<div class="myp-card rv-up" data-status="${c.progress === 100 ? 'done' : 'ing'}">
            <a href="course.html?id=${c.id}" class="myp-card-img"><img src="assets/img/v${c.v}.jpg" alt="${c.title}" loading="lazy" decoding="async"></a>
            <div class="myp-card-body">
              <a href="course.html?id=${c.id}"><h3>${c.title}</h3></a>
              <p class="teacher">${c.teacher}</p>
              <div class="myp-progress-row">
                <div class="myp-progress"><div class="myp-progress-fill" style="width:${c.progress}%"></div></div>
                <span>${c.progress}%</span>
              </div>
              <div class="myp-card-foot">
                <span class="myp-meta">${c.lastWatch}</span>
                ${c.progress === 100 ? '<button class="btn btn-ghost btn-sm myp-cert-btn" data-cert-course="' + c.id + '">🏆 證書</button>' : ''}
                <a href="player.html?id=${c.id}" class="btn btn-pri btn-sm">${c.progress === 100 ? '複習' : '繼續學習'}</a>
              </div>
            </div>
          </div>`).join('')}
        </div>
      </section>

      <!-- 學習儀表板 -->
      <section class="myp-sec" id="myp-sec-dashboard" hidden>
        <h2 class="myp-sec-title rv-up">📊 學習儀表板</h2>
        <div class="dash-fire-banner rv-up">
          <div class="dash-fire-icon">🔥</div>
          <div class="dash-fire-info"><b>連續學習 ${streakDays} 天！</b><p>保持每天學習，解鎖更多獎勵 — 下一個里程碑：${streakDays < 7 ? '7' : streakDays < 14 ? '14' : streakDays < 30 ? '30' : '60'} 天</p></div>
          <div class="dash-fire-progress"><div class="dash-fire-fill" style="width:${Math.min(100, streakDays / (streakDays < 7 ? 7 : streakDays < 14 ? 14 : streakDays < 30 ? 30 : 60) * 100)}%"></div></div>
        </div>
        <div class="dash-grid rv-up">
          <div class="dash-card">
            <div class="dash-card-head">累計學習時間</div>
            <div class="dash-ring"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="52" fill="none" stroke="var(--line)" stroke-width="8"/><circle cx="60" cy="60" r="52" fill="none" stroke="var(--pri)" stroke-width="8" stroke-dasharray="327" stroke-dashoffset="${327 - 327 * Math.min(1, totalHours / 100)}" stroke-linecap="round" transform="rotate(-90 60 60)"/></svg>
            <div class="dash-ring-text"><b>${totalHours}</b><span>/ 100 小時</span></div></div>
          </div>
          <div class="dash-card">
            <div class="dash-card-head">完成率</div>
            <div class="dash-ring"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="52" fill="none" stroke="var(--line)" stroke-width="8"/><circle cx="60" cy="60" r="52" fill="none" stroke="#34c759" stroke-width="8" stroke-dasharray="327" stroke-dashoffset="${327 - 327 * (completed / Math.max(1, enrolled.length))}" stroke-linecap="round" transform="rotate(-90 60 60)"/></svg>
            <div class="dash-ring-text"><b>${Math.round(completed / Math.max(1, enrolled.length) * 100)}%</b><span>${completed}/${enrolled.length} 堂</span></div></div>
          </div>
          <div class="dash-card">
            <div class="dash-card-head">學習強度</div>
            <div class="dash-bars">${['一','二','三','四','五','六','日'].map((d, i) => {
              const h = [1.5, 2, 0.5, 1, 2.5, 3, 1.5][i];
              return `<div class="dash-bar"><div class="dash-bar-fill" style="height:${h / 3 * 100}%"></div><span>${d}</span></div>`;
            }).join('')}</div>
            <div class="dash-bar-label">本週平均 1.7 小時/天</div>
          </div>
          <div class="dash-card">
            <div class="dash-card-head">技能分佈</div>
            <div class="dash-skills">${[
              {name:'設計',pct:80},{name:'AI/科技',pct:65},{name:'繪畫',pct:45},{name:'攝影',pct:30},{name:'音樂',pct:20}
            ].map(s => `<div class="dash-skill"><span>${s.name}</span><div class="dash-skill-bar"><div class="dash-skill-fill" style="width:${s.pct}%"></div></div><span>${s.pct}%</span></div>`).join('')}</div>
          </div>
        </div>
        <div class="dash-streak rv-up">
          <div class="dash-streak-chart">${Array.from({length:30}, (_, i) => {
            const h = Math.random() < 0.7 ? (Math.random() * 3 + 0.5).toFixed(1) : 0;
            return `<div class="dash-streak-day" style="--h:${h / 4 * 100}%" title="第 ${i+1} 天：${h} 小時"></div>`;
          }).join('')}</div>
          <div class="dash-streak-label">過去 30 天學習趨勢</div>
        </div>
        <div class="dash-analytics rv-up">
          <div class="dash-chart-card">
            <h4>📈 最近 7 天學習時間</h4>
            <svg class="dash-line-chart" viewBox="0 0 300 120" aria-label="最近 7 天學習時間折線圖">
              ${(() => {
                const days = ['一','二','三','四','五','六','日'];
                const hrs = [1.5, 2.0, 0.5, 1.0, 2.5, 3.0, 1.5];
                const mx = Math.max(...hrs);
                const pts = hrs.map((h, i) => `${20 + i * 43},${100 - h / mx * 80}`);
                return `<defs><linearGradient id="lcGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--pri)" stop-opacity=".3"/><stop offset="1" stop-color="var(--pri)" stop-opacity="0"/></linearGradient></defs>
                <polygon fill="url(#lcGrad)" points="20,100 ${pts.join(' ')} 278,100"/>
                <polyline fill="none" stroke="var(--pri)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" points="${pts.join(' ')}"/>
                ${pts.map((p, i) => `<circle cx="${p.split(',')[0]}" cy="${p.split(',')[1]}" r="4" fill="var(--pri)"/><text x="${p.split(',')[0]}" y="115" text-anchor="middle" fill="var(--tx3)" font-size="10">${days[i]}</text><text x="${p.split(',')[0]}" y="${+p.split(',')[1] - 8}" text-anchor="middle" fill="var(--tx)" font-size="9" font-weight="600">${hrs[i]}h</text>`).join('')}`;
              })()}
            </svg>
            <div class="dash-chart-summary"><span>本週 <b>${[1.5,2,0.5,1,2.5,3,1.5].reduce((a,b)=>a+b,0).toFixed(1)}</b> 小時</span><span>日均 <b>${([1.5,2,0.5,1,2.5,3,1.5].reduce((a,b)=>a+b,0)/7).toFixed(1)}</b> 小時</span></div>
          </div>
          <div class="dash-chart-card">
            <h4>📊 學習分類分佈</h4>
            <div class="dash-pie-wrap">
              <svg class="dash-pie" viewBox="0 0 120 120" aria-label="學習分類圓餅圖">
                ${(() => {
                  const segs = [{name:'設計',pct:35,color:'#7c5cff'},{name:'AI/科技',pct:25,color:'#ff5c8a'},{name:'繪畫',pct:20,color:'#34c759'},{name:'攝影',pct:12,color:'#ff9500'},{name:'其他',pct:8,color:'#5ac8fa'}];
                  const r = 45, cx = 60, cy = 60;
                  let acc = 0;
                  return segs.map(s => {
                    const start = acc; acc += s.pct;
                    const a1 = (start / 100) * 2 * Math.PI - Math.PI / 2;
                    const a2 = (acc / 100) * 2 * Math.PI - Math.PI / 2;
                    const lg = s.pct > 50 ? 1 : 0;
                    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
                    const x2 = cx + r * Math.cos(a2), y2 = cy + r * Math.sin(a2);
                    return `<path d="M${cx},${cy} L${x1.toFixed(1)},${y1.toFixed(1)} A${r},${r} 0 ${lg} 1 ${x2.toFixed(1)},${y2.toFixed(1)} Z" fill="${s.color}" opacity=".85"/>`;
                  }).join('');
                })()}
              </svg>
              <div class="dash-pie-legend">
                ${[{name:'設計',pct:35,color:'#7c5cff'},{name:'AI/科技',pct:25,color:'#ff5c8a'},{name:'繪畫',pct:20,color:'#34c759'},{name:'攝影',pct:12,color:'#ff9500'},{name:'其他',pct:8,color:'#5ac8fa'}].map(s => `<div class="dash-pie-item"><span class="dash-pie-dot" style="background:${s.color}"></span>${s.name} ${s.pct}%</div>`).join('')}
              </div>
            </div>
          </div>
        </div>
        <div class="dash-milestones rv-up">
          <h4>🏅 學習里程碑</h4>
          <div class="dash-ml-timeline">
            ${[{icon:'🎉',title:'加入 AI Class',date:'2026/03/15',done:true},{icon:'🛒',title:'購買第一堂課',date:'2026/03/16',done:true},{icon:'▶',title:'完成第一堂課時',date:'2026/03/18',done:true},{icon:'🔥',title:'連續學習 7 天',date:'2026/03/24',done:true},{icon:'📚',title:'購買第 5 堂課',date:'2026/05/10',done:true},{icon:'🏆',title:'完成第一門課程',date:'2026/06/02',done:true},{icon:'💎',title:'累積 1,000 XP',date:'2026/07/15',done:true},{icon:'🌟',title:'連續學習 30 天',date:'進行中…',done:false}].map(m => `<div class="dash-ml-item ${m.done ? 'done' : 'pending'}"><div class="dash-ml-icon">${m.icon}</div><div class="dash-ml-body"><b>${m.title}</b><span>${m.date}</span></div></div>`).join('')}
          </div>
        </div>
      </section>

      <!-- 學習紀錄 -->
      <section class="myp-sec" id="myp-sec-calendar" hidden>
        <h2 class="myp-sec-title rv-up">學習紀錄</h2>
        <div class="myp-cal-wrap rv-up">
          <div class="myp-cal-header">
            <h3>近 5 週學習日曆</h3>
            <div class="myp-cal-legend"><span class="myp-cal-dot l0"></span>0 分<span class="myp-cal-dot l1"></span>< 30 分<span class="myp-cal-dot l2"></span>< 60 分<span class="myp-cal-dot l3"></span>60+ 分</div>
          </div>
          <div class="myp-cal-grid">
            <div class="myp-cal-labels"><span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span></div>
            <div class="myp-cal-days">
              ${calDays.map(d => {
                const lvl = d.mins === 0 ? 0 : d.mins < 30 ? 1 : d.mins < 60 ? 2 : 3;
                return `<div class="myp-cal-day l${lvl}" title="${d.date.getMonth()+1}/${d.date.getDate()} — ${d.mins} 分鐘">${d.date.getDate()}</div>`;
              }).join('')}
            </div>
          </div>
          <div class="myp-cal-summary">
            <div class="myp-stat"><b>${calDays.filter(d => d.mins > 0).length}</b><span>學習天數</span></div>
            <div class="myp-stat"><b>${Math.round(calDays.reduce((s, d) => s + d.mins, 0) / 60)}</b><span>累計時數</span></div>
            <div class="myp-stat"><b>7</b><span>連續天數</span></div>
          </div>
        </div>
      </section>

      <!-- 最近動態 -->
      <section class="myp-sec" id="myp-sec-activity" hidden>
        <h2 class="myp-sec-title rv-up">⏰ 最近動態</h2>
        <div class="my-timeline rv-up">
          ${activity.map(a => `<div class="my-tl-item">
            <div class="my-tl-dot" style="background:${a.color}">${a.icon}</div>
            <div class="my-tl-body"><span class="my-tl-text">${a.text}</span><span class="my-tl-time">${a.time}</span></div>
          </div>`).join('')}
        </div>
      </section>

      <!-- 心願清單 -->
      <section class="myp-sec" id="myp-sec-wishlist" hidden>
        <h2 class="myp-sec-title rv-up">心願清單</h2>
        <div class="myp-grid">
          ${wishlist.map(c => `<div class="myp-card rv-up">
            <a href="course.html?id=${c.id}" class="myp-card-img"><img src="assets/img/v${c.v}.jpg" alt="${c.title}" loading="lazy" decoding="async"></a>
            <div class="myp-card-body">
              <a href="course.html?id=${c.id}"><h3>${c.title}</h3></a>
              <p class="teacher">${c.teacher}</p>
              <div class="myp-card-foot">
                <span class="myp-card-price"><b>NT$${c.price.toLocaleString()}</b></span>
                <button class="btn btn-pri btn-sm" onclick="toast('已加入購物車')">加入購物車</button>
              </div>
            </div>
          </div>`).join('')}
        </div>
      </section>

      <!-- 訂單記錄 -->
      <section class="myp-sec" id="myp-sec-orders" hidden>
        <h2 class="myp-sec-title rv-up">訂單記錄</h2>
        <div class="myp-orders rv-up">
          ${orders.map(o => `<div class="myp-order">
            <div class="myp-order-head">
              <span class="myp-order-id">${o.id}</span>
              <span class="myp-order-date">${o.date}</span>
              <span class="myp-order-status">${o.status}</span>
            </div>
            <div class="myp-order-items">${o.items.map(c => `<div class="myp-order-item"><img src="assets/img/v${c.v}.jpg" alt="${c.title}" loading="lazy"><span>${c.title}</span></div>`).join('')}</div>
            <div class="myp-order-total">合計 <b>NT$${o.total.toLocaleString()}</b></div>
          </div>`).join('')}
        </div>
      </section>

      <!-- 優惠券 -->
      <section class="myp-sec" id="myp-sec-coupons" hidden>
        <h2 class="myp-sec-title rv-up">優惠券 <a href="coupon.html" style="font-size:.85rem;font-weight:500;color:var(--pri);margin-left:8px">查看全部 →</a></h2>
        <div class="myp-coupons rv-up">
          ${coupons.map(cp => `<div class="myp-coupon ${cp.used ? 'used' : ''}">
            <div class="myp-coupon-left"><span class="myp-coupon-code">${cp.code}</span><span class="myp-coupon-desc">${cp.desc}</span></div>
            <div class="myp-coupon-right"><span>滿 NT$${cp.min.toLocaleString()} 可用</span><span>有效期限：${cp.expire}</span>${cp.used ? '<span class="myp-coupon-used">已使用</span>' : '<button class="btn btn-pri btn-sm" onclick="toast(\'已複製優惠碼\')">使用</button>'}</div>
          </div>`).join('')}
        </div>
      </section>

      <!-- 追蹤講師 -->
      <section class="myp-sec" id="myp-sec-following" hidden>
        <h2 class="myp-sec-title rv-up">追蹤的講師</h2>
        ${follows.size ? `<div class="my-following-grid rv-up">${[...follows].map(name => {
          const tData = C.filter(x => x.teacher === name);
          const tV = tData[0]?.v || '785';
          const tRole = tData[0]?.role || '';
          return `<a class="my-follow-card" href="instructor.html?name=${encodeURIComponent(name)}">
            <div class="my-follow-avatar"><img src="assets/img/v${tV}.jpg" alt="${name}" loading="lazy"></div>
            <div class="my-follow-info"><h3>${name}</h3><p>${tRole}</p><span>${tData.length} 門課程</span></div>
            <button class="follow-btn following my-unfollow" data-follow="${name}">✓ 已追蹤</button>
          </a>`;
        }).join('')}</div>` : '<div class="my-follow-empty rv-up"><p>還沒有追蹤任何講師</p><a href="instructor.html" class="btn btn-pri btn-sm">探索講師 →</a></div>'}
      </section>

      <!-- 帳號設定（已移至獨立頁面） -->
      <section class="myp-sec" id="myp-sec-settings" hidden>
        <h2 class="myp-sec-title rv-up">帳號設定</h2>
        <div class="set-redirect rv-up" style="text-align:center;padding:60px 20px">
          <p style="font-size:18px;margin-bottom:16px">帳號設定已移至獨立頁面，提供更完整的管理功能。</p>
          <a href="settings.html" class="btn btn-pri">前往帳號設定 →</a>
        </div>
      </section>

      <!-- 本週學習週報 -->
      <section class="myp-sec" id="myp-sec-weekly" hidden>
        <h2 class="myp-sec-title rv-up">📰 本週學習週報</h2>
        <div class="wk-report rv-up">
          <div class="wk-header"><h3>🗓️ ${(() => { const d = new Date(), m = d.getMonth() + 1, day = d.getDate(), wd = d.getDay(); const mon = new Date(d); mon.setDate(day - (wd === 0 ? 6 : wd - 1)); return `${m}/${mon.getDate()} — ${m}/${day}`; })()} 學習週報</h3></div>
          <div class="wk-stats">
            <div class="wk-stat"><div class="wk-stat-icon">⏱</div><b>${Math.round(calDays.slice(-7).reduce((s, d) => s + d.mins, 0) / 60 * 10) / 10}</b><span>小時學習</span></div>
            <div class="wk-stat"><div class="wk-stat-icon">📖</div><b>${calDays.slice(-7).filter(d => d.mins > 0).length}</b><span>天有學習</span></div>
            <div class="wk-stat"><div class="wk-stat-icon">✅</div><b>${Math.round(inProgress[0]?.progress || 0)}%</b><span>最高進度</span></div>
            <div class="wk-stat"><div class="wk-stat-icon">💎</div><b>${Math.min(350, streakDays * 50)}</b><span>獲得 XP</span></div>
          </div>
          <div class="wk-highlights">
            <h4>🌟 本週亮點</h4>
            <ul>
              <li>完成 <b>${Math.max(3, Math.round(calDays.slice(-7).reduce((s, d) => s + d.mins, 0) / 15))}</b> 堂課時</li>
              ${streakDays >= 3 ? `<li>🔥 已連續學習 <b>${streakDays} 天</b>，超棒！</li>` : '<li>💪 試著每天學一點，養成習慣吧</li>'}
              <li>花最多時間在「<b>${enrolled[0]?.title.slice(0, 15) || '課程'}…</b>」</li>
              ${completed > 0 ? `<li>🎓 已完成 <b>${completed}</b> 堂完整課程</li>` : ''}
            </ul>
          </div>
          <div class="wk-encourage">
            <p>${streakDays >= 7 ? '🏆 太厲害了！連續一週不間斷，你是真正的學習達人！' : streakDays >= 3 ? '🌱 保持得不錯！再加把勁，挑戰連續 7 天！' : '🚀 新的一週，新的開始，一起加油吧！'}</p>
          </div>
        </div>
      </section>

      <!-- 成就徽章 -->
      <section class="myp-sec" id="myp-sec-achievements" hidden>
        <h2 class="myp-sec-title rv-up">🏅 成就徽章</h2>
        <div class="gm-level rv-up">
          <div class="gm-level-info"><span class="gm-level-badge">Lv.${myLvl.lv}</span><span>${myLvl.name}</span></div>
          <div class="gm-xp-wrap"><div class="gm-xp-bar"><div class="gm-xp-fill" style="width:${myXpProg.pct}%"></div></div><span class="gm-xp-text">${totalPts.toLocaleString()} / ${(myXpProg.need || totalPts).toLocaleString()} XP</span></div>
        </div>
        <div class="gm-streak rv-up">
          <div class="gm-streak-fire">🔥</div>
          <div><b>連續學習 7 天</b><p>保持每天學習，解鎖更多成就！</p></div>
        </div>
        <div class="gm-badges rv-up">
          ${[
            {icon:'🎯',name:'首次購課',desc:'購買第一堂課程',earned:true},
            {icon:'📚',name:'收藏達人',desc:'收藏超過 5 堂課程',earned:true},
            {icon:'🔥',name:'連續 7 天',desc:'連續學習 7 天不中斷',earned:true},
            {icon:'🎓',name:'完課一門',desc:'完成一門完整課程',earned:completed>0},
            {icon:'💬',name:'社群新手',desc:'在社群發表第一篇文章',earned:false},
            {icon:'🏆',name:'測驗滿分',desc:'任一測驗取得滿分',earned:false},
            {icon:'🌟',name:'學習百時',desc:'累計學習時數達 100 小時',earned:totalHours>=100},
            {icon:'📝',name:'筆記達人',desc:'累計寫超過 10 則筆記',earned:false},
            {icon:'👥',name:'邀請好友',desc:'成功邀請一位好友加入',earned:false},
            {icon:'🛒',name:'購物專家',desc:'購買超過 10 堂課程',earned:enrolled.length>=10},
            {icon:'⭐',name:'全五星評價',desc:'為所有已購課程給予五星',earned:false},
            {icon:'🎪',name:'活動參與者',desc:'參加一次限時活動',earned:true}
          ].map(b => `<div class="gm-badge${b.earned?' earned':''}"><div class="gm-badge-icon">${b.icon}</div><h4>${b.name}</h4><p>${b.desc}</p></div>`).join('')}
        </div>
        <div class="gm-leaderboard rv-up">
          <h3>📊 本週排行榜</h3>
          <div class="gm-lb-list">${[
            {name:'王**',xp:2400,lv:8},{name:'陳**',xp:2180,lv:7},{name:'林**',xp:1960,lv:7},
            {name:'你',xp:totalHours*60,lv:Math.min(12,Math.floor(totalHours/5)+1),me:true},
            {name:'張**',xp:1200,lv:5},{name:'黃**',xp:980,lv:4},{name:'李**',xp:860,lv:4},
            {name:'吳**',xp:720,lv:3},{name:'劉**',xp:580,lv:3},{name:'蔡**',xp:440,lv:2}
          ].sort((a,b)=>b.xp-a.xp).map((u,i) => `<div class="gm-lb-row${u.me?' me':''}"><span class="gm-lb-rank">${i+1}</span><span class="gm-lb-name">${u.name}</span><span class="gm-lb-lv">Lv.${u.lv}</span><span class="gm-lb-xp">${u.xp.toLocaleString()} XP</span></div>`).join('')}</div>
        </div>
      </section>

      <section class="sec"><div class="wrap">
        <div class="sec-head rv-up"><h2>推薦你可能會喜歡</h2></div>
        <div class="rail">${C.slice(10, 18).map(c => card(c)).join('')}</div>
      </div></section>
    </div>
  </div>`;

  // Section navigation
  $$('.myp-nav-btn', main).forEach(btn => btn.onclick = () => {
    $$('.myp-nav-btn', main).forEach(b => b.classList.toggle('on', b === btn));
    $$('.myp-sec', main).forEach(s => s.hidden = s.id !== 'myp-sec-' + btn.dataset.sec);
  });

  // Course tabs filter
  $$('.myp-tabs .chip', main).forEach(btn => btn.onclick = () => {
    $$('.myp-tabs .chip', main).forEach(b => b.classList.toggle('on', b === btn));
    const tab = btn.dataset.tab;
    $$('#myp-list .myp-card', main).forEach(c => {
      c.style.display = (tab === 'all' || c.dataset.status === tab) ? '' : 'none';
    });
  });

  // Unfollow in my page
  $$('.my-unfollow', main).forEach(btn => btn.onclick = e => {
    e.preventDefault(); e.stopPropagation();
    const name = btn.dataset.follow;
    follows.delete(name); saveFollows();
    btn.closest('.my-follow-card').remove();
    toast(`已取消追蹤 ${name}`);
    if (!follows.size) { const sec = $('#myp-sec-following', main); if (sec) sec.querySelector('.my-following-grid')?.replaceWith(Object.assign(document.createElement('div'), { className: 'my-follow-empty rv-up', innerHTML: '<p>還沒有追蹤任何講師</p><a href="instructor.html" class="btn btn-pri btn-sm">探索講師 →</a>' })); }
  });

  // Certificate download from completed course card
  $$('[data-cert-course]', main).forEach(btn => btn.onclick = e => {
    e.preventDefault(); e.stopPropagation();
    const cc = byId[btn.dataset.certCourse]; if (!cc) return;
    const ov = document.createElement('div'); ov.className = 'cert-overlay'; ov.setAttribute('role','dialog'); ov.setAttribute('aria-modal','true');
    const certId = 'AIC-' + cc.id.toUpperCase() + '-' + Date.now().toString(36).toUpperCase();
    const dateStr = new Date().toLocaleDateString('zh-TW', {year:'numeric',month:'long',day:'numeric'});
    ov.innerHTML = `<div class="cert-modal"><button class="cert-modal-close" aria-label="關閉">×</button><div class="cert-preview"><div class="cert-card"><div class="cert-ribbon">AI Class</div><h2>結業證書</h2><p class="cert-name">學員</p><p class="cert-course-title">${cc.title}</p><p class="cert-body">已完成由 ${cc.teacher} 教授之課程全部 ${cc.hours} 小時內容，特此證明。</p><div class="cert-foot"><span>${dateStr}</span><span>${certId}</span></div></div></div><div class="cert-actions"><button class="btn btn-pri cert-dl-btn">📥 下載證書圖片</button><button class="btn btn-ghost cert-share-btn">📤 分享</button></div></div>`;
    document.body.append(ov);
    requestAnimationFrame(() => requestAnimationFrame(() => ov.classList.add('on')));
    const close = () => { ov.classList.remove('on'); setTimeout(() => ov.remove(), 300); };
    $('.cert-modal-close', ov).onclick = close;
    ov.onclick = ev => { if (ev.target === ov) close(); };
    $('.cert-dl-btn', ov).onclick = () => toast('證書圖片下載功能開發中');
    $('.cert-share-btn', ov).onclick = () => { navigator.clipboard.writeText(`我完成了 AI Class「${cc.title}」課程！ #AIClass #學習`); toast('已複製分享文字到剪貼簿', 'success'); };
  });

  // "繼續學習" 查看全部 → 跳到課程 tab
  const gotoBtn = $('[data-goto-courses]', main);
  if (gotoBtn) gotoBtn.onclick = e => {
    e.preventDefault();
    const btn = $('[data-sec="courses"]', main);
    if (btn) { btn.click(); btn.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  };


  bindCards(main);
  reveal(main);
}

/* ---------- 關於我們 ---------- */
function aboutPage() {
  const main = $('main');
  seo({ title: '關於我們｜AI Class', desc: '認識 AI Class 團隊與我們的使命', url: 'https://aiclass.tw/about.html' });
  const totalStudents = C.reduce((s, c) => s + c.students, 0);
  const teacherCount = [...new Set(C.map(c => c.teacher))].length;

  main.innerHTML = `
  <section class="abt-hero"><div class="wrap">
    <div class="crumb rv-up"><a href="index.html">首頁</a> › 關於我們</div>
    <h1 class="abt-title rv-up">關於 AI Class</h1>
    <p class="abt-sub rv-up">跟著業界職人，把熱情學成專業</p>
  </div></section>

  <section class="sec"><div class="wrap">
    <div class="abt-mission rv-up">
      <h2>我們的使命</h2>
      <p>AI Class 相信，每個人都有潛力成為自己領域的專家。我們匯集了來自各行業的頂尖職人，將他們多年積累的實戰經驗，轉化為系統化的線上課程，讓學習不再受限於時間和地點。</p>
      <p>從設計、繪畫、AI 科技到料理烘焙，我們涵蓋了超過 10 大領域，課程一次購買即可無限期觀看，讓你用自己的節奏學習，真正把熱情變成專業能力。</p>
    </div>
    <div class="abt-vmv rv-up" style="margin-top:40px">
      <div class="abt-vmv-card"><div class="abt-vmv-icon">🎯</div><h3>願景 Vision</h3><p>成為亞洲最值得信賴的線上學習平台，讓每個人都能用最短的路徑，掌握改變人生的專業技能。</p></div>
      <div class="abt-vmv-card"><div class="abt-vmv-icon">💡</div><h3>使命 Mission</h3><p>連結頂尖職人與渴望學習的人，用高品質的影片課程打破知識壁壘，讓專業不再是少數人的特權。</p></div>
      <div class="abt-vmv-card"><div class="abt-vmv-icon">⭐</div><h3>核心價值 Values</h3><p>實戰為本、品質至上、終身學習、共好共創——我們堅信教育應該讓人成長，而非製造焦慮。</p></div>
    </div>
  </div></section>

  <section class="sec"><div class="wrap">
    <div class="stats rv-up" id="abt-stats">
      <div class="stat"><b data-count="${C.length}">0</b><span>精選課程</span></div>
      <div class="stat"><b data-count="${teacherCount}">0</b><span>頂尖講師</span></div>
      <div class="stat"><b data-count="${Math.round(totalStudents / 10000)}" data-suffix=" 萬+">0</b><span>學員人次</span></div>
      <div class="stat"><b data-count="98" data-suffix="%">0</b><span>好評率</span></div>
    </div>
  </div></section>

  <section class="sec"><div class="wrap">
    <h2 class="ent-sec-title rv-up">發展歷程</h2>
    <div class="abt-timeline">
      <div class="abt-tl-item rv-up"><div class="abt-tl-dot"></div><div class="abt-tl-content"><span class="abt-tl-year">2023</span><h3>平台創立</h3><p>以「讓每個人都能跟頂尖職人學習」為理念，AI Class 正式上線</p></div></div>
      <div class="abt-tl-item rv-up"><div class="abt-tl-dot"></div><div class="abt-tl-content"><span class="abt-tl-year">2024</span><h3>精選課程上線</h3><p>與 ${teacherCount}+ 位業界講師合作，涵蓋設計、程式、AI、攝影等 10 大領域</p></div></div>
      <div class="abt-tl-item rv-up"><div class="abt-tl-dot"></div><div class="abt-tl-content"><span class="abt-tl-year">2025</span><h3>AI 學習助手上線</h3><p>導入 AI 技術，提供個人化學習路徑推薦與智慧筆記功能</p></div></div>
      <div class="abt-tl-item rv-up"><div class="abt-tl-dot"></div><div class="abt-tl-content"><span class="abt-tl-year">2026</span><h3>邁向國際</h3><p>累積超過 ${Math.round(totalStudents / 10000)} 萬學員，持續擴展更多語言與領域</p></div></div>
    </div>
  </div></section>

  <section class="sec"><div class="wrap">
    <h2 class="ent-sec-title rv-up">我們的價值觀</h2>
    <div class="ent-feature-grid">
      <div class="ent-feature rv-up"><div class="ent-feature-icon">🎯</div><h3>實戰導向</h3><p>每堂課都以實際成果為目標設計，學完就能直接應用在工作或創作上，而不只是理論。</p></div>
      <div class="ent-feature rv-up"><div class="ent-feature-icon">🏆</div><h3>品質堅持</h3><p>嚴格篩選講師資格，每堂課經過完整的課程設計審核、影片品質把關，確保學習體驗。</p></div>
      <div class="ent-feature rv-up"><div class="ent-feature-icon">♾️</div><h3>終身學習</h3><p>一次購買、無限期觀看、免費更新，我們相信持續學習不應該有時間壓力。</p></div>
      <div class="ent-feature rv-up"><div class="ent-feature-icon">🤝</div><h3>社群共學</h3><p>每堂課設有討論區，讓你和講師、同學交流，學習路上不孤單。</p></div>
      <div class="ent-feature rv-up"><div class="ent-feature-icon">🌏</div><h3>多元包容</h3><p>涵蓋 10 大領域、超過 ${C.length} 堂課程，從技術到創作、從入門到進階，每個人都能找到適合的學習路徑。</p></div>
      <div class="ent-feature rv-up"><div class="ent-feature-icon">🚀</div><h3>持續創新</h3><p>緊跟 AI 時代的腳步，不斷推出最新技術課程，幫助學員保持市場競爭力。</p></div>
    </div>
  </div></section>

  <section class="sec"><div class="wrap">
    <h2 class="ent-sec-title rv-up">核心團隊</h2>
    <div class="abt-team">
      ${[
        { init: '林', name: '林宗翰', title: '創辦人暨執行長', bio: '連續創業者，曾任 KKBOX 產品總監，致力於讓每個人都能享有頂級學習資源。', grad: 'linear-gradient(135deg,#7c5cff,#5c8aff)' },
        { init: '陳', name: '陳雅婷', title: '技術長', bio: '前 Google 資深工程師，專精 AI 與大規模系統架構，打造流暢的學習體驗。', grad: 'linear-gradient(135deg,#ff5c8a,#ff8a5c)' },
        { init: '王', name: '王建宏', title: '內容總監', bio: '資深媒體人，曾任商業周刊主編，把關每一堂課的品質與學習成效。', grad: 'linear-gradient(135deg,#34c759,#5ccf8a)' },
        { init: '張', name: '張淑華', title: '設計總監', bio: 'Red Dot 設計獎得主，前 LINE 設計主管，打造直覺且美觀的使用體驗。', grad: 'linear-gradient(135deg,#ff9500,#ffc107)' },
        { init: '劉', name: '劉志偉', title: '社群經理', bio: '社群行銷專家，經營超過 50 萬粉絲社群，建立學員之間的學習連結。', grad: 'linear-gradient(135deg,#5856d6,#af52de)' },
        { init: '許', name: '許佳穎', title: '講師發展經理', bio: '前 Hahow 課程企劃，協助 ' + teacherCount + '+ 位講師打造最佳教學內容。', grad: 'linear-gradient(135deg,#00c7be,#30d5c8)' },
      ].map(m => `<div class="abt-member rv-up">
        <div class="abt-member-avatar" style="background:${m.grad}">${m.init}</div>
        <h3>${m.name}</h3>
        <span class="abt-member-title">${m.title}</span>
        <p class="abt-member-bio">${m.bio}</p>
      </div>`).join('')}
    </div>
  </div></section>

  <section class="sec"><div class="wrap">
    <div class="abt-cta rv-up">
      <h2>開始你的學習旅程</h2>
      <p>加入超過 ${(totalStudents / 10000).toFixed(0)} 萬學員的行列，找到你的下一堂課</p>
      <div style="display:flex;gap:12px;justify-content:center;margin-top:24px">
        <a class="btn btn-pri" href="index.html">探索課程</a>
        <a class="btn btn-ghost" href="teach.html">成為講師</a>
      </div>
    </div>
  </div></section>`;
  reveal(main);

  const statsEl = $('#abt-stats', main);
  if (statsEl) {
    const countObs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      countObs.disconnect();
      statsEl.querySelectorAll('[data-count]').forEach(b => {
        const target = +b.dataset.count;
        const suffix = b.dataset.suffix || '';
        let cur = 0;
        const step = Math.max(1, Math.ceil(target / 40));
        const iv = setInterval(() => {
          cur = Math.min(cur + step, target);
          b.textContent = cur + suffix;
          if (cur >= target) clearInterval(iv);
        }, 30);
      });
    }, { threshold: 0.3 });
    countObs.observe(statsEl);
  }
}

/* ---------- 完整 FAQ ---------- */
function faqPage() {
  const main = $('main');
  const faqData = window.FAQ_FULL;

  main.innerHTML = `
  <section class="faqp-hero"><div class="wrap">
    <div class="crumb rv-up"><a href="index.html">首頁</a> › 常見問題</div>
    <h1 class="faqp-title rv-up">常見問題</h1>
    <p class="faqp-sub rv-up">找不到答案？歡迎來信 hi@aiclass.tw，我們會在 24 小時內回覆</p>
    <div class="faqp-search rv-up"><input placeholder="搜尋問題…" id="faq-search" aria-label="搜尋常見問題"></div>
  </div></section>

  <section class="sec"><div class="wrap">
    <div class="faqp-cats rv-up">
      <button class="chip on" data-cat="all">全部</button>
      ${faqData.map(g => `<button class="chip" data-cat="${g.cat}">${g.cat}</button>`).join('')}
    </div>
    <div class="faq" id="faq-list">
      ${faqData.map(g => `<div class="faqp-group" data-cat="${g.cat}">
        <h2 class="faqp-group-title rv-up">${g.cat}</h2>
        ${g.items.map(q => `<div class="qa rv-up"><button>${q[0]}<i>+</i></button><div class="a"><div><p>${q[1]}</p></div></div></div>`).join('')}
      </div>`).join('')}
    </div>
  </div></section>`;

  const allQ = faqData.flatMap(g => g.items);
  seo({
    title: '常見問題｜AI Class',
    desc: '關於 AI Class 課程、付款、退費等常見問題解答',
    url: 'https://aiclass.tw/faq.html',
    jsonLd: { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: allQ.slice(0, 20).map(q => ({ '@type': 'Question', name: q[0], acceptedAnswer: { '@type': 'Answer', text: q[1] } })) }
  });

  $$('.qa button', main).forEach(b => b.onclick = () => b.parentNode.classList.toggle('open'));

  $$('.faqp-cats .chip', main).forEach(btn => btn.onclick = () => {
    $$('.faqp-cats .chip', main).forEach(b => b.classList.toggle('on', b === btn));
    const cat = btn.dataset.cat;
    $$('#faq-list .faqp-group', main).forEach(g => {
      g.style.display = (cat === 'all' || g.dataset.cat === cat) ? '' : 'none';
    });
  });

  $('#faq-search', main).oninput = e => {
    const q = e.target.value.toLowerCase();
    $$('#faq-list .qa', main).forEach(qa => {
      qa.style.display = qa.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
    $$('#faq-list .faqp-group', main).forEach(g => {
      const visible = $$('.qa', g).some(qa => qa.style.display !== 'none');
      g.style.display = visible ? '' : 'none';
    });
  };
  reveal(main);
}

/* ---------- 成為講師 ---------- */
function teachPage() {
  const main = $('main');
  seo({ title: '成為講師｜AI Class', desc: '在 AI Class 開課，讓你的專業被看見', url: 'https://aiclass.tw/teach.html' });
  const totalStudents = C.reduce((s, c) => s + c.students, 0);
  const teacherCount = [...new Set(C.map(c => c.teacher))].length;

  main.innerHTML = `
  <section class="tch-hero"><div class="wrap">
    <div class="crumb rv-up"><a href="index.html">首頁</a> › 成為講師</div>
    <div class="tch-hero-inner rv-up">
      <span class="ent-eyebrow">JOIN US</span>
      <h1 class="tch-title">在 AI Class 開課<br>讓你的專業被看見</h1>
      <p class="tch-sub">把你多年累積的實戰經驗，轉化為線上課程，分享給更多有熱情的學習者。我們提供完整的課程製作支援、行銷資源與透明的分潤制度。</p>
      <a class="btn btn-pri" href="#tch-apply" style="height:52px;font-size:16px;padding:0 32px">立即申請開課</a>
    </div>
  </div></section>

  <section class="sec"><div class="wrap">
    <div class="stats rv-up">
      <div class="stat"><b>${(totalStudents / 10000).toFixed(1)} 萬+</b><span>平台學員</span></div>
      <div class="stat"><b>${teacherCount}+</b><span>合作講師</span></div>
      <div class="stat"><b>70%</b><span>講師分潤</span></div>
      <div class="stat"><b>0 元</b><span>開課費用</span></div>
    </div>
  </div></section>

  <section class="sec"><div class="wrap">
    <h2 class="ent-sec-title rv-up">為什麼選擇 AI Class？</h2>
    <p class="ent-sec-sub rv-up">我們幫你處理技術和行銷，你只需要專注在教學</p>
    <div class="ent-feature-grid">
      <div class="ent-feature rv-up"><div class="ent-feature-icon">🎬</div><h3>專業拍攝支援</h3><p>提供攝影棚、專業器材與拍攝團隊，讓你的課程影片達到業界水準。</p></div>
      <div class="ent-feature rv-up"><div class="ent-feature-icon">📣</div><h3>行銷推廣資源</h3><p>社群媒體、Email 行銷、SEO 優化，我們用全方位策略為你的課程帶來曝光。</p></div>
      <div class="ent-feature rv-up"><div class="ent-feature-icon">💰</div><h3>透明分潤制度</h3><p>業界最高 70% 講師分潤比例，每月結算，收入透明可追蹤。</p></div>
      <div class="ent-feature rv-up"><div class="ent-feature-icon">📊</div><h3>數據分析儀表板</h3><p>即時查看課程銷售、學員互動、評價等數據，持續優化你的課程。</p></div>
      <div class="ent-feature rv-up"><div class="ent-feature-icon">🎨</div><h3>課程設計顧問</h3><p>資深課程設計師一對一協助，從大綱規劃到章節安排，確保學習效果。</p></div>
      <div class="ent-feature rv-up"><div class="ent-feature-icon">🌐</div><h3>全球市場觸及</h3><p>課程上架後觸及全球華語學習者，品牌影響力不受地域限制。</p></div>
    </div>
  </div></section>

  <section class="ent-steps"><div class="wrap">
    <h2 class="ent-sec-title rv-up">開課流程</h2>
    <p class="ent-sec-sub rv-up">從申請到上架，最快 4 週完成</p>
    <div class="ent-step-grid">
      <div class="ent-step rv-up"><div class="ent-step-num">01</div><h3>提交申請</h3><p>填寫開課申請表，附上你的專業經歷與課程構想</p><span class="ent-step-arrow">→</span></div>
      <div class="ent-step rv-up"><div class="ent-step-num">02</div><h3>課程規劃</h3><p>與課程設計師一起規劃大綱、章節與教材</p><span class="ent-step-arrow">→</span></div>
      <div class="ent-step rv-up"><div class="ent-step-num">03</div><h3>錄製拍攝</h3><p>使用我們的攝影棚或遠端錄製，製作高品質影片</p><span class="ent-step-arrow">→</span></div>
      <div class="ent-step rv-up"><div class="ent-step-num">04</div><h3>審核上架</h3><p>通過品質審核後正式上架，開始觸及全球學員</p></div>
    </div>
  </div></section>

  <section class="sec"><div class="wrap">
    <h2 class="ent-sec-title rv-up">成功講師的故事</h2>
    <p class="ent-sec-sub rv-up">聽聽他們怎麼說</p>
    <div class="ent-testi-grid">
      ${[
        { name: '張明哲', role: '資深 UI 設計師 → AI Class 講師', text: '從兼職開課到月收入超過正職薪水，AI Class 的行銷團隊幫我帶來了超乎想像的學員數。現在我可以全心投入教學，做自己最熱愛的事。', stat: '累計學員 8,000+' },
        { name: '李婉如', role: '前 Google 工程師 → AI 課程講師', text: '我一開始很擔心不會教，但課程設計師手把手協助我規劃大綱，拍攝團隊也很專業。上架第一個月就賣了 500 套，完全超出預期。', stat: '首月銷售 500+' },
        { name: '陳冠廷', role: '自由接案攝影師 → 攝影教學講師', text: '開課讓我的個人品牌大幅提升，不只課程收入穩定，接案報價也因為「講師」身份翻倍。AI Class 真的改變了我的職涯。', stat: '接案報價提升 200%' },
      ].map((s, i) => `<div class="ent-testi rv-up" style="transition-delay:${i * 80}ms">
        <div class="ent-testi-stars">★★★★★</div>
        <p>"${s.text}"</p>
        <div class="ent-testi-author"><b>${s.name}</b><span>${s.role}</span></div>
        <div class="tch-story-stat">${s.stat}</div>
      </div>`).join('')}
    </div>
  </div></section>

  <section class="sec"><div class="wrap">
    <h2 class="ent-sec-title rv-up">講師收入試算</h2>
    <p class="ent-sec-sub rv-up">透明的分潤制度，收入完全取決於你的課程品質</p>
    <div class="tch-calc rv-up">
      <div class="tch-calc-row"><label>課程定價</label><span>NT$ <b id="tchPrice">3,980</b></span><input type="range" id="tchPriceRange" min="990" max="9900" step="10" value="3980" aria-label="課程定價"></div>
      <div class="tch-calc-row"><label>預估月銷量</label><span><b id="tchSales">100</b> 套</span><input type="range" id="tchSalesRange" min="10" max="500" step="10" value="100" aria-label="預估月銷量"></div>
      <div class="tch-calc-result">預估月收入 <b id="tchIncome">NT$ 278,600</b></div>
      <p style="font-size:13px;color:var(--tx3);text-align:center;margin-top:8px">以 70% 分潤比例計算，實際收入依合約為準</p>
    </div>
  </div></section>

  <section class="ent-faq"><div class="wrap faq">
    <h2 class="ent-sec-title rv-up">講師常見問題</h2>
    ${[
      ['需要什麼資格才能申請？', '只要你在某個領域有 3 年以上實戰經驗，並且有熱情想分享所學，就可以申請。我們重視的是實務能力，不限制學歷或證照。'],
      ['課程拍攝需要自備器材嗎？', '不需要！我們在台北設有專業攝影棚，提供完整的拍攝設備和團隊。如果你在外縣市或海外，也可以使用我們的遠端錄製方案。'],
      ['收入什麼時候入帳？', '每月 15 日結算上個月的銷售收入，扣除平台手續費後，次月 1 日前匯入指定帳戶。後台可即時查看銷售數據。'],
      ['可以同時在其他平台開課嗎？', '可以。我們不要求獨家授權，但 AI Class 獨家的課程會獲得更多行銷資源和曝光機會。'],
      ['課程上架後可以修改嗎？', '可以隨時更新課程內容、新增章節或修改價格。我們鼓勵講師持續更新課程，保持內容的時效性。'],
    ].map(q => `<div class="qa rv-up"><button>${q[0]}<i>+</i></button><div class="a"><div><p>${q[1]}</p></div></div></div>`).join('')}
  </div></section>

  <section class="sec" id="tch-apply"><div class="wrap">
    <div class="ent-cta-box rv-up">
      <h2>準備好開始了嗎？</h2>
      <p>填寫你的資訊，我們的課程顧問會在 2 個工作天內與你聯繫</p>
      <div class="ent-cta-form">
        <input placeholder="你的姓名" aria-label="姓名">
        <input placeholder="Email" aria-label="Email">
        <input placeholder="你的專業領域" aria-label="專業領域">
        <button class="btn btn-pri" style="height:52px;flex:none;padding:0 28px" onclick="toast('示範網站：申請功能開發中')">送出申請</button>
      </div>
    </div>
  </div></section>`;

  // Income calculator
  const prR = $('#tchPriceRange', main), slR = $('#tchSalesRange', main);
  if (prR && slR) {
    const fmt = n => 'NT$ ' + n.toLocaleString();
    const calc = () => {
      const price = +prR.value, sales = +slR.value;
      $('#tchPrice', main).textContent = price.toLocaleString();
      $('#tchSales', main).textContent = sales.toLocaleString();
      $('#tchIncome', main).textContent = fmt(Math.round(price * sales * 0.7));
    };
    prR.oninput = calc; slR.oninput = calc;
  }

  $$('.qa button', main).forEach(b => b.onclick = () => b.parentNode.classList.toggle('open'));
  reveal(main);
}

/* ---------- 課程播放器 ---------- */
function playerPage() {
  const c = byId[new URLSearchParams(location.search).get('id')] || C[0];
  seo({ title: `${c.title}｜AI Class 播放器`, desc: `正在觀看：${c.title}，由 ${c.teacher} 授課`, url: `https://aiclass.tw/player.html?id=${c.id}` });
  document.title = `${c.title}｜AI Class 播放器`;
  window.trackEvent('begin_content', { item_id: c.id, item_name: c.title });
  document.body.style.setProperty('--bg', '#070710');

  const fallbackChapters = [
    { name: '課程介紹與準備', lessons: [{ t: '講師介紹與課程地圖', dur: '08:24' }, { t: '工具安裝與環境設定', dur: '12:37' }, { t: '素材下載說明', dur: '05:12' }, { t: '課前暖身練習', dur: '09:45' }] },
    { name: '基礎觀念建立', lessons: [{ t: '核心原理完整拆解', dur: '18:30' }, { t: '常見錯誤與修正方式', dur: '14:22' }, { t: '基本操作演練', dur: '11:08' }, { t: '練習：第一個小作品', dur: '20:15' }, { t: '基礎觀念複習', dur: '06:40' }] },
    { name: '進階技巧', lessons: [{ t: '職人工作流程揭密', dur: '22:10' }, { t: '效率提升的五個祕訣', dur: '15:33' }, { t: '案例分析：品牌專案', dur: '19:47' }, { t: '進階工具與插件', dur: '13:25' }] },
    { name: '完整專案實作', lessons: [{ t: '專案規劃與架構設計', dur: '16:42' }, { t: '從零開始建置（上）', dur: '25:18' }, { t: '從零開始建置（下）', dur: '28:05' }, { t: '細節修飾與完稿', dur: '17:30' }, { t: '專案優化與輸出', dur: '12:55' }, { t: '專案回顧與檢討', dur: '08:20' }] },
    { name: '作品發表與職涯', lessons: [{ t: '作品集整理技巧', dur: '14:16' }, { t: '定價與接案策略', dur: '16:08' }, { t: '客戶溝通實戰', dur: '11:43' }, { t: '個人品牌經營', dur: '13:50' }] },
    { name: '加碼：業界趨勢', lessons: [{ t: '2026 趨勢觀察', dur: '10:28' }, { t: 'AI 輔助工作流程', dur: '18:35' }, { t: '講師推薦資源', dur: '07:12' }, { t: '結語與下一步', dur: '05:55' }] }
  ];
  const randDur = () => { const m = 5 + Math.floor(Math.random() * 21), s = Math.floor(Math.random() * 60); return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`; };
  const chapters = (window.CHAPTERS && window.CHAPTERS[c.id])
    ? window.CHAPTERS[c.id].map(ch => ({ name: ch.title, lessons: ch.lessons.map(t => ({ t, dur: randDur() })) }))
    : fallbackChapters;

  let curCh = 0, curLs = 0;
  const totalLessons = chapters.reduce((s, ch) => s + ch.lessons.length, 0);
  const doneSet = new Set(['0-0','0-1','0-2','0-3','1-0','1-1','1-2']);

  function lessonId(ci, li) { return ci + '-' + li; }
  function progress() { return Math.round(doneSet.size / totalLessons * 100); }

  function renderSidebar() {
    return chapters.map((ch, ci) => {
      const doneInCh = ch.lessons.filter((_, li) => doneSet.has(lessonId(ci, li))).length;
      return `<div class="plr-ch ${ci === curCh ? 'open' : ''}">
        <button class="plr-ch-btn" data-ch="${ci}">
          <span class="plr-ch-name">第 ${ci + 1} 章　${ch.name}</span>
          <span class="plr-ch-prog">${doneInCh}/${ch.lessons.length}</span>
        </button>
        <div class="plr-lessons">${ch.lessons.map((ls, li) => {
          const done = doneSet.has(lessonId(ci, li));
          const active = ci === curCh && li === curLs;
          return `<button class="plr-ls ${active ? 'active' : ''} ${done ? 'done' : ''}" data-ch="${ci}" data-ls="${li}">
            <span class="plr-ls-icon">${done ? '✓' : active ? '▶' : '○'}</span>
            <span class="plr-ls-title">${ci + 1}-${li + 1}　${ls.t}</span>
            <span class="plr-ls-dur">${ls.dur}</span>
          </button>`;
        }).join('')}</div>
      </div>`;
    }).join('');
  }

  const QA_DATA = [
    { user: '王**', time: '2 天前', q: '請問第三章的素材連結在哪裡下載？', a: '素材已更新在第三章第一課的附件區，請重新整理後下載。', likes: 12 },
    { user: '李**', time: '5 天前', q: '老師推薦的外掛是付費的嗎？有免費替代方案嗎？', a: '課程中介紹的主要外掛都有免費版本可以使用，付費版只是多了一些進階功能，初學者用免費版就夠了。', likes: 28 },
    { user: '張**', time: '1 週前', q: '作品集需要放幾個作品比較適合？', a: '建議精選 5-8 個代表作品即可，質量比數量重要。每個作品都要附上設計思路和成果說明。', likes: 35 },
    { user: '陳**', time: '2 週前', q: '完成課程後可以接到什麼價位的案子？', a: '依照市場行情，初階約 5,000-15,000/案，累積作品後可以逐步提升到 30,000 以上。重點是先累積作品和口碑。', likes: 19 },
  ];

  const main = $('main');
  main.innerHTML = `
  <div class="plr-wrap">
    <header class="plr-hdr">
      <a href="index.html" class="plr-logo">AI Class</a>
      <span class="plr-course-name">${c.title}</span>
      <div class="plr-hdr-right">
        <span class="plr-prog-txt">${progress()}% 完成</span>
        <a href="course.html?id=${c.id}" class="plr-back">← 課程詳情</a>
        <button class="plr-sidebar-toggle" aria-label="章節列表">☰</button>
      </div>
    </header>
    <div class="plr-body">
      <div class="plr-main">
        <div class="plr-video-wrap">
          <video id="plr-vid" src="${vid(c)}" poster="${img(c)}" preload="metadata" playsinline></video>
          <div class="plr-controls">
            <div class="plr-progress-bar" id="plr-pbar" role="slider" aria-label="播放進度" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><div class="plr-progress-fill" id="plr-pfill"></div><div class="plr-progress-handle" id="plr-phandle"></div></div>
            <div class="plr-ctrl-row">
              <div class="plr-ctrl-left">
                <button id="plr-play" class="plr-ctrl-btn" aria-label="播放">▶</button>
                <button id="plr-prev-ls" class="plr-ctrl-btn" aria-label="上一課">⏮</button>
                <button id="plr-next-ls" class="plr-ctrl-btn" aria-label="下一課">⏭</button>
                <div class="plr-vol-wrap">
                  <button id="plr-mute" class="plr-ctrl-btn" aria-label="靜音">🔊</button>
                  <input type="range" id="plr-vol" min="0" max="1" step="0.05" value="1" class="plr-vol-slider" aria-label="音量">
                </div>
                <span class="plr-time" id="plr-time">0:00 / 0:00</span>
              </div>
              <div class="plr-ctrl-right">
                <div class="plr-speed-wrap">
                  <button id="plr-speed" class="plr-ctrl-btn">1x</button>
                  <div class="plr-speed-menu" id="plr-speed-menu" hidden>
                    <button data-spd="0.5">0.5x</button><button data-spd="0.75">0.75x</button><button data-spd="1" class="on">1x</button><button data-spd="1.25">1.25x</button><button data-spd="1.5">1.5x</button><button data-spd="2">2x</button>
                  </div>
                </div>
                <label class="plr-autoplay"><input type="checkbox" id="plr-auto" checked><span>自動播放</span></label>
                <button id="plr-sub" class="plr-ctrl-btn plr-sub-on" aria-label="字幕" title="字幕開關">CC</button>
                <button id="plr-bm-add" class="plr-ctrl-btn" aria-label="加入書籤" title="B: 加入書籤">🔖</button>
                <button id="plr-pip" class="plr-ctrl-btn" aria-label="子母畫面">⧉</button>
                <button id="plr-fs" class="plr-ctrl-btn" aria-label="全螢幕">⛶</button>
                <button id="plr-keys" class="plr-ctrl-btn" aria-label="快捷鍵" title="Space: 播放/暫停\n←→: 前/後 10 秒\nF: 全螢幕\nB: 書籤">⌨</button>
              </div>
            </div>
          </div>
          <div class="plr-subtitle-bar" id="plr-subtitle" aria-live="polite"></div>
          <div class="plr-lesson-bar" id="plr-lesson-bar">
            <span class="plr-lb-chapter">第 1 章</span>
            <span class="plr-lb-sep">›</span>
            <span class="plr-lb-title">1-1　${chapters[0].lessons[0].t}</span>
          </div>
          <div class="plr-nav-row">
            <button class="plr-nav-btn" id="plr-nav-prev" aria-label="上一課">← 上一課</button>
            <button class="plr-nav-btn plr-nav-next" id="plr-nav-next" aria-label="下一課">下一課 →</button>
          </div>
        </div>
      <div class="plr-shortcuts-overlay" id="plr-shortcuts" hidden role="dialog" aria-modal="true" aria-label="鍵盤快捷鍵">
        <div class="plr-shortcuts-panel">
          <div class="plr-shortcuts-head"><h3>⌨ 鍵盤快捷鍵</h3><button class="plr-shortcuts-close" aria-label="關閉">✕</button></div>
          <div class="plr-shortcuts-grid">
            <div class="plr-sc-item"><kbd>Space</kbd><span>播放 / 暫停</span></div>
            <div class="plr-sc-item"><kbd>←</kbd><span>後退 10 秒</span></div>
            <div class="plr-sc-item"><kbd>→</kbd><span>前進 10 秒</span></div>
            <div class="plr-sc-item"><kbd>↑</kbd><span>增加音量</span></div>
            <div class="plr-sc-item"><kbd>↓</kbd><span>降低音量</span></div>
            <div class="plr-sc-item"><kbd>M</kbd><span>靜音切換</span></div>
            <div class="plr-sc-item"><kbd>F</kbd><span>全螢幕</span></div>
            <div class="plr-sc-item"><kbd>P</kbd><span>子母畫面</span></div>
            <div class="plr-sc-item"><kbd>B</kbd><span>加入書籤</span></div>
            <div class="plr-sc-item"><kbd>?</kbd><span>顯示此面板</span></div>
          </div>
        </div>
      </div>
      </div>
      <div class="plr-sidebar-overlay" id="plr-sb-overlay"></div>
      <aside class="plr-sidebar" id="plr-sidebar">
        <div class="plr-sb-tabs">
          <button class="plr-sb-tab on" data-tab="chapters">章節目錄</button>
          <button class="plr-sb-tab" data-tab="notes">筆記</button>
          <button class="plr-sb-tab" data-tab="bookmarks">書籤</button>
          <button class="plr-sb-tab" data-tab="qa">Q&A</button>
          <button class="plr-sb-tab" data-tab="downloads">下載</button>
        </div>
        <div class="plr-sb-panel" id="plr-panel-chapters">
          <div class="plr-sb-head">
            <div class="plr-sb-count" id="plr-sb-count">${doneSet.size}/${totalLessons} 課完成</div>
            <div class="plr-sb-progress"><div class="plr-sb-bar"><div class="plr-sb-fill" style="width:${progress()}%"></div></div><span>${progress()}%</span></div>
          </div>
          <div class="plr-sb-list" id="plr-sb-list">${renderSidebar()}</div>
          <div class="plr-minimap" id="plr-minimap"><h4>章節進度地圖</h4>${chapters.map((ch, ci) => `<div class="plr-mm-ch"><span class="plr-mm-label">${ci+1}</span><div class="plr-mm-dots">${ch.lessons.map((_, li) => `<span class="plr-mm-dot ${doneSet.has(lessonId(ci,li))?'done':''} ${ci===curCh&&li===curLs?'active':''}" data-ch="${ci}" data-ls="${li}" title="${ci+1}-${li+1} ${ch.lessons[li].t}"></span>`).join('')}</div></div>`).join('')}</div>
        </div>
        <div class="plr-sb-panel" id="plr-panel-bookmarks" hidden>
          <div class="plr-bm-list" id="plr-bm-list"></div>
          <div class="plr-bm-empty" id="plr-bm-empty">按 <kbd>B</kbd> 或點 🔖 在目前播放位置加入書籤</div>
        </div>
        <div class="plr-sb-panel" id="plr-panel-notes" hidden>
          <div class="plr-notes-sb">
            <textarea id="plr-note" placeholder="在這裡記下學習重點…" rows="12" aria-label="學習筆記"></textarea>
            <div class="plr-note-actions">
              <span class="plr-note-info">筆記自動儲存在本機</span>
              <button class="plr-note-stamp" id="plr-stamp">+ 加入時間戳記</button>
              <button class="plr-note-export" id="plr-note-export">📥 匯出筆記</button>
            </div>
          </div>
        </div>
        <div class="plr-sb-panel" id="plr-panel-qa" hidden>
          <div class="plr-qa-list">
            ${QA_DATA.map(q => `<div class="plr-qa-item">
              <div class="plr-qa-head"><b>${q.user}</b><span>${q.time}</span></div>
              <div class="plr-qa-q">${q.q}</div>
              <div class="plr-qa-a"><span class="plr-qa-badge">講師回覆</span>${q.a}</div>
              <div class="plr-qa-foot"><button class="plr-qa-like">♡ ${q.likes}</button></div>
            </div>`).join('')}
            <div class="plr-qa-input">
              <textarea placeholder="輸入你的問題…" rows="3" aria-label="提問內容"></textarea>
              <button class="btn btn-pri" onclick="toast('示範網站：提問功能開發中')">送出提問</button>
            </div>
          </div>
        </div>
        <div class="plr-sb-panel" id="plr-panel-downloads" hidden>
          <div class="plr-dl-list">
            <div class="plr-dl-item"><span class="plr-dl-icon">📁</span><div class="plr-dl-info"><b>課程專案原始檔</b><span>包含完整專案檔案與素材</span></div><button class="btn btn-ghost" onclick="toast('示範網站：下載功能開發中')">下載</button></div>
            <div class="plr-dl-item"><span class="plr-dl-icon">📄</span><div class="plr-dl-info"><b>課程講義 PDF</b><span>講師整理的重點筆記</span></div><button class="btn btn-ghost" onclick="toast('示範網站：下載功能開發中')">下載</button></div>
            <div class="plr-dl-item"><span class="plr-dl-icon">🖼️</span><div class="plr-dl-info"><b>參考素材包</b><span>練習用圖片與素材</span></div><button class="btn btn-ghost" onclick="toast('示範網站：下載功能開發中')">下載</button></div>
          </div>
        </div>
      </aside>
    </div>
  </div>`;

  // Video controls
  const vid_el = $('#plr-vid');
  const playBtn = $('#plr-play');
  const pbar = $('#plr-pbar'), pfill = $('#plr-pfill'), phandle = $('#plr-phandle');
  const timeEl = $('#plr-time');

  function fmtTime(s) { const m = Math.floor(s / 60); return m + ':' + String(Math.floor(s % 60)).padStart(2, '0'); }

  playBtn.onclick = () => { vid_el.paused ? vid_el.play() : vid_el.pause(); };
  vid_el.onclick = () => { vid_el.paused ? vid_el.play() : vid_el.pause(); };
  vid_el.onplay = () => { playBtn.textContent = '⏸'; };
  vid_el.onpause = () => { playBtn.textContent = '▶'; };
  let posKey = `aic-pos-${c.id}-${curCh}-${curLs}`;
  vid_el.ontimeupdate = () => {
    if (!vid_el.duration) return;
    const pctVal = vid_el.currentTime / vid_el.duration * 100;
    pfill.style.width = pctVal + '%';
    phandle.style.left = pctVal + '%';
    pbar.setAttribute('aria-valuenow', Math.round(pctVal));
    timeEl.textContent = fmtTime(vid_el.currentTime) + ' / ' + fmtTime(vid_el.duration);
    if (Math.floor(vid_el.currentTime) % 5 === 0) ss(posKey, vid_el.currentTime.toFixed(1));
  };
  vid_el.addEventListener('loadedmetadata', () => {
    const saved = +localStorage.getItem(posKey);
    if (saved > 5 && saved < vid_el.duration - 5) {
      vid_el.currentTime = saved;
      toast(`已恢復上次播放位置 ${fmtTime(saved)}`);
    }
  }, { once: true });

  pbar.onclick = e => {
    const r = pbar.getBoundingClientRect();
    vid_el.currentTime = ((e.clientX - r.left) / r.width) * vid_el.duration;
  };

  // Volume
  const volSlider = $('#plr-vol'), muteBtn = $('#plr-mute');
  volSlider.oninput = () => { vid_el.volume = +volSlider.value; muteBtn.textContent = vid_el.volume === 0 ? '🔇' : '🔊'; };
  muteBtn.onclick = () => { vid_el.muted = !vid_el.muted; muteBtn.textContent = vid_el.muted ? '🔇' : '🔊'; };

  // Speed
  const speedBtn = $('#plr-speed'), speedMenu = $('#plr-speed-menu');
  speedBtn.onclick = () => { speedMenu.hidden = !speedMenu.hidden; };
  $$('[data-spd]', speedMenu).forEach(b => b.onclick = () => {
    vid_el.playbackRate = +b.dataset.spd;
    speedBtn.textContent = b.dataset.spd + 'x';
    $$('[data-spd]', speedMenu).forEach(x => x.classList.toggle('on', x === b));
    speedMenu.hidden = true;
  });

  // Fullscreen
  $('#plr-fs').onclick = () => {
    const w = $('.plr-video-wrap');
    if (document.fullscreenElement) document.exitFullscreen();
    else w.requestFullscreen();
  };

  // PiP
  $('#plr-pip').onclick = () => {
    if (document.pictureInPictureElement) document.exitPictureInPicture();
    else vid_el.requestPictureInPicture && vid_el.requestPictureInPicture();
  };

  // Sidebar toggle + overlay
  const sidebar = $('#plr-sidebar');
  const sbOverlay = $('#plr-sb-overlay');
  const toggleSb = () => { sidebar.classList.toggle('open'); sbOverlay.classList.toggle('on'); };
  $('.plr-sidebar-toggle').onclick = toggleSb;
  sbOverlay.onclick = toggleSb;

  // Lesson nav below video
  $('#plr-nav-prev').onclick = () => {
    if (curLs > 0) goLesson(curCh, curLs - 1);
    else if (curCh > 0) goLesson(curCh - 1, chapters[curCh - 1].lessons.length - 1);
  };
  $('#plr-nav-next').onclick = () => {
    if (curLs < chapters[curCh].lessons.length - 1) goLesson(curCh, curLs + 1);
    else if (curCh < chapters.length - 1) goLesson(curCh + 1, 0);
  };

  // Sidebar tabs
  $$('.plr-sb-tab').forEach(tab => tab.onclick = () => {
    $$('.plr-sb-tab').forEach(t => t.classList.toggle('on', t === tab));
    $$('.plr-sb-panel').forEach(p => p.hidden = p.id !== 'plr-panel-' + tab.dataset.tab);
  });

  function updateLessonBar() {
    const bar = $('#plr-lesson-bar');
    if (bar) {
      bar.querySelector('.plr-lb-chapter').textContent = `第 ${curCh + 1} 章`;
      bar.querySelector('.plr-lb-title').textContent = `${curCh + 1}-${curLs + 1}　${chapters[curCh].lessons[curLs].t}`;
    }
  }

  // Lesson navigation
  function goLesson(ci, li) {
    doneSet.add(lessonId(curCh, curLs));
    curCh = ci; curLs = li;
    posKey = `aic-pos-${c.id}-${curCh}-${curLs}`;
    const saved = +localStorage.getItem(posKey);
    vid_el.currentTime = (saved > 5) ? saved : 0;
    vid_el.play();
    const sb = $('#plr-sb-list');
    sb.innerHTML = renderSidebar();
    bindSidebar();
    updateLessonBar();
    updateMinimap();
    const p = progress();
    $('.plr-prog-txt').textContent = p + '% 完成';
    $('.plr-sb-fill').style.width = p + '%';
    $('.plr-sb-progress span').textContent = p + '%';
    const countEl = $('#plr-sb-count');
    if (countEl) countEl.textContent = `${doneSet.size}/${totalLessons} 課完成`;
  }

  function bindSidebar() {
    $$('.plr-ch-btn').forEach(b => b.onclick = () => b.parentNode.classList.toggle('open'));
    $$('.plr-ls').forEach(b => b.onclick = () => goLesson(+b.dataset.ch, +b.dataset.ls));
  }
  bindSidebar();
  function updateMinimap() {
    const mm = $('#plr-minimap');
    if (!mm) return;
    mm.innerHTML = `<h4>章節進度地圖</h4>${chapters.map((ch, ci) => `<div class="plr-mm-ch"><span class="plr-mm-label">${ci+1}</span><div class="plr-mm-dots">${ch.lessons.map((_, li) => `<span class="plr-mm-dot ${doneSet.has(lessonId(ci,li))?'done':''} ${ci===curCh&&li===curLs?'active':''}" data-ch="${ci}" data-ls="${li}" title="${ci+1}-${li+1} ${ch.lessons[li].t}"></span>`).join('')}</div></div>`).join('')}`;
    bindMinimap();
  }
  function bindMinimap() { $$('.plr-mm-dot').forEach(d => d.onclick = () => goLesson(+d.dataset.ch, +d.dataset.ls)); }
  bindMinimap();

  // Auto-next when video ends (with countdown overlay)
  vid_el.onended = () => {
    doneSet.add(lessonId(curCh, curLs));
    const p = progress();
    $('.plr-prog-txt').textContent = p + '% 完成';
    $('.plr-sb-fill').style.width = p + '%';
    $('.plr-sb-progress span').textContent = p + '%';
    updateMinimap();
    const auto = $('#plr-auto');
    const hasNext = curLs < chapters[curCh].lessons.length - 1 || curCh < chapters.length - 1;
    if ((!auto || auto.checked) && hasNext) {
      const nextCi = curLs < chapters[curCh].lessons.length - 1 ? curCh : curCh + 1;
      const nextLi = curLs < chapters[curCh].lessons.length - 1 ? curLs + 1 : 0;
      const nextTitle = chapters[nextCi].lessons[nextLi].t;
      const ov = document.createElement('div'); ov.className = 'plr-autoplay-overlay';
      ov.innerHTML = `<div class="plr-autoplay-ring"><svg viewBox="0 0 80 80"><circle class="ring-bg" /><circle class="ring-fg" id="ap-ring"/></svg><div class="plr-autoplay-count" id="ap-count">5</div></div>
        <div class="plr-autoplay-info"><b>下一課</b>${nextCi + 1}-${nextLi + 1}　${nextTitle}</div>
        <div class="plr-autoplay-btns"><button class="plr-ap-play" id="ap-now">立即播放</button><button class="plr-ap-cancel" id="ap-cancel">取消</button></div>`;
      const videoWrap = $('.plr-video-wrap');
      videoWrap.append(ov);
      let sec = 5, apTimer;
      const circumference = 2 * Math.PI * 36;
      const ringEl = ov.querySelector('#ap-ring');
      const countEl = ov.querySelector('#ap-count');
      const goNext = () => { clearInterval(apTimer); ov.remove(); goLesson(nextCi, nextLi); };
      const cancel = () => { clearInterval(apTimer); ov.remove(); };
      apTimer = setInterval(() => {
        sec--;
        countEl.textContent = sec;
        ringEl.style.strokeDashoffset = ((5 - sec) / 5 * circumference).toFixed(1);
        if (sec <= 0) goNext();
      }, 1000);
      ov.querySelector('#ap-now').onclick = goNext;
      ov.querySelector('#ap-cancel').onclick = cancel;
    } else if (!hasNext) {
      toast('恭喜完成所有課程！🎉'); showCompletionCelebration(c);
    }
  };

  $('#plr-prev-ls').onclick = () => {
    if (curLs > 0) goLesson(curCh, curLs - 1);
    else if (curCh > 0) goLesson(curCh - 1, chapters[curCh - 1].lessons.length - 1);
  };
  $('#plr-next-ls').onclick = () => {
    if (curLs < chapters[curCh].lessons.length - 1) goLesson(curCh, curLs + 1);
    else if (curCh < chapters.length - 1) goLesson(curCh + 1, 0);
  };

  // Notes (localStorage)
  const noteKey = 'aic-note-' + c.id;
  const noteEl = $('#plr-note');
  noteEl.value = localStorage.getItem(noteKey) || '';
  noteEl.oninput = () => ss(noteKey, noteEl.value);

  // Timestamp stamp button
  $('#plr-stamp').onclick = () => {
    const ts = fmtTime(vid_el.currentTime);
    noteEl.value += (noteEl.value ? '\n' : '') + `[${ts}] `;
    noteEl.focus();
    ss(noteKey, noteEl.value);
  };

  // Export notes
  $('#plr-note-export').onclick = () => {
    const txt = noteEl.value.trim();
    if (!txt) { toast('還沒有筆記可匯出'); return; }
    const content = `# ${c.title} — 播放器筆記\n匯出時間：${new Date().toLocaleString('zh-TW')}\n${'─'.repeat(40)}\n\n${txt}`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `AI-Class-筆記-${c.title.slice(0,20)}.txt`; a.click();
    URL.revokeObjectURL(a.href);
    toast('筆記已匯出');
  };

  // Shortcuts overlay
  const scOverlay = $('#plr-shortcuts');
  const toggleSc = () => { scOverlay.hidden = !scOverlay.hidden; if (!scOverlay.hidden) trapFocus(scOverlay); };
  $('#plr-keys').onclick = toggleSc;
  $('.plr-shortcuts-close').onclick = toggleSc;
  scOverlay.onclick = e => { if (e.target === scOverlay) toggleSc(); };

  // Keyboard shortcuts
  document.onkeydown = e => {
    if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return;
    if (e.code === 'Space') { e.preventDefault(); vid_el.paused ? vid_el.play() : vid_el.pause(); }
    if (e.code === 'ArrowLeft') { vid_el.currentTime = Math.max(0, vid_el.currentTime - 10); }
    if (e.code === 'ArrowRight') { vid_el.currentTime = Math.min(vid_el.duration, vid_el.currentTime + 10); }
    if (e.code === 'ArrowUp') { e.preventDefault(); vid_el.volume = Math.min(1, vid_el.volume + 0.1); volSlider.value = vid_el.volume; muteBtn.textContent = vid_el.volume === 0 ? '🔇' : '🔊'; }
    if (e.code === 'ArrowDown') { e.preventDefault(); vid_el.volume = Math.max(0, vid_el.volume - 0.1); volSlider.value = vid_el.volume; muteBtn.textContent = vid_el.volume === 0 ? '🔇' : '🔊'; }
    if (e.code === 'KeyM') { vid_el.muted = !vid_el.muted; muteBtn.textContent = vid_el.muted ? '🔇' : '🔊'; }
    if (e.code === 'KeyF') { const w = $('.plr-video-wrap'); document.fullscreenElement ? document.exitFullscreen() : w.requestFullscreen(); }
    if (e.code === 'KeyP') { if (vid_el.requestPictureInPicture) { document.pictureInPictureElement ? document.exitPictureInPicture() : vid_el.requestPictureInPicture(); } }
    if (e.code === 'KeyB') addBookmark();
    if (e.key === '?' || (e.shiftKey && e.code === 'Slash')) toggleSc();
    if (e.code === 'Escape' && !scOverlay.hidden) toggleSc();
  };

  // Mini player on scroll
  const videoWrap = $('.plr-video-wrap');
  if (videoWrap) {
    const miniObs = new IntersectionObserver(([entry]) => {
      const mini = !entry.isIntersecting && !vid_el.paused;
      videoWrap.classList.toggle('plr-mini', mini);
    }, { threshold: 0.3 });
    miniObs.observe(videoWrap);
    const miniClose = document.createElement('button');
    miniClose.className = 'plr-mini-close';
    miniClose.setAttribute('aria-label', '關閉迷你播放器');
    miniClose.textContent = '✕';
    miniClose.onclick = () => { vid_el.pause(); videoWrap.classList.remove('plr-mini'); };
    videoWrap.append(miniClose);
  }

  // Subtitles
  const subtitleEl = $('#plr-subtitle');
  const subBtn = $('#plr-sub');
  let subtitleOn = true;
  const subtitleKeys = chapters.flatMap((ch, ci) => ch.lessons.map((ls, li) => ({
    ci, li, text: `${ch.name}：${ls.t}`
  })));
  function updateSubtitle() {
    if (!subtitleOn || !subtitleEl) return;
    const key = subtitleKeys.find(k => k.ci === curCh && k.li === curLs);
    if (key) {
      const t = vid_el.currentTime || 0, d = vid_el.duration || 1;
      const pct = t / d;
      const tips = [key.text, `學習重點：掌握${key.text}的核心觀念`, `實作練習：跟著講師一步步完成`];
      const idx = Math.min(Math.floor(pct * tips.length), tips.length - 1);
      subtitleEl.textContent = tips[idx];
      subtitleEl.style.display = '';
    }
  }
  vid_el.addEventListener('timeupdate', updateSubtitle);
  if (subBtn) subBtn.onclick = () => {
    subtitleOn = !subtitleOn;
    subBtn.classList.toggle('plr-sub-on', subtitleOn);
    subtitleEl.style.display = subtitleOn ? '' : 'none';
    if (!subtitleOn) subtitleEl.textContent = '';
    toast(subtitleOn ? '字幕已開啟' : '字幕已關閉');
  };

  // Bookmarks
  const bmKey = 'aic-bookmarks-' + c.id;
  let bookmarks = ls(bmKey, []);
  function renderBookmarks() {
    const list = $('#plr-bm-list'), empty = $('#plr-bm-empty');
    if (!list) return;
    if (!bookmarks.length) { list.innerHTML = ''; empty.style.display = ''; return; }
    empty.style.display = 'none';
    list.innerHTML = bookmarks.map((bm, i) => `<div class="plr-bm-item" data-bmi="${i}">
      <button class="plr-bm-jump" data-bmtime="${bm.time}" title="跳轉到 ${fmtTime(bm.time)}">
        <span class="plr-bm-time">${fmtTime(bm.time)}</span>
        <span class="plr-bm-label">${bm.label}</span>
      </button>
      <button class="plr-bm-del" data-bmdel="${i}" aria-label="刪除書籤">✕</button>
    </div>`).join('');
    $$('.plr-bm-jump', list).forEach(b => b.onclick = () => { vid_el.currentTime = +b.dataset.bmtime; vid_el.play(); });
    $$('.plr-bm-del', list).forEach(b => b.onclick = () => { bookmarks.splice(+b.dataset.bmdel, 1); ss(bmKey, bookmarks); renderBookmarks(); });
  }
  renderBookmarks();
  function addBookmark() {
    const time = vid_el.currentTime;
    const label = `${chapters[curCh].name} - ${chapters[curCh].lessons[curLs].t}`;
    bookmarks.push({ time, label, ch: curCh, ls: curLs });
    bookmarks.sort((a, b) => a.time - b.time);
    ss(bmKey, bookmarks);
    renderBookmarks();
    toast(`已加入書籤 ${fmtTime(time)}`);
  }
  $('#plr-bm-add').onclick = addBookmark;

  // 學習休息提醒（每 25 分鐘）
  let studyMins = 0;
  const restTimer = setInterval(() => {
    if (!vid_el.paused) studyMins++;
    if (studyMins >= 25) {
      studyMins = 0;
      toast('⏰ 你已連續學習 25 分鐘，建議起來走走休息一下！', 'info');
    }
  }, 60000);
  window.addEventListener('beforeunload', () => clearInterval(restTimer));
}

function showCompletionCelebration(c) {
  const ov = document.createElement('div'); ov.className = 'comp-ov';
  ov.innerHTML = `<div class="comp-box">
    <canvas class="comp-confetti" width="400" height="300"></canvas>
    <div class="comp-icon">🎓</div>
    <h2>恭喜完成課程！</h2>
    <p class="comp-sub">${c.title}</p>
    <p class="comp-msg">你已完成所有課程章節，太棒了！<br>繼續保持學習的熱情 💪</p>
    <div class="comp-btns">
      <a href="certificate.html?id=${c.id}" class="btn">查看證書</a>
      <button class="btn btn-ghost comp-close">繼續瀏覽</button>
    </div>
  </div>`;
  document.body.append(ov);
  requestAnimationFrame(() => ov.classList.add('show'));
  const cvs = ov.querySelector('canvas'), ctx = cvs.getContext('2d');
  const colors = ['#7c5cff','#ff5c8a','#34c759','#ff9f0a','#5ac8fa','#af52de'];
  const pieces = Array.from({ length: 60 }, () => ({ x: Math.random()*400, y: Math.random()*-300, r: Math.random()*6+2, c: colors[Math.floor(Math.random()*6)], vx: (Math.random()-.5)*3, vy: Math.random()*3+2, rot: Math.random()*360 }));
  let raf;
  (function draw() {
    ctx.clearRect(0,0,400,300);
    pieces.forEach(p => { p.x += p.vx; p.y += p.vy; p.rot += 3; ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.rot*Math.PI/180); ctx.fillStyle = p.c; ctx.fillRect(-p.r,-p.r/2,p.r*2,p.r); ctx.restore(); if (p.y > 320) { p.y = -10; p.x = Math.random()*400; } });
    raf = requestAnimationFrame(draw);
  })();
  const close = () => { cancelAnimationFrame(raf); ov.classList.remove('show'); setTimeout(() => ov.remove(), 300); };
  ov.querySelector('.comp-close').onclick = close;
  ov.onclick = e => { if (e.target === ov) close(); };
  window.trackEvent('course_complete', { item_id: c.id, item_name: c.title });
}

/* ---------- 服務條款 ---------- */
function termsPage() {
  seo({ title: '服務條款｜AI Class', desc: 'AI Class 服務條款與使用規範', url: 'https://aiclass.tw/terms.html' });
  const main = $('main');
  main.innerHTML = `
  <section class="legal-hero"><div class="wrap">
    <div class="crumb rv-up"><a href="index.html">首頁</a> › 服務條款</div>
    <h1 class="legal-title rv-up">服務條款</h1>
    <p class="legal-sub rv-up">最後更新日期：2026 年 11 月</p>
  </div></section>
  <section class="sec"><div class="wrap">
    <div class="legal-body rv-up">
      <h2>一、總則</h2>
      <p>歡迎使用 AI Class 線上課程平台（以下簡稱「本平台」）。當您註冊帳號、瀏覽網站或購買課程時，即表示您已閱讀、瞭解並同意接受本服務條款的所有內容。若您不同意本條款的任何部分，請勿使用本平台的服務。</p>
      <p>本平台保留隨時修訂本條款的權利，修訂後的條款將公布於本頁面，並於公布時立即生效。建議您定期查閱本頁面以了解最新條款。</p>

      <h2>二、帳號管理</h2>
      <ul>
        <li>您須提供真實、準確且完整的個人資料來完成註冊。</li>
        <li>每位使用者僅能註冊一個帳號，帳號不得轉讓或借用。</li>
        <li>您有責任保管好自己的帳號密碼，因帳號遭盜用所產生的損失由使用者自行承擔。</li>
        <li>如發現帳號遭未經授權的使用，請立即聯繫我們。</li>
        <li>本平台有權在您違反本條款時，暫停或終止您的帳號。</li>
      </ul>

      <h2>三、課程購買與退費</h2>
      <h3>購買</h3>
      <ul>
        <li>課程價格以購買當下頁面顯示為準，所有價格均為新台幣含稅價。</li>
        <li>購買完成後，課程將立即開通，您可無限期觀看。</li>
        <li>本平台提供的優惠折扣碼有使用期限與條件限制，不得與其他優惠併用，除非另有說明。</li>
      </ul>
      <h3>退費</h3>
      <ul>
        <li>依消費者保護法規定，數位內容於購買後 7 日內且觀看進度未超過課程總時長 20% 者，可申請全額退費。</li>
        <li>超過上述退費期限或觀看比例者，恕不接受退費。</li>
        <li>退費將於申請核准後 14 個工作天內退回原付款方式。</li>
        <li>若因課程內容有重大瑕疵（如影片無法播放且本平台無法於合理期間內修復），不受上述退費比例限制。</li>
      </ul>

      <h2>四、使用規範</h2>
      <ul>
        <li>課程內容僅供您個人學習使用，不得以任何形式複製、錄製、下載、散佈、轉售或公開播映。</li>
        <li>不得使用任何技術手段規避本平台的內容保護機制。</li>
        <li>不得在本平台發布違法、侵權、不實、騷擾或具攻擊性的內容。</li>
        <li>不得利用本平台進行任何商業行為，除非事先取得書面同意。</li>
        <li>不得使用自動化工具（如爬蟲、機器人）存取本平台。</li>
      </ul>

      <h2>五、智慧財產權</h2>
      <p>本平台上的所有內容，包括但不限於課程影片、文字、圖片、商標、Logo、網站設計、程式碼等，均受著作權法及其他智慧財產權法律保護。未經本平台或相關權利人書面授權，不得擅自使用。</p>
      <p>講師保有其所授課程內容的著作權，並授權本平台進行必要的展示與傳輸。學員透過課程所完成的個人作品，其著作權歸學員所有。</p>

      <h2>六、免責聲明</h2>
      <ul>
        <li>本平台力求課程內容的正確性，但不保證所有內容皆為最新或完全正確，使用者應自行判斷。</li>
        <li>課程中提及的第三方工具、軟體或服務，其使用條款與風險由使用者自行承擔。</li>
        <li>本平台不保證服務將不間斷或無錯誤，因系統維護、不可抗力或其他原因導致的服務中斷，本平台不承擔責任。</li>
        <li>學員依據課程內容所做的任何商業或投資決策，本平台不承擔相關損失。</li>
      </ul>

      <h2>七、爭議處理</h2>
      <p>本條款之解釋與適用，以中華民國法律為準據法。因本條款所生之爭議，雙方同意以台灣台北地方法院為第一審管轄法院。</p>
      <p>如您對本條款有任何疑問，歡迎來信 <a href="mailto:hi@aiclass.tw">hi@aiclass.tw</a>。</p>
    </div>
  </div></section>`;
  reveal(main);
}

/* ---------- 隱私權政策 ---------- */
function privacyPage() {
  seo({ title: '隱私權政策｜AI Class', desc: 'AI Class 隱私權保護政策', url: 'https://aiclass.tw/privacy.html' });
  const main = $('main');
  main.innerHTML = `
  <section class="legal-hero"><div class="wrap">
    <div class="crumb rv-up"><a href="index.html">首頁</a> › 隱私權政策</div>
    <h1 class="legal-title rv-up">隱私權政策</h1>
    <p class="legal-sub rv-up">最後更新日期：2026 年 11 月</p>
  </div></section>
  <section class="sec"><div class="wrap">
    <div class="legal-body rv-up">
      <h2>一、前言</h2>
      <p>AI Class（以下簡稱「本平台」）非常重視您的隱私。本隱私權政策說明我們如何收集、使用、儲存與保護您的個人資料。使用本平台的服務即表示您同意本政策的內容。</p>

      <h2>二、資料收集</h2>
      <h3>我們收集的資料類型</h3>
      <ul>
        <li><b>帳號資料：</b>姓名、Email、密碼（加密儲存）、頭像。</li>
        <li><b>交易資料：</b>購買記錄、付款方式（僅保留末四碼）、發票資訊。</li>
        <li><b>學習資料：</b>觀看進度、完成記錄、筆記、作業。</li>
        <li><b>裝置資料：</b>瀏覽器類型、作業系統、IP 位址、螢幕解析度。</li>
        <li><b>使用行為：</b>瀏覽頁面、點擊操作、搜尋紀錄。</li>
      </ul>
      <h3>收集方式</h3>
      <ul>
        <li>您主動填寫的表單與註冊資訊。</li>
        <li>透過 Cookie 與類似技術自動收集。</li>
        <li>第三方登入服務（如 Google）提供的公開資料。</li>
      </ul>

      <h2>三、資料使用</h2>
      <p>我們收集的個人資料將用於以下目的：</p>
      <ul>
        <li>提供、維護和改善平台服務。</li>
        <li>處理課程購買與退費。</li>
        <li>個人化您的學習體驗與課程推薦。</li>
        <li>寄送與您帳號或課程相關的通知。</li>
        <li>寄送行銷資訊（您可隨時取消訂閱）。</li>
        <li>防止詐欺行為與維護平台安全。</li>
        <li>遵守法律義務。</li>
      </ul>

      <h2>四、Cookie 政策</h2>
      <p>本平台使用 Cookie 和類似技術來提供更好的使用體驗：</p>
      <ul>
        <li><b>必要性 Cookie：</b>維持登入狀態、購物車功能，無法關閉。</li>
        <li><b>功能性 Cookie：</b>記住您的偏好設定，如語言、播放品質。</li>
        <li><b>分析性 Cookie：</b>幫助我們了解網站的使用情況，以改善服務（如 Google Analytics）。</li>
        <li><b>行銷 Cookie：</b>用於提供與您相關的廣告內容。</li>
      </ul>
      <p>您可以透過瀏覽器設定管理或刪除 Cookie。請注意，停用部分 Cookie 可能影響網站的功能。</p>

      <h2>五、資料分享</h2>
      <p>本平台不會出售您的個人資料。在以下情況下，我們可能與第三方分享您的資料：</p>
      <ul>
        <li><b>服務供應商：</b>代為處理付款、寄送 Email、提供雲端服務的合作夥伴（受保密協議約束）。</li>
        <li><b>講師：</b>講師可查看其課程中學員的非個資統計數據（如學員人數、完課率）。</li>
        <li><b>法律要求：</b>依法院命令、政府機關要求或法律規定。</li>
        <li><b>企業轉讓：</b>若本平台發生合併、收購或資產出售，您的資料可能隨之移轉（將事先通知）。</li>
      </ul>

      <h2>六、資料安全</h2>
      <ul>
        <li>所有資料傳輸均使用 SSL/TLS 加密。</li>
        <li>密碼以不可逆加密方式儲存。</li>
        <li>付款資訊由符合 PCI DSS 標準的第三方處理。</li>
        <li>定期進行安全性評估與弱點掃描。</li>
        <li>限制內部人員存取個人資料的權限。</li>
      </ul>
      <p>儘管我們盡最大努力保護您的資料，但沒有任何網際網路傳輸或電子儲存方式是 100% 安全的。</p>

      <h2>七、您的權利</h2>
      <p>依據個人資料保護法，您享有以下權利：</p>
      <ul>
        <li>查詢或請求閱覽您的個人資料。</li>
        <li>請求製給複製本。</li>
        <li>請求補充或更正。</li>
        <li>請求停止蒐集、處理或利用。</li>
        <li>請求刪除。</li>
      </ul>
      <p>如需行使上述權利，請來信 <a href="mailto:hi@aiclass.tw">hi@aiclass.tw</a>，我們將在 30 天內回覆。</p>

      <h2>八、兒童隱私</h2>
      <p>本平台不針對未滿 16 歲的兒童提供服務。若我們發現不慎收集了兒童的個人資料，將立即刪除。如果您認為您的孩子向我們提供了個人資料，請聯繫我們。</p>

      <h2>九、政策修訂</h2>
      <p>本平台保留隨時修訂本隱私權政策的權利。重大變更時，我們將透過 Email 或網站公告通知您。修訂後的政策將於本頁面公布後立即生效。</p>
      <p>如您對本隱私權政策有任何疑問，歡迎來信 <a href="mailto:hi@aiclass.tw">hi@aiclass.tw</a>。</p>
    </div>
  </div></section>`;
  reveal(main);
}

/* ---------- 結帳頁 ---------- */
function checkoutPage() {
  seo({ title: '結帳｜AI Class', desc: '確認訂單並完成付款', url: 'https://aiclass.tw/checkout.html' });
  const main = $('main');
  const items = [...cart].map(id => byId[id]).filter(Boolean);
  if (!items.length) { location.href = 'cart.html'; return; }

  const subtotal = items.reduce((s, c) => s + c.price, 0);
  const saved = items.reduce((s, c) => s + (c.origin - c.price), 0);

  main.innerHTML = `<div class="wrap ck-wrap">
    <div class="ck-steps">
      <div class="ck-step-item done"><span class="ck-step-num">✓</span><span>購物車</span></div>
      <div class="ck-step-line done"></div>
      <div class="ck-step-item active"><span class="ck-step-num">2</span><span>填寫資料</span></div>
      <div class="ck-step-line"></div>
      <div class="ck-step-item"><span class="ck-step-num">3</span><span>付款</span></div>
      <div class="ck-step-line"></div>
      <div class="ck-step-item"><span class="ck-step-num">4</span><span>完成</span></div>
    </div>
    <h1 class="ck-title">結帳</h1>
    <div class="ck-layout">
      <div class="ck-left">
        <section class="ck-section">
          <h2><span class="ck-step">1</span>付款方式</h2>
          <div class="ck-pay-methods">
            <label class="ck-pay-option active"><input type="radio" name="pay" value="card" checked><span class="ck-pay-icon">💳</span><span>信用卡 / 金融卡</span></label>
            <label class="ck-pay-option"><input type="radio" name="pay" value="line"><span class="ck-pay-icon">🟢</span><span>LINE Pay</span></label>
            <label class="ck-pay-option"><input type="radio" name="pay" value="cvs"><span class="ck-pay-icon">🏪</span><span>超商代碼繳費</span></label>
            <label class="ck-pay-option"><input type="radio" name="pay" value="atm"><span class="ck-pay-icon">🏧</span><span>ATM 轉帳</span></label>
          </div>
          <div class="ck-card-form" id="cardForm">
            <div class="ck-field"><label>卡號 <span class="ck-card-type" id="ckCardType"></span></label><input type="text" id="ckCardNum" inputmode="numeric" placeholder="0000 0000 0000 0000" maxlength="19" autocomplete="cc-number"></div>
            <div class="ck-field-row">
              <div class="ck-field"><label>有效期限</label><input type="text" id="ckExpiry" inputmode="numeric" placeholder="MM/YY" maxlength="5" autocomplete="cc-exp"></div>
              <div class="ck-field"><label>安全碼</label><input type="text" id="ckCvv" inputmode="numeric" placeholder="CVV" maxlength="4" autocomplete="cc-csc"></div>
            </div>
            <div class="ck-field"><label>持卡人姓名</label><input type="text" placeholder="王大明" autocomplete="cc-name"></div>
          </div>
        </section>

        <section class="ck-section">
          <h2><span class="ck-step">2</span>優惠碼</h2>
          <div class="ck-coupon-row"><input id="ckCoupon" placeholder="輸入優惠碼" aria-label="優惠碼"><button class="btn btn-ghost" id="ckCouponBtn">套用</button></div>
        </section>

        <section class="ck-section">
          <h2><span class="ck-step">3</span>發票資訊</h2>
          <div class="ck-pay-methods">
            <label class="ck-pay-option active"><input type="radio" name="inv" value="donate" checked><span>捐贈發票</span></label>
            <label class="ck-pay-option"><input type="radio" name="inv" value="personal"><span>個人電子發票</span></label>
            <label class="ck-pay-option"><input type="radio" name="inv" value="company"><span>公司戶發票</span></label>
          </div>
        </section>

        <section class="ck-section">
          <h2><span class="ck-step">4</span>Email 確認</h2>
          <div class="ck-field"><label>Email</label><input type="email" placeholder="your@email.com" value=""></div>
          <p class="ck-hint">訂單確認信與發票將寄送至此 Email</p>
        </section>
      </div>

      <aside class="ck-right">
        <div class="ck-order-summary">
          <h3>訂單明細</h3>
          <div class="ck-order-items">${items.map(c => `<div class="ck-order-item">
            <img src="${img(c)}" alt="${c.title}" loading="lazy">
            <div class="ck-order-item-info"><div class="ck-order-item-title">${c.title}</div><div class="ck-order-item-teacher">${c.teacher}</div></div>
            <div class="ck-order-item-price">${fmt(c.price)}</div>
          </div>`).join('')}</div>
          <div class="ck-divider"></div>
          <div class="ck-row"><span>商品小計 (${items.length} 件)</span><span>${fmt(subtotal)}</span></div>
          <div class="ck-row ck-saved"><span>已省下</span><span>-${fmt(saved)}</span></div>
          <div class="ck-row ck-discount-row" id="ckDiscountRow" style="color:var(--tx3)"><span>優惠碼折扣</span><span id="ckDiscountAmt">—</span></div>
          <div class="ck-divider"></div>
          <div class="ck-row ck-total"><span>應付金額</span><span id="ckTotalAmt">${fmt(subtotal)}</span></div>
          <button class="btn btn-pri ck-submit" id="ckSubmit">確認付款 ${fmt(subtotal)}</button>
          <ul class="ck-perks"><li>🔒 SSL 加密安全付款</li><li>✓ 7 天無條件退費保證</li><li>✓ 付款後立即開通課程</li><li>🎓 含完課結業證書</li></ul>
          ${subtotal >= 3000 ? `<div class="ck-installment"><span>🏦</span> 可分 3 期 0 利率，每期 ${fmt(Math.ceil(subtotal / 3))}</div>` : ''}
          <div class="ck-trust"><div class="ck-trust-item"><span class="ck-trust-icon">🔒</span><span>SSL 256-bit<br>加密傳輸</span></div><div class="ck-trust-item"><span class="ck-trust-icon">✅</span><span>7 天退費<br>保證</span></div><div class="ck-trust-item"><span class="ck-trust-icon">🛡️</span><span>隱私保護<br>不外洩</span></div><div class="ck-trust-item"><span class="ck-trust-icon">💳</span><span>安全金流<br>認證</span></div></div>
        </div>
      </aside>
    </div>
  </div>`;

  $$('[name="pay"]', main).forEach(r => r.onchange = () => {
    $$('.ck-pay-option', main).forEach(l => l.classList.toggle('active', l.querySelector('input').checked));
    const cf = $('#cardForm', main);
    if (cf) cf.style.display = r.value === 'card' ? '' : 'none';
  });
  $$('[name="inv"]', main).forEach(r => r.onchange = () => {
    $$('[name="inv"]', main).forEach(r2 => r2.closest('.ck-pay-option').classList.toggle('active', r2.checked));
  });

  const cardNum = $('#ckCardNum', main);
  const cardType = $('#ckCardType', main);
  const expiry = $('#ckExpiry', main);
  const cvv = $('#ckCvv', main);
  if (cardNum) {
    cardNum.oninput = () => {
      const d = cardNum.value.replace(/\D/g, '').slice(0, 16);
      cardNum.value = d.replace(/(.{4})/g, '$1 ').trim();
      const t = d.startsWith('4') ? 'Visa' : d.startsWith('5') ? 'Mastercard' : d.startsWith('35') ? 'JCB' : d.startsWith('3') ? 'AMEX' : '';
      cardType.textContent = t;
    };
  }
  if (expiry) {
    expiry.oninput = () => {
      let d = expiry.value.replace(/\D/g, '').slice(0, 4);
      if (d.length >= 2) d = d.slice(0, 2) + '/' + d.slice(2);
      expiry.value = d;
    };
  }
  if (cvv) cvv.oninput = () => { cvv.value = cvv.value.replace(/\D/g, '').slice(0, 4); };

  let appliedCoupon = null;
  let finalTotal = subtotal;
  const ckCouponBtn = $('#ckCouponBtn', main);
  const ckCouponInput = $('#ckCoupon', main);
  if (ckCouponBtn) ckCouponBtn.onclick = () => {
    const code = ckCouponInput.value.trim().toUpperCase();
    if (!code) { toast('請輸入優惠碼', 'error'); ckCouponInput.focus(); return; }
    if (appliedCoupon) { toast('已套用優惠碼，請先移除再更換', 'info'); return; }
    const coupon = (window.COUPONS || []).find(c => c.code === code);
    if (!coupon) { toast('無效的優惠碼', 'error'); ckCouponInput.classList.add('ck-coupon-err'); setTimeout(() => ckCouponInput.classList.remove('ck-coupon-err'), 600); return; }
    if (new Date(coupon.expires) < new Date()) { toast('此優惠碼已過期', 'error'); return; }
    if (coupon.min && subtotal < coupon.min) { toast(`訂單金額需滿 ${fmt(coupon.min)} 才能使用`, 'error'); return; }
    if (coupon.cats) { const match = items.some(c => coupon.cats.includes(c.cat)); if (!match) { toast('此優惠碼不適用於目前的課程類別', 'error'); return; } }
    appliedCoupon = coupon;
    const disc = coupon.type === 'percent' ? Math.round(subtotal * coupon.discount / 100) : coupon.discount;
    finalTotal = Math.max(0, subtotal - disc);
    $('#ckDiscountAmt', main).textContent = `-${fmt(disc)}`;
    $('#ckDiscountRow', main).style.color = '#34c759';
    $('#ckTotalAmt', main).textContent = fmt(finalTotal);
    const submitBtn2 = $('#ckSubmit', main);
    submitBtn2.textContent = `確認付款 ${fmt(finalTotal)}`;
    ckCouponBtn.textContent = '移除';
    ckCouponInput.disabled = true;
    ckCouponInput.classList.add('ck-coupon-ok');
    toast(`優惠碼已套用：${coupon.desc}`, 'success');
    window.trackEvent('apply_coupon', { coupon_code: code, discount: disc });
    ckCouponBtn.onclick = () => {
      appliedCoupon = null;
      finalTotal = subtotal;
      $('#ckDiscountAmt', main).textContent = '—';
      $('#ckDiscountRow', main).style.color = 'var(--tx3)';
      $('#ckTotalAmt', main).textContent = fmt(subtotal);
      $('#ckSubmit', main).textContent = `確認付款 ${fmt(subtotal)}`;
      ckCouponBtn.textContent = '套用';
      ckCouponInput.disabled = false;
      ckCouponInput.value = '';
      ckCouponInput.classList.remove('ck-coupon-ok');
      toast('已移除優惠碼');
      ckCouponBtn.onclick = arguments.callee;
    };
  };

  const submitBtn = $('#ckSubmit', main);
  submitBtn.onclick = () => {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="ck-spinner"></span> 處理中…';
    const owned = new Set(ls('aic-owned', []));
    items.forEach(c => owned.add(c.id));
    ss('aic-owned', [...owned]);
    const orderId = 'AIC' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 6).toUpperCase();
    ss('aic-last-order', { id: orderId, items: items.map(c => c.id), total: finalTotal, coupon: appliedCoupon?.code || null, time: Date.now() });
    cart.clear(); saveCart(); updateCartBadge();
    setTimeout(() => { location.href = 'order-complete.html'; }, 1200);
  };
  reveal(main);
}

/* ---------- 訂單完成頁 ---------- */
function orderCompletePage() {
  seo({ title: '訂單完成｜AI Class', desc: '恭喜！你的訂單已完成，課程已開通', url: 'https://aiclass.tw/order-complete.html' });
  const main = $('main');
  const order = ls('aic-last-order', null);
  if (!order) { location.href = 'index.html'; return; }

  const items = order.items.map(id => byId[id]).filter(Boolean);
  window.trackEvent('purchase', { transaction_id: order.id, value: order.total, items: items.map(c => ({ item_id: c.id, item_name: c.title, price: c.price })) });
  const d = new Date(order.time);
  const dateStr = `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;

  main.innerHTML = `<div class="wrap oc-wrap">
    <div class="oc-hero">
      <div class="oc-check"><svg viewBox="0 0 52 52"><circle cx="26" cy="26" r="25" fill="none" stroke="#34c759" stroke-width="2"/><path fill="none" stroke="#34c759" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" d="M14 27l8 8 16-16" class="oc-tick"/></svg></div>
      <h1>付款成功！</h1>
      <p class="oc-sub">感謝您的購買，課程已立即開通</p>
    </div>

    <div class="oc-card">
      <div class="oc-card-hdr"><h3>訂單資訊</h3><span class="oc-badge">已付款</span></div>
      <div class="oc-info-grid">
        <div><span class="oc-label">訂單編號</span><span class="oc-val">${order.id}</span></div>
        <div><span class="oc-label">付款時間</span><span class="oc-val">${dateStr}</span></div>
        <div><span class="oc-label">課程數量</span><span class="oc-val">${items.length} 堂</span></div>
        <div><span class="oc-label">付款金額</span><span class="oc-val oc-amount">${fmt(order.total)}</span></div>
      </div>
    </div>

    <div class="oc-card">
      <h3 style="margin-bottom:16px">已購課程</h3>
      <div class="oc-courses">${items.map(c => `<a href="course.html?id=${c.id}" class="oc-course">
        <img src="${img(c)}" alt="${c.title}" loading="lazy">
        <div class="oc-course-info"><div class="oc-course-title">${c.title}</div><div class="oc-course-teacher">${c.teacher}・${c.hours} 小時</div></div>
        <span class="btn btn-pri" style="white-space:nowrap;font-size:13px;padding:6px 16px">開始上課</span>
      </a>`).join('')}</div>
    </div>

    <div class="oc-share">
      <p>分享你的學習旅程</p>
      <div class="oc-share-btns">
        <button class="oc-share-btn oc-fb" data-platform="facebook" aria-label="分享到 Facebook">f</button>
        <button class="oc-share-btn oc-tw" data-platform="twitter" aria-label="分享到 Twitter">𝕏</button>
        <button class="oc-share-btn oc-line" data-platform="line" aria-label="分享到 LINE">L</button>
        <button class="oc-share-btn oc-copy" data-platform="copy" aria-label="複製連結">🔗</button>
      </div>
    </div>

    <div class="oc-actions">
      ${items[0] ? `<a class="btn btn-pri" href="player.html?id=${items[0].id}">▶ 立即開始學習</a>` : ''}
      <a class="btn btn-pri" href="my.html" style="background:var(--tx);color:var(--bg)">我的課程</a>
      <a class="btn btn-ghost" href="index.html">回首頁探索更多</a>
    </div>
  </div>`;
  reveal(main);
  // Confetti celebration
  const canvas = document.createElement('canvas'); canvas.className = 'oc-confetti';
  canvas.width = innerWidth; canvas.height = innerHeight;
  document.body.append(canvas);
  const ctx = canvas.getContext('2d');
  const colors = ['#7c5cff','#ff5c8a','#34c759','#ff9500','#00b4d8','#ffcc00'];
  const pieces = Array.from({length: 80}, () => ({
    x: Math.random() * canvas.width, y: -20 - Math.random() * 200,
    w: 6 + Math.random() * 6, h: 4 + Math.random() * 4,
    r: Math.random() * 360, dr: (Math.random() - .5) * 8,
    vy: 2 + Math.random() * 3, vx: (Math.random() - .5) * 2,
    c: colors[Math.floor(Math.random() * colors.length)],
    o: 1
  }));
  let frame = 0;
  (function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    pieces.forEach(p => {
      if (p.o <= 0) return;
      alive = true;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.r * Math.PI / 180);
      ctx.globalAlpha = p.o;
      ctx.fillStyle = p.c;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
      p.y += p.vy; p.x += p.vx; p.r += p.dr;
      p.vy += 0.05;
      if (frame > 60) p.o -= 0.008;
    });
    frame++;
    if (alive && frame < 180) requestAnimationFrame(drawConfetti);
    else canvas.remove();
  })();

  // Share buttons
  const shareText = encodeURIComponent(`我在 AI Class 購買了${items.length}堂精選課程！一起來學習吧 🎓`);
  const shareUrl = encodeURIComponent('https://aiclass.tw/');
  $$('.oc-share-btn', main).forEach(btn => btn.onclick = () => {
    const p = btn.dataset.platform;
    if (p === 'facebook') window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${shareText}`, '_blank', 'width=600,height=400');
    else if (p === 'twitter') window.open(`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`, '_blank', 'width=600,height=400');
    else if (p === 'line') window.open(`https://social-plugins.line.me/lineit/share?url=${shareUrl}&text=${shareText}`, '_blank', 'width=600,height=400');
    else if (p === 'copy') { navigator.clipboard.writeText('https://aiclass.tw/').then(() => toast('連結已複製', 'success')); }
    trackEvent('share', { method: p, content_type: 'order' });
  });
}

/* ---------- 優惠券 ---------- */
function couponPage() {
  const main = $('main');
  seo({ title: '優惠券中心｜AI Class', desc: '領取最新優惠券，享受課程折扣', url: 'https://aiclass.tw/coupon.html' });
  const now = new Date();
  const coupons = (window.COUPONS || []).map(cp => {
    const amountTxt = cp.type === 'percent' ? `${cp.discount}% OFF` : `NT$${cp.discount}`;
    const typeTxt = cp.type === 'percent' ? 'discount' : 'amount';
    return { ...cp, amountTxt, typeTxt, expired: new Date(cp.expires) < now, used: false };
  });

  const renderCoupons = filter => {
    let list = coupons;
    if (filter === 'active') list = coupons.filter(c => !c.used && !c.expired);
    else if (filter === 'used') list = coupons.filter(c => c.used);
    else if (filter === 'expired') list = coupons.filter(c => c.expired);
    const grid = $('#cpn-grid');
    if (!list.length) { grid.innerHTML = '<div class="cpn-empty">目前沒有符合條件的優惠券</div>'; return; }
    grid.innerHTML = list.map(cp => `<div class="cpn-card ${cp.used ? 'used' : ''} ${cp.expired ? 'expired' : ''} rv-up">
      ${cp.used ? '<div class="cpn-stamp">已使用</div>' : ''}${cp.expired ? '<div class="cpn-stamp expired-stamp">已過期</div>' : ''}
      <div class="cpn-left">
        <span class="cpn-badge ${cp.typeTxt}">${cp.type === 'percent' ? '折扣' : '折抵'}</span>
        <div class="cpn-desc">${cp.desc}</div>
        <div class="cpn-code-row"><span class="cpn-code">${cp.code}</span><button class="cpn-copy" data-code="${cp.code}">📋</button></div>
        ${cp.cats ? `<div class="cpn-cats">${cp.cats.map(c => `<span class="cpn-cat-tag">${c}</span>`).join('')}</div>` : ''}
      </div>
      <div class="cpn-right">
        <div class="cpn-amount">${cp.amountTxt}</div>
        ${cp.min > 0 ? `<div class="cpn-min">滿 NT$${cp.min.toLocaleString()} 可用</div>` : ''}
        <div class="cpn-expire">有效期限 ${cp.expires}</div>
        <div class="cpn-limit">限領 ${cp.limit} 張</div>
      </div>
    </div>`).join('');
    reveal(grid);
  };

  main.innerHTML = `
  <section class="cpn-hero rv-up"><div class="wrap">
    <div class="crumb rv-up"><a href="index.html">首頁</a> › 優惠券</div>
    <h1>我的優惠券</h1>
    <p>查看你的優惠券，結帳時輸入優惠碼即可享受折扣</p>
  </div></section>
  <div class="wrap">
    <div class="cpn-tabs">
      <button class="chip on" data-cpn="all">全部 (${coupons.length})</button>
      <button class="chip" data-cpn="active">可使用 (${coupons.filter(c=>!c.used&&!c.expired).length})</button>
      <button class="chip" data-cpn="used">已使用 (${coupons.filter(c=>c.used).length})</button>
      <button class="chip" data-cpn="expired">已過期 (${coupons.filter(c=>c.expired).length})</button>
    </div>
    <div class="cpn-grid" id="cpn-grid"></div>
    <div class="cpn-rules rv-up">
      <h3>使用規則</h3>
      <ul>
        <li>每筆訂單限用一張優惠券，不可合併使用</li>
        <li>優惠券需在有效期限內使用，逾期自動失效</li>
        <li>部分優惠券有最低消費金額限制，請注意使用條件</li>
        <li>優惠券不可兌換現金，折抵金額不找零</li>
        <li>AI Class 保留優惠券活動的最終解釋權</li>
      </ul>
    </div>
  </div>`;

  renderCoupons('all');
  main.addEventListener('click', e => {
    const copyBtn = e.target.closest('.cpn-copy[data-code]');
    if (copyBtn) {
      const code = copyBtn.dataset.code;
      navigator.clipboard.writeText(code);
      copyBtn.textContent = '✓';
      setTimeout(() => copyBtn.textContent = '📋', 1500);
      toast('已複製優惠碼 ' + code);
    }
  });
  $$('.cpn-tabs .chip', main).forEach(btn => btn.onclick = () => {
    $$('.cpn-tabs .chip', main).forEach(b => b.classList.toggle('on', b === btn));
    renderCoupons(btn.dataset.cpn);
  });
}

/* ---------- 結業證書 ---------- */
function certificatePage() {
  const main = $('main');
  seo({ title: '結業證書｜AI Class', desc: '查看你的結業證書', url: 'https://aiclass.tw/certificate.html' });
  const ownedIds = new Set(ls('aic-owned', []));
  const progress = ls('aic-progress', {});
  const completedCourses = C.filter(c => ownedIds.has(c.id) && (progress[c.id] === 100 || progress[c.id] === undefined));
  const certificates = completedCourses.map(c => ({
    ...c,
    student: aicUser?.name || '學員',
    completedDate: '2026/10/25',
    certId: 'CERT-' + c.id.toUpperCase() + '-' + Date.now().toString(36).slice(-6).toUpperCase()
  }));

  main.innerHTML = `
  <section class="cert-hero rv-up"><div class="wrap">
    <div class="crumb"><a href="index.html">首頁</a> › <a href="my.html">我的學習</a> › 結業證書</div>
    <h1>結業證書</h1>
    <p>完成課程後即可取得結業證書，證明你的學習成果</p>
    <div class="cert-summary rv-up"><span>🏆 已取得 <b>${certificates.length}</b> 張證書</span></div>
  </div></section>
  <div class="wrap">
    ${certificates.length ? `<div class="cert-grid">
      ${certificates.map(c => `<div class="cert-card rv-up">
        <div class="cert-preview">
          <div class="cert-border">
            <div class="cert-logo">AI CLASS</div>
            <div class="cert-title">結 業 證 書</div>
            <div class="cert-subtitle">CERTIFICATE OF COMPLETION</div>
            <div class="cert-cname">${c.title}</div>
            <div class="cert-student">${c.student}</div>
            <div class="cert-msg">已完成本課程全部內容，特此頒發結業證書以資證明。</div>
            <div class="cert-footer"><span class="cert-date">發證日期：${new Date(c.completedDate).toLocaleDateString('zh-TW', {year:'numeric',month:'long',day:'numeric'})}</span><span class="cert-id">${c.certId}</span></div>
            <div class="cert-seal">✓</div>
          </div>
        </div>
        <div class="cert-info">
          <h3>${c.title}</h3>
          <p class="teacher">${c.teacher} · ${c.hours} 小時</p>
          <div class="cert-actions">
            <button class="btn btn-pri btn-sm" onclick="toast('示範網站：PDF 下載功能開發中')">📄 下載 PDF</button>
            <button class="btn btn-ghost btn-sm cert-share-btn">🔗 分享證書</button>
          </div>
        </div>
      </div>`).join('')}
    </div>` : `<div class="cert-empty rv-up">
      <div class="cert-empty-icon">🎓</div>
      <h3>你還沒有結業證書</h3>
      <p>完成任一課程的所有章節即可取得結業證書，<br>開始你的學習之旅吧！</p>
      <div class="cert-empty-actions"><a href="index.html" class="btn btn-pri">探索課程</a><a href="my.html" class="btn btn-ghost">我的學習</a></div>
    </div>`}
  </div>`;
  $$('.cert-share-btn', main).forEach(btn => btn.onclick = () => {
    if (navigator.share) navigator.share({ title: 'AI Class 結業證書', text: '我在 AI Class 完成了課程！', url: location.href }).catch(() => {});
    else { navigator.clipboard.writeText(location.href).then(() => toast('已複製分享連結', 'success')); }
  });
  reveal(main);
}

/* ---------- 學習路徑列表 ---------- */
function pathListPage() {
  const main = $('main');
  seo({ title: '學習路徑｜AI Class', desc: '系統化學習路徑，從入門到專業，循序漸進培養即戰力', url: 'https://aiclass.tw/path.html' });
  const paths = window.PATHS || [];
  main.innerHTML = `<section class="sec-wrap rv-up"><div class="wrap">
    <div class="crumb"><a href="index.html">首頁</a> › 學習路徑</div>
    <h1 style="font-size:clamp(1.8rem,4vw,2.4rem);text-align:center;margin:24px 0 8px">學習路徑</h1>
    <p style="text-align:center;color:var(--tx2);max-width:600px;margin:0 auto 40px">系統化課程規劃，從入門到進階，帶你循序漸進培養完整技能</p>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:24px">
      ${paths.map(p => {
        const courses = p.courses.map(id => byId[id]).filter(Boolean);
        const hours = courses.reduce((s, c) => s + c.hours, 0);
        return `<a href="path.html?id=${p.id}" class="card rv-up" style="text-decoration:none;padding:28px;border-radius:20px;background:var(--card);border:1px solid var(--line);transition:.3s">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
            <span style="font-size:28px">${p.icon || '🎯'}</span>
            <h2 style="font-size:18px;font-weight:700;color:var(--tx);margin:0">${p.name}</h2>
          </div>
          <p style="color:var(--tx2);font-size:14px;line-height:1.6;margin:0 0 16px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${p.desc || ''}</p>
          <div style="display:flex;gap:16px;font-size:13px;color:var(--tx3)">
            <span>📚 ${courses.length} 堂</span>
            <span>⏱ ${hours} 小時</span>
            <span>📊 ${p.level}</span>
          </div>
        </a>`;
      }).join('')}
    </div>
  </div></section>`;
  reveal(main);
}

/* ---------- 學習路徑詳情 ---------- */
function pathPage() {
  const main = $('main');
  const pid = new URLSearchParams(location.search).get('id');
  if (!pid) { pathListPage(); return; }
  const p = window.PATHS.find(x => x.id === pid);
  if (!p) { notFoundPage(); return; }
  const courses = p.courses.map(id => byId[id]).filter(Boolean);
  const totalHours = courses.reduce((s, c) => s + c.hours, 0);
  seo({ title: `${p.name}｜AI Class 學習路徑`, desc: p.desc || `${p.name} 學習路徑，${courses.length} 門課程，${totalHours} 小時`, url: `https://aiclass.tw/path.html?id=${p.id}` });
  const totalStudents = Math.min(...courses.map(c => c.students));
  document.title = `${p.name}｜AI Class 學習路徑`;

  const ownedArr = ls('aic-owned', []);
  const pathDone = courses.filter(c => ownedArr.includes(c.id)).length;
  const pathPct = courses.length ? Math.round(pathDone / courses.length * 100) : 0;

  main.innerHTML = `
  <section class="pth-hero rv-up"><div class="wrap">
    <div class="crumb"><a href="index.html">首頁</a> › <a href="index.html#paths">學習路徑</a> › ${p.name}</div>
    <div class="pth-badge">學習路徑</div>
    <h1>${p.name}</h1>
    <p class="pth-desc">${p.desc}</p>
    <div class="pth-overall-progress rv-up">
      <div class="pth-prog-bar"><div class="pth-prog-fill" style="width:${pathPct}%"></div></div>
      <span class="pth-prog-txt">整體進度 ${pathPct}%（${pathDone}/${courses.length} 堂完成）</span>
    </div>
    <div class="pth-meta">
      <span>📚 ${courses.length} 堂課程</span>
      <span>⏱ ${totalHours} 小時</span>
      <span>📅 預估 ${p.duration}</span>
      <span>📊 ${p.level}</span>
      <span>💰 預期年薪 ${p.salary}</span>
    </div>
    <div class="pth-actions">
      <button class="btn btn-pri btn-lg pth-start-btn">開始學習路徑</button>
      <button class="btn btn-ghost btn-lg pth-share-btn">分享路徑</button>
    </div>
  </div></section>

  <div class="wrap pth-wrap">
    <div class="pth-timeline rv-up">
      <h2>課程規劃</h2>
      <p class="pth-timeline-desc">按照以下順序學習，循序漸進掌握完整技能</p>
      <div class="pth-steps">
        ${courses.map((c, i) => {
          const isDone = ownedArr.includes(c.id);
          const ring = `<svg class="pth-ring" viewBox="0 0 36 36"><circle cx="18" cy="18" r="15" fill="none" stroke="var(--line)" stroke-width="3"/><circle cx="18" cy="18" r="15" fill="none" stroke="${isDone ? '#34c759' : 'var(--pri)'}" stroke-width="3" stroke-dasharray="94" stroke-dashoffset="${isDone ? 0 : 94}" stroke-linecap="round" transform="rotate(-90 18 18)"/></svg>`;
          return `<div class="pth-step rv-up" style="transition-delay:${i * 100}ms">
          <div class="pth-step-num ${isDone ? 'done' : ''}">${isDone ? '✓' : i + 1}${ring}</div>
          <div class="pth-step-content">
            <a href="course.html?id=${c.id}" class="pth-step-card">
              <img src="${img(c)}" alt="${c.title}" loading="lazy" decoding="async">
              <div class="pth-step-info">
                <h3>${c.title}${isDone ? ' <span class="pth-done-tag">已完成</span>' : ''}</h3>
                <p>${c.teacher} · ${c.hours} 小時 · ★ ${c.rating}</p>
                <div class="pth-step-skills">${['核心觀念', '實作練習', '專案作品'][i % 3].split('').length ? `<span class="pth-skill">${['核心觀念', '實作練習', '專案作品'][i % 3]}</span>` : ''}</div>
              </div>
              <span class="pth-step-price">${fmt(c.price)}</span>
            </a>
          </div>
        </div>`; }).join('')}
      </div>
    </div>

    <div class="pth-summary rv-up">
      <div class="pth-sum-card">
        <h3>路徑總覽</h3>
        <div class="pth-sum-row"><span>課程數量</span><b>${courses.length} 堂</b></div>
        <div class="pth-sum-row"><span>總時數</span><b>${totalHours} 小時</b></div>
        <div class="pth-sum-row"><span>建議學習期間</span><b>${p.duration}</b></div>
        <div class="pth-sum-row"><span>適合程度</span><b>${p.level}</b></div>
        <div class="pth-sum-row"><span>分開購買</span><b class="pth-origin">${fmt(courses.reduce((s, c) => s + c.origin, 0))}</b></div>
        <div class="pth-sum-row"><span>路徑優惠價</span><b class="pth-deal">${fmt(courses.reduce((s, c) => s + c.price, 0))}</b></div>
        <button class="btn btn-pri pth-buy-all" style="width:100%;margin-top:16px">一次購買全路徑</button>
      </div>
    </div>
  </div>

  <section class="sec"><div class="wrap">
    <div class="sec-head rv-up"><div><h2>其他學習路徑</h2></div></div>
    <div class="pth-other-grid rv-up">
      ${window.PATHS.filter(x => x.id !== p.id).map(op => {
        const oCourses = op.courses.map(id => byId[id]).filter(Boolean);
        return `<a href="path.html?id=${op.id}" class="pth-other-card">
          <div class="pth-other-imgs">${oCourses.slice(0, 2).map(c => `<img src="${img(c)}" alt="${c.title}" loading="lazy">`).join('')}</div>
          <h3>${op.name}</h3>
          <p>${op.desc}</p>
          <span class="pth-other-meta">${oCourses.length} 堂 · ${op.duration}</span>
        </a>`;
      }).join('')}
    </div>
  </div></section>`;
  const startBtn = $('.pth-start-btn', main);
  if (startBtn) startBtn.onclick = () => toast('示範網站：已加入學習路徑');
  const shareBtn = $('.pth-share-btn', main);
  if (shareBtn) shareBtn.onclick = () => toast('已分享路徑連結');
  const buyAll = $('.pth-buy-all', main);
  if (buyAll) buyAll.onclick = () => toast('示範網站：已加入全部課程');
  bindCards(main);
  reveal(main);
}

/* ---------- 邀請好友 ---------- */
function invitePage() {
  const main = $('main');
  seo({ title: '邀請好友｜AI Class', desc: '邀請好友加入 AI Class，雙方各得優惠券', url: 'https://aiclass.tw/invite.html' });
  const code = localStorage.getItem('aic-invite-code') || (() => { const c = 'AICLASS' + Math.random().toString(36).slice(2, 7).toUpperCase(); ss('aic-invite-code', c); return c; })();
  const link = 'https://aiclass.tw/invite?ref=' + code;
  const stats = { invited: 3, registered: 2, earned: 1000 };

  const goal = 5;
  const invPct = Math.round(stats.invited / goal * 100);

  main.innerHTML = `
  <section class="inv-hero rv-up"><div class="wrap">
    <div class="crumb rv-up"><a href="index.html">首頁</a> › 邀請好友</div>
    <h1>邀請好友一起學</h1>
    <p>每成功邀請一位好友註冊並購課，你和好友各獲得 <b>NT$500</b> 折價券</p>
  </div></section>
  <div class="wrap inv-wrap">
    <div class="inv-progress rv-up">
      <div class="inv-prog-label"><span>邀請進度</span><b>${stats.invited} / ${goal} 人</b></div>
      <div class="inv-prog-bar"><div class="inv-prog-fill" style="width:${Math.min(invPct, 100)}%"></div></div>
      <div class="inv-prog-hint">${stats.invited >= goal ? '🎉 目標達成！繼續邀請可獲得額外獎勵' : `再邀請 ${goal - stats.invited} 位即可獲得額外 NT$1,000 獎勵`}</div>
    </div>
    <div class="inv-card rv-up">
      <h2>你的專屬推薦連結</h2>
      <div class="inv-link-row">
        <input type="text" value="${link}" readonly class="inv-link" aria-label="推薦連結">
        <button class="btn btn-pri inv-copy-btn" id="inv-copy-link">複製連結</button>
      </div>
      <div class="inv-code-row">
        <span>推薦碼：</span><code class="inv-code">${code}</code>
        <button class="inv-copy" id="inv-copy-code">📋</button>
      </div>
      <div class="inv-share">
        <span>分享至：</span>
        <button class="inv-share-btn">LINE</button>
        <button class="inv-share-btn">Facebook</button>
        <button class="inv-share-btn">Email</button>
      </div>
    </div>

    <div class="inv-steps rv-up">
      <h2>如何運作？</h2>
      <div class="inv-step-grid">
        <div class="inv-step"><div class="inv-step-icon">🔗</div><div class="inv-step-num">1</div><h3>分享邀請連結</h3><p>將你的專屬推薦連結分享給朋友</p></div>
        <div class="inv-step"><div class="inv-step-icon">👤</div><div class="inv-step-num">2</div><h3>好友註冊</h3><p>好友透過你的連結註冊 AI Class 帳號</p></div>
        <div class="inv-step"><div class="inv-step-icon">🛒</div><div class="inv-step-num">3</div><h3>好友購課</h3><p>好友完成第一筆課程購買</p></div>
        <div class="inv-step"><div class="inv-step-icon">🎁</div><div class="inv-step-num">4</div><h3>雙方獲獎</h3><p>你和好友各獲得 NT$500 折價券</p></div>
      </div>
    </div>

    <div class="inv-stats rv-up">
      <h2>推薦成績</h2>
      <div class="inv-stat-grid">
        <div class="inv-stat"><b>${stats.invited}</b><span>已邀請</span></div>
        <div class="inv-stat"><b>${stats.registered}</b><span>已註冊</span></div>
        <div class="inv-stat"><b>NT$${stats.earned.toLocaleString()}</b><span>已賺取</span></div>
      </div>
    </div>

    <div class="inv-rules rv-up">
      <h3>活動規則</h3>
      <ul>
        <li>被推薦者須為新用戶（從未註冊過 AI Class）</li>
        <li>被推薦者需透過推薦連結或推薦碼完成註冊</li>
        <li>被推薦者首筆購課金額需達 NT$2,000 以上</li>
        <li>折價券有效期限為發放後 30 天</li>
        <li>每人最多可邀請 50 位好友</li>
        <li>AI Class 保留活動最終解釋權</li>
      </ul>
    </div>
  </div>`;
  const copyLink = $('#inv-copy-link', main);
  if (copyLink) copyLink.onclick = () => {
    navigator.clipboard.writeText(link);
    copyLink.textContent = '✓ 已複製';
    copyLink.classList.add('copied');
    setTimeout(() => { copyLink.textContent = '複製連結'; copyLink.classList.remove('copied'); }, 2000);
    toast('已複製邀請連結');
  };
  const copyCode = $('#inv-copy-code', main);
  if (copyCode) copyCode.onclick = () => {
    navigator.clipboard.writeText(code);
    copyCode.textContent = '✓';
    setTimeout(() => copyCode.textContent = '📋', 1500);
    toast('已複製推薦碼');
  };
  $$('.inv-share-btn', main).forEach(btn => btn.onclick = () => toast('示範網站'));
  reveal(main);
}

/* ---------- 訂單紀錄 ---------- */
function orderHistoryPage() {
  seo({ title: '訂單紀錄｜AI Class', desc: '查看你的所有訂單紀錄與發票', url: 'https://aiclass.tw/order-history.html' });
  const main = $('main');
  const img_ = c => `assets/img/v${c.v}.jpg`;
  const demoOrders = [
    { id: 'AIC-20261028-A3F2', date: '2026/10/28 14:32', status: 'completed', pay: '信用卡（Visa **** 6411）', inv: '電子發票 GH-83920145', items: [C[0], C[3]], total: 9660 },
    { id: 'AIC-20261020-B7D1', date: '2026/10/20 09:17', status: 'completed', pay: 'LINE Pay', inv: '電子發票 GH-72810936', items: [C[1]], total: 5280 },
    { id: 'AIC-20261105-C1K9', date: '2026/11/05 18:45', status: 'pending', pay: '超商代碼（等待付款）', inv: '—', items: [C[5], C[8]], total: 8460 },
    { id: 'AIC-20261012-D4M3', date: '2026/10/12 21:03', status: 'completed', pay: '信用卡（MasterCard **** 1290）', inv: '電子發票 GH-61092837', items: [C[2], C[6], C[10]], total: 13240 },
    { id: 'AIC-20260915-E8P6', date: '2026/09/15 11:28', status: 'cancelled', pay: '信用卡', inv: '—', items: [C[4]], total: 4680 },
    { id: 'AIC-20261101-F2Q8', date: '2026/11/01 16:55', status: 'completed', pay: 'LINE Pay', inv: '電子發票 GH-95031748', items: [C[7]], total: 3980 },
    { id: 'AIC-20260830-G5R1', date: '2026/08/30 08:12', status: 'cancelled', pay: '超商代碼（逾期未付）', inv: '—', items: [C[9], C[11]], total: 7860 },
  ];

  const statusMap = { completed: { label: '已完成', cls: 'done' }, pending: { label: '待付款', cls: 'pending' }, cancelled: { label: '已取消', cls: 'cancel' } };
  const completedOrders = demoOrders.filter(o => o.status === 'completed');
  const totalSpent = completedOrders.reduce((s, o) => s + o.total, 0);
  const totalCourses = completedOrders.reduce((s, o) => s + o.items.length, 0);

  let currentFilter = 'all';
  let searchQuery = '';

  function filterOrders() {
    let list = [...demoOrders];
    if (currentFilter !== 'all') list = list.filter(o => o.status === currentFilter);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(o => o.id.toLowerCase().includes(q) || o.items.some(c => c.title.toLowerCase().includes(q)));
    }
    return list;
  }

  function renderOrders() {
    const list = filterOrders();
    const grid = $('#oh-list');
    if (!list.length) {
      grid.innerHTML = `<div class="oh-empty rv-up"><p>找不到符合條件的訂單</p><a href="index.html" class="btn btn-pri" style="margin-top:12px">去逛逛課程</a></div>`;
      return;
    }
    grid.innerHTML = list.map(o => {
      const st = statusMap[o.status];
      return `<div class="oh-card rv-up">
        <div class="oh-card-hdr" data-oh-toggle>
          <div class="oh-card-left">
            <span class="oh-badge ${st.cls}">${st.label}</span>
            <span class="oh-id">${o.id}</span>
            <span class="oh-date">${o.date}</span>
          </div>
          <div class="oh-card-right">
            <span class="oh-total">${fmt(o.total)}</span>
            <span class="oh-arrow">›</span>
          </div>
        </div>
        <div class="oh-card-items">
          ${o.items.map(c => `<div class="oh-item">
            <img src="${img_(c)}" alt="${c.title}" loading="lazy" decoding="async">
            <div class="oh-item-info">
              <a href="course.html?id=${c.id}" class="oh-item-title">${c.title}</a>
              <span class="oh-item-teacher">${c.teacher}・${c.hours} 小時</span>
            </div>
            <span class="oh-item-price">${fmt(c.price)}</span>
          </div>`).join('')}
        </div>
        <div class="oh-timeline">${(() => {
            const steps = [
              { label: '建立訂單', icon: '📋' },
              { label: '付款完成', icon: '💳' },
              { label: '課程開通', icon: '🎓' },
              { label: '學習中', icon: '▶' },
            ];
            const active = o.status === 'completed' ? 4 : o.status === 'pending' ? 1 : 0;
            return steps.map((s, i) => `<div class="oh-tl-step${i < active ? ' done' : ''}${i === active - 1 ? ' current' : ''}"><div class="oh-tl-dot">${s.icon}</div><span>${s.label}</span></div>`).join('<div class="oh-tl-line"></div>');
          })()}</div>
        <div class="oh-card-detail">
          <div class="oh-detail-row"><span>付款方式</span><span>${o.pay}</span></div>
          <div class="oh-detail-row"><span>發票資訊</span><span>${o.inv}</span></div>
          <div class="oh-detail-row"><span>課程數量</span><span>${o.items.length} 堂</span></div>
          <div class="oh-detail-row"><span>訂單金額</span><span class="oh-detail-total">${fmt(o.total)}</span></div>
        </div>
        <div class="oh-card-actions">
          ${o.status === 'completed' ? `<a href="player.html?id=${o.items[0].id}" class="btn btn-pri btn-sm">開始上課</a><button class="btn btn-ghost btn-sm" onclick="toast('示範網站：發票下載功能開發中')">下載發票</button>` :
            o.status === 'pending' ? `<button class="btn btn-pri btn-sm" onclick="toast('示範網站：付款功能開發中')">前往付款</button><button class="btn btn-ghost btn-sm" onclick="toast('示範網站：取消功能開發中')">取消訂單</button>` :
            `<button class="btn btn-pri btn-sm" onclick="toast('已將課程加入購物車')">重新購買</button>`}
        </div>
      </div>`;
    }).join('');
    reveal($('#oh-list'));
    $$('[data-oh-toggle]', main).forEach(hdr => hdr.onclick = () => hdr.closest('.oh-card').classList.toggle('open'));
  }

  main.innerHTML = `
  <section class="oh-hero rv-up"><div class="wrap">
    <div class="crumb"><a href="index.html">首頁</a> › <a href="my.html">我的學習</a> › 訂單紀錄</div>
    <h1>訂單紀錄</h1>
    <p>查看所有課程訂單與付款狀態</p>
  </div></section>
  <div class="wrap oh-wrap">
    <div class="oh-stats rv-up">
      <div class="oh-stat"><b>${demoOrders.length}</b><span>總訂單</span></div>
      <div class="oh-stat"><b>${fmt(totalSpent)}</b><span>累計消費</span></div>
      <div class="oh-stat"><b>${totalCourses}</b><span>已購課程</span></div>
      <div class="oh-stat"><b>${completedOrders.length}</b><span>已完成</span></div>
    </div>
    <div class="oh-toolbar rv-up">
      <div class="oh-tabs">
        <button class="chip on" data-ohf="all">全部</button>
        <button class="chip" data-ohf="completed">已完成</button>
        <button class="chip" data-ohf="pending">待付款</button>
        <button class="chip" data-ohf="cancelled">已取消</button>
      </div>
      <div class="oh-search">
        <input type="text" id="oh-search" placeholder="搜尋訂單編號或課程名稱…" aria-label="搜尋訂單">
      </div>
    </div>
    <div class="oh-list" id="oh-list"></div>
    <div class="oh-back rv-up"><a href="my.html" class="btn btn-ghost">← 回到我的頁面</a></div>
  </div>`;

  renderOrders();
  $$('[data-ohf]', main).forEach(btn => btn.onclick = () => {
    $$('[data-ohf]', main).forEach(b => b.classList.toggle('on', b === btn));
    currentFilter = btn.dataset.ohf;
    renderOrders();
  });
  const searchInput = $('#oh-search', main);
  let debounce;
  searchInput.oninput = () => { clearTimeout(debounce); debounce = setTimeout(() => { searchQuery = searchInput.value.trim(); renderOrders(); }, 300); };
  reveal(main);
}

/* ---------- 搜尋結果頁 ---------- */
function searchPage() {
  const main = $('main');
  const params = new URLSearchParams(location.search);
  const initQ = params.get('q') || '';
  if (initQ) seo({ title: `搜尋「${escH(initQ)}」｜AI Class`, desc: `AI Class 課程搜尋結果：${escH(initQ)}`, url: `https://aiclass.tw/search.html?q=${encodeURIComponent(initQ)}` });
  const cats = window.CATS.slice(1);
  const trending = window.TRENDING_SEARCHES || ['AI', 'Figma', '插畫', 'Blender', '攝影', '料理', 'Python', '健身', '剪輯', '文案'];

  const state = { q: initQ, cats: new Set(), priceRange: 'all', minRating: 0, sort: 'relevance' };

  main.innerHTML = `
  <div class="wrap srch-wrap">
    <div class="crumb rv-up"><a href="index.html">首頁</a> › 搜尋${initQ ? `「${escH(initQ)}」` : ''}</div>
    <div class="srch-top rv-up">
      <div class="srch-input-wrap">
        <span class="srch-icon">⌕</span>
        <input class="srch-input" type="text" value="${escH(initQ)}" placeholder="搜尋課程、講師、關鍵字…" autofocus aria-label="搜尋課程">
        <button class="srch-clear" style="display:${initQ ? 'flex' : 'none'}" aria-label="清除搜尋">✕</button>
      </div>
    </div>
    <div class="srch-tags" id="srchTags"></div>
    <div class="srch-body">
      <aside class="srch-sidebar" id="srchSidebar">
        <div class="srch-sb-head"><h3>篩選條件</h3><button class="srch-sb-reset" id="srchReset">清除全部</button></div>
        <div class="srch-group">
          <h4>課程分類</h4>
          <div class="srch-cats">${cats.map(c => `<label class="srch-cb"><input type="checkbox" value="${c.id}"><span class="srch-ck"></span>${c.name}</label>`).join('')}</div>
        </div>
        <div class="srch-group">
          <h4>價格範圍</h4>
          <div class="srch-prices">
            <label class="srch-chip-radio"><input type="radio" name="srch-price" value="all" checked><span>全部</span></label>
            <label class="srch-chip-radio"><input type="radio" name="srch-price" value="free"><span>免費</span></label>
            <label class="srch-chip-radio"><input type="radio" name="srch-price" value="under3000"><span>NT$3,000 以下</span></label>
            <label class="srch-chip-radio"><input type="radio" name="srch-price" value="3000to5000"><span>NT$3,000–5,000</span></label>
            <label class="srch-chip-radio"><input type="radio" name="srch-price" value="over5000"><span>NT$5,000 以上</span></label>
          </div>
        </div>
        <div class="srch-group">
          <h4>最低評分</h4>
          <div class="srch-prices">
            <label class="srch-chip-radio"><input type="radio" name="srch-rating" value="0" checked><span>全部</span></label>
            <label class="srch-chip-radio"><input type="radio" name="srch-rating" value="4"><span>★ 4.0+</span></label>
            <label class="srch-chip-radio"><input type="radio" name="srch-rating" value="4.5"><span>★ 4.5+</span></label>
            <label class="srch-chip-radio"><input type="radio" name="srch-rating" value="4.8"><span>★ 4.8+</span></label>
          </div>
        </div>
        <div class="srch-group">
          <h4>課程時長</h4>
          <div class="srch-prices">
            <label class="srch-chip-radio"><input type="radio" name="srch-dur" value="all" checked><span>全部</span></label>
            <label class="srch-chip-radio"><input type="radio" name="srch-dur" value="short"><span>10 小時以下</span></label>
            <label class="srch-chip-radio"><input type="radio" name="srch-dur" value="medium"><span>10–20 小時</span></label>
            <label class="srch-chip-radio"><input type="radio" name="srch-dur" value="long"><span>20 小時以上</span></label>
          </div>
        </div>
      </aside>
      <div class="srch-main">
        <div class="srch-bar">
          <span class="srch-count" id="srchCount"></span>
          <div class="srch-bar-right">
            <button class="srch-filter-toggle" id="srchFilterToggle">☰ 篩選</button>
            <select class="srch-sort" id="srchSort">
              <option value="relevance">依相關度</option>
              <option value="newest">最新上架</option>
              <option value="price-low">價格低到高</option>
              <option value="price-high">價格高到低</option>
              <option value="rating">評分最高</option>
              <option value="students">最多學員</option>
            </select>
          </div>
        </div>
        <div class="srch-grid" id="srchGrid"></div>
        <div class="srch-empty" id="srchEmpty" style="display:none">
          <div class="empty-illus"><svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="70" cy="70" r="35" stroke="var(--tx3)" stroke-width="2" fill="none" stroke-dasharray="5 4"/><line x1="95" y1="95" x2="125" y2="125" stroke="var(--tx3)" stroke-width="3" stroke-linecap="round"/><path d="M60 65 Q70 55 80 65" stroke="var(--pri)" stroke-width="1.5" fill="none"/><circle cx="60" cy="60" r="2" fill="var(--tx3)"/><circle cx="80" cy="60" r="2" fill="var(--tx3)"/></svg></div>
          <h3>找不到相關課程</h3>
          <p>試試其他關鍵字或調整篩選條件</p>
          <div class="srch-recommend"><h4>為你推薦熱門課程</h4><div class="srch-rec-grid">${[...C].sort((a,b)=>b.students-a.students).slice(0,4).map(c=>card(c)).join('')}</div></div>
          <div class="srch-trending">
            <h4>熱門搜尋</h4>
            <div class="srch-trend-chips">${trending.map(t => `<button class="chip srch-trend">${t}</button>`).join('')}</div>
          </div>
        </div>
      </div>
    </div>
    ${!initQ ? `<div class="srch-discover rv-up">
      <h3>熱門搜尋</h3>
      <div class="srch-trend-chips">${trending.map(t => `<button class="chip srch-trend">${t}</button>`).join('')}</div>
    </div>` : ''}
  </div>`;

  const inp = $('.srch-input', main), grid = $('#srchGrid'), countEl = $('#srchCount'), emptyEl = $('#srchEmpty'), tagsEl = $('#srchTags');
  const clearBtn = $('.srch-clear', main);

  function filter() {
    let list = [...C];
    const q = state.q.toLowerCase();
    if (q) list = list.filter(c => (c.title + c.teacher + c.role + (c.desc || '') + (c.sub || '') + (c.ai || '')).toLowerCase().includes(q));
    if (state.cats.size) list = list.filter(c => state.cats.has(c.cat));
    if (state.priceRange === 'free') list = list.filter(c => c.price === 0);
    else if (state.priceRange === 'under3000') list = list.filter(c => c.price < 3000);
    else if (state.priceRange === '3000to5000') list = list.filter(c => c.price >= 3000 && c.price <= 5000);
    else if (state.priceRange === 'over5000') list = list.filter(c => c.price > 5000);
    if (state.minRating > 0) list = list.filter(c => c.rating >= state.minRating);
    const durVal = $('[name="srch-dur"]:checked', main)?.value;
    if (durVal === 'short') list = list.filter(c => c.hours < 10);
    else if (durVal === 'medium') list = list.filter(c => c.hours >= 10 && c.hours <= 20);
    else if (durVal === 'long') list = list.filter(c => c.hours > 20);

    if (state.sort === 'newest') list.sort((a, b) => (b.tag === 'NEW' ? 1 : 0) - (a.tag === 'NEW' ? 1 : 0));
    else if (state.sort === 'price-low') list.sort((a, b) => a.price - b.price);
    else if (state.sort === 'price-high') list.sort((a, b) => b.price - a.price);
    else if (state.sort === 'rating') list.sort((a, b) => b.rating - a.rating);
    else if (state.sort === 'students') list.sort((a, b) => b.students - a.students);

    countEl.textContent = `找到 ${list.length} 堂課程`;
    if (list.length) {
      grid.innerHTML = list.map((c, i) => card(c, i)).join('');
      if (q) {
        const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        $$('.card h3, .card .teacher', grid).forEach(el => {
          if (re.test(el.textContent)) el.innerHTML = escH(el.textContent).replace(re, '<mark class="srch-hl">$1</mark>');
        });
      }
      grid.style.display = '';
      emptyEl.style.display = 'none';
      bindCards(grid);
    } else {
      grid.style.display = 'none';
      grid.innerHTML = '';
      emptyEl.style.display = '';
    }
    let relEl = $('#srchRelated'); if (relEl) relEl.remove();
    if (q && list.length) {
      const related = trending.filter(t => t.toLowerCase() !== q && (t.toLowerCase().includes(q.slice(0,2)) || C.some(c => c.cat === (list[0]||{}).cat && (c.title+c.teacher).toLowerCase().includes(t.toLowerCase())))).slice(0,6);
      if (related.length) {
        grid.insertAdjacentHTML('afterend', `<div class="srch-related rv-up" id="srchRelated"><h4>🔍 相關搜尋</h4><div class="srch-related-tags">${related.map(t=>`<button class="chip srch-related-tag">${t}</button>`).join('')}</div></div>`);
        $$('.srch-related-tag', main).forEach(b => b.onclick = () => { inp.value = b.textContent; state.q = b.textContent; clearBtn.style.display = 'flex'; filter(); });
        reveal(main);
      }
    }
    renderTags();
  }

  function renderTags() {
    const tags = [];
    if (state.q) tags.push({ label: `"${escH(state.q)}"`, clear: () => { state.q = ''; inp.value = ''; clearBtn.style.display = 'none'; } });
    state.cats.forEach(id => { const c = cats.find(x => x.id === id); if (c) tags.push({ label: c.name, clear: () => { state.cats.delete(id); $(`.srch-cb input[value="${id}"]`, main).checked = false; } }); });
    if (state.priceRange !== 'all') {
      const labels = { free: '免費', under3000: 'NT$3,000 以下', '3000to5000': 'NT$3,000–5,000', over5000: 'NT$5,000 以上' };
      tags.push({ label: labels[state.priceRange], clear: () => { state.priceRange = 'all'; $('[name="srch-price"][value="all"]', main).checked = true; } });
    }
    if (state.minRating > 0) tags.push({ label: `★ ${state.minRating}+`, clear: () => { state.minRating = 0; $('[name="srch-rating"][value="0"]', main).checked = true; } });
    tagsEl.innerHTML = tags.map((t, i) => `<span class="srch-tag">${t.label}<button data-idx="${i}" aria-label="移除篩選 ${t.label}">✕</button></span>`).join('');
    $$('.srch-tag button', tagsEl).forEach(b => b.onclick = () => { tags[+b.dataset.idx].clear(); filter(); });
  }

  inp.oninput = () => {
    state.q = inp.value.trim();
    clearBtn.style.display = state.q ? 'flex' : 'none';
    filter();
  };
  inp.addEventListener('keydown', e => {
    if (e.key === 'Enter' && inp.value.trim()) {
      let r = ls('aic-recent-search', []).filter(x => x !== inp.value.trim());
      r.unshift(inp.value.trim()); ss('aic-recent-search', r.slice(0, 8));
      window.trackEvent('search', { search_term: inp.value.trim() });
    }
  });
  clearBtn.onclick = () => { inp.value = ''; state.q = ''; clearBtn.style.display = 'none'; inp.focus(); filter(); };

  $$('.srch-cb input', main).forEach(cb => cb.onchange = () => { cb.checked ? state.cats.add(cb.value) : state.cats.delete(cb.value); filter(); });
  $$('[name="srch-price"]', main).forEach(r => r.onchange = () => { state.priceRange = r.value; filter(); });
  $$('[name="srch-rating"]', main).forEach(r => r.onchange = () => { state.minRating = +r.value; filter(); });
  $$('[name="srch-dur"]', main).forEach(r => r.onchange = () => filter());
  $('#srchSort').onchange = e => { state.sort = e.target.value; filter(); };
  $('#srchReset').onclick = () => {
    state.cats.clear(); state.priceRange = 'all'; state.minRating = 0;
    $$('.srch-cb input', main).forEach(cb => cb.checked = false);
    $('[name="srch-price"][value="all"]', main).checked = true;
    $('[name="srch-rating"][value="0"]', main).checked = true;
    $('[name="srch-dur"][value="all"]', main).checked = true;
    filter();
  };

  const sidebar = $('#srchSidebar');
  $('#srchFilterToggle').onclick = () => sidebar.classList.toggle('open');

  $$('.srch-trend', main).forEach(b => b.onclick = () => { inp.value = b.textContent; state.q = b.textContent; clearBtn.style.display = 'flex'; filter(); inp.focus(); });

  if (initQ) {
    let r = ls('aic-recent-search', []).filter(x => x !== initQ);
    r.unshift(initQ); ss('aic-recent-search', r.slice(0, 8));
  }

  filter();
  reveal(main);
}

/* ---------- 學習社群 ---------- */
function communityPage() {
  const main = $('main');
  seo({ title: '學習社群｜AI Class', desc: '與同學交流學習心得、分享作品', url: 'https://aiclass.tw/community.html' });
  const posts = (window.COMMUNITY_POSTS || []).slice();
  const cmyLiked = new Set(ls('aic-cmy-likes', []));
  const tagSet = new Set(); posts.forEach(p => (p.tags||[]).forEach(t => tagSet.add(t)));
  const cats = ['全部', ...tagSet];
  const catColors = {'作品分享':'#7c5cff','心得分享':'#34c759','發問':'#ff9500','筆記分享':'#00b4d8','求回饋':'#ff5c8a','資源':'#a855f7','成果':'#f59e0b'};
  const topMembers = posts.reduce((map, p) => { map[p.author] = (map[p.author]||0) + 1; return map; }, {});
  const topList = Object.entries(topMembers).sort((a,b) => b[1]-a[1]).slice(0,5);
  const memberColors = ['#7c5cff','#ff5c8a','#34c759','#ff9500','#00b4d8'];

  let activeCat = '全部', sortMode = 'new';

  function getSorted() {
    let list = activeCat === '全部' ? posts : posts.filter(p => (p.tags||[]).includes(activeCat));
    if (sortMode === 'hot') list = [...list].sort((a,b) => b.likes - a.likes);
    const pinned = list.filter(p => p.pinned);
    const rest = list.filter(p => !p.pinned);
    return [...pinned, ...rest];
  }

  function renderThreads() {
    const list = getSorted();
    if (!list.length) return '<div style="text-align:center;padding:48px 0;color:var(--tx2)">目前還沒有相關討論</div>';
    return list.map(p => {
      const c = byId[p.course];
      const tagColor = catColors[(p.tags||[])[0]] || 'var(--pri)';
      const wordCount = p.content.length;
      return `<div class="cmy-thread rv-up${p.pinned ? ' cmy-pinned' : ''}">
      ${p.pinned ? '<span class="cmy-pin-label">📌 置頂</span>' : ''}
      ${!p.pinned && p.likes > 100 ? '<span class="cmy-hot">🔥 熱門</span>' : ''}
      <div class="cmy-thread-body">
        <div class="cmy-avatar" style="--av-c:${tagColor}">${p.avatar}</div>
        <div class="cmy-thread-main">
          <div class="cmy-thread-meta"><span class="cmy-user">${p.author}</span>${(p.tags||[]).map(t => `<span class="cmy-tag" style="--tag-c:${catColors[t]||'var(--pri)'}">${t}</span>`).join('')}<span class="cmy-time">${p.time}</span><span class="cmy-wc">${wordCount} 字</span></div>
          <h3 class="cmy-thread-title" style="cursor:pointer" onclick="this.closest('.cmy-thread').classList.toggle('expanded')">${p.title}</h3>
          <p class="cmy-thread-preview">${p.content}</p>
          ${c ? `<div class="cmy-course-link">📚 ${c.title}</div>` : ''}
          ${p.poll ? `<div class="poll-wrap"><h4 class="poll-q">📊 ${p.poll.question}</h4><div class="poll-options">${(()=>{const total=p.poll.options.reduce((s,o)=>s+o.votes,0);return p.poll.options.map(o=>{const pct=total?Math.round(o.votes/total*100):0;return `<button class="poll-option" data-poll="${p.id}" data-opt="${o.text}"><div class="poll-bar" style="width:${pct}%"></div><span class="poll-label">${o.text}</span><span class="poll-count">${pct}%<small>（${o.votes}）</small></span></button>`;}).join('');})()}</div><div class="poll-total">${p.poll.options.reduce((s,o)=>s+o.votes,0).toLocaleString()} 人已投票</div></div>` : ''}
          <div class="cmy-thread-stats"><button class="cmy-like-btn${cmyLiked.has(p.id) ? ' liked' : ''}" data-pid="${p.id}" data-likes="${p.likes}"><span class="cmy-heart">${cmyLiked.has(p.id) ? '❤️' : '🤍'}</span> <span class="cmy-like-count">${p.likes + (cmyLiked.has(p.id) ? 1 : 0)}</span></button><div class="cmy-react-wrap"><button class="cmy-react-btn">😀+</button><div class="cmy-react-picker" hidden>${['👍','❤️','🔥','👏','😮','💡'].map(e=>`<button class="cmy-emoji" data-eid="${p.id}">${e}</button>`).join('')}</div></div><span>💬 ${p.replies}</span><button class="cmy-share-btn" data-share="${p.title}">🔗 分享</button></div>
        </div>
      </div>
    </div>`;
    }).join('');
  }

  const totalLikes = posts.reduce((s,p) => s+p.likes, 0);
  const totalReplies = posts.reduce((s,p) => s+p.replies, 0);

  main.innerHTML = `
  <section class="cmy-hero rv-up"><div class="wrap">
    <div class="crumb rv-up" style="color:rgba(255,255,255,.7);margin-bottom:12px"><a href="index.html" style="color:rgba(255,255,255,.7)">首頁</a> › 學習社群</div>
    <h1>學習社群</h1>
    <p>分享作品、討論課程、交流經驗，與超過 ${((window.PLATFORM_STATS||{}).students||52000).toLocaleString()} 名學員一起成長</p>
    <div class="cmy-hero-stats"><span><b>${posts.length}</b> 篇討論</span><span><b>${totalLikes.toLocaleString()}</b> 個讚</span><span><b>${totalReplies}</b> 則回覆</span></div>
  </div></section>
  <div class="wrap cmy-layout">
    <div class="cmy-main">
      <div class="cmy-toolbar">
        <div class="cmy-tabs">${cats.map(c => `<button class="chip ${c === '全部' ? 'on' : ''}" data-cmycat="${c}">${c}</button>`).join('')}</div>
        <div class="cmy-sort"><button class="chip on" data-sort="new">最新</button><button class="chip" data-sort="hot">最熱</button></div>
      </div>
      <div class="cmy-list" id="cmy-list">${renderThreads()}</div>
    </div>
    <aside class="cmy-sidebar">
      <div class="cmy-sb-card rv-up">
        <h4>⭐ 活躍成員</h4>
        <div class="cmy-members">${topList.map(([name, count], i) => `<div class="cmy-member"><div class="cmy-avatar sm" style="--av-c:${memberColors[i%5]}">${posts.find(p=>p.author===name)?.avatar||name[0]}</div><div class="cmy-member-info"><b>${name}</b><span>${count} 篇發文</span></div></div>`).join('')}</div>
      </div>
      <div class="cmy-sb-card rv-up">
        <h4>📊 本週統計</h4>
        <div class="cmy-week-stats">
          <div><b>${posts.length}</b><span>討論</span></div>
          <div><b>${totalReplies}</b><span>回覆數</span></div>
          <div><b>${totalLikes.toLocaleString()}</b><span>按讚數</span></div>
        </div>
      </div>
      <div class="cmy-sb-card rv-up">
        <h4>🔥 熱門話題</h4>
        <div class="cmy-tag-cloud">${(() => {
          const allTags = [...tagSet];
          const trending = (window.TRENDING_SEARCHES||[]).slice(0,6);
          const combined = [...allTags, ...trending];
          return combined.map((t,i) => {
            const size = 12 + Math.floor(Math.random() * 8);
            const color = catColors[t] || `hsl(${(i*47)%360},55%,55%)`;
            return `<span class="cmy-cloud-tag" style="font-size:${size}px;--tag-c:${color}">${t}</span>`;
          }).join('');
        })()}</div>
      </div>
    </aside>
  </div>
  <button class="cmy-fab" id="cmy-fab">✏️ 發起討論</button>
  <div class="cmy-modal" id="cmy-modal" hidden role="dialog" aria-modal="true" aria-label="發起新討論">
    <div class="cmy-modal-bg"></div>
    <div class="cmy-modal-box">
      <div class="cmy-modal-hdr"><h3>發起新討論</h3><button class="cmy-modal-close" id="cmy-close">×</button></div>
      <div class="cmy-modal-body">
        <select class="cmy-select"><option value="">選擇分類</option>${cats.slice(1).map(c => `<option>${c}</option>`).join('')}</select>
        <input class="cmy-input" placeholder="討論標題" aria-label="討論標題">
        <textarea class="cmy-textarea" rows="6" placeholder="分享你的想法、作品或問題…" aria-label="討論內容"></textarea>
      </div>
      <div class="cmy-modal-foot">
        <button class="btn btn-ghost" id="cmy-cancel">取消</button>
        <button class="btn btn-pri" onclick="toast('示範網站：發文功能開發中')">發佈討論</button>
      </div>
    </div>
  </div>`;

  function refreshList() { $('#cmy-list').innerHTML = renderThreads(); reveal($('#cmy-list')); }

  $$('.cmy-tabs .chip', main).forEach(btn => btn.onclick = () => {
    $$('.cmy-tabs .chip', main).forEach(b => b.classList.toggle('on', b === btn));
    activeCat = btn.dataset.cmycat;
    refreshList();
  });
  $$('.cmy-sort .chip', main).forEach(btn => btn.onclick = () => {
    $$('.cmy-sort .chip', main).forEach(b => b.classList.toggle('on', b === btn));
    sortMode = btn.dataset.sort;
    refreshList();
  });
  const modal = $('#cmy-modal');
  const closeCmy = () => { modal.hidden = true; };
  $('#cmy-fab').onclick = () => { modal.hidden = false; trapFocus(modal); };
  $('#cmy-close').onclick = closeCmy;
  $('#cmy-cancel').onclick = closeCmy;
  $('.cmy-modal-bg', modal).onclick = closeCmy;
  modal.addEventListener('keydown', e => { if (e.key === 'Escape') closeCmy(); });
  main.addEventListener('click', e => {
    const btn = e.target.closest('.cmy-like-btn');
    if (!btn) return;
    const pid = btn.dataset.pid, baseLikes = +btn.dataset.likes;
    if (cmyLiked.has(pid)) { cmyLiked.delete(pid); } else { cmyLiked.add(pid); }
    ss('aic-cmy-likes', [...cmyLiked]);
    const heart = btn.querySelector('.cmy-heart'), count = btn.querySelector('.cmy-like-count');
    btn.classList.toggle('liked', cmyLiked.has(pid));
    heart.textContent = cmyLiked.has(pid) ? '❤️' : '🤍';
    count.textContent = baseLikes + (cmyLiked.has(pid) ? 1 : 0);
    if (cmyLiked.has(pid)) { btn.style.transform = 'scale(1.15)'; setTimeout(() => btn.style.transform = '', 200); }
  });
  main.addEventListener('click', e => {
    const rb = e.target.closest('.cmy-react-btn');
    if (rb) { const picker = rb.nextElementSibling; picker.hidden = !picker.hidden; return; }
    const emoji = e.target.closest('.cmy-emoji');
    if (emoji) { toast(`已按 ${emoji.textContent} 表情反應`); emoji.closest('.cmy-react-picker').hidden = true; return; }
    const share = e.target.closest('.cmy-share-btn');
    if (share) { navigator.clipboard?.writeText(`AI Class 社群 — ${share.dataset.share}\nhttps://aiclass.tw/community.html`).then(() => toast('已複製分享連結')).catch(() => toast('複製失敗')); }
  });
  const pollVotes = new Set(ls('aic-poll-votes', []));
  main.querySelectorAll('.poll-option').forEach(opt => {
    const key = opt.dataset.poll + ':' + opt.dataset.opt;
    if (pollVotes.has(key)) { opt.classList.add('poll-selected'); opt.closest('.poll-wrap').classList.add('poll-voted'); }
  });
  main.addEventListener('click', e => {
    const opt = e.target.closest('.poll-option');
    if (!opt) return;
    const wrap = opt.closest('.poll-wrap');
    if (wrap.classList.contains('poll-voted')) return;
    wrap.classList.add('poll-voted');
    opt.classList.add('poll-selected');
    pollVotes.add(opt.dataset.poll + ':' + opt.dataset.opt);
    ss('aic-poll-votes', [...pollVotes]);
    toast('感謝投票！');
  });
  document.addEventListener('click', e => { if (!e.target.closest('.cmy-react-wrap')) $$('.cmy-react-picker').forEach(p => p.hidden = true); });
  reveal(main);
}

/* ---------- 直播教室 ---------- */
function livePage() {
  const main = $('main');
  seo({ title: '直播教室｜AI Class', desc: '即時直播課程與講師互動', url: 'https://aiclass.tw/live.html' });
  const events = (window.LIVE_EVENTS || []).slice();
  const upcoming = events.filter(e => e.status === 'upcoming').sort((a,b) => new Date(a.date) - new Date(b.date));
  const ended = events.filter(e => e.status === 'ended');
  const fmtDate = d => { const dt = new Date(d); const wd = '日一二三四五六'[dt.getDay()]; return `${dt.getMonth()+1}/${String(dt.getDate()).padStart(2,'0')}（${wd}）`; };
  const fmtTime = d => { const dt = new Date(d); return `${String(dt.getHours()).padStart(2,'0')}:${String(dt.getMinutes()).padStart(2,'0')}`; };
  const nextEv = upcoming[0];

  main.innerHTML = `
  <section class="live-hero rv-up"><div class="wrap">
    <div class="crumb"><a href="index.html">首頁</a> › 直播教室</div>
    <h1>直播教室</h1>
    <p>即時互動教學，業界講師線上開講，與講師和學員即時交流</p>
    <div class="live-hero-stats"><span><b>${events.length}</b> 場已排程</span><span><b>${events.reduce((s,e)=>s+e.enrolled,0).toLocaleString()}</b> 累計報名</span><span><b>${upcoming.length}</b> 場即將開播</span></div>
  </div></section>

  <div class="wrap">
    ${nextEv ? `<section class="live-sec rv-up">
      <div class="live-next-banner rv-up">
        <div class="live-next-info"><span class="live-next-label">🔜 下一場直播</span><h3>${nextEv.title}</h3><span>${nextEv.host}・${fmtDate(nextEv.date)} ${fmtTime(nextEv.date)}</span></div>
        <div class="live-next-cd" id="liveNextCd"></div>
        <button class="btn btn-pri live-reserve-btn">🔔 預約</button>
      </div>
    </section>` : ''}

    <section class="live-sec rv-up">
      <div class="sec-head"><div><h2>📅 即將開播</h2><div class="sub">預約提醒，準時參加</div></div></div>
      <div class="live-schedule">${upcoming.map(u => {
        const c = byId[u.course];
        const pct = Math.round(u.enrolled / u.max * 100);
        return `<div class="live-sched-item rv-up">
        <div class="live-sched-date"><span class="live-sched-day">${fmtDate(u.date)}</span><span class="live-sched-time">${fmtTime(u.date)}</span></div>
        <div class="live-sched-info">
          <h4>${u.title}</h4>
          <span class="live-sched-teacher">${u.host}・${u.duration} 分鐘・👁 ${(u.enrolled * 2 + Math.floor(Math.random() * 100)).toLocaleString()} 人關注</span>
          <div class="live-sched-bar"><div class="live-sched-fill" style="width:${pct}%"></div></div>
          <span class="live-sched-seats">${u.enrolled}/${u.max} 已預約</span>
        </div>
        <button class="btn btn-ghost live-reserve-btn" data-title="${u.title}">🔔 預約提醒</button>
      </div>`;
      }).join('')}</div>
    </section>

    ${ended.length ? `<section class="live-sec rv-up">
      <div class="sec-head"><div><h2>🎬 精選回放</h2><div class="sub">錯過直播也能補看</div></div></div>
      <div class="live-rec-grid">${ended.map(e => {
        const c = byId[e.course];
        return `<div class="live-rec-card rv-up">
        <div class="live-rec-thumb"><img src="${c ? img(c) : ''}" alt="${e.title}" loading="lazy" decoding="async"><div class="live-rec-dur">${e.duration} 分</div>${e.replay ? '<div class="live-replay-badge">可回放</div>' : ''}</div>
        <div class="live-rec-info"><h4>${e.title}</h4><span>${e.host}・${e.enrolled} 人參與・▶ ${(e.enrolled * 3).toLocaleString()} 次觀看</span></div>
      </div>`;
      }).join('')}</div>
    </section>` : ''}
  </div>`;

  const cdEl = $('#liveNextCd');
  if (cdEl && nextEv) {
    const nextDate = new Date(nextEv.date);
    const tick = () => {
      const diff = nextDate - Date.now();
      if (diff <= 0) { cdEl.textContent = '即將開始'; return; }
      const d = Math.floor(diff / 864e5), h = Math.floor((diff % 864e5) / 36e5), m = Math.floor((diff % 36e5) / 6e4), s = Math.floor((diff % 6e4) / 1e3);
      cdEl.innerHTML = (d ? `<span>${d}<small>天</small></span>` : '') + `<span>${h}<small>時</small></span><span>${m}<small>分</small></span><span>${s}<small>秒</small></span>`;
    };
    tick(); setInterval(tick, 1000);
  }
  main.addEventListener('click', e => {
    const btn = e.target.closest('.live-reserve-btn');
    if (btn) toast('已預約提醒：' + (btn.dataset.title || (nextEv && nextEv.title) || '直播'), 'success');
  });
  reveal(main);
}

/* ---------- 技能測驗 ---------- */
function quizPage() {
  const main = $('main');
  seo({ title: '學習測驗｜AI Class', desc: '測驗你的學習成果，挑戰各科知識', url: 'https://aiclass.tw/quiz.html' });
  const quizzes = window.QUIZZES || [];
  const saved = ls('aic-quiz-results', {});
  const totalQ = quizzes.reduce((s, q) => s + q.questions.length, 0);

  main.innerHTML = `<div class="qz-hero rv-up">
    <div class="wrap"><div class="crumb rv-up" style="margin-bottom:12px"><a href="index.html">首頁</a> › 技能測驗</div><h1>🎯 技能測驗</h1><p>測試你的專業能力，獲得技能認證徽章</p>
    <div class="qz-hero-stats"><div><b>${quizzes.length}</b>測驗分類</div><div><b>${totalQ}</b>題目總數</div><div><b>${Object.keys(saved).length}</b>已完成</div></div></div>
  </div>
  <div class="wrap" style="padding-bottom:80px">
    <div class="qz-grid rv-up">${quizzes.map(qz => {
      const done = saved[qz.id];
      const c = byId[qz.course];
      return `<div class="qz-card" data-qk="${qz.id}">
        <div class="qz-card-icon">${c ? '📚' : '🎯'}</div>
        <h3>${qz.title}</h3>
        ${c ? `<div class="qz-card-course">${c.title}</div>` : ''}
        <div class="qz-card-info"><span>📝 ${qz.questions.length} 題</span><span>⏱ 約 ${Math.max(2, Math.ceil(qz.questions.length * 1.5))} 分鐘</span></div>
        <div class="qz-card-diff"><span class="qz-diff-dot" style="background:${qz.questions.length >= 6 ? '#ff5c8a' : qz.questions.length >= 4 ? '#ff9500' : '#34c759'}"></span>${qz.questions.length >= 6 ? '進階' : qz.questions.length >= 4 ? '中等' : '入門'}</div>
        ${done ? `<div class="qz-card-score">最高分：${done.score}/${done.total}</div>` : ''}
        <button class="btn btn-pri qz-start">${done ? '再次挑戰' : '開始測驗'}</button>
      </div>`;
    }).join('')}</div>
    ${Object.keys(saved).length ? `<div class="qz-history rv-up">
      <h3>📋 測驗記錄</h3>
      <div class="qz-history-list">${Object.entries(saved).map(([id, r]) => {
        const qz = quizzes.find(q => q.id === id);
        const pctVal = r.pct || Math.round(r.score / r.total * 100);
        const d = r.date ? new Date(r.date) : null;
        const dateStr = d ? `${d.getFullYear()}/${String(d.getMonth()+1).padStart(2,'0')}/${String(d.getDate()).padStart(2,'0')}` : '';
        return `<div class="qz-hist-item">
          <div class="qz-hist-icon">${pctVal >= 80 ? '🏆' : pctVal >= 60 ? '👍' : '💪'}</div>
          <div class="qz-hist-info"><b>${qz ? qz.title : id}</b><span>${dateStr}・${r.score}/${r.total} 答對（${pctVal}%）・用時 ${Math.floor((r.time||0)/60)}:${String((r.time||0)%60).padStart(2,'0')}</span></div>
          <div class="qz-hist-pct" style="--pct-c:${pctVal >= 80 ? '#34c759' : pctVal >= 60 ? '#ff9500' : '#ff5c8a'}">${pctVal}%</div>
        </div>`;
      }).join('')}</div>
    </div>` : ''}
  </div>
  <div class="qz-modal" hidden role="dialog" aria-modal="true" aria-label="測驗進行中">
    <div class="qz-modal-bg"></div>
    <div class="qz-modal-box">
      <div class="qz-modal-hdr"><div class="qz-progress"><div class="qz-progress-fill"></div></div><div class="qz-hdr-info"><span class="qz-q-num"></span><span class="qz-timer">⏱ 00:00</span><button class="qz-close" aria-label="關閉測驗">✕</button></div></div>
      <div class="qz-modal-body"><h3 class="qz-question"></h3><div class="qz-options"></div></div>
      <div class="qz-modal-foot"><button class="btn btn-ghost qz-prev" disabled>← 上一題</button><button class="btn btn-pri qz-next">下一題 →</button></div>
    </div>
  </div>
  <div class="qz-result" hidden role="dialog" aria-modal="true" aria-label="測驗結果">
    <div class="qz-modal-bg"></div>
    <div class="qz-result-box">
      <div class="qz-result-icon"></div>
      <h2 class="qz-result-title"></h2>
      <div class="qz-result-score"></div>
      <div class="qz-result-details"></div>
      <div class="qz-result-stats"></div>
      <div class="qz-result-actions"><button class="btn btn-pri qz-retry">再試一次</button><button class="btn btn-ghost qz-share-btn">📤 分享成績</button><button class="btn btn-ghost qz-back-btn">返回列表</button></div>
    </div>
  </div>`;

  let currentQuiz = null, currentQ = 0, answers = [], timerInt = null, elapsed = 0;
  const modal = $('.qz-modal', main), result = $('.qz-result', main);

  function startQuiz(id) {
    const qz = quizzes.find(q => q.id === id); if (!qz) return;
    const shuffled = qz.questions.map((q,i) => ({...q, idx:i})).sort(() => Math.random() - .5);
    currentQuiz = { id, title: qz.title, questions: shuffled };
    currentQ = 0; answers = new Array(shuffled.length).fill(-1); elapsed = 0;
    modal.hidden = false; document.body.style.overflow = 'hidden';
    trapFocus(modal);
    if (timerInt) clearInterval(timerInt);
    timerInt = setInterval(() => { elapsed++; $('.qz-timer', modal).textContent = '⏱ ' + String(Math.floor(elapsed/60)).padStart(2,'0') + ':' + String(elapsed%60).padStart(2,'0'); }, 1000);
    renderQuestion();
  }

  function renderQuestion() {
    const q = currentQuiz.questions[currentQ], total = currentQuiz.questions.length;
    $('.qz-progress-fill', modal).style.width = ((currentQ+1)/total*100)+'%';
    $('.qz-q-num', modal).textContent = `第 ${currentQ+1}/${total} 題`;
    $('.qz-question', modal).textContent = q.q;
    $('.qz-options', modal).innerHTML = q.opts.map((o,i) => `<label class="qz-opt${answers[currentQ]===i?' on':''}"><input type="radio" name="qopt" value="${i}"${answers[currentQ]===i?' checked':''}><span>${o}</span></label>`).join('');
    $$('.qz-opt input', modal).forEach(r => r.onchange = () => { answers[currentQ] = +r.value; $$('.qz-opt', modal).forEach((el,j) => el.classList.toggle('on', j===+r.value)); });
    $('.qz-prev', modal).disabled = currentQ === 0;
    $('.qz-next', modal).textContent = currentQ === total - 1 ? '送出答案 ✓' : '下一題 →';
  }

  function finishQuiz() {
    clearInterval(timerInt); modal.hidden = true;
    const qs = currentQuiz.questions;
    const correct = qs.reduce((s,q,i) => s + (answers[i] === q.ans ? 1 : 0), 0);
    const total = qs.length;
    const pctVal = Math.round(correct/total*100);
    const res = {score:correct, total, time:elapsed, pct:pctVal, date:Date.now()};
    saved[currentQuiz.id] = !saved[currentQuiz.id] || correct > saved[currentQuiz.id].score ? res : saved[currentQuiz.id];
    ss('aic-quiz-results', saved);
    const icon = pctVal >= 80 ? '🏆' : pctVal >= 60 ? '👍' : '💪';
    const title = pctVal >= 80 ? '太厲害了！' : pctVal >= 60 ? '表現不錯！' : '繼續加油！';
    result.hidden = false; trapFocus(result);
    $('.qz-result-icon', result).textContent = icon;
    $('.qz-result-title', result).textContent = title;
    $('.qz-result-score', result).innerHTML = `<span class="qz-big-score">${correct}<small>/${total}</small></span><div class="qz-pct">${pctVal}%</div>`;
    $('.qz-result-details', result).innerHTML = qs.map((q,i) => {
      const isCorrect = answers[i] === q.ans;
      return `<div class="qz-detail-item ${isCorrect ? 'correct' : 'wrong'}"><span class="qz-detail-num">${i+1}</span><span class="qz-detail-q">${q.q}</span><span class="qz-detail-icon">${isCorrect ? '✅' : '❌'}</span>${!isCorrect ? `<span class="qz-detail-ans">正確答案：${q.opts[q.ans]}</span>` : ''}</div>`;
    }).join('');
    const mins = Math.floor(elapsed/60), secs = elapsed%60;
    $('.qz-result-stats', result).innerHTML = `<div><b>✅ ${correct}</b>答對</div><div><b>❌ ${total-correct}</b>答錯</div><div><b>⏱ ${mins}:${String(secs).padStart(2,'0')}</b>用時</div>`;
  }

  $$('.qz-card', main).forEach(card => card.querySelector('.qz-start').onclick = () => startQuiz(card.dataset.qk));
  const closeModal = () => { modal.hidden = true; clearInterval(timerInt); document.body.style.overflow = ''; };
  const closeResult = () => { result.hidden = true; document.body.style.overflow = ''; };
  modal.onclick = e => { e.stopPropagation();
    if (e.target.classList.contains('qz-modal-bg') || e.target.closest('.qz-close')) closeModal();
    if (e.target.closest('.qz-next')) { if (currentQ < currentQuiz.questions.length - 1) { currentQ++; renderQuestion(); } else finishQuiz(); }
    if (e.target.closest('.qz-prev') && currentQ > 0) { currentQ--; renderQuestion(); }
  };
  result.onclick = e => { e.stopPropagation();
    if (e.target.classList.contains('qz-modal-bg') || e.target.closest('.qz-close')) closeResult();
    if (e.target.closest('.qz-retry')) { closeResult(); startQuiz(currentQuiz.id); }
    if (e.target.closest('.qz-back-btn')) closeResult();
    if (e.target.closest('.qz-share-btn') && currentQuiz) { const txt = `我在 AI Class 的「${currentQuiz.title}」測驗中答對了 ${saved[currentQuiz.id].score}/${saved[currentQuiz.id].total} 題！`; if (navigator.share) navigator.share({title:'AI Class 測驗成績',text:txt}).catch(()=>{}); else { navigator.clipboard.writeText(txt).then(()=>toast('成績已複製')).catch(()=>{}); } }
  };
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { if (!modal.hidden) closeModal(); if (!result.hidden) closeResult(); } });
  reveal(main);
}

/* ---------- 排行榜 ---------- */
/* ---------- 成就系統 ---------- */
function achievementPage() {
  const main = $('main');
  seo({ title: '學習成就｜AI Class', desc: '查看你的學習徽章與成就收藏', url: 'https://aiclass.tw/achievement.html' });
  const badges = window.BADGES || [];
  const owned = ls('aic-owned', []);
  const quizResults = ls('aic-quiz-results', {});
  const notes = ls('aic-notes', {});
  const progress = ls('aic-progress', {});

  const rarityMap = { common: { label: '普通', color: '#6e6e73' }, rare: { label: '稀有', color: '#00b4d8' }, epic: { label: '史詩', color: '#a855f7' }, legendary: { label: '傳說', color: '#ffd700' } };
  const achievements = badges.map(b => {
    let earned = false, prog = 0, total = 1;
    if (b.id === 'bg1') { earned = !!localStorage.getItem('aic-user'); }
    else if (b.id === 'bg2') { const pVals = Object.values(progress); earned = pVals.some(p => p > 0); prog = pVals.filter(p => p > 0).length; }
    else if (b.id === 'bg3') { const hrs = Object.values(progress).reduce((s,v) => s+v, 0) * 0.5; earned = hrs >= 10; prog = Math.min(Math.round(hrs), 10); total = 10; }
    else if (b.id === 'bg4') { const done = Object.values(progress).filter(v => v >= 100).length; earned = done >= 1; prog = done; }
    else if (b.id === 'bg5') { earned = owned.length >= 5; prog = owned.length; total = 5; }
    else if (b.id === 'bg6') { prog = streakData.count; total = 30; earned = streakData.count >= 30; }
    else if (b.id === 'bg7') { prog = 12; total = 50; }
    else if (b.id === 'bg8') { const nc = Object.values(notes).reduce((s,v) => s + (Array.isArray(v) ? v.length : 0), 0); earned = nc >= 100; prog = Math.min(nc, 100); total = 100; }
    else if (b.id === 'bg9') { const perfect = Object.values(quizResults).some(r => r.pct === 100); earned = perfect; prog = perfect ? 1 : 0; }
    else if (b.id === 'bg10') { prog = 0; total = 3; }
    else if (b.id === 'bg11') { prog = 2; total = 7; }
    else if (b.id === 'bg12') { const catsDone = new Set(); owned.forEach(id => { const cc = byId[id]; if (cc) catsDone.add(cc.cat); }); earned = catsDone.size >= 3; prog = catsDone.size; total = 3; }
    else if (b.id === 'bg13') { earned = streakData.count >= 7; prog = Math.min(streakData.count, 7); total = 7; }
    else if (b.id === 'bg14') { const lessons = Object.values(progress).reduce((s,v) => s + Math.floor(v / 5), 0); earned = lessons >= 100; prog = Math.min(lessons, 100); total = 100; }
    else if (b.id === 'bg15') { const rv = Object.keys(ls('aic-reviews', {})).length; earned = rv >= 10; prog = Math.min(rv, 10); total = 10; }
    else if (b.id === 'bg16') { prog = 2; total = 5; }
    else if (b.id === 'bg17') { earned = xpData.total >= 10000; prog = Math.min(xpData.total, 10000); total = 10000; }
    else if (b.id === 'bg18') { prog = 0; total = 1; }
    const r = rarityMap[b.rarity || 'common'] || rarityMap.common;
    return { ...b, earned, prog, total, rarityLabel: r.label, rarityColor: r.color };
  });

  const earnedCount = achievements.filter(a => a.earned).length;
  const badgeXp = achievements.filter(a => a.earned).reduce((s,a) => s + a.xp, 0);
  const totalXp = xpData.total || badgeXp;

  const earnedList = achievements.filter(a => a.earned);
  const lockedList = achievements.filter(a => !a.earned);
  const completePct = Math.round(earnedCount / badges.length * 100);
  const lvl = getXPLevel();
  const xpProg = getXPProgress();

  main.innerHTML = `
  <section class="ach-hero rv-up"><div class="wrap">
    <div class="crumb rv-up"><a href="index.html">首頁</a> › 學習成就</div>
    <h1>🏅 學習成就</h1>
    <p>解鎖徽章、追蹤里程碑，見證你的學習旅程</p>
    <div class="ach-hero-stats">
      <div><b>${earnedCount}</b><span>已解鎖</span></div>
      <div><b>${badges.length}</b><span>總成就數</span></div>
      <div><b>${completePct}%</b><span>完成率</span></div>
      <div><b>${totalXp}</b><span>獲得 XP</span></div>
    </div>
  </div></section>
  <div class="wrap ach-wrap">
    <div class="ach-progress-ring rv-up">
      <svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="52" fill="none" stroke="var(--line)" stroke-width="8"/>
      <circle cx="60" cy="60" r="52" fill="none" stroke="url(#achGrad)" stroke-width="8" stroke-dasharray="${2*Math.PI*52}" stroke-dashoffset="${2*Math.PI*52*(1 - earnedCount/badges.length)}" stroke-linecap="round" transform="rotate(-90 60 60)"/>
      <defs><linearGradient id="achGrad"><stop offset="0%" stop-color="var(--pri)"/><stop offset="100%" stop-color="var(--pink)"/></linearGradient></defs></svg>
      <div class="ach-ring-text"><b>${earnedCount}/${badges.length}</b><span>已解鎖</span></div>
    </div>
    <div class="ach-xp-bar rv-up">
      <div class="ach-xp-label"><span>${lvl.name}（Lv.${lvl.lv}）</span><b>${totalXp.toLocaleString()} XP</b></div>
      <div class="ach-xp-track"><div class="ach-xp-fill" style="width:${xpProg.pct}%"></div></div>
      <div class="ach-xp-next">${xpProg.pct < 100 ? `下一等級：${xpProg.cur.toLocaleString()} / ${xpProg.need.toLocaleString()} XP` : '已達最高等級！'}</div>
    </div>
    ${earnedList.length ? `<h2 class="ach-section-title rv-up">✨ 已獲得 (${earnedList.length})</h2>
    <div class="ach-grid">
      ${earnedList.map(a => `<div class="ach-card rv-up earned ach-${a.rarity||'common'}" style="--ach-rc:${a.rarityColor}">
        <div class="ach-icon">${a.icon}</div>
        <div class="ach-card-body">
          <h3>${a.name}</h3>
          <span class="ach-rarity" style="color:${a.rarityColor}">${a.rarityLabel}</span>
          <p>${a.desc}</p>
          <div class="ach-xp-badge">+${a.xp} XP</div>
          <div class="ach-earned-date">✓ 已解鎖</div>
        </div>
      </div>`).join('')}
    </div>` : ''}
    ${lockedList.length ? `<h2 class="ach-section-title rv-up">🔒 未解鎖 (${lockedList.length})</h2>
    <div class="ach-grid">
      ${lockedList.map(a => {
        const remain = a.total - a.prog;
        const hint = remain > 0 ? `還差 ${remain.toLocaleString()} ${a.id === 'bg17' ? 'XP' : a.id === 'bg14' ? '課時' : a.id === 'bg8' ? '則筆記' : a.id === 'bg6' ? '天' : '項'}` : '';
        return `<div class="ach-card rv-up locked ach-${a.rarity||'common'}" style="--ach-rc:${a.rarityColor}">
        <div class="ach-icon-wrap"><div class="ach-icon">${a.icon}</div><span class="ach-lock">🔒</span></div>
        <div class="ach-card-body">
          <h3>${a.name}</h3>
          <span class="ach-rarity" style="color:${a.rarityColor}">${a.rarityLabel}</span>
          <p>${a.desc}</p>
          <div class="ach-xp-badge">+${a.xp} XP</div>
          <div class="ach-prog-bar"><div class="ach-prog-fill" style="width:${Math.round(a.prog/a.total*100)}%"></div></div>
          <div class="ach-prog-txt">${a.prog.toLocaleString()} / ${a.total.toLocaleString()}${hint ? ` — ${hint}` : ''}</div>
        </div>
      </div>`;
      }).join('')}
    </div>` : ''}
  </div>`;
  reveal(main);
}

function leaderboardPage() {
  const main = $('main');
  seo({ title: '學習排行榜｜AI Class', desc: '查看學習積分排行榜與本週之星', url: 'https://aiclass.tw/leaderboard.html' });
  const lb = window.LEADERBOARD || [];
  const medals = ['🥇','🥈','🥉'];
  const podiumColors = ['#ffd700','#c0c0c0','#cd7f32'];
  const tabs = ['XP 積分','完課數','連續天數'];

  let activeTab = 0;

  function getSorted(tab) {
    const sorted = [...lb];
    if (tab === 0) sorted.sort((a,b) => b.xp - a.xp);
    else if (tab === 1) sorted.sort((a,b) => b.courses - a.courses);
    else sorted.sort((a,b) => b.streak - a.streak);
    return sorted.map((d,i) => ({...d, rank: i+1}));
  }

  function renderBoard(tab) {
    const data = getSorted(tab);
    const valCol = tab === 0
      ? (d => `<b>${d.xp.toLocaleString()}</b> XP・${d.courses} 門課程`)
      : tab === 1
      ? (d => `<b>${d.courses}</b> 門完課・${d.xp.toLocaleString()} XP`)
      : (d => `<b>${d.streak}</b> 天連續・${d.courses} 門課程`);
    return data.map(d => `<div class="lb-row ${d.rank <= 3 ? 'top' : ''} rv-up">
      <span class="lb-rank">${d.rank <= 3 ? medals[d.rank-1] : d.rank}</span>
      <div class="lb-avatar" style="background:${d.rank <= 3 ? podiumColors[d.rank-1] : `hsl(${d.name.charCodeAt(0)*37%360},60%,55%)`}">${d.avatar}</div>
      <div class="lb-info"><b>${d.name}</b><span>${valCol(d)}</span></div>
      <div class="lb-streak">🔥 ${d.streak} 天</div>
    </div>`).join('');
  }

  const top3 = getSorted(0).slice(0, 3);
  const totalXp = lb.reduce((s,d) => s + d.xp, 0);

  main.innerHTML = `
  <section class="lb-hero rv-up"><div class="wrap">
    <div class="crumb rv-up"><a href="index.html">首頁</a> › 學習排行榜</div>
    <h1>🏆 學習排行榜</h1>
    <p>與全站 ${((window.PLATFORM_STATS||{}).students||52000).toLocaleString()} 名學員一起競爭，激發學習動力</p>
    <div class="lb-hero-stats">
      <div><b>${lb.length}</b><span>上榜學員</span></div>
      <div><b>${totalXp.toLocaleString()}</b><span>總 XP</span></div>
      <div><b>${Math.max(...lb.map(d=>d.streak))}</b><span>最長連續</span></div>
    </div>
  </div></section>
  <div class="wrap lb-wrap">
    <div class="lb-top3 rv-up">
      ${top3.map((d, i) => `<div class="lb-podium ${['gold','silver','bronze'][i]}">
        <div class="lb-podium-medal">${medals[i]}</div>
        <div class="lb-podium-avatar" style="background:${podiumColors[i]}">${d.avatar}</div>
        <b>${d.name}</b>
        <span>${d.xp.toLocaleString()} XP</span>
      </div>`).join('')}
    </div>
    <div class="lb-filter-row rv-up">
      <div class="lb-tabs">${tabs.map((t, i) => `<button class="chip ${i === 0 ? 'on' : ''}" data-lbtab="${i}">${t}</button>`).join('')}</div>
      <div class="lb-time-tabs"><button class="lb-time on" data-lbt="all">全部</button><button class="lb-time" data-lbt="month">本月</button><button class="lb-time" data-lbt="week">本週</button></div>
    </div>
    <div class="lb-my rv-up">
      <span class="lb-rank">--</span>
      <div class="lb-avatar" style="background:var(--pri)">你</div>
      <div class="lb-info"><b>我的排名</b><span>登入後查看你的排名</span></div>
      <a class="btn btn-pri" href="index.html" style="height:38px;padding:0 20px;font-size:14px">繼續學習</a>
    </div>
    <div class="lb-list" id="lbList">${renderBoard(0)}</div>
  </div>`;

  $$('.lb-tabs .chip', main).forEach(btn => btn.onclick = () => {
    $$('.lb-tabs .chip', main).forEach(b => b.classList.remove('on'));
    btn.classList.add('on');
    activeTab = +btn.dataset.lbtab;
    $('#lbList').innerHTML = renderBoard(activeTab);
    reveal($('#lbList'));
  });
  $$('.lb-time', main).forEach(btn => btn.onclick = () => {
    $$('.lb-time', main).forEach(b => b.classList.remove('on'));
    btn.classList.add('on');
    $('#lbList').innerHTML = renderBoard(activeTab);
    reveal($('#lbList'));
  });
  reveal(main);
}

/* ---------- 404 ---------- */
function notFoundPage() {
  seo({ title: '找不到頁面｜AI Class', desc: '你要找的頁面不存在，但我們有很多精彩課程等你探索', url: 'https://aiclass.tw/404.html' });
  const main = $('main');
  document.title = '找不到頁面｜AI Class';
  main.innerHTML = `<section class="nf-hero"><div class="wrap" style="text-align:center;padding:80px 32px">
    <div class="nf-illustration rv-up"><span class="nf-num">4</span><span class="nf-planet">🪐</span><span class="nf-num">4</span></div>
    <h1 class="rv-up" style="font-size:clamp(1.5rem,4vw,2.5rem);margin:24px 0 12px">哎呀，這裡什麼都沒有</h1>
    <p class="rv-up" style="color:var(--tx2);font-size:16px;max-width:480px;margin:0 auto 32px">你可能迷路了 🗺️ 這個頁面已被移除或不存在，但別擔心，我們有很多精彩內容等你探索！</p>
    <div class="nf-search rv-up">
      <input type="text" class="nf-search-input" placeholder="搜尋課程或文章…" aria-label="搜尋">
      <button class="btn btn-pri nf-search-btn">搜尋</button>
    </div>
    <div class="rv-up" style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:20px">
      <a class="btn btn-pri" href="index.html" style="height:48px;padding:0 32px;font-size:16px">回到首頁</a>
      <a class="btn btn-ghost" href="blog.html" style="height:48px;padding:0 32px;font-size:16px">瀏覽學習專欄</a>
    </div>
    <div class="rv-up" style="margin-top:48px"><h3 style="margin-bottom:16px">熱門課程推薦</h3></div>
  </div></section>
  ${railSec('nf-rec', '', '', C.filter(c => c.tag === 'BEST' || c.tag === 'HOT').slice(0, 8))}`;
  const nfInput = $('.nf-search-input', main), nfBtn = $('.nf-search-btn', main);
  const doSearch = () => { const q = nfInput.value.trim(); if (q) location.href = 'search.html?q=' + encodeURIComponent(q); };
  if (nfBtn) nfBtn.onclick = doSearch;
  if (nfInput) nfInput.onkeydown = e => { if (e.key === 'Enter') doSearch(); };
  bindCards(main); bindRail($('#nf-rec'));
  reveal(main);
}

/* ---------- 影片內容 ---------- */
function videoPage() {
  const main = $('main');
  seo({ title: '影片專區｜AI Class', desc: '學員作品、講師訪談、幕後花絮、新課預告', url: 'https://aiclass.tw/video.html' });
  const vcs = window.VIDEO_CONTENT || [];
  const cats = ['全部', ...new Set(vcs.map(v => v.cat))];
  main.innerHTML = `<div class="wrap" style="padding-top:100px">
    <div class="crumb rv-up"><a href="index.html">首頁</a> › 影片專區</div>
    <h1 class="rv-up" style="font-weight:900;margin-bottom:8px">影片專區</h1>
    <p class="rv-up" style="color:var(--tx2);margin-bottom:32px">學員作品、講師訪談、幕後花絮與新課預告</p>
    <div class="chips rv-up" id="vid-chips">${cats.map((c, i) => `<button class="chip ${i ? '' : 'on'}" data-vcat="${c}">${c}</button>`).join('')}</div>
    <div class="vid-grid" id="vid-grid">${vcs.map(v => {
      const cc = byId[v.course];
      const thumb = cc ? img(cc) : '';
      const videoSrc = cc ? vid(cc) : '';
      return `<div class="vid-card rv-up" data-vcat="${v.cat}" data-video="${videoSrc}" data-poster="${thumb}">
        <div class="vid-card-thumb"><img src="${thumb}" alt="${v.title}" loading="lazy" decoding="async"><span class="vid-play-icon">▶</span><span class="vid-views">${(v.views/1000).toFixed(1)}K 觀看</span></div>
        <div class="vid-card-info"><span class="vid-cat-tag">${v.cat}</span><h3>${v.title}</h3>${cc ? `<a class="vid-course-link" href="course.html?id=${cc.id}">${cc.title}</a>` : ''}</div></div>`;
    }).join('')}</div></div>`;

  $$('#vid-chips .chip').forEach(btn => btn.onclick = () => {
    $$('#vid-chips .chip').forEach(b => b.classList.toggle('on', b === btn));
    const cat = btn.dataset.vcat;
    $$('#vid-grid .vid-card').forEach(c => { c.style.display = cat === '全部' || c.dataset.vcat === cat ? '' : 'none'; });
  });

  $$('.vid-card').forEach(el => el.onclick = e => {
    if (e.target.closest('.vid-course-link')) return;
    const src = el.dataset.video, poster = el.dataset.poster, title = $('h3', el).textContent;
    const trigger = document.activeElement;
    const ov = document.createElement('div'); ov.className = 'vid-overlay'; ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true'); ov.setAttribute('aria-label', title);
    ov.innerHTML = `<div class="vid-modal"><button class="vid-modal-close" aria-label="關閉">×</button><video src="${src}" poster="${poster}" controls autoplay></video><h3>${title}</h3></div>`;
    document.body.append(ov);
    requestAnimationFrame(() => { requestAnimationFrame(() => ov.classList.add('on')); $('.vid-modal-close', ov).focus(); });
    const close = () => { ov.classList.remove('on'); setTimeout(() => { ov.remove(); if (trigger) trigger.focus(); }, 300); };
    $('.vid-modal-close', ov).onclick = close;
    ov.onclick = e2 => { if (e2.target === ov) close(); };
    document.addEventListener('keydown', function esc(e2) { if (e2.key === 'Escape') { close(); document.removeEventListener('keydown', esc); } });
  });
  reveal(main);
}

/* ---------- 課程組合包頁面 ---------- */
function bundlePage() {
  seo({ title: '課程組合包', desc: '精選課程組合包，多堂課程一起購買享超值折扣，省下更多學習經費。', ogType: 'website' });
  const bundles = window.BUNDLES || [];
  const main = $('#main');
  main.innerHTML = `<div class="wrap" style="padding:80px 0 60px">
    <nav class="breadcrumb rv-up"><a href="index.html">首頁</a> <span>›</span> <span>課程組合包</span></nav>
    <div class="bdl-hero rv-up">
      <div class="bdl-hero-content">
        <span class="bdl-eyebrow">Bundle Deals</span>
        <h1>課程組合包</h1>
        <p>精選主題組合，多堂課程一起購買最高省 NT$5,620<br>一次學會完整技能，比單買更划算</p>
        <div class="bdl-hero-stats">
          <div><b>${bundles.length}</b><span>個組合</span></div>
          <div><b>${bundles.reduce((s, b) => s + b.courses.length, 0)}</b><span>堂課程</span></div>
          <div><b>${Math.round(bundles.reduce((s, b) => s + (1 - b.price / b.original), 0) / bundles.length * 100)}%</b><span>平均折扣</span></div>
        </div>
      </div>
    </div>
    <div class="bdl-grid">
      ${bundles.map((b, i) => {
        const courses = b.courses.map(id => byId[id]).filter(Boolean);
        const disc = Math.round((1 - b.price / b.original) * 100);
        const totalHours = courses.reduce((s, c) => s + c.hours, 0);
        const totalStudents = courses.reduce((s, c) => s + c.students, 0);
        const avgRating = (courses.reduce((s, c) => s + c.rating, 0) / courses.length).toFixed(1);
        const allOwned = courses.every(c => owned.has(c.id));
        const someOwned = courses.some(c => owned.has(c.id));
        return `<div class="bdl-card rv-up" style="transition-delay:${(i % 3) * 80}ms">
          ${b.tag ? `<span class="bdl-tag">${b.tag}</span>` : ''}
          <div class="bdl-card-head">
            <h2>${b.name}</h2>
            <p>${b.desc}</p>
          </div>
          <div class="bdl-courses">
            ${courses.map(c => `<a href="course.html?id=${c.id}" class="bdl-course">
              <img src="${img(c)}" alt="${c.title}" loading="lazy" decoding="async">
              <div class="bdl-course-info">
                <b>${c.title}</b>
                <span>${c.teacher} ・ ★ ${c.rating}</span>
              </div>
              ${owned.has(c.id) ? '<span class="bdl-owned">已購買</span>' : ''}
            </a>`).join('')}
          </div>
          <div class="bdl-meta">
            <span>📚 ${courses.length} 堂課</span>
            <span>⏱ ${totalHours} 小時</span>
            <span>★ ${avgRating} 平均</span>
            <span>👥 ${totalStudents.toLocaleString()} 位學員</span>
          </div>
          <div class="bdl-price">
            <div class="bdl-price-row">
              <span class="bdl-origin">${fmt(b.original)}</span>
              <span class="bdl-disc">-${disc}%</span>
            </div>
            <div class="bdl-final">${fmt(b.price)}</div>
            <div class="bdl-save">省下 ${fmt(b.save)}</div>
          </div>
          <div class="bdl-actions">
            ${allOwned ? '<button class="btn btn-ghost" disabled>已全部購買</button>' : `<button class="btn btn-pri bdl-buy" data-bdl="${b.id}">整組加入購物車</button>`}
            ${someOwned && !allOwned ? '<small class="bdl-note">已購買的課程不會重複收費</small>' : ''}
          </div>
        </div>`;
      }).join('')}
    </div>
    <section class="bdl-faq rv-up" style="margin-top:60px">
      <h2 style="font-size:24px;font-weight:900;text-align:center;margin-bottom:32px">常見問題</h2>
      <div class="qa">
        <div class="qa-item"><button>組合包可以退費嗎？</button><div class="qa-ans" hidden><p>可以。購買後 7 天內可全額退費，若已觀看超過 30% 的課程內容則不適用。</p></div></div>
        <div class="qa-item"><button>已經買過其中一堂，還能買組合包嗎？</button><div class="qa-ans" hidden><p>可以購買，系統會自動扣除已購買的課程金額，您只需支付差額。</p></div></div>
        <div class="qa-item"><button>組合包的課程可以分開觀看嗎？</button><div class="qa-ans" hidden><p>可以。購買組合包後，每堂課都會獨立出現在您的「我的課程」中，可依自己的步調學習。</p></div></div>
        <div class="qa-item"><button>組合包有時間限制嗎？</button><div class="qa-ans" hidden><p>沒有。所有課程皆為無限期觀看，且享有免費更新保證。</p></div></div>
      </div>
    </section>
  </div>`;

  $$('.bdl-buy', main).forEach(btn => {
    btn.addEventListener('click', () => {
      const b = bundles.find(x => x.id === btn.dataset.bdl);
      if (!b) return;
      let added = 0;
      b.courses.forEach(id => { if (!owned.has(id) && !cart.has(id)) { cart.add(id); added++; } });
      saveCart(); updateCartBadge();
      if (added) toast('已將 ' + added + ' 堂課程加入購物車');
      else toast('這些課程已在購物車中');
      btn.textContent = '✓ 已加入'; btn.style.background = 'var(--pri)';
    });
  });

  $$('.qa-item button', main).forEach(b => {
    b.addEventListener('click', () => {
      const ans = b.nextElementSibling;
      const open = !ans.hidden;
      $$('.qa-ans', main).forEach(a => a.hidden = true);
      $$('.qa-item button', main).forEach(x => x.classList.remove('on'));
      if (!open) { ans.hidden = false; b.classList.add('on'); }
    });
  });

  reveal(main);
}

/* ---------- 學員成功故事頁面 ---------- */
function successPage() {
  seo({ title: '學員成功故事', desc: '看看 AI Class 學員如何透過線上學習轉職加薪、創業圓夢，真實故事激勵你的學習之路。', ogType: 'website' });
  const stories = window.SUCCESS_STORIES || [];
  const main = $('#main');
  const totalSalaryUp = stories.filter(s => s.salary.includes('→')).length;
  main.innerHTML = `<div class="wrap" style="padding:80px 0 60px">
    <nav class="breadcrumb rv-up"><a href="index.html">首頁</a> <span>›</span> <span>學員成功故事</span></nav>
    <div class="scs-hero rv-up">
      <span class="scs-eyebrow">Success Stories</span>
      <h1>他們的故事，你的未來</h1>
      <p>每一位學員都從零開始，透過 AI Class 的課程一步步實現目標<br>這些真實故事，證明學習的力量</p>
      <div class="scs-hero-stats">
        <div><b>${stories.length}</b><span>位學員</span></div>
        <div><b>${totalSalaryUp}</b><span>成功轉職</span></div>
        <div><b>100%</b><span>推薦課程</span></div>
      </div>
    </div>
    <div class="scs-grid">
      ${stories.map((s, i) => {
        const courses = s.courses.map(id => byId[id]).filter(Boolean);
        return `<div class="scs-card rv-up" style="transition-delay:${(i % 2) * 100}ms">
          <div class="scs-card-head">
            <div class="scs-avatar">${s.avatar}</div>
            <div class="scs-info">
              <h3>${s.name}</h3>
              <p>${s.role}</p>
            </div>
          </div>
          <div class="scs-salary">
            <span class="scs-salary-label">薪資成長</span>
            <span class="scs-salary-val">${s.salary}</span>
          </div>
          <p class="scs-story">${s.story}</p>
          <div class="scs-meta">
            <span>⏱ 學習時間：${s.duration}</span>
          </div>
          <div class="scs-courses">
            <span class="scs-courses-label">修習課程</span>
            ${courses.map(c => `<a href="course.html?id=${c.id}" class="scs-course-link">
              <img src="${img(c)}" alt="${c.title}" loading="lazy" decoding="async">
              <span>${c.title}</span>
            </a>`).join('')}
          </div>
        </div>`;
      }).join('')}
    </div>
    <section class="scs-cta rv-up" style="margin-top:60px">
      <div class="scs-cta-box">
        <h2>準備好開始你的故事了嗎？</h2>
        <p>超過 ${C.length} 堂課程等你探索，現在就踏出第一步</p>
        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
          <a href="category.html" class="btn btn-pri">探索課程 →</a>
          <a href="quiz.html" class="btn btn-ghost">課程推薦測驗</a>
        </div>
      </div>
    </section>
  </div>`;
  reveal(main);
}

/* ---------- 即將開課頁面 ---------- */
function upcomingPage() {
  seo({ title: '即將開課', desc: '搶先預覽 AI Class 即將推出的新課程，登記早鳥優惠第一時間開課通知。', ogType: 'website' });
  const upcoming = window.UPCOMING_COURSES || [];
  const main = $('#main');
  const catMap = {};
  C.forEach(c => { if (!catMap[c.cat]) catMap[c.cat] = CATS.find(ct => ct.id === c.cat); });
  const totalInterest = upcoming.reduce((s, u) => s + u.interest, 0);
  main.innerHTML = `<div class="wrap" style="padding:80px 0 60px">
    <nav class="breadcrumb rv-up"><a href="index.html">首頁</a> <span>›</span> <span>即將開課</span></nav>
    <div class="upc-hero rv-up">
      <span class="upc-eyebrow">Coming Soon</span>
      <h1>即將開課預告</h1>
      <p>這些課程正在緊鑼密鼓準備中，登記早鳥搶先享優惠價<br>開課時第一時間通知你</p>
      <div class="upc-hero-stats">
        <div><b>${upcoming.length}</b><span>籌備中課程</span></div>
        <div><b>${totalInterest.toLocaleString()}</b><span>人期待中</span></div>
        <div><b>最高 35%</b><span>早鳥折扣</span></div>
      </div>
    </div>
    <div class="upc-grid">
      ${upcoming.map((u, i) => {
        const catObj = CATS.find(ct => ct.id === u.cat);
        const catLabel = catObj ? catObj.name : u.cat;
        const saved = Math.round((1 - u.earlybird / (u.earlybird * 1.35)) * 100);
        return `<div class="upc-card rv-up" style="transition-delay:${(i % 2) * 100}ms">
          <div class="upc-badge">${u.expected}</div>
          <div class="upc-cat">${catLabel}</div>
          <h2>${u.title}</h2>
          <p class="upc-teacher">講師：${u.teacher}</p>
          <div class="upc-interest">
            <div class="upc-interest-bar"><div style="width:${Math.min(u.interest / 25, 100)}%"></div></div>
            <span>${u.interest.toLocaleString()} 人感興趣</span>
          </div>
          <div class="upc-price-row">
            <span class="upc-earlybird">早鳥價 ${fmt(u.earlybird)}</span>
          </div>
          <div class="upc-actions">
            <button class="btn btn-pri" onclick="toast('已登記早鳥通知，開課時將第一時間通知您！')">🔔 登記早鳥通知</button>
            <button class="btn btn-ghost" onclick="toast('已加入願望清單')">♡ 收藏</button>
          </div>
        </div>`;
      }).join('')}
    </div>
    <section class="upc-cta rv-up" style="margin-top:60px">
      <div class="upc-cta-box">
        <h2>想看更多課程？</h2>
        <p>目前已有 ${C.length} 堂課程上架，涵蓋 ${CATS.length} 大領域</p>
        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
          <a href="category.html" class="btn btn-pri">瀏覽所有課程 →</a>
          <a href="bundle.html" class="btn btn-ghost">超值組合包</a>
        </div>
      </div>
    </section>
  </div>`;
  reveal(main);
}

/* ---------- 聯絡我們頁面 ---------- */
function contactPage() {
  seo({ title: '聯絡我們', desc: 'AI Class 客服中心——常見問題、聯絡表單、線上客服，我們隨時為你的學習之旅提供協助。', ogType: 'website' });
  const main = $('#main');
  const quickFAQ = [
    { q: '如何購買課程？', a: '在課程頁面點擊「加入購物車」，前往購物車頁面完成結帳即可。支援信用卡、超商付款、ATM 轉帳等付款方式。' },
    { q: '課程可以退費嗎？', a: '購買後 7 天內且觀看進度未超過 30%，可申請全額退費。請透過下方表單或客服信箱提出申請。' },
    { q: '忘記密碼怎麼辦？', a: '點擊登入頁面的「忘記密碼」，輸入註冊信箱即可收到重設密碼連結。信件通常 5 分鐘內送達。' },
    { q: '課程有觀看期限嗎？', a: '所有課程皆為無限期觀看，購買後可隨時回來複習，且享有課程更新保證。' },
    { q: '如何取得完課證書？', a: '完成課程所有章節並通過課後測驗後，系統會自動發放電子證書，可在「我的學習」頁面下載。' },
    { q: '可以用手機觀看嗎？', a: '可以。AI Class 支援所有裝置，包括桌面電腦、平板和手機，也可安裝 PWA 離線使用。' }
  ];
  main.innerHTML = `<div class="wrap" style="padding:80px 0 60px">
    <nav class="breadcrumb rv-up"><a href="index.html">首頁</a> <span>›</span> <span>聯絡我們</span></nav>
    <div class="ctc-hero rv-up">
      <span class="ctc-eyebrow">Support Center</span>
      <h1>我們在這裡幫助你</h1>
      <p>學習遇到問題？帳務需要協助？我們的客服團隊隨時為你服務</p>
    </div>
    <div class="ctc-channels rv-up">
      <div class="ctc-ch">
        <div class="ctc-ch-icon">📧</div>
        <h3>Email 客服</h3>
        <p>support@aiclass.tw</p>
        <span>24 小時內回覆</span>
      </div>
      <div class="ctc-ch">
        <div class="ctc-ch-icon">💬</div>
        <h3>LINE 客服</h3>
        <p>@aiclass</p>
        <span>週一至週五 09:00-18:00</span>
      </div>
      <div class="ctc-ch">
        <div class="ctc-ch-icon">📞</div>
        <h3>電話客服</h3>
        <p>(02) 2345-6789</p>
        <span>週一至週五 09:00-18:00</span>
      </div>
    </div>
    <section class="ctc-faq rv-up">
      <h2>常見問題速查</h2>
      <div class="qa">
        ${quickFAQ.map(f => `<div class="qa-item"><button>${f.q}</button><div class="qa-ans" hidden><p>${f.a}</p></div></div>`).join('')}
      </div>
      <p style="text-align:center;margin-top:20px"><a href="faq.html" class="btn btn-ghost">查看更多常見問題 →</a></p>
    </section>
    <section class="ctc-form-sec rv-up">
      <h2>填寫聯絡表單</h2>
      <p class="ctc-form-sub">無法找到答案？直接留下你的問題，客服團隊會盡快回覆</p>
      <form class="ctc-form" onsubmit="event.preventDefault();toast('感謝您的來信，我們會在 24 小時內回覆！');this.reset();">
        <div class="ctc-row">
          <div class="ctc-field"><label>姓名 <span>*</span></label><input type="text" required placeholder="你的姓名"></div>
          <div class="ctc-field"><label>Email <span>*</span></label><input type="email" required placeholder="your@email.com"></div>
        </div>
        <div class="ctc-field"><label>問題類型</label>
          <select><option>課程相關</option><option>帳務/付款</option><option>技術問題</option><option>退費申請</option><option>企業方案洽詢</option><option>講師合作</option><option>其他</option></select>
        </div>
        <div class="ctc-field"><label>訊息內容 <span>*</span></label><textarea required rows="5" placeholder="請詳細描述你的問題..."></textarea></div>
        <button type="submit" class="btn btn-pri" style="width:100%;padding:14px">送出表單</button>
      </form>
    </section>
    <section class="ctc-info rv-up" style="margin-top:48px">
      <h2>AI Class 公司資訊</h2>
      <div class="ctc-info-grid">
        <div><b>公司名稱</b><p>AI Class 股份有限公司</p></div>
        <div><b>統一編號</b><p>12345678</p></div>
        <div><b>公司地址</b><p>台北市信義區松仁路 100 號 10 樓</p></div>
        <div><b>營業時間</b><p>週一至週五 09:00 - 18:00</p></div>
      </div>
    </section>
    <section class="ctc-map rv-up" style="margin-top:40px">
      <h2>我們的位置</h2>
      <div class="ctc-map-box">
        <div class="ctc-map-placeholder">
          <div class="ctc-map-pin">📍</div>
          <p>台北市信義區松仁路 100 號 10 樓</p>
          <span>AI Class 總部</span>
          <a class="btn btn-ghost" href="https://maps.google.com/?q=台北市信義區松仁路100號" target="_blank" rel="noopener noreferrer" style="margin-top:12px;font-size:13px">在 Google Maps 開啟 →</a>
        </div>
      </div>
    </section>
    <section class="ctc-social rv-up" style="margin-top:40px;text-align:center">
      <h2>追蹤我們</h2>
      <p style="color:var(--tx2);margin-bottom:20px">在社群媒體上關注 AI Class 最新消息</p>
      <div class="ctc-social-links">
        <a href="#" class="ctc-social-btn" aria-label="Facebook">📘 Facebook</a>
        <a href="#" class="ctc-social-btn" aria-label="Instagram">📸 Instagram</a>
        <a href="#" class="ctc-social-btn" aria-label="YouTube">🎬 YouTube</a>
        <a href="#" class="ctc-social-btn" aria-label="LINE">💬 LINE</a>
        <a href="#" class="ctc-social-btn" aria-label="Twitter">🐦 X (Twitter)</a>
      </div>
    </section>
  </div>`;
  const faqItems = main.querySelectorAll('.qa-item button');
  faqItems.forEach(btn => btn.addEventListener('click', () => {
    const ans = btn.nextElementSibling;
    const open = !ans.hidden;
    main.querySelectorAll('.qa-ans').forEach(a => { a.hidden = true; a.previousElementSibling.classList.remove('open'); });
    if (!open) { ans.hidden = false; btn.classList.add('open'); }
  }));

  // Inline form validation
  const ctcForm = main.querySelector('.ctc-form');
  if (ctcForm) {
    ctcForm.querySelectorAll('input, textarea').forEach(inp => {
      inp.addEventListener('blur', () => {
        let err = inp.closest('.ctc-field')?.querySelector('.ctc-err');
        if (!inp.validity.valid && inp.value) {
          if (!err) { err = document.createElement('span'); err.className = 'ctc-err'; inp.after(err); }
          err.textContent = inp.type === 'email' ? '請輸入有效的 Email 格式' : '此欄位為必填';
          inp.classList.add('ctc-invalid');
        } else {
          if (err) err.remove();
          inp.classList.remove('ctc-invalid');
        }
      });
    });
  }

  reveal(main);
}

/* ---------- 學員作品牆 ---------- */
function galleryPage() {
  const main = $('main');
  const G = window.GALLERY || [];
  const cats = ['全部', ...new Set(G.map(g => g.cat))];
  seo({ title: '學員作品牆｜AI Class', desc: `探索 ${G.length} 件學員精彩作品`, url: 'https://aiclass.tw/gallery.html',
    jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: '學員作品牆', description: `${G.length} 件學員作品展示` }
  });
  const galLikes = ls('aic-gal-likes', {});

  main.innerHTML = `
  <section class="sec"><div class="wrap" style="padding-top:100px">
    <div class="crumb rv-up"><a href="index.html">首頁</a> › 學員作品牆</div>
    <div class="gal-header rv-up">
      <div class="gal-header-text"><h1>學員作品牆</h1><p>看看 AI Class 學員們的精彩創作成果</p></div>
      <div class="gal-header-stats"><div class="gal-stat"><b>${G.length}</b><span>作品</span></div><div class="gal-stat"><b>${G.reduce((s,g) => s+g.likes, 0).toLocaleString()}</b><span>總讚數</span></div><div class="gal-stat"><b>${new Set(G.map(g => g.author)).size}</b><span>創作者</span></div></div>
    </div>
    <div class="chips rv-up" id="gal-chips">${cats.map((c, i) => `<button class="chip ${i ? '' : 'on'}" data-gcat="${c}">${c}</button>`).join('')}</div>
    <div class="gal-sort rv-up"><select id="gal-sort" aria-label="排序"><option value="featured">精選優先</option><option value="likes">最多按讚</option><option value="comments">最多留言</option><option value="newest">最新作品</option></select></div>
    <div class="gal-grid" id="gal-grid">${renderGallery(G, galLikes)}</div>
  </div></section>`;

  function renderGallery(items, likes) {
    return items.map(g => {
      const cc = byId[g.course];
      const liked = likes[g.id];
      return `<div class="gal-card rv-up ${g.featured ? 'gal-featured' : ''}" data-gcat="${g.cat}" data-gid="${g.id}" data-likes="${g.likes}" data-comments="${g.comments}">
        <div class="gal-card-img"><img src="assets/img/v${g.v}.jpg" alt="${g.title}" loading="lazy" decoding="async">${g.featured ? '<span class="gal-feat-badge">⭐ 精選</span>' : ''}</div>
        <div class="gal-card-body">
          <div class="gal-card-meta"><span class="gal-cat-tag">${g.cat}</span></div>
          <h3>${g.title}</h3>
          <p class="gal-desc">${g.desc}</p>
          <div class="gal-author"><div class="gal-author-avatar" style="background:hsl(${g.id.charCodeAt(1)*40},55%,55%)">${g.author[0]}</div><span>${g.author}</span></div>
          ${cc ? `<a class="gal-course-link" href="course.html?id=${cc.id}">📚 ${cc.title}</a>` : ''}
          <div class="gal-actions">
            <button class="gal-like ${liked ? 'liked' : ''}" data-glike="${g.id}"><span class="gal-like-icon">${liked ? '♥' : '♡'}</span> <span class="gal-like-n">${g.likes + (liked ? 1 : 0)}</span></button>
            <span class="gal-comment-count">💬 ${g.comments}</span>
          </div>
        </div>
      </div>`;
    }).join('');
  }

  $$('#gal-chips .chip', main).forEach(btn => btn.onclick = () => {
    $$('#gal-chips .chip', main).forEach(b => b.classList.toggle('on', b === btn));
    const cat = btn.dataset.gcat;
    $$('#gal-grid .gal-card', main).forEach(c => { c.style.display = cat === '全部' || c.dataset.gcat === cat ? '' : 'none'; });
  });

  $('#gal-sort', main).onchange = function() {
    const cards = [...$$('#gal-grid .gal-card', main)];
    const grid = $('#gal-grid', main);
    cards.sort((a, b) => {
      if (this.value === 'likes') return +b.dataset.likes - +a.dataset.likes;
      if (this.value === 'comments') return +b.dataset.comments - +a.dataset.comments;
      if (this.value === 'featured') return (b.classList.contains('gal-featured') ? 1 : 0) - (a.classList.contains('gal-featured') ? 1 : 0);
      return 0;
    });
    cards.forEach(c => grid.append(c));
  };

  $$('[data-glike]', main).forEach(btn => btn.onclick = () => {
    const id = btn.dataset.glike;
    const numEl = btn.querySelector('.gal-like-n');
    const iconEl = btn.querySelector('.gal-like-icon');
    if (galLikes[id]) {
      delete galLikes[id]; btn.classList.remove('liked'); iconEl.textContent = '♡';
      if (numEl) numEl.textContent = +numEl.textContent - 1;
    } else {
      galLikes[id] = true; btn.classList.add('liked'); iconEl.textContent = '♥';
      if (numEl) numEl.textContent = +numEl.textContent + 1;
    }
    ss('aic-gal-likes', galLikes);
  });

  reveal(main);
}

/* ---------- 帳號設定 ---------- */
function settingsPage() {
  const main = $('main');
  seo({ title: '帳號設定｜AI Class', desc: '管理你的 AI Class 帳號設定、個人資料與通知偏好。', url: 'https://aiclass.tw/settings.html' });
  document.title = '帳號設定｜AI Class';
  const user = aicUser || { name: '學員', email: 'user@aiclass.tw' };
  const isDark = document.documentElement.dataset.theme === 'dark';
  const prefs = ls('aic-settings', {emailNews:true,emailCourse:true,emailPromo:false,lang:'zh-TW',autoplay:true,subtitle:true});

  main.innerHTML = `
  <section class="sec"><div class="wrap">
    <div class="crumb rv-up"><a href="index.html">首頁</a> › <a href="my.html">我的學習</a> › 帳號設定</div>
    <h1 class="set-title rv-up">帳號設定</h1>
    <div class="set-layout">
      <nav class="set-nav rv-up">
        <button class="set-nav-btn on" data-stab="profile">👤 個人資料</button>
        <button class="set-nav-btn" data-stab="notify">🔔 通知偏好</button>
        <button class="set-nav-btn" data-stab="display">🎨 顯示設定</button>
        <button class="set-nav-btn" data-stab="playback">▶ 播放設定</button>
        <button class="set-nav-btn" data-stab="connected">🔗 連結帳號</button>
        <button class="set-nav-btn" data-stab="privacy">🔒 隱私與安全</button>
      </nav>
      <div class="set-main">
        <section class="set-sec" id="set-profile">
          <h2 class="rv-up">個人資料</h2>
          <div class="set-card rv-up">
            <div class="set-avatar-row">
              <div class="set-avatar-circle">${user.name[0]}</div>
              <div class="set-avatar-info">
                <button class="btn btn-ghost btn-sm set-avatar-btn">更換頭像</button>
                <small>支援 JPG、PNG，建議 200×200px 以上</small>
              </div>
            </div>
            <div class="set-field"><label>顯示名稱</label><input type="text" value="${user.name}" id="set-name" aria-label="顯示名稱"></div>
            <div class="set-field"><label>Email</label><input type="email" value="${user.email}" id="set-email" aria-label="Email"><small>修改後需驗證新信箱</small></div>
            <div class="set-field"><label>電話</label><input type="tel" placeholder="選填" id="set-phone" aria-label="電話"></div>
            <div class="set-field"><label>自我介紹</label><textarea rows="3" placeholder="介紹一下自己吧..." id="set-bio" aria-label="自我介紹"></textarea></div>
            <button class="btn btn-pri set-save" data-sec="profile">儲存變更</button>
          </div>
        </section>

        <section class="set-sec" id="set-notify" hidden>
          <h2 class="rv-up">通知偏好</h2>
          <div class="set-card rv-up">
            <div class="set-toggle-row"><span>電子報與學習週報</span><label class="set-toggle"><input type="checkbox" ${prefs.emailNews ? 'checked' : ''} data-pref="emailNews"><span class="set-slider"></span></label></div>
            <div class="set-toggle-row"><span>課程更新通知</span><label class="set-toggle"><input type="checkbox" ${prefs.emailCourse ? 'checked' : ''} data-pref="emailCourse"><span class="set-slider"></span></label></div>
            <div class="set-toggle-row"><span>促銷與優惠通知</span><label class="set-toggle"><input type="checkbox" ${prefs.emailPromo ? 'checked' : ''} data-pref="emailPromo"><span class="set-slider"></span></label></div>
            <div class="set-toggle-row"><span>講師回覆通知</span><label class="set-toggle"><input type="checkbox" checked data-pref="emailReply"><span class="set-slider"></span></label></div>
            <div class="set-toggle-row"><span>成就解鎖通知</span><label class="set-toggle"><input type="checkbox" checked data-pref="emailAch"><span class="set-slider"></span></label></div>
            <button class="btn btn-pri set-save" data-sec="notify">儲存偏好</button>
          </div>
        </section>

        <section class="set-sec" id="set-display" hidden>
          <h2 class="rv-up">顯示設定</h2>
          <div class="set-card rv-up">
            <div class="set-toggle-row"><span>深色模式</span><label class="set-toggle"><input type="checkbox" ${isDark ? 'checked' : ''} id="set-dark"><span class="set-slider"></span></label></div>
            <div class="set-field"><label>介面語言</label><select id="set-lang" aria-label="介面語言"><option value="zh-TW" ${prefs.lang === 'zh-TW' ? 'selected' : ''}>繁體中文</option><option value="zh-CN" ${prefs.lang === 'zh-CN' ? 'selected' : ''}>简体中文</option><option value="en" ${prefs.lang === 'en' ? 'selected' : ''}>English</option><option value="ja" ${prefs.lang === 'ja' ? 'selected' : ''}>日本語</option><option value="ko" ${prefs.lang === 'ko' ? 'selected' : ''}>한국어</option></select></div>
            <div class="set-field"><label>字體大小</label><div class="set-font-btns"><button class="set-font-btn ${document.documentElement.style.fontSize === '14px' ? 'on' : ''}" data-fs="14px">小</button><button class="set-font-btn ${!document.documentElement.style.fontSize || document.documentElement.style.fontSize === '16px' ? 'on' : ''}" data-fs="16px">標準</button><button class="set-font-btn ${document.documentElement.style.fontSize === '18px' ? 'on' : ''}" data-fs="18px">大</button></div></div>
            <button class="btn btn-pri set-save" data-sec="display">儲存設定</button>
          </div>
        </section>

        <section class="set-sec" id="set-playback" hidden>
          <h2 class="rv-up">播放設定</h2>
          <div class="set-card rv-up">
            <div class="set-toggle-row"><span>自動播放下一個單元</span><label class="set-toggle"><input type="checkbox" ${prefs.autoplay ? 'checked' : ''} data-pref="autoplay"><span class="set-slider"></span></label></div>
            <div class="set-toggle-row"><span>預設開啟字幕</span><label class="set-toggle"><input type="checkbox" ${prefs.subtitle ? 'checked' : ''} data-pref="subtitle"><span class="set-slider"></span></label></div>
            <div class="set-field"><label>預設播放速度</label><select id="set-speed" aria-label="播放速度"><option>0.75x</option><option selected>1x</option><option>1.25x</option><option>1.5x</option><option>2x</option></select></div>
            <div class="set-field"><label>預設畫質</label><select id="set-quality" aria-label="畫質"><option>自動</option><option>1080p</option><option>720p</option><option>480p</option></select></div>
            <button class="btn btn-pri set-save" data-sec="playback">儲存設定</button>
          </div>
        </section>

        <section class="set-sec" id="set-connected" hidden>
          <h2 class="rv-up">連結帳號</h2>
          <div class="set-card rv-up">
            <div class="set-connected-item"><div class="set-ci-icon" style="background:#4285f4">G</div><div class="set-ci-info"><b>Google</b><span>已連結：user@gmail.com</span></div><button class="btn btn-ghost btn-sm">解除連結</button></div>
            <div class="set-connected-item"><div class="set-ci-icon" style="background:#06c755">L</div><div class="set-ci-info"><b>LINE</b><span class="set-ci-not">尚未連結</span></div><button class="btn btn-pri btn-sm">連結帳號</button></div>
            <div class="set-connected-item"><div class="set-ci-icon" style="background:#000">A</div><div class="set-ci-info"><b>Apple</b><span class="set-ci-not">尚未連結</span></div><button class="btn btn-pri btn-sm">連結帳號</button></div>
            <div class="set-connected-item"><div class="set-ci-icon" style="background:#0a66c2">in</div><div class="set-ci-info"><b>LinkedIn</b><span class="set-ci-not">尚未連結</span></div><button class="btn btn-pri btn-sm">連結帳號</button></div>
          </div>
        </section>

        <section class="set-sec" id="set-privacy" hidden>
          <h2 class="rv-up">隱私與安全</h2>
          <div class="set-card rv-up">
            <div class="set-toggle-row"><span>公開個人檔案</span><label class="set-toggle"><input type="checkbox" checked data-pref="publicProfile"><span class="set-slider"></span></label></div>
            <div class="set-toggle-row"><span>允許其他學員查看我的學習進度</span><label class="set-toggle"><input type="checkbox" data-pref="showProgress"><span class="set-slider"></span></label></div>
            <div class="set-toggle-row"><span>顯示在排行榜上</span><label class="set-toggle"><input type="checkbox" checked data-pref="showLeaderboard"><span class="set-slider"></span></label></div>
            <hr class="set-divider">
            <h3 class="set-danger-title">危險區域</h3>
            <div class="set-danger-row">
              <div><b>變更密碼</b><p>定期更換密碼以確保帳號安全</p></div>
              <button class="btn btn-ghost btn-sm set-change-pw">變更密碼</button>
            </div>
            <div class="set-danger-row">
              <div><b>匯出資料</b><p>下載你的所有學習紀錄與個人資料</p></div>
              <button class="btn btn-ghost btn-sm set-export">匯出資料</button>
            </div>
            <div class="set-danger-row set-danger-delete">
              <div><b>刪除帳號</b><p>此操作無法復原，所有課程與紀錄將永久刪除</p></div>
              <button class="btn btn-sm set-delete-btn">刪除帳號</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div></section>`;

  $$('.set-nav-btn', main).forEach(btn => btn.onclick = () => {
    $$('.set-nav-btn', main).forEach(b => b.classList.toggle('on', b === btn));
    $$('.set-sec', main).forEach(s => s.hidden = s.id !== 'set-' + btn.dataset.stab);
  });

  const darkToggle = $('#set-dark', main);
  if (darkToggle) darkToggle.onchange = () => {
    document.documentElement.dataset.theme = darkToggle.checked ? 'dark' : 'light';
    ss('aic-theme', darkToggle.checked ? 'dark' : 'light');
  };

  $$('.set-font-btn', main).forEach(btn => btn.onclick = () => {
    document.documentElement.style.fontSize = btn.dataset.fs;
    ss('aic-fontsize', btn.dataset.fs);
    $$('.set-font-btn', main).forEach(b => b.classList.toggle('on', b === btn));
  });

  $$('.set-save', main).forEach(btn => btn.onclick = () => {
    $$('[data-pref]', main).forEach(inp => { prefs[inp.dataset.pref] = inp.checked; });
    const lang = $('#set-lang', main); if (lang) prefs.lang = lang.value;
    ss('aic-settings', prefs);
    toast('設定已儲存');
  });

  const exportBtn = $('.set-export', main);
  if (exportBtn) exportBtn.onclick = () => toast('資料匯出中，稍後會寄到你的信箱');

  const pwBtn = $('.set-change-pw', main);
  if (pwBtn) pwBtn.onclick = () => toast('密碼重設信已寄出，請查收 Email');

  const delBtn = $('.set-delete-btn', main);
  if (delBtn) delBtn.onclick = () => {
    const ov = document.createElement('div'); ov.className = 'set-del-overlay'; ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true');
    ov.innerHTML = `<div class="set-del-modal">
      <div class="set-del-icon">⚠️</div>
      <h3>確定要刪除帳號嗎？</h3>
      <p>此操作<b>無法復原</b>，你的所有課程、學習紀錄、成就和筆記將永久刪除。</p>
      <div class="set-del-field"><label>請輸入「刪除我的帳號」以確認</label><input type="text" id="set-del-confirm" placeholder="刪除我的帳號" aria-label="確認文字"></div>
      <div class="set-del-btns">
        <button class="btn btn-ghost set-del-cancel">取消</button>
        <button class="btn set-del-go" disabled>確認刪除</button>
      </div>
    </div>`;
    document.body.append(ov);
    requestAnimationFrame(() => ov.classList.add('show'));
    const inp = ov.querySelector('#set-del-confirm'), goBtn = ov.querySelector('.set-del-go');
    inp.oninput = () => { goBtn.disabled = inp.value !== '刪除我的帳號'; };
    inp.focus();
    const close = () => { ov.classList.remove('show'); setTimeout(() => ov.remove(), 250); };
    ov.querySelector('.set-del-cancel').onclick = close;
    ov.onclick = e => { if (e.target === ov) close(); };
    goBtn.onclick = () => { close(); toast('帳號刪除申請已送出，將於 3 個工作天內處理', 'warning'); };
  };

  const avatarBtn = $('.set-avatar-btn', main);
  if (avatarBtn) avatarBtn.onclick = () => toast('頭像上傳功能開發中');

  $$('.set-connected-item .btn', main).forEach(btn => btn.onclick = () => {
    const name = btn.closest('.set-connected-item').querySelector('b').textContent;
    if (btn.textContent.includes('解除')) toast(`已解除 ${name} 連結`, 'warning');
    else toast(`${name} 連結功能開發中`);
  });

  reveal(main);
}

/* ---------- 學習筆記總覽 ---------- */
function notebookPage() {
  const main = $('main');
  const allNotes = ls('aic-notes', {});
  seo({ title: '學習筆記｜AI Class', desc: '管理你的所有課程學習筆記', url: 'https://aiclass.tw/notebook.html' });

  const flat = [];
  Object.entries(allNotes).forEach(([cid, notes]) => {
    const cc = byId[cid];
    if (cc && notes.length) notes.forEach((n, i) => flat.push({ ...n, cid, ci: i, cTitle: cc.title, cTeacher: cc.teacher, cImg: `assets/img/v${cc.v}.jpg` }));
  });
  flat.sort((a, b) => b.ts - a.ts);
  const courseList = [...new Set(flat.map(n => n.cid))];

  main.innerHTML = `
  <section class="sec"><div class="wrap" style="padding-top:100px">
    <div class="crumb rv-up"><a href="index.html">首頁</a> › <a href="my.html">我的學習</a> › 學習筆記</div>
    <div class="nb-header rv-up">
      <div class="nb-header-text"><h1>學習筆記</h1><p>你在 AI Class 的所有學習筆記</p></div>
      <div class="nb-header-stats">
        <div class="nb-stat"><b>${flat.length}</b><span>總筆記</span></div>
        <div class="nb-stat"><b>${courseList.length}</b><span>課程</span></div>
      </div>
    </div>
    <div class="nb-toolbar rv-up">
      <div class="nb-search-wrap"><input type="search" class="nb-search" id="nb-search" placeholder="搜尋筆記內容..." aria-label="搜尋筆記"><span class="nb-search-icon">🔍</span></div>
      <select class="nb-filter" id="nb-filter" aria-label="篩選課程"><option value="">全部課程</option>${courseList.map(cid => { const cc = byId[cid]; return cc ? `<option value="${cid}">${cc.title}</option>` : ''; }).join('')}</select>
      <select class="nb-sort" id="nb-sort" aria-label="排序"><option value="newest">最新優先</option><option value="oldest">最舊優先</option></select>
      ${flat.length ? `<button class="btn btn-ghost btn-sm nb-export-all" id="nb-export-all">📥 全部匯出</button>` : ''}
    </div>
    <div class="nb-list" id="nb-list">
      ${flat.length ? flat.map(n => `<div class="nb-card rv-up" data-cid="${n.cid}" data-ts="${n.ts}" data-ci="${n.ci}">
        <div class="nb-card-course"><img src="${n.cImg}" alt="${n.cTitle}" loading="lazy" decoding="async"><div class="nb-card-course-info"><a href="course.html?id=${n.cid}">${n.cTitle}</a><span>${n.cTeacher}</span></div></div>
        <p class="nb-card-text">${n.text}</p>
        <div class="nb-card-foot"><time>${new Date(n.ts).toLocaleDateString('zh-TW')} ${new Date(n.ts).toLocaleTimeString('zh-TW', {hour:'2-digit',minute:'2-digit'})}</time><button class="nb-del" data-cid="${n.cid}" data-ci="${n.ci}">刪除</button></div>
      </div>`).join('') : `<div class="nb-empty rv-up"><div class="nb-empty-icon">📝</div><h3>還沒有筆記</h3><p>在觀看課程時記錄學習重點，所有筆記都會顯示在這裡。</p><a href="index.html" class="btn btn-pri">探索課程 →</a></div>`}
    </div>
  </div></section>`;

  const searchEl = $('#nb-search', main), filterEl = $('#nb-filter', main), sortEl = $('#nb-sort', main);
  function applyFilters() {
    const q = searchEl.value.toLowerCase(), cid = filterEl.value, order = sortEl.value;
    const cards = $$('.nb-card', main);
    cards.forEach(c => {
      const matchCid = !cid || c.dataset.cid === cid;
      const matchQ = !q || c.querySelector('.nb-card-text').textContent.toLowerCase().includes(q) || c.querySelector('.nb-card-course-info a').textContent.toLowerCase().includes(q);
      c.style.display = matchCid && matchQ ? '' : 'none';
    });
    const sorted = [...cards].filter(c => c.style.display !== 'none').sort((a, b) => order === 'newest' ? +b.dataset.ts - +a.dataset.ts : +a.dataset.ts - +b.dataset.ts);
    const list = $('#nb-list', main);
    sorted.forEach(c => list.append(c));
  }
  if (searchEl) searchEl.oninput = applyFilters;
  if (filterEl) filterEl.onchange = applyFilters;
  if (sortEl) sortEl.onchange = applyFilters;

  $$('.nb-del', main).forEach(btn => btn.onclick = () => {
    const { cid, ci } = btn.dataset;
    const notes = allNotes[cid] || [];
    notes.splice(+ci, 1);
    if (!notes.length) delete allNotes[cid]; else allNotes[cid] = notes;
    ss('aic-notes', allNotes);
    btn.closest('.nb-card').remove();
    const stat = main.querySelector('.nb-stat b');
    if (stat) stat.textContent = Object.values(allNotes).flat().length;
    toast('筆記已刪除');
  });

  const exportAll = $('#nb-export-all', main);
  if (exportAll) exportAll.onclick = () => {
    let txt = `# AI Class — 全部學習筆記\n匯出時間：${new Date().toLocaleString('zh-TW')}\n${'─'.repeat(40)}\n\n`;
    Object.entries(allNotes).forEach(([cid, notes]) => {
      const cc = byId[cid];
      if (cc && notes.length) {
        txt += `## ${cc.title}（${cc.teacher}）\n\n`;
        notes.forEach((n, i) => { txt += `### 筆記 ${i+1}\n📅 ${new Date(n.ts).toLocaleString('zh-TW')}\n\n${n.text}\n\n`; });
        txt += '─'.repeat(40) + '\n\n';
      }
    });
    const blob = new Blob([txt], { type: 'text/plain;charset=utf-8' });
    const u = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = u; a.download = `AI-Class-全部筆記-${new Date().toISOString().slice(0,10)}.txt`; a.click(); URL.revokeObjectURL(u);
    toast('全部筆記已匯出');
  };
  reveal(main);
}

/* ---------- 學習報告 ---------- */
function reportPage() {
  const main = $('main');
  seo({ title: '學習報告｜AI Class', desc: '你的個人學習報告——時數、進度、技能與目標追蹤', url: 'https://aiclass.tw/report.html' });

  const demoProgress = [78, 45, 100, 12, 62, 33, 91, 55, 88, 20, 95, 38, 67];
  const enrolled = C.map((c, i) => ({ ...c, progress: demoProgress[i % demoProgress.length] }));
  const totalHours = enrolled.reduce((s, c) => s + c.hours, 0);
  const completed = enrolled.filter(c => c.progress === 100).length;
  const weeklyData = [
    { label: '10/28', hours: 2.5 }, { label: '10/29', hours: 1.8 }, { label: '10/30', hours: 3.2 },
    { label: '10/31', hours: 0.5 }, { label: '11/01', hours: 2.0 }, { label: '11/02', hours: 4.1 },
    { label: '11/03', hours: 1.5 }, { label: '11/04', hours: 2.8 }
  ];
  const maxH = Math.max(...weeklyData.map(d => d.hours));
  const monthlyData = [
    { label: '6月', hours: 12 }, { label: '7月', hours: 18 }, { label: '8月', hours: 22 },
    { label: '9月', hours: 15 }, { label: '10月', hours: 28 }, { label: '11月', hours: 8 }
  ];
  const maxM = Math.max(...monthlyData.map(d => d.hours));
  const catDist = {};
  const catNameMap = Object.fromEntries((window.CATS || []).map(ct => [ct.id, ct.name]));
  enrolled.forEach(c => { const cn = catNameMap[c.cat] || c.cat; catDist[cn] = (catDist[cn] || 0) + 1; });
  const catEntries = Object.entries(catDist).sort((a, b) => b[1] - a[1]);
  const catMax = Math.max(...catEntries.map(e => e[1]));
  const skills = [
    { name: 'UI/UX 設計', pct: 85 }, { name: 'AI 應用', pct: 70 }, { name: '插畫繪圖', pct: 55 },
    { name: '攝影後製', pct: 40 }, { name: '音樂製作', pct: 25 }, { name: '3D 建模', pct: 30 }
  ];
  const goals = [
    { title: '每週學習 10 小時', current: 18.4, target: 10, unit: '小時', done: true },
    { title: '本月完成 2 門課', current: 1, target: 2, unit: '門', done: false },
    { title: '累計 100 小時學習', current: totalHours, target: 100, unit: '小時', done: totalHours >= 100 },
    { title: '獲得 5 張證書', current: completed, target: 5, unit: '張', done: completed >= 5 }
  ];
  const milestones = [
    { date: '2026/11/03', text: '完成「進階 UI 動效設計」全部課程', icon: '🎓' },
    { date: '2026/10/28', text: '購買第 7 堂課程', icon: '🛒' },
    { date: '2026/10/20', text: '連續學習突破 14 天', icon: '🔥' },
    { date: '2026/10/15', text: '獲得「測驗達人」徽章', icon: '🏆' },
    { date: '2026/09/20', text: '加入 AI Class', icon: '🎉' }
  ];

  main.innerHTML = `
  <section class="sec"><div class="wrap" style="padding-top:100px">
    <div class="crumb rv-up"><a href="index.html">首頁</a> › <a href="my.html">我的學習</a> › 學習報告</div>
    <div class="rpt-header rv-up">
      <div class="rpt-header-text"><h1>學習報告</h1><p>你的個人化學習數據與分析</p></div>
      <div class="rpt-period"><select id="rpt-period" aria-label="時間範圍"><option>最近 30 天</option><option>最近 90 天</option><option>全部</option></select></div>
    </div>

    <div class="rpt-overview rv-up">
      <div class="rpt-ov-card"><div class="rpt-ov-icon" style="background:var(--pri-12);color:var(--pri)">⏱</div><div class="rpt-ov-data"><b>${totalHours}</b><span>總學習時數</span></div></div>
      <div class="rpt-ov-card"><div class="rpt-ov-icon" style="background:rgba(52,199,89,.12);color:#34c759">✓</div><div class="rpt-ov-data"><b>${completed}</b><span>已完成課程</span></div></div>
      <div class="rpt-ov-card"><div class="rpt-ov-icon" style="background:rgba(255,149,0,.12);color:#ff9500">📚</div><div class="rpt-ov-data"><b>${enrolled.length}</b><span>進行中課程</span></div></div>
      <div class="rpt-ov-card"><div class="rpt-ov-icon" style="background:var(--pink-12);color:var(--pink)">🔥</div><div class="rpt-ov-data"><b>${streakData.count}</b><span>連續學習天數</span></div></div>
    </div>

    <div class="rpt-grid">
      <div class="rpt-card rv-up">
        <h3 class="rpt-card-title">每日學習時數</h3>
        <p class="rpt-card-sub">過去 8 天</p>
        <div class="rpt-bar-chart">${weeklyData.map(d => `<div class="rpt-bar-col"><div class="rpt-bar" style="height:${d.hours / maxH * 100}%"><span class="rpt-bar-val">${d.hours}h</span></div><span class="rpt-bar-label">${d.label}</span></div>`).join('')}</div>
      </div>
      <div class="rpt-card rv-up">
        <h3 class="rpt-card-title">每月學習時數</h3>
        <p class="rpt-card-sub">近半年趨勢</p>
        <div class="rpt-bar-chart rpt-monthly">${monthlyData.map(d => `<div class="rpt-bar-col"><div class="rpt-bar" style="height:${d.hours / maxM * 100}%"><span class="rpt-bar-val">${d.hours}h</span></div><span class="rpt-bar-label">${d.label}</span></div>`).join('')}</div>
      </div>
      <div class="rpt-card rv-up">
        <h3 class="rpt-card-title">類別分佈</h3>
        <p class="rpt-card-sub">你的學習方向</p>
        <div class="rpt-hbar-chart">${catEntries.map(([cat, n]) => `<div class="rpt-hbar-row"><span class="rpt-hbar-label">${cat}</span><div class="rpt-hbar-track"><div class="rpt-hbar-fill" style="width:${n / catMax * 100}%"></div></div><span class="rpt-hbar-val">${n} 門</span></div>`).join('')}</div>
      </div>
      <div class="rpt-card rv-up">
        <h3 class="rpt-card-title">技能雷達</h3>
        <p class="rpt-card-sub">依據完成課程推算</p>
        <div class="rpt-skills">${skills.map(s => `<div class="rpt-skill-row"><span class="rpt-skill-name">${s.name}</span><div class="rpt-skill-track"><div class="rpt-skill-fill" style="width:${s.pct}%"></div></div><span class="rpt-skill-val">${s.pct}%</span></div>`).join('')}</div>
      </div>
    </div>

    <div class="rpt-goals rv-up">
      <h3 class="rpt-card-title">學習目標</h3>
      <div class="rpt-goals-grid">${goals.map(g => `<div class="rpt-goal ${g.done ? 'rpt-goal-done' : ''}">
        <div class="rpt-goal-check">${g.done ? '✓' : ''}</div>
        <div class="rpt-goal-info"><b>${g.title}</b><div class="rpt-goal-bar"><div class="rpt-goal-fill" style="width:${Math.min(100, g.current / g.target * 100)}%"></div></div><span class="rpt-goal-progress">${g.current} / ${g.target} ${g.unit}</span></div>
      </div>`).join('')}</div>
    </div>

    <div class="rpt-card rpt-courses rv-up">
      <h3 class="rpt-card-title">課程進度明細</h3>
      <div class="rpt-course-list">${enrolled.map(c => `<div class="rpt-course-row">
        <img src="assets/img/v${c.v}.jpg" alt="${c.title}" loading="lazy" decoding="async">
        <div class="rpt-course-info"><b>${c.title}</b><span>${c.teacher}・${c.hours} 小時</span></div>
        <div class="rpt-course-prog"><div class="rpt-course-bar"><div class="rpt-course-fill" style="width:${c.progress}%"></div></div><span>${c.progress}%</span></div>
      </div>`).join('')}</div>
    </div>

    <div class="rpt-card rpt-milestones rv-up">
      <h3 class="rpt-card-title">學習里程碑</h3>
      <div class="rpt-ml-list">${milestones.map(m => `<div class="rpt-ml-item"><span class="rpt-ml-icon">${m.icon}</span><div class="rpt-ml-info"><b>${m.text}</b><time>${m.date}</time></div></div>`).join('')}</div>
    </div>
  </div></section>`;
  reveal(main);
}

/* ---------- 限時特賣 ---------- */
function salePage() {
  const main = $('main');
  seo({ title: '限時特賣｜AI Class', desc: '精選課程最低 5 折起，限時搶購倒數中！', url: 'https://aiclass.tw/sale.html',
    jsonLd: { '@context': 'https://schema.org', '@type': 'OfferCatalog', name: '限時特賣', description: 'AI Class 精選課程限時優惠' }
  });

  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 3);
  endDate.setHours(23, 59, 59, 0);
  const endTs = endDate.getTime();

  const deals = [
    { id: 'flash', label: '閃購特惠', badge: '⚡ 限量', discount: 50, courses: C.filter(c => c.rating >= 4.8).slice(0, 4) },
    { id: 'bundle', label: '組合優惠', badge: '🎁 買二送一', discount: 33, courses: C.filter(c => ['design','ai'].includes(c.cat)).slice(0, 6) },
    { id: 'new', label: '新課首發價', badge: '🆕 新課', discount: 20, courses: C.slice(-6) }
  ];
  const coupons = [
    { code: 'DOUBLE11', desc: '全站 85 折', min: 3000, badge: '雙 11' },
    { code: 'FIRST500', desc: '新會員折 $500', min: 2000, badge: '限新會員' },
    { code: 'VIP30', desc: 'VIP 再享 7 折', min: 5000, badge: 'VIP 專屬' }
  ];

  main.innerHTML = `
  <section class="sale-hero">
    <div class="wrap">
      <div class="sale-hero-inner rv-up">
        <span class="sale-hero-badge">🔥 限時活動</span>
        <h1>雙 11 限時特賣</h1>
        <p>全站精選課程最低 5 折起，把握機會提升自我</p>
        <div class="sale-countdown" id="sale-cd">
          <div class="sale-cd-item"><span class="sale-cd-num" id="cd-d">00</span><span class="sale-cd-label">天</span></div>
          <div class="sale-cd-sep">:</div>
          <div class="sale-cd-item"><span class="sale-cd-num" id="cd-h">00</span><span class="sale-cd-label">時</span></div>
          <div class="sale-cd-sep">:</div>
          <div class="sale-cd-item"><span class="sale-cd-num" id="cd-m">00</span><span class="sale-cd-label">分</span></div>
          <div class="sale-cd-sep">:</div>
          <div class="sale-cd-item"><span class="sale-cd-num" id="cd-s">00</span><span class="sale-cd-label">秒</span></div>
        </div>
      </div>
    </div>
  </section>

  <section class="sec"><div class="wrap">
    <div class="sale-coupons rv-up">
      <h2>🎟️ 領取優惠券</h2>
      <div class="sale-coupon-grid">${coupons.map(cp => `<div class="sale-coupon">
        <span class="sale-cp-badge">${cp.badge}</span>
        <div class="sale-cp-code">${cp.code}</div>
        <p class="sale-cp-desc">${cp.desc}</p>
        <span class="sale-cp-min">滿 NT$${cp.min.toLocaleString()} 可用</span>
        <button class="btn btn-pri btn-sm sale-cp-btn" onclick="navigator.clipboard?.writeText('${cp.code}');toast('已複製優惠碼 ${cp.code}')">領取優惠券</button>
      </div>`).join('')}</div>
    </div>
  </div></section>

  ${deals.map(d => `<section class="sec" id="sale-${d.id}"><div class="wrap">
    <div class="sec-head rv-up"><div><h2>${d.label}</h2><div class="sub">限時 ${d.discount}% OFF</div></div><span class="sale-sec-badge">${d.badge}</span></div>
    <div class="sale-grid">${d.courses.map(c => {
      const salePrice = Math.round(c.price * (1 - d.discount / 100));
      return `<a class="sale-card rv-up" href="course.html?id=${c.id}">
        <div class="sale-card-img"><img src="${img(c)}" alt="${c.title}" loading="lazy" decoding="async"><span class="sale-off">-${d.discount}%</span></div>
        <div class="sale-card-body">
          <h3>${c.title}</h3>
          <p class="sale-card-teacher">${c.teacher}</p>
          <div class="sale-card-meta"><span>⭐ ${c.rating}</span><span>👥 ${c.students.toLocaleString()}</span><span>⏱ ${c.hours}h</span></div>
          <div class="sale-card-price"><span class="sale-new">${fmt(salePrice)}</span><del>${fmt(c.origin)}</del><span class="sale-save">省 ${fmt(c.origin - salePrice)}</span></div>
          <button class="btn btn-pri btn-sm" style="width:100%;margin-top:8px" onclick="event.preventDefault();toast('已加入購物車')">加入購物車</button>
        </div>
      </a>`;
    }).join('')}</div>
  </div></section>`).join('')}

  <section class="sec sale-cta-sec"><div class="wrap">
    <div class="sale-cta rv-up">
      <h2>錯過就沒有了！</h2>
      <p>活動倒數中，立即把握全年最低價</p>
      <a href="index.html" class="btn btn-pri btn-lg">探索全部課程 →</a>
    </div>
  </div></section>`;

  function tickSale() {
    const diff = Math.max(0, endTs - Date.now());
    const d = Math.floor(diff / 864e5), h = Math.floor(diff % 864e5 / 36e5), m = Math.floor(diff % 36e5 / 6e4), s = Math.floor(diff % 6e4 / 1e3);
    const $d = byId['cd-d'], $h = byId['cd-h'], $m = byId['cd-m'], $s = byId['cd-s'];
    if ($d) { $d.textContent = String(d).padStart(2, '0'); $h.textContent = String(h).padStart(2, '0'); $m.textContent = String(m).padStart(2, '0'); $s.textContent = String(s).padStart(2, '0'); }
  }
  tickSale();
  setInterval(tickSale, 1000);
  reveal(main);
}

/* ---------- 技能地圖 ---------- */
function skillmapPage() {
  const main = $('main');
  seo({ title: '技能地圖｜AI Class', desc: '視覺化呈現你的學習路線，找到適合你的進階方向', url: 'https://aiclass.tw/skillmap.html',
    jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: '技能地圖', description: '學習路線視覺化' }
  });

  const catNameMap = Object.fromEntries((window.CATS || []).map(ct => [ct.id, ct.name]));
  const catColors = { drawing: '#7c5cff', video: '#ff5c8a', game: '#34c759', baking: '#ff9500', design: '#00b4d8', ai: '#a855f7', creative: '#f59e0b', beauty: '#ec4899', finance: '#10b981', career: '#6366f1' };
  const trees = (window.CATS || []).map(cat => {
    const courses = C.filter(c => c.cat === cat.id).sort((a, b) => a.hours - b.hours);
    const beginner = courses.filter(c => c.hours <= 12);
    const intermediate = courses.filter(c => c.hours > 12 && c.hours <= 20);
    const advanced = courses.filter(c => c.hours > 20);
    return { ...cat, color: catColors[cat.id] || 'var(--pri)', courses, beginner, intermediate, advanced };
  }).filter(t => t.courses.length > 0);

  main.innerHTML = `
  <section class="sec"><div class="wrap" style="padding-top:100px">
    <div class="crumb rv-up"><a href="index.html">首頁</a> › 技能地圖</div>
    <div class="sm-header rv-up">
      <h1>技能地圖</h1>
      <p>探索每個領域的學習路線，從入門到專業</p>
    </div>
    <div class="sm-legend rv-up">
      <span class="sm-legend-item"><span class="sm-dot sm-dot-beginner"></span>入門</span>
      <span class="sm-legend-item"><span class="sm-dot sm-dot-mid"></span>進階</span>
      <span class="sm-legend-item"><span class="sm-dot sm-dot-adv"></span>專精</span>
      <span class="sm-legend-item"><span class="sm-dot sm-dot-owned"></span>已擁有</span>
    </div>
    <div class="sm-trees">
      ${trees.map(t => `<div class="sm-tree rv-up" style="--tree-color:${t.color}">
        <div class="sm-tree-head"><span class="sm-tree-icon" style="background:${t.color}">${t.name[0]}</span><h2>${t.name}</h2><span class="sm-tree-count">${t.courses.length} 門課程</span></div>
        <div class="sm-tree-body">
          ${t.beginner.length ? `<div class="sm-tier"><h3 class="sm-tier-label">🌱 入門</h3><div class="sm-tier-courses">${t.beginner.map(c => `<a class="sm-node ${owned.has(c.id) ? 'sm-owned' : ''}" href="course.html?id=${c.id}" title="${c.title}"><img src="${img(c)}" alt="${c.title}" loading="lazy" decoding="async"><span class="sm-node-title">${c.title.length > 18 ? c.title.slice(0,18) + '…' : c.title}</span><span class="sm-node-meta">⭐ ${c.rating} · ${c.hours}h</span>${owned.has(c.id) ? '<span class="sm-node-check">✓</span>' : ''}</a>`).join('')}</div></div>` : ''}
          ${t.beginner.length && t.intermediate.length ? '<div class="sm-arrow">↓</div>' : ''}
          ${t.intermediate.length ? `<div class="sm-tier"><h3 class="sm-tier-label">🚀 進階</h3><div class="sm-tier-courses">${t.intermediate.map(c => `<a class="sm-node ${owned.has(c.id) ? 'sm-owned' : ''}" href="course.html?id=${c.id}" title="${c.title}"><img src="${img(c)}" alt="${c.title}" loading="lazy" decoding="async"><span class="sm-node-title">${c.title.length > 18 ? c.title.slice(0,18) + '…' : c.title}</span><span class="sm-node-meta">⭐ ${c.rating} · ${c.hours}h</span>${owned.has(c.id) ? '<span class="sm-node-check">✓</span>' : ''}</a>`).join('')}</div></div>` : ''}
          ${t.intermediate.length && t.advanced.length ? '<div class="sm-arrow">↓</div>' : ''}
          ${t.advanced.length ? `<div class="sm-tier"><h3 class="sm-tier-label">💎 專精</h3><div class="sm-tier-courses">${t.advanced.map(c => `<a class="sm-node ${owned.has(c.id) ? 'sm-owned' : ''}" href="course.html?id=${c.id}" title="${c.title}"><img src="${img(c)}" alt="${c.title}" loading="lazy" decoding="async"><span class="sm-node-title">${c.title.length > 18 ? c.title.slice(0,18) + '…' : c.title}</span><span class="sm-node-meta">⭐ ${c.rating} · ${c.hours}h</span>${owned.has(c.id) ? '<span class="sm-node-check">✓</span>' : ''}</a>`).join('')}</div></div>` : ''}
        </div>
      </div>`).join('')}
    </div>
  </div></section>`;
  reveal(main);
}

/* ---------- 鍵盤快捷鍵說明面板 ---------- */
{
  const shortcuts = [
    { key: '?', desc: '顯示快捷鍵說明' },
    { key: 'Ctrl + K', desc: '開啟搜尋' },
    { key: 'Esc', desc: '關閉彈窗 / 搜尋' },
    { key: 'D', desc: '切換深色模式' },
    { key: '←', desc: '上一個 Hero 輪播' },
    { key: '→', desc: '下一個 Hero 輪播' },
    { key: 'Home', desc: '回到頁面頂部' },
  ];
  const playerShortcuts = [
    { key: 'Space', desc: '播放 / 暫停' },
    { key: '←', desc: '倒退 5 秒' },
    { key: '→', desc: '快轉 5 秒' },
    { key: '↑ / ↓', desc: '音量調整' },
    { key: 'M', desc: '靜音切換' },
    { key: 'F', desc: '全螢幕切換' },
    { key: 'N', desc: '下一個單元' },
    { key: 'P', desc: '上一個單元' },
  ];
  let kbOpen = false;
  function toggleKbHelp() {
    let panel = $('.kb-help-overlay');
    if (panel) { panel.classList.remove('show'); setTimeout(() => panel.remove(), 300); kbOpen = false; return; }
    panel = document.createElement('div'); panel.className = 'kb-help-overlay'; panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-modal', 'true'); panel.setAttribute('aria-label', '鍵盤快捷鍵');
    const isPlayer = page === 'player';
    panel.innerHTML = `<div class="kb-help-box">
      <div class="kb-help-head"><h2>⌨ 鍵盤快捷鍵</h2><button class="kb-help-close" aria-label="關閉">×</button></div>
      <div class="kb-help-cols">
        <div class="kb-help-col"><h3>全站通用</h3>${shortcuts.map(s => `<div class="kb-row"><kbd>${s.key}</kbd><span>${s.desc}</span></div>`).join('')}</div>
        ${isPlayer ? `<div class="kb-help-col"><h3>播放器</h3>${playerShortcuts.map(s => `<div class="kb-row"><kbd>${s.key}</kbd><span>${s.desc}</span></div>`).join('')}</div>` : ''}
      </div>
    </div>`;
    document.body.append(panel);
    requestAnimationFrame(() => requestAnimationFrame(() => panel.classList.add('show')));
    kbOpen = true;
    panel.querySelector('.kb-help-close').onclick = () => toggleKbHelp();
    panel.onclick = e => { if (e.target === panel) toggleKbHelp(); };
  }
  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT' || e.target.isContentEditable) return;
    if (e.key === '?' && !e.ctrlKey && !e.metaKey) { e.preventDefault(); toggleKbHelp(); }
    if (e.key === 'd' && !e.ctrlKey && !e.metaKey && !kbOpen) {
      const cur = document.documentElement.dataset.theme;
      const next = cur === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      ss('aic-theme', next);
    }
    if (e.key === 'Home' && !e.ctrlKey) { e.preventDefault(); scrollTo({ top: 0, behavior: 'smooth' }); }
  });
}

/* ---------- 鍵盤無障礙：ESC 關閉 overlay ---------- */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    const kbPanel = $('.kb-help-overlay'); if (kbPanel) { kbPanel.classList.remove('show'); setTimeout(() => kbPanel.remove(), 300); return; }
    const ov = $('.overlay.on'); if (ov) { ov.classList.remove('on'); document.body.style.overflow = ''; }
    const cmpOv = $('.cmp-overlay'); if (cmpOv) cmpOv.remove();
    const qzModal = $('.qz-modal:not([hidden])'); if (qzModal) { qzModal.hidden = true; document.body.style.overflow = ''; }
    const qzResult = $('.qz-result:not([hidden])'); if (qzResult) { qzResult.hidden = true; document.body.style.overflow = ''; }
  }
});

/* ---------- 啟動 ---------- */
if (page !== 'training' && page !== 'player') shell();
if (page === 'home') home();
else if (page === 'course') course();
else if (page === 'event') eventPage();
else if (page === 'cart') cartPage();
else if (page === 'login') loginPage();
else if (page === 'enterprise') enterprisePage();
else if (page === 'training') trainingPage();
else if (page === 'blog') blogPage();
else if (page === 'article') articlePage();
else if (page === 'instructor') instructorPage();
else if (page === 'category') categoryPage();
else if (page === 'wishlist') wishlistPage();
else if (page === 'my') myPage();
else if (page === 'about') aboutPage();
else if (page === 'faq') faqPage();
else if (page === 'teach') teachPage();
else if (page === 'terms') termsPage();
else if (page === 'privacy') privacyPage();
else if (page === 'checkout') checkoutPage();
else if (page === 'order-complete') orderCompletePage();
else if (page === 'coupon') couponPage();
else if (page === 'certificate') certificatePage();
else if (page === 'invite') invitePage();
else if (page === 'path') pathPage();
else if (page === 'player') playerPage();
else if (page === 'community') communityPage();
else if (page === 'live') livePage();
else if (page === 'order-history') orderHistoryPage();
else if (page === 'search') searchPage();
else if (page === 'quiz') quizPage();
else if (page === 'leaderboard') leaderboardPage();
else if (page === 'achievement') achievementPage();
else if (page === 'video') videoPage();
else if (page === 'bundle') bundlePage();
else if (page === 'success') successPage();
else if (page === 'upcoming') upcomingPage();
else if (page === 'contact') contactPage();
else if (page === 'settings') settingsPage();
else if (page === 'gallery') galleryPage();
else if (page === 'notebook') notebookPage();
else if (page === 'report') reportPage();
else if (page === 'sale') salePage();
else if (page === 'skillmap') skillmapPage();
else notFoundPage();
reveal();
gtag('event', 'page_view', { page_title: document.title, page_location: location.href, page_path: location.pathname + location.search });
tickCountdown(); setInterval(tickCountdown, 1000);
document.body.classList.add('loaded');
if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(() => {});
if (!$('link[rel="manifest"]')) { const m = document.createElement('link'); m.rel = 'manifest'; m.href = '/manifest.json'; document.head.append(m); }
if (!$('meta[name="apple-mobile-web-app-capable"]')) { const m = document.createElement('meta'); m.name = 'apple-mobile-web-app-capable'; m.content = 'yes'; document.head.append(m); }

// ── Ripple effect on .btn-pri ──
if (!prefersReduced) {
  document.addEventListener('click', e => {
    const btn = e.target.closest('.btn-pri');
    if (!btn) return;
    const r = document.createElement('span'); r.className = 'ripple';
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    r.style.width = r.style.height = size + 'px';
    r.style.left = (e.clientX - rect.left - size / 2) + 'px';
    r.style.top = (e.clientY - rect.top - size / 2) + 'px';
    btn.appendChild(r);
    r.addEventListener('animationend', () => r.remove());
  });
}

// ── Wish heart pop animation ──
document.addEventListener('click', e => {
  const w = e.target.closest('.wish');
  if (w) { w.classList.remove('pop'); void w.offsetWidth; w.classList.add('pop'); }
});

// ── 課程比較功能 ──
const cmpList = (() => { try { return JSON.parse(sessionStorage.getItem('aic-cmp') || '[]'); } catch { return []; } })();
function saveCmp() { sessionStorage.setItem('aic-cmp', JSON.stringify(cmpList)); updCmpUI(); }
function updCmpUI() {
  let bar = $('.cmp-bar');
  if (!bar) { bar = document.createElement('div'); bar.className = 'cmp-bar'; document.body.append(bar); }
  if (!cmpList.length) { bar.classList.remove('show'); return; }
  bar.classList.add('show');
  bar.innerHTML = `<div class="cmp-inner"><span class="cmp-label">比較課程 (${cmpList.length}/3)</span><div class="cmp-items">${cmpList.map(id => {
    const c = byId[id]; return c ? `<div class="cmp-chip"><img src="${img(c)}" alt="${c.title}"><span>${c.title.slice(0, 12)}</span><button data-cmp-rm="${id}">×</button></div>` : '';
  }).join('')}</div><button class="btn btn-pri cmp-go" ${cmpList.length < 2 ? 'disabled' : ''}>開始比較</button><button class="cmp-clear">清除</button></div>`;
  $$('[data-cmp-rm]', bar).forEach(b => b.onclick = () => { const i = cmpList.indexOf(b.dataset.cmpRm); if (i > -1) cmpList.splice(i, 1); saveCmp(); });
  $('.cmp-clear', bar).onclick = () => { cmpList.length = 0; saveCmp(); };
  $('.cmp-go', bar).onclick = () => {
    const courses = cmpList.map(id => byId[id]).filter(Boolean);
    const best = (arr, fn) => { const vals = arr.map(fn); const m = Math.max(...vals); return vals.map(v => v === m); };
    const low = (arr, fn) => { const vals = arr.map(fn); const m = Math.min(...vals); return vals.map(v => v === m); };
    const bPrice = low(courses, c => c.price), bDisc = best(courses, c => pct(c)), bRate = best(courses, c => c.rating), bStu = best(courses, c => c.students), bHrs = best(courses, c => c.hours);
    const hi = (flags, i) => flags[i] ? ' class="cmp-best"' : '';
    const ov = document.createElement('div'); ov.className = 'cmp-overlay';
    ov.innerHTML = `<div class="cmp-modal"><div class="cmp-modal-head"><h2>課程比較</h2><button class="cmp-close">×</button></div>
      <div class="cmp-table"><table><thead><tr><th></th>${courses.map(c => `<th><img src="${img(c)}" alt="${c.title}"><br>${c.title}</th>`).join('')}</tr></thead><tbody>
        <tr><td>價格</td>${courses.map((c, i) => `<td${hi(bPrice,i)}>${fmt(c.price)}</td>`).join('')}</tr>
        <tr><td>原價</td>${courses.map(c => `<td><del>${fmt(c.origin)}</del></td>`).join('')}</tr>
        <tr><td>折扣</td>${courses.map((c, i) => `<td${hi(bDisc,i)}>${pct(c)}% OFF</td>`).join('')}</tr>
        <tr><td>評分</td>${courses.map((c, i) => `<td${hi(bRate,i)}><span class="cmp-stars">${'★'.repeat(Math.round(c.rating))}${'☆'.repeat(5-Math.round(c.rating))}</span> ${c.rating}</td>`).join('')}</tr>
        <tr><td>學員數</td>${courses.map((c, i) => `<td${hi(bStu,i)}>${c.students.toLocaleString()}</td>`).join('')}</tr>
        <tr><td>時數</td>${courses.map((c, i) => `<td${hi(bHrs,i)}>${c.hours} 小時</td>`).join('')}</tr>
        <tr><td>難度</td>${courses.map(c => `<td><span class="card-lvl ${courseLevel(c).cls}">${courseLevel(c).label}</span></td>`).join('')}</tr>
        <tr><td>章節</td>${courses.map(c => { const ch = window.CHAPTERS?.[c.id]; return `<td>${ch ? ch.length + ' 章・' + ch.reduce((s, x) => s + x.lessons.length, 0) + ' 堂' : '-'}</td>`; }).join('')}</tr>
        <tr><td>講師</td>${courses.map(c => `<td>${c.teacher}</td>`).join('')}</tr>
        <tr><td>分類</td>${courses.map(c => `<td>${c.sub}</td>`).join('')}</tr>
        <tr><td>狀態</td>${courses.map(c => `<td>${owned.has(c.id) ? '<span class="cmp-owned">✓ 已購買</span>' : '<span class="cmp-not-owned">未購買</span>'}</td>`).join('')}</tr>
        <tr><td></td>${courses.map(c => `<td>${owned.has(c.id) ? `<a class="btn btn-pri cmp-view" href="player.html?id=${c.id}" style="height:36px;font-size:13px;display:inline-flex;align-items:center;justify-content:center;text-decoration:none">開始上課</a>` : `<a class="btn btn-ghost cmp-view" href="course.html?id=${c.id}" style="height:36px;font-size:13px;display:inline-flex;align-items:center;justify-content:center;margin-bottom:8px;text-decoration:none">查看課程</a><button class="btn btn-pri cmp-add-cart" data-id="${c.id}" style="height:36px;font-size:13px">加入購物車</button>`}</td>`).join('')}</tr>
      </tbody></table></div></div>`;
    document.body.append(ov);
    $$('.cmp-add-cart', ov).forEach(b => b.onclick = () => { cart.add(b.dataset.id); saveCart(); updateCartBadge(); toast('已加入購物車 🛒'); });
    $('.cmp-close', ov).onclick = () => ov.remove();
    ov.onclick = e => { if (e.target === ov) ov.remove(); };
  };
}
window.addCompare = id => {
  if (cmpList.includes(id)) { toast('已在比較清單中'); return; }
  if (cmpList.length >= 3) { toast('最多比較 3 門課程'); return; }
  cmpList.push(id); saveCmp(); toast('已加入比較');
};
updCmpUI();

// ── 電子報訂閱彈窗（首頁捲動 60% 後觸發一次） ──
if (page === 'home' && !sessionStorage.getItem('aic-nl-shown')) {
  let triggered = false;
  addEventListener('scroll', function nlCheck() {
    if (triggered) return;
    const pctScroll = scrollY / (document.documentElement.scrollHeight - innerHeight) * 100;
    if (pctScroll >= 60) {
      triggered = true; sessionStorage.setItem('aic-nl-shown', '1');
      removeEventListener('scroll', nlCheck);
      const nl = document.createElement('div'); nl.className = 'nl-overlay'; nl.setAttribute('role', 'dialog'); nl.setAttribute('aria-modal', 'true'); nl.setAttribute('aria-label', '訂閱電子報');
      nl.innerHTML = `<div class="nl-box"><button class="nl-close" aria-label="關閉">✕</button><div class="nl-icon">📬</div><h3>訂閱學習電子報</h3><p>每週精選課程推薦、學習技巧與獨家優惠，直接送到你的信箱。</p><div class="nl-form"><input type="email" placeholder="輸入 Email 地址" aria-label="Email 地址" required><button class="btn btn-pri">免費訂閱</button></div><div class="nl-err" style="display:none;color:#ff5c8a;font-size:13px;margin-top:8px"></div><small>🔒 我們重視你的隱私，絕不分享個資。隨時可取消訂閱。</small></div>`;
      document.body.append(nl);
      const nlTrap = trapFocus(nl);
      const nlClose = () => { nlTrap(); nl.classList.remove('show'); setTimeout(() => nl.remove(), 400); };
      requestAnimationFrame(() => requestAnimationFrame(() => nl.classList.add('show')));
      nl.querySelector('.nl-close').onclick = nlClose;
      nl.onclick = e => { if (e.target === nl) nlClose(); };
      document.addEventListener('keydown', function esc(e) { if (e.key === 'Escape') { nlClose(); document.removeEventListener('keydown', esc); } });
      const nlInput = nl.querySelector('input[type="email"]');
      const nlErr = nl.querySelector('.nl-err');
      nl.querySelector('.nl-form button').onclick = () => {
        const email = nlInput.value.trim();
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { nlErr.textContent = '請輸入正確的 Email 格式'; nlErr.style.display = ''; nlInput.focus(); return; }
        nlErr.style.display = 'none';
        const box = nl.querySelector('.nl-box');
        box.innerHTML = '<div class="nl-icon" style="font-size:48px">🎉</div><h3>訂閱成功！</h3><p>感謝你的訂閱，我們會在每週三將精選內容寄到你的信箱。</p><button class="btn btn-pri nl-done" style="margin-top:16px">太好了！</button>';
        box.querySelector('.nl-done').onclick = nlClose;
        if (typeof gtag === 'function') gtag('event', 'newsletter_subscribe', { method: 'popup' });
      };
      nlInput.addEventListener('keydown', e => { if (e.key === 'Enter') nl.querySelector('.nl-form button').click(); });
    }
  }, { passive: true });
}

// ── 離站挽留（桌面：滑鼠移出視窗；每 session 最多一次）──
if (!sessionStorage.getItem('aic-exit-shown') && !('ontouchstart' in window)) {
  let exitFired = false;
  document.addEventListener('mouseout', e => {
    if (exitFired || e.relatedTarget || e.toElement) return;
    if (e.clientY > 10) return;
    exitFired = true; sessionStorage.setItem('aic-exit-shown', '1');
    const hotPick = [...C].sort((a, b) => b.students - a.students)[0];
    const ex = document.createElement('div'); ex.className = 'exit-overlay'; ex.setAttribute('role', 'dialog'); ex.setAttribute('aria-modal', 'true');
    ex.innerHTML = `<div class="exit-box"><button class="exit-close" aria-label="關閉">✕</button><div class="exit-emoji">🎓</div><h3>等一下！別錯過限時優惠</h3><p>全站課程最低 5 折起，還有專屬新學員折扣碼</p><a class="exit-pick" href="course.html?id=${hotPick.id}"><img src="${img(hotPick)}" alt="${hotPick.title}"><div><b>${hotPick.title}</b><span>★ ${hotPick.rating} ・ ${fmt(hotPick.price)}</span></div></a><div class="exit-coupon"><span class="exit-code">WELCOME300</span><span>輸入折扣碼現折 NT$300</span></div><a href="category.html" class="btn btn-pri" style="width:100%;margin-top:16px">逛逛課程 →</a><button class="exit-skip">不了，謝謝</button></div>`;
    document.body.append(ex);
    const exTrap = trapFocus(ex);
    requestAnimationFrame(() => requestAnimationFrame(() => ex.classList.add('show')));
    const closeExit = () => { exTrap(); ex.classList.remove('show'); setTimeout(() => ex.remove(), 300); };
    ex.querySelector('.exit-close').onclick = closeExit;
    ex.querySelector('.exit-skip').onclick = closeExit;
    ex.onclick = e => { if (e.target === ex) closeExit(); };
    document.addEventListener('keydown', function esc(e) { if (e.key === 'Escape') { closeExit(); document.removeEventListener('keydown', esc); } });
  });
}

// ── 鍵盤無障礙：chip / qa 可用 Enter/Space 操作 ──
document.addEventListener('keydown', e => {
  if (e.key !== 'Enter' && e.key !== ' ') return;
  const t = e.target;
  if (t.matches('.chip, .qa button, .video-tab, .sort-btn, .time-tab')) { e.preventDefault(); t.click(); }
});
$$('.chip, .qa button, .video-tab, .sort-btn, .time-tab').forEach(el => { if (!el.getAttribute('tabindex')) el.setAttribute('tabindex', '0'); });

// （平滑頁面導航已由下方「頁面轉場動畫」統一處理）

// ── 社群通知（Social Proof）──（課程頁有專屬版本，不在這裡重複）
if (page === 'home' || page === 'category') {
  const spNames = ['小明','Emily','阿豪','小美','志偉','雅婷','大華','佳穎','宗翰','文惠','淑華','建宏'];
  const spCities = ['台北','台中','高雄','新竹','台南','桃園','花蓮'];
  let spCount = 0, spMax = page === 'home' ? 3 : 2;
  const spDelay = page === 'home' ? 8000 : 12000;
  const spTimer = setInterval(() => {
    if (spCount >= spMax) { clearInterval(spTimer); return; }
    spCount++;
    const name = spNames[Math.floor(Math.random() * spNames.length)];
    const city = spCities[Math.floor(Math.random() * spCities.length)];
    const course = C[Math.floor(Math.random() * C.length)];
    const mins = 1 + Math.floor(Math.random() * 20);
    const el = document.createElement('div'); el.className = 'sp-toast';
    el.innerHTML = `<img src="${img(course)}" alt="${course.title}"><div><b>${name}</b><small>${city}・${mins} 分鐘前購買</small><br><span>${course.title.slice(0, 20)}${course.title.length > 20 ? '…' : ''}</span></div>`;
    document.body.append(el);
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('on')));
    setTimeout(() => { el.classList.remove('on'); setTimeout(() => el.remove(), 400); }, 4000);
  }, spDelay);
}


// ── 數字計數動畫 ──
{
  const countIO = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      countIO.unobserve(el);
      const target = parseInt(el.dataset.count || el.textContent.replace(/[^\d]/g, ''), 10);
      if (isNaN(target) || target === 0) return;
      const suffix = el.textContent.replace(/[\d,]/g, '');
      const dur = 1200;
      const start = performance.now();
      const step = now => {
        const p = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * ease).toLocaleString() + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }, { threshold: 0.3 });
  requestAnimationFrame(() => {
    $$('.myp-stat b, .dash-card-head + .dash-ring .dash-ring-text b, .myp-aside-stats b').forEach(el => {
      if (/\d/.test(el.textContent)) countIO.observe(el);
    });
  });
}

// ── 回到頂部按鈕（含進度環）──
{
  const btt = document.createElement('button'); btt.className = 'btt'; btt.setAttribute('aria-label', '回到頂部');
  btt.innerHTML = '<svg class="btt-ring" viewBox="0 0 44 44"><circle cx="22" cy="22" r="20" fill="none" stroke="var(--pri-15)" stroke-width="2.5"/><circle class="btt-prog" cx="22" cy="22" r="20" fill="none" stroke="var(--pri)" stroke-width="2.5" stroke-dasharray="125.66" stroke-dashoffset="125.66" stroke-linecap="round" transform="rotate(-90 22 22)"/></svg><span class="btt-arrow">↑</span>';
  document.body.append(btt);
  btt.onclick = () => scrollTo({ top: 0, behavior: 'smooth' });
  const prog = btt.querySelector('.btt-prog');
  addEventListener('scroll', rafThrottle(() => {
    const pct = scrollY / (document.documentElement.scrollHeight - innerHeight);
    btt.classList.toggle('show', scrollY > 300);
    if (prog) prog.style.strokeDashoffset = (125.66 * (1 - Math.min(pct, 1))).toFixed(1);
  }), { passive: true });
}

// ── 文章頁閱讀進度條 ──
if (page === 'article' || page === 'course') {
  const bar = document.createElement('div'); bar.className = 'read-bar'; document.body.append(bar);
  addEventListener('scroll', rafThrottle(() => {
    const pct = scrollY / (document.documentElement.scrollHeight - innerHeight) * 100;
    bar.style.width = Math.min(pct, 100) + '%';
  }), { passive: true });
}

// ── 課程推薦測驗 ──
function openRecommendQuiz() {
  const questions = [
    { q: '你目前的學習目標是？', opts: [
      { text: '轉職/跨領域', cats: ['ai','code','data'] },
      { text: '提升現有技能', cats: ['design','video','photo'] },
      { text: '培養興趣愛好', cats: ['drawing','music','lifestyle'] },
      { text: '創業/接案', cats: ['design','video','ai'] }
    ]},
    { q: '你每週能投入多少時間學習？', opts: [
      { text: '不到 3 小時', hours: 'short' },
      { text: '3–7 小時', hours: 'medium' },
      { text: '7–15 小時', hours: 'long' },
      { text: '超過 15 小時', hours: 'xlong' }
    ]},
    { q: '你偏好哪種學習方式？', opts: [
      { text: '跟著影片一步步做', style: 'project' },
      { text: '先看理論再實作', style: 'theory' },
      { text: '直接挑戰專案', style: 'challenge' },
      { text: '短影片快速學', style: 'quick' }
    ]}
  ];
  let step = 0;
  const answers = [];
  const ov = document.createElement('div'); ov.className = 'rq-overlay'; ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true'); ov.setAttribute('aria-label', '課程推薦測驗');
  function renderStep() {
    const isResult = step >= questions.length;
    if (isResult) {
      const catPrefs = answers[0]?.cats || ['design'];
      let pool = C.filter(c => catPrefs.includes(c.cat));
      if (!pool.length) pool = C;
      const hoursMax = answers[1]?.hours === 'short' ? 12 : answers[1]?.hours === 'medium' ? 20 : 999;
      pool = pool.filter(c => c.hours <= hoursMax);
      if (!pool.length) pool = C.filter(c => catPrefs.includes(c.cat));
      if (!pool.length) pool = C;
      const picks = pool.sort((a, b) => b.rating - a.rating).slice(0, 3);
      ov.innerHTML = `<div class="rq-box rq-result"><button class="rq-close" aria-label="關閉">×</button>
        <div class="rq-done-icon">🎉</div>
        <h2>為你推薦這 ${picks.length} 堂課程</h2>
        <p class="rq-done-sub">根據你的回答，我們精選了最適合你的課程</p>
        <div class="rq-picks">${picks.map(c => `<a class="rq-pick" href="course.html?id=${c.id}">
          <img src="${img(c)}" alt="${c.title}" loading="lazy" decoding="async">
          <div class="rq-pick-info"><h3>${c.title}</h3><span>${c.teacher}・★ ${c.rating}・${c.hours} 小時</span><b>${fmt(c.price)}</b></div>
        </a>`).join('')}</div>
        <button class="btn btn-ghost rq-retry">重新測驗</button>
      </div>`;
      ov.querySelector('.rq-retry').onclick = () => { step = 0; answers.length = 0; renderStep(); };
    } else {
      const qq = questions[step];
      ov.innerHTML = `<div class="rq-box"><button class="rq-close" aria-label="關閉">×</button>
        <div class="rq-progress"><div class="rq-prog-fill" style="width:${(step / questions.length) * 100}%"></div></div>
        <div class="rq-step">${step + 1} / ${questions.length}</div>
        <h2>${qq.q}</h2>
        <div class="rq-opts">${qq.opts.map((o, i) => `<button class="rq-opt" data-oi="${i}">${o.text}</button>`).join('')}</div>
        ${step > 0 ? '<button class="rq-back">← 上一步</button>' : ''}
      </div>`;
      ov.querySelectorAll('.rq-opt').forEach(b => b.onclick = () => {
        answers[step] = qq.opts[+b.dataset.oi];
        b.classList.add('picked');
        setTimeout(() => { step++; renderStep(); }, 300);
      });
      const backBtn = ov.querySelector('.rq-back');
      if (backBtn) backBtn.onclick = () => { step--; renderStep(); };
    }
    ov.querySelector('.rq-close').onclick = closeQuiz;
  }
  const rqTrap = trapFocus(ov);
  function closeQuiz() { rqTrap(); ov.classList.remove('show'); setTimeout(() => ov.remove(), 300); }
  document.body.append(ov);
  requestAnimationFrame(() => requestAnimationFrame(() => ov.classList.add('show')));
  renderStep();
  ov.onclick = e => { if (e.target === ov) closeQuiz(); };
  document.addEventListener('keydown', function esc(e) { if (e.key === 'Escape') { closeQuiz(); document.removeEventListener('keydown', esc); } });
}

// ── 學習計時器浮動 widget ──
{
  const timerState = (() => { try { return JSON.parse(sessionStorage.getItem('aic-timer') || '{"running":false,"elapsed":0,"start":0}'); } catch { return {running:false,elapsed:0,start:0}; } })();
  const tw = document.createElement('div'); tw.className = 'study-timer';
  tw.innerHTML = `<button class="st-toggle" aria-label="學習計時器">⏱</button>
    <div class="st-panel">
      <div class="st-head">學習計時器</div>
      <div class="st-display">00:00:00</div>
      <div class="st-btns"><button class="st-start">▶ 開始</button><button class="st-reset">↺ 重置</button></div>
      <div class="st-today">今日累計：<b class="st-total">0</b> 分鐘</div>
    </div>`;
  document.body.append(tw);
  const display = tw.querySelector('.st-display');
  const startBtn = tw.querySelector('.st-start');
  const resetBtn = tw.querySelector('.st-reset');
  const totalEl = tw.querySelector('.st-total');
  let running = timerState.running;
  let elapsed = timerState.elapsed;
  let startTs = timerState.start;
  if (running && startTs) elapsed += (Date.now() - startTs) / 1000;
  const todayKey = 'aic-study-' + new Date().toISOString().slice(0, 10);
  let todayMins = +(localStorage.getItem(todayKey) || 0);
  totalEl.textContent = todayMins;
  const fmtTime = s => { const h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), ss = Math.floor(s % 60); return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(ss).padStart(2, '0')}`; };
  display.textContent = fmtTime(elapsed);
  let interval;
  function tick() { if (running) { elapsed = timerState.elapsed + (Date.now() - startTs) / 1000; display.textContent = fmtTime(elapsed); } }
  if (running) { startTs = Date.now(); timerState.elapsed = elapsed; timerState.start = startTs; sessionStorage.setItem('aic-timer', JSON.stringify(timerState)); interval = setInterval(tick, 1000); startBtn.textContent = '⏸ 暫停'; tw.classList.add('active'); }
  startBtn.onclick = () => {
    if (running) { running = false; elapsed = timerState.elapsed + (Date.now() - startTs) / 1000; timerState.elapsed = elapsed; timerState.running = false; timerState.start = 0; clearInterval(interval); startBtn.textContent = '▶ 開始'; tw.classList.remove('active');
      const addedMins = Math.floor(elapsed / 60); todayMins += addedMins; ss(todayKey, todayMins); totalEl.textContent = todayMins;
    } else { running = true; startTs = Date.now(); timerState.running = true; timerState.start = startTs; timerState.elapsed = elapsed; interval = setInterval(tick, 1000); startBtn.textContent = '⏸ 暫停'; tw.classList.add('active'); }
    sessionStorage.setItem('aic-timer', JSON.stringify(timerState));
  };
  resetBtn.onclick = () => { running = false; elapsed = 0; clearInterval(interval); timerState.running = false; timerState.elapsed = 0; timerState.start = 0; sessionStorage.setItem('aic-timer', JSON.stringify(timerState)); display.textContent = '00:00:00'; startBtn.textContent = '▶ 開始'; tw.classList.remove('active'); };
  tw.querySelector('.st-toggle').onclick = () => tw.classList.toggle('open');
}

// ── 客服聊天 widget ──
{
  const cw = document.createElement('div'); cw.className = 'chat-widget';
  cw.innerHTML = `<button class="cw-fab" aria-label="客服聊天"><span class="cw-fab-icon">💬</span><span class="cw-fab-badge" hidden>1</span></button>
    <div class="cw-panel" hidden role="dialog" aria-modal="false" aria-label="客服聊天">
      <div class="cw-head"><span class="cw-dot">●</span> AI Class 客服中心<button class="cw-min" aria-label="最小化">－</button></div>
      <div class="cw-body">
        <div class="cw-msg cw-bot"><div class="cw-av">🤖</div><div class="cw-bub">你好！我是 AI Class 智能客服 🎓<br>有什麼可以幫你的嗎？</div></div>
        <div class="cw-quick"><button data-cq="course">課程諮詢</button><button data-cq="refund">退費問題</button><button data-cq="tech">技術問題</button><button data-cq="other">其他問題</button></div>
      </div>
      <div class="cw-foot"><input class="cw-input" placeholder="輸入訊息…" aria-label="聊天訊息"><button class="cw-send">送出</button></div>
    </div>`;
  document.body.append(cw);
  const cwPanel = cw.querySelector('.cw-panel'), cwBody = cw.querySelector('.cw-body'), cwInput = cw.querySelector('.cw-input'), cwBadge = cw.querySelector('.cw-fab-badge');
  cw.querySelector('.cw-fab').onclick = () => { cwPanel.hidden = !cwPanel.hidden; cw.classList.toggle('open', !cwPanel.hidden); cwBadge.hidden = true; if (!cwPanel.hidden) cwInput.focus(); };
  cw.querySelector('.cw-min').onclick = () => { cwPanel.hidden = true; cw.classList.remove('open'); };
  const cwReplies = {
    course: `我們有 ${C.length} 堂精選課程，涵蓋設計、繪畫、AI、影像等 10 大領域。到<a href="category.html">分類頁</a>瀏覽，或告訴我你感興趣的方向！`,
    refund: '購買後 7 天內，觀看進度低於 20%，可申請全額退費。到<a href="contact.html">聯繫我們</a>提交申請，3 個工作天內處理。',
    tech: '常見問題：<br>• 影片無法播放 → 清除快取重試<br>• 進度未儲存 → 確認已登入<br>• 下載問題 → 用 Chrome 瀏覽器<br>如仍有問題，到<a href="contact.html">聯繫我們</a>。',
    other: '你也可以：<br>• <a href="faq.html">常見問題</a><br>• <a href="contact.html">聯繫客服</a><br>• 寄信到 support@aiclass.tw'
  };
  function cwAddMsg(text, bot) { const d = document.createElement('div'); d.className = 'cw-msg ' + (bot ? 'cw-bot' : 'cw-user'); d.innerHTML = bot ? `<div class="cw-av">🤖</div><div class="cw-bub">${text}</div>` : `<div class="cw-bub">${escH(text)}</div>`; const q = cwBody.querySelector('.cw-quick'); if (q) q.remove(); cwBody.append(d); cwBody.scrollTop = cwBody.scrollHeight; }
  function cwBot(text) { const t = document.createElement('div'); t.className = 'cw-msg cw-bot cw-typing'; t.innerHTML = '<div class="cw-av">🤖</div><div class="cw-bub"><span class="cw-dots"><i></i><i></i><i></i></span></div>'; cwBody.append(t); cwBody.scrollTop = cwBody.scrollHeight; setTimeout(() => { t.remove(); cwAddMsg(text, true); }, 800 + Math.random() * 500); }
  cw.querySelectorAll('[data-cq]').forEach(b => b.onclick = () => { cwAddMsg(b.textContent, false); cwBot(cwReplies[b.dataset.cq]); });
  function cwSend() { const txt = cwInput.value.trim(); if (!txt) return; cwAddMsg(txt, false); cwInput.value = ''; let r = '感謝你的訊息！這是示範網站，客服功能開發中。到<a href="faq.html">常見問題</a>或<a href="contact.html">聯繫我們</a>取得幫助 😊'; if (/退費|退款/.test(txt)) r = cwReplies.refund; else if (/課程|推薦|分類/.test(txt)) r = cwReplies.course; else if (/播放|下載|影片|技術/.test(txt)) r = cwReplies.tech; else if (/價格|優惠|折扣/.test(txt)) r = '全站最低 5 折優惠中！到<a href="sale.html">限時特賣</a>查看，或用<a href="coupon.html">優惠券</a>享額外折扣。'; else if (/證書/.test(txt)) r = '完課後即可獲得結業證書！到<a href="certificate.html">我的證書</a>頁面查看。'; else if (/講師/.test(txt)) r = '查看<a href="instructor.html">講師陣容</a>。想當講師？到<a href="teach.html">申請頁面</a>了解。'; cwBot(r); }
  cw.querySelector('.cw-send').onclick = cwSend;
  cwInput.addEventListener('keydown', e => { if (e.key === 'Enter') cwSend(); });
  setTimeout(() => { if (cwPanel.hidden) { cwBadge.hidden = false; cwBadge.textContent = '1'; } }, 12000);
}

// ── 圖片 Lightbox ──
{
  const lb = document.createElement('div'); lb.className = 'lb-overlay'; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true'); lb.setAttribute('aria-label', '圖片檢視');
  lb.innerHTML = `<button class="lb-close" aria-label="關閉">✕</button><button class="lb-nav lb-prev" aria-label="上一張">‹</button><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="放大檢視" hidden><button class="lb-nav lb-next" aria-label="下一張">›</button><div class="lb-counter"></div>`;
  document.body.append(lb);
  trapFocus(lb);
  let lbImgs = [], lbIdx = 0;
  const lbImg = lb.querySelector('img'), lbCtr = lb.querySelector('.lb-counter');
  const showLb = i => { lbIdx = (i + lbImgs.length) % lbImgs.length; lbImg.src = lbImgs[lbIdx]; lbImg.hidden = false; lbCtr.textContent = `${lbIdx + 1} / ${lbImgs.length}`; };
  const closeLb = () => lb.classList.remove('on');
  lb.querySelector('.lb-close').onclick = closeLb;
  lb.querySelector('.lb-prev').onclick = () => showLb(lbIdx - 1);
  lb.querySelector('.lb-next').onclick = () => showLb(lbIdx + 1);
  lb.onclick = e => { if (e.target === lb) closeLb(); };
  document.addEventListener('keydown', e => { if (!lb.classList.contains('on')) return; if (e.key === 'Escape') closeLb(); else if (e.key === 'ArrowLeft') showLb(lbIdx - 1); else if (e.key === 'ArrowRight') showLb(lbIdx + 1); });
  document.addEventListener('click', e => {
    const g = e.target.closest('.gallery');
    if (!g) return;
    const clicked = e.target.closest('.gallery div');
    if (!clicked) return;
    const imgEl = clicked.querySelector('img');
    if (!imgEl) return;
    e.preventDefault();
    lbImgs = [...g.querySelectorAll('img')].map(i => i.src);
    const ci = lbImgs.indexOf(imgEl.src);
    lb.classList.add('on');
    showLb(ci >= 0 ? ci : 0);
  });
}

// ── 影片懶載入（IntersectionObserver） ──
{
  const videoIO = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const v = entry.target;
      if (v.dataset.lazySrc && !v.src) { v.src = v.dataset.lazySrc; v.load(); }
      obs.unobserve(v);
    });
  }, { rootMargin: '200px' });
  requestAnimationFrame(() => {
    $$('video[data-lazy-src]').forEach(v => videoIO.observe(v));
  });
}

// ── 頁面進場動畫 ──
{
  const m = $('main');
  if (m && !prefersReduced) {
    m.style.opacity = '0'; m.style.transform = 'translateY(8px)';
    requestAnimationFrame(() => { m.style.transition = 'opacity .2s,transform .2s'; m.style.opacity = '1'; m.style.transform = 'none'; });
  }
}

// ── 手機底部導航增強 ──
{
  const mnav = $('.mnav');
  if (mnav) {
    // 圓點指示器
    $$('a', mnav).forEach(a => {
      const dot = document.createElement('span');
      dot.className = 'mnav-dot';
      a.append(dot);
    });

    // 滾動自動隱藏/顯示
    let lastY = 0, mnavHidden = false;
    const mnavThreshold = 60;
    let mnavRaf = false;
    addEventListener('scroll', () => {
      if (mnavRaf) return;
      mnavRaf = true;
      requestAnimationFrame(() => {
        mnavRaf = false;
        const y = scrollY;
        if (y > lastY + mnavThreshold && !mnavHidden && y > 200) {
          mnav.classList.add('mnav-hidden');
          mnavHidden = true;
        } else if (y < lastY - mnavThreshold && mnavHidden) {
          mnav.classList.remove('mnav-hidden');
          mnavHidden = false;
        }
        lastY = y;
      });
    }, { passive: true });

    // 長按選單
    const navLinks = $$('a', mnav);
    const submenus = {
      0: [{ icon: '🔥', text: '熱門課程', href: 'category.html?sort=popular' }, { icon: '🆕', text: '最新上架', href: 'upcoming.html' }],
      2: [{ icon: '🎨', text: '設計', href: 'category.html?cat=design' }, { icon: '✏️', text: '繪畫', href: 'category.html?cat=drawing' }, { icon: '🤖', text: 'AI', href: 'category.html?cat=ai' }],
      4: [{ icon: '📊', text: '學習報告', href: 'report.html' }, { icon: '⚙️', text: '帳號設定', href: 'settings.html' }]
    };
    Object.entries(submenus).forEach(([idx, items]) => {
      const link = navLinks[+idx];
      if (!link) return;
      link.style.position = 'relative';
      const menu = document.createElement('div');
      menu.className = 'mnav-submenu';
      menu.innerHTML = items.map(it => `<a href="${it.href}">${it.icon} ${it.text}</a>`).join('');
      link.append(menu);
      let pressTimer = null;
      link.addEventListener('touchstart', e => {
        pressTimer = setTimeout(() => {
          e.preventDefault();
          $$('.mnav-submenu.show').forEach(m => m.classList.remove('show'));
          menu.classList.add('show');
          if (navigator.vibrate) navigator.vibrate(15);
        }, 500);
      }, { passive: false });
      link.addEventListener('touchend', () => clearTimeout(pressTimer), { passive: true });
      link.addEventListener('touchmove', () => clearTimeout(pressTimer), { passive: true });
    });
    document.addEventListener('touchstart', e => {
      if (!e.target.closest('.mnav-submenu') && !e.target.closest('.mnav a')) {
        $$('.mnav-submenu.show').forEach(m => m.classList.remove('show'));
      }
    }, { passive: true });
  }
}

// ── 下拉刷新提示 ──
{
  if ('ontouchstart' in window && innerWidth <= 760) {
    const ptr = document.createElement('div');
    ptr.className = 'ptr-indicator';
    ptr.innerHTML = '<span class="ptr-arrow">↻</span>';
    document.body.append(ptr);
    let startY = 0, pulling = false;
    document.addEventListener('touchstart', e => {
      if (scrollY <= 0) startY = e.touches[0].clientY;
    }, { passive: true });
    document.addEventListener('touchmove', e => {
      if (startY === 0) return;
      const dy = e.touches[0].clientY - startY;
      if (dy > 60 && scrollY <= 0) {
        ptr.classList.add('ptr-pulling');
        pulling = true;
      }
    }, { passive: true });
    document.addEventListener('touchend', () => {
      if (pulling) {
        ptr.classList.add('ptr-refreshing');
        setTimeout(() => { location.reload(); }, 600);
      }
      ptr.classList.remove('ptr-pulling');
      pulling = false;
      startY = 0;
    }, { passive: true });
  }
}

// ── PWA 安裝提示 ──
{
  let deferredPrompt = null;
  addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    deferredPrompt = e;
    if (sessionStorage.getItem('aic-pwa-dismiss')) return;
    setTimeout(() => {
      const banner = document.createElement('div');
      banner.className = 'pwa-install';
      banner.innerHTML = `<div class="pwa-icon">📱</div>
        <div class="pwa-text"><h4>安裝 AI Class App</h4><p>加入主畫面，離線也能學習</p></div>
        <button class="pwa-install-btn">安裝</button>
        <button class="pwa-install-close" aria-label="關閉">×</button>`;
      document.body.append(banner);
      requestAnimationFrame(() => requestAnimationFrame(() => banner.classList.add('show')));
      banner.querySelector('.pwa-install-btn').onclick = async () => {
        if (deferredPrompt) {
          deferredPrompt.prompt();
          const { outcome } = await deferredPrompt.userChoice;
          if (outcome === 'accepted') toast('已成功安裝 AI Class！', 'success');
          deferredPrompt = null;
        }
        banner.classList.remove('show');
        setTimeout(() => banner.remove(), 400);
      };
      banner.querySelector('.pwa-install-close').onclick = () => {
        banner.classList.remove('show');
        sessionStorage.setItem('aic-pwa-dismiss', '1');
        setTimeout(() => banner.remove(), 400);
      };
    }, 15000);
  });
}

// ── App badge (通知數) ──
{
  if ('setAppBadge' in navigator) {
    const unread = (window.NOTIFICATIONS || []).filter(n => !n.read).length;
    if (unread > 0) navigator.setAppBadge(unread).catch(() => {});
  }
}

// ── 觸覺回饋 ──
{
  if (navigator.vibrate && 'ontouchstart' in window) {
    document.addEventListener('click', e => {
      const btn = e.target.closest('.btn-pri, .btn-sec, .cw-fab, .mnav a, .add-cart');
      if (btn) navigator.vibrate(8);
    });
  }
}

// ── 手機版課程頁底部 sheet ──
{
  if (innerWidth <= 760) {
    const page = document.body.dataset.page || location.pathname;
    if (page.includes('course')) {
      const stickyBuy = $('.sticky-buy');
      const sidebar = document.querySelector('.c-buy-feat, .c-side-info');
      if (stickyBuy || sidebar) {
        const sheet = document.createElement('div');
        sheet.className = 'mob-course-sheet';
        const priceEl = $('.sticky-buy-price') || $('.c-price');
        const priceText = priceEl ? priceEl.textContent : '';
        const buyBtn = stickyBuy ? stickyBuy.querySelector('.btn') : null;
        sheet.innerHTML = `<div class="mob-sheet-handle"><div class="mob-sheet-bar"></div></div>
          <div class="mob-sheet-peek">
            <span class="mob-sheet-price">${priceText || '查看詳情'}</span>
            ${buyBtn ? `<button class="btn btn-pri" onclick="document.querySelector('.add-cart')?.click() || toast('加入購物車', 'success')">${buyBtn.textContent}</button>` : ''}
          </div>
          <div class="mob-sheet-body"></div>`;
        document.body.append(sheet);

        let sheetStartY = 0;
        const handle = sheet.querySelector('.mob-sheet-handle');
        handle.addEventListener('touchstart', e => { sheetStartY = e.touches[0].clientY; }, { passive: true });
        handle.addEventListener('touchend', e => {
          const dy = e.changedTouches[0].clientY - sheetStartY;
          if (dy < -30) sheet.classList.add('expanded');
          else if (dy > 30) sheet.classList.remove('expanded');
        }, { passive: true });
        handle.addEventListener('click', () => sheet.classList.toggle('expanded'));
      }
    }
  }
}

// ── 寬表格水平滾動提示 ──
{
  const tables = $$('table');
  tables.forEach(table => {
    if (table.closest('.table-scroll-wrap')) return;
    const wrap = document.createElement('div');
    wrap.className = 'table-scroll-wrap';
    table.parentNode.insertBefore(wrap, table);
    wrap.append(table);
    const check = () => {
      if (wrap.scrollWidth > wrap.clientWidth + 4) {
        wrap.classList.add('has-scroll');
        wrap.classList.toggle('scrolled-end', wrap.scrollLeft + wrap.clientWidth >= wrap.scrollWidth - 4);
      } else {
        wrap.classList.remove('has-scroll');
      }
    };
    wrap.addEventListener('scroll', check, { passive: true });
    requestAnimationFrame(check);
  });
}

// ── 電子報訂閱 modal（瀏覽 3 頁後觸發，每 session 一次）──
(typeof requestIdleCallback==='function'?requestIdleCallback:cb=>setTimeout(cb,2000))(() => {
  const nlKey = 'aic-nl-shown', pvKey = 'aic-pv-count';
  if (!sessionStorage.getItem(nlKey)) {
    const pv = +(sessionStorage.getItem(pvKey) || 0) + 1;
    sessionStorage.setItem(pvKey, pv);
    if (pv >= 3) {
      sessionStorage.setItem(nlKey, '1');
      setTimeout(() => {
        const ov = document.createElement('div'); ov.className = 'nl-overlay'; ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true'); ov.setAttribute('aria-label', '訂閱電子報');
        ov.innerHTML = `<div class="nl-modal"><button class="nl-close" aria-label="關閉">×</button>
          <div class="nl-icon">📬</div><h2>訂閱學習電子報</h2>
          <p>每週精選課程推薦、學習技巧與專屬優惠，直送你的信箱。</p>
          <div class="nl-form"><input class="nl-input" type="email" placeholder="你的 Email" aria-label="Email"><button class="btn btn-pri nl-submit">免費訂閱</button></div>
          <span class="nl-hint">訂閱即贈 NT$200 折價券 🎁</span></div>`;
        document.body.append(ov);
        const nl2Trap = trapFocus(ov);
        requestAnimationFrame(() => requestAnimationFrame(() => ov.classList.add('on')));
        const close = () => { nl2Trap(); ov.classList.remove('on'); setTimeout(() => ov.remove(), 300); };
        ov.querySelector('.nl-close').onclick = close;
        ov.onclick = e => { if (e.target === ov) close(); };
        document.addEventListener('keydown', function esc(e) { if (e.key === 'Escape') { close(); document.removeEventListener('keydown', esc); } });
        ov.querySelector('.nl-submit').onclick = () => { const em = ov.querySelector('.nl-input').value.trim(); if (!em || !em.includes('@')) { toast('請輸入有效的 Email', 'error'); return; } toast('訂閱成功！折價券已寄出 🎉', 'success'); trackEvent('newsletter_subscribe', { email_domain: em.split('@')[1] }); close(); };
      }, 5000);
    }
  }
});

// ── 課程頁「最近購買」社會證明通知 ──
{
  if (page === 'course') {
    const names = ['王○○','陳○○','林○○','張○○','黃○○','李○○','劉○○','吳○○','蔡○○','楊○○','許○○','鄭○○','謝○○','郭○○','曾○○','廖○○','賴○○','徐○○','周○○','葉○○'];
    const cities = ['台北','新北','台中','高雄','桃園','台南','新竹','彰化','屏東','嘉義','基隆','宜蘭','花蓮','苗栗'];
    const times = ['2 分鐘前','5 分鐘前','8 分鐘前','12 分鐘前','15 分鐘前','23 分鐘前','30 分鐘前','1 小時前'];
    let spIdx = 0;
    const spEl = document.createElement('div'); spEl.className = 'sp-toast'; spEl.setAttribute('aria-live', 'polite');
    document.body.append(spEl);
    const showSP = () => {
      const n = names[spIdx % names.length], city = cities[Math.floor(Math.random() * cities.length)], t = times[Math.floor(Math.random() * times.length)];
      spEl.innerHTML = `<span class="sp-icon">🛒</span><span><b>${n}</b>（${city}）剛購買了此課程<span class="sp-time">${t}</span></span><button class="sp-close" aria-label="關閉">×</button>`;
      spEl.classList.add('show');
      spEl.querySelector('.sp-close').onclick = () => spEl.classList.remove('show');
      setTimeout(() => spEl.classList.remove('show'), 5000);
      spIdx++;
    };
    setTimeout(showSP, 8000);
    setInterval(showSP, 20000);
  }
}

// ── 購物車催促橫幅 ──
{
  if (cart.size > 0 && page !== 'checkout' && page !== 'order-complete') {
    const cartTs = +(localStorage.getItem('aic-cart-ts') || Date.now());
    if (!localStorage.getItem('aic-cart-ts')) ss('aic-cart-ts', Date.now());
    const elapsed = Date.now() - cartTs;
    if (elapsed > 1800000) {
      setTimeout(() => {
        if ($('.cart-reminder')) return;
        const rem = document.createElement('div'); rem.className = 'cart-reminder';
        rem.innerHTML = `<div class="cart-rem-inner"><span class="cart-rem-icon">🛒</span><span>你的購物車有 <b>${cart.size}</b> 件商品等待結帳</span><a href="cart.html" class="btn btn-pri btn-sm">前往結帳</a><button class="cart-rem-close" aria-label="關閉">×</button></div>`;
        document.body.append(rem);
        requestAnimationFrame(() => requestAnimationFrame(() => rem.classList.add('show')));
        rem.querySelector('.cart-rem-close').onclick = () => { rem.classList.remove('show'); setTimeout(() => rem.remove(), 300); };
      }, 3000);
    }
  }
  const origSaveCart = saveCart;
  window._origSaveCart = origSaveCart;
}

// （回到頂部按鈕已由 .btt 元件處理，不重複建立）

// ── 頁面載入進度條 ──
(function(){
  const bar = document.createElement('div');
  bar.className = 'page-progress';
  document.body.prepend(bar);
  function run() { bar.classList.add('loading'); setTimeout(() => { bar.classList.remove('loading'); bar.classList.add('done'); setTimeout(() => bar.classList.remove('done'), 400); }, 600); }
  run();
  window.addEventListener('hashchange', run);
})();


// ── 頁面退出動畫（支援 View Transitions API）──
if (!prefersReduced) {
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href]');
    if (!a || a.target === '_blank' || a.getAttribute('href').startsWith('#') || a.getAttribute('href').startsWith('javascript') || a.getAttribute('href').startsWith('mailto') || a.getAttribute('href').startsWith('tel')) return;
    const href = a.getAttribute('href');
    if (!href.endsWith('.html') && !href.includes('.html?') && href !== '/' && href !== '') return;
    e.preventDefault();
    scrollTo({ top: 0 });
    if (document.startViewTransition) {
      document.startViewTransition(() => { location.href = href; });
    } else {
      document.body.classList.add('page-exit');
      setTimeout(() => { location.href = href; }, 200);
    }
  });
}

})();
