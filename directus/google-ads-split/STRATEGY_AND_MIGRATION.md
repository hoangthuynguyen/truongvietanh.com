# 🦁 TÁCH CHIẾN DỊCH `Search_Tinh_LionCamp2026` → 2 CHIẾN DỊCH ĐỊA PHƯƠNG

**Source sheet:** [GoogleAds_Editor_Import_Template_LionCamp_2026](https://docs.google.com/spreadsheets/d/1e6f3rkRPDVxWtm91r6M8a51SuZBc3NaX9cmNFh4alUw/edit)
**Ngày tạo:** 2026-04-16

---

## 1. LÝ DO TÁCH (WHY)

Chiến dịch `Search_Tinh_LionCamp2026` hiện gộp 2 địa phương khác nhau (Cần Giuộc — Long An & Rạch Giá — Kiên Giang) vào cùng 1 budget `350,000 VND/ngày` với bid strategy `Maximize conversions`. Điều này gây 4 vấn đề:

| Vấn đề | Hệ quả |
|---|---|
| **Budget share không kiểm soát** | Một địa phương có CPC rẻ hơn sẽ "ăn" hết budget, địa phương còn lại bị starve |
| **Learning bị nhiễu** | Max conversions học chung 1 pool nhưng audience & search intent 2 vùng rất khác nhau (thành thị ĐBSCL vs vùng ven TP.HCM) |
| **Sitelink / Ad Extension bị generic** | Hiện tại Cần Giuộc và Rạch Giá cùng dùng 1 bộ 6 sitelinks → không local |
| **Báo cáo khó tách ROAS theo vùng** | Muốn biết ROAS Cần Giuộc vs Rạch Giá phải filter theo ad group (rườm rà) |

→ **Tách thành 2 campaigns** để mỗi vùng có budget, bid, learning signal và địa lý riêng.

---

## 2. KIẾN TRÚC MỚI (AFTER)

| Chiến dịch cũ | Chiến dịch mới | Budget | Location | Landing |
|---|---|---|---|---|
| `Search_Tinh_LionCamp2026` (350K/ngày) | `Search_CanGiuoc_LionCamp2026` | **200,000 VND/ngày** | Cần Giuộc, Long An + radius 15km | [sales-tinh-can-giuoc](https://truongvietanh.com/sales-tinh-can-giuoc) |
| | `Search_RachGia_LionCamp2026` | **200,000 VND/ngày** | Rạch Giá, Kiên Giang + radius 20km | [sales-tinh-rach-gia](https://truongvietanh.com/sales-tinh-rach-gia) |

**Total budget tăng nhẹ 350K → 400K** (+14%) để đảm bảo mỗi campaign có đủ conversion volume cho Max Conversions học (tối thiểu 15 conv/tháng/campaign).

### Bid strategy
- Giữ **Maximize conversions** trong 2–3 tuần đầu (chưa đủ data cho tCPA)
- Sau khi thu được ≥30 conversions mỗi campaign → chuyển sang **Target CPA = 80,000 VND** (= chi phí lead mục tiêu)

### Ad Group Structure (3 ad groups × 2 campaigns = 6 ad groups — tăng từ 2)

| Campaign | Ad Group | Match Type | Max CPC | Mục đích |
|---|---|---|---|---|
| CanGiuoc | `CG_TH_Phrase` | Phrase | 8,000 | Bắt intent rộng (20 kw) |
| CanGiuoc | `CG_TH_Exact` | Exact | 10,000 | Bắt high-intent chính xác (7 kw) |
| CanGiuoc | `CG_Brand_Local` | Phrase | 5,000 | Brand + địa phương (3 kw) |
| RachGia | `RG_TH_Phrase` | Phrase | 8,000 | Bắt intent rộng (18 kw) |
| RachGia | `RG_TH_Exact` | Exact | 10,000 | Bắt high-intent chính xác (7 kw) |
| RachGia | `RG_Brand_Local` | Phrase | 5,000 | Brand + địa phương (3 kw) |

**58 keywords mới** (vs 26 keywords cũ) — expansion 2.2× để phủ từ khóa tỉnh đầy đủ hơn.

### RSA Ads (2 ads × 3 ad groups × 2 campaigns = không, thực tế 4 ads/campaign = 8 ads total)

3 variants/campaign:
1. **V1 (địa danh)** — "Trại Hè Tiểu Học [Cần Giuộc/Rạch Giá]" + KDC cụ thể
2. **V2 (tỉnh)** — "Trại Hè [Long An/Kiên Giang] 2026" + USP (6 tuần, IELTS)
3. **Brand** — "Trường Việt Anh [địa phương]" — dùng cho brand ad group

### Ad Extensions — customize theo vùng
- **Sitelinks**: Thay vì generic "Xem 4 Cơ Sở", mỗi campaign có link riêng `co-so-can-giuoc` / `co-so-rach-gia`
- **Callouts**: Giữ 10 callouts giống nhau (giá trị core)
- **Call Ext**: Same hotline `0916 961 409` cho cả 2
- **Promotion**: Early Bird 15% áp dụng cả 2

### Geo-targeting — **ĐÂY LÀ THAY ĐỔI QUAN TRỌNG NHẤT**
Trước: gộp 2 location vào 1 campaign → Google phân bổ budget không đều.
Sau: Mỗi campaign có **3 location targets**:
- 1 City (thành phố chính) — bid baseline
- 1 Radius (bán kính) — bid +10% (người dùng ngay gần trung tâm thường intent cao hơn)
- 1 Province (tỉnh) — bid baseline (catch-all cho toàn tỉnh)

Cần Giuộc radius 15km vì đô thị hóa cao, Rạch Giá radius 20km vì địa lý trải dài hơn.

### Device bid adjustment
- Mobile: **+15%** (đa số phụ huynh tìm trên di động sau giờ làm)
- Tablet: **-20%** (conversion rate thấp)

### Ad Schedule — giờ vàng
Giống template cũ: 7 ngày × 4 slots
- 06:00–12:00: +0% (morning commute)
- 12:00–17:00: **+10%** (nghỉ trưa + chiều — phụ huynh nghiên cứu)
- 17:00–22:00: **+20%** (peak — tối về nhà quyết định)
- 22:00–23:00: +0% (late night)

---

## 3. DANH SÁCH FILE CSV ĐỂ IMPORT

Thư mục: `directus/google-ads-split/`

| # | File | Sheet tab đích | Số rows |
|---|---|---|---|
| 1 | `1_Campaigns_Tinh_Split.csv` | 1_Campaigns | 2 |
| 2 | `2_AdGroups_Tinh_Split.csv` | 2_AdGroups | 6 |
| 3 | `3_Keywords_Tinh_Split.csv` | 3_Keywords | 58 |
| 4 | `4_RSA_Ads_Tinh_Split.csv` | 4_RSA_Ads | 8 |
| 5 | `6_Sitelink_Extensions_Tinh_Split.csv` | 6_Sitelink_Extensions | 12 |
| 6 | `7_Callout_Extensions_Tinh_Split.csv` | 7_Callout_Extensions | 20 |
| 7 | `8_Structured_Snippets_Tinh_Split.csv` | 8_Structured_Snippets | 2 |
| 8 | `9_Call_Extensions_Tinh_Split.csv` | 9_Call_Extensions | 2 |
| 9 | `12_Location_Targets_Tinh_Split.csv` | 12_Location_Targets | 6 |
| 10 | `13_Ad_Schedule_Tinh_Split.csv` | 13_Ad_Schedule | 56 |
| 11 | `15_Bid_Adjustments_Tinh_Split.csv` | 15_Bid_Adjustments | 6 |

---

## 4. QUY TRÌNH IMPORT VÀO GOOGLE ADS EDITOR

### Bước 1 — Pause chiến dịch cũ (KHÔNG XOÁ)
1. Mở Google Ads Editor
2. Chọn `Search_Tinh_LionCamp2026`
3. Status → **Paused**
4. Post changes

Lý do **pause chứ không delete**: giữ lại historical data + quality score lịch sử phòng trường hợp muốn re-enable.

### Bước 2 — Import campaigns
1. Account → **Make Multiple Changes** → **Import from file**
2. Chọn `1_Campaigns_Tinh_Split.csv`
3. Review → Apply
4. Xác nhận 2 campaigns mới ở trạng thái **Paused** (Editor mặc định)

### Bước 3 — Import ad groups
1. Import `2_AdGroups_Tinh_Split.csv`
2. Editor sẽ map `Campaign Name` → `Campaign ID` tự động

### Bước 4 — Import keywords
1. Import `3_Keywords_Tinh_Split.csv`
2. Chú ý: Match type phải đúng (**Phrase** dùng `""`, **Exact** dùng `[]`)

### Bước 5 — Import RSA ads
1. Import `4_RSA_Ads_Tinh_Split.csv`
2. Editor sẽ kiểm tra độ dài (Headline ≤30, Description ≤90)
3. Fix nếu có warning → Apply

### Bước 6 — Import extensions (6 files)
Import lần lượt:
- `6_Sitelink_Extensions_Tinh_Split.csv`
- `7_Callout_Extensions_Tinh_Split.csv`
- `8_Structured_Snippets_Tinh_Split.csv`
- `9_Call_Extensions_Tinh_Split.csv`

### Bước 7 — Import location targets + ad schedule + bid adjustments
- `12_Location_Targets_Tinh_Split.csv`
- `13_Ad_Schedule_Tinh_Split.csv`
- `15_Bid_Adjustments_Tinh_Split.csv`

### Bước 8 — Review & Post Changes
1. Tab **Review Changes** → kiểm tra errors
2. Fix các warning (thường là policy check)
3. **Post Changes** → chờ sync

### Bước 9 — Go Live
1. Vào Google Ads web → check 2 campaigns xuất hiện
2. Verify:
   - Landing page load OK
   - Conversion tracking active (Form_Submit, Zalo_Click)
   - GCLID script đang chạy trên website
3. Đổi status **Paused** → **Enabled** cho cả 2 campaigns

---

## 5. CẬP NHẬT SHEET TEMPLATE (để giữ đồng bộ)

Trên Google Sheet template:
1. Tab `1_Campaigns`: Xoá row 4 (Tinh cũ) → paste 2 rows từ `1_Campaigns_Tinh_Split.csv`
2. Tab `2_AdGroups`: Xoá rows 18–19 → paste 6 rows từ `2_AdGroups_Tinh_Split.csv`
3. Tab `3_Keywords`: Xoá rows 346–371 → paste 58 rows mới
4. Tab `4_RSA_Ads`: Xoá rows 18–19 → paste 8 rows mới
5. Tab `6_Sitelink_Extensions`: Xoá rows 14–19 → paste 12 rows mới
6. Tab `7_Callout_Extensions`: Xoá rows 22–31 → paste 20 rows mới
7. Tab `8_Structured_Snippets`: Xoá row 6 → paste 2 rows mới
8. Tab `9_Call_Extensions`: Xoá row 4 → paste 2 rows mới
9. Tab `12_Location_Targets`: Thêm 6 rows mới (nếu tab này trước đó trống ở mục Tinh)
10. Tab `13_Ad_Schedule`: Xoá 28 rows Tinh cũ (từ row 58 trở đi) → paste 56 rows mới
11. Tab `15_Bid_Adjustments`: Thay row Tinh cũ → 6 rows mới

---

## 6. KPIs SAU KHI LAUNCH (tuần 1–4)

| Metric | Tuần 1 | Tuần 2 | Tuần 3–4 |
|---|---|---|---|
| Impression share CanGiuoc | ≥40% | ≥55% | ≥70% |
| Impression share RachGia | ≥40% | ≥55% | ≥70% |
| CPC trung bình | ≤ 9,000 VND | ≤ 8,000 VND | ≤ 7,500 VND |
| CTR | ≥4% | ≥5% | ≥6% |
| CPA (Form + Zalo) | ≤120K | ≤100K | **≤80K** |
| Conversions/tuần/campaign | ≥5 | ≥10 | ≥15 |

**Action trigger:**
- Nếu CPC > 12K sau tuần 1 → hạ Max CPC xuống 6,500 hoặc tăng Quality Score bằng cách split ad group nhỏ hơn
- Nếu Impression share < 40% → tăng budget +25% cho campaign yếu hơn
- Nếu conversions ≥30 sau 2 tuần → chuyển sang Target CPA = 80,000

---

## 7. CHECKLIST PRE-LAUNCH

- [ ] Conversion actions setup: `Form_Submit`, `Zalo_Click`, `Book_Tour`
- [ ] GCLID script deployed trên [sales-tinh-can-giuoc](https://truongvietanh.com/sales-tinh-can-giuoc) và [sales-tinh-rach-gia](https://truongvietanh.com/sales-tinh-rach-gia)
- [ ] Pancake CRM + GHL webhook hoạt động
- [ ] Landing pages test mobile (>80% traffic là mobile)
- [ ] Zalo OA `0916961409` sẵn sàng trực 7:00–22:00
- [ ] Remarketing audience `CanGiuoc_Visitors_30d` và `RachGia_Visitors_30d` đã tạo trên GA4
- [ ] Hai campaigns mới ở trạng thái **Paused** khi import
- [ ] Review Changes trong Editor PASS (0 errors)
- [ ] Post changes → verify trên Google Ads web
- [ ] Enable cả 2 campaigns cùng lúc
