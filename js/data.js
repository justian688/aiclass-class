// AI Class 課程資料
window.CATS = [
  { id: 'all', name: '全部課程' },
  { id: 'drawing', name: '繪畫', subs: ['角色', '漫畫/Webtoon', '人體/動態素描', '背景', '概念設計', '手繪', 'iPad 繪畫', '插畫變現'] },
  { id: 'video', name: '影像/動畫', subs: ['影片製作', '2D', '3D', 'VTuber 製作', 'CG/VFX', 'Blender', '動畫'] },
  { id: 'game', name: '遊戲製作', subs: ['角色製作', '場景製作', '動畫/特效', '企劃/設計', '遊戲程式', '像素藝術'] },
  { id: 'baking', name: '烘焙/料理', subs: ['西點', '麵包', '咖啡輕食', '料理', '餐飲創業', '食譜', '中式糕點'] },
  { id: 'design', name: '設計', subs: ['平面設計', '品牌設計', 'UX/UI', '網頁/前端', '建築', '產品設計'] },
  { id: 'ai', name: 'AI/科技', subs: ['AI 影像設計', 'AI 設計', 'AI 遊戲製作', 'AI 變現', 'AI 生產力', 'AI 訓練營', 'AI 技術', '程式開發'] },
  { id: 'creative', name: '創作/生活', subs: ['寫作', '網路小說', '作曲/音樂', '花藝設計', '攝影', '生活風格', '室內設計', '電競', '元宇宙', '工藝'] },
  { id: 'beauty', name: '美髮/美容', subs: ['美髮', '美甲', '美容', '寵物美容', '運動健身', '美容 1DAY', '美髮 1DAY'] },
  { id: 'finance', name: '副業/理財', subs: ['副業', '理財投資'] },
  { id: 'career', name: '創業/職涯', subs: ['創業/電商經營', '內容/行銷', '商業/IT'] }
];

window.COURSES = [
  // ── 設計 ──
  { id: 'c01', v: '50598', cat: 'design', sub: '品牌設計', title: '品牌字體設計：從草圖到完整字型系統', teacher: '林予安', role: '字體設計師・前品牌顧問', price: 4980, origin: 8900, rating: 4.9, students: 3820, tag: 'BEST', hours: 18, desc: '從手繪開始，到 Glyphs 建立一套完整的品牌字型，涵蓋中英文配字、排版測試與授權設定。', ai: '18 小時帶你從手繪草圖到完成一套中英品牌字型系統' },
  { id: 'c02', v: '13228', cat: 'design', sub: 'UX/UI', title: 'UI/UX 實戰：用 Figma 打造上線等級的 App 介面', teacher: '陳柏睿', role: '資深產品設計師', price: 5280, origin: 9600, rating: 4.8, students: 5210, tag: 'HOT', hours: 22, desc: '元件系統、Auto Layout、Prototype 到 Dev Mode 交付，完整走過一個 App 的設計流程。', ai: '完整走過一個 App 的 UI/UX 設計流程，從元件到交付' },
  { id: 'c19', v: '14540', cat: 'design', sub: '網頁/前端', title: '網頁設計全攻略：響應式佈局與視覺系統', teacher: '蘇敏慧', role: '網頁設計總監', price: 4680, origin: 8400, rating: 4.8, students: 3190, tag: 'NEW', hours: 20, desc: '從 wireframe 到高保真稿，建立一套可交付的響應式網頁設計系統。' },
  { id: 'c20', v: '9757', cat: 'design', sub: 'UX/UI', title: '設計思考工作坊：從用戶研究到原型驗證', teacher: '方翊倫', role: '設計策略顧問', price: 3980, origin: 7200, rating: 4.7, students: 2780, tag: '', hours: 14, desc: '用 Design Thinking 方法論帶你走過需求訪談、定義問題、發想、原型到驗證的完整循環。' },

  // ── 繪畫 ──
  { id: 'c05', v: '785', cat: 'drawing', sub: '角色', title: '數位插畫角色設計：建立你的原創角色宇宙', teacher: '張雨萱', role: '插畫家・角色設計師', price: 4580, origin: 8200, rating: 5.0, students: 4470, tag: 'BEST', hours: 20, desc: '角色設定、配色邏輯、表情變化與姿勢動態，從零到一建立你的原創角色 IP。', ai: '從零建立你的原創角色 IP，學會設定、配色與動態表現' },
  { id: 'c07', v: '2858', cat: 'drawing', sub: '手繪', title: '鉛筆素描基礎：光影、比例與質感的觀察術', teacher: '王思妤', role: '藝術教育工作者', price: 2980, origin: 5400, rating: 4.7, students: 2890, tag: '', hours: 12, desc: '從削鉛筆開始，學會觀察光源方向、掌握人體比例、畫出不同材質的質感表現。' },
  { id: 'c13', v: '30232', cat: 'drawing', sub: '手繪', title: '油畫人物肖像：古典技法與現代筆觸', teacher: '周婉婷', role: '專業畫家', price: 4280, origin: 7600, rating: 4.9, students: 1980, tag: '', hours: 17, desc: '從古典油畫三層法到現代直接畫法，學會畫出有溫度的人物肖像。' },
  { id: 'c14', v: '9339', cat: 'drawing', sub: '概念設計', title: '概念藝術：把想像畫成故事的世界觀設計', teacher: '何俊廷', role: '遊戲概念美術', price: 5180, origin: 9200, rating: 4.9, students: 3540, tag: 'BEST', hours: 24, desc: '從影響圖到最終彩稿，學會設計場景、生物與武器，建立完整的視覺世界觀。' },
  { id: 'c21', v: '32085', cat: 'drawing', sub: '手繪', title: '水彩風景寫生：戶外取景與濕中濕技法', teacher: '曾翠蓮', role: '水彩藝術家', price: 3480, origin: 6200, rating: 4.8, students: 2340, tag: 'NEW', hours: 13, desc: '帶你走出畫室，用水彩捕捉光線、空氣感和遠近層次，10 張完整作品實作。' },
  { id: 'c22', v: '49557', cat: 'drawing', sub: '手繪', title: '西洋書法入門：哥德體到現代花體字', teacher: '鄭雅文', role: '書法藝術家・品牌聯名設計師', price: 2880, origin: 5200, rating: 4.8, students: 1860, tag: '', hours: 10, desc: '從握筆角度、基本筆畫到完整字母，掌握三種經典字體風格。' },

  // ── 影像/動畫 ──
  { id: 'c06', v: '29997', cat: 'video', sub: 'Blender', title: 'Blender 3D 建模：從道具到完整場景', teacher: '許家豪', role: '3D 美術總監', price: 5480, origin: 9800, rating: 4.9, students: 3360, tag: 'HOT', hours: 28, desc: '硬表面建模、雕刻、UV 展開、PBR 材質、HDRI 燈光到最終算圖，一條龍教學。', ai: '28 小時一條龍學完 3D 建模到算圖，做出完整場景作品' },
  { id: 'c12', v: '99786', cat: 'video', sub: '2D', title: '動態設計入門：After Effects 視覺特效', teacher: '楊凱文', role: '動態設計師', price: 4780, origin: 8600, rating: 4.8, students: 2760, tag: 'NEW', hours: 19, desc: '關鍵影格、圖層動畫、表達式入門到粒子特效，做出社群短影音和品牌動態。' },
  { id: 'c15', v: '14540', cat: 'video', sub: 'CG/VFX', title: '電影級 CG 場景：宇宙與星球視覺製作', teacher: '謝昀達', role: 'VFX 合成師', price: 6280, origin: 11200, rating: 4.8, students: 1720, tag: '', hours: 30, desc: '使用 Houdini 與 Nuke 製作太空場景，從建模、特效模擬到合成的完整流程。' },
  { id: 'c23', v: '33853', cat: 'video', sub: '3D', title: 'Cinema 4D 風格化場景：夢幻低多邊形世界', teacher: '許家豪', role: '3D 美術總監', price: 4280, origin: 7800, rating: 4.7, students: 2100, tag: '', hours: 16, desc: '用 C4D 做出 IG 上流行的風格化 3D 插畫場景，從建模到 Octane 渲染。' },

  // ── AI/科技 ──
  { id: 'c03', v: '41654', cat: 'ai', sub: 'AI 技術', title: '生成式 AI 應用開發：打造你的第一個智慧助理', teacher: '黃士誠', role: 'AI 工程師', price: 5980, origin: 10800, rating: 4.9, students: 6120, tag: 'NEW', hours: 26, desc: '從 Prompt Engineering 到 RAG、Function Calling 與部署，做出能真正上線的 AI 助手。', ai: '這堂課會帶你用 3 個月時間，從零到能獨立開發 AI 應用' },
  { id: 'c16', v: '46635', cat: 'ai', sub: '程式開發', title: '零基礎 Python：自動化你的日常工作', teacher: '羅志偉', role: '軟體工程師', price: 3480, origin: 6200, rating: 4.9, students: 7330, tag: 'HOT', hours: 20, desc: '不需要任何程式基礎，從安裝到實作 10 個自動化腳本，省下每天兩小時的重複工作。', ai: '零基礎到寫出 10 個自動化腳本，每天省下兩小時' },
  { id: 'c24', v: '9757', cat: 'ai', sub: '程式開發', title: '前端工程師養成：HTML / CSS / JavaScript 完整入門', teacher: '蔡承恩', role: '全端工程師', price: 4280, origin: 7600, rating: 4.8, students: 4560, tag: 'BEST', hours: 32, desc: '從第一行程式碼到部署上線，做出 5 個完整網頁專案，進入前端工程師的大門。', ai: '從第一行程式碼到 5 個完整網頁專案上線，進入前端領域' },
  { id: 'c25', v: '47321', cat: 'ai', sub: '程式開發', title: '資料分析實戰：用 Python 做出老闆要的報表', teacher: '林佳穎', role: '資料科學家', price: 4580, origin: 8200, rating: 4.8, students: 3870, tag: '', hours: 18, desc: 'Pandas、視覺化到自動寄信，把 Excel 手工作業全部自動化。' },
  { id: 'c26', v: '46353', cat: 'ai', sub: '程式開發', title: 'React 進階實戰：打造 SaaS 產品前端', teacher: '蔡承恩', role: '全端工程師', price: 5880, origin: 10400, rating: 4.9, students: 2940, tag: 'NEW', hours: 28, desc: 'Next.js App Router、Server Actions、Zustand 狀態管理到 Stripe 串接，做出完整 SaaS。' },

  // ── 創作/生活 ──
  { id: 'c08', v: '34408', cat: 'creative', sub: '攝影', title: '戶外人像攝影：自然光下的構圖與調色', teacher: '李承翰', role: '商業攝影師', price: 3980, origin: 7200, rating: 4.8, students: 3010, tag: 'NEW', hours: 14, desc: '從選時段、找光線到 Lightroom 調色，用一機一鏡拍出雜誌質感的人像。' },
  { id: 'c27', v: '46353', cat: 'creative', sub: '攝影', title: '短影音拍攝與節奏感剪輯', teacher: '趙宥翔', role: '影像創作者・百萬訂閱', price: 3280, origin: 5800, rating: 4.9, students: 5430, tag: 'HOT', hours: 11, desc: '手機拍攝技巧、運鏡節奏、CapCut 剪輯到上字幕配樂，做出會被分享的短影音。', ai: '手機拍攝到剪輯上字幕，做出高互動的短影音內容' },

  // ── 創作/生活（音樂） ──
  { id: 'c04', v: '33936', cat: 'creative', sub: '作曲/音樂', title: '鋼琴即興與編曲：流行歌曲伴奏完全攻略', teacher: '吳若晴', role: '作曲家・鋼琴演奏者', price: 3680, origin: 6800, rating: 4.8, students: 2150, tag: '', hours: 15, desc: '從基礎和弦到華麗填音，學會即興改編任何一首流行歌曲的伴奏版本。' },
  { id: 'c10', v: '42824', cat: 'creative', sub: '作曲/音樂', title: '吉他自學完整路線：從和弦到 Solo', teacher: '鄭宇恆', role: '樂團吉他手', price: 3280, origin: 5900, rating: 4.7, students: 2440, tag: '', hours: 16, desc: '不看譜也能彈，從開放和弦到五聲音階 Solo，附 15 首經典歌曲的彈法解析。' },
  { id: 'c28', v: '17521', cat: 'creative', sub: '作曲/音樂', title: '電子音樂製作：用 Ableton 做出你的第一首 Beat', teacher: '吳若晴', role: '作曲家・音樂製作人', price: 4280, origin: 7600, rating: 4.8, students: 1930, tag: 'NEW', hours: 18, desc: '從鼓機 Pattern、合成器音色到 Mixing，完整做出一首可以發行的電子音樂。' },

  // ── 烘焙/料理 ──
  { id: 'c09', v: '49231', cat: 'baking', sub: '料理', title: '家常料理職人課：30 道一學就會的經典菜', teacher: '蔡明哲', role: '餐廳主廚', price: 2680, origin: 4800, rating: 4.9, students: 5680, tag: 'BEST', hours: 10, desc: '火候判斷、調味比例、擺盤技巧，每道菜都有精確的步驟分解與失敗排解。', ai: '30 道家常菜精確步驟拆解，新手也能做出大廚級料理' },
  { id: 'c17', v: '40534', cat: 'baking', sub: '料理', title: '刀工與食材處理：廚房基本功全解析', teacher: '蔡明哲', role: '餐廳主廚', price: 1980, origin: 3600, rating: 4.7, students: 2210, tag: '', hours: 8, desc: '從磨刀、握刀姿勢到各種切法，搭配 20 種常見食材的前處理示範。' },

  // ── 創業/職涯 ──
  { id: 'c11', v: '4809', cat: 'career', sub: '內容/行銷', title: '個人品牌經營：用內容把專業變成收入', teacher: '劉怡君', role: '品牌策略顧問', price: 3880, origin: 6900, rating: 4.8, students: 4120, tag: 'HOT', hours: 11, desc: '從定位、內容規劃到變現模式，建立一個能持續帶來收入的個人品牌。' },
  { id: 'c18', v: '42648', cat: 'career', sub: '商業/IT', title: '數據簡報力：讓老闆秒懂的圖表與敘事', teacher: '邱冠宇', role: '數據分析師', price: 3280, origin: 5800, rating: 4.8, students: 3890, tag: '', hours: 9, desc: '用數據說故事，從資料清理、圖表選擇到簡報結構，讓每一頁都有說服力。' },
  { id: 'c29', v: '13241', cat: 'career', sub: '商業/IT', title: '專案管理實戰：帶團隊把事情做完', teacher: '方翊倫', role: '資深 PM・PMP', price: 3680, origin: 6600, rating: 4.7, students: 2560, tag: '', hours: 12, desc: '看板、甘特圖、風險管理到利害關係人溝通，用 Notion 管理從啟動到結案的完整流程。' },

  // ── 創作/生活 ──
  { id: 'c30', v: '23327', cat: 'creative', sub: '生活風格', title: '穿搭美學：找到你的風格公式', teacher: '陳思涵', role: '造型師・時尚編輯', price: 2480, origin: 4400, rating: 4.8, students: 3760, tag: 'HOT', hours: 8, desc: '色彩診斷、身型分析到衣櫃斷捨離，建立一套不需要多想的穿搭系統。' },

  // ── 美髮/美容 ──
  { id: 'c31', v: '23056', cat: 'beauty', sub: '運動健身', title: '居家健身完全指南：不上健身房也能練出線條', teacher: '陳冠宏', role: '健身教練・NSCA-CSCS', price: 2280, origin: 4000, rating: 4.9, students: 6240, tag: 'BEST', hours: 12, desc: '徒手訓練、彈力帶與壺鈴，12 週漸進式課表加飲食建議，在家練出看得見的變化。', ai: '12 週居家漸進課表，不用器材也能練出明顯線條' },
  { id: 'c32', v: '33066', cat: 'beauty', sub: '運動健身', title: '瑜伽入門：每天 20 分鐘找回身心平衡', teacher: '林芷瑄', role: '瑜伽老師・RYT-500', price: 1980, origin: 3600, rating: 4.9, students: 4870, tag: '', hours: 9, desc: '從呼吸法到 Vinyasa 流動序列，30 天循序漸進，改善肩頸痠痛和睡眠品質。' },

  // ── 影像/動畫 ──
  { id: 'c33', v: '5381', cat: 'video', sub: '影片製作', title: '影片剪輯大師課：Premiere Pro 從入門到精通', teacher: '趙宥翔', role: '影像創作者', price: 4580, origin: 8200, rating: 4.8, students: 4130, tag: 'HOT', hours: 22, desc: '時間軸操作、多機剪輯、調色、音效混音到輸出設定，做出電影質感的影片。' },
  { id: 'c34', v: '47208', cat: 'video', sub: '影片製作', title: '調色藝術：DaVinci Resolve 專業色彩校正', teacher: '趙宥翔', role: '影像創作者・調色師', price: 4980, origin: 8800, rating: 4.9, students: 2180, tag: 'NEW', hours: 16, desc: '一級校正、二級調色、膚色處理、LUT 製作，用免費軟體做出付費等級的影像風格。' },
  { id: 'c35', v: '25362', cat: 'video', sub: '影片製作', title: '微電影創作：從劇本到上映的完整流程', teacher: '劉昱辰', role: '獨立電影導演', price: 5680, origin: 10200, rating: 4.8, students: 1540, tag: '', hours: 25, desc: '劇本結構、分鏡表、現場調度、錄音、剪輯到影展投遞，拍出你的第一部短片。' },

  // ── 創作/生活（寫作） ──
  { id: 'c36', v: '16139', cat: 'creative', sub: '寫作', title: '文案寫作課：讓文字幫你賣東西', teacher: '林筱涵', role: '資深文案總監', price: 3280, origin: 5800, rating: 4.8, students: 3950, tag: 'BEST', hours: 10, desc: '標題公式、產品描述、社群貼文到 Landing Page，掌握讓人想點擊和購買的文字技巧。' },
  { id: 'c37', v: '26676', cat: 'creative', sub: '寫作', title: '故事寫作：小說與劇本的敘事結構', teacher: '林筱涵', role: '小說家・編劇', price: 3680, origin: 6600, rating: 4.7, students: 1870, tag: '', hours: 14, desc: '三幕劇結構、角色弧線、對白技巧，從短篇到長篇的創作方法論。' },

  // ── 遊戲製作 ──
  { id: 'c38', v: '42648', cat: 'game', sub: '遊戲程式', title: 'Unity 2D 遊戲開發：從零做出一款平台跳躍遊戲', teacher: '陳威宏', role: '獨立遊戲開發者', price: 4980, origin: 8800, rating: 4.8, students: 2870, tag: 'NEW', hours: 24, desc: '角色控制、關卡設計、敵人 AI、音效整合到上架 Steam，做出可以賣的遊戲。' },
  { id: 'c39', v: '33853', cat: 'game', sub: '角色製作', title: '遊戲角色 3D 建模：ZBrush 到 Substance Painter', teacher: '何俊廷', role: '資深 3D 角色美術', price: 5680, origin: 10200, rating: 4.9, students: 2140, tag: 'HOT', hours: 28, desc: '從高模雕刻、拓撲、UV 到手繪風貼圖，完成一個遊戲級角色的完整製程。' },
  { id: 'c40', v: '99786', cat: 'game', sub: '像素藝術', title: '像素藝術入門：用 Aseprite 畫出復古遊戲風格', teacher: '林奕辰', role: '像素藝術家', price: 2480, origin: 4400, rating: 4.7, students: 3210, tag: '', hours: 10, desc: '從單色剪影到動畫精靈圖，學會像素風角色、場景和 UI 的繪製技巧。' },

  // ── 副業/理財 ──
  { id: 'c41', v: '26676', cat: 'finance', sub: '理財投資', title: '小資族理財課：ETF 定期定額與資產配置', teacher: '郭書瑜', role: '理財規劃師・CFP', price: 2980, origin: 5400, rating: 4.8, students: 8240, tag: 'BEST', hours: 10, desc: '不看盤、不選股，用 ETF 建立被動收入，從第一筆 3000 元開始你的投資旅程。', ai: '用 ETF 建立被動收入，從 3000 元開始你的理財旅程' },
  { id: 'c42', v: '16139', cat: 'finance', sub: '副業', title: '接案生存術：自由工作者的定價與客戶管理', teacher: '劉怡君', role: '自由工作者教練', price: 3280, origin: 5800, rating: 4.7, students: 3560, tag: '', hours: 9, desc: '如何定出專業的報價、簽訂合約、催款不尷尬、建立穩定的案源。' },

  // ── 美髮/美容 ──
  { id: 'c43', v: '23056', cat: 'beauty', sub: '美甲', title: '日式凝膠美甲：從基礎到進階設計', teacher: '蘇詩涵', role: '美甲講師・JNA 一級', price: 3980, origin: 7200, rating: 4.9, students: 2890, tag: 'NEW', hours: 16, desc: '前置處理、塗膠技巧、暈染、漸層到立體浮雕，學會開店等級的美甲技術。' },
  { id: 'c44', v: '33066', cat: 'beauty', sub: '美容', title: '韓系清透妝容：日常到約會的完整教學', teacher: '金敏雅', role: '韓系彩妝師', price: 2680, origin: 4800, rating: 4.8, students: 4120, tag: 'HOT', hours: 8, desc: '底妝、眉毛、眼影配色到唇彩，不同場合的妝容切換技巧。' },

  // ── 烘焙/料理 ──
  { id: 'c45', v: '49557', cat: 'baking', sub: '西點', title: '法式甜點全書：從泡芙到歌劇院蛋糕', teacher: '張馨予', role: '甜點主廚・Le Cordon Bleu', price: 4580, origin: 8200, rating: 4.9, students: 3470, tag: 'BEST', hours: 20, desc: '千層酥皮、閃電泡芙、焦糖布蕾到歌劇院蛋糕，12 款經典法式甜點完整教學。', ai: '12 款經典法式甜點從零教學，在家做出甜點店等級' },
  { id: 'c46', v: '13241', cat: 'baking', sub: '咖啡輕食', title: '手沖咖啡與拉花：在家開一間迷你咖啡館', teacher: '陳柏元', role: 'SCA 認證咖啡師', price: 2980, origin: 5400, rating: 4.8, students: 4560, tag: 'HOT', hours: 10, desc: '豆子挑選、手沖萃取、義式濃縮到拉花技巧，在家泡出咖啡廳等級的好咖啡。' },

  // ── AI/科技 ──
  { id: 'c47', v: '46353', cat: 'ai', sub: 'AI 影像設計', title: 'AI 繪圖實戰：Midjourney + Stable Diffusion 完全攻略', teacher: '黃士誠', role: 'AI 工程師・創作者', price: 3980, origin: 7200, rating: 4.9, students: 7890, tag: 'HOT', hours: 16, desc: '從 Prompt 技巧、ControlNet 到 LoRA 訓練，用 AI 產出商用級插畫與設計素材。', ai: '用 AI 產出商用級插畫與設計，省下 80% 設計時間' },
  { id: 'c48', v: '30232', cat: 'ai', sub: 'AI 生產力', title: 'ChatGPT 職場應用：10 倍提升工作效率', teacher: '羅志偉', role: '科技作家・效率專家', price: 2480, origin: 4400, rating: 4.8, students: 9130, tag: 'BEST', hours: 8, desc: '簡報生成、會議紀錄、信件撰寫、數據分析到自動化流程，用 AI 重新定義你的工作方式。' },

  // ── 設計 ──
  { id: 'c49', v: '2858', cat: 'design', sub: '平面設計', title: 'Illustrator 完全攻略：向量設計從入門到接案', teacher: '蘇敏慧', role: '平面設計師', price: 3980, origin: 7200, rating: 4.8, students: 3240, tag: '', hours: 18, desc: '鋼筆工具、文字排版、Logo 設計到印刷輸出，一套課程學完 AI 的核心功能。' },
  { id: 'c50', v: '785', cat: 'design', sub: '品牌設計', title: '品牌識別設計：從策略到視覺系統落地', teacher: '林予安', role: '品牌設計總監', price: 5480, origin: 9800, rating: 4.9, students: 2670, tag: 'NEW', hours: 22, desc: '品牌定位、命名策略、Logo 設計、色彩系統到品牌手冊，完整的品牌建構方法論。' },

  // ── 創作/生活 ──
  { id: 'c51', v: '9339', cat: 'creative', sub: '花藝設計', title: '花藝設計入門：韓式自然風花束到桌花', teacher: '陳玟希', role: '花藝設計師・KFDA', price: 3480, origin: 6200, rating: 4.8, students: 2340, tag: '', hours: 12, desc: '花材辨識、色彩搭配、螺旋手綁花束到婚禮桌花，10 個作品從零開始實作。' },
  { id: 'c52', v: '17521', cat: 'creative', sub: '室內設計', title: '居家空間改造：小坪數也能住出質感', teacher: '何明軒', role: '室內設計師', price: 3280, origin: 5800, rating: 4.7, students: 2910, tag: '', hours: 11, desc: '動線規劃、收納系統、燈光設計到軟裝佈置，不需要大翻修也能讓空間煥然一新。' },

  // ── 創業/職涯 ──
  { id: 'c53', v: '23327', cat: 'career', sub: '創業/電商經營', title: '電商創業全攻略：從選品到月入十萬', teacher: '邱冠宇', role: '電商顧問・蝦皮百萬賣家', price: 4280, origin: 7600, rating: 4.8, students: 5320, tag: 'HOT', hours: 16, desc: '選品策略、商品攝影、文案撰寫、廣告投放到客服流程，建立完整的電商獲利系統。', ai: '從選品到月入十萬，建立完整的電商獲利系統' },
  { id: 'c54', v: '34408', cat: 'career', sub: '內容/行銷', title: 'SEO 完全攻略：讓 Google 幫你帶流量', teacher: '劉怡君', role: '數位行銷顧問', price: 3680, origin: 6600, rating: 4.8, students: 3780, tag: 'NEW', hours: 13, desc: '關鍵字研究、網站架構、內容策略到技術 SEO，讓你的網站排名穩定在第一頁。' },

  // ── 新增課程 c55–c72 ──
  { id: 'c55', v: '46635', cat: 'ai', sub: 'AI 訓練營', title: 'LLM 微調實戰：用自己的資料訓練專屬模型', teacher: '黃士誠', role: 'AI 工程師・前 Google', price: 6480, origin: 11600, rating: 4.9, students: 2340, tag: 'NEW', hours: 22, desc: 'LoRA、QLoRA、資料清洗到部署推論，用企業資料微調出專屬的大型語言模型。', ai: '用 LoRA 微調 LLM，打造企業專屬 AI 模型' },
  { id: 'c56', v: '42824', cat: 'creative', sub: '作曲/音樂', title: '混音工程入門：讓你的音樂聽起來像專業發行', teacher: '蘇奕凡', role: '混音工程師・金曲獎入圍', price: 4880, origin: 8800, rating: 4.8, students: 1670, tag: '', hours: 19, desc: 'EQ、壓縮、空間效果到母帶處理，從 DAW 設定到完成一首可發行品質的混音。' },
  { id: 'c57', v: '33936', cat: 'drawing', sub: 'iPad 繪畫', title: 'Procreate 完全攻略：iPad 數位繪畫從零到接案', teacher: '張雨萱', role: '插畫家・角色設計師', price: 3880, origin: 6800, rating: 4.9, students: 5130, tag: 'HOT', hours: 15, desc: '筆刷設定、圖層技巧、色彩理論到作品輸出，用 iPad 畫出商用等級的插畫。', ai: '用 iPad + Procreate 畫出商用等級插畫' },
  { id: 'c58', v: '50598', cat: 'design', sub: '產品設計', title: '產品設計思維：從需求洞察到 MVP 落地', teacher: '方翊倫', role: '產品設計總監', price: 4580, origin: 8200, rating: 4.8, students: 2450, tag: '', hours: 16, desc: '用戶訪談、競品分析、功能定義到 MVP 驗證，產品經理與設計師都該學的方法論。' },
  { id: 'c59', v: '13228', cat: 'design', sub: '網頁/前端', title: 'Webflow 無程式碼建站：設計師也能做出互動網站', teacher: '蘇敏慧', role: '網頁設計總監', price: 3680, origin: 6600, rating: 4.7, students: 2870, tag: 'NEW', hours: 14, desc: '視覺化操作、CMS 模板、互動動畫到 SEO 設定，不寫程式碼也能建出專業網站。' },
  { id: 'c60', v: '29997', cat: 'video', sub: '動畫', title: '角色動畫基礎：12 法則與 Spine 2D 實作', teacher: '林奕辰', role: '動畫師・遊戲業', price: 4280, origin: 7600, rating: 4.8, students: 1890, tag: '', hours: 17, desc: '擠壓拉伸、預備動作、弧線運動，用 Spine 做出流暢的 2D 角色動畫。' },
  { id: 'c61', v: '40534', cat: 'baking', sub: '麵包', title: '歐式麵包全書：從鄉村到酸種的烘焙之道', teacher: '張馨予', role: '烘焙講師・Le Cordon Bleu', price: 3880, origin: 6800, rating: 4.9, students: 2680, tag: 'HOT', hours: 14, desc: '酸種培養、高水量操作、蒸氣烘烤到割紋藝術，做出外脆內軟的歐式麵包。' },
  { id: 'c62', v: '49231', cat: 'baking', sub: '中式糕點', title: '中式糕點職人課：月餅、鳳梨酥到蛋黃酥', teacher: '蔡明哲', role: '餐廳主廚・中餐烘焙', price: 3280, origin: 5800, rating: 4.8, students: 3120, tag: '', hours: 12, desc: '油皮油酥、內餡調配到包餡手法，做出外皮酥鬆、層次分明的經典中式糕點。' },
  { id: 'c63', v: '47321', cat: 'ai', sub: '程式開發', title: 'TypeScript 完全指南：寫出更安全的 JavaScript', teacher: '蔡承恩', role: '全端工程師', price: 4180, origin: 7400, rating: 4.8, students: 3210, tag: '', hours: 18, desc: '型別系統、泛型、裝飾器到專案實戰，從 JS 無痛升級到 TS 的完整路線。' },
  { id: 'c64', v: '34408', cat: 'creative', sub: '攝影', title: '商品攝影實戰：電商與社群的拍攝技巧', teacher: '李承翰', role: '商業攝影師', price: 3480, origin: 6200, rating: 4.8, students: 3780, tag: 'BEST', hours: 11, desc: '燈光架設、白底去背、情境擺拍到後製修圖，拍出讓買家想下單的商品照。', ai: '拍出讓買家想下單的商品照，電商賣家必學' },
  { id: 'c65', v: '5381', cat: 'game', sub: '遊戲程式', title: 'Godot 遊戲開發：開源引擎的 2D/3D 全攻略', teacher: '陳威宏', role: '獨立遊戲開發者', price: 3980, origin: 7200, rating: 4.7, students: 1980, tag: 'NEW', hours: 20, desc: 'GDScript 語法、場景樹、物理引擎到輸出多平台，用免費引擎做出獨立遊戲。' },
  { id: 'c66', v: '25362', cat: 'career', sub: '內容/行銷', title: 'YouTube 經營攻略：從 0 到 10 萬訂閱的成長策略', teacher: '趙宥翔', role: '影像創作者・百萬訂閱', price: 3880, origin: 6800, rating: 4.9, students: 4560, tag: 'HOT', hours: 13, desc: '選題策略、標題縮圖、演算法運作到業配定價，系統化經營 YouTube 頻道。', ai: '系統化經營 YouTube，從 0 到 10 萬訂閱的完整策略' },
  { id: 'c67', v: '23327', cat: 'beauty', sub: '寵物美容', title: '寵物美容入門：居家護理與基礎修剪', teacher: '林芷萱', role: '寵物美容師・C 級認證', price: 2680, origin: 4800, rating: 4.7, students: 2140, tag: '', hours: 10, desc: '洗澡技巧、吹毛手法、指甲修剪到基礎造型，在家也能幫毛小孩維持好狀態。' },
  { id: 'c68', v: '32085', cat: 'drawing', sub: '漫畫/Webtoon', title: 'Webtoon 漫畫創作：從分鏡到連載的完整流程', teacher: '何俊廷', role: '漫畫家・Webtoon 連載中', price: 4580, origin: 8200, rating: 4.8, students: 2670, tag: 'NEW', hours: 20, desc: '劇本架構、分鏡節奏、CLIP STUDIO 操作到平台上架，開始你的 Webtoon 連載之旅。' },
  { id: 'c69', v: '9339', cat: 'finance', sub: '理財投資', title: '股市技術分析入門：看懂 K 線與量價關係', teacher: '郭書瑜', role: '理財規劃師・CFP', price: 3480, origin: 6200, rating: 4.7, students: 4890, tag: '', hours: 12, desc: 'K 線型態、均線系統、成交量判讀到進出場策略，建立有紀律的交易系統。' },
  { id: 'c70', v: '47208', cat: 'creative', sub: '生活風格', title: '極簡生活實踐：斷捨離與空間整理術', teacher: '陳思涵', role: '整理收納師・生活風格作家', price: 2280, origin: 4000, rating: 4.8, students: 3450, tag: '', hours: 8, desc: '物品篩選、收納動線、數位整理到心態轉換，過上輕鬆自在的極簡生活。' },
  { id: 'c71', v: '33066', cat: 'beauty', sub: '美髮', title: '日系剪髮技術：層次剪裁與造型吹整', teacher: '林柏翰', role: '髮型設計師・日本進修', price: 4980, origin: 8800, rating: 4.9, students: 1870, tag: '', hours: 16, desc: '髮質判斷、分區技巧、層次設計到吹整造型，學會日系沙龍的剪髮流程。' },
  { id: 'c72', v: '30232', cat: 'game', sub: '動畫/特效', title: '遊戲特效設計：用 Unity VFX Graph 做出華麗技能', teacher: '陳威宏', role: '技術美術・遊戲業', price: 4680, origin: 8400, rating: 4.8, students: 1560, tag: '', hours: 18, desc: '粒子系統、Shader 基礎、時間軸控制到技能連招，做出 ARPG 等級的戰鬥特效。' }
];

window.HERO = ['c47', 'c03', 'c05', 'c45', 'c31', 'c53'];
window.HERO_COPY = {
  c47: ['AI 創作新紀元', '用 AI 畫出\n商用級作品', 'Midjourney + Stable Diffusion，省下 80% 設計時間'],
  c03: ['AI 時代的新技能', '用生成式 AI\n打造你的智慧助理', '從 Prompt Engineering 到 RAG，26 小時完整實作'],
  c05: ['插畫家的第一堂課', '畫出屬於你的\n原創角色宇宙', '角色設定、配色、表情與姿勢一次學會'],
  c45: ['甜點師的夢想', '在家做出\n法式甜點店等級', '12 款經典法式甜點，從泡芙到歌劇院蛋糕'],
  c31: ['在家就能練', '不上健身房\n也能練出線條', '12 週漸進課表，徒手訓練 + 飲食建議'],
  c53: ['月入十萬不是夢', '電商創業\n完全攻略', '從選品到出單，建立完整的電商獲利系統']
};

window.REVIEWS = [
  ['陳**', 'UI/UX 實戰', '講師把實務上的交付流程講得超清楚，上完直接用在公司專案，同事都問我去哪學的。'],
  ['林**', '數位插畫角色設計', '從來不敢畫人物，現在已經在接角色委託了！課程節奏很適合初學者。'],
  ['黃**', '生成式 AI 應用開發', '範例程式碼可以直接改來用，RAG 那章的架構圖超清楚，學習曲線很順。'],
  ['張**', '家常料理職人課', '每道菜都有詳細比例和火候建議，家人說我的手藝突飛猛進。'],
  ['王**', 'Blender 3D 建模', '影片節奏剛好，每章都有作業可以練手，很有成就感。'],
  ['李**', '戶外人像攝影', '調色那章的價值就超過課程費用了，現在已經開始接外拍。'],
  ['吳**', '零基礎 Python', '完全沒寫過程式的文組生，現在每天自動整理報表省下兩小時。'],
  ['周**', '個人品牌經營', '終於知道內容要怎麼規劃變現，IG 追蹤三個月翻了三倍。'],
  ['趙**', '居家健身完全指南', '跟著 12 週課表練，體脂降了 5%，完全不用去健身房。'],
  ['許**', '影片剪輯大師課', '以前剪片要摸索很久，現在效率快了至少三倍，也知道怎麼調色了。'],
  ['蔡**', '文案寫作課', '標題公式那堂課學到的技巧，貼文互動率直接翻倍。'],
  ['鄭**', '前端工程師養成', '非本科轉職前端，這堂課的專案導向學法真的很有用，面試時有作品可以直接展示。'],
  ['郭**', '小資族理財課', '終於搞懂 ETF 是什麼了，跟著老師的配置方式，現在每月定期定額很安心。'],
  ['蘇**', '日式凝膠美甲', '練習了兩週就幫朋友做出很漂亮的款式，課程的分解步驟超級詳細。'],
  ['何**', 'AI 繪圖實戰', 'Midjourney 的 Prompt 技巧讓我的出圖品質提升 10 倍，現在接案都用 AI 出初稿。'],
  ['金**', 'ChatGPT 職場應用', '老闆都在問我怎麼變這麼快，其實就是把課上教的 Prompt 模板用上了。'],
  ['張**', '法式甜點全書', '閃電泡芙成功了！拍照發 IG 被朋友們轟炸問食譜，超有成就感。'],
  ['陳**', '電商創業全攻略', '跟著選品策略走，第二個月蝦皮就開始穩定出單了，回本超快。'],
  ['劉**', 'Unity 2D 遊戲開發', '花了一個月做出第一款遊戲 demo，雖然簡單但真的能玩，太感動了。'],
  ['方**', '手沖咖啡與拉花', '以前覺得手沖很玄，原來水溫和手法有公式可循，現在泡的比外面好喝。'],
  ['楊**', 'LLM 微調實戰', '公司的客服機器人用自家資料微調後，回答正確率從 60% 跳到 92%，主管超滿意。'],
  ['徐**', 'Procreate 完全攻略', '通勤時用 iPad 練習，三個月後開始在社群接插畫委託，課程回本了好幾倍。'],
  ['曹**', '歐式麵包全書', '酸種養成那段超詳細，第一次做出真正外脆內彈的鄉村麵包，家人都驚呆了。'],
  ['馬**', 'Webtoon 漫畫創作', '一直想連載但不知道怎麼分鏡，上完課後第一話就被平台推薦上首頁！'],
  ['洪**', '商品攝影實戰', '蝦皮商品照換成課程教的拍法後，點擊率直接漲了 40%，太值得了。'],
  ['謝**', 'TypeScript 完全指南', '之前一直逃避 TS 覺得太複雜，講師用漸進式教法讓我無痛轉換，現在回不去 JS 了。'],
  ['鄧**', 'YouTube 經營攻略', '照著選題和縮圖策略調整，三個月從 800 訂閱漲到 12000，演算法終於推了。'],
  ['葉**', '極簡生活實踐', '清掉了家裡一半的東西，空間變大心情變好，每天回家都覺得很舒服。'],
  ['廖**', '股市技術分析入門', '終於看懂 K 線了，不再亂追高殺低，建立了自己的進出場 SOP。']
];

window.FAQ = [
  ['購買後可以觀看多久？', '一次購買即可無限期觀看，日後課程更新的內容也會免費開放，不需要再付任何費用。'],
  ['可以用手機或平板上課嗎？', '可以，支援電腦、手機、平板各種裝置，並可自由調整播放速度（0.5x ～ 2x）與開啟字幕。'],
  ['有提供課程素材檔嗎？', '每堂課皆附講師使用的專案檔與練習素材，可於課程頁面直接下載。部分課程另附 PDF 講義。'],
  ['付款方式有哪些？', '支援信用卡（Visa / Master / JCB）、ATM 轉帳、超商代碼繳費與 LINE Pay，並可開立電子發票。'],
  ['不滿意可以退費嗎？', '購買後 7 天內，且觀看進度低於 20%，可透過客服申請全額退費，無需說明理由。'],
  ['課程有期限嗎？會下架嗎？', '已上架的課程不會下架，你可以依自己的步調反覆觀看學習，沒有觀看期限。'],
  ['可以跟講師提問嗎？', '每堂課都設有留言討論區，講師與助教會在 48 小時內回覆你的學習問題。'],
  ['有團購或企業方案嗎？', '5 人以上即可享團購優惠，企業大量採購另有專屬方案，歡迎來信洽詢 hi@aiclass.tw。']
];

// ── 首頁橫幅導覽列 ──
window.NAV_BANNER = [
  { label: '🔥 雙 11 限時優惠', link: '#promo' },
  { label: '📚 新上架課程', link: '#new' },
  { label: '🏆 TOP 10 排行', link: '#top10' },
  { label: '👨‍🏫 成為講師', link: '#' },
  { label: '🏢 企業方案', link: '#' }
];

// ── 合作品牌 ──
window.PARTNERS = ['Google', 'Adobe', 'Figma', 'Apple', 'Netflix', 'NVIDIA', 'Unity', 'Wacom', 'Ableton', 'Sony'];

// ── 學習路徑 ──
window.PATHS = [
  { id: 'p1', name: 'AI 全端工程師', desc: '從 Python 基礎到 AI 應用部署，成為企業搶手的 AI 工程師', courses: ['c16', 'c25', 'c03', 'c26'], duration: '3-6 個月', level: '入門到進階', salary: '80-150 萬/年' },
  { id: 'p2', name: '品牌設計師', desc: '從字體設計到 UI/UX，掌握完整的品牌視覺設計能力', courses: ['c01', 'c02', 'c19', 'c20'], duration: '2-4 個月', level: '入門到中階', salary: '60-100 萬/年' },
  { id: 'p3', name: '影視創作者', desc: '從拍攝到剪輯調色，獨立完成專業級影片製作', courses: ['c27', 'c33', 'c34', 'c35'], duration: '2-5 個月', level: '入門到進階', salary: '55-120 萬/年' },
  { id: 'p4', name: '數位插畫家', desc: '從素描基礎到概念藝術，建立專業插畫接案能力', courses: ['c07', 'c05', 'c13', 'c14'], duration: '3-6 個月', level: '零基礎', salary: '50-90 萬/年' },
  { id: 'p5', name: '3D 視覺設計師', desc: '從 Blender 到 Houdini，進入 3D 與特效產業', courses: ['c06', 'c23', 'c12', 'c15'], duration: '4-8 個月', level: '入門到進階', salary: '70-130 萬/年' },
  { id: 'p6', name: '獨立遊戲開發者', desc: '從企劃、美術到程式，獨自做出一款可以上架的遊戲', courses: ['c38', 'c40', 'c39', 'c06'], duration: '4-8 個月', level: '入門到進階', salary: '60-120 萬/年' },
  { id: 'p7', name: '電商創業家', desc: '從選品、行銷到 SEO，建立穩定獲利的網路事業', courses: ['c53', 'c54', 'c11', 'c36'], duration: '2-4 個月', level: '零基礎', salary: '依營收' },
  { id: 'p8', name: 'AI 內容創作者', desc: '結合 AI 工具與創意，成為高效產出的內容工作者', courses: ['c48', 'c47', 'c36', 'c27'], duration: '1-3 個月', level: '零基礎', salary: '50-100 萬/年' }
];

// ── 訓練營 ──
window.BOOTCAMPS = [
  { id: 'b1', name: 'AI 就業方向訓練營', desc: '系統化學習 AI 開發，含企業專案實戰、履歷優化、模擬面試及就業推薦', courses: ['c03', 'c16', 'c25', 'c26'], price: 0, original: 19800, tag: '限時免費', badge: '就業保障' },
  { id: 'b2', name: '全端設計師就業班', desc: '從 UI/UX 到品牌設計，30 天內完成 5 個企業級作品集', courses: ['c02', 'c01', 'c19', 'c20'], price: 0, original: 16800, tag: '限時免費', badge: '推薦面試' },
  { id: 'b3', name: '影視後製全方位班', desc: '拍攝、剪輯、調色、特效一次學完，畢業即可獨立接案', courses: ['c27', 'c33', 'c34', 'c35'], price: 0, original: 22400, tag: '限時免費', badge: '實戰證書' },
  { id: 'b4', name: 'AI 內容變現加速器', desc: '用 AI 工具加速設計、寫作與行銷，30 天內建立自動化接案流程', courses: ['c48', 'c47', 'c36', 'c54'], price: 0, original: 13420, tag: '限時免費', badge: 'AI 認證' },
  { id: 'b5', name: '電商創業衝刺班', desc: '從零到月入十萬的完整電商路線，含實戰選品與廣告投放', courses: ['c53', 'c11', 'c18', 'c42'], price: 0, original: 14120, tag: '限時免費', badge: '創業輔導' }
];

// ── 每日挑戰 ──
window.MISSIONS = [
  { type: '出席', icon: '📋', reward: 10, unit: '點' },
  { type: '完課', icon: '🎬', reward: 20, unit: '點' },
  { type: '作業', icon: '✏️', reward: 50, unit: '點' },
  { type: '連續 7 天', icon: '🔥', reward: 200, unit: '點' }
];
window.MISSION_STATS = { total: 462438, today: 1283 };

// ── 影音學習 ──
window.VIDEO_CONTENT = [
  { id: 'vc1', title: '學員作品分享：3D 場景渲染成果', cat: '學員分享', views: 12800, course: 'c06' },
  { id: 'vc2', title: '講師訪談：AI 時代的自學之路', cat: '講師訪談', views: 8930, course: 'c03' },
  { id: 'vc3', title: '幕後花絮：一堂課是怎麼拍出來的', cat: '幕後花絮', views: 6420, course: 'c33' },
  { id: 'vc4', title: '新課預告：進階 Prompt Engineering', cat: '最新', views: 15600, course: 'c03' },
  { id: 'vc5', title: '學員故事：從零轉職前端工程師', cat: '學員分享', views: 9870, course: 'c24' },
  { id: 'vc6', title: '講師示範：5 分鐘畫出角色表情', cat: '講師訪談', views: 11200, course: 'c05' },
  { id: 'vc7', title: '新課搶先看：電子音樂製作入門', cat: '最新', views: 7340, course: 'c28' },
  { id: 'vc8', title: '幕後直擊：攝影棚一日實況', cat: '幕後花絮', views: 5180, course: 'c08' },
  { id: 'vc9', title: '學員作品：Unity 2D 平台跳躍遊戲 Demo', cat: '學員分享', views: 7240, course: 'c38' },
  { id: 'vc10', title: '講師直播：AI 繪圖 vs 手繪，設計師怎麼選？', cat: '講師訪談', views: 18900, course: 'c47' },
  { id: 'vc11', title: '新課搶先看：品牌識別設計系統', cat: '最新', views: 9430, course: 'c50' },
  { id: 'vc12', title: '學員故事：月入十萬的電商之路', cat: '學員分享', views: 14200, course: 'c53' }
];

// ── 部落格文章 ──
window.POSTS = [
  { id:'p1', title:'2026 年最值得學的 5 項 AI 技能', excerpt:'AI 正在重塑每個產業，掌握這五項核心技能，讓你在職場上脫穎而出。從 Prompt Engineering 到 RAG 架構，一次掌握 AI 時代的關鍵能力。', cat:'ai', author:'黃士誠', date:'2026-11-01', readTime:8, v:'41654', tags:['AI','職涯','趨勢'] },
  { id:'p2', title:'零基礎學程式：從哪裡開始最有效？', excerpt:'想學寫程式但不知道從哪開始？這篇文章帶你釐清學習路線，從 Python 到前端，找到最適合你的起點。', cat:'ai', author:'羅志偉', date:'2026-10-28', readTime:6, v:'46635', tags:['Python','程式','入門'] },
  { id:'p3', title:'插畫接案指南：如何定價與找到客戶', excerpt:'從定價策略到客戶開發，分享插畫接案的完整流程與實戰經驗，讓你的創作技能變成穩定收入。', cat:'drawing', author:'張雨萱', date:'2026-10-25', readTime:10, v:'785', tags:['插畫','接案','自由工作者'] },
  { id:'p4', title:'Blender vs Cinema 4D：新手該選哪個？', excerpt:'兩款主流 3D 軟體的完整比較，從學習曲線、功能差異到就業市場需求一次分析清楚。', cat:'video', author:'許家豪', date:'2026-10-22', readTime:7, v:'29997', tags:['3D','Blender','C4D'] },
  { id:'p5', title:'UI 設計師的一天：工作流程大公開', excerpt:'資深 UI 設計師的真實工作日常，從晨會需求討論到交付開發的完整流程分享。', cat:'design', author:'陳柏睿', date:'2026-10-18', readTime:5, v:'13228', tags:['UI/UX','設計','職場'] },
  { id:'p6', title:'如何用短影音建立個人品牌', excerpt:'從選題策略、拍攝技巧到剪輯發布，教你用短影音快速累積粉絲與影響力，打造個人品牌。', cat:'creative', author:'趙宥翔', date:'2026-10-15', readTime:9, v:'46353', tags:['短影音','個人品牌','行銷'] },
  { id:'p7', title:'居家健身新手必知的 10 個觀念', excerpt:'不需要昂貴器材也能有效訓練，掌握正確觀念讓你少走彎路、事半功倍，在家也能練出好身材。', cat:'beauty', author:'陳冠宏', date:'2026-10-12', readTime:6, v:'23056', tags:['健身','居家運動','健康'] },
  { id:'p8', title:'前端工程師轉職心路歷程', excerpt:'從零基礎到拿到第一份前端 offer，分享我的 6 個月轉職旅程中學到的一切。', cat:'ai', author:'蔡承恩', date:'2026-10-08', readTime:12, v:'9757', tags:['前端','轉職','職涯'] },
  { id:'p9', title:'烘焙入門：5 款零失敗甜點食譜', excerpt:'不需要烤箱也能做的簡單甜點，新手第一次就能成功，送禮或下午茶都超合適。', cat:'baking', author:'蔡明哲', date:'2026-10-05', readTime:7, v:'49231', tags:['烘焙','料理','食譜'] },
  { id:'p10', title:'學設計思考改變了我解決問題的方式', excerpt:'設計思考不只是設計師的工具，它是每個人都該學的思維框架，徹底改變你看待問題的角度。', cat:'design', author:'方翊倫', date:'2026-10-01', readTime:8, v:'9757', tags:['設計思考','思維','創新'] },
  { id:'p11', title:'自由工作者的時間管理術', excerpt:'如何在沒有老闆催促的情況下維持高效產出？分享我的番茄鐘進化版與專案管理心得。', cat:'career', author:'劉怡君', date:'2026-09-28', readTime:6, v:'4809', tags:['自由工作','時間管理','效率'] },
  { id:'p12', title:'影片調色入門：用免費軟體做出電影感', excerpt:'DaVinci Resolve 基礎調色教學，掌握一級校正與二級調色，三個步驟讓影片質感翻倍。', cat:'video', author:'趙宥翔', date:'2026-09-25', readTime:8, v:'47208', tags:['調色','影片製作','DaVinci'] },
  { id:'p13', title:'遠端工作必備的 10 款效率工具', excerpt:'從專案管理到團隊溝通，精選 10 款讓遠端工作更順暢的數位工具與使用技巧。', cat:'career', author:'邱冠宇', date:'2026-09-22', readTime:7, v:'42648', tags:['遠端工作','工具','效率'] },
  { id:'p14', title:'給新手的水彩畫材選購指南', excerpt:'水彩紙、顏料、畫筆怎麼選？從平價到專業級，幫你找到最適合的入門組合。', cat:'drawing', author:'曾翠蓮', date:'2026-09-18', readTime:5, v:'32085', tags:['水彩','畫材','入門'] },
  { id:'p15', title:'如何寫出讓人想點擊的標題', excerpt:'文案標題是決定點擊率的關鍵，學會 5 個公式讓你的內容不再被淹沒在資訊海裡。', cat:'creative', author:'林筱涵', date:'2026-09-15', readTime:6, v:'16139', tags:['文案','標題','行銷'] },
  { id:'p16', title:'AI 繪圖 vs 手繪：設計師該如何定位自己？', excerpt:'AI 工具席捲設計圈，手繪還有競爭力嗎？從產業觀點分析設計師的不可取代性與轉型方向。', cat:'ai', author:'張雨萱', date:'2026-09-12', readTime:9, v:'46353', tags:['AI','設計','職涯'] },
  { id:'p17', title:'新手必看：第一次剪片就上手的 5 個技巧', excerpt:'不需要看完整堂課，掌握這五個核心概念，第一支影片就能剪得有節奏感。', cat:'video', author:'趙宥翔', date:'2026-09-08', readTime:7, v:'29997', tags:['剪輯','影片','入門'] },
  { id:'p18', title:'從零開始學投資：給完全新手的理財入門指南', excerpt:'別讓通膨吃掉你的存款。從記帳、存錢到第一筆 ETF 投資，最簡單的理財起步方式。', cat:'finance', author:'郭書瑜', date:'2026-09-05', readTime:8, v:'26676', tags:['理財','投資','ETF'] },
  { id:'p19', title:'遊戲開發入門：選 Unity 還是 Unreal？', excerpt:'兩大遊戲引擎的完整比較，從學習成本、適用類型到就業前景，幫你選對第一步。', cat:'game', author:'陳威宏', date:'2026-09-01', readTime:10, v:'42648', tags:['遊戲','Unity','Unreal'] },
  { id:'p20', title:'Midjourney 進階：10 個讓出圖品質翻倍的 Prompt 技巧', excerpt:'不只是打字讓 AI 畫圖，學會參數控制、風格指定和負面提示，讓 AI 繪圖成為你的生產力工具。', cat:'ai', author:'黃士誠', date:'2026-08-28', readTime:8, v:'40534', tags:['Midjourney','AI','Prompt'] },
  { id:'p21', title:'法式甜點在家做：五款零失敗入門食譜', excerpt:'瑪德蓮、費南雪、可麗露、焦糖布蕾和檸檬塔，簡化版食譜讓你在家輕鬆完成。', cat:'baking', author:'張馨予', date:'2026-08-25', readTime:7, v:'49557', tags:['烘焙','法式甜點','食譜'] },
  { id:'p22', title:'個人接案網站怎麼做？設計師作品集指南', excerpt:'從內容規劃、版型選擇到 SEO 設定，做出能幫你帶來案子的線上作品集。', cat:'design', author:'蘇敏慧', date:'2026-08-22', readTime:9, v:'2858', tags:['作品集','接案','設計'] },
  { id:'p23', title:'手沖咖啡新手常犯的 8 個錯誤', excerpt:'水溫太高、研磨度不對、注水太快？這些小細節決定了你的咖啡好不好喝。', cat:'baking', author:'陳柏元', date:'2026-08-18', readTime:6, v:'13241', tags:['咖啡','手沖','入門'] },
  { id:'p24', title:'2026 年值得關注的 10 個設計趨勢', excerpt:'從 3D 互動到 AI 輔助設計，盤點今年最值得設計師關注的視覺與體驗趨勢。', cat:'design', author:'陳柏睿', date:'2026-08-15', readTime:8, v:'9757', tags:['設計','趨勢','UI'] },
  { id:'p25', title:'居家運動計畫：適合忙碌上班族的 15 分鐘訓練', excerpt:'不用早起、不用去健身房，利用午休或下班後 15 分鐘，維持基本體能和線條。', cat:'beauty', author:'陳冠宏', date:'2026-08-12', readTime:5, v:'33066', tags:['健身','居家運動','上班族'] }
];

// ── 講師陣容 ──
window.INSTRUCTORS = [
  { id: 'i1', name: '黃士誠', role: 'AI 工程師', courses: 2, students: 13010, avatar: '👨‍💻', bio: '前 Google AI 研究員，專注生成式 AI 應用開發與教學' },
  { id: 'i2', name: '張雨萱', role: '插畫家・角色設計師', courses: 1, students: 4470, avatar: '🎨', bio: '作品散見於 Netflix 動畫與國際繪本，擅長角色 IP 開發' },
  { id: 'i3', name: '趙宥翔', role: '影像創作者', courses: 3, students: 11740, avatar: '🎬', bio: 'YouTube 百萬訂閱，專注影片製作與短影音內容創作' },
  { id: 'i4', name: '蔡承恩', role: '全端工程師', courses: 2, students: 7500, avatar: '💻', bio: '前 LINE 資深工程師，擅長 React 生態系與前端架構設計' },
  { id: 'i5', name: '蔡明哲', role: '餐廳主廚', courses: 2, students: 7890, avatar: '👨‍🍳', bio: '米其林餐廳主廚經歷，致力讓家庭料理也能有專業水準' },
  { id: 'i6', name: '劉怡君', role: '品牌策略顧問', courses: 3, students: 11460, avatar: '📢', bio: '協助超過 200 個品牌建立線上影響力，自由工作者社群主理人' },
  { id: 'i7', name: '許家豪', role: '3D 美術總監', courses: 2, students: 5460, avatar: '🎮', bio: '參與多款 AAA 遊戲開發，Blender 與 C4D 雙棲創作者' },
  { id: 'i8', name: '郭書瑜', role: '理財規劃師', courses: 2, students: 13130, avatar: '💰', bio: 'CFP 國際認證理財規劃師，幫助超過 5000 人建立理財觀念' },
  { id: 'i9', name: '張馨予', role: '甜點主廚', courses: 2, students: 6150, avatar: '🧁', bio: 'Le Cordon Bleu 畢業，曾任法國米其林餐廳甜點房，致力在家烘焙教學' },
  { id: 'i10', name: '陳威宏', role: '獨立遊戲開發者', courses: 3, students: 6410, avatar: '🕹️', bio: 'Steam 上架三款獨立遊戲，Unity / Godot 雙棲，推動台灣獨立遊戲文化' },
  { id: 'i11', name: '李承翰', role: '商業攝影師', courses: 2, students: 6790, avatar: '📷', bio: '合作品牌超過百家，擅長人像與商品攝影，作品刊登於 Vogue、GQ' },
  { id: 'i12', name: '陳思涵', role: '造型師・生活風格作家', courses: 2, students: 7210, avatar: '✨', bio: '出版三本暢銷書，專注穿搭美學與極簡生活，IG 粉絲超過 20 萬' }
];

// ── 平台數據 ──
window.PLATFORM_STATS = {
  courses: 72,
  students: 240000,
  instructors: 35,
  satisfaction: 4.85,
  completionRate: 78,
  countries: 12
};

// ── 完整 FAQ（分類） ──
window.FAQ_FULL = [
  { cat:'購買相關', items:[
    ['購買後可以觀看多久？','一次購買即可無限期觀看，日後課程更新的內容也會免費開放，不需要再付任何費用。'],
    ['付款方式有哪些？','支援信用卡（Visa / Master / JCB）、ATM 轉帳、超商代碼繳費與 LINE Pay，並可開立電子發票。'],
    ['不滿意可以退費嗎？','購買後 7 天內，且觀看進度低於 20%，可透過客服申請全額退費，無需說明理由。'],
    ['可以用優惠券嗎？','可以，在結帳頁面輸入優惠碼即可折抵。每筆訂單限用一張優惠券，不可與其他優惠併用。'],
    ['購買後如何取得發票？','付款完成後系統會自動開立電子發票，寄送至您註冊的 Email 信箱。如需統編可於結帳時填寫。']
  ]},
  { cat:'課程相關', items:[
    ['可以用手機或平板上課嗎？','可以，支援電腦、手機、平板各種裝置，並可自由調整播放速度（0.5x ～ 2x）與開啟字幕。'],
    ['有提供課程素材檔嗎？','每堂課皆附講師使用的專案檔與練習素材，可於課程頁面直接下載。部分課程另附 PDF 講義。'],
    ['課程有期限嗎？會下架嗎？','已上架的課程不會下架，你可以依自己的步調反覆觀看學習，沒有觀看期限。'],
    ['可以跟講師提問嗎？','每堂課都設有留言討論區，講師與助教會在 48 小時內回覆你的學習問題。'],
    ['課程影片可以下載嗎？','為保護講師智慧財產權，目前不支援影片下載，但你可以在任何有網路的地方線上觀看。']
  ]},
  { cat:'帳號相關', items:[
    ['如何註冊帳號？','點擊右上角「免費註冊」按鈕，可使用 Email 或 LINE 帳號快速註冊，30 秒完成。'],
    ['忘記密碼怎麼辦？','在登入頁面點擊「忘記密碼」，輸入註冊信箱即可收到重設密碼連結，連結有效期為 24 小時。'],
    ['可以更換綁定的 Email 嗎？','可以，請至「帳號設定」頁面修改 Email，修改後需至新信箱完成驗證才會生效。'],
    ['如何刪除帳號？','請來信至 hi@aiclass.tw 申請帳號刪除，我們會在 3 個工作天內處理完畢。已購買的課程將無法恢復。']
  ]},
  { cat:'技術問題', items:[
    ['影片無法播放怎麼辦？','請確認網路連線穩定，並嘗試清除瀏覽器快取或更換瀏覽器。建議使用 Chrome 或 Safari 最新版本。'],
    ['影片畫質如何調整？','播放器右下角可選擇畫質，支援 480p、720p、1080p，系統會根據網路速度自動調整最佳畫質。'],
    ['可以投放到電視觀看嗎？','可以，支援 Chromecast 和 AirPlay，將課程投放至大螢幕觀看，享受更好的學習體驗。']
  ]},
  { cat:'企業方案', items:[
    ['有團購或企業方案嗎？','5 人以上即可享團購優惠，企業大量採購另有專屬方案與專人服務，歡迎來信洽詢 hi@aiclass.tw。'],
    ['企業方案可以客製化課程嗎？','可以，專業方案以上支援客製化培訓內容，我們的課程顧問會根據貴公司需求規劃專屬課程。'],
    ['有提供學習報表嗎？','企業方案提供完整的學習報表，包含員工學習時數、課程完成率、測驗成績等數據，支援 CSV 匯出。'],
    ['企業方案有人數上限嗎？','沒有上限，從 5 人小團隊到千人企業都有對應方案，可依需求彈性調整。']
  ]},
  { cat:'證書相關', items:[
    ['完課後有證書嗎？','完成課程所有章節並通過期末作業後，系統會自動發放電子完課證書，可下載或分享至 LinkedIn。'],
    ['證書有受到企業認可嗎？','AI Class 證書已獲多家企業 HR 認可作為技能評估參考，部分講師也提供推薦信服務。'],
    ['訓練營的證書和一般課程不同嗎？','訓練營結業證書會額外標注實戰專案經歷與評分，對求職更有加分效果。']
  ]},
  { cat:'講師相關', items:[
    ['如何成為 AI Class 講師？','點擊頁面底部的「成為講師」填寫申請表，我們的團隊會在 5 個工作天內審核並回覆您。'],
    ['講師的收益分潤比例是多少？','講師可獲得課程銷售收入的 70%，透過平台導流的銷售則為 50%，每月 15 日結算上月款項。'],
    ['講師需要自己拍攝嗎？','可以自行拍攝也可以使用平台合作的攝影團隊，攝影棚費用另計但提供優惠價格。']
  ]}
];

// ── 優惠券 ──
window.COUPONS = [
  { code: 'WELCOME200', discount: 200, type: 'fixed', min: 1000, desc: '新會員首購折 $200', expires: '2026-12-31', limit: 1 },
  { code: 'AI2026', discount: 15, type: 'percent', min: 2000, desc: 'AI 課程 85 折', expires: '2026-11-30', cats: ['ai'], limit: 3 },
  { code: 'DOUBLE11', discount: 1111, type: 'fixed', min: 5000, desc: '雙 11 限定折 $1,111', expires: '2026-11-11', limit: 1 },
  { code: 'FRIEND50', discount: 50, type: 'fixed', min: 0, desc: '好友邀請折 $50', expires: '2026-12-31', limit: 5 },
  { code: 'DESIGN20', discount: 20, type: 'percent', min: 3000, desc: '設計類課程 8 折', expires: '2026-11-30', cats: ['design'], limit: 2 },
  { code: 'BAKE300', discount: 300, type: 'fixed', min: 1500, desc: '烘焙料理折 $300', expires: '2026-12-15', cats: ['baking'], limit: 2 }
];

// ── 成就徽章 ──
window.BADGES = [
  { id: 'bg1', name: '初來乍到', icon: '🌱', desc: '完成帳號註冊', xp: 10 },
  { id: 'bg2', name: '第一堂課', icon: '🎓', desc: '完成第一個課程章節', xp: 20 },
  { id: 'bg3', name: '學習達人', icon: '📚', desc: '累計觀看 10 小時', xp: 50 },
  { id: 'bg4', name: '完課勇者', icon: '🏆', desc: '完成一門完整課程', xp: 100 },
  { id: 'bg5', name: '知識狂人', icon: '🧠', desc: '完成 5 門課程', xp: 300 },
  { id: 'bg6', name: '連續簽到王', icon: '🔥', desc: '連續 30 天出席', xp: 200 },
  { id: 'bg7', name: '社群之星', icon: '⭐', desc: '留言被按讚 50 次', xp: 150 },
  { id: 'bg8', name: '筆記達人', icon: '📝', desc: '累計寫下 100 則筆記', xp: 100 },
  { id: 'bg9', name: '測驗滿分', icon: '💯', desc: '任一測驗取得滿分', xp: 80 },
  { id: 'bg10', name: '分享推手', icon: '🤝', desc: '邀請 3 位好友加入', xp: 120 },
  { id: 'bg11', name: '早鳥學員', icon: '🐦', desc: '連續 7 天在 8 點前上課', xp: 60 },
  { id: 'bg12', name: '全能學霸', icon: '👑', desc: '在 3 個以上類別完課', xp: 500 }
];

// ── 排行榜 ──
window.LEADERBOARD = [
  { rank: 1, name: '小明同學', avatar: '🦊', xp: 12840, courses: 18, streak: 45 },
  { rank: 2, name: '設計女孩', avatar: '🎨', xp: 11520, courses: 15, streak: 38 },
  { rank: 3, name: 'AI 探索者', avatar: '🤖', xp: 10980, courses: 14, streak: 52 },
  { rank: 4, name: '烘焙小廚', avatar: '🧁', xp: 9870, courses: 12, streak: 30 },
  { rank: 5, name: '影像工作室', avatar: '🎬', xp: 9340, courses: 11, streak: 28 },
  { rank: 6, name: '前端新手村', avatar: '💻', xp: 8760, courses: 10, streak: 41 },
  { rank: 7, name: '音樂創作者', avatar: '🎵', xp: 8210, courses: 9, streak: 25 },
  { rank: 8, name: '理財小白', avatar: '💰', xp: 7650, courses: 8, streak: 33 },
  { rank: 9, name: '健身日記', avatar: '💪', xp: 7120, courses: 7, streak: 22 },
  { rank: 10, name: '插畫練習生', avatar: '✏️', xp: 6890, courses: 8, streak: 19 }
];

// ── 測驗題庫 ──
window.QUIZZES = [
  { id: 'q1', course: 'c03', title: 'AI 應用開發基礎測驗', questions: [
    { q: 'RAG 的全稱是什麼？', opts: ['Retrieval-Augmented Generation', 'Random Access Generator', 'Real-time AI Gateway', 'Recursive Algorithm Graph'], ans: 0 },
    { q: '以下哪個不是常見的 Embedding 模型？', opts: ['text-embedding-3-small', 'BERT', 'GPT-4', 'all-MiniLM'], ans: 2 },
    { q: 'Prompt Engineering 中，Few-shot 指的是？', opts: ['提供少量範例引導模型', '用少量資料微調模型', '減少模型輸出長度', '限制 API 呼叫次數'], ans: 0 },
    { q: 'Function Calling 的主要用途是？', opts: ['讓模型呼叫外部工具或 API', '加速模型推論速度', '減少模型幻覺', '壓縮模型大小'], ans: 0 },
    { q: 'Vector Database 主要儲存什麼？', opts: ['文字向量嵌入', 'SQL 結構化資料', '圖片檔案', '影片串流'], ans: 0 }
  ]},
  { id: 'q2', course: 'c24', title: '前端開發基礎測驗', questions: [
    { q: 'CSS 中 flexbox 的主軸預設方向是？', opts: ['row（水平）', 'column（垂直）', 'row-reverse', 'column-reverse'], ans: 0 },
    { q: 'JavaScript 中 === 和 == 的差別？', opts: ['=== 不做型別轉換', '沒有差別', '=== 速度較慢', '== 只比較型別'], ans: 0 },
    { q: 'HTML5 的語意標籤不包含？', opts: ['<div>', '<article>', '<section>', '<nav>'], ans: 0 },
    { q: 'CSS Grid 中 fr 單位代表？', opts: ['可用空間的比例', '固定像素', '百分比', '字型大小'], ans: 0 },
    { q: 'addEventListener 的第三個參數是？', opts: ['options 或 useCapture', '回呼函數', '事件名稱', '延遲時間'], ans: 0 }
  ]},
  { id: 'q3', course: 'c16', title: 'Python 基礎測驗', questions: [
    { q: 'Python 中 list 和 tuple 的主要差別？', opts: ['list 可變、tuple 不可變', '沒有差別', 'tuple 較快但功能相同', 'list 只能存數字'], ans: 0 },
    { q: '以下哪個是 Python 的套件管理工具？', opts: ['pip', 'npm', 'yarn', 'cargo'], ans: 0 },
    { q: 'Python 的 lambda 是什麼？', opts: ['匿名函數', '迴圈語法', '例外處理', '類別繼承'], ans: 0 },
    { q: 'f-string 是哪個版本引入的？', opts: ['3.6', '2.7', '3.0', '3.10'], ans: 0 },
    { q: 'Python 的 GIL 會影響？', opts: ['多執行緒的 CPU 密集任務', '所有程式的執行速度', '記憶體管理', '檔案讀寫'], ans: 0 }
  ]}
];

// ── 直播活動 ──
window.LIVE_EVENTS = [
  { id: 'ev1', title: 'AI 繪圖工作坊：從零到商用', host: '黃士誠', date: '2026-11-08 20:00', duration: 90, enrolled: 342, max: 500, course: 'c47', status: 'upcoming' },
  { id: 'ev2', title: '設計師職涯問答：轉職與接案', host: '陳柏睿', date: '2026-11-10 14:00', duration: 60, enrolled: 218, max: 300, course: 'c02', status: 'upcoming' },
  { id: 'ev3', title: '法式甜點直播教學：焦糖布蕾', host: '張馨予', date: '2026-11-12 19:00', duration: 120, enrolled: 456, max: 500, course: 'c45', status: 'upcoming' },
  { id: 'ev4', title: 'Python 自動化實作 Live Coding', host: '羅志偉', date: '2026-11-15 20:00', duration: 90, enrolled: 389, max: 500, course: 'c16', status: 'upcoming' },
  { id: 'ev5', title: '遊戲開發者座談：獨立遊戲的第一步', host: '陳威宏', date: '2026-11-18 19:30', duration: 60, enrolled: 187, max: 300, course: 'c38', status: 'upcoming' },
  { id: 'ev6', title: '前端面試模擬：React 實戰解題', host: '蔡承恩', date: '2026-10-25 20:00', duration: 90, enrolled: 500, max: 500, course: 'c26', status: 'ended', replay: true },
  { id: 'ev7', title: '短影音創作者交流會', host: '趙宥翔', date: '2026-10-20 14:00', duration: 60, enrolled: 300, max: 300, course: 'c27', status: 'ended', replay: true },
  { id: 'ev8', title: '品牌設計案例分享：從策略到落地', host: '林予安', date: '2026-10-15 19:00', duration: 75, enrolled: 245, max: 300, course: 'c50', status: 'ended', replay: true }
];

// ── 社群討論（模擬） ──
window.COMMUNITY_POSTS = [
  { id: 'cp1', author: '小明同學', avatar: '🦊', title: '分享我的 AI 助理作品——客服機器人 Demo', content: '跟著黃老師的課程做出了第一個 RAG 客服機器人，正確率大概 85%，還在調整 Prompt...', course: 'c03', likes: 48, replies: 12, time: '2 小時前', tags: ['作品分享'] },
  { id: 'cp2', author: '設計女孩', avatar: '🎨', title: '第一次用 Figma 做完整 App 設計，求feedback！', content: '花了兩週完成了一個記帳 App 的 UI 設計，Auto Layout 真的太好用了！', course: 'c02', likes: 36, replies: 8, time: '5 小時前', tags: ['作品分享', '求回饋'] },
  { id: 'cp3', author: '烘焙小廚', avatar: '🧁', title: '閃電泡芙成功了！分享我的心得', content: '第三次嘗試終於成功，關鍵是泡芙麵糊的溫度和擠花的手法，老師的 tip 真的很重要。', course: 'c45', likes: 72, replies: 23, time: '8 小時前', tags: ['心得分享'] },
  { id: 'cp4', author: '前端新手村', avatar: '💻', title: 'JavaScript 閉包到底怎麼理解？', content: '看了好幾次還是有點模糊，有沒有大大可以用簡單的例子解釋一下？', course: 'c24', likes: 15, replies: 31, time: '1 天前', tags: ['發問'] },
  { id: 'cp5', author: 'AI 探索者', avatar: '🤖', title: 'Midjourney v6 的 Prompt 技巧整理', content: '整理了 50 個高品質出圖的 Prompt 模板，包含風格指定、構圖控制和負面提示...', course: 'c47', likes: 156, replies: 42, time: '1 天前', tags: ['筆記分享', '資源'] },
  { id: 'cp6', author: '健身日記', avatar: '💪', title: '跟著 12 週課表練了 8 週的變化', content: '體脂從 28% 降到 23%，附上前後對比照。飲食調整真的是關鍵！', course: 'c31', likes: 234, replies: 56, time: '2 天前', tags: ['心得分享', '成果'] },
  { id: 'cp7', author: '音樂創作者', avatar: '🎵', title: '用 Ableton 做出的第一首 Lo-fi Beat', content: '雖然還很青澀，但終於從零完成了一首完整的作品，感動！附上 SoundCloud 連結。', course: 'c28', likes: 89, replies: 18, time: '2 天前', tags: ['作品分享'] },
  { id: 'cp8', author: '理財小白', avatar: '💰', title: 'ETF 定期定額三個月心得分享', content: '跟著郭老師的配置建議投了 0050 和 00878，雖然才三個月但心態穩多了。', course: 'c41', likes: 67, replies: 29, time: '3 天前', tags: ['心得分享'] }
];

// ── 課程章節結構（供課程詳情頁使用） ──
window.CHAPTERS = {
  c03: [
    { ch: 1, title: '課程導覽與環境建置', lessons: ['課程大綱與學習路線', '開發環境安裝（Python + VS Code）', 'API Key 申請與設定', '第一次呼叫 AI API'], duration: 85 },
    { ch: 2, title: 'Prompt Engineering', lessons: ['Prompt 設計原則', 'Zero-shot vs Few-shot', 'System Prompt 與角色設定', 'Chain of Thought 推理', '實作：智慧客服 Prompt'], duration: 120 },
    { ch: 3, title: 'Function Calling 與工具整合', lessons: ['Function Calling 原理', '定義工具 Schema', '連接外部 API', '多工具串接實作', '錯誤處理與回退機制'], duration: 110 },
    { ch: 4, title: 'RAG 架構實作', lessons: ['Embedding 向量嵌入概念', 'Vector Database 選擇與設定', '文件切割與索引建立', 'Retrieval 策略與排序', '實作：企業知識庫問答'], duration: 150 },
    { ch: 5, title: '部署與上線', lessons: ['API 服務架構設計', 'FastAPI 後端開發', 'Docker 容器化', '雲端部署（GCP / AWS）', '監控與迭代優化', '期末專案：完整 AI 助手'], duration: 140 }
  ],
  c24: [
    { ch: 1, title: 'HTML 基礎', lessons: ['網頁結構與標籤', '文字排版與連結', '圖片與多媒體', '表格與表單', '語意化標籤'], duration: 95 },
    { ch: 2, title: 'CSS 排版與樣式', lessons: ['選擇器與優先權', 'Box Model 盒模型', 'Flexbox 彈性排版', 'Grid 網格系統', '響應式設計 RWD', '動畫與過渡效果'], duration: 130 },
    { ch: 3, title: 'JavaScript 核心', lessons: ['變數、型別與運算子', '函數與作用域', '陣列與物件操作', 'DOM 操作與事件', '非同步與 Promise', 'Fetch API 串接'], duration: 160 },
    { ch: 4, title: '專案實作', lessons: ['專案一：個人履歷網站', '專案二：Todo App', '專案三：天氣查詢', '專案四：電影搜尋', '專案五：部落格系統'], duration: 200 },
    { ch: 5, title: '部署與進階', lessons: ['Git 版本控制', 'GitHub Pages 部署', '效能優化基礎', '無障礙設計', '前端面試準備'], duration: 95 }
  ],
  c01: [
    { ch: 1, title: '字體設計概論', lessons: ['什麼是品牌字體', '字型發展簡史', '中文與西文字體差異', '案例解析：世界知名品牌字型'], duration: 70 },
    { ch: 2, title: '手繪草圖', lessons: ['工具準備與握筆方式', '筆畫結構分析', '草圖發想流程', '中文字的骨架與重心', '英文字母比例基準'], duration: 90 },
    { ch: 3, title: 'Glyphs 軟體操作', lessons: ['介面導覽與基本設定', '貝茲曲線繪製技巧', '筆畫一致性調校', '中文注音／部首拆解', '字距與字偶對設定'], duration: 130 },
    { ch: 4, title: '品牌字型系統', lessons: ['字重家族規劃', '中英文配字原則', '數字與標點設計', '排版測試與微調', '品牌手冊整合'], duration: 110 },
    { ch: 5, title: '授權與上架', lessons: ['字型格式匯出（OTF / TTF / WOFF2）', '授權模式選擇', '字型平台上架流程', '版權保護與浮水印'], duration: 60 }
  ],
  c02: [
    { ch: 1, title: 'UX 研究基礎', lessons: ['使用者訪談方法', '競品分析框架', '人物誌與情境', 'User Journey Map'], duration: 80 },
    { ch: 2, title: 'Figma 核心技巧', lessons: ['Frame 與 Auto Layout', '元件與 Variants', '設計系統建立', 'Token 管理與命名'], duration: 110 },
    { ch: 3, title: 'UI 視覺設計', lessons: ['色彩系統規劃', '文字排版層級', '圖標風格統一', '間距與格線系統', '深色模式適配'], duration: 120 },
    { ch: 4, title: 'Prototype 與交互', lessons: ['互動原型製作', '微動效設計', 'Smart Animate 進階', '使用者測試流程'], duration: 100 },
    { ch: 5, title: 'Dev Mode 交付', lessons: ['標注與切圖匯出', 'CSS 屬性對照', '與前端溝通要點', '設計 QA 檢查清單', '期末作品發表'], duration: 90 }
  ],
  c05: [
    { ch: 1, title: '角色設計基礎', lessons: ['角色設計的市場需求', '風格參考與情緒版', '基本體型與比例', '臉型與五官設計'], duration: 75 },
    { ch: 2, title: '配色與光影', lessons: ['色彩心理學與角色個性', '固有色選擇策略', '光源方向與投影', '環境色反射處理'], duration: 90 },
    { ch: 3, title: '表情與動態', lessons: ['表情九宮格練習', '身體語言與姿勢', '動作線與重心', '服裝與配件設計'], duration: 105 },
    { ch: 4, title: '角色 IP 開發', lessons: ['世界觀設定文件', '角色關係圖譜', '周邊商品設計', '社群行銷應用'], duration: 95 },
    { ch: 5, title: '作品集整理', lessons: ['作品展示排版', '個人品牌建立', '接案報價策略', 'Behance / ArtStation 上架'], duration: 55 }
  ],
  c10: [
    { ch: 1, title: '攝影基礎', lessons: ['相機與鏡頭選擇', '曝光三角（光圈/快門/ISO）', '對焦模式與景深', '白平衡與色溫'], duration: 80 },
    { ch: 2, title: '構圖與光線', lessons: ['三分法與引導線', '自然光運用', '人工補光基礎', '黃金時刻拍攝'], duration: 85 },
    { ch: 3, title: '主題攝影', lessons: ['人像攝影與引導', '風景攝影長曝', '美食攝影打光', '街頭攝影快拍'], duration: 110 },
    { ch: 4, title: 'Lightroom 修圖', lessons: ['RAW 檔處理流程', '色調與色彩分級', '局部調整工具', '預設檔製作與批次處理'], duration: 95 },
    { ch: 5, title: '作品與接案', lessons: ['攝影集編排', '個人網站建置', '報價與合約', '客戶溝通技巧'], duration: 50 }
  ],
  c08: [
    { ch: 1, title: 'Blender 入門', lessons: ['介面與快捷鍵', '基本建模工具', 'Modifier 修改器', '場景管理與 Collection'], duration: 90 },
    { ch: 2, title: '角色建模', lessons: ['人體參考與比例', '面部拓撲規劃', 'Sculpt 模式精修', 'Retopology 優化', 'UV 展開'], duration: 150 },
    { ch: 3, title: '材質與貼圖', lessons: ['Shader Editor 節點', 'PBR 材質原理', 'Texture Paint 手繪貼圖', '程序性材質', 'HDRI 環境照明'], duration: 120 },
    { ch: 4, title: '骨架與動畫', lessons: ['Armature 骨骼綁定', 'Weight Paint 權重', '關鍵影格動畫', 'NLA 動作混合', '臉部動畫 Shape Key'], duration: 140 },
    { ch: 5, title: '渲染與輸出', lessons: ['Cycles 與 Eevee 選擇', '攝影機動畫', '合成節點後製', '輸出設定與格式', '作品展示發布'], duration: 80 }
  ]
};
