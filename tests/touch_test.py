"""手機手勢：從輪播、橫向卡片列、影片上開始往上滑，整頁要能捲；橫滑卡片列要能左右動、整頁不亂跳"""
import asyncio
from playwright.async_api import async_playwright
B = 'http://127.0.0.1:8811/'; R = []
def ok(n, c, i=''):
    R.append(c); print('✅' if c else '❌', n, i if not c else '')
async def drag(pg, cdp, x0, y0, x1, y1):
    await cdp.send('Input.dispatchTouchEvent', {'type': 'touchStart', 'touchPoints': [{'x': x0, 'y': y0}]})
    for i in range(1, 11):
        await cdp.send('Input.dispatchTouchEvent', {'type': 'touchMove', 'touchPoints': [{'x': x0 + (x1 - x0) * i / 10, 'y': y0 + (y1 - y0) * i / 10}]}); await pg.wait_for_timeout(16)
    await cdp.send('Input.dispatchTouchEvent', {'type': 'touchEnd', 'touchPoints': []}); await pg.wait_for_timeout(700)
async def m():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox', '--mute-audio'])
        ctx = await b.new_context(viewport={'width': 390, 'height': 844}, is_mobile=True, has_touch=True, device_scale_factor=2)
        await ctx.add_init_script("localStorage.setItem('aic-tour-done','1');localStorage.setItem('aic-cookie','1');")
        await ctx.route(lambda u: not u.startswith('http://127.0.0.1'), lambda r: r.abort())
        pg = await ctx.new_page(); cdp = await ctx.new_cdp_session(pg)
        for url, sels in [('index.html', ['.hero', '.rail, .rail-track, .rec-track, .scroller', '.cat-card', '.card']),
                          ('course.html?id=c03', ['.c-video, .c-head', '.card', '.rec-track']),
                          ('player.html?id=c03', ['.plr-stage', '.plr-below']), ('blog.html', ['.card, article']),
                          ('category.html?cat=ai', ['.card']), ('wish.html', ['.wish-form'])]:
            await pg.goto(B + url, wait_until='domcontentloaded'); await pg.wait_for_timeout(1400)
            for sel in sels:
                box = await pg.evaluate("""s=>{for(const e of document.querySelectorAll(s)){e.scrollIntoView({block:'center',behavior:'instant'});const r=e.getBoundingClientRect();if(r.height>60&&r.width>100)return {x:Math.min(r.left+r.width/2,370),y:Math.min(Math.max(r.top+r.height/2,200),700)}}return null}""", sel)
                if not box: continue
                await pg.wait_for_timeout(300)
                y0 = await pg.evaluate('scrollY'); mx = await pg.evaluate('document.documentElement.scrollHeight-innerHeight')
                if y0 > mx - 300: await pg.evaluate('scrollBy(0,-400)'); await pg.wait_for_timeout(300); y0 = await pg.evaluate('scrollY')
                await drag(pg, cdp, box['x'], box['y'], box['x'] + 3, box['y'] - 280)
                y1 = await pg.evaluate('scrollY')
                ok(f'{url} 手指放在「{sel}」上往上滑，整頁有捲動', y1 > y0 + 80, f'{y0}->{y1}')
            # 橫向卡片列
            rail = await pg.evaluate("""()=>{const e=[...document.querySelectorAll('*')].find(e=>{const s=getComputedStyle(e);return /(auto|scroll)/.test(s.overflowX)&&e.scrollWidth>e.clientWidth+40&&e.clientHeight>120&&e.getBoundingClientRect().width>300});if(!e)return null;e.dataset.rl='1';e.scrollIntoView({block:'center',behavior:'instant'});const r=e.getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2,cls:e.className.toString().slice(0,30)}}""")
            if rail:
                await pg.wait_for_timeout(300)
                y0 = await pg.evaluate('scrollY'); l0 = await pg.evaluate("document.querySelector('[data-rl]').scrollLeft")
                await drag(pg, cdp, 330, rail['y'], 80, rail['y'] + 6)
                y1 = await pg.evaluate('scrollY'); l1 = await pg.evaluate("document.querySelector('[data-rl]').scrollLeft")
                ok(f'{url} 橫滑「{rail["cls"]}」能左右移動', l1 > l0 + 60, f'{l0}->{l1}')
                ok(f'{url} 橫滑時整頁不上下亂跳', abs(y1 - y0) < 30, f'{y0}->{y1}')
                sw = await pg.evaluate('document.documentElement.scrollWidth-innerWidth'); ok(f'{url} 橫滑後整頁沒有被拉出右邊空白', sw <= 1, sw)
        await b.close()
    print(f'共 {len(R)} 項，失敗 {R.count(False)} 項')
asyncio.run(m())
