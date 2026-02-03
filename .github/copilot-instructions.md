# Copilot Instructions for blog-back-end ✅

## Quick summary
- **Stack:** Node.js + TypeScript (CommonJS), Express, Prisma (Postgres), Stripe, Passport, Zod. 
- **Run (dev):** `npm run dev` — uses `ts-node-dev` and starts `src/server.ts`.
- **Prisma:** schema is at `prisma/schema.prisma`, generated client at `generated/prisma`. Use `DATABASE_URL` env var for migrations and runtime DB connection.

---

## Architecture & file structure 🔧
- Feature-based modules under `src/modules/<feature>`: each feature typically has `*.routes.ts`, `*.controller.ts`, `*.services.ts`, and `*.zod.validation.ts` (when validation is needed).
  - Example: `src/modules/post` and `src/modules/payment`.
- App bootstrap: `src/app.ts` (Express app + middleware) and `src/server.ts` (starts server, calls `connectDB()` and `seedAdmin()`).
- Shared utilities: `src/utils/*` (e.g., `send.response.ts`, `create.asyncFn.ts`, `create.user.token.ts`).
- Config: `src/config/*` (Prisma client at `src/config/prisma.ts`, Stripe at `src/config/stripe.ts`, env vars at `src/config/env.ts`).
- Middleware: `src/middleware/*` (Zod validation, `checkAuth`, global error handler, not found handler).
- Prisma generator and adapters: `prisma.config.ts` uses `DATABASE_URL`. `src/config/prisma.ts` uses `@prisma/adapter-neon` and reads `process.env.DATABASE_URL`.

---

## Key patterns & conventions 📐
- Controllers are wrapped with `createAsyncFn(fn)` which handles errors and forwards them to the global error middleware. Example: `post.controller.ts`.
- Responses should use `sendResponse(res, { statusCode, success, message, data, metaData? })` to keep API response shape consistent.
- Validation: use Zod schemas and pass them to `validateRequest(schema)` (it replaces `req.body` with the parsed value). Look at `post.zod.validation.ts` and `payment.zod.validation.ts` for examples.
- Auth:
  - JWT token creation: `createUserToken(user)` (returns `{ accessToken }`).
  - `checkAuth(...roles)` middleware expects role strings like `"ADMIN"`/`"USER"` and will reject if role not included. It reads JWT from `Authorization` header or `cookies.token` and looks up the user via Prisma to assert existence and role.
  - Passport local strategy is configured in `src/config/passport.ts` for session-based auth.
- Errors: throw `AppError(message, statusCode)` for controlled errors. The global error handler maps Prisma and Zod errors to clean responses.

---

## Environment & secrets 🔑
- Important env vars (required at runtime & for dev):
  - `DATABASE_URL` (used by Prisma runtime & migrations)
  - `JWT_SECRET`, `JWT_EXPIRES_IN`
  - `EXPRESS_SESSION_SECRET`
  - `ADMIN_EMAIL`, `ADMIN_PASS` (seed admin user at startup)
  - `STRIPE_SECRET_KEY` (Stripe integration)
- Note: `src/config/env.ts` exposes `DB_URL` but the Prisma configuration and `src/config/prisma.ts` expect `DATABASE_URL`. Use `DATABASE_URL` to avoid confusion.

---

## Common developer workflows 🛠️
- Start dev server: `npm run dev` (ts-node-dev). It will call `connectDB()` and `seedAdmin()` on startup.
- Prisma:
  - Generate: `npx prisma generate` (ensures `generated/prisma` client is up-to-date).
  - Migrate locally: `npx prisma migrate dev --name <name>` (requires `DATABASE_URL` set).
  - Inspect schema: `prisma/schema.prisma` and migrations in `prisma/migrations/`.
- Tests: there are no test scripts or test framework in `package.json`. Add tests if needed and add scripts accordingly.

---

## Integration points & third-party services 🔗
- Database: Postgres via Prisma client. `generated/prisma` contains generated types and enums (e.g., `Role`).
- Stripe: `src/config/stripe.ts` exports an initialized `stripe` client. Payment services use `stripe.paymentIntents` and `stripe.checkout.sessions`.
- Authentication:
  - Session-based: Passport local + express-session.
  - Token-based: JWTs created by `createUserToken`.

---

## Useful references & examples in repo 🔍
- `src/routes/routes.ts` — how feature routes are mounted.
- `src/utils/send.response.ts` — canonical response shape.
- `src/middleware/global.error.ts` — error normalization (Prisma and Zod special handling).
- `src/modules/payment/payment.services.ts` — Stripe usage example (payment intents and sessions).
- `prisma/schema.prisma` & `generated/prisma` — DB model shape and enums.

---

## Guidance for code-writing agents (concise rules) 🤖
- Follow the feature module shape: add `routes`, `controller`, `services`, and `zod.validation` for new features.
- Use `createAsyncFn` for async controllers and `sendResponse` for output.
- Validate input with Zod and wire `validateRequest(schema)` in the route before controller.
- Throw `AppError` for expected failures with appropriate HTTP status.
- Use Prisma client from `src/config/prisma.ts` and prefer generated types/enums from `generated/prisma` when possible.
- Respect existing response shapes and error conventions; match statuses used in similar endpoints.

---

If anything in this file is unclear or you want more examples (routing, validation, prisma migration steps), tell me which section to expand and I’ll iterate. 🔁
