# Merak Protocol Design System
  
  Pastel lavender-gray dark UI with stroke-less surface tiers, soft ambient elevation, and Alice Blue as a trust/selection signal for traceability, permission gates, AI agent workflows, and archive interfaces.
  
**Status containers stay neutral.** Large panels (alert, toast, decision banner, confidence meter, empty state, gate card) use inset/elevated surfaces; semantic color lives on icons, rails, bars, and compact badges—not full-bleed weak washes.

## Demo

[Live Demo](https://css.saturday.ne.kr)

## Install

```bash
npm install merak-protocol-design-system
```

## CSS

```js
import "merak-protocol-design-system/style.css"
```

Use `merak-protocol-design-system/showcase.css` only for the bundled component gallery. Reusable layout patterns use `mp-*` classes such as `mp-eyebrow`, `mp-section-heading`, `mp-grid`, `mp-grid--wide`, `mp-grid--start`, `mp-button-row`, and `mp-badge-row`.

The package includes CSS variables, base styles, motion utilities, and component styles under `src/styles`.

Optional browser-native behavior components are documented in [docs/custom-elements.md](docs/custom-elements.md).

Use `renderMerakMarkdown()` from `merak-protocol-design-system/markdown` to convert Markdown into HTML built from existing Merak components. See [docs/markdown.md](docs/markdown.md).

## Component inventory

Public surface is CSS-first (`mp-*`). Showcase helpers under `src/*.js` are demo wiring, not package exports (unless listed in `package.json` exports).

| Area | Classes / files |
| --- | --- |
| Foundation | tokens, base, patterns, motion |
| Actions | `mp-button`, badges |
| Surfaces | `mp-card`, link list, list, divider |
| Forms | `mp-field`, `mp-input`, `mp-select`, `mp-checkbox`, `mp-radio`, `mp-switch` |
| Feedback | `mp-alert`, `mp-toast`, `mp-toast-region`, `mp-progress`, `mp-skeleton`, `mp-empty-state`, `mp-spinner` |
| Data | table, graph, timeline, inspector |
| Shell | sidebar, tabs, command input |
| Domain | gate card, agent panel |
| Identity | confidence meter, decision banner, evidence list, filter bar |
| Navigation | breadcrumb, pagination, command palette, context menu |
| Overlay | dialog, drawer, popover, tooltip, dropdown menu |

Showcase sections live in `src/main.js` (Components 01–26 + Markdown integration).

## Local development

```bash
npm install
npm run dev
npm run build
```

- `npm run lint:css` — Stylelint on `src/**/*.css`
- `npm test` — Playwright showcase tests (requires browsers: `npx playwright install`)

## Codex Skill

The agent skill Markdown lives in the package at:

```text
skills/merak-protocol-design-system/SKILL.md
```

Package subpaths for tooling (file paths, not JS modules):

```text
merak-protocol-design-system/skill
merak-protocol-design-system/skill.md
```

Resolve those exports as documentation for Codex/agents. Do not `import` them as JavaScript—there is no default export; read the Markdown as text or point the agent skill loader at the file path.

It guides design, implementation, and review of Merak Protocol UI (tokens, `mp-*` components, a11y, and product-flow composition).

## Docs

See [docs/README.md](docs/README.md) for concept, architecture, component contract, and ADRs.
