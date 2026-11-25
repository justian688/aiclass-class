# OKAI課程網 自動測試

先在專案根目錄啟動本機伺服器：`python3 -m http.server 8811 --bind 127.0.0.1`

| 檔案 | 測什麼 |
| --- | --- |
| check.py | 45 頁全部開啟，檢查程式錯誤、H1 |
| func.py / f3.py / f5.py | 主要功能：搜尋、課程頁、購物車、報名、試看鎖、完課證書、退款規則、講師提案 |
| upload_test.py | 模擬講師上架一門新課（每單元獨立影片），檢查搜尋、分類、播放、鎖定、證書 |
| monkey.py | 100 個虛擬使用者隨機操作（`N=31` 可只跑 30 人） |
| audit.py | 全站版面、對比、SEO、手機點擊區檢查 |

需要 `pip install playwright` 與 Chrome（`/usr/bin/google-chrome`）。
