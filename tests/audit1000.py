# 全站系統性檢查：所有頁面 × 桌機／手機，輸出每一個問題實例到 /tmp/audit.jsonl
# 用法：先開 tests/range_server.py 8811，再 python3 tests/audit1000.py [輸出檔]
import asyncio, json, os, sys, subprocess
from urllib.parse import quote
from playwright.async_api import async_playwright

B = 'http://localhost:8811/'
OUT = sys.argv[1] if len(sys.argv) > 1 else '/tmp/audit.jsonl'
data = json.loads(subprocess.check_output(['node', '-e', """
global.window={};global.location={search:''};global.localStorage={getItem(){},setItem(){},removeItem(){}};
eval(require('fs').readFileSync('js/data.js','utf8'));
console.log(JSON.stringify({courses:window.COURSES.map(c=>({id:c.id,price:c.price,hours:c.hours,title:c.title,ch:(window.CHAPTERS[c.id]||[]).length,ls:(window.CHAPTERS[c.id]||[]).reduce((n,x)=>n+x.lessons.length,0)})),
cats:window.CATS.slice(1).map(c=>({id:c.id,subs:c.subs})),posts:window.POSTS.map(p=>p.id)}))"""]))
pages = [f for f in sorted(os.listdir('.')) if f.endswith('.html') and f not in ('offline.html',)]
urls = [p for p in pages]
urls += [f'course.html?id={c["id"]}' for c in data['courses']]
urls += [f'player.html?id={c["id"]}' for c in data['courses']]
urls += [f'category.html?cat={c["id"]}' for c in data['cats']]
urls += [f'category.html?cat={c["id"]}&sub={quote(s)}' for c in data['cats'] for s in c['subs']]
urls += [f'article.html?id={p}' for p in data['posts']]
urls += ['search.html?q=AI', 'search.html?q=n8n', 'search.html?q=zzzz', 'instructor.html?name=' + quote('OKAI 講師團隊')]
if os.environ.get('ONLY'): urls = [u for u in urls if any(k in u for k in os.environ['ONLY'].split(','))]
EXIST = set(os.listdir('.'))
CBY = {c['id']: c for c in data['courses']}

CONTRAST = r"""
() => {
 const out=[]; const sel=e=>{ let s=e.tagName.toLowerCase(); if(e.id) s+='#'+e.id; else if(e.className&&typeof e.className==='string') s+='.'+e.className.trim().split(/\s+/).slice(0,2).join('.'); return s; };
 const parse = c => { if(!c) return null; let m; if ((m=c.match(/color\(srgb ([\d.]+) ([\d.]+) ([\d.]+)(?: \/ ([\d.]+))?\)/))) return [m[1]*255,m[2]*255,m[3]*255,m[4]===undefined?1:+m[4]]; m=c.match(/[\d.]+/g); if(!m) return null; const [r,g,b,a=1]=m.map(Number); return [r,g,b,a]; };
 const lum = v => v.slice(0,3).map(x=>{x/=255;return x<=0.03928?x/12.92:Math.pow((x+0.055)/1.055,2.4)}).reduce((s,x,i)=>s+x*[0.2126,0.7152,0.0722][i],0);
 const hasPseudoBg = n => ['::before','::after'].some(p=>{const c=getComputedStyle(n,p); return c.content!=='none' && (c.backgroundImage!=='none'|| (parse(c.backgroundColor)||[0,0,0,0])[3]>0.05) && (c.position==='absolute'||c.position==='fixed'); });
 function bgAt(e, x, y) {
   const stack = document.elementsFromPoint(x, y); let i = stack.indexOf(e); if (i < 0) return null;
   for (let k = i; k < stack.length; k++) { const n = stack[k]; if (['IMG','VIDEO','CANVAS','SVG','IFRAME'].includes(n.tagName)) return null; const cs = getComputedStyle(n);
     if (cs.backgroundImage !== 'none') return null; if (hasPseudoBg(n) && k>i) return null; if (cs.backdropFilter && cs.backdropFilter!=='none') return null;
     const c = parse(cs.backgroundColor); if (c && c[3] >= 0.95) return c; if (c && c[3] > 0.05) return null; }
   return [255,255,255,1];
 }
 for (const e of document.querySelectorAll('body *')) {
   const r = e.getBoundingClientRect(); if (r.width<1||r.height<1||r.bottom<0||r.top>innerHeight||r.right<0||r.left>innerWidth) continue;
   if (e.checkVisibility && !e.checkVisibility({opacityProperty:true, visibilityProperty:true})) continue;
   if (e.closest('.sr-only,[aria-hidden="true"],[hidden]')) continue;
   const t=[...e.childNodes].filter(n=>n.nodeType===3).map(n=>n.textContent.trim()).join(''); if (t.length<2 || !/[\w\u4e00-\u9fff]/.test(t)) continue;
   const cs=getComputedStyle(e); if (cs.backgroundClip==='text'||cs.webkitTextFillColor==='transparent'||+cs.opacity<1) continue;
   const x=Math.min(innerWidth-1,Math.max(0,r.left+Math.min(r.width/2,20))), y=Math.min(innerHeight-1,Math.max(0,r.top+r.height/2));
   const bg=bgAt(e,x,y); if(!bg) continue; const fg=parse(cs.color); if(!fg||fg[3]<0.5) continue;
   const L1=lum(fg), L2=lum(bg); const ratio=(Math.max(L1,L2)+0.05)/(Math.min(L1,L2)+0.05);
   const big=parseFloat(cs.fontSize)>=24||(parseFloat(cs.fontSize)>=18.6&&+cs.fontWeight>=700);
   if (ratio < (big?3:4.5)) out.push({type:'文字對比不足', sev: ratio<3?'中':'低', detail:`${ratio.toFixed(2)}:1「${t.slice(0,14)}」`, sel: sel(e), key: sel(e)+cs.color});
 }
 return out;
}
"""

JS_CHECK = r"""
(vw) => {
 const out = [];
 const P = (type, sev, detail, el) => out.push({type, sev, detail: String(detail).slice(0, 160), sel: el ? sel(el) : ''});
 function sel(e){ if(!e||!e.tagName) return ''; let s=e.tagName.toLowerCase(); if(e.id) s+='#'+e.id; else if(e.className&&typeof e.className==='string') s+='.'+e.className.trim().split(/\s+/).slice(0,2).join('.'); return s; }
 const vis = e => { const r=e.getBoundingClientRect(); if(!(r.width>0&&r.height>0)) return false; if (e.checkVisibility && !e.checkVisibility({opacityProperty:true, visibilityProperty:true, contentVisibilityAuto:true})) return false; if (e.closest('[hidden],[aria-hidden="true"],.sr-only,.visually-hidden')) return false; const cs=getComputedStyle(e); if (cs.clip==='rect(0px, 0px, 0px, 0px)'||cs.clipPath==='inset(50%)') return false; return true; };
 const W = innerWidth;
 // 1 橫向超出
 if (document.documentElement.scrollWidth > W + 2) P('橫向捲動', '高', `頁面寬 ${document.documentElement.scrollWidth} > 視窗 ${W}`);
 for (const e of document.querySelectorAll('main *, header *, footer *')) { if(!vis(e)) continue; const r=e.getBoundingClientRect(); if (r.right > W + 4 && r.width < W*1.5 && getComputedStyle(e).position!=='fixed' && !e.closest('[class*=track],[class*=carousel],[class*=rail],[class*=scroll],.chips,[class*=marquee],.hero,.tabs,[class*=slider],.rec-carousel') && ![...(function*(n){while(n=n.parentElement) yield n})(e)].some(n=>/(auto|scroll)/.test(getComputedStyle(n).overflowX))) { P('元素超出畫面', '中', `${Math.round(r.right)}px > ${W}px`, e); } }
 // 2 圖片
 for (const im of document.images) { if (!vis(im)) continue; if (im.complete && im.naturalWidth === 0) P('圖片載入失敗', '高', im.getAttribute('src'), im); if (!im.hasAttribute('alt')) P('圖片缺 alt', '低', im.getAttribute('src'), im); }
 // 3 連結
 const ids = new Set([...document.querySelectorAll('[id]')].map(e=>e.id));
 for (const a of document.querySelectorAll('a')) { if(!vis(a)) continue; const h=a.getAttribute('href');
   if (h===null || h==='' ) P('連結沒有網址', '中', a.textContent.trim().slice(0,30), a);
   else if (h==='#' ) P('連結指向 #', '中', a.textContent.trim().slice(0,30), a);
   else if (h.startsWith('#') && h.length>1 && !ids.has(decodeURIComponent(h.slice(1))) && !/^#cat-|^#sheet/.test(h)) P('錨點目標不存在', '中', h, a);
   if (!a.textContent.trim() && !a.querySelector('img[alt]:not([alt=""]),svg[aria-label]') && !a.getAttribute('aria-label') && !a.title) P('連結沒有文字', '中', h, a);
 }
 // 4 按鈕與表單
 for (const b of document.querySelectorAll('button,[role=button]')) { if(!vis(b)) continue; if(!b.textContent.trim() && !b.getAttribute('aria-label') && !b.title) P('按鈕沒有名稱', '中', b.outerHTML.slice(0,80), b); }
 for (const i of document.querySelectorAll('input:not([type=hidden]):not([type=checkbox]):not([type=radio]),select,textarea')) { if(!vis(i)) continue; const lab = i.id && document.querySelector(`label[for="${CSS.escape(i.id)}"]`); if(!lab && !i.closest('label') && !i.getAttribute('aria-label') && !i.getAttribute('aria-labelledby') && !i.title) P('輸入欄沒有標籤', '中', i.name||i.placeholder||i.type, i); }
 // 5 重複 id
 const seen = {}; for (const e of document.querySelectorAll('[id]')) seen[e.id]=(seen[e.id]||0)+1; for (const [k,v] of Object.entries(seen)) if (v>1) P('重複 id', '低', `${k} ×${v}`);
 // 6 點擊區太小（手機）
 if (W < 500) for (const e of document.querySelectorAll('a,button,input[type=checkbox],input[type=radio],select,[role=button]')) { if(!vis(e)) continue; const r=e.getBoundingClientRect(); if (r.top>innerHeight*4) continue; if ((r.width<24||r.height<24) && !e.closest('p,li>p,.art-body,.prose') ) P('點擊區太小', '低', `${Math.round(r.width)}×${Math.round(r.height)} ${e.textContent.trim().slice(0,15)}`, e); }
 // 7 文字太小
 if (W < 500) { const done=new Set(); for (const e of document.querySelectorAll('main *')) { if(!vis(e)||!e.childNodes.length) continue; const t=[...e.childNodes].filter(n=>n.nodeType===3).map(n=>n.textContent.trim()).join(''); if(!t) continue; const fs=parseFloat(getComputedStyle(e).fontSize); if (fs<11 && !done.has(e.className)) { done.add(e.className); P('手機文字太小', '低', `${fs}px「${t.slice(0,12)}」`, e); } } }
 // 8 對比：在捲動過程中另外檢查（contrastPass）
 // 9 異常文字
 const body = document.body.innerText;
 for (const bad of ['undefined','NaN','[object Object]','null 堂','${','Infinity']) { const i=body.indexOf(bad); if (i>=0) P('畫面出現異常文字', '高', `${bad}：…${body.slice(Math.max(0,i-12),i+18).replace(/\s+/g,' ')}…`); }
 // 10 SEO
 if (!document.title || document.title.length<8) P('標題太短', '中', document.title);
 if (document.title.length>65) P('標題太長', '低', document.title.length+' 字：'+document.title);
 const md=document.querySelector('meta[name=description]'); if(!md||!md.content||md.content.length<40) P('缺少或過短的描述', '中', md?md.content:'無');
 if (!document.querySelector('link[rel=canonical]')) P('缺少 canonical', '低', location.pathname);
 const h1=[...document.querySelectorAll('h1')].filter(h=>getComputedStyle(h).display!=='none'&&!h.closest('[hidden]')); if (h1.length!==1) P('H1 數量不是 1', '低', `${h1.length} 個`);
 if (!document.documentElement.lang) P('缺少 lang', '低', '');
 for (const h of document.querySelectorAll('h1,h2,h3')) if (vis(h) && !h.textContent.trim()) P('空白標題', '中', h.outerHTML.slice(0,60), h);
 // 11 空白區塊
 const main=document.querySelector('main'); if (main && main.innerText.trim().length<40 && !/player|offline|404/.test(location.pathname)) P('主要內容幾乎空白', '高', main.innerText.trim().slice(0,40));
 return out;
}
"""

async def audit_one(ctx, url, vp, out, label=''):
    pg = await ctx.new_page(); errs = []; bad = []
    pg.on('pageerror', lambda e: errs.append(str(e)[:150]))
    pg.on('console', lambda m: errs.append('console: ' + m.text[:150]) if m.type == 'error' and 'Failed to load resource' not in m.text else None)
    pg.on('response', lambda r: bad.append(f'{r.status} {r.url.replace(B, "/")}') if r.status >= 400 and r.url.startswith(B) else None)
    try:
        await pg.goto(B + url, wait_until='load', timeout=20000); await pg.wait_for_timeout(700)
        h = await pg.evaluate('document.documentElement.scrollHeight')
        cres = {}
        for y in range(0, min(h, 9000), 700):
            await pg.evaluate(f'scrollTo(0,{y})'); await pg.wait_for_timeout(120)
            for r in await pg.evaluate(CONTRAST): cres.setdefault(r.pop('key'), r)
        await pg.evaluate('scrollTo(0,0)'); await pg.wait_for_timeout(250)
        res = await pg.evaluate(JS_CHECK, vp) + list(cres.values())
        # 資料一致性：課程頁價格、章數
        if url.startswith('course.html?id='):
            c = CBY[url.split('=')[1]]
            txt = await pg.evaluate('document.body.innerText')
            if f'{c["price"]:,}' not in txt: res.append({'type': '課程價格與資料不符', 'sev': '高', 'detail': f'{c["id"]} 應為 {c["price"]:,}', 'sel': ''})
            if f'{c["ch"]} 章' not in txt: res.append({'type': '章節數與資料不符', 'sev': '中', 'detail': f'{c["id"]} 應為 {c["ch"]} 章', 'sel': ''})
        if url.startswith('player.html?id='):
            ok = await pg.evaluate("(()=>{const v=document.getElementById('plr-vid');return v?v.readyState:-1})()")
            if ok < 1: res.append({'type': '播放器影片無法載入', 'sev': '高', 'detail': url, 'sel': '#plr-vid'})
        # 本機連結是否存在
        hrefs = await pg.evaluate("[...document.querySelectorAll('a[href]')].map(a=>a.getAttribute('href'))")
        for hh in set(hrefs):
            if hh.startswith(('http', 'mailto', 'tel', '#', 'javascript', 'data:')): continue
            f = hh.split('?')[0].split('#')[0].lstrip('/')
            if f and f.endswith('.html') and f not in EXIST: res.append({'type': '連結到不存在的頁面', 'sev': '高', 'detail': hh, 'sel': ''})
            if f and not f.endswith('.html') and '.' in f and not os.path.exists(f): res.append({'type': '連結到不存在的檔案', 'sev': '高', 'detail': hh, 'sel': ''})
        for e in errs: res.append({'type': 'JS 錯誤', 'sev': '高', 'detail': e, 'sel': ''})
        for b in set(bad): res.append({'type': '檔案 404', 'sev': '高', 'detail': b, 'sel': ''})
    except Exception as ex:
        res = [{'type': '頁面無法開啟', 'sev': '高', 'detail': str(ex)[:150], 'sel': ''}]
    for r in res:
        r.update(page=url, vp=label or ('手機' if vp < 500 else '桌機')); out.write(json.dumps(r, ensure_ascii=False) + '\n')
    await pg.close()
    return len(res)

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path='/usr/bin/google-chrome')
        with open(OUT, 'w') as out:
            modes = [(1440, '桌機', False), (390, '手機', False), (820, '平板', False), (1440, '深色', True)]
            if os.environ.get('MODES'): modes = [m for m in modes if m[1] in os.environ['MODES'].split(',')]
            for vp, label, dark in modes:
                ctx = await b.new_context(viewport={'width': vp, 'height': 900 if vp > 500 else 844}, is_mobile=vp < 500, has_touch=vp < 900, color_scheme='dark' if dark else 'light')
                await ctx.add_init_script("try{localStorage.setItem('aic-nl-dismiss','1');sessionStorage.setItem('aic-topbar','1');localStorage.setItem('aic-theme', %s)}catch(e){}" % ("JSON.stringify('dark')" if dark else "JSON.stringify('light')"))
                sem = asyncio.Semaphore(4); n = [0]
                async def run(u):
                    async with sem: n[0] += await audit_one(ctx, u, vp, out, label)
                await asyncio.gather(*[run(u) for u in urls])
                print(label, '頁數', len(urls), '問題', n[0], flush=True)
                await ctx.close()
        await b.close()
asyncio.run(main())
