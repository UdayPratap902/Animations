# 🎨 Animations Lab - Web Animations & Motion Gallery

Welcome to **Animations Lab**, a curated open-source collection of high-performance, drop-in web animations and interactive UI components. Built for modern frontends using **GSAP**, **ScrollTrigger**, **Tailwind CSS**, and **Canvas/3D transforms**.

Each animation includes an interactive mini-window preview, full-page standalone demo, mathematical formulas, and production-ready snippets for **React**, **Next.js**, and **Vanilla JavaScript**.

---

## 🌟 Animations Catalog

| Preview | Animation Name | Tech Stack | Status | Links |
|:---:|:---|:---|:---:|:---|
| 🎴 | **GSAP 3D Card Deck Stack**<br><sub>Hardware-accelerated 3D scroll scrub with tiered depth scaling</sub> | `GSAP 3.12`<br>`ScrollTrigger`<br>`Tailwind CSS` | 🟢 **Full Demo Ready** | [Live Page](gsap-3d-card-stack.html) • [Code & Prompt](#-featured-gsap-3d-card-stack) |
| 🧲 | **Magnetic Fluid Glow & Mesh**<br><sub>Spring physics mouse cursor tracker with chromatic glow</sub> | `Canvas API`<br>`Spring Physics`<br>`Vanilla JS` | 🟡 Interactive Preview | [Gallery Hub](index.html) |
| ✍️ | **Kinetic Staggered Text Reveal**<br><sub>Per-word kinetic stagger with clip-path masks</sub> | `GSAP Timeline`<br>`Clip Path`<br>`SplitText` | 🟡 Interactive Preview | [Gallery Hub](index.html) |
| 💎 | **Multi-Layer 3D Parallax Tilt**<br><sub>Gyro/cursor-reactive card tilting with specular shine</sub> | `CSS 3D`<br>`Perspective`<br>`Gyroscope` | 🟡 Interactive Preview | [Gallery Hub](index.html) |

---

## 🚀 Quick Start & Local Preview

Clone the repository and open `index.html` in your browser, or start a local static server:

```bash
# Clone the repo
git clone https://github.com/UdayPratap902/Animations.git
cd Animations

# Serve locally (choose any):
# Using Python:
python -m http.server 3000

# Using Node / npx:
npx serve .
```

- **Gallery Hub**: [`index.html`](index.html) (browse all animation cards with mini-window previews)
- **3D Card Deck Full Demo**: [`gsap-3d-card-stack.html`](gsap-3d-card-stack.html)

---

## 🎴 Featured: GSAP 3D ScrollTrigger Card Deck

A tactile 3D card deck landing on top of previous cards as the user scrolls. Uses real CSS 3D perspective (`perspective: 1200px`) with scroll scrubbing and section pinning.

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

### 🤖 AI Agent System Prompt (Copy-Paste)

To replicate the 3D card stack in any codebase using AI assistants (ChatGPT, Claude, Cursor, Antigravity):

```markdown
Please implement a GSAP ScrollTrigger 3D Card Stack review section.
Key requirements:
1. Container has perspective: 1200px and pins to the top of viewport for the duration: (totalCards - 1) * 900px (desktop) / 700px (mobile).
2. Card 0 starts active on stage at y: 0, rotateX: 0, scale: 1, zIndex: 1.
3. Cards 1..N start below viewport with y: 650 (mobile 480), rotateX: 38deg (mobile 28deg), scale: 0.92, with ascending zIndex (zIndex = i + 1).
4. On GSAP scrub timeline:
   - When card i ascends to y: 0 and rotateX: 0, all previous cards (prev < i) scale down to (1 - depthDiff * 0.04) and shift upward to (-depthDiff * 18px).
   - Higher z-index ensures incoming cards land ON TOP of older cards in the deck.
5. Provide a responsive, accessible fallback when prefers-reduced-motion is true.
6. Support ambient parallax gradient glow in the background.
```

---

### ⚛️ React / Next.js Component Code

```tsx
import React, { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const ReviewsStack: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useGSAP(
    () => {
      if (typeof window === "undefined" || isReducedMotion) return;

      const isMobile = window.innerWidth < 768;
      const cardEls = gsap.utils.toArray<HTMLElement>(".review-stack-card");
      const totalCards = cardEls.length;
      if (totalCards === 0) return;

      // 1. Set initial 3D transform states
      gsap.set(cardEls[0], {
        transformOrigin: "50% 0%",
        y: 0,
        rotateX: 0,
        scale: 1,
        opacity: 1,
        zIndex: 1,
      });

      const initialYOffset = isMobile ? 480 : 650;
      const initialTiltAngle = isMobile ? 28 : 38;

      for (let i = 1; i < totalCards; i++) {
        gsap.set(cardEls[i], {
          transformOrigin: "50% 0%",
          y: initialYOffset,
          rotateX: initialTiltAngle,
          scale: 0.92,
          opacity: 1,
          zIndex: i + 1,
        });
      }

      // 2. Setup pinned scrub timeline
      const scrollDistancePerCard = isMobile ? 700 : 900;
      const totalScrollDistance = (totalCards - 1) * scrollDistancePerCard;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: () => "top top",
          end: () => `+=${totalScrollDistance}`,
          pin: true,
          pinSpacing: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 3. Sequentially build stack steps
      for (let i = 1; i < totalCards; i++) {
        const incomingCard = cardEls[i];
        const stepLabel = `step-${i}`;

        for (let prev = 0; prev < i; prev++) {
          const depthDiff = i - prev;
          tl.to(
            cardEls[prev],
            {
              scale: 1 - depthDiff * 0.04,
              y: -depthDiff * (isMobile ? 12 : 18),
              ease: "none",
              duration: 1,
            },
            stepLabel
          );
        }

        tl.to(
          incomingCard,
          {
            y: 0,
            rotateX: 0,
            scale: 1,
            opacity: 1,
            ease: "none",
            duration: 1,
          },
          stepLabel
        );
      }
    },
    { scope: containerRef, dependencies: [isReducedMotion] }
  );

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-white py-16">
      <div className="relative flex-1 flex items-center justify-center px-4 w-full" style={{ perspective: "1200px" }}>
        {/* Render your cards here */}
      </div>
    </section>
  );
};
```

---

## 🛠️ Adding New Animations to this Repo

1. Create a dedicated HTML/JS file for the new animation (e.g. `gsap-fluid-magnetic.html`).
2. Include the top navigation bar with `← Gallery Hub` linking to `index.html`.
3. Add a new card in `index.html` featuring the mini-window interactive preview.
4. Update the catalog table in `README.md`.

---

## 📜 License

MIT License &bull; Free for personal and commercial use!
