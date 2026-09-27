# 🎨 Animations Lab — Web Animations & Motion Gallery

Welcome to **Animations Lab**, an open-source collection of high-performance, drop-in web animations, 3D spatial components, and interactive UI motion architectures. Built for modern frontends using **GSAP**, **Framer Motion**, and **Tailwind CSS**.

---

## 🌟 Available Animations

| Preview | Animation Name | Core Tech Stack | Status | Quick Links |
|:---:|:---|:---|:---:|:---|
| 🎴 | **01. GSAP 3D Card Deck Stack**<br><sub>Hardware-accelerated 3D scroll scrub with tiered depth scaling</sub> | `GSAP 3.12`<br>`ScrollTrigger`<br>`Tailwind CSS` | 🟢 **Live & Ready** | [Gallery Hub](index.html) • [Full Demo](gsap-3d-card-stack.html) • [Code & Guide](#-01-gsap-3d-scrolltrigger-card-deck) |
| 💫 | **02. 3D Perspective Carousel & Glare Stack**<br><sub>Spatial 3D depth wings with dynamic cursor-tracked radial glare</sub> | `Framer Motion`<br>`3D Glare Tilt`<br>`Tailwind CSS` | 🟢 **Live & Ready** | [Gallery Hub](index.html) • [Full Demo](interactive-3d-review-stack.html) • [Code & Guide](#-02-3d-perspective-carousel--glare-stack) |
| 🎬 | **03. GSAP Horizontal Multi-Panel Showcase**<br><sub>ScrollTrigger horizontal pinned glide with GPU progress tracking & modal player</sub> | `GSAP 3.12`<br>`ScrollTrigger`<br>`YouTube Modal` | 🟢 **Live & Ready** | [Gallery Hub](index.html) • [Full Demo](gsap-horizontal-video-showcase.html) • [Code & Guide](#-03-gsap-scrolltrigger-horizontal-multi-panel-showcase) |
| 💳 | **04. 3D Interactive Pricing Deck**<br><sub>Hover-elevation 3D fanning deck with benefit expansion, magnetic CTAs, and mobile accordion</sub> | `Framer Motion`<br>`GSAP Magnetic`<br>`Tailwind CSS` | 🟢 **Live & Ready** | [Gallery Hub](index.html) • [Full Demo](interactive-3d-pricing-deck.html) • [Code & Guide](#-04-3d-interactive-pricing-deck) |
| 🔤 | **05. Word Flip & Staggered Typography Lab**<br><sub>Kinetic spring word pull-up, split-flap ticker, and fluid blur dissolve with zero layout shift</sub> | `Framer Motion`<br>`GSAP 3.12`<br>`Tailwind CSS` | 🟢 **Live & Ready** | [Gallery Hub](index.html) • [Full Demo](interactive-word-flip.html) • [Code & Guide](#-05-word-flip--staggered-kinetic-typography) |

---

## 🚀 Quick Start & Local Preview

Clone the repository and open `index.html` in your browser, or start a local static server:

```bash
# Clone the repository
git clone https://github.com/UdayPratap902/Animations.git
cd Animations

# Serve locally with any tool:
# Python:
python -m http.server 3000

# Node / npx:
npx serve .
```

- **Gallery Hub**: [`index.html`](index.html) (browse animations with interactive mini-window preview)
- **01. GSAP 3D Card Stack**: [`gsap-3d-card-stack.html`](gsap-3d-card-stack.html) (fullscreen scroll scrubbing & documentation)
- **02. 3D Glare Review Carousel**: [`interactive-3d-review-stack.html`](interactive-3d-review-stack.html) (fullscreen 3D perspective review carousel with cursor glare and visual deconstructor)
- **03. GSAP Horizontal Multi-Panel Showcase**: [`gsap-horizontal-video-showcase.html`](gsap-horizontal-video-showcase.html) (fullscreen horizontal pinned multi-panel showcase with modal player)
- **04. 3D Interactive Pricing Deck**: [`interactive-3d-pricing-deck.html`](interactive-3d-pricing-deck.html) (spatial 3D fanning pricing deck with hover elevation, benefit expansion, deconstructor, and production code)
- **05. Word Flip & Kinetic Typography**: [`interactive-word-flip.html`](interactive-word-flip.html) (interactive word playground, 4 kinetic modes, visual deconstructor, and production drop-in code)

---

## 🎴 01. GSAP 3D ScrollTrigger Card Deck

A tactile 3D card deck that smoothly ascends and lands on top of previous cards as the user scrolls. Uses CSS 3D perspective (`perspective: 1200px`) with scroll scrubbing and section pinning.

### Mathematical Parameters & Formulas

| Parameter | Desktop (`≥ 768px`) | Mobile (`< 768px`) | Purpose / Formula |
|:---|:---:|:---:|:---|
| **Perspective** | `1200px` | `1200px` | Container 3D depth perception |
| **Initial Y-Offset** | `650px` | `480px` | Holds incoming cards offstage below viewport |
| **Initial Tilt Angle** | `38deg` | `28deg` | `rotateX` forward tilt in 3D space |
| **Scroll Distance** | `900px` | `700px` | `totalScroll = (N - 1) * distPerCard` |
| **Deck Y-Offset** | `-18px * depthDiff` | `-12px * depthDiff` | Upward shift showing stacked card top edges |
| **Deck Scale** | `1 - (0.04 * depthDiff)` | `1 - (0.04 * depthDiff)` | Layered background depth scaling |
| **Scrub Inertia** | `1.2` | `1.2` | GSAP scroll scrub lag for smooth inertia |

---

## 💫 02. 3D Perspective Carousel & Glare Stack

A spatial 3D perspective review carousel featuring depth-tiered 3D side wings, real-time cursor-tracked radial glare shine, drag/swipe gestures, and auto-play cycling.

### 3D Spatial Variant Matrix

| Relative Index (`diff`) | Translation (`x`) | Scale | `rotateY` Tilt | Z-Index | Visual Effects |
|:---|:---:|:---:|:---|:---:|:---|
| **Center (`diff = 0`)** | `0%` | `1.0` | `0deg` | `10` | Full opacity + Dynamic cursor glare & tilt |
| **Left Wing (`diff = -1`)** | `-52%` | `0.88` | `+10deg` | `5` | `opacity: 0.6`, `blur(2px)` |
| **Right Wing (`diff = +1`)** | `+52%` | `0.88` | `-10deg` | `5` | `opacity: 0.6`, `blur(2px)` |
| **Background Queue** | `±85%` | `0.75` | `0deg` | `1` | `opacity: 0`, `blur(4px)` |

---

## 🎬 03. GSAP ScrollTrigger Horizontal Multi-Panel Showcase

A hardware-accelerated horizontal gliding viewport across 4 standalone full-width panels. Viewport pins on vertical scroll and translates smoothly across panels with tactile scrub inertia and a zero-reflow GPU progress bar.

### Mathematical Layout Formulas

| Layout Dimension | Mathematical Formula | Purpose |
|:---|:---|:---|
| **Panel Width** | `100vw` (or `1/N` of track) | Each section is a full standalone panel with zero multi-column cramming |
| **Total Track Width** | `N * 100vw = 400vw` | 4 standalone panels in a continuous flex track |
| **Scroll Travel Distance** | `(N - 1) * 100vw = 300vw` | Precise 1:1 pixel travel distance bringing Panel 4 into complete view |
| **Progress Tracker** | `scaleX: 0.25 → 1.0` via GPU transform | Zero browser reflow or layout recalculation at 60 FPS |

### Architecture Highlights
- **Distinct Light Color Themes**: Each panel uses a curated light aesthetic (`#E0F2FE` Sky Blue, `#FEF3C7` Amber Cream, `#D1FAE5` Mint Sage, `#EDE9FE` Lavender) ensuring crystal-clear visual transitions during horizontal glides.
- **Content-Aware Architecture**: Clean, minimal demonstration of horizontal pinning, inertial scrub damping, zero-reflow GPU scaleX progression, and adaptive viewport geometry.
- **Safe Pinning Trigger**: The pin container has no `overflow: hidden`, preventing CSS stacking context bugs that corrupt `getBoundingClientRect()` for downstream sections.
- **Zero Layout Reflow**: Progress tracking via composite-only `scaleX` GPU transforms running at a locked 60 FPS.

---

## 📄 License & Attribution

Open-source component library under the **MIT License**. Free to use, adapt, and drop into commercial and personal web projects.

---

## 💳 04. 3D Interactive Pricing Deck

A spatial 3D pricing card deck that fans three plans (Starter, Pro, Enterprise) across the viewport using fixed-anchor perspective transforms. On hover, the active card straightens, lifts, and reveals its benefit list with staggered item animations. CTA buttons use GSAP `elastic.out` magnetic tracking.

### Transform Parameter Matrix

| State | Card | Rotation | translateY | Scale | z-Index |
|:---|:---|:---:|:---:|:---:|:---:|
| **Resting** | Starter (Left) | -4deg | +6px | 0.96 | 10 |
| **Resting** | Pro (Center) | 0deg | 0px | 1.0 | **20** |
| **Resting** | Enterprise (Right) | +4deg | +6px | 0.96 | 10 |
| **Hover Active** | Any card | 0deg | **-14px** | **1.025** | **35** |
| **Hover Recede** | Side cards | ±4deg | +8px | 0.95 | 10 |
| **Hover Recede** | Center card | 0deg | +6px | 0.97 | 15 |

### Benefit List Expansion

| Parameter | Value | Purpose |
|:---|:---|:---|
| **Wrapper duration** | `280ms` | height 0 → auto |
| **Wrapper ease** | `[0.16, 1, 0.3, 1]` | snappy spring cubic-bezier |
| **Item stagger** | `25ms × fIdx` | sequential reveal delay |
| **Item duration** | `200ms` | opacity 0→1, translateY 5→0 |

### Architecture Highlights
- **Fixed-anchor geometry**: cards stay in their left/center/right positions — no swapping. Only transforms change.
- **Reduced-motion fallback**: `useSyncExternalStore` with `window.matchMedia` detects `prefers-reduced-motion` and renders a static 3-column grid.
- **Mobile accordion**: tab switcher with max-height CSS transition, no JS animation required.
- **Elastic magnetic CTAs**: GSAP `quickTo` with `elastic.out(1, 0.3)` ease, disabled on `pointer: coarse` devices.
- **Zero layout shift**: all transforms use GPU-composited properties (transform, opacity) only — no width/height reflow.

---

## 🔤 05. Word Flip & Staggered Kinetic Typography

An open-source kinetic typography engine that breaks headlines into discrete word tokens and animates them using Hooke's Law spring physics, hardware composite transforms, and screen-reader accessible DOM serialization.

### Mathematical Parameters & Formulas

| Parameter | Standard Default | Alternative / Dynamic | Formula / Physical Purpose |
|:---|:---:|:---:|:---|
| **Initial Displacement ($y$)** | `+20px` (or `100%`) | `+40px` (Large hero) | Vertical entry offset beneath resting baseline |
| **Spring Stiffness ($k$)** | `100` | `140` (snappy) / `60` (soft) | Restoring tensile force in Hooke's Law equation $F = -kx$ |
| **Damping Coefficient ($c$)** | `20` | `15` (bouncy) / `25` (critical) | Viscous decay preventing endless harmonic oscillation |
| **Stagger Offset ($\Delta t$)** | `0.05s – 0.08s` | `0.04s` (rapid) | Inter-token delay progression: $t_i = t_0 + (i \cdot \Delta t)$ |

### Architecture Highlights
- **Whitespace & Typography Preservation**: Custom spacing rule applies `margin-right: 0.25em` to every token except the final word (`last:mr-0`), preserving precise browser kerning and justification.
- **A11y & Screen Reader Optimization**: Unlike naive tokenizers that cause robotic word-by-word pauses in screen readers, the container receives `aria-label={fullSentence}` and animated word spans receive `aria-hidden="true"`.
- **Zero Document Reflow**: All kinetic motion executes strictly across GPU composite channels (`transform: translateY()`, `filter: blur()`, and `opacity`) with zero changes to `height`, `width`, or `top`.
- **3 Distinct Animation Modes**:
  1. **Spring Word Pull-Up**: Staggered spring reveal for impactful hero section headlines using Hooke's Law physics.
  2. **Split-Flap Ticker**: Mechanical tactile letter ticker reminiscent of transit departure boards.
  3. **Fluid Blur Dissolve**: Optical Gaussian blur dissipation with elevation float.
- **Multi-Stack Drop-in Code**: Provided in React + Framer Motion, Vanilla GSAP 3.12, and Pure CSS.

