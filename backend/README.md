# Local backend

This dependency-free Node service serves the static portal at `http://127.0.0.1:3000` and provides a small same-origin JSON API. It is intended for local development only and binds to loopback; do not expose it directly to the internet.

## Run

Use Node.js 18 or newer. Generate a 32-byte encryption key and keep it in your shell or a secret manager; do not commit it:

```powershell
$env:SUBMISSION_ENCRYPTION_KEY = node -e "process.stdout.write(require('node:crypto').randomBytes(32).toString('base64'))"
npm --prefix backend start
```

Keep the same key across restarts if you need to preserve encrypted submissions. The encrypted append-only file is written to `backend/data/submissions.jsonl`, which is ignored by Git. Without the key, the portal still runs, but server-side submissions return `503`; direct-file/offline use keeps the browser-local fallback.

Online voting is optional. Configure the Supabase project URL and public anon key in the server environment; the API invokes the existing `cast_vote` RPC and never modifies poll votes directly. By default, RPC arguments are `poll_id` and `option_id`. If the existing function uses different parameter names, configure `CAST_VOTE_POLL_PARAM` and `CAST_VOTE_OPTION_PARAM` to match it. Do not put service-role keys or other secrets in browser code.

Run the backend tests with:

```powershell
npm --prefix backend test
```

## API

- `GET /api/health` reports whether encrypted submissions and online voting are configured.
- `POST /api/submissions` accepts issue, feedback, service and proposal submissions, encrypts them with AES-256-GCM at rest, and returns a reference. Anonymous submissions discard phone numbers. This endpoint is insert-only; submission records and references cannot be read back through a public API.
- `POST /api/votes` forwards `{ "pollId": "...", "optionId": "..." }` to the Supabase `cast_vote` function.

Requests are size-limited and rate-limited. Whistleblowing submissions are deliberately not accepted by this service: the prototype has no restricted staff access, agency arrangement or production-grade retention and incident controls. Public status lookup and staff review also require a separately approved data-access design before deployment.
