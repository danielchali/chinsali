# My Chinsali — vanilla platform plan

## Implementation approach

Keep the existing dependency-free static single-page application. The browser entry remains `index.html` + `main.js` + `styles.css`; navigation uses hash-safe route changes and delegated DOM events, with no framework or build step. The redesign preserves the curated civic demo data and browser-local fallback submissions so the portal still works offline.

The home page now prioritises a clear service journey: a focused hero, a local-government quick-links rail directly below it, the existing public record, gallery and participation flows. The service links use the existing directory data and open the services route with the relevant category selected.

## Project structure

- `index.html` — browser shell, metadata, favicon and app mount.
- `main.js` — route rendering, local demo state, SVG icons, quick links, form handlers and interaction logic.
- `styles.css` — shared responsive design system and component styles.
- `manus-routes.json` — complete static route manifest for the hash-routed portal.
- `roadmap.md` / `TODO.md` — product scope and delivered/open outcomes.

## Design

### Style options

- **Apple civic utility** — 0.92 probability: white surfaces, graphite typography, soft depth and one confident green accent.
- **Civic field notes** — 0.05 probability: editorial annotations, warm paper and field-map details.
- **Digital district atlas** — 0.03 probability: dark cartographic dashboard with dense data accents.

Chosen style: **Apple civic utility**.

- **Design Movement:** calm system UI inspired by Apple’s restraint, translated for a public-service context.
- **Core Principles:** make the next action obvious; use whitespace to reduce cognitive load; show public progress as evidence; keep content readable on low-bandwidth devices.
- **Color Philosophy:** white and soft neutral surfaces keep the portal trustworthy and calm; graphite carries hierarchy; Chinsali green is reserved for actions, focus states, links and civic status.
- **Layout Paradigm:** a spacious editorial flow with a two-column hero, a six-item quick-link rail, full-width content bands and simple cards rather than a dense dashboard.
- **Signature Elements:** green action accents, quiet rounded surfaces with soft shadows, and large properly cropped local photography.
- **Interaction Philosophy:** every shortcut opens a useful destination; hover/focus states are subtle; forms explain why information is requested; no decorative motion competes with civic content.
- **Animation:** restrained 160–200ms rises and color transitions; respect reduced-motion preferences; no looping or ornamental animation.
- **Typography System:** system UI sans-serif stack for a familiar, high-legibility feel. Large tight headlines, small tracked labels, and compact metadata establish hierarchy without decorative type.
- **Brand Essence:** a practical public record for residents of Chinsali — clear, useful and accountable. Personality: grounded, direct, welcoming.
- **Brand Voice:** specific and action-led. Example lines: “Start with the right desk.” and “See what is planned and moving.”
- **Wordmark & Logo:** a compact green M mark paired with a simple text wordmark; no ornamental badge treatment.
- **Signature Brand Color:** Chinsali green, used sparingly so primary actions and important civic states are easy to find.
