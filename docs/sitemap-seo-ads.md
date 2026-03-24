# Cấu trúc Sitemap Cho truongvietanh.com

Ngày cập nhật: 2026-03-24

Nguồn tham chiếu:
- Google Sheet `Truongvietanh.com sitemap`
- Tab `MASTER`
- Tab `LISTS`
- Tab `TEMPLATES`
- Tab `CONTENT GROUPS`
- Tab `LINKS`
- Tab `ROLL OUT PLAN`

Mục tiêu của tài liệu này:
- chuyển sitemap từ dạng liệt kê URL sang dạng kiến trúc vận hành
- bám đúng inventory, taxonomy, owner, wave và intent trong sheet nguồn
- giúp đội SEO, Content, Admissions, Brand, Operations và Dev dùng cùng một bản đồ
- làm chuẩn cho cả navigation, XML sitemap, internal linking và rollout

## 1. Nguyên tắc điều hành sitemap

Theo `MASTER` và `LISTS`, mọi URL mới phải có đủ tối thiểu các trường sau:
- `Page ID`
- `Page Type`
- `Template Class`
- `Folder Path`
- `Slug`
- `Full URL`
- `Funnel Stage`
- `Search Intent`
- `Business Goal`
- `Conversion Goal`
- `Priority Level`
- `Build Wave`
- `Index Status`
- `Schema Type`
- `Final Owner`

Nguyên tắc cố định:
- Mỗi URL chỉ phục vụ một intent chính.
- Mỗi URL phải thuộc một `silo` hoặc `group` rõ ràng.
- Không dùng URL làm khóa quản trị; `Page ID` mới là định danh chuẩn.
- Slug viết thường, có dấu gạch ngang, không dấu, không emoji, không mơ hồ.
- Trang pillar không thay landing paid.
- Trang landing paid không thay trang pillar.
- Trang local phải có điểm tựa thật: campus thật, proof thật, CTA thật.
- Trang utility, sample, archive hoặc test không được làm loãng crawl budget.

## 2. Cấu trúc group tổng thể theo sheet

Theo tab `CONTENT GROUPS`, toàn site đang được thiết kế theo 12 nhóm lớn:

### GR-01 — Brand / Toàn hệ thống

Vai trò:
- khóa branded SERP
- tăng trust layer
- xây entity authority cho Trường Việt Anh

Quy mô:
- `14` trang lõi
- `26` trang mở rộng
- tổng `40`

CTA chính:
- `Đăng ký tư vấn`
- `School Tour`

Ví dụ từ `MASTER`:
- `TVA-0001` `/gioi-thieu/truong-viet-anh-la-gi`
- `TVA-0002` `/gioi-thieu/triet-ly-su-menh-gia-tri-cot-loi`
- `TVA-0101` `/gioi-thieu/he-thong-giao-duc-viet-anh`
- `TVA-0102` `/gioi-thieu/doi-ngu-giao-vien`
- `TVA-0103` `/gioi-thieu/co-so-vat-chat`
- `TVA-0104` `/gioi-thieu/he-sinh-thai-giao-duc-viet-anh`

### GR-02 — Tuyển sinh & Học phí

Vai trò:
- money pages
- BOFU
- nhóm chốt lead mạnh nhất

Quy mô:
- `35` trang lõi
- `45` trang mở rộng
- tổng `80`

CTA chính:
- `Nhận biểu phí`
- `Đăng ký tư vấn`

Ví dụ từ `MASTER`:
- `TVA-0004` `/hoc-phi/truong-viet-anh-2026-2027`
- `TVA-0005` `/tuyen-sinh/truong-viet-anh-2026`
- `TVA-0301` `/tuyen-sinh/quy-trinh-tuyen-sinh`
- `TVA-0302` `/tuyen-sinh/ho-so-nhap-hoc`
- `TVA-0303` `/tuyen-sinh/lich-tuyen-sinh-2026`
- `TVA-0304` `/tuyen-sinh/dang-ky-tu-van`
- `TVA-0305` `/tuyen-sinh/tham-quan-truong`

Backlog BOFU trong `MASTER` cho thấy nhóm này còn mở rộng mạnh dưới `/tuyen-sinh/`, bao gồm:
- FAQ học phí
- học bổng
- objection handling
- comparison phục vụ chốt lead
- form / school tour / fee capture variants

### GR-03 — Mầm non

Vai trò:
- vertical theo cấp học
- cực quan trọng cho local SEO và tuyển sinh

Quy mô:
- `25` trang lõi
- `65` trang mở rộng
- tổng `90`

CTA chính:
- `Học thử`
- `School Tour`
- `Biểu phí`

Ví dụ từ `MASTER`:
- `TVA-0601` `/mam-non`
- `TVA-0602` `/mam-non/chuong-trinh`
- `TVA-0603` `/mam-non/tuyen-sinh`
- `TVA-0604` `/mam-non/hoc-thu`

### GR-04 — Tiểu học

Vai trò:
- vertical theo cấp học
- bám search intent lớp 1 và tiểu học song ngữ

Quy mô:
- `25` trang lõi
- `65` trang mở rộng
- tổng `90`

CTA chính:
- `Tư vấn lớp 1`
- `Biểu phí`
- `Tour`

Ví dụ từ `MASTER`:
- `TVA-0611` `/tieu-hoc`
- `TVA-0612` `/tieu-hoc/chuong-trinh`
- `TVA-0613` `/tieu-hoc/tuyen-sinh-lop-1`
- `TVA-0614` `/tieu-hoc/hoc-thu`

### GR-05 — THCS

Vai trò:
- vertical theo cấp học
- bám nhu cầu lớp 6, chuyển trường, tiếng Anh và định hướng sớm

Quy mô:
- `25` trang lõi
- `65` trang mở rộng
- tổng `90`

CTA chính:
- `Tư vấn chuyển cấp`
- `Học thử`

Ví dụ từ `MASTER`:
- `TVA-0621` `/trung-hoc-co-so`
- `TVA-0622` `/trung-hoc-co-so/chuong-trinh`
- `TVA-0623` `/trung-hoc-co-so/tuyen-sinh-lop-6`
- `TVA-0624` `/trung-hoc-co-so/hoc-thu`

### GR-06 — THPT

Vai trò:
- cluster conversion giá trị cao nhất ngoài branded
- bám lớp 10, IELTS, đại học, du học

Quy mô:
- `30` trang lõi
- `70` trang mở rộng
- tổng `100`

CTA chính:
- `Tuyển sinh lớp 10`
- `Học bổng`

Ví dụ từ `MASTER`:
- `TVA-0631` `/trung-hoc-pho-thong`
- `TVA-0632` `/trung-hoc-pho-thong/chuong-trinh`
- `TVA-0633` `/trung-hoc-pho-thong/tuyen-sinh-lop-10`
- `TVA-0634` `/trung-hoc-pho-thong/ielts-dau-ra`

### GR-07 — Liên cấp

Vai trò:
- kể câu chuyện lộ trình dài hạn
- hỗ trợ phụ huynh muốn một hành trình xuyên suốt

Quy mô:
- `12` trang lõi
- `28` trang mở rộng
- tổng `40`

CTA chính:
- `Tư vấn lộ trình học tập`

Ví dụ từ `MASTER`:
- `TVA-0905` `/lien-cap/truong-lien-cap-la-gi`
- `TVA-0906` `/lien-cap/co-nen-hoc-truong-lien-cap`
- `TVA-0907` `/lien-cap/hoc-phi`

### GR-08 — Campus / Địa điểm

Vai trò:
- local SEO
- local pack
- campus booking

Quy mô:
- `24` trang lõi
- `56` trang mở rộng
- tổng `80`

CTA chính:
- `Đặt lịch tham quan`
- `Liên hệ campus`

Ví dụ từ `MASTER`:
- `TVA-0401` `/co-so/go-vap-phan-huy-ich`
- `TVA-0402` `/co-so/mam-non-go-vap-le-duc-tho`
- `TVA-0403` `/co-so/phu-nhuan-nguyen-trong-tuyen`
- `TVA-0404` `/co-so/binh-tan-tinh-lo-10`

### GR-09 — Phụ huynh / Learning Hub

Vai trò:
- traffic + authority
- TOFU / MOFU
- mở rộng bề mặt AI answer và snippet

Quy mô:
- `36` trang lõi
- `144` trang mở rộng
- tổng `180`

CTA chính:
- `Tải checklist`
- `Nhận tư vấn`

Ví dụ từ `MASTER`:
- `TVA-1001` `/phu-huynh/cach-chon-truong-phu-hop-cho-con`
- `TVA-1002` `/phu-huynh/checklist-tham-quan-truong`
- `TVA-1003` `/phu-huynh/chuyen-cap/chuan-bi-vao-lop-1-can-gi`

### GR-10 — Thành tích / Đầu ra / Social proof

Vai trò:
- trust layer
- proof queries
- tăng CVR cho BOFU pages

Quy mô:
- `20` trang lõi
- `60` trang mở rộng
- tổng `80`

CTA chính:
- `Xem thành tích`
- `Nhận tư vấn`

Ví dụ từ `MASTER`:
- `TVA-0901` `/thanh-tich/hoc-sinh-viet-anh`
- `TVA-0902` `/thanh-tich/ielts-va-chung-chi-quoc-te`
- `TVA-0903` `/thanh-tich/ty-le-vao-dai-hoc`
- `TVA-0904` `/cam-nhan-phu-huynh/testimonial-phu-huynh`

### GR-11 — Dịch vụ bổ trợ

Vai trò:
- xử lý lo lắng logistics
- school tour, xe đưa đón, bán trú, thực đơn, dịch vụ

Quy mô:
- `20` trang lõi
- `50` trang mở rộng
- tổng `70`

CTA chính:
- `School Tour`
- `Tư vấn`

Ví dụ từ `MASTER`:
- `TVA-0908` `/su-kien/school-tour-open-day-2026`
- `TVA-0909` `/dich-vu/xe-dua-don`
- `TVA-0910` `/dich-vu/ban-tru-va-thuc-don`

### GR-12 — Tin tức / Sự kiện / Utility / Archive

Vai trò:
- retention
- brand life
- archive

Quy mô:
- `30` trang lõi
- `120` trang mở rộng
- tổng `150+`

CTA chính:
- `Xem thông báo`
- `Gallery`

Ghi chú:
- đây là nhóm dễ làm loãng index nhất
- chỉ chọn lọc index các trang có giá trị SEO thực sự

## 3. Cấu trúc sitemap production theo tầng

## 3.1. Tầng 1 — Trang điều phối và trust nền

### Trang chủ

- `/`

Vai trò:
- brand impression
- route traffic vào cấp học, cơ sở, tuyển sinh, học phí

### Brand / Core Pages

Nhánh chính:
- `/gioi-thieu/truong-viet-anh-la-gi`
- `/gioi-thieu/triet-ly-su-menh-gia-tri-cot-loi`
- `/gioi-thieu/he-thong-giao-duc-viet-anh`
- `/gioi-thieu/doi-ngu-giao-vien`
- `/gioi-thieu/co-so-vat-chat`
- `/gioi-thieu/he-sinh-thai-giao-duc-viet-anh`

Nhánh mở rộng `Wave 2` trong `MASTER`:
- các URL `TVA-1301` đến `TVA-1334`
- cùng nằm dưới `/gioi-thieu/`
- hiện đang ở trạng thái backlog brand, cần gom nhóm trước khi đưa vào production

Khuyến nghị cấu trúc:
- chỉ index các trang brand lõi
- nhóm backlog brand thành cụm nội dung theo chủ đề, tránh nổ quá nhiều URL mỏng dưới `/gioi-thieu/`

## 3.2. Tầng 2 — Cấp học và hành trình tuyển sinh lõi

### Pillar cấp học

- `/mam-non`
- `/tieu-hoc`
- `/trung-hoc-co-so`
- `/trung-hoc-pho-thong`

### Support pages theo cấp

Mầm non:
- `/mam-non/chuong-trinh`
- `/mam-non/tuyen-sinh`
- `/mam-non/hoc-thu`

Tiểu học:
- `/tieu-hoc/chuong-trinh`
- `/tieu-hoc/tuyen-sinh-lop-1`
- `/tieu-hoc/hoc-thu`

THCS:
- `/trung-hoc-co-so/chuong-trinh`
- `/trung-hoc-co-so/tuyen-sinh-lop-6`
- `/trung-hoc-co-so/hoc-thu`

THPT:
- `/trung-hoc-pho-thong/chuong-trinh`
- `/trung-hoc-pho-thong/tuyen-sinh-lop-10`
- `/trung-hoc-pho-thong/ielts-dau-ra`

Nhận xét từ `MASTER`:
- các trang trên đều là `P1 Critical`
- đều thuộc `Wave 1`
- đa số `Index`
- phần lớn dùng `Level Pillar Template`, `Admissions Hub Template` hoặc `Trial Landing`

## 3.3. Tầng 3 — Tuyển sinh, học phí và chuyển đổi BOFU

### Admissions core

Nhóm hub và support page lõi:
- `/tuyen-sinh/truong-viet-anh-2026`
- `/tuyen-sinh/quy-trinh-tuyen-sinh`
- `/tuyen-sinh/ho-so-nhap-hoc`
- `/tuyen-sinh/lich-tuyen-sinh-2026`
- `/tuyen-sinh/dang-ky-tu-van`
- `/tuyen-sinh/tham-quan-truong`

Nhóm backlog BOFU `Wave 1` trong `MASTER`:
- `TVA-1411` FAQ học phí
- `TVA-1412` đến `TVA-1423` tuyển sinh, hồ sơ, điều kiện, ưu đãi
- `TVA-1431` đến `TVA-1455` học bổng, comparison, objection-led pages
- `TVA-1461` đến `TVA-1469` local / level consultation entries

Khuyến nghị:
- không publish toàn bộ backlog BOFU cùng lúc
- ưu tiên các URL hub và support trực tiếp cho quyết định
- phần comparison và objection nên chuyển sang cluster riêng để tránh dồn mọi thứ dưới `/tuyen-sinh/`

### Tuition core

Nhóm học phí đã có cấu trúc rõ trong `MASTER`:
- `/hoc-phi/truong-viet-anh-2026-2027`
- `/hoc-phi/mam-non`
- `/hoc-phi/tieu-hoc`
- `/hoc-phi/trung-hoc-co-so`
- `/hoc-phi/trung-hoc-pho-thong`

Ngoài ra còn có:
- `/lien-cap/hoc-phi`

Khuyến nghị:
- `fee hub` nên là hub chính
- fee theo cấp là `spoke`
- fee landing paid/local cần được quản trị riêng về index/noindex

## 3.4. Tầng 4 — Campus và local SEO

### Campus hub và campus pages

Campus lõi:
- `/co-so/go-vap-phan-huy-ich`
- `/co-so/mam-non-go-vap-le-duc-tho`
- `/co-so/phu-nhuan-nguyen-trong-tuyen`
- `/co-so/binh-tan-tinh-lo-10`

Các campus page trong `MASTER` đều:
- là `Campus Page`
- dùng `Master Campus Profile`
- phần lớn `Index`
- có `Schema Type = LocalBusiness`

### Local intent pages

Các local page đã hiện diện trong `MASTER`:
- `/tuyen-sinh/mam-non-go-vap`
- `/tuyen-sinh/school-tour-mam-non-go-vap`
- `/tuyen-sinh/nhan-bieu-phi-mam-non-go-vap`
- `/tuyen-sinh/dang-ky-tu-van-go-vap-phan-huy-ich`
- `/tuyen-sinh/mam-non-gan-cityland`
- `/tuyen-sinh/truong-song-ngu-go-vap`
- `/tuyen-sinh/mam-non-gan-toi-o-go-vap`
- `/co-so/go-vap-phan-huy-ich/faq`

Rule từ sheet:
- local intent page chỉ index nếu đủ unique
- local comparison page có rủi ro cannibalization cao hơn
- fee landing local có thể `Pending` index/noindex tùy chiến lược paid-vs-SEO

## 3.5. Tầng 5 — Comparison, FAQ, social proof, parents hub

### Comparison

Theo `MASTER`, nhóm này hiện có 3 cụm:

Cụm brand / trust:
- `/giai-dap/truong-viet-anh-co-tot-khong`

Cụm liên cấp:
- `/lien-cap/co-nen-hoc-truong-lien-cap`

Cụm so sánh:
- `/so-sanh/truong-song-ngu-va-truong-quoc-te-khac-nhau-the-nao`
- `/so-sanh/truong-tu-thuc-va-truong-cong-nen-chon-mo-hinh-nao`
- `/so-sanh/thpt-song-ngu-co-tot-khong`
- `/so-sanh/co-nen-cho-con-hoc-truong-song-ngu`
- `/so-sanh/truong-tu-thuc-tot-o-go-vap`

Khuyến nghị:
- gom tất cả comparison vào `/so-sanh/`
- giữ `/giai-dap/` cho answer-led pages thật sự
- tránh để comparison mọc rải rác dưới `/tuyen-sinh/` nếu cùng một intent

### Proof / social proof

Các nhánh nên index:
- `/thanh-tich/hoc-sinh-viet-anh`
- `/thanh-tich/ielts-va-chung-chi-quoc-te`
- `/thanh-tich/ty-le-vao-dai-hoc`
- `/cam-nhan-phu-huynh/testimonial-phu-huynh`

### Parents hub

Nhánh chính:
- `/phu-huynh/*`
- `/phu-huynh/chuyen-cap/*`
- `/phu-huynh/tieng-anh/*`

Ví dụ từ `MASTER`:
- `/phu-huynh/cach-chon-truong-phu-hop-cho-con`
- `/phu-huynh/checklist-tham-quan-truong`
- `/phu-huynh/chuyen-cap/chuan-bi-vao-lop-1-can-gi`
- `/phu-huynh/chuyen-cap/chuan-bi-vao-lop-6-can-gi`
- `/phu-huynh/chuyen-cap/chuan-bi-vao-lop-10-can-gi`
- `/phu-huynh/tieng-anh/cach-giup-con-hoc-tieng-anh-hieu-qua-theo-tung-cap`

## 3.6. Tầng 6 — Blog cluster theo cấp học

Theo `MASTER`, blog cluster được scale rất mạnh theo từng cấp:

### `/blog/mam-non/*`

Từ `TVA-1501` trở đi đang có hàng chục URL về:
- chọn trường
- học phí
- school tour
- local intent mềm
- FAQ
- thực đơn
- hoạt động
- phụ huynh hub phụ

Khuyến nghị:
- tách rõ 3 lớp dưới cùng nhánh này:
  - `blog giáo dục / parent education`
  - `blog local support`
  - `utility / thông báo / thực đơn`
- không index hàng loạt các trang utility mỏng chỉ vì cùng nằm trong cluster

### `/blog/tieu-hoc/*`

Từ `TVA-1601` trở đi có cấu trúc tương tự:
- học phí
- chương trình
- tiếng Anh
- school tour
- local support
- FAQ
- thực đơn / thông báo / tài nguyên

Khuyến nghị:
- logic giống Mầm non
- utility và archive cần kiểm soát index chặt

### THCS / THPT blog clusters

Trong các phần `MASTER` sau đó, logic dự kiến cũng sẽ tương tự:
- question-led educational content
- chuyển cấp
- tiếng Anh / IELTS / đầu ra
- comparison và objection
- local / proof support

## 4. Main navigation nên bám sitemap nào

Từ cấu trúc sheet và current priorities, menu chính production nên là:

- `/`
- `/gioi-thieu/truong-viet-anh-la-gi`
- `Cấp học`
  - `/mam-non`
  - `/tieu-hoc`
  - `/trung-hoc-co-so`
  - `/trung-hoc-pho-thong`
- `/co-so`
- `/tuyen-sinh/truong-viet-anh-2026`
- `/hoc-phi/truong-viet-anh-2026-2027`
- `/lien-he`

Có thể thêm menu phụ hoặc footer cho:
- `/phu-huynh`
- `/thanh-tich/hoc-sinh-viet-anh`
- `/so-sanh`

Không nên đưa lên main nav:
- fee capture landing
- school tour landing paid
- `thank-you`
- utility pages
- archive / gallery mỏng
- `/mau*`, `/samples*`, route nội bộ

## 5. XML sitemap nên chia như thế nào

Không nên gom toàn bộ URL vào một file `sitemap.xml` duy nhất.

Khuyến nghị:
- `/sitemap.xml` là sitemap index
- chia nhỏ theo cụm:
  - `/sitemaps/core.xml`
  - `/sitemaps/levels.xml`
  - `/sitemaps/admissions.xml`
  - `/sitemaps/tuition.xml`
  - `/sitemaps/campuses.xml`
  - `/sitemaps/local.xml`
  - `/sitemaps/comparison.xml`
  - `/sitemaps/proof.xml`
  - `/sitemaps/parents-hub.xml`
  - `/sitemaps/blog-kindergarten.xml`
  - `/sitemaps/blog-primary.xml`
  - `/sitemaps/blog-secondary.xml`
  - `/sitemaps/news-events.xml`

Không đưa vào production XML sitemap:
- `/mau/*`
- `/mau-template/*`
- `/samples/*`
- `/api/health.json`
- route test
- route staging
- `thank-you` pages nếu noindex
- utility pages đang `Pending`
- fee landing paid nếu quyết định noindex

## 6. Quy tắc index / noindex theo sheet

Từ `LISTS`, `MASTER` và `ROLL OUT PLAN`, có 4 mức xử lý:

### Index mặc định

Áp dụng cho:
- home
- brand core
- pillars
- admissions core
- tuition core
- campus core
- local pages đủ unique
- comparison pages mạnh
- parents hub chất lượng cao

### Mixed index

Áp dụng cho:
- paid landing
- local conversion landing
- utility pages có lúc cần chạy campaign
- event pages theo mùa

### Pending / cân nhắc noindex

Áp dụng cho:
- fee landing paid-local
- utility thuần
- gallery mỏng
- thông báo ngắn hạn
- thời khóa biểu / lịch hoạt động

### Không đưa vào production

Áp dụng cho:
- route nội bộ
- route mẫu
- route test
- archive mỏng, trùng hoặc lỗi thời

## 7. Quy tắc internal linking theo `LINKS`

Tab `LINKS` cho thấy logic hub-spoke rất rõ. Các rule bắt buộc:

### Brand overview phải đẩy sang conversion

Ví dụ:
- `TVA-0001` -> `TVA-0004` trang học phí
- `TVA-0001` -> `TVA-0005` hub tuyển sinh
- `TVA-0001` -> `TVA-0002` trang triết lý
- `TVA-0001` -> `TVA-0003` trang review / đánh giá

### Pillar phải trỏ sang support + conversion

Ví dụ Mầm non:
- `/mam-non` -> `/mam-non/chuong-trinh`
- `/mam-non` -> `/mam-non/tuyen-sinh`
- `/mam-non` -> `/mam-non/hoc-thu`
- `/mam-non` -> `/hoc-phi/mam-non`

Ví dụ Tiểu học:
- `/tieu-hoc` -> `/tieu-hoc/chuong-trinh`
- `/tieu-hoc` -> `/tieu-hoc/tuyen-sinh-lop-1`
- `/tieu-hoc` -> `/tieu-hoc/hoc-thu`
- `/hoc-phi/tieu-hoc`

Ví dụ THCS:
- `/trung-hoc-co-so` -> chương trình
- tuyển sinh lớp 6
- học thử
- học phí THCS

Ví dụ THPT:
- `/trung-hoc-pho-thong` -> chương trình
- tuyển sinh lớp 10
- IELTS đầu ra
- học phí THPT

### Local pages phải trỏ về campus thật và CTA thật

Ví dụ:
- `/tuyen-sinh/mam-non-go-vap`
  - -> campus Mầm non Gò Vấp Lê Đức Thọ
  - -> school tour Mầm non Gò Vấp
  - -> nhận biểu phí Mầm non Gò Vấp

### Fee hub phải trỏ sang fee theo cấp

Ví dụ:
- `/hoc-phi/truong-viet-anh-2026-2027`
  - -> `/hoc-phi/mam-non`
  - -> `/hoc-phi/tieu-hoc`
  - -> `/hoc-phi/trung-hoc-co-so`
  - -> `/hoc-phi/trung-hoc-pho-thong`

## 8. Rollout priority phải bám đúng `ROLL OUT PLAN`

### Wave 1

Nhóm bắt buộc lên trước:
- `GR-02` Tuyển sinh & Học phí
- `GR-03` Mầm non
- `GR-04` Tiểu học
- `GR-05` THCS
- `GR-06` THPT
- `GR-08` Campus / Địa điểm
- `GR-01` Brand / Toàn hệ thống

Lý do:
- đây là lớp có giá trị thương mại và conversion cao nhất
- phải xong trước khi scale content TOFU

### Wave 2

- `GR-10` Thành tích / đầu ra / social proof
- `GR-07` Liên cấp
- `GR-11` Dịch vụ bổ trợ

Lý do:
- tăng trust
- xử lý objection
- hỗ trợ quyết định cho BOFU

### Wave 3

- `GR-09` Phụ huynh / Learning Hub
- comparison subcluster
- blog clusters theo cấp

Lý do:
- tăng topical authority
- mở rộng AIO / snippet surface
- nuôi lead dài hạn

### Wave 4

- `GR-12` Tin tức / Sự kiện / Utility / Archive
- mở rộng local long-tail

Lý do:
- chỉ scale sau khi tầng money + trust đã ổn

## 9. Những route phải loại khỏi sitemap production

Trong repo hiện có các route nội bộ / thử nghiệm không được đưa vào sitemap production:
- `/mau`
- `/mau/[slug]`
- `/mau-template`
- `/mau-template/[slug]`
- `/samples/*`
- `/homepage1`
- `/api/health.json`

Rule:
- `noindex`
- không xuất hiện trong nav
- không xuất hiện trong XML sitemap production

## 10. Kết luận vận hành

Sitemap của `truongvietanh.com` không nên được hiểu là một danh sách URL, mà là một hệ thống 6 tầng:

1. `Home + Brand`
2. `Pillar + Support theo cấp`
3. `Admissions + Tuition`
4. `Campus + Local`
5. `Comparison + Proof + Parents Hub`
6. `Blog cluster + Utility + Archive`

Trước khi tạo URL mới, bắt buộc trả lời 7 câu hỏi:
- URL này thuộc `Group ID` nào?
- `Page ID` là gì?
- Template class nào dùng để render?
- Intent chính là gì?
- CTA chính là gì?
- URL này sẽ được index hay mixed hay noindex?
- Nó nhận link từ đâu và đẩy link sang đâu?

Nếu chưa trả lời được 7 câu hỏi này, chưa nên đưa URL vào production sitemap.
