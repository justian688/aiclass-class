// OKAI課程網 課程資料（AI 專門課程平台）
// 價格、講師、日期等目前是預設值，正式上線前請換成真實資料
window.CATS = [
  { id: 'all', name: '全部課程' },
  { id: 'ai', name: 'AI 開發', subs: ['AI 應用開發', 'AI Agent', 'RAG 知識庫', 'API 串接'] },
  { id: 'drawing', name: 'AI 繪圖', subs: ['Midjourney', 'Stable Diffusion', 'ComfyUI', '角色設計', 'LINE 貼圖'] },
  { id: 'design', name: 'AI 設計', subs: ['品牌設計', 'Logo 設計', '網頁設計', 'App 介面'] },
  { id: 'video', name: 'AI 影片', subs: ['影片生成', 'AI 動畫', 'AI 3D', '短影音'] },
  { id: 'creative', name: 'AI 音樂與攝影', subs: ['AI 作曲', 'AI 配音', 'AI 修圖', 'AI 攝影後製'] },
  { id: 'career', name: 'AI 行銷與自媒體', subs: ['AI 文案', 'AI 社群經營', 'AI SEO', '個人品牌'] },
  { id: 'baking', name: 'AI 產業應用', subs: ['餐飲業', '零售電商', '中小企業', '客服自動化'] },
  { id: 'game', name: 'AI 遊戲開發', subs: ['AI 寫程式', 'AI 遊戲素材', 'Vibe Coding'] },
  { id: 'finance', name: 'AI 理財與副業', subs: ['AI 財報分析', 'AI 投資研究', 'AI 副業'] },
  { id: 'beauty', name: 'AI 生活應用', subs: ['AI 健身規劃', 'AI 飲食規劃', 'AI 時間管理'] }
];

const T = 'OKAI 講師團隊', R = 'OKAI課程網 專業講師';
window.COURSES = [
  { id: 'c03', v: '41654', cat: 'ai', sub: 'AI 應用開發', title: '生成式 AI 應用開發：打造你的第一個 AI 助理', teacher: T, role: R, price: 5980, origin: 5980, rating: 0, students: 0, tag: 'NEW', hours: 26, desc: '從 Prompt 設計、Function Calling、RAG 知識庫到雲端部署，一步步做出能真正上線使用的 AI 助理。', ai: '從零做出一個能上線的 AI 助理，學會 Prompt、RAG 與部署', pro: true },
  { id: 'c47', v: '46353', cat: 'drawing', sub: 'Midjourney', title: 'AI 繪圖實戰：Midjourney + Stable Diffusion 完全攻略', teacher: T, role: R, price: 3980, origin: 3980, rating: 0, students: 0, tag: 'HOT', hours: 16, desc: '從 Prompt 技巧、ControlNet 精準控制到 LoRA 訓練，用 AI 產出可商用的插畫與設計素材。', ai: '學會兩大 AI 繪圖工具，做出可商用的插畫與設計素材' },
  { id: 'c05', v: '785', cat: 'drawing', sub: '角色設計', title: 'AI 角色設計：打造原創角色與 LINE 貼圖', teacher: T, role: R, price: 3580, origin: 3580, rating: 0, students: 0, tag: 'NEW', hours: 12, desc: '用 AI 發想角色、維持角色一致性、產出表情組與三視圖，最後完成一套可上架的 LINE 貼圖。', ai: '用 AI 做出原創角色，完成一套可上架的 LINE 貼圖' },
  { id: 'c01', v: '50598', cat: 'design', sub: '品牌設計', title: 'AI 品牌設計：用 AI 做 Logo、字體與品牌視覺', teacher: T, role: R, price: 3980, origin: 3980, rating: 0, students: 0, tag: '', hours: 14, desc: '用 ChatGPT 做品牌定位、用 AI 繪圖工具發想 Logo 與配色，再整理成一份完整的品牌視覺規範。', ai: '用 AI 從品牌定位做到 Logo、配色與品牌規範' },
  { id: 'c02', v: '13228', cat: 'design', sub: '網頁設計', title: 'AI 網頁與 App 設計：Figma AI + Vibe Coding 實戰', teacher: T, role: R, price: 4980, origin: 4980, rating: 0, students: 0, tag: 'HOT', hours: 20, desc: '用 AI 產生介面草稿、在 Figma 完成設計，再用 Claude、Cursor 等 AI 工具把設計變成可以上線的網頁。', ai: '用 AI 把設計稿變成可以上線的網頁與 App 介面', pro: true },
  { id: 'c06', v: '29997', cat: 'video', sub: '影片生成', title: 'AI 影片生成實戰：Sora、Kling 與 Runway', teacher: T, role: R, price: 4580, origin: 4580, rating: 0, students: 0, tag: 'NEW', hours: 18, desc: '文字生成影片、圖片轉影片、AI 配音與剪輯，做出廣告短片、產品介紹與社群短影音。', ai: '用 AI 做出廣告短片與社群短影音，不用攝影棚', pro: true },
  { id: 'c04', v: '33936', cat: 'creative', sub: 'AI 作曲', title: 'AI 音樂創作：用 Suno 作曲與編曲', teacher: T, role: R, price: 2980, origin: 2980, rating: 0, students: 0, tag: '', hours: 10, desc: '寫歌詞、選曲風、生成與修改歌曲，再搭配 AI 配音與混音，做出可以用在影片與廣告的音樂。', ai: '不會樂器也能用 AI 寫出完整歌曲與配樂' },
  { id: 'c08', v: '34408', cat: 'creative', sub: 'AI 修圖', title: 'AI 攝影修圖：Lightroom AI 與 Photoshop 生成式填色', teacher: T, role: R, price: 3280, origin: 3280, rating: 0, students: 0, tag: '', hours: 12, desc: 'AI 遮色片、AI 降噪、生成式填色與擴展、商品去背換景，大幅縮短修圖時間。', ai: '用 AI 修圖功能，把修圖時間縮短到原本的一小部分' },
  { id: 'c11', v: '4809', cat: 'career', sub: '個人品牌', title: 'AI 自媒體經營：用 ChatGPT 與 Claude 打造個人品牌', teacher: T, role: R, price: 3480, origin: 3480, rating: 0, students: 0, tag: 'HOT', hours: 11, desc: '用 AI 找定位、規劃內容、寫文案、做短影音腳本與 SEO 文章，建立能持續經營的個人品牌。', ai: '用 AI 規劃內容、寫文案與腳本，穩定經營自媒體' },
  { id: 'c09', v: '49231', cat: 'baking', sub: '餐飲業', title: '餐飲業 AI 應用：菜單、社群行銷與客服自動化', teacher: T, role: R, price: 2680, origin: 2680, rating: 0, students: 0, tag: '', hours: 8, desc: '用 AI 設計菜單文案、拍出好看的餐點照片、經營社群與 Google 地圖評論，並用 LINE 機器人自動回覆訂位。', ai: '餐廳老闆也能上手的 AI 行銷與客服自動化' },
  { id: 'c38', v: '42648', cat: 'game', sub: 'Vibe Coding', title: 'AI 遊戲開發：用 AI 寫程式做出 2D 遊戲', teacher: T, role: R, price: 4280, origin: 4280, rating: 0, students: 0, tag: 'NEW', hours: 16, desc: '不熟程式也能開始：用 Claude、Cursor 寫遊戲程式，用 AI 生成角色與場景素材，完成一款可以玩的 2D 遊戲。', ai: '用 AI 寫程式加 AI 素材，完成一款可以玩的 2D 遊戲' },
  { id: 'c41', v: '26676', cat: 'finance', sub: 'AI 財報分析', title: 'AI 理財研究：用 ChatGPT 讀財報與整理投資資訊', teacher: T, role: R, price: 2980, origin: 2980, rating: 0, students: 0, tag: '', hours: 8, desc: '用 AI 快速讀懂財報、整理新聞與法說會重點、建立記帳與預算表。本課程只教工具與方法，不提供投資建議。', ai: '用 AI 讀財報、整理資訊，理財研究更有效率' },
  { id: 'c31', v: '23056', cat: 'beauty', sub: 'AI 健身規劃', title: 'AI 生活應用：用 AI 規劃運動、飲食與時間', teacher: T, role: R, price: 1980, origin: 1980, rating: 0, students: 0, tag: '', hours: 6, desc: '用 AI 排出適合自己的運動計畫、記錄飲食、安排行程與學習計畫，把 AI 變成生活小助理。內容不取代醫療或專業建議。', ai: '把 AI 變成生活助理：運動、飲食與時間管理' }
];

window.HERO = ['c03', 'c47', 'c06', 'c02', 'c11', 'c09'];
window.HERO_COPY = {
  c03: ['AI 時代的新技能', '用生成式 AI\n打造你的 AI 助理', '從 Prompt、RAG 到部署上線，26 小時完整實作'],
  c47: ['AI 繪圖入門到商用', '用 AI 畫出\n可商用的作品', 'Midjourney + Stable Diffusion 一次學會'],
  c06: ['不用攝影棚', '用 AI 做出\n廣告級短影片', 'Sora、Kling、Runway 影片生成實戰'],
  c02: ['設計到上線一次完成', '用 AI 做網頁\n從設計到上線', 'Figma AI + Vibe Coding，不熟程式也能做'],
  c11: ['自媒體經營', '用 AI 經營\n你的個人品牌', '定位、文案、短影音腳本與 SEO 一次搞定'],
  c09: ['店家老闆必學', 'AI 幫你做行銷\n也幫你回客人', '菜單文案、社群經營與 LINE 自動回覆']
};

window.REVIEWS = [];

window.FAQ = [
  ['購買後可以觀看多久？', '一次購買即可無限期觀看，課程日後更新的內容也會開放給已購買的學員。'],
  ['完全沒有 AI 基礎可以學嗎？', '可以。大部分課程從工具註冊與基本操作開始教，適合零基礎；需要程式基礎的課程會在課程頁特別標示。'],
  ['可以用手機或平板上課嗎？', '可以，支援電腦、手機、平板，並可調整播放速度與開啟字幕。'],
  ['AI 工具需要另外付費嗎？', '課程會優先使用免費方案示範；部分進階功能需要工具的付費方案，課程中會清楚說明。'],
  ['付款方式有哪些？', '支援信用卡、ATM 轉帳與超商代碼繳費，並可開立電子發票。'],
  ['不滿意可以退費嗎？', '購買後 7 天內且觀看進度低於 20%，可聯絡客服申請退費。'],
  ['可以跟講師提問嗎？', '每堂課都有留言討論區，講師與助教會盡快回覆你的學習問題。'],
  ['有企業內訓方案嗎？', '有，我們提供企業 AI 內訓與包班課程，歡迎來信洽詢 hi@okaiclass.com。']
];

window.NAV_BANNER = [
  { label: '📚 最新課程', link: '#new' },
  { label: '🧭 AI 學習路徑', link: '#' },
  { label: '👨‍🏫 成為講師', link: '#' },
  { label: '🏢 企業 AI 內訓', link: '#' }
];

window.PARTNERS = [];

window.PATHS = [
  { id: 'p1', name: 'AI 開發者', desc: '從 AI 應用開發到 AI 寫程式，學會用 AI 做出產品', courses: ['c03', 'c02', 'c38'], duration: '3-4 個月', level: '入門到進階', salary: '依職務而定' },
  { id: 'p2', name: 'AI 創作者', desc: 'AI 繪圖、角色設計、影片生成與音樂，一個人就是一個創作團隊', courses: ['c47', 'c05', 'c06', 'c04'], duration: '2-4 個月', level: '零基礎', salary: '依接案量而定' },
  { id: 'p3', name: 'AI 行銷人', desc: '用 AI 做品牌、做內容、做修圖，行銷工作快好幾倍', courses: ['c11', 'c01', 'c08'], duration: '2-3 個月', level: '零基礎', salary: '依職務而定' },
  { id: 'p4', name: 'AI 老闆／生活家', desc: '把 AI 用在店家經營、理財研究與日常生活', courses: ['c09', 'c41', 'c31'], duration: '1-2 個月', level: '零基礎', salary: '—' }
];

window.BOOTCAMPS = [];

window.MISSIONS = [
  { type: '每日出席', icon: '📋', reward: 10, unit: 'XP', desc: '今天登入平台學習', badge: '簡單' },
  { type: '觀看一堂課', icon: '🎬', reward: 25, unit: 'XP', desc: '完成任意一個課時', badge: '簡單' },
  { type: '寫學習筆記', icon: '✏️', reward: 15, unit: 'XP', desc: '為任意課程新增一則筆記', badge: '中等' },
  { type: '連續 7 天', icon: '🔥', reward: 200, unit: 'XP', desc: '連續 7 天不中斷地學習', badge: '挑戰' },
  { type: '完成測驗', icon: '🎯', reward: 30, unit: 'XP', desc: '完成一份課程小測驗', badge: '中等' },
  { type: '實作作業', icon: '🤖', reward: 40, unit: 'XP', desc: '用 AI 工具完成一份課程作業', badge: '中等' }
];
window.MISSION_STATS = null;

window.VIDEO_CONTENT = [];

window.POSTS = [
  { id:'p1', title:'2026 年最值得學的 5 項 AI 技能', excerpt:'從提示詞、AI Agent 到 AI 影片生成，整理出最值得投資時間學習的五項 AI 技能，以及該從哪一項開始。', cat:'ai', author:'OKAI 編輯部', date:'2026-11-24', readTime:8, v:'41654', tags:['AI','職涯','趨勢'] },
  { id:'p3', title:'AI 要從哪裡開始學？給完全新手的學習路線', excerpt:'不會寫程式、不懂技術也沒關係。依照你的目標，挑一條最適合的 AI 學習路線。', cat:'ai', author:'OKAI 編輯部', date:'2026-11-24', readTime:7, v:'785', tags:['AI入門','學習路線'] },
  { id:'p4', title:'AI 影片生成工具比較：Sora、Kling、Runway 怎麼選？', excerpt:'三款熱門 AI 影片工具的差異、適合用途與上手難度，一次整理。', cat:'video', author:'OKAI 編輯部', date:'2026-11-24', readTime:7, v:'29997', tags:['AI影片','Sora','Kling'] },
  { id:'p5', title:'不會寫程式也能做網站？Vibe Coding 入門', excerpt:'用說的就能讓 AI 寫程式。介紹 Vibe Coding 的做法、適合的工具與要注意的地方。', cat:'design', author:'OKAI 編輯部', date:'2026-11-24', readTime:6, v:'13228', tags:['Vibe Coding','AI寫程式'] },
  { id:'p16', title:'AI 繪圖 vs 手繪：設計師該如何定位自己？', excerpt:'AI 繪圖工具越來越強，設計師的價值在哪裡？從工作流程談設計師的轉型方向。', cat:'drawing', author:'OKAI 編輯部', date:'2026-11-24', readTime:8, v:'46353', tags:['AI繪圖','設計','職涯'] },
  { id:'p20', title:'Midjourney 新手必學的 10 個 Prompt 技巧', excerpt:'風格描述、構圖用語、參數設定與負面提示，讓 AI 出圖品質明顯提升。', cat:'drawing', author:'OKAI 編輯部', date:'2026-11-24', readTime:8, v:'40534', tags:['Midjourney','Prompt'] },
  { id:'p9', title:'小店也能用 AI：餐飲業 5 個最實用的 AI 應用', excerpt:'菜單文案、餐點照片、社群貼文、評論回覆與 LINE 自動回覆，老闆自己就能做。', cat:'baking', author:'OKAI 編輯部', date:'2026-11-24', readTime:6, v:'49231', tags:['餐飲業','AI應用','中小企業'] },
  { id:'p18', title:'用 AI 讀財報：新手也能看懂的三個步驟', excerpt:'用 ChatGPT 或 Claude 整理財報重點的方法與注意事項。AI 是研究工具，不是投資建議。', cat:'finance', author:'OKAI 編輯部', date:'2026-11-24', readTime:6, v:'26676', tags:['AI理財','財報'] }
];

window.INSTRUCTORS = [
  { id: 'i1', name: T, role: R, courses: 13, students: 0, followers: 0, avatar: '🤖', bio: 'OKAI課程網 的講師團隊，專注把 AI 工具教到你能在工作與生活中實際用上。', achievements: [] }
];

window.PLATFORM_STATS = null;

window.FAQ_FULL = [
  { cat:'購買相關', items:[
    ['購買後可以觀看多久？','一次購買即可無限期觀看，課程日後更新的內容也會開放給已購買的學員。'],
    ['付款方式有哪些？','支援信用卡、ATM 轉帳與超商代碼繳費，並可開立電子發票。'],
    ['不滿意可以退費嗎？','購買後 7 天內且觀看進度低於 20%，可聯絡客服申請退費。'],
    ['購買後如何取得發票？','付款完成後系統會開立電子發票寄到你的 Email，如需統編可於結帳時填寫。']
  ]},
  { cat:'課程相關', items:[
    ['完全沒有 AI 基礎可以學嗎？','可以。大部分課程從工具註冊與基本操作開始教；需要程式基礎的課程會在課程頁標示。'],
    ['AI 工具需要另外付費嗎？','課程會優先用免費方案示範；部分進階功能需要工具的付費方案，課程中會清楚說明。'],
    ['AI 工具更新很快，課程會過時嗎？','我們會依工具更新調整課程內容，已購買的學員可以看到更新後的版本。'],
    ['可以用手機或平板上課嗎？','可以，支援電腦、手機、平板，並可調整播放速度與開啟字幕。'],
    ['課程影片可以下載嗎？','為保護講師的著作權，目前不提供影片下載，但可以隨時線上觀看。']
  ]},
  { cat:'帳號相關', items:[
    ['如何註冊帳號？','點右上角「免費註冊」，用 Email 即可註冊。'],
    ['忘記密碼怎麼辦？','在登入頁點「忘記密碼」，輸入註冊信箱即可收到重設連結。'],
    ['如何刪除帳號？','請來信 hi@okaiclass.com 申請，我們會盡快處理。刪除後已購買的課程將無法恢復。']
  ]},
  { cat:'企業方案', items:[
    ['有企業 AI 內訓嗎？','有，我們提供企業 AI 內訓、包班與客製化課程，歡迎來信 hi@okaiclass.com 洽詢。'],
    ['可以依公司需求客製課程嗎？','可以，課程顧問會依你的產業與職務需求規劃 AI 培訓內容。'],
    ['企業內訓可以申請政府補助嗎？','部分企業訓練可申請勞動部相關補助，實際資格請以主管機關公告為準，我們可以協助你準備資料。']
  ]},
  { cat:'證書相關', items:[
    ['完課後有證書嗎？','完成課程所有章節後，系統會發放電子完課證書，可下載或分享。']
  ]}
];

window.COUPONS = [];

window.BADGES = [
  { id: 'bg1', name: '初來乍到', icon: '🌱', desc: '完成帳號註冊', xp: 10, rarity: 'common' },
  { id: 'bg2', name: '第一堂課', icon: '🎓', desc: '完成第一個課程章節', xp: 20, rarity: 'common' },
  { id: 'bg3', name: '學習達人', icon: '📚', desc: '累計觀看 10 小時', xp: 50, rarity: 'common' },
  { id: 'bg4', name: '完課勇者', icon: '🏆', desc: '完成一門完整課程', xp: 100, rarity: 'rare' },
  { id: 'bg5', name: 'AI 收藏家', icon: '🧠', desc: '購買 5 門課程', xp: 300, rarity: 'epic' },
  { id: 'bg6', name: '連續簽到王', icon: '🔥', desc: '連續 30 天出席', xp: 200, rarity: 'epic' },
  { id: 'bg8', name: '筆記達人', icon: '📝', desc: '累計寫下 100 則筆記', xp: 100, rarity: 'rare' },
  { id: 'bg9', name: '測驗滿分', icon: '💯', desc: '任一測驗取得滿分', xp: 80, rarity: 'rare' },
  { id: 'bg10', name: '分享推手', icon: '🤝', desc: '邀請 3 位好友加入', xp: 120, rarity: 'rare' },
  { id: 'bg12', name: 'AI 全能王', icon: '👑', desc: '在 3 個以上類別完課', xp: 500, rarity: 'legendary' },
  { id: 'bg13', name: '連續七天', icon: '🗓️', desc: '連續學習 7 天不中斷', xp: 70, rarity: 'common' },
  { id: 'bg17', name: '傳奇學者', icon: '🌟', desc: '累計 10,000 XP', xp: 1000, rarity: 'legendary' }
];
window.XP_RULES = { watchLesson: 10, completeLesson: 25, postReview: 15, dailyStreak: 50 };
window.XP_LEVELS = [
  { lv: 1, name: 'AI 新手', min: 0 },
  { lv: 2, name: 'AI 初學者', min: 100 },
  { lv: 3, name: 'AI 使用者', min: 300 },
  { lv: 5, name: 'AI 達人', min: 800 },
  { lv: 8, name: 'AI 高手', min: 2000 },
  { lv: 10, name: 'AI 大師', min: 5000 }
];

window.LEADERBOARD = [];

window.QUIZZES = [
  { id: 'q1', course: 'c03', title: 'AI 應用開發基礎測驗', questions: [
    { q: 'RAG 的全稱是什麼？', opts: ['Retrieval-Augmented Generation', 'Random Access Generator', 'Real-time AI Gateway', 'Recursive Algorithm Graph'], ans: 0 },
    { q: 'Prompt 中的 Few-shot 指的是？', opts: ['提供少量範例引導模型', '用少量資料重新訓練模型', '縮短模型輸出', '限制 API 呼叫次數'], ans: 0 },
    { q: 'Function Calling 的主要用途是？', opts: ['讓模型呼叫外部工具或 API', '加快模型速度', '壓縮模型大小', '翻譯程式碼'], ans: 0 },
    { q: '向量資料庫主要儲存什麼？', opts: ['文字的向量嵌入', 'Excel 表格', '影片檔', '帳號密碼'], ans: 0 }
  ]},
  { id: 'q2', course: 'c47', title: 'AI 繪圖基礎測驗', questions: [
    { q: 'Midjourney 中 --ar 參數控制的是？', opts: ['圖片長寬比', '出圖數量', '風格強度', '解析度'], ans: 0 },
    { q: 'ControlNet 的主要用途是？', opts: ['精準控制構圖與姿勢', '加快出圖速度', '自動上色', '翻譯 Prompt'], ans: 0 },
    { q: 'LoRA 通常用來做什麼？', opts: ['讓模型學會特定角色或風格', '刪除圖片背景', '放大解析度', '壓縮檔案'], ans: 0 },
    { q: '負面提示（Negative Prompt）是用來？', opts: ['排除不想出現的元素', '讓圖片變暗', '增加出圖數量', '加浮水印'], ans: 0 }
  ]},
  { id: 'q3', course: 'c11', title: 'AI 自媒體基礎測驗', questions: [
    { q: '用 AI 寫文案時，最能提升品質的做法是？', opts: ['清楚提供受眾、語氣與範例', '只輸入一個關鍵字', '每次都重新開對話', '只用英文提問'], ans: 0 },
    { q: 'AI 產出的內容發布前應該？', opts: ['人工檢查事實與語氣', '直接發布', '全部改成英文', '刪除所有標點'], ans: 0 },
    { q: 'SEO 文章最重要的是？', opts: ['回答讀者真正想問的問題', '重複堆疊關鍵字', '字數越少越好', '不放標題'], ans: 0 }
  ]}
];

window.LIVE_EVENTS = [];
window.COMMUNITY_POSTS = [];

window.CHAPTERS = {
  c03: [
    { ch: 1, title: '課程導覽與環境建置', lessons: ['課程大綱與學習路線', '開發環境安裝（Python + VS Code）', 'API Key 申請與設定', '第一次呼叫 AI API'], duration: 85 },
    { ch: 2, title: 'Prompt 設計', lessons: ['Prompt 設計原則', 'Zero-shot 與 Few-shot', 'System Prompt 與角色設定', '讓 AI 一步步思考', '實作：智慧客服 Prompt'], duration: 120 },
    { ch: 3, title: 'Function Calling 與工具整合', lessons: ['Function Calling 原理', '定義工具格式', '串接外部 API', '多工具串接實作', '錯誤處理'], duration: 110 },
    { ch: 4, title: 'RAG 知識庫實作', lessons: ['向量嵌入概念', '向量資料庫選擇與設定', '文件切割與索引', '檢索與排序策略', '實作：企業知識庫問答'], duration: 150 },
    { ch: 5, title: '部署與上線', lessons: ['服務架構設計', 'FastAPI 後端開發', 'Docker 容器化', '雲端部署', '期末專案：完整 AI 助理'], duration: 140 }
  ],
  c47: [
    { ch: 1, title: 'AI 繪圖概論', lessons: ['生成式 AI 原理簡介', 'Midjourney 帳號與設定', 'Stable Diffusion 安裝', '第一張 AI 圖片', '版權與商用注意事項'], duration: 70 },
    { ch: 2, title: 'Prompt 技巧大全', lessons: ['Prompt 結構拆解', '風格關鍵字庫', '負面提示策略', '參數調校（--ar、--s、--c）', '實作：10 種風格快速切換'], duration: 100 },
    { ch: 3, title: 'ControlNet 精準控制', lessons: ['邊緣偵測控制', '人體姿勢控制', '深度圖控制', '高清放大', '實作：照片轉插畫'], duration: 110 },
    { ch: 4, title: 'LoRA 模型訓練', lessons: ['訓練資料準備', '訓練環境設定', '參數調整與監控', '測試與合併', '實作：訓練專屬角色'], duration: 130 },
    { ch: 5, title: '商用工作流', lessons: ['品牌素材批量生成', '電商商品圖', '社群貼文模板', '接案報價與溝通', '作品集建立'], duration: 80 }
  ],
  c05: [
    { ch: 1, title: '用 AI 發想角色', lessons: ['角色設定與個性', '風格參考與情緒版', '用 ChatGPT 寫角色設定', '第一版角色生成'], duration: 60 },
    { ch: 2, title: '角色一致性', lessons: ['固定角色特徵的 Prompt', '參考圖與角色參考功能', 'LoRA 入門', '三視圖製作'], duration: 80 },
    { ch: 3, title: '表情與動作', lessons: ['表情組設計', '動作與姿勢控制', '服裝與配件變化', '統一畫風'], duration: 75 },
    { ch: 4, title: 'LINE 貼圖製作', lessons: ['貼圖規格與尺寸', '去背與描邊', '文字設計', '送審與上架流程'], duration: 70 },
    { ch: 5, title: '角色經營與變現', lessons: ['角色社群經營', '周邊商品', '版權與授權注意事項', '期末：完成一套貼圖'], duration: 55 }
  ],
  c01: [
    { ch: 1, title: '用 AI 做品牌定位', lessons: ['品牌是什麼', '用 ChatGPT 分析目標客群', '競品分析', '品牌個性與語氣'], duration: 60 },
    { ch: 2, title: 'AI Logo 發想', lessons: ['Logo 類型介紹', 'Logo 的 Prompt 寫法', '多方案快速發想', '向量化與修整'], duration: 85 },
    { ch: 3, title: '配色與字體', lessons: ['AI 產生配色方案', '品牌字體選擇', '中英文字體搭配', '用 AI 檢查可讀性'], duration: 70 },
    { ch: 4, title: '品牌視覺延伸', lessons: ['名片與文宣', '社群視覺模板', '包裝與周邊', '品牌照片風格'], duration: 80 },
    { ch: 5, title: '品牌規範手冊', lessons: ['規範手冊架構', '用 AI 整理規範文件', '交付給客戶', '期末：完整品牌提案'], duration: 55 }
  ],
  c02: [
    { ch: 1, title: '用 AI 規劃網站', lessons: ['網站目標與架構', '用 AI 寫網站文案', '競品網站分析', '線框圖發想'], duration: 75 },
    { ch: 2, title: 'Figma 與 AI 設計', lessons: ['Figma 基礎', 'AI 產生介面草稿', '元件與 Auto Layout', '設計系統'], duration: 110 },
    { ch: 3, title: 'Vibe Coding 入門', lessons: ['什麼是 Vibe Coding', '用 Claude 產生網頁', '用 Cursor 修改程式', '常見錯誤與除錯'], duration: 120 },
    { ch: 4, title: '從設計到上線', lessons: ['設計稿轉程式碼', '手機版適配', '表單與互動', '網站上線與網域設定'], duration: 110 },
    { ch: 5, title: 'SEO 與維護', lessons: ['基本 SEO 設定', '網站速度優化', '用 AI 持續更新內容', '期末：上線你的網站'], duration: 80 }
  ],
  c06: [
    { ch: 1, title: 'AI 影片工具總覽', lessons: ['文字生成影片原理', 'Sora、Kling、Runway 比較', '帳號與方案選擇', '第一支 AI 影片'], duration: 70 },
    { ch: 2, title: '分鏡與 Prompt', lessons: ['用 AI 寫分鏡腳本', '鏡頭語言 Prompt', '角色與場景一致性', '圖片轉影片'], duration: 100 },
    { ch: 3, title: '聲音與配音', lessons: ['AI 配音工具', 'AI 背景音樂', '字幕自動生成', '口型同步'], duration: 80 },
    { ch: 4, title: '剪輯與後製', lessons: ['CapCut 剪輯流程', '轉場與節奏', '直式與橫式輸出', '品質檢查'], duration: 90 },
    { ch: 5, title: '商業應用', lessons: ['產品廣告短片', '社群短影音', '版權與平台規範', '期末：完整廣告短片'], duration: 75 }
  ],
  c04: [
    { ch: 1, title: 'AI 音樂工具入門', lessons: ['AI 作曲原理簡介', 'Suno 帳號與方案', '第一首 AI 歌曲', '版權與商用規範'], duration: 55 },
    { ch: 2, title: '歌詞與曲風', lessons: ['用 AI 寫歌詞', '曲風關鍵字', '歌曲結構標記', '中文歌詞技巧'], duration: 70 },
    { ch: 3, title: '修改與延伸', lessons: ['延長與續寫', '換段落與重生成', '純音樂與配樂', '音質處理'], duration: 65 },
    { ch: 4, title: '配音與混音', lessons: ['AI 配音', '人聲與伴奏分離', '基礎混音', '輸出格式'], duration: 60 },
    { ch: 5, title: '應用與發布', lessons: ['影片配樂', '廣告與品牌音樂', '上架串流平台注意事項', '期末：完成一首完整歌曲'], duration: 50 }
  ],
  c08: [
    { ch: 1, title: 'AI 修圖工具總覽', lessons: ['Lightroom AI 功能', 'Photoshop 生成式填色', '其他 AI 修圖工具', '工作流程規劃'], duration: 60 },
    { ch: 2, title: 'AI 調色與降噪', lessons: ['AI 遮色片', 'AI 降噪', '一鍵調色與預設檔', '批次處理'], duration: 75 },
    { ch: 3, title: '生成式填色與擴展', lessons: ['移除雜物', '擴展畫面', '替換天空與背景', '自然合成技巧'], duration: 80 },
    { ch: 4, title: '商品圖與人像', lessons: ['商品去背換景', '電商主圖', '人像修飾原則', '避免過度修圖'], duration: 75 },
    { ch: 5, title: '接案與交付', lessons: ['修圖報價', '交付規格', 'AI 修圖的揭露與規範', '期末：完整修圖作品'], duration: 50 }
  ],
  c11: [
    { ch: 1, title: '用 AI 找定位', lessons: ['個人品牌是什麼', '用 AI 分析受眾', '找出你的差異化', '品牌人設'], duration: 60 },
    { ch: 2, title: '內容規劃', lessons: ['主題與內容日曆', '用 AI 發想選題', '文章、短影音與 Podcast', '內容再利用'], duration: 70 },
    { ch: 3, title: 'AI 文案與腳本', lessons: ['ChatGPT 與 Claude 寫文案', '短影音腳本', '標題與開頭', '保持你的語氣'], duration: 80 },
    { ch: 4, title: 'AI SEO 與搜尋', lessons: ['關鍵字研究', '用 AI 寫 SEO 文章', 'AI 搜尋時代的內容', '數據追蹤'], duration: 70 },
    { ch: 5, title: '經營與變現', lessons: ['社群互動', '接案與顧問', '數位商品與課程', '期末：30 天內容計畫'], duration: 55 }
  ],
  c09: [
    { ch: 1, title: '店家的 AI 入門', lessons: ['餐飲業能用 AI 做什麼', 'ChatGPT 基本操作', '建立店家資料', '第一份 AI 菜單文案'], duration: 50 },
    { ch: 2, title: '菜單與餐點照片', lessons: ['菜單文案與命名', '用手機拍餐點', 'AI 修圖與去背', '菜單排版'], duration: 55 },
    { ch: 3, title: '社群與地圖經營', lessons: ['社群貼文規劃', 'AI 寫貼文與短影音腳本', 'Google 地圖資訊優化', '回覆評論的技巧'], duration: 60 },
    { ch: 4, title: '客服自動化', lessons: ['LINE 官方帳號設定', '自動回覆訂位與常見問題', 'AI 客服的限制', '轉接真人時機'], duration: 55 },
    { ch: 5, title: '經營分析', lessons: ['用 AI 整理營業數據', '活動企劃', '成本與定價試算', '期末：一個月行銷計畫'], duration: 45 }
  ],
  c38: [
    { ch: 1, title: 'AI 寫程式入門', lessons: ['AI 寫程式工具介紹', '安裝 Cursor', '用 Claude 解釋程式', '第一個小遊戲'], duration: 70 },
    { ch: 2, title: '遊戲核心', lessons: ['角色移動與跳躍', '碰撞與物理', '計分與生命值', '請 AI 修 bug'], duration: 95 },
    { ch: 3, title: 'AI 遊戲素材', lessons: ['AI 生成角色', 'AI 生成場景', '像素風格', '音效與音樂'], duration: 90 },
    { ch: 4, title: '關卡與敵人', lessons: ['關卡設計', '敵人行為', 'Boss 戰', '遊戲手感調整'], duration: 100 },
    { ch: 5, title: '完成與分享', lessons: ['選單與存檔', '打包成網頁遊戲', '分享給朋友試玩', '期末：完成你的遊戲'], duration: 70 }
  ],
  c41: [
    { ch: 1, title: '用 AI 做理財研究', lessons: ['AI 能幫你做什麼、不能做什麼', '可靠資料來源', '避免 AI 幻覺', '理財研究的基本流程'], duration: 50 },
    { ch: 2, title: '用 AI 讀財報', lessons: ['財報三表概念', '讓 AI 摘要財報', '關鍵數字比較', '查證 AI 的答案'], duration: 65 },
    { ch: 3, title: '整理資訊', lessons: ['新聞與法說會重點整理', '建立觀察清單', '產業資料蒐集', '研究筆記'], duration: 55 },
    { ch: 4, title: '個人財務工具', lessons: ['用 AI 建記帳表', '預算規劃', '試算表公式自動化', '目標試算'], duration: 55 },
    { ch: 5, title: '風險與紀律', lessons: ['AI 不是投資建議', '常見詐騙辨識', '分散與風險概念', '期末：個人研究流程'], duration: 45 }
  ],
  c31: [
    { ch: 1, title: '把 AI 變成生活助理', lessons: ['生活中能用 AI 做什麼', '寫出好用的生活 Prompt', '隱私注意事項', '第一個生活計畫'], duration: 45 },
    { ch: 2, title: 'AI 運動規劃', lessons: ['依目標排運動計畫', '居家運動課表', '進度記錄', '何時該找專業教練'], duration: 55 },
    { ch: 3, title: 'AI 飲食規劃', lessons: ['飲食記錄', '採買清單與備餐', '外食選擇', 'AI 建議的限制'], duration: 50 },
    { ch: 4, title: 'AI 時間管理', lessons: ['行程規劃', '待辦清單與優先順序', '學習計畫', '習慣養成'], duration: 50 },
    { ch: 5, title: '打造你的 AI 生活系統', lessons: ['整合工具', '每週回顧', '常見問題', '期末：一週生活計畫'], duration: 40 }
  ]
};

window.BUNDLES = [
  { id: 'bd1', name: 'AI 開發者組合', desc: 'AI 應用開發 + AI 網頁設計 + AI 遊戲開發，學會用 AI 做出產品', courses: ['c03', 'c02', 'c38'], price: 13500, original: 15240, save: 1740, tag: '組合優惠' },
  { id: 'bd2', name: 'AI 創作者組合', desc: 'AI 繪圖 + AI 角色設計 + AI 影片生成，一個人就是創作團隊', courses: ['c47', 'c05', 'c06'], price: 10800, original: 12140, save: 1340, tag: '組合優惠' },
  { id: 'bd3', name: 'AI 行銷組合', desc: 'AI 自媒體 + AI 品牌設計 + AI 修圖，行銷工作一次升級', courses: ['c11', 'c01', 'c08'], price: 9600, original: 10740, save: 1140, tag: '組合優惠' }
];

window.TRENDING_SEARCHES = ['ChatGPT', 'AI 繪圖', 'AI Agent', 'Midjourney', 'AI 影片', 'Vibe Coding', 'Claude', 'AI 自動化', 'LINE 貼圖', 'AI 修圖', 'Suno', 'AI 寫程式'];

window.SUCCESS_STORIES = [];

window.UPCOMING_COURSES = [];

window.ARTICLE_BODIES = {
  p1: [
    { type: 'p', text: 'AI 已經走進大部分人的工作。與其擔心被取代，不如先挑一兩項最常用到的 AI 技能學起來。以下五項，是我們認為投資報酬率最高的方向。' },
    { type: 'h2', text: '1. 提示詞（Prompt）設計' },
    { type: 'p', text: '把需求講清楚，是用好所有 AI 工具的基礎。學會交代背景、目標、格式與範例，同一個工具能做出完全不同品質的結果。' },
    { type: 'h2', text: '2. AI 自動化與 AI Agent' },
    { type: 'p', text: '用 n8n、Make 或 AI Agent 把重複的工作串起來，例如自動整理表單、寄送通知、彙整報表，省下的是每天固定的時間。' },
    { type: 'h2', text: '3. AI 繪圖與設計' },
    { type: 'p', text: '社群圖、簡報插圖、商品情境圖，都能用 AI 快速產出初稿，再由人調整成品。' },
    { type: 'h2', text: '4. AI 影片與短影音' },
    { type: 'p', text: '從腳本、配音、字幕到影片生成，AI 讓一個人也能穩定產出短影音。' },
    { type: 'h2', text: '5. 用 AI 寫程式（Vibe Coding）' },
    { type: 'p', text: '不熟程式的人也能用 AI 做出小工具和網站；會寫程式的人則能把速度提高好幾倍。' },
    { type: 'p', text: '建議從提示詞開始，再依自己的工作挑一個方向深入。學 AI 最有效的方法，是馬上用在手邊的真實工作上。' }
  ],
  p3: [
    { type: 'p', text: '很多人想學 AI，卻不知道從哪裡開始。其實不需要先懂技術，先決定「你想用 AI 做什麼」就好。' },
    { type: 'h2', text: '路線一：提升工作效率' },
    { type: 'p', text: '從 ChatGPT、Claude、Gemini 的基本用法開始，練習寫信、整理會議記錄、做簡報與 Excel，最快感受到 AI 的價值。' },
    { type: 'h2', text: '路線二：內容與創作' },
    { type: 'p', text: '想做社群、設計或影片，可以從 AI 繪圖、AI 文案與 AI 影片工具開始，先做出第一個作品。' },
    { type: 'h2', text: '路線三：做出產品' },
    { type: 'p', text: '想開發 AI 工具或網站，再往 API 串接、RAG 知識庫與 AI Agent 前進。這條路需要一點程式基礎，但 AI 寫程式工具讓門檻低了很多。' },
    { type: 'p', text: '不管選哪一條，記得「邊學邊用」：每學一個技巧，就馬上用在自己的工作或生活上。' }
  ],
  p4: [
    { type: 'p', text: 'AI 影片生成工具更新很快，選工具前先想清楚你要做的是廣告、社群短影音還是創作。' },
    { type: 'h2', text: '先看用途' },
    { type: 'p', text: '需要擬真畫面與較長鏡頭的，適合畫質導向的工具；需要大量產出社群短片的，重視速度與成本；需要精準控制鏡頭與動作的，則看工具的編輯與控制功能。' },
    { type: 'h2', text: '再看成本與規範' },
    { type: 'p', text: '多數工具採點數或訂閱制，商用前請確認各平台的使用條款與授權範圍。' },
    { type: 'p', text: '建議先用免費額度把同一個分鏡丟給不同工具比較，再決定主要使用哪一個。' }
  ],
  p5: [
    { type: 'p', text: 'Vibe Coding 指的是用自然語言描述需求，讓 AI 幫你寫程式，再一起修改到能用為止。' },
    { type: 'h2', text: '適合做什麼？' },
    { type: 'p', text: '形象網站、活動頁、內部小工具、自動化腳本，都很適合用這種方式快速做出第一版。' },
    { type: 'h2', text: '要注意什麼？' },
    { type: 'p', text: '要清楚描述需求、一次改一件事、每次修改後都實際測試。牽涉帳號、金流與個資的功能，一定要請懂資安的人檢查。' },
    { type: 'p', text: '把 AI 當成很快但需要你把關的工程師，就能用最少的時間做出能用的成果。' }
  ],
  p16: [
    { type: 'p', text: 'AI 繪圖工具越來越強，但設計工作從來不只是「畫出來」。' },
    { type: 'h2', text: 'AI 擅長與不擅長的事' },
    { type: 'p', text: 'AI 擅長快速產生大量方案與素材；但品牌策略、客戶溝通、判斷什麼才是對的設計，仍然需要人。' },
    { type: 'h2', text: '設計師的轉型方向' },
    { type: 'p', text: '把 AI 用在發想與草圖階段，把時間留給判斷、修整與溝通；同時熟悉版權與商用規範，讓客戶放心。' },
    { type: 'p', text: '比起被 AI 取代，更需要注意的是被「會用 AI 的同行」取代。' }
  ],
  p20: [
    { type: 'p', text: 'Midjourney 出圖品質好不好，很大一部分取決於 Prompt。以下是新手最快見效的幾個技巧。' },
    { type: 'h2', text: '描述風格與光線' },
    { type: 'p', text: '除了主體，再加上風格（水彩、扁平插畫、電影感）、光線（柔光、逆光）與色調，畫面會穩定很多。' },
    { type: 'h2', text: '用攝影語言控制構圖' },
    { type: 'p', text: '特寫、俯視、仰角、廣角等鏡頭用語，AI 都看得懂，可以直接控制畫面構圖。' },
    { type: 'h2', text: '善用參數與負面提示' },
    { type: 'p', text: '用 --ar 控制比例、--no 排除不要的元素，再用風格參數微調，就能減少重抽次數。' }
  ],
  p9: [
    { type: 'p', text: '小店人手有限，AI 最大的價值是幫老闆省下寫文案、做圖與回訊息的時間。' },
    { type: 'h2', text: '1. 菜單與商品文案' },
    { type: 'p', text: '把食材、口味和特色告訴 AI，請它寫出不同風格的菜名與介紹，再挑最適合店家形象的版本。' },
    { type: 'h2', text: '2. 社群貼文與短影音腳本' },
    { type: 'p', text: '用 AI 排出一個月的貼文主題，再請它寫文案與短影音腳本，經營社群就不再臨時抱佛腳。' },
    { type: 'h2', text: '3. 回覆評論與訊息' },
    { type: 'p', text: '用 AI 草擬評論回覆與 LINE 常見問題回覆，老闆只要確認語氣與內容再送出。' },
    { type: 'p', text: '先從一件最花時間的事開始用 AI，習慣之後再擴大到其他工作。' }
  ],
  p18: [
    { type: 'p', text: 'AI 可以幫你更快讀懂財報與整理資訊，但它不是投資顧問，答案也可能出錯。' },
    { type: 'h2', text: '步驟一：準備可靠的資料' },
    { type: 'p', text: '使用公司公告的財報與官方資料，再交給 AI 摘要，比直接問 AI 可靠得多。' },
    { type: 'h2', text: '步驟二：請 AI 摘要與比較' },
    { type: 'p', text: '請 AI 列出營收、毛利率等關鍵數字與變化，並說明數字出自財報的哪裡，方便你回頭查證。' },
    { type: 'h2', text: '步驟三：自己判斷' },
    { type: 'p', text: 'AI 幫你省下整理的時間，判斷與決策仍然要自己來。任何投資都有風險，請量力而為。' }
  ]
};

window.NOTIFICATIONS = [
  { id: 'n1', type: 'system', title: '歡迎來到 OKAI課程網', body: '開始探索 AI 課程，找到最適合你的學習路線', time: '剛剛', read: false, link: '/category.html' }
];

window.INSTRUCTOR_BIOS = {
  [T]: { detail: 'OKAI課程網 講師團隊專注 AI 實務教學，課程以實際操作為主，目標是讓學員學完就能用在工作與生活上。', works: [], social: {} }
};

window.TESTIMONIALS = [];

window.EDITORS_PICKS = [
  { id: 'c03', quote: '從 Prompt 到 RAG 與部署，完整走過 AI 應用開發的核心技能。' },
  { id: 'c47', quote: '兩大 AI 繪圖工具一次學會，做出可商用的作品。' },
  { id: 'c06', quote: '用 AI 做出廣告短片與社群短影音，不需要攝影棚。' }
];

window.ANNOUNCEMENTS = [
  { id: 'a1', text: 'OKAI課程網 全新上線：專注 AI 的實戰課程平台', link: '/category.html', type: 'new' },
  { id: 'a2', text: '企業 AI 內訓開放洽詢', link: '/enterprise.html', type: 'event' }
];

window.GALLERY = [];
window.FREE_COURSES = [];

window.COURSE_HIGHLIGHTS = {
  c03: ['掌握 Prompt 設計原則', '學會 Function Calling 與工具串接', '做出 RAG 企業知識庫', '把 AI 助理部署上線'],
  c47: ['熟悉 Midjourney 與 Stable Diffusion', '用 ControlNet 精準控制構圖', '訓練專屬 LoRA', '建立商用出圖流程'],
  c05: ['用 AI 設計原創角色', '維持角色一致性', '完成表情組與三視圖', '上架一套 LINE 貼圖'],
  c01: ['用 AI 做品牌定位', '快速發想 Logo 方案', '建立配色與字體規範', '完成品牌視覺提案'],
  c02: ['用 AI 規劃網站與文案', '在 Figma 完成介面設計', '用 Vibe Coding 做出網頁', '把網站上線'],
  c06: ['熟悉主流 AI 影片工具', '用 AI 寫分鏡與 Prompt', '完成配音、字幕與剪輯', '做出廣告級短片'],
  c04: ['用 AI 寫歌詞與作曲', '控制曲風與歌曲結構', '完成配音與混音', '了解商用與版權規範'],
  c08: ['熟悉 AI 修圖功能', '用生成式填色修改畫面', '製作電商商品圖', '建立高效修圖流程'],
  c11: ['用 AI 找到個人品牌定位', '規劃內容日曆', '用 AI 寫文案與腳本', '寫出 SEO 友善文章'],
  c09: ['用 AI 寫菜單與貼文', '拍出好看的餐點照片', '經營社群與地圖評論', '設定 LINE 自動回覆'],
  c38: ['用 AI 工具寫遊戲程式', '用 AI 生成遊戲素材', '設計關卡與敵人', '完成一款可以玩的遊戲'],
  c41: ['用 AI 讀懂財報重點', '整理新聞與研究筆記', '建立記帳與預算表', '學會查證 AI 的答案'],
  c31: ['用 AI 規劃運動計畫', '用 AI 記錄與規劃飲食', '用 AI 管理時間與行程', '建立自己的 AI 生活系統']
};

window.WHY_AICLASS = [
  { icon: '🤖', title: '只教 AI', desc: '專注 AI 工具與應用，不分心，課程內容緊跟工具更新。' },
  { icon: '🛠️', title: '學完就能用', desc: '每堂課都有實作，學的是能馬上用在工作與生活上的方法。' },
  { icon: '🌱', title: '零基礎友善', desc: '大部分課程從註冊與基本操作開始，不需要技術背景。' },
  { icon: '🔄', title: '課程持續更新', desc: 'AI 工具變化很快，課程會依工具更新調整內容。' },
  { icon: '💬', title: '有問題可以問', desc: '每堂課都有討論區，講師與助教會回覆你的學習問題。' },
  { icon: '🛡️', title: '7 天退費保證', desc: '購買 7 天內、觀看進度低於 20% 可申請退費。' }
];

window.PREREQS = { c03: [], c02: [], c38: [] };

window.COURSE_FAQS = {
  c03: [['需要會寫程式嗎？', '需要基本的 Python 概念。課程會從 API 串接教起，但不會從零教 Python 語法。'], ['課程會隨 AI 技術更新嗎？', '會依主要模型與工具的變化調整內容，已購買學員可看到更新。']],
  c47: [['需要會畫圖嗎？', '不需要，重點是學會 Prompt 與參數控制。'], ['AI 生成的圖可以商用嗎？', '要看各平台的使用條款，課程有專門章節說明版權與商用注意事項。']],
  c05: [['需要繪畫基礎嗎？', '不需要，課程從角色設定與 AI 生成開始教。'], ['真的能上架 LINE 貼圖嗎？', '課程會教規格與送審流程，是否通過審核仍以 LINE 官方為準。']],
  c01: [['需要設計背景嗎？', '不需要，課程從品牌定位開始教起。'], ['AI 做的 Logo 可以註冊商標嗎？', '能否註冊需依各國法規與審查結果，建議重要品牌諮詢專業人士。']],
  c02: [['完全不會寫程式可以學嗎？', '可以，課程用 AI 工具帶你做出網頁，遇到問題也會教你怎麼請 AI 修正。'], ['需要什麼工具？', '電腦一台，Figma 免費版與 AI 工具的免費方案即可開始。']],
  c06: [['需要剪輯經驗嗎？', '不需要，課程會教基本剪輯流程。'], ['AI 影片工具要付費嗎？', '多數工具有免費額度，大量產出或商用通常需要付費方案。']],
  c04: [['不會樂器可以學嗎？', '可以，課程不需要任何樂器或樂理基礎。'], ['AI 歌曲可以商用嗎？', '要看工具的方案與條款，課程會說明需要注意的地方。']],
  c08: [['需要什麼軟體？', '主要使用 Lightroom 與 Photoshop，也會介紹免費替代工具。'], ['手機照片也能修嗎？', '可以，課程有手機照片的修圖示範。']],
  c11: [['沒有粉絲可以開始嗎？', '可以，課程從零開始規劃定位與內容。'], ['AI 寫的內容會不會很制式？', '課程會教你如何保留自己的語氣，並人工檢查後再發布。']],
  c09: [['老闆自己就能學會嗎？', '可以，課程以實際操作為主，不需要技術背景。'], ['需要買什麼工具？', '手機與免費版 AI 工具就能開始，LINE 官方帳號也有免費方案。']],
  c38: [['要會寫程式嗎？', '不需要，課程用 AI 工具帶你寫程式，會基礎程式更好。'], ['做出來的遊戲可以分享嗎？', '可以，課程會教你打包成網頁遊戲分享給朋友。']],
  c41: [['課程會推薦股票嗎？', '不會。本課程只教用 AI 整理與研究資訊的方法，不提供任何投資建議。'], ['AI 的答案可以直接相信嗎？', '不行，課程會教你如何查證 AI 的答案與資料來源。']],
  c31: [['AI 可以取代教練或營養師嗎？', '不行，AI 只能協助規劃與記錄，有健康問題請諮詢專業人士。'], ['需要什麼工具？', '手機與免費版 AI 工具即可。']]
};
