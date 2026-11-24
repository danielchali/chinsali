# Local backend

This dependency-free Node service serves the static portal at `http://127.0.0.1:3000` and provides a small same-origin JSON API. It is intended for local development only and binds to loopback; do not expose it directly to the internet.

## Run

Use Node.js 18 or newer. Generate a 32-byte encryption key and keep it in your shell or a secret manager; do not commit it:

```powershell
$env:SUBMISSION_ENCRYPTION_KEY = node -e "process.stdout.write(require('node:crypto').randomBytes(32).toString('base64'))"
$env:ADMIN_PASSWORD = Read-Host "Set local staff password"
npm --prefix backend start
```

Keep the same key across restarts if you need to preserve encrypted submissions. The encrypted append-only file is written to `backend/data/submissions.jsonl`, which is ignored by Git. Without the key, the portal still runs, but server-side submissions return `503`; direct-file/offline use keeps the browser-local fallback.

Online voting is optional. Configure the Supabase project URL and public anon key in the server environment; the API invokes the existing `cast_vote` RPC and never modifies poll votes directly. By default, RPC arguments are `poll_id` and `option_id`. If the existing function uses different parameter names, configure `CAST_VOTE_POLL_PARAM` and `CAST_VOTE_OPTION_PARAM` to match it. Do not put service-role keys or other secrets in browser code.

## Local staff publishing workspace

Set `ADMIN_PASSWORD` to a unique password of at least 12 characters in the same shell before starting the server. Staff sign in at `/login`; authenticated users are redirected to the protected `/admin` workspace for editorial dashboards, news creation/editing, photo uploads, gallery publishing and poll drafts. `ADMIN_COOKIE_SECURE=1` enables the Secure cookie flag when running behind HTTPS. The backend still binds to loopback; these settings do not make it production-ready.

Editorial content is stored in the Git-ignored `backend/data/content.json`; uploaded images are stored under `backend/data/uploads/`. The public site receives only published news and gallery entries through `GET /api/content/public`. Draft images are not served publicly. Image uploads are limited to JPEG, PNG and WebP files up to 5 MB.

Staff sessions use an HttpOnly, SameSite=Strict cookie and expire after eight hours; sessions are lost when the process restarts. The dashboard does not read resident reports or submissions. Polls created here remain drafts because publishing usable polls requires a compatible database record and the existing `cast_vote` function. This local workspace does not add staff accounts, roles, production audit controls, or database migrations.

Run the backend tests with:

```powershell
npm --prefix backend test
```

## API

- `GET /api/health` reports whether encrypted submissions and online voting are configured.
- `GET /api/content/public` returns published news and gallery entries only.
- `GET|POST|DELETE /api/admin/session` checks, creates and ends the local staff session. `ADMIN_PASSWORD` is required for sign-in.
- Authenticated staff routes: `GET /api/admin/overview`, `GET|POST /api/admin/content/{news,gallery,polls}`, `PUT|DELETE /api/admin/content/{news,gallery,polls}/{id}`, and `POST /api/admin/uploads`.
- `GET /api/media/{filename}` serves uploaded images only after they are attached to published news/gallery content (or to an authenticated staff session).
- `POST /api/submissions` accepts issue, feedback, service and proposal submissions, encrypts them with AES-256-GCM at rest, and returns a reference. Anonymous submissions discard phone numbers. This endpoint is insert-only; submission records and references cannot be read back through a public API.
- `POST /api/votes` forwards `{ "pollId": "...", "optionId": "..." }` to the Supabase `cast_vote` function.
- `POST /api/ussd` accepts an Africa's Talking-style form-encoded or JSON webhook with `sessionId`, `serviceCode`, `phoneNumber` and cumulative `text` fields. It responds as `text/plain` with `CON` to continue or `END` to finish. The report flow encrypts the issue and deliberately does not retain `phoneNumber`. The service code defaults to `*388*133#`; override it with `USSD_SERVICE_CODE`.

Configure the USSD provider's webhook URL as `https://<your-domain>/api/ussd` after deploying behind HTTPS. The backend currently binds to loopback for local development, and no USSD provider or short code is configured by this repository. Before making the endpoint internet-facing, add the provider's request signature or IP allow-list and deploy with production-grade secret management.

The report flow works end to end. The service-directory and project-update menu options give informational replies; live directory lookup and public project-status lookup are not implemented. Requests are size-limited and rate-limited. Whistleblowing submissions are deliberately not accepted by this service: the prototype has no restricted staff access, agency arrangement or production-grade retention and incident controls. Public status lookup and staff review also require a separately approved data-access design before deployment.
