# GLC Learning Center Template

Premium, production-ready marketing + admin experience crafted with Next.js 14, Tailwind CSS, and shadcn/ui primitives. Designed to feel intentional, editorial, and deployable out-of-the-box for the Global Learning Consortium brand.

## Tech Stack

- Next.js 14 (App Router, TypeScript)
- Tailwind CSS + CSS variables powered design tokens
- shadcn/ui primitives refined to match the brand system
- Framer Motion for performant micro-interactions
- Phosphor Icons for consistent iconography
- Zustand for lightweight admin dashboard state
- next-seo for default SEO metadata

## Getting Started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` for the marketing site and `http://localhost:3000/admin` for the admin dashboard (login: `admin@example.com` / `changeme`).

### Useful Scripts

- `npm run dev` – start the local dev server
- `npm run build` – create a production build
- `npm run start` – run the production build locally
- `npm run lint` – lint all files with ESLint
- `npm run type-check` – verify TypeScript types
- `npm run format` / `npm run format:write` – check or write Prettier formatting

## Project Structure Highlights

- `app/(marketing)` – marketing experience with hero, stats, activities, resources, faculty, news, and events sections
- `app/admin` – gated dashboard with toolbar, post management, deleted queue, and modal editor
- `components/primitives` – brand-aligned wrappers for buttons, cards, dropdowns, modals, icons, etc.
- `components/ui` – shadcn-derived Radix bindings (button, card, dialog, dropdown)
- `content/*.json` – structured data powering each content block
- `styles/design-tokens.css` – source of truth for colors, typography, radii, shadows, motion
- `lib/store` – Zustand stores for auth and posts (with Supabase TODO markers)
- `public/placeholders` – branded imagery for hero, cards, avatars, and news items

## Design System

- Colors exposed via CSS variables (`--color-*`) and Tailwind theme extensions
- Typography: DM Sans with custom scale (Display 56–72, H1 44, H2 36, H3 28, etc.)
- Radii, shadows, and spacing mapped to Tailwind tokens
- Shared animations defined in `lib/animations.ts` and Tailwind keyframes

### Motion Guidelines

- Framer Motion powers fades, slide-ups, and hover micro-interactions
- All timing aligns to the defined durations (150–420ms) and easing curves

## Accessibility & SEO

- Semantic markup with accessible labels for icon-only buttons
- Focus states use Persian Green glow per brand spec
- `app/robots.ts` and `app/sitemap.ts` auto-generate crawl metadata
- next-seo default configuration from `app/seo.config.ts`

## Deployment

The project is optimized for Vercel:

1. `npm run build`
2. Deploy the `.next` output with Vercel or any Node-compatible platform

Environment variables are not required yet. Supabase integration points are marked with TODO comments.

<!-- Acceptance Checklist -->
- [x] Site matches brand palette, typography, and spacing tokens
- [x] Buttons, cards, and shadows remain consistent across pages
- [x] All required marketing sections render responsively (desktop, tablet, mobile)
- [x] Resource dropdown activates inline on the marketing page
- [x] News feed supports pinned posts sorted to the top
- [x] Admin modal login validates hard-coded credentials
- [x] Dashboard supports edit, publish, duplicate, pin, delete, reorder, restore flows
- [x] SEO defaults, robots.txt, and sitemap configured
- [x] Project boots locally and is deploy-ready for Vercel
