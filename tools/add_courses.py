# 把 tools/new_courses.py 的課程寫進 js/data.js（放在單元影片自動補齊之前）
import json, sys
sys.path.insert(0, 'tools')
from new_courses import C
p = 'js/data.js'; s = open(p).read()
START, END = '/* ===== 2026/11 新增課程（tools/new_courses.py 產生） ===== */', '/* ===== 新增課程結束 ===== */'
if START in s:
    a = s.index(START); b = s.index(END) + len(END) + 1
    s = s[:a] + s[b:]
J = lambda o: json.dumps(o, ensure_ascii=False)
courses, chapters, hl, faq = [], {}, {}, {}
for c in C:
    courses.append(dict(id=c['id'], v=c['id'], cat=c['cat'], sub=c['sub'], title=c['title'], teacher='OKAI 講師團隊', role='OKAI課程網 專業講師',
                        price=c['price'], origin=c['price'], rating=0, students=0, tag=c['tag'], hours=c['hours'], desc=c['desc'], ai=c['ai']))
    per = round(c['hours'] * 60 / len(c['ch']))
    chapters[c['id']] = [dict(ch=i + 1, title=t, lessons=ls, duration=per) for i, (t, ls) in enumerate(c['ch'])]
    hl[c['id']] = c['hl']; faq[c['id']] = c['faq']
block = f"""{START}
window.COURSES.push(...{J(courses)});
Object.assign(window.CHAPTERS, {J(chapters)});
Object.assign(window.COURSE_HIGHLIGHTS, {J(hl)});
Object.assign(window.COURSE_FAQS, {J(faq)});
{END}
"""
anchor = '/* 每個單元的影片與時長'
assert s.count(anchor) == 1
s = s.replace(anchor, block + '\n' + anchor)
open(p, 'w').write(s)
print('寫入', len(courses), '門課')
