# 🎨 Animations Lab — Web Animations & Motion Gallery

Welcome to **Animations Lab**, an open-source collection of high-performance, drop-in web animations, 3D spatial components, and interactive UI motion architectures. Built for modern frontends using **GSAP**, **Framer Motion**, and **Tailwind CSS**.

---

## 🌟 Available Animations

| Preview | Animation Name | Core Tech Stack | Status | Quick Links |
|:---:|:---|:---|:---:|:---|
| 🎴 | **01. GSAP 3D Card Deck Stack**<br><sub>Hardware-accelerated 3D scroll scrub with tiered depth scaling</sub> | `GSAP 3.12`<br>`ScrollTrigger`<br>`Tailwind CSS` | 🟢 **Live & Ready** | [Gallery Hub](index.html) • [Full Demo](gsap-3d-card-stack.html) • [Code & Guide](#-01-gsap-3d-scrolltrigger-card-deck) |
| 💫 | **02. 3D Perspective Carousel & Glare Stack**<br><sub>Spatial 3D depth wings with dynamic cursor-tracked radial glare</sub> | `Framer Motion`<br>`3D Glare Tilt`<br>`Tailwind CSS` | 🟢 **Live & Ready** | [Gallery Hub](index.html) • [Full Demo](interactive-3d-review-stack.html) • [Code & Guide](#-02-3d-perspective-carousel--glare-stack) |

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
|:---|:---:|:---:|:---:|:---:|:---|
| **Center (`diff = 0`)** | `0%` | `1.0` | `0deg` | `10` | Full opacity + Dynamic cursor glare & tilt |
| **Left Wing (`diff = -1`)** | `-52%` | `0.88` | `+10deg` | `5` | `opacity: 0.6`, `blur(2px)` |
| **Right Wing (`diff = +1`)** | `+52%` | `0.88` | `-10deg` | `5` | `opacity: 0.6`, `blur(2px)` |
| **Background Queue** | `±85%` | `0.75` | `0deg` | `1` | `opacity: 0`, `blur(4px)` |

---

## 📄 License & Attribution

Open-source component library under the **MIT License**. Free to use, adapt, and drop into commercial and personal web projects.
