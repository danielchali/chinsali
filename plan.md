# My Chinsali — vanilla platform plan

## Implementation approach

Convert the existing React/TanStack starter into a plain static single-page application. The browser entry is `index.html` + `main.js` + `styles.css`; navigation uses hash-safe route changes and delegated DOM events, with no React, TanStack Router, TypeScript, Tailwind, build tool or component framework. The static version uses curated civic demo data and localStorage for submissions and votes so it works offline and can be opened directly.

The public portal covers the approved main navigation: Home, Public Services, Community, Propose a Project, Report an Issue, Whistleblowing, Development Tracker, Community Map, Polls & Consultations, News & Notices, and Help & Information. It includes the key public flows (search/filter services, submit reports and proposals, vote, track references, select a ward, view project progress, and browse map/news information) with accessible forms, success states, responsive layouts and low-bandwidth-friendly styling. A staff portal entry is included as a clearly separated presentation surface; no fabricated authentication is presented as production-ready.

## Project structure

- `index.html` — browser shell, metadata, font loading and app mount.
- `main.js` — route rendering, local demo state, form handlers and interaction logic.
- `styles.css` — vanilla CSS design system, responsive layout and component styles.
- `roadmap.md` / `TODO.md` — product scope and delivered/open outcomes.

## Design

### Style options

- **Civic field notes** — 0.06 probability: editorial typography, paper warmth and field-map annotations.
- **Public service utility** — 0.91 probability: calm, high-contrast civic green with structured cards and clear actions.
- **Digital district atlas** — 0.03 probability: dark cartographic dashboard with neon data accents.

Chosen style: **Civic field notes**.

- **Design Movement:** contemporary civic editorial, combining a printed community noticeboard with a modern service portal.
- **Core Principles:** make the next action obvious; show public progress as evidence; respect low-bandwidth contexts; make resident voice feel consequential.
- **Color Philosophy:** warm paper and ink create approachability; council green anchors trust and action; clay orange marks urgency and participation; blue is reserved for informational map and service signals.
- **Layout Paradigm:** an editorial rail rather than a centered dashboard grid: a strong left narrative column, offset content blocks, and annotated map/progress panels that keep the interface feeling like a living public record.
- **Signature Elements:** hand-drawn underline accents, ward/location pins, and small uppercase field labels with “public record” metadata.
- **Interaction Philosophy:** actions respond with clear state changes, references and progress; navigation stays shallow and every form exposes why information is requested.
- **Animation:** restrained 160–220ms rises/fades for cards and route changes; progress bars ease in; no looping motion that adds noise or data cost.
- **Typography System:** Fraunces for civic headlines and display numerals; Manrope for body copy, controls and metadata. Headings use compact editorial line-height; labels use uppercase tracking.
- **Brand Essence:** the practical public record for residents of Chinsali — informed, participatory and accountable. Personality: grounded, warm, transparent.
- **Brand Voice:** direct, dignified and locally specific. Example lines: “Make your ward impossible to ignore.” and “See what is planned, funded and moving.”
- **Wordmark & Logo:** a rounded green “M” seal paired with an orange location notch, suggesting a map pin and a community mark rather than a generic app icon.
- **Signature Brand Color:** Chinsali field green, a deep botanical green used for the mark, navigation and primary actions.
