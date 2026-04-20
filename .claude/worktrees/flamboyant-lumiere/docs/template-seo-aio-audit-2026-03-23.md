# TEMPLATE SEO + AIO AUDIT — 2026-03-23

## Muc tieu

Tai lieu nay dung de review 16 template classes cua `truongvietanh.com` theo 4 tieu chi:

1. SEO-friendly structure
2. AI answerability / AI Overview readiness
3. Brand guideline fit
4. Performance / lightweight delivery

## Ket luan nhanh

He thong template hien tai da dung huong ve:

- template-driven architecture
- pillar + cluster + local + conversion split
- brand voice co quy chuan ro
- sample library da co 16 class mau

Nhung de dat muc “production-ready cho SEO + AIO”, can nang cap them 5 lop:

1. Answer-first openings cho moi template co index intent
2. Schema strategy ro rang theo tung class
3. HubSpot-style pillar / cluster / internal-link architecture ro hon
4. Performance guardrails o cap block, khong chi cap page
5. Route checklist de review sample page va production route gan nhat

## HubSpot-inspired principles ap dung

Tham chieu cach HubSpot mo ta ve `pillar content + cluster content + hyperlinks` va cach to chuc content theo topic cluster:

- Pillar page phai comprehensive va ungated
- Cluster pages phai giai quyet tung subtopic ro rang
- Internal links giua pillar va cluster la cot song cua topical authority
- Opening section can giup nguoi doc hieu nhanh page tra loi dieu gi
- Heading structure phai map dung search intent, khong viet lan man quanh keyword

Nguon tham khao:

- [HubSpot pillar page examples](https://blog.hubspot.com/marketing/pillar-page-examples)
- [HubSpot quality content and topic clusters](https://blog.hubspot.com/website/quality-content)

## Audit tong quan theo nhom

### 1. Performance templates

Da tot:

- intent ro
- CTA manh
- block order don gian
- kha nang load nhanh cao

Can nang cap:

- them answer-first summary 40-60 tu cho nhung page co kha nang index
- quy dinh schema toi thieu cho fee / event / FAQ states
- tach ro media lazy-load va block nao duoc phep hydrate

### 2. SEO / Authority templates

Da tot:

- dung logic pillar / campus / local
- co internal-link intent ro
- phu hop giu brand authority

Can nang cap:

- TOC / answer-first / entity cues can duoc coi la bat buoc
- can checklist “pillar phai link 2 chieu toi cluster”
- local pages can co local proof uniqueness de tranh doorway risk

### 3. Mid-funnel / Nurturing templates

Da tot:

- phuc vu comparison, FAQ, parent hub
- dung de tang assisted conversion

Can nang cap:

- comparison pages can co interpretation sau bang
- FAQ pages can co topic tabs va HTML crawlable
- articles can co author / updated date / FAQ / TOC theo chuan hub content

### 4. System / Utility templates

Da tot:

- da xac dinh duoc homepage, thank-you, objection, retention

Can nang cap:

- homepage can co stronger “route-first SEO structure”
- thank-you / retention pages can quy dinh ro index / noindex
- objection pages can co FAQ schema va proof mapping ro hon

## Nang cap bat buoc cho moi template class

### Class A — Fee Capture Landing

- Them answer-first hero summary
- Schema uu tien: `WebPage`, `FAQPage`, `BreadcrumbList`
- Internal links toi money page, admissions hub, campus page
- Performance: text-first hero, form SSR, media toi thieu

### Class B — Campus Tour

- Quick facts panel som tren page
- Schema uu tien: `LocalBusiness`, `Place`
- Review theo campus la bat buoc
- Map lazy-load

### Class C — Open Day / Event

- Summary box “event nay danh cho ai”
- Schema uu tien: `Event`
- Timeline semantic, countdown nhe
- Internal links toi campus + admissions

### Class D — Trial Class

- Pain-point answer-first
- FAQ ngan cho logistics
- Schema: `WebPage`, `FAQPage`
- Video lazy-load, booking block nhe

### Class F — TikTok / Reels

- Hook ngan + one-line answer block
- Metadata van phai ro nghia
- Chi giu 1-2 internal links
- Mobile-first va media compression la bat buoc

### Class 6 — Level Pillar

- Answer-first paragraph + TOC bat buoc
- Cluster links hai chieu
- Schema: `WebPage`, `ItemList`, `FAQPage`
- Text-first sections, media lazy-load

### Class 7 — Master Campus Profile

- Local summary 40-60 tu
- Map, dia chi, hotline o man dau
- Schema: `LocalBusiness`, `Review`, `Place`
- Campus proof phai unique

### Class 8 — Local Intent

- Quick answer block bat buoc
- Link ve campus profile + pillar + admissions
- Schema: `WebPage`, `FAQPage`
- Unique intro/local proof bat buoc

### Class 9 — Parent Hub Article

- TOC bat buoc cho bai dai
- Intro answer-first
- Author / updated date / related posts
- Schema: `Article`, `FAQPage`

### Class 10 — Comparison Engine

- Table semantic + interpretation block
- FAQ chot objection sau bang
- Schema: `WebPage`, `FAQPage`
- Mobile table phai de doc

### Class 11 — AI-Ready FAQ

- Tabs theo chu de
- Accordion crawlable
- CTA duoi moi nhom cau hoi
- Schema: `FAQPage`

### Class 12 — Homepage

- Hero phai route user ngay
- Quick filter la thanh phan trung tam
- Schema: `Organization`, `WebSite`
- Hero video phai co fallback va lazy strategy

### Class 13 — Smart Thank-You

- Next steps ro rang theo form type
- Noindex theo production role
- Giu tracking chinh xac, UI rat nhe

### Class 14 — Dynamic Comparison

- Intro/outro unique cho tung page
- Dynamic table SSR
- Data governance theo quy
- Schema: `WebPage`, `FAQPage`

### Class 15 — Objection Handler

- Opening tra loi thang objection
- Proof mapping theo tung objection
- Schema: `FAQPage`
- CTA phai dan sang trial / tour / fee page

### Class 16 — Retention & Referral

- Utility-first copy
- Reward / loyalty logic minh bach
- Co the noindex tuy role
- Form va CTA phai nhe, khong salesy

## Brand guideline checks can giu tren moi template

- Khong dung giong “ep mua ngay”
- Khong dung stock photo
- Khong “so 1”, “duy nhat”, “tot nhat” neu khong co proof
- Luon noi ro phu huynh nhan duoc gi va buoc tiep theo la gi
- PH / HS that, campus that, review that, data that
- Homepage, pillar, campus, landing, parent hub, FAQ moi loai deu phai dung dung voice layer cua minh

## Sample routes de review

| Template | Sample route | Production-near route |
| --- | --- | --- |
| Class A | `/mau-template/class-a-fee-capture/` | `/hoc-phi` |
| Class B | `/mau-template/class-b-campus-tour/` | `/co-so/go-vap-phan-huy-ich` |
| Class C | `/mau-template/class-c-open-day/` | `/open-day` |
| Class D | `/mau-template/class-d-trial-class/` | `/hoc-thu` |
| Class F | `/mau-template/class-f-tiktok-ugc/` | `/tuyen-sinh/mam-non-go-vap-video` |
| Class 6 | `/mau-template/class-level-pillar/` | `/mam-non` |
| Class 7 | `/mau-template/class-master-campus-profile/` | `/co-so/go-vap-phan-huy-ich` |
| Class 8 | `/mau-template/class-local-intent/` | `/tuyen-sinh/mam-non-go-vap` |
| Class 9 | `/mau-template/class-parent-hub-article/` | `/phu-huynh/cach-chon-truong-mam-non` |
| Class 10 | `/mau-template/class-comparison-engine/` | `/so-sanh/viet-anh-va-truong-cong` |
| Class 11 | `/mau-template/class-ai-ready-faq/` | `/faq` |
| Class 12 | `/mau-template/class-homepage/` | `/` |
| Class 13 | `/mau-template/class-smart-thank-you/` | `/thank-you/fee` |
| Class 14 | `/mau-template/class-dynamic-comparison/` | `/so-sanh/viet-anh-va-song-ngu-khac` |
| Class 15 | `/mau-template/class-objection-handler/` | `/giai-toa-lo-lang/hoc-phi-cao-co-dang-khong` |
| Class 16 | `/mau-template/class-retention-referral/` | `/gioi-thieu-ban-be` |

## Thu tu nang cap uu tien

1. Homepage
2. Level Pillar
3. Master Campus Profile
4. Fee Capture Landing
5. AI-Ready FAQ
6. Parent Hub Article
7. Comparison Engine
8. Local Intent
9. Trial Class / Campus Tour
10. Cac utility templates con lai

## Viec can lam tiep theo

1. Dua `answer-first + schema + internal-link graph + performance guardrails` vao Directus fields
2. Chuyen sample pages thanh “production check pages” cho QA staging
3. Tiep tuc tao sample content co dau tieng Viet that su cho 16 routes
4. Kiem tra tung route bang build + Core Web Vitals + heading audit truoc khi scale content
