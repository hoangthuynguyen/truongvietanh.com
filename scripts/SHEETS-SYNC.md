# Đồng bộ Sitemap → Google Sheets

Sheet đích: https://docs.google.com/spreadsheets/d/1VvmASwXcTmia_V81u7GXBS-fgaE4n6PbzhVXbzL5ppA/edit

Mỗi lần `npm run build` sẽ chạy `scripts/audit-pages.mjs` sinh ra:
- `public/sitemap-audit.csv` (152 pages)
- `public/sitemap-templates.csv` (7 templates)
- `public/sitemap-forms.csv` (179 forms)
- `src/data/sitemap-audit.json` (cho /sitemap page)

Sau khi deploy, các CSV này có URL public:
- https://truongvietanh.com/sitemap-audit.csv
- https://truongvietanh.com/sitemap-templates.csv
- https://truongvietanh.com/sitemap-forms.csv

## Cách 1 — Apps Script tự pull mỗi giờ (recommended)

Mở sheet → **Extensions → Apps Script** → dán đoạn code dưới → **Triggers** → Add trigger → `syncAll` → Time-driven → Hour timer:

```javascript
const SHEET_ID = '1VvmASwXcTmia_V81u7GXBS-fgaE4n6PbzhVXbzL5ppA';
const SOURCES = [
  { tab: 'Pages',     url: 'https://truongvietanh.com/sitemap-audit.csv' },
  { tab: 'Templates', url: 'https://truongvietanh.com/sitemap-templates.csv' },
  { tab: 'Forms',     url: 'https://truongvietanh.com/sitemap-forms.csv' },
];

function syncAll() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  SOURCES.forEach(({ tab, url }) => {
    const csv = UrlFetchApp.fetch(url + '?t=' + Date.now()).getContentText();
    const data = Utilities.parseCsv(csv);
    let sheet = ss.getSheetByName(tab) || ss.insertSheet(tab);
    sheet.clearContents();
    sheet.getRange(1, 1, data.length, data[0].length).setValues(data);
    sheet.getRange(1, 1, 1, data[0].length).setFontWeight('bold').setBackground('#1a1a5e').setFontColor('#ffffff');
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, data[0].length);
  });
  // Stamp last sync
  const meta = ss.getSheetByName('_meta') || ss.insertSheet('_meta');
  meta.getRange('A1:B1').setValues([['Last sync', new Date().toISOString()]]);
}
```

Bấm **Run** lần đầu để authorize → set trigger 1 giờ/lần.

## Cách 2 — Pull on-demand bằng IMPORTDATA

Trong sheet, chỉ cần dán vào ô A1 của 3 tab:
- Tab `Pages`:     `=IMPORTDATA("https://truongvietanh.com/sitemap-audit.csv")`
- Tab `Templates`: `=IMPORTDATA("https://truongvietanh.com/sitemap-templates.csv")`
- Tab `Forms`:     `=IMPORTDATA("https://truongvietanh.com/sitemap-forms.csv")`

Google cache ~1 giờ, không cần script.

## Cách 3 — GitHub Actions push mỗi commit

Thêm `.github/workflows/sync-sheet.yml` (cần Service Account JSON trong secrets):

```yaml
name: Sync sitemap to Google Sheet
on:
  push:
    paths: ['src/pages/**', 'src/layouts/**', 'src/components/VSL*', 'src/components/SummerCamp*']
jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: node scripts/audit-pages.mjs
      - run: node scripts/push-to-sheet.mjs
        env:
          GOOGLE_SA_KEY: ${{ secrets.GOOGLE_SA_KEY }}
```

(Cần thêm `scripts/push-to-sheet.mjs` dùng `googleapis` — báo nếu cần.)

## Trang nội bộ /sitemap

Đã tạo `https://truongvietanh.com/sitemap` (noindex) — hiển thị table 3 tab có search/filter, link download CSV trực tiếp. Đây là **single source of truth** cho structure hiện tại.
