#!/usr/bin/env python3
"""
Generate the Apps Script .gs file that updates the target Google Sheet
with all v2 tabs from the JSON payload.
"""
import json
import os

OUT = os.path.dirname(os.path.abspath(__file__))
PAYLOAD = os.path.join(OUT, "v2_payload.json")
GS_OUT  = os.path.join(OUT, "update-meta-ads-v2.gs")

with open(PAYLOAD, encoding="utf-8") as f:
    p = json.load(f)

# Compact JSON for embedding — minify
data_js = json.dumps(p, ensure_ascii=False, separators=(",", ":"))
# Escape backticks and ${ for template literals — but we'll embed as a JS literal via JSON.parse(...)
# Use single-quoted string with proper escaping (much smaller payload than nested arrays)
escaped = data_js.replace("\\", "\\\\").replace("'", "\\'")

gs = f"""/**
 * LION CAMP 2026 — META ADS v2 Sheet Builder
 * Target sheet: 1S9Swut4yBFQ3LqQfgyTUQbqUjnP6k2V_5ogxmIQgKNE
 *
 * RUN: 1) Open the Google Sheet
 *      2) Extensions → Apps Script
 *      3) Paste this file content + Save
 *      4) Run `buildAll` (grant permissions on first run)
 *
 * The script will create/replace 11 tabs:
 *   0_HƯỚNG_DẪN, 1_Pixel_Events, 2_Audiences, 3_Campaigns, 4_AdSets,
 *   5_Ads_Creative, 6_Ad_Copy_Full, 7_Creative_Brief, 8_Budget_Pacing,
 *   9_KPI_Targets, 10_Checklist_GoLive
 *
 * Existing data on these tabs WILL BE REPLACED.
 */

const SPREADSHEET_ID = '1S9Swut4yBFQ3LqQfgyTUQbqUjnP6k2V_5ogxmIQgKNE';

// ---- COMPACT v2 PAYLOAD (auto-generated) ----------------------------------
const PAYLOAD = JSON.parse('{escaped}');
// ---------------------------------------------------------------------------

const COLORS = {{
  title:   {{ bg: '#305496', fg: '#FFFFFF' }},
  header:  {{ bg: '#1F4E78', fg: '#FFFFFF' }},
  banded:  '#D9E1F2',
}};

function buildAll() {{
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

  writeSheet_(ss, '0_HƯỚNG_DẪN',
    '📘 LION CAMP 2026 — META ADS BULK v2 (60 NGÀY CUỐI)',
    ['Topic', 'Chi tiết'],
    PAYLOAD.guide,
    [220, 900]);

  writeSheet_(ss, '1_Pixel_Events',
    '📊 META PIXEL + 8 CONVERSION EVENTS (CAPI ready)',
    ['Priority', 'Event Name', 'Trigger', 'Value (VND)', 'Custom Conversion?'],
    PAYLOAD.pixel_events,
    [80, 230, 420, 130, 180]);

  writeSheet_(ss, '2_Audiences',
    '🎯 AUDIENCE STRATEGY — 17 AUDIENCES',
    ['Type', 'Audience Name', 'Source/Definition', 'Size Est.', 'Duration', 'Used In'],
    PAYLOAD.audiences,
    [80, 230, 420, 110, 90, 230]);

  writeSheet_(ss, '3_Campaigns',
    `🎯 24 CAMPAIGNS — Lion Camp 2026 (${{fmt_(PAYLOAD.total_budget_vnd)}} VND / ${{PAYLOAD.days}} ngày)`,
    ['Campaign Name','Region','Level','Funnel','Slot Goal','Objective','CBO?','Daily Budget (VND)','Total Budget (VND)','Bid Strategy','Start','End','Special Ad Category'],
    PAYLOAD.campaigns.map(r => [r[0], r[1], r[2], r[3], r[4], r[5], r[6], fmt_(r[7]), fmt_(r[8]), r[9], r[10], r[11], r[12]]),
    [280, 100, 80, 80, 80, 320, 220, 150, 150, 200, 100, 100, 160]);

  writeSheet_(ss, '4_AdSets',
    '📁 96 AD SETS (24 Campaigns × 4 Ad Sets)',
    ['Campaign','Ad Set Name','Audience','Exclude','Locations','Age','Gender','Placement','Daily Budget (VND)','Optimization','Attribution','Pacing'],
    PAYLOAD.adsets.map(r => [r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7], fmt_(r[8]), r[9], r[10], r[11]]),
    [280, 320, 320, 220, 320, 70, 70, 240, 140, 240, 150, 100]);

  writeSheet_(ss, '5_Ads_Creative',
    `🎨 ${{PAYLOAD.ads.length}} ADS — 30 unique creatives × adsets matched theo funnel`,
    ['Campaign','Ad Set','Ad Name','Format','Theme','Primary Text Hook','Headline','CTA Button','Landing URL'],
    PAYLOAD.ads,
    [280, 320, 360, 260, 110, 420, 260, 150, 480]);

  writeSheet_(ss, '6_Ad_Copy_Full',
    '✍️ AD COPY FULL — Vietnamese (15 themes)',
    ['Theme', 'Primary Text (Full)', 'Headline (40 chars)', 'Description / CTA'],
    PAYLOAD.ad_copy_full,
    [160, 640, 260, 220]);

  writeSheet_(ss, '7_Creative_Brief',
    '🎬 CREATIVE BRIEF — Cho team Design & Video (10 assets)',
    ['Asset ID', 'Format', 'Dimension', 'Duration', 'Scene/Script', 'Voice-over/Caption', 'Key Visual'],
    PAYLOAD.creative_briefs,
    [110, 110, 110, 80, 480, 220, 220]);

  writeSheet_(ss, '8_Budget_Pacing',
    '💰 BUDGET PACING — 60 NGÀY (8 tuần)',
    ['Tuần','Period','Quiz','VSL','Sales','RMK','Total Daily','Weekly Total','Note'],
    PAYLOAD.pacing.map(r => [r[0], r[1], fmt_(r[2]), fmt_(r[3]), fmt_(r[4]), fmt_(r[5]), fmt_(r[6]), fmt_(r[7]), r[8]]),
    [80, 130, 110, 110, 110, 110, 120, 130, 320]);

  writeSheet_(ss, '9_KPI_Targets',
    '🎯 KPI TARGETS — Per Campaign (24 rows)',
    ['Campaign','Funnel','Slot Goal','Target CPM','Target CTR','Target CPC','Target CPL (VND)','Booking Rate','Show Rate','Close Rate','Min Daily','Scale Threshold','Kill Threshold'],
    PAYLOAD.kpi.map(r => [r[0], r[1], r[2], r[3], r[4], r[5], fmt_(r[6]), r[7], r[8], r[9], fmt_(r[10]), r[11], r[12]]),
    [280, 80, 70, 150, 100, 100, 150, 110, 110, 110, 120, 320, 240]);

  writeSheet_(ss, '10_Checklist_GoLive',
    '✅ META ADS CHECKLIST — Trước Go-Live',
    ['Nhóm', 'Item', 'Done'],
    PAYLOAD.checklist.map(r => [r[0], r[1], '']),
    [120, 700, 70]);

  // Reorder tabs
  reorder_(ss, [
    '0_HƯỚNG_DẪN','1_Pixel_Events','2_Audiences','3_Campaigns','4_AdSets',
    '5_Ads_Creative','6_Ad_Copy_Full','7_Creative_Brief','8_Budget_Pacing',
    '9_KPI_Targets','10_Checklist_GoLive'
  ]);

  SpreadsheetApp.getActive().toast('✅ Build v2 hoàn tất — 11 tabs đã được cập nhật.', 'Lion Camp 2026', 8);
}}

function fmt_(v) {{
  if (typeof v === 'number') {{
    return v.toLocaleString('en-US');
  }}
  return v;
}}

function writeSheet_(ss, name, title, headers, rows, widths) {{
  let sh = ss.getSheetByName(name);
  if (sh) {{ sh.clear(); }} else {{ sh = ss.insertSheet(name); }}

  // Title
  sh.getRange(1, 1, 1, headers.length).merge();
  sh.getRange(1, 1).setValue(title)
    .setFontWeight('bold').setFontSize(14)
    .setFontColor(COLORS.title.fg)
    .setBackground(COLORS.title.bg)
    .setVerticalAlignment('middle');
  sh.setRowHeight(1, 32);

  // Header row at row 3
  const hdrRange = sh.getRange(3, 1, 1, headers.length);
  hdrRange.setValues([headers])
    .setFontWeight('bold')
    .setFontColor(COLORS.header.fg)
    .setBackground(COLORS.header.bg)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setWrap(true);
  sh.setRowHeight(3, 36);

  // Body
  if (rows.length > 0) {{
    const bodyRange = sh.getRange(4, 1, rows.length, headers.length);
    bodyRange.setValues(rows)
      .setFontFamily('Arial').setFontSize(10)
      .setVerticalAlignment('top')
      .setWrap(true);

    // Banding
    for (let i = 0; i < rows.length; i++) {{
      if (i % 2 === 0) {{
        sh.getRange(4 + i, 1, 1, headers.length).setBackground(COLORS.banded);
      }}
    }}
  }}

  // Borders
  const totalRows = 3 + rows.length;
  if (totalRows >= 3) {{
    sh.getRange(3, 1, totalRows - 2, headers.length)
      .setBorder(true, true, true, true, true, true, '#CCCCCC', SpreadsheetApp.BorderStyle.SOLID);
  }}

  // Widths
  if (widths) {{
    widths.forEach((w, i) => sh.setColumnWidth(i + 1, w));
  }}

  // Freeze
  sh.setFrozenRows(3);
}}

function reorder_(ss, order) {{
  // Move each in order to position 1..N
  for (let i = 0; i < order.length; i++) {{
    const sh = ss.getSheetByName(order[i]);
    if (sh) {{
      ss.setActiveSheet(sh);
      ss.moveActiveSheet(i + 1);
    }}
  }}
}}

// Optional: clean up old/legacy tabs not in v2 list (DOES NOT DELETE — only logs)
function listLegacyTabs() {{
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const v2 = new Set(['0_HƯỚNG_DẪN','1_Pixel_Events','2_Audiences','3_Campaigns','4_AdSets',
    '5_Ads_Creative','6_Ad_Copy_Full','7_Creative_Brief','8_Budget_Pacing','9_KPI_Targets','10_Checklist_GoLive']);
  const all = ss.getSheets().map(s => s.getName());
  const legacy = all.filter(n => !v2.has(n));
  Logger.log('Legacy tabs (not in v2): ' + JSON.stringify(legacy));
  return legacy;
}}
"""

with open(GS_OUT, "w", encoding="utf-8") as f:
    f.write(gs)

print(f"Generated → {GS_OUT}")
print(f"Size: {os.path.getsize(GS_OUT) / 1024:.1f} KB")
