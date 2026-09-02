# 🎨 Animations Lab - Web Animations & Motion Gallery

Welcome to **Animations Lab**, an open-source collection of high-performance, drop-in web animations and interactive UI components. Built for modern frontends using **GSAP**, **ScrollTrigger**, and **Tailwind CSS**.

---

## 🌟 Available Animations

| Preview | Animation Name | Tech Stack | Status | Links |
|:---:|:---|:---|:---:|:---|
| 🎴 | **GSAP 3D Card Deck Stack**<br><sub>Hardware-accelerated 3D scroll scrub with tiered depth scaling</sub> | `GSAP 3.12`<br>`ScrollTrigger`<br>`Tailwind CSS` | 🟢 **Live & Ready** | [Gallery Hub](index.html) • [Full Page Demo](gsap-3d-card-stack.html) • [Code & Prompt](#-gsap-3d-scrolltrigger-card-deck) |

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
- **Full-Page Demo**: [`gsap-3d-card-stack.html`](gsap-3d-card-stack.html) (fullscreen scroll scrubbing & documentation)

---

## 🎴 GSAP 3D ScrollTrigger Card Deck

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

### 🤖 AI Agent System Prompt (Copy-Paste)

To replicate the 3D card stack in any project using AI assistants (ChatGPT, Claude, Cursor, Antigravity):

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

      // 1. Initial 3D state
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

      // 2. Timeline setup
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

      // 3. Step timeline
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
        {/* Your cards go here */}
      </div>
    </section>
  );
};
```

---

## 📜 License

MIT License &bull; Free for personal and commercial use!
