# LoomLike — Masterplan

> **Tagline:** *"Loom-quality async video. Your storage. $5/month."*

---

## 1. App Overview & Objectives

**LoomLike** is a screen + camera recording and sharing platform that competes head-on with Loom, Vidyard, and Scribe — but with a radically different cost structure. Instead of paying for cloud video storage on behalf of users, LoomLike connects to the user's **own** cloud storage (Google Drive, OneDrive, Mega, and more) and uses that as the video host. LoomLike provides the recording tools, the streaming/sharing layer, the AI-powered transcript and intelligence features, and the polished viewing experience.

The result: a product that *feels* like Loom Premium but costs **$5/month flat**, because LoomLike never pays for a single gigabyte of video storage.

**Primary objective:** Become the go-to budget-friendly Loom alternative for solo creators, small teams, educators, and tech-savvy users who already have unused cloud storage and resent paying SaaS markups for it.

**Secondary objective:** Build a feature set rich enough — interactive transcripts, AI summaries, auto-chapters, filler-word removal, multilingual translation — that price-conscious users *and* feature-conscious users both choose LoomLike.

---

## 2. Target Audience

The launch focus is on users who feel Loom's pricing is unjustified and who already live inside cloud-storage ecosystems:

- **Solo creators, freelancers, and consultants** sending walkthrough videos to clients
- **Small remote teams and startups** that need async video communication without the $12.50–$15/seat/month bill
- **Educators, tutors, and online coaches** recording lessons regularly
- **Developers and tech-savvy users** who actively prefer "bring your own storage" for control and privacy
- **Students** doing study explanations and group project recordings

These users share three traits: they record videos *often*, they already use Google Drive / OneDrive heavily, and they are price-sensitive.

---

## 3. Core Features & Functionality

### 3.1 Recording (the front door)
- **Screen recording** — full desktop, single window, or specific browser tab
- **Camera-only recording** — webcam selfie videos
- **Screen + camera (picture-in-picture)** — the classic Loom look with a draggable, resizable webcam bubble
- **Microphone + system audio capture** — for narration and capturing in-app sounds
- **Recording controls** — pause/resume, countdown, drawing/annotation overlay, mouse-click highlights
- **Unlimited recording length** (subject to user's cloud storage capacity)

### 3.2 Storage (the differentiator)
- **OAuth connections** to Google Drive, Microsoft OneDrive, and Mega at launch
- Videos uploaded **directly** from the user's device to their connected cloud — never touching LoomLike servers
- A dedicated `LoomLike/` folder is created in the user's storage to keep things tidy
- **Multi-account support** — users can connect more than one storage provider and choose where each recording lives
- Future-proofed for: Dropbox, iCloud, Box, pCloud, S3-compatible, self-hosted (Nextcloud)

### 3.3 Sharing & Viewing
- Every recording gets a clean **shareable link** (e.g., `loomlike.app/v/abc123`)
- The video streams from the user's cloud (proxied/signed-URL based) inside LoomLike's branded player
- **Viewer privacy controls** — public link, password-protected, email-restricted, expiring links
- **Engagement tracking** — view count, watch-through percentage, who watched (if signed in)
- **Reactions, emoji, and threaded comments** at specific timestamps
- **Embed support** — paste a LoomLike video into Notion, Slack, email, websites

### 3.4 Interactive Transcripts (the *must-have*)
- Automatically generated for every video
- **Word-level timestamps** — click any word to jump to that exact second
- **Full-text search** within the transcript ("find where I said 'pricing'")
- Editable transcripts (fix mis-transcriptions, then re-export)
- Downloadable as `.txt`, `.srt`, or `.vtt`

### 3.5 AI Intelligence Layer (the *premium feel*)
- **Auto-generated titles and descriptions**
- **Video summaries / TL;DR** at the top of every video
- **Auto-chapters** — the video is broken into named sections automatically
- **Filler word removal** *(transcript-clean in v1; auto-cut video in v2)*
- **Translated transcripts** — view any video's transcript in 50+ languages
- **AI Q&A** *(future)* — "What did the speaker say about deadlines?" answered with timestamped citations

### 3.6 Account & Subscription
- Email/password + social sign-in (Google, Microsoft, GitHub)
- **Free tier:** limited recordings/month, 5-minute cap, watermarked, basic transcript
- **Pro tier — $5/month:** unlimited recordings, full AI suite, no watermark, viewer analytics, custom branding
- **Team tier *(future)*:** shared workspaces, role permissions, centralized billing

---

## 4. Platform Strategy

LoomLike will ship on **three surfaces**, sharing as much code as possible:

1. **Web app** (`app.loomlike.com`) — the home base for viewing, library management, transcripts, settings, billing
2. **Chrome extension** — quick "record now" button in the browser toolbar; ideal for casual/tab recordings
3. **Desktop app (macOS + Windows)** — for power users, longer recordings, system audio capture, higher quality

> **Why both browser and desktop?** Browser-based recording is the lowest friction (zero install), perfect for the 80% of casual recordings. The desktop app gives professional users uncompromised quality, system-audio access, and reliability for hour-long recordings — things browser APIs can't match.

---

## 5. High-Level Technical Stack Recommendations

> *All recommendations below are at the architecture level. No code, just direction.*

### 5.1 Web App Frontend
- **Next.js (React) with TypeScript** — fast to ship, SEO-friendly for marketing/shared video pages, huge ecosystem
- **Tailwind CSS + shadcn/ui** — modern, clean component system that matches the Loom aesthetic
- **TanStack Query** for data fetching and caching

### 5.2 Chrome Extension
- **Manifest V3 + React** — share UI components with the web app to avoid duplication
- Uses the browser's `MediaRecorder`, `getDisplayMedia`, and `getUserMedia` APIs

### 5.3 Desktop App — *the big "not Electron" decision*

**Recommendation: Tauri (Rust core + React frontend).**

| Option | Bundle Size | RAM Usage | Verdict |
|---|---|---|---|
| **Tauri** | ~10 MB | ~80 MB | ✅ **Recommended.** Native webview, Rust backend, can reuse your React components. Modern, fast, secure. |
| **Electron** | ~120 MB | ~400 MB | ❌ The very thing we're avoiding. |
| **Wails (Go + webview)** | ~15 MB | ~100 MB | Good runner-up if the team prefers Go over Rust. |
| **Flutter Desktop** | ~25 MB | ~150 MB | Possible, but you'd rewrite UI in Dart — no code reuse with web. |
| **Native (Swift + WinUI)** | smallest | lowest | Best performance, but two codebases — too much overhead for a small team. |

**Why Tauri wins for LoomLike:**
- 10× smaller binary and 4–5× less RAM than Electron — *critical* for a video-recording app where every MB of RAM matters
- Reuses your React/Tailwind/shadcn frontend code from the web app — one design system, three platforms
- Rust core gives you safe, fast access to native screen-capture APIs (ScreenCaptureKit on macOS, Windows.Graphics.Capture on Windows)
- Auto-updater, code-signing, and packaging tooling are first-class
- Active, well-funded community in 2026

For the actual screen/audio capture, Tauri will call **native OS APIs** through Rust bindings — not browser APIs — which means **better quality, lower CPU usage, true system audio, and no permission quirks**.

### 5.4 Backend
- **Node.js with NestJS** (or Fastify if you prefer leaner) — TypeScript end-to-end, easy hiring pool, great ecosystem for OAuth/SDK integrations
- **GraphQL or tRPC** for the API layer — tRPC if you want maximum velocity and type-safety with a TS frontend
- **BullMQ + Redis** for async jobs (transcription, AI processing, video re-encoding)

### 5.5 Database
- **PostgreSQL** (via Supabase or Neon for managed hosting) — relational data fits perfectly: users, recordings, transcripts, comments, permissions
- **Redis** — caching, queues, real-time presence
- **Meilisearch or Typesense** — fast full-text search across transcripts (becomes a killer feature: "search all my videos")

### 5.6 Authentication
- **Clerk** or **Supabase Auth** — handles email/password, social logins, MFA, sessions out of the box. Saves weeks of work.
- **OAuth 2.0** flows for connecting Google Drive, OneDrive, Mega

### 5.7 AI & Transcription
- **Phase 1 (launch):** OpenAI Whisper API for transcription (~$0.006/min)
- **Phase 2 (scale):** Self-hosted Whisper on dedicated GPU servers (one-time fixed cost, free per video)
- **OpenAI GPT-4o-mini** (or Claude Haiku) for: title generation, summaries, chapter creation, filler-word detection, translations — all cheap per call
- **FFmpeg** (server-side jobs) for video re-cutting in v2's automatic filler-word removal

### 5.8 Payments
- **Stripe** for subscriptions, trials, and invoicing — the industry default for SaaS

### 5.9 Infrastructure
- **Vercel** for the Next.js web app
- **Fly.io or Railway** for the NestJS backend and worker queues (cheap, autoscales)
- **Cloudflare R2 or Backblaze B2** *only* for tiny temporary files (e.g., thumbnails, AI artifacts) — never videos
- **Cloudflare** for CDN, DNS, and the video-streaming proxy layer that signs/serves videos from user clouds

---

## 6. Conceptual Data Model

The data we own is small and text-heavy — all the *bytes* live in users' clouds.

- **User** — id, email, name, plan, billing info, created_at
- **StorageConnection** — user_id, provider (gdrive/onedrive/mega), oauth_tokens (encrypted), default_folder_id, quota_info
- **Recording** — id, user_id, title, description, duration, storage_connection_id, cloud_file_id, cloud_file_path, thumbnail_url, status, privacy_setting, created_at
- **Transcript** — recording_id, language, full_text, segments (JSON with word-level timestamps), edited_at
- **AIArtifact** — recording_id, type (summary/chapters/title/translation), content, model_used, generated_at
- **Comment** — recording_id, user_id (or guest), timestamp_seconds, body, parent_comment_id
- **ViewEvent** — recording_id, viewer_id_or_anonymous, watched_seconds, watched_percent, ip_hash, created_at
- **Subscription** — user_id, stripe_customer_id, plan, status, current_period_end

Notably absent: any "Video" table that stores bytes. We only store *pointers* to the user's cloud.

---

## 7. User Interface Design Principles

- **Loom-familiar, but cleaner** — users coming from Loom should feel instantly at home
- **Calm, focused, minimal** — recording is high-stress; the UI should disappear
- **Dark mode by default** for the recorder, light mode by default for the library and viewer
- **One-click everywhere** — start recording, copy link, share. No multi-step flows for core actions.
- **The viewer page is the product's billboard** — every shared video is a marketing surface, so it must look beautiful, load fast, and clearly say "made with LoomLike"
- **Accessibility from day one** — keyboard navigation, captions, screen-reader support; the transcript actually *helps* accessibility, which is a huge selling point
- **Consistent design system** across web, extension, and desktop — Tauri makes this realistic

---

## 8. Security & Privacy Considerations

This is *especially* important because LoomLike touches users' personal cloud accounts.

- **OAuth tokens encrypted at rest** with envelope encryption (KMS-backed)
- **Least-privilege OAuth scopes** — request only access to LoomLike's own folder in the user's cloud, never their entire Drive
- **Signed, time-limited streaming URLs** — viewers never get raw OAuth tokens; LoomLike's edge proxy fetches and streams
- **End-to-end privacy story** — videos live on the user's storage; LoomLike never holds the bytes. This is a *marketing weapon*, not just a security feature.
- **Privacy controls per video** — public, unlisted, password, email-restricted, expiring
- **GDPR + CCPA compliance** — data export, full account deletion, granular consent
- **Rate limiting & abuse protection** — Cloudflare WAF, per-user rate limits, anti-scraping for shared video pages
- **Audit log** for sensitive actions (storage disconnect, password change, billing changes)
- **SOC 2 readiness** — design controls early; it pays off when selling to teams later

---

## 9. Development Phases & Milestones

### Phase 0 — Foundations (weeks 1–3)
Repos, CI/CD, design system, auth, billing skeleton, Postgres schema, Google Drive OAuth flow working end-to-end.

### Phase 1 — MVP Recorder (weeks 4–8)
Chrome extension + minimal web app. Record (screen + cam + mic) → upload to Google Drive → generate share link → play in branded viewer. **No AI yet.** Goal: someone can record and share a video for free.

### Phase 2 — Transcripts & Sharing (weeks 9–12)
Whisper transcription pipeline. Interactive clickable transcripts. Comments. View analytics. Privacy controls. *This is the moment LoomLike feels like a real Loom competitor.*

### Phase 3 — AI Intelligence (weeks 13–16)
Summaries, auto-titles, auto-chapters, filler-word transcript cleaning, translations. Paid Pro tier goes live at $5/month. Free → Pro conversion funnel.

### Phase 4 — Desktop App (weeks 17–22)
Tauri-based macOS + Windows app. Native screen capture, system audio, longer recordings, offline draft mode. Reuse 80%+ of the React frontend.

### Phase 5 — Storage Expansion (weeks 23–26)
Add OneDrive and Mega. Multi-account support. Storage migration tool.

### Phase 6 — Polish, Teams & Growth (ongoing)
Team workspaces, shared libraries, SSO, advanced analytics, AI Q&A, video editing (trim, redact), in-product templates, public API.

### Phase 7 — Cost Optimization (when volume justifies it)
Self-host Whisper on GPU servers. Reduce per-video AI cost. Possibly self-host LLM for summaries.

---

## 10. Potential Challenges & Solutions

| Challenge | Solution / Mitigation |
|---|---|
| **Streaming video from third-party clouds is slow without smart proxying** | Build a Cloudflare-Worker-based edge proxy that streams with HTTP range requests + caches hot videos at the CDN edge. Pre-generate adaptive bitrate variants on upload. |
| **Users hit Google Drive / OneDrive API quotas during large uploads** | Resumable, chunked uploads. Exponential backoff. Surface quota status to the user. Encourage paid Google/Microsoft accounts. |
| **OAuth token refresh failures break video playback** | Background token refresh jobs. Clear "reconnect storage" UX. Read-only fallback messaging if a connection fails. |
| **Native screen capture is hard to do well cross-platform** | Use OS-native APIs through Tauri's Rust plugins. Budget engineering time for this — it's the heart of the product. |
| **Whisper API costs balloon with viral growth** | Phase 7 plan: self-host Whisper. Also, batch transcription jobs and cache aggressively. |
| **Browser limitations on system audio (especially Mac)** | This is the *exact* reason the desktop app exists. Steer power users there. |
| **Competing with Loom's brand and free tier** | Compete on price ($5 vs $15), feature parity in AI, and the "your storage, your data" privacy story. Niche down to underserved verticals early (developers, educators). |
| **Single point of failure if a storage provider has an outage** | Multi-provider support means a user can connect more than one. Clear status dashboard. Optional "backup to second cloud" Pro feature later. |
| **Copyright/abuse content stored in user's own cloud** | Terms of service push abuse responsibility to the user (it's *their* storage); LoomLike provides a takedown/reporting flow for shared links. |

---

## 11. Future Expansion Possibilities

- **AI Q&A over your video library** — "Find every time the team mentioned Q4 roadmap"
- **Video editing in-browser** — trim, redact PII, blur regions, add captions
- **Asynchronous video threads** — reply to a video with a video (think Slack Huddle, but async)
- **Templates and intro/outro branding** for creators
- **Mobile apps** — iOS + Android, recording on the go (React Native or Flutter)
- **Open ecosystem** — public API, Zapier integration, Slack/Teams/Notion deep integrations
- **Self-hosted "Pro" tier** for enterprises who want LoomLike behind their firewall
- **Marketplace** — paid creators selling premium video courses, with LoomLike taking a small platform fee (still no storage cost!)
- **AI-generated B-roll, captions, and avatars** — increasingly viable as generative video matures

---

## 12. Open Questions for You

A few areas we haven't nailed down yet that would refine this plan further:

1. **Branding** — is "LoomLike" the working name or the real product name? (It works for now but might invite trademark issues; happy to brainstorm.)
2. **Geographic focus at launch** — global English-first, or do you want to localize early (e.g., target a specific region)?
3. **Filler word removal scope** — confirmed transcript-clean for v1; do you want the auto-cut video version on the Phase 3 or Phase 6 roadmap?
4. **Free-tier generosity** — how much do we give away to drive adoption? (Loom is famously generous; this is a key growth lever.)
5. **Team / workspace features** — Phase 6 placement assumed; would you want this earlier if you see B2B as the bigger market?

---

*This is a living document. We'll update it as decisions firm up and the product evolves.*
