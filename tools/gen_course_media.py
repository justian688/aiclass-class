# 產生新課程的封面（webp/jpg）、卡片預覽影片（v<id>.mp4）與每個單元的示意影片
# 用法：python3 tools/gen_course_media.py c101 c102 ...（不帶參數＝tools/new_courses.py 全部）
import os, sys, math, random, subprocess, tempfile
from concurrent.futures import ThreadPoolExecutor
from PIL import Image, ImageDraw, ImageFont, ImageFilter
sys.path.insert(0, 'tools')
from new_courses import C

FB = '/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc'
FR = '/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc'
F = lambda size, bold=True: ImageFont.truetype(FB if bold else FR, size, index=2)

PAL = {  # 每個大類的配色（左上 → 右下）
    'start': ((59, 130, 246), (124, 92, 255)), 'auto': ((16, 185, 129), (14, 116, 144)),
    'ai': ((99, 102, 241), (15, 23, 42)), 'data': ((14, 165, 233), (30, 58, 138)),
    'drawing': ((236, 72, 153), (91, 33, 182)), 'design': ((245, 158, 11), (220, 38, 38)),
    'video': ((239, 68, 68), (88, 28, 135)), 'creative': ((139, 92, 246), (219, 39, 119)),
    'career': ((249, 115, 22), (190, 24, 93)), 'baking': ((20, 184, 166), (6, 78, 59)),
    'biz': ((71, 85, 105), (15, 23, 42)), 'finance': ((202, 138, 4), (21, 128, 61)),
    'game': ((168, 85, 247), (30, 27, 75)), 'beauty': ((34, 197, 94), (13, 148, 136)),
}
KEY = {'c101': 'ChatGPT', 'c102': 'Claude', 'c103': 'Prompt', 'c104': 'Slides', 'c105': 'n8n', 'c106': 'AI Agent',
       'c107': 'LINE Bot', 'c108': 'Make · Zapier', 'c109': 'Vibe Coding', 'c110': 'MCP', 'c111': 'Data', 'c112': 'Excel',
       'c113': 'Power BI', 'c114': 'ComfyUI', 'c115': 'Product', 'c116': 'Canva', 'c117': 'Social', 'c118': 'AI Edit',
       'c119': 'Avatar', 'c120': 'Shorts', 'c121': 'Voice', 'c122': 'Copy', 'c123': 'SEO', 'c124': 'Ads',
       'c125': '房仲 AI', 'c126': '備課 AI', 'c127': 'AI 導入', 'c128': '求職 AI', 'c129': '接案', 'c130': 'English'}

def grad(w, h, c1, c2):
    im = Image.new('RGB', (w, h)); px = im.load()
    for y in range(h):
        for x in range(0, w, 4):
            t = (x / w * 0.6 + y / h * 0.4)
            col = tuple(int(c1[k] * (1 - t) + c2[k] * t) for k in range(3))
            for dx in range(4):
                if x + dx < w: px[x + dx, y] = col
    return im

def cover(c, W=960, H=540):
    c1, c2 = PAL[c['cat']]
    rnd = random.Random(c['id'])
    im = grad(W, H, c1, c2).convert('RGBA')
    # 光暈
    glow = Image.new('RGBA', (W, H), (0, 0, 0, 0)); gd = ImageDraw.Draw(glow)
    for _ in range(3):
        r = rnd.randint(160, 300); x = rnd.randint(W // 2, W); y = rnd.randint(-80, H)
        gd.ellipse((x - r, y - r, x + r, y + r), fill=(255, 255, 255, 46))
    im = Image.alpha_composite(im, glow.filter(ImageFilter.GaussianBlur(60)))
    d = ImageDraw.Draw(im)
    # 點陣
    for gx in range(W - 330, W - 30, 26):
        for gy in range(40, H - 40, 26):
            d.ellipse((gx, gy, gx + 3, gy + 3), fill=(255, 255, 255, 50))
    # 同心圓裝飾
    cx, cy = W - 190, H // 2
    for k, r in enumerate((150, 110, 70)):
        d.ellipse((cx - r, cy - r, cx + r, cy + r), outline=(255, 255, 255, 70 + k * 30), width=3)
    # 星芒
    pts = []
    for k in range(8):
        a = math.pi / 4 * k - math.pi / 2; rr = 34 if k % 2 == 0 else 11
        pts.append((cx + rr * math.cos(a), cy + rr * math.sin(a)))
    d.polygon(pts, fill=(255, 255, 255, 235))
    # 文字
    key = KEY[c['id']]; fs = 104
    while d.textlength(key, font=F(fs)) > 560 and fs > 50: fs -= 4
    d.text((56, 140), key, font=F(fs), fill='white')
    t1 = c['title'].split('：')[0]
    d.text((60, 140 + fs + 46), t1, font=F(34), fill=(255, 255, 255, 235))
    d.rounded_rectangle((56, 56, 56 + 150, 56 + 40), 20, fill=(255, 255, 255, 235))
    d.text((56 + 75, 76), 'OKAI課程網', font=F(19), fill=c2, anchor='mm')
    d.text((60, H - 70), f"{c['hours']} 小時・{len(c['ch'])} 章", font=F(24, False), fill=(255, 255, 255, 210))
    return im.convert('RGB')

def lesson_frame(c, ci, li, W=1280, H=720):
    c1, c2 = PAL[c['cat']]
    im = grad(W, H, c1, (24, 16, 40)).convert('RGBA'); d = ImageDraw.Draw(im)
    d.rounded_rectangle((60, 54, 60 + 196, 54 + 54), 27, fill='white')
    d.text((60 + 98, 81), 'OKAI課程網', font=F(26), fill=c1, anchor='mm')
    d.text((64, 150), c['title'], font=F(28, False), fill=(255, 255, 255, 230))
    ch_t, ls = c['ch'][ci]
    d.text((64, 200), f'第 {ci + 1} 章・{ch_t}', font=F(36), fill='white')
    name = ls[li]; fs = 64
    while d.textlength(f'{ci + 1}-{li + 1}　{name}', font=F(fs)) > W - 140 and fs > 36: fs -= 4
    d.text((64, 290), f'{ci + 1}-{li + 1}　{name}', font=F(fs), fill='white')
    d.rounded_rectangle((60, 556, 60 + 556, 556 + 54), 10, fill=(0, 0, 0, 235))
    d.text((80, 583), '示意影片｜正式課程影片製作中', font=F(28), fill=(255, 214, 74), anchor='lm')
    return im.convert('RGB')

def run(cmd):
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

def make_lesson(args):
    c, ci, li, tmp = args
    png = os.path.join(tmp, f"{c['id']}-{ci}-{li}.png"); lesson_frame(c, ci, li).save(png)
    out = f"assets/video/{c['id']}/{ci + 1}-{li + 1}.mp4"
    run(['ffmpeg', '-y', '-loop', '1', '-framerate', '10', '-i', png, '-f', 'lavfi', '-i', 'anullsrc=r=22050:cl=mono',
         '-f', 'lavfi', '-i', 'color=c=0xFFD64A:s=1280x10:r=10',
         '-filter_complex', "[0:v][2:v]overlay=x='-W+W*t/10':y=H-10:shortest=1[v]", '-map', '[v]', '-map', '1:a', '-t', '10', '-r', '10',
         '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '30', '-pix_fmt', 'yuv420p', '-tune', 'stillimage',
         '-c:a', 'aac', '-b:a', '24k', '-shortest', '-movflags', '+faststart', out])
    os.remove(png)

def main(ids):
    todo = [c for c in C if not ids or c['id'] in ids]
    tmp = tempfile.mkdtemp()
    for c in todo:
        cv = cover(c)
        cv.save(f"assets/img/v{c['id']}.webp", quality=84); cv.save(f"assets/img/v{c['id']}.jpg", quality=84)
        # 卡片預覽：封面慢速放大 8 秒
        src = os.path.join(tmp, c['id'] + '.png'); cv.save(src)
        run(['ffmpeg', '-y', '-loop', '1', '-i', src, '-vf', "scale=1920:-1,zoompan=z='min(zoom+0.0008,1.08)':d=200:s=960x540:fps=25", '-t', '8',
             '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '28', '-pix_fmt', 'yuv420p', '-an', '-movflags', '+faststart', f"assets/video/v{c['id']}.mp4"])
        os.remove(src)
        os.makedirs(f"assets/video/{c['id']}", exist_ok=True)
    jobs = [(c, ci, li, tmp) for c in todo for ci, (_, ls) in enumerate(c['ch']) for li in range(len(ls))]
    with ThreadPoolExecutor(6) as ex:
        list(ex.map(make_lesson, jobs))
    os.rmdir(tmp)
    print('封面', len(todo), '單元影片', len(jobs))

if __name__ == '__main__':
    main(sys.argv[1:])
