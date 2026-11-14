# Vector Vending launch site

Next.js static-export website with React, Framer Motion and Lucide icons. Production: https://vectorvending.pages.dev/

## Develop and deploy

```
npm ci
npm run dev
npm run build
npx wrangler pages deploy out --project-name vectorvending --branch main
```

Source: `app/page.tsx` homepage; `app/locations.tsx` verified directory; `app/demo/page.tsx` virtual machine. Contact uses the verified business email, not a simulated submission. No checkout, analytics or user database is included. Google Maps embeds load from Google; direct Maps links remain available.

## Launch facts (14 November 2026)

Seven current Uncle Lee locations and two Polar locations were confirmed by Adrian on 14 November. OCBC omitted per instruction. United Square and Changi City Point Uncle Lee sites are explicitly upcoming for 16 November 2026. Update only after operational confirmation; dates do not automatically turn them live. Floor markers accompany venue-level Google Maps, not fabricated machine coordinates.

Press links refer to coverage of Uncle Lee, not an endorsement of Vector or a claim that Vector operated earlier external-vendor machines. Demo is explicitly a simulation, with no payment or order creation. Product imagery is not a live stock indicator. No unverified temperature, warm dispensing, 24/7 venue access, commercial returns or sales performance claims.

## Verification

Production build and TypeScript check. Desktop and 390px mobile browser QA: navigation, no horizontal overflow, no broken loaded images, location brand/search filter and Maps destination update, demo selection/dispense/collect/replay. Reduced-motion support included.
