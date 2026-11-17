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
- Real browser rendering, native dialog focus trapping, mobile touch, cropping within the rendered page and browser performance metrics must be verified separately. Browser inventory in this session returned `browsers: []` and `Browsers: Error: The browser access host is unavailable`. Native foreground input was intentionally avoided because another authorized task is publishing on Instagram.
- A preview is deployed to the existing Cloudflare Pages project on the feature branch. Production is not deployed. This direct-upload Pages project has no Git provider configured; source remains in the existing GitHub repository.
