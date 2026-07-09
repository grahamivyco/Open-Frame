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

## Current state (Jul 2026)
Recently shipped: clean path URLs + `404.html`; banner case-study heroes; big "next case study" cards; icon-only filled footer; white outlined service cards; removed pointer-hand cursor; site email → **hello@openframe.design**.
Open/optional: finish a Figma design-system component library; add per-page `<title>`/meta for SEO.

## Working with Graham
Non-technical by background (learning as he goes) — explain what a change does and why, and prefer safe, reversible steps. He often works on **one page at a time**.
