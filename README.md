# TEDxITB 9.0 — Happiness Through Colors

Official web application for **TEDxITB 9.0**, an independently organized TEDx event at Institut Teknologi Bandung. Themed _"Happiness Through Colors"_, the app handles ticket sales, merchandise, event content, attendance tracking, and admin order management.

## Tech Stack

| Layer           | Technology                                                                                                                |
| --------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Framework       | [Next.js 15](https://nextjs.org) (App Router, React 19)                                                                   |
| Language        | [TypeScript](https://typescriptlang.org) (strict mode)                                                                    |
| API             | [tRPC v11](https://trpc.io) + [TanStack React Query](https://tanstack.com/query)                                          |
| Auth            | [Better Auth](https://www.better-auth.com) (GitHub & Google OAuth)                                                        |
| Database        | [PostgreSQL](https://www.postgresql.org) ([Neon Serverless](https://neon.tech)) + [Drizzle ORM](https://orm.drizzle.team) |
| CMS             | [Contentful](https://www.contentful.com) (merchandise, magazines, sponsors)                                               |
| Email           | [Resend](https://resend.com) + [React Email](https://react.email)                                                         |
| Styling         | [Tailwind CSS v4](https://tailwindcss.com)                                                                                |
| Animation       | [Motion](https://motion.dev)                                                                                              |
| State           | [Zustand](https://zustand-demo.pmnd.rs) (persisted cart store)                                                            |
| Forms           | [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev)                                                   |
| Images          | [Cloudinary](https://cloudinary.com) (via next-cloudinary)                                                                |
| Package Manager | [pnpm](https://pnpm.io)                                                                                                   |
| Deployment      | [Vercel](https://vercel.com)                                                                                              |

## Features

### Public Pages

- **Landing** — Animated hero with event branding, explore and exclusive sections
- **About** — Event and committee information
- **Pre-Event** — Pre-event details and ticket purchase (early bird / regular tiers)
- **Main Event** — Speakers, activities, venue info, countdown timer, and ticket purchase (single or 2-person bundle)
- **Magazine** — Digital flipbook magazines with page-turn effect
- **Merchandise** — Product catalog with add-to-cart, quantity management, and delivery options (pickup or shipping)
- **Sponsorship** — Sponsor and partner showcase

### Auth & Dashboard

- Sign in via GitHub or Google (Better Auth)
- **User Dashboard** — View all orders, ticket QR codes, and order statuses
- Role-based access (user / admin)

### Ticket System

- Tiered pricing: Early Bird (Rp 69.000) → Regular (Rp 109.000)
- 2-person bundle for main event (Rp 99.000/person)
- Capacity management: 30 early bird + 159 regular = 189 total slots
- Bank transfer payment with proof upload
- Automatic QR code generation per order for attendance

### Admin Panel

- View all orders with user details
- Update order status (pending → paid → confirmed → attended / cancelled)
- QR code scanner for on-site check-in
- Bulk email blast scripts (pre-event reminders, main-event reminders, refund requests)

### Merchandise Store

- Cart with persisted state (Zustand + localStorage)
- Delivery options: ITB Jatinangor pickup, ITB Ganesa pickup, main-event pickup, or shipping
- Order flow with payment proof

### Email

- Confirmation emails via Resend + React Email templates
- Blast scripts for event reminders and refund requests

## Getting Started

### Prerequisites

- Node.js ≥ 18
- pnpm ≥ 10
- PostgreSQL (local or Neon)

### Install

```bash
pnpm install
```

### Environment

Copy `.env.example` to `.env` and populate all variables:

```bash
cp .env.example .env
```

Key variables:

- `DATABASE_URL` — PostgreSQL connection string
- `BETTER_AUTH_SECRET` — Session signing secret
- `BETTER_AUTH_GITHUB_CLIENT_ID` / `BETTER_AUTH_GITHUB_CLIENT_SECRET` — GitHub OAuth
- `BETTER_AUTH_GOOGLE_CLIENT_ID` / `BETTER_AUTH_GOOGLE_CLIENT_SECRET` — Google OAuth
- `CONTENTFUL_SPACE_ID` / `CONTENTFUL_ACCESS_TOKEN` — Contentful CMS
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` / `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` — Image uploads
- `RESEND_API_KEY` / `EMAIL_FROM` — Transactional email

### Database

Start a local PostgreSQL container (requires Docker or Podman):

```bash
./start-database.sh
```

Generate and apply migrations:

```bash
pnpm db:generate
pnpm db:migrate
```

Or push schema directly (dev):

```bash
pnpm db:push
```

### Development

```bash
pnpm dev
```

App runs at `http://localhost:3000`.

### Build & Preview

```bash
pnpm build
pnpm preview
```

## Scripts

| Command                        | Description                  |
| ------------------------------ | ---------------------------- |
| `pnpm dev`                     | Start dev server (Turbopack) |
| `pnpm build`                   | Production build             |
| `pnpm start`                   | Start production server      |
| `pnpm preview`                 | Build + start                |
| `pnpm check`                   | Lint + typecheck             |
| `pnpm lint`                    | ESLint                       |
| `pnpm lint:fix`                | ESLint with auto-fix         |
| `pnpm typecheck`               | TypeScript type checking     |
| `pnpm format:check`            | Prettier check               |
| `pnpm format:write`            | Prettier write               |
| `pnpm db:generate`             | Generate Drizzle migrations  |
| `pnpm db:migrate`              | Apply Drizzle migrations     |
| `pnpm db:push`                 | Push schema to database      |
| `pnpm db:studio`               | Open Drizzle Studio          |
| `pnpm script:blast-main-event` | Send main-event email blast  |

## Project Structure

```
src/
├── _components/          # Shared UI (Navbar, Footer, CartDrawer, etc.)
├── app/                 # Next.js App Router pages & layouts
│   ├── about/
│   ├── admin/           # Admin: order table, QR scanner
│   ├── checkout/
│   ├── dashboard/       # User dashboard with orders
│   ├── magazine/        # Flipbook magazine viewer
│   ├── main-event/      # Main event info + buy tickets + guide
│   ├── merchandise/     # Merch store
│   ├── pre-event/       # Pre-event info + buy tickets
│   ├── signin/
│   └── sponsorship/
├── lib/                 # Business logic (pricing, capacity, QR, MBTI, etc.)
├── server/
│   ├── api/routers/     # tRPC routers (order, magazine, merchandise, etc.)
│   ├── better-auth/     # Auth configuration
│   ├── contentful/     # Contentful CMS client & fetchers
│   ├── db/             # Drizzle schema & DB client
│   └── email/          # Email templates & send utility
├── stores/              # Zustand stores (auth, cart)
├── styles/              # Global styles
├── trpc/                # tRPC client setup
└── types/               # Shared TypeScript types
```

## Deployment

The app is configured for Vercel (see `vercel.json`). Push to your Vercel-connected branch and it will build with `pnpm build`. Ensure all environment variables are set in the Vercel project dashboard.
