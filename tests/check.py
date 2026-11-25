import asyncio,glob,sys,re,json
from playwright.async_api import async_playwright
async def main():
    pages=sorted(glob.glob('/home/claude/aiclass-class/*.html'))
    out={}
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
        for f in pages:
            n=f.split('/')[-1]; pg=await b.new_page(); errs=[]
            pg.on('pageerror',lambda e,errs=errs:errs.append(str(e)[:120]))
            try:
                await pg.goto('http://127.0.0.1:8811/'+n+('?id=c03' if n in('course.html','player.html') else ''),wait_until='load',timeout=30000)
                await pg.wait_for_timeout(800)
                txt=await pg.inner_text('body')
                h1=await pg.evaluate("document.querySelectorAll('h1').length")
            except Exception as e: errs.append('LOAD '+str(e)[:80]); txt='';h1=0
            out[n]={'err':errs,'stars':len(re.findall('★',txt)),'stu':len(re.findall(r'[\d,.]+K? ?(位)?學員',txt)),'h1':h1,'len':len(txt)}
            await pg.close()
        await b.close()
    json.dump(out,open(sys.argv[1],'w'),ensure_ascii=False)
    bad={k:v['err'] for k,v in out.items() if v['err']}
    print('pages',len(out),'with errors',len(bad)); print(json.dumps(bad,ensure_ascii=False)[:1500])
    print('stars total',sum(v['stars'] for v in out.values()),'student mentions',sum(v['stu'] for v in out.values()),'pages no h1',[k for k,v in out.items() if not v['h1']])
asyncio.run(main())
