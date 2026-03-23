# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run lint     # Run ESLint (eslint v9, flat config)
```

There are no tests configured.

## Stack

- **Next.js 16.2.0** with React 19.2.4 — App Router (`app/` directory). This is a newer version than most training data; read `node_modules/next/dist/docs/` before writing Next.js-specific code.
- **Tailwind CSS v4** — configured via `@tailwindcss/postcss`. The v4 API differs from v3: no `tailwind.config.js`, theme tokens are defined in CSS via `@theme inline` in `app/globals.css`.
- **Three.js + React Three Fiber** (`@react-three/fiber`, `@react-three/drei`) — for 3D scenes.
- **Framer Motion** — for animations.
- **TypeScript** strict mode via `tsconfig.json`.

## Architecture

This is a personal portfolio frontend, early in development. The structure follows Next.js App Router conventions:

- `app/layout.tsx` — root layout with Geist font variables and global CSS applied to `<html>` and `<body>`
- `app/page.tsx` — home page (currently empty shell)
- `app/globals.css` — global styles; defines CSS custom properties for background/foreground and Tailwind v4 theme tokens via `@theme inline`
- `app/components/` — shared components (e.g., `header.tsx`)

CSS variables `--font-geist-sans` and `--font-geist-mono` are injected by `next/font/google` and mapped to Tailwind tokens `--font-sans` / `--font-mono` in `globals.css`.
