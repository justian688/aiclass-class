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
  { id: 'c02', v: '13228', cat: 'design', sub: 'UX/UI', title: 'UI/UX 實戰：用 Figma 打造上線等級的 App 介面', teacher: '陳柏睿', role: '資深產品設計師', price: 5280, origin: 9600, rating: 4.8, students: 5210, tag: 'HOT', hours: 22, desc: '元件系統、Auto Layout、Prototype 到 Dev Mode 交付，完整走過一個 App 的設計流程。', ai: '完整走過一個 App 的 UI/UX 設計流程，從元件到交付', pro: true },

  // ── 繪畫 ──
  { id: 'c05', v: '785', cat: 'drawing', sub: '角色', title: '數位插畫角色設計：建立你的原創角色宇宙', teacher: '張雨萱', role: '插畫家・角色設計師', price: 4580, origin: 8200, rating: 5.0, students: 4470, tag: 'BEST', hours: 20, desc: '角色設定、配色邏輯、表情變化與姿勢動態，從零到一建立你的原創角色 IP。', ai: '從零建立你的原創角色 IP，學會設定、配色與動態表現', pro: true },

  // ── 影像/動畫 ──
  { id: 'c06', v: '29997', cat: 'video', sub: 'Blender', title: 'Blender 3D 建模：從道具到完整場景', teacher: '許家豪', role: '3D 美術總監', price: 5480, origin: 9800, rating: 4.9, students: 3360, tag: 'HOT', hours: 28, desc: '硬表面建模、雕刻、UV 展開、PBR 材質、HDRI 燈光到最終算圖，一條龍教學。', ai: '28 小時一條龍學完 3D 建模到算圖，做出完整場景作品', pro: true },

  // ── AI/科技 ──
  { id: 'c03', v: '41654', cat: 'ai', sub: 'AI 技術', title: '生成式 AI 應用開發：打造你的第一個智慧助理', teacher: '黃士誠', role: 'AI 工程師', price: 5980, origin: 10800, rating: 4.9, students: 6120, tag: 'NEW', hours: 26, desc: '從 Prompt Engineering 到 RAG、Function Calling 與部署，做出能真正上線的 AI 助手。', ai: '這堂課會帶你用 3 個月時間，從零到能獨立開發 AI 應用', pro: true },
  { id: 'c47', v: '46353', cat: 'ai', sub: 'AI 影像設計', title: 'AI 繪圖實戰：Midjourney + Stable Diffusion 完全攻略', teacher: '黃士誠', role: 'AI 工程師・創作者', price: 3980, origin: 7200, rating: 4.9, students: 7890, tag: 'HOT', hours: 16, desc: '從 Prompt 技巧、ControlNet 到 LoRA 訓練，用 AI 產出商用級插畫與設計素材。', ai: '用 AI 產出商用級插畫與設計，省下 80% 設計時間' },

  // ── 創作/生活（音樂） ──
  { id: 'c04', v: '33936', cat: 'creative', sub: '作曲/音樂', title: '鋼琴即興與編曲：流行歌曲伴奏完全攻略', teacher: '吳若晴', role: '作曲家・鋼琴演奏者', price: 3680, origin: 6800, rating: 4.8, students: 2150, tag: '', hours: 15, desc: '從基礎和弦到華麗填音，學會即興改編任何一首流行歌曲的伴奏版本。' },

  // ── 創作/生活（攝影） ──
  { id: 'c08', v: '34408', cat: 'creative', sub: '攝影', title: '戶外人像攝影：自然光下的構圖與調色', teacher: '李承翰', role: '商業攝影師', price: 3980, origin: 7200, rating: 4.8, students: 3010, tag: 'NEW', hours: 14, desc: '從選時段、找光線到 Lightroom 調色，用一機一鏡拍出雜誌質感的人像。' },

  // ── 烘焙/料理 ──
  { id: 'c09', v: '49231', cat: 'baking', sub: '料理', title: '家常料理職人課：30 道一學就會的經典菜', teacher: '蔡明哲', role: '餐廳主廚', price: 2680, origin: 4800, rating: 4.9, students: 5680, tag: 'BEST', hours: 10, desc: '火候判斷、調味比例、擺盤技巧，每道菜都有精確的步驟分解與失敗排解。', ai: '30 道家常菜精確步驟拆解，新手也能做出大廚級料理' },

  // ── 創業/職涯 ──
  { id: 'c11', v: '4809', cat: 'career', sub: '內容/行銷', title: '個人品牌經營：用內容把專業變成收入', teacher: '劉怡君', role: '品牌策略顧問', price: 3880, origin: 6900, rating: 4.8, students: 4120, tag: 'HOT', hours: 11, desc: '從定位、內容規劃到變現模式，建立一個能持續帶來收入的個人品牌。' },

  // ── 美髮/美容 ──
  { id: 'c31', v: '23056', cat: 'beauty', sub: '運動健身', title: '居家健身完全指南：不上健身房也能練出線條', teacher: '陳冠宏', role: '健身教練・NSCA-CSCS', price: 2280, origin: 4000, rating: 4.9, students: 6240, tag: 'BEST', hours: 12, desc: '徒手訓練、彈力帶與壺鈴，12 週漸進式課表加飲食建議，在家練出看得見的變化。', ai: '12 週居家漸進課表，不用器材也能練出明顯線條' },

  // ── 遊戲製作 ──
  { id: 'c38', v: '42648', cat: 'game', sub: '遊戲程式', title: 'Unity 2D 遊戲開發：從零做出一款平台跳躍遊戲', teacher: '陳威宏', role: '獨立遊戲開發者', price: 4980, origin: 8800, rating: 4.8, students: 2870, tag: 'NEW', hours: 24, desc: '角色控制、關卡設計、敵人 AI、音效整合到上架 Steam，做出可以賣的遊戲。' },

  // ── 副業/理財 ──
  { id: 'c41', v: '26676', cat: 'finance', sub: '理財投資', title: '小資族理財課：ETF 定期定額與資產配置', teacher: '郭書瑜', role: '理財規劃師・CFP', price: 2980, origin: 5400, rating: 4.8, students: 8240, tag: 'BEST', hours: 10, desc: '不看盤、不選股，用 ETF 建立被動收入，從第一筆 3000 元開始你的投資旅程。', ai: '用 ETF 建立被動收入，從 3000 元開始你的理財旅程' }
];

window.HERO = ['c47', 'c03', 'c05', 'c09', 'c31', 'c41'];
window.HERO_COPY = {
  c47: ['AI 創作新紀元', '用 AI 畫出\n商用級作品', 'Midjourney + Stable Diffusion，省下 80% 設計時間'],
  c03: ['AI 時代的新技能', '用生成式 AI\n打造你的智慧助理', '從 Prompt Engineering 到 RAG，26 小時完整實作'],
  c05: ['插畫家的第一堂課', '畫出屬於你的\n原創角色宇宙', '角色設定、配色、表情與姿勢一次學會'],
  c09: ['廚藝升級計畫', '30 道家常菜\n一學就會', '火候判斷、調味比例到宴客擺盤全部教給你'],
  c31: ['在家就能練', '不上健身房\n也能練出線條', '12 週漸進課表，徒手訓練 + 飲食建議'],
  c41: ['理財第一步', '用 ETF 建立\n被動收入', '不看盤不選股，從 3000 元開始你的投資旅程']
};

window.REVIEWS = [];

window.FAQ = [
  ['購買後可以觀看多久？', '一次購買即可無限期觀看，日後課程更新的內容也會免費開放，不需要再付任何費用。'],
  ['可以用手機或平板上課嗎？', '可以，支援電腦、手機、平板各種裝置，並可自由調整播放速度（0.5x ～ 2x）與開啟字幕。'],
  ['有提供課程素材檔嗎？', '每堂課皆附講師使用的專案檔與練習素材，可於課程頁面直接下載。部分課程另附 PDF 講義。'],
  ['付款方式有哪些？', '支援信用卡（Visa / Master / JCB）、ATM 轉帳、超商代碼繳費與 LINE Pay，並可開立電子發票。'],
  ['不滿意可以退費嗎？', '購買後 7 天內，且觀看進度低於 20%，可透過客服申請全額退費，無需說明理由。'],
  ['課程有期限嗎？會下架嗎？', '已上架的課程不會下架，你可以依自己的步調反覆觀看學習，沒有觀看期限。'],
  ['可以跟講師提問嗎？', '每堂課都設有留言討論區，講師與助教會在 48 小時內回覆你的學習問題。'],
  ['有團購或企業方案嗎？', '5 人以上即可享團購優惠，企業大量採購另有專屬方案，歡迎來信洽詢 hi@okaiclass.com。']
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
  { id: 'p1', name: 'AI 創作全能者', desc: '從 AI 應用開發到 AI 繪圖，掌握 AI 時代核心技能', courses: ['c03', 'c47'], duration: '2-4 個月', level: '入門到進階', salary: '80-150 萬/年' },
  { id: 'p2', name: '品牌設計師', desc: '從字體設計到 UI/UX，掌握完整的品牌視覺設計能力', courses: ['c01', 'c02'], duration: '2-4 個月', level: '入門到中階', salary: '60-100 萬/年' },
  { id: 'p3', name: '全方位創作者', desc: '3D 建模、角色設計到攝影，提升你的視覺創作力', courses: ['c06', 'c05', 'c08'], duration: '3-6 個月', level: '入門到進階', salary: '55-120 萬/年' },
  { id: 'p4', name: '個人品牌創業家', desc: '從個人品牌經營到理財規劃，打造你的事業版圖', courses: ['c11', 'c41'], duration: '2-3 個月', level: '零基礎', salary: '依營收' }
];

// ── 訓練營 ──
window.BOOTCAMPS = [
  { id: 'b1', name: 'AI 全能訓練營', desc: '系統化學習 AI 開發與 AI 繪圖，含企業專案實戰、履歷優化及就業推薦', courses: ['c03', 'c47'], price: 0, original: 9960, tag: '限時免費', badge: '就業保障' },
  { id: 'b2', name: '品牌設計就業班', desc: '從字體設計到 UI/UX，30 天內完成 3 個企業級作品集', courses: ['c01', 'c02'], price: 0, original: 10260, tag: '限時免費', badge: '推薦面試' },
  { id: 'b3', name: '創作者加速器', desc: '3D 建模、角色設計到攝影，快速建立視覺創作能力', courses: ['c06', 'c05', 'c08'], price: 0, original: 14040, tag: '限時免費', badge: '實戰證書' }
];

// ── 每日挑戰 ──
window.MISSIONS = [
  { type: '每日出席', icon: '📋', reward: 10, unit: 'XP', desc: '今天登入平台學習', badge: '簡單' },
  { type: '觀看一堂課', icon: '🎬', reward: 25, unit: 'XP', desc: '完成任意一個課時', badge: '簡單' },
  { type: '寫學習筆記', icon: '✏️', reward: 15, unit: 'XP', desc: '為任意課程新增一則筆記', badge: '中等' },
  { type: '連續 7 天', icon: '🔥', reward: 200, unit: 'XP', desc: '連續 7 天不中斷地學習', badge: '挑戰' },
  { type: '完成測驗', icon: '🎯', reward: 30, unit: 'XP', desc: '完成一份課程小測驗', badge: '中等' },
  { type: '發表評論', icon: '💬', reward: 15, unit: 'XP', desc: '為已完成的課程留下評價', badge: '簡單' }
];
window.MISSION_STATS = { total: 462438, today: 1283 };

// ── 影音學習 ──
window.VIDEO_CONTENT = [
  { id: 'vc1', title: '學員作品分享：3D 場景渲染成果', cat: '學員分享', views: 12800, course: 'c06' },
  { id: 'vc2', title: '講師訪談：AI 時代的自學之路', cat: '講師訪談', views: 8930, course: 'c03' },
  { id: 'vc6', title: '講師示範：5 分鐘畫出角色表情', cat: '講師訪談', views: 11200, course: 'c05' },
  { id: 'vc8', title: '幕後直擊：攝影棚一日實況', cat: '幕後花絮', views: 5180, course: 'c08' },
  { id: 'vc9', title: '學員作品：Unity 2D 平台跳躍遊戲 Demo', cat: '學員分享', views: 7240, course: 'c38' },
  { id: 'vc10', title: '講師直播：AI 繪圖 vs 手繪，設計師怎麼選？', cat: '講師訪談', views: 18900, course: 'c47' }
];

// ── 部落格文章 ──
window.POSTS = [
  { id:'p1', title:'2026 年最值得學的 5 項 AI 技能', excerpt:'AI 正在重塑每個產業，掌握這五項核心技能，讓你在職場上脫穎而出。從 Prompt Engineering 到 RAG 架構，一次掌握 AI 時代的關鍵能力。', cat:'ai', author:'黃士誠', date:'2026-11-01', readTime:8, v:'41654', tags:['AI','職涯','趨勢'] },
  { id:'p3', title:'插畫接案指南：如何定價與找到客戶', excerpt:'從定價策略到客戶開發，分享插畫接案的完整流程與實戰經驗，讓你的創作技能變成穩定收入。', cat:'drawing', author:'張雨萱', date:'2026-10-25', readTime:10, v:'785', tags:['插畫','接案','自由工作者'] },
  { id:'p4', title:'Blender vs Cinema 4D：新手該選哪個？', excerpt:'兩款主流 3D 軟體的完整比較，從學習曲線、功能差異到就業市場需求一次分析清楚。', cat:'video', author:'許家豪', date:'2026-10-22', readTime:7, v:'29997', tags:['3D','Blender','C4D'] },
  { id:'p5', title:'UI 設計師的一天：工作流程大公開', excerpt:'資深 UI 設計師的真實工作日常，從晨會需求討論到交付開發的完整流程分享。', cat:'design', author:'陳柏睿', date:'2026-10-18', readTime:5, v:'13228', tags:['UI/UX','設計','職場'] },
  { id:'p7', title:'居家健身新手必知的 10 個觀念', excerpt:'不需要昂貴器材也能有效訓練，掌握正確觀念讓你少走彎路、事半功倍，在家也能練出好身材。', cat:'beauty', author:'陳冠宏', date:'2026-10-12', readTime:6, v:'23056', tags:['健身','居家運動','健康'] },
  { id:'p9', title:'烘焙入門：5 款零失敗甜點食譜', excerpt:'不需要烤箱也能做的簡單甜點，新手第一次就能成功，送禮或下午茶都超合適。', cat:'baking', author:'蔡明哲', date:'2026-10-05', readTime:7, v:'49231', tags:['烘焙','料理','食譜'] },
  { id:'p16', title:'AI 繪圖 vs 手繪：設計師該如何定位自己？', excerpt:'AI 工具席捲設計圈，手繪還有競爭力嗎？從產業觀點分析設計師的不可取代性與轉型方向。', cat:'ai', author:'張雨萱', date:'2026-09-12', readTime:9, v:'46353', tags:['AI','設計','職涯'] },
  { id:'p18', title:'從零開始學投資：給完全新手的理財入門指南', excerpt:'別讓通膨吃掉你的存款。從記帳、存錢到第一筆 ETF 投資，最簡單的理財起步方式。', cat:'finance', author:'郭書瑜', date:'2026-09-05', readTime:8, v:'26676', tags:['理財','投資','ETF'] },
  { id:'p19', title:'遊戲開發入門：選 Unity 還是 Unreal？', excerpt:'兩大遊戲引擎的完整比較，從學習成本、適用類型到就業前景，幫你選對第一步。', cat:'game', author:'陳威宏', date:'2026-09-01', readTime:10, v:'42648', tags:['遊戲','Unity','Unreal'] },
  { id:'p20', title:'Midjourney 進階：10 個讓出圖品質翻倍的 Prompt 技巧', excerpt:'不只是打字讓 AI 畫圖，學會參數控制、風格指定和負面提示，讓 AI 繪圖成為你的生產力工具。', cat:'ai', author:'黃士誠', date:'2026-08-28', readTime:8, v:'40534', tags:['Midjourney','AI','Prompt'] },
  { id:'p24', title:'2026 年值得關注的 10 個設計趨勢', excerpt:'從 3D 互動到 AI 輔助設計，盤點今年最值得設計師關注的視覺與體驗趨勢。', cat:'design', author:'陳柏睿', date:'2026-08-15', readTime:8, v:'9757', tags:['設計','趨勢','UI'] },
  { id:'p25', title:'居家運動計畫：適合忙碌上班族的 15 分鐘訓練', excerpt:'不用早起、不用去健身房，利用午休或下班後 15 分鐘，維持基本體能和線條。', cat:'beauty', author:'陳冠宏', date:'2026-08-12', readTime:5, v:'33066', tags:['健身','居家運動','上班族'] }
];

// ── 講師陣容 ──
window.INSTRUCTORS = [
  { id: 'i1', name: '黃士誠', role: 'AI 工程師', courses: 2, students: 14010, followers: 4230, avatar: '👨‍💻', bio: '前 Google AI 研究員，專注生成式 AI 應用開發與教學', achievements: ['前 Google Brain 研究員，發表 12 篇 AI 頂會論文', '出版《生成式 AI 實戰》銷量破萬', '培訓超過 8000 名 AI 工程師', '獲邀 PyCon TW / COSCUP 主題演講'] },
  { id: 'i2', name: '張雨萱', role: '插畫家・角色設計師', courses: 1, students: 4470, followers: 1890, avatar: '🎨', bio: '作品散見於 Netflix 動畫與國際繪本，擅長角色 IP 開發', achievements: ['Netflix 動畫《月光獵人》角色設計', '金蝶獎最佳繪本插畫獎', '創作 IP 授權至 7 國', '台北國際書展年度推薦插畫家'] },
  { id: 'i3', name: '林予安', role: '字體設計師・品牌顧問', courses: 1, students: 3820, followers: 1650, avatar: '✒️', bio: '品牌字體設計專家，前奧美品牌顧問，致力於中英文字型系統設計', achievements: ['前奧美品牌設計顧問（10 年）', '設計超過 50 套企業品牌字型', '金點設計獎字體類金獎', 'Adobe Max 特邀講者'] },
  { id: 'i4', name: '陳柏睿', role: '資深產品設計師', courses: 1, students: 5210, followers: 2340, avatar: '🎯', bio: '前 LINE 設計主管，專精 Figma 設計系統與 UI/UX 設計流程', achievements: ['前 LINE 台灣設計主管', 'Red Dot 設計獎入圍', 'Figma Config 特邀講者', '設計超過 30 款上線 App'] },
  { id: 'i5', name: '蔡明哲', role: '餐廳主廚', courses: 1, students: 5680, followers: 3120, avatar: '👨‍🍳', bio: '米其林餐廳主廚經歷，致力讓家庭料理也能有專業水準', achievements: ['曾任米其林一星餐廳主廚', '出版《家常菜的專業秘密》暢銷書', '美食節目常駐來賓', '培訓超過 3000 名家庭主廚'] },
  { id: 'i6', name: '劉怡君', role: '品牌策略顧問', courses: 1, students: 4120, followers: 4580, avatar: '📢', bio: '協助超過 200 個品牌建立線上影響力，自由工作者社群主理人', achievements: ['協助超過 200 個品牌成功轉型', '自由工作者社群 1.5 萬人', '天下雜誌年度百大影響力人物', '出版《品牌煉金術》銷量破兩萬'] },
  { id: 'i7', name: '許家豪', role: '3D 美術總監', courses: 1, students: 3360, followers: 2210, avatar: '🎮', bio: '參與多款 AAA 遊戲開發，Blender 創作者與教學者', achievements: ['參與《黑神話：悟空》環境美術', 'Blender 官方認證講師', 'ArtStation Trending 作品 15 件', 'GDC 遊戲開發者大會講者'] },
  { id: 'i8', name: '郭書瑜', role: '理財規劃師', courses: 1, students: 8240, followers: 5060, avatar: '💰', bio: 'CFP 國際認證理財規劃師，幫助超過 5000 人建立理財觀念', achievements: ['CFP 國際認證理財規劃師', '幫助超過 5000 人建立理財觀念', '出版《第一桶金的聰明存法》暢銷書', '商業周刊理財專欄作家'] },
  { id: 'i9', name: '吳若晴', role: '作曲家・鋼琴演奏者', courses: 1, students: 2150, followers: 1280, avatar: '🎹', bio: '皇家音樂院畢業，專注即興演奏與流行歌曲改編教學', achievements: ['英國皇家音樂院鋼琴演奏碩士', '金曲獎最佳編曲入圍', '全台演奏會超過 200 場', 'YouTube 音樂頻道 15 萬訂閱'] },
  { id: 'i10', name: '陳威宏', role: '獨立遊戲開發者', courses: 1, students: 2870, followers: 1930, avatar: '🕹️', bio: 'Steam 上架三款獨立遊戲，Unity 開發者，推動台灣獨立遊戲文化', achievements: ['Steam 上架三款獨立遊戲', 'Indie Game Award 最佳創新獎', 'Unity 官方推薦開發者', '台灣獨立遊戲協會理事'] },
  { id: 'i11', name: '李承翰', role: '商業攝影師', courses: 1, students: 3010, followers: 2850, avatar: '📷', bio: '合作品牌超過百家，擅長人像與商品攝影，作品刊登於 Vogue、GQ', achievements: ['作品刊登 Vogue、GQ、ELLE', '合作品牌超過百家', '台北國際攝影節特邀攝影師', 'Sony Alpha 簽約攝影師'] },
  { id: 'i12', name: '陳冠宏', role: '健身教練・NSCA-CSCS', courses: 1, students: 6240, followers: 2130, avatar: '💪', bio: '國際認證體能訓練專家，專注居家訓練與運動營養規劃', achievements: ['NSCA-CSCS 國際認證', '前職業棒球隊體能教練', '出版《居家健身聖經》銷量 2 萬冊', 'YouTube 健身頻道 25 萬訂閱'] }
];

// ── 平台數據 ──
window.PLATFORM_STATS = null;

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
    ['如何刪除帳號？','請來信至 hi@okaiclass.com 申請帳號刪除，我們會在 3 個工作天內處理完畢。已購買的課程將無法恢復。']
  ]},
  { cat:'技術問題', items:[
    ['影片無法播放怎麼辦？','請確認網路連線穩定，並嘗試清除瀏覽器快取或更換瀏覽器。建議使用 Chrome 或 Safari 最新版本。'],
    ['影片畫質如何調整？','播放器右下角可選擇畫質，支援 480p、720p、1080p，系統會根據網路速度自動調整最佳畫質。'],
    ['可以投放到電視觀看嗎？','可以，支援 Chromecast 和 AirPlay，將課程投放至大螢幕觀看，享受更好的學習體驗。']
  ]},
  { cat:'企業方案', items:[
    ['有團購或企業方案嗎？','5 人以上即可享團購優惠，企業大量採購另有專屬方案與專人服務，歡迎來信洽詢 hi@okaiclass.com。'],
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
  { id: 'bg1', name: '初來乍到', icon: '🌱', desc: '完成帳號註冊', xp: 10, rarity: 'common' },
  { id: 'bg2', name: '第一堂課', icon: '🎓', desc: '完成第一個課程章節', xp: 20, rarity: 'common' },
  { id: 'bg3', name: '學習達人', icon: '📚', desc: '累計觀看 10 小時', xp: 50, rarity: 'common' },
  { id: 'bg4', name: '完課勇者', icon: '🏆', desc: '完成一門完整課程', xp: 100, rarity: 'rare' },
  { id: 'bg5', name: '知識狂人', icon: '🧠', desc: '購買 5 門課程', xp: 300, rarity: 'epic' },
  { id: 'bg6', name: '連續簽到王', icon: '🔥', desc: '連續 30 天出席', xp: 200, rarity: 'epic' },
  { id: 'bg7', name: '社群之星', icon: '⭐', desc: '留言被按讚 50 次', xp: 150, rarity: 'rare' },
  { id: 'bg8', name: '筆記達人', icon: '📝', desc: '累計寫下 100 則筆記', xp: 100, rarity: 'rare' },
  { id: 'bg9', name: '測驗滿分', icon: '💯', desc: '任一測驗取得滿分', xp: 80, rarity: 'rare' },
  { id: 'bg10', name: '分享推手', icon: '🤝', desc: '邀請 3 位好友加入', xp: 120, rarity: 'rare' },
  { id: 'bg11', name: '早鳥學員', icon: '🐦', desc: '連續 7 天在 8 點前上課', xp: 60, rarity: 'common' },
  { id: 'bg12', name: '全能學霸', icon: '👑', desc: '在 3 個以上類別完課', xp: 500, rarity: 'legendary' },
  { id: 'bg13', name: '連續七天', icon: '🗓️', desc: '連續學習 7 天不中斷', xp: 70, rarity: 'common' },
  { id: 'bg14', name: '觀看百課', icon: '👁️', desc: '累計觀看 100 個課時', xp: 250, rarity: 'epic' },
  { id: 'bg15', name: '評論家', icon: '💬', desc: '發表 10 則課程評論', xp: 120, rarity: 'rare' },
  { id: 'bg16', name: '分享達人', icon: '📤', desc: '分享課程 5 次', xp: 80, rarity: 'common' },
  { id: 'bg17', name: '傳奇學者', icon: '🌟', desc: '累計 10,000 XP', xp: 1000, rarity: 'legendary' },
  { id: 'bg18', name: '學習馬拉松', icon: '🏃', desc: '單日學習超過 4 小時', xp: 60, rarity: 'rare' }
];
window.XP_RULES = { watchLesson: 10, completeLesson: 25, postReview: 15, dailyStreak: 50 };
window.XP_LEVELS = [
  { lv: 1, name: '新手學員', min: 0 },
  { lv: 2, name: '初級學員', min: 100 },
  { lv: 3, name: '中級學員', min: 300 },
  { lv: 5, name: '學習達人', min: 800 },
  { lv: 8, name: '進階達人', min: 2000 },
  { lv: 10, name: '知識大師', min: 5000 },
  { lv: 15, name: '資深大師', min: 12000 },
  { lv: 20, name: '傳奇學者', min: 30000 }
];

// ── 排行榜 ──
window.LEADERBOARD = [];

// ── 測驗題庫 ──
window.QUIZZES = [
  { id: 'q1', course: 'c03', title: 'AI 應用開發基礎測驗', questions: [
    { q: 'RAG 的全稱是什麼？', opts: ['Retrieval-Augmented Generation', 'Random Access Generator', 'Real-time AI Gateway', 'Recursive Algorithm Graph'], ans: 0 },
    { q: '以下哪個不是常見的 Embedding 模型？', opts: ['text-embedding-3-small', 'BERT', 'GPT-4', 'all-MiniLM'], ans: 2 },
    { q: 'Prompt Engineering 中，Few-shot 指的是？', opts: ['提供少量範例引導模型', '用少量資料微調模型', '減少模型輸出長度', '限制 API 呼叫次數'], ans: 0 },
    { q: 'Function Calling 的主要用途是？', opts: ['讓模型呼叫外部工具或 API', '加速模型推論速度', '減少模型幻覺', '壓縮模型大小'], ans: 0 },
    { q: 'Vector Database 主要儲存什麼？', opts: ['文字向量嵌入', 'SQL 結構化資料', '圖片檔案', '影片串流'], ans: 0 }
  ]},
  { id: 'q2', course: 'c02', title: 'UI/UX 設計基礎測驗', questions: [
    { q: 'Figma 的 Auto Layout 預設排列方向是？', opts: ['垂直排列', '水平排列', '網格排列', '自由排列'], ans: 0 },
    { q: 'UX 中的「人物誌（Persona）」是？', opts: ['虛構的目標用戶代表', '設計師的自我介紹', '色彩規範文件', '程式碼文件'], ans: 0 },
    { q: '以下哪個不是 UI 設計的基本原則？', opts: ['程式碼優化', '一致性', '可見性', '回饋'], ans: 0 },
    { q: 'Design Token 的主要用途是？', opts: ['統一設計系統的視覺變數', '生成程式碼', '測試使用者體驗', '管理專案進度'], ans: 0 },
    { q: 'Prototype 最重要的目的是？', opts: ['在開發前驗證設計假設', '展示美術能力', '取代工程師', '產生設計文件'], ans: 0 }
  ]},
  { id: 'q3', course: 'c38', title: 'Unity 遊戲開發基礎測驗', questions: [
    { q: 'Unity 使用的程式語言是？', opts: ['C#', 'Python', 'JavaScript', 'C++'], ans: 0 },
    { q: 'MonoBehaviour 的 Update() 何時執行？', opts: ['每幀執行一次', '遊戲啟動時', '物件建立時', '碰撞發生時'], ans: 0 },
    { q: 'Rigidbody 2D 主要用於？', opts: ['物理模擬', 'UI 排版', '音效播放', '場景切換'], ans: 0 },
    { q: 'Tilemap 最常用於？', opts: ['2D 地圖編輯', '3D 建模', '粒子特效', '動畫剪輯'], ans: 0 },
    { q: 'Unity 中 Prefab 是什麼？', opts: ['可重複使用的遊戲物件模板', '程式碼檔案', '音效資源', '場景設定檔'], ans: 0 }
  ]}
];

// ── 直播活動 ──
window.LIVE_EVENTS = [
  { id: 'ev1', title: 'AI 繪圖工作坊：從零到商用', host: '黃士誠', date: '2026-11-08 20:00', duration: 90, enrolled: 342, max: 500, course: 'c47', status: 'upcoming' },
  { id: 'ev2', title: '設計師職涯問答：轉職與接案', host: '陳柏睿', date: '2026-11-10 14:00', duration: 60, enrolled: 218, max: 300, course: 'c02', status: 'upcoming' },
  { id: 'ev5', title: '遊戲開發者座談：獨立遊戲的第一步', host: '陳威宏', date: '2026-11-18 19:30', duration: 60, enrolled: 187, max: 300, course: 'c38', status: 'upcoming' },
  { id: 'ev8', title: '品牌字體設計案例分享', host: '林予安', date: '2026-10-15 19:00', duration: 75, enrolled: 245, max: 300, course: 'c01', status: 'ended', replay: true },
  { id: 'ev9', title: '商業攝影燈光實戰：一盞燈拍出雜誌感', host: '李承翰', date: '2026-11-20 19:30', duration: 90, enrolled: 278, max: 400, course: 'c08', status: 'upcoming' },
  { id: 'ev10', title: '個人品牌經營 Q&A：從 0 到 10 萬粉', host: '劉怡君', date: '2026-11-22 14:00', duration: 75, enrolled: 410, max: 500, course: 'c11', status: 'upcoming' }
];

// ── 社群討論（模擬） ──
window.COMMUNITY_POSTS = [
  { id: 'cp1', author: '小明同學', avatar: '🦊', title: '分享我的 AI 助理作品——客服機器人 Demo', content: '跟著黃老師的課程做出了第一個 RAG 客服機器人，正確率大概 85%，還在調整 Prompt...', course: 'c03', likes: 48, replies: 12, time: '2 小時前', tags: ['作品分享'] },
  { id: 'cp2', author: '設計女孩', avatar: '🎨', title: '第一次用 Figma 做完整 App 設計，求feedback！', content: '花了兩週完成了一個記帳 App 的 UI 設計，Auto Layout 真的太好用了！', course: 'c02', likes: 36, replies: 8, time: '5 小時前', tags: ['作品分享', '求回饋'] },
  { id: 'cp5', author: 'AI 探索者', avatar: '🤖', title: 'Midjourney v6 的 Prompt 技巧整理', content: '整理了 50 個高品質出圖的 Prompt 模板，包含風格指定、構圖控制和負面提示...', course: 'c47', likes: 156, replies: 42, time: '1 天前', tags: ['筆記分享', '資源'], pinned: true },
  { id: 'cp6', author: '健身日記', avatar: '💪', title: '跟著 12 週課表練了 8 週的變化', content: '體脂從 28% 降到 23%，附上前後對比照。飲食調整真的是關鍵！', course: 'c31', likes: 234, replies: 56, time: '2 天前', tags: ['心得分享', '成果'] },
  { id: 'cp8', author: '理財小白', avatar: '💰', title: 'ETF 定期定額三個月心得分享', content: '跟著郭老師的配置建議投了 0050 和 00878，雖然才三個月但心態穩多了。', course: 'c41', likes: 67, replies: 29, time: '3 天前', tags: ['心得分享'], poll: { question: '你的投資策略是？', options: [{ text: '定期定額 ETF', votes: 234 }, { text: '個股價值投資', votes: 89 }, { text: '短線波段', votes: 56 }, { text: '還在觀望學習中', votes: 312 }] } },
  { id: 'cp10', author: '獨立遊戲夢', avatar: '🎮', title: '用 Unity 做的第一款小遊戲 Demo 完成了！', content: '雖然只是一個簡單的平台跳躍遊戲，但從設計到程式到美術都是自己完成的，超有成就感。感謝陳老師的課程！', course: 'c38', likes: 198, replies: 45, time: '4 天前', tags: ['作品分享', '成果'] },
  { id: 'cp13', author: '品牌學徒', avatar: '✒️', title: '第一次設計完整品牌字型的心得', content: '跟著林老師從手繪草圖到 Glyphs 輸出，終於完成了自己的品牌字型！過程比想像中有趣很多。', course: 'c01', likes: 78, replies: 16, time: '3 天前', tags: ['作品分享', '心得分享'] },
  { id: 'cp14', author: '鋼琴新手', avatar: '🎹', title: '即興彈奏周杰倫的歌，朋友都嚇到', content: '以前只會照譜彈，學了和弦進行和即興技巧後，聚會直接即興改編演奏，超有成就感！', course: 'c04', likes: 92, replies: 21, time: '2 天前', tags: ['心得分享', '成果'] }
];

// ── 課程章節結構 ──
window.CHAPTERS = {
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
  c03: [
    { ch: 1, title: '課程導覽與環境建置', lessons: ['課程大綱與學習路線', '開發環境安裝（Python + VS Code）', 'API Key 申請與設定', '第一次呼叫 AI API'], duration: 85 },
    { ch: 2, title: 'Prompt Engineering', lessons: ['Prompt 設計原則', 'Zero-shot vs Few-shot', 'System Prompt 與角色設定', 'Chain of Thought 推理', '實作：智慧客服 Prompt'], duration: 120 },
    { ch: 3, title: 'Function Calling 與工具整合', lessons: ['Function Calling 原理', '定義工具 Schema', '連接外部 API', '多工具串接實作', '錯誤處理與回退機制'], duration: 110 },
    { ch: 4, title: 'RAG 架構實作', lessons: ['Embedding 向量嵌入概念', 'Vector Database 選擇與設定', '文件切割與索引建立', 'Retrieval 策略與排序', '實作：企業知識庫問答'], duration: 150 },
    { ch: 5, title: '部署與上線', lessons: ['API 服務架構設計', 'FastAPI 後端開發', 'Docker 容器化', '雲端部署（GCP / AWS）', '監控與迭代優化', '期末專案：完整 AI 助手'], duration: 140 }
  ],
  c04: [
    { ch: 1, title: '鍵盤基礎', lessons: ['認識鍵盤與坐姿', '五線譜與音名', '右手 C 大調音階', '左手伴奏基礎', '第一首歌：小星星'], duration: 70 },
    { ch: 2, title: '和弦與伴奏', lessons: ['三和弦原理', '常用和弦進行（I-V-vi-IV）', '左手伴奏型態', '右手旋律即興', '5 首流行歌彈奏'], duration: 85 },
    { ch: 3, title: '進階和聲', lessons: ['七和弦與延伸和弦', '和弦轉位運用', '經過和弦與替代和弦', '爵士和聲入門', '5 首進階歌曲改編'], duration: 100 },
    { ch: 4, title: '即興演奏', lessons: ['五聲音階即興', '旋律裝飾技巧', '節奏變化與切分', '和弦內音即興', '即興演奏實戰練習'], duration: 90 },
    { ch: 5, title: '編曲與錄音', lessons: ['流行歌編曲結構', 'GarageBand 錄音教學', '伴奏帶製作', '表演準備與心態', '期末：完整歌曲改編錄製'], duration: 75 }
  ],
  c05: [
    { ch: 1, title: '角色設計基礎', lessons: ['角色設計的市場需求', '風格參考與情緒版', '基本體型與比例', '臉型與五官設計'], duration: 75 },
    { ch: 2, title: '配色與光影', lessons: ['色彩心理學與角色個性', '固有色選擇策略', '光源方向與投影', '環境色反射處理'], duration: 90 },
    { ch: 3, title: '表情與動態', lessons: ['表情九宮格練習', '身體語言與姿勢', '動作線與重心', '服裝與配件設計'], duration: 105 },
    { ch: 4, title: '角色 IP 開發', lessons: ['世界觀設定文件', '角色關係圖譜', '周邊商品設計', '社群行銷應用'], duration: 95 },
    { ch: 5, title: '作品集整理', lessons: ['作品展示排版', '個人品牌建立', '接案報價策略', 'Behance / ArtStation 上架'], duration: 55 }
  ],
  c06: [
    { ch: 1, title: 'Blender 入門', lessons: ['介面與快捷鍵', '基本建模工具', 'Modifier 修改器', '場景管理與 Collection'], duration: 90 },
    { ch: 2, title: '硬表面建模', lessons: ['佈線原則與拓撲', 'Boolean 布林運算', '細分曲面建模', '實作：科幻武器建模', '實作：機械零件建模'], duration: 120 },
    { ch: 3, title: '雕刻與有機建模', lessons: ['雕刻筆刷介紹', 'Dyntopo 動態拓撲', 'Remesh 與 Retopo', '實作：角色頭部雕刻', '實作：生物造型雕刻'], duration: 110 },
    { ch: 4, title: '材質與燈光', lessons: ['UV 展開技巧', 'PBR 材質原理', 'Shader Editor 節點', 'HDRI 環境燈光', '三點打光法'], duration: 100 },
    { ch: 5, title: '場景合成與算圖', lessons: ['場景構圖與配置', '攝影機設定', 'Cycles vs EEVEE', '降噪與後製合成', '期末：完整場景作品'], duration: 90 }
  ],
  c08: [
    { ch: 1, title: '攝影基礎', lessons: ['相機與鏡頭選擇', '曝光三角（光圈/快門/ISO）', '對焦模式與景深', '白平衡與色溫'], duration: 80 },
    { ch: 2, title: '構圖與光線', lessons: ['三分法與引導線', '自然光運用', '人工補光基礎', '黃金時刻拍攝'], duration: 85 },
    { ch: 3, title: '主題攝影', lessons: ['人像攝影與引導', '風景攝影長曝', '美食攝影打光', '街頭攝影快拍'], duration: 110 },
    { ch: 4, title: 'Lightroom 修圖', lessons: ['RAW 檔處理流程', '色調與色彩分級', '局部調整工具', '預設檔製作與批次處理'], duration: 95 },
    { ch: 5, title: '作品與接案', lessons: ['攝影集編排', '個人網站建置', '報價與合約', '客戶溝通技巧'], duration: 50 }
  ],
  c09: [
    { ch: 1, title: '廚房準備與基本功', lessons: ['廚具選購建議', '刀工基礎練習', '火候判斷技巧', '調味比例公式', '備料流程優化'], duration: 60 },
    { ch: 2, title: '快炒與煎類', lessons: ['蒜香空心菜', '番茄炒蛋', '乾煎雞腿排', '醬燒豬五花', '糖醋里肌'], duration: 55 },
    { ch: 3, title: '燉滷與湯品', lessons: ['紅燒牛腩', '滷肉飯', '麻油雞湯', '蛤蜊絲瓜湯', '玉米排骨湯'], duration: 60 },
    { ch: 4, title: '蒸煮與涼拌', lessons: ['清蒸鱸魚', '蒜泥白肉', '涼拌小黃瓜', '皮蛋豆腐', '日式茶碗蒸'], duration: 50 },
    { ch: 5, title: '宴客菜與擺盤', lessons: ['三杯雞', '宮保蝦仁', '蔥爆牛肉', '鳳梨蝦球', '創意擺盤五種技法'], duration: 55 }
  ],
  c11: [
    { ch: 1, title: '個人品牌定位', lessons: ['什麼是個人品牌', '找到你的獨特定位', '目標受眾分析', '品牌人設建立', '競爭者分析'], duration: 60 },
    { ch: 2, title: '內容策略', lessons: ['內容主題規劃', '內容日曆制定', '文章 vs 短影音 vs Podcast', '搜尋意圖與關鍵字', '內容覆用與分發'], duration: 70 },
    { ch: 3, title: '社群經營', lessons: ['Instagram 經營策略', 'YouTube 頻道建立', 'LinkedIn 專業形象', '社群互動與社群感', '數據分析與調整'], duration: 80 },
    { ch: 4, title: '變現模式', lessons: ['接案與顧問服務', '線上課程與數位產品', '聯盟行銷與業配', '會員制與訂閱制', '多元收入組合'], duration: 70 },
    { ch: 5, title: '長期經營', lessons: ['品牌一致性維護', '團隊與外包管理', '危機處理', '品牌延伸策略', '期末：品牌企劃書完成'], duration: 55 }
  ],
  c31: [
    { ch: 1, title: '訓練基礎概念', lessons: ['肌肉解剖與動作模式', '暖身與收操', '訓練變數（組數/次數/休息）', '居家設備選擇', '制定你的訓練計畫'], duration: 75 },
    { ch: 2, title: '上肢訓練', lessons: ['伏地挺身變化式', '彈力帶肩推與飛鳥', '壺鈴划船與硬舉', '核心抗旋轉訓練', '手臂孤立動作'], duration: 90 },
    { ch: 3, title: '下肢訓練', lessons: ['深蹲變化式', '弓箭步與側蹲', '臀推與臀橋', '單腳穩定訓練', '小腿與足踝強化'], duration: 90 },
    { ch: 4, title: '飲食與恢復', lessons: ['熱量與巨量營養素', '蛋白質攝取策略', '備餐規劃實作', '睡眠與壓力管理', '運動傷害預防'], duration: 80 },
    { ch: 5, title: '12 週進階課表', lessons: ['第 1–4 週：基礎期', '第 5–8 週：增量期', '第 9–12 週：強化期', '體態紀錄與調整', '結業評估與持續計畫'], duration: 70 }
  ],
  c38: [
    { ch: 1, title: 'Unity 開發環境', lessons: ['Unity Hub 安裝與專案建立', '介面導覽與場景管理', 'C# 基礎語法', 'MonoBehaviour 生命週期', 'Debug 與主控台'], duration: 85 },
    { ch: 2, title: '角色控制', lessons: ['Sprite 匯入與動畫', 'Rigidbody 2D 物理', '移動與跳躍控制', '地面偵測與 Coyote Time', '雙重跳躍與衝刺'], duration: 100 },
    { ch: 3, title: '關卡設計', lessons: ['Tilemap 地圖編輯', '陷阱與機關設計', '收集物與計分系統', '檢查點與存檔', '關卡切換與載入畫面'], duration: 110 },
    { ch: 4, title: '敵人與戰鬥', lessons: ['敵人 AI 巡邏路線', '追蹤與攻擊行為', 'Boss 戰設計', '生命值與傷害系統', '粒子特效與畫面震動'], duration: 120 },
    { ch: 5, title: '打磨與上架', lessons: ['UI 系統（血條/對話框）', '音效與背景音樂', '遊戲手感（Game Feel）', 'Steam 上架流程', '行銷與社群推廣'], duration: 85 }
  ],
  c41: [
    { ch: 1, title: '理財觀念建立', lessons: ['為什麼要理財？', '收入支出與儲蓄率', '緊急預備金的重要性', '複利的力量', '投資風險與報酬'], duration: 55 },
    { ch: 2, title: '認識投資工具', lessons: ['股票基礎概念', '債券與固定收益', 'ETF 是什麼？', '基金與 ETF 比較', '開戶與下單實操'], duration: 65 },
    { ch: 3, title: 'ETF 定期定額', lessons: ['台股 ETF 介紹（0050/006208）', '美股 ETF 介紹（VTI/VOO）', '定期定額策略', '再平衡時機', '實作：第一筆定期定額'], duration: 70 },
    { ch: 4, title: '資產配置', lessons: ['風險承受度評估', '股債比配置', '全球分散投資', '不同人生階段的配置', '用 Excel 追蹤績效'], duration: 60 },
    { ch: 5, title: '長期投資心法', lessons: ['避開常見投資陷阱', '市場波動時怎麼辦', '稅務基礎知識', '退休規劃試算', '打造你的被動收入計畫'], duration: 50 }
  ],
  c47: [
    { ch: 1, title: 'AI 繪圖概論', lessons: ['生成式 AI 原理簡介', 'Midjourney 帳號與設定', 'Stable Diffusion 本地安裝', '第一張 AI 圖片生成', '版權與商用注意事項'], duration: 70 },
    { ch: 2, title: 'Prompt 技巧大全', lessons: ['Prompt 結構拆解', '風格關鍵字庫', '負向 Prompt 策略', '參數調校（--ar、--s、--c）', '實作：10 種風格快速切換'], duration: 100 },
    { ch: 3, title: 'ControlNet 精準控制', lessons: ['Canny 邊緣偵測', 'OpenPose 人體姿態', 'Depth Map 深度圖', 'Tile 圖片高清放大', '實作：照片轉指定風格插畫'], duration: 110 },
    { ch: 4, title: 'LoRA 模型訓練', lessons: ['訓練資料集準備', 'Kohya 訓練環境設定', '參數調整與監控', '合併模型與測試', '實作：訓練專屬角色 LoRA'], duration: 130 },
    { ch: 5, title: '商用工作流', lessons: ['品牌素材批量生成', '電商商品圖製作', '社群貼文模板', '接案報價與客戶溝通', '作品集建立與發布'], duration: 80 }
  ]
};

// ── 組合包 ──
window.BUNDLES = [
  { id: 'bd1', name: 'AI 全能包', desc: '一次掌握 AI 時代核心技能，從 AI 開發到 AI 繪圖', courses: ['c03', 'c47'], price: 7800, original: 9960, save: 2160, tag: '最熱銷' },
  { id: 'bd2', name: '設計師必修包', desc: '品牌字體到 UI/UX 設計，全方位設計能力', courses: ['c01', 'c02'], price: 8200, original: 10260, save: 2060, tag: '超值' },
  { id: 'bd3', name: '創作者全包', desc: '3D 建模、角色設計到攝影，視覺創作一次學完', courses: ['c06', 'c05', 'c08'], price: 11200, original: 14040, save: 2840, tag: '新組合' }
];

// ── 熱門搜尋 ──
window.TRENDING_SEARCHES = ['AI 繪圖', 'Figma UI', 'Blender 3D', '個人品牌', 'AI 助理', '居家健身', 'ETF 理財', 'Unity 遊戲', '角色設計', '品牌字體', '鋼琴即興', '攝影技巧'];

// ── 學員成功故事 ──
window.SUCCESS_STORIES = [];

// ── 即將上架（預購課程） ──
window.UPCOMING_COURSES = [
  { id: 'uc1', title: 'Swift UI 入門：打造你的第一個 iOS App', teacher: '蔡承恩', cat: 'ai', expected: '2026-12', earlybird: 3980, interest: 1240 },
  { id: 'uc2', title: 'Unreal Engine 5 入門：打造次世代遊戲場景', teacher: '何俊廷', cat: 'game', expected: '2026-12', earlybird: 5480, interest: 890 },
  { id: 'uc3', title: '數據驅動行銷：GA4 與廣告數據分析', teacher: '邱冠宇', cat: 'career', expected: '2027-01', earlybird: 3680, interest: 1560 },
  { id: 'uc4', title: 'AI 音樂製作：用 Suno 與 Udio 做出完整歌曲', teacher: '吳若晴', cat: 'creative', expected: '2027-01', earlybird: 3280, interest: 2340 }
];

// ── 文章內容模板 ──
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
  p16: [
    { type: 'p', text: 'AI 繪圖工具越來越強大，設計師是不是要被取代了？答案是不會——但工作方式會徹底改變。' },
    { type: 'h2', text: 'AI 能做什麼？不能做什麼？' },
    { type: 'p', text: 'AI 擅長快速生成大量視覺方案、風格探索和素材生成。但它不懂品牌策略、不會做使用者研究、無法理解商業脈絡。設計師的價值在於「判斷」和「決策」，而不只是「產出」。' },
    { type: 'h2', text: '設計師該如何轉型？' },
    { type: 'p', text: '第一，把 AI 當作超級助手，讓它負責草圖和發想階段。第二，強化 AI 做不到的能力——策略思考、客戶溝通、品牌管理。第三，學會用 AI 工具提高效率，而不是恐懼它。' },
    { type: 'p', text: '會用 AI 的設計師，產出速度是不用的十倍。在這個時代，最危險的不是被 AI 取代，而是被「會用 AI 的同行」取代。' }
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
  { id: 'n6', type: 'course', title: '課程作業已批改', body: '「UI/UX 實戰」第 3 章作業已收到講師回饋', time: '1 天前', read: true, link: '/player.html?id=c02' },
  { id: 'n7', type: 'system', title: '系統維護通知', body: '平台將於 11/10（日）凌晨 2:00–4:00 進行例行維護', time: '2 天前', read: true },
  { id: 'n8', type: 'promo', title: '推薦好友享 $50 折扣', body: '分享你的專屬推薦連結，每成功推薦一位好友雙方各得 $50', time: '3 天前', read: true, link: '/invite.html' }
];

// ── 講師詳細自介 ──
window.INSTRUCTOR_BIOS = {
  '黃士誠': { detail: '前 Google AI 研究員、台大資工碩士，專注生成式 AI 應用開發超過八年。曾帶領團隊開發企業級 LLM 解決方案，服務客戶包含金融、醫療與零售產業。教學風格以實務專案驅動，強調「做出能用的東西」。', works: ['Google AI 研究團隊核心成員', '出版《生成式 AI 實戰手冊》暢銷書', '主導三款企業 AI 產品上線', 'AI 社群 TW-AI Meetup 共同創辦人'], social: { yt: '#', gh: '#', tw: '#' } },
  '張雨萱': { detail: '畢業於英國皇家藝術學院插畫系，作品散見於 Netflix 動畫、國際繪本與品牌聯名。擅長角色 IP 開發與數位插畫，風格融合東方水墨與西方繪本美學。致力於讓更多人發現繪畫的樂趣。', works: ['Netflix 動畫《幻境傳說》角色設計', '義大利波隆那兒童書展入選', 'LINE 貼圖創作者 TOP 10', '三本繪本出版，累計銷量 5 萬冊'], social: { ig: '#', tw: '#' } },
  '林予安': { detail: '品牌字體設計專家，曾任奧美品牌設計顧問十年。專精中英文字型系統設計，作品獲金點設計獎肯定。致力於降低字型設計門檻，讓更多人理解品牌字體的力量。', works: ['前奧美品牌設計顧問（10 年）', '設計超過 50 套企業品牌字型', '金點設計獎字體類金獎', 'Adobe Max 特邀講者'], social: { ig: '#', web: '#' } },
  '陳柏睿': { detail: '前 LINE 台灣設計主管，專精 Figma 設計系統與 UI/UX 設計流程。帶領團隊設計超過 30 款 App，Red Dot 設計獎入圍。教學注重實務與交付流程。', works: ['前 LINE 台灣設計主管', 'Red Dot 設計獎入圍', 'Figma Config 特邀講者', '設計超過 30 款上線 App'], social: { ig: '#', ln: '#' } },
  '蔡明哲': { detail: '米其林一星餐廳前主廚，法國廚藝學校 Le Cordon Bleu 結業。專注將高端餐廳的烹飪技巧簡化為家庭廚房可操作的版本，讓人人都能做出專業水準的料理。', works: ['米其林一星餐廳 Lumière 前主廚', 'Le Cordon Bleu 巴黎校區結業', '出版《家常菜的職人秘密》銷量 3 萬冊', 'YouTube 料理頻道 38 萬訂閱'], social: { yt: '#', ig: '#' } },
  '劉怡君': { detail: '品牌策略顧問與自由工作者社群主理人，協助超過 200 個品牌建立線上影響力。前奧美創意總監，擅長將行銷理論轉化為可執行的實戰策略，特別在個人品牌與自媒體經營上有深厚見解。', works: ['前奧美創意總監（7 年）', '「自由人協作社」社群主理人（5 萬成員）', '協助 200+ 品牌建立線上策略', '三度獲得 4A 創意獎'], social: { ig: '#', ln: '#' } },
  '許家豪': { detail: '資深 3D 美術總監，參與多款 AAA 遊戲與動畫電影製作。Blender 創作者與教學者，同時也是 ArtStation 熱門創作者。致力於降低 3D 創作門檻，讓更多人享受立體創作的樂趣。', works: ['參與《黑神話：悟空》環境美術', 'ArtStation Trending 多次上榜', 'Blender 官方社群精選藝術家', '遊戲美術工作室 Studio Pixel 創辦人'], social: { as: '#', tw: '#' } },
  '郭書瑜': { detail: 'CFP 國際認證理財規劃師，擁有超過十年金融業經驗。前富邦銀行資深理財顧問，幫助超過 5000 位客戶建立正確的理財觀念。教學風格務實易懂，著重風險意識與長期投資策略。', works: ['CFP 國際認證理財規劃師', '前富邦銀行資深理財顧問（10 年）', '出版《小資族的第一本理財書》', '理財 Podcast「錢滾錢」主持人'], social: { ig: '#', podcast: '#' } },
  '吳若晴': { detail: '英國皇家音樂院鋼琴演奏碩士，回台後專注於即興演奏與流行歌曲改編教學。金曲獎最佳編曲入圍，演奏會超過 200 場。相信人人都能享受即興彈奏的樂趣。', works: ['英國皇家音樂院鋼琴演奏碩士', '金曲獎最佳編曲入圍', '全台演奏會超過 200 場', 'YouTube 音樂頻道 15 萬訂閱'], social: { yt: '#', ig: '#' } },
  '陳威宏': { detail: '獨立遊戲開發者，Steam 上架三款獨立遊戲。Unity 開發者，推動台灣獨立遊戲文化，曾在 GDC、TGS 等國際展會展出作品。相信遊戲是最好的說故事媒介。', works: ['Steam 上架《影之境》《幻夢迴廊》《像素英雄傳》', 'GDC 2025 獨立遊戲展出', '台灣獨立遊戲社群 IndieGameTW 創辦人', 'Unity 認證開發者'], social: { steam: '#', tw: '#' } },
  '李承翰': { detail: '商業攝影師，合作品牌超過百家，作品刊登於 Vogue、GQ、ELLE 等國際時尚雜誌。擅長人像與商品攝影，教學注重光線控制與構圖美學，幫助學員從愛好者進階為職業攝影師。', works: ['Vogue / GQ / ELLE 作品刊登', '合作品牌超過 150 家', 'Canon 簽約攝影師', '亞洲攝影大賞 2024 金獎'], social: { ig: '#', web: '#' } },
  '陳冠宏': { detail: 'NSCA-CSCS 國際認證體能訓練專家，曾任職業運動員體能教練。專注居家訓練與運動營養規劃，累計指導超過 3000 名學員。出版暢銷書《居家健身聖經》。', works: ['NSCA-CSCS 國際認證', '前職業棒球隊體能教練', '出版《居家健身聖經》銷量 2 萬冊', 'YouTube 健身頻道 25 萬訂閱'], social: { yt: '#', ig: '#' } }
};

// ── 學員見證（詳細版） ──
window.TESTIMONIALS = [];

// ── 本月精選 ──
window.EDITORS_PICKS = [
  { id: 'c47', quote: '從零開始掌握 AI 最強繪圖工具，這堂課是 2026 年最不能錯過的學習投資。' },
  { id: 'c03', quote: '從 Prompt Engineering 到 RAG 架構，完整走過 AI 應用開發的核心技能。' },
  { id: 'c06', quote: 'Blender 3D 從建模到渲染一條龍教學，做出完整場景作品。' }
];

// ── 平台公告 ──
window.ANNOUNCEMENTS = [
  { id: 'a1', text: '雙 11 全站限時 85 折，倒數中！', link: '/coupon.html', type: 'promo' },
  { id: 'a2', text: '新課上架：AI 繪圖實戰、Unity 遊戲開發', link: '/category.html?cat=ai', type: 'new' },
  { id: 'a3', text: '2026 秋季學習挑戰賽開跑，完成任務抽 AirPods', link: '/achievement.html', type: 'event' }
];

// ── 學員作品牆 ──
window.GALLERY = [
  { id: 'g1', author: '林佳蓉', course: 'c02', cat: 'UI 設計', title: '旅遊 App 介面設計', desc: '完整的旅遊訂房 App UI，包含搜尋、列表、詳情與結帳四個主要頁面。', v: '13228', likes: 234, comments: 18, featured: true },
  { id: 'g3', author: '王思妤', course: 'c05', cat: '插畫', title: '森林精靈角色設計', desc: '原創角色 IP，包含三視圖、表情表與色彩設定。', v: '785', likes: 312, comments: 27, featured: true },
  { id: 'g5', author: '許家豪', course: 'c06', cat: '3D', title: '中世紀城堡場景', desc: '使用 Blender 建模、UV 展開與 HDRI 燈光，完成的中世紀城堡場景。', v: '29997', likes: 278, comments: 21, featured: true },
  { id: 'g8', author: '黃詩涵', course: 'c03', cat: 'AI', title: 'AI 客服助手', desc: '結合 RAG 技術的企業 AI 客服系統，能回答產品和售後問題。', v: '41654', likes: 203, comments: 38, featured: false },
  { id: 'g9', author: '劉家銘', course: 'c01', cat: '設計', title: '手沖咖啡品牌字型', desc: '為手沖咖啡品牌設計的中英文字型系統，包含標題與內文兩種字重。', v: '50598', likes: 245, comments: 16, featured: true },
  { id: 'g13', author: '陳冠廷', course: 'c38', cat: '遊戲', title: 'Unity 2D 平台跳躍遊戲', desc: '完整的 2D 平台跳躍遊戲，包含角色控制、關卡設計和 Boss 戰。', v: '42648', likes: 187, comments: 29, featured: true }
];

// ── 限時免費體驗 ──
window.FREE_COURSES = [
  { id: 'c04', reason: '新手入門精選', endsIn: '3 天後截止' },
  { id: 'c09', reason: '生活技能月限定免費', endsIn: '5 天後截止' },
  { id: 'c41', reason: '理財入門週', endsIn: '2 天後截止' }
];

// ── 課程學習目標 ──
window.COURSE_HIGHLIGHTS = {
  c01: ['掌握字型設計完整流程：從草圖到 Glyphs 軟體輸出', '建立中英文配字系統與排版規範', '了解字體授權與商業模式', '完成一套可商用的品牌專屬字型'],
  c02: ['熟練 Figma 元件系統與 Auto Layout', '掌握完整的 App UI 設計流程', '建立 Design System 與設計規範', '學會 Prototype 與 Dev Mode 工程師交付'],
  c03: ['理解 Prompt Engineering 核心原理', '掌握 RAG 與 Function Calling 實作', '用 API 串接打造 AI 助手', '部署上線一個完整的 AI 應用'],
  c04: ['掌握鋼琴和弦進行與即興填音', '學會改編流行歌曲伴奏', '了解基礎樂理與和聲學', '能自信地即興演奏任何流行歌'],
  c05: ['建立原創角色設定與世界觀', '掌握配色邏輯與情感表達', '學會表情變化與姿勢動態', '完成一組可授權的角色 IP'],
  c06: ['掌握 Blender 建模到渲染全流程', 'UV 展開、PBR 材質與 HDRI 燈光', '做出完整的 3D 場景作品', '建立可接案的 3D 作品集'],
  c08: ['掌握自然光人像攝影技巧', '學會構圖法則與場景選擇', '熟練 Lightroom 調色工作流程', '用一機一鏡拍出雜誌質感照片'],
  c09: ['掌握中西式經典料理技法', '學會食材挑選與備料流程', '做出餐廳等級的擺盤呈現', '獨立完成一桌完整的宴客菜'],
  c11: ['找到個人品牌的獨特定位', '建立內容策略與社群經營能力', '掌握多元變現模式', '打造能持續帶來收入的個人品牌'],
  c31: ['掌握居家徒手訓練全流程', '學會 12 週漸進式課表安排', '了解飲食與恢復的基本原則', '不用器材也能練出明顯線條'],
  c38: ['掌握 Unity 2D 遊戲開發全流程', '學會角色控制、關卡設計與敵人 AI', '做出可上架 Steam 的完整遊戲', '了解遊戲手感與打磨技巧'],
  c41: ['建立正確的投資觀念與風險意識', '掌握 ETF 定期定額實戰策略', '學會股債配置與再平衡', '從第一筆 3000 元開始投資旅程'],
  c47: ['掌握 Midjourney + Stable Diffusion 雙平台', '學會 ControlNet 精準控制 AI 圖像', '訓練專屬 LoRA 模型', '建立 AI 繪圖商用工作流']
};

// ── 為什麼選擇 AI Class ──
window.WHY_AICLASS = [
  { icon: '🎯', title: '業界職人親授', desc: '每位講師都有 5 年以上實戰經驗，教的不只是理論，更是真正在業界用到的技能。' },
  { icon: '🔄', title: '終身免費更新', desc: '課程內容隨技術進步持續更新，一次購買就能永久獲得最新版本的教學。' },
  { icon: '💬', title: '講師親自回覆', desc: '每堂課都有專屬討論區，講師在 48 小時內親自回覆你的學習問題。' },
  { icon: '📱', title: '隨時隨地學習', desc: '支援電腦、手機、平板，離線下載讓你在通勤或旅途中也能學習。' },
  { icon: '🏆', title: '完課即獲證書', desc: '完成課程自動頒發電子證書，可分享至 LinkedIn 展示你的專業能力。' },
  { icon: '🛡️', title: '7 天退費保證', desc: '不滿意可在 7 天內申請全額退費，零風險開始你的學習之旅。' }
];

// ── 課程先修建議 ──
window.PREREQS = {
  c03: [],
  c06: [],
  c08: [],
  c02: [],
  c38: []
};

// ── 課程專屬 FAQ ──
window.COURSE_FAQS = {
  c01: [['需要有設計背景嗎？', '不需要，但建議有基本的審美意識。課程從字體設計概論開始，循序漸進教你從手繪到軟體操作。'], ['需要什麼軟體？', '主要使用 Glyphs（Mac）或 FontForge（免費替代）。課程有詳細的軟體安裝與設定教學。'], ['學完可以販售自己的字型嗎？', '可以！課程最後教你字型授權模式選擇與平台上架流程，讓你的字型作品能夠變現。']],
  c02: [['沒有繪畫基礎可以學嗎？', '可以！課程從最基本的設計原則開始，每週有循序漸進的作業。很多學員都是零基礎開始的。'], ['需要準備什麼工具？', '只需要一台電腦和 Figma（免費版即可）。課程有詳細的 Figma 設定教學。'], ['作業有老師批改嗎？', '有的，每份作業講師會在 48 小時內給予文字回饋與修改建議，並挑選優秀作品在社群分享。']],
  c03: [['需要會寫程式嗎？', '需要基本的 Python 基礎。課程會從 API 串接開始教，但不會從零教 Python 語法。'], ['課程內容會隨 AI 技術更新嗎？', '會的，講師每季會更新課程內容以涵蓋最新的 AI 模型與技術。已購買學員免費享有所有更新。'], ['可以用在工作上嗎？', '當然可以！課程有大量職場實用案例，包括自動化報告、數據分析、內容生成等實際應用場景。']],
  c04: [['完全不會鋼琴可以學嗎？', '可以！課程從認識鍵盤和基礎指法開始，零基礎也能跟上。'], ['需要什麼鍵盤？', '建議準備 61 鍵以上的電子琴或電鋼琴。課程有選購指南，3000 元就能入門。'], ['學完可以即興伴奏嗎？', '可以！課程從和弦進行到即興填音，學完就能自信地改編任何流行歌曲的伴奏。']],
  c05: [['需要有繪畫基礎嗎？', '不需要完整的繪畫基礎，但建議有基本的審美意識。課程會從設計原則開始教起，包含配色理論。'], ['用什麼軟體上課？', '主要使用 Clip Studio Paint 或 Procreate。課程有免費替代工具推薦。'], ['學完可以接案嗎？', '可以，課程最後有專門的接案實戰章節，教你如何報價、跟客戶溝通、交付作品。']],
  c06: [['需要 3D 基礎嗎？', '不需要！課程從 Blender 介面與快捷鍵開始教，零基礎也能跟上。'], ['電腦需要什麼規格？', '建議 16GB RAM 以上、有獨立顯卡。課程有硬體配置建議與省錢替代方案。'], ['學完可以接案嗎？', '可以，課程最後有完整的作品集整理與接案技巧教學。很多學員結業後開始接 3D 商業案。']],
  c08: [['需要什麼攝影設備？', '入門用手機就能開始學，進階章節建議有一台相機（任何品牌的入門單眼或微單都可以）。'], ['會教修圖嗎？', '有的，課程包含 Lightroom 的後製教學，從基礎調色到進階色彩分級都有涵蓋。'], ['學完可以接商業攝影嗎？', '課程有專門的接案章節，教你如何報價、場地佈置和客戶溝通。很多學員結業後就開始接案。']],
  c09: [['在家能做出餐廳水準嗎？', '可以！蔡主廚會教你餐廳等級的技巧，但用家庭廚房就能實現。很多學員的作品連專業廚師都讚嘆。'], ['食材容易買到嗎？', '課程中的食材都能在一般超市或傳統市場買到，不需要特殊食材。部分進階課會用到可網購的材料。'], ['每道菜的製作時間大約多久？', '基礎菜色約 30-60 分鐘，進階菜色約 1-2 小時。每堂課都有時間標示，方便你安排練習。']],
  c11: [['沒有行銷經驗可以學嗎？', '可以！課程從個人定位開始教，不需要任何行銷背景，適合想建立個人品牌的所有人。'], ['多久可以看到成效？', '認真執行的話，約 2-3 個月可以看到社群成長與互動提升。課程有 30 天挑戰計畫幫你養成習慣。'], ['學完可以靠個人品牌賺錢嗎？', '可以！課程有專門的變現模式章節，教你接案、線上課程、聯盟行銷等多元收入來源。']],
  c31: [['沒有運動習慣可以學嗎？', '當然可以！課程從最基礎的動作開始教，12 週課表循序漸進，讓身體慢慢適應。'], ['需要什麼器材？', '前 4 週完全徒手訓練，之後建議準備彈力帶和壺鈴（總共約 1500 元），在家就能練。'], ['多久可以看到效果？', '認真跟著課表練習，4 週內可以感受到體力提升，8-12 週開始看到明顯的體態變化。']],
  c38: [['需要會寫程式嗎？', '課程會從 C# 基礎語法開始教，但有程式基礎會學得更快。'], ['做出的遊戲可以上架 Steam 嗎？', '可以！課程最後有教 Steam 上架流程，包含商店頁面設定、定價策略和行銷。'], ['Unity 是免費的嗎？', '個人版完全免費，營收超過 20 萬美元才需要付費。課程全程使用免費版教學。']],
  c41: [['完全不懂投資可以學嗎？', '非常適合！課程從「什麼是投資」開始教，一步步帶你建立完整的理財觀念。'], ['需要很多本金嗎？', '不需要！課程教的 ETF 定期定額，每月 3000 元就能開始，適合小資族。'], ['會教個股或加密貨幣嗎？', '課程主軸是 ETF 投資和資產配置，這是最穩健的入門方式。個股基礎概念有簡單介紹。']],
  c47: [['需要會畫圖嗎？', '不需要！AI 繪圖不需要繪畫基礎，重點是學會 Prompt 技巧和參數控制。'], ['Midjourney 和 Stable Diffusion 都要學嗎？', '課程兩個都教。Midjourney 適合快速出圖，Stable Diffusion 適合精細控制。掌握兩者讓你更全面。'], ['AI 生成的圖可以商用嗎？', '可以，但需要注意各平台的使用條款。課程有專門章節講解版權與商用注意事項。']]
};
