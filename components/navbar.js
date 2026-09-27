/**
 * Components / Navbar
 * Reusable <site-navbar> Web Component
 * Encapsulates responsive floating pill navbar, animated hamburger button,
 * and full-page hardware-accelerated bubble expansion menu.
 */

(function () {
  // Inject required navbar & bubble animation styles once into document head
  if (!document.getElementById("site-navbar-styles")) {
    const style = document.createElement("style");
    style.id = "site-navbar-styles";
    style.textContent = `
      /* Hamburger morphing lines */
      #mobile-nav-toggle.is-active .bar-top {
        transform: translateY(6px) rotate(45deg);
      }
      #mobile-nav-toggle.is-active .bar-mid {
        opacity: 0;
        transform: scaleX(0);
      }
      #mobile-nav-toggle.is-active .bar-bot {
        transform: translateY(-6px) rotate(-45deg);
      }

      /* Mobile Nav Overlay styling */
      #mobile-nav-overlay {
        transition: opacity 0.3s ease, visibility 0.3s ease;
      }
      #mobile-nav-bubble {
        will-change: clip-path;
      }
    `;
    document.head.appendChild(style);
  }

  class SiteNavbar extends HTMLElement {
    connectedCallback() {
      const active = this.getAttribute("active") || "index";
      this.render(active);
      this.initMobileBubbleNav();
    }

    render(active) {
      // Generate Desktop Navbar Header
      let desktopNavInner = "";
      if (active === "index") {
        desktopNavInner = `
          <a href="index.html" class="flex items-center gap-2 sm:gap-2.5 shrink-0 hover:opacity-90 transition-opacity">
            <div class="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-warm-200 border border-warm-400/50 text-ink flex items-center justify-center font-bold text-xs shadow-2xs">
              ✨
            </div>
            <span class="font-bold text-xs sm:text-sm tracking-wider uppercase text-ink">
              Animations<span class="text-warm-700 font-normal">Lab</span>
            </span>
          </a>

          <!-- Desktop Navigation Links (Visible on md+) -->
          <div class="hidden md:flex items-center gap-1 sm:gap-2 shrink-0">
            <a href="#gallery" class="text-[10px] sm:text-xs font-semibold tracking-widest uppercase px-2.5 sm:px-3 py-1.5 rounded-full text-ink-muted hover:text-ink transition-all">
              Gallery
            </a>
            <a href="gsap-3d-card-stack.html" class="text-[10px] sm:text-xs font-semibold tracking-widest uppercase px-2.5 sm:px-3 py-1.5 rounded-full text-ink-muted hover:text-ink transition-all">
              3D Deck
            </a>
            <a href="interactive-3d-review-stack.html" class="text-[10px] sm:text-xs font-semibold tracking-widest uppercase px-2.5 sm:px-3 py-1.5 rounded-full text-ink-muted hover:text-ink transition-all">
              3D Glare
            </a>
            <a href="gsap-horizontal-video-showcase.html" class="text-[10px] sm:text-xs font-semibold tracking-widest uppercase px-2.5 sm:px-3 py-1.5 rounded-full text-ink-muted hover:text-ink transition-all">
              Horizontal
            </a>
            <a href="interactive-3d-pricing-deck.html" class="text-[10px] sm:text-xs font-semibold tracking-widest uppercase px-2.5 sm:px-3 py-1.5 rounded-full text-ink-muted hover:text-ink transition-all">
              Pricing Deck
            </a>
            <a href="interactive-word-flip.html" class="text-[10px] sm:text-xs font-semibold tracking-widest uppercase px-2.5 sm:px-3 py-1.5 rounded-full text-ink-muted hover:text-ink transition-all">
              Word Flip
            </a>
            <a href="https://github.com/UdayPratap902/Animations" target="_blank" rel="noopener noreferrer" class="text-[10px] sm:text-xs font-bold tracking-widest uppercase border px-3 sm:px-4 py-1.5 rounded-full bg-ink text-warm-100 border-ink hover:bg-warm-900 hover:text-white transition-all shadow-2xs flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              <span>GitHub</span>
            </a>
          </div>
        `;
      } else if (active === "card-stack") {
        desktopNavInner = `
          <div class="flex items-center gap-2 sm:gap-3 shrink-0">
            <a href="index.html" class="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full border border-warm-300 bg-white/70 hover:bg-white text-ink text-[10px] sm:text-xs font-semibold tracking-wider uppercase transition-colors shadow-2xs">
              <span>←</span>
              <span>Hub</span>
            </a>
            <div class="h-4 w-[1px] bg-warm-300 hidden sm:block"></div>
            <div class="flex items-center gap-1.5 sm:gap-2">
              <div class="w-6 h-6 rounded-full bg-warm-200 border border-warm-400/50 text-ink flex items-center justify-center font-bold text-xs shadow-2xs">
                ✨
              </div>
              <span class="font-bold text-xs sm:text-sm tracking-wider uppercase text-ink">3D Card <span class="text-warm-700 font-normal">Stack</span></span>
            </div>
          </div>

          <div class="hidden md:flex items-center gap-2 sm:gap-3 shrink-0">
            <a href="#live-demo" class="text-[10px] sm:text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full border border-warm-300 bg-white/70 hover:bg-white text-ink-muted hover:text-ink transition-all shadow-2xs">
              Live Demo
            </a>
            <a href="#readme-section" class="text-[10px] sm:text-xs font-bold tracking-widest uppercase border px-4 py-1.5 rounded-full bg-ink text-warm-100 border-ink hover:bg-warm-900 hover:text-white transition-all shadow-[0_4px_15px_rgba(20,20,19,0.15)] flex items-center gap-1.5">
              <span>📖</span>
              <span>Docs &amp; Code</span>
            </a>
          </div>
        `;
      } else if (active === "3d-glare") {
        desktopNavInner = `
          <div class="flex items-center gap-2 sm:gap-3 shrink-0">
            <a href="index.html" class="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full border border-warm-300 bg-white/80 hover:bg-white text-ink text-[10px] sm:text-xs font-semibold tracking-wider uppercase transition-colors shadow-2xs">
              <span>←</span>
              <span>Gallery</span>
            </a>
            <div class="h-3.5 w-[1px] bg-warm-300 hidden sm:block"></div>
            <div class="flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span class="font-bold text-xs sm:text-sm tracking-wide uppercase text-ink font-mono">3D Glare <span class="text-warm-700 font-normal">Showcase</span></span>
            </div>
          </div>

          <div class="hidden lg:flex items-center gap-1 bg-warm-200/70 p-1 rounded-full border border-warm-300 text-xs font-mono shrink-0">
            <a href="#experience" class="px-3 py-1 rounded-full hover:bg-white text-ink font-medium transition-all">01. Live Stage</a>
            <a href="#deconstruct" class="px-3 py-1 rounded-full hover:bg-white text-ink-muted hover:text-ink transition-all">02. Deconstruct</a>
            <a href="#build" class="px-3 py-1 rounded-full hover:bg-white text-ink-muted hover:text-ink transition-all">03. Code</a>
            <a href="#reference" class="px-3 py-1 rounded-full hover:bg-white text-ink-muted hover:text-ink transition-all">04. Specs</a>
          </div>

          <div class="hidden md:flex items-center gap-2 shrink-0">
            <a href="#build" class="text-[10px] sm:text-xs font-bold tracking-wider uppercase border px-3.5 py-1.5 rounded-full bg-ink text-warm-100 border-ink hover:bg-warm-900 hover:text-white transition-all shadow-xs flex items-center gap-1">
              <span>&lt;/&gt;</span>
              <span>Get Code</span>
            </a>
          </div>
        `;
      } else if (active === "horizontal") {
        desktopNavInner = `
          <div class="flex items-center gap-2 sm:gap-3 shrink-0">
            <a href="index.html" class="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full border border-warm-300 bg-white/80 hover:bg-white text-ink text-[10px] sm:text-xs font-semibold tracking-wider uppercase transition-colors shadow-2xs">
              <span>←</span>
              <span>Hub</span>
            </a>
            <div class="h-3.5 w-[1px] bg-warm-300 hidden sm:block"></div>
            <div class="flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
              <span class="font-bold text-xs sm:text-sm tracking-wide uppercase text-ink font-mono">Horizontal Scroll <span class="text-warm-700 font-normal">Showcase</span></span>
            </div>
          </div>

          <div class="hidden lg:flex items-center gap-1 bg-warm-200/70 p-1 rounded-full border border-warm-300 text-xs font-mono shrink-0">
            <a href="#experience" class="px-3 py-1 rounded-full hover:bg-white text-ink font-medium transition-all">01. Live Stage</a>
            <a href="#architecture" class="px-3 py-1 rounded-full hover:bg-white text-ink-muted hover:text-ink transition-all">02. Architecture</a>
            <a href="#code" class="px-3 py-1 rounded-full hover:bg-white text-ink-muted hover:text-ink transition-all">03. Code</a>
            <a href="#specs" class="px-3 py-1 rounded-full hover:bg-white text-ink-muted hover:text-ink transition-all">04. Specs</a>
          </div>

          <div class="hidden md:flex items-center gap-2 shrink-0">
            <a href="#code" class="text-[10px] sm:text-xs font-bold tracking-wider uppercase border px-3.5 py-1.5 rounded-full bg-ink text-warm-100 border-ink hover:bg-warm-900 hover:text-white transition-all shadow-xs flex items-center gap-1">
              <span>&lt;/&gt;</span>
              <span>Get Code</span>
            </a>
          </div>
        `;
      } else if (active === "pricing-deck") {
        desktopNavInner = `
          <div class="flex items-center gap-2 sm:gap-3 shrink-0">
            <a href="index.html" class="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full border border-warm-300 bg-white/80 hover:bg-white text-ink text-[10px] sm:text-xs font-semibold tracking-wider uppercase transition-colors shadow-2xs">
              <span>←</span>
              <span>Hub</span>
            </a>
            <div class="h-3.5 w-[1px] bg-warm-300 hidden sm:block"></div>
            <div class="flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-[#5CE0B8] animate-pulse"></span>
              <span class="font-bold text-xs sm:text-sm tracking-wide uppercase text-ink font-mono">3D Pricing <span class="text-warm-700 font-normal">Deck</span></span>
            </div>
          </div>

          <div class="hidden lg:flex items-center gap-1 bg-warm-200/70 p-1 rounded-full border border-warm-300 text-xs font-mono shrink-0">
            <a href="#experience" class="px-3 py-1 rounded-full hover:bg-white text-ink font-medium transition-all">01. Live Stage</a>
            <a href="#deconstruct" class="px-3 py-1 rounded-full hover:bg-white text-ink-muted hover:text-ink transition-all">02. Deconstruct</a>
            <a href="#reference" class="px-3 py-1 rounded-full hover:bg-white text-ink-muted hover:text-ink transition-all">03. Specs</a>
            <a href="#code" class="px-3 py-1 rounded-full hover:bg-white text-ink-muted hover:text-ink transition-all">04. Code</a>
          </div>

          <div class="hidden md:flex items-center gap-2 shrink-0">
            <a href="#code" class="text-[10px] sm:text-xs font-bold tracking-wider uppercase border px-3.5 py-1.5 rounded-full bg-ink text-warm-100 border-ink hover:bg-warm-900 hover:text-white transition-all shadow-xs flex items-center gap-1">
              <span>&lt;/&gt;</span>
              <span>Get Code</span>
            </a>
          </div>
        `;
      } else if (active === "word-flip") {
        desktopNavInner = `
          <div class="flex items-center gap-2 sm:gap-3 shrink-0">
            <a href="index.html" class="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full border border-warm-300 bg-white/70 hover:bg-white text-ink text-[10px] sm:text-xs font-semibold tracking-wider uppercase transition-colors shadow-2xs">
              <span>←</span>
              <span>Hub</span>
            </a>
            <div class="h-3.5 w-[1px] bg-warm-300 hidden sm:block"></div>
            <div class="flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-amber-600 animate-pulse"></span>
              <span class="font-bold text-xs sm:text-sm tracking-wide uppercase text-ink font-mono">Word Flip <span class="text-warm-700 font-normal">Lab</span></span>
            </div>
          </div>

          <div class="hidden lg:flex items-center gap-1 bg-warm-200/70 p-1 rounded-full border border-warm-300 text-xs font-mono shrink-0">
            <a href="#experience" class="px-3 py-1 rounded-full hover:bg-white text-ink font-medium transition-all">01. Live Stage</a>
            <a href="#deconstruct" class="px-3 py-1 rounded-full hover:bg-white text-ink-muted hover:text-ink transition-all">02. Deconstruct</a>
            <a href="#reference" class="px-3 py-1 rounded-full hover:bg-white text-ink-muted hover:text-ink transition-all">03. Specs</a>
            <a href="#code" class="px-3 py-1 rounded-full hover:bg-white text-ink-muted hover:text-ink transition-all">04. Code</a>
          </div>

          <div class="hidden md:flex items-center gap-2 shrink-0">
            <a href="#code" class="text-[10px] sm:text-xs font-bold tracking-wider uppercase border px-3.5 py-1.5 rounded-full bg-ink text-warm-100 border-ink hover:bg-warm-900 hover:text-white transition-all shadow-xs flex items-center gap-1">
              <span>&lt;/&gt;</span>
              <span>Get Code</span>
            </a>
          </div>
        `;
      }

      // Generate Page-specific Quick Section Links in Mobile Menu
      let mobileQuickJumps = "";
      if (active === "index") {
        mobileQuickJumps = `
          <a href="#gallery" class="px-3 py-1 rounded-full border border-warm-300 bg-white/80 hover:bg-white text-ink text-xs font-semibold transition-all shadow-2xs">
            Showcase Cards
          </a>
        `;
      } else if (active === "card-stack") {
        mobileQuickJumps = `
          <a href="#live-demo" class="px-3 py-1 rounded-full border border-warm-300 bg-white/80 hover:bg-white text-ink text-xs font-semibold transition-all shadow-2xs">
            01. Live Demo
          </a>
          <a href="#readme-section" class="px-3 py-1 rounded-full border border-warm-300 bg-white/80 hover:bg-white text-ink text-xs font-semibold transition-all shadow-2xs">
            02. Docs &amp; Code
          </a>
        `;
      } else if (active === "3d-glare") {
        mobileQuickJumps = `
          <a href="#experience" class="px-3 py-1 rounded-full border border-warm-300 bg-white/80 hover:bg-white text-ink text-xs font-semibold transition-all shadow-2xs">
            01. Live Stage
          </a>
          <a href="#deconstruct" class="px-3 py-1 rounded-full border border-warm-300 bg-white/80 hover:bg-white text-ink text-xs font-semibold transition-all shadow-2xs">
            02. Deconstruct
          </a>
          <a href="#build" class="px-3 py-1 rounded-full border border-warm-300 bg-white/80 hover:bg-white text-ink text-xs font-semibold transition-all shadow-2xs">
            03. Code
          </a>
          <a href="#reference" class="px-3 py-1 rounded-full border border-warm-300 bg-white/80 hover:bg-white text-ink text-xs font-semibold transition-all shadow-2xs">
            04. Specs
          </a>
        `;
      } else if (active === "horizontal") {
        mobileQuickJumps = `
          <a href="#experience" class="px-3 py-1 rounded-full border border-warm-300 bg-white/80 hover:bg-white text-ink text-xs font-semibold transition-all shadow-2xs">
            01. Live Stage
          </a>
          <a href="#architecture" class="px-3 py-1 rounded-full border border-warm-300 bg-white/80 hover:bg-white text-ink text-xs font-semibold transition-all shadow-2xs">
            02. Architecture
          </a>
          <a href="#code" class="px-3 py-1 rounded-full border border-warm-300 bg-white/80 hover:bg-white text-ink text-xs font-semibold transition-all shadow-2xs">
            03. Code
          </a>
          <a href="#specs" class="px-3 py-1 rounded-full border border-warm-300 bg-white/80 hover:bg-white text-ink text-xs font-semibold transition-all shadow-2xs">
            04. Specs
          </a>
        `;
      } else if (active === "pricing-deck") {
        mobileQuickJumps = `
          <a href="#experience" class="px-3 py-1 rounded-full border border-warm-300 bg-white/80 hover:bg-white text-ink text-xs font-semibold transition-all shadow-2xs">
            01. Live Stage
          </a>
          <a href="#deconstruct" class="px-3 py-1 rounded-full border border-warm-300 bg-white/80 hover:bg-white text-ink text-xs font-semibold transition-all shadow-2xs">
            02. Deconstruct
          </a>
          <a href="#reference" class="px-3 py-1 rounded-full border border-warm-300 bg-white/80 hover:bg-white text-ink text-xs font-semibold transition-all shadow-2xs">
            03. Specs
          </a>
          <a href="#code" class="px-3 py-1 rounded-full border border-warm-300 bg-white/80 hover:bg-white text-ink text-xs font-semibold transition-all shadow-2xs">
            04. Code
          </a>
        `;
      } else if (active === "word-flip") {
        mobileQuickJumps = `
          <a href="#experience" class="px-3 py-1 rounded-full border border-warm-300 bg-white/80 hover:bg-white text-ink text-xs font-semibold transition-all shadow-2xs">
            01. Live Stage
          </a>
          <a href="#deconstruct" class="px-3 py-1 rounded-full border border-warm-300 bg-white/80 hover:bg-white text-ink text-xs font-semibold transition-all shadow-2xs">
            02. Deconstruct
          </a>
          <a href="#reference" class="px-3 py-1 rounded-full border border-warm-300 bg-white/80 hover:bg-white text-ink text-xs font-semibold transition-all shadow-2xs">
            03. Specs
          </a>
          <a href="#code" class="px-3 py-1 rounded-full border border-warm-300 bg-white/80 hover:bg-white text-ink text-xs font-semibold transition-all shadow-2xs">
            04. Code
          </a>
        `;
      }

      this.innerHTML = `
        <!-- Floating Pill Navbar -->
        <nav class="fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-[calc(100vw-2rem)] max-w-fit sm:w-auto pointer-events-auto rounded-full border border-warm-300 bg-[#FAF9F6]/90 backdrop-blur-md px-3.5 sm:px-6 py-2 shadow-[0_8px_30px_rgba(40,30,10,0.06)] flex items-center justify-between gap-2.5 sm:gap-6 whitespace-nowrap">
          ${desktopNavInner}

          <!-- Mobile Hamburger Toggle Button (Visible on < md) -->
          <button id="mobile-nav-toggle" aria-label="Toggle navigation menu" aria-expanded="false" class="md:hidden relative z-50 w-8 h-8 rounded-full border border-warm-300 bg-white/90 hover:bg-white text-ink flex flex-col items-center justify-center gap-[4.5px] transition-all shadow-2xs cursor-pointer select-none active:scale-95 focus:outline-none">
            <span class="bar-top block w-4 h-[1.5px] bg-ink rounded-full transition-transform duration-300 ease-out origin-center"></span>
            <span class="bar-mid block w-4 h-[1.5px] bg-ink rounded-full transition-all duration-200 ease-out origin-center"></span>
            <span class="bar-bot block w-4 h-[1.5px] bg-ink rounded-full transition-transform duration-300 ease-out origin-center"></span>
          </button>
        </nav>

        <!-- Full-Page Bubble Navigation Overlay -->
        <div id="mobile-nav-overlay" class="fixed inset-0 z-40 pointer-events-none opacity-0 invisible overflow-hidden" aria-hidden="true">
          <!-- Dynamic Expanding Bubble Canvas / Mask -->
          <div id="mobile-nav-bubble" class="absolute inset-0 bg-[#FAF9F6]/95 backdrop-blur-2xl flex flex-col justify-between p-5 sm:p-8 pt-24 pb-6 overflow-y-auto" style="clip-path: circle(0px at 90% 28px);">
            
            <!-- Atmospheric Ambient Glows within the overlay -->
            <div class="glow-orb -top-24 -left-24 w-80 h-80 bg-warm-300/40 rounded-full blur-3xl pointer-events-none absolute"></div>
            <div class="glow-orb bottom-10 -right-20 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none absolute"></div>
            <div class="noise-overlay opacity-10"></div>

            <!-- Overlay Top Category Bar -->
            <div class="relative z-10 flex items-center justify-between border-b border-warm-300 pb-3 mb-4 max-w-xl mx-auto w-full">
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-warm-700 animate-pulse"></span>
                <span class="text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-ink-muted">Navigation Menu</span>
              </div>
              <button id="mobile-nav-close-btn" class="px-2.5 py-1 rounded-full border border-warm-300 bg-white/80 hover:bg-white text-[11px] font-mono text-ink font-semibold shadow-2xs flex items-center gap-1 transition-colors">
                <span>✕</span> <span>Close</span>
              </button>
            </div>

            <!-- Showcase Labs Navigation Links -->
            <div class="relative z-10 flex flex-col gap-2.5 max-w-xl mx-auto w-full my-auto py-2">
              <!-- Link 1: Gallery Hub -->
              <a href="index.html" class="mobile-nav-item group relative p-3.5 sm:p-4 rounded-2xl border ${active === "index" ? "border-warm-700 bg-warm-200/90 shadow-sm" : "border-warm-300 bg-white/80 hover:bg-white hover:border-warm-400 shadow-2xs"} transition-all duration-300 flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl ${active === "index" ? "bg-warm-300/80 border-warm-400/60" : "bg-warm-200/70 border-warm-300"} border flex items-center justify-center text-lg shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                    ✨
                  </div>
                  <div>
                    <div class="flex items-center gap-2">
                      <span class="text-[10px] font-mono font-bold uppercase tracking-widest ${active === "index" ? "text-warm-800" : "text-warm-700"}">01 &bull; Hub</span>
                      ${active === "index" ? '<span class="text-[9px] font-mono px-1.5 py-0.5 rounded bg-warm-800 text-warm-50 font-bold">CURRENT</span>' : ""}
                    </div>
                    <div class="font-bold text-sm text-ink group-hover:text-warm-900 transition-colors">
                      Animations Lab Gallery
                    </div>
                    <div class="text-[11px] text-ink-muted line-clamp-1">
                      Curated collection of 5 production motion components
                    </div>
                  </div>
                </div>
                <span class="text-ink-subtle group-hover:text-ink group-hover:translate-x-1 transition-all text-sm font-bold">→</span>
              </a>

              <!-- Link 2: 3D Card Stack -->
              <a href="gsap-3d-card-stack.html" class="mobile-nav-item group relative p-3.5 sm:p-4 rounded-2xl border ${active === "card-stack" ? "border-warm-700 bg-warm-200/90 shadow-sm" : "border-warm-300 bg-white/80 hover:bg-white hover:border-warm-400 shadow-2xs"} transition-all duration-300 flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl ${active === "card-stack" ? "bg-warm-300/80 border-warm-400/60" : "bg-warm-200/70 border-warm-300"} border flex items-center justify-center text-lg shrink-0 group-hover:scale-105 transition-transform">
                    🃏
                  </div>
                  <div>
                    <div class="flex items-center gap-2">
                      <span class="text-[10px] font-mono font-bold uppercase tracking-widest ${active === "card-stack" ? "text-warm-800" : "text-warm-700"}">02 &bull; 3D Deck</span>
                      ${active === "card-stack" ? '<span class="text-[9px] font-mono px-1.5 py-0.5 rounded bg-warm-800 text-warm-50 font-bold">CURRENT</span>' : ""}
                    </div>
                    <div class="font-bold text-sm text-ink group-hover:text-warm-900 transition-colors">
                      GSAP 3D Card Stack
                    </div>
                    <div class="text-[11px] text-ink-muted line-clamp-1">
                      ScrollTrigger spatial perspective card pinning
                    </div>
                  </div>
                </div>
                <span class="text-ink-subtle group-hover:text-ink group-hover:translate-x-1 transition-all text-sm font-bold">→</span>
              </a>

              <!-- Link 3: 3D Glare Showcase -->
              <a href="interactive-3d-review-stack.html" class="mobile-nav-item group relative p-3.5 sm:p-4 rounded-2xl border ${active === "3d-glare" ? "border-warm-700 bg-warm-200/90 shadow-sm" : "border-warm-300 bg-white/80 hover:bg-white hover:border-warm-400 shadow-2xs"} transition-all duration-300 flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl ${active === "3d-glare" ? "bg-warm-300/80 border-warm-400/60" : "bg-warm-200/70 border-warm-300"} border flex items-center justify-center text-lg shrink-0 group-hover:scale-105 transition-transform">
                    💎
                  </div>
                  <div>
                    <div class="flex items-center gap-2">
                      <span class="text-[10px] font-mono font-bold uppercase tracking-widest ${active === "3d-glare" ? "text-warm-800" : "text-warm-700"}">03 &bull; Carousel</span>
                      ${active === "3d-glare" ? '<span class="text-[9px] font-mono px-1.5 py-0.5 rounded bg-warm-800 text-warm-50 font-bold">CURRENT</span>' : ""}
                    </div>
                    <div class="font-bold text-sm text-ink group-hover:text-warm-900 transition-colors">
                      3D Specular Glare Carousel
                    </div>
                    <div class="text-[11px] text-ink-muted line-clamp-1">
                      Interactive spatial cards with specular glare reflection
                    </div>
                  </div>
                </div>
                <span class="text-ink-subtle group-hover:text-ink group-hover:translate-x-1 transition-all text-sm font-bold">→</span>
              </a>

              <!-- Link 4: Horizontal Scroll Showcase -->
              <a href="gsap-horizontal-video-showcase.html" class="mobile-nav-item group relative p-3.5 sm:p-4 rounded-2xl border ${active === "horizontal" ? "border-warm-700 bg-warm-200/90 shadow-sm" : "border-warm-300 bg-white/80 hover:bg-white hover:border-warm-400 shadow-2xs"} transition-all duration-300 flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl ${active === "horizontal" ? "bg-warm-300/80 border-warm-400/60" : "bg-warm-200/70 border-warm-300"} border flex items-center justify-center text-lg shrink-0 group-hover:scale-105 transition-transform">
                    🎬
                  </div>
                  <div>
                    <div class="flex items-center gap-2">
                      <span class="text-[10px] font-mono font-bold uppercase tracking-widest ${active === "horizontal" ? "text-warm-800" : "text-warm-700"}">04 &bull; ScrollTrigger</span>
                      ${active === "horizontal" ? '<span class="text-[9px] font-mono px-1.5 py-0.5 rounded bg-warm-800 text-warm-50 font-bold">CURRENT</span>' : ""}
                    </div>
                    <div class="font-bold text-sm text-ink group-hover:text-warm-900 transition-colors">
                      Horizontal Video Showcase
                    </div>
                    <div class="text-[11px] text-ink-muted line-clamp-1">
                      Multi-panel scroll-pinned horizontal slider &amp; specs
                    </div>
                  </div>
                </div>
                <span class="text-ink-subtle group-hover:text-ink group-hover:translate-x-1 transition-all text-sm font-bold">→</span>
              </a>

              <!-- Link 5: 3D Pricing Deck -->
              <a href="interactive-3d-pricing-deck.html" class="mobile-nav-item group relative p-3.5 sm:p-4 rounded-2xl border ${active === "pricing-deck" ? "border-warm-700 bg-warm-200/90 shadow-sm" : "border-warm-300 bg-white/80 hover:bg-white hover:border-warm-400 shadow-2xs"} transition-all duration-300 flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl ${active === "pricing-deck" ? "bg-warm-300/80 border-warm-400/60" : "bg-warm-200/70 border-warm-300"} border flex items-center justify-center text-lg shrink-0 group-hover:scale-105 transition-transform">
                    💳
                  </div>
                  <div>
                    <div class="flex items-center gap-2">
                      <span class="text-[10px] font-mono font-bold uppercase tracking-widest ${active === "pricing-deck" ? "text-warm-800" : "text-warm-700"}">05 &bull; Pricing Deck</span>
                      ${active === "pricing-deck" ? '<span class="text-[9px] font-mono px-1.5 py-0.5 rounded bg-warm-800 text-warm-50 font-bold">CURRENT</span>' : ""}
                    </div>
                    <div class="font-bold text-sm text-ink group-hover:text-warm-900 transition-colors">
                      3D Pricing Deck
                    </div>
                    <div class="text-[11px] text-ink-muted line-clamp-1">
                      Hover-elevation fanning deck with benefit expansion
                    </div>
                  </div>
                </div>
                <span class="text-ink-subtle group-hover:text-ink group-hover:translate-x-1 transition-all text-sm font-bold">→</span>
              </a>

              <!-- Link 6: Word Flip Lab -->
              <a href="interactive-word-flip.html" class="mobile-nav-item group relative p-3.5 sm:p-4 rounded-2xl border ${active === "word-flip" ? "border-warm-700 bg-warm-200/90 shadow-sm" : "border-warm-300 bg-white/80 hover:bg-white hover:border-warm-400 shadow-2xs"} transition-all duration-300 flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl ${active === "word-flip" ? "bg-warm-300/80 border-warm-400/60" : "bg-warm-200/70 border-warm-300"} border flex items-center justify-center text-lg shrink-0 group-hover:scale-105 transition-transform">
                    🔤
                  </div>
                  <div>
                    <div class="flex items-center gap-2">
                      <span class="text-[10px] font-mono font-bold uppercase tracking-widest ${active === "word-flip" ? "text-warm-800" : "text-warm-700"}">06 &bull; Kinetic Typography</span>
                      ${active === "word-flip" ? '<span class="text-[9px] font-mono px-1.5 py-0.5 rounded bg-warm-800 text-warm-50 font-bold">CURRENT</span>' : ""}
                    </div>
                    <div class="font-bold text-sm text-ink group-hover:text-warm-900 transition-colors">
                      Word Flip &amp; Staggered Motion
                    </div>
                    <div class="text-[11px] text-ink-muted line-clamp-1">
                      Spring-powered word pull-up &amp; kinetic typography motion
                    </div>
                  </div>
                </div>
                <span class="text-ink-subtle group-hover:text-ink group-hover:translate-x-1 transition-all text-sm font-bold">→</span>
              </a>
            </div>

            <!-- Quick Jump & Footer Links -->
            <div class="relative z-10 pt-4 border-t border-warm-300 mt-4 flex flex-col items-center justify-between gap-3 max-w-xl mx-auto w-full">
              <div class="mobile-nav-item flex items-center justify-center gap-2 flex-wrap w-full">
                <span class="text-[10px] font-mono text-ink-subtle uppercase tracking-wider">Page Sections:</span>
                ${mobileQuickJumps}
                <a href="https://github.com/UdayPratap902/Animations" target="_blank" rel="noopener noreferrer" class="px-3 py-1 rounded-full border border-ink bg-ink hover:bg-warm-900 text-warm-100 text-xs font-semibold transition-all shadow-2xs flex items-center gap-1.5">
                  <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                  <span>GitHub</span>
                </a>
              </div>
              <div class="text-[10px] font-mono text-ink-subtle text-center">
                Hardware-Accelerated Web Motion &bull; GSAP 3.12 &bull; 60+ FPS
              </div>
            </div>
          </div>

          <!-- Bubble Ripple Ring (Liquid pop effect originating from hamburger button) -->
          <div id="bubble-ripple" class="pointer-events-none absolute w-10 h-10 rounded-full border-2 border-warm-500/50 -translate-x-1/2 -translate-y-1/2 opacity-0 z-50"></div>
        </div>
      `;
    }

    initMobileBubbleNav() {
      const toggleBtn = this.querySelector("#mobile-nav-toggle");
      const overlay = this.querySelector("#mobile-nav-overlay");
      const bubble = this.querySelector("#mobile-nav-bubble");
      const closeBtn = this.querySelector("#mobile-nav-close-btn");
      const ripple = this.querySelector("#bubble-ripple");
      if (!toggleBtn || !overlay || !bubble) return;

      const navItems = overlay.querySelectorAll(".mobile-nav-item");
      let isOpen = false;
      let isAnimating = false;

      function getOrigin() {
        const rect = toggleBtn.getBoundingClientRect();
        return {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        };
      }

      function openMenu() {
        if (isAnimating || isOpen) return;
        isAnimating = true;
        isOpen = true;

        toggleBtn.setAttribute("aria-expanded", "true");
        toggleBtn.classList.add("is-active");
        document.body.style.overflow = "hidden";

        const { x, y } = getOrigin();
        const maxRadius = Math.hypot(
          Math.max(x, window.innerWidth - x),
          Math.max(y, window.innerHeight - y)
        ) * 1.05;

        overlay.style.pointerEvents = "auto";
        overlay.style.visibility = "visible";
        overlay.setAttribute("aria-hidden", "false");

        if (window.gsap) {
          const tl = gsap.timeline({
            onComplete: () => {
              isAnimating = false;
            }
          });

          // Bubble ripple pulse
          if (ripple) {
            gsap.set(ripple, {
              left: x,
              top: y,
              width: 24,
              height: 24,
              opacity: 0.9,
              scale: 1
            });
            tl.to(ripple, {
              scale: 9,
              opacity: 0,
              duration: 0.6,
              ease: "power2.out"
            }, 0);
          }

          // Full-page circular bubble expansion
          tl.to(overlay, { opacity: 1, duration: 0.15 }, 0);
          tl.fromTo(bubble,
            { clipPath: `circle(0px at ${x}px ${y}px)` },
            { 
              clipPath: `circle(${maxRadius}px at ${x}px ${y}px)`,
              duration: 0.65,
              ease: "power3.inOut"
            },
            0
          );

          // Staggered entrance for items
          if (navItems.length) {
            tl.fromTo(navItems,
              { opacity: 0, y: 25, scale: 0.95 },
              { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.05, ease: "power2.out" },
              "-=0.3"
            );
          }
        } else {
          overlay.style.opacity = "1";
          bubble.style.clipPath = "none";
          isAnimating = false;
        }
      }

      function closeMenu(callback) {
        if (isAnimating || !isOpen) return;
        isAnimating = true;
        isOpen = false;

        toggleBtn.setAttribute("aria-expanded", "false");
        toggleBtn.classList.remove("is-active");
        document.body.style.overflow = "";

        const { x, y } = getOrigin();

        if (window.gsap) {
          const tl = gsap.timeline({
            onComplete: () => {
              overlay.style.pointerEvents = "none";
              overlay.style.visibility = "hidden";
              overlay.setAttribute("aria-hidden", "true");
              isAnimating = false;
              if (typeof callback === "function") callback();
            }
          });

          if (navItems.length) {
            tl.to(navItems, {
              opacity: 0,
              y: 15,
              duration: 0.2,
              stagger: 0.02,
              ease: "power2.in"
            }, 0);
          }

          tl.to(bubble, {
            clipPath: `circle(0px at ${x}px ${y}px)`,
            duration: 0.45,
            ease: "power3.inOut"
          }, "-=0.1");

          tl.to(overlay, { opacity: 0, duration: 0.2 }, "-=0.15");
        } else {
          overlay.style.opacity = "0";
          overlay.style.pointerEvents = "none";
          overlay.style.visibility = "hidden";
          isAnimating = false;
          if (typeof callback === "function") callback();
        }
      }

      toggleBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (isOpen) closeMenu();
        else openMenu();
      });

      if (closeBtn) {
        closeBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          closeMenu();
        });
      }

      window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && isOpen) closeMenu();
      });

      overlay.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", (e) => {
          const href = link.getAttribute("href");
          if (!href || href.startsWith("http") || link.target === "_blank") return;

          if (href.startsWith("#")) {
            e.preventDefault();
            closeMenu(() => {
              const el = document.querySelector(href);
              if (el) el.scrollIntoView({ behavior: "smooth" });
            });
          } else {
            e.preventDefault();
            closeMenu(() => {
              window.location.href = href;
            });
          }
        });
      });

      window.addEventListener("resize", () => {
        if (window.innerWidth >= 768 && isOpen) closeMenu();
      });
    }
  }

  customElements.define("site-navbar", SiteNavbar);
})();
