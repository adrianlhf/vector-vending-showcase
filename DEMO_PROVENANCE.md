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
