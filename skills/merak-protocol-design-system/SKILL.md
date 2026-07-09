---
name: merak-protocol-design-system
description: Design, implement, review, or extend UI using the Merak Protocol personal design system. Use for dark gray technical dashboards, traceability tools, permission gates, AI agent workflows, archive/knowledge interfaces, graph/timeline/inspector surfaces, component CSS, design tokens, copy tone, motion, icons, and product-flow composition that should follow the Merak Protocol visual language.
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

Prefer these public layout classes: `mp-eyebrow`, `mp-section-heading`, `mp-grid`, `mp-grid--wide`, `mp-button-row`, `mp-badge-row`, `mp-text--secondary`, `mp-text--muted`, and `mp-heading--section`. Legacy unprefixed showcase names remain compatible but are not the recommended API.

Use native HTML plus Merak CSS for primitive controls and content. Prefer Merak custom elements for stateful composite UI: `merak-tabs`, `merak-command`, `merak-toast-region`, `merak-graph`, `merak-inspector`, `merak-sidebar`, `merak-gate-card`, `merak-agent-panel`, and `merak-timeline`. Pass objects and callbacks through JavaScript properties; use `merak-*` CustomEvents for state changes.

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

### Inputs and Command Input

Base inputs:
- surface or subtle black background
- muted border
- Alice Blue focus ring
- muted placeholder

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

### Alerts and Toasts

Variants:
- Info: system information or analysis in progress.
- Success: completed verification or archived record.
- Warning: partial evidence or possible risk.
- Error: failure, denied access, missing permission path.

Alert copy should be short. Toast regions may support `top-left`, `top-center`, `top-right`, `center`, `bottom-left`, `bottom-center`, `bottom-right`.

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

Permission Flow:

```text
Subject → Permission → Object → Path → Decision
```

States: `Granted`, `Denied`, `Partial`, `Unknown`, `Requires Approval`.

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
- `src/main.js` for showcase examples.
- Small JS modules such as `alert.js`, `command.js`, `graph.js`, `motion.js`, `navigation.js`, and `tabs.js` for interactions.

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
- Is myth present through structure and naming rather than decoration?
