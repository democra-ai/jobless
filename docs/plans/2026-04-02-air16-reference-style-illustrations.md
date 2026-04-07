# AIR 16 Reference-Style Illustrations Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the current poster-style AIR archetype images with a new 16-image set that matches the user's white-background reference-style illustration language.

**Architecture:** A local Python generator will be rewritten to emit standalone square illustration scenes instead of text-heavy posters. Each scene will use a shared faceless-character illustration system plus archetype-specific props and mini-environments, then rasterize to PNG with ImageMagick.

**Tech Stack:** Python 3, vector composition, ImageMagick, markdown docs

---

### Task 1: Record the approved redesign

**Files:**
- Create: `/Users/tao.shen/jobless/docs/plans/2026-04-02-air16-reference-style-illustrations-design.md`
- Create: `/Users/tao.shen/jobless/docs/plans/2026-04-02-air16-reference-style-illustrations.md`

**Step 1: Write the design doc**

Capture the user-approved target style: square assets, light background, reference-like composition, no in-image text, and direct symbolic storytelling.

**Step 2: Write the implementation plan**

Describe the generator rewrite and the verification steps.

**Step 3: Check the files exist**

Run: `ls /Users/tao.shen/jobless/docs/plans | rg 'reference-style-illustrations'`

Expected: both new planning files are present.

### Task 2: Rewrite the generator

**Files:**
- Modify: `/Users/tao.shen/jobless/scripts/generate_air16_posters.py`

**Step 1: Replace poster-specific metadata and layout**

Rewrite the generator around square scene illustrations and update the archetype metadata to support reference-style compositions.

**Step 2: Add shared faceless-character helpers**

Implement reusable helpers for heads, bodies, props, scene cards, outlines, and support graphics.

**Step 3: Implement the 16 scene compositions**

Create one scene function per archetype to keep each illustration specific and legible.

**Step 4: Remove output assumptions from the old poster version**

Stop emitting poster typography inside the image. Ensure final PNG size is `1600x1600`.

### Task 3: Regenerate and verify

**Files:**
- Output: `/Users/tao.shen/jobless/public/character-posters/*.png`
- Output: `/Users/tao.shen/jobless/public/character-posters/README.md`
- Output: `/Users/tao.shen/jobless/public/character-posters/visual-philosophy.md`

**Step 1: Run the generator**

Run: `python3 /Users/tao.shen/jobless/scripts/generate_air16_posters.py`

Expected: the 16 PNG files are regenerated without errors.

**Step 2: Verify file count**

Run: `find /Users/tao.shen/jobless/public/character-posters -maxdepth 1 -name '*.png' | wc -l`

Expected: `16`

**Step 3: Verify dimensions**

Run: `magick identify -format '%f %wx%h\n' /Users/tao.shen/jobless/public/character-posters/*.png`

Expected: every file reports `1600x1600`

**Step 4: Visual QA**

Create a temporary montage and inspect representative outputs to confirm the new style is light, faceless, direct, and visually aligned with the user-provided reference.
