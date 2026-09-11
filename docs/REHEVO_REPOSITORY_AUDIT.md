# REHEVO REPOSITORY AUDIT V0.1

## 1. Current Framework / Version

| Layer | Current Version | Notes |
|-------|----------------|-------|
| Next.js | 16.3.4 | App Router. Contains breaking changes per `AGENTS.md`. |
| React | 19.2.8 | Latest React 19. |
| TypeScript | 5.x | Strict mode enabled. Path alias `@/*` → `./src/*`. |
| Tailwind CSS | v4 | Using `@tailwindcss/postcss`. CSS-first theme via `@theme inline`. |
| Node.js target | ES2017 | `tsconfig.json` target. |

**Framework health**: The project uses the latest Next.js 16 / React 19 / Tailwind v4 stack. The `AGENTS.md` warns that Next.js 16 has breaking changes and the agent must read `node_modules/next/dist/docs/` before writing code. This is a critical constraint for Phase 01.

---

## 2. Current Route Structure

### Marketing routes (public)
```
/                              → Marketing landing page (fully built)
/how-it-works                  → How it works page (fully built)
/scenarios                     → Scenario library (fully built, but links to /rehearsal/{id})
/about                         → Stub ("Coming soon")
/contact                       → Stub
/help                          → Stub
/privacy                       → Stub
/terms                         → Stub
/cookie-settings               → Stub
/onboarding                    → Multi-screen onboarding (splash → signup → features → final → login)
/favicon.ico                   → Present
```

### App routes (protected, currently stubbed)
```
app/(app)/layout.tsx           → App shell layout (auth redirect TODO)
app/(app)/dashboard/page.tsx   → "Coming soon"
app/(app)/scenarios/[id]/page.tsx → "Coming soon"
app/(app)/rehearsal/[id]/page.tsx → Basic stub with End Rehearsal button
app/(app)/rehearsal/[id]/complete/page.tsx → "Coming soon"
app/(app)/reports/[id]/page.tsx → "Coming soon"
app/(app)/moments/[id]/page.tsx → "Coming soon"
app/(app)/settings/page.tsx    → "Coming soon"
```

### Route group structure (as specified in architecture)
```
app/(marketing)/               → ✓ Exists (page.tsx + how-it-works/)
app/(auth)/                    → ✗ Missing entirely
app/(app)/                     → ✓ Exists (layout + stubs)
app/api/                       → ✗ Missing entirely
```

**Observations**:
- No `(auth)` route group exists. Onboarding is at root `/onboarding` rather than `/auth/...`.
- No API routes exist.
- The marketing pages are well-developed; the app pages are placeholders.
- Navigation between app routes is inconsistent: `/scenarios` links to `/rehearsal/{id}` but the actual app route is `/app/rehearsal/{id}`.

---

## 3. Current Component Structure

### Marketing components (`src/components/marketing/`)
| Component | Status | Notes |
|-----------|--------|-------|
| `stage-cue.tsx` | Production-ready | Amber dot/line cue component |
| `nav-links.tsx` | Production-ready | Navigation links for marketing |
| `reassurance.tsx` | Production-ready | Privacy/pacing/no-audience badges |
| `moments-section.tsx` | Production-ready | Interactive challenge questions section |
| `enter-the-room-section.tsx` | Production-ready | Corner-pinned board overlay, scenario tabs |
| `the-reflection-section.tsx` | Production-ready | Mock performance review UI |
| `final-cta-section.tsx` | Production-ready | Final CTA with waveform signal |
| `footer.tsx` | Production-ready | Full footer with social links |

### Product components (`src/components/product/`)
- **Empty directory.** No product-specific components exist yet.

### Rehevo components (`src/components/rehevo/`)
- **Empty directory.** No Rehevo-specific design system components exist yet.

### UI primitives (`src/components/ui/`)
| Component | Status |
|-----------|--------|
| `accordion.tsx` | Installed |
| `button.tsx` | Installed (base-ui/button with CVA) |
| `command.tsx` | Installed |
| `dialog.tsx` | Installed (base-ui/dialog) |
| `dropdown-menu.tsx` | Installed |
| `input-group.tsx` | Installed |
| `input.tsx` | Installed (base-ui/input) |
| `popover.tsx` | Installed |
| `progress.tsx` | Installed |
| `select.tsx` | Installed |
| `separator.tsx` | Installed |
| `sheet.tsx` | Installed |
| `table.tsx` | Installed |
| `tabs.tsx` | Installed |
| `textarea.tsx` | Installed |
| `tooltip.tsx` | Installed |

**Key observation**: The UI layer uses `@base-ui/react` primitives (not shadcn's default Radix). The `components.json` says `"style": "base-nova"`. Button and Input are already customized. These are solid accessible primitives but will need heavy visual customization for the Rehevo design system.

### Hooks (`src/hooks/`)
- `useCornerPin.js` — Custom hook for CSS matrix3d corner-pinning of images. Used in the marketing enter-the-room section. **Keep for marketing; likely unnecessary for the product app.**

### Libraries (`src/lib/`)
- `utils.ts` — `cn()` utility (clsx + tailwind-merge). **Reusable.**
- `cornerPin.js` — Matrix math for corner-pin transform. **Reusable for marketing only.**
- `constants/` — Empty
- `validation/` — Empty

---

## 4. Current Styling System

### Tailwind CSS v4 with CSS-first theme
The project uses Tailwind v4's new `@theme inline` syntax:

```css
@theme inline {
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
  --font-serif: var(--font-instrument-serif), Georgia, serif;

  --color-background: var(--background);
  --color-foreground: var(--foreground);

  /* Rehevo ink scale */
  --color-ink-950: #0B0F14;
  --color-ink-900: #11161C;
  --color-ink-800: #1A1F26;
  --color-ink-700: #2A2F36;

  /* Rehevo brand */
  --color-rehevo-amber: #F59E3B;
  --color-surface-light: #EBE6E1;

  /* Semantic / secondary */
  --color-info-blue: #3882F6;
  --color-success: #10B981;
  --color-error: #EF4444;
}
```

### Color usage
- Dark mode is the **default** (`--background: #0B0F14`, `--foreground: #EBE6E1`).
- Light mode via `prefers-color-scheme: light` inverts background/foreground.
- The Rehevo color tokens (`ink-*`, `rehevo-amber`, `surface-light`, `info-blue`) are already defined and match the design system spec exactly.

### Typography
- **Display**: `Instrument_Serif` (Google Fonts, weight 400, normal + italic)
- **UI/Body**: `Geist` (sans) + `Geist_Mono` (mono)
- The design system spec calls for Inter/Geist/Satoshi — Geist is already loaded and fits perfectly.

### Spacing/Rounding
- No centralized spacing or radius tokens exist yet.
- Marketing components use inline `style={{ borderRadius: "2px" }}` or `"4px"` or `"6px"` throughout.
- The design system spec calls for base unit `4px` with preferred rhythm and radius tokens — **not yet centralized**.

### What's missing from the styling system
- No `tokens/` directory for centralized design tokens.
- No dark/light mode toggle (only `prefers-color-scheme` media query).
- No Rehevo-specific component variants — UI primitives are default base-nova style.
- Radius values are scattered as inline styles.
- No motion timing tokens centralized.

---

## 5. Existing Assets

### Public images (`public/images/`)
| Path | Usage |
|------|-------|
| `hero/hero-desktop.png` | Marketing hero background |
| `hero/hero-mobile.png` | Marketing hero mobile background |
| `hero/enter-the-room.png` | Enter-the-room desktop background |
| `hero/enter-the-room-mobile.png` | Enter-the-room mobile background |
| `hero/enter-the-roomold.png` | Unused/legacy |
| `hero/final-cta.png` | Final CTA background |
| `hero/moment.png` | Moments section background |
| `hero/the-reflection-bg.png` | Reflection section / scenarios page background |
| `onboarding/onboarding-desktop.png` | Onboarding signup/login background |
| `onboarding/onboarding-mobile.png` | Onboarding mobile background |
| `editorial/` | Empty |
| `scenarios/` | Empty |

### Public icons/logos
| Path | Usage |
|------|-------|
| `rehevo-logo.png` | Marketing logo |
| `rehevo-logo1.png` | Alternate logo |
| `icons/monogram.png` | Monogram icon |
| `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg` | Default Next.js assets |

### Observations
- Photography assets are production-ready and match the design direction.
- No scenario-specific photography exists yet.
- No waveform/signal SVG assets exist in `public/signals/` (directory is empty).
- No audio assets exist.

---

## 6. Existing Authentication

### Current state
- **No authentication system exists.**
- The `(app)/layout.tsx` has a TODO comment: `// TODO: Add auth check. If not authenticated, redirect to /onboarding.`
- The onboarding page (`/onboarding`) has signup/login screens but they are **purely visual** — no form submission, no API calls, no state persistence.
- The "Get started" flow on the final splash screen does `window.location.href = "/app/dashboard"` — a hard redirect with no auth check.
- No Supabase Auth integration exists.
- No session management exists.
- No protected route middleware exists.

### What exists (visual only)
- Sign up form (name, email, password) with Motion transitions
- Login form (email, password)
- Google social auth button (visual only, no OAuth implementation)
- Password show/hide toggle
- Feature slides with dot progress
- Multi-screen navigation with AnimatePresence

---

## 7. Existing Database / Backend

### Current state
- **No database exists.**
- **No backend service exists.**
- **No Supabase integration exists.**
- **No API routes exist** (`app/api/` directory is missing).
- **No server-side AI integration exists.**

### What exists
- `@tanstack/react-query` is installed but not configured or used.
- `zustand` is installed but no stores exist (`src/stores/` is empty).
- `zod` is installed but no schemas exist (`src/lib/validation/` is empty).
- `sonner` is installed but not used.
- `recharts` is installed but not used.
- `react-hook-form` is installed but not used.

### Infrastructure gap
- No `.env` file or environment variable management.
- No Supabase client configuration.
- No database migration system.
- No server actions.
- No route handlers.

---

## 8. Existing Dependencies

### Production dependencies
| Package | Version | Used? | Purpose |
|---------|---------|-------|---------|
| `next` | 16.3.4 | Yes | Framework |
| `react` / `react-dom` | 19.2.8 | Yes | UI library |
| `@base-ui/react` | ^1.8.0 | Yes | Accessible UI primitives (Button, Input, Dialog, etc.) |
| `motion` | ^13.2.0 | Yes | Animation (Framer Motion successor) |
| `lucide-react` | ^1.41.0 | Yes | Icons |
| `class-variance-authority` | ^0.7.1 | Yes | Component variants |
| `clsx` | ^2.1.1 | Yes | Class merging |
| `tailwind-merge` | ^3.6.0 | Yes | Tailwind class merging |
| `cn` | ^0.2.5 | Yes | cn() utility |
| `react-hook-form` | ^7.87.0 | No | Form management |
| `@hookform/resolvers` | ^5.9.1 | No | Form validation |
| `zod` | ^4.5.4 | No | Schema validation |
| `zustand` | ^5.0.15 | No | State management |
| `@tanstack/react-query` | ^5.102.8 | No | Data fetching/caching |
| `recharts` | ^3.10.1 | No | Charting |
| `sonner` | ^2.0.8 | No | Toast notifications |
| `cmdk` | ^1.1.1 | No | Command palette |

### Dev dependencies
| Package | Version | Used? |
|---------|---------|-------|
| `typescript` | ^5 | Yes |
| `tailwindcss` | ^4 | Yes |
| `@tailwindcss/postcss` | ^4 | Yes |
| `eslint` | ^9 | Yes |
| `@types/node` | ^20 | Yes |
| `@types/react` | ^19 | Yes |
| `@types/react-dom` | ^19 | Yes |

### Dependency assessment
- **Core stack is solid and current**: Next.js 16, React 19, Tailwind v4.
- **Over-installed for current state**: React Query, Zustand, React Hook Form, Zod, Recharts, Sonner, cmdk are all installed but unused. This is acceptable for Phase 01 foundation work but should be verified as actually needed.
- **UI primitive choice**: `@base-ui/react` + `base-nova` style is a good choice — accessible, modern, customizable. But the visual layer needs complete Rehevo customization.
- **No Supabase packages installed yet** — need to add `@supabase/ssr`, `@supabase/auth-helpers-nextjs`, or use the new Supabase SSR patterns.

---

## 9. What Can Be Reused

### High-value reuse
1. **Color tokens** — The `globals.css` already has all Rehevo brand colors defined (`ink-*`, `rehevo-amber`, `surface-light`, `info-blue`, semantic colors). These match the design system spec exactly. **Do not change these.**
2. **Typography setup** — `Instrument_Serif`, `Geist`, `Geist_Mono` are loaded in `layout.tsx` with CSS variables. Matches the design spec.
3. **Font variables** — `--font-geist-sans`, `--font-geist-mono`, `--font-instrument-serif` are already exposed. Matches spec.
4. **`cn()` utility** — `src/lib/utils.ts` is clean and reusable.
5. **Marketing components** — All 8 marketing components are production-ready and match the design direction. They demonstrate the Rehevo visual language (amber stage cues, editorial serif, restrained UI, cinematic backgrounds).
6. **`StageCue` component** — A reusable amber signal component already built. Should be extracted to the shared component layer.
7. **Corner-pin infrastructure** — `useCornerPin.js` + `cornerPin.js` work correctly for marketing. Can remain in marketing scope.
8. **Route structure** — Route groups `(marketing)` and `(app)` are correctly set up per the architecture spec.
9. **Tailwind v4 theme system** — `@theme inline` is the right approach for a design token system.
10. **`components.json`** — shadcn/ui configuration is correctly set up with proper aliases.

### Medium-value reuse
11. **UI primitives** — The 16 installed shadcn/base-ui components are functional. They need Rehevo visual customization but the underlying accessible behavior is correct.
12. **`motion` (Motion library)** — Already used extensively in marketing. Can be used for product animations too.
13. **`lucide-react`** — Icons are already the spec choice.

### Low-value reuse
14. **`rehevo-logo.png` / `rehevo-logo1.png`** — Marketing logos. Fine for marketing but the product app may need a different treatment.
15. **Background photography** — Good for marketing; product app will use different visual modes (dark ink for rehearsal, warm light for reflection).

---

## 10. What Should Be Refactored

### Immediate refactoring needs
1. **Route URL inconsistency**: `/scenarios` (public) links to `/rehearsal/{id}` but the actual app route is `/app/rehearsal/{id}`. The marketing page needs to link to the auth entry point, not directly to app routes.
2. **Onboarding at root level**: `/onboarding` should be moved to `(auth)/` route group per the architecture spec (`app/(auth)/`). Currently it sits at the root level.
3. **Auth redirect stub**: `(app)/layout.tsx` has a TODO for auth checking. Needs implementation before any app route is accessible.
4. **Scattered inline styles**: Marketing components use inline `style={{ borderRadius: "2px" }}` and hardcoded colors like `#F7F4F1`. These should be extracted to CSS variables or Tailwind classes.
5. **No centralized design tokens**: Colors exist in `globals.css` but spacing, radius, shadows, and motion timing are not centralized. The `@theme inline` block should be expanded.
6. **`globals.css` is minimal**: Only defines colors and fonts. Missing: radius tokens, shadow tokens, motion tokens, and the full Rehevo design token vocabulary.
7. **Empty `src/styles/` directory**: Should either be populated or removed to avoid confusion.
8. **Empty `src/types/` directory**: Should be populated with domain types in Phase 01.
9. **Empty `src/lib/constants/` and `src/lib/validation/`**: Should be populated as needed.
10. **`components.json` style is `base-nova`**: This is a shadcn style choice. While functional, the base-nova visual layer will need to be completely overridden for Rehevo. Consider whether to keep base-nova as a starting point or start from scratch visually.

### Component architecture refactoring
11. **No Rehevo component layer**: All UI is either raw base-nova primitives or custom marketing components. The `RehevoButton`, `RehevoInput`, `RehevoScenarioCard`, etc. from the design system spec do not exist yet.
12. **`useCornerPin.js` is a `.js` file**: Should be converted to `.ts` with proper TypeScript types.
13. **Marketing components are self-contained**: They import directly from `lucide-react` and `motion`. For the product app, these should use the shared Rehevo component layer.

---

## 11. What Should Be Replaced

1. **Onboarding flow**: The current onboarding is a marketing-oriented splash/feature-carousel. Per the spec, onboarding should ask: "What are you preparing for?" and "What type of communication do you practice most?" — not showcase features. The current onboarding copy ("AI-powered rehearsal feedback for creators, performers and professionals") uses generic AI SaaS language that violates the product direction.
2. **Feature slide copy**: The feature slides use generic language: "AI-powered feedback", "Track your growth", "Build your rehearsal space". These should be replaced with rehearsal-specific language.
3. **Hardcoded scenario data**: Scenarios are hardcoded in marketing components and the scenarios page. In Phase 05+, these should come from the database.
4. **Marketing navigation links**: `/scenarios` links to a marketing page, but the spec says the app should have its own scenario library under `/app/scenarios`. The marketing page may need to link to `/onboarding` → app entry instead.
5. **`window.location.href` in onboarding**: The final splash screen uses `window.location.href = "/app/dashboard"`. This should become a proper Next.js `Link` or router push after auth is implemented.
6. **Default base-nova button styling**: The `Button` component uses base-nova defaults with `rounded-lg`, `border-transparent`, etc. Rehevo needs `rounded-full` for primary actions, amber colors, and a different visual weight.

---

## 12. What Is Missing

### Critical missing pieces
1. **Authentication system** — No Supabase Auth, no session management, no protected routes, no auth middleware.
2. **Database** — No Supabase PostgreSQL, no migrations, no schema, no RLS policies.
3. **API routes** — No `app/api/` directory, no server actions, no route handlers.
4. **Environment configuration** — No `.env` file, no environment validation, no Supabase credentials.
5. **Auth route group** — `(auth)` route group missing.
6. **Design token system** — Missing centralized tokens for spacing, radius, shadows, motion.
7. **Rehevo component layer** — No `RehevoButton`, `RehevoInput`, `RehevoScenarioCard`, `RehevoMetric`, `RehevoTimeline`, `RehevoTranscript`, `RehevoObservation`, `RehevoWaveform`, `RehevoSessionHeader`, `RehevoStateIndicator`, `RehevoDrillCard`.
8. **Domain types** — No TypeScript types for User, Profile, Scenario, RehearsalSession, RehearsalTurn, PerformanceReport, etc.
9. **State management** — Zustand is installed but no stores exist for rehearsal state, auth state, or UI state.
10. **Form validation** — Zod is installed but no schemas exist.
11. **Server-side AI integration** — No AI provider integration, no server actions, no API routes for AI calls.
12. **Audio pipeline** — No microphone permission handling, no audio capture, no transcription integration.
13. **Scenario engine** — No AI scenario orchestration, no conversation state machine.
14. **Progress tracking** — No progress calculations, no session history queries.

### Design system gaps
15. **Motion tokens** — No centralized timing/transition tokens.
16. **Shadow system** — No shadow tokens defined.
17. **Waveform component** — Marketing has waveform animations, but no reusable `RehevoWaveform` component for the product.
18. **Stage cue variants** — Only 2 types exist (dot and line). The spec mentions more forms.
19. **Metric component** — No `RehevoMetric` for displaying performance dimensions.
20. **Timeline component** — No `RehevoTimeline` for the review page.
21. **Transcript component** — No `RehevoTranscript` for displaying conversation history.
22. **Observation component** — No `RehevoObservation` for AI-generated insights.
23. **Drill card** — No `RehevoDrillCard` for the drill flow.
24. **Session header** — No `RehevoSessionHeader` for the rehearsal room.
25. **State indicator** — No `RehevoStateIndicator` for rehearsal states (READY, LISTENING, SPEAKING, etc.).

### Content gaps
26. **Scenario photography** — `public/images/scenarios/` is empty.
27. **Waveform/signal assets** — `public/signals/` is empty.
28. **Editorial photography** — `public/images/editorial/` is empty.
29. **Real scenario content** — Only 5 hardcoded scenarios exist. More are needed.
30. **Onboarding content** — Needs to be rewritten for rehearsal-specific questions.

---

## 13. Technical Risks

### High risk
1. **Next.js 16 breaking changes**: `AGENTS.md` explicitly warns that Next.js 16 has breaking changes. The agent must read `node_modules/next/dist/docs/` before writing code. Any Phase 01 work that touches routing, layouts, or server components must verify Next.js 16 APIs. This is the single highest technical risk.
2. **No auth foundation**: The entire app shell depends on authentication. Without Supabase Auth + middleware, no protected routes can be built. This blocks Phases 03+.
3. **No database foundation**: Session persistence, scenario data, performance reports, and progress tracking all depend on the database. Phase 05 is a hard dependency for Phases 06+.

### Medium risk
4. **`@base-ui/react` version 1.8.0**: This is relatively new. While it works for primitives, some shadcn-style customization patterns may differ from Radix-based shadcn. Customizing the visual layer deeply may require learning base-ui's API.
5. **Tailwind v4 CSS-first theme**: The `@theme inline` approach is new. Centralizing all design tokens in CSS requires careful planning. Mixing CSS variables with Tailwind utility classes needs a clear convention.
6. **`motion` v13**: This is the latest Motion for React (Framer Motion successor). API may differ from Framer Motion v10+ that training data covers. The marketing code uses `motion/react` imports which is correct for v13.
7. **Zustand v5**: Very new. API may differ from v4 patterns in training data.
8. **React 19**: New React version. Some patterns (refs, forms, Server Components) may differ from React 18 patterns.

### Low risk
9. **Marketing/app route inconsistency**: Easy to fix but creates broken links in the current marketing pages.
10. **Empty directories**: `src/styles/`, `src/types/`, `src/stores/`, `src/lib/constants/`, `src/lib/validation/` are empty. Not harmful but confusing.
11. **Hardcoded image dimensions**: Some images use `style` attributes for positioning. Fine for marketing but needs cleanup for product.
12. **No error boundaries**: Next.js 16 may have different error boundary patterns. Need to verify.

---

## Summary

### What I found
The REHEVO repository is a **Next.js 16 + React 19 + Tailwind v4** project with a **well-developed marketing site** and **stubbed app shell**. The marketing pages demonstrate strong visual direction that matches the REHEVO design system: deep ink backgrounds, amber stage cues, Instrument Serif typography, restrained UI, cinematic photography, and Motion animations. The color tokens, fonts, and basic project structure are correctly established.

However, **no product functionality exists yet**. There is no authentication, no database, no API layer, no AI integration, no audio pipeline, and no domain logic. The app routes are placeholders. The onboarding flow uses generic AI SaaS language that contradicts the product direction. The design token system is incomplete (only colors and fonts are centralized).

### What I recommend
1. **Keep the existing repository as the foundation.** The project structure, stack choices, marketing pages, color tokens, and typography setup are all correct and aligned with the architecture spec.
2. **Do not redesign REHEVO.** The visual direction is already established in the marketing pages. The product app should extend this language into the three product states (Preparation, Rehearsal, Reflection).
3. **Phase 01 should focus on the technical shell**, not visual polish:
   - Verify Next.js 16 API compatibility
   - Set up environment configuration
   - Create centralized design tokens (spacing, radius, shadows, motion)
   - Build the Rehevo component layer (RehevoButton, StageCue, etc.)
   - Implement auth route group and Supabase Auth
   - Establish the `(app)` layout with auth protection
   - Create the API route foundation
   - Set up the `types/` directory with domain types
4. **Rewrite onboarding** in Phase 01 to match the rehearsal-specific flow from the user flows spec.
5. **Fix the marketing → app link inconsistency** before any app routes are built.

### Whether the existing repository should remain the foundation
**Yes.** The repository has the correct stack, correct route group structure, correct design tokens, and excellent marketing pages. The work needed is extension, not replacement. The main risks are Next.js 16 breaking changes and the missing auth/database foundation — both are addressed by following the phased build plan.

### What I propose for Phase 01
Phase 01 should establish the **stable technical shell** without building product features:

1. **Next.js 16 compatibility audit** — Read Next.js 16 docs, verify current patterns, fix any breaking issues.
2. **Design token expansion** — Add spacing, radius, shadow, and motion tokens to `globals.css` via `@theme inline`.
3. **Rehevo component layer** — Create `src/components/rehevo/` with `RehevoButton`, `StageCue`, `Surface`, `SectionLabel`, `EditorialHeading` as the first primitives.
4. **Auth route group** — Create `app/(auth)/` with proper onboarding flow (rehearsal-specific questions, not feature carousel).
5. **Environment config** — Add `src/env.js` with Zod validation for Supabase and AI provider env vars.
6. **Supabase setup** — Install Supabase packages, create client utilities, set up SSR integration.
7. **Database schema foundation** — Create initial migrations for `profiles` table.
8. **App shell auth protection** — Implement middleware or layout-level auth check for `(app)` routes.
9. **Domain types** — Create `src/types/` with core domain types (User, Profile, Scenario, RehearsalSession, etc.).
10. **Fix route inconsistencies** — Update marketing navigation and links to point to auth entry points.

Phase 01 acceptance criteria:
- Application boots locally with no errors.
- Production build succeeds.
- TypeScript passes strict mode.
- Design tokens are centralized and documented.
- Auth route group exists with functional (if mocked) onboarding.
- App routes are protected (redirect unauthenticated users).
- No console errors on initial route.
- Existing marketing pages remain functional.
