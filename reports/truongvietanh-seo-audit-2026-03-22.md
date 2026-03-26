# SEO Audit Report: truongvietanh.com

Audit date: 2026-03-22

Method:
- LibreCrawl crawl on VPS
- Live HTTP/HTML verification on representative URLs

Notes:
- LibreCrawl saved duplicate URL rows in this run, so the report uses deduped counts where possible.
- Saved crawl rows are larger than distinct URL count; issue prioritization below follows distinct affected URLs.

## Overview

| Metric | Value | Notes |
| --- | ---: | --- |
| Site | https://truongvietanh.com/ | WordPress behind Cloudflare + LiteSpeed |
| Saved crawl rows | 2613 | Raw URL rows in crawl database |
| Distinct URLs | 1472 | Deduped by URL for reporting |
| Discovered URLs | 3017 | Seen during crawl expansion |
| Links captured | 145893 | Internal and external links recorded |
| Total issues (raw) | 5397 | Raw issue rows |
| Distinct issue + URL pairs | 4795 | Better approximation of real issue footprint |
| Saved HTTP status pattern | 200 only | No large 4xx/5xx cluster found in saved dataset |

## Issue Summary

| Priority | Issue | Category | Distinct URLs Affected | Interpretation |
| --- | --- | --- | ---: | --- |
| High | Images Without Alt Text | Accessibility | 1482 | Sitewide image/accessibility issue |
| High | Missing Meta Description | SEO | 1067 | Large-scale metadata gap |
| High | Title Too Long | SEO | 1014 | SERP title optimization issue |
| Medium | Moderate Response Time | Performance | 853 | Many pages slower than ideal |
| Medium | Meta Description Too Long | SEO | 194 | Snippet truncation risk |
| Medium | Canonical URL Different | Technical | 50 | Mostly unicode/emoji slug mismatch |
| Medium | Title Too Short | SEO | 50 | Weak title relevance on some pages |
| Medium | Meta Description Too Short | SEO | 41 | Thin snippets on some pages |
| Medium | Slow Response Time | Performance | 35 | Page-level performance outliers |
| Low | Missing Canonical URL | Technical | 1 | Isolated page/template issue |
| Low | Missing H1 Tag | SEO | 1 | Isolated page/template issue |
| Low | Missing Language Attribute | Accessibility | 1 | Isolated page/template issue |
| Low | Missing OpenGraph Tags | Social | 1 | Isolated page/template issue |
| Low | Missing Title Tag | SEO | 1 | Isolated page/template issue |
| Low | Missing Twitter Card Tags | Social | 1 | Isolated page/template issue |
| Low | Missing Viewport Meta Tag | Mobile | 1 | Isolated page/template issue |
| Low | No Structured Data | Structured Data | 1 | Isolated page/template issue |
| Low | Thin Content | Content | 1 | Isolated content issue |

## Live Checks

| URL | Result | Notes |
| --- | --- | --- |
| https://truongvietanh.com/ | Healthy homepage | Has title, meta description, canonical, OG, Twitter, JSON-LD, `lang="vi"` and viewport |
| https://truongvietanh.com/lanh-dao/ | 301 redirect | Redirects to `/gioi-thieu/giao-vien-truong-viet-anh/`; old URL should be cleaned from internal references if still linked |

## Representative URLs by Issue

| Issue | Example URLs |
| --- | --- |
| Missing Meta Description | `/✈du-lich-han-quoc-re-nhu-chuyen-di-trong-nuoc-ban-co-tin-khong/`, `/🏆🏆🏆-niem-vui-lon-cua-thay-va-tro-truong-viet-anh/`, `/🏆-chuc-mung-cao-thu-ielts-truong-viet-anh-🏆/` |
| Title Too Long | `/✈du-lich-han-quoc-re-nhu-chuyen-di-trong-nuoc-ban-co-tin-khong/`, `/🏆🏆🏆2019-danh-dau-nam-day-ap-thanh-cong-hoc-sinh-viet-anh/`, `/🏔✈-chan-cho-gi-khi-thanh-xuan-sap-qua-lap-team-di-ngay-tour-sapa-lao-cai-ha-noi-3-ngay-3-dem/` |
| Images Without Alt Text | `/`, `/✈du-lich-han-quoc-re-nhu-chuyen-di-trong-nuoc-ban-co-tin-khong/`, `/🏆🏆🏆-niem-vui-lon-cua-thay-va-tro-truong-viet-anh/` |
| Moderate Response Time | `/🏆🏆🏆-niem-vui-lon-cua-thay-va-tro-truong-viet-anh/`, `/🏆-chuc-mung-cao-thu-ielts-truong-viet-anh-🏆/`, `/📢-su-kien-thang-8-khong-the-bo-lo-music-talshow-2018/` |
| Canonical URL Different | `/`, `/✈du-lich-han-quoc-re-nhu-chuyen-di-trong-nuoc-ban-co-tin-khong/`, `/🏆🏆🏆-niem-vui-lon-cua-thay-va-tro-truong-viet-anh/` |
| Missing H1 / Structured Data / Canonical / Viewport | `/lanh-dao/` | Legacy URL that now redirects |

## Slowest Pages

| Response Time (ms) | URL |
| ---: | --- |
| 5985.2 | https://truongvietanh.com/thuc-don-tuan-1-thang-12-nam-2018-tu-ngay-03122018-09122018/ |
| 5809.9 | https://truongvietanh.com/thuc-don-tuan-3-thang-12-tu-ngay-17122018-23122018/ |
| 5312.1 | https://truongvietanh.com/cam-con-yeu-som-phu-huynh-co-the-gat-trai-dang/ |
| 5311.6 | https://truongvietanh.com/khoanh-khac-thay-tro-2018-anh-du-thi-lop-11a2/ |
| 5274.7 | https://truongvietanh.com/khoanh-khac-thay-tro-2018-anh-du-thi-lop-8a1/ |
| 5251.8 | https://truongvietanh.com/thuc-don-tuan-5-thang-12/ |
| 5246.2 | https://truongvietanh.com/khoanh-khac-thay-tro-2018-anh-du-thi-lop-12b1/ |
| 5128.9 | https://truongvietanh.com/khoanh-khac-thay-tro-2019-anh-du-thi-lop-12c1/ |
| 4918.8 | https://truongvietanh.com/khoanh-khac-thay-tro-2019-anh-du-thi-lop-6a2/ |
| 4732.8 | https://truongvietanh.com/khoanh-khac-thay-tro-2018-anh-du-thi-lop-12a1/ |

## Largest Pages

| Size (KB) | URL |
| ---: | --- |
| 512.4 | https://truongvietanh.com/lanh-dao/ |
| 353.6 | https://truongvietanh.com/diem-chuan-lop-10-nam-2014-tang-cao/ |
| 188.3 | https://truongvietanh.com/tp-hcm-da-co-diem-chuan-vao-lop-10-thpt/ |
| 159.5 | https://truongvietanh.com/khoa-he-summer-got-talents-2017-uu-dai/ |
| 159.0 | https://truongvietanh.com/truong-quoc-te-viet-anh-6-buoc-giup-hoc-tieng-anh-hieu-qua/ |
| 157.2 | https://truongvietanh.com/thuc-don-tuan-2-thang-5-95-135/ |

## Recommended Fix Order

| Order | Focus Area | Why |
| ---: | --- | --- |
| 1 | Title + meta description templates | Largest SEO gain across the biggest number of URLs |
| 2 | Image alt text cleanup | Sitewide accessibility and image SEO improvement |
| 3 | Canonical and permalink normalization | Prevents canonical ambiguity on old unicode/emoji slugs |
| 4 | Internal link and redirect cleanup | Remove references to legacy URLs like `/lanh-dao/` |
| 5 | Performance optimization on slow legacy posts | Improves crawl efficiency and user experience |
