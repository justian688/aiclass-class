# 產生臨時素材：字幕 .vtt、課程講義大綱 PDF、課程分享圖（OG）、講師團隊頭像
# 用法：node 先把 data.js 匯出成 /tmp/assetdata.json，再執行 python3 tools/gen_assets.py
import json, os, math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

D = json.load(open('/tmp/assetdata.json'))
FONT_B = '/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc'
FONT_R = '/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc'
TC = 2  # .ttc 裡的繁中字型索引（TC）
def F(size, bold=True):
    return ImageFont.truetype(FONT_B if bold else FONT_R, size, index=TC)

PRI, PINK = (124, 92, 255), (255, 92, 138)

# ---------- 1. 字幕 ----------
def ts(s):
    return f'00:{int(s)//60:02d}:{s%60:06.3f}'
n_vtt = 0
for cid, chs in D['chapters'].items():
    for ci, ch in enumerate(chs):
        for li, name in enumerate(ch['lessons']):
            p = f'assets/video/{cid}/{ci+1}-{li+1}.vtt'
            if not os.path.isdir(os.path.dirname(p)):
                continue
            cues = [(0, 3.4, f'第 {ci+1} 章・{ch["title"]}'),
                     (3.4, 6.8, f'{ci+1}-{li+1}　{name}'),
                     (6.8, 10, '示意影片｜正式課程影片與字幕製作中')]
            body = 'WEBVTT\n\n' + '\n\n'.join(f'{i+1}\n{ts(a)} --> {ts(b)}\n{t}' for i, (a, b, t) in enumerate(cues)) + '\n'
            open(p, 'w', encoding='utf-8').write(body)
            n_vtt += 1
print('vtt', n_vtt)

# ---------- 2. 分享圖（1200x630） ----------
os.makedirs('assets/og', exist_ok=True)
def wrap(draw, text, font, width):
    lines, cur = [], ''
    for ch in text:
        if draw.textlength(cur + ch, font=font) > width:
            lines.append(cur); cur = ch
        else:
            cur += ch
    if cur: lines.append(cur)
    return lines
def og(c):
    W, H = 1200, 630
    im = Image.new('RGB', (W, H), (18, 12, 36))
    try:
        cov = Image.open(c['img']).convert('RGB')
        r = max(W / cov.width, H / cov.height)
        cov = cov.resize((int(cov.width * r) + 1, int(cov.height * r) + 1)).crop((0, 0, W, H))
        im.paste(cov)
    except Exception:
        pass
    # 左側深色漸層，讓文字清楚
    ov = Image.new('L', (W, H))
    od = ImageDraw.Draw(ov)
    for x in range(W):
        od.line([(x, 0), (x, H)], fill=int(235 * max(0, 1 - x / (W * 0.85))))
    im = Image.composite(Image.new('RGB', (W, H), (16, 10, 32)), im, ov)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle((64, 60, 64 + 210, 60 + 52), 26, fill=PRI)
    d.text((64 + 105, 86), 'OKAI課程網', font=F(26), fill='white', anchor='mm')
    t1, _, t2 = c['title'].partition('：')
    y = 170
    for line in wrap(d, t1, F(64), 760)[:2]:
        d.text((64, y), line, font=F(64), fill='white'); y += 82
    for line in wrap(d, t2, F(34, False), 760)[:2]:
        d.text((64, y + 6), line, font=F(34, False), fill=(225, 220, 245)); y += 48
    nch = len(D['chapters'].get(c['id'], []))
    nls = sum(len(x['lessons']) for x in D['chapters'].get(c['id'], []))
    meta = f'{nch} 章・{nls} 單元・{c["hours"]} 小時・可免費試看'
    d.text((64, H - 92), meta, font=F(28, False), fill=(200, 190, 235))
    d.rounded_rectangle((64, H - 44, 64 + 120, H - 38), 3, fill=PINK)
    im.save(f'assets/og/{c["id"]}.jpg', quality=86, optimize=True)
for c in D['courses']:
    og(c)
print('og', len(D['courses']))

# ---------- 3. 講師團隊頭像（品牌插畫，非真人） ----------
def avatar(size=512):
    S = size * 2
    im = Image.new('RGBA', (S, S), (0, 0, 0, 0))
    g = Image.new('RGBA', (S, S))
    gd = ImageDraw.Draw(g)
    for y in range(S):
        t = y / S
        gd.line([(0, y), (S, y)], fill=tuple(int(PRI[k] * (1 - t) + PINK[k] * t) for k in range(3)) + (255,))
    mask = Image.new('L', (S, S)); ImageDraw.Draw(mask).ellipse((0, 0, S, S), fill=255)
    im.paste(g, (0, 0), mask)
    d = ImageDraw.Draw(im)
    # 抽象人形：頭＋肩
    d.ellipse((S*0.36, S*0.22, S*0.64, S*0.50), fill=(255, 255, 255, 235))
    d.pieslice((S*0.20, S*0.56, S*0.80, S*1.16), 180, 360, fill=(255, 255, 255, 235))
    # 星芒（AI）
    cx, cy, r = S*0.74, S*0.24, S*0.07
    pts = []
    for k in range(8):
        a = math.pi / 4 * k - math.pi / 2
        rr = r if k % 2 == 0 else r * 0.32
        pts.append((cx + rr * math.cos(a), cy + rr * math.sin(a)))
    d.polygon(pts, fill=(255, 255, 255, 255))
    im = im.resize((size, size), Image.LANCZOS)
    return im
os.makedirs('assets/team', exist_ok=True)
avatar().save('assets/team/okai-team.webp', quality=90)
avatar(192).save('assets/team/okai-team-sm.webp', quality=90)
print('avatar ok')

# ---------- 4. 課程講義大綱 PDF（用 Chrome 把 HTML 轉 PDF） ----------
import asyncio, html as H
from playwright.async_api import async_playwright
os.makedirs('assets/handouts', exist_ok=True)
CSS = """@page{size:A4;margin:18mm 16mm 20mm}*{box-sizing:border-box}body{font-family:'Noto Sans CJK TC',sans-serif;color:#1d1d1f;font-size:11pt;line-height:1.6;margin:0}
.cover{height:240mm;display:flex;flex-direction:column;justify-content:center;page-break-after:always}
.tag{display:inline-block;background:linear-gradient(135deg,#7c5cff,#ff5c8a);color:#fff;font-weight:700;padding:4px 14px;border-radius:99px;font-size:10pt;width:max-content}
h1{font-size:24pt;line-height:1.3;margin:14px 0 8px}.desc{color:#55556a;font-size:12pt}
table.meta{margin:18px 0;border-collapse:collapse}table.meta td{padding:3px 16px 3px 0}table.meta td:first-child{font-weight:700;color:#7c5cff}
h2{font-size:14pt;margin:20px 0 6px}ul.hl{padding-left:0;list-style:none}ul.hl li:before{content:'✓ ';color:#ff5c8a;font-weight:700}
.ch{page-break-inside:avoid;margin-bottom:16px}.chh{background:#7c5cff;color:#fff;font-weight:700;padding:8px 14px;border-radius:8px;font-size:13pt}
.goal{color:#55556a;font-size:10pt;margin:6px 2px}.ls{display:flex;gap:10px;padding:8px 4px 16px;border-bottom:1px dashed #d8d8e4}.ls b{min-width:34px;color:#7c5cff}
.ex{background:#f4f1ff;border-radius:6px;padding:8px 12px;margin-top:8px;font-size:10pt}.ex b{color:#5a3fd6}
.note{font-size:9pt;color:#8a8a9a;margin-top:24px}"""
def handout_html(c):
    chs = D['chapters'].get(c['id'], []); hl = (D['hl'] or {}).get(c['id'], [])
    nls = sum(len(x['lessons']) for x in chs); e = H.escape
    out = [f"<html><head><meta charset='utf-8'><style>{CSS}</style></head><body><div class='cover'><span class='tag'>OKAI課程網・課程講義大綱</span>",
           f"<h1>{e(c['title'])}</h1><div class='desc'>{e(c.get('desc',''))}</div>",
           f"<table class='meta'><tr><td>講師</td><td>{e(c['teacher'])}</td></tr><tr><td>分類</td><td>{e(c.get('sub',''))}</td></tr><tr><td>內容</td><td>{len(chs)} 章・{nls} 單元・約 {c['hours']} 小時</td></tr><tr><td>版本</td><td>暫定版 v0.1（2026/11）・正式講義將隨課程影片更新</td></tr></table>"]
    if hl: out.append("<h2>學完你會</h2><ul class='hl'>" + ''.join(f'<li>{e(h)}</li>' for h in hl) + '</ul>')
    out.append("<h2>怎麼使用這份講義</h2><ol><li>上課前先看本章的「學習目標」，知道這一章要做出什麼。</li><li>看影片時，在每個單元下方的虛線處記下關鍵步驟。</li><li>每章結束完成「本章練習」，再進下一章。</li></ol></div>")
    for ci, ch in enumerate(chs):
        out.append(f"<div class='ch'><div class='chh'>第 {ci+1} 章　{e(ch['title'])}</div><div class='goal'>學習目標：完成本章後，能說明並實際操作「{e(ch['title'])}」的重點。</div>")
        out.extend(f"<div class='ls'><b>{ci+1}-{li+1}</b><span>{e(n)}</span></div>" for li, n in enumerate(ch['lessons']))
        out.append(f"<div class='ex'><b>本章練習</b>　照著影片操作一次「{e(ch['lessons'][-1])}」，把成果截圖存下來。</div></div>")
    out.append("<div class='note'>OKAI課程網・okaiclass.com・hi@okaiclass.com　本講義為暫定版，內容以實際課程影片為準。</div></body></html>")
    return ''.join(out)
async def make_pdfs():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path='/usr/bin/google-chrome')
        pg = await b.new_page()
        for c in D['courses']:
            await pg.set_content(handout_html(c)); await pg.wait_for_timeout(200)
            await pg.pdf(path=f"assets/handouts/{c['id']}.pdf", format='A4', print_background=True,
                         display_header_footer=True, header_template='<span></span>',
                         footer_template="<div style='font-size:8px;color:#999;width:100%;text-align:center'>OKAI課程網・第 <span class='pageNumber'></span> / <span class='totalPages'></span> 頁</div>")
        await b.close()
asyncio.run(make_pdfs())
print('pdf', len(D['courses']))
