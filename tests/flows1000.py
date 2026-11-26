# 使用流程檢查：每門課加入購物車→結帳金額→送出、收藏、播放器切換與鎖定、搜尋、分類數量、組合包金額
import asyncio, json, subprocess, sys
from urllib.parse import quote
from playwright.async_api import async_playwright
B = 'http://localhost:8811/'
OUT = sys.argv[1] if len(sys.argv) > 1 else '/tmp/flows.jsonl'
D = json.loads(subprocess.check_output(['node', '-e', """
global.window={};global.location={search:''};global.localStorage={getItem(){},setItem(){},removeItem(){}};
eval(require('fs').readFileSync('js/data.js','utf8'));
console.log(JSON.stringify({courses:window.COURSES.map(c=>({id:c.id,price:c.price,title:c.title,cat:c.cat,sub:c.sub})),bundles:window.BUNDLES,cats:window.CATS.slice(1).map(c=>c.id)}))"""]))
issues = []
def bug(kind, sev, page, detail): issues.append(dict(type=kind, sev=sev, page=page, vp='流程', detail=str(detail)[:160], sel=''))

async def fresh(b):
    ctx = await b.new_context(viewport={'width': 1440, 'height': 900})
    await ctx.add_init_script("try{sessionStorage.setItem('aic-topbar','1')}catch(e){}")
    pg = await ctx.new_page(); errs = []
    pg.on('pageerror', lambda e: errs.append(str(e)[:150]))
    return ctx, pg, errs

async def course_flow(b, c):
    ctx, pg, errs = await fresh(b); u = f'course.html?id={c["id"]}'
    try:
        await pg.goto(B + u); await pg.wait_for_timeout(900)
        btn = pg.locator('.buy [data-cart]:visible, button:has-text("加入購物車"):visible').first
        if not await btn.count(): bug('找不到加入購物車按鈕', '高', u, c['id']); return
        await btn.click(); await pg.wait_for_timeout(400)
        cart = await pg.evaluate("JSON.parse(localStorage.getItem('aic-cart')||'[]')")
        if c['id'] not in json.dumps(cart): bug('加入購物車沒有成功', '高', u, cart)
        await pg.goto(B + 'cart.html'); await pg.wait_for_timeout(700)
        txt = await pg.evaluate('document.body.innerText')
        if c['title'][:10] not in txt: bug('購物車沒有顯示課程', '高', 'cart.html', c['id'])
        if f"{c['price']:,}" not in txt: bug('購物車價格錯誤', '高', 'cart.html', f"{c['id']} 應為 {c['price']:,}")
        await pg.goto(B + 'checkout.html'); await pg.wait_for_timeout(800)
        tot = await pg.evaluate("(document.getElementById('ckTotalAmt')||{}).textContent||''")
        if f"{c['price']:,}" not in tot: bug('結帳金額錯誤', '高', 'checkout.html', f"{c['id']} 顯示 {tot}，應為 {c['price']:,}")
        await pg.fill('#ckName', '測試學員'); await pg.fill('#ckEmail', 'test@example.com')
        if await pg.locator('#ckAgree').count(): await pg.check('#ckAgree')
        await pg.click('#ckSubmit'); await pg.wait_for_timeout(1500)
        orders = await pg.evaluate("JSON.parse(localStorage.getItem('aic-orders')||'[]')")
        if not orders: bug('送出報名後沒有建立訂單', '高', 'checkout.html', c['id'])
        elif orders[0].get('total') != c['price']: bug('訂單金額錯誤', '高', 'checkout.html', f"{orders[0].get('total')} ≠ {c['price']}")
        done_txt = await pg.evaluate('document.body.innerText')
        if 'order-complete' not in pg.url and '完成報名' not in done_txt and '報名完成' not in done_txt: bug('送出後沒有顯示完成畫面', '中', 'checkout.html', pg.url.replace(B, '/'))
        # 收藏
        await pg.goto(B + u); await pg.wait_for_timeout(700)
        w = pg.locator('[data-addwish], .c-wish, button:has-text("♡"):visible').first
        if await w.count():
            await w.click(); await pg.wait_for_timeout(300)
            wish = await pg.evaluate("JSON.parse(localStorage.getItem('aic-wish')||'[]')")
            if c['id'] not in wish: bug('收藏沒有成功', '中', u, c['id'])
        # 播放器
        p = f'player.html?id={c["id"]}'
        await pg.goto(B + p); await pg.wait_for_timeout(900)
        src0 = await pg.evaluate("document.getElementById('plr-vid').getAttribute('src')")
        l2 = pg.locator('.plr-ls[data-ch="0"][data-ls="1"]')
        if await l2.count():
            await l2.click(); await pg.wait_for_timeout(600)
            src1 = await pg.evaluate("document.getElementById('plr-vid').getAttribute('src')")
            if src1 == src0: bug('播放器切換單元影片沒變', '高', p, src1)
            if not src1.endswith('1-2.mp4'): bug('播放器單元影片路徑錯誤', '高', p, src1)
        ch2 = pg.locator('.plr-ch-btn[data-ch="1"]')
        if await ch2.count(): await ch2.click(); await pg.wait_for_timeout(300)
        l3 = pg.locator('.plr-ls[data-ch="1"][data-ls="0"]')
        if await l3.count():
            before = await pg.evaluate("document.getElementById('plr-vid').getAttribute('src')")
            await l3.click(); await pg.wait_for_timeout(600)
            after = await pg.evaluate("document.getElementById('plr-vid').getAttribute('src')")
            if after != before and after.endswith('2-1.mp4'): bug('未購買卻能看鎖定單元', '高', p, c['id'])
        # 搜尋
        kw = c['title'].split('：')[0][:8]
        await pg.goto(B + 'search.html?q=' + quote(kw)); await pg.wait_for_timeout(900)
        st = await pg.evaluate('document.body.innerText')
        if c['title'][:10] not in st: bug('搜尋找不到課程', '中', 'search.html?q=' + kw, c['id'])
    except Exception as ex:
        bug('流程執行失敗', '高', u, str(ex)[:150])
    for e in errs: bug('JS 錯誤（流程中）', '高', u, e)
    await ctx.close()

async def misc(b):
    ctx, pg, errs = await fresh(b)
    # 分類數量
    for cid in D['cats']:
        await pg.goto(B + f'category.html?cat={cid}'); await pg.wait_for_timeout(600)
        n = await pg.locator('#catp-grid .card').count(); want = len([c for c in D['courses'] if c['cat'] == cid])
        if n != want: bug('分類頁課程數不符', '高', f'category.html?cat={cid}', f'顯示 {n}，應為 {want}')
    # 組合包金額
    P = {c['id']: c['price'] for c in D['courses']}
    for bd in D['bundles']:
        s = sum(P[i] for i in bd['courses'])
        if bd['original'] != s: bug('組合包原價與課程加總不符', '高', 'bundle.html', f"{bd['id']} {bd['original']} ≠ {s}")
        if bd['original'] - bd['price'] != bd['save']: bug('組合包省下金額算錯', '高', 'bundle.html', bd['id'])
    await pg.goto(B + 'bundle.html'); await pg.wait_for_timeout(900)
    bt = await pg.evaluate('document.body.innerText')
    for bd in D['bundles']:
        if f"{bd['price']:,}" not in bt: bug('組合包頁價格與資料不符', '高', 'bundle.html', f"{bd['id']} {bd['price']:,}")
    # 選單連結都能開
    await pg.goto(B + 'index.html'); await pg.wait_for_timeout(700)
    links = await pg.evaluate("[...document.querySelectorAll('.mega-drop a')].map(a=>a.getAttribute('href'))")
    for h in links:
        r = await pg.request.get(B + h.split('#')[0])
        if r.status >= 400: bug('選單連結打不開', '高', 'index.html', h)
    # 結帳驗證
    await pg.goto(B + f'course.html?id={D["courses"][0]["id"]}'); await pg.wait_for_timeout(700)
    await pg.locator('.buy [data-cart]:visible, button:has-text("加入購物車"):visible').first.click()
    await pg.goto(B + 'checkout.html'); await pg.wait_for_timeout(700)
    await pg.click('#ckSubmit'); await pg.wait_for_timeout(500)
    if await pg.evaluate("JSON.parse(localStorage.getItem('aic-orders')||'[]').length"): bug('空白表單也能送出', '高', 'checkout.html', '')
    await pg.fill('#ckName', 'A'); await pg.fill('#ckEmail', 'bad-email'); await pg.click('#ckSubmit'); await pg.wait_for_timeout(500)
    if await pg.evaluate("JSON.parse(localStorage.getItem('aic-orders')||'[]').length"): bug('錯誤 Email 也能送出', '高', 'checkout.html', '')
    for e in errs: bug('JS 錯誤（流程中）', '高', 'misc', e)
    await ctx.close()

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path='/usr/bin/google-chrome')
        sem = asyncio.Semaphore(4)
        async def run(c):
            async with sem: await course_flow(b, c)
        await asyncio.gather(*[run(c) for c in D['courses']])
        await misc(b)
        await b.close()
    with open(OUT, 'w') as f:
        for i in issues: f.write(json.dumps(i, ensure_ascii=False) + '\n')
    print('流程問題', len(issues))
asyncio.run(main())
