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
  { id: 'c72', v: '30232', cat: 'game', sub: '動畫/特效', title: '遊戲特效設計：用 Unity VFX Graph 做出華麗技能', teacher: '陳威宏', role: '技術美術・遊戲業', price: 4680, origin: 8400, rating: 4.8, students: 1560, tag: '', hours: 18, desc: '粒子系統、Shader 基礎、時間軸控制到技能連招，做出 ARPG 等級的戰鬥特效。' },

  // ── Round 36 新增 ──
  { id: 'c73', v: '50598', cat: 'design', sub: '建築', title: '建築視覺化：SketchUp 到 Lumion 的完整流程', teacher: '方翊倫', role: '建築視覺設計師', price: 5480, origin: 9600, rating: 4.8, students: 1720, tag: 'NEW', hours: 22, desc: '從 SketchUp 建模、材質貼圖到 Lumion 渲染動畫，做出提案級的建築視覺作品。' },
  { id: 'c74', v: '42824', cat: 'creative', sub: '花藝設計', title: '花藝設計入門：日常到商業的花束創作', teacher: '陳思涵', role: '花藝設計師・空間策展人', price: 3280, origin: 5800, rating: 4.9, students: 2340, tag: '', hours: 10, desc: '花材辨識、配色理論、螺旋手綁技法到婚禮佈置，做出有溫度的花藝作品。' },
  { id: 'c75', v: '46635', cat: 'ai', sub: 'AI 影像設計', title: 'Stable Diffusion 進階：ControlNet 與 LoRA 精修術', teacher: '黃士誠', role: 'AI 工程師・影像生成研究', price: 4980, origin: 8800, rating: 4.9, students: 3890, tag: 'HOT', hours: 16, desc: 'ControlNet 姿態控制、LoRA 訓練風格模型、inpainting 局部修改到批量生圖工作流。', ai: '用 ControlNet + LoRA 精準控制 AI 圖像生成' },
  { id: 'c76', v: '33853', cat: 'video', sub: 'VTuber 製作', title: 'VTuber 出道全攻略：Live2D 建模到直播設定', teacher: '楊凱文', role: '動態設計師・VTuber 技術', price: 4280, origin: 7600, rating: 4.7, students: 2560, tag: 'NEW', hours: 15, desc: '立繪拆圖、Live2D 物理演算、OBS 串接到初次直播，完成你的 VTuber 出道準備。' },
  { id: 'c77', v: '785', cat: 'drawing', sub: 'iPad 繪畫', title: 'iPad 數位插畫：Procreate 從零到接案', teacher: '張雨萱', role: '插畫家・Procreate 講師', price: 3680, origin: 6600, rating: 4.9, students: 4120, tag: 'BEST', hours: 14, desc: '筆刷設定、圖層管理、配色技巧到商業插畫實作，用 iPad 開啟你的插畫接案之路。', ai: '用 iPad + Procreate 從零開始學數位插畫到接案' },
  { id: 'c78', v: '14540', cat: 'career', sub: '創業/電商經營', title: '自媒體變現全攻略：從內容到商業模式', teacher: '劉怡君', role: '品牌策略顧問', price: 4580, origin: 8200, rating: 4.8, students: 3670, tag: '', hours: 16, desc: '內容策略、粉絲經營、業配定價、聯盟行銷到自有產品，建立多元收入來源。' },
  { id: 'c79', v: '2858', cat: 'beauty', sub: '運動健身', title: '瑜珈入門：從體位法到冥想的身心練習', teacher: '林芷萱', role: '瑜珈老師・RYT 200', price: 2480, origin: 4400, rating: 4.8, students: 3210, tag: '', hours: 10, desc: '基礎體位法、呼吸調息、核心穩定到放鬆冥想，在家就能建立每日瑜珈習慣。' },
  { id: 'c80', v: '46353', cat: 'ai', sub: 'AI 生產力', title: 'AI 辦公室革命：ChatGPT × Notion × 自動化工具', teacher: '羅志偉', role: '生產力教練・軟體工程師', price: 3280, origin: 5800, rating: 4.9, students: 5670, tag: 'HOT', hours: 11, desc: 'Prompt 模板、Notion AI 協作、Zapier 串接到 GPT API 自動化，省下每天 3 小時重複工作。', ai: '用 AI 工具組合拳每天省下 3 小時辦公時間' }
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
  ['廖**', '股市技術分析入門', '終於看懂 K 線了，不再亂追高殺低，建立了自己的進出場 SOP。'],
  ['鍾**', '水彩風景寫生', '跟著老師去戶外寫生三次，光影的觀察力完全不一樣了，朋友都說我畫得好有氣氛。'],
  ['簡**', '品牌字體設計', '沒想到字型設計有這麼多學問，上完課後幫公司設計了一套品牌字，主管超滿意。'],
  ['柯**', 'Blender 3D 建模', '從來沒碰過 3D，跟著課程做出第一個場景的時候差點哭出來，太感動了。'],
  ['潘**', '鋼琴即興與編曲', '以前只會照譜彈，現在可以即興改編任何歌曲伴奏，朋友聚會都叫我表演。'],
  ['范**', '吉他自學完整路線', '卡 F 和弦卡了一個月，靠講師教的手指練習終於過關了，現在已經能彈唱十幾首歌。'],
  ['嚴**', 'UI/UX 實戰', '課程裡的 Design Token 那章太實用了，我們公司的設計系統就是照著建的。'],
  ['石**', '家常料理職人課', '以前連煎蛋都會焦，現在三十道菜隨便挑都能做，老婆說嫁對人了。'],
  ['盧**', '影片剪輯大師課', '從業餘到接到第一個商業案只花了三個月，調色那章真的是關鍵轉折。'],
  ['魏**', '個人品牌經營', '跟著課程重新定位自己的 IG，三個月粉絲從 500 到 8000，開始有品牌找合作了。'],
  ['呂**', '品牌識別設計', '從策略到視覺一條龍學完，現在接品牌案可以從定位開始談，報價直接翻倍。'],
  ['余**', '居家健身完全指南', '產後在家帶小孩沒辦法去健身房，跟著 12 週課表練，體力恢復超多，腰痠背痛也改善了。'],
  ['田**', '資料分析實戰', '老闆每次要報表我都加班到九點，學完自動化後十分鐘搞定，現在準時下班。'],
  ['彭**', 'React 進階實戰', 'Server Actions 那章解決了我困擾半年的資料同步問題，Next.js 終於用得順手了。'],
  ['姚**', '日式凝膠美甲', '上完課在家幫自己做美甲，一個月省下兩千多的美甲費，做出來比外面還好看。'],
  ['宋**', '電子音樂製作', '第一首完整的 Beat 做出來的時候，戴上耳機聽了十遍，太有成就感了。'],
  ['邵**', 'Procreate 完全攻略', '本來只是在 iPad 上亂畫，上完課後畫風完全不一樣了，接到第一個 LINE 貼圖案子。'],
  ['賴**', '網頁設計全攻略', '響應式設計那章讓我恍然大悟，以前切的版在手機上都歪掉，現在完全沒問題。'],
  ['傅**', '穿搭美學', '色彩診斷那堂課幫我找到適合的色系，衣櫃少了一半但穿搭反而更好看了。'],
  ['孫**', '瑜伽入門', '肩頸痠痛困擾我好幾年，跟著做了兩週的序列練習，明顯改善，睡眠品質也變好了。'],
  ['紀**', 'SEO 完全攻略', '公司網站排名從第三頁爬到第一頁只花了兩個月，老闆加薪了。'],
  ['梁**', 'Python 自動化', '文科生學程式真的不是夢，現在每天自動寄報表、自動更新試算表，同事都來問我怎麼做的。'],
  ['江**', '刀工與食材處理', '以前切菜都怕切到手，學完正確握刀姿勢和切法後，速度快了三倍還更安全。'],
  ['童**', 'Webflow 無程式碼建站', '設計師終於不用求工程師了，自己做出互動網站還能接案，CP 值超高的課。'],
  ['程**', '微電影創作', '從劇本到拍攝完成花了兩個月，雖然只有十分鐘但投了影展居然入圍了！'],
  ['蕭**', '手沖咖啡與拉花', '現在每天早上手沖一杯比外面好喝的咖啡，省錢又療癒，同事都來我座位喝。']
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
  { id: 'i1', name: '黃士誠', role: 'AI 工程師', courses: 2, students: 13010, followers: 4230, avatar: '👨‍💻', bio: '前 Google AI 研究員，專注生成式 AI 應用開發與教學' },
  { id: 'i2', name: '張雨萱', role: '插畫家・角色設計師', courses: 1, students: 4470, followers: 1890, avatar: '🎨', bio: '作品散見於 Netflix 動畫與國際繪本，擅長角色 IP 開發' },
  { id: 'i3', name: '趙宥翔', role: '影像創作者', courses: 3, students: 11740, followers: 3750, avatar: '🎬', bio: 'YouTube 百萬訂閱，專注影片製作與短影音內容創作' },
  { id: 'i4', name: '蔡承恩', role: '全端工程師', courses: 2, students: 7500, followers: 2640, avatar: '💻', bio: '前 LINE 資深工程師，擅長 React 生態系與前端架構設計' },
  { id: 'i5', name: '蔡明哲', role: '餐廳主廚', courses: 2, students: 7890, followers: 3120, avatar: '👨‍🍳', bio: '米其林餐廳主廚經歷，致力讓家庭料理也能有專業水準' },
  { id: 'i6', name: '劉怡君', role: '品牌策略顧問', courses: 3, students: 11460, followers: 4580, avatar: '📢', bio: '協助超過 200 個品牌建立線上影響力，自由工作者社群主理人' },
  { id: 'i7', name: '許家豪', role: '3D 美術總監', courses: 2, students: 5460, followers: 2210, avatar: '🎮', bio: '參與多款 AAA 遊戲開發，Blender 與 C4D 雙棲創作者' },
  { id: 'i8', name: '郭書瑜', role: '理財規劃師', courses: 2, students: 13130, followers: 5060, avatar: '💰', bio: 'CFP 國際認證理財規劃師，幫助超過 5000 人建立理財觀念' },
  { id: 'i9', name: '張馨予', role: '甜點主廚', courses: 2, students: 6150, followers: 2470, avatar: '🧁', bio: 'Le Cordon Bleu 畢業，曾任法國米其林餐廳甜點房，致力在家烘焙教學' },
  { id: 'i10', name: '陳威宏', role: '獨立遊戲開發者', courses: 3, students: 6410, followers: 1930, avatar: '🕹️', bio: 'Steam 上架三款獨立遊戲，Unity / Godot 雙棲，推動台灣獨立遊戲文化' },
  { id: 'i11', name: '李承翰', role: '商業攝影師', courses: 2, students: 6790, followers: 2850, avatar: '📷', bio: '合作品牌超過百家，擅長人像與商品攝影，作品刊登於 Vogue、GQ' },
  { id: 'i12', name: '陳思涵', role: '造型師・生活風格作家', courses: 2, students: 7210, followers: 3640, avatar: '✨', bio: '出版三本暢銷書，專注穿搭美學與極簡生活，IG 粉絲超過 20 萬' }
];

// ── 平台數據 ──
window.PLATFORM_STATS = {
  courses: 80,
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
  { id: 'ev8', title: '品牌設計案例分享：從策略到落地', host: '林予安', date: '2026-10-15 19:00', duration: 75, enrolled: 245, max: 300, course: 'c50', status: 'ended', replay: true },
  { id: 'ev9', title: '商業攝影燈光實戰：一盞燈拍出雜誌感', host: '李承翰', date: '2026-11-20 19:30', duration: 90, enrolled: 278, max: 400, course: 'c33', status: 'upcoming' },
  { id: 'ev10', title: '個人品牌經營 Q&A：從 0 到 10 萬粉', host: '劉怡君', date: '2026-11-22 14:00', duration: 75, enrolled: 410, max: 500, course: 'c53', status: 'upcoming' }
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
  { id: 'cp8', author: '理財小白', avatar: '💰', title: 'ETF 定期定額三個月心得分享', content: '跟著郭老師的配置建議投了 0050 和 00878，雖然才三個月但心態穩多了。', course: 'c41', likes: 67, replies: 29, time: '3 天前', tags: ['心得分享'] },
  { id: 'cp9', author: '水彩新手', avatar: '🎨', title: '戶外寫生第一次就下雨的慘痛經驗', content: '跟著曾老師的課買好了水彩本和旅行調色盤，結果第一次出門寫生遇到大雨，顏料全糊了...但是意外畫出了很有氛圍感的作品！', course: 'c21', likes: 112, replies: 38, time: '4 天前', tags: ['心得分享', '成果'] },
  { id: 'cp10', author: '獨立遊戲夢', avatar: '🎮', title: '用 Godot 做的第一款小遊戲上架 itch.io 了！', content: '雖然只是一個簡單的平台跳躍遊戲，但從設計到程式到美術都是自己完成的，超有成就感。感謝陳老師的課程！', course: 'c38', likes: 198, replies: 45, time: '4 天前', tags: ['作品分享', '成果'] },
  { id: 'cp11', author: '攝影菜鳥', avatar: '📸', title: '請問室內人像打光推薦什麼燈？', content: '跟著李老師的課學了基本打光，但目前只有一支機頂閃，想要升級室內棚燈，預算一萬以內有推薦嗎？', likes: 34, replies: 22, time: '5 天前', tags: ['發問'] },
  { id: 'cp12', author: '轉職工程師', avatar: '🚀', title: '非本科轉職前端三個月心得', content: '文組背景，靠著蔡老師的課從零開始學前端，三個月後拿到第一個 offer。分享我的學習時間表和面試準備方式。', course: 'c24', likes: 287, replies: 63, time: '5 天前', tags: ['心得分享', '成果'] }
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
    { ch: 1, title: '吉他入門', lessons: ['吉他種類與選購', '調音與基本姿勢', '右手刷弦節奏', '左手按弦練習', '第一首歌：小星星'], duration: 80 },
    { ch: 2, title: '開放和弦', lessons: ['C、Am、G、Em 和弦', 'D、Dm、F 和弦', '和弦轉換練習法', '常見和弦進行', '5 首經典歌曲彈唱'], duration: 100 },
    { ch: 3, title: '節奏與指法', lessons: ['8 Beat / 16 Beat 節奏', '分解和弦指法', '切音與悶音技巧', 'Shuffle 節奏', '5 首進階歌曲演練'], duration: 110 },
    { ch: 4, title: '音階與即興', lessons: ['五聲音階（Am / Em）', '音階指型記憶法', '推弦與滑音技巧', '簡易 Solo 創作', '5 首 Solo 歌曲解析'], duration: 100 },
    { ch: 5, title: '演奏進階', lessons: ['封閉和弦（F / Bm）', '移調夾使用', '簡易編曲概念', '錄音與發布', '自學路線規劃'], duration: 70 }
  ],
  c08: [
    { ch: 1, title: '攝影基礎', lessons: ['相機與鏡頭選擇', '曝光三角（光圈/快門/ISO）', '對焦模式與景深', '白平衡與色溫'], duration: 80 },
    { ch: 2, title: '構圖與光線', lessons: ['三分法與引導線', '自然光運用', '人工補光基礎', '黃金時刻拍攝'], duration: 85 },
    { ch: 3, title: '主題攝影', lessons: ['人像攝影與引導', '風景攝影長曝', '美食攝影打光', '街頭攝影快拍'], duration: 110 },
    { ch: 4, title: 'Lightroom 修圖', lessons: ['RAW 檔處理流程', '色調與色彩分級', '局部調整工具', '預設檔製作與批次處理'], duration: 95 },
    { ch: 5, title: '作品與接案', lessons: ['攝影集編排', '個人網站建置', '報價與合約', '客戶溝通技巧'], duration: 50 }
  ],
  c06: [
    { ch: 1, title: 'Blender 入門', lessons: ['介面與快捷鍵', '基本建模工具', 'Modifier 修改器', '場景管理與 Collection'], duration: 90 },
    { ch: 2, title: '硬表面建模', lessons: ['佈線原則與拓撲', 'Boolean 布林運算', '細分曲面建模', '實作：科幻武器建模', '實作：機械零件建模'], duration: 120 },
    { ch: 3, title: '雕刻與有機建模', lessons: ['雕刻筆刷介紹', 'Dyntopo 動態拓撲', 'Remesh 與 Retopo', '實作：角色頭部雕刻', '實作：生物造型雕刻'], duration: 110 },
    { ch: 4, title: '材質與燈光', lessons: ['UV 展開技巧', 'PBR 材質原理', 'Shader Editor 節點', 'HDRI 環境燈光', '三點打光法'], duration: 100 },
    { ch: 5, title: '場景合成與算圖', lessons: ['場景構圖與配置', '攝影機設定', 'Cycles vs EEVEE', '降噪與後製合成', '期末：完整場景作品'], duration: 90 }
  ],
  c16: [
    { ch: 1, title: '環境建置與基礎語法', lessons: ['Python 安裝與 IDE 設定', '變數與資料型別', '字串操作與格式化', '條件判斷與迴圈', '函數定義與模組化'], duration: 90 },
    { ch: 2, title: '檔案與資料處理', lessons: ['讀寫文字檔', 'CSV 與 Excel 自動化', 'JSON 資料處理', '正則表達式入門', '實作：批量改檔名工具'], duration: 100 },
    { ch: 3, title: '網路爬蟲實戰', lessons: ['requests 與 HTTP 基礎', 'BeautifulSoup 解析網頁', '處理分頁與動態載入', 'Selenium 模擬瀏覽器', '實作：自動比價爬蟲'], duration: 120 },
    { ch: 4, title: '自動化辦公', lessons: ['自動寄信（SMTP）', '自動產生 PDF 報表', 'LINE Notify 推播通知', '排程執行（Task Scheduler）', '實作：每日股價通知'], duration: 110 },
    { ch: 5, title: '進階應用', lessons: ['API 串接（OpenAI / Google）', '簡易 GUI 工具（tkinter）', 'Docker 打包執行環境', '部署到雲端排程', '期末：個人自動化工作流'], duration: 100 }
  ],
  c47: [
    { ch: 1, title: 'AI 繪圖概論', lessons: ['生成式 AI 原理簡介', 'Midjourney 帳號與設定', 'Stable Diffusion 本地安裝', '第一張 AI 圖片生成', '版權與商用注意事項'], duration: 70 },
    { ch: 2, title: 'Prompt 技巧大全', lessons: ['Prompt 結構拆解', '風格關鍵字庫', '負向 Prompt 策略', '參數調校（--ar、--s、--c）', '實作：10 種風格快速切換'], duration: 100 },
    { ch: 3, title: 'ControlNet 精準控制', lessons: ['Canny 邊緣偵測', 'OpenPose 人體姿態', 'Depth Map 深度圖', 'Tile 圖片高清放大', '實作：照片轉指定風格插畫'], duration: 110 },
    { ch: 4, title: 'LoRA 模型訓練', lessons: ['訓練資料集準備', 'Kohya 訓練環境設定', '參數調整與監控', '合併模型與測試', '實作：訓練專屬角色 LoRA'], duration: 130 },
    { ch: 5, title: '商用工作流', lessons: ['品牌素材批量生成', '電商商品圖製作', '社群貼文模板', '接案報價與客戶溝通', '作品集建立與發布'], duration: 80 }
  ],
  c45: [
    { ch: 1, title: '法式甜點基礎', lessons: ['工具與材料認識', '基礎麵糊與蛋糕體', '卡士達醬與甘納許', '糖漿與焦糖基礎', '溫度與時間的掌控'], duration: 85 },
    { ch: 2, title: '泡芙與塔類', lessons: ['泡芙麵糊製作要點', '經典閃電泡芙', '巴黎布列斯特泡芙', '檸檬塔與巧克力塔', '塔皮盲烤技巧'], duration: 110 },
    { ch: 3, title: '千層與酥皮', lessons: ['反摺千層酥皮', '拿破崙蛋糕', '蝴蝶酥與棕櫚葉', '國王派與杏仁奶油', '酥皮失敗排解'], duration: 120 },
    { ch: 4, title: '蛋糕與慕斯', lessons: ['歌劇院蛋糕', '覆盆莓夏洛特', '巧克力慕斯蛋糕', '鏡面淋醬技巧', '蛋糕裝飾與擠花'], duration: 130 },
    { ch: 5, title: '焦糖與糖藝', lessons: ['焦糖布蕾', '焦糖醬與太妃糖', '拉糖基礎', '糖霜裝飾', '期末：完整下午茶套組'], duration: 90 }
  ],
  c31: [
    { ch: 1, title: '訓練基礎概念', lessons: ['肌肉解剖與動作模式', '暖身與收操', '訓練變數（組數/次數/休息）', '居家設備選擇', '制定你的訓練計畫'], duration: 75 },
    { ch: 2, title: '上肢訓練', lessons: ['伏地挺身變化式', '彈力帶肩推與飛鳥', '壺鈴划船與硬舉', '核心抗旋轉訓練', '手臂孤立動作'], duration: 90 },
    { ch: 3, title: '下肢訓練', lessons: ['深蹲變化式', '弓箭步與側蹲', '臀推與臀橋', '單腳穩定訓練', '小腿與足踝強化'], duration: 90 },
    { ch: 4, title: '飲食與恢復', lessons: ['熱量與巨量營養素', '蛋白質攝取策略', '備餐規劃實作', '睡眠與壓力管理', '運動傷害預防'], duration: 80 },
    { ch: 5, title: '12 週進階課表', lessons: ['第 1–4 週：基礎期', '第 5–8 週：增量期', '第 9–12 週：強化期', '體態紀錄與調整', '結業評估與持續計畫'], duration: 70 }
  ],
  c09: [
    { ch: 1, title: '廚房準備與基本功', lessons: ['廚具選購建議', '刀工基礎練習', '火候判斷技巧', '調味比例公式', '備料流程優化'], duration: 60 },
    { ch: 2, title: '快炒與煎類', lessons: ['蒜香空心菜', '番茄炒蛋', '乾煎雞腿排', '醬燒豬五花', '糖醋里肌'], duration: 55 },
    { ch: 3, title: '燉滷與湯品', lessons: ['紅燒牛腩', '滷肉飯', '麻油雞湯', '蛤蜊絲瓜湯', '玉米排骨湯'], duration: 60 },
    { ch: 4, title: '蒸煮與涼拌', lessons: ['清蒸鱸魚', '蒜泥白肉', '涼拌小黃瓜', '皮蛋豆腐', '日式茶碗蒸'], duration: 50 },
    { ch: 5, title: '宴客菜與擺盤', lessons: ['三杯雞', '宮保蝦仁', '蔥爆牛肉', '鳳梨蝦球', '創意擺盤五種技法'], duration: 55 }
  ],
  c41: [
    { ch: 1, title: '理財觀念建立', lessons: ['為什麼要理財？', '收入支出與儲蓄率', '緊急預備金的重要性', '複利的力量', '投資風險與報酬'], duration: 55 },
    { ch: 2, title: '認識投資工具', lessons: ['股票基礎概念', '債券與固定收益', 'ETF 是什麼？', '基金與 ETF 比較', '開戶與下單實操'], duration: 65 },
    { ch: 3, title: 'ETF 定期定額', lessons: ['台股 ETF 介紹（0050/006208）', '美股 ETF 介紹（VTI/VOO）', '定期定額策略', '再平衡時機', '實作：第一筆定期定額'], duration: 70 },
    { ch: 4, title: '資產配置', lessons: ['風險承受度評估', '股債比配置', '全球分散投資', '不同人生階段的配置', '用 Excel 追蹤績效'], duration: 60 },
    { ch: 5, title: '長期投資心法', lessons: ['避開常見投資陷阱', '市場波動時怎麼辦', '稅務基礎知識', '退休規劃試算', '打造你的被動收入計畫'], duration: 50 }
  ],
  c53: [
    { ch: 1, title: '電商創業準備', lessons: ['市場趨勢分析', '選品策略與方法', '供應商開發與議價', '成本結構計算', '品牌定位與命名'], duration: 80 },
    { ch: 2, title: '商品上架與文案', lessons: ['商品攝影基礎', '標題 SEO 關鍵字', '賣點文案撰寫', '蝦皮/MOMO 上架實操', '定價策略'], duration: 90 },
    { ch: 3, title: '廣告投放', lessons: ['Facebook 廣告基礎', 'Google 購物廣告', '受眾設定與素材製作', '預算分配與出價', 'A/B 測試方法'], duration: 100 },
    { ch: 4, title: '營運與客服', lessons: ['訂單處理流程', '物流與包裝', '客服話術與退換貨', '評價管理', '庫存與現金流控管'], duration: 80 },
    { ch: 5, title: '規模化成長', lessons: ['數據分析與優化', '多通路佈局', '團隊組建與外包', '品牌官網建立', '從月入十萬到百萬'], duration: 70 }
  ],
  c38: [
    { ch: 1, title: 'Unity 開發環境', lessons: ['Unity Hub 安裝與專案建立', '介面導覽與場景管理', 'C# 基礎語法', 'MonoBehaviour 生命週期', 'Debug 與主控台'], duration: 85 },
    { ch: 2, title: '角色控制', lessons: ['Sprite 匯入與動畫', 'Rigidbody 2D 物理', '移動與跳躍控制', '地面偵測與 Coyote Time', '雙重跳躍與衝刺'], duration: 100 },
    { ch: 3, title: '關卡設計', lessons: ['Tilemap 地圖編輯', '陷阱與機關設計', '收集物與計分系統', '檢查點與存檔', '關卡切換與載入畫面'], duration: 110 },
    { ch: 4, title: '敵人與戰鬥', lessons: ['敵人 AI 巡邏路線', '追蹤與攻擊行為', 'Boss 戰設計', '生命值與傷害系統', '粒子特效與畫面震動'], duration: 120 },
    { ch: 5, title: '打磨與上架', lessons: ['UI 系統（血條/對話框）', '音效與背景音樂', '遊戲手感（Game Feel）', 'Steam 上架流程', '行銷與社群推廣'], duration: 85 }
  ],
  c04: [
    { ch: 1, title: '鍵盤基礎', lessons: ['認識鍵盤與坐姿', '五線譜與音名', '右手 C 大調音階', '左手伴奏基礎', '第一首歌：小星星'], duration: 70 },
    { ch: 2, title: '和弦與伴奏', lessons: ['三和弦原理', '常用和弦進行（I-V-vi-IV）', '左手伴奏型態', '右手旋律即興', '5 首流行歌彈奏'], duration: 85 },
    { ch: 3, title: '進階和聲', lessons: ['七和弦與延伸和弦', '和弦轉位運用', '經過和弦與替代和弦', '爵士和聲入門', '5 首進階歌曲改編'], duration: 100 },
    { ch: 4, title: '即興演奏', lessons: ['五聲音階即興', '旋律裝飾技巧', '節奏變化與切分', '和弦內音即興', '即興演奏實戰練習'], duration: 90 },
    { ch: 5, title: '編曲與錄音', lessons: ['流行歌編曲結構', 'GarageBand 錄音教學', '伴奏帶製作', '表演準備與心態', '期末：完整歌曲改編錄製'], duration: 75 }
  ],
  c11: [
    { ch: 1, title: '個人品牌定位', lessons: ['什麼是個人品牌', '找到你的獨特定位', '目標受眾分析', '品牌人設建立', '競爭者分析'], duration: 60 },
    { ch: 2, title: '內容策略', lessons: ['內容主題規劃', '內容日曆制定', '文章 vs 短影音 vs Podcast', '搜尋意圖與關鍵字', '內容覆用與分發'], duration: 70 },
    { ch: 3, title: '社群經營', lessons: ['Instagram 經營策略', 'YouTube 頻道建立', 'LinkedIn 專業形象', '社群互動與社群感', '數據分析與調整'], duration: 80 },
    { ch: 4, title: '變現模式', lessons: ['接案與顧問服務', '線上課程與數位產品', '聯盟行銷與業配', '會員制與訂閱制', '多元收入組合'], duration: 70 },
    { ch: 5, title: '長期經營', lessons: ['品牌一致性維護', '團隊與外包管理', '危機處理', '品牌延伸策略', '期末：品牌企劃書完成'], duration: 55 }
  ],
  c12: [
    { ch: 1, title: 'AE 基礎操作', lessons: ['介面與工作區設定', '圖層類型與屬性', '關鍵影格動畫', '時間軸與速度曲線', '預覽與輸出設定'], duration: 80 },
    { ch: 2, title: '文字與形狀動畫', lessons: ['文字動畫器', '形狀圖層繪製', '路徑動畫', 'Trim Paths 技巧', '實作：動態 Logo'], duration: 90 },
    { ch: 3, title: '表達式入門', lessons: ['wiggle 與 loopOut', 'time 與 Math 函數', '圖層間連結', '彈性表達式', '實作：自動化動態圖表'], duration: 100 },
    { ch: 4, title: '特效與合成', lessons: ['粒子特效（CC Particle）', '追蹤與穩定', '色彩校正', '綠幕去背', '實作：社群短影音動態'], duration: 110 },
    { ch: 5, title: '作品與工作流', lessons: ['Lottie 動畫匯出', '與 Premiere 協作', '動態設計師作品集', '接案報價參考', '期末：完整品牌動態包'], duration: 70 }
  ],
  c14: [
    { ch: 1, title: '概念藝術導論', lessons: ['概念藝術在產業中的角色', '影響圖與情緒版製作', '風格探索與定義', '快速草圖技巧', '構圖基本原則'], duration: 80 },
    { ch: 2, title: '場景設計', lessons: ['透視與空間感', '地形與建築語言', '光影氛圍營造', '色彩劇本', '實作：奇幻城市場景'], duration: 110 },
    { ch: 3, title: '生物與角色設計', lessons: ['生物解剖參考', '混合特徵設計法', '材質與紋理表現', '比例與誇張化', '實作：原創生物設計'], duration: 100 },
    { ch: 4, title: '道具與武器設計', lessons: ['功能性與美學平衡', '材質表現（金屬/木/布）', '設計語言統一', '三視圖製作', '實作：武器概念設計'], duration: 95 },
    { ch: 5, title: '世界觀整合', lessons: ['世界觀設定文件撰寫', '視覺風格指南', '場景與角色整合', '作品集排版', '期末：完整世界觀設計'], duration: 85 }
  ],
  c19: [
    { ch: 1, title: '網頁設計基礎', lessons: ['網頁設計趨勢概覽', 'Wireframe 線框圖', '視覺階層與排版', '格線系統運用', '色彩與字體選擇'], duration: 80 },
    { ch: 2, title: '響應式設計', lessons: ['行動優先設計思維', '斷點策略規劃', '彈性圖片與影片', '導覽列響應式設計', '實作：響應式 Landing Page'], duration: 100 },
    { ch: 3, title: '互動與動態', lessons: ['Hover 與微互動設計', '滾動動畫規劃', '頁面轉場效果', '表單設計與驗證', '實作：互動式作品集'], duration: 90 },
    { ch: 4, title: '設計系統建立', lessons: ['Atomic Design 方法論', '元件庫建立', '色彩與文字 Token', '間距與圓角規範', '設計交付文件'], duration: 95 },
    { ch: 5, title: '進階實務', lessons: ['SEO 友善設計', '無障礙設計原則', '效能與載入體驗', '跨瀏覽器測試', '期末：完整網站設計'], duration: 75 }
  ],
  c25: [
    { ch: 1, title: 'Python 資料分析環境', lessons: ['Anaconda 與 Jupyter 設定', 'NumPy 陣列基礎', 'Pandas DataFrame 操作', '資料型別與缺失值', '讀取 CSV / Excel / JSON'], duration: 80 },
    { ch: 2, title: '資料清理與轉換', lessons: ['缺失值處理策略', '重複值與異常值偵測', '字串處理與正則', '日期時間處理', '實作：清理真實業務資料'], duration: 90 },
    { ch: 3, title: '資料視覺化', lessons: ['Matplotlib 基礎圖表', 'Seaborn 統計視覺化', 'Plotly 互動式圖表', '圖表設計原則', '實作：銷售分析儀表板'], duration: 100 },
    { ch: 4, title: '統計分析與報表', lessons: ['描述性統計', '相關性分析', '樞紐分析表', '自動化 Excel 報表（openpyxl）', '自動寄信報表'], duration: 90 },
    { ch: 5, title: '進階應用', lessons: ['SQL 資料庫查詢', 'Web Scraping 資料蒐集', '機器學習入門（scikit-learn）', 'Streamlit 資料 App', '期末：端到端分析專案'], duration: 85 }
  ],
  c26: [
    { ch: 1, title: 'Next.js App Router', lessons: ['專案建立與目錄結構', 'Server Components vs Client Components', '路由與動態路由', 'Loading / Error / Not Found', 'Middleware 與 Layout'], duration: 95 },
    { ch: 2, title: '資料與狀態', lessons: ['Server Actions', 'Fetch 與快取策略', 'Zustand 狀態管理', 'React Query 整合', 'Optimistic Updates'], duration: 110 },
    { ch: 3, title: '認證與授權', lessons: ['NextAuth.js 設定', 'OAuth 社群登入', 'JWT 與 Session', '角色權限控管', '實作：登入與會員系統'], duration: 100 },
    { ch: 4, title: '付款與 SaaS 功能', lessons: ['Stripe 訂閱模式', 'Webhook 處理', '用量計費實作', 'Admin Dashboard', '實作：SaaS 定價頁面'], duration: 110 },
    { ch: 5, title: '部署與優化', lessons: ['Vercel 部署設定', 'Edge Runtime', 'ISR 與 On-demand Revalidation', '效能監控與 Analytics', '期末：完整 SaaS 產品'], duration: 85 }
  ],
  c27: [
    { ch: 1, title: '短影音基礎', lessons: ['短影音趨勢與平台分析', '手機拍攝設備推薦', '構圖與景別選擇', '自然光與簡易打光', '第一支短影音拍攝'], duration: 60 },
    { ch: 2, title: '運鏡與節奏', lessons: ['基礎運鏡技巧', '轉場運鏡手法', '節奏感與音樂卡點', '故事結構：開頭三秒法則', '實作：5 種常見短影音類型'], duration: 75 },
    { ch: 3, title: 'CapCut 剪輯', lessons: ['介面與基本操作', '音樂與音效搭配', '字幕與文字動畫', '特效與濾鏡運用', '實作：完整短影音剪輯'], duration: 80 },
    { ch: 4, title: '進階技巧', lessons: ['綠幕去背應用', '畫面穩定與速度控制', '多機位剪輯', '色調統一與風格化', '封面設計與標題'], duration: 70 },
    { ch: 5, title: '經營與變現', lessons: ['演算法運作原理', '選題與腳本撰寫', '粉絲互動與社群經營', '業配與商業合作', '期末：打造個人短影音品牌'], duration: 55 }
  ],
  c33: [
    { ch: 1, title: 'Premiere Pro 基礎', lessons: ['介面導覽與專案設定', '匯入素材與管理', '時間軸基本操作', '基礎剪輯技巧', '輸出設定與格式'], duration: 85 },
    { ch: 2, title: '進階剪輯', lessons: ['多機位剪輯', '巢狀序列與子片段', '速度控制與時間重映射', '關鍵影格動畫', 'J-Cut 與 L-Cut'], duration: 100 },
    { ch: 3, title: '調色與風格', lessons: ['Lumetri Color 面板', '一級校正流程', '二級調色與遮罩', 'LUT 套用與自訂', '實作：電影感調色'], duration: 95 },
    { ch: 4, title: '音效與混音', lessons: ['音訊基礎與格式', '音量調整與關鍵影格', '環境音與音效設計', 'Essential Sound 面板', '實作：完整音效混音'], duration: 90 },
    { ch: 5, title: '工作流與接案', lessons: ['Proxy 代理剪輯', '與 AE 動態圖形整合', '團隊協作流程', '接案報價與合約', '期末：完整影片作品'], duration: 80 }
  ],
  c36: [
    { ch: 1, title: '文案思維建立', lessons: ['文案的角色與價值', '消費者心理學基礎', '目標受眾分析', '品牌語調設定', 'AIDA 模型運用'], duration: 55 },
    { ch: 2, title: '標題與開頭', lessons: ['標題公式 12 種', '數字型標題技巧', '問題型標題設計', '吸睛開頭寫法', '實作：改寫 10 個標題'], duration: 60 },
    { ch: 3, title: '產品與銷售文案', lessons: ['FAB 特色利益轉換', '商品描述撰寫', 'Landing Page 結構', '社群貼文文案', '實作：完整銷售頁文案'], duration: 70 },
    { ch: 4, title: '社群與品牌文案', lessons: ['Instagram 貼文寫法', 'Facebook 廣告文案', 'Email 行銷文案', '品牌故事撰寫', '實作：一週社群內容排程'], duration: 65 },
    { ch: 5, title: '進階與接案', lessons: ['SEO 文案技巧', 'A/B 測試與數據優化', '文案作品集建立', '接案定價與提案', '期末：品牌文案企劃書'], duration: 50 }
  ],
  c48: [
    { ch: 1, title: 'AI 工具概論', lessons: ['ChatGPT 帳號與模型選擇', '介面操作與基本對話', 'Prompt 的基本結構', '常見錯誤與限制', '其他 AI 工具介紹'], duration: 45 },
    { ch: 2, title: '辦公室應用', lessons: ['會議紀錄自動整理', '信件撰寫與回覆', '簡報大綱生成', '翻譯與多語系處理', '實作：一天的 AI 辦公流程'], duration: 55 },
    { ch: 3, title: '數據與報表', lessons: ['Excel 公式生成', '資料分析與摘要', '圖表建議與解讀', 'SQL 查詢生成', '實作：月報自動化'], duration: 60 },
    { ch: 4, title: '內容創作', lessons: ['部落格文章撰寫', '社群貼文批量產出', '廣告文案生成', '影片腳本與標題', '實作：一週內容行事曆'], duration: 55 },
    { ch: 5, title: '進階自動化', lessons: ['GPTs 自訂助手', 'Zapier + AI 自動化', 'API 串接基礎', '個人知識庫建立', '期末：打造你的 AI 工作流'], duration: 50 }
  ],
  c55: [
    { ch: 1, title: 'LLM 基礎與微調概念', lessons: ['大型語言模型原理', '預訓練 vs 微調', 'Full Fine-tuning vs LoRA', '硬體需求與雲端方案', '實作環境建置'], duration: 80 },
    { ch: 2, title: '資料準備', lessons: ['訓練資料格式', '資料清洗與標注', '對話格式轉換', '資料品質評估', '實作：企業 FAQ 資料集'], duration: 90 },
    { ch: 3, title: 'LoRA 微調實戰', lessons: ['LoRA 原理與參數', 'Kohya / PEFT 框架', '訓練參數設定', '訓練監控與 WandB', '實作：客服模型微調'], duration: 110 },
    { ch: 4, title: 'QLoRA 與進階技巧', lessons: ['量化基礎（4-bit / 8-bit）', 'QLoRA 設定與訓練', '多任務微調', '模型合併與匯出', 'DPO 偏好對齊'], duration: 100 },
    { ch: 5, title: '部署與評估', lessons: ['vLLM 推論伺服器', 'API 服務建置', '效能評估指標', 'A/B 測試與迭代', '期末：完整微調到部署'], duration: 90 }
  ],
  c57: [
    { ch: 1, title: 'Procreate 入門', lessons: ['iPad 與觸控筆選擇', '介面導覽與手勢操作', '畫布設定與 DPI', '基本繪圖工具', '圖層系統基礎'], duration: 65 },
    { ch: 2, title: '筆刷與色彩', lessons: ['內建筆刷導覽', '自訂筆刷製作', '色彩理論基礎', '配色工具與調色盤', '實作：色彩練習 5 張'], duration: 80 },
    { ch: 3, title: '角色繪製', lessons: ['人物比例與結構', '線稿技巧', '上色流程（平塗/賽璐璐）', '光影與材質表現', '實作：完整角色插畫'], duration: 100 },
    { ch: 4, title: '場景與構圖', lessons: ['透視輔助線', '場景元素繪製', '氛圍與色彩渲染', '構圖引導視線', '實作：場景插畫作品'], duration: 90 },
    { ch: 5, title: '商用與接案', lessons: ['作品輸出與格式', '動畫製作基礎', '社群發布策略', '接案平台與報價', '期末：5 張商用作品集'], duration: 70 }
  ],
  c34: [
    { ch: 1, title: 'DaVinci Resolve 基礎', lessons: ['介面導覽與媒體管理', 'Cut 頁面快速剪輯', 'Edit 頁面進階操作', '時間軸與標記', '專案設定與輸出'], duration: 75 },
    { ch: 2, title: '一級色彩校正', lessons: ['示波器讀取方法', '色彩空間與管理', '曝光與白平衡修正', '對比度與色調控制', '實作：三段素材一級校正'], duration: 85 },
    { ch: 3, title: '二級調色', lessons: ['限定器與 Power Window', '膚色修正技巧', '天空與背景調色', '節點架構設計', '實作：電影風格調色'], duration: 95 },
    { ch: 4, title: 'LUT 與風格化', lessons: ['LUT 原理與套用', '自訂 LUT 製作', '風格化調色手法', '跨場景色調統一', '實作：個人調色風格建立'], duration: 90 },
    { ch: 5, title: '進階與交付', lessons: ['HDR 調色基礎', 'Fusion 合成入門', '音頻 Fairlight 基礎', '輸出交付規範', '期末：完整短片調色'], duration: 75 }
  ],
  c42: [
    { ch: 1, title: '自由工作者心態', lessons: ['接案 vs 上班差異', '你適合自由工作嗎', '必備技能盤點', '建立專業形象', '工作空間規劃'], duration: 50 },
    { ch: 2, title: '定價與報價', lessons: ['計算你的時薪底線', '三種定價策略', '報價單製作', '議價與談判技巧', '實作：製作個人報價模板'], duration: 55 },
    { ch: 3, title: '客戶開發', lessons: ['案源管道盤點', '接案平台經營', '個人網站與作品集', '人脈經營與轉介', '實作：撰寫提案信'], duration: 60 },
    { ch: 4, title: '專案管理', lessons: ['合約與保障', '時間管理與排程', '客戶溝通 SOP', '催款不尷尬', '處理難搞客戶'], duration: 55 },
    { ch: 5, title: '持續經營', lessons: ['財務管理與報稅', '保險與退休規劃', '多元收入建立', '從接案到品牌', '期末：自由工作者營運計畫'], duration: 45 }
  ],
  c07: [
    { ch: 1, title: '素描入門準備', lessons: ['鉛筆種類與特性', '削鉛筆與握筆姿勢', '素描紙與工具選擇', '線條基本練習', '觀察力訓練'], duration: 65 },
    { ch: 2, title: '光影基礎', lessons: ['光源方向判斷', '明暗五調子', '球體光影練習', '圓柱體與方塊', '組合靜物光影'], duration: 80 },
    { ch: 3, title: '比例與構圖', lessons: ['測量法與目測法', '人體基本比例', '構圖三分法', '物件透視基礎', '實作：靜物構圖'], duration: 75 },
    { ch: 4, title: '質感表現', lessons: ['金屬質感畫法', '玻璃與透明物體', '布料與皺褶', '木紋與石材', '毛髮與皮膚質感'], duration: 90 },
    { ch: 5, title: '完整作品', lessons: ['人物肖像素描', '風景速寫', '動物素描技巧', '作品集整理', '期末：完整素描創作'], duration: 70 }
  ],
  c13: [
    { ch: 1, title: '油畫材料認識', lessons: ['油畫顏料與媒介劑', '畫布準備與打底', '筆刷種類與用途', '調色盤配置', '色彩理論複習'], duration: 75 },
    { ch: 2, title: '古典技法', lessons: ['格里塞爾底層畫法', '透明罩染技術', '三層畫法解析', '仿古暖冷色調', '實作：古典風格頭像'], duration: 100 },
    { ch: 3, title: '人像結構', lessons: ['頭部骨骼肌肉', '五官比例與透視', '膚色調配方法', '表情捕捉技巧', '實作：四分之三側面肖像'], duration: 110 },
    { ch: 4, title: '現代筆觸', lessons: ['直接畫法（Alla Prima）', '厚塗與刮刀技巧', '筆觸表現力', '色彩溫度對比', '實作：現代風格肖像'], duration: 100 },
    { ch: 5, title: '作品完成', lessons: ['背景處理與構圖', '最終修飾與簽名', '油畫保存與上光', '作品拍攝技巧', '期末：完整肖像創作'], duration: 80 }
  ],
  c15: [
    { ch: 1, title: 'CG 場景概論', lessons: ['電影 CG 流程總覽', 'Houdini 介面與基礎', 'Nuke 介面與基礎', '太空視覺參考蒐集', '專案檔案管理'], duration: 90 },
    { ch: 2, title: '星球建模與材質', lessons: ['程序化星球生成', '地形高度圖製作', '大氣層與雲層', '行星環特效', '實作：完整星球資產'], duration: 130 },
    { ch: 3, title: '太空場景特效', lessons: ['Houdini 粒子系統', '星雲與星塵模擬', '太陽耀斑效果', '小行星帶生成', '引擎火焰與推進'], duration: 140 },
    { ch: 4, title: 'Nuke 合成', lessons: ['多通道 EXR 合成', '深度與體積霧', 'Glow 與光暈處理', '鏡頭光斑模擬', '色彩校正與調性'], duration: 120 },
    { ch: 5, title: '最終輸出', lessons: ['攝影機動畫', '場景燈光設定', 'Render Farm 設定', '最終合成與校色', '期末：完整太空場景'], duration: 100 }
  ],
  c17: [
    { ch: 1, title: '刀具基礎', lessons: ['中式菜刀 vs 西式主廚刀', '磨刀石與磨刀技巧', '正確握刀姿勢', '砧板選擇與保養', '刀具收納安全'], duration: 50 },
    { ch: 2, title: '基本切法', lessons: ['切絲、切丁、切片', '滾刀與斜刀', '剁碎與拍碎', '削皮與去核', '切花裝飾'], duration: 55 },
    { ch: 3, title: '蔬菜處理', lessons: ['葉菜類清洗與處理', '根莖類削切技巧', '菇類與豆類', '辛香料備料法', '醃漬與脫水前處理'], duration: 50 },
    { ch: 4, title: '肉類與海鮮', lessons: ['雞肉分切與去骨', '豬肉部位辨識', '牛肉熟成基礎', '魚類處理與片魚', '蝦蟹前處理'], duration: 60 },
    { ch: 5, title: '綜合實作', lessons: ['宴客菜備料流程', '快速便當備餐', '湯品食材處理', '甜點食材處理', '期末：完整套餐備料'], duration: 45 }
  ],
  c18: [
    { ch: 1, title: '數據思維', lessons: ['數據驅動決策', '常見圖表類型與適用情境', '資料清理基礎', 'Excel 樞紐分析快速上手', '好壞圖表比較'], duration: 55 },
    { ch: 2, title: '圖表設計', lessons: ['資料墨水比原則', '色彩運用與配色', '座標軸與標籤優化', '圖表動畫與互動', '實作：改造一份糟糕圖表'], duration: 60 },
    { ch: 3, title: '敘事結構', lessons: ['金字塔原理', 'SCQA 故事框架', '數據簡報三幕劇', '行動導向結論', '實作：撰寫分析摘要'], duration: 55 },
    { ch: 4, title: '簡報製作', lessons: ['PowerPoint 進階排版', '資訊圖表設計', '互動儀表板概念', '上台表達與節奏', '實作：完整數據簡報'], duration: 60 },
    { ch: 5, title: '實戰演練', lessons: ['業績報告案例', '市場分析案例', '用戶研究案例', '老闆問答模擬', '期末：數據說服力簡報'], duration: 50 }
  ],
  c20: [
    { ch: 1, title: '設計思考導論', lessons: ['什麼是設計思考', 'Double Diamond 模型', '同理心的力量', '團隊組建與分工', '工作坊準備'], duration: 65 },
    { ch: 2, title: '用戶研究', lessons: ['訪談設計與執行', '觀察法與日誌法', '問卷設計技巧', '資料分析與洞察萃取', '實作：人物誌與旅程圖'], duration: 85 },
    { ch: 3, title: '定義問題', lessons: ['HMW 問題框架', '機會點排序', '設計挑戰定義', '利害關係人對齊', '實作：問題陳述書'], duration: 70 },
    { ch: 4, title: '發想與原型', lessons: ['腦力激盪引導技巧', '概念收斂方法', '低保真原型製作', '紙上原型測試', 'Figma 互動原型'], duration: 90 },
    { ch: 5, title: '驗證與迭代', lessons: ['易用性測試執行', '測試結果分析', '迭代與改善循環', '成果發表簡報', '期末：完整工作坊帶領'], duration: 70 }
  ],
  c21: [
    { ch: 1, title: '水彩基礎', lessons: ['水彩顏料與紙張選擇', '水分控制練習', '基礎混色技巧', '平塗與漸層', '色票製作'], duration: 60 },
    { ch: 2, title: '濕中濕技法', lessons: ['濕中濕原理與時機', '天空雲朵練習', '水面倒影表現', '霧氣與空氣感', '實作：黃昏天空'], duration: 80 },
    { ch: 3, title: '戶外寫生', lessons: ['取景構圖技巧', '速寫輔助線', '戶外光影觀察', '快速記色法', '實作：公園風景'], duration: 75 },
    { ch: 4, title: '層次與細節', lessons: ['前中後景處理', '樹木與植物畫法', '建築與街景', '水流與石頭', '實作：山水風景'], duration: 85 },
    { ch: 5, title: '完整作品', lessons: ['海岸風景創作', '城市街景創作', '作品裱框與保存', '作品集編排', '期末：10 張寫生作品'], duration: 70 }
  ],
  c22: [
    { ch: 1, title: '書法工具', lessons: ['沾水筆與墨水選擇', '紙張種類與特性', '筆尖角度與壓力', '基本筆畫練習', '暖身運筆操'], duration: 55 },
    { ch: 2, title: '哥德體', lessons: ['哥德體歷史背景', '小寫字母 a-z', '大寫字母 A-Z', '數字與標點', '實作：名言佳句'], duration: 70 },
    { ch: 3, title: '義大利體', lessons: ['義大利體筆畫特徵', '小寫連體練習', '大寫花飾變化', '字間距與行距', '實作：邀請函書寫'], duration: 65 },
    { ch: 4, title: '現代花體字', lessons: ['彈性筆尖技巧', '粗細對比表現', '字母連接與花飾', '色彩墨水運用', '實作：婚禮卡片'], duration: 70 },
    { ch: 5, title: '應用與創作', lessons: ['信封書寫排版', '品牌 Logo 書法設計', '數位化與向量處理', '作品拍攝技巧', '期末：完整書法作品集'], duration: 50 }
  ],
  c23: [
    { ch: 1, title: 'C4D 基礎操作', lessons: ['介面與視窗配置', '基礎建模工具', '材質與紋理基礎', 'HDRI 環境光', '第一個 3D 場景'], duration: 80 },
    { ch: 2, title: '風格化建模', lessons: ['低多邊形理論', 'Spline 與擠壓建模', '布林運算技巧', 'MoGraph 克隆', '實作：風格化小島'], duration: 95 },
    { ch: 3, title: '材質與色彩', lessons: ['Octane 渲染器設定', '卡通材質球', '漸層與菲涅爾', '透明與發光材質', '實作：夢幻場景材質'], duration: 90 },
    { ch: 4, title: '動畫與特效', lessons: ['關鍵影格動畫', 'MoGraph 動態效果', '粒子與力場', '攝影機動畫', '實作：場景動態展示'], duration: 100 },
    { ch: 5, title: '渲染與後製', lessons: ['Octane 渲染設定', '多通道輸出', 'After Effects 後製', 'IG 作品排版', '期末：完整低多邊形世界'], duration: 75 }
  ],
  c28: [
    { ch: 1, title: 'Ableton 入門', lessons: ['Ableton Live 介面導覽', 'Session View vs Arrangement', 'MIDI 鍵盤設定', '音訊設定與延遲', '第一個 Loop'], duration: 70 },
    { ch: 2, title: '節奏製作', lessons: ['鼓機 Pattern 設計', 'Hi-Hat 變化技巧', 'Swing 與 Groove', 'Drum Rack 自訂音色', '實作：4 種曲風節奏'], duration: 90 },
    { ch: 3, title: '合成器音色', lessons: ['減法合成原理', '濾波器與包絡', 'LFO 調變技巧', 'Wavetable 合成', '實作：設計 Bass 與 Pad'], duration: 100 },
    { ch: 4, title: '編曲與結構', lessons: ['歌曲結構解析', '和弦進行選擇', '旋律寫作技巧', '自動化與漸進', '實作：完整歌曲編排'], duration: 95 },
    { ch: 5, title: '混音與發行', lessons: ['EQ 與壓縮基礎', '空間效果處理', 'Sidechain 技巧', 'Master Bus 處理', '期末：完成一首可發行單曲'], duration: 85 }
  ],
  c29: [
    { ch: 1, title: '專案管理概論', lessons: ['專案管理框架比較', '敏捷 vs 瀑布', '專案啟動與章程', '利害關係人分析', 'Notion 專案模板建立'], duration: 65 },
    { ch: 2, title: '規劃與排程', lessons: ['工作分解結構（WBS）', '甘特圖製作', '里程碑設定', '資源分配與預算', '實作：專案計畫書'], duration: 75 },
    { ch: 3, title: '執行與監控', lessons: ['每日站會與看板', '進度追蹤方法', '品質管理基礎', '變更管理流程', '實作：Notion 看板管理'], duration: 70 },
    { ch: 4, title: '風險與溝通', lessons: ['風險識別與評估', '風險應對策略', '溝通計畫制定', '會議引導技巧', '衝突解決方法'], duration: 65 },
    { ch: 5, title: '結案與覆盤', lessons: ['專案結案流程', '覆盤會議帶領', '知識管理與文件化', 'PMP 考試準備指引', '期末：完整專案模擬'], duration: 60 }
  ],
  c30: [
    { ch: 1, title: '認識自己', lessons: ['個人色彩診斷', '身型分類與辨識', '臉型與髮型搭配', '風格關鍵字探索', '建立穿搭情緒板'], duration: 50 },
    { ch: 2, title: '衣櫃整理', lessons: ['衣櫃斷捨離原則', '基本款清單', '衣物保養知識', '收納與分類', '膠囊衣櫥建立'], duration: 45 },
    { ch: 3, title: '搭配公式', lessons: ['配色三法則', '比例與層次', '材質混搭技巧', '配件點睛術', '實作：一週穿搭計畫'], duration: 55 },
    { ch: 4, title: '場合穿搭', lessons: ['職場正式穿搭', '休閒日常風格', '約會穿搭建議', '旅行膠囊衣櫥', '特殊場合穿著'], duration: 50 },
    { ch: 5, title: '風格進化', lessons: ['購物策略與預算', '品牌認識與選擇', '季節轉換技巧', '建立個人風格識別', '期末：風格指南手冊'], duration: 40 }
  ],
  c32: [
    { ch: 1, title: '認識瑜伽', lessons: ['瑜伽的起源與流派', '裝備與空間準備', '呼吸法基礎', '暖身與收操'], duration: 40 },
    { ch: 2, title: '基礎體位法', lessons: ['站姿系列', '坐姿與前彎', '後彎與扭轉', '平衡體位法', '倒立入門'], duration: 65 },
    { ch: 3, title: '序列編排', lessons: ['拜日式 A/B', '20 分鐘晨間流動', '辦公室舒緩序列', '睡前放鬆序列'], duration: 55 },
    { ch: 4, title: '進階練習', lessons: ['核心穩定訓練', '髖關節開展', '手平衡入門', '深度後彎', '冥想引導'], duration: 70 },
    { ch: 5, title: '融入生活', lessons: ['建立每日練習習慣', '飲食與能量管理', '傷害預防與修復', '期末：設計你的 30 天計畫'], duration: 45 }
  ],
  c35: [
    { ch: 1, title: '前製企劃', lessons: ['微電影 vs 短片差異', '故事發想與大綱', '劇本格式與寫作', '分鏡腳本繪製', '預算與團隊組建'], duration: 80 },
    { ch: 2, title: '拍攝技術', lessons: ['攝影機設定與鏡頭', '打光基礎（三點布光）', '收音與現場錄音', '導演與演員溝通'], duration: 75 },
    { ch: 3, title: '剪輯後製', lessons: ['Premiere 剪輯流程', '節奏與敘事剪接', '調色基礎（DaVinci）', '字幕與標題設計'], duration: 85 },
    { ch: 4, title: '聲音設計', lessons: ['對白剪輯與處理', 'Foley 音效製作', '配樂選曲與授權', '混音與輸出規格', '5.1 聲道入門'], duration: 70 },
    { ch: 5, title: '發行上映', lessons: ['影展投稿策略', 'YouTube / Vimeo 上架', '海報與預告片製作', '觀眾 Q&A 準備', '期末：完整短片發表'], duration: 60 }
  ],
  c37: [
    { ch: 1, title: '故事原理', lessons: ['為什麼人需要故事', '三幕結構', '英雄旅程模型', '衝突與張力設計'], duration: 65 },
    { ch: 2, title: '角色塑造', lessons: ['角色弧線設計', '對白寫作技巧', '動機與缺陷', '配角功能與群像', '角色履歷表練習'], duration: 75 },
    { ch: 3, title: '場景與敘事', lessons: ['場景功能分析', '視角選擇', '時間軸操控', '伏筆與呼應', '實作：短篇故事'], duration: 80 },
    { ch: 4, title: '劇本寫作', lessons: ['劇本格式規範', '場景描述技巧', '對白節奏', '改編與原創差異'], duration: 70 },
    { ch: 5, title: '投稿與出版', lessons: ['自我編輯方法', '文學獎投稿指南', '出版社提案', '自出版流程', '期末：完整短篇或劇本'], duration: 55 }
  ],
  c39: [
    { ch: 1, title: 'ZBrush 入門', lessons: ['介面與導航', 'ZSphere 基礎建模', '遮罩與提取', 'DynaMesh 工作流', '對稱雕塑'], duration: 90 },
    { ch: 2, title: '角色雕塑', lessons: ['人體比例參考', '頭部與五官雕塑', '身體肌肉結構', '手腳細節', '衣物與裝備雕塑'], duration: 120 },
    { ch: 3, title: '拓撲與 UV', lessons: ['ZRemesher 自動拓撲', '手動拓撲（Blender）', 'UV 展開策略', 'UDIM 多 UV 集', '低模 / 高模匹配'], duration: 100 },
    { ch: 4, title: 'Substance Painter', lessons: ['材質圖層系統', '智能材質與遮罩', '手繪細節', '風格化 vs 寫實', '貼圖匯出設定'], duration: 110 },
    { ch: 5, title: '作品整合', lessons: ['Marmoset Toolbag 展示', '骨架綁定基礎', '作品集 Turntable', 'ArtStation 上傳', '期末：完整角色作品'], duration: 80 }
  ],
  c40: [
    { ch: 1, title: 'Aseprite 基礎', lessons: ['介面與工具列', '調色盤建立', '圖層與畫格', '基本筆刷技巧'], duration: 50 },
    { ch: 2, title: '角色設計', lessons: ['角色比例（16x16 到 64x64）', '站立與行走動畫', '攻擊與受傷動畫', '表情與對話框'], duration: 70 },
    { ch: 3, title: '場景繪製', lessons: ['Tile 拼接原理', '地形與建築繪製', '前景與背景層次', '動態元素（水/火/煙）', '光影與氛圍'], duration: 75 },
    { ch: 4, title: 'UI 與特效', lessons: ['像素字體設計', '選單與 HUD', '粒子特效動畫', '轉場效果'], duration: 60 },
    { ch: 5, title: '整合與輸出', lessons: ['Sprite Sheet 匯出', '匯入遊戲引擎', 'Itch.io 上架', '社群經營', '期末：完整像素遊戲素材包'], duration: 50 }
  ],
  c43: [
    { ch: 1, title: '美甲基礎', lessons: ['工具與材料認識', '手部護理與前置', '甲面處理技巧', '凝膠上色基礎', '卸甲與保養'], duration: 55 },
    { ch: 2, title: '單色與漸層', lessons: ['顯白色系選擇', '單色均勻上色', '暈染漸層技巧', '法式美甲', '鏡面美甲'], duration: 65 },
    { ch: 3, title: '彩繪技巧', lessons: ['線條與幾何圖形', '花卉手繪', '大理石紋', '暈染水彩風', '貓眼膠運用'], duration: 75 },
    { ch: 4, title: '立體與飾品', lessons: ['立體雕花入門', '金屬飾品配置', '貼紙與轉印', '寶石鑲嵌', '日式風格設計'], duration: 70 },
    { ch: 5, title: '接案與經營', lessons: ['定價與成本計算', '作品拍攝技巧', '社群行銷', '客戶溝通', '期末：10 款設計作品集'], duration: 50 }
  ],
  c44: [
    { ch: 1, title: '底妝基礎', lessons: ['膚質判斷與保養', '妝前準備與防曬', '粉底液選色與上法', '遮瑕技巧', '定妝與持妝'], duration: 60 },
    { ch: 2, title: '眉眼妝容', lessons: ['眉型設計與修眉', '自然眉畫法', '眼影配色基礎', '眼線與睫毛', '韓系臥蠶妝'], duration: 70 },
    { ch: 3, title: '唇頰與修容', lessons: ['腮紅位置與手法', '修容與打亮', '唇色選擇', '咬唇妝技巧', '光澤肌打造'], duration: 55 },
    { ch: 4, title: '場合妝容', lessons: ['日常通勤妝', '約會甜美妝', '面試氣質妝', '派對亮眼妝', '拍照上鏡妝'], duration: 65 },
    { ch: 5, title: '進階技巧', lessons: ['不同臉型修飾', '單眼皮放大術', '持妝補妝技巧', '化妝品收納', '期末：完整妝容作品'], duration: 45 }
  ],
  c46: [
    { ch: 1, title: '咖啡入門', lessons: ['咖啡豆產區與風味', '烘焙度與研磨度', '水質與水溫', '基本萃取原理'], duration: 50 },
    { ch: 2, title: '手沖技法', lessons: ['V60 手沖流程', '法蘭絨濾布沖泡', 'Kalita 蛋糕濾杯', '愛樂壓與虹吸壺', '萃取參數調整'], duration: 70 },
    { ch: 3, title: '義式咖啡', lessons: ['濃縮萃取基礎', '磨豆機調整', '牛奶蒸氣打發', '拿鐵拉花基礎', '進階拉花圖形'], duration: 80 },
    { ch: 4, title: '創意飲品', lessons: ['冰滴與冷萃', '特調風味設計', '季節限定飲品', '非咖啡因選項'], duration: 55 },
    { ch: 5, title: '開店準備', lessons: ['設備採購清單', '菜單設計與定價', '空間規劃', '食安與證照', '期末：完整菜單企劃'], duration: 50 }
  ],
  c49: [
    { ch: 1, title: 'AI 基礎操作', lessons: ['介面與工作區', '選取與路徑工具', '鋼筆工具精通', '形狀建構器', '圖層與外觀面板'], duration: 80 },
    { ch: 2, title: '向量繪圖', lessons: ['幾何圖形組合', '漸層與網格填色', '筆刷與圖樣', '透視繪圖', '實作：向量插畫'], duration: 95 },
    { ch: 3, title: '文字排版', lessons: ['文字工具進階', '段落樣式', '文字繞圖', '字體配對', '實作：海報設計'], duration: 75 },
    { ch: 4, title: '品牌應用', lessons: ['Logo 設計流程', '名片與信封', '社群媒體模板', '包裝展開圖', 'Mockup 合成'], duration: 90 },
    { ch: 5, title: '接案實務', lessons: ['作品集整理', '客戶提案流程', '檔案規格與輸出', '印刷注意事項', '期末：完整品牌設計'], duration: 65 }
  ],
  c50: [
    { ch: 1, title: '品牌策略', lessons: ['品牌定位與價值主張', '目標受眾分析', '品牌人格與語調', '競爭者品牌分析', '品牌故事撰寫'], duration: 70 },
    { ch: 2, title: '視覺識別', lessons: ['Logo 設計方法論', '色彩系統建立', '字體選擇與配對', '輔助圖形設計', '品牌圖庫建立'], duration: 90 },
    { ch: 3, title: '應用系統', lessons: ['名片與文具', '簡報模板', '社群媒體套件', '包裝設計', '空間導視設計'], duration: 85 },
    { ch: 4, title: '品牌規範', lessons: ['品牌手冊架構', 'Logo 使用規範', '色彩與字體規範', '攝影與插畫風格', '數位應用規範'], duration: 75 },
    { ch: 5, title: '品牌管理', lessons: ['品牌一致性維護', '品牌延伸策略', '危機處理', '品牌價值評估', '期末：完整品牌手冊'], duration: 60 }
  ],
  c51: [
    { ch: 1, title: '花藝入門', lessons: ['花材認識與季節', '工具與器材', '花材處理與保鮮', '色彩搭配原則'], duration: 45 },
    { ch: 2, title: '花束製作', lessons: ['螺旋手綁花束', '韓式自然風花束', '迷你花束', '乾燥花束', '包裝與緞帶'], duration: 65 },
    { ch: 3, title: '桌花與盆花', lessons: ['圓形桌花', '長形餐桌花藝', '投入式花藝', '多肉組盆', '觀葉植物搭配'], duration: 60 },
    { ch: 4, title: '場合花藝', lessons: ['婚禮捧花', '胸花與手腕花', '花牆與拱門', '喪禮花籃', '節慶花藝'], duration: 70 },
    { ch: 5, title: '花藝事業', lessons: ['定價與成本', '網路接單流程', '拍攝與社群', '開店準備', '期末：作品集完成'], duration: 45 }
  ],
  c52: [
    { ch: 1, title: '空間診斷', lessons: ['小坪數常見問題', '動線規劃原則', '測量與平面圖', '風格定位'], duration: 50 },
    { ch: 2, title: '色彩與材質', lessons: ['牆面配色策略', '地板材質選擇', '窗簾與軟裝', '燈光計畫', '材質拼接技巧'], duration: 65 },
    { ch: 3, title: '收納系統', lessons: ['斷捨離實踐', '櫃體規劃', '開放式 vs 封閉式', '廚房收納', '衣櫃系統'], duration: 60 },
    { ch: 4, title: '空間改造', lessons: ['客廳改造案例', '臥室舒適度提升', '廚房翻新', '浴室升級', '陽台利用'], duration: 70 },
    { ch: 5, title: 'DIY 與採購', lessons: ['油漆 DIY', '簡易木工', 'IKEA 改造術', '採購清單與預算', '期末：改造計畫書'], duration: 55 }
  ],
  c54: [
    { ch: 1, title: 'SEO 基礎', lessons: ['搜尋引擎運作原理', 'Google 演算法演進', 'SEO 三大支柱', '免費工具介紹'], duration: 60 },
    { ch: 2, title: '關鍵字策略', lessons: ['關鍵字研究方法', '搜尋意圖分類', '長尾關鍵字策略', '競爭度分析', '關鍵字地圖'], duration: 75 },
    { ch: 3, title: '站內 SEO', lessons: ['Title 與 Meta 優化', '標題結構（H1-H6）', '內部連結策略', '圖片 SEO', '結構化資料'], duration: 80 },
    { ch: 4, title: '站外與技術 SEO', lessons: ['反向連結策略', 'Guest Post 操作', '網站速度優化', '行動裝置友善', 'Core Web Vitals'], duration: 85 },
    { ch: 5, title: '進階策略', lessons: ['內容行銷整合', 'Google Search Console', '排名追蹤與報表', 'AI 時代的 SEO', '期末：SEO 稽核報告'], duration: 65 }
  ],
  c56: [
    { ch: 1, title: '混音概論', lessons: ['混音在音樂製作中的角色', 'DAW 設定與模板', '音量平衡基礎', '聲相配置'], duration: 60 },
    { ch: 2, title: 'EQ 與壓縮', lessons: ['頻率與 EQ 類型', '減法 EQ 技巧', '壓縮器原理', '壓縮參數設定', '並聯壓縮'], duration: 80 },
    { ch: 3, title: '空間效果', lessons: ['Reverb 類型與選擇', 'Delay 創意應用', '自動化效果', '立體聲寬度', '深度營造'], duration: 75 },
    { ch: 4, title: '進階處理', lessons: ['人聲混音流程', '鼓組處理', '吉他與貝斯', '合成器與電子元素', 'Bus 混音技巧'], duration: 90 },
    { ch: 5, title: '母帶與發行', lessons: ['母帶處理基礎', 'LUFS 與響度標準', '各平台規格', '發行流程', '期末：混音一首完整歌曲'], duration: 65 }
  ],
  c58: [
    { ch: 1, title: '設計思維導論', lessons: ['什麼是產品設計思維', '雙鑽石模型', '以人為本的設計', '商業與使用者平衡'], duration: 55 },
    { ch: 2, title: '需求探索', lessons: ['使用者訪談技巧', '同理心地圖', '旅程地圖繪製', '痛點與機會分析', 'How Might We'], duration: 70 },
    { ch: 3, title: '概念發想', lessons: ['腦力激盪方法', 'Crazy 8s 練習', '概念篩選矩陣', '故事板製作'], duration: 60 },
    { ch: 4, title: '原型與驗證', lessons: ['低保真原型', 'Figma 互動原型', '易用性測試', 'A/B 測試設計', '數據驅動決策'], duration: 75 },
    { ch: 5, title: 'MVP 落地', lessons: ['MVP 定義與範圍', '技術可行性評估', '上線後追蹤指標', '迭代策略', '期末：產品設計提案'], duration: 60 }
  ],
  c59: [
    { ch: 1, title: 'Webflow 入門', lessons: ['帳號與專案建立', '介面導覽', 'Box Model 概念', 'Flexbox 排版', 'Grid 排版'], duration: 70 },
    { ch: 2, title: '頁面設計', lessons: ['導覽列設計', 'Hero 區塊', '內容區塊組合', '表單設計', '頁尾設計'], duration: 80 },
    { ch: 3, title: '動態與互動', lessons: ['滾動動畫', 'Hover 效果', '頁面轉場', 'Lottie 整合', '自訂游標'], duration: 75 },
    { ch: 4, title: 'CMS 與動態內容', lessons: ['CMS 集合建立', '動態頁面模板', '篩選與排序', '部落格系統', '作品集系統'], duration: 85 },
    { ch: 5, title: '上線與優化', lessons: ['自訂網域', 'SEO 設定', '表單串接', '效能優化', '期末：完整作品集網站'], duration: 60 }
  ],
  c60: [
    { ch: 1, title: '動畫原理', lessons: ['12 法則概述', '時間與間距', '擠壓與伸展', '預備動作', '弧形運動'], duration: 65 },
    { ch: 2, title: 'Spine 基礎', lessons: ['Spine 介面導覽', '骨架建立', '蒙皮與權重', 'IK 約束', '槽位與附件'], duration: 80 },
    { ch: 3, title: '角色動畫', lessons: ['待機動畫', '行走循環', '跑步循環', '跳躍動畫', '攻擊動畫'], duration: 90 },
    { ch: 4, title: '進階技巧', lessons: ['表情動畫', '衣物與頭髮', '特效骨骼', '動畫混合', '事件觸發'], duration: 85 },
    { ch: 5, title: '遊戲整合', lessons: ['匯出到 Unity', '匯出到 Godot', '狀態機設定', '最佳化建議', '期末：完整角色動畫集'], duration: 60 }
  ],
  c61: [
    { ch: 1, title: '麵包基礎', lessons: ['麵粉與酵母認識', '基礎揉麵技巧', '發酵判斷方法', '烤箱溫度與蒸氣', '基礎圓麵包'], duration: 70 },
    { ch: 2, title: '鄉村麵包', lessons: ['高水量麵團處理', '免揉法拖拉折疊', '鑄鐵鍋烘烤', '割紋設計', '不同粉類搭配'], duration: 80 },
    { ch: 3, title: '酸種培養', lessons: ['酸種起種養成', '餵養與維護', '酸種時間表', '酸種鄉村麵包', '酸種鬆餅與披薩'], duration: 85 },
    { ch: 4, title: '歐式麵包', lessons: ['法式長棍', '巧巴達', '佛卡夏', '裸麥麵包', '全穀物麵包'], duration: 90 },
    { ch: 5, title: '進階與販售', lessons: ['造型麵包', '內餡與抹醬', '保存與回烤', '定價與包裝', '期末：5 款麵包作品'], duration: 60 }
  ],
  c62: [
    { ch: 1, title: '中式糕點基礎', lessons: ['油皮油酥原理', '材料與工具', '內餡製備', '基礎包餡手法'], duration: 60 },
    { ch: 2, title: '月餅系列', lessons: ['廣式月餅皮', '蛋黃蓮蓉餡', '冰皮月餅', '台式綠豆椪', '模具與壓製'], duration: 80 },
    { ch: 3, title: '鳳梨酥與蛋黃酥', lessons: ['土鳳梨餡熬煮', '鳳梨酥油皮調配', '蛋黃酥層次技巧', '蛋黃處理', '烘烤與上色'], duration: 85 },
    { ch: 4, title: '其他糕點', lessons: ['太陽餅', '老婆餅', '牛舌餅', '芋頭酥', '綠豆糕'], duration: 75 },
    { ch: 5, title: '包裝與販售', lessons: ['食品安全法規', '包裝設計', '保存期限管理', '網路販售通路', '期末：禮盒組合企劃'], duration: 50 }
  ],
  c63: [
    { ch: 1, title: 'TypeScript 入門', lessons: ['為何選擇 TypeScript', '安裝與 tsconfig', '基礎型別', '型別推斷', '聯合與交集型別'], duration: 70 },
    { ch: 2, title: '進階型別', lessons: ['泛型基礎', '泛型約束', '條件型別', 'Mapped Types', 'Template Literal Types'], duration: 90 },
    { ch: 3, title: '實戰應用', lessons: ['React + TypeScript', 'API 型別定義', 'Zod 驗證整合', '型別安全的狀態管理', 'Prisma 型別'], duration: 95 },
    { ch: 4, title: '工具與設定', lessons: ['ESLint + TypeScript', 'Path Alias 設定', '宣告檔案撰寫', 'Monorepo 型別共享', '效能最佳化'], duration: 75 },
    { ch: 5, title: '大型專案', lessons: ['架構設計模式', '錯誤處理策略', '測試與型別', '遷移 JS 專案', '期末：全型別安全 App'], duration: 70 }
  ],
  c64: [
    { ch: 1, title: '攝影基礎', lessons: ['相機設定與白平衡', '光圈快門 ISO', '商品攝影器材', '手機拍攝設定'], duration: 55 },
    { ch: 2, title: '打光技巧', lessons: ['自然光運用', '單燈布光', '柔光箱與反光板', '透射光與輪廓光', '多燈組合'], duration: 75 },
    { ch: 3, title: '商品類型', lessons: ['服飾平拍與穿搭', '食物攝影', '透明物品（玻璃/液體）', '金屬與反光物品', '小物與飾品'], duration: 80 },
    { ch: 4, title: '後製修圖', lessons: ['Lightroom 基礎調色', '去背與合成', '修瑕與質感強化', '批次處理', '社群尺寸裁切'], duration: 70 },
    { ch: 5, title: '電商應用', lessons: ['白底去背商品圖', '情境圖拍攝', '影片商品展示', '圖片 SEO', '期末：10 件商品攝影'], duration: 60 }
  ],
  c65: [
    { ch: 1, title: 'Godot 入門', lessons: ['Godot 安裝與介面', '場景與節點系統', 'GDScript 基礎', '輸入與物理', '第一個小遊戲'], duration: 80 },
    { ch: 2, title: '2D 遊戲開發', lessons: ['Tilemap 地圖編輯', '角色控制器', '敵人 AI', '碰撞與傷害', 'UI 系統'], duration: 100 },
    { ch: 3, title: '3D 遊戲入門', lessons: ['3D 場景建立', '第一人稱控制', '第三人稱相機', '3D 物理', '材質與光源'], duration: 95 },
    { ch: 4, title: '遊戲系統', lessons: ['存檔與讀檔', '音效管理器', '粒子特效', '場景切換', '對話系統'], duration: 85 },
    { ch: 5, title: '發布與社群', lessons: ['匯出各平台', 'Steam 與 Itch.io', '遊戲測試', 'Game Jam 參與', '期末：完整迷你遊戲'], duration: 65 }
  ],
  c66: [
    { ch: 1, title: '頻道定位', lessons: ['利基市場選擇', '頻道名稱與品牌', '競爭者分析', '觀眾人物誌', '內容策略規劃'], duration: 55 },
    { ch: 2, title: '影片製作', lessons: ['腳本撰寫公式', '拍攝設備選擇', '收音與打光', '剪輯節奏', '字幕與特效'], duration: 80 },
    { ch: 3, title: 'YouTube SEO', lessons: ['標題撰寫技巧', '縮圖設計', '標籤與描述優化', '演算法解析', '播放清單策略'], duration: 70 },
    { ch: 4, title: '成長策略', lessons: ['前 1000 訂閱策略', '社群互動', 'Shorts 短影音', '跨平台導流', '合作與聯名'], duration: 65 },
    { ch: 5, title: '變現模式', lessons: ['YouTube 合作夥伴', '品牌業配', '會員與超級感謝', '自有產品販售', '期末：頻道成長計畫'], duration: 55 }
  ],
  c67: [
    { ch: 1, title: '寵物美容基礎', lessons: ['犬貓毛髮認識', '工具與設備', '安全與保定', '洗澡流程'], duration: 50 },
    { ch: 2, title: '基礎護理', lessons: ['指甲修剪', '耳朵清潔', '牙齒保健', '肛門腺處理', '皮膚檢查'], duration: 55 },
    { ch: 3, title: '洗護技巧', lessons: ['洗劑選擇', '吹乾與拉毛', '打結處理', '去味與除蚤', '敏感犬處理'], duration: 60 },
    { ch: 4, title: '基礎修剪', lessons: ['剪刀持法', '腳底毛修剪', '臉部修型', '身體修剪', '尾巴造型'], duration: 65 },
    { ch: 5, title: '居家護理', lessons: ['日常梳毛頻率', '季節換毛護理', '飲食與毛髮健康', '常見問題處理', '期末：完整護理流程'], duration: 40 }
  ],
  c68: [
    { ch: 1, title: 'Webtoon 入門', lessons: ['Webtoon 市場概覽', '工具選擇（CSP/Procreate）', '直式閱讀構圖', '畫布尺寸設定'], duration: 55 },
    { ch: 2, title: '故事與分鏡', lessons: ['短篇故事架構', '角色設計速寫', '分鏡節奏', '格與格之間的呼吸', '對白與音效字'], duration: 75 },
    { ch: 3, title: '繪製技巧', lessons: ['線稿效率技巧', '上色工作流', '背景速繪', '特效與氛圍', '批量製作技巧'], duration: 85 },
    { ch: 4, title: '連載經營', lessons: ['更新頻率規劃', 'Webtoon Canvas 上架', 'LINE Webtoon 投稿', '讀者互動', '數據分析'], duration: 65 },
    { ch: 5, title: '職業之路', lessons: ['漫畫比賽參加', '編輯合作', '出版與周邊', '收入模式', '期末：3 話完整短篇'], duration: 55 }
  ],
  c69: [
    { ch: 1, title: '股市基礎', lessons: ['股票市場運作', '開戶與下單', '股票代號與類股', '財報基本閱讀'], duration: 55 },
    { ch: 2, title: 'K 線入門', lessons: ['K 線組成與意義', '常見 K 線型態', '多根 K 線組合', '跳空缺口', '實作：K 線判讀練習'], duration: 70 },
    { ch: 3, title: '量價關係', lessons: ['成交量意義', '量價背離', '換手率分析', '籌碼面觀察', '主力進出判斷'], duration: 75 },
    { ch: 4, title: '技術指標', lessons: ['均線系統', 'KD 與 RSI', 'MACD 判讀', '布林通道', '指標組合運用'], duration: 80 },
    { ch: 5, title: '交易策略', lessons: ['停損停利設定', '資金管理', '交易日誌', '心態管理', '期末：模擬交易報告'], duration: 60 }
  ],
  c70: [
    { ch: 1, title: '極簡思維', lessons: ['極簡主義的核心', '消費主義反思', '定義你的「夠」', '極簡生活案例'], duration: 40 },
    { ch: 2, title: '斷捨離實踐', lessons: ['物品盤點方法', '去留判斷標準', '分類與處理', '情感物品處理', '數位斷捨離'], duration: 55 },
    { ch: 3, title: '空間整理', lessons: ['玄關與客廳', '廚房與浴室', '臥室與衣櫃', '書房與工作區', '收納系統建立'], duration: 60 },
    { ch: 4, title: '生活簡化', lessons: ['時間管理極簡版', '人際關係斷捨離', '財務極簡', '飲食簡單化'], duration: 45 },
    { ch: 5, title: '持續實踐', lessons: ['一進一出法則', '定期回顧機制', '家人溝通', '極簡旅行', '期末：30 天極簡挑戰'], duration: 35 }
  ],
  c71: [
    { ch: 1, title: '剪髮基礎', lessons: ['工具認識與保養', '分區與分線', '梳理與控制', '基本剪刀技法'], duration: 60 },
    { ch: 2, title: '層次剪裁', lessons: ['零層次（One Length）', '均等層次', '漸增層次', '漸減層次', '混合層次'], duration: 80 },
    { ch: 3, title: '日系風格', lessons: ['輕盈感打薄', '空氣感層次', '瀏海設計', '紋理剪裁', '束感造型'], duration: 75 },
    { ch: 4, title: '造型吹整', lessons: ['圓梳吹整技巧', '電棒基本捲度', '直夾造型', '造型品選擇', '男士造型'], duration: 70 },
    { ch: 5, title: '沙龍實務', lessons: ['顧客諮詢技巧', '臉型判斷與髮型建議', '溝通與提案', '效率與動線', '期末：3 款完整造型'], duration: 55 }
  ],
  c72: [
    { ch: 1, title: 'VFX Graph 入門', lessons: ['粒子系統概念', 'VFX Graph vs Particle System', '介面與節點', '基礎發射器', '屬性與生命週期'], duration: 75 },
    { ch: 2, title: '基礎特效', lessons: ['火焰特效', '煙霧與蒸氣', '電流與閃電', '水花與液體', '光束與光環'], duration: 90 },
    { ch: 3, title: '技能特效', lessons: ['近戰揮砍軌跡', '遠程投射物', '範圍爆炸', 'Buff 光環', '治療與回復'], duration: 100 },
    { ch: 4, title: '進階技巧', lessons: ['Shader Graph 整合', 'SDF 碰撞', '網格粒子', 'GPU Event 連鎖', '效能優化'], duration: 95 },
    { ch: 5, title: '專案整合', lessons: ['Timeline 整合', '觸發與狀態機', '音效同步', '作品 Reel 製作', '期末：5 個技能特效組'], duration: 70 }
  ]
};

// ── 課程組合包 ──
window.BUNDLES = [
  { id: 'bd1', name: 'AI 全能包', desc: '一次掌握 AI 時代核心技能，從基礎到實戰', courses: ['c03', 'c47', 'c48', 'c55'], price: 14800, original: 18920, save: 4120, tag: '最熱銷' },
  { id: 'bd2', name: '設計師必修包', desc: '品牌、UI/UX 到網頁設計，全方位設計能力', courses: ['c01', 'c02', 'c19', 'c49'], price: 13800, original: 18920, save: 5120, tag: '超值' },
  { id: 'bd3', name: '影像創作全包', desc: '拍攝、剪輯、調色到動態設計一次學完', courses: ['c27', 'c33', 'c34', 'c12'], price: 12800, original: 17420, save: 4620, tag: '新組合' },
  { id: 'bd4', name: '程式入門全餐', desc: 'Python 到前端再到 TypeScript，扎實程式基礎', courses: ['c16', 'c24', 'c63', 'c26'], price: 14200, original: 19820, save: 5620, tag: '省最多' },
  { id: 'bd5', name: '創業起步包', desc: '電商、行銷、SEO 到個人品牌，創業一次到位', courses: ['c53', 'c54', 'c11', 'c36'], price: 11800, original: 15120, save: 3320, tag: '' },
  { id: 'bd6', name: '生活質感包', desc: '料理、烘焙、咖啡到居家布置，提升生活品質', courses: ['c09', 'c45', 'c46', 'c52'], price: 9800, original: 13520, save: 3720, tag: '' }
];

// ── 熱門搜尋 ──
window.TRENDING_SEARCHES = ['AI 繪圖', 'Python 自動化', 'Figma UI', '影片剪輯', '前端工程師', '個人品牌', '法式甜點', 'ChatGPT', 'Blender 3D', '理財投資', 'React', 'SEO'];

// ── 學員成功故事 ──
window.SUCCESS_STORIES = [
  { name: '小陳', role: '原行政助理 → 現 UI 設計師', avatar: '👩‍💻', courses: ['c02', 'c19'], story: '在行政工作做了三年覺得沒有成長空間，利用下班時間在 AI Class 學了半年的 UI/UX 設計，從 Figma 基礎到完整作品集，成功轉職到新創公司擔任 UI 設計師，薪水提升了 40%。', salary: '38K → 55K', duration: '6 個月' },
  { name: '阿偉', role: '零基礎 → 自動化工程師', avatar: '👨‍💻', courses: ['c16', 'c03'], story: '原本是業務，完全不會寫程式。從 Python 基礎開始學，到後來做出公司的自動化報表系統，被主管看到後轉調 IT 部門，現在負責整個公司的流程自動化。', salary: '32K → 52K', duration: '8 個月' },
  { name: '小雯', role: '甜點愛好者 → 自家工作室', avatar: '👩‍🍳', courses: ['c45', 'c61'], story: '上完法式甜點和歐式麵包課程後，開始在家接單做手工甜點。從親友間的口碑到現在每月穩定接到 50 張以上訂單，已經離開原本的辦公室工作全職做甜點了。', salary: '辦公室 28K → 自營月收 6 萬+', duration: '10 個月' },
  { name: '阿凱', role: '大學生 → 接案影像工作者', avatar: '🎬', courses: ['c27', 'c33', 'c34'], story: '大二開始在 AI Class 學影片拍攝與剪輯，邊學邊接校園活動紀錄。到了大三已經能獨立接商業案，月收入超過一般上班族，畢業前就決定走自由接案路線。', salary: '在學期間月收 4 萬+', duration: '1 年' },
  { name: '曉萱', role: '行銷企劃 → AI 內容主管', avatar: '🤖', courses: ['c48', 'c47', 'c36'], story: '在原公司學會用 AI 工具後，產出效率提升三倍以上。跳槽到科技公司擔任 AI 內容主管，帶領團隊用 AI 工具重塑內容產製流程。', salary: '40K → 72K', duration: '4 個月' },
  { name: '阿明', role: '上班族 → 蝦皮百萬賣家', avatar: '🛒', courses: ['c53', 'c64', 'c54'], story: '白天上班、晚上學電商課程，從選品策略到商品攝影一步步建立自己的蝦皮店鋪。一年後月營業額突破百萬，正式辭職全職做電商。', salary: '35K → 月營收 100 萬+', duration: '1 年' }
];

// ── 即將上架（預購課程） ──
window.UPCOMING_COURSES = [
  { id: 'uc1', title: 'Swift UI 入門：打造你的第一個 iOS App', teacher: '蔡承恩', cat: 'ai', expected: '2026-12', earlybird: 3980, interest: 1240 },
  { id: 'uc2', title: 'Unreal Engine 5 入門：打造次世代遊戲場景', teacher: '何俊廷', cat: 'game', expected: '2026-12', earlybird: 5480, interest: 890 },
  { id: 'uc3', title: '數據驅動行銷：GA4 與廣告數據分析', teacher: '邱冠宇', cat: 'career', expected: '2027-01', earlybird: 3680, interest: 1560 },
  { id: 'uc4', title: 'AI 音樂製作：用 Suno 與 Udio 做出完整歌曲', teacher: '吳若晴', cat: 'creative', expected: '2027-01', earlybird: 3280, interest: 2340 }
];

// ── 文章內容模板（供文章頁使用） ──
window.ARTICLE_BODIES = {
  p1: [
    { type: 'p', text: '2026 年是 AI 技術全面進入職場的關鍵年份。從自動化辦公到創意設計，AI 正在重新定義每個產業的工作方式。如果你還在觀望要不要學 AI，這篇文章幫你整理了五項最值得投資的 AI 技能。' },
    { type: 'h2', text: '1. Prompt Engineering（提示工程）' },
    { type: 'p', text: '這是所有 AI 技能的基礎。好的 Prompt 可以讓 AI 輸出品質提升十倍以上。學會結構化提示、角色設定、思維鏈推理，你就能駕馭任何 AI 工具。' },
    { type: 'h2', text: '2. RAG 架構開發' },
    { type: 'p', text: 'Retrieval-Augmented Generation 是企業 AI 應用的核心架構。它讓 AI 能夠基於你的資料庫回答問題，而不是只靠預訓練知識。掌握這項技能的工程師，在就業市場上非常搶手。' },
    { type: 'h2', text: '3. AI 繪圖與設計' },
    { type: 'p', text: 'Midjourney、Stable Diffusion 等 AI 繪圖工具已經徹底改變了設計產業。設計師不是被取代，而是需要學會把 AI 當作超強助手。會用 AI 的設計師，產出速度是不用的十倍。' },
    { type: 'h2', text: '4. 資料分析自動化' },
    { type: 'p', text: '用 Python 結合 AI 做資料清洗、分析和視覺化，可以把原本需要一整天的報表工作壓縮到十分鐘。這是職場中 CP 值最高的技能組合。' },
    { type: 'h2', text: '5. AI Agent 開發' },
    { type: 'p', text: 'AI Agent 是 2026 年最火的技術方向。它讓 AI 不只是被動回答問題，而是能主動規劃和執行多步驟任務。Function Calling、工具整合、多 Agent 協作——這些都是 Agent 開發的核心。' },
    { type: 'p', text: '這五項技能不是互相獨立的，而是可以組合成強大的 AI 工作流。建議從 Prompt Engineering 開始，逐步往上堆疊，你會發現每一項都讓你的職場競爭力再提升一個檔次。' }
  ],
  p3: [
    { type: 'p', text: '很多插畫師技術很好，但就是不知道怎麼接案。定價太低會虧、太高沒人找。客戶在哪裡？合約怎麼簽？這篇文章分享我從全職插畫接案五年以來的實戰心得。' },
    { type: 'h2', text: '定價的三個關鍵原則' },
    { type: 'p', text: '第一，計算你的時間成本。把所有開銷（房租、軟體、設備折舊）加上你的期望月薪，除以每月可工作時數，就是你的最低時薪。第二，研究市場行情。第三，價格要隨經驗調升，每半年檢視一次。' },
    { type: 'h2', text: '哪裡找到客戶？' },
    { type: 'p', text: '最穩定的客源來自三個管道：一、個人社群（IG、Behance、ArtStation）的長期經營；二、接案平台（Fiverr、CakeResume）的主動曝光；三、過去客戶的口碑推薦。其中第三項佔我目前案量的六成以上。' },
    { type: 'h2', text: '合約與保障' },
    { type: 'p', text: '一定要簽合約，至少包含：工作範圍、修改次數、交付時程、付款方式（建議收 50% 訂金）和版權歸屬。口頭承諾在出問題時完全沒有保障。' },
    { type: 'p', text: '接案是一門生意，不只是畫圖。學會經營自己，你的插畫技能就能變成穩定的收入來源。' }
  ],
  p8: [
    { type: 'p', text: '半年前的我，還是一個完全不會寫程式的文科生。現在我坐在新公司的工位上，頭銜是「前端工程師」。這條路走得不算輕鬆，但絕對值得。' },
    { type: 'h2', text: '為什麼決定轉職？' },
    { type: 'p', text: '在原本的行政工作做了兩年，每天做的事情差不多，看不到成長空間。偶然看到朋友轉職前端的故事，覺得「寫程式把東西做出來」這件事很吸引我。於是花了一個週末研究路線，隔週就開始了。' },
    { type: 'h2', text: '我的學習路線' },
    { type: 'p', text: '第 1-2 個月：HTML / CSS / JavaScript 基礎，跟著 AI Class 的前端養成課程走。第 3-4 個月：React + Next.js，做了三個完整專案。第 5 個月：刷面試題、整理作品集。第 6 個月：面試、拿到 offer。' },
    { type: 'h2', text: '最大的困難' },
    { type: 'p', text: 'JavaScript 的非同步觀念卡了我快兩週。還好課程的留言區有很多前人的問答，加上講師親自回覆，最後用了一個「餐廳點餐」的比喻才真正搞懂 Promise。' },
    { type: 'h2', text: '給想轉職的人' },
    { type: 'p', text: '不要想太多就開始吧。每天花 2-3 小時學習，週末多花一點做專案。六個月後的你會感謝現在的自己。' }
  ],
  p2: [
    { type: 'p', text: '「我想學程式，但不知道從哪開始」——這大概是我被問最多的問題。選錯起點不只浪費時間，還會打擊信心。這篇幫你理清路線。' },
    { type: 'h2', text: '先問自己：學程式要做什麼？' },
    { type: 'p', text: '想做網站？從 HTML / CSS / JavaScript 開始。想做數據分析或自動化？Python 是你的首選。想做 App？Swift（iOS）或 Kotlin（Android）。想做遊戲？C#（Unity）或 GDScript（Godot）。先有目標，路線就清楚了。' },
    { type: 'h2', text: '為什麼推薦 Python 作為第一語言？' },
    { type: 'p', text: '語法直覺、接近自然語言、社群資源豐富、應用範圍廣（從自動化到 AI）。更重要的是，Python 讓你最快看到成果——寫三行程式就能自動改檔名，這種即時回饋是學習最好的動力。' },
    { type: 'h2', text: '學習路線建議' },
    { type: 'p', text: '第一階段（2 週）：安裝環境、變數、條件、迴圈。第二階段（2 週）：函數、模組、檔案操作。第三階段（4 週）：實作 3-5 個小專案。重點是「做」，而不是「看」。邊做邊查才是最有效的學習方式。' },
    { type: 'p', text: '不用擔心數學不好或不是理工科系。程式設計更像學一門外語——持續練習比天賦重要得多。' }
  ],
  p4: [
    { type: 'p', text: '這是 3D 新手最常問的問題之一。兩套軟體各有優勢，選對工具可以省下大量學習時間。' },
    { type: 'h2', text: 'Blender：免費且功能全面' },
    { type: 'p', text: 'Blender 完全免費開源，功能從建模、雕刻、動畫到影片剪輯一應俱全。社群龐大，YouTube 教學資源豐富。適合獨立創作者和預算有限的學生。近年更新速度飛快，已被多家 3A 工作室採用。' },
    { type: 'h2', text: 'Cinema 4D：直覺且穩定' },
    { type: 'p', text: 'C4D 的介面設計以直覺著稱，學習曲線比 Blender 平緩。MoGraph 模組在動態設計領域幾乎是業界標準。與 After Effects 的整合也非常流暢。但它是付費軟體，授權費不便宜。' },
    { type: 'h2', text: '該選哪個？' },
    { type: 'p', text: '如果你想進入遊戲或影視產業，建議學 Blender——它正在快速取代傳統付費軟體。如果你走動態設計和廣告方向，C4D + Octane 仍然是主流組合。兩者都學當然最好，但新手請先專精一個再擴展。' }
  ],
  p5: [
    { type: 'p', text: '很多人對 UI 設計師的工作有些誤解——以為就是「把畫面弄好看」。其實設計只佔一天工作的一半，另一半是溝通和思考。' },
    { type: 'h2', text: '9:00 — 晨會與需求對焦' },
    { type: 'p', text: '每天第一件事是和 PM 及工程師確認需求。這個階段最重要的是問對問題：使用者是誰？要解決什麼問題？有沒有技術限制？很多設計做白工，都是因為需求沒對清楚就動手。' },
    { type: 'h2', text: '10:00 — 設計時間' },
    { type: 'p', text: '打開 Figma 開始設計。我會先從 Wireframe 開始，確認資訊架構和互動邏輯，再進入視覺設計。善用 Auto Layout 和 Components，效率可以提升三倍以上。' },
    { type: 'h2', text: '14:00 — 設計評審' },
    { type: 'p', text: '和團隊做設計評審是一天中最重要的環節。學會「說明設計決策」比設計本身更重要——你要解釋為什麼這樣做，而不只是展示做了什麼。' },
    { type: 'p', text: 'UI 設計師不只是畫面工匠，更是使用者體驗的守護者。如果你喜歡解決問題又有美感，這是一個很棒的職業選擇。' }
  ],
  p6: [
    { type: 'p', text: '短影音已經不是趨勢，而是基礎設施。不管你做什麼行業，會拍短影音就是加分。這篇分享從零開始建立個人品牌的實戰經驗。' },
    { type: 'h2', text: '前三秒決定一切' },
    { type: 'p', text: '短影音的世界裡，前三秒就是你的名片。用問題、衝突或視覺衝擊開頭，讓觀眾停下拇指。「你知道嗎？」「別再犯這個錯了！」這類開場比慢慢鋪陳有效十倍。' },
    { type: 'h2', text: '內容比設備重要' },
    { type: 'p', text: '不需要昂貴的相機和燈光，手機就夠了。真正決定成敗的是內容價值——觀眾看完之後有沒有得到什麼。教學、分享、娛樂，三選一然後做到極致。' },
    { type: 'h2', text: '持續產出的秘訣' },
    { type: 'p', text: '批量拍攝是關鍵。一次拍 5-10 支影片的素材，再分批剪輯發布。這樣每週只需要一天拍攝，其他時間做剪輯和互動。建立 SOP 後效率會越來越高。' }
  ],
  p7: [
    { type: 'p', text: '開始居家健身最怕的就是做錯或受傷。這十個觀念先搞清楚，訓練效果事半功倍，也能避開新手最常犯的錯。' },
    { type: 'h2', text: '1. 暖身不能省' },
    { type: 'p', text: '至少五分鐘的動態暖身（關節繞環、弓箭步、手臂繞圈），讓身體準備好再開始訓練。冷啟動訓練是受傷的頭號原因。' },
    { type: 'h2', text: '2. 動作品質 > 重量 / 次數' },
    { type: 'p', text: '寧可做 10 下標準的伏地挺身，也不要做 30 下半蹲的。錯誤動作不只沒效果，還會慢慢累積成傷害。' },
    { type: 'h2', text: '3. 飲食佔七成' },
    { type: 'p', text: '「三分練七分吃」不是嘴上說說。蛋白質攝取、熱量控制和營養素平衡，決定了你的訓練成果能不能被看見。' },
    { type: 'p', text: '其他還有：充足睡眠、漸進式超負荷、休息日的重要性、核心訓練的優先級等。記住，健身是一輩子的事，不急這一兩個月。' }
  ],
  p9: [
    { type: 'p', text: '烘焙新手最怕失敗，但這五款甜點的成功率極高，不需要複雜的技術和昂貴的設備，第一次做就能成功。' },
    { type: 'h2', text: '1. 布朗尼' },
    { type: 'p', text: '把巧克力和奶油隔水融化，加入糖和蛋攪拌均勻，拌入麵粉後倒入烤模。180 度烤 25 分鐘就完成。外脆內濕的口感，新手也能做得非常好。' },
    { type: 'h2', text: '2. 乳酪蛋糕' },
    { type: 'p', text: '免烤版本只需要奶油乳酪、鮮奶油、餅乾底三種主要材料。攪拌均勻後冷藏四小時，切開就是完美的乳酪蛋糕。' },
    { type: 'h2', text: '3. 司康' },
    { type: 'p', text: '麵粉、奶油、牛奶三種材料切拌成團，切塊後直接烤。配上果醬和鮮奶油，就是英式下午茶的靈魂。' },
    { type: 'p', text: '另外兩款是提拉米蘇和瑪德蓮，都是不容易失敗的經典甜點。重點是精確秤量材料，烘焙不像料理可以憑感覺——差 10 克麵粉結果就完全不同。' }
  ],
  p10: [
    { type: 'p', text: '設計思考不是什麼深奧的理論，它是一套解決問題的方法。學會之後，不管在工作還是生活中，你看待問題的角度都會不一樣。' },
    { type: 'h2', text: '從「我覺得」到「使用者需要」' },
    { type: 'p', text: '設計思考最核心的轉變，就是不再從自己的假設出發，而是真正去理解使用者的需求。這聽起來簡單，但大部分人（包括很多設計師）都做不到。' },
    { type: 'h2', text: 'HMW 的魔力' },
    { type: 'p', text: '「我們可以如何...（How Might We）」是設計思考中最強的工具。把問題轉化成 HMW 格式，大腦會自動從「抱怨」切換到「解方」模式。' },
    { type: 'p', text: '設計思考不只是設計師的專利。PM、工程師、行銷，甚至開早餐店都能用。推薦每個人都學一次。' }
  ],
  p11: [
    { type: 'p', text: '自由工作者最大的敵人不是找不到案子，是管不住自己。在家工作沒人盯，效率要靠系統，不能靠意志力。' },
    { type: 'h2', text: '番茄鐘進化版' },
    { type: 'p', text: '傳統番茄鐘是 25 分鐘工作 + 5 分鐘休息。我的進化版：上午用 50+10（深度工作），下午用 25+5（瑣事處理）。不同類型的任務用不同節奏。' },
    { type: 'h2', text: '任務分級制' },
    { type: 'p', text: '每天只排三件「重要」任務，其他都是「處理」等級。重要任務一定在上午精力最好的時候做。先做最難的那件——吃掉那隻青蛙。' },
    { type: 'p', text: '自由不代表隨興，相反的，自律的自由工作者才能真正享受這種生活方式。' }
  ],
  p12: [
    { type: 'p', text: '影片拍完才發現色調灰灰的？不用擔心，DaVinci Resolve 免費版就有專業級的調色功能。這篇教你三個步驟做出電影感。' },
    { type: 'h2', text: '步驟一：一級校正' },
    { type: 'p', text: '先把曝光、白平衡調到正確。用示波器（Scopes）而不是用眼睛判斷——螢幕色差會騙人。把亮部拉到不過曝、暗部拉到不死黑，中間調微調。' },
    { type: 'h2', text: '步驟二：風格化' },
    { type: 'p', text: '電影感的秘密在於「降低對比度」和「偏色」。把暗部稍微偏青，亮部偏暖橘，瞬間就有了電影調。再壓一點飽和度，質感就出來了。' },
    { type: 'h2', text: '步驟三：膚色保護' },
    { type: 'p', text: '調色最怕把人臉調成奇怪的顏色。用限定器（Qualifier）選取膚色範圍，單獨微調色溫和飽和度，確保人物膚色自然。' }
  ],
  p13: [
    { type: 'p', text: '遠端工作已經是新常態。工具選對了，分散在各地的團隊也能像在同一間辦公室一樣順暢協作。' },
    { type: 'h2', text: '專案管理：Notion + Linear' },
    { type: 'p', text: 'Notion 做知識庫和文件協作，Linear 做任務追蹤和 Sprint 管理。兩者結合覆蓋了 90% 的專案管理需求。避免用太多工具——工具越少，資訊越集中。' },
    { type: 'h2', text: '溝通：Slack + Loom' },
    { type: 'p', text: '即時溝通用 Slack（善用頻道分類），非同步溝通用 Loom 錄影片說明。很多事情用三分鐘影片解釋，比打十分鐘字有效。' },
    { type: 'p', text: '其他推薦：Figma（設計協作）、GitHub（程式碼）、Cal.com（排會議）、Toggl（時間追蹤）、1Password（團隊密碼管理）、Krisp（通話降噪）。' }
  ],
  p14: [
    { type: 'p', text: '水彩是最容易入門但也最難精通的畫材之一。選對工具可以讓學習過程順暢很多，反之則會一直和材料打架。' },
    { type: 'h2', text: '水彩紙是最重要的投資' },
    { type: 'p', text: '好的水彩紙比好的顏料重要。入門推薦棉漿紙（如 Arches 300g 中粗紋），吸水性好、顏色飽和、不容易起毛。千萬不要用影印紙練習——那會讓你誤以為自己畫不好。' },
    { type: 'h2', text: '顏料不需要買齊' },
    { type: 'p', text: '12 色基本組就夠了。溫莎牛頓的 Cotman 系列是性價比之選，好賓的管狀顏料適合進階玩家。重點是學會混色——三原色理論用好了，12 色可以調出上百種變化。' },
    { type: 'p', text: '畫筆方面，一支大號圓筆（8 號或 10 號）加一支小號細節筆就能畫大部分的東西。不用一次買齊，隨著學習進度慢慢添購。' }
  ],
  p15: [
    { type: 'p', text: '在資訊爆炸的時代，標題是唯一能讓人停下來的機會。不管內容多好，標題不吸引人就沒人看。這五個公式幫你寫出高點擊標題。' },
    { type: 'h2', text: '公式一：數字 + 結果' },
    { type: 'p', text: '「5 個方法讓你的收入翻倍」「10 分鐘做出專業級PPT」——數字帶來具體感，結果帶來期待感。這是最萬用的標題公式。' },
    { type: 'h2', text: '公式二：否定 + 痛點' },
    { type: 'p', text: '「別再犯這個錯了」「90% 的人不知道的秘密」——否定句比肯定句更有吸引力。人類天生對「避免損失」的敏感度高於「獲得好處」。' },
    { type: 'p', text: '其他三個公式是：「如何」型、「為什麼」型和「對比」型。學會這五個，再根據平台特性微調，你的標題點擊率至少提升 50%。' }
  ],
  p16: [
    { type: 'p', text: 'AI 繪圖工具越來越強大，設計師是不是要被取代了？答案是不會——但工作方式會徹底改變。' },
    { type: 'h2', text: 'AI 能做什麼？不能做什麼？' },
    { type: 'p', text: 'AI 擅長快速生成大量視覺方案、風格探索和素材生成。但它不懂品牌策略、不會做使用者研究、無法理解商業脈絡。設計師的價值在於「判斷」和「決策」，而不只是「產出」。' },
    { type: 'h2', text: '設計師該如何轉型？' },
    { type: 'p', text: '第一，把 AI 當作超級助手，讓它負責草圖和發想階段。第二，強化 AI 做不到的能力——策略思考、客戶溝通、品牌管理。第三，學會用 AI 工具提高效率，而不是恐懼它。' },
    { type: 'p', text: '會用 AI 的設計師，產出速度是不用的十倍。在這個時代，最危險的不是被 AI 取代，而是被「會用 AI 的同行」取代。' }
  ],
  p17: [
    { type: 'p', text: '第一次剪片不知道從何開始？掌握這五個核心概念，就算不看完整堂課，也能剪出有節奏感的影片。' },
    { type: 'h2', text: '1. 砍掉猶豫' },
    { type: 'p', text: '新手最大的問題是捨不得剪。那段「嗯...然後...就是...」一定要剪掉。觀眾的時間很寶貴，每一秒都要有資訊量。' },
    { type: 'h2', text: '2. 用音樂帶節奏' },
    { type: 'p', text: '先選一首適合的背景音樂，讓畫面跟著音樂的節拍切換。這個簡單的技巧就能讓影片的專業感提升好幾個檔次。' },
    { type: 'p', text: '另外三個技巧是：善用 J-Cut 和 L-Cut 做流暢轉場、文字輔助加強重點、以及調色讓畫面統一。先做到這五點，你的影片就已經超過 80% 的人了。' }
  ],
  p18: [
    { type: 'p', text: '通膨每年吃掉 2-3% 的購買力，放在銀行的錢只會越來越薄。理財不是有錢人的事，而是每個人的必修課。' },
    { type: 'h2', text: '第一步：記帳' },
    { type: 'p', text: '用任何工具都行（記帳 App 或 Excel），持續記錄一個月的收支。你會發現很多「以為」的小支出，加起來驚人。知道錢花去哪，才能開始節流。' },
    { type: 'h2', text: '第二步：建立緊急預備金' },
    { type: 'p', text: '至少存下 3-6 個月的生活費當作緊急預備金，放在高利活存帳戶。這筆錢不是拿來投資的，是保護你在失業或意外時不會陷入困境。' },
    { type: 'h2', text: '第三步：開始投資 ETF' },
    { type: 'p', text: '緊急預備金存夠了，就可以開始投資。新手最推薦的方式是 ETF 定期定額——不需要看盤、不需要選股，每月固定金額自動扣款。時間會是你最好的朋友。' }
  ],
  p19: [
    { type: 'p', text: '想做遊戲，第一個問題往往是：該選哪個引擎？Unity 和 Unreal 各有擅長，選錯不會死，但會多走很多彎路。' },
    { type: 'h2', text: 'Unity：靈活、輕量、手遊首選' },
    { type: 'p', text: 'Unity 用 C# 開發，學習曲線相對平緩。2D 遊戲支援出色，跨平台能力強（一份程式碼輸出到手機、PC、Switch）。全球超過 70% 的手遊都用 Unity 開發。' },
    { type: 'h2', text: 'Unreal：畫面強悍、3A 級品質' },
    { type: 'p', text: 'Unreal Engine 5 的 Nanite 和 Lumen 技術帶來了次世代畫面。用 Blueprint 視覺化程式可以不寫程式碼就做出遊戲。但學習曲線陡峭，專案檔案也大很多。' },
    { type: 'p', text: '簡單的選擇建議：做 2D 遊戲、手遊或獨立遊戲選 Unity；做 3A 品質 3D 遊戲或建築視覺化選 Unreal。如果你是完全的新手，Godot 也是一個很棒的免費選擇。' }
  ],
  p20: [
    { type: 'p', text: 'Midjourney 不是打幾個字就會出好圖。掌握這十個 Prompt 技巧，出圖品質會有質的飛躍。' },
    { type: 'h2', text: '技巧一：明確描述風格' },
    { type: 'p', text: '別只寫「一隻貓」，要寫「一隻貓，水彩風格，宮崎駿配色，柔和光線」。風格關鍵字是決定出圖品質的第一要素。建立自己的風格關鍵字庫，效率會快很多。' },
    { type: 'h2', text: '技巧二：善用負面提示' },
    { type: 'p', text: '用 --no 參數排除不想要的元素。例如 --no text, watermark, blurry 可以避免常見的品質問題。負面提示和正面描述一樣重要。' },
    { type: 'h2', text: '技巧三：控制構圖' },
    { type: 'p', text: '加入攝影術語：close-up（特寫）、bird eye view（鳥瞰）、low angle（仰角）。AI 理解攝影語言，用對了構圖就對了。' },
    { type: 'p', text: '其他七個技巧包含：參數微調（--s、--c）、圖片權重、Remix 模式、多 Prompt 權重、Seed 固定風格、區域控制和 Vary Region 局部修改。' }
  ],
  p21: [
    { type: 'p', text: '法式甜點聽起來很難，但這五款經過簡化的食譜，在家用基本設備就能完成。送禮或下午茶都超有面子。' },
    { type: 'h2', text: '瑪德蓮（Madeleine）' },
    { type: 'p', text: '奶油、糖、蛋、麵粉——四種材料就能做。秘訣是麵糊做好後放冰箱靜置至少一小時，烤出來才會有標誌性的凸肚臍。200 度先烤 5 分鐘再降到 170 度烤 8 分鐘。' },
    { type: 'h2', text: '費南雪（Financier）' },
    { type: 'p', text: '焦化奶油的香氣是費南雪的靈魂。用蛋白不用全蛋，所以口感特別濕潤。杏仁粉的比例是關鍵——太少不香，太多會太濕。' },
    { type: 'p', text: '另外三款是可麗露（需要銅模）、焦糖布蕾（需要噴槍或烤箱）和檸檬塔（塔皮是最有挑戰的部分）。每一款都附了詳細的失敗排解指南。' }
  ],
  p22: [
    { type: 'p', text: '有作品但沒有好的展示平台，等於浪費了你的實力。一個好的線上作品集可以直接幫你帶來案子。' },
    { type: 'h2', text: '內容比版型重要' },
    { type: 'p', text: '不要花太多時間在選版型上。作品集最重要的是：精選 5-8 個最好的專案、每個專案寫清楚你的角色和貢獻、展示過程（不只是結果）。質量大於數量。' },
    { type: 'h2', text: '別忘了 SEO' },
    { type: 'p', text: '在標題、描述和圖片 alt 標籤中加入你的專業關鍵字（如「台北 UI 設計師」「品牌設計接案」），讓潛在客戶能透過 Google 找到你。' },
    { type: 'p', text: '工具推薦：Webflow（設計師首選，自由度最高）、Framer（互動效果強）、Notion + Super（最快上線）。選一個開始就對了，別在選擇上浪費時間。' }
  ],
  p23: [
    { type: 'p', text: '手沖咖啡不難，但細節決定了好不好喝。這八個新手常犯的錯誤，避開了就成功一半。' },
    { type: 'h2', text: '錯誤一：水溫太高' },
    { type: 'p', text: '沸騰的水直接沖會過度萃取，味道苦澀。最佳水溫是 88-92 度。煮沸後等 30 秒到 1 分鐘再沖，或用溫度計精確控制。' },
    { type: 'h2', text: '錯誤二：研磨太細' },
    { type: 'p', text: '研磨度太細，水流過慢，咖啡會又苦又澀。手沖建議用中粗研磨（像粗砂糖的大小）。如果濾杯裡的水超過 3 分鐘才流完，就是太細了。' },
    { type: 'p', text: '其他常見錯誤：注水太快、沒有預浸（Blooming）、咖啡豆不新鮮、水粉比不對、沒有秤重量、以及每次做法不一致。手沖是一門可以量化的技術，用數據取代感覺。' }
  ],
  p24: [
    { type: 'p', text: '設計趨勢年年在變，但底層的美學原則不會過時。2026 年有幾個值得設計師關注的方向。' },
    { type: 'h2', text: '1. AI 輔助設計工作流' },
    { type: 'p', text: 'AI 不再只是生成圖片。Figma 的 AI 功能、Adobe Firefly 的編輯能力、以及各種 AI 素材生成工具，正在改變設計師的日常工作流程。學會整合 AI 工具是 2026 年最重要的技能。' },
    { type: 'h2', text: '2. 3D 互動與空間設計' },
    { type: 'p', text: '從網頁上的 3D 產品展示到 Apple Vision Pro 的空間介面，3D 設計正在從「酷炫展示」變成「實用介面」。Spline 和 Rive 讓網頁 3D 互動門檻大幅降低。' },
    { type: 'p', text: '其他趨勢包括：自然主義色彩（大地色系回歸）、微動效（精緻而不搶眼的小動畫）、可變字體的創意運用、以及無障礙設計不再是選配而是必備。' }
  ],
  p25: [
    { type: 'p', text: '忙碌不是不運動的藉口。這套 15 分鐘的訓練計畫，利用午休或下班後就能完成，維持基本體能和線條。' },
    { type: 'h2', text: '訓練結構：4 個動作 × 3 輪' },
    { type: 'p', text: '深蹲 12 下 → 伏地挺身 10 下 → 登山者 20 下 → 平板支撐 30 秒。做完一輪休息 30 秒，共做三輪。這四個動作涵蓋了全身主要肌群。' },
    { type: 'h2', text: '關鍵是「持續」' },
    { type: 'p', text: '15 分鐘的運動，效果比零好一百倍。不要等到「有空」再運動——把它當成像刷牙一樣的日常。一週做三到四次，一個月就能感受到差異。' },
    { type: 'p', text: '進階版可以加入啞鈴或彈力帶增加阻力。但如果你是剛開始，徒手就夠了。運動的最佳時機永遠是現在。' }
  ]
};

// ── 通知（模擬） ──
window.NOTIFICATIONS = [
  { id: 'n1', type: 'course', title: '你購買的課程有新章節上線', body: '「生成式 AI 應用開發」新增了第 6 章：Agent 框架與多步推理', time: '10 分鐘前', read: false, link: '/player.html?id=c03' },
  { id: 'n2', type: 'promo', title: '雙 11 全站 85 折開跑！', body: '活動期間結帳輸入 DOUBLE11，所有課程享 85 折優惠', time: '1 小時前', read: false, link: '/coupon.html' },
  { id: 'n3', type: 'community', title: '你的貼文收到新回覆', body: '「AI 探索者」回覆了你的 Midjourney Prompt 分享文', time: '3 小時前', read: false, link: '/community.html' },
  { id: 'n4', type: 'achievement', title: '恭喜獲得新徽章！', body: '你已完成「連續學習 7 天」挑戰，獲得學習火焰徽章', time: '5 小時前', read: true, link: '/achievement.html' },
  { id: 'n5', type: 'live', title: '直播即將開始', body: '「AI 繪圖工作坊：從零到商用」將於今晚 8:00 開始', time: '6 小時前', read: true, link: '/live.html' },
  { id: 'n6', type: 'course', title: '課程作業已批改', body: '「前端工程師養成」第 3 章作業已收到講師回饋', time: '1 天前', read: true, link: '/player.html?id=c24' },
  { id: 'n7', type: 'system', title: '系統維護通知', body: '平台將於 11/10（日）凌晨 2:00–4:00 進行例行維護', time: '2 天前', read: true },
  { id: 'n8', type: 'promo', title: '推薦好友享 $50 折扣', body: '分享你的專屬推薦連結，每成功推薦一位好友雙方各得 $50', time: '3 天前', read: true, link: '/invite.html' }
];

// ── 講師詳細自介 ──
window.INSTRUCTOR_BIOS = {
  '黃士誠': { detail: '前 Google AI 研究員、台大資工碩士，專注生成式 AI 應用開發超過八年。曾帶領團隊開發企業級 LLM 解決方案，服務客戶包含金融、醫療與零售產業。教學風格以實務專案驅動，強調「做出能用的東西」。', works: ['Google AI 研究團隊核心成員', '出版《生成式 AI 實戰手冊》暢銷書', '主導三款企業 AI 產品上線', 'AI 社群 TW-AI Meetup 共同創辦人'], social: { yt: '#', gh: '#', tw: '#' } },
  '張雨萱': { detail: '畢業於英國皇家藝術學院插畫系，作品散見於 Netflix 動畫、國際繪本與品牌聯名。擅長角色 IP 開發與數位插畫，風格融合東方水墨與西方繪本美學。致力於讓更多人發現繪畫的樂趣。', works: ['Netflix 動畫《幻境傳說》角色設計', '義大利波隆那兒童書展入選', 'LINE 貼圖創作者 TOP 10', '三本繪本出版，累計銷量 5 萬冊'], social: { ig: '#', tw: '#' } },
  '趙宥翔': { detail: 'YouTube 百萬訂閱影像創作者，從大學時期開始拍片到現在超過十年。擅長影片企劃、拍攝、剪輯一條龍，特別在短影音內容與 YouTube 經營策略上有豐富實戰經驗。', works: ['YouTube 頻道突破 120 萬訂閱', '年度 YouTube 創作者大賞入圍', '為超過 50 家品牌製作商業影片', '金鐘獎最佳短片入圍'], social: { yt: '#', ig: '#' } },
  '蔡承恩': { detail: '前 LINE 台灣資深前端工程師，現為自由接案全端工程師。八年業界經驗，專精 React 生態系、TypeScript 與 Node.js 後端架構。教學注重程式碼品質與實務開發流程。', works: ['前 LINE 台灣前端核心團隊', '開源專案 TW-React-Kit 作者（2.5K stars）', '多次擔任 JSDC / COSCUP 講者', '技術部落格年瀏覽量超過 100 萬'], social: { gh: '#', tw: '#' } },
  '蔡明哲': { detail: '米其林一星餐廳前主廚，法國廚藝學校 Le Cordon Bleu 結業。專注將高端餐廳的烹飪技巧簡化為家庭廚房可操作的版本，讓人人都能做出專業水準的料理。', works: ['米其林一星餐廳 Lumière 前主廚', 'Le Cordon Bleu 巴黎校區結業', '出版《家常菜的職人秘密》銷量 3 萬冊', 'YouTube 料理頻道 38 萬訂閱'], social: { yt: '#', ig: '#' } },
  '劉怡君': { detail: '品牌策略顧問與自由工作者社群主理人，協助超過 200 個品牌建立線上影響力。前奧美創意總監，擅長將行銷理論轉化為可執行的實戰策略，特別在個人品牌與自媒體經營上有深厚見解。', works: ['前奧美創意總監（7 年）', '「自由人協作社」社群主理人（5 萬成員）', '協助 200+ 品牌建立線上策略', '三度獲得 4A 創意獎'], social: { ig: '#', ln: '#' } },
  '許家豪': { detail: '資深 3D 美術總監，參與多款 AAA 遊戲與動畫電影製作。Blender 與 C4D 雙棲創作者，同時也是 ArtStation 熱門創作者。致力於降低 3D 創作門檻，讓更多人享受立體創作的樂趣。', works: ['參與《黑神話：悟空》環境美術', 'ArtStation Trending 多次上榜', 'Blender 官方社群精選藝術家', '遊戲美術工作室 Studio Pixel 創辦人'], social: { as: '#', tw: '#' } },
  '郭書瑜': { detail: 'CFP 國際認證理財規劃師，擁有超過十年金融業經驗。前富邦銀行資深理財顧問，幫助超過 5000 位客戶建立正確的理財觀念。教學風格務實易懂，著重風險意識與長期投資策略。', works: ['CFP 國際認證理財規劃師', '前富邦銀行資深理財顧問（10 年）', '出版《小資族的第一本理財書》', '理財 Podcast「錢滾錢」主持人'], social: { ig: '#', podcast: '#' } },
  '張馨予': { detail: '法國 Le Cordon Bleu 甜點文憑，曾在巴黎米其林餐廳甜點房歷練兩年。回台後創立甜點工作室，專注法式甜點與歐式麵包的教學推廣，學員遍及亞洲各地。', works: ['Le Cordon Bleu 巴黎甜點文憑', '巴黎米其林二星 Passage 53 甜點房經歷', '甜點工作室 Bonbon Atelier 創辦人', '出版《在家做法式甜點》銷量 2 萬冊'], social: { ig: '#', yt: '#' } },
  '陳威宏': { detail: '獨立遊戲開發者，Steam 上架三款獨立遊戲。Unity 與 Godot 雙棲開發者，推動台灣獨立遊戲文化，曾在 GDC、TGS 等國際展會展出作品。相信遊戲是最好的說故事媒介。', works: ['Steam 上架《影之境》《幻夢迴廊》《像素英雄傳》', 'GDC 2025 獨立遊戲展出', '台灣獨立遊戲社群 IndieGameTW 創辦人', 'Unity 認證開發者'], social: { steam: '#', tw: '#' } },
  '李承翰': { detail: '商業攝影師，合作品牌超過百家，作品刊登於 Vogue、GQ、ELLE 等國際時尚雜誌。擅長人像與商品攝影，教學注重光線控制與構圖美學，幫助學員從愛好者進階為職業攝影師。', works: ['Vogue / GQ / ELLE 作品刊登', '合作品牌超過 150 家', 'Canon 簽約攝影師', '亞洲攝影大賞 2024 金獎'], social: { ig: '#', web: '#' } },
  '陳思涵': { detail: '造型師與生活風格作家，出版三本暢銷書，IG 粉絲超過 20 萬。專注穿搭美學與極簡生活，曾為多位藝人擔任造型顧問。相信美學不是天賦，而是可以學習的技能。', works: ['出版三本暢銷書（累計 8 萬冊）', 'IG 粉絲超過 20 萬', '多位 A-list 藝人造型顧問', '日本《裝苑》雜誌台灣代表撰稿人'], social: { ig: '#', yt: '#' } }
};

// ── 學員見證（詳細版） ──
window.TESTIMONIALS = [
  { name: '林佳蓉', role: 'UI 設計師', avatar: '👩‍💻', rating: 5, course: 'c02', text: '在行政助理的崗位做了四年，一直覺得自己可以做更有創造力的工作。在 AI Class 上了半年的 UI 設計課程，從 Figma 零基礎到做出完整作品集，最後成功面試上新創公司的 UI 設計師。課程最棒的地方是每一章都有實際專案練習，不是只看不做。' },
  { name: '陳冠廷', role: '自動化工程師', avatar: '👨‍💻', rating: 5, course: 'c16', text: '原本是業務，每天花大量時間整理報表。抱著試試看的心態開始學 Python，沒想到三個月後就做出自動化報表系統，每天省下兩小時。主管看到成果後直接把我調到 IT 部門，薪水也跟著調了 60%。' },
  { name: '吳怡萱', role: '甜點工作室老闆', avatar: '👩‍🍳', rating: 5, course: 'c45', text: '法式甜點課的閃電泡芙那堂徹底改變了我的人生方向。上完全部課程後在家接單，從親友圈到現在每月穩定 50+ 訂單。最感謝講師把每個步驟都拆解得超級細，連失敗的原因都預先告訴你怎麼避免。' },
  { name: '張志遠', role: '自由接案影像工作者', avatar: '🎬', rating: 5, course: 'c27', text: '大二開始學影片製作，邊學邊接校園活動紀錄。到了大三已經能獨立接商業案，月收入穩定在四萬以上。課程中關於 DaVinci Resolve 調色的部分特別實用，讓我的作品質感直接提升一個層次。' },
  { name: '黃詩涵', role: 'AI 內容主管', avatar: '🤖', rating: 5, course: 'c48', text: '學會 AI 工具後產出效率提升三倍，不只自己用還教會了整個部門。跳槽到科技公司擔任 AI 內容主管，帶領團隊用 AI 重塑內容產製流程。這堂課最有價值的是 Prompt Engineering 的系統化教學，不是只教你用工具。' },
  { name: '劉家銘', role: '電商創業者', avatar: '🛒', rating: 5, course: 'c53', text: '白天上班晚上學電商，跟著選品策略走，第二個月蝦皮就開始穩定出單。一年後月營業額突破百萬。課程中的數據分析和商品攝影技巧是最大的轉捩點，讓我的店鋪在一片紅海中脫穎而出。' }
];

// ── 本月精選 ──
window.EDITORS_PICKS = [
  { id: 'c47', quote: '從零開始掌握 AI 最強工具，這堂課是 2026 年最不能錯過的學習投資。' },
  { id: 'c03', quote: '全端工程師必修的 React 生態系課程，從 Hooks 到 Server Components 一次學透。' },
  { id: 'c45', quote: '法式甜點不再是遙不可及的夢想，講師把每個步驟拆解到新手也能成功。' }
];

// ── 平台公告 ──
window.ANNOUNCEMENTS = [
  { id: 'a1', text: '雙 11 全站限時 85 折，倒數中！', link: '/coupon.html', type: 'promo' },
  { id: 'a2', text: '新課上架：LLM 微調實戰、歐式麵包全書', link: '/category.html?cat=ai', type: 'new' },
  { id: 'a3', text: '2026 秋季學習挑戰賽開跑，完成任務抽 AirPods', link: '/achievement.html', type: 'event' }
];

// ── 學員作品牆 ──
window.GALLERY = [
  { id: 'g1', author: '林佳蓉', course: 'c02', cat: 'UI 設計', title: '旅遊 App 介面設計', desc: '完整的旅遊訂房 App UI，包含搜尋、列表、詳情與結帳四個主要頁面。', v: '13228', likes: 234, comments: 18, featured: true },
  { id: 'g2', author: '張志遠', course: 'c27', cat: '攝影', title: '金門戰地日落', desc: '使用課程教的黃金時刻構圖技巧，在金門拍攝的日落系列作品。', v: '34408', likes: 189, comments: 12, featured: true },
  { id: 'g3', author: '王思妤', course: 'c05', cat: '插畫', title: '森林精靈角色設計', desc: '原創角色 IP，包含三視圖、表情表與色彩設定。', v: '785', likes: 312, comments: 27, featured: true },
  { id: 'g4', author: '陳冠廷', course: 'c16', cat: '程式', title: 'Python 自動化報表系統', desc: '用 Python 自動爬取銷售數據並產生 Excel 週報，每天省下 2 小時。', v: '46635', likes: 156, comments: 32, featured: false },
  { id: 'g5', author: '許家豪', course: 'c06', cat: '3D', title: '中世紀城堡場景', desc: '使用 Blender 建模、UV 展開與 HDRI 燈光，完成的中世紀城堡場景。', v: '29997', likes: 278, comments: 21, featured: true },
  { id: 'g6', author: '吳怡萱', course: 'c45', cat: '烘焙', title: '法式閃電泡芙', desc: '上完甜點課後的第一批閃電泡芙，巧克力淋面和焦糖口味。', v: '33936', likes: 198, comments: 45, featured: false },
  { id: 'g7', author: '楊凱文', course: 'c12', cat: '動態設計', title: 'Logo 動態演繹', desc: '為個人品牌設計的 Logo 動態效果，使用 After Effects 表達式。', v: '99786', likes: 267, comments: 15, featured: true },
  { id: 'g8', author: '黃詩涵', course: 'c03', cat: 'AI', title: 'AI 客服助手', desc: '結合 RAG 技術的企業 AI 客服系統，能回答產品和售後問題。', v: '41654', likes: 203, comments: 38, featured: false },
  { id: 'g9', author: '劉家銘', course: 'c01', cat: '設計', title: '手沖咖啡品牌字型', desc: '為手沖咖啡品牌設計的中英文字型系統，包含標題與內文兩種字重。', v: '50598', likes: 245, comments: 16, featured: true },
  { id: 'g10', author: '蔡承恩', course: 'c24', cat: '程式', title: '個人作品集網站', desc: '使用 HTML/CSS/JavaScript 打造的響應式個人作品集，含深色模式。', v: '9757', likes: 178, comments: 22, featured: false },
  { id: 'g11', author: '周婉婷', course: 'c13', cat: '繪畫', title: '祖母的肖像', desc: '用古典三層法畫的祖母肖像，從底稿到完成花了三個週末。', v: '30232', likes: 334, comments: 28, featured: true },
  { id: 'g12', author: '何俊廷', course: 'c14', cat: '概念設計', title: '廢墟城市世界觀', desc: '末日後的城市場景概念設計，包含 5 張環境概念圖。', v: '9339', likes: 289, comments: 19, featured: true },
];

// ── 限時免費體驗 ──
window.FREE_COURSES = [
  { id: 'c07', reason: '新手入門精選', endsIn: '3 天後截止' },
  { id: 'c22', reason: '藝術月限定免費', endsIn: '5 天後截止' },
  { id: 'c42', reason: '職涯發展週', endsIn: '2 天後截止' },
];
