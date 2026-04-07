# Prototype — FitKoh AI Demo Website

## What This Is

A prototype website built by **Rebelz AI Agency** (Clarence) for **FitKoh & Lionheart Samui** (Tony Olin, owner). This is NOT a copy of fitkoh.com — it's a **dual-purpose demo**:

1. **For Tony & the marketing guy:** A working prototype showing what AI-powered booking + chatbot looks like in practice, with real Stripe test payments
2. **For Rebelz AI's credibility:** A showcase of all the AI services Clarence can provide — from chatbots to AEO/GEO to avatars to construction AI

**Deadline: Thursday April 9, 2026** — Clarence checks out of Koh Samui on Friday.

## Architecture

- **Frontend:** Next.js (React) — mobile-first responsive
- **Backend:** Supabase (auth, database, edge functions if needed)
- **Payments:** Stripe test mode (test keys, no real charges)
- **Chatbot:** OpenAI GPT-4o-mini with FitKoh knowledge base (694 lines)
- **Hosting:** Vercel (instant deploys, free tier)

## Website Sections

### 1. Hero / Welcome
- "What if your fitness camp ran itself?" — hook for Tony
- Brief intro: this is a prototype by Rebelz AI Agency showing what's possible

### 2. AI Services Showcase
Cards/sections showing each service Rebelz can provide:
- **AI Booking Chatbot** — 24/7 multilingual guest assistant (LIVE DEMO on this page)
- **Automated Booking & Payments** — Stripe integration, no manual invoicing (LIVE DEMO)
- **AEO / GEO Optimization** — AI-optimized content for search engines and AI assistants
- **Multilingual Content & Avatars** — HeyGen video demos in 5 languages
- **Ads Automation** — AI-generated ad copy for Google/Meta in any language
- **Smart Review Engine** — Automated review collection at the right moment
- **Staff & Ops Dashboard** — AI-powered scheduling and task management
- **Construction Project Tracker** — Clarence's core expertise, relevant for Tony's expansion

### 3. Pricing / Packages (FitKoh)
- Display FitKoh & Lionheart packages with real pricing
- "Book Now" buttons → Stripe test checkout
- Shows Tony how frictionless online booking could work

### 4. Integrated Chatbot
- Floating WhatsApp-style chat widget (bottom-right)
- Uses the full 694-line knowledge base
- Multilingual (answers in whatever language the guest types)
- Can recommend packages and link to Stripe checkout

### 5. Footer
- Rebelz AI Agency branding
- Contact info
- "Built in 48 hours with AI" tagline

## Key Files (from parent project)

- Knowledge base: `../REBELZ AI AGENCY 2026/workspace/fitkoh-chatbot/knowledge-base.md`
- Original analysis: `../REBELZ AI AGENCY 2026/tony-koh-samui-ai-pitch.md`
- HeyGen scripts: `../REBELZ AI AGENCY 2026/workspace/fitkoh-chatbot/heygen-scripts.md`

## Design Direction

- Dark theme (similar to the pitch deck — blacks, dark blues)
- Red (#E94560) and Gold (#F0A500) accents
- Clean, modern, mobile-first
- NOT a copy of FitKoh's Tilda site — this should look premium and different
- Show Tony what a real website could look like vs their current Tilda setup

## Working Principles

1. Ship fast — Thursday deadline, no perfectionism
2. Mobile-first — the marketing guy will probably view this on his phone
3. Real functionality > pretty mockups — the Stripe checkout and chatbot must actually work
4. Every section should make Tony think "I need this"
