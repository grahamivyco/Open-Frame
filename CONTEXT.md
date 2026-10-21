# Open Frame shared context

Read this before any work on openframe.design or Studio, from any Claude project (Portfolio, marketing, or other). Keep it short and current: when a fact here changes, update this file in the same PR.

Last updated: 2026-10-21.

## Where things live
- **Website**: this repo, `grahamivyco/Open-Frame`, served by GitHub Pages at https://openframe.design. Merging to `main` deploys in 1–2 minutes.
- **Site code**: `index.html` is the whole main site (single-file SPA). `CLAUDE.md` has the detailed technical notes. After any `index.html` change, run `node tools/build-pages.js` and commit the generated route files.
- **Standalone pages** (outside the SPA): `studio/` (client portal), `review/` (client review links), `links/` (bio link page), `glow/` (app legal pages), `preview/` (noindex prospect concepts).
- **Hub (Studio back end)**: Google Apps Script "Open Frame Hub", bound to the "NGM social queue" Sheet. Source is `hub/Code.gs` in `grahamivyco/social-assets` (public repo). Keep Studio code in `Code.gs`: the Mac keeper's clasp deploy only pushes that file and deletes other `.gs` files.
- **Design rules**: [`docs/design-rules.md`](docs/design-rules.md). Tokens, components, header/footer, motion, copy voice, Studio and Pricing recipes, drift checklist. Use them for every new page.

## Studio (openframe.design/studio)
- Invite only. Admins = the script owner + `STUDIO_ADMINS`. Clients = any email in the `contact_email` column of the Hub Sheet's **Clients** tab. No sign-up flow.
- Sign-in: email + 6-digit code, or the emailed button (both expire in 15 min), or Sign in with Google (`GOOGLE_CLIENT_ID`, Google Cloud project `enhanced-rite-512212-t9`, app "Open Frame": In production, External, since 2026-10-21, so any invited client can use it; scopes are only openid/email/profile, so no Google review is needed. Branding uses /privacy/ and /terms/, and openframe.design is verified in Search Console. If the button errors with a UrlFetchApp permission message, Graham runs `setup` once in the Apps Script editor and clicks Allow). Unknown emails get the same reply. Sessions last 30 days, stored hashed in the `Studio sessions` tab; the page keeps its token in `localStorage` (`of-studio`).
- Adding a new Google service to `Code.gs` needs Graham to run `setup` once in the Apps Script editor to re-authorize. Clasp deploys code but never new scopes.
- **Plan** (approved 2026-10-21): https://claude.ai/artifact/6v7kCGmq2XqVZaAcwRkdjs
  - Phase 0: Graham publishes the Google sign-in app. **Done 2026-10-21.**
  - Phase 1: Projects tab + client Project cards. **Shipped 2026-10-21** (social-assets #62, Open-Frame #99).
  - Phase 2: Deliverables tab + proof approvals + emails. **Next, when Graham asks.**
  - Phase 3: Files tab (Drive links). Phase 4: admin buttons in Studio. Later: billing.
- Each phase = one Hub PR (social-assets) + one Studio page PR (Open-Frame).
- **Approval items:** every automation that needs a yes writes rows in the Hub's **Approvals** tab using [`docs/approval-items.md`](docs/approval-items.md) (columns, kinds, buttons, flow). One format for posts, brand kits, website launches, brand deals, sensitive replies and the rest. Tab + Studio reader = Phase 2, not built yet.

## Pricing
- Own page at **/pricing** (`#pricing` page in `index.html`, `.pr-*` classes; moved off Services 2026-10-21, old `/services#pricing` links redirect). Services keeps a "See pricing" button in "What to expect". Plan names (Studio agreements/payments use them, keep stable): monthly **Care / Starter / Growth / Full Comms** + Setup; projects **Quick audit / Deep brand and marketing audit / Brand kit / Website redesign / SEO and AI search check (and setup) / Newsletter setup / Giving Tuesday kit / Google Ad Grants setup / Case study**; extras **Hourly work / Website support / Website handoff guide**. Prices also appear in the Organization JSON-LD `hasOfferCatalog` and in `llms.txt`. Change all three together.

## Analytics and privacy
- Google Analytics 4, ID **G-RF906YB2TT**. One tag only, in `<head>`. Never add a second one.
- Consent first: nothing from Google loads until the visitor taps Allow on the cookie notice. Choice saved in `localStorage` `of-consent` + `of-consent-at`. Contact-form sends fire `generate_lead`.
- Graham is in Barcelona and serves US clients, so follow EU GDPR/ePrivacy (Spain's AEPD cookie guidance) **and** US rules (California privacy-policy law, honour Do Not Track / Global Privacy Control). Rejecting must be as easy as accepting, the choice must be changeable later, and the notice links to a privacy policy.
- Shipped 2026-10-21 (PR #101): `gtag.js` only loads after Allow. The cookie notice is a small white bottom-left card, no spark, with equal Allow / No thanks buttons and a link to **/privacy/**. GPC or Do Not Track counts as no, the choice is re-asked after 12 months, saying no clears `_ga*` cookies, and the footer "Cookie settings" reopens it. `/privacy/` (standalone `privacy/index.html`) is the one privacy & cookie policy for the whole site, Studio sign-in included; Studio uses it as its Google sign-in privacy URL. Update its date and text whenever data handling changes. **`/terms/`** (standalone `terms/index.html`, same layout as privacy, added 2026-10-21) is the terms of use for the site and Studio: a signed project agreement overrides it; Spanish law, Barcelona courts unless consumer law says otherwise. Linked from every footer ("Terms") and usable as the Google sign-in terms URL. Legal name/NIF/address not on it yet; add them to both pages when Graham supplies them.
- Studio, review and Glow pages carry no analytics.

## Copy rules
- Every line of site copy goes through the **humanizer** skill, then **structural-humanizer**, before it ships.
- First person, Graham talking to one person. Short sentences. Headings are plain statements ending in a period.
- No em dashes. No "not X, but Y", rhetorical openers, rule-of-three lists or colon reveals. Banned: leverage, seamless, robust, elevate, unlock, empower, transform, game-changer, landscape, journey, delve, dive in, testament.
- No spark icon on CTA buttons. Home hero CTA = **"Let's talk"**. Menu CTA = **"Contact"**.
- Graham is based in Barcelona, working remote on US Eastern hours. Site email: hello@openframe.design.
- Give Graham 3 copy options, ship the best, list the other two.

## Workflow
- Commit, open the PR, and squash-merge it yourself. Graham doesn't want to be asked (standing preference since 2026-10-09).
- **One page per PR**, so each change is small and ships fast.
- Graham isn't a developer. Explain changes in plain words, lead with what's live.
- Park n Go is the approved case-study template; other case studies follow it.
