# Repository Guidelines

## Project Structure & Module Organization
- `index.html`: Entry page; sets global meta, header, and footer.
- `pages/`: Additional HTML pages (e.g., `pages/about.html`).
- `styles/`: Global CSS (`styles/main.css`) and components (`styles/components/*.css`).
- `scripts/`: Vanilla JS for behavior (`scripts/app.js`, `scripts/modules/*`).
- `assets/`: Images, icons, fonts, and media (`assets/img`, `assets/fonts`).
- Shared IDs/classes power navigation and JS; edit carefully to avoid breaking selectors.

## Development & Preview
- No build step. Open `index.html` directly or run a simple server to avoid CORS:
  - Windows: `py -m http.server 8000`
  - Cross‑platform: `python -m http.server 8000`
- Visit `http://localhost:8000`. Hard‑reload to bypass caching when testing assets.

## Coding Style & Naming Conventions
- **HTML**: Semantic tags (`header`, `main`, `nav`, `section`). Preserve landmark order and ARIA where present.
- **CSS**: 2‑space indent, BEM naming (`.card__title--large`), utility classes in `styles/utils.css`. Prefer component files in `styles/components/`.
- **JS**: Vanilla modules with `defer`. Names: camelCase for variables/functions, PascalCase for classes. Attach behavior via `data-*` hooks (e.g., `[data-nav-toggle]`) and use event delegation.
- **Files**: kebab-case filenames (`hero-banner.html`, `site-header.css`). Use relative paths from the page.

### Vertical video cards
- Use the `.card card--vertical-video` pattern for every vertical video embed.
- Nest the media inside `.vertical-video-card > .vertical-video-card__frame > .vertical-video-card__media-wrapper` and apply the `vertical-video-card__media` class to the `<video>` or `<iframe>` element so it inherits the 9:16 aspect ratio and max width (one third of the viewport on desktop, full width on narrow screens).
- Keep supporting copy inside `.vertical-video-card__caption`. If no caption is required, leave the element empty but keep the structure for consistent spacing.

## Testing Guidelines
- Validate HTML/CSS (W3C Validators). Check console for errors and 404s.
- Responsive checks at 320, 768, 1024, 1440 px. Test keyboard navigation and focus states.
- Run Lighthouse (Performance/Accessibility/SEO). Optimize images (WebP/AVIF) and add `loading="lazy"` where appropriate.
- Verify links, anchors, and IDs after structural edits; ensure JS selectors still match.

## Commit & Pull Request Guidelines
- Commits: imperative and scoped (e.g., `feat(hero): add autoplay controls`).
- Branches: `feature/section-name` or `fix/bug-summary`.
- PRs: describe DOM/CSS changes, affected selectors/IDs, and navigation impact. Include before/after screenshots for key breakpoints and steps to verify.

## Architecture Notes
- Global header/footer and navigation are shared across pages. Changes to layout, IDs, or class names can cascade; update CSS/JS selectors together. Keep `<head>` order: meta, styles, scripts with `defer`.
