import asyncio
from playwright.async_api import async_playwright
B='http://127.0.0.1:8811/'; R=[]; E=[]
def ok(n,c,i=''): R.append(('✅' if c else '❌',n,str(i)[:100]))
async def m():
  async with async_playwright() as p:
    b=await p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    ctx=await b.new_context(viewport={'width':1366,'height':900}); pg=await ctx.new_page()
    pg.on('pageerror',lambda e:E.append(pg.url.split('/')[-1]+': '+str(e)[:120]))
    async def go(u,w=1200): await pg.goto(B+u); await pg.wait_for_timeout(w)
    await go('index.html'); t=await pg.inner_text('body')
    ok('首頁定位標語',"只教 AI・中文實作・學完就能用" in t); ok('首頁無假人數','60,000' not in t)
    await go('course.html?id=c47'); t=await pg.inner_text('body')
    ok('課程頁移除分期字樣','0 利率' not in t); ok('課程頁有退費保證','7 天退費' in t)
    await pg.click('a.c-preview-btn'); await pg.wait_for_timeout(1500); ok('試看按鈕進播放器','player.html?id=c47' in pg.url)
    t=await pg.inner_text('body'); ok('播放器顯示試看橫幅','試看模式' in t)
    locked=await pg.locator('.plr-ls.locked').count(); ok('未報名時鎖住其餘單元',locked>0,locked)
    await pg.locator('.plr-ls[data-ch="0"][data-ls="1"]').click(); await pg.wait_for_timeout(500)
    ok('第 2 個試看單元可播',await pg.locator('.plr-lock').count()==0)
    await pg.locator('.plr-ls.locked').first.click(); await pg.wait_for_timeout(500)
    ok('點鎖定單元跳報名視窗',await pg.locator('.plr-lock').is_visible())
    await pg.click('.plr-lock [data-enroll]'); await pg.wait_for_timeout(1200)
    ok('鎖定視窗報名→結帳頁','checkout.html' in pg.url and 'c47' in (await pg.evaluate("localStorage.getItem('aic-cart')")))
    # 已報名：全部可看 + 完課發證
    await pg.evaluate("localStorage.setItem('aic-owned',JSON.stringify(['c47']));localStorage.setItem('aic-user',JSON.stringify({name:'測試學員',email:'t@e.com'}))")
    await go('player.html?id=c47',1500)
    ok('已報名無試看橫幅','試看模式' not in await pg.inner_text('body')); ok('已報名無鎖定',await pg.locator('.plr-ls.locked').count()==0)
    if await pg.locator('#plr-auto').count(): await pg.uncheck('#plr-auto')
    nch=await pg.locator('.plr-ch-btn').count()
    for ci in range(nch):
      if not await pg.locator(f'.plr-ls[data-ch="{ci}"]:visible').count(): await pg.click(f'.plr-ch-btn[data-ch="{ci}"]'); await pg.wait_for_timeout(250)
      nl=await pg.locator(f'.plr-ls[data-ch="{ci}"]').count()
      for li in range(nl):
        await pg.locator(f'.plr-ls[data-ch="{ci}"][data-ls="{li}"]').click(); await pg.wait_for_timeout(150)
        await pg.evaluate("""async()=>{const v=document.getElementById('plr-vid'); v.muted=true; await new Promise(r=>{ if(v.readyState>=1) r(); else v.addEventListener('loadedmetadata',r,{once:true}); setTimeout(r,3000)}); await v.play().catch(()=>{}); v.currentTime=v.duration*0.95; await new Promise(r=>setTimeout(r,700));}""")
    await pg.wait_for_timeout(1500)
    certs=await pg.evaluate("localStorage.getItem('aic-certs')"); ok('完課自動發證書',certs and 'c47' in certs,certs)
    ok('完課慶祝視窗',await pg.locator('.comp-ov').count()>0)
    await go('certificate.html'); t=await pg.inner_text('body'); ok('證書頁顯示證書','AI 繪圖' in t and 'OKAI-C47' in t)
    await go('enterprise.html'); ok('企業頁無假數據','60,000' not in await pg.inner_text('body'))
    await b.close()
  for r in R: print(*r)
  print('JS錯誤',E)
asyncio.run(m())
