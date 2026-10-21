# Studio approval items (spec for every automation)

Any automation or loop that needs a yes from Graham or a client writes **one row per item** in the Hub Sheet's **Approvals** tab. Studio reads that tab to build Graham's Home queue and each client's "Ready for you" list, so one format covers posts, brand kits, website pages, brand deals and everything else.

Status: agreed design (Graham, 2026-10-21). The Hub writes the **Approvals** tab since 2026-10-21 (social-assets #65): loops call `approval-add` (the Hub checks kinds and `client_ok` rules), and an hourly sync gives every open Queue post, Reel, newsletter and topic a row. When Studio writes an answer, the sync copies it back to the Queue so the poster keeps working. The Studio code that reads the tab is **not built yet** (Studio Phase 2, Deliverables + approvals). Which loop writes which kind: social-assets [`loops/APPROVALS.md`](https://github.com/grahamivyco/social-assets/blob/main/loops/APPROVALS.md).

## Flow

0. Optional: a loop adds the row early with `status = planned`. It shows on the client's Coming up list with no buttons, then the loop moves it to `draft` (Hub `approval-set`) once it's made.
1. A loop (or Graham) adds a row with `status = draft`.
2. Graham sees it on **Home** and taps Looks good, Change or Skip.
3. If the client needs to sign off (`client_ok = yes`), it moves to `status = client` and shows on the client's page. If not, it goes straight to `approved`.
4. The client picks an action. Studio writes `status = approved`, `changes` or `skipped`, plus `answer` and `comment`.
5. The loop that made the row checks back and does the next step (schedule it, send it, revise it, close it).

## Columns

| Column | What goes in it | Example |
|---|---|---|
| `id` | Unique, made by the loop | `wiw-post-20261021-01` |
| `client` | Client name exactly as in the Clients tab | `Wellness in the Woods` |
| `kind` | One of the kinds below | `brand_deal` |
| `title` | Short, plain words | `Sponsored post from Trailhead Coffee` |
| `detail` | One or two sentences | `They offer $300 for one post in November.` |
| `job` | Plan or project name from /pricing, or `none` | `Growth` |
| `preview` | Image URL, Drive link, or staging link | `https://drive.google.com/...` |
| `options` | Only for pick-one kinds, separated by ` | ` | `Direction A | Direction B | Direction C` |
| `due` | Date the answer is needed (YYYY-MM-DD) | `2026-10-28` |
| `client_ok` | `yes` if the client must sign off, `no` if Graham alone decides | `yes` |
| `made_by` | The loop or `graham` | `wellness-posts` |
| `status` | (`planned` →) `draft` → `client` → `approved` / `changes` / `skipped` | `draft` |
| `answer` | Written by Studio: the button pressed or option picked | `Direction B` |
| `comment` | Written by Studio: the note left with Change | `Warmer green please` |
| `updated` | Written by Studio | `2026-10-22T10:14:00Z` |

## Kinds and their buttons

Studio draws the buttons from `kind`. Use only these values; ask for a new kind instead of inventing one.

| kind | Used for | Buttons |
|---|---|---|
| `post` | Social post | Looks good / Change / Skip |
| `reel` | Reel video + caption | Looks good / Change / Skip |
| `newsletter` | Newsletter draft | Open draft, then Looks good / Change |
| `report` | Monthly report, audit, SEO check | Mark read / Ask a question |
| `pick_one` | Logo directions, ad copy, header photo A/B | One button per `options` entry, plus Comment |
| `design` | Colours and type, page designs, template | Looks good / Change |
| `set` | A bundle like the Giving Tuesday kit | Approve set / Change one |
| `launch` | Staging site ready to go live | Approve to launch / Not yet |
| `files` | Final brand files, handoff guide | Approve and download |
| `brand_deal` | Sponsorship or collab offer | Yes, go ahead / Not for us / Ask a question |
| `reply` | Sensitive reply on the client's account (complaint, press, donor) | Send as is / Change / I'll handle it |
| `repost` | Permission to share someone else's photo or post | Approve / Skip |
| `ad_spend` | Boost or ad budget | Approve spend / No |
| `request` | Graham needs something from the client (photos, logins, info) | Upload / Not yet |
| `hours` | Hourly work for the month | Approve hours / Question |
| `quote` | New quote or agreement | Sign |
| `invoice` | Payment due | Pay now |

## Rules for loops

- Everyday comment and DM replies are `client_ok = no` (Graham only). Use `reply` with `client_ok = yes` only for touchy ones.
- Brand deals, ad spend, reposts and quotes are always `client_ok = yes`.
- Never write `answer`, `comment` or `updated`. Studio owns them.
- One row per decision. A brand kit round with three logo directions is one `pick_one` row, not three rows.
- Write in plain words. `title` and `detail` show to clients as written, so they follow the copy rules in [`CONTEXT.md`](../CONTEXT.md).
