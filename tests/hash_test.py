"""帶 #錨點 打開課程頁（例如通知信、分享連結），要正好停在那一段，標題不被上方擋住"""
import asyncio
from playwright.async_api import async_playwright
B='http://127.0.0.1:8811/'; R=[]
async def m():
  async with async_playwright() as p:
    b=await p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    for dev,o in [('桌機',dict(viewport={'width':1366,'height':900})),('手機',dict(viewport={'width':390,'height':844},is_mobile=True,has_touch=True))]:
      ctx=await b.new_context(**o); await ctx.add_init_script("localStorage.setItem('aic-tour-done','1');localStorage.setItem('aic-cookie','1');")
      await ctx.route(lambda u: not u.startswith('http://127.0.0.1'), lambda r: r.abort())
      pg=await ctx.new_page()
      for h in ['intro','curri','teacher','reviews','qa','faq']:
        await pg.goto(B+'course.html?id=c03#'+h,wait_until='domcontentloaded'); await pg.wait_for_timeout(2500)
        top=await pg.evaluate("h=>{const e=document.getElementById(h);return e?Math.round(e.getBoundingClientRect().top):null}",h)
        cover=await pg.evaluate("(()=>{let m=0;for(const e of document.querySelectorAll('header,nav.tabs,.hdr')){const s=getComputedStyle(e);if(s.position==='sticky'||s.position==='fixed'){const r=e.getBoundingClientRect();if(r.top<=1&&r.bottom>m)m=r.bottom}}return Math.round(m)})()")
        good=top is not None and cover-2<=top<260
        R.append(good); print('✅' if good else '❌',dev,'#'+h,f'段落位置{top} 上方遮擋{cover}')
      await ctx.close()
    await b.close()
  print('失敗',R.count(False))
asyncio.run(m())
