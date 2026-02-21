---
title: JOBLESS
emoji: 🤖
colorFrom: red
colorTo: yellow
sdk: docker
pinned: false
license: mit
short_description: "How fast is AI replacing human jobs?"
tags:
  - next.js
  - react
  - ai-impact
  - data-visualization
  - employment
  - automation
---

<div align="center">

# JOBLESS

### How Fast Is AI Replacing Human Jobs?

A data-driven interactive platform that visualizes AI's impact on employment — featuring risk assessment tools, industry analysis, and an interactive timeline of AI milestones.

[![Live Demo](https://img.shields.io/badge/Live_Demo-jobless.wiki-ff4444?style=for-the-badge)](https://jobless.wiki)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel)](https://jobless.wiki)
[![Hugging Face Space](https://img.shields.io/badge/%F0%9F%A4%97_Hugging_Face-Space-blue?style=for-the-badge)](https://huggingface.co/spaces/tao-shen/jobless)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

</div>

---

## Overview

**JOBLESS** turns research from MIT, McKinsey, the World Economic Forum, and PwC into an interactive experience. Instead of reading dense reports, users can explore AI's impact on jobs through visualizations, calculate their personal risk score, and understand what's coming next.

> *MIT: 11.7% of jobs replaceable now. McKinsey: 57% of work hours technically automatable. WEF: 92M jobs displaced, but 170M new jobs created by 2030.*

## Features

- **AI Replacement Progress Tracker** — Visual representation of where we are on the path to automation (11.7% current → 57% technical ceiling)
- **Interactive Timeline** — Key AI milestones from 2020 (Transformer Architecture) to 2040+ (High Automation Society), with expandable details
- **AI Risk Calculator** — Multi-dimensional risk assessment based on task repetitiveness, rule clarity, creativity requirements, interpersonal interaction, and physical operation
- **Industry Deep Dive** — Sector-by-sector analysis across 7 industries with risk levels and evidence
- **Real Layoff Tracker** — Documented cases of AI-driven job cuts from real companies
- **Net Employment Effect** — WEF displacement vs. creation data, PwC wage premium analysis
- **Data Protection Awareness** — How your data trains AI to replace you, with platform-specific agreement analysis
- **Bilingual Support** — Full English / Chinese (中文) interface toggle
- **Dark / Light Theme** — User-selectable theme with persistent preference

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
jobless/
├── app/
│   ├── page.tsx                # Main page — hero, stats, timeline, risk calculator
│   ├── analysis/page.tsx       # Industry analysis, layoff tracker, net impact
│   ├── data-protection/page.tsx# Data protection awareness
│   ├── layout.tsx              # Root layout, fonts, metadata, theme
│   ├── globals.css             # Global styles and theme variables
│   └── opengraph-image.tsx     # Dynamic OG image generation
├── components/
│   └── InteractiveTimeline/    # Reusable timeline component
├── lib/
│   ├── ai_risk_calculator_v2.ts# Client-side risk assessment engine
│   └── data-protection.ts      # Platform agreement data & translations
├── ai_risk_model.py            # Reference Python model (algorithm documentation)
├── public/                     # Static assets
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
docker build -t jobless .
docker run -p 7860:7860 jobless
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
| **Vercel** | [jobless.wiki](https://jobless.wiki) | Auto-deploy from GitHub `main` branch |
| **GitHub** | [github.com/tao-shen/jobless](https://github.com/tao-shen/jobless) | Source code, version control |
| **Hugging Face Spaces** | [huggingface.co/spaces/tao-shen/jobless](https://huggingface.co/spaces/tao-shen/jobless) | Docker deployment |

Pushing to GitHub triggers Vercel auto-deployment. Hugging Face Spaces requires a separate push:

```bash
git push origin main            # → GitHub + Vercel auto-deploy
git push huggingface main       # → Hugging Face Spaces Docker build
```

## License

[MIT](LICENSE)
