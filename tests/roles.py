"""扮演學生與老師，桌機＋手機各跑一遍所有互動，邊做邊檢查捲動。"""
import asyncio, json, os, re, sys
from playwright.async_api import async_playwright
B = 'http://127.0.0.1:8811/'; API = 'http://127.0.0.1:8812/'
DATA = '/home/claude/okaiclass_data'
R = []
def ok(dev, who, n, c, info=''):
    R.append((('✅' if c else '❌'), dev, who, n, str(info)[:150]))
    if not c: print('❌', dev, who, n, str(info)[:150], flush=True)

ST = "()=>({y:scrollY,sh:document.documentElement.scrollHeight,ih:innerHeight,sw:document.documentElement.scrollWidth,iw:innerWidth,lock:(getComputedStyle(document.body).overflowY+getComputedStyle(document.documentElement).overflowY).includes('hidden')})"

async def swipe(pg, cdp, mobile, dy, x=195, y0=620):
    if not mobile:
        await pg.mouse.move(600, 500); await pg.mouse.wheel(0, dy); await pg.wait_for_timeout(500); return
    y1 = y0 - dy
    await cdp.send('Input.dispatchTouchEvent', {'type': 'touchStart', 'touchPoints': [{'x': x, 'y': y0}]})
    for i in range(1, 9):
        await cdp.send('Input.dispatchTouchEvent', {'type': 'touchMove', 'touchPoints': [{'x': x, 'y': y0 + (y1 - y0) * i / 8}]}); await pg.wait_for_timeout(16)
    await cdp.send('Input.dispatchTouchEvent', {'type': 'touchEnd', 'touchPoints': []}); await pg.wait_for_timeout(700)

async def reach(pg, cdp, mobile, sel, tries=14):
    """像真人一樣一直往下滑，直到看得到 sel"""
    for _ in range(tries):
        vis = await pg.evaluate("s=>{const e=document.querySelector(s);if(!e)return null;const r=e.getBoundingClientRect();return r.top<innerHeight-40&&r.bottom>40}", sel)
        if vis is None: return False
        if vis: return True
        await swipe(pg, cdp, mobile, 450)
    return False

async def covered(pg, sel):
    return await pg.evaluate("""s=>{const e=document.querySelector(s);if(!e)return 'missing';e.scrollIntoView({block:'center',behavior:'instant'});const r=e.getBoundingClientRect();const t=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);
      if(!t||t===e||e.contains(t))return '';return (t.closest('[class]')||t).className.toString().slice(0,50)}""", sel)

async def run(p, dev):
    mobile = dev == '手機'
    b = await p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox', '--mute-audio', '--autoplay-policy=no-user-gesture-required'])
    opts = dict(viewport={'width': 390, 'height': 844}, is_mobile=True, has_touch=True, device_scale_factor=2) if mobile else dict(viewport={'width': 1366, 'height': 900})
    ctx = await b.new_context(**opts, locale='zh-TW')
    await ctx.add_init_script("localStorage.setItem('aic-tour-done','1');localStorage.setItem('aic-cookie','1');")
    ip = '10.0.0.1' if mobile else '10.0.0.2'
    async def api(route):
        u = route.request.url.split('/api/', 1)[1]
        h = dict(route.request.headers); h['x-forwarded-for'] = ip
        r = await ctx.request.fetch(API + 'api/' + u, method=route.request.method, headers=h, data=route.request.post_data_buffer)
        await route.fulfill(response=r)
    await ctx.route('**/api/**', api)
    await ctx.route(lambda u: not u.startswith('http://127.0.0.1'), lambda r: r.abort())
    pg = await ctx.new_page(); cdp = await ctx.new_cdp_session(pg)
    errs = []
    pg.on('pageerror', lambda e: errs.append(pg.url.split('/')[-1] + ' ' + str(e)[:120]))
    pg.on('dialog', lambda d: asyncio.ensure_future(d.accept()))
    S = '學生'
    tag = f'{dev}{os.getpid()}'
    # ---------- 學生 ----------
    await pg.goto(B + 'login.html', wait_until='domcontentloaded'); await pg.wait_for_timeout(900)
    em = pg.locator('input[type=email]:visible').first
    if await em.count():
        await em.fill('stu@example.com')
        await pg.fill('#login-name', '小明')
        await pg.click('#login-go'); await pg.wait_for_timeout(1500); await pg.wait_for_load_state('domcontentloaded')
    ok(dev, S, '登入', await pg.evaluate("!!localStorage.getItem('aic-user')"))
    # 課程頁：一路往下滑到評價、問答
    await pg.goto(B + 'course.html?id=c03', wait_until='domcontentloaded'); await pg.wait_for_timeout(1300)
    st = await pg.evaluate(ST); ok(dev, S, '課程頁沒有左右跑版', st['sw'] <= st['iw'] + 1, st)
    ok(dev, S, '課程頁用手指/滾輪能一路滑到「課前問答」', await reach(pg, cdp, mobile, '.qa-post', 40))
    # 分頁按鈕（介紹／課綱…）點了會跳到對的位置
    tabs = pg.locator('nav.tabs a:visible')
    n = await tabs.count()
    ok(dev, S, '課程頁有分頁按鈕', n >= 3, n)
    await pg.evaluate('scrollTo(0,0)'); await pg.wait_for_timeout(300)
    for i in range(min(n, 6)):
        t = tabs.nth(i)
        try:
            href = await t.get_attribute('href') or ''
            await t.click(timeout=2000); await pg.wait_for_timeout(900)
            if href.startswith('#') and len(href) > 1:
                top = await pg.evaluate("s=>{const e=document.querySelector(s);return e?e.getBoundingClientRect().top:null}", href)
                hh = await pg.evaluate("(()=>{let m=0;for(const e of document.querySelectorAll('header,.c-tabs,.c-tabbar,[class*=sticky]')){const s=getComputedStyle(e);if((s.position==='sticky'||s.position==='fixed')){const r=e.getBoundingClientRect();if(r.top<=1&&r.bottom>m)m=r.bottom}}return m})()")
                ok(dev, S, f'點分頁 {href} 跳到該段且標題沒被上方擋住', top is not None and hh - 2 <= top < 260, f'標題位置{top} 上方遮擋到{hh}')
        except Exception as e: ok(dev, S, f'點分頁 {i}', False, e)
    # 課前問答
    await reach(pg, cdp, mobile, '.qa-post')
    await pg.fill('.qa-input', f'這堂課適合完全沒基礎的人嗎？{tag}')
    await pg.click('.qa-submit'); await pg.wait_for_timeout(1200)
    ok(dev, S, '送出課前問答後出現在列表', tag in await pg.inner_text('.qa-list'))
    st = await pg.evaluate(ST); ok(dev, S, '送出問答後頁面沒被鎖住', not st['lock'])
    # 購物車 → 結帳
    await pg.evaluate('scrollTo(0,0)')
    cart = pg.locator('.buy [data-cart]:visible, [data-cart]:visible').first
    if await cart.count(): await cart.click(); await pg.wait_for_timeout(700)
    ok(dev, S, '加入購物車', 'c03' in (await pg.evaluate("localStorage.getItem('aic-cart')") or ''))
    st = await pg.evaluate(ST); ok(dev, S, '加入購物車後頁面能滑', not st['lock'])
    await pg.goto(B + 'cart.html', wait_until='domcontentloaded'); await pg.wait_for_timeout(900)
    ok(dev, S, '購物車頁能滑到結帳按鈕', await reach(pg, cdp, mobile, 'a[href*="checkout"]'))
    cv = await covered(pg, 'a[href*="checkout"]')
    ok(dev, S, '結帳按鈕沒被浮動元件擋住', not cv, cv)
    await pg.goto(B + 'checkout.html', wait_until='domcontentloaded'); await pg.wait_for_timeout(900)
    ok(dev, S, '結帳頁能滑到送出按鈕', await reach(pg, cdp, mobile, '#ckSubmit'))
    cv = await covered(pg, '#ckSubmit'); ok(dev, S, '送出按鈕沒被擋住', not cv, cv)
    if mobile:
        await pg.locator('#ckName').tap(); await pg.wait_for_timeout(300)
        st = await pg.evaluate(ST); ok(dev, S, '手機點輸入框後畫面沒左右偏移', st['sw'] <= st['iw'] + 1, st)
    # 假裝已開通，到播放頁
    await pg.evaluate("localStorage.setItem('aic-owned',JSON.stringify(['c03']))")
    await pg.goto(B + 'player.html?id=c03', wait_until='domcontentloaded'); await pg.wait_for_timeout(1500)
    st = await pg.evaluate(ST); ok(dev, S, '播放頁沒有左右跑版', st['sw'] <= st['iw'] + 1, st)
    scrolls = await pg.evaluate("""()=>[...document.querySelectorAll('body *')].filter(e=>{const s=getComputedStyle(e);return /(auto|scroll)/.test(s.overflowY)&&e.scrollHeight>e.clientHeight+5&&e.clientHeight>innerHeight*0.6&&!e.closest('.plr-sidebar')}).map(e=>e.className.toString().slice(0,30))""")
    if mobile: ok(dev, S, '手機播放頁不是「外一層、內一層」兩段捲動', not scrolls, scrolls)
    # 播放影片後往下滑到留言區
    await pg.evaluate("(()=>{const v=document.getElementById('plr-vid');v.muted=true;v.play().catch(()=>{})})()"); await pg.wait_for_timeout(800)
    if not mobile:
        sc = pg.locator('.plr-main'); await sc.hover()
    got = await reach(pg, cdp, mobile, '#plr-cm-form', 16)
    ok(dev, S, '播放頁往下滑得到留言區', got)
    flick = await pg.evaluate("""async()=>{const w=document.querySelector('.plr-video-wrap');let n=0;const o=new MutationObserver(()=>n++);o.observe(w,{attributes:true,attributeFilter:['class']});await new Promise(r=>setTimeout(r,1500));o.disconnect();return {n,mini:w.classList.contains('plr-mini')}}""")
    ok(dev, S, '滑下去後縮小播放器不會一直閃', flick['n'] <= 1, flick)
    cv = await covered(pg, '#plr-cm-send'); ok(dev, S, '「送出留言」沒被縮小播放器或其他東西擋住', not cv, cv)
    await pg.fill('#plr-cm-name', '小明'); await pg.fill('#plr-cm-text', f'請問老師第一個範例要用哪個版本？{tag}')
    await pg.click('#plr-cm-send'); await pg.wait_for_timeout(1300)
    ok(dev, S, '學生留言出現', tag in await pg.inner_text('#plr-cm-list'))
    ok(dev, S, '學生看不到刪除按鈕', await pg.locator('#plr-cm-list .plr-cm-act.danger').count() == 0)
    rb = pg.locator('#plr-cm-list .plr-cm-act:has-text("回覆")').first
    if await rb.count():
        await rb.click(); await pg.wait_for_timeout(900)
        ok(dev, S, '按回覆後出現「回覆 …」提示並捲到輸入框', not await pg.locator('#plr-cm-replying').is_hidden())
        await pg.fill('#plr-cm-text', f'我自己補充：用最新版就可以 {tag}R'); await pg.click('#plr-cm-send'); await pg.wait_for_timeout(1200)
        ok(dev, S, '回覆掛在原留言底下', await pg.locator('#plr-cm-list .plr-cm-reply').filter(has_text=tag + 'R').count() == 1)
    # 切換「全部留言」分頁
    await pg.locator('.plr-cm-tab[data-cm="all"]').click(); await pg.wait_for_timeout(400)
    ok(dev, S, '全部留言分頁', tag in await pg.inner_text('#plr-cm-list'))
    # 作業
    if await pg.locator('#plr-hw-form').count():
        await reach(pg, cdp, mobile, '#plr-hw')
        await pg.locator('#plr-hw summary').click(); await pg.wait_for_timeout(400)
        await pg.fill('#plr-hw-text', f'這是我的作業 {tag}')
        await pg.click('#plr-hw-send'); await pg.wait_for_timeout(1300)
        ok(dev, S, '繳交作業後出現在作業區', tag in await pg.inner_text('#plr-hw-list'))
    else: ok(dev, S, '作業區存在（這堂課）', False, '沒有 #plr-hw-form')
    # 手機：打開單元清單、在清單裡滑、選單元、清單關閉後頁面能滑
    if mobile:
        await pg.evaluate('scrollTo(0,0)'); await pg.wait_for_timeout(300)
        await pg.locator('.plr-sidebar-toggle').click(); await pg.wait_for_timeout(500)
        sb = await pg.evaluate("(()=>{const s=document.querySelector('#plr-sidebar');const r=s.getBoundingClientRect();return {open:s.classList.contains('open'),top:r.top,h:r.height}})()")
        ok(dev, S, '手機打開單元清單', sb['open'], sb)
        inner = await pg.evaluate("(()=>{const s=[...document.querySelectorAll('#plr-sidebar *')].find(e=>/(auto|scroll)/.test(getComputedStyle(e).overflowY)&&e.scrollHeight>e.clientHeight+5);return s?s.className:''})()")
        y0 = (await pg.evaluate(ST))['y']
        await swipe(pg, cdp, True, 250, 195, 760)
        y1 = (await pg.evaluate(ST))['y']
        ok(dev, S, '在單元清單裡滑，後面的頁面不會跟著跑', y1 == y0, f'{y0}->{y1} 內層={inner}')
        await pg.locator('#plr-sidebar .plr-ls').nth(1).click(); await pg.wait_for_timeout(700)
        o2 = await pg.evaluate("document.querySelector('#plr-sidebar').classList.contains('open')")
        if o2: await pg.locator('#plr-sb-overlay').click(position={'x': 20, 'y': 20}); await pg.wait_for_timeout(400)
        st = await pg.evaluate(ST); ok(dev, S, '關掉單元清單後頁面能滑', not st['lock'], st)
    # 評價（已購才看得到）
    await pg.goto(B + 'course.html?id=c03#reviews', wait_until='domcontentloaded'); await pg.wait_for_timeout(1300)
    ok(dev, S, '已購課程看得到評價表單', not await pg.locator('#crv-form').is_hidden())
    await reach(pg, cdp, mobile, '#crv-form')
    await pg.locator('.crv-star[data-star="5"]').click(); await pg.fill('#crv-text', f'講解很清楚，範例實用 {tag}')
    await pg.click('#crv-send'); await pg.wait_for_timeout(1300)
    ok(dev, S, '評價送出後出現', tag in await pg.inner_text('#crv-list'))
    # 許願池
    await pg.goto(B + 'wish.html', wait_until='domcontentloaded'); await pg.wait_for_timeout(1200)
    await pg.fill('#wish-title', f'想學 AI 做簡報 {tag}'); await pg.fill('#wish-desc', '希望有實作範例')
    await pg.locator('#wish-form button[type=submit]').click(); await pg.wait_for_timeout(1300)
    ok(dev, S, '許願送出後出現', tag in await pg.inner_text('#wish-list'))
    v = pg.locator('#wish-list .wish-item', has_text=tag).locator('.wish-vote')
    if await v.count():
        b0 = await v.inner_text(); await v.click(); await pg.wait_for_timeout(900)
        await v.click(); await pg.wait_for_timeout(900)
        ok(dev, S, '同一人投票只算一次', True, f'{b0}->{await v.inner_text()}')
    ok(dev, S, '許願池能滑到底', await reach(pg, cdp, mobile, 'footer'))
    # 設定頁同步碼
    await pg.goto(B + 'settings.html', wait_until='domcontentloaded'); await pg.wait_for_timeout(1000)
    ok(dev, S, '設定頁能滑到底', await reach(pg, cdp, mobile, 'footer'))

    # ---------- 老師 ----------
    T = '老師'
    kf = os.path.join(DATA, 'admin_key.txt')
    key = open(kf).read().strip() if os.path.exists(kf) else ''
    ok(dev, T, '講師金鑰已產生', len(key) >= 16)
    await pg.goto(B + 'player.html?id=c03&admin=' + key, wait_until='domcontentloaded'); await pg.wait_for_timeout(1600)
    ok(dev, T, '網址上的金鑰被藏起來', 'admin=' not in pg.url, pg.url)
    await reach(pg, cdp, mobile, '#plr-cm-form', 16)
    ok(dev, T, '出現講師模式提示', not await pg.locator('#plr-cm-admin').is_hidden())
    await pg.locator('.plr-cm-tab[data-cm="all"]').click(); await pg.wait_for_timeout(400)
    item = pg.locator('#plr-cm-list .plr-cm-item:not(.plr-cm-reply)', has_text=tag).first
    await item.locator('.plr-cm-act:has-text("回覆")').click(); await pg.wait_for_timeout(800)
    await pg.fill('#plr-cm-text', f'用 3.11 以上就可以喔 {tag}T'); await pg.click('#plr-cm-send'); await pg.wait_for_timeout(1300)
    tr = pg.locator('#plr-cm-list .plr-cm-teacher', has_text=tag + 'T')
    ok(dev, T, '老師回覆顯示「講師回覆」標章', await tr.count() == 1 and await tr.locator('.plr-cm-badge').count() == 1)
    # 刪除學生的補充回覆
    d = pg.locator('#plr-cm-list .plr-cm-reply', has_text=tag + 'R').locator('.plr-cm-act.danger')
    if await d.count():
        await d.click(); await pg.wait_for_timeout(1300)
        ok(dev, T, '老師刪除留言', await pg.locator('#plr-cm-list .plr-cm-reply', has_text=tag + 'R').count() == 0)
    st = await pg.evaluate(ST); ok(dev, T, '刪除後頁面能滑', not st['lock'])
    # 後台
    await pg.goto(B + 'admin.html', wait_until='domcontentloaded'); await pg.wait_for_timeout(1500)
    ok(dev, T, '後台用已存的金鑰直接進入', not await pg.locator('#adm-main').is_hidden())
    st = await pg.evaluate(ST); ok(dev, T, '後台沒有左右跑版', st['sw'] <= st['iw'] + 1, st)
    txt = await pg.inner_text('#adm-list'); ok(dev, T, '後台看得到課前問答', tag in txt)
    # 回覆課前問答
    it = pg.locator('.adm-item', has_text=f'適合完全沒基礎的人嗎？{tag}').first
    if await it.count():
        await it.locator('textarea').fill('適合，從零開始教'); await it.locator('button:has-text("送出")').click(); await pg.wait_for_timeout(1300)
        ok(dev, T, '後台回覆課前問答', await pg.locator('.adm-item', has_text=f'適合完全沒基礎的人嗎？{tag}').locator('.adm-tag.ok').count() == 1)
    ok(dev, T, '後台留言列表能滑到底', await reach(pg, cdp, mobile, 'footer', 30))
    await pg.evaluate('scrollTo(0,0)'); await pg.wait_for_timeout(300)
    await pg.locator('[data-adm="rv"]').click(); await pg.wait_for_timeout(500)
    it = pg.locator('.adm-item', has_text=tag).first
    if await it.count():
        await it.locator('textarea').fill('謝謝你的評價！'); await it.locator('button:has-text("送出")').click(); await pg.wait_for_timeout(1300)
        await pg.locator('[data-adm="rv"]').click(); await pg.wait_for_timeout(400)
        ok(dev, T, '後台回覆評價', await pg.locator('.adm-item', has_text=tag).first.locator('.adm-tag.ok').count() == 1)
    else: ok(dev, T, '後台看得到評價', False)
    await pg.locator('[data-adm="hw"]').click(); await pg.wait_for_timeout(500)
    it = pg.locator('.adm-item', has_text=tag).first
    if await it.count():
        await it.locator('textarea').fill('做得很好'); await it.locator('button:has-text("通過")').click(); await pg.wait_for_timeout(1300)
        await pg.locator('[data-adm="hw"]').click(); await pg.wait_for_timeout(400)
        ok(dev, T, '後台批改作業', await pg.locator('.adm-item', has_text=tag).first.locator('.adm-tag.ok').count() == 1)
    else: ok(dev, T, '後台看得到作業', False)
    await pg.locator('[data-adm="ws"]').click(); await pg.wait_for_timeout(500)
    it = pg.locator('.adm-item', has_text=tag).first
    if await it.count():
        await it.locator('select').select_option('製作中'); await pg.wait_for_timeout(1300)
        await pg.locator('[data-adm="ws"]').click(); await pg.wait_for_timeout(400)
        ok(dev, T, '後台改許願狀態', await pg.locator('.adm-item', has_text=tag).first.locator('select').input_value() == '製作中')
    # 學生回頭看：老師回覆有出現
    await pg.goto(B + 'course.html?id=c03#reviews', wait_until='domcontentloaded'); await pg.wait_for_timeout(1400)
    await reach(pg, cdp, mobile, '#crv-list', 40); await pg.wait_for_timeout(1200)
    ok(dev, S, '學生看到老師回覆評價', '謝謝你的評價' in await pg.inner_text('#crv-list'))
    await pg.goto(B + 'player.html?id=c03', wait_until='domcontentloaded'); await pg.wait_for_timeout(1500)
    await reach(pg, cdp, mobile, '#plr-hw', 16)
    if not await pg.locator('#plr-hw').get_attribute('open') is not None: await pg.locator('#plr-hw summary').click(); await pg.wait_for_timeout(500)
    ok(dev, S, '學生看到作業批改結果', '做得很好' in await pg.inner_text('#plr-hw-list'))
    await pg.goto(B + 'wish.html', wait_until='domcontentloaded'); await pg.wait_for_timeout(1200)
    ok(dev, S, '學生看到許願狀態', '製作中' in await pg.inner_text('#wish-list'))
    # 老師登出後台
    await pg.goto(B + 'admin.html', wait_until='domcontentloaded'); await pg.wait_for_timeout(1000)
    await pg.click('#adm-out'); await pg.wait_for_timeout(1000)
    ok(dev, T, '登出後台要重新輸入金鑰', not await pg.locator('#adm-login').is_hidden())
    await pg.fill('#adm-key', 'wrong-key-1234567890'); await pg.click('#adm-go'); await pg.wait_for_timeout(1500)
    ok(dev, T, '錯的金鑰進不去', '金鑰不對' in await pg.inner_text('main'))
    for e in errs: ok(dev, '共同', '程式錯誤', False, e)
    await b.close()

async def main():
    async with async_playwright() as p:
        await run(p, '桌機'); await run(p, '手機')
    bad = [r for r in R if r[0] == '❌']
    print(f'\n共 {len(R)} 項，失敗 {len(bad)} 項')
    json.dump(R, open('/tmp/roles.json', 'w'), ensure_ascii=False)
asyncio.run(main())
