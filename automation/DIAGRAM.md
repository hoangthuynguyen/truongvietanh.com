# 🗺 VA Content Automation — Visual Architecture

> Render mermaid diagrams trên: GitHub, GitLab, Notion, Obsidian, hoặc https://mermaid.live

---

## 1️⃣ Master Timeline — 24h Clock

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'fontSize':'14px'}}}%%
gantt
    title VA Content Pipeline — Daily 24h Schedule
    dateFormat HH:mm
    axisFormat %H:%M

    section Workflows
    03 Insight Harvester (every 2h)     :active, ins, 00:00, 24h
    01 Content Master (cron)            :crit, master, 00:00, 25m
    05 Asset Generator (poll every 10m) :crit, asset, 00:10, 6h40m
    06 Review Dispatcher (cron)         :crit, disp, 06:55, 5m
    Anh Dương review (manual)           :review, 07:00, 2h
    02 Approval Callback (webhook)      :active, cb, 07:00, 8h
    04 Performance Tracker (every :30)  :active, track, 00:00, 24h
```

---

## 2️⃣ Macro Flow — 6 Workflows Liên Kết

```mermaid
flowchart TB
    classDef cron fill:#fef3c7,stroke:#f59e0b,color:#78350f,stroke-width:2px
    classDef tool fill:#dbeafe,stroke:#3b82f6,color:#1e3a8a
    classDef airtable fill:#fce7f3,stroke:#ec4899,color:#831843
    classDef decision fill:#f3e8ff,stroke:#a855f7,color:#581c87
    classDef telegram fill:#cffafe,stroke:#06b6d4,color:#164e63
    classDef storage fill:#dcfce7,stroke:#22c55e,color:#14532d
    classDef ai fill:#fef2f2,stroke:#ef4444,color:#7f1d1d

    subgraph WF03 ["📡 Workflow 03 — Insight Harvester (every 2h)"]
        C3[/"Cron 0 */2 * * *"/]:::cron
        GT["Google Trends VN<br/>(public API)"]:::tool
        GHLF["GHL Form Submissions<br/>(REST API)"]:::tool
        FBC["FB Page Owned Comments<br/>(Graph API)"]:::tool
        NORM["Normalize<br/>n8n Code"]
        INS[("insights table<br/>📦 Airtable")]:::airtable
        C3 --> GT & GHLF & FBC --> NORM --> INS
    end

    subgraph WF01 ["🕛 Workflow 01 — Content Master (cron 00:00)"]
        C1[/"Cron 0 0 * * *"/]:::cron
        KS{"Kill switch?<br/>📦 system_flags"}:::decision
        KSON[/"Telegram alert STOP"/]:::telegram
        VC[("voice_cards<br/>📦 Airtable")]:::airtable
        INS2[("insights last 24h<br/>📦 Airtable")]:::airtable
        PAIR["Pair cards × insights<br/>n8n Code"]
        LOOP{{"Loop batch 3 parallel"}}
        IDE["🤖 Claude Sonnet 4.6<br/>Ideate 3 posts/card"]:::ai
        HR{"Hard rules<br/>forbidden / claim / length / child"}:::decision
        SCO["🤖 Claude Haiku 4.5<br/>Soft score 4 dims"]:::ai
        PICK["Pick best + Route"]
        SW{"Tier?"}:::decision
        LARK["📋 Lark Task<br/>→ Ekip quay 48h"]:::tool
        LOG[("content_pipeline<br/>📦 Airtable<br/>status=needs_*")]:::airtable

        C1 --> KS
        KS -->|on| KSON
        KS -->|off| VC & INS2 --> PAIR --> LOOP --> IDE --> HR
        HR -->|fail| LOOP
        HR -->|pass| SCO --> PICK --> SW
        SW -->|Tier 3| LARK --> LOG
        SW -->|Tier 1/2/2.5| LOG
        LOG -.next card.-> LOOP
    end

    subgraph WF05 ["⚙️ Workflow 05 — Asset Generator (poll every 10 min, 00:10-06:50)"]
        C5[/"Cron */10 0-6 * * *"/]:::cron
        FETCH5[("Fetch needs_*<br/>📦 Airtable")]:::airtable
        LOCK["Lock status=generating_assets"]
        SWA{"Format?"}:::decision

        VEO["🎬 Veo 3 (Vertex AI)<br/>cinematic 8s + audio"]:::ai
        KLING["🎨 Kling 2.1 (fal.ai)<br/>cartoon 5s"]:::ai
        HG["👤 HeyGen<br/>avatar Anh Dương"]:::ai
        SWE{"video_engine?"}:::decision

        NB["🖼 nano-banana<br/>Gemini 2.5 Flash Image"]:::ai
        MM["🎙 MiniMax TTS<br/>voice tiếng Việt"]:::ai
        R2[("Cloudflare R2<br/>📦 assets")]:::storage
        AGG["Aggregate URLs"]
        RDY[("status=ready_for_review<br/>📦 content_pipeline")]:::airtable

        C5 --> FETCH5 --> LOCK --> SWA
        SWA -->|carousel/blog| NB --> R2
        SWA -->|reel| SWE
        SWA -->|text only| RDY
        SWE -->|veo3| VEO --> MM
        SWE -->|kling| KLING --> MM
        SWE -->|heygen| HG --> AGG
        MM --> AGG --> R2
        R2 --> RDY
    end

    subgraph WF06 ["📢 Workflow 06 — Review Dispatcher (cron 06:55)"]
        C6[/"Cron 55 6 * * *"/]:::cron
        FETCH6[("Fetch ready_for_review<br/>📦 Airtable")]:::airtable
        SUM["📱 Morning Summary<br/>→ Anh Dương (Telegram)"]:::telegram
        L6{{"Loop 1/3s rate-limit"}}
        TG["📱 Telegram sendMediaGroup<br/>+ 3 buttons ✅✏️❌"]:::telegram
        PND[("status=pending_review<br/>📦 Airtable")]:::airtable

        C6 --> FETCH6 --> SUM --> L6 --> TG --> PND
        PND -.next.-> L6
    end

    subgraph WF02 ["☀️ Workflow 02 — Approval Callback (webhook)"]
        ANH[/"👤 Anh Dương bấm nút"/]
        CB{"Action?"}:::decision
        APP["📤 Publer schedule<br/>(theo posting_rhythm)"]:::tool
        ED[("status=editing<br/>📦 Airtable")]:::airtable
        REJ[("status=rejected<br/>training data")]:::airtable
        PUBD[("status=published<br/>📦 Airtable")]:::airtable

        ANH --> CB
        CB -->|approve| APP --> PUBD
        CB -->|edit| ED
        CB -->|reject| REJ
    end

    subgraph WF04 ["📊 Workflow 04 — Performance Tracker (every :30)"]
        C4[/"Cron 30 * * * *"/]:::cron
        FETCH4[("Fetch published 24h/72h<br/>📦 Airtable")]:::airtable
        FBI["📈 FB Insights API"]:::tool
        GHLI["💰 GHL leads + enrollments"]:::tool
        AGGM["Aggregate"]
        UPD[("Update content_pipeline<br/>engagement_24h/72h<br/>📦 Airtable")]:::airtable

        C4 --> FETCH4 --> FBI & GHLI --> AGGM --> UPD
    end

    INS -.read by.-> INS2
    LOG -.poll.-> FETCH5
    RDY -.read by.-> FETCH6
    PND -.button click.-> ANH
    PUBD -.tracked.-> FETCH4
```

---

## 3️⃣ State Machine — `content_pipeline.status`

```mermaid
stateDiagram-v2
    [*] --> needs_image: Tier 1/2/2.5 carousel/blog
    [*] --> needs_video: Tier 1/2/2.5 reel
    [*] --> needs_text_only: Tier 1/2/2.5 text post
    [*] --> needs_shoot: Tier 3 (ekip quay thật)

    needs_image --> generating_assets: Asset Gen lock
    needs_video --> generating_assets: Asset Gen lock
    needs_text_only --> ready_for_review: skip media gen

    generating_assets --> ready_for_review: media uploaded R2
    generating_assets --> failed: API timeout / error

    ready_for_review --> pending_review: Dispatcher gửi Telegram 06:55

    pending_review --> editing: ✏️ Sửa
    pending_review --> rejected: ❌ Bỏ
    pending_review --> published: ✅ Duyệt → Publer publish

    editing --> ready_for_review: anh edit Airtable xong
    needs_shoot --> ready_for_review: ekip upload video Lark

    rejected --> [*]: training data (fewshot tuần sau)
    published --> tracking: 24h + 72h sau
    tracking --> [*]: metrics aggregated
    failed --> [*]: alert Telegram
```

---

## 4️⃣ Tool Reference — Setup Notes

```mermaid
mindmap
  root((VA Content<br/>Automation Stack))
    Orchestrator
      n8n self-host
        Docker $5-20/mo
        Reuse Astro VPS
    AI Brain
      Claude Sonnet 4.6
        Ideate posts
        $3/1M input
      Claude Haiku 4.5
        Soft score
        $0.80/1M input
      Claude.ai cowork
        Blog longform manual
        Anh Dương dùng UI
    Image
      nano-banana
        Gemini 2.5 Flash Image
        $0.039/image
        ai.google.dev API key
    Video
      Veo 3
        Vertex AI Long-Running
        $0.75/8s clip
        GCP service account
      Kling 2.1
        fal.ai queue API
        $0.30/5s clip
        FAL_KEY
      HeyGen
        1 avatar Anh Dương ONLY
        $89/mo Creator
    Voice
      MiniMax TTS
        Vietnamese voice
        speech-02-hd
    Data
      Airtable
        4 tables
        $300/mo Team 15 user
      Cloudflare R2
        Asset storage
        Anh đã có sẵn
    Routing
      Telegram Bot
        Approval UI
        Free
      Lark Task
        Tier 3 ekip
        Free for VA
    Analytics
      GHL
        Lead attribution
        Anh đã có
      FB Insights API
        Engagement
        Free
      Looker Studio
        Dashboard
        Free
    Publisher
      Publer
        25 kênh schedule
        $12/mo unlimited
```

---

## 5️⃣ Data Flow — Airtable Tables Relationships

```mermaid
erDiagram
    voice_cards ||--o{ content_pipeline : "1 card → many posts"
    insights ||--o{ content_pipeline : "1 insight → many posts"
    system_flags ||--|| voice_cards : "kill_switch gates all"

    voice_cards {
        string channel_name
        enum channel_tier "1|2|2.5|3"
        multi platforms
        multi audience_tags
        text voice_archetype
        text system_prompt
        string buffer_profile_id
        string telegram_chat_id
        enum owner_pod
        bool active
    }

    insights {
        datetime date
        enum source "trends|ghl|fb|manual"
        text raw_text
        multi topic_tag
        multi audience_segment
        int intent_level "1-5"
    }

    content_pipeline {
        datetime created_at
        link voice_card
        link insight_source
        text generated_body
        enum format "carousel|reel|text|blog"
        enum video_engine "veo3|kling|heygen|none"
        enum tier_routed
        enum status "needs_*|generating|ready|pending|published|rejected"
        string utm_content "unique callback key"
        text media_urls "newline-separated R2 URLs"
        int score_total
        text engagement_24h
        text engagement_72h
        int ghl_leads_attributed
        int enrollments_attributed
    }

    system_flags {
        string flag_name "kill_switch"
        string flag_value "on|off"
        datetime updated_at
    }
```

---

## 6️⃣ Setup Order — Dependency Graph

```mermaid
flowchart LR
    classDef phase1 fill:#fef3c7,stroke:#f59e0b
    classDef phase2 fill:#dbeafe,stroke:#3b82f6
    classDef phase3 fill:#dcfce7,stroke:#22c55e
    classDef phase4 fill:#fce7f3,stroke:#ec4899

    A[1. n8n Docker<br/>self-host]:::phase1 --> B
    B[2. Airtable base<br/>+ 4 tables]:::phase1 --> C
    C[3. Insert kill_switch<br/>= off]:::phase1 --> D

    D[4. Get credentials<br/>18 API keys]:::phase2 --> E
    E[5. .env file<br/>+ docker --env-file]:::phase2 --> F

    F[6. Write 25 voice_cards<br/>system_prompts]:::phase3 --> G
    G[7. HeyGen avatar setup<br/>+ MiniMax voice clone]:::phase3 --> H

    H[8. Import 6 workflows<br/>theo thứ tự]:::phase4 --> I
    I[9. Smoke test manual<br/>1 voice_card]:::phase4 --> J
    J[10. Activate all<br/>cron starts 00:00]:::phase4
```

**Thứ tự import 6 workflows trong n8n:**

| # | File | Khi nào activate |
|---|------|-----------------|
| 1 | `03-insight-harvester.json` | NGAY — cần insight data trước |
| 2 | `01-content-master.json` | Sau khi có 25 voice_cards + insights |
| 3 | `05-asset-generator.json` | Sau khi credentials Veo/Kling/HeyGen OK |
| 4 | `06-review-dispatcher.json` | Cùng lúc 05 |
| 5 | `02-approval-callback.json` | Config Telegram bot credential trong n8n trước |
| 6 | `04-performance-tracker.json` | Sau lần publish đầu tiên |

---

## 7️⃣ Per-Tier Decision Tree

```mermaid
flowchart TD
    classDef tier1 fill:#dcfce7,stroke:#22c55e
    classDef tier2 fill:#fef3c7,stroke:#f59e0b
    classDef tier25 fill:#dbeafe,stroke:#3b82f6
    classDef tier3 fill:#fce7f3,stroke:#ec4899

    START{Loại kênh?}
    START -->|"Page chính thức VA<br/>(VA Mầm Non, VA THPT...)"| T1[Tier 1]:::tier1
    START -->|"AI Character trẻ em<br/>(Bé Linh, Robo Bin)"| T2[Tier 2]:::tier2
    START -->|"Thầy/cô thật của VA<br/>(có HĐ KOL nội bộ)"| T25[Tier 2.5]:::tier25
    START -->|"Cần quay người thật<br/>(testimonial phụ huynh)"| T3[Tier 3]:::tier3

    T1 --> T1F{Format?}
    T1F -->|carousel/text| T1A["📦 Generate image nano-banana<br/>📱 Telegram → Anh Dương duyệt"]
    T1F -->|reel| T1B["🎬 Veo 3 cinematic<br/>📱 Telegram → Anh Dương duyệt"]

    T2 --> T2A["🎨 Kling 2.1 cartoon<br/>+ MiniMax voiceover<br/>📱 Telegram → Anh Dương duyệt<br/>⚠️ DISCLOSE #AICharacter"]

    T25 --> T25A["👤 HeyGen Anh Dương avatar<br/>HOẶC clip thầy/cô tự quay<br/>📱 Telegram → thầy/cô THẬT duyệt<br/>⚠️ Cần HĐ KOL"]

    T3 --> T3A["📋 Lark Task → Ekip<br/>quay 48h<br/>Upload → ready_for_review<br/>📱 Telegram → Anh Dương duyệt"]
```

---

## 8️⃣ Cost Breakdown Visual

```mermaid
pie title Monthly Cost Estimate (~$668/mo = ~16M VND)
    "Airtable Team (15 user)" : 300
    "Veo 3 (~150 clips)" : 112
    "HeyGen Creator" : 89
    "Claude API" : 60
    "Kling 2.1 fal.ai" : 45
    "nano-banana" : 30
    "MiniMax TTS" : 15
    "Publer" : 12
    "Cloudflare R2" : 5
```

---

## 9️⃣ KPI Bắc Đẩu — Attribution Chain

```mermaid
flowchart LR
    classDef step fill:#dbeafe,stroke:#3b82f6
    classDef metric fill:#fef3c7,stroke:#f59e0b

    A[Post published<br/>Publer/manual]:::step
    M1[Impressions<br/>+ Engagement]:::metric
    B[Click UTM]:::step
    M2[CTR]:::metric
    C[Landing page<br/>view]:::step
    M3[Bounce rate]:::metric
    D[Form submit<br/>→ GHL contact]:::step
    M4[CPL]:::metric
    E[Meeting booked]:::step
    M5[MQL→SQL rate]:::metric
    F[Enrollment đăng ký]:::step
    M6[⭐ CPE-C<br/>Bắc Đẩu]:::metric

    A --> M1 --> B --> M2 --> C --> M3 --> D --> M4 --> E --> M5 --> F --> M6
```

---

## 🔧 Legend

| Symbol | Meaning |
|--------|---------|
| 🕛 `/Cron .../` | n8n scheduleTrigger node |
| 🤖 | Claude / AI model call |
| 🎬 🎨 👤 | Video generation engines |
| 🖼 🎙 | Image / Voice generation |
| 📦 Airtable | Database operation |
| 📱 Telegram | Notification/approval UI |
| 📋 Lark | Ekip task |
| 📤 Publer | Publish to social channels |
| 📈 💰 | Analytics data sources |
| 💾 R2 | Cloudflare R2 asset storage |
| {decision} | Branching logic |
| -.-> | Polling / async data dependency |
