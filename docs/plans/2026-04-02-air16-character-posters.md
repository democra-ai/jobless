# AIR 16 Character Posters Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Generate a new, reproducible set of 16 poster-style character illustrations from the archetype descriptions and place them in a dedicated output folder.

**Architecture:** A Python generator script will hold archetype metadata, compose SVG poster artwork with a shared visual system plus per-archetype motifs, then rasterize those SVG files into PNG files via ImageMagick. Output collateral includes a philosophy markdown file and a manifest file in the same folder as the images.

**Tech Stack:** Python 3, SVG string generation, ImageMagick (`magick`), markdown docs

---

### Task 1: Create the documentation baseline

**Files:**
- Create: `/Users/tao.shen/jobless/docs/plans/2026-04-02-air16-character-posters-design.md`
- Create: `/Users/tao.shen/jobless/docs/plans/2026-04-02-air16-character-posters.md`

**Step 1: Write the design doc**

Document the canonical source, approved poster direction, visual system, output directory, and verification rules.

**Step 2: Write the implementation plan**

Document the generator-based approach and the verification criteria.

**Step 3: Sanity check the paths**

Run: `ls /Users/tao.shen/jobless/docs/plans`

Expected: both new markdown files are present.

### Task 2: Implement the poster generator

**Files:**
- Create: `/Users/tao.shen/jobless/scripts/generate_air16_posters.py`

**Step 1: Define archetype metadata**

Include code, English and Chinese names, risk level, short descriptor, color palette, and key visual motifs for each of the 16 archetypes.

**Step 2: Build shared SVG helpers**

Implement reusable helpers for poster backgrounds, typography blocks, figure primitives, symbolic motifs, and deterministic decorative noise.

**Step 3: Implement per-archetype poster rendering**

Compose each poster from the shared system plus per-archetype overlays so the full set stays unified while remaining visually distinct.

**Step 4: Add raster export**

Invoke `magick` from the script to convert each SVG file into a PNG file in the output folder.

### Task 3: Generate and verify the assets

**Files:**
- Output: `/Users/tao.shen/jobless/public/character-posters/*.png`
- Output: `/Users/tao.shen/jobless/public/character-posters/svg/*.svg`
- Output: `/Users/tao.shen/jobless/public/character-posters/visual-philosophy.md`
- Output: `/Users/tao.shen/jobless/public/character-posters/README.md`

**Step 1: Run the generator**

Run: `python3 /Users/tao.shen/jobless/scripts/generate_air16_posters.py`

Expected: 16 poster SVGs and 16 PNGs are created without errors.

**Step 2: Verify file counts**

Run: `find /Users/tao.shen/jobless/public/character-posters -maxdepth 1 -name '*.png' | wc -l`

Expected: `16`

Run: `find /Users/tao.shen/jobless/public/character-posters/svg -maxdepth 1 -name '*.svg' | wc -l`

Expected: `16`

**Step 3: Verify dimensions**

Run: `magick identify -format '%f %wx%h\n' /Users/tao.shen/jobless/public/character-posters/*.png`

Expected: all generated posters share the same high-resolution portrait size.

**Step 4: Perform spot visual review**

Open a few representative outputs from the high-, medium-, and low-risk groups and confirm the series consistency and per-archetype differentiation.
