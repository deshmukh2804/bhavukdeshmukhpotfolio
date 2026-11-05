ESIGN.md — Flow Design Agency / DesignByLissan Portfolio Recreation
Purpose: rebuild the visual and interaction system of the referenced Webflow portfolio as a custom portfolio site while replacing personal copy, client names, project screenshots, certificates, portraits, logos, and other third-party assets with your own licensed content.
Reference: Webflow Made in Webflow project “Webflow Freelancer/Agency” by Lissan Haider. The original is publicly listed as cloneable in Webflow.

1. Product Intent
Build a premium one-page creative-developer / portfolio website with a dark cinematic aesthetic, subtle grid background, green accent color, strong white typography, dense portfolio imagery, 3D/depth effects, smooth scrolling, scroll reveals, project-card hover motion, horizontally moving elements, and a smoke-like custom cursor trail.
The experience should feel:
- premium, technical, creative, and modern
- dark but not visually heavy
- animation-rich without becoming noisy
- polished like a Webflow showcase site
- focused on portfolio proof, services, process, reviews, expertise, and contact conversion
Do not turn this into a generic SaaS landing page. Keep it personal, visual, portfolio-first, and motion-driven.
2. Page Architecture
Use a single long-scrolling page in this order:
1. Sticky / floating navigation
2. Hero / identity statement
3. Social proof / successful projects micro-proof
4. Project showcase grid
5. Capabilities / services
6. Five-step process
7. Testimonials / reviews
8. Personal profile / expertise section
9. Skill / certification / credibility cards
10. Closing CTA
11. Footer with local-time/contact row
12. Horizontally moving certificate / partner strip
Primary anchor IDs:
#home
#work
#capabilities
#process
#testimonials
#about
#contact
3. Visual Style
Overall theme
- near-black page background
- faint technical grid texture across large areas
- white / off-white typography
- dark elevated cards
- muted gray supporting text
- saturated medium green as the primary action/accent
- occasional Webflow-blue certification / partner badge if relevant
- almost no gradients except extremely subtle glow or vignette
- no bright rainbow effects
- no glassmorphism overload
Design tokens
These values are a faithful visual recreation target, not source-extracted CSS values. If using the official Webflow clone, read exact values from its Style panel and replace these approximations.
:root {
  --bg: #0a0a0a;
  --bg-deep: #070707;
  --surface: #111111;
  --surface-2: #151515;
  --surface-3: #1a1a1a;
  --border: #242424;
  --border-soft: rgba(255,255,255,.08);
  --grid-line: rgba(255,255,255,.035);

  --text: #f5f5f2;
  --text-soft: #d3d3cf;
  --muted: #9f9f9a;
  --muted-2: #71716d;

  --accent: #54b978;
  --accent-hover: #62c786;
  --accent-dark: #2f7f50;
  --accent-soft: rgba(84,185,120,.15);

  --webflow-blue: #4353ff;

  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 18px;
  --radius-xl: 24px;

  --shadow-card: 0 18px 60px rgba(0,0,0,.30);
  --shadow-green: 0 10px 35px rgba(84,185,120,.14);
}
Background grid
Use a full-page faint grid, especially visible in hero and dark open areas.
background-image:
  linear-gradient(var(--grid-line) 1px, transparent 1px),
  linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
background-size: 64px 64px;
Add a weak radial vignette so the center is slightly brighter than corners.
4. Typography
The reference uses a modern geometric sans appearance. For a clean rebuild use Inter, Manrope, or another neutral geometric sans. If using the official Webflow clone, use the exact family found in the project settings.
Recommended hierarchy:
Display / Hero:
  desktop: clamp(56px, 6vw, 94px)
  line-height: .95–1.02
  weight: 450–600
  letter-spacing: -0.04em

Section H2:
  desktop: 48–64px
  tablet: 38–48px
  mobile: 32–40px
  line-height: 1.02–1.08
  weight: 500–600
  letter-spacing: -0.03em

Card H3:
  22–30px
  line-height: 1.1
  weight: 500–600

Body:
  16–18px
  line-height: 1.55–1.7
  weight: 400

Small metadata:
  12–14px
  line-height: 1.4
  letter-spacing: .01em
Use font-style: italic or a slightly bolder style only for occasional emphasis words inside the hero headline.
5. Layout System
Max width
Desktop content max-width: 1280–1360px
Wide media / project section max-width: 1440–1520px
Nav max-width: ~1180–1260px
Side padding
>= 1440px: 48–64px
1200–1439px: 40px
768–1199px: 28–32px
<= 767px: 18–20px
Section vertical rhythm
Hero: 130–180px top / 100–140px bottom
Major sections: 120–180px vertical
Mobile: 72–96px
Do not compress the layout. Large breathing space is important.
6. Navigation
Desktop
Floating dark nav centered near the top.
Left side:
- small circular profile image / brand mark
- name
- small blue Webflow / professional badge below or beside the name
Center:
- Work
- Capabilities
- Process
- Testimonial
Right:
- compact CTA such as Hire me / Work with me / Start a project
Style:
height: 56–64px
background: rgba(16,16,16,.84)
border: 1px solid rgba(255,255,255,.08)
backdrop-filter: blur(12px)
border-radius: 12–16px
box-shadow: subtle black shadow
Interaction:
- sticky/fixed after entering page
- nav slightly reduces height after scrolling ~60px
- active link can gain white text + subtle dot/underline
- hover fades text from muted gray to white in 160–220ms
- CTA gets mild green glow on hover
Mobile
- logo/name left
- menu icon right
- open full-width dark panel under header
- menu items 26–32px
- staggered reveal
- disable heavy cursor effects
7. Hero Section
Composition
Center aligned, occupying most of the first viewport.
Suggested structure:
small eyebrow / role label
large 2–4 line statement
supporting paragraph centered
primary + secondary CTA row
success proof row with overlapping avatars
handwritten / annotation-style micro label
3D or floating visual element integrated around headline/hero
The hero should feel visually open, not packed with cards.
Hero headline
- centered
- white/off-white
- 900–1100px readable width on large screens
- occasional italic/emphasis word
- max 4 lines on desktop
CTA buttons
Primary:
background: green
text: near-white
padding: 16px 22px
radius: 8–10px
hover: translateY(-2px), brighter green, subtle glow
Secondary:
background: #151515
border: 1px solid rgba(255,255,255,.08)
text: white
hover: border slightly brighter + translateY(-2px)
Social proof row
- 3–4 overlapping circular avatars
- 28–36px diameter
- thin black border around each avatar
- successful-project count text to the right
- small green text link below / beside
- hand-drawn curved arrow or handwritten annotation nearby
Hero 3D behavior
The reference has been described as using a 3D hero / small 3D elements. Recreate with either:
1. lightweight Three.js / React Three Fiber geometry, OR
2. pre-rendered transparent 3D PNG/WebP + CSS parallax, OR
3. layered DOM mockups/cards with perspective.
Motion target:
idle float: y ±8px over 4–6s
rotation: ±2deg to ±4deg
mouse parallax: max ±10px x/y
perspective: 900–1200px
Keep it slow. It should not compete with the headline.
8. Project Showcase / Work Section
Heading pattern:
- oversized section heading
- short supporting sentence underneath
- visual focus on project thumbnails, not long descriptions
Grid
Desktop:
- 4 columns when viewport permits, otherwise 3
- 18–24px gaps
Tablet:
- 2 columns
Mobile:
- 1 column
Each project card:
aspect-ratio: approx 4/3 or 16/10
background: dark surface
border: 1px solid rgba(255,255,255,.06)
radius: 14–18px
overflow: hidden
position: relative
Image:
- object-fit cover
- crisp, high-resolution website screenshot
Overlay:
- initially subtle or hidden
- on hover, darkens lower portion
- project title / role / “View Project” appears
Hover animation:
card: translateY(-5px)
image: scale(1.035)
overlay: opacity 0 -> 1
link: y 8px -> 0
border: rgba(255,255,255,.06) -> rgba(255,255,255,.14)
duration: 350–500ms
ease: cubic-bezier(.22,1,.36,1)
Optional desktop pointer parallax:
- card rotates max 1.2deg in x/y based on pointer position
- reset with spring on pointerleave
Do not use dramatic 3D flips.
9. Capabilities / Services Section
Use 3 large service cards.
Each service card:
- title
- 1–3 sentence explanation
- optional icon / 3D visual
- dark elevated surface
- equal heights
Desktop:
- 3 columns
Mobile:
- stack vertically
Hover:
- small icon/visual shifts 4–8px
- border brightens
- surface slightly lifts
Use simple service categories such as:
Web Development
Figma / Design to Development
Ongoing Maintenance / Support
Replace these labels with your own portfolio skills.
10. Five-Step Process
The linked site uses a five-step workflow structure.
Sequence:
01 Request
02 Estimate
03 Approve
04 Develop
05 Deliver
For your portfolio, wording can remain conceptually similar but should match your own process.
Desktop layout
- 5 cards in row or a 3+2 responsive structure
- each contains a small illustration/icon at top
- large 01–05 number
- short title
- one-line explanation
Alternative: horizontal connected timeline with each card entering sequentially.
Animation
On scroll into view:
card initial: opacity 0, y 28px, scale .98
final: opacity 1, y 0, scale 1
stagger: 90–140ms
duration: 600–800ms
Line connector can draw from left to right using scaleX.
11. Testimonials Section
Dark section with high-contrast quote cards.
Possible layouts:
- desktop 2-column asymmetric masonry
- horizontal draggable slider
- stacked large quote cards
Each testimonial includes:
- quote
- circular client image
- name
- role/company
Do not copy the reference client's quotes or names. Replace with your own proof.
Interaction:
- if slider: drag/swipe, no autoplay or very slow autoplay
- quote card hover: 2–3px lift only
- avatar can scale from 1 to 1.04
Scroll reveal with stagger.
12. About / Profile Section
Use a high-impact personal profile area near the lower third of the page.
Structure:
large portrait or profile image
small floating / decorative 3D object
name heading
availability status pill
CTA button
short bio or positioning statement
Availability pill:
green dot + “Available for work”
dark surface
thin border
small radius/pill
Profile image
- not full-bleed
- place inside rounded rectangular frame or cutout layout
- allow background grid to remain visible
- small parallax on pointer or scroll
13. Expertise / Credibility Cards
Use 4–5 credibility cards in a clean grid.
Examples:
Design-system / naming-method expertise
Community or professional membership
Animation / interaction expertise
Training / course credential
Platform / certification expertise
Card layout:
- small icon/logo top
- title
- compact description
- optional external text link
Use your own certificates and proof. Do not reuse third-party logos unless permitted.
14. Closing CTA
Large focused CTA before footer.
Layout:
- one strong sentence/question
- green or bordered button
- generous black negative space
Example content structure:
Already have a design and need it developed?
[Let’s talk]
Use your own copy.
Motion:
- headline reveals line-by-line
- button arrives 100–150ms later
15. Footer
Minimal but deliberate.
Row 1:
- local time
- short “Got a question?” label
- email
- WhatsApp/contact option
Row 2:
- certification / partner logos strip
Row 3:
- copyright
- privacy / terms if needed
Moving certificate / partner strip
Create a seamless horizontal marquee:
speed: 25–45 seconds per full loop
linear
infinite
pause or slow on hover
Duplicate the list in DOM so there is no visible reset.
Use gradient masks on left/right edges so items fade in/out.
16. Custom Cursor / Mouse Animation
The reference has been described as using a custom cursor with a smoke-like trail. This is a defining interaction and should be implemented carefully.
Cursor behavior
Desktop fine-pointer devices only:
@media (pointer: fine) {
  body { cursor: none; }
}
Use a fixed <canvas> above the interface:
position: fixed
inset: 0
width/height: 100vw/100vh
pointer-events: none
z-index: 9999
Smoke trail algorithm
On pointer move:
1. interpolate cursor position for smoothness
2. only emit when pointer travels > 5–7px
3. spawn 1–2 soft particles per emission
4. particle size: 8–22px
5. opacity: .08–.20
6. lifetime: 550–950ms
7. slowly increase scale by ~1.8x
8. drift upward 6–18px and sideways randomly
9. add blur 8–16px
10. fade opacity to 0
Suggested particle tone:
primary: rgba(255,255,255,.10)
secondary: rgba(84,185,120,.08)
Do not use thick neon blobs. Smoke should be subtle and wispy.
Cursor core
Optional small core dot:
size: 5–7px
background: rgba(255,255,255,.8)
On clickable hover:
core scale: 1 -> 1.8
opacity: .8 -> .35
smoke emission intensity: +15%
Accessibility
Disable custom cursor when:
(pointer: coarse)
prefers-reduced-motion: reduce
viewport < 768px
Always preserve standard keyboard focus indicators.
17. Scroll Animation System
Use GSAP + ScrollTrigger, Motion/Framer Motion, or an equivalent animation library.
Global reveal
Default section reveal:
opacity: 0 -> 1
y: 24px -> 0
duration: 0.7s
ease: power3.out
trigger: top 82%
Headings
Split by lines or words:
clip-path / overflow hidden wrapper
line y: 105% -> 0
stagger: 60–90ms
duration: 750–950ms
Avoid animating every character individually unless limited to the hero.
Project cards
opacity 0 -> 1
y 36 -> 0
scale .985 -> 1
stagger 80ms
Decorative 3D elements
Use gentle scroll-linked transforms:
yPercent: ±6 to ±14
rotate: ±2deg
Smooth scroll
Optional Lenis / equivalent:
lerp: .08–.12
wheel multiplier: ~0.9–1.0
Do not make scrolling feel delayed.
18. Micro-Interactions
Links
- opacity/color transition 160–220ms
- optional 1px underline draw left-to-right
Buttons
- lift 2px
- icon translate-x 3–5px
- shadow increases slightly
- active state returns to y=0
Images
- scale 1 -> 1.02–1.04 on hover
- no aggressive zoom
Cards
- border brightens slightly
- surface shifts from #111 to #151515
- no massive glow
Avatars / chips
- tiny spring scale on hover
19. Responsive Behavior
Desktop >= 1200px
- full nav
- multi-column work grid
- cursor smoke enabled
- 3D mouse parallax enabled
- larger section spacing
Tablet 768–1199px
- nav simplified
- work grid 2 columns
- process wraps
- reduced parallax amount
Mobile <= 767px
- menu drawer
- one-column content
- 32–44px main headings
- cursor smoke disabled
- no heavy Three.js if performance drops
- replace complex parallax with simple entrance animation
- marquee continues but at slower speed
20. Performance Rules
- prefer AVIF/WebP for portfolio images
- responsive srcset
- lazy load below-fold images
- do not lazy-load hero visual needed immediately
- compress profile imagery
- keep 3D scene under a modest polygon/material budget
- cap DPR to 1.5–2 on WebGL canvas
- smoke cursor should use pooled particles or a single canvas, not hundreds of DOM nodes
- pause off-screen animations with IntersectionObserver / ScrollTrigger
- ensure 60fps pointer movement on modern desktop
21. Accessibility Rules
- semantic heading hierarchy
- buttons vs anchors used correctly
- visible keyboard focus
- sufficient contrast
- aria-label for icon-only controls
- prefers-reduced-motion fallback
- decorative 3D/cursor canvas aria-hidden=true
- never make animation required to understand content
22. Implementation Architecture
Recommended modern stack:
React 19 / Next.js or Vite
TypeScript
Tailwind CSS or scoped CSS
GSAP + ScrollTrigger
Framer Motion / Motion for small UI transitions
Lenis for optional smooth scrolling
Three.js / React Three Fiber only for hero 3D if needed
Canvas 2D for smoke cursor
Suggested component tree:
<App>
  <GridBackground />
  <SmokeCursor />
  <Navbar />
  <main>
    <Hero />
    <ProjectShowcase />
    <Capabilities />
    <Process />
    <Testimonials />
    <Profile />
    <Credentials />
    <ClosingCTA />
  </main>
  <Footer />
  <CertificateMarquee />
</App>
Suggested data files:
src/data/projects.ts
src/data/services.ts
src/data/process.ts
src/data/testimonials.ts
src/data/credentials.ts
Do not hard-code repeated portfolio cards directly in JSX.
23. Motion Constants
Use shared motion constants so the entire site feels consistent.
export const motion = {
  fast: 0.18,
  base: 0.38,
  reveal: 0.72,
  slow: 1.1,
  easeOut: [0.22, 1, 0.36, 1],
  spring: { type: 'spring', stiffness: 240, damping: 24 }
}
24. Do / Do Not
Do
- preserve black/grid/green visual language
- use large confident typography
- give project screenshots most of the visual weight
- use depth and motion sparingly
- keep sections spacious
- create a genuinely smooth custom cursor trail
- keep animations subtle and consistent
- make the page feel handcrafted rather than template-like
Do not
- add random gradients
- use red accents
- make everything glassy
- create cartoon illustrations unless they are part of your own brand
- use huge blobs following the mouse
- make every card rotate dramatically
- use excessive bouncing
- add generic dashboard UI unrelated to a portfolio
- copy the reference site's personal testimonials, portraits, project artwork, or certificates
25. Acceptance Checklist
The implementation is complete only when all items below pass:
[ ] dark near-black visual system matches reference mood
[ ] faint grid visible behind hero/open areas
[ ] floating/sticky premium navigation works
[ ] hero has large centered typography and two CTAs
[ ] hero includes depth/3D/floating visual treatment
[ ] project gallery has high-quality visual cards
[ ] project hover transitions feel smooth and premium
[ ] services/capabilities section implemented
[ ] five-step process implemented
[ ] testimonial/review section implemented
[ ] profile/about block implemented
[ ] credential/expertise cards implemented
[ ] large closing CTA implemented
[ ] footer contact/local-time layout implemented
[ ] horizontal moving logo/certificate strip implemented
[ ] smoke-like custom cursor works on desktop
[ ] cursor effect disabled on touch/reduced-motion
[ ] section reveal animations exist
[ ] heading line reveals exist
[ ] mobile layout is one-column and performant
[ ] no visible layout shift while images load
[ ] Lighthouse performance remains acceptable
26. Clean-Room Recreation Notes
The linked Webflow project is publicly presented as a cloneable Webflow project. For the most exact reproduction inside Webflow, use the official Clone in Webflow action and inspect its actual classes, breakpoints, interactions, assets, and timing values directly.
For a React/Next/Vite implementation, this DESIGN.md is intended as a clean implementation specification. Replace creator-specific content and third-party media with your own licensed assets.
27. Codex / Claude Code Build Instruction
Use the following instruction with this file:
Read DESIGN.md completely before modifying the project.

Rebuild my portfolio so that its visual language and interaction behavior closely follow DESIGN.md. Preserve my existing project architecture, routing, and working business logic unless a change is required for this design. Do not copy third-party personal content or proprietary assets; use my existing portfolio content and licensed images.

Implementation priorities:
1. Match the dark near-black + faint grid + green accent visual system.
2. Match layout proportions, large typography, spacing, card radii, and borders.
3. Build the hero with a premium 3D/depth effect and subtle pointer parallax.
4. Build the project showcase with smooth hover scale, overlay, and pointer depth.
5. Add a smoke-like canvas cursor trail on desktop only.
6. Add smooth scroll-triggered heading/section/card reveals.
7. Add the five-step process, testimonials, profile/credentials, CTA, and marquee footer.
8. Keep animations performant and respect prefers-reduced-motion.
9. Do not change unrelated files or logic.
10. After implementation, test desktop, tablet, and mobile and fix overflow, animation jitter, accessibility, and performance issues.

Do not stop after creating a rough layout. Continue until spacing, typ