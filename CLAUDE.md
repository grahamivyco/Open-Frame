# CLAUDE.md — Open Frame portfolio

Context for Claude Code working in this repo. Keep this file current: when you make a meaningful change, update the relevant section below.

## What this is
The portfolio website for **Open Frame**, the design studio of **Graham Ivy** (Minneapolis) — brand & product design: identity, websites, marketing. Tagline: *"Bring your brand into frame."*
Live at **https://openframe.design**.

## Repo, hosting & deploy
- Public repo: **github.com/grahamivyco/Open-Frame**, served by **GitHub Pages** (Settings → Pages → Deploy from a branch: `main` / root).
- **To publish: commit to `main` and push.** The site auto-deploys in ~1–2 minutes.
  ```bash
  git add -A && git commit -m "describe change" && git push
  ```
- Custom domain **openframe.design** (the `CNAME` file). DNS is at **Spaceship**: A-records → GitHub Pages IPs (185.199.108–111.153), `www` CNAME → grahamivyco.github.io.
- Email runs through **Google Workspace** (MX + a google-site-verification TXT at Spaceship). **Do not touch MX/TXT records** — they carry email, not the website.
- `.nojekyll` is present (serve files as-is, no Jekyll). **`404.html` is the SPA fallback — never delete it.**

## File structure
- **`index.html`** — the ENTIRE site. It's a single-file SPA; all CSS is in the `<style>` block and all JS is in the `<script>` block at the bottom. Edit this file directly.
- **`images/`** — assets, referenced as `images/...`: project covers (`cover-*.png`), portrait cut-outs (`graham-*.png`), case-study shots (`hs-*`, `ngm-*`, `witw-*`).
- **`404.html`** — GitHub Pages SPA redirect (rafgraph technique) so clean URLs work on refresh/direct hit.
- **`CNAME`**, **`Graham-Ivy-Resume.pdf`**, **`.nojekyll`**.

## Icons (single library)
- All functional icons come from **one inline Lucide line-icon sprite** defined once at the top of `<body>` (`<svg style="position:absolute"><defs><symbol id="i-…">…</symbol>…</defs></svg>`).
- **Use an icon with `<svg class="…"><use href="#i-…"/></svg>`** — never paste raw icon `<path>`s inline (that's what caused mismatched résumé/mail icons before). To add an icon, add one `<symbol>` to the sprite, then reference it.
- Icons inherit color via `currentColor`: set `color` on the outer `<svg>` (e.g. `style="color:#f24333"`) or via a class. Size via the outer svg's `width`/`height` or CSS (`.mi`, `.ico`, `.pico`, `.bi`, `.ic svg`).
- The brand **spark** (4-point star) and the **open-frame mark** are brand motifs, NOT part of the icon set — leave them as-is.

## How the site works (routing)
- SPA: `const PAGES=[...]`; `show(id)` toggles the visible `.page.active`.
- **Clean path URLs** via the History API. The slug↔id map is `SLUG2ID` in the script. Paths: `/work`, `/services`, `/about`, `/contact`, `/brand-identity-strategy`, `/web-product-design`, `/marketing-content`, `/brand-growth-consulting`, `/park-n-go`, `/hmong-cultural-center`, `/hellospoke`, `/wellness-in-the-woods`, `/needlework-guild-of-mn`.
- Navigation elements use `data-go="<id>"`; a global click handler calls `go(id)` → `history.pushState` + `show`. `404.html` + an inline decoder in `index.html` restore the path on direct/refresh loads.

## Design system (follow this)
- **Colors:** ink `#111110`, ink-2 `#4b4a46`, muted `#84827b`, white, cream panel `#f3f1ea`. Four accents used ONLY as accents/icons, cycled red `#f24333` → blue `#2f6bf0` → yellow `#f4bf3a` → green `#33ac66`.
- **Type:** Fraunces (serif headings), Inter (body/UI), Manrope (wordmark). Loaded from Google Fonts.
- **Radii:** 20px (`--r`), 30px (`--r-lg`), 100px pill. Buttons: **pill = internal nav**, **14px rounded-rect = external/mailto**.
- **Feel:** flat, bright, generous whitespace, **no drop shadows**. Signature motifs: the 4-point "spark" and the open-frame bracket mark. Custom brand cursor — **clickable cards use the custom cursor, not the pointer-hand**.
- Full spec: `Open-Frame-Design-System.md` (kept in Graham's Open Frame folder, not this repo).

## Editing conventions
- One file — edit `index.html`. After JS edits, sanity-check (e.g. extract the last `<script>` and `node --check`). Keep HTML tags balanced.
- Service cards are **white with a 1px outline**. Footer socials are **icon-only, filled**.
- Case-study heroes are two-column responsive **banners** (tag + title + short para + image). The "next case study" block is a **title + big cover-image card**.
- Keep copy tight and on-brand; prefer tasteful/minimal over busy.
- **Device mockups:** website screenshots go in a `.mock` browser-window frame (`.mock-bar` dots + `.url`, `.mock-view` holds the img). Add `scroll` for full-page captures — the window shows a 16/10 top-of-page and, on hover (desktop only), auto-scrolls the whole page; set the scroll distance per image with an inline `--sh:<pct>` (pct = `(1 − 0.625·w/h)·100`). Wrap a mock (or any element) in `.tstage` + class `tilt` for a single Park-n-Go-style angled shot; use `.pscene` with `.phone > .scr > img` for a scene of tilted phones (social/app content). Stages are the **only** place a (soft) shadow is allowed; everything respects `prefers-reduced-motion` and flattens on mobile.

## Current state (Jul 2026)
Recently shipped: clean path URLs + `404.html`; banner case-study heroes; big "next case study" cards; white outlined service cards; removed pointer-hand cursor (custom cursor hides native cursor everywhere on desktop); site email → **hello@openframe.design**. **Unified all functional icons to one inline Lucide sprite (`#i-*` via `<use>`)**; contact icons are square-less line icons that color on hover; the "Schedule a call" card is a whole-card link (no button).
Case-study media: `.cs-figure`/`.cs-hero-media` reserve a min-height with a loading shimmer (cleared via the `of-imgok` class on img `load`) so images no longer collapse to a thin line then jump; images use `decoding="async"` and the page preconnects to `grahamivy.com`/`s.wordpress.com`.
**HelloSpoke, Wellness & Needlework case studies reframed as clean device mockups** (see Editing conventions → Device mockups): tilted homepage/social heroes, `.mock` browser windows for the real page screenshots, and a tilted 3-phone VPSN scene for Wellness. This also **removed the two slow `s.wordpress.com/mshots` hero shots** (they're now local mockups). Self-hosted the HelloSpoke typography + mascot boards into the design-system row.
Added a **favicon** (black open-frame mark on transparent — `favicon.svg` flips to a cream mark on dark browser UIs via `prefers-color-scheme`; `favicon.ico` + 16/32 PNG fallbacks stay black; `apple-touch-icon.png` is white-backed so it stays visible on the iOS home screen) and a **social share card** (`og-image.png`, 1200×630, cream background, serif "Bring your brand into frame", `openframe.design` muted in the bottom-right corner) with full **Open Graph + Twitter `summary_large_image`** meta, `canonical`, and `theme-color`, all pointing at `https://openframe.design/` — so links preview properly on iMessage/Slack/LinkedIn/X.
**SEO:** added **JSON-LD structured data** (`Organization`/`ProfessionalService` + `Person` Graham Ivy + `WebSite`, with `sameAs` → LinkedIn) so Google understands Open Frame is a design studio — this is the main lever to stop it conflating the site with the *openFrame* open-source microscope. Also added `robots.txt`, `sitemap.xml` (home + all clean routes), a web app manifest (`site.webmanifest`) with 192/512 PNG icons, `<meta name="robots">`, author, and a keyword-rich `<title>`/description. Larger icons (`icon-192.png`/`icon-512.png`) + the manifest also help Google pick up the site favicon (it can take days–weeks to replace the default globe in search). **After deploy, submit the site in Google Search Console** (verify via the existing Spaceship DNS TXT) and submit `sitemap.xml` there to speed up indexing.
**Park n Go + Hmong images are now self-hosted** — the 37 `grahamivy.com` figures were downloaded, the heavy embedded-raster SVGs compressed to ~2000px **WebP** (`images/png-*.webp` / `hcc-*.webp`; 86 MB of SVG → 3.9 MB of WebP), every `src` updated, and the `grahamivy.com`/`s.wordpress.com` preconnect hints removed. The site now loads **no third-party case-study images**. (Their hero/hi-fi shots already carry the tilted composition, so they only needed localizing; the Hmong "before" screenshot got a `.mock` browser frame.)
**Brand design-system sections rebuilt** (`.bsys`): each case study shows a minimal card-style system — color swatches (chip + name + hex) and typography specimens rendered in the project's **real** typeface. Verified brand data: HelloSpoke (Navy #003A5D / Emerald #24C676 / Nunito), Park n Go (Ink #050505 / Signal Gold #FFC857 / Lexend + Poppins), Hmong (Ink / Jade #329459 / Fuchsia #FF6388 / Outfit), Wellness (Bark #57463D / Sage #949D79 / Periwinkle #5F6E9C / Cream / **Staatliches + Lato**), Needlework (Deep Indigo #2A3A6E / Cranberry #A43E4F / Golden Thread #D4AF37 / Spruce / Linen / **Merriweather + Open Sans**, from the official NGM Branding Guide in Drive — the site's live /about is the source of truth, the Figma is a draft). Those brand fonts are loaded via the Google Fonts `<link>`.
**Project covers** (`.pj` cards, all grids) pull each project's brand accent onto the corner fold + arrow, and on hover reveal a brand-tinted panel with just a one-line project description + the corner arrow (no title) — driven by the `PROJECTS` map in the script (accent/desc per id; the `name`/`font` fields are retained but unused now the hover wordmark was removed); text auto-contrasts to accent luminance.
**Home Services rebuilt as a full-viewport panel** (`.svc-stage`, was `.sect-narrow`): full-width, **white cards with a `--line` hairline outline** (contact-bento style) instead of cream fill, a uniform **2×2 grid centred vertically**, sized to **fit within one viewport on every screen** (desktop/tablet/mobile/landscape — cards use `min-height:clamp(150px,30svh,280px)`, descriptions `-webkit-line-clamp` on phones and hide on very short/landscape viewports). Compact by default (icon + title + description); on hover (desktop only) the fold tab + arrow appear and the service **bullet points fade in** (`max-height` reveal). `.svc-card` site-wide is now white+outline. **Removed `.svc-card` from the custom-cursor dark-selector** so the cursor stays ink (black) over the now-white cards.
Open/optional: unify the Park n Go + Hmong **cover art** with the others (brand-color field + spark + floating tilted screens — theirs are still full-bleed); real per-project logo files (currently the covers use typographic wordmarks); add per-page `<title>`/meta for SEO.

## Working with Graham
Non-technical by background (learning as he goes) — explain what a change does and why, and prefer safe, reversible steps. He often works on **one page at a time**.
