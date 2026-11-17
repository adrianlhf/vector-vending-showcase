# Interactive demo — 17 November 2026

This extends the existing Next.js static-export project at `app/demo/`. The homepage and directory are unchanged. No payment, order, physical dispensing, analytics or customer collection is added. This is a curated simulation, never inventory. The interface says **Selection varies by machine**.

## Real machines and brand assets

- `public/assets/demo/polar-machine.webp`: derivative of `polar-ccp-installed-12nov.jpg` in Adrian's local `2026-11-17/polar-launch-media` business materials. Visually inspected: actual green-and-cream Polar machine, scalloped awning, slice collection area and striped side branding.
- `public/assets/demo/uncle-machine.webp`: derivative of `polar-suntec-installed-12nov.jpg` in the same supplied materials. Visually inspected: actual Uncle Lee machine at the left of the photograph, green awning, wood-colour control panel, existing logo and cake artwork.
- Derivatives isolate the machine silhouette and resize/compress to WebP; no generated replacements, re-lettering, repackaging or changed logos. Small source-photo background areas remain around hardware. Filenames are provenance, not claims of present installation or stock.
- Existing `polar-logo.webp`, `ulc-logo.webp` and six existing product photos are reused unchanged. These were already published in this project. Earlier asset provenance remains in `PROVENANCE.md`.
- Adrian's connected Drive folder (provided in the task) was inspected, including Uncle Lee Product Images & Branding and Polar Branding & Machine Media. Polar wrap concepts were examined as references; they are not represented as final installed machines. Private folder links, business prices, operational exports and correspondence are excluded from this public repository.
- No AI imagery is used. No live/available/stock claim is made from the photographs; photographed inventory is explicitly historical.

## Product sources

`app/demo/catalogue.ts` contains the public source URL for every item.

- Polar: https://polarpuffs-cakes.com/products/cakes/swiss-roll/ — checked 17 November 2026. Official descriptions establish pandan with pandan buttercream, chocolate with chocolate buttercream, and strawberry with strawberry buttercream. Copy is paraphrased. The demo uses existing **slice** photographs; the official page describes full rolls. Slice formats and names were independently cross-checked against the supplied revised Polar B2B vending catalogue dated 2 November 2026. That proposed catalogue establishes product identity, not current stock; it is not published here.
- Uncle Lee: https://uncleleeconfectionery.cococart.co/ — checked 17 November 2026. Official storefront identifies the brand, nostalgic bakes and kaya cake. Peanut/chocolate names and photographs come from the existing supplied demo catalogue and are visible on the installation artwork. Detailed recipe descriptions could not be verified from the official storefront; the copy stays deliberately conservative and each data record has a review note.
- No ingredients beyond Polar's verified flavour/filling descriptions, allergens, certification, shelf life, health claims or product provenance claims were added. Printed artwork visible in the actual photographs is preserved as supplied.

## Interaction and accessibility

- Brand choice → product selection → virtual product moves/drops to the pictured collection area → hero dialog.
- Replay restarts the dispense; Try another and Escape close the dialog; Switch machines cancels pending timers.
- Native buttons, visible focus indicators, labelled selection states, polite status announcements, native modal dialog with Escape, initial close focus and explicit focus restoration.
- System reduced motion and user-selectable Still mode bypass spatial animation and shorten the sequence. Sound defaults off and only plays after a user's dispense action with Sound on. Sound failure returns to silent mode.
- Self-hosted optimized images/fonts, static catalogue, no remote image dependency. Images have loading and failure fallbacks; route loading/error states and an empty catalogue message are present.

## Validation and limits

- Production build includes TypeScript; Vitest/jsdom tests exercise both machine flows, replay, close/focus restoration, switching during dispense, still mode, keyboard selection, silent default and image error fallback.
- Jarvis independently reported desktop verification in connected Chrome on 17 November 2026: both machine choices load real photos; Polar Pandan Swiss Roll and Uncle Lee Peanut Cake selection, dispense and hero reveal work; switching machines, Try another and Still mode work; images and descriptions render without prices. This is collaborator-reported QA, not a browser check performed in the VS Code session.
- Mobile/touch, the full animation's visual polish, native dialog focus trapping and browser performance metrics remain unverified. The browser-host error is specific to this VS Code session; it does not establish that Chrome is unavailable to other connected sessions. No browser settings were changed.
- Peanut Cake content limitation: a follow-up check of the official Cococart storefront on 17 November 2026 did not establish a peanut-specific product description. The public page's embedded data contains a legacy peanut-related URL slug attached to a differently named Butter/Marble Cake item; this is not reliable recipe evidence. Third-party reviews were not substituted for official confirmation. The Peanut Cake hero therefore retains conservative generic copy until an official product description is verified.
- A preview is deployed to the existing Cloudflare Pages project on the feature branch. Production is not deployed. This direct-upload Pages project has no Git provider configured; source remains in the existing GitHub repository.

## Narrow-screen drop visibility correction

Jarvis reported successful 400px-wide, approximately 591px-high Chrome checks for Polar Strawberry and Uncle Lee Kaya selection/dispense/reveal, stacked scrolling hero and no horizontal overflow. These checks revealed that the drop was missed when the catalogue was below the machine. True touch emulation was not performed; cloud DevTools restrictions were respected.

For viewports up to 700 CSS pixels, Dispense and Replay now first present a viewport-sized machine stage, focus it without scrolling, and wait 180ms for it to render before starting the drop clock. The hero opens only after the full drop and collection pause. The machine scales to the viewport height. Background content becomes inert and page scrolling is locked during the stage; Tab stays on Cancel / switch and Escape cancels. Preparation, drop and collection timers are cancelled when switching. Reduced motion / Still mode use the same stationary stage with the existing short, non-spatial sequence. Desktop keeps its existing inline flow.

Regression coverage includes both narrow-screen machine sequences, repeated dispense and replay, preparation/drop/collection cancellation, reduced motion, stage focus and keyboard cancellation. These are jsdom interaction tests, not a rendered mobile or real-touch verification. The new fixed stage still needs independent rendered QA at 400 × 591 and true-touch testing. Production remains unchanged.


## Narrow stage horizontal overflow correction

Jarvis independently verified the stage/drop fix at 400 × 591 CSS pixels for both machines, replay, Cancel / switch and subsequent other-machine dispensing. The stage itself had scrollWidth 411 against width 400. Inspection found the ambient `.theatre-glow` used negative 25% horizontal insets, extending its layout box beyond the machine and into the stage's scrollable area. The spotlight now gives only that decorative glow zero horizontal insets. Stage overflow is not hidden or clipped; machine photography, product path, collection glow and machine shadow retain their existing geometry. Existing interaction checks and production build are rerun. Rendered scrollWidth confirmation and true touch testing remain for independent browser QA. Production is unchanged.


## Expanded vending catalogue — 23 items

The initial three products per brand were an editorial subset, not a UI restriction. The expanded preview contains **19 Polar products and 4 Uncle Lee products (23 total; 17 additions)**. This is a curated historical/supplier vending range, not a claim that all products are stocked in each machine. The interface continues to say **Selection varies by machine**, with no product prices, payment or order creation.

### Range evidence and asset matching

- Polar identities and SKU codes: supplied **2026-11-02 — Polar B2B Vending Catalogue — Revised.pdf**, headed “Vending Machine Proposed Item”. All 19 products in that proposed vending catalogue are included. The broader retail catalogue was used only to cross-check product families, not as authority to add retail-only items.
- Polar photo matches: supplied **Product Photos** folder and **2026-10-05 — Polar Product Photos — Original Supplier ZIP.zip**. All 19 existing optimized WebP files were visually inspected together and matched to the supplier filenames/catalogue entries. Whole rolls and slices are separate records and use different matching photographs. Existing Polar assets are unchanged.
- Uncle Lee: Kaya, Peanut and Chocolate retain supplied product photographs. Yam is visible in the actual Uncle Lee vending-machine artwork (alongside the original three), is named **Nostalgic Yam Cake - 6 inch** in the official storefront's public embedded catalogue, and has supplied **yam3.jpg** in **For SMRT (Adeline)**. Its new `demo/ulc-yam.webp` is an optimized derivative of that visually inspected photo; no generated product or changed packaging. The demo does not assume a machine-specific size.
- The supplier spelling **Cocoa Hazelnut Cake (Mini)** is used in the interface. Its photo filename uses “Coco Hazelnut”; this spelling difference is recorded in its data review note.
- No source prices, costs, margins, private documents or private correspondence are published.

### Official cross-checks and description limits

- https://polarpuffs-cakes.com/products/cakes/swiss-roll/ confirms the three whole-roll flavours and buttercream descriptions. Slice names/formats are independently supported by the vending catalogue; their copy avoids transferring unconfirmed recipe details.
- https://polarpuffs-cakes.com/products/cakes/block-cakes/ and https://polarpuffs-cakes.com/products/three-layer-sponge/ establish the matching block families and the three named flavours of Three Layer Block.
- https://polarpuffs-cakes.com/products/delightful-party-box-30-pcs/ independently identifies Marble Block Cake Slice. The party box itself is not added to the vending demo.
- https://polarpuffs-cakes.com/products/cakes/whole-cakes/ cross-checks the matching mini-cake families and Brownie family. https://polarpuffs-cakes.com/products/tiramisu-3/ and https://polarpuffs-cakes.com/products/fairlady-6/ provide additional family checks. **Whole-cake ingredient/recipe descriptions are not assumed to apply to the supplied mini formats.** Mini cakes and uncertain slices therefore receive conservative product labels, with exact-format recipe gaps recorded in `catalogue.ts` review notes.
- https://uncleleeconfectionery.cococart.co/shop confirms Yam identity in its public embedded catalogue. Detailed Yam, Peanut and Chocolate descriptions remain limited to verified names; no recipe, texture, filling, allergen or size claims are invented.
- Uncle Lee Rainbow Chocolate remains excluded: prior vending references exist, but no matching verified photo was established in the inspected supplied product folder. Cookies, custard puffs, banana cakes and unrelated retail products are not added without vending-range evidence and a matching asset.

### Included items and matching assets

| Brand | Product | Supplier SKU | Image under `public/assets/` |
| --- | --- | --- | --- |
| Polar | Pandan Swiss Roll Slice | FGSLC-0000123 | `polar-pandan-swiss-roll-slice.webp` |
| Polar | Strawberry Swiss Roll Slice | FGSLC-0000124 | `polar-strawberry-swiss-roll-slice.webp` |
| Polar | Chocolate Swiss Roll Slice | FGSLC-0000121 | `polar-chocolate-swiss-roll-slice.webp` |
| Polar | Chocolate Swiss Roll (Whole) | FGBLK-0000009 | `polar-swiss-roll-chocolate.webp` |
| Polar | Pandan Swiss Roll (Whole) | FGBLK-0000011 | `polar-swiss-roll-pandan.webp` |
| Polar | Strawberry Swiss Roll (Whole) | FGBLK-0000012 | `polar-swiss-roll-strawberry.webp` |
| Polar | Three Layer Block Cake | FGBLK-0000014 | `polar-three-layer-block-cake.webp` |
| Polar | Butter Cake Slice | FGSLC-0000007 | `polar-butter-slice.webp` |
| Polar | Chocolate Brownie | FGSLC-0000213 | `polar-brownie-slice.webp` |
| Polar | Marble Cake Slice | FGSLC-0000026 | `polar-marble-slice.webp` |
| Polar | Fruit Cake Slice | FGSLC-0000021 | `polar-fruit-cake-slice.webp` |
| Polar | Orange Sugee Slice | FGSLC-0000051 | `polar-orange-sugee-slice.webp` |
| Polar | Blackforest Cake (Mini) | FGWCK-0000001-MIN | `polar-blackforest-cake-mini.webp` |
| Polar | Tiramisu Cake (Mini) | FGWCK-0000049-MIN | `polar-tiramisu-cake-mini.webp` |
| Polar | Chocolate Mousse Cake (Mini) | FGWCK-0000007-MIN | `polar-chocolate-mousse-cake-mini.webp` |
| Polar | Fairlady Cake (Mini) | FGWCK-0000019-MIN | `polar-fairlady-cake-mini.webp` |
| Polar | Cheese Cake (Mini) | FGWCK-0000027-MIN | `polar-cheese-cake-mini.webp` |
| Polar | Cookies and Cream Cake (Mini) | FGWCK-0000017-MIN | `polar-cookie-and-cream-cake-mini.webp` |
| Polar | Cocoa Hazelnut Cake (Mini) | FGWCK-0000029-MIN | `polar-coco-hazelnut-cake-mini.webp` |
| Uncle Lee | Kaya Cake | — | `ulc-kaya.webp` |
| Uncle Lee | Peanut Cake | — | `ulc-peanut.webp` |
| Uncle Lee | Chocolate Cake | — | `ulc-chocolate.webp` |
| Uncle Lee | Yam Cake | — | `demo/ulc-yam.webp` |

### Expanded range validation

Automated coverage selects every one of the 23 items on desktop and through the full narrow-stage preparation → drop → collection → hero → close sequence, checking the exact product image and official source link. Additional checks cover full-list access, all format filters, scroll-position reset, switching machines, replay/cancellation, asset existence, unique supplier identities and silent/reduced-motion behaviour. The desktop grid is bounded with internal scrolling; phone lists use ordinary document scrolling so the collection-stage fix remains important for items lower down. Existing animations, focused narrow stage and bounded decorative-glow correction are retained.

Browser inventory was checked again and still returned `browsers: []` with `Browsers: Error: The browser access host is unavailable`. These interaction tests do not measure rendered grid geometry, overflow or touch behaviour. Independent rendered desktop/narrow-grid and scrolling checks remain pending; true touch is unverified. Only the feature preview is deployed; production remains unchanged.
