import asyncio, random, json, re, time
from playwright.async_api import async_playwright
B='http://127.0.0.1:8811/'
ISSUES=[]; STATS={'actions':0,'users':0}
def issue(u,kind,detail,url): ISSUES.append({'user':u,'kind':kind,'detail':detail[:200],'url':url.replace(B,'')})
SEARCH=['AI','繪圖','chatgpt','提示詞','影片','LINE','理財','vibe','不存在的課xyz','<script>alert(1)</script>','  ','音樂','遊戲','Midjourney','😀']
NAMES=['王小明','','A','測'*60,'<b>x</b>','Lee']
EMAILS=['user@example.com','bad-email','','a@b','x'*80+'@t.com','test@okai.tw']
async def act(pg,u,rng,mobile):
  a=rng.choice(['home','search','cat','course','preview','cart','checkout','wish','login','blog','faq','contact','quiz','theme','monkey','monkey','monkey','path','bundle','teach','enterprise','my','back','notebook','chat'])
  STATS['actions']+=1
  try:
    if a=='home': await pg.goto(B+'index.html'); 
    elif a=='search':
      q=rng.choice(SEARCH); await pg.goto(B+'search.html?q='+q)
    elif a=='cat': await pg.goto(B+'category.html?cat='+rng.choice(['ai','drawing','design','video','creative','career','baking','game','finance','beauty','nope']))
    elif a=='course': await pg.goto(B+'course.html?id='+rng.choice(['c03','c47','c05','c01','c02','c06','c04','c08','c11','c09','c38','c41','c31','c999']))
    elif a=='preview':
      await pg.goto(B+'player.html?id='+rng.choice(['c03','c47','c31','c38']))
      await pg.wait_for_timeout(500)
      n=await pg.locator('.plr-ls:visible').count()
      if n: await pg.locator('.plr-ls:visible').nth(rng.randrange(n)).click(timeout=3000)
      await pg.wait_for_timeout(300)
      if await pg.locator('.plr-lock').count(): 
        if rng.random()<.5: await pg.click('.plr-lock [data-close]',timeout=2000)
        else: await pg.click('.plr-lock [data-enroll]',timeout=2000)
    elif a=='cart':
      await pg.goto(B+'course.html?id='+rng.choice(['c03','c47','c05']))
      b=pg.locator('button:has-text("加入購物車"):visible').first
      if await b.count(): await b.click(timeout=3000)
      await pg.goto(B+'cart.html')
      rm=pg.locator('button:has-text("移除"):visible')
      if rng.random()<.3 and await rm.count(): await rm.first.click(timeout=3000)
    elif a=='checkout':
      await pg.goto(B+'checkout.html'); await pg.wait_for_timeout(400)
      if await pg.locator('#ckName').count():
        await pg.fill('#ckName',rng.choice(NAMES)); await pg.fill('#ckEmail',rng.choice(EMAILS))
        if await pg.locator('#ckPhone').count(): await pg.fill('#ckPhone',rng.choice(['0912345678','123','','abc']))
        if rng.random()<.6: await pg.check('#ckAgree')
        if rng.random()<.3: await pg.click('label.ck-pay-option:has([value=company])'); await pg.fill('#ckTaxId',rng.choice(['12345678','1234','abcdefgh']))
        await pg.click('#ckSubmit',timeout=3000)
    elif a=='wish':
      await pg.goto(B+'course.html?id='+rng.choice(['c03','c47']))
      f=pg.locator('button:has-text("收藏"):visible').first
      if await f.count(): await f.click(timeout=3000)
      await pg.goto(B+'wishlist.html')
    elif a=='login':
      await pg.goto(B+'login.html'); await pg.wait_for_timeout(300)
      ins=pg.locator('main input:visible'); n=await ins.count()
      for i in range(n):
        t=await ins.nth(i).get_attribute("type") or "text"
        if t in ("checkbox","radio"): continue
        await ins.nth(i).fill(rng.choice(EMAILS) if t=='email' else rng.choice(['123','password123','',rng.choice(NAMES)]))
      g=pg.locator('#login-go'); 
      if await g.count(): await g.click(timeout=3000)
    elif a=='blog':
      await pg.goto(B+'blog.html'); await pg.wait_for_timeout(300)
      l=pg.locator('a[href*="article.html"]:visible'); n=await l.count()
      if n: await l.nth(rng.randrange(n)).click(timeout=3000)
    elif a=='faq':
      await pg.goto(B+'faq.html'); b=pg.locator('.qa button:visible'); n=await b.count()
      if n: await b.nth(rng.randrange(n)).click(timeout=3000)
    elif a=='contact': await pg.goto(B+'contact.html')
    elif a=='quiz':
      await pg.goto(B+'quiz.html'); await pg.wait_for_timeout(300)
      for _ in range(3):
        o=pg.locator('main button:visible'); n=await o.count()
        if n: await o.nth(rng.randrange(n)).click(timeout=2000); await pg.wait_for_timeout(150)
    elif a=='theme':
      t=pg.locator('.theme-toggle:visible').first
      if await t.count(): await t.click(timeout=2000)
    elif a=='path': await pg.goto(B+'path.html?id='+rng.choice(['p1','p2','p3','x']))
    elif a=='bundle': await pg.goto(B+'bundle.html')
    elif a=='teach': await pg.goto(B+'teach.html')
    elif a=='enterprise': await pg.goto(B+'enterprise.html')
    elif a=='my': await pg.goto(B+rng.choice(['my.html','order-history.html','certificate.html','settings.html','achievement.html']))
    elif a=='notebook': await pg.goto(B+'notebook.html')
    elif a=='back': await pg.go_back()
    elif a=='chat':
      f=pg.locator('.cw-fab:visible')
      if await f.count():
        await f.click(timeout=2000); inp=pg.locator('.cw-panel input:visible, .cw-panel textarea:visible')
        if await inp.count(): await inp.first.fill(rng.choice(['價格','退費','怎麼報名','hello'])); await pg.keyboard.press('Enter')
    elif a=='monkey':
      els=pg.locator('a:visible, button:visible'); n=await els.count()
      if n:
        el=els.nth(rng.randrange(n)); href=(await el.get_attribute('href')) or ''
        if not href.startswith(('mailto:','http','tel:')): await el.click(timeout=2500,no_wait_after=True)
    await pg.wait_for_timeout(rng.randint(250,600))
    # 檢查狀態
    st=await pg.evaluate("""(()=>{const m=document.querySelector('main');const t=(m?m.innerText:document.body.innerText)||'';return {len:t.trim().length, und:/undefined|NaN|\\[object Object\\]/.test(document.body.innerText), ov:document.documentElement.scrollWidth>innerWidth+2, url:location.href}})()""")
    if st['len']<25 and 'mailto' not in st['url'] and 'about:blank' not in st['url']: issue(u,'空白頁',f'動作 {a} 之後主要內容幾乎是空的',st['url'])
    if st['und']: issue(u,'顯示錯誤',f'動作 {a} 之後頁面出現 undefined/NaN',st['url'])
    if st['ov']: issue(u,'版面溢出',f'動作 {a} 之後頁面橫向溢出（{"手機" if mobile else "電腦"}）',st['url'])
  except Exception as e:
    msg=str(e).split('\n')[0]
    if 'Timeout' in msg or 'not visible' in msg or 'intercept' in msg: issue(u,'操作卡住',f'動作 {a}：{msg[:120]}',pg.url)
    elif 'Target page' in msg or 'closed' in msg: pass
    else: issue(u,'操作失敗',f'動作 {a}：{msg[:120]}',pg.url)
async def user(b,u,sem):
  async with sem:
    rng=random.Random(u*7919)
    mobile=rng.random()<.5
    ctx=await b.new_context(viewport={'width':390,'height':844} if mobile else {'width':rng.choice([1280,1366,1440,1920]),'height':900}, is_mobile=mobile, has_touch=mobile)
    ctx.set_default_timeout(5000); ctx.set_default_navigation_timeout(20000)
    pg=await ctx.new_page()
    pg.on('pageerror',lambda e: issue(u,'程式錯誤',str(e)[:60]+' @ '+((e.stack or '').split(chr(10))[1].strip() if e.stack and len(e.stack.split(chr(10)))>1 else ''),pg.url))
    pg.on('dialog',lambda d: (issue(u,'跳出對話框',d.message[:80],pg.url), asyncio.ensure_future(d.dismiss())))
    pg.on('response',lambda r: issue(u,'資源錯誤',f'{r.status} {r.url.replace(B,"")[:80]}',pg.url) if r.status>=400 and r.url.startswith(B) and 'favicon' not in r.url else None)
    async def blk(route): await route.abort()
    await ctx.route(re.compile(r'^(?!http://127\.0\.0\.1).*'), blk)
    try:
      try: await pg.goto(B+rng.choice(['index.html','course.html?id=c47','blog.html','category.html']))
      except Exception as e: issue(u,'開頁逾時',str(e).split(chr(10))[0][:100],'')
      for _ in range(rng.randint(10,15)): await act(pg,u,rng,mobile)
    finally:
      try: await ctx.close()
      except Exception: pass
      STATS['users']+=1
async def main():
  t=time.time()
  async with async_playwright() as p:
    b=await p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox','--autoplay-policy=no-user-gesture-required','--mute-audio'])
    sem=asyncio.Semaphore(4)
    await asyncio.gather(*[user(b,u,sem) for u in range(1,int(__import__("os").environ.get("N","101")))])
    await b.close()
  json.dump(ISSUES,open('/tmp/monkey.json','w'),ensure_ascii=False)
  from collections import Counter
  print('使用者',STATS['users'],'動作',STATS['actions'],'耗時',int(time.time()-t),'秒','問題',len(ISSUES))
  c=Counter((i['kind'],re.sub(r'\d+','#',i['detail'])[:90]) for i in ISSUES)
  for (k,d),n in c.most_common(40): print(n,k,d)
asyncio.run(main())
