# Merak Protocol Design System

Dark gray technical UI system with Alice Blue signal color for traceability, permission gates, AI agent workflows, and archive interfaces.

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

Use `merak-protocol-design-system/showcase.css` only for the bundled component gallery. Reusable layout patterns use `mp-*` classes such as `mp-eyebrow`, `mp-section-heading`, `mp-grid`, `mp-button-row`, and `mp-badge-row`.

The package includes CSS variables, base styles, motion utilities, and component styles under `src/styles`.

Optional browser-native behavior components are documented in [docs/custom-elements.md](docs/custom-elements.md).

## Codex Skill

The agent skill is included at:

```text
skills/merak-protocol-design-system/SKILL.md
```

It can guide Codex when designing, implementing, or reviewing Merak Protocol UI components.
