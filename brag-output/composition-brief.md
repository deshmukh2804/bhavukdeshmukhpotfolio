# Hyperframes Composition Brief: Bhavuk Deshmukh Portfolio

## Objective
Create a short, polished, high-impact launch-style brag video for Bhavuk Deshmukh's Creative Developer & Designer Portfolio, formatted as a vertical 9:16 Instagram Reel.

## Output
- Composition directory: `brag-output/composition/`
- Rendered video: `brag-output/brag.mp4`
- Format: vertical (9:16) — 1080x1920, 30fps
- Duration: 20.0 seconds

## Source Material
- Project root: `c:\potfolio\my-portfolio`
- Primary files read: `index.html`, `src/styles.css`, `src/App.tsx`, `src/data/portfolio.ts`, `src/data/profile.ts`, `src/data/projects/*.ts`
- Product name: Bhavuk Deshmukh — Portfolio
- Tagline / strongest claims:
  - "Development, with a design eye."
  - "From the first idea to the last pixel."
  - "Available for freelance / Open to opportunities"
- Key UI and visual moments to recreate:
  - Sleek dark theme with grid overlay and glowing emerald accents (`#54b978`)
  - Real project SVG mockups: `Homeserviceapp.svg` and `securefaceapp.svg`
  - Interactive architecture diagram connectors & data flow indicators
  - Live status indicators and real project statistics (15+ platform modules, <60s booking flow, <1.5s face verification)
- Copy that must appear verbatim:
  - "Bhavuk Deshmukh"
  - "Creative developer & designer"
  - "Development, with a design eye."
  - "UWe Home Services"
  - "Full-stack on-demand service marketplace"
  - "15+ Platform Modules"
  - "<60s Booking Flow"
  - "SECARE"
  - "Secure face + OTP authentication platform"
  - "<1.5s Verification Speed"
  - "Available for freelance / Open to opportunities"
  - "Pune, India"

## Creative Direction
- Tone preset: `polished`
- Creative direction: Sleek, high-end creative tech showcase with modern kinetic motion and razor-sharp architectural clarity.
- Interpretation: Smooth GSAP timeline animations, high readability holds, premium glassmorphism, responsive visual rhythm synced to 110 BPM beats.
- Angle: Developer portfolios are usually static cards; this video brings to life real, production-grade distributed architectures and biometric systems built with top-tier craft.
- Hook: 0.0s - 4.10s — Brand monogram and bold identity with emerald glow.
- Outro / punchline: 15.28s - 20.0s — "Crafting High-Impact Digital Experiences" + Live Availability indicator + "Let's build something remarkable."
- Avoid:
  - Generic SaaS buzzwords
  - Abstract ungrounded visuals
  - Invented fake metrics

## Visual Identity
- Background: `#0a0a0a`
- Surface: `#111111` / `#151515`
- Border: `#242424` / `rgba(255, 255, 255, 0.08)`
- Text: `#f5f5f2`
- Muted: `#9f9f9a`
- Accent: `#54b978`
- Accent Hover: `#62c786`
- Display font: `Manrope`, sans-serif
- Body font: `Manrope`, sans-serif
- Visual references from project: Emerald status dots, glowing architecture nodes, card borders with gradient highlights, clean badge chips.

## Storyboard
1. **Scene 1 (The Hook & Creative Identity)** — 0.00s to 4.10s (4.10s) — Monogram, "Bhavuk Deshmukh", "Creative developer & designer", "Development, with a design eye", tech chips.
2. **Scene 2 (UWe Home Services)** — 4.10s to 9.83s (5.73s) — Marketplace mobile app UI, 15+ modules, <60s booking flow, live architecture data flow (Customer -> API -> Redis -> RabbitMQ).
3. **Scene 3 (SECARE Biometrics)** — 9.83s to 15.28s (5.45s) — WebRTC face verification scanner UI, OTP verification, <1.5s verification speed, 2-factor security states.
4. **Scene 4 (Payoff & Call to Action)** — 15.28s to 20.00s (4.72s) — "Crafting High-Impact Digital Experiences", live freelance availability indicator, Pune, India, CTA "Let's build something remarkable."

## Audio
- Audio role: Energetic modern groove with crisp rhythmic pulse and subtle UI SFX.
- Audio arc: Starts punchy, sustains high momentum across project reveals, resolves cleanly with a smooth outro fade.
- Music: `assets/music/happy-beats-business-moves-vol-10-by-ende-dot-app.mp3`
- Music treatment: Starts at 0.0s, 0.5s fade-in, volume 0.85, smooth 1.5s fade-out at end.
- Music cue guidance: 110 BPM track. Beat grid used: 0.27s, 0.82s, 1.90s, 4.10s, 5.19s, 6.28s, 7.35s, 9.83s, 10.38s, 11.47s, 12.56s, 15.28s, 18.55s.
- Audio-reactive treatment: Subtle breathing glow on card borders and emerald accent dots tied to bass pulses.
- SFX files:
  - `assets/sfx/drop_001.ogg` (Scene 1 intro at 0.27s)
  - `assets/sfx/click_001.ogg` (Tech chips at 1.90s, Stat tick at 6.28s)
  - `assets/sfx/card-slide-1.ogg` (Scene 2 entrance at 4.10s)
  - `assets/sfx/switch_001.ogg` (Architecture activate at 5.19s)
  - `assets/sfx/select_008.ogg` (Scene 3 entrance at 9.83s)
  - `assets/sfx/bong_001.ogg` (Face scan verified chime at 12.56s)
  - `assets/sfx/drop_002.ogg` (CTA landing at 15.28s)

## Hyperframes Instructions
- Implement exact dimensions: `data-width="1080"` and `data-height="1920"`, `data-duration="20"`.
- Use paused GSAP timeline attached to `window.__timelines["root"]`.
- Ensure all text has generous settled time (all headlines hold for 2+ seconds).
- Maintain high WCAG contrast (> 7:1 for headers, > 4.5:1 for body and badges).
- Use local assets relative to `composition/`.
