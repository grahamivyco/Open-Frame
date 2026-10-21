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
- Sign-in: email + 6-digit code, or the emailed button (both expire in 15 min), or Sign in with Google (`GOOGLE_CLIENT_ID`; the Google app is still in Testing, so only test users can use it). Unknown emails get the same reply. Sessions last 30 days, stored hashed in the `Studio sessions` tab; the page keeps its token in `localStorage` (`of-studio`).
- Adding a new Google service to `Code.gs` needs Graham to run `setup` once in the Apps Script editor to re-authorize. Clasp deploys code but never new scopes.
- **Plan** (approved 2026-10-21): https://claude.ai/artifact/6v7kCGmq2XqVZaAcwRkdjs
  - Phase 0: Graham publishes the Google sign-in app.
  - Phase 1: Projects tab + client Project cards. **Shipped 2026-10-21** (social-assets #62, Open-Frame #99).
  - Phase 2: Deliverables tab + proof approvals + emails. **Next, when Graham asks.**
  - Phase 3: Files tab (Drive links). Phase 4: admin buttons in Studio. Later: billing.
- Each phase = one Hub PR (social-assets) + one Studio page PR (Open-Frame).

## Pricing
- Lives on `/services#pricing` in `index.html` (`.pr-*` classes). Prices also appear in the Organization JSON-LD `hasOfferCatalog` and in `llms.txt`. Change all three together.

## Analytics and privacy
- Google Analytics 4, ID **G-RF906YB2TT**. One tag only, in `<head>`. Never add a second one.
- Consent first: Consent Mode defaults to denied, nothing is stored until the visitor taps Allow on the cookie notice. Choice saved in `localStorage` `of-consent`. Contact-form sends fire `generate_lead`.
- Graham is in Barcelona and serves US clients, so follow EU GDPR/ePrivacy (Spain's AEPD cookie guidance) **and** US rules (California privacy-policy law, honour Do Not Track / Global Privacy Control). Rejecting must be as easy as accepting, the choice must be changeable later, and the notice links to a privacy policy.
- In progress 2026-10-21: the cookie notice is moving to a small corner card with no spark, plus a privacy page that also covers Studio sign-in data (email, Google sign-in, session token). Update this section when it ships.
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
