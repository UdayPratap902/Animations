# 🎨 Animations Lab — Web Animations & Motion Gallery

Welcome to **Animations Lab**, an open-source collection of high-performance, drop-in web animations, 3D spatial components, and interactive UI motion architectures. Built for modern frontends using **GSAP**, **Framer Motion**, and **Tailwind CSS**.

---

## 🌟 Available Animations

| Preview | Animation Name | Core Tech Stack | Status | Quick Links |
|:---:|:---|:---|:---:|:---|
| 🎴 | **01. GSAP 3D Card Deck Stack**<br><sub>Hardware-accelerated 3D scroll scrub with tiered depth scaling</sub> | `GSAP 3.12`<br>`ScrollTrigger`<br>`Tailwind CSS` | 🟢 **Live & Ready** | [Gallery Hub](index.html) • [Full Demo](gsap-3d-card-stack.html) • [Code & Guide](#-01-gsap-3d-scrolltrigger-card-deck) |
| 💫 | **02. 3D Perspective Carousel & Glare Stack**<br><sub>Spatial 3D depth wings with dynamic cursor-tracked radial glare</sub> | `Framer Motion`<br>`3D Glare Tilt`<br>`Tailwind CSS` | 🟢 **Live & Ready** | [Gallery Hub](index.html) • [Full Demo](interactive-3d-review-stack.html) • [Code & Guide](#-02-3d-perspective-carousel--glare-stack) |
| 🎬 | **03. GSAP Horizontal Multi-Panel Showcase**<br><sub>ScrollTrigger horizontal pinned glide with GPU progress tracking & modal player</sub> | `GSAP 3.12`<br>`ScrollTrigger`<br>`YouTube Modal` | 🟢 **Live & Ready** | [Gallery Hub](index.html) • [Full Demo](gsap-horizontal-video-showcase.html) • [Code & Guide](#-03-gsap-scrolltrigger-horizontal-multi-panel-showcase) |

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
- **02. 3D Glare Review Carousel**: [`interactive-3d-review-stack.html`](interactive-3d-review-stack.html) (fullscreen 3D glare carousel from AvadaKeDevara)
- **03. GSAP Horizontal Multi-Panel Showcase**: [`gsap-horizontal-video-showcase.html`](gsap-horizontal-video-showcase.html) (fullscreen horizontal pinned multi-panel showcase with modal player)

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

The production review stack architecture from **AvadaKeDevara** featuring depth-tiered 3D side wings, real-time cursor-tracked radial glare shine, drag/swipe gestures, and auto-play cycling.

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
