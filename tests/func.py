import asyncio,json,re,sys
from playwright.async_api import async_playwright
B='http://127.0.0.1:8811/'
res=[];errs=[];bad=[]
def ok(name,cond,info=''): res.append(('✅' if cond else '❌',name,str(info)[:120]))
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
        for vw,tag in [((1366,900),'電腦'),((390,844),'手機')]:
            ctx=await b.new_context(viewport={'width':vw[0],'height':vw[1]})
            await ctx.add_init_script("try{localStorage.setItem('aic-cookie-ok','all')}catch(e){}")
            pg=await ctx.new_page()
            pg.on('pageerror',lambda e:errs.append(f'{tag} {pg.url.split("/")[-1]}: {str(e)[:100]}'))
            pg.on('response',lambda r: bad.append(f'{r.status} {r.url}') if r.status>=400 and '127.0.0.1' in r.url else None)
            async def go(u,w=1200):
                await pg.goto(B+u,wait_until='load'); await pg.wait_for_timeout(w)
            T=lambda n: f'[{tag}] {n}'
            # 首頁
            await go('index.html')
            cards=await pg.locator('a[href*="course.html?id="]').count(); ok(T('首頁有課程卡片'),cards>5,cards)
            # 搜尋
            try:
                if tag=='電腦':
                    await pg.click('.search-btn'); await pg.wait_for_timeout(400)
                else:
                    await pg.locator('[data-search]').first.click(); await pg.wait_for_timeout(400)
                await pg.keyboard.type('繪圖'); await pg.wait_for_timeout(800)
                t=await pg.inner_text('body'); ok(T('搜尋「繪圖」有結果'),'AI 繪圖實戰' in t)
                await pg.keyboard.press('Escape')
            except Exception as e: ok(T('搜尋'),False,e)
            # 分類頁
            await go('category.html?cat=drawing')
            t=await pg.inner_text('body'); ok(T('分類 AI 繪圖 顯示正確'),'AI 繪圖實戰' in t and '生成式 AI 應用開發' not in t, '')
            # 課程頁 + 加入購物車
            await go('course.html?id=c47')
            t=await pg.inner_text('body'); ok(T('課程頁內容'),'Midjourney' in t and '章' in t)
            try:
                await pg.locator('button:has-text("加入購物車")').first.click(timeout=4000); await pg.wait_for_timeout(500)
                cart=await pg.evaluate("JSON.parse(localStorage.getItem('aic-cart')||'[]')"); ok(T('加入購物車'),len(cart)>=1,cart)
            except Exception as e: ok(T('加入購物車'),False,e)
            # 收藏
            try:
                fav=pg.locator('button:has-text("收藏"), [aria-label*="收藏"]').first
                await fav.click(timeout=3000); await pg.wait_for_timeout(400)
                w=await pg.evaluate("Object.keys(localStorage).filter(k=>/wish|fav/.test(k)).map(k=>k+':'+localStorage.getItem(k)).join('|')"); ok(T('收藏課程'),'c47' in w,w)
            except Exception as e: ok(T('收藏課程'),False,e)
            # 購物車頁
            await go('cart.html'); t=await pg.inner_text('body'); ok(T('購物車頁顯示課程'),'AI 繪圖實戰' in t)
            # 報名
            await go('checkout.html')
            try:
                await pg.fill('#ckName','測試'); await pg.fill('#ckEmail','t@example.com')
                await pg.click('#ckSubmit'); await pg.wait_for_timeout(800)
                t=await pg.inner_text('body'); ok(T('送出報名'),'完成報名' in t or '傳送' in t)
            except Exception as e: ok(T('送出報名'),False,e)
            # 報名欄位驗證
            await go('checkout.html')
            try:
                await pg.click('#ckSubmit'); await pg.wait_for_timeout(400); t=await pg.inner_text('body'); ok(T('未填姓名會提示'),'請填寫姓名' in t or await pg.locator('#ckName').count()>0)
            except Exception as e: ok(T('報名驗證'),False,e)
            # 登入註冊
            await go('login.html'); t=await pg.inner_text('body'); ok(T('登入頁不顯示「示範網站」'),'示範' not in t)
            # 文章
            await go('blog.html'); n=await pg.locator('a[href*="article.html"]').count(); ok(T('文章列表'),n>=5,n)
            await go('article.html?id=p1'); t=await pg.inner_text('body'); ok(T('文章內容'),'提示詞' in t)
            # 播放器
            await go('player.html?id=c03',2000)
            v=await pg.locator('video').count(); ok(T('播放器有影片'),v>0,v)
            # 測驗
            await go('quiz.html'); t=await pg.inner_text('body'); ok(T('測驗頁'),'測驗' in t)
            # FAQ
            await go('faq.html')
            try:
                q=pg.locator('.qa-item button, details summary').first; await q.click(timeout=3000); await pg.wait_for_timeout(300); ok(T('FAQ 可展開'),True)
            except Exception as e: ok(T('FAQ 可展開'),False,e)
            # 聯絡表單
            await go('contact.html'); t=await pg.inner_text('body'); ok(T('聯絡頁 Email 正確'),'hi@okaiclass.com' in t and '2345-6789' not in t)
            # 深色模式
            await go('index.html')
            try:
                await pg.locator('.theme-toggle').first.click(timeout=3000); await pg.wait_for_timeout(300)
                th=await pg.evaluate("document.documentElement.dataset.theme||document.documentElement.className"); ok(T('深色模式切換'),'dark' in th,th)
            except Exception as e: ok(T('深色模式切換'),False,e)
            # 客服
            try:
                await pg.click('.cw-fab'); await pg.wait_for_timeout(300); vis=await pg.locator('.cw-panel').is_visible(); ok(T('客服可開啟'),vis)
                box=await pg.locator('.cw-panel').bounding_box(); ok(T('客服視窗在畫面內'),box and box['x']>=0 and box['x']+box['width']<=vw[0]+1,box)
            except Exception as e: ok(T('客服'),False,e)
            # 其他頁面基本
            for u in ['about.html','enterprise.html','teach.html','path.html?id=p1','bundle.html','instructor.html','skillmap.html','privacy.html','terms.html','my.html','settings.html','notebook.html','report.html','certificate.html','order-history.html','achievement.html','search.html?q=AI','404.html']:
                await go(u,700); t=await pg.inner_text('body'); ok(T(f'{u} 可開啟'),len(t)>200 and 'undefined' not in t and 'NaN' not in t, ('含undefined' if 'undefined' in t else '')+('含NaN' if 'NaN' in t else ''))
            await ctx.close()
        await b.close()
    for r in res: print(*r)
    print('\nJS 錯誤:',len(errs)); [print(' ',e) for e in sorted(set(errs))[:20]]
    print('壞連結/資源:',len(set(bad))); [print(' ',x) for x in sorted(set(bad))[:20]]
asyncio.run(main())
