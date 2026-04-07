# AIR 16 Reference-Style Illustrations Design

## Goal

Regenerate the 16 AIR archetype illustrations as standalone square assets that closely follow the visual language of the user-provided reference image, while still remaining original compositions driven by the canonical archetype descriptions in `/Users/tao.shen/jobless/marketing/character-prompts.md`.

## Canonical Inputs

- Archetype meaning and symbolism: `/Users/tao.shen/jobless/marketing/character-prompts.md`
- Visual reference for rendering language: the user-provided 4x4 collage image in the conversation

## Approved Direction

The user explicitly approved this direction:

- keep the set as 16 separate illustrations
- push the output as close as reasonably possible to the reference image's style
- do not keep the previous dark poster look

## Visual Target

This set should read like a polished product-illustration system rather than editorial poster art.

- format: square single-image illustrations
- background: white or very light neutral card-like background
- drawing style: faceless flat characters, thin dark outlines, gentle gradients, soft glows
- composition: one clear scene per archetype, immediately legible at thumbnail size
- text in image: none
- explanation method: props, symbols, and mini-environments should directly explain the archetype

## Style Rules

- overall feel should be close to the reference collage: clean, approachable, slightly infographic, slightly storyboard-like
- use original compositions, not a one-to-one copy of any single tile
- keep each scene archetype-specific:
  - EOFP should feel like fragile office labor
  - EOFH should feel like social-network centrality
  - EORP should feel like the human final-approval checkpoint
  - ESFP should feel like taste and visual judgment
  - TOFP should feel like embodied hands-on work
  - EORH should feel like certification and legal protection
  - ESFH should feel like spotlighted personal brand
  - ESRP should feel like high-stakes technical judgment
  - TOFH should feel like personal service through skilled touch
  - TORP should feel like irreversible precision
  - TSFP should feel like artisan warmth and human trace
  - ESRH should feel like senior judgment and gravitas
  - TORH should feel like trust-based healing contact
  - TSFH should feel like irreplaceable live performance
  - TSRP should feel like decisive action in chaos
  - TSRH should feel like multi-layer human defensibility

## Asset Specification

- output folder: `/Users/tao.shen/jobless/public/character-posters`
- output format: 16 PNG illustrations
- target size: `1600x1600`
- filenames: `EOFP.png`, `EOFH.png`, etc.
- supporting docs in same folder:
  - `README.md`
  - `visual-philosophy.md`

## Implementation Approach

Use a deterministic local generator script that composes each illustration from vector primitives into an SVG-like intermediate, rasterized to PNG via ImageMagick. The generator should switch from poster layout logic to scene-card illustration logic, and remove in-image labels so the PNGs look like design assets rather than posters.

## Verification

- confirm exactly 16 PNG files in the output root
- confirm each PNG is `1600x1600`
- visually inspect a montage plus a few representative scenes
- ensure the old dark poster typography is gone
