import asyncio, json, re, glob, os
from playwright.async_api import async_playwright
B='http://127.0.0.1:8811/'
pages=sorted([os.path.basename(p) for p in glob.glob('/home/claude/aiclass-class/*.html')])
extra=['course.html?id=c47','article.html?id=p30','path.html?id=p1','player.html?id=c03','instructor.html','category.html?cat=drawing','search.html?q=AI']
pages=[p for p in pages if p not in ('course.html','article.html','path.html','player.html')]+extra
JS=r"""
()=>{
 const I=[]; const add=(t,d)=>I.push([t,d]);
 const vw=innerWidth;
 if(document.documentElement.scrollWidth>vw+2) add('版面','頁面橫向溢出 '+document.documentElement.scrollWidth+'px > '+vw);
 const txt=document.body.innerText;
 const bad=[['undefined','顯示 undefined'],['NaN','顯示 NaN'],['null','顯示 null'],['示範','含「示範」字樣'],['即將開放','有「即將開放」的未完成功能'],['開發中','含「開發中」'],['Lorem','假文字 Lorem'],['XXX','XXX 佔位字'],['60,000','假學員數'],['人正在','假即時人數'],['超高評價','假評價'],['學員好評','假好評'],['已售出','假銷量'],['限時','限時字樣'],['倒數','倒數字樣'],['折扣','折扣字樣'],['原價','原價字樣'],['★','星等符號'],['萬名','萬名學員字樣'],['獨家','獨家字樣'],['業界唯一','業界唯一字樣'],['保證','保證字樣'],['TODO','TODO']];
 for(const [k,d] of bad){ if(txt.includes(k)) { const i=txt.indexOf(k); add('內容',d+'：「'+txt.slice(Math.max(0,i-18),i+18).replace(/\s+/g,' ')+'」'); } }
 document.querySelectorAll('img').forEach(im=>{ if(!im.getAttribute('alt')) add('無障礙','圖片缺 alt：'+(im.getAttribute('src')||'').slice(-40)); if(im.complete&&im.naturalWidth===0&&im.getAttribute('src')) add('資源','圖片載入失敗：'+im.getAttribute('src')); });
 document.querySelectorAll('a').forEach(a=>{ const h=a.getAttribute('href'); if(h===null||h===''||h==='#') add('連結','空連結：「'+a.innerText.trim().slice(0,20)+'」'); });
 document.querySelectorAll('button,a,[role=button],input,select,textarea').forEach(el=>{ const r=el.getBoundingClientRect(); if(r.width===0||getComputedStyle(el).visibility==='hidden') return; const name=(el.innerText||el.getAttribute('aria-label')||el.getAttribute('title')||el.getAttribute('placeholder')||el.value||'').trim(); if(!name && el.tagName!=='INPUT') add('無障礙',el.tagName+' 沒有可讀名稱 class='+el.className.toString().slice(0,30)); if(vw<500 && (el.tagName==='BUTTON'||el.tagName==='A') && r.width>0 && (r.height<32||r.width<32) && r.top<document.documentElement.scrollHeight) { if(name) add('手機','點擊區太小('+Math.round(r.width)+'x'+Math.round(r.height)+')：'+name.slice(0,15)); } });
 document.querySelectorAll('button').forEach(b=>{ const oc=b.getAttribute('onclick')||''; if(/toast\(/.test(oc) && !/location|cart|ss\(/.test(oc)) add('功能','按鈕只跳提示沒實際功能：「'+(b.innerText||'').trim().slice(0,20)+'」→ '+oc.slice(6,50)); });
 const hs=[...document.querySelectorAll('h1')]; if(hs.length===0) add('SEO','沒有 H1'); if(hs.length>1) add('SEO','有 '+hs.length+' 個 H1');
 const md=document.querySelector('meta[name=description]'); const d=md?md.content:''; if(d.length<50) add('SEO','meta 描述太短('+d.length+'字)'); if(d.length>160) add('SEO','meta 描述太長('+d.length+'字)');
 if(document.title.length<10) add('SEO','標題太短：'+document.title);
 if(!document.querySelector('link[rel=canonical]')) add('SEO','缺 canonical');
 // contrast quick check on text nodes
 const lum=c=>{const m=c.match(/[\d.]+/g); if(!m) return null; const [r,g,b]=m.slice(0,3).map(v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)}); return {L:.2126*r+.7152*g+.0722*b, a:m[3]===undefined?1:+m[3]};};
 const bgOf=el=>{while(el){const c=getComputedStyle(el).backgroundColor; const l=lum(c); if(l&&l.a>0.9) return l.L; if(getComputedStyle(el).backgroundImage!=='none') return null; el=el.parentElement;} return 1;};
 let low=0; const seen=new Set();
 document.querySelectorAll('p,span,a,li,h1,h2,h3,h4,label,button,small,b,div').forEach(el=>{ if(!el.childNodes.length) return; const own=[...el.childNodes].some(n=>n.nodeType===3&&n.textContent.trim().length>1); if(!own) return; const r=el.getBoundingClientRect(); if(r.width===0||r.height===0) return; const cs=getComputedStyle(el); if(cs.visibility==='hidden'||+cs.opacity<.5) return; const f=lum(cs.color); if(!f) return; const bg=bgOf(el); if(bg===null) return; const L1=Math.max(f.L,bg),L2=Math.min(f.L,bg); const ratio=(L1+.05)/(L2+.05); const sz=parseFloat(cs.fontSize); if(ratio<(sz>=18?3:4.5)){ const t=[...el.childNodes].filter(n=>n.nodeType===3).map(n=>n.textContent.trim()).join('').slice(0,18); if(!seen.has(t)){seen.add(t); low++; if(low<=6) add('對比','文字對比不足('+ratio.toFixed(1)+')：'+t);} } });
 if(low>6) add('對比','另有 '+(low-6)+' 處文字對比不足');
 return I;
}
"""
async def m():
  res=[]; errs={}; bad={}
  async with async_playwright() as p:
    b=await p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    for vp,tag in [((1366,860),'電腦'),((390,844),'手機')]:
      ctx=await b.new_context(viewport={'width':vp[0],'height':vp[1]})
      pg=await ctx.new_page()
      cur={'u':''}
      pg.on('pageerror',lambda e: errs.setdefault(cur['u'],[]).append(str(e)[:120]))
      pg.on('console',lambda m: errs.setdefault(cur['u'],[]).append('console:'+m.text[:120]) if m.type=='error' else None)
      pg.on('response',lambda r: bad.setdefault(cur['u'],[]).append(f'{r.status} {r.url[-60:]}') if r.status>=400 and '127.0.0.1' in r.url else None)
      for u in pages:
        cur['u']=f'{tag}|{u}'
        try:
          await pg.goto(B+u,wait_until='load',timeout=20000); await pg.wait_for_timeout(900)
          await pg.evaluate("window.scrollTo(0,document.body.scrollHeight)"); await pg.wait_for_timeout(500); await pg.evaluate("window.scrollTo(0,0)"); await pg.wait_for_timeout(200)
          for t,d in await pg.evaluate(JS): res.append((tag,u,t,d))
        except Exception as e: res.append((tag,u,'錯誤','頁面載入失敗 '+str(e)[:80]))
      await ctx.close()
    await b.close()
  for k,v in errs.items():
    t,u=k.split('|',1)
    for e in sorted(set(v)): res.append((t,u,'程式錯誤',e))
  for k,v in bad.items():
    t,u=k.split('|',1)
    for e in sorted(set(v)): res.append((t,u,'資源','載入失敗 '+e))
  # dedupe
  out=[]; s=set()
  for r in res:
    if r in s: continue
    s.add(r); out.append(r)
  json.dump(out,open('/tmp/audit.json','w'),ensure_ascii=False)
  from collections import Counter
  print('總問題數',len(out)); print(Counter(r[2] for r in out).most_common())
asyncio.run(m())
