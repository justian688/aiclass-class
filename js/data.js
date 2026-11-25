// OKAI課程網 課程資料（AI 專門課程平台）
// 價格、講師、日期等目前是預設值，正式上線前請換成真實資料
window.CATS = [
  { id: 'all', name: '全部課程' },
  { id: 'start', name: 'AI 入門與職場效率', desc: '從 ChatGPT、Claude、Gemini 開始，把 AI 用在每天的文件、簡報、會議與 Excel。', subs: ['ChatGPT 入門', 'Claude 入門', 'Gemini 入門', '提示詞工程', 'AI 簡報製作', 'AI 文件與報告', 'AI 會議與筆記', 'Copilot 辦公應用'] },
  { id: 'auto', name: 'AI 自動化與 Agent', desc: '用 n8n、Make 與 AI Agent，把重複的工作交給流程自動完成。', subs: ['n8n 自動化', 'Make／Zapier', 'AI Agent 打造', 'GPTs 與自訂助理', 'LINE 聊天機器人', '辦公流程自動化'] },
  { id: 'ai', name: 'AI 開發', desc: '寫程式串接大型語言模型，做出能上線的 AI 應用。', subs: ['AI 應用開發', 'Vibe Coding', 'Python × AI', 'RAG 知識庫', 'LLM API 串接', 'MCP 與工具串接', '模型微調', '機器學習基礎'] },
  { id: 'data', name: 'AI 資料分析', desc: '讓 AI 幫你整理資料、算數字、畫圖表，快速看懂數據。', subs: ['ChatGPT 資料分析', 'Excel × AI', 'Google 試算表 × AI', 'Power BI × AI', 'Python 資料分析', '數據視覺化'] },
  { id: 'drawing', name: 'AI 繪圖', desc: '用 AI 畫出插畫、角色、商品圖與可商用的作品。', subs: ['Midjourney', '角色設計', 'Stable Diffusion', 'ComfyUI', 'Gemini 圖像生成', 'LoRA 模型訓練', 'AI 插畫', 'AI 商品圖'] },
  { id: 'design', name: 'AI 設計', desc: '品牌、網頁、社群圖文到印刷品，用 AI 加快設計流程。', subs: ['品牌設計', '網頁設計', 'Figma AI', 'Canva AI', 'UI／UX 設計', '社群圖文設計', '包裝與印刷設計'] },
  { id: 'video', name: 'AI 影片', desc: '文字生成影片、AI 剪輯、數位人與配音，一個人也能做影片。', subs: ['影片生成', 'AI 剪輯', '短影音製作', 'AI 數位人', 'AI 配音與字幕', 'AI 動畫', '廣告影片'] },
  { id: 'creative', name: 'AI 音樂與攝影', desc: '用 AI 作曲、配樂、做聲音，也用 AI 修圖與後製。', subs: ['AI 作曲', 'AI 修圖', 'AI 配樂', 'AI 語音合成', '攝影後製', 'Podcast 製作'] },
  { id: 'career', name: 'AI 行銷與自媒體', desc: '文案、SEO、社群、廣告與電商，用 AI 經營品牌與流量。', subs: ['個人品牌', 'AI 文案寫作', 'SEO 與 AI 搜尋優化', '社群經營', '廣告投放', '電商行銷', 'YouTube 經營', '電子報行銷'] },
  { id: 'baking', name: 'AI 產業應用', desc: '各行各業的 AI 實戰：從店家、醫療到製造，找到你的應用場景。', subs: ['餐飲業', '零售與電商', '房地產', '醫療照護', '教育與教學', '法律與行政', '製造業', '美業', '旅宿觀光', '客服中心'] },
  { id: 'biz', name: 'AI 企業導入與職涯', desc: '企業怎麼導入 AI、主管怎麼帶 AI 團隊，以及用 AI 找工作。', subs: ['企業 AI 導入', 'AI 資安與治理', 'AI 專案管理', 'AI 人資應用', '主管 AI 領導力', 'AI 求職與履歷'] },
  { id: 'finance', name: 'AI 理財與副業', desc: '用 AI 讀財報、做研究，也用 AI 接案、開副業。', subs: ['AI 財報分析', 'AI 投資研究', 'AI 記帳理財', 'AI 接案', 'AI 副業變現', '電商開店'] },
  { id: 'game', name: 'AI 遊戲開發', desc: '用 AI 寫程式、做美術、生成 3D 模型，做出自己的遊戲。', subs: ['AI 遊戲開發', '遊戲美術', 'Unity × AI', '遊戲劇情與 NPC', '3D 模型生成'] },
  { id: 'beauty', name: 'AI 生活應用', desc: '運動、飲食、旅遊、學習、親子，AI 也能幫你過生活。', subs: ['運動・飲食・時間管理', 'AI 學習與讀書', 'AI 語言學習', 'AI 旅遊規劃', 'AI 親子教養', '長輩 AI 入門'] }
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
  { id: 'c38', v: '42648', cat: 'game', sub: 'AI 遊戲開發', title: 'AI 遊戲開發：用 AI 寫程式做出 2D 遊戲', teacher: T, role: R, price: 4280, origin: 4280, rating: 0, students: 0, tag: 'NEW', hours: 16, desc: '不熟程式也能開始：用 Claude、Cursor 寫遊戲程式，用 AI 生成角色與場景素材，完成一款可以玩的 2D 遊戲。', ai: '用 AI 寫程式加 AI 素材，完成一款可以玩的 2D 遊戲' },
  { id: 'c41', v: '26676', cat: 'finance', sub: 'AI 財報分析', title: 'AI 理財研究：用 ChatGPT 讀財報與整理投資資訊', teacher: T, role: R, price: 2980, origin: 2980, rating: 0, students: 0, tag: '', hours: 8, desc: '用 AI 快速讀懂財報、整理新聞與法說會重點、建立記帳與預算表。本課程只教工具與方法，不提供投資建議。', ai: '用 AI 讀財報、整理資訊，理財研究更有效率' },
  { id: 'c31', v: '23056', cat: 'beauty', sub: '運動・飲食・時間管理', title: 'AI 生活應用：用 AI 規劃運動、飲食與時間', teacher: T, role: R, price: 1980, origin: 1980, rating: 0, students: 0, tag: '', hours: 6, desc: '用 AI 排出適合自己的運動計畫、記錄飲食、安排行程與學習計畫，把 AI 變成生活小助理。內容不取代醫療或專業建議。', ai: '把 AI 變成生活助理：運動、飲食與時間管理' }
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
  { id:'p35', title:'ChatGPT 提示詞入門：上班族馬上能用的 8 個寫法', excerpt:'同一個問題換個問法，AI 的回答品質差很多。整理 8 個實用的提示詞寫法，寫信、整理會議、做企劃都用得到。', cat:'ai', author:'OKAI 編輯部', date:'2026-11-25', readTime:7, v:'b35', tags:["提示詞", "ChatGPT", "工作效率"] },
  { id:'p36', title:'AI 繪圖入門：Midjourney 和 Stable Diffusion 差在哪？', excerpt:'兩大 AI 繪圖工具各有強項。從上手難度、控制能力到費用，幫你判斷該先學哪一個。', cat:'drawing', author:'OKAI 編輯部', date:'2026-11-25', readTime:7, v:'b36', tags:["AI繪圖", "Midjourney", "Stable Diffusion"] },
  { id:'p37', title:'用 AI 做 LINE 貼圖：從角色設計到上架的完整流程', excerpt:'想做自己的 LINE 貼圖？從角色發想、維持角色一致、做表情組到上架審核，一步步拆解。', cat:'drawing', author:'OKAI 編輯部', date:'2026-11-25', readTime:7, v:'b37', tags:["LINE貼圖", "AI角色設計", "副業"] },
  { id:'p38', title:'沒有程式基礎，可以用 AI 寫程式嗎？', excerpt:'AI 讓「用說的寫程式」變得可能，但不是完全不用學。說明新手能做到什麼、會卡在哪裡，以及怎麼開始。', cat:'design', author:'OKAI 編輯部', date:'2026-11-25', readTime:6, v:'b38', tags:["AI寫程式", "Vibe Coding", "新手"] },
  { id:'p39', title:'RAG 是什麼？用白話解釋企業 AI 知識庫', excerpt:'為什麼 AI 會亂回答公司內部的問題？RAG 怎麼讓 AI 先查資料再回答？用生活化的比喻一次講懂。', cat:'ai', author:'OKAI 編輯部', date:'2026-11-25', readTime:7, v:'b39', tags:["RAG", "AI知識庫", "企業AI"] },
  { id:'p40', title:'AI Agent 是什麼？跟一般聊天機器人差在哪？', excerpt:'AI Agent 不只會回答問題，還能自己規劃步驟、使用工具完成任務。看懂它能做什麼、目前的限制在哪。', cat:'ai', author:'OKAI 編輯部', date:'2026-11-25', readTime:6, v:'b40', tags:["AI Agent", "AI代理", "自動化"] },
  { id:'p41', title:'AI 音樂生成入門：用 Suno 做歌要注意什麼？', excerpt:'輸入一段描述就能生成完整歌曲。介紹 AI 作曲的基本做法、提升品質的技巧，以及商用前要確認的事。', cat:'creative', author:'OKAI 編輯部', date:'2026-11-25', readTime:6, v:'b41', tags:["AI音樂", "Suno", "AI作曲"] },
  { id:'p42', title:'電商賣家必學：用 AI 修圖做出好看的商品照', excerpt:'去背、換背景、補光、統一色調，AI 修圖能省下大量時間。整理電商常用的 AI 修圖流程與注意事項。', cat:'beauty', author:'OKAI 編輯部', date:'2026-11-25', readTime:6, v:'b42', tags:["AI修圖", "電商", "商品攝影"] },
  { id:'p43', title:'經營自媒體怎麼用 AI？從選題、腳本到剪輯字幕', excerpt:'一個人經營自媒體很累，AI 可以分擔哪些工作？依照內容製作流程，整理每個階段能用 AI 做的事。', cat:'career', author:'OKAI 編輯部', date:'2026-11-25', readTime:7, v:'b43', tags:["自媒體", "AI剪輯", "短影音"] },
  { id:'p44', title:'餐飲業怎麼用 AI？菜單、行銷到客服的 6 個應用', excerpt:'小店也能用 AI 提升效率。從菜單文案、社群貼文、評論回覆到備料估算，整理餐飲業最實用的 AI 用法。', cat:'baking', author:'OKAI 編輯部', date:'2026-11-25', readTime:6, v:'b44', tags:["餐飲業", "AI行銷", "小店經營"] },
  { id:'p45', title:'用 AI 做遊戲：新手可以從哪裡開始？', excerpt:'AI 可以幫忙寫程式、畫美術、做音效，讓個人開發遊戲的門檻大幅降低。整理新手做第一款小遊戲的路線。', cat:'game', author:'OKAI 編輯部', date:'2026-11-25', readTime:6, v:'b45', tags:["AI遊戲開發", "獨立遊戲", "新手"] },
  { id:'p46', title:'用 AI 研究投資理財：能做的事與不能做的事', excerpt:'AI 很適合整理財報、摘要新聞、比較資料，但不能替你做投資決定。說清楚 AI 在理財研究中的正確用法。', cat:'finance', author:'OKAI 編輯部', date:'2026-11-25', readTime:6, v:'b46', tags:["AI理財", "投資研究", "財報"] },
  { id:'p47', title:'AI 生成的圖片可以商用嗎？著作權與使用前的檢查清單', excerpt:'用 AI 做的圖、文字、音樂能不能拿來賺錢？整理使用前一定要確認的事，避免踩到侵權與授權問題。', cat:'ai', author:'OKAI 編輯部', date:'2026-11-25', readTime:7, v:'b47', tags:["AI著作權", "商用授權", "AI倫理"] },
  { id:'p48', title:'孩子用 AI 寫作業，該禁止還是引導？給家長的 5 個建議', excerpt:'AI 已經是孩子身邊的工具。與其全面禁止，不如教會孩子正確使用。給家長的實用溝通建議。', cat:'ai', author:'OKAI 編輯部', date:'2026-11-25', readTime:6, v:'b48', tags:["AI教育", "家長", "學習"] },
  { id:'p49', title:'企業導入 AI 教育訓練：從哪裡開始最有效？', excerpt:'員工會用 AI，不等於公司會用 AI。從盤點需求、挑選情境到建立內部規範，整理企業 AI 培訓的步驟。', cat:'ai', author:'OKAI 編輯部', date:'2026-11-25', readTime:7, v:'b49', tags:["企業培訓", "AI導入", "數位轉型"] },
  { id:'p30', title:'2026 AI 課程怎麼選？美國、中國、日本熱門平台大比較', excerpt:'同樣是學 AI，美國重證書、中國拼低價實戰、日本流行月費看到飽。整理三地熱門 AI 課程平台的差異，幫你找到最適合自己的學法。', cat:'ai', author:'OKAI 編輯部', date:'2026-11-25', readTime:9, v:'b30', tags:["AI課程", "線上課程", "比較"] },
  { id:'p31', title:'美國 AI 課程推薦：免費與付費怎麼挑？Coursera、DeepLearning.AI、CS50AI 一次看', excerpt:'美國的 AI 課程很多是免費的，付費的則主打證書與名校。依「想用 AI」或「想做 AI」兩種目標，整理該從哪裡開始。', cat:'ai', author:'OKAI 編輯部', date:'2026-11-25', readTime:8, v:'b31', tags:["AI課程推薦", "Coursera", "免費AI課程"] },
  { id:'p32', title:'中國 AI 大模型課程怎麼學？從免費資源到實戰課的整理', excerpt:'中國的 AI 學習資源走兩條路：大量免費開源教材，以及價格親民、主打專題實作的付費課。看懂差異，少走冤枉路。', cat:'ai', author:'OKAI 編輯部', date:'2026-11-25', readTime:7, v:'b32', tags:["AI大模型", "LLM", "AI課程"] },
  { id:'p33', title:'日本生成 AI 補習班為什麼流行「月費看到飽」？', excerpt:'日本熱門的生成 AI 學校，多數採用月費訂閱、課程看到飽，再加上導師與社群。這種模式適合誰？又要注意什麼？', cat:'ai', author:'OKAI 編輯部', date:'2026-11-25', readTime:7, v:'b33', tags:["生成AI", "AI補習班", "訂閱制"] },
  { id:'p34', title:'報名 AI 課程前必看：7 個檢查點，避免花錢又學不會', excerpt:'AI 課程越來越多，品質落差也很大。從試看、實作、更新日期到退費規則，教你用 7 個問題快速判斷一堂課值不值得買。', cat:'ai', author:'OKAI 編輯部', date:'2026-11-25', readTime:6, v:'b34', tags:["AI課程", "選課指南", "退費"] },
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
  { id: 'i1', name: T, role: R, courses: 13, students: 0, followers: 0, avatar: '<img src="assets/team/okai-team-sm.webp" alt="OKAI 講師團隊" width="96" height="96">', bio: 'OKAI課程網 的講師團隊，專注把 AI 工具教到你能在工作與生活中實際用上。', achievements: [] }
];

window.PLATFORM_STATS = null;

window.FAQ_FULL = [
  { cat:'購買相關', items:[
    ['購買後可以觀看多久？','一次購買即可無限期觀看，課程日後更新的內容也會開放給已購買的學員。'],
    ['付款方式有哪些？','目前採 Email 報名：送出報名後，2 個工作天內會寄付款資訊給你，付款確認後開通課程。'],
    ['課程是訂閱制嗎？會自動扣款嗎？','不是。所有課程都是單次購買，不會自動續扣。'],
    ['付款了但課程還沒開通？','付款確認後 2 個工作天內開通。超過時間請來信 hi@okaiclass.com 並附上訂單編號。'],
    ['付款失敗怎麼辦？','回覆付款信或來信 hi@okaiclass.com，我們會重新提供付款方式。'],
    ['不滿意可以退費嗎？','開通後 7 天內且觀看進度低於 20%，可在「訂單紀錄」按「申請退款」或來信申請，全額以原付款方式退回，約 7～14 個工作天。'],
    ['影片無法播放或字幕有問題？','在播放器下方按「回報影片或內容問題」，會自動帶入課程與單元資訊寄給我們。'],
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
  p35: [
    { type: 'p', text: '很多人覺得 AI 的回答很空泛，問題常常出在「問法」。只要把需求講清楚，同一個 AI 就能給出好用很多的答案。以下 8 個寫法，上班族隔天就能用。' },
    { type: 'h2', text: '1. 先給角色' },
    { type: 'p', text: '開頭先說「你是一位有 10 年經驗的行銷企劃」，AI 會用更貼近專業的角度回答。' },
    { type: 'h2', text: '2. 說清楚目的與對象' },
    { type: 'p', text: '「幫我寫一封信」太模糊；「幫我寫一封給老客戶的道歉信，語氣誠懇、不超過 200 字」就清楚多了。' },
    { type: 'h2', text: '3. 給範例' },
    { type: 'p', text: '把你喜歡的格式或過去寫過的內容貼給 AI，說「照這個風格寫」，結果會穩定很多。' },
    { type: 'h2', text: '4. 指定輸出格式' },
    { type: 'p', text: '要表格、條列、三個選項，直接寫出來。例如「用表格列出優缺點」。' },
    { type: 'h2', text: '5. 一步一步來' },
    { type: 'p', text: '複雜的任務先請 AI 列出步驟，確認方向沒問題後再請它逐步完成。' },
    { type: 'h2', text: '6. 請 AI 先問你問題' },
    { type: 'p', text: '加一句「不清楚的地方先問我」，可以減少 AI 自己亂猜。' },
    { type: 'h2', text: '7. 要求自我檢查' },
    { type: 'p', text: '請 AI「檢查有沒有遺漏或錯誤」，再交出最後版本。' },
    { type: 'h2', text: '8. 重要資訊一定要查證' },
    { type: 'p', text: '數字、法規、日期這類資訊，AI 可能說錯，使用前請自己確認來源。另外，公司機密與客戶個資不要直接貼進 AI 工具。' },
    { type: 'p', text: '想系統化學會提示詞與 AI 工作術，可以參考 <a href="course.html?id=c31">AI 生活應用課程</a>，每門課都能先免費試看。' },
  ],
  p36: [
    { type: 'p', text: '說到 AI 繪圖，最常被拿來比較的就是 Midjourney 和 Stable Diffusion。兩者都能產出高品質圖片，但定位很不一樣。' },
    { type: 'h2', text: 'Midjourney：上手快、畫面美' },
    { type: 'p', text: '輸入文字描述就能得到風格完整、構圖漂亮的圖片，不需要安裝軟體，適合想快速產出視覺素材的人。缺點是需要付費訂閱，細節控制相對有限。' },
    { type: 'h2', text: 'Stable Diffusion：可控性高、可以自己訓練' },
    { type: 'p', text: '開源模型，可以裝在自己的電腦上執行。搭配 ControlNet 能精準控制姿勢、構圖；也能訓練 LoRA，做出固定的角色或風格。代價是需要一點學習時間，電腦的顯示卡也要夠力。' },
    { type: 'h2', text: '該先學哪一個？' },
    { type: 'p', text: '想快速做出社群圖、提案視覺：先學 Midjourney。<br>需要固定角色、精準控制、批量產出：學 Stable Diffusion。<br>兩個都會的人，通常是用 Midjourney 發想、用 Stable Diffusion 精修。' },
    { type: 'h2', text: '商用前要注意' },
    { type: 'p', text: '各工具的授權條款不同，付費方案與免費方案的商用規定也可能不一樣。使用前請先確認工具的最新條款。' },
    { type: 'p', text: '想同時學會兩大工具，可以看看 <a href="course.html?id=c47">AI 繪圖實戰課</a>。' },
  ],
  p37: [
    { type: 'p', text: '做一套自己的 LINE 貼圖，是很多人學 AI 繪圖後的第一個作品。流程可以拆成 5 個步驟。' },
    { type: 'h2', text: '1. 角色發想' },
    { type: 'p', text: '先決定角色的個性、外型特徵和使用情境，例如「愛吃的上班族柴犬」。設定越清楚，後面越好維持一致。' },
    { type: 'h2', text: '2. 維持角色一致' },
    { type: 'p', text: 'AI 最容易出問題的地方，就是每張圖的角色長得不一樣。可以用參考圖、固定的描述詞，或訓練專屬模型來解決。' },
    { type: 'h2', text: '3. 規劃表情組' },
    { type: 'p', text: '列出常用的對話情境：早安、謝謝、加油、哭哭、收到……一套貼圖要準備的張數與尺寸，請以 LINE Creators Market 的最新規範為準。' },
    { type: 'h2', text: '4. 後製與去背' },
    { type: 'p', text: '把 AI 生成的圖去背、統一線條粗細與色調，必要時手動修正手指、文字等細節。' },
    { type: 'h2', text: '5. 送審上架' },
    { type: 'p', text: '準備好主圖、標籤圖與貼圖檔後送審。審核會檢查內容與規格，被退件時依照說明修改即可。注意不要使用別人的角色、商標或名人肖像。' },
    { type: 'p', text: '想跟著做出一整套可上架的貼圖，可以參考 <a href="course.html?id=c05">AI 角色設計與 LINE 貼圖課</a>。' },
  ],
  p38: [
    { type: 'p', text: '現在只要用中文描述需求，AI 就能寫出程式碼。那完全不會寫程式的人，真的能做出東西嗎？答案是：可以做出很多東西，但還是需要學一些基本觀念。' },
    { type: 'h2', text: '新手能做到的事' },
    { type: 'p', text: '個人網站、活動報名頁、小工具、自動化腳本，這類規模不大的專案，新手跟著 AI 一步步做，通常做得出來。' },
    { type: 'h2', text: '新手最常卡關的地方' },
    { type: 'p', text: '程式跑不起來時看不懂錯誤訊息、不知道檔案要放哪裡、上線部署的步驟、資料安全的設定。這些是 AI 幫得上忙，但你仍然要理解的部分。' },
    { type: 'h2', text: '建議的學習順序' },
    { type: 'p', text: '1. 先學會清楚描述需求：要做什麼、給誰用、有哪些功能。<br>2. 學看懂基本的網頁結構與錯誤訊息。<br>3. 做一個小專案並實際上線。<br>4. 再慢慢加入資料庫、會員登入等進階功能。' },
    { type: 'h2', text: '一定要注意的事' },
    { type: 'p', text: '不要把密碼、API Key 直接寫在公開的程式碼裡；處理會員資料或付款功能時，最好請有經驗的工程師幫忙檢查。' },
    { type: 'p', text: '想用 AI 做出自己的網站或 App，可以參考 <a href="course.html?id=c02">AI 網頁與 App 設計（Vibe Coding）課</a>。' },
  ],
  p39: [
    { type: 'p', text: '把公司的產品問題丟給 ChatGPT，它常常答得頭頭是道，卻是錯的。原因很簡單：它沒看過你公司的資料。RAG 就是為了解決這個問題。' },
    { type: 'h2', text: '用開書考來比喻' },
    { type: 'p', text: '一般的 AI 像閉卷考，只能靠記憶回答；RAG（檢索增強生成）則像開書考：AI 回答前，會先去你的文件裡找相關段落，再根據找到的內容回答。' },
    { type: 'h2', text: 'RAG 的三個步驟' },
    { type: 'p', text: '1. <b>整理資料</b>：把產品手冊、FAQ、規章切成小段落。<br>2. <b>建立索引</b>：把段落轉成 AI 看得懂的向量，存進資料庫。<br>3. <b>檢索與回答</b>：使用者提問時，先找出最相關的段落，再交給 AI 生成答案。' },
    { type: 'h2', text: '適合用在哪裡？' },
    { type: 'p', text: '客服問答、內部規章查詢、產品知識庫、教育訓練助理，都是常見的應用。' },
    { type: 'h2', text: '要注意的地方' },
    { type: 'p', text: '資料本身要正確、要定期更新；也要設定權限，避免機密資料被不該看的人查到。回答最好附上引用來源，方便使用者查證。' },
    { type: 'p', text: '想動手做出自己的 AI 知識庫助理，可以參考 <a href="course.html?id=c03">生成式 AI 應用開發課</a>。' },
  ],
  p40: [
    { type: 'p', text: '聊天機器人是「你問、它答」；AI Agent 則是「你交代任務，它自己想辦法完成」。這是 AI 應用最熱門的方向之一。' },
    { type: 'h2', text: 'AI Agent 的三個能力' },
    { type: 'p', text: '<b>規劃</b>：把大任務拆成小步驟。<br><b>使用工具</b>：搜尋網頁、查資料庫、寄信、操作軟體。<br><b>記憶</b>：記住前面做過什麼，接著往下做。' },
    { type: 'h2', text: '實際能做的例子' },
    { type: 'p', text: '整理一週的會議紀錄並寄出摘要、比較多家供應商的報價、定期檢查網站是否正常並回報。' },
    { type: 'h2', text: '目前的限制' },
    { type: 'p', text: '步驟越多越容易出錯；遇到需要判斷的事情，可能會做出不恰當的決定。涉及付款、寄信給客戶、刪除資料等重要操作，建議保留人工確認。' },
    { type: 'h2', text: '怎麼開始？' },
    { type: 'p', text: '先從單一、重複、容易檢查結果的任務開始，例如資料整理。確認穩定之後，再慢慢擴大範圍。' },
    { type: 'p', text: '想學會打造 AI Agent，可以參考 <a href="course.html?id=c03">生成式 AI 應用開發課</a>。' },
  ],
  p41: [
    { type: 'p', text: 'AI 音樂工具讓沒學過作曲的人，也能在幾分鐘內做出一首完整的歌。以 Suno 這類工具為例，整理入門重點。' },
    { type: 'h2', text: '基本做法' },
    { type: 'p', text: '輸入歌曲風格、情緒、樂器和主題，AI 就會生成編曲與人聲。也可以自己寫歌詞，讓 AI 譜曲演唱。' },
    { type: 'h2', text: '讓作品更好聽的技巧' },
    { type: 'p', text: '1. 風格描述要具體，例如「90 年代城市流行、慢板、鋼琴與弦樂」。<br>2. 歌詞分好主歌、副歌段落。<br>3. 同一段多生成幾次，挑最好的版本。<br>4. 把喜歡的段落延伸，或用音訊軟體剪接、調整音量。' },
    { type: 'h2', text: '商用前一定要確認' },
    { type: 'p', text: '不同方案的商用授權可能不同，免費方案常有限制。也不要在提示詞中指定模仿特定歌手或歌曲，避免侵權爭議。使用前請以工具的最新條款為準。' },
    { type: 'h2', text: '適合的用途' },
    { type: 'p', text: '影片配樂、店家背景音樂、活動主題曲、個人創作發想，都是常見的應用。' },
    { type: 'p', text: '想系統學會 AI 作曲，可以參考 <a href="course.html?id=c04">AI 音樂創作課</a>。' },
  ],
  p42: [
    { type: 'p', text: '商品照好不好看，直接影響點擊率。AI 修圖工具能把過去要花一整天的工作縮短到幾十分鐘。' },
    { type: 'h2', text: '電商最常用的 4 種 AI 修圖' },
    { type: 'p', text: '<b>一鍵去背</b>：做出白底主圖。<br><b>換背景</b>：把商品放進居家、戶外等情境。<br><b>補光與調色</b>：讓整組照片色調一致。<br><b>移除瑕疵</b>：去掉灰塵、反光、雜物。' },
    { type: 'h2', text: '建議的工作流程' },
    { type: 'p', text: '1. 拍攝時盡量光線均勻、背景單純。<br>2. 用 AI 去背並統一尺寸。<br>3. 生成情境圖，挑選最自然的版本。<br>4. 最後人工檢查細節：商品顏色、文字、比例有沒有跑掉。' },
    { type: 'h2', text: '一定要注意' },
    { type: 'p', text: '商品的顏色、尺寸、材質不能被 AI 改變，否則可能造成誤導與退貨糾紛。情境圖也要避免出現別人的商標或人物肖像。' },
    { type: 'p', text: '想學會完整的 AI 修圖流程，可以參考 <a href="course.html?id=c08">AI 修圖課</a>。' },
  ],
  p43: [
    { type: 'p', text: '經營自媒體要選題、寫腳本、拍攝、剪輯、上字幕、發文、回留言。AI 不能取代你的觀點，但能幫你省下大量重複工作。' },
    { type: 'h2', text: '選題' },
    { type: 'p', text: '把受眾、主題丟給 AI，請它列出 20 個題目，再從中挑出你真的有想法的。' },
    { type: 'h2', text: '腳本' },
    { type: 'p', text: '請 AI 依照「開頭 3 秒抓住注意力、中段給重點、結尾引導互動」的結構寫初稿，再改成你自己的說話方式。' },
    { type: 'h2', text: '剪輯與字幕' },
    { type: 'p', text: '自動上字幕、去除空白與口誤、自動裁切直式影片，都是目前很成熟的 AI 功能。' },
    { type: 'h2', text: '發佈與經營' },
    { type: 'p', text: '用 AI 生成不同平台的貼文版本、標籤建議；回覆留言時，可以讓 AI 先擬草稿，再由你確認。' },
    { type: 'h2', text: '保持你的風格' },
    { type: 'p', text: '觀眾追蹤的是你。AI 產出的內容一定要加入你自己的經驗與觀點，也要查證事實，避免散播錯誤資訊。' },
    { type: 'p', text: '想建立一套 AI 自媒體工作流程，可以參考 <a href="course.html?id=c11">AI 自媒體經營課</a>。' },
  ],
  p44: [
    { type: 'p', text: '餐飲業人力吃緊，AI 能幫忙處理不少文書與行銷工作。以下 6 個應用，小店也能馬上開始。' },
    { type: 'h2', text: '1. 菜單文案' },
    { type: 'p', text: '把食材與特色告訴 AI，請它寫出吸引人的品項描述，也能做中英日多語菜單（翻譯完請找懂該語言的人確認）。' },
    { type: 'h2', text: '2. 社群貼文' },
    { type: 'p', text: '新品上市、節日活動，請 AI 擬好貼文與標籤，再配上實拍照片。' },
    { type: 'h2', text: '3. 評論回覆' },
    { type: 'p', text: '面對負評，先讓 AI 擬一份有禮貌、不推卸的回覆草稿，再由店長修改送出。' },
    { type: 'h2', text: '4. 活動企劃' },
    { type: 'p', text: '請 AI 發想集點、套餐組合、節慶活動的點子，再評估成本。' },
    { type: 'h2', text: '5. 備料與排班參考' },
    { type: 'p', text: '把過去的銷售紀錄整理成表格，請 AI 幫忙找出規律，作為備料與排班的參考。' },
    { type: 'h2', text: '6. 員工教育訓練' },
    { type: 'p', text: '把 SOP 整理成問答，讓新人隨時查詢。' },
    { type: 'p', text: '想把 AI 用在自己的店，可以參考 <a href="course.html?id=c09">餐飲業 AI 應用課</a>。' },
  ],
  p45: [
    { type: 'p', text: '做遊戲需要程式、美術、音效、企劃，過去幾乎不可能一個人完成。AI 讓個人做出一款小遊戲變得實際許多。' },
    { type: 'h2', text: '先從小遊戲開始' },
    { type: 'p', text: '第一款遊戲建議選簡單的類型：點擊遊戲、躲避障礙、簡單的解謎。規模小，才做得完。' },
    { type: 'h2', text: 'AI 能幫忙的地方' },
    { type: 'p', text: '<b>程式</b>：描述遊戲規則，請 AI 寫出基本架構，再逐步修改。<br><b>美術</b>：用 AI 繪圖做角色與場景，注意風格要統一。<br><b>音效與配樂</b>：用 AI 生成背景音樂與效果音。<br><b>企劃</b>：請 AI 幫忙設計關卡與數值。' },
    { type: 'h2', text: '新手常見的坑' },
    { type: 'p', text: '一開始就想做大型 RPG、功能一直加做不完、美術風格前後不一致。建議先做出可以玩的最小版本，再慢慢擴充。' },
    { type: 'h2', text: '發佈前的檢查' },
    { type: 'p', text: '確認使用的素材都有合法授權，並請朋友試玩、回饋。' },
    { type: 'p', text: '想跟著做出第一款遊戲，可以參考 <a href="course.html?id=c38">AI 遊戲開發課</a>。' },
  ],
  p46: [
    { type: 'p', text: 'AI 能在幾分鐘內讀完一份財報、整理一週的新聞，對做投資研究很有幫助。但用錯方法，也可能讓你做出錯誤的決定。' },
    { type: 'h2', text: 'AI 適合做的事' },
    { type: 'p', text: '摘要財報重點與法說會內容、比較多家公司的數據、整理產業新聞、解釋看不懂的財經名詞、把資料整理成表格。' },
    { type: 'h2', text: 'AI 不適合做的事' },
    { type: 'p', text: '預測股價漲跌、直接告訴你買什麼。AI 可能引用過時或錯誤的數字，也無法替你承擔投資風險。' },
    { type: 'h2', text: '正確的使用方式' },
    { type: 'p', text: '1. 重要數字一定要回到原始資料（財報、公開資訊）核對。<br>2. 請 AI 列出「支持」與「反對」兩面的論點，避免只看見想看的。<br>3. 最後的決定要依照自己的風險承受度判斷。' },
    { type: 'p', text: '本文僅為工具使用說明，不構成任何投資建議。' },
    { type: 'p', text: '想學會用 AI 做研究與資料整理，可以參考 <a href="course.html?id=c41">AI 理財研究課</a>。' },
  ],
  p47: [
    { type: 'p', text: 'AI 生成的圖、文字、音樂越來越常被用在商業用途。但「能用」和「可以放心用」是兩回事。以下整理使用前的檢查清單（一般性說明，不是法律意見；重要案件請諮詢律師）。' },
    { type: 'h2', text: '1. 先看工具的使用條款' },
    { type: 'p', text: '每個 AI 工具對商用、免費方案與付費方案的規定不同，條款也會更新。使用前請確認最新版本。' },
    { type: 'h2', text: '2. AI 生成內容不一定受著作權保護' },
    { type: 'p', text: '在許多地區，完全由 AI 產生、缺乏人類創作投入的內容，可能不被視為受保護的作品。如果你需要擁有權利，就要加入足夠的人為創作與修改，並保留創作過程紀錄。' },
    { type: 'h2', text: '3. 不要模仿特定作品或人物' },
    { type: 'p', text: '在提示詞中指定模仿某位藝術家、知名角色、商標或真人肖像，容易引發侵權爭議。' },
    { type: 'h2', text: '4. 檢查有沒有不小心「撞圖」' },
    { type: 'p', text: '重要的商業素材，可以用以圖搜圖檢查是否與現有作品過度相似。' },
    { type: 'h2', text: '5. 對外說明 AI 的使用' },
    { type: 'p', text: '部分平台與客戶會要求標示 AI 生成內容，提前說清楚可以避免爭議。' },
    { type: 'p', text: '想全面了解 AI 的正確用法，可以參考 <a href="course.html?id=c31">AI 生活應用課程</a>。' },
  ],
  p48: [
    { type: 'p', text: '孩子用 AI 寫作業已經很常見。全面禁止很難做到，也會讓孩子錯過學習新工具的機會。比較好的做法，是陪孩子一起建立正確的使用習慣。' },
    { type: 'h2', text: '1. 把 AI 當家教，而不是代寫' },
    { type: 'p', text: '引導孩子請 AI「解釋觀念」「給提示」，而不是直接給答案。' },
    { type: 'h2', text: '2. 一起查證' },
    { type: 'p', text: '和孩子一起檢查 AI 的回答，讓他知道 AI 也會出錯，培養查證的習慣。' },
    { type: 'h2', text: '3. 保護個人資料' },
    { type: 'p', text: '提醒孩子不要輸入姓名、學校、住址、照片等個人資訊。' },
    { type: 'h2', text: '4. 遵守學校規定' },
    { type: 'p', text: '每位老師對 AI 的規定不同，鼓勵孩子誠實說明自己有沒有使用 AI、怎麼使用。' },
    { type: 'h2', text: '5. 家長自己也要會用' },
    { type: 'p', text: '家長熟悉工具，才能給出具體的建議，也比較能察覺不恰當的使用方式。各 AI 服務對使用年齡有不同規定，使用前請先確認。' },
    { type: 'p', text: '家長想先熟悉 AI 工具，可以從 <a href="course.html?id=c31">AI 生活應用課程</a> 開始。' },
  ],
  p49: [
    { type: 'p', text: '很多公司買了 AI 工具帳號，結果只有少數人在用。企業導入 AI 培訓，重點不是課上得多，而是能不能真的用在工作上。' },
    { type: 'h2', text: '1. 盤點需求' },
    { type: 'p', text: '先找出各部門最花時間、最重複的工作，例如寫報告、整理資料、回覆客戶。' },
    { type: 'h2', text: '2. 挑 2～3 個情境先試' },
    { type: 'p', text: '選效果容易看見的情境，做出成功案例，比一次全公司推廣更有效。' },
    { type: 'h2', text: '3. 建立使用規範' },
    { type: 'p', text: '哪些資料可以輸入 AI、哪些不行，產出內容要不要人工審核，都要寫清楚。資安與個資保護是第一優先。' },
    { type: 'h2', text: '4. 依職務設計課程' },
    { type: 'p', text: '行銷、業務、人資、工程需要的 AI 技能不同，課程要針對實際工作設計，並安排實作練習。' },
    { type: 'h2', text: '5. 追蹤成效' },
    { type: 'p', text: '記錄導入前後的工作時間、產出品質，作為下一階段擴大的依據。' },
    { type: 'p', text: 'OKAI課程網 提供依產業與職務規劃的企業內訓，歡迎到 <a href="enterprise.html">企業方案</a> 頁面了解。' },
  ],
  p30: [
    { type: 'p', text: '只要在 Google 搜尋「AI 課程」，就會跳出一長串平台和推薦清單。但如果把美國、中國、日本三地的熱門結果放在一起看，會發現三個市場賣 AI 課的方式差很多。了解這些差異，比直接挑一門課更能幫你找到適合的學法。' },
    { type: 'p', text: '以下資料整理自 2026 年 11 月三地的公開排名文章與平台官網，價格與方案可能隨時調整，報名前請以官方頁面為準。' },
    { type: 'h2', text: '美國：證書、名校與大量免費入門課' },
    { type: 'p', text: '美國的 AI 課程推薦清單，最常出現的是 Coursera、DeepLearning.AI、DataCamp、Udemy，以及 Stanford、MIT、哈佛等大學的線上課程。共同特色是<b>「證書」很重要</b>：大學與大企業的專業證書被當成求職時的能力證明。' },
    { type: 'p', text: '另一個特色是免費入門門檻很低。DeepLearning.AI 的短課程可以免費觀看，哈佛 CS50AI 的課程內容也公開；真正收費的通常是測驗、互動實作與證書。' },
    { type: 'h2', text: '中國：低價實戰課 + 大量免費開源教材' },
    { type: 'p', text: '中國市場的熱門選項分成兩種：一種是 Datawhale、B 站上的長篇免費教學這類開源資源；另一種是極客時間、慕課網這類付費平台，價格相對親民，主打「做出專題」。' },
    { type: 'p', text: '雲端大廠也有自己的學堂，例如阿里雲、華為雲、百度飛槳，課程常和自家的技術認證綁在一起，學完可以考證照。' },
    { type: 'h2', text: '日本：月費看到飽 + 導師 + 社群' },
    { type: 'p', text: '日本搜尋「AI 講座」時，前面幾名多是生成 AI 補習班，例如 SHIFT AI、DMM 生成AI CAMP。它們大多採用<b>月費訂閱、所有課程看到飽</b>，再搭配導師諮詢、AI 助教和學員社群，強調「學完馬上用在工作上」。' },
    { type: 'p', text: '部分學校也會協助申請政府的再技能（Reskilling）補助，降低學費負擔。' },
    { type: 'h2', text: '三地差異一張表看懂' },
    { type: 'p', text: '<b>美國</b>：重證書與名校品牌，入門課多免費，進階付費取得認證。<br><b>中國</b>：免費資源最多，付費課價格低、專題多，常和雲端認證結合。<br><b>日本</b>：訂閱制為主，重視陪跑、社群與工作實用性。' },
    { type: 'h2', text: '台灣學習者該怎麼選？' },
    { type: 'p', text: '先問自己三件事：第一，你是想「用 AI 把工作做得更好」，還是想「開發 AI 產品」？第二，你能接受英文或簡體中文教材嗎？第三，你需要證書，還是需要有人帶著做出成果？' },
    { type: 'p', text: '如果你想用繁體中文、跟著實作直接做出作品，OKAI課程網 的課程就是為這個需求設計的：每堂課都能先免費試看前 2 個單元，確認適合再報名。' },
  ],
  p31: [
    { type: 'p', text: '美國的 AI 學習資源非常豐富，很多甚至完全免費。但選擇太多也容易迷路。這篇用「你的目標」來分類，整理美國熱門 AI 課程平台的特色與費用（2026 年 11 月查詢，價格以官網為準）。' },
    { type: 'h2', text: '先分清楚：你想「用 AI」還是「做 AI」？' },
    { type: 'p', text: '美國的選課文章常把 AI 課程分成兩種：一種教你在工作中使用 ChatGPT、Claude、Copilot 等工具；另一種教你寫程式、訓練模型、開發 AI 應用。選錯類型，花了時間也學不到想要的東西。' },
    { type: 'h2', text: '想用 AI：從免費入門課開始' },
    { type: 'p', text: '<b>Coursera《AI for Everyone》</b>：由吳恩達設計的入門課，不需要技術背景，常被排名文章列為第一門 AI 課。' },
    { type: 'p', text: '<b>DeepLearning.AI 短課程</b>：大多可以免費觀看，每門約 1～2 小時，主題涵蓋提示詞、AI Agent 等最新工具。想要測驗、互動實作與證書，則需要 Pro 會員（月費 30 美元，或年費 270 美元）。' },
    { type: 'h2', text: '想做 AI：有程式基礎再挑戰' },
    { type: 'p', text: '<b>哈佛 CS50AI</b>：用 Python 學 AI 的原理，課程內容免費，適合已經會寫程式的人。' },
    { type: 'p', text: '<b>Stanford、MIT 專業課程</b>：屬於高價的大學進修課程，例如 Stanford 的 AI 專業課程由三門 10 週的課組成，適合有技術背景、需要名校證書的人。' },
    { type: 'h2', text: '想要便宜、主題明確：Udemy' },
    { type: 'p', text: 'Udemy 是講師自由上架的課程市集，單堂課特價常在十幾美元，也有每月 13 美元起的訂閱方案。優點是主題多、更新快；缺點是品質差異大，購買前一定要看試看影片與評價。' },
    { type: 'h2', text: '三個選課建議' },
    { type: 'p', text: '1. 先上免費入門課，確認自己對哪個方向有興趣，再花錢。<br>2. 需要證書求職的人，優先選大學或大企業發的證書。<br>3. 英文吃力的話，影片字幕與教材語言會大幅影響學習效率。' },
    { type: 'p', text: '如果你偏好繁體中文、台灣案例，又想直接做出作品，可以先到 OKAI課程網 試看任一門課的前 2 個單元。' },
  ],
  p32: [
    { type: 'p', text: '中國的 AI 學習市場規模大、更新快，資源大致分成「免費開源」和「付費實戰」兩種。這篇整理常見的選項，以及選課時該注意的地方（資料為 2026 年公開資訊，價格以官方為準）。' },
    { type: 'h2', text: '免費資源：開源社群與長篇影片' },
    { type: 'p', text: '<b>Datawhale</b>：開源學習社群，提供大模型入門到應用的教材，完全免費，適合自學能力強的人。' },
    { type: 'p', text: '<b>李沐《動手學深度學習》</b>：深度學習經典教材，附免費影片，適合想打好理論基礎的人。' },
    { type: 'p', text: '<b>B 站長篇教學</b>：常見動輒數百集的「零基礎入門」系列，內容免費但品質不一，建議挑選有完整大綱、持續更新的系列。' },
    { type: 'h2', text: '付費實戰課：價格親民、主打專題' },
    { type: 'p', text: '<b>極客時間</b>：熱門的《AI大模型實戰課》售價約人民幣 299 元，內容從 LLM 原理一路到 LangChain、RAG、Agent 開發，主打實作專題。' },
    { type: 'p', text: '<b>慕課網</b>：IT 技能平台，課程分成免費課、實戰專題課與系統課三種層級。' },
    { type: 'h2', text: '雲端大廠學堂：學完可以考認證' },
    { type: 'p', text: '阿里雲、華為雲、騰訊雲、百度飛槳都有自己的 AI 學習平台，課程常與自家雲端技術認證搭配，適合工作上會用到這些雲端服務的人。' },
    { type: 'h2', text: '選課時要小心的地方' },
    { type: 'p', text: '1. 看課程是否真的有動手做：模型微調、RAG 搭建、API 串接等，避免只有投影片講解。<br>2. 對「保證就業」「保證月薪」這類說法保持警覺。<br>3. 先試聽或看免費章節，確認聽得懂、跟得上再付費。' },
    { type: 'p', text: '對台灣學習者來說，簡體教材與中國的雲端服務未必適用。想用繁體中文、台灣常用工具學 AI 實作，可以參考 OKAI課程網 的課程，每堂課都能先免費試看。' },
  ],
  p33: [
    { type: 'p', text: '如果你搜尋日本的「AI 講座」，會發現排在前面的多是生成 AI 補習班，而且收費方式很像串流平台：月費訂閱、課程看到飽。這篇整理日本熱門生成 AI 學校的模式，以及它適合哪些人（資料為 2026 年公開資訊，費用以官網為準）。' },
    { type: 'h2', text: '代表案例：SHIFT AI 與 DMM 生成AI CAMP' },
    { type: 'p', text: '<b>SHIFT AI（AI 大學）</b>：日本規模很大的生成 AI 學習社群，會員超過 2 萬人，提供 50 多門課程、上千支影片看到飽，月費 21,780 日圓，另有全國各地的實體活動。' },
    { type: 'p', text: '<b>DMM 生成AI CAMP</b>：月費 16,280 日圓（含稅）可看全部 25 門課程、約 1,000 堂課，提供導師諮詢與 24 小時 AI 助教，沒有最低合約期限。' },
    { type: 'h2', text: '為什麼日本流行訂閱制？' },
    { type: 'p', text: '生成 AI 工具變化很快，一次買斷的課程容易過時；訂閱制讓學校能持續更新，學員也能依工作需求切換主題，例如行銷、業務、人資等職種專屬課程。再加上導師與社群陪跑，能降低學到一半放棄的機率。' },
    { type: 'p', text: '此外，部分學校協助申請再技能（Reskilling）補助，也讓上班族更願意投資學習。' },
    { type: 'h2', text: '訂閱制的優點與要注意的地方' },
    { type: 'p', text: '<b>優點</b>：學習範圍廣、內容持續更新、有人可以問。<br><b>要注意</b>：沒時間上課時，月費照樣會扣；報名前務必確認續訂方式、取消流程，以及取消後還能不能看。' },
    { type: 'h2', text: '單次購買還是訂閱，怎麼選？' },
    { type: 'p', text: '如果你只想學好一項明確的技能，例如 AI 繪圖或 AI 影片，單次購買一門完整的課通常比較划算；如果你想全面跟上各種 AI 工具，而且每週都有固定時間學習，訂閱制比較適合。' },
    { type: 'p', text: 'OKAI課程網 目前的課程都是單次購買、不會自動扣款，每門課都可以先免費試看前 2 個單元。' },
  ],
  p34: [
    { type: 'p', text: 'AI 課程越來越多，從免費影片到上萬元的補習班都有。花錢前先用下面 7 個問題檢查一次，可以避開大部分的地雷課。' },
    { type: 'h2', text: '1. 學完能做出什麼？' },
    { type: 'p', text: '好課程會寫出具體成果，例如「做出一套可上架的 LINE 貼圖」，而不是只寫「了解 AI」。如果課程頁說不清楚學完能做什麼，就要小心。' },
    { type: 'h2', text: '2. 有沒有試看？' },
    { type: 'p', text: '試看單元能讓你判斷講師的節奏、講解是否清楚、影片與字幕品質。連一個單元都不給試看的課，風險比較高。' },
    { type: 'h2', text: '3. 有沒有實作與練習？' },
    { type: 'p', text: 'AI 是動手才學得會的技能。看看課程大綱裡有沒有練習任務、專案或作業，而不是從頭到尾都在講概念。' },
    { type: 'h2', text: '4. 內容多久沒更新了？' },
    { type: 'p', text: 'AI 工具更新非常快，一年前錄的課，介面和功能可能都不一樣了。找找看課程頁有沒有寫最後更新或檢查日期，以及工具改版時怎麼處理。' },
    { type: 'h2', text: '5. 退費規則寫清楚了嗎？' },
    { type: 'p', text: '確認退費期限、條件（例如觀看進度上限）、申請方式與退款時間。規則只藏在長篇條款裡、找不到的，最好先問清楚再付款。' },
    { type: 'h2', text: '6. 是單次購買還是訂閱？' },
    { type: 'p', text: '訂閱制要確認月費或年費、下次扣款日、如何取消、取消後能看到什麼時候；單次購買則要確認可以看多久。' },
    { type: 'h2', text: '7. 有問題可以問誰？' },
    { type: 'p', text: '課程有沒有提問管道？講師或團隊會不會回覆？互動方式寫得越具體越好。' },
    { type: 'h2', text: '額外提醒：小心誇大承諾' },
    { type: 'p', text: '看到「保證學會」「保證接案」「保證月入」這類說法要特別小心。學習成果和投入的時間、練習量有關，任何課程都無法保證結果。' },
    { type: 'p', text: 'OKAI課程網 的每門課都在課程頁寫明學習成果、不適合的對象、試看單元、內容檢查日期與退費規則，報名前就能先確認清楚。' },
  ],
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
  { id: 'n1', type: 'system', title: '歡迎來到 OKAI課程網', body: '開始探索 AI 課程，找到最適合你的學習路線', time: '剛剛', read: true, link: '/category.html' }
];

window.INSTRUCTOR_BIOS = {
  [T]: { detail: 'OKAI課程網 講師團隊專注 AI 實務教學，課程以實際操作為主，目標是讓學員學完就能用在工作與生活上。每位講師的個人介紹與作品，會在正式課程影片上線時一併公布。', works: ['教學範圍：AI 應用開發、AI 繪圖、AI 影片、AI 行銷、AI 自動化', '教學方式：每個單元都實際操作一次，附講義與練習', '課程維護：工具改版時補充說明或更新單元'], social: {} }
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

/* 每個單元的影片與時長：目前為示意影片（assets/video/<課程>/<章>-<單元>.mp4），換成正式影片時直接覆蓋檔案並更新 durs */
(function () {
  for (const cid of Object.keys(window.CHAPTERS || {})) {
    window.CHAPTERS[cid].forEach((ch, ci) => {
      if (!ch.videos) ch.videos = ch.lessons.map((_, li) => `assets/video/${cid}/${ci + 1}-${li + 1}.mp4`);
      if (!ch.durs) ch.durs = ch.lessons.map(() => '00:10');
    });
  }
})();

/* ===== 測試模式：模擬講師與測試課程 =====
   網址加 ?okai-test=1 開啟、?okai-test=0 關閉。一般訪客、搜尋引擎看不到。 */
(function () {
  try {
    const q = new URLSearchParams(location.search).get('okai-test');
    if (q === '1') localStorage.setItem('aic-test-mode', '1');
    if (q === '0') localStorage.removeItem('aic-test-mode');
    if (localStorage.getItem('aic-test-mode') !== '1') return;
  } catch (e) { return; }
  window.OKAI_TEST_MODE = true;
  window.COURSES.push({
    id: 'c99', v: 'test99', cat: 'ai', sub: 'AI 應用開發', level: '入門', hours: 1,
    title: '【測試課程】模擬講師上架流程', price: 990, origin: 990, rating: 0, students: 0,
    teacher: '模擬講師（測試用）', role: '上架流程測試帳號', tags: ['測試'],
    desc: '這是測試模式才看得到的課程，用來驗證講師上架、試看、報名、播放、完課發證書的完整流程。'
  });
  window.CHAPTERS.c99 = [
    { title: '上架流程測試', lessons: ['講師自我介紹', '課程目標與成果', '第一個實作'] },
    { title: '進階內容', lessons: ['進階技巧示範', '常見錯誤', '總結與下一步'] }
  ].map((ch, ci) => ({ ...ch, videos: ch.lessons.map((_, li) => `assets/video/c99/${ci + 1}-${li + 1}.mp4`), durs: ch.lessons.map(() => '00:10') }));
})();
