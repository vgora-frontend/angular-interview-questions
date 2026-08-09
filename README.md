# Angular Interview Questions

A small, open-source study app for Angular interview questions, built as a playground for current Angular 22 patterns (standalone components, signals) with bilingual content (EN / UA).

**Live:** https://vgora-frontend.github.io/angular-interview-questions/

> **Status: in active development.** The application shell is live and theme and language switching work end to end. The main content feature (question feed, timeline and quiz) is the next milestone.

## Highlights

- **Angular 22**, standalone components, zoneless-ready.
- **Signals-first state:** `ThemeService` and `LanguageService` are built on `signal` / `computed` / `effect`, SSR-safe via `isPlatformBrowser`.
- **Bilingual (EN / UA)** with [Transloco](https://jsverse.github.io/transloco/); the active language syncs to `<html lang>` and `localStorage`.
- **Light / dark theme** persisted across sessions, defaulting to the OS `prefers-color-scheme`.
- **CSS design-token system** with a pre-build validator (`scripts/check-css-tokens.mjs`) that fails the build on unknown custom-property references.
- **Typed by construction:** allowed languages and themes are derived from a single `as const` source with type guards, so values and types cannot drift.
- **CI/CD:** GitHub Actions builds and deploys to GitHub Pages on every push to `main`.

## Tech stack

Angular 22, TypeScript, RxJS, Transloco, Vitest, SCSS design tokens, GitHub Actions and GitHub Pages.

## Getting started

Requires **Node 22+** and npm.

```bash
npm ci          # install dependencies
npm start       # dev server at http://localhost:4200
npm run build   # production build to dist/
npm test        # unit tests (Vitest)
```

> `start` and `build` run `check:tokens` first (via the `prestart` / `prebuild` hooks), so an unknown CSS custom property fails fast.

## Project structure

```
src/app/
  core/                 # framework-agnostic services & models
    models/             # typed unions + guards (Lang, Theme)
    language.service.ts # active language (Transloco + <html lang> + storage)
    theme.service.ts    # light/dark theme (system default + storage)
  features/shared/
    header/             # site header: theme + language controls
public/
  favicon.ico           # kept at the root: it is fetched by path, not by <link>
  apple-touch-icon.png  # same - iOS and link scrapers guess this exact path
  site.webmanifest      # install metadata; its icon paths resolve relative to it
  i18n/                 # en.json, uk.json translation catalogues
  icons/                # favicon.svg and the icons the manifest points at
  images/               # author.jpg, og-card.png (the social preview)
scripts/                # check-css-tokens.mjs (pre-build guard)
```

Everything under `public/` is copied to the deploy root as-is, so a path there is
also a URL. The three files at the top level are the ones something fetches
without being told where to look; anything referenced explicitly is grouped.

## Deployment

Pushing to `main` triggers [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml): it builds with the Pages base-href, adds a SPA `404.html` fallback, and publishes to GitHub Pages.

## License

[MIT](LICENSE) (c) vgora-frontend
