import asyncio, urllib.parse
from playwright.async_api import async_playwright
B='http://127.0.0.1:8811/'; R=[]; E=[]
def ok(n,c,i=''): R.append(('✅' if c else '❌',n,str(i)[:110]))
async def m():
  async with async_playwright() as p:
    b=await p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox','--autoplay-policy=no-user-gesture-required'])
    ctx=await b.new_context(viewport={'width':1366,'height':900}); pg=await ctx.new_page()
    pg.on('pageerror',lambda e:E.append(pg.url.split('/')[-1]+': '+str(e)[:120]))
    mails=[]
    await ctx.route('mailto:*', lambda r: r.abort())
    async def go(u,w=1200): await pg.goto(B+u); await pg.wait_for_timeout(w)
    # ---------- 影片播放 ----------
    await go('player.html?id=c03',1500)
    v=pg.locator('#plr-vid')
    src=await v.get_attribute('src'); ok('播放器有影片來源',bool(src),src)
    st=await pg.evaluate("""async()=>{const v=document.getElementById('plr-vid'); v.muted=true; try{await v.play()}catch(e){return 'ERR '+e.message} await new Promise(r=>setTimeout(r,2500)); return [v.currentTime.toFixed(1), v.paused, v.readyState, v.videoWidth+'x'+v.videoHeight, v.duration.toFixed(1)].join(',')}""")
    ct=float(st.split(',')[0]) if not st.startswith('ERR') else 0
    ok('影片實際播放（時間有前進）',ct>0.5,st)
    await pg.evaluate("document.getElementById('plr-vid').pause()")
    # 速度
    sp=await pg.evaluate("""()=>{const b=[...document.querySelectorAll('button,select')].find(x=>/速度|speed|1x|1\\.0x/i.test(x.textContent+x.id+x.className+(x.getAttribute('aria-label')||''))); return b?b.tagName+'#'+b.id+'.'+b.className:'none'}""")
    ok('有播放速度控制',sp!='none',sp)
    ok('有全螢幕按鈕',await pg.locator('#plr-fs').count()==1)
    ok('有字幕開關',await pg.locator('#plr-sub').count()==1)
    # 試看第 2 單元可切換、影片重新載入
    await pg.locator('.plr-ls[data-ch="0"][data-ls="1"]').click(); await pg.wait_for_timeout(600)
    title=await pg.inner_text('.plr-lb-title'); ok('切換到 1-2 單元',title.startswith('1-2'),title)
    st2=await pg.evaluate("""async()=>{const v=document.getElementById('plr-vid'); v.muted=true; v.currentTime=0; await v.play().catch(()=>{}); await new Promise(r=>setTimeout(r,1500)); return v.currentTime}""")
    ok('1-2 單元影片可播',st2>0.3,st2)
    await pg.evaluate("document.getElementById('plr-vid').pause()")
    # 鎖定
    await pg.locator('.plr-ls.locked').first.click(); await pg.wait_for_timeout(400); ok('未報名單元會鎖住',await pg.locator('.plr-lock').is_visible())
    await pg.click('.plr-lock [data-close]')
    # 回報問題
    async with pg.expect_request(lambda r: r.url.startswith('mailto:'), timeout=4000) as rq:
      await pg.click('#plr-report')
    u=urllib.parse.unquote((await rq.value).url); ok('回報問題寄信（帶課程與單元）','問題回報' in u and '單元：1-2' in u, u[:90])
    ok('課程公告顯示',await pg.locator('.plr-notice').count()==1)
    # 已報名：全部單元、續看進度
    await pg.evaluate("localStorage.setItem('aic-owned',JSON.stringify(['c03']))")
    await go('player.html?id=c03',1500)
    await pg.click('.plr-ch-btn[data-ch="2"]'); await pg.wait_for_timeout(300); await pg.locator('.plr-ls[data-ch="2"][data-ls="1"]').click(); await pg.wait_for_timeout(500)
    st3=await pg.evaluate("""async()=>{const v=document.getElementById('plr-vid'); v.muted=true; await v.play().catch(()=>{}); await new Promise(r=>setTimeout(r,1500)); return v.currentTime}""")
    ok('已報名可播第 3 章',st3>0.3 and await pg.locator('.plr-lock').count()==0,st3)
    await pg.evaluate("""async()=>{const v=document.getElementById('plr-vid'); v.muted=true; await v.play().catch(()=>{}); v.currentTime=v.duration*0.95; await new Promise(r=>setTimeout(r,900));}""")
    done=await pg.evaluate("localStorage.getItem('aic-progress')"); ok('看到 90% 以上才記錄完成',done and '2-1' in done,done)
    # ---------- 課程頁 / 結帳 / 訂單 ----------
    await pg.evaluate("localStorage.clear()")
    await go('course.html?id=c47'); t=await pg.evaluate('document.body.textContent')
    for k in ['單次購買・非訂閱','購買前請先了解','怎麼學','課程維護方式']: ok('課程頁：'+k,k in t)
    ok('課程頁：可能不適合', await pg.locator('.c-notfor').count()==1)
    for k in ['人正在瀏覽','超高評價','周**','v3.2','學員完成率']: ok('課程頁無假資料：'+k,k not in t)
    await pg.click('[data-buy]'); await pg.wait_for_timeout(1200)
    t=await pg.inner_text('body'); ok('結帳頁付款說明','不會自動續扣' in t and '付款失敗' in t and '退費規則' in t)
    await pg.fill('#ckName','測試'); await pg.fill('#ckEmail','t@example.com')
    await pg.click('#ckSubmit'); await pg.wait_for_timeout(400); ok('未勾同意不能送出', 'checkout' in pg.url and not await pg.evaluate("localStorage.getItem('aic-orders')"))
    await pg.click('label.ck-pay-option:has([value=company])'); await pg.wait_for_timeout(200)
    ok('選公司發票出現統編欄',await pg.locator('#ckTaxId').is_visible())
    await pg.check('#ckAgree'); await pg.click('#ckSubmit'); await pg.wait_for_timeout(300)
    ok('統編未填會擋',not await pg.evaluate("localStorage.getItem('aic-orders')"))
    await pg.fill('#ckTaxId','12345678'); await pg.fill('#ckTaxTitle','測試公司')
    async with pg.expect_request(lambda r: r.url.startswith('mailto:'), timeout=4000) as rq:
      await pg.click('#ckSubmit')
    u=urllib.parse.unquote((await rq.value).url); ok('報名信含訂單編號與統編','訂單編號：OK-' in u and '12345678' in u, u[60:150])
    await go('order-history.html'); t=await pg.inner_text('body')
    ok('訂單紀錄顯示這筆報名','待付款確認' in t and 'AI 繪圖' in t); ok('訂單紀錄無假訂單','Visa' not in t and 'LINE Pay' not in t)
    await go('terms.html'); t=await pg.inner_text('body'); ok('條款退費說明','本平台自訂退費保障' in t and '消費者保護法規定' not in t)
    await go('faq.html'); t=await pg.inner_text('body'); ok('FAQ 新增客服問題','會自動扣款' in t and '回報影片' in t)
    # ---------- 上架（開課）----------
    await go('teach.html'); t=await pg.inner_text('body')
    ok('開課流程 7 階段','品管中' in t and '維護中' in t); ok('提案 10 件事','課程維護' in t and '先備知識' in t); ok('上架品質檢查','繁體中文字幕' in t)
    ok('講師頁無假講師故事','張明哲' not in t)
    href=await pg.get_attribute('a:has-text("用範本寄出開課提案")','href'); u=urllib.parse.unquote(href)
    ok('開課提案範本信','開課提案' in u and '10 課程維護方式' in u)
    await b.close()
  for r in R: print(*r)
  print('JS錯誤',E)
asyncio.run(m())
