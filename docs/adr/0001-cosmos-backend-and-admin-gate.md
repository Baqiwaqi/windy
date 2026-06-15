---
status: accepted
---

# Add a Cosmos backend with a Google-auth admin gate for personal owner data

The Windpark-analyse app was a static, client-only SPA (zustand + `localStorage`,
no server). To support **shared Presets** and **landowner exports**, we are adding
a server backend on **Azure Cosmos DB (NoSQL, serverless)**, reached through
TanStack Start server functions on Vercel.

The driving constraint is legal, not technical: landowner data (names, home
addresses, birthdates) is **personal data under AVG/GDPR**, so it cannot be bundled
into client code or served on a public endpoint. We therefore introduce a single
**Admin** role, authenticated via **Google Sign-In** (bootstrap by an `ADMIN_EMAILS`
allowlist, others by an approved Admin request), and serve owner data only to
authenticated Admin requests. Anonymous **Visitors** keep full use of the tool but
never receive owner data. The admin area sits at an unadvertised URL, but the real
boundary is the **server-side role check** — obscurity is UX only.

## Considered Options

- **Cosmos DB (chosen).** Explicitly requested; cheap on the serverless tier for this
  low-traffic app; NoSQL fits the small, denormalized document set.
- **Vercel KV / Postgres, or Supabase.** Co-located with hosting (lower latency, one
  vendor), but not chosen — the operator wanted Cosmos.
- **Single shared admin password instead of Google OAuth.** Simpler, but no per-person
  identity, no self-service request/approval, and weaker accountability for who can
  view personal data.
- **Stay client-only.** Rejected: cannot share Presets across browsers and cannot keep
  personal owner data off the public client.

## Consequences

- Hosting (Vercel) and database (Azure) are in different clouds; server functions call
  Cosmos over HTTPS via `@azure/cosmos`. Choose a Cosmos region near Vercel to limit
  latency.
- Every privileged action must verify the session server-side; a client-only check
  would leak personal data.
- Secrets (Google client id/secret, Cosmos connection string, session secret,
  `ADMIN_EMAILS`) are managed as Vercel env vars.
- Scope is one project for now; a `projectId` can be added later (cheap in NoSQL).
