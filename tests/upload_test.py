import asyncio, urllib.parse
from playwright.async_api import async_playwright
B='http://127.0.0.1:8811/'; R=[]; E=[]
def ok(n,c,i=''): R.append(('✅' if c else '❌',n,str(i)[:120]))
EXTRA = r"""
;(function(){
 window.COURSES.push({ id:'c99', v:'test99', title:'上架測試：AI 簡報製作實戰', cat:'ai', sub:'AI 應用開發', teacher:'測試講師', role:'OKAI課程網 專業講師', price:1990, origin:1990, hours:2, level:'入門', rating:0, students:0, tags:['上架測試'], desc:'這是上架流程測試用的課程。' });
 window.CHAPTERS = window.CHAPTERS || {};
 window.CHAPTERS.c99 = [
  { title:'第一章 入門', lessons:['單元一 認識工具','單元二 第一份簡報'], videos:['assets/video/c99/1-1.mp4','assets/video/c99/1-2.mp4'], durs:['00:06','00:07'] },
  { title:'第二章 進階', lessons:['單元三 進階技巧'], videos:['assets/video/c99/2-1.mp4'], durs:['00:08'] }
 ];
})();
"""
async def m():
  async with async_playwright() as p:
    b=await p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox','--autoplay-policy=no-user-gesture-required'])
    ctx=await b.new_context(viewport={'width':1366,'height':900})
    async def data_route(route):
      r=await route.fetch(); body=await r.text(); await route.fulfill(response=r, body=body+EXTRA)
    await ctx.route('**/js/data.js*', data_route)
    vids={'1-1':'/tmp/upl/lesson1.mp4','1-2':'/tmp/upl/lesson2.mp4','2-1':'/tmp/upl/lesson3.mp4'}
    async def vid_route(route):
      k=route.request.url.split('/c99/')[1].replace('.mp4','')
      await route.fulfill(path=vids[k], content_type='video/mp4')
    await ctx.route('**/assets/video/c99/*', vid_route)
    async def img_route(route): await route.fulfill(path='/home/claude/aiclass-class/assets/img/vb30.jpg', content_type='image/jpeg')
    await ctx.route('**/assets/img/vtest99.jpg', img_route)
    pg=await ctx.new_page(); pg.on('pageerror',lambda e:E.append(str(e)[:150]))
    # 講師：開課提案
    await pg.goto(B+'teach.html'); await pg.wait_for_timeout(900)
    href=await pg.get_attribute('a:has-text("用範本寄出開課提案")','href'); ok('講師：開課提案信範本',href and '10 課程維護方式' in urllib.parse.unquote(href))
    # 上架後：出現在搜尋、分類、首頁
    await pg.goto(B+'search.html?q=簡報'); await pg.wait_for_timeout(1200); ok('新課程可被搜尋到','上架測試' in await pg.inner_text('body'))
    await pg.goto(B+'category.html?cat=ai'); await pg.wait_for_timeout(1200); ok('新課程出現在分類頁','上架測試' in await pg.inner_text('body'))
    await pg.goto(B+'course.html?id=c99'); await pg.wait_for_timeout(1500)
    await pg.evaluate("document.getElementById('chapters')&&document.getElementById('chapters').scrollIntoView()"); await pg.wait_for_timeout(1200)
    print('章節區HTML片段', await pg.evaluate("(()=>{const e=document.querySelector('.chap-time');return e?e.outerHTML:'no chap-time'})()"))
    t=await pg.inner_text('body')
    ok('課程頁正常顯示','上架測試：AI 簡報製作實戰' in t and '單元一 認識工具' in t)
    ok('課程頁顯示單元時長','00:07' in t)
    ok('課程頁封面圖正常', await pg.evaluate("(()=>{const i=[...document.images].find(x=>x.src.includes('vtest99'));return i?i.naturalWidth:0})()")>0)
    # 播放器：試看 2 單元各自影片
    await pg.goto(B+'player.html?id=c99'); await pg.wait_for_timeout(1500)
    async def state():
      return await pg.evaluate("""async()=>{const v=document.getElementById('plr-vid'); v.muted=true; await new Promise(r=>{ if(v.readyState>=1) r(); else v.addEventListener('loadedmetadata',r,{once:true}); setTimeout(r,4000)}); await v.play().catch(()=>{}); await new Promise(r=>setTimeout(r,1200)); return {src:v.currentSrc.split('/').slice(-2).join('/'), dur:Math.round(v.duration), t:+v.currentTime.toFixed(1)}}""")
    s1=await state(); ok('單元 1-1 播放自己的影片', s1['src']=='c99/1-1.mp4' and s1['dur']==6 and s1['t']>0.3, s1)
    await pg.locator('.plr-ls[data-ch="0"][data-ls="1"]').click(); await pg.wait_for_timeout(500)
    s2=await state(); ok('切到單元 1-2 換成第 2 支影片', s2['src']=='c99/1-2.mp4' and s2['dur']==20 and s2['t']>0.3, s2)
    await pg.click('.plr-ch-btn[data-ch="1"]'); await pg.wait_for_timeout(300)
    await pg.locator('.plr-ls[data-ch="1"][data-ls="0"]').click(); await pg.wait_for_timeout(500)
    ok('未報名時第二章被鎖住', await pg.locator('.plr-lock').count()==1)
    # 報名開通後
    await pg.evaluate("localStorage.setItem('aic-owned',JSON.stringify(['c99']))"); await pg.goto(B+'player.html?id=c99'); await pg.wait_for_timeout(1500)
    await pg.click('.plr-ch-btn[data-ch="1"]'); await pg.wait_for_timeout(300)
    await pg.locator('.plr-ls[data-ch="1"][data-ls="0"]').click(); await pg.wait_for_timeout(500)
    s3=await state(); ok('開通後第 2 章播放自己的影片', s3['src']=='c99/2-1.mp4' and s3['dur']==8, s3)
    await pg.evaluate("document.getElementById('plr-vid').dispatchEvent(new Event('ended'))"); await pg.wait_for_timeout(1500)
    await pg.click('.plr-ch-btn[data-ch="0"]'); await pg.wait_for_timeout(300)
    await pg.locator('.plr-ls[data-ch="0"][data-ls="0"]').click(); await pg.wait_for_timeout(300)
    await pg.locator('.plr-ls[data-ch="0"][data-ls="1"]').click(); await pg.wait_for_timeout(300)
    await pg.click('.plr-ch-btn[data-ch="1"]'); await pg.wait_for_timeout(300)
    await pg.locator('.plr-ls[data-ch="1"][data-ls="0"]').click(); await pg.wait_for_timeout(300)
    await pg.evaluate("document.getElementById('plr-vid').dispatchEvent(new Event('ended'))"); await pg.wait_for_timeout(1500)
    certs=await pg.evaluate("localStorage.getItem('aic-certs')"); ok('看完全部單元自動發證書', certs and 'c99' in certs, certs)
    # 續看：回到 1-2 從記錄位置續播
    await pg.evaluate("localStorage.setItem('aic-pos-c99-0-1','8')"); await pg.goto(B+'player.html?id=c99'); await pg.wait_for_timeout(1500)
    await pg.locator('.plr-ls[data-ch="0"][data-ls="1"]').click(); await pg.wait_for_timeout(1500)
    pos=await pg.evaluate("document.getElementById('plr-vid').currentTime"); ok('單元續看（從上次位置繼續）', pos>=7.5, pos)
    await b.close()
  for r in R: print(*r)
  print('JS錯誤',E)
asyncio.run(m())
