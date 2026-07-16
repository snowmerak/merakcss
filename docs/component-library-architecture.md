# Component Library Architecture

> Merak Protocol 디자인 시스템을 React / Svelte 등 프레임워크 컴포넌트 라이브러리로 확장하기 위한 설계 문서.
>
> 관련 문서: [concept.md](./concept.md), [decisions.md](./decisions.md), [component-contract.md](./component-contract.md)

## 1. 목적

현재 패키지는 **CSS-first design system**이다.

- 토큰과 `mp-*` 컴포넌트 스타일을 제공한다.
- 쇼케이스는 vanilla JS로 인터랙션을 시연한다.
- npm 공개 API는 사실상 `style.css`와 skill 문서에 가깝다.

다음 단계는 이 CSS를 원천으로 유지하면서, **프레임워크별 하위 프로젝트**에서 CSS + JS(상태, a11y, composition)를 묶은 **통합 컴포넌트 라이브러리**를 배포하는 것이다.

목표:

1. 앱 개발자가 `import { Button, GateCard } from "@merak/react"` 형태로 사용한다.
2. 시각 언어(토큰, `mp-*`)는 한 곳에서만 소유한다.
3. React와 Svelte가 동일한 마크업·variant 계약을 공유한다.
4. 쇼케이스용 vanilla JS를 라이브러리 API로 오인하지 않는다.

## 2. 현재 상태 (As-Is)

| 층 | 위치 | 역할 |
| --- | --- | --- |
| Design concept | `docs/concept.md` | 시각·카피·컴포넌트 의도 |
| Agent skill | `skills/merak-protocol-design-system/` | 구현 가이드 |
| Tokens | `src/styles/tokens.css` | CSS variables source of truth |
| Component CSS | `src/styles/components/*.css` | `mp-*` 스타일 |
| Entry CSS | `src/style.css` | import 묶음 |
| Showcase | `src/main.js` + 소형 모듈 | 데모 마크업·인터랙션 |
| Package exports | `package.json` | CSS / skill 위주 |

제약:

- 프레임워크 컴포넌트 패키지가 없다.
- `alert.js`, `tabs.js`, `command.js` 등은 **쇼케이스 전용**이며 공개 런타임 API가 아니다.
- `layout.css`와 `showcase-*` 클래스는 라이브러리 계약이 아니다.

## 3. 목표 상태 (To-Be)

```text
merakcss/
├── packages/
│   ├── css/                 # tokens + mp-* styles (원천)
│   ├── core/                # (optional) shared variants / types
│   ├── react/               # @merak/react
│   └── svelte/              # @merak/svelte
├── apps/
│   └── showcase/            # 기존 Vite 데모 또는 Storybook
├── docs/
│   ├── concept.md
│   ├── component-library-architecture.md
│   ├── component-contract.md
│   └── decisions.md
└── skills/
    └── merak-protocol-design-system/
```

패키지 역할:

| 패키지 | npm 이름 (초안) | 책임 |
| --- | --- | --- |
| CSS | `merak-protocol-design-system` 유지 또는 `@merak/css` | 토큰, base, component CSS |
| Core | `@merak/core` (선택) | variant map, shared TS types |
| React | `@merak/react` | React 컴포넌트 + a11y/상태 |
| Svelte | `@merak/svelte` | Svelte 컴포넌트 + a11y/상태 |

소비 형태:

```ts
// React
import "merak-protocol-design-system/style.css"
import { Button, Badge, GateCard } from "@merak/react"
```

```svelte
<script>
  import "merak-protocol-design-system/style.css"
  import { Button, Badge } from "@merak/svelte"
</script>
```

## 4. 계층 모델

```text
┌──────────────────────────────────────────────┐
│  Product apps                                │
│  (agent console, archive, gates, …)          │
└──────────────────────┬───────────────────────┘
                       │ imports components
┌──────────────────────▼───────────────────────┐
│  Framework adapters                          │
│  @merak/react  |  @merak/svelte              │
│  props, slots, events, portals, keyboard     │
└──────────────────────┬───────────────────────┘
                       │ className / markup
┌──────────────────────▼───────────────────────┐
│  Shared contract                             │
│  variants, DOM structure, aria patterns      │
│  (@merak/core optional)                      │
└──────────────────────┬───────────────────────┘
                       │ mp-* classes
┌──────────────────────▼───────────────────────┐
│  CSS engine                                  │
│  tokens.css + components/*.css               │
└──────────────────────────────────────────────┘
```

원칙:

1. **CSS variables = 토큰 원천**  
   프레임워크가 색·간격을 재정의하지 않는다.
2. **`mp-*` 클래스 = 공개 스타일 계약**  
   어댑터는 이 클래스를 생성한다. 스타일 소유권은 CSS 패키지에 있다.
3. **프레임워크 레이어 = 상태·a11y·composition**  
   룩앤필을 JS로 재구현하지 않는다.
4. **쇼케이스 JS ≠ 라이브러리 런타임**  
   동작 스펙만 참고하고 idiomatic API로 재구현한다.

## 5. 통합 전략

### 5.1 CSS-only (기존, 유지)

```js
import "merak-protocol-design-system/style.css"
```

모든 스택에서 즉시 사용 가능하다. 프레임워크 패키지 없이도 유효한 1급 경로다.

### 5.2 Headless wrapper (1단계 기본 패턴)

프레임워크 컴포넌트는 markup + class 조합 + 이벤트만 담당한다.

```tsx
// Conceptual React shape
type ButtonProps = {
  variant?: "primary" | "secondary" | "ghost" | "danger"
  size?: "md" | "sm"
} & React.ButtonHTMLAttributes<HTMLButtonElement>

function Button({ variant = "primary", size = "md", className, ...props }: ButtonProps) {
  return (
    <button
      className={cn("mp-button", `mp-button--${variant}`, size === "sm" && "mp-button--sm", className)}
      {...props}
    />
  )
}
```

variant 이름은 CSS modifier와 동일하게 유지한다.

### 5.3 Primitive 조합 (2단계)

| Merak 표면 | 스타일 | 동작/접근성 기반 |
| --- | --- | --- |
| Button, Badge, Card, Alert, Input | `mp-*` | 네이티브 요소 + wrapper |
| Tabs, Toggle, Select, Dialog | `mp-*` | Radix (React) / bits-ui (Svelte) |
| Table | `mp-table*` | TanStack Table (필요 시) |
| Graph | graph tokens | xyflow (React Flow / Svelte Flow) |
| Command | `mp-command*` | 키보드 퍼스트 자체 구현 또는 cmdk 계열 |
| Toast | `mp-alert`, `mp-toast-region*` | portal + provider |

패턴:

```text
unstyled primitive (Radix / bits-ui)
  + mp-* className
  + merak style.css
```

### 5.4 Web Components (선택, 후순위)

프레임워크 무관 런타임이 필요해질 때만 검토한다.

- Shadow DOM보다는 light DOM + `mp-*`가 현재 CSS 설계와 맞다.
- SSR·form association·framework binding 비용이 있어 초기 범위에서 제외한다.

## 6. 패키지 경계

### 6.1 CSS package

포함:

- `tokens.css`, `base.css`, `motion.css`
- `components/*.css`
- 공개 entry: `style.css`

제외 또는 분리 검토:

- showcase 전용 레이아웃 (`showcase-*`, 데모 grid 등)
- 앱 전용 장식 마크업

의존성: 없음 (peer-free 유지).

### 6.2 Core package (optional)

포함 후보:

```ts
// conceptual
export const buttonVariants = {
  base: "mp-button",
  variant: {
    primary: "mp-button--primary",
    secondary: "mp-button--secondary",
    ghost: "mp-button--ghost",
    danger: "mp-button--danger",
  },
  size: {
    md: "",
    sm: "mp-button--sm",
  },
} as const
```

React/Svelte가 같은 variant map을 쓰면 드리프트를 줄일 수 있다.  
초기 구현에서는 각 패키지에 인라인해도 되고, 컴포넌트가 늘면 core로 승격한다.

### 6.3 React package

- `peerDependencies`: `react`, `react-dom`
- `dependencies` 또는 peer: CSS 패키지
- 빌드: ESM 중심 (필요 시 CJS)
- 권장 보조: `clsx` / `class-variance-authority`, Radix primitives

디렉터리 초안:

```text
packages/react/src/
  button/Button.tsx
  badge/Badge.tsx
  card/Card.tsx
  alert/Alert.tsx
  tabs/Tabs.tsx
  command/Command.tsx
  table/Table.tsx
  utils/cn.ts
  index.ts
```

### 6.4 Svelte package

- `peerDependencies`: `svelte` (^5 목표)
- CSS 패키지 의존
- 배포: `*.svelte` 소스 export 또는 `svelte-package`
- 권장 보조: bits-ui (또는 동등 headless)

컴포넌트 scoped style로 Merak을 재구현하지 않는다.  
전역 CSS import + `mp-*` class를 사용한다.

## 7. CSS 로딩 정책

| 옵션 | 설명 | 초기 권장 |
| --- | --- | --- |
| A. 앱이 CSS 직접 import | 명시적, 중복 로드 제어 쉬움 | **권장** |
| B. 프레임워크 entry side-effect import | DX 좋음, SSR/번들 설정 주의 | 문서화된 보조 경로 |

초기 문서 규칙:

```text
필수: import "…/style.css" 를 앱 엔트리에서 한 번 수행한다.
선택: 프레임워크 패키지는 CSS를 자동 import하지 않는다. (옵션 A)
```

## 8. 컴포넌트 우선순위

concept Priority와 현재 쇼케이스 구현을 정렬한 로드맵이다.

### Phase 1 — Foundations

- Button
- Badge
- Card (base + compound slots)
- Alert (static)
- Input / Label / Help / Error
- Divider, Icon slot

### Phase 2 — Composition

- Oracle / Trace / Gate / Relic Card
- Tabs
- Link List
- Sidebar item / shell pieces
- Toast provider + floating Alert

### Phase 3 — Workflow surfaces

- Command Input
- Table (static shell → optional DataTable)
- Timeline / Trace Panel
- Inspector Panel

### Phase 4 — Advanced

- Graph View (xyflow 테마 래퍼; SVG 데모를 프로덕션 API로 고정하지 않음)
- Agent Execution Panel 고도화

## 9. API 설계 가이드

### 9.1 Naming

- 컴포넌트: PascalCase (`GateCard`, `TracePanel`)
- props variant: CSS modifier와 동일 (`primary`, `verified`, `dense`)
- DOM class: 기존 `mp-*` 유지 (공개 계약)

### 9.2 Composition

단순 요소:

```tsx
<Button variant="primary" size="sm">Run Trace</Button>
```

복합 표면:

```tsx
<Card variant="gate">
  <Card.Header eyebrow="Gate Card" title="Access granted." />
  <Card.Body>…</Card.Body>
  <Card.Meta>…</Card.Meta>
  <Card.Actions>…</Card.Actions>
</Card>
```

또는 domain props:

```tsx
<GateCard
  decision="granted"
  subject="user:alice"
  permission="read"
  object="archive:alpha"
  path="user:alice → group:editors → archive:alpha"
/>
```

초기에는 compound 패턴을 기본으로 하고, 반복 domain 카드는 편의 컴포넌트로 추가한다.

### 9.3 Escape hatches

- 모든 루트에 `className` (React) / `class` (Svelte) merge 허용
- 네이티브 속성 전달 (`…rest`)
- 가능하면 `asChild` / 요소 교체 패턴으로 Link 래핑 지원

### 9.4 Accessibility

- 의미 있는 네이티브 요소 우선 (`button`, `a`, `table`, …)
- Tabs / Dialog 등은 headless primitive의 키보드·aria 패턴을 사용
- Alert: `role="status"` / `role="alert"` 규칙을 현재 CSS 쇼케이스와 맞춤
- 아이콘은 decorative일 때 `aria-hidden`

### 9.5 Motion

- CSS motion utility와 기존 transition을 우선 사용
- Framer Motion 등은 CSS로 부족한 경우에만 선택 의존성

## 10. Showcase 와 라이브러리의 관계

| 항목 | Showcase | Library |
| --- | --- | --- |
| 목적 | 시각 검증, 문서, 데모 | 앱 소비 API |
| 마크업 | 정답 예시의 출처 | 계약을 준수하는 생성물 |
| JS | 일회성 데모 배선 | stable props/events |
| CSS | 전체 style + layout 가능 | component CSS 계약만 의존 |

규칙:

1. 새 시각 컴포넌트는 먼저 CSS + showcase 마크업으로 검증한다.
2. 안정화되면 contract 문서에 DOM/class를 기록한다.
3. 그 다음 React/Svelte 래퍼를 추가한다.
4. showcase vanilla 모듈을 export API로 승격하지 않는다.

## 11. 빌드·배포·버전

### Monorepo tooling (초안)

- npm workspaces 또는 pnpm workspaces
- 루트 스크립트: `dev`, `build`, `lint`, `test`
- CSS 패키지 변경이 프레임워크 패키지 스토리/쇼케이스에 즉시 반영

### Versioning

초기 권장:

- CSS와 프레임워크 패키지를 **같은 major 라인**으로 맞춤 (0.x 기간)
- CSS breaking change (`mp-*` 제거/의미 변경)는 major
- 프레임워크-only API 변경은 해당 패키지 minor/major로 문서화

### Package exports 예시

```json
{
  "name": "@merak/react",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    }
  },
  "peerDependencies": {
    "react": "^18 || ^19",
    "react-dom": "^18 || ^19"
  }
}
```

## 12. 품질 기준

라이브러리 컴포넌트 완료 조건:

1. concept / skill 톤과 시각 규칙 준수 (`--mp-*`, Alice Blue = signal only, stroke-less surfaces)
2. `component-contract.md`의 DOM/class와 일치
3. keyboard / aria 기본 동작 확인
4. showcase 또는 Storybook 예시 존재
5. CSS-only 경로와 class 계약이 깨지지 않음
6. 파괴적 액션(Danger)은 확인 UX를 강제하지 않더라도 문서/예시에 confirmation 패턴 명시

## 13. 비목표 (Non-goals)

현재 단계에서 하지 않는 것:

- Tailwind로 `mp-*` 전체를 재작성
- 단일 패키지에 React + Svelte 강제 peer 혼합
- Shadow DOM 기반 디자인 시스템
- Graph SVG 데모를 최종 Graph API로 고정
- 모든 headless 동작을 자체 구현 (검증된 primitive 사용 허용)
- 밝은 테마 완전 지원 (color-scheme dark 전제 유지)

## 14. 구현 로드맵 요약

| 단계 | 작업 | 산출물 |
| --- | --- | --- |
| 0 | 계약·결정 문서화 | 본 문서, contract, decisions |
| 1 | monorepo + `packages/css` 분리 | CSS 패키지 경계 명확화 |
| 2 | `@merak/react` Phase 1 | Button~Input |
| 3 | 복합 카드·Tabs·Toast | workflow-ready surface |
| 4 | `@merak/svelte` 대칭 구현 | 동일 contract |
| 5 | Table/Command/Inspector | app shell 수준 |
| 6 | Graph 테마 래퍼 | advanced |

## 15. 요약

Merak Protocol 컴포넌트 라이브러리는 **CSS를 엔진으로, 프레임워크를 어댑터로** 둔다.

```text
CSS owns look.
Contract owns structure.
React/Svelte own state and accessibility.
Apps own product behavior.
```

이 분리가 유지되는 한 React와 Svelte 하위 프로젝트를 추가해도 시각 언어는 하나로 남는다.
