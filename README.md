---
title: AIR
emoji: 🤖
colorFrom: red
colorTo: yellow
sdk: docker
pinned: false
license: mit
short_description: "AI Replacement Risk Platform"
tags:
  - next.js
  - react
  - ai-impact
  - data-visualization
  - employment
  - automation
---

<div align="center">

# AIR

### AI Replacement Risk Platform

A data-driven interactive platform that visualizes AI's impact on employment — featuring a questionnaire-based risk profiler, industry analysis, and an interactive timeline of AI milestones.

[![Live Demo](https://img.shields.io/badge/Live_Demo-air.democra.ai-ff4444?style=for-the-badge)](https://air.democra.ai)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel)](https://air.democra.ai)
[![Hugging Face Space](https://img.shields.io/badge/%F0%9F%A4%97_Hugging_Face-Space-blue?style=for-the-badge)](https://huggingface.co/spaces/tao-shen/jobless)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

</div>

---

## Overview

**AIR** turns research from MIT, McKinsey, the World Economic Forum, and PwC into an interactive experience. Instead of reading dense reports, users can explore AI's impact on jobs through visualizations, take a questionnaire-based risk profiler to get their 4-letter AIR type, and understand what's coming next.

> *MIT: 11.7% of jobs replaceable now. McKinsey: 57% of work hours technically automatable. WEF: 92M jobs displaced, but 170M new jobs created by 2030.*

## Features

- **AI Replacement Progress Tracker** — Visual representation of where we are on the path to automation (11.7% current → 57% technical ceiling)
- **Interactive Timeline** — Key AI milestones from 2020 (Transformer Architecture) to 2040+ (High Automation Society), with expandable details
- **AIR Risk Profiler** — 16-question questionnaire across 4 dimensions (Exposure, Originality, Flexibility, Preparedness) producing a 4-letter type code (like MBTI) with 16 profile types and 5 risk tiers
- **Industry Deep Dive** — Sector-by-sector analysis across 7 industries with risk levels and evidence
- **Real Layoff Tracker** — Documented cases of AI-driven job cuts from real companies
- **Net Employment Effect** — WEF displacement vs. creation data, PwC wage premium analysis
- **Data Protection Awareness** — How your data trains AI to replace you, with platform-specific agreement analysis
- **Bilingual Support** — Full English / Chinese (中文) interface toggle
- **Dark / Light Theme** — User-selectable theme with persistent preference
- **Share System** — Share results via Twitter, Telegram, WeChat, Weibo with OG image cards and QR code posters

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js](https://nextjs.org/) 16.1.6 (App Router, standalone output) |
| UI | [React](https://react.dev/) 19.2.3, [Tailwind CSS](https://tailwindcss.com/) v4 |
| Animations | [Framer Motion](https://www.framer.com/motion/) |
| Charts | [Recharts](https://recharts.org/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Testing | [Playwright](https://playwright.dev/) (E2E) |
| Deployment | [Vercel](https://vercel.com/) (production), Docker + Hugging Face Spaces |
| Language | TypeScript |

## Project Structure

```
air/
├── app/
│   ├── page.tsx                # Main page — hero, stats, timeline, risk profiler
│   ├── analysis/page.tsx       # Industry analysis, layoff tracker, net impact
│   ├── data-protection/page.tsx# Data protection awareness
│   ├── share/[payload]/        # Share result pages with OG image generation
│   ├── layout.tsx              # Root layout, fonts, metadata, theme
│   ├── globals.css             # Global styles and theme variables
│   └── opengraph-image.tsx     # Dynamic OG image generation
├── components/
│   ├── sections/               # Page sections (SurvivalIndexSection, etc.)
│   ├── share/                  # Share panel & poster components
│   └── NavigationControls.tsx  # Theme toggle, language switch
├── lib/
│   ├── air_quiz_data.ts        # Quiz questions, dimensions, 16 profile types
│   ├── air_quiz_calculator.ts  # Scoring logic, type determination
│   ├── share_payload.ts        # URL-encoded share payload encoding/decoding
│   └── translations.ts         # Bilingual EN/ZH translations
├── ai_risk_model.py            # Reference Python model (algorithm documentation)
├── tests/                      # Playwright E2E tests
├── Dockerfile                  # Multi-stage Docker build for HF Spaces
└── next.config.ts              # Next.js config (standalone output)
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build & Run (Production)

```bash
npm run build
npm start
```

### Docker

```bash
docker build -t air .
docker run -p 7860:7860 air
```

### Run Tests

```bash
# Headless
npm run test

# With browser UI
npm run test:headed

# Interactive test runner
npm run test:ui
```

## Data Sources

| Source | Data Used |
|---|---|
| [MIT Study](https://economics.mit.edu/) | 11.7% current AI replacement rate |
| [McKinsey Global Institute](https://www.mckinsey.com/mgi) | 57% work hours technically automatable |
| [World Economic Forum](https://www.weforum.org/) | 92M displaced / 170M created by 2030 |
| [PwC](https://www.pwc.com/) | AI skills wage premium (+56%), sector exposure |
| CNBC, Fortune, Forbes | Real-world layoff case studies |

## Deployment

This project is deployed across three platforms:

| Platform | URL | Method |
|---|---|---|
| **Vercel** | [air.democra.ai](https://air.democra.ai) | Auto-deploy from GitHub `main` branch |
| **GitHub** | [github.com/democra-ai/air](https://github.com/democra-ai/air) | Source code, version control |
| **Hugging Face Spaces** | [huggingface.co/spaces/tao-shen/jobless](https://huggingface.co/spaces/tao-shen/jobless) | Docker deployment |

Pushing to GitHub triggers Vercel auto-deployment. Hugging Face Spaces requires a separate push:

```bash
git push origin main            # → GitHub + Vercel auto-deploy
git push huggingface main       # → Hugging Face Spaces Docker build
```

## License

[MIT](LICENSE)
