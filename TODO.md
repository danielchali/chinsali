# My Chinsali delivery outcomes

## Vanilla foundation

- [x] The app runs directly from `index.html` with plain JavaScript and CSS, without React, TanStack Router, Tailwind, JSX, TypeScript or Vite.
- [x] The app exposes hash routes covering `/`, `/services`, `/community`, `/propose`, `/report`, `/whistleblowing`, `/tracker`, `/map`, `/polls`, `/news`, `/help`, and `/admin`.
- [x] The design is responsive, landscape-friendly, low-bandwidth-conscious, keyboard-usable and visually consistent with the approved civic field notes direction.

## Public services and information

- [x] Residents can search and filter a central public service directory spanning CDF, health, agriculture, education, permits, planning, fire and emergency, community development, public health and legal services.
- [x] Service cards expose a description, responsible department, contact, office hours, location and next action.
- [x] Residents can select a ward/community and see local announcements, active projects, participation prompts and service context.
- [x] News, notices, events, FAQs and low-connectivity access guidance are visible through dedicated portal sections.

## Participation and reporting

- [x] Residents can submit a community project proposal with category, ward, need, solution, beneficiaries, urgency and supporting attachment fields, and receive a local prototype reference.
- [x] Residents can submit issue reports with category, ward, location, details, optional phone, anonymous mode and a reference-number success state.
- [x] A separate whistleblowing surface explains restricted handling, accepts sensitive allegations and does not present ordinary reports as confidential investigations.
- [x] Residents can vote in active consultations once per browser and see result percentages using browser-local demo data.

## Transparency and tracking

- [x] Residents can browse projects by lifecycle status, ward and category with budgets, progress and milestone context.
- [x] A development tracker accepts a report/reference search and displays a clear status timeline.
- [x] A community map presentation shows proposed, ongoing and completed work, reported issues and public facilities with filters and a visible non-precision disclaimer.
- [x] The site distinguishes public participation from official approval and labels demo/fallback data honestly.

## Remaining production work

- [ ] Replace demo fallback records with approved council content and production data policies.
- [ ] Add authenticated staff RBAC, moderation, audit logs and restricted agency intake before operational whistleblowing referrals.
- [ ] Add contracted SMS/USSD integrations for ONTECH `*388*133#` and SMS workflows.
