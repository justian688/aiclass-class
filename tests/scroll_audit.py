"""每一頁 × 桌機/手機：能不能滑、會不會左右跑版、內容有沒有被浮動元件擋住、
按遍每個按鈕後按 Esc / 關閉，頁面會不會卡住不能滑或殘留遮罩。結果寫到 /tmp/scroll_audit.json"""
import asyncio, json, sys, glob, os
from playwright.async_api import async_playwright
B = 'http://127.0.0.1:8811/'
API = 'http://127.0.0.1:8812/'
PAGES = sorted(os.path.basename(p) for p in glob.glob(os.path.join(os.path.dirname(__file__), '..', '*.html')))
EXTRA = {'course.html': 'course.html?id=c03', 'player.html': 'player.html?id=c03', 'article.html': 'article.html?id=1',
         'instructor.html': 'instructor.html?name=' , 'category.html': 'category.html?cat=ai', 'search.html': 'search.html?q=AI',
         'path.html': 'path.html?id=p1', 'bundle.html': 'bundle.html', 'video.html': 'video.html?id=c03'}
ONLY = sys.argv[1:]  # 可指定頁面
ISS = []
def issue(dev, page, kind, detail):
    ISS.append({'dev': dev, 'page': page, 'kind': kind, 'detail': str(detail)[:220]}); print('!!', dev, page, kind, str(detail)[:160], flush=True)

STATE_JS = """()=>{const b=getComputedStyle(document.body),h=getComputedStyle(document.documentElement);
 return {y:scrollY, sh:document.documentElement.scrollHeight, ih:innerHeight, sw:document.documentElement.scrollWidth, iw:innerWidth,
 lock:(b.overflowY+h.overflowY).includes('hidden') || b.position==='fixed', url:location.href}}"""
WIDE_JS = """()=>{const iw=innerWidth,out=[];
 const clipped=e=>{for(let p=e.parentElement;p&&p!==document.body;p=p.parentElement){const s=getComputedStyle(p);if(/(hidden|auto|scroll|clip)/.test(s.overflowX))return true;if(s.position==='fixed')return true;}return false};
 for(const e of document.querySelectorAll('body *')){const r=e.getBoundingClientRect();if(!r.width||r.right<=iw+1)continue;const s=getComputedStyle(e);if(s.position==='fixed'||s.visibility==='hidden'||s.display==='none')continue;if(clipped(e))continue;
  out.push((e.id?'#'+e.id:e.tagName.toLowerCase()+'.'+[...e.classList].slice(0,2).join('.'))+' 右邊超出 '+Math.round(r.right-iw)+'px'); if(out.length>4)break;}
 return out}"""
BLOCK_JS = """()=>{const iw=innerWidth,ih=innerHeight,hits=new Set();
 for(const [x,y] of [[iw/2,ih/2],[iw/4,ih/3],[iw*3/4,ih*2/3]]){const e=document.elementFromPoint(x,y);if(!e)continue;
  for(let p=e;p&&p!==document.body;p=p.parentElement){const s=getComputedStyle(p);if(s.position==='fixed'){const r=p.getBoundingClientRect();if(r.width*r.height>iw*ih*0.3&&+s.opacity>0.05&&s.visibility!=='hidden'&&s.pointerEvents!=='none')hits.add(p.id?'#'+p.id:p.tagName.toLowerCase()+'.'+[...p.classList].slice(0,2).join('.'));break;}}}
 return [...hits]}"""
FOOT_JS = """()=>{const ls=[...document.querySelectorAll('footer a')].filter(a=>a.offsetParent);const out=[];
 for(const a of ls.slice(-6)){a.scrollIntoView({block:'center'});const r=a.getBoundingClientRect();const t=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);
  if(t&&t!==a&&!a.contains(t)&&!t.contains(a)){let f=t;while(f&&f!==document.body&&getComputedStyle(f).position!=='fixed')f=f.parentElement;
   out.push(a.textContent.trim().slice(0,12)+' 被 '+(f&&f!==document.body?(f.className||f.tagName):(t.className||t.tagName)).toString().slice(0,40)+' 擋住')}}
 return out}"""
CANDS_JS = """()=>{const sel='button:not(#plr-fs),[role=button],summary,[data-cart],[data-tab],[data-cm],[data-adm]';
 const vis=e=>{const r=e.getBoundingClientRect();return r.width>4&&r.height>4&&getComputedStyle(e).visibility!=='hidden'};
 return [...document.querySelectorAll(sel)].filter(vis).filter(e=>!e.closest('footer')&&!/download/i.test(e.getAttribute('download')||'')).map((e,i)=>{e.dataset.mk='k'+i;return 'k'+i}).slice(0,28)}"""
TRAP_JS = """()=>[...document.querySelectorAll('body *')].filter(e=>{const s=getComputedStyle(e);if(!/(auto|scroll)/.test(s.overflowY)||e.scrollHeight<=e.clientHeight+20||e.clientHeight<160)return false;
 for(let p=e;p&&p!==document.body;p=p.parentElement){const q=getComputedStyle(p);if(q.position==='fixed'||q.display==='none'||q.visibility==='hidden')return false}
 if(s.overscrollBehaviorY==='auto'&&e.clientHeight<innerHeight*0.5)return true; return e.clientHeight<innerHeight*0.5}).map(e=>(e.id?'#'+e.id:e.tagName.toLowerCase()+'.'+[...e.classList].slice(0,2).join('.'))+' 高'+e.clientHeight+'/內容'+e.scrollHeight).slice(0,4)"""
CLOSE_SEL = '[aria-label*="關閉"]:visible, [data-close]:visible, .close:visible, .cw-min:visible, .modal-close:visible'

async def swipe(pg, cdp, mobile, dy):
    if not mobile:
        await pg.mouse.move(683, 450); await pg.mouse.wheel(0, dy); await pg.wait_for_timeout(450); return
    x, y0 = 195, 600; y1 = max(60, y0 - dy) if dy > 0 else min(800, y0 - dy)
    steps = 8
    await cdp.send('Input.dispatchTouchEvent', {'type': 'touchStart', 'touchPoints': [{'x': x, 'y': y0}]})
    for i in range(1, steps + 1):
        await cdp.send('Input.dispatchTouchEvent', {'type': 'touchMove', 'touchPoints': [{'x': x, 'y': y0 + (y1 - y0) * i / steps}]})
        await pg.wait_for_timeout(16)
    await cdp.send('Input.dispatchTouchEvent', {'type': 'touchEnd', 'touchPoints': []})
    await pg.wait_for_timeout(600)

async def can_scroll(pg, cdp, mobile):
    s = await pg.evaluate(STATE_JS)
    if s['sh'] <= s['ih'] + 40: return True, s
    if s['y'] + s['ih'] >= s['sh'] - 5: await pg.evaluate('scrollTo(0,0)'); await pg.wait_for_timeout(200); s = await pg.evaluate(STATE_JS)
    await swipe(pg, cdp, mobile, 400)
    s2 = await pg.evaluate(STATE_JS)
    return s2['y'] > s['y'] + 20, s2

async def run_dev(p, dev):
    mobile = dev == '手機'
    b = await p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox', '--mute-audio'])
    opts = dict(viewport={'width': 390, 'height': 844}, is_mobile=True, has_touch=True, device_scale_factor=2) if mobile else dict(viewport={'width': 1366, 'height': 900})
    ctx = await b.new_context(**opts, locale='zh-TW')
    await ctx.add_init_script("localStorage.setItem('aic-tour-done','1');localStorage.setItem('aic-cookie','1');")
    async def api(route):
        u = route.request.url.split('/api/', 1)[1]
        try:
            r = await ctx.request.fetch(API + 'api/' + u, method=route.request.method, headers=route.request.headers, data=route.request.post_data_buffer)
            await route.fulfill(response=r)
        except Exception: await route.abort()
    await ctx.route('**/api/**', api)
    await ctx.route('mailto:*', lambda r: r.abort())
    await ctx.route(lambda u: not u.startswith('http://127.0.0.1'), lambda r: r.abort())
    pg = await ctx.new_page(); cdp = await ctx.new_cdp_session(pg)
    errs = []
    pg.on('pageerror', lambda e: errs.append(str(e)[:150]))
    pg.on('dialog', lambda d: asyncio.ensure_future(d.dismiss()))
    for name in PAGES:
        if ONLY and name not in ONLY: continue
        url = EXTRA.get(name, name)
        if name == 'instructor.html':
            url = 'instructor.html?name=' + 'Leo'
        errs.clear()
        try:
            await pg.goto(B + url, wait_until='domcontentloaded', timeout=20000); await pg.wait_for_timeout(1300)
        except Exception as e: issue(dev, name, '打不開', e); continue
        st = await pg.evaluate(STATE_JS)
        if st['iw'] != (390 if mobile else 1366): issue(dev, name, '整頁被撐寬（手機會自動縮小、字變小、能左右滑）', f"畫面寬 {st['iw']}")
        if st['sw'] > st['iw'] + 1: issue(dev, name, '左右跑版（可以往右滑出空白）', f"多出 {st['sw'] - st['iw']}px " + '；'.join(await pg.evaluate(WIDE_JS)))
        ok, s2 = await can_scroll(pg, cdp, mobile)
        if not ok: issue(dev, name, '一進頁面就滑不動', str(s2) + ' ' + str(await pg.evaluate("(()=>{const e=document.elementFromPoint(195,600);return [e&&(e.tagName+'.'+e.className),getComputedStyle(e).touchAction,localStorage.getItem('aic-cart'),document.activeElement.tagName+'.'+document.activeElement.className, [...document.querySelectorAll('*')].filter(x=>{const t=getComputedStyle(x).touchAction;return t!=='auto'&&x.getBoundingClientRect().height>300}).map(x=>x.className+':'+getComputedStyle(x).touchAction).slice(0,5)]})()")))
        if s2['lock']: issue(dev, name, '一進頁面就被鎖住捲動', '')
        bl = await pg.evaluate(BLOCK_JS)
        if bl: issue(dev, name, '畫面被大片浮層擋住', bl)
        if mobile:
            traps = await pg.evaluate(TRAP_JS)
            if traps: issue(dev, name, '頁面裡有自己會上下捲的小框（手指在上面滑，整頁不會動）', traps)
        # 滑到底
        for _ in range(3): await pg.evaluate('scrollTo(0,document.documentElement.scrollHeight)'); await pg.wait_for_timeout(400)
        fo = await pg.evaluate(FOOT_JS)
        if fo: issue(dev, name, '頁尾被擋住', '；'.join(fo))
        # 逐個按按鈕
        await pg.goto(B + url, wait_until='domcontentloaded'); await pg.wait_for_timeout(1000)
        keys = await pg.evaluate(CANDS_JS)
        for k in keys:
            loc = pg.locator(f'[data-mk="{k}"]')
            if not await loc.count():
                continue
            try: label = (await loc.first.inner_text(timeout=500)).strip()[:14] or (await loc.first.get_attribute('aria-label') or '')[:14]
            except Exception: label = k
            before = pg.url
            try:
                await loc.first.scroll_into_view_if_needed(timeout=1200); await loc.first.click(timeout=1500)
            except Exception: continue
            await pg.wait_for_timeout(400)
            if pg.url.split('#')[0] != before.split('#')[0]:
                try: await pg.goto(B + url, wait_until='domcontentloaded'); await pg.wait_for_timeout(900); await pg.evaluate(CANDS_JS)
                except Exception: pass
                continue
            await pg.keyboard.press('Escape'); await pg.wait_for_timeout(700)
            bl = await pg.evaluate(BLOCK_JS); st = await pg.evaluate(STATE_JS)
            if bl or st['lock']:
                c = pg.locator(CLOSE_SEL)
                if await c.count():
                    try: await c.first.click(timeout=1200); await pg.wait_for_timeout(350)
                    except Exception: pass
                bl2 = await pg.evaluate(BLOCK_JS); st2 = await pg.evaluate(STATE_JS)
                if bl2: issue(dev, name, f'按「{label}」後跳出的視窗關不掉', bl2)
                elif st2['lock']: issue(dev, name, f'按「{label}」再關掉後，頁面還是鎖住不能滑', '')
                elif bl: issue(dev, name, f'按「{label}」跳出的視窗按 Esc 關不掉（要按 ✕）', bl)
                if bl2 or st2['lock']:
                    await pg.goto(B + url, wait_until='domcontentloaded'); await pg.wait_for_timeout(900); await pg.evaluate(CANDS_JS)
                    continue
            st = await pg.evaluate(STATE_JS)
            if st['sw'] > st['iw'] + 1: issue(dev, name, f'按「{label}」後左右跑版', f"多出 {st['sw'] - st['iw']}px " + '；'.join(await pg.evaluate(WIDE_JS)))
        ok, s2 = await can_scroll(pg, cdp, mobile)
        if not ok: issue(dev, name, '按完所有按鈕後滑不動', s2)
        for e in errs: issue(dev, name, '程式錯誤', e)
        print(dev, name, len(ISS), flush=True)
    await b.close()

async def main():
    async with async_playwright() as p:
        await asyncio.gather(run_dev(p, '桌機'), run_dev(p, '手機'))
    json.dump(ISS, open('/tmp/scroll_audit.json', 'w'), ensure_ascii=False, indent=1)
    print('問題數', len(ISS))
    for i in ISS: print(i['dev'], i['page'], i['kind'], i['detail'])
asyncio.run(main())
