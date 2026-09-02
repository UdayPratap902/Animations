# GSAP 3D ScrollTrigger Card Deck Animation 🚀

A buttery-smooth, hardware-accelerated **3D spatial card deck stacking animation** powered by **GSAP ScrollTrigger** and **Tailwind CSS**.

As the user scrolls, each incoming card ascends from below the viewport with realistic 3D perspective tilt (`rotateX: 38deg`) and seamlessly flattens to land on top of the stacked deck. Previous cards in the deck automatically scale down and offset upward to form an elegant tiered stack.

---

## ✨ Features

- 🎮 **Tactile 3D Perspective**: True CSS 3D space (`perspective: 1200px`) with hardware-accelerated transforms (`will-change: transform`).
- 📌 **Pin & Scrub Timeline**: Viewport pins cleanly while scroll progress scrubs through card arrivals.
- 📱 **Adaptive Breakpoints**: Dynamic mobile calibration (smaller tilt angles, adjusted vertical offsets, responsive padding).
- ⚛️ **React & Next.js Ready**: Includes modern `@gsap/react` hook implementation (`useGSAP`).
- 🌐 **Vanilla HTML / JS Included**: Works immediately with simple script tags via GSAP CDN.
- ♿ **Accessibility First**: Respects `prefers-reduced-motion: reduce`.
- 📋 **One-Click Copying**: Copy AI prompt directives, React components, and HTML snippets with one click.

---

## 📸 Demo Preview

Open `index.html` or `uk-reviews-stack-animation.html` directly in your browser or serve locally with any static web server:

```bash
# Using Python
python -m http.server 3000

# Using Node / npx
npx serve .
```

---

## 🧮 Mathematical Parameters & Formulas

| Parameter | Desktop (`≥ 768px`) | Mobile (`< 768px`) | Purpose / Formula |
|:---|:---:|:---:|:---|
| **Perspective** | `1200px` | `1200px` | Container 3D depth perception |
| **Initial Y-Offset** | `650px` | `480px` | Holds cards offstage below viewport |
| **Initial Tilt Angle** | `38deg` | `28deg` | `rotateX` forward tilt in 3D space |
| **Scroll Distance** | `900px` | `700px` | `totalScroll = (N - 1) * distPerCard` |
| **Deck Y-Offset** | `-18px * depthDiff` | `-12px * depthDiff` | Upward shift showing stacked card edges |
| **Deck Scale** | `1 - (0.04 * depthDiff)` | `1 - (0.04 * depthDiff)` | Layered background depth scaling |
| **Scrub Inertia** | `1.2` | `1.2` | GSAP scroll scrub lag for smooth feel |

---

## 🤖 AI Agent System Prompt

Want to drop this into an existing project using AI (ChatGPT, Claude, Cursor, Antigravity)? Copy this prompt:

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

## ⚛️ React / Next.js Implementation

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

      // 1. Initial State
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

      // 2. Timeline
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
      {/* Cards Stage with perspective */}
      <div className="relative flex-1 flex items-center justify-center px-4 w-full" style={{ perspective: "1200px" }}>
        {/* Your cards mapped here */}
      </div>
    </section>
  );
};
```

---

## 📜 License

MIT License — Feel free to use and adapt this in personal and commercial projects!
