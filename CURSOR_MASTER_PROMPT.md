# CURSOR_MASTER_PROMPT — ArchStack Software

You are building ArchStack Software as a premium bilingual (es/en) software agency platform with a public marketing site and an admin-only dashboard.

## Core stack

- Next.js App Router + TypeScript strict
- Tailwind CSS + shadcn/ui primitives
- Motion (public animations), GSAP (pinned sections only), Lenis (public, reduced-motion safe)
- Supabase (Auth, Postgres, Storage, RLS)
- Resend for transactional email
- Zod for validation

## Design direction

- Deep black base (`#050505`), accent `#8CF47B`
- Geist Sans + Geist Mono via `next/font`
- Must NOT look like a generic AI SaaS template
- Adapt patterns from 21st.dev and Aceternity — never copy templates unchanged

## Routes

Public: `/[locale]`, `/[locale]/services`, `/[locale]/projects`, `/[locale]/projects/[slug]`, `/[locale]/process`, `/[locale]/contact`, `/[locale]/blog`, `/[locale]/blog/[slug]`

Admin: `/login`, `/dashboard/*` (protected, admin role only)

## Content model

- Translation tables per locale (not duplicated pages)
- Blog: `content_json` + `content_html` (Tiptap editor in dashboard)
- Leads from contact form → `leads` table → dashboard

## Constraints

- Server Components by default
- Server Actions for dashboard mutations
- Route Handlers for external HTTP only
- Respect `prefers-reduced-motion`
- Mobile-first responsive design
- No public registration — admin role in `profiles.role`
