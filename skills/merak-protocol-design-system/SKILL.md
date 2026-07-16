---
name: merak-protocol-design-system
description: Design, implement, review, or extend UI using the Merak Protocol personal design system. Use for dark gray technical dashboards, traceability tools, permission gates, AI agent workflows, archive/knowledge interfaces, graph/timeline/inspector surfaces, identity confidence and decision UI, form controls, feedback (toast/progress/skeleton/empty/spinner), navigation (breadcrumb/pagination/command palette/context menu), overlays (dialog/drawer/popover/tooltip/dropdown), component CSS, design tokens, copy tone, motion, icons, and product-flow composition that should follow the Merak Protocol visual language.
---

# Merak Protocol Design System

## Core Direction

Build practical, dense, calm technical interfaces for trust, traceability, permission models, AI agent workflows, and knowledge archives.

Use cold gray surfaces as the interface base and Alice Blue as a restrained signal for trust, observation, verification, selection, focus, and reliable data.

Do not make it fantasy UI, neon UI, gold myth UI, game metal UI, green openSUSE-like UI, or generic bright SaaS UI. Mythic language may appear in naming and structure, but the interface should still feel like a developer tool.

## Visual Rules

Use this palette as the source of truth:

```css
--color-bg-base: #1A1D21;
--color-bg-subtle: #20242A;
--color-bg-surface: #262B32;
--color-bg-elevated: #303640;
--color-border-default: #3A414C;
--color-border-muted: #2E343D;
--color-text-primary: #E8EDF3;
--color-text-secondary: #B5BEC9;
--color-text-muted: #9AA4AF;
--color-accent: #F0F8FF;
--color-accent-soft: #DCEEFF;
--color-accent-line: #AFCDEB;
--color-accent-deep: #6E9FCB;
--color-success: #6FBF8A;
--color-warning: #D7A84F;
--color-danger: #D66B61;
--color-info: #8EBCE6;
--color-neutral: #9AA4AF;
```

Palette discipline:
- Use gray for structure and surfaces.
- Use Alice Blue only for selected state, focus ring, primary action, verified/trusted data, and graph/path emphasis.
- Use red for denied/destructive/risk.
- Use amber for pending/uncertain/manual review.
- Use soft green for success/granted/verified.
- Avoid broad accent fills.

Typography:
- Use `Pretendard, Inter, "Noto Sans KR", system-ui, sans-serif`.
- Use `"JetBrains Mono", "Geist Mono", "SFMono-Regular", Consolas, monospace` for IDs, labels, command text, metadata, traces.
- Keep copy short, declarative, and evidence-oriented.

Spacing and shape:
- Base spacing is `4px`; common spacing is `8 / 12 / 16 / 24 / 32 / 48`.
- Card padding is `16px` or `20px`.
- Dashboard gap is `16px`.
- Sidebar width is `240px`.
- Radius should stay restrained: `4px` badge/input, `8px` button/card, `12px` large panel.

## Public CSS and Custom Elements

Use `style.css` for production UI. It contains tokens, base styles, components, and reusable layout patterns. Use `showcase.css` only for the bundled gallery; do not apply its `#app`, `showcase-*`, or hero layout rules to product UI.

Prefer these public layout classes: `mp-eyebrow`, `mp-section-heading`, `mp-grid`, `mp-grid--wide`, `mp-grid--start`, `mp-button-row`, `mp-badge-row`, `mp-text--secondary`, `mp-text--muted`, and `mp-heading--section`. Use `mp-grid--start` only when mixed-height cards must not stretch (sparse showcase rows). Legacy unprefixed showcase names remain compatible but are not the recommended API.

Use `mp-list` for semantic ordered and unordered records. Use `mp-list--compact` for dense nested items and `mp-list--task` for checkbox-backed review items. This is the required list mapping for Markdown output. Use `mp-evidence-list` for citation/evidence records in dashboards; do not use it as a Markdown list substitute.

Use native HTML plus Merak CSS for primitive controls and content. Prefer Merak custom elements for stateful composite UI: `merak-tabs`, `merak-command`, `merak-toast-region`, `merak-graph`, `merak-inspector`, `merak-sidebar`, `merak-gate-card`, `merak-agent-panel`, and `merak-timeline`. Pass objects and callbacks through JavaScript properties; use `merak-*` CustomEvents for state changes.

CSS-first primitives (no custom element required): field/form controls, confidence meter, decision banner, evidence list, filter bar, toast/progress/skeleton/empty/spinner, breadcrumb/pagination/command palette/context menu, dialog/drawer/popover/tooltip/dropdown. Showcase helpers (`setupFilterBar`, `setupToastDemo`, `setupCommandPalette`, `setupDialog`, …) live under `src/*.js` and are not package exports unless listed in `package.json`.

## Voice

Prefer judgment-like system copy:

- `Trace verified.`
- `Access granted.`
- `Access denied by policy.`
- `Source confidence is partial.`
- `Record sealed.`
- `Path unresolved.`
- `Manual review required.`
- `No oracle without trace.`
- `권한은 선언이 아니라 경로다.`

Avoid motivational SaaS copy such as “start your journey”, “smarter experience”, or “innovative future”.

## Components

When implementing components, prefer `mp-*` classes, CSS variables, and scoped component files. Keep examples inspectable and close to real workflows.

### App Shell and Sidebar

Use:
- left sidebar
- top header
- main content area
- optional right inspector panel

Sidebar sections:
- Foundation
- Components
- Traces
- Gates
- Relics
- Graphs
- Settings

Only the current item should use Alice Blue. Keep all other navigation items muted gray.

### Buttons

Variants:
- Primary: Alice Blue background, dark text, used for main execution.
- Secondary: gray border or surface background, used for supporting actions.
- Ghost: transparent, hover-only.
- Danger: red outline or subtle red background, destructive actions require confirmation.

Good labels: `Run Trace`, `Verify`, `Grant Access`, `Revoke`, `Archive`, `View Record`.

### Cards

Use cards for repeated items, framed tools, and decision records.

Core variants:
- Oracle Card: title, confidence, summary, evidence count, primary action.
- Trace Card: trace ID, source, timestamp, status, linked records.
- Gate Card: subject, permission, object, decision, path, reason.
- Relic Card: title, type, stability, last verified, related traces.

### Badges

Badges should be small, dry labels, not decorative pills.

Status labels: `ACTIVE`, `PENDING`, `INACTIVE`, `ERROR`, `SEALED`, `PARTIAL`, `VERIFIED`.

Risk labels: `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`.

Type labels: `USER`, `SYSTEM`, `AGENT`, `RESOURCE`, `POLICY`, `TRACE`, `ARCHIVE`.

### Inputs and Form Controls

Base inputs:
- surface or subtle black background
- muted border
- Alice Blue focus / selected state only
- muted placeholder
- semantic borders for invalid (danger), warning, success

Field shell (preferred):
- `.mp-field` with `.mp-field__label`, `.mp-field__hint`, `.mp-field__message`
- state modifiers: `--invalid`, `--warning`, `--success`, `--disabled`
- Associate labels with `for`/`id`. Wire hints and messages with `aria-describedby`. Use `aria-invalid="true"` for invalid controls.

Controls:
- `.mp-input`, `.mp-textarea`, `.mp-select`
- `.mp-checkbox`, `.mp-radio` inside `.mp-choice` labels
- `.mp-switch` with visually hidden checkbox + `.mp-switch__track` (legacy `.mp-toggle` still works)

Keep controls dense and technical—not bright SaaS pills or neon toggles.

Command Input is a separate component for agent actions, search, and command palettes.

Example:

```text
> analyze auth graph for user:alice
```

Include:
- prefix symbol
- suggestions
- recent commands when useful
- validation hint
- keyboard-first behavior

Use inline SVG for search icons. Do not use emoji, icon fonts, external icon libraries, or background images for search icons.

### Alerts, Toasts, and Feedback

#### Alert

Variants:
- Info: system information or analysis in progress.
- Success: completed verification or archived record.
- Warning: partial evidence or possible risk.
- Error: failure, denied access, missing permission path.

Alert copy should be short. Prefer `role="status"` for static info/success/warning samples; use `role="alert"` for real error interruptions. Do not put `role="alert"` on static field validation messages—use `aria-invalid` + `aria-describedby` instead.

#### Toast

CSS root: `.mp-toast` inside `.mp-toast-region` (placement modifiers: top/bottom × left/center/right, plus center).

Variants: `--info`, `--success`, `--warning`, `--danger` (`--error` aliases danger).

Live region: the **region** owns announcements (`aria-live` polite, assertive for danger/error). Do not nest `role="status"`/`role="alert"` on each toast. Avoid `aria-atomic="true"` on stacked regions so only new additions are announced (`aria-relevant="additions text"`).

Showcase helper: `showToast` / `setupToastDemo` in `src/alert.js`. Update region placement class when reusing one region across placements.

#### Progress

`.mp-progress` with `--mp-progress` for determinate fill; `.mp-progress--indeterminate` for unknown duration. Use `role="progressbar"` + valuemin/max/now when determinate. Quiet colors; optional semantic modifiers `--success` / `--warning` / `--danger` / `--info`.

#### Skeleton

`.mp-skeleton` with `__circle`, `__line`, `__block`. Shimmer must respect `prefers-reduced-motion` (static wash, no motion).

#### Empty state

`.mp-empty-state` variants: `--default`, `--filtered`, `--archived`, `--denied`. Judgment copy + optional mono meta + actions.

#### Spinner

`.mp-spinner` — restrained ring using border + accent-line, not neon. Pair with `.mp-spinner-label` / `role="status"` when announcing activity.

### Tables

Use dense tables by default for logs, permissions, documents, users, agent runs, and risk items.

Expected features:
- row hover
- status badge column
- last updated column where applicable
- optional sticky header
- optional horizontal overflow
- centered action column when actions are narrow buttons

Recommended columns:
- Logs: Time, Actor, Event, Target, Status, Trace.
- Permissions: Subject, Permission, Object, Decision, Source, Updated.
- Documents: Title, Type, Stability, Confidence, Last Verified, Owner.

### Graph View

Use for relationships, permission paths, dependencies, knowledge links, and agent workflows.

Style:
- dark gray grid/canvas
- muted gray nodes
- selected node in Alice Blue
- verified node in soft green
- risk node in red
- thin edges with subtle directional arrows

Interactions:
- hover
- selected node detail
- path highlight
- filter by type
- show verified path
- show risk path

When drawing edges, connect to node boundaries rather than node centers so arrows do not enter shapes.

### Timeline and Trace Panel

Use for events, decisions, evidence, and execution order.

Timeline fields:
- timestamp
- event title
- actor
- source
- status
- evidence link or trace ID

Canonical sequence:

```text
01 Observe Input
02 Retrieve Sources
03 Verify Path
04 Evaluate Risk
05 Execute Action
06 Archive Result
```

### Inspector Panel

Prefer an inspector panel over a modal for analytical workflows.

Use for:
- selected graph node
- selected permission
- selected document
- selected agent run
- selected character/lore record

Sections:
- Overview
- Metadata
- Status
- Relations
- Trace
- Actions

### Tabs

Use tabs for detail surfaces such as `Overview`, `Trace`, `Decision`, `Action`. Use segmented tabs for compact mode switches such as `Oracle`, `Trace`, `Monitor`.

Tabs should update `aria-selected`; panels should keep content concise.

### Iconography

Use inline SVG line icons, `currentColor`, `1.5px` stroke, rounded caps allowed, minimal fills.

Motifs:
- Star: 기준점, 핵심 정보
- Gate: 권한, 접근
- Eye: 관찰, 검증
- Archive Box: 기록, 보존
- Graph Node: 관계, 경로
- Seal: 확정, 잠금
- Compass: 방향, 탐색
- Terminal: 실행, 명령

### Confidence Meter

Use for source confidence, path strength, and judgment bands. CSS root: `.mp-confidence-meter`.

Elements: `__header`, `__label`, `__value`, `__track`, `__fill`, `__meta`, optional `__scale`.

Band modifiers: `--high`, `--medium`, `--low`, `--partial`, `--unknown`. Layout: `--compact`.

Fill API: set `--mp-confidence` on the root (e.g. `style="--mp-confidence: 72%"`). Do not invent a second width API. Missing value reads as `0%`.

Accessibility: root is a `div` with `role="meter"`, `aria-valuemin="0"`, `aria-valuemax="100"`, `aria-valuenow`, and `aria-valuetext` such as `72% · partial`. Keep visible `__value` text so the meter is not value-only for screen readers.

Color discipline: semantic meter color + light wash only. No full-bleed Alice Blue bars. Soft danger for `--low` (badge-high style), not neon red.

### Decision Banner

Use for identity permission and review outcomes. Distinct from `.mp-alert` (system messages) and `.gate-card` / `merak-gate-card` (full subject→permission→object equation).

CSS root: `.mp-decision-banner`.

Elements: `__icon`, `__body`, `__title`, `__reason`, `__meta`, `__aside`.

State modifiers: `--granted`, `--denied`, `--partial`, `--unknown`, `--approval`. Layout: `--compact` (icon | title | aside; reason/meta hidden).

Roles: denied → `role="alert"`; other states → `role="status"`.

Compose existing `.mp-badge.mp-badge--sm` in `__aside` (`GRANTED`, `DENIED`, `PARTIAL`, `PENDING`). Do not restyle badges inside the banner. Left accent bar via `border-left` is preferred over hero gradient fills.

### Evidence List

Use for dense citation and evidence records on dashboards. Not a vertical timeline (no rail) and not a Markdown list (use `mp-list` for that).

CSS root: `ul.mp-evidence-list` or `ol.mp-evidence-list`.

Elements: `__item`, `__index`, `__body`, `__title`, `__source`, `__meta`, `__trail`. Optional `__link` on navigable titles.

Item modifiers: `__item--active`, `__item--verified`, `__item--partial`, `__item--missing`. Root modifier: `--dense`.

Active selection uses the same restrained Alice Blue wash as timeline/trace panels (`border rgb(175 205 235 / 0.42)`, `bg rgb(175 205 235 / 0.055)`). Prefer mono indexes (`01`–`04`) and mono sources (`policy:read-path`, `trace:TRC-0428`).

### Filter Bar

Use for dense record filtering: search + multi-select chips + clear/apply.

CSS root: `.mp-filter-bar` with `role="toolbar"` and an accessible name (e.g. `aria-label="Filter records"`).

Elements: `__search` (wrap existing `.mp-search`), `__groups`, `__group`, `__group-label`, `__chip` (`button type="button"`), `__count` (`[data-filter-count]`), `__actions` (reuse `.mp-button.mp-button--sm`).

Chips use `aria-pressed="true|false"` for multi-select. Do not reuse `role="tab"` / `aria-selected` for filter chips.

Selected chip style is restrained Alice Blue (border + low-alpha wash), intentionally weaker than solid accent segmented tabs. Gray structure for the bar itself—never an accent panel.

Showcase helper: `setupFilterBar(root)` from `src/filter-bar.js` (not a package export). Supports optional exclusive groups via `data-filter-exclusive` on `__group`. Clear control uses `data-filter-clear`.

Responsive: stack at `max-width: 860px`; search may go full width by `560px`.

### Navigation extras

#### Breadcrumb

`nav.mp-breadcrumb` with `aria-label="Breadcrumb"`. List of links; current page uses `aria-current="page"` (not a link). Separators decorative (`aria-hidden`).

#### Pagination

`nav.mp-pagination` with `aria-label="Pagination"`. Page buttons use `aria-current="page"` for the active page. Prev/next may disable at ends. Showcase: `setupPagination`.

#### Command palette

`.mp-command-palette` dialog surface with search input as combobox (`role="combobox"`, `aria-controls`, `aria-activedescendant`) and `role="listbox"` of `role="option"` items.

Listbox ownership: groups are `role="group"` + `aria-labelledby`; structural `ul`/`li` are `role="none"`. Keep focus in the input; do not move focus onto options on arrow keys.

Default demos closed (`data-open="false"`, palette `hidden`) so page load does not steal focus. Showcase: `setupCommandPalette`.

Hover is neutral gray; Alice Blue only for selected/active option and focus-visible.

#### Context menu

`.mp-context-menu` with `role="menu"` / `menuitem`. Open via contextmenu or Shift+F10 on a focusable target. Arrow keys move items; Escape closes and restores focus. Showcase: `setupContextMenu`.

### Overlay

Prefer native HTML where possible: `<dialog>` for modal/drawer, Popover API for anchored surfaces, CSS-only tooltip on hover/focus-within.

#### Dialog

`.mp-dialog` on `<dialog>`. Open with `showModal()`. Escape and backdrop click close (native + light demo wiring). Include labelled title and explicit close control.

#### Drawer

`.mp-drawer` is a dialog variant. Placement: `--left` / `--right`. Full-height side panel, gray elevated surface.

#### Popover

`.mp-popover` with `popover="auto"`. If `aria-haspopup="dialog"`, the surface must be `role="dialog"` with an accessible name (`aria-labelledby`). Native popover is not auto-anchored—position with JS from the trigger (`beforetoggle`/`toggle`) or CSS anchor positioning when available. Showcase: `setupPopover`.

#### Tooltip

`.mp-tooltip-host` wraps control + `.mp-tooltip` (`role="tooltip"`). Show on `:hover` and `:focus-within`. Wire `aria-describedby` from the control to the tooltip id. No JS required.

#### Dropdown menu

Button trigger (`aria-haspopup="menu"`, `aria-expanded`, `aria-controls`) + `.mp-dropdown-menu` (`role="menu"`). Prefer Popover API; anchor to trigger like popover. Menuitems support arrow keys; Escape returns focus to trigger. Showcase: `setupDropdownMenu`.

Alice Blue only for focus-visible / current menuitem—not plain hover.

### Motion

Use motion sparingly. Allowed motion:
- hover transition
- focus ring
- panel slide
- graph path highlight
- loading shimmer
- command palette open
- alert/toast enter and exit

Avoid bounce, particles, game-like transitions, and full-screen ritual effects.

Prefer `cubic-bezier(0.2, 0, 0, 1)`. In this implementation, motion durations may be longer than the original concept defaults when human-visible demonstration is needed.

## Product Patterns

Use components together according to these patterns.

Verification Flow:

```text
Input → Trace → Evaluate → Decision → Archive
```

Use for AI response verification, document evidence, security policy decisions, permission checks, and log analysis.

Typical surface stack for verification:

```text
Filter Bar → Evidence List → Confidence Meter → Decision Banner → Archive / Gate Card
```

Permission Flow:

```text
Subject → Permission → Object → Path → Decision
```

States: `Granted`, `Denied`, `Partial`, `Unknown`, `Requires Approval`. Render those outcomes with Decision Banner; pair Partial/Unknown with Confidence Meter bands and Evidence List citations when the path needs inspection.

Agent Flow:

```text
Intent → Plan → Tool Call → Observation → Decision → Result
```

Every agent step should leave a trace. No oracle without trace.

Archive Flow:

```text
Capture → Classify → Link → Verify → Seal
```

Use for technical docs, decision records, character/world settings, and project memory.

## Implementation Guidance

When working in the Merak CSS repo, prefer these existing files and patterns:

- `src/styles/tokens.css` for design tokens.
- `src/styles/base.css` for reset, typography, focus, and global defaults.
- `src/styles/layout.css` for showcase layout.
- `src/styles/motion.css` for shared animation utilities.
- `src/styles/components/*.css` for component styles.
- Identity: `confidence-meter.css`, `decision-banner.css`, `evidence-list.css`, `filter-bar.css`.
- Feedback: `feedback.css` (toast, progress, skeleton, empty, spinner); toast region placement remains in `alert.css`.
- Navigation: `navigation-extra.css` (breadcrumb, pagination, command palette, context menu).
- Overlay: `overlay.css` (dialog, drawer, popover, tooltip, dropdown).
- `src/main.js` for showcase examples (Components 01–26 + Markdown integration).
- Small JS modules such as `alert.js`, `command.js`, `filter-bar.js`, `graph.js`, `motion.js`, `navigation.js`, `navigation-extra.js`, `overlay.js`, and `tabs.js` for showcase interactions.

When adding a component:

1. Create a focused CSS file under `src/styles/components/`.
2. Import it from `src/style.css`.
3. Add a realistic example section to `src/main.js`.
4. Keep classes scoped with `mp-*` or component-specific prefixes.
5. Use real component states, not decorative filler.
6. Run `npm run build`.
7. Commit when the component is coherent.

If building in React/Tailwind later:
- Keep CSS variables as the token source of truth.
- Let Tailwind reference those variables.
- Use Radix UI for accessible primitives where useful.
- Use TanStack Table for complex tables.
- Use React Flow for production graph editors.
- Use Framer Motion only when CSS motion is insufficient.

## Final Quality Check

Before finishing, check:

- Does it feel like a dense but calm technical tool?
- Is Alice Blue used only as signal?
- Are evidence, trace, and decision visually distinct?
- Are permission paths represented as paths, not declarations?
- Is copy short and judgment-oriented?
- Are dangerous states red and confirmed?
- Are pending/partial states amber or info blue?
- Are cards and panels restrained, not overly rounded?
- Are confidence, decision, evidence, and filters distinct components rather than overloaded alerts or generic lists?
- Are hover states neutral gray, with Alice Blue reserved for selected/focus/active?
- Do overlays use native dialog/popover behavior where practical, with correct roles and names?
- Is myth present through structure and naming rather than decoration?
