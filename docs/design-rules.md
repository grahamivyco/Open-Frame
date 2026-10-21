# Open Frame design rules (paste into any project that builds openframe.design pages)

This file lives in the repo at `docs/design-rules.md` and is the copy to keep current. Read `CONTEXT.md` first.

Source of truth: the live site code in `grahamivyco/Open-Frame` (`index.html`, `studio/index.html`), pulled 2026-10-21. Every value below is copied from shipped CSS. If a page needs something not covered here, copy the closest existing pattern from that repo instead of inventing one.

---

## 0. Hard rules (check these before shipping any page)

1. Use the tokens in section 1. No new colors, fonts, radii or easings.
2. Fraunces for headings, Inter for everything else, Manrope only for the "Open Frame" wordmark.
3. The four accents (red, blue, yellow, green) are for icons, sparks, hovers and small tags. Never for big backgrounds or body text. Exception: the yellow "feature" tag and per-project brand tints on case studies.
4. Flat. No drop shadows on cards, buttons or panels. No gradients on UI. (Only allowed shadow: tilted device mockups, and the soft colored glow on a hovered white/dark button.)
5. Pill buttons (100px radius) = internal links. 14px rounded-rect buttons = external links, mailto, and form fields.
6. Cards are white with a 1px hairline (`--line`) or cream (`--panel`) with no border. Dark ink cards are for one emphasis per section only.
7. Sections sit inside `.wrap` (max 2200px, gutter `clamp(18px,4.5vw,76px)`). Big content blocks use `--r-lg` (30px) corners, cards inside them `--r` (20px).
8. Every section opens with an eyebrow (small caps label + colored spark) and a serif heading.
9. Use the site's real header and footer (section 6). Never a custom nav.
10. Respect `prefers-reduced-motion`. Every animation must switch off under it.
11. All copy goes through the **humanizer** skill, then the **structural-humanizer** skill, before it ships (section 9).
12. Works at 360px wide with no horizontal scroll. Test at 360, 820, 1280, 1920.

---

## 1. Tokens (paste as-is)

```css
:root{
  /* color */
  --bg:#ffffff;        /* page */
  --ink:#111110;       /* text, dark buttons */
  --ink-2:#4b4a46;     /* secondary text */
  --muted:#84827b;     /* labels, captions, meta */
  --panel:#f3f1ea;     /* cream panels (hero box, footer, forms) */
  --panel-2:#eceae1;   /* cream, one step darker */
  --card:#1e1d1b;      /* dark CTA band */
  --line:rgba(0,0,0,.10);   /* hairlines, card borders */
  --line-2:rgba(0,0,0,.18); /* stronger outline (outline buttons, hover) */
  --red:#f24333; --blue:#2f6bf0; --yellow:#f4bf3a; --green:#33ac66;

  /* type */
  --serif:"Fraunces",Georgia,serif;
  --sans:"Inter",system-ui,-apple-system,sans-serif;

  /* layout */
  --maxw:2200px;
  --gutter:clamp(18px,4.5vw,76px);
  --sect:clamp(58px,7vw,100px);   /* vertical gap between sections */
  --r:20px; --r-lg:30px; --pill:100px;

  /* motion */
  --ease:cubic-bezier(.22,1,.36,1);       /* default UI ease */
  --ease-out:cubic-bezier(.16,1,.3,1);    /* scroll reveals */
  --ease-flow:cubic-bezier(.4,0,.2,1);    /* layout changes (accordions, growing tiles) */
  --flow:.65s;
}
```

Fonts (Google Fonts):
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=Inter:wght@400;500;600&family=Manrope:wght@600;700&display=swap" rel="stylesheet">
```

Accent order when cycling (nav sparks, lists, steps, pricing cards): **red → blue → yellow → green**, then repeat.

---

## 2. Base styles

```css
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}
body{font-family:var(--sans);background:var(--bg);color:var(--ink);line-height:1.6;font-size:16.5px;font-weight:400;-webkit-font-smoothing:antialiased;overflow-x:hidden}
img,svg,canvas{display:block;max-width:100%}
a{color:inherit;text-decoration:none}
ul{list-style:none}
::selection{background:var(--ink);color:#fff}
h1,h2,h3,h4{font-family:var(--serif);font-weight:500;line-height:1.04;letter-spacing:-.015em;color:var(--ink);text-wrap:balance}
p{text-wrap:pretty}
.wrap{width:100%;max-width:var(--maxw);margin-inline:auto;padding-inline:var(--gutter)}
@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}*{animation-duration:.001ms!important;transition-duration:.001ms!important}}
```

---

## 3. Type scale

| Role | Font | Size | Notes |
|---|---|---|---|
| Home hero h1 | Fraunces 500 | `clamp(2.6rem,4.4vw,4.6rem)` | line-height .96, letter-spacing -.025em; one word in `<em>` italic 400 |
| Page hero h1 (subpages, case studies) | Fraunces 500 | `clamp(2.6rem,7vw,5rem)` | line-height 1 |
| Section h2 | Fraunces 500 | `clamp(2.1rem,5vw,3.6rem)` | line-height 1.02, max ~26ch |
| Card h3 | Fraunces 500 | `clamp(1.35rem,2.2vw,2rem)` | line-height 1.05–1.12 |
| Big number / price | Fraunces 500 | `clamp(2rem,3vw,2.8rem)` | `font-variant-numeric:tabular-nums` |
| Lead paragraph | Inter 400 | `clamp(1.02rem,1.4vw,1.2rem)` | color `--ink-2` or `--muted`, max 44–52ch |
| Body | Inter 400 | 16.5px | line-height 1.6 |
| Small text / list items | Inter 400 | .92–.96rem | color `--ink-2` |
| Eyebrow | Inter 500 | 12px | uppercase, letter-spacing .2em, color `--muted` |
| Field / meta label | Inter 600 | 11px (.7rem) | uppercase, letter-spacing .14em |
| Wordmark | Manrope 600 | 19px | letter-spacing -.02em |

Headings are short statements ending in a period: "Monthly plans." "Tell me what you're building." Italic is used for one word at most.

---

## 4. Brand motifs

**Spark** (4-point star). Used in eyebrows, buttons, list bullets, active nav, pricing cards. Always one accent color.
```html
<svg class="spark c-red" viewBox="-52 -52 104 104" aria-hidden="true"><path d="M0 -50 C0 -21 21 0 50 0 C21 0 0 21 0 50 C0 21 -21 0 -50 0 C-21 0 0 -21 0 -50 Z"/></svg>
```
```css
.spark{display:inline-block;width:.72em;height:.72em;vertical-align:-.02em;fill:currentColor}
.c-red{color:var(--red)}.c-blue{color:var(--blue)}.c-yellow{color:var(--yellow)}.c-green{color:var(--green)}
```

**Open-frame mark** (logo). Never redraw, recolor with accents or stretch it.
```html
<svg class="mark" viewBox="0 0 120 120" fill="none" aria-hidden="true"><path d="M74 22 H36 A14 14 0 0 0 22 36 V84 A14 14 0 0 0 36 98 H84 A14 14 0 0 0 98 84 V48" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/><g transform="translate(60,60) scale(0.42)"><path class="bm-spark" d="M0 -50 C0 -21 21 0 50 0 C21 0 0 21 0 50 C0 21 -21 0 -50 0 C-21 0 0 -21 0 -50 Z" fill="currentColor"/></g></svg>
```

**Icons**: Lucide line icons only, from one inline `<symbol>` sprite, used via `<svg><use href="#i-name"/></svg>`. Color through `currentColor`. Black at rest, accent on hover.

---

## 5. Components

### Eyebrow + section head
```html
<div class="section-head">
  <span class="eyebrow"><svg class="spark c-yellow" ...></svg>Pricing</span>
  <h2>Monthly plans.</h2>
  <p class="lead">One line that says what this section is for.</p>
</div>
```
```css
.eyebrow{font-family:var(--sans);font-size:12px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:var(--muted);display:inline-flex;align-items:center;gap:9px;margin-bottom:16px}
.section-head{margin-bottom:clamp(28px,4vw,52px);max-width:26ch}
.section-head.wide{max-width:60ch}
.section-head h2{font-size:clamp(2.1rem,5vw,3.6rem);font-weight:500;line-height:1.02}
.section-head .lead{color:var(--muted);margin-top:14px;font-size:clamp(1.02rem,1.4vw,1.18rem);max-width:52ch}
```

### Buttons
```css
.btn{display:inline-flex;align-items:center;gap:10px;padding:15px 28px;font:500 15px var(--sans);border-radius:var(--pill);border:1px solid transparent;cursor:pointer;transition:box-shadow .35s var(--ease),background .16s,color .16s,border-color .16s,transform .3s}
.btn .spark{width:15px;height:15px}
.btn[target="_blank"],.btn[href^="mailto:"]{border-radius:14px}
.btn-dark{background:var(--ink);color:#fff}           .btn-dark:hover{background:var(--red)}
.btn-line{background:transparent;color:var(--ink);border-color:var(--line-2)} .btn-line:hover{background:var(--blue);border-color:var(--blue);color:#fff}
.btn-white{background:#fff;color:var(--ink)}          .btn-white:hover{background:var(--blue);color:#fff;box-shadow:0 16px 34px -18px rgba(47,107,240,.5)}
.link-arrow{display:inline-flex;align-items:center;gap:8px;font:500 15px var(--sans);color:var(--ink)}
.link-arrow svg{width:17px;height:17px;transition:transform .3s var(--ease)}
.link-arrow:hover svg{transform:translate(4px,-4px)}
```
- Primary action = `.btn-dark` (hover turns red). Secondary = `.btn-line` (hover turns blue). On dark bands use `.btn-white`.
- One primary button per section. No spark on CTA buttons (Graham, 2026-10-21). The hero CTA reads "Let's talk".

### Cards
```css
.card{background:#fff;border:1px solid var(--line);border-radius:var(--r);padding:clamp(20px,2vw,28px)}
.card-lg{border-radius:var(--r-lg);padding:clamp(28px,3vw,42px)}
.card.cream{background:var(--panel);border:0}
.card.feat{background:var(--ink);border-color:var(--ink);color:#f3f1ea}
.card.link{transition:transform .5s var(--ease),border-color .3s var(--ease)}
.card.link:hover{transform:translateY(-6px);border-color:var(--line-2)}
```
Clickable cards get the **corner fold**: on hover an accent quarter-circle grows from the top-right corner (0 → ~104px, `.45s var(--ease)`) with a white up-right arrow popping in. No pointer-hand cursor on cards.

### Meta / stat cells
Small uppercase label over a value. Used for Role/Scope/Timeline, and for stats.
```css
.cell{border:1px solid var(--line);border-radius:var(--r);padding:clamp(15px,1.5vw,22px)}
.cell h4{font:600 .7rem var(--sans);letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin-bottom:6px}
.cell p{color:var(--ink-2);font-size:clamp(.9rem,1.05vw,1rem);line-height:1.35}
.stat b{font:500 clamp(1.7rem,2.8vw,2.4rem)/1 var(--serif)}
```

### Form fields
```css
.field label{font:600 11px var(--sans);letter-spacing:.14em;text-transform:uppercase;color:var(--ink-2);display:block;margin-bottom:8px}
.field input,.field textarea{width:100%;padding:14px 16px;border:1px solid var(--line-2);border-radius:14px;font:400 16px var(--sans);background:#fff;color:var(--ink);transition:border-color .25s,box-shadow .25s}
.field input::placeholder{color:#8f8c84}
.field input:focus,.field textarea:focus{outline:none;border-color:var(--blue);box-shadow:0 0 0 3px rgba(47,107,240,.16)}
.err{color:var(--red);font-size:14px}
```
Use 16px input text so iOS doesn't zoom. Forms sit on a cream card (`--panel`, `--r-lg`), never on a dark one.

### Tags / status dots
```css
.tag{display:inline-block;font:600 .7rem var(--sans);letter-spacing:.08em;text-transform:uppercase;padding:4px 10px;border-radius:var(--pill);background:var(--panel);color:var(--ink-2)}
.tag.feat{background:var(--yellow);color:var(--ink)}
.dot{width:10px;height:10px;border-radius:50%;background:var(--green)} /* .wait = yellow, .fail = red, .off = muted */
```

### Toggle switch (from pricing)
```css
.switch{display:inline-flex;align-items:center;gap:12px;background:var(--panel);border:0;border-radius:var(--pill);padding:9px 16px 9px 9px;font:500 .95rem var(--sans);color:var(--ink);cursor:pointer}
.track{width:44px;height:26px;border-radius:13px;background:var(--line-2);position:relative;transition:background .2s}
.track::after{content:"";position:absolute;top:3px;left:3px;width:20px;height:20px;border-radius:50%;background:#fff;transition:left .2s var(--ease)}
.switch[aria-pressed="true"] .track{background:var(--green)}
.switch[aria-pressed="true"] .track::after{left:21px}
```

### Dark CTA band (end of every page, before the footer)
```css
.cta-dark{background:var(--card);color:#fff;border-radius:var(--r-lg);padding:clamp(44px,7vw,90px) clamp(24px,5vw,60px);text-align:center}
.cta-dark h2{color:#fff;font-size:clamp(2.1rem,5vw,3.6rem);max-width:18ch;margin:0 auto 14px}
.cta-dark p{color:rgba(255,255,255,.72);max-width:48ch;margin:0 auto 30px}
```
Default copy: eyebrow "Contact", h2 "Ready to bring your brand into frame?", buttons `.btn-white` "Start a project" + external "Book a call".

### Toast
Ink pill, bottom center, white 14px text, slides up 20px and fades in.

---

## 6. Header and footer (use the real ones)

**Header**: fixed, 16px from the top, floating pill nav inside `.wrap`. Frosted white: `background:rgba(255,255,255,.6);backdrop-filter:blur(22px) saturate(165%)`. Left: mark (32px) + "Open Frame" wordmark. Right: Work, Services, Pricing, About, then the ink pill "Contact" (no spark, hover red), then the round 42px person icon linking to `/studio/` (outline; filled ink when you're inside Studio). Under 860px: the person icon is hidden and the menu button sits alone on the right. It opens a full-screen cream card (`--panel`, `--r-lg`) with large links (Home, Work, Services, Pricing, About, Contact, then **Studio sign-in** last) and a colored spark beside the active one.

**Footer**: cream panel (`--panel`, `--r-lg`), brand + one-line description on the left, uppercase "Pages" list on the right (a spark slides in on hover), icon-only socials (LinkedIn, Email, Résumé; hover blue/red/yellow), hairline divider, then 12.5px muted meta row with "Client sign-in" linking to /studio/.

Copy the header and footer markup from `studio/index.html` or `index.html` in the repo and keep the links in sync with the main menu.

---

## 7. Layout patterns

- Section spacing: `padding-top:var(--sect)`. On deck pages each section is one full screen (`100dvh`) and snaps.
- Hero: cream box (`--panel`, `--r-lg`), 12px below the header, centered copy. Subpage hero: left-aligned, two columns 50/50 copy + image at ≥821px, stacked below.
- Grids: 4 → 2 columns at 1100px → 1 column at 560px. Gaps 12–18px between cards, `clamp(28px,4vw,60px)` between text and media.
- Line length: body 44–62ch. Headings 18–26ch.
- Breakpoints in use: 1100, 860 (menu), 820 (two-col → stack), 560, 520.
- White page background with cream panels for grouping. Never make the whole page cream.

---

## 8. Motion

- Page enter: fade up 10px, `.5s var(--ease)`.
- Scroll reveal: `.reveal{opacity:0;transform:translateY(26px);transition:opacity .9s var(--ease-out),transform .9s var(--ease-out)}` → `.reveal.in{opacity:1;transform:none}`. Stagger with delays .08s steps (`.d1`–`.d4`). Trigger with IntersectionObserver.
- Hover: color swaps .16–.25s; lifts and folds .45–.5s `var(--ease)`. Card lift is 6px, never more.
- Layout motion (accordions, expanding tiles): `var(--flow) var(--ease-flow)` for every part so they land together. 90ms hover intent before opening.
- Arrow pop: opacity + `scale(.55)→1` with `cubic-bezier(.34,1.56,.64,1)` overshoot.
- Custom cursor on desktop (12px ink dot, grows to 46px ring over links). Don't add `cursor:pointer` hands to cards.
- No parallax, no bouncing, no autoplaying carousels except the services accordion.

---

## 9. Imagery and copy

**Images**
- Real work only: real screenshots, real photos. No stock clip art or illustration packs.
- Website screenshots go in a browser frame (`.mock`: three dots + URL bar). Phone screens go in a tilted phone. A tilted stage is the only place a soft shadow is allowed.
- Corners `--r` (20px) on images, `--r-lg` on full-bleed hero photos. Images over 1px `--line` border when they sit on white.
- WebP, ~2000px max, `loading="lazy" decoding="async"`, always `alt` text.
- Case-study pages follow **Park n Go** (the approved template): cover hero with Role/Scope/Timeline/Tools cells → Background (problem + quote) → Discover (stats + quotes) → Define (persona + journey) → Ideate → Design (feature tiles) → Test (what changed) → Brand kit → Delivered (result) → More work → CTA band.

**Copy voice**
- First person, warm, direct. Graham talking to one person. "I", "you".
- Short sentences. Headings are plain statements with a period.
- Concrete numbers over adjectives ("844% more views", "$950 one time").
- No em dashes. No "not X, but Y". No rhetorical questions as openers. No rule-of-three lists. No colon reveals.
- Banned words: leverage, seamless, robust, elevate, unlock, empower, transform, game-changer, landscape, journey, delve, dive in, testament.
- Run every line through **humanizer**, then **structural-humanizer**, before it ships.

---

## 10. Page recipes

### 10A. Studio (client portal at /studio/)

Already live at `openframe.design/studio/` (`studio/index.html`). Extend that page rather than starting a new one. It is the one page with an app layout:

- **Body**: white like every other page, same header (person icon filled ink while you're in Studio; on mobile "Studio sign-in" shows as the active menu link). The mobile menu is the site's cream card.
- **Signed out**: no title above anything. A full-screen bento under the header (gutter all round, gap 12-18px): the cream sign-in card (`--panel`, `--r-lg`) on the left half and the showreel's Bauhaus tile wave on a canvas on the right half, with the Open Frame mark in the middle tile. Up to 820px the art hides and the card fills the screen.
- **Sign-in card** content, max 440px wide, vertically centered:
  - eyebrow with red spark "Studio", h1 Fraunces `clamp(2.4rem,4.4vw,3.8rem)` "Your *studio.*"
  - lead: "Everything we're working on together, in one place."
  - Sign in with Google (pill, outline), a hairline "or use your email" divider, email field, full-width ink pill "Email me a code" (hover red)
  - Code step: "Check your *email.*", one input `font:500 28px/1 var(--serif);letter-spacing:.3em;text-align:center`, `inputmode="numeric" autocomplete="one-time-code" maxlength="6"`, "Sign in" button, underlined "Use a different email".
  - Errors in red 14px under the field. Never blame the user.
- **Signed in**: a 560px centered column on white.
- **Hub header**: eyebrow "Studio", h1 Fraunces 22px with the client's name, count of items on the right in `--ink-2`.
- **Tabs**: row of equal pill buttons; selected = white with ink border, others transparent with `--line` border.
- **Item cards**: white, `--r`, 18px padding. Label line (13px `--ink-2`, bold client/project), media (rounded 12px, swipeable when several), body text 15px, a serif question line (19px) and a two-button row: ink pill "Approve" + outline pill "Request changes".
- **Stats**: 2-column tiles, white, 14px radius, Fraunces 24px number over a 13px label.
- **Status rows**: dot (green ok / yellow in progress / red needs you) + text + right-aligned meta, separated by hairlines.
- **Empty state**: centered, Fraunces 26px "You're all caught up." + one muted line.
- Footer: small muted signed-in email + underlined "Sign out".
- `noindex`, no third-party scripts, token in `localStorage`.

### 10B. Pricing

Already live at `openframe.design/services#pricing`. Match it:

- Three sections, each with eyebrow + h2 + one-line sub: **Monthly plans.** / **Fixed-price projects.** / **Extras and billing.**
- Header row: section head on the left, nonprofit toggle switch on the right ("Show 501(c)(3) nonprofit pricing", track turns green). Toggling shows the struck-through old price under the new one.
- **Plan cards**: 4-column grid (2 at ≤1100px, 1 at ≤560px), gap 14px. White, `--line` border, `--r`. Inside: name (Fraunces ~1.5rem) with a cycled-accent spark top-right, price in Fraunces `clamp(2rem,3vw,2.8rem)` + "/month" in 0.9rem Inter, a one-line "For …" description, then a dot list. The recommended plan is the **ink** card with a yellow "Most popular" pill tag. One featured card only.
- **Project list**: 2-column list (3 for extras), 2px ink rule on top, hairline between rows. Each row: Fraunces name left, price right (tabular figures, "from" in small muted Inter), one-line description below.
- **Terms**: 4 small blocks (Fraunces 1.15rem title + .93rem `--ink-2` text): Nonprofit pricing, Projects, Monthly plans, Payments.
- Closing note in muted .92rem: "Prices in USD, as of October 2026."
- End with the dark CTA band.

---

## 11. Drift checklist (run on every new page)

- [ ] Only token colors? Search the CSS for any hex not in section 1.
- [ ] Headings Fraunces 500, body Inter, nothing else loaded or used?
- [ ] No box-shadows except mockup stages and button hover glow?
- [ ] Pill = internal, 14px = external/mailto/fields?
- [ ] Every section has eyebrow + spark + serif heading?
- [ ] Real site header and footer, Pricing and Studio links present?
- [ ] Accent colors only on small things, cycling red → blue → yellow → green?
- [ ] Reduced-motion turns all animation off?
- [ ] No horizontal scroll at 360px; 16px input text on mobile?
- [ ] Copy passed humanizer → structural-humanizer, no em dashes?
