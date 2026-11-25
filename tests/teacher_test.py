import asyncio, urllib.parse
from playwright.async_api import async_playwright
B='http://127.0.0.1:8811/'; R=[]; E=[]
def ok(n,c,i=''): R.append(('✅' if c else '❌',n,str(i)[:110]))
async def vstate(pg, wait=1500):
  return await pg.evaluate("""async(w)=>{const v=document.getElementById('plr-vid'); v.muted=true; await new Promise(r=>{ if(v.readyState>=1) r(); else v.addEventListener('loadedmetadata',r,{once:true}); setTimeout(r,4000)}); await v.play().catch(()=>{}); await new Promise(r=>setTimeout(r,w)); return {src:v.currentSrc.split('/').slice(-2).join('/'), dur:Math.round(v.duration), t:+v.currentTime.toFixed(1)}}""", wait)
async def m():
  async with async_playwright() as p:
    b=await p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox','--autoplay-policy=no-user-gesture-required','--mute-audio'])
    ctx=await b.new_context(viewport={'width':1366,'height':900}); pg=await ctx.new_page()
    pg.on('pageerror',lambda e:E.append(pg.url.split('/')[-1]+' '+str(e)[:120]))
    pg.on('response',lambda r: E.append(f'{r.status} {r.url[-50:]}') if r.status>=400 and '127.0.0.1' in r.url else None)
    # 一般訪客看不到測試課
    await pg.goto(B+'search.html?q=測試'); await pg.wait_for_timeout(1200)
    ok('一般模式：搜尋不到測試課程','模擬講師上架流程' not in await pg.inner_text('body'))
    # 開啟測試模式
    await pg.goto(B+'index.html?okai-test=1'); await pg.wait_for_timeout(1200)
    ok('測試模式提示列出現', await pg.locator('.test-bar').count()==1)
    await pg.goto(B+'search.html?q=測試'); await pg.wait_for_timeout(1200)
    ok('測試模式：搜尋得到測試課程','模擬講師上架流程' in await pg.inner_text('body'))
    await pg.goto(B+'instructor.html?name='+urllib.parse.quote('模擬講師（測試用）')); await pg.wait_for_timeout(1200)
    ok('講師頁出現模擬講師','模擬講師' in await pg.inner_text('body'))
    await pg.goto(B+'course.html?id=c99'); await pg.wait_for_timeout(1500)
    t=await pg.inner_text('body'); ok('測試課程頁：這堂課包含','這堂課包含' in t and '2 章 6 個單元' in t, '')
    ok('測試課程封面',await pg.evaluate("(()=>{const i=[...document.images].find(x=>x.src.includes('vtest99'));return i?i.naturalWidth:0})()")>0)
    # 試看
    await pg.goto(B+'player.html?id=c99'); await pg.wait_for_timeout(1500)
    ok('試看單元有「試看」標籤', await pg.locator('.plr-ls-free').count()==2)
    s1=await vstate(pg); ok('1-1 播放自己的影片',s1['src']=='c99/1-1.mp4' and s1['t']>0.5,s1)
    ok('切換前 1-1 沒被算完成（看不到 90%）', await pg.evaluate("!(localStorage.getItem('aic-done-c99')||'').includes('0-0')"))
    await pg.locator('.plr-ls[data-ch="0"][data-ls="1"]').click(); await pg.wait_for_timeout(400)
    s2=await vstate(pg); ok('1-2 換成第 2 支影片',s2['src']=='c99/1-2.mp4',s2)
    done=await pg.evaluate("JSON.parse(localStorage.getItem('aic-progress')||'{}').c99")
    ok('切換單元不會把 1-1 算成完成', not done or '0-0' not in done.get('done',[]), done)
    await pg.locator('.plr-ls[data-ch="0"][data-ls="2"]').click(); await pg.wait_for_timeout(400)
    ok('第 3 單元未報名被鎖', await pg.locator('.plr-lock').count()==1)
    await pg.click('.plr-lock [data-enroll]'); await pg.wait_for_timeout(1200)
    ok('鎖定視窗→報名頁', 'checkout.html' in pg.url)
    # 報名
    await pg.fill('#ckName','測試學員'); await pg.fill('#ckEmail','t@example.com'); await pg.fill('#ckPhone','123')
    await pg.check('#ckAgree'); await pg.click('#ckSubmit'); await pg.wait_for_timeout(400)
    ok('手機格式錯誤會擋', not await pg.evaluate("localStorage.getItem('aic-orders')"))
    await pg.fill('#ckPhone','0912345678')
    await ctx.route('mailto:*', lambda r: r.abort())
    async with pg.expect_request(lambda r: r.url.startswith('mailto:'), timeout=4000) as rq: await pg.click('#ckSubmit')
    ok('報名信送出（含訂單編號）','OK-' in urllib.parse.unquote((await rq.value).url))
    # 管理者開通（模擬）
    await pg.evaluate("localStorage.setItem('aic-owned',JSON.stringify(['c99']))")
    await pg.goto(B+'course.html?id=c99'); await pg.wait_for_timeout(800)
    await pg.evaluate("cart.add && cart.add('c99')") if False else None
    await pg.goto(B+'player.html?id=c99'); await pg.wait_for_timeout(1500)
    ok('開通後無鎖、無試看標籤', await pg.locator('.plr-ls.locked').count()==0 and await pg.locator('.plr-ls-free').count()==0)
    # 看完全部 6 單元（每支 10 秒，快轉到 95% 觸發完成）
    for ci,n in [(0,3),(1,3)]:
      if ci==1: await pg.click('.plr-ch-btn[data-ch="1"]'); await pg.wait_for_timeout(300)
      for li in range(n):
        await pg.locator(f'.plr-ls[data-ch="{ci}"][data-ls="{li}"]').click(); await pg.wait_for_timeout(300)
        await vstate(pg,300)
        await pg.evaluate("(()=>{const v=document.getElementById('plr-vid'); v.currentTime=v.duration*0.95;})()"); await pg.wait_for_timeout(900)
    await pg.wait_for_timeout(1200)
    pr=await pg.evaluate("JSON.parse(localStorage.getItem('aic-progress')||'{}').c99"); ok('6 個單元都記錄完成', pr and len(pr['done'])==6, pr)
    certs=await pg.evaluate("localStorage.getItem('aic-certs')"); ok('自動核發證書', certs and 'c99' in certs, certs)
    await pg.goto(B+'certificate.html'); await pg.wait_for_timeout(1000); ok('證書頁顯示測試課','模擬講師上架流程' in await pg.inner_text('body'))
    await pg.goto(B+'index.html'); await pg.wait_for_timeout(1000)
    await pg.goto(B+'course.html?id=c99'); await pg.wait_for_timeout(1000)
    await pg.goto(B+'category.html?cat=ai'); await pg.wait_for_timeout(1200)
    btn=pg.locator('[data-addcart="c99"]')
    if await btn.count(): await btn.first.evaluate("b=>b.click()"); await pg.wait_for_timeout(400)
    r=await pg.evaluate("JSON.parse(localStorage.getItem('aic-cart')||'[]')"); ok('已擁有的課無法再加入購物車', 'c99' not in r, f'按鈕{await btn.count()}個 購物車{r}')
    # 關閉測試模式
    await pg.goto(B+'index.html?okai-test=0'); await pg.wait_for_timeout(1000)
    await pg.goto(B+'search.html?q=測試'); await pg.wait_for_timeout(1000); ok('關閉測試模式後看不到','模擬講師上架流程' not in await pg.inner_text('body'))
    # 一般課程單元影片
    await pg.goto(B+'player.html?id=c47'); await pg.wait_for_timeout(1200)
    s=await vstate(pg); ok('一般課程 1-1 播放示意影片', s['src']=='c47/1-1.mp4' and s['dur']==10, s)
    await pg.locator('.plr-ls[data-ch="0"][data-ls="1"]').click(); await pg.wait_for_timeout(300)
    s=await vstate(pg); ok('一般課程 1-2 播放自己的示意影片', s['src']=='c47/1-2.mp4', s)
    # 客服知識庫
    await pg.goto(B+'index.html'); await pg.wait_for_timeout(1000)
    await pg.click('.cw-fab'); await pg.fill('.cw-panel input', '會自動扣款嗎'); await pg.keyboard.press('Enter'); await pg.wait_for_timeout(2500)
    t=await pg.inner_text('.cw-panel'); ok('客服回答來自常見問題','不會自動續扣' in t or '單次購買' in t, t[-80:])
    ok('首頁有怎麼上課', await pg.locator('#how').count()==1)
    await b.close()
  for r in R: print(*r)
  print('錯誤',E)
asyncio.run(m())
