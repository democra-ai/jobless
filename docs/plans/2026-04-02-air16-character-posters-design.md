# AIR 16 Character Posters Design

## Goal

Generate a new set of 16 poster-style character illustrations based on the canonical archetype descriptions in `/Users/tao.shen/jobless/marketing/character-prompts.md`, and place the finished assets into a single new folder without modifying the existing `/Users/tao.shen/jobless/public/characters` set.

## Canonical Source

- Primary source: `/Users/tao.shen/jobless/marketing/character-prompts.md`
- Existing assets in `/Users/tao.shen/jobless/public/characters` are reference-only and will not be overwritten.

## Approved Direction

The user selected the "海报式角色插图" direction and then explicitly instructed implementation to proceed immediately. That is treated as approval to move forward with a poster-series execution.

## Visual System

- Format: editorial concept-poster illustrations
- Composition: single protagonist per image, occupying roughly half the frame
- Background: symbolic, abstract, derived from each archetype's metaphor rather than literal workplace scenes
- Consistency: a shared poster grid, typography system, framing, and lighting language across all 16 assets
- Variation: each archetype gets a distinct color palette, iconography set, and pose/accessory treatment
- Tone: mature, cinematic, allegorical, not cartoon-cute, not anime

## Series Rules

- Higher-risk archetypes lean visually brittle, exposed, transparent, or unstable
- Mid-risk archetypes balance pressure and resilience
- Lower-risk archetypes feel denser, warmer, heavier, and more structurally protected
- Each image includes:
  - archetype code
  - English title
  - Chinese title
  - short descriptor
  - visual risk band

## Asset Specification

- Output folder: `/Users/tao.shen/jobless/public/character-posters`
- Deliverables:
  - 16 PNG posters
  - matching SVG source files
  - one visual philosophy markdown file
  - one manifest/README markdown file
- Naming: `EOFP.png`, `EOFP.svg`, etc.
- Resolution target: high-resolution vertical poster format suitable for reuse in product or marketing contexts

## Implementation Approach

Use a deterministic local generator script to produce SVG poster compositions from archetype metadata, then rasterize them to PNG with ImageMagick. This avoids dependency on external image APIs, keeps the work reproducible, and makes later art direction adjustments cheap.

## Verification

- Confirm 16 PNG files exist
- Confirm 16 SVG files exist
- Confirm poster dimensions are consistent
- Visually inspect representative outputs before completion
