# My Chinsali

My Chinsali is a public participation and development transparency portal for Chinsali District, Zambia. It helps residents find public services, report community issues, propose projects, take part in consultations and follow the public project record.

## Static build

This repository is intentionally dependency-free. The site is plain HTML, CSS and JavaScript and can be opened directly by double-clicking `index.html` or served from any static host. No npm install, build step or application server is required.

The interface ships with curated civic demo data and browser-local fallback submissions so every public flow can be explored offline. Replace the demo records and connect approved production endpoints when the council is ready for deployment.

## Local backend

A dependency-free Node API is available for local development. It serves the portal and accepts encrypted, insert-only resident reports, feedback and proposals. Start it with Node 18 or newer; setup, environment variables and API details are in [backend/README.md](backend/README.md). Opening `index.html` directly still uses browser-local fallback submissions.

The backend is a local-development foundation, not a production deployment: public submission reads, staff review of resident records, retention controls, public vote-result reads and operational whistleblowing are intentionally not implemented. Staff sign in at `/login` to reach a separate single-password editorial workspace at `/admin`, which manages local news, gallery images and poll drafts without providing production accounts or role-based access. Votes submitted through the API call the existing Supabase `cast_vote` function; no Lovable-managed database schema or migration is changed.

The home page includes a lightweight Chinsali image feature using locally stored town, market and district-map assets. The district map is also adapted into `assets/favicon.webp`; see [ASSET-CREDITS.md](ASSET-CREDITS.md) for attribution and the production-permission follow-up for editorial photographs.

The gallery route includes a Leaflet/OpenStreetMap landmark map with markers for the Chinsali town reference, Lubwa Mission and Chipoma Falls. Marker popups link back to the matching gallery image. The Chinsali New Market photograph is labelled as a town-centre reference because the public geocoder did not return a distinct market pin; coordinate evidence and limitations are recorded in [MAP-SOURCES.md](MAP-SOURCES.md). Visitors can also share an optional-name experience or memory through the browser-local visitor memories form. These memories are not automatically verified council statements and are not sent to a server in this static build.

## Main public areas

Home, Public Services, My Community, Propose a Project, Report an Issue, Whistleblowing, Development Tracker, Community Map, Chinsali Photo Gallery with landmark map and visitor memories, Polls & Consultations, News & Notices, Help & Information and the local staff publishing workspace.

## Production follow-up

The remaining operational work is authenticated staff RBAC, moderation and audit controls, approved council content, SMS/USSD integration for ONTECH `*388*133#`, and formal agency arrangements and secure infrastructure for whistleblowing referrals.
