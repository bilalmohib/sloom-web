# Satori — Frontend

Clinical web application for Beyond Intelligence’s Satori product. This repository contains the **standalone front-end** for the clinician-facing experience: authentication, report generation, patient search, and report review.

**Production hosts (planned):**

| Environment | URL |
|-------------|-----|
| Marketing / entry | `satori.beyondintelligence.ai` |
| Application | `app.beyondintelligence.ai` |

---

## Overview

Satori helps pediatric clinics interpret environmental exposure data for patients. The UI is **static-first** (layout and content driven by API data; minimal client-side interactivity beyond forms, navigation, and session handling). Visual polish should match **best-in-class** performance and quality standards across the Beyond Intelligence platform.

### Core user flows

1. **Magic link authentication** — Passwordless sign-in; session remains active while the user is engaged; **inactivity timeout** requires re-authentication via a new magic link (similar to banking/AWS-style sessions).
2. **Landing page** — Entry point for signed-in clinicians.
3. **Generate report** — Workflow to create a new patient report.
4. **Patient search** — Find patients and open existing reports (**same browser tab**, not a new tab).
5. **Report view** — Primary insight, drivers, timing window, confidence scores, exposure visualization (24h / 72h / 7d), supporting evidence.
6. **Patient report history** — List and access prior reports for a patient.
7. **Sign out** — End session explicitly.
8. **Error states** — Consistent, accessible error UI for failed auth, API, and empty states.

### Intake / data conventions

- Parent intake should collect **date of birth**, not age (age is derived server-side or in the UI).
- Report timestamps display in the **clinic / pediatric clinic timezone**, not the child’s or individual doctor’s personal timezone.

### Preferences & magic-link onboarding (step 9)

After **Save preferences**, show a **flash message** (e.g. “Your preferences have been saved”) and **remain on the current page**. No redirect is required—users may save preferences on steps 3, 4, 8, 9, etc., and often close the tab to return to the app later.

### Dark mode

Dark mode is **not implemented yet**. Final graphics and Figma specs are expected from design (Eljon). Build foundational layout and components in light mode first; theme tokens should be structured so dark mode can be added without large refactors.

---

## Tech stack

| Layer | Choice |
|-------|--------|
| Framework | **React 19** (Rsbuild) |
| Language | **TypeScript 6.0** (strict, workspace SDK) |
| Routing | **React Router v7** (`createBrowserRouter`) |
| Styling | **Tailwind CSS v4** |
| Components | **[shadcn/ui](https://ui.shadcn.com/)** (Radix primitives + Tailwind) |
| Forms | **[React Hook Form](https://react-hook-form.com/)** |
| Validation | **[Zod](https://zod.dev/)** via `@hookform/resolvers` |
| Tooling | ESLint, Prettier, Rsbuild |

### Form validation pattern

Define schemas with Zod, infer TypeScript types where applicable, and wire forms through React Hook Form:

```tsx
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  dateOfBirth: z.string().date(), // example — align with API contract
});

type FormValues = z.infer<typeof schema>;

function ExampleForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { dateOfBirth: '' },
  });
  // ...
}
```

Colocate schemas with features (e.g. `src/features/intake/schema.ts`) and reuse the same Zod objects for client validation and API payload shaping where possible.

### shadcn/ui

Manual setup is complete per the [manual installation guide](https://ui.shadcn.com/docs/installation/manual):

- Global styles: `src/styles/globals.css`
- `cn()` helper: `src/lib/utils.ts`
- Path alias: `@/*` → `src/*` (`tsconfig.json` + `rsbuild.config.ts`)
- Config: `components.json` (`tsx: true`)

Add components with the CLI:

```bash
npx shadcn@latest add button
```

Prefer existing shadcn primitives (Button, Input, Form, Dialog, Sonner for flash messages, etc.) over one-off markup.

---

## Development approach

Beyond Intelligence is **AI-first**: use AI (e.g. Figma-to-code tools, Cursor, ChatGPT) for a strong **first draft** (~80% of UI), then **human review** for:

- Pixel fidelity vs design
- Accessibility (focus, labels, contrast)
- **Responsive layout** on real breakpoints (AI often assumes breakpoints; verify every target screen size manually)
- Integration with backend contracts and error handling

Technical lead (**Zaid**) owns stack decisions, milestones, documentation, and front-end quality review. Front-end implementation is owned by the assigned developer; code should be reviewable against the same bar as the back-end.

### Design source

- Prefer **Figma** (and Code Connect / MCP where available) as the source of truth when designs exist.
- Until brand fonts and final assets land, implement **semantic HTML structure and layout** first; swap typography and imagery when design delivers.

---

## Getting started

### Prerequisites

- Node.js 20+ (LTS recommended)
- npm 10+

### Install

```bash
npm install
```

Use the workspace TypeScript 6 SDK in your editor (`.vscode/settings.json` enables this). If the IDE still shows TS 5 errors, run **TypeScript: Select TypeScript Version** → **Use Workspace Version**.

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server ([http://localhost:3000](http://localhost:3000)) |
| `npm run build` | Production build |
| `npm run preview` | Serve production build locally |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript (`tsc --noEmit`) |
| `npm run format` | Prettier |

### Environment

Add environment-specific API base URLs and feature flags via `.env` files as the back-end contract is finalized (do not commit secrets). Example:

```bash
# .env.local (not committed)
VITE_API_BASE_URL=https://api.example.com
```

Use the `VITE_` prefix for variables exposed to the client through Rsbuild.

---

## Path aliases (`@/`)

All imports under `src/` should use the `@/` prefix (no relative `../` paths).

| Alias import | Resolves to |
|--------------|-------------|
| `@/App` | `src/App.jsx` |
| `@/routes` | `src/routes.jsx` |
| `@/styles/globals.css` | `src/styles/globals.css` |
| `@/components/ui/button` | `src/components/ui/button.tsx` |
| `@/layouts/RootLayout` | `src/layouts/RootLayout.tsx` |
| `@/lib/utils` | `src/lib/utils.js` |
| `@/pages/HomePage` | `src/pages/HomePage.jsx` |

Configured in `tsconfig.json` (editor + `tsc`) and `rsbuild.config.ts` (`resolve.alias`).

```jsx
import { router } from '@/routes';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';
```

---

## Project structure (recommended)

As the app grows, organize by feature rather than by file type only:

```
src/
  layouts/        # Route shells (RootLayout, etc.)
  components/     # Shared UI (shadcn in components/ui)
  features/       # auth, reports, patients, preferences, …
  hooks/
  lib/            # api client, utils, cn()
  routes/         # Route-level pages (when router is added)
  schemas/        # Shared Zod schemas (optional)
  App.jsx
  index.jsx
```

Keep API calls thin; handle loading and error states explicitly in route-level components.

---

## Quality checklist

Before marking a screen complete:

- [ ] Matches Figma / approved screenshots (desktop first, then agreed breakpoints)
- [ ] Responsive behavior verified on target devices (not assumed by AI)
- [ ] Forms use React Hook Form + Zod; accessible labels and error messages
- [ ] Clinic timezone used for report timestamps
- [ ] Reports open in the **same tab**
- [ ] Session: active use keeps user signed in; inactivity triggers re-auth via magic link
- [ ] Flash/toast feedback for preference saves without forced redirects
- [ ] ESLint clean; `npm run build` succeeds

---

## Repository context

This repo is **separate** from other Beyond Intelligence codebases and dedicated to the Satori front-end only. Back-end services and parent-facing intake may live elsewhere; coordinate API contracts and auth with the platform team.

---

## Resources

- [Rsbuild](https://rsbuild.rs)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [React Hook Form](https://react-hook-form.com)
- [Zod](https://zod.dev)

For agent-assisted development in this repo, see `AGENTS.md`.
