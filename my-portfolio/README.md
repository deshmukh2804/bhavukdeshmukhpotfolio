# Creative developer portfolio

A complete React + TypeScript + Vite implementation of the supplied Flow Design / DesignByLissan-inspired brief. The workspace contained no existing app or personal content, so this implementation uses explicitly marked, original demo concepts. No third-party personal assets, quotes, project work, or qualifications have been reused.

## Run locally

Requires Node.js 20.19+ or 22.12+ (Node 24 was used for validation).

```sh
npm install
npm run dev
```

Open http://127.0.0.1:5173. For a production build:

```sh
npm run build
npm run preview
```

The static output is in `dist/`. This task does not publish the site.

## Add your content

Edit **`src/data/portfolio.ts`**:

- `profile`: name, initials, role, bio, portrait, timezone, location, verified availability, social links, email, and WhatsApp number. Keep `demoMode: true` until the demo content has been replaced.
- `projects`: your project images, descriptions, roles, tags, years, and optional live URLs. Set `demo: false` for actual projects. Optional `imageSet` supports responsive `srcset`.
- `testimonials`: your actual quotes, names, roles, and optional licensed avatar images. Empty by default; the page displays an honest placeholder until supplied.
- `credentials`: your actual certificates, issuer, description, optional local image, and verification URL. Empty by default. The footer strip automatically uses these credentials when present; otherwise it shows disciplines.
- `services`, `process`, `expertise`, and `disciplines`: tailor the illustrative copy to your real capabilities.

Put your licensed images in `public/images/`. Use compressed WebP/AVIF for photographic assets and keep a consistent crop for projects. Images below the fold load lazily and reserve their layout space. Update `index.html` title, description, social metadata, and favicon before publishing. Do not publish unverified claims or demo projects as your own commissioned work.

## Contact behavior

The form validates a name, email, and project description. When `profile.email` is configured, **Prepare email** opens the visitor's email app with a populated draft. This is not a server-side email submission; the visitor sends the draft themselves.

While contact details are absent, **Save project brief** downloads a plain text file locally and explicitly states that no message was sent. Form data is not stored or sent to a server. A configured WhatsApp number enables the footer contact link. The email copy action reports success or an actionable clipboard failure.

## Implementation

- `src/App.tsx`: floating navigation, hero, gallery, capabilities, five-step process, testimonials, profile, expertise, contact, footer, and native project/contact dialogs.
- `src/styles.css`: shared visual tokens, responsive composition, hover states, technical grid, CSS depth, marquee, focus states, and reduced-motion fallbacks.
- `src/components/SmokeCursor.tsx`: one Canvas 2D layer, a bounded 78-particle pool, three cached smoke textures, a short drafting ribbon, an interactive halo, 680–900 ms lifetimes, DPR cap of 1.5, and an animation loop that stops when idle. Disabled for touch/tablet widths and reduced motion, including preference changes. Native pointer stays visible.
- `src/hooks/usePortfolioMotion.ts`: GSAP + ScrollTrigger heading line reveals, section fades, card staggers, small scroll parallax, and pointer depth. Cleanup supports React Strict Mode and dynamic reduced-motion changes.
- `src/lib/motion.ts`: shared motion constants.
- `DESIGN.md`: the complete user-supplied visual brief, retained as the source of truth.

Native scrolling remains responsive, with smooth anchor navigation. The hero uses layered CSS depth rather than WebGL. Only GSAP is included as an animation dependency. The font is self-hosted, Latin-subset Manrope. Concept images are original small SVGs, documented in `public/images/ASSETS.md`.

## Browser QA and screenshots

```sh
npm run qa
```

The harness uses Playwright with installed Chrome or Edge on Windows; otherwise install Playwright Chromium with `npx playwright install chromium`. Set `QA_URL` for another local preview URL, `QA_BROWSER` for a browser executable, or `QA_OUTPUT` for another artifact folder.

Checks include desktop 1440 px, tablet 834 px, mobile 390 px, and small mobile 320 px. It checks horizontal overflow, console/request errors, images, layout shift, floating navigation, keyboard focus, mobile menu, project dialog, form validation/download, smoke painting/fade, and reduced motion. Screenshots and `report.json` are saved to `artifacts/qa/`.

Automated layout and performance observations are local browser measurements, not a Lighthouse audit or a claim that every assistive technology was tested. The source supports personalization; it still needs your real content before publication.
