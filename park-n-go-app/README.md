# Park n Go — interactive prototype

A real, working single-file web app of the **Park n Go** event-parking concept from the
[Open Frame case study](https://openframe.design/park-n-go). It exists to generate **clean,
high-fidelity mockups** for the portfolio — every screen is live, navigable, and built from
the project's real design system (Ink `#050505`, Charcoal `#212121`, Signal Gold `#FFC857`,
Lexend + Poppins).

Everything lives in **`index.html`** — all CSS and JS inline, no build step, no dependencies
(fonts load from Google Fonts). Open it in a browser and it runs.

## Screens
Sign Up · Home · Search Results · Event Info · Choose Parking Lot (with time pickers, lot map
& section sheet) · Booking Confirmed · My Parking (Upcoming/Past) · Parking Receipt
(Parking Info / Event Info tabs) · Cancel flow → Ticket Cancelled · Profile · Help Center ·
hamburger Nav menu · and a **UI Kit** board that shows every atom & component on its own.

## Using it to make mockups
The app is a 390 × 844 phone screen. On desktop it sits inside a device frame on a soft
studio backdrop (already mockup-ready); on a phone-width window it fills the viewport.

- **Jump to any screen:** append a hash — `index.html#receipt`, `#lot`, `#kit`, etc.
- **Screen switcher:** the "◐ Screens" button (bottom-right) jumps between every screen,
  overlay and state. Add `?nodev` to hide it before capturing.
- **Bare mode** (`?bare`): drops the device frame so you get a clean, full-bleed screen at
  the phone's aspect ratio — ideal for compositing into your own device frames or tilted
  scenes. Toggle any time from the switcher.
- **UI Kit** (`#kit`): each component sits in its own labelled cell so it can be cropped and
  used individually in the case study (icons, buttons, cards, colour, type, inputs…).

Example capture URL: `index.html?bare&nodev#receipt`

## Deploy
It's static — served as-is by GitHub Pages. Once merged to `main` it's live at
`openframe.design/park-n-go-app/`.

Route map (hashes): `signup · home · search · event · lot · confirm · myparking · receipt ·
cancelled · profile · help · kit`.
