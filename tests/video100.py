# 影片上架 → 觀看 全流程測試＋100 位模擬使用者隨機操作
# A. 模擬講師上架一門新課（含：一般、直式、長片、損壞檔、遺失檔）
# B. 100 位使用者（桌機／手機、部分已購買）隨機操作播放器與網站，每步檢查問題
# 用法：先開 tests/range_server.py 8811，再 python3 tests/video100.py [輸出檔]
import asyncio, json, os, random, subprocess, sys, re
from playwright.async_api import async_playwright

B = 'http://localhost:8811/'
OUT = sys.argv[1] if len(sys.argv) > 1 else '/tmp/video100.jsonl'
TMP = '/tmp/vtest'; os.makedirs(TMP, exist_ok=True)
ISSUES = []; STATS = {'actions': 0, 'plays': 0, 'seeks': 0, 'lessons': 0}

def issue(src, kind, detail, url=''):
    ISSUES.append(dict(src=src, kind=kind, detail=str(detail)[:200], url=url.replace(B, '/')))

# ---------- 測試用影片 ----------
def ff(args): subprocess.run(['ffmpeg', '-y', '-loglevel', 'error'] + args, check=True)
if not os.path.exists(f'{TMP}/normal.mp4'):
    ff(['-f', 'lavfi', '-i', 'testsrc=size=1280x720:rate=10:duration=8', '-f', 'lavfi', '-i', 'sine=d=8', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-shortest', f'{TMP}/normal.mp4'])
    ff(['-f', 'lavfi', '-i', 'testsrc=size=720x1280:rate=10:duration=6', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', f'{TMP}/portrait.mp4'])
    ff(['-f', 'lavfi', '-i', 'testsrc=size=1280x720:rate=5:duration=60', '-c:v', 'libx264', '-preset', 'ultrafast', '-pix_fmt', 'yuv420p', f'{TMP}/long.mp4'])
    with open(f'{TMP}/broken.mp4', 'wb') as f: f.write(os.urandom(40000))
VIDS = {'1-1': 'normal.mp4', '1-2': 'portrait.mp4', '2-1': 'long.mp4', '2-2': 'broken.mp4', '3-1': 'normal.mp4'}  # 2-3 故意不存在
import shutil, atexit
SITE_DIR = 'assets/video/c98'; os.makedirs(SITE_DIR, exist_ok=True)
for k, v in VIDS.items(): shutil.copy(f'{TMP}/{v}', f'{SITE_DIR}/{k}.mp4')   # 像講師一樣把檔案放進課程資料夾（測試完刪除）
atexit.register(lambda: shutil.rmtree(SITE_DIR, ignore_errors=True))

EXTRA = r"""
;(function(){
 window.COURSES.push({ id:'c98', v:'c105', title:'上架測試：影片格式驗證課', cat:'ai', sub:'AI 應用開發', teacher:'OKAI 講師團隊', role:'OKAI課程網 專業講師', price:1990, origin:1990, hours:1, rating:0, students:0, tag:'NEW', desc:'測試各種影片格式的上架結果。', ai:'影片上架測試' });
 window.CHAPTERS.c98 = [
  { ch:1, title:'第一章 一般影片', lessons:['橫式影片','直式影片'], videos:['assets/video/c98/1-1.mp4','assets/video/c98/1-2.mp4'], durs:['00:08','00:06'], duration:1 },
  { ch:2, title:'第二章 特殊情況', lessons:['長影片','損壞的檔案','遺失的檔案'], videos:['assets/video/c98/2-1.mp4','assets/video/c98/2-2.mp4','assets/video/c98/2-3.mp4'], durs:['01:00','00:10','00:10'], duration:2 },
  { ch:3, title:'第三章 結業', lessons:['最後一課'], videos:['assets/video/c98/3-1.mp4'], durs:['00:08'], duration:1 }
 ];
})();
"""
D = json.loads(subprocess.check_output(['node', '-e', """
global.window={};global.location={search:''};global.localStorage={getItem(){},setItem(){},removeItem(){}};
eval(require('fs').readFileSync('js/data.js','utf8'));
console.log(JSON.stringify(window.COURSES.map(c=>({id:c.id,ch:(window.CHAPTERS[c.id]||[]).map(x=>x.lessons.length)}))))"""]))
CIDS = [c['id'] for c in D]; CH = {c['id']: c['ch'] for c in D}

async def setup_ctx(b, mobile=False, owned=(), extra=True):
    vp = {'width': 390, 'height': 844} if mobile else {'width': random.choice([1280, 1440, 1920]), 'height': 900}
    ctx = await b.new_context(viewport=vp, is_mobile=mobile, has_touch=mobile)
    await ctx.add_init_script("try{sessionStorage.setItem('aic-topbar','1');%s}catch(e){}" % (f"if(!localStorage.getItem('aic-owned'))localStorage.setItem('aic-owned',JSON.stringify({json.dumps(list(owned))}));" if owned else ''))
    if extra:
        async def data_route(route):
            r = await route.fetch(); body = await r.text(); await route.fulfill(response=r, body=body + EXTRA)
        await ctx.route('**/js/data*.js*', data_route)

    return ctx

def watch(pg, tag, errs, bad):
    pg.on('pageerror', lambda e: errs.append(str(e)[:180]))
    pg.on('console', lambda m: errs.append('console: ' + m.text[:180]) if m.type == 'error' and 'Failed to load resource' not in m.text and 'c98/2-' not in m.text else None)
    pg.on('response', lambda r: bad.append(f'{r.status} {r.url.replace(B, "/")}') if r.status >= 400 and r.url.startswith(B) and '/c98/' not in r.url else None)

PSTATE = """() => { const v=document.getElementById('plr-vid'); if(!v) return null;
 const prog=(document.querySelector('.plr-prog-txt')||{}).textContent||''; const txt=document.body.innerText;
 return {src:(v.getAttribute('src')||'').split('/').slice(-2).join('/'), t:v.currentTime, d:v.duration, err:v.error?v.error.code:0, paused:v.paused,
  vw:v.videoWidth, vh:v.videoHeight, fit:getComputedStyle(v).objectFit, errShown:!!document.querySelector('.plr-err:not([hidden])') && getComputedStyle(document.querySelector('.plr-err')).display!=='none',
  prog, bad:/NaN|undefined|Infinity|\\[object/.test(prog+((document.querySelector('.plr-sb-count')||{}).textContent||'')), cur:(document.querySelector('.plr-ls.on, .plr-ls.cur, .plr-ls.active')||{}).dataset||null,
  locked:!!document.querySelector('.plr-lock:not([hidden])'), store:localStorage.getItem('aic-progress')} }"""

# ================= A. 講師上架 =================
async def open_ls(pg, ch, ls):
    loc = pg.locator(f'.plr-ls[data-ch="{ch}"][data-ls="{ls}"]')
    if not await loc.is_visible():
        await pg.click(f'.plr-ch-btn[data-ch="{ch}"]'); await pg.wait_for_timeout(300)
    await loc.click(timeout=5000)

async def part_a(b):
    R = []
    def ok(name, cond, info=''): R.append(('✅' if cond else '❌', name, str(info)[:120])); (None if cond else issue('上架', name, info))
    ctx = await setup_ctx(b); pg = await ctx.new_page(); errs, bad = [], []; watch(pg, 'A', errs, bad)
    await pg.goto(B + 'search.html?q=' + '上架測試'); await pg.wait_for_timeout(1000)
    ok('新課程搜尋得到', '影片格式驗證課' in await pg.inner_text('body'))
    await pg.goto(B + 'category.html?cat=ai'); await pg.wait_for_timeout(1000)
    ok('新課程出現在分類頁', '影片格式驗證課' in await pg.inner_text('body'))
    await pg.goto(B + 'course.html?id=c98'); await pg.wait_for_timeout(1200)
    t = await pg.evaluate('document.body.innerHTML')
    ok('課程頁顯示章節與單元', '直式影片' in t and '遺失的檔案' in t)
    ok('課程頁顯示單元時長', '01:00' in t)
    # 播放器（未購買）
    await pg.goto(B + 'player.html?id=c98'); await pg.wait_for_timeout(1500)
    await pg.evaluate("const v=document.getElementById('plr-vid');v.muted=true;v.play()"); await pg.wait_for_timeout(1500)
    s = await pg.evaluate(PSTATE); ok('1-1 橫式影片可播放', s['src'] == 'c98/1-1.mp4' and s['t'] > 0.3 and s['vw'] == 1280, s)
    await pg.click('.plr-ls[data-ch="0"][data-ls="1"]'); await pg.wait_for_timeout(1200)
    await pg.evaluate("const v=document.getElementById('plr-vid');v.muted=true;v.play()"); await pg.wait_for_timeout(1000)
    s = await pg.evaluate(PSTATE); ok('1-2 直式影片可播放', s['src'] == 'c98/1-2.mp4' and s['vh'] == 1280, s)
    ok('直式影片完整顯示（不被裁切）', s['fit'] in ('contain', 'scale-down'), s['fit'])
    box = await pg.evaluate("(()=>{const v=document.getElementById('plr-vid').getBoundingClientRect();return [Math.round(v.width),Math.round(v.height)]})()")
    ok('直式影片框不爆出畫面', box[1] <= 900, box)
    await pg.click('.plr-ch-btn[data-ch="1"]'); await pg.wait_for_timeout(300)
    await pg.click('.plr-ls[data-ch="1"][data-ls="0"]'); await pg.wait_for_timeout(1000)
    s = await pg.evaluate(PSTATE); ok('未購買：第二章鎖住不能看', s['src'] != 'c98/2-1.mp4' and s['locked'], s)
    # 已購買
    await pg.evaluate("localStorage.setItem('aic-owned',JSON.stringify(['c98']))"); await pg.reload(); await pg.wait_for_timeout(1500)
    await pg.click('.plr-ch-btn[data-ch="1"]') if await pg.locator('.plr-ls[data-ch="1"][data-ls="0"]:visible').count() == 0 else None
    await pg.wait_for_timeout(300); await pg.click('.plr-ls[data-ch="1"][data-ls="0"]'); await pg.wait_for_timeout(1500)
    await pg.evaluate("const v=document.getElementById('plr-vid');v.muted=true;v.play()"); await pg.wait_for_timeout(800)
    s = await pg.evaluate(PSTATE); ok('已購買：2-1 長影片可播放', s['src'] == 'c98/2-1.mp4' and abs((s['d'] or 0) - 60) < 1, s)
    await pg.evaluate("document.getElementById('plr-vid').currentTime=40"); await pg.wait_for_timeout(1500)
    await pg.reload(); await pg.wait_for_timeout(2200)
    s = await pg.evaluate(PSTATE); ok('重新整理後從上次位置續播', s['src'] == 'c98/2-1.mp4' and s['t'] > 35, s)
    await pg.evaluate("const v=document.getElementById('plr-vid');v.muted=true;v.play();v.currentTime=56"); await pg.wait_for_timeout(2500)
    s = await pg.evaluate(PSTATE); prog = json.loads(s['store'] or '{}').get('c98', {})
    ok('看到 90% 以上算完成', any(str(x) in ('1-0', '1_0', '3') or x == 2 for x in prog.get('done', [])) or len(prog.get('done', [])) >= 1, prog)
    for ls, name in ((1, '損壞的檔案'), (2, '遺失的檔案')):
        await pg.evaluate("document.getElementById('plr-auto') && (document.getElementById('plr-auto').checked=false)")
        print('  切換前章節2展開？', await pg.locator('.plr-ls[data-ch="1"][data-ls="1"]').is_visible(), (await pg.evaluate(PSTATE))['src'])
        await open_ls(pg, 1, ls); await pg.wait_for_timeout(2500)
        s = await pg.evaluate(PSTATE); ok(f'{name}：顯示錯誤提示與重試', s['errShown'], s)
        ok(f'{name}：進度數字正常', not s['bad'], s['prog'])
    await open_ls(pg, 2, 0); await pg.wait_for_timeout(1500)
    s = await pg.evaluate(PSTATE); ok('錯誤後切到下一課，錯誤提示消失並正常播放', not s['errShown'] and s['src'] == 'c98/3-1.mp4' and s['err'] == 0, s)
    await pg.goto(B + 'certificate.html'); await pg.wait_for_timeout(1000)
    ok('未看完全部單元，不會發證書', '已取得 0 張證書' in await pg.inner_text('body'))
    await pg.goto(B + 'player.html?id=c98'); await pg.wait_for_timeout(1500)
    s = await pg.evaluate(PSTATE); ok('再次打開播放器，回到上次看的單元', s['src'] == 'c98/3-1.mp4', s)
    for e in errs: issue('上架', 'JS 錯誤', e)
    for x in set(bad): issue('上架', '檔案錯誤', x)
    await ctx.close()
    return R

# ================= B. 100 位使用者 =================
KEYS = ['Space', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'KeyM', 'KeyB', 'Shift+Slash', 'Escape']
async def p_state_check(pg, uid, owned, url):
    s = await pg.evaluate(PSTATE)
    if not s: return
    cid = re.search(r'id=(c\d+)', url); cid = cid.group(1) if cid else ''
    if s['bad']: issue(uid, '進度顯示異常', s['prog'], url)
    if s['t'] is not None and (s['t'] != s['t'] or s['t'] < 0): issue(uid, '播放時間異常', s, url)
    if s['err'] and '/c98/2-' not in url and 'c98/2-' not in s['src']: issue(uid, '影片載入錯誤', s, url)
    m = re.match(r'(c\d+)/(\d+)-(\d+)\.mp4', s['src'] or '')
    if m and cid and m.group(1) == cid and cid not in owned:
        ch, ls = int(m.group(2)), int(m.group(3))
        if ch > 1 or ls > 2: issue(uid, '未購買卻在播放鎖定單元', s['src'], url)
    try:
        st = json.loads(s['store'] or '{}')
        for k, v in st.items():
            if isinstance(v, dict):
                total = sum(CH.get(k, [])) or 999
                if len(v.get('done', [])) > total: issue(uid, '完成單元數超過總數', f'{k} {len(v["done"])}/{total}', url)
    except Exception as e: issue(uid, '進度資料損壞', str(e), url)

async def user(b, uid, rng):
    mobile = rng.random() < .5
    owned = rng.sample(CIDS, rng.randint(1, 4)) if rng.random() < .35 else []
    ctx = await setup_ctx(b, mobile, owned); pg = await ctx.new_page(); errs, bad = [], []; watch(pg, uid, errs, bad)
    pool = CIDS + ['c98'] * 3
    for step in range(25):
        a = rng.choice(['player'] * 6 + ['lesson'] * 4 + ['seek'] * 3 + ['key'] * 3 + ['ctrl'] * 3 + ['tab', 'note', 'reload', 'back', 'course', 'monkey', 'monkey', 'checkout'])
        STATS['actions'] += 1
        try:
            url = pg.url
            if a == 'player' or 'player.html' not in url and a in ('lesson', 'seek', 'key', 'ctrl', 'tab', 'note'):
                cid = rng.choice(pool); await pg.goto(B + f'player.html?id={cid}'); await pg.wait_for_timeout(700)
                if rng.random() < .7: await pg.evaluate("const v=document.getElementById('plr-vid'); if(v){v.muted=true; v.play().catch(()=>{})}"); STATS['plays'] += 1
            elif a == 'lesson':
                chs = pg.locator('.plr-ch-btn:visible'); n = await chs.count()
                if n and rng.random() < .5: await chs.nth(rng.randrange(n)).click(timeout=2500); await pg.wait_for_timeout(200)
                ls = pg.locator('.plr-ls:visible'); n = await ls.count()
                if n:
                    await ls.nth(rng.randrange(n)).click(timeout=2500); STATS['lessons'] += 1
                    if rng.random() < .3: await ls.nth(rng.randrange(n)).click(timeout=2500); await ls.nth(rng.randrange(n)).click(timeout=2500)  # 連點
                    await pg.wait_for_timeout(500)
                    if await pg.locator('.plr-lock:visible').count():
                        btn = pg.locator('.plr-lock:visible button, .plr-lock:visible a').first
                        if await btn.count() and rng.random() < .6: await btn.click(timeout=2000)
            elif a == 'seek':
                bar = pg.locator('#plr-pbar'); STATS['seeks'] += 1
                if await bar.count() and await bar.is_visible():
                    bb = await bar.bounding_box(); await pg.mouse.click(bb['x'] + bb['width'] * rng.random(), bb['y'] + bb['height'] / 2)
                else: await pg.evaluate("const v=document.getElementById('plr-vid'); if(v&&v.duration) v.currentTime=v.duration*Math.random()")
            elif a == 'key':
                await pg.keyboard.press(rng.choice(KEYS))
            elif a == 'ctrl':
                c = rng.choice(['#plr-play', '#plr-mute', '#plr-restart', '#plr-nav-next', '#plr-nav-prev', '#plr-next-ls', '#plr-prev-ls', '#plr-speed', '#plr-sub', '#plr-bm-add', '#plr-auto', '#plr-report', '.plr-sidebar-toggle'])
                el = pg.locator(c + ':visible').first
                if await el.count():
                    await el.click(timeout=2500)
                    if c == '#plr-speed':
                        opt = pg.locator('#plr-speed-menu button:visible, #plr-speed-menu [data-speed]:visible'); n = await opt.count()
                        if n: await opt.nth(rng.randrange(n)).click(timeout=2000)
            elif a == 'tab':
                t = pg.locator('.plr-sb-tab:visible'); n = await t.count()
                if n: await t.nth(rng.randrange(n)).click(timeout=2500)
            elif a == 'note':
                t = pg.locator('#plr-note:visible, .plr-qa-input:visible').first
                if await t.count(): await t.fill(rng.choice(['重點：提示詞要具體', '<b>測試</b>', '😀' * 20, '長' * 500, ''])); await pg.keyboard.press('Tab')
            elif a == 'reload':
                await pg.reload(); await pg.wait_for_timeout(800)
            elif a == 'back':
                await pg.go_back(timeout=5000); await pg.wait_for_timeout(500)
            elif a == 'course':
                await pg.goto(B + f'course.html?id={rng.choice(pool)}'); await pg.wait_for_timeout(600)
                cta = pg.locator('a:has-text("試看"):visible, button:has-text("試看"):visible, a:has-text("開始上課"):visible').first
                if await cta.count(): await cta.click(timeout=2500); await pg.wait_for_timeout(700)
            elif a == 'checkout':
                await pg.goto(B + f'course.html?id={rng.choice(CIDS)}'); await pg.wait_for_timeout(500)
                btn = pg.locator('button:has-text("加入購物車"):visible').first
                if await btn.count(): await btn.click(timeout=2500)
                await pg.goto(B + 'checkout.html'); await pg.wait_for_timeout(500)
                if await pg.locator('#ckName').count():
                    await pg.fill('#ckName', '測試學員'); await pg.fill('#ckEmail', f'u{uid}@example.com')
                    if await pg.locator('#ckAgree').count(): await pg.check('#ckAgree')
                    await pg.click('#ckSubmit'); await pg.wait_for_timeout(800)
            elif a == 'monkey':
                els = pg.locator('a:visible, button:visible'); n = await els.count()
                if n:
                    el = els.nth(rng.randrange(n)); href = await el.get_attribute('href') or ''
                    if not href.startswith(('mailto', 'tel', 'http')) and 'download' not in (await el.get_attribute('download') or 'x'):
                        await el.click(timeout=2500); await pg.wait_for_timeout(500)
            await pg.wait_for_timeout(rng.randint(150, 600))
            if 'player.html' in pg.url: await p_state_check(pg, f'U{uid:03d}', owned, pg.url)
        except Exception as ex:
            msg = str(ex).split('\n')[0]
            if 'Timeout' in msg and ('intercepts pointer' in str(ex) or 'not visible' in str(ex) or 'detached' in str(ex)): continue
            if 'Timeout' in msg: issue(f'U{uid:03d}', '操作卡住', f'{a}: {msg[:120]}', pg.url)
            elif 'Target page' in msg or 'closed' in msg: break
            else: issue(f'U{uid:03d}', '測試執行錯誤', f'{a}: {msg[:140]}', pg.url)
    for e in set(errs): issue(f'U{uid:03d}', 'JS 錯誤', e, '')
    for x in set(bad): issue(f'U{uid:03d}', '檔案錯誤', x, '')
    await ctx.close()

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--autoplay-policy=no-user-gesture-required'])
        R = await part_a(b)
        print('A. 講師上架測試'); [print(' ', *r) for r in R]
        sem = asyncio.Semaphore(6)
        async def run(i):
            async with sem: await user(b, i, random.Random(1000 + i))
        await asyncio.gather(*[run(i) for i in range(1, 101)])
        await b.close()
    with open(OUT, 'w') as f:
        for i in ISSUES: f.write(json.dumps(i, ensure_ascii=False) + '\n')
    print('B. 100 位使用者', STATS)
    from collections import Counter
    c = Counter((i['kind'], re.sub(r'\d+(\.\d+)?', '#', i['detail'])[:90]) for i in ISSUES if i['src'] != '上架')
    print('問題總數', len(ISSUES), '種類', len(c))
    for (k, d), n in c.most_common(40): print(f'  {n:4d} {k}｜{d}')
asyncio.run(main())
