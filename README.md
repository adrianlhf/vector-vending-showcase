# Vector Vending showcase

A buildless static site about Vector's work bringing familiar food brands into everyday places. The site uses local photography and fonts, with no analytics, cookies, signup forms or third-party runtime dependencies.

Live site: https://vectorvending.pages.dev/

## Develop

Requires Node 20 or later. `npm run dev` serves `docs/` at `http://127.0.0.1:4173`. `npm run check` validates links, assets, accessibility hooks, content constraints and the page-size budget.

Deploy the contents of `docs/` to a static host such as Cloudflare Pages. No installation or build step is required. Relative paths also preserve the existing GitHub Pages project URL; `.nojekyll` disables Jekyll processing there.

Cloudflare project: `vectorvending` (free `pages.dev` hostname). Publish the checked-in `docs/` directory using the existing authorized Cloudflare session:

```sh
npx wrangler pages deploy docs --project-name vectorvending --branch main --force
```

No GitHub app permission changes or paid domain are required. Keep GitHub as the source of truth; this is a direct-upload Pages project, so future Cloudflare releases require the deploy command.

## Responsive layout

Content is bounded to 1280px on desktop. The hero pairs a readable introduction with a real Paya Lebar venue photograph and a compact Uncle Lee product card. At 760px and below, navigation becomes a disclosure menu and the content stacks. Body copy remains 15–17px, rather than shrinking with desktop proportions. The historical sales counter retains its prominent scale and attribution.

Photography is reused from the authorized local assets; captions do not imply that Vector operates all brands visible at VENDI. The next brand remains masked.

## Content

The S$55,000 counter is the historical peak monthly sales figure for the Uncle Lee Confectionery Woodleigh Hawker launch, confirmed by the user. It is not a current network total. No exact calendar month or attribution to a first-ever machine launch is claimed.

The next brand remains P _ P. No public launch date is established, so the teaser offers a downloadable browser shortcut rather than a countdown or data collection. Contact uses the verified Vector business mailbox and public founder profile.

Photography provenance and typeface licence information are recorded in `PROVENANCE.md`. Original source photos and private research are excluded from Git. The site contains only optimized web derivatives.

All animation code is bespoke vanilla JavaScript/CSS. Hypha was reviewed for editorial hierarchy and rhythm; none of its source, copy or assets was reused.
