/**
 * Components / Footer
 * Reusable <site-footer> Web Component
 * Standardized responsive footer with author attribution, portfolio, and GitHub links.
 */

(function () {
  class SiteFooter extends HTMLElement {
    connectedCallback() {
      const backToHub = this.getAttribute("back-to-hub") === "true";
      this.innerHTML = `
        <footer class="border-t border-warm-300 bg-[#FAF9F6] py-10 px-4 text-center text-xs text-ink-muted font-mono">
          <div class="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
              <span class="font-bold text-ink font-sans">Animations Lab</span>
              <span>&bull;</span>
              <span>Built by <a href="https://udaysingh.dev" target="_blank" rel="noopener noreferrer" class="font-bold text-ink hover:text-warm-800 underline decoration-warm-400 underline-offset-4 transition-colors">Uday Pratap Singh</a></span>
            </div>
            <div class="flex items-center gap-4 text-ink-muted flex-wrap justify-center">
              <a href="https://udaysingh.dev" target="_blank" rel="noopener noreferrer" class="hover:text-ink transition-colors flex items-center gap-1 font-semibold text-ink">
                <span>udaysingh.dev</span>
                <span>↗</span>
              </a>
              <span>&bull;</span>
              ${
                backToHub
                  ? '<a href="index.html" class="hover:text-ink transition-colors">← Back to Gallery Hub</a>'
                  : '<a href="#gallery" class="hover:text-ink transition-colors">Browse Gallery</a>'
              }
              <span>&bull;</span>
              <a href="https://github.com/UdayPratap902/Animations" target="_blank" rel="noopener noreferrer" class="hover:text-ink transition-colors">GitHub</a>
            </div>
          </div>
        </footer>
      `;
    }
  }

  customElements.define("site-footer", SiteFooter);
})();
