# Park n Go — interactive prototype

A real, working single-file web app of the **Park n Go** event-parking concept from the
[Open Frame case study](https://openframe.design/park-n-go). It exists to generate **clean,
high-fidelity mockups** for the portfolio — every screen is live, navigable, and built from
the project's real design system (Ink `#060606`, Charcoal `#212121`, Signal Gold `#FFC857`,
Lexend + Poppins).

Everything lives in **`index.html`** — all CSS and JS inline, no build step, no dependencies
(fonts load from Google Fonts). Open it in a browser and it runs.

## Screens & flows
Login · Sign Up · Home (search, quick chips, upcoming, popular) · Search results ·
Event detail (banner, info, price) · Choose Parking Lot (time pickers, lot map, section
sheet) · Booking Confirmed · My Parking (Upcoming / Past) · Your Ticket (QR + Parking / Event
tabs) · Cancel flow → Ticket Cancelled · Profile hub (stats + grouped settings) · Personal
information (view + inline edit) · Payment methods (card + add-card sheet) · Help Center
(accordion FAQs) · full-height Nav menu · and a **UI Kit** board showing every atom &
component on its own.

**App conventions built in:**
- A **persistent sticky header** (logo + notifications + menu) that never scrolls away.
- A **bottom tab bar** that appears only on the four top-level destinations (Home, My
  Parking, Help, Profile) and is hidden inside flows — standard mobile behavior.
- Real motion: staggered list entrances, spring bottom-sheets, animated tabs/toggles, and a
  staggered nav menu. Everything respects `prefers-reduced-motion`.

## Using it to make mockups
The app is a 390 × 844 phone screen. On desktop it sits inside a device frame on a soft
studio backdrop (already mockup-ready); on a phone-width window it fills the viewport.

- **Jump to any screen:** append a hash — `index.html#receipt`, `#lot`, `#kit`, `#payment`…
- **Screen switcher:** the "◐ Screens" button (bottom-right) jumps between every screen,
  overlay and state. Add `?nodev` to hide it before capturing.
- **Bare mode** (`?bare`): drops the device frame for a clean, full-bleed screen at the
  phone's aspect ratio — ideal for compositing into your own device frames or tilted scenes.
- **UI Kit** (`#kit`): each component sits in its own labelled cell so it can be cropped and
  used individually in the case study.

**Fastest way to capture clean screens:** open `index.html?bare&nodev#<screen>` and screenshot
the window (or use your browser's device-toolbar / responsive mode set to 390 × 844).
Example: `index.html?bare&nodev#confirm`.

Route hashes: `login · signup · home · search · event · lot · confirm · myparking · receipt ·
cancelled · profile · pinfo · payment · help · kit`.

## Imagery
The app is photo-forward: the home hero and event banners/thumbnails use real photographic
concert-light imagery in **`img/`** (generated offline as stage-light bokeh, one warm-toned
variant per event). The surfaces use a warm layered dark palette with an ambient gold glow and
soft depth rather than flat black.

**Swap in your own photos** — files in `img/` are used automatically if present:
- `img/ev-<id>.jpg` — event banner (Event detail + home hero), `img/th-<id>.jpg` — list
  thumbnail. IDs: `bayou · dallas · first · reaily · newmoon · austin`.
- `img/hero.jpg` — fallback home hero when there's no reservation.

## Profile photo
The avatar defaults to a self-contained illustrated portrait (the sandbox this was built in
couldn't fetch a stock face photo). To use a **real photo**, drop a square image named
**`avatar.jpg`** into this folder — it's picked up automatically everywhere the avatar appears
(profile, menu, personal info). No code change.

## Deploy
It's static — served as-is by GitHub Pages. Once merged to `main` it's live at
`openframe.design/park-n-go-app/`.
