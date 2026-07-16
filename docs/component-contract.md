# Component Contract

> Merak Protocol 공개 UI 계약: DOM 골격, `mp-*` 클래스, 상태, 접근성.
>
> CSS-only 사용자와 `@merak/react` / `@merak/svelte` 어댑터가 **동일한 마크업 계약**을 따르기 위한 문서다.
>
> 관련 문서: [component-library-architecture.md](./component-library-architecture.md), [decisions.md](./decisions.md), [concept.md](./concept.md)

## 1. 계약 범위

### 포함 (public)

- `mp-*` 컴포넌트 클래스와 modifier
- 문서화된 상태 클래스 (`is-active`, `is-leaving` 등)
- 필수 DOM 골격 (아래 섹션)
- ARIA 역할·속성 규칙
- CSS variables 토큰 이름 (`--mp-*`, `--space-*`, …)

### 제외 (non-public)

- `showcase-*`, `example-grid`, `section-heading`, `button-row` 등 데모 레이아웃
- `src/*.js` 쇼케이스 헬퍼 API
- Graph 쇼케이스의 고정 좌표 SVG 노드 배치
- 앱 비즈니스 데이터 shape

## 2. 공통 규칙

### 2.1 접두사

- 컴포넌트 루트·요소: `mp-{name}` / `mp-{name}__{element}` / `mp-{name}--{modifier}`
- 임시 상호작용 상태: `is-*` 허용 (`is-active`, `is-leaving`)

### 2.2 토큰

색·간격·라디우스·이징은 CSS variables만 사용한다.  
하드코딩 색을 프레임워크 컴포넌트 style prop으로 재도입하지 않는다.

### 2.3 class merge

프레임워크 래퍼는 루트에 추가 class를 허용해야 한다.  
추가 class는 공개 `mp-*` 의미를 덮어쓰지 않는 것을 권장한다.

### 2.4 Copy tone

라벨·알림 문구는 concept voice를 따른다. 짧은 판정문, 근거 중심.

## 3. Foundations

### 3.1 Button

**Root:** `button.mp-button` (또는 `a` + 동일 class, 링크 액션인 경우)

| Modifier | Class | 용도 |
| --- | --- | --- |
| primary | `mp-button--primary` | 주요 실행 |
| secondary | `mp-button--secondary` | 보조 |
| ghost | `mp-button--ghost` | 낮은 우선순위 |
| danger | `mp-button--danger` | 파괴적 액션 |
| sm | `mp-button--sm` | compact |
| icon | `mp-button--icon` | 정사각 아이콘 버튼 |

**States**

- `:disabled` / `disabled` 속성
- hover / focus는 CSS 담당

**A11y**

- 아이콘 온리 버튼: `aria-label` 필수
- 실제 버튼 동작이면 `button` 요소 우선

**최소 예시**

```html
<button type="button" class="mp-button mp-button--primary">Run Trace</button>
<button type="button" class="mp-button mp-button--danger mp-button--sm">Revoke</button>
<button type="button" class="mp-button mp-button--icon" aria-label="Search">…</button>
```

### 3.2 Badge

**Root:** `span.mp-badge` (인라인 라벨)

| 그룹 | Classes |
| --- | --- |
| Status | `--active` `--pending` `--inactive` `--error` `--sealed` `--partial` `--verified` |
| Risk | `--low` `--medium` `--high` `--critical` |
| Type | `--type` (라벨 텍스트로 USER/SYSTEM/… 표현) |
| Size | `--sm` |

**규칙**

- 장식 pill이 아니라 상태 라벨처럼 짧고 건조하게 유지
- 대문자 라벨 관례 유지 (쇼케이스와 동일)

```html
<span class="mp-badge mp-badge--verified">VERIFIED</span>
<span class="mp-badge mp-badge--type mp-badge--sm">TRACE</span>
```

### 3.3 Card

**Surface note:** `mp-card--oracle|trace|gate|relic` are **category tints** (domain flavor), not decision/status washes. Decision state uses neutral containers + local semantic accents (badge/rail/icon). Gate cards themselves are neutral surface + decision rail.

**Root:** `article.mp-card` (또는 `div.mp-card` when not self-contained)

| Element | Class |
| --- | --- |
| header | `mp-card__header` |
| eyebrow | `mp-card__eyebrow` |
| title | `mp-card__title` |
| body | `mp-card__body` |
| meta | `mp-card__meta` |
| actions | `mp-card__actions` |

| Variant | Class |
| --- | --- |
| oracle | `mp-card--oracle` |
| trace | `mp-card--trace` |
| gate | `mp-card--gate` |
| relic | `mp-card--relic` |

**골격**

```html
<article class="mp-card mp-card--gate">
  <div class="mp-card__header">
    <span class="mp-icon" aria-hidden="true">…</span>
    <div>
      <p class="mp-card__eyebrow">Gate Card</p>
      <h3 class="mp-card__title">Access granted.</h3>
    </div>
  </div>
  <p class="mp-card__body">…</p>
  <div class="mp-card__meta">
    <span>user:alice</span>
    <span>document:alpha</span>
  </div>
  <div class="mp-card__actions">
    <button type="button" class="mp-button mp-button--secondary mp-button--sm">View Path</button>
  </div>
</article>
```

프레임워크 compound API는 위 골격을 생성해야 한다.

### 3.4 Alert

**Root:** `div.mp-alert`

| Element | Class |
| --- | --- |
| icon | `mp-alert__icon` |
| content | `mp-alert__content` |
| title | `mp-alert__title` |
| message | `mp-alert__message` |

| Variant | Class | role 권장 |
| --- | --- | --- |
| info | `mp-alert--info` | `status` |
| success | `mp-alert--success` | `status` |
| warning | `mp-alert--warning` | `status` |
| error | `mp-alert--error` | `alert` |

| Modifier | Class |
| --- | --- |
| compact | `mp-alert--compact` |
| floating (toast item) | `mp-alert--floating` |

**Surface rule:** neutral inset container + left accent rail + semantic icon. Do not fill the whole alert with `--mp-*-weak`. Compact badges may keep weak washes. Icons via `iconSvg` / SVG — no unicode glyphs.

**Toast region**

```html
<div
  id="mp-toast-region-{placement}"
  class="mp-toast-region mp-toast-region--{placement}"
  role="region"
  aria-live="polite"
  aria-label="Notifications"
></div>
```

placement 값: `top-left` | `top-center` | `top-right` | `center` | `bottom-left` | `bottom-center` | `bottom-right`

**Dismiss animation state:** `is-leaving` on the alert element

```html
<div class="mp-alert mp-alert--success" role="status">
  <span class="mp-alert__icon" aria-hidden="true"><!-- iconSvg('success', { size: 'sm' }) --></span>
  <div class="mp-alert__content">
    <strong class="mp-alert__title">Trace verified.</strong>
    <p class="mp-alert__message">Evidence path is complete.</p>
  </div>
</div>
```

### 3.5 Input family

| Element | Class |
| --- | --- |
| label text | `mp-label` |
| text input | `mp-input` |
| textarea | `mp-textarea` |
| select | `mp-select` |
| help | `mp-help` |
| error | `mp-error` |
| search shell | `mp-search` |
| search icon | `mp-search__icon` |
| choice row label | `mp-choice` |
| checkbox | `mp-checkbox` |
| radio | `mp-radio` |
| toggle root | `mp-toggle` |
| toggle track | `mp-toggle__track` |

**Field group (권장 골격, class optional utility)**

```html
<label class="field-group">
  <span class="mp-label">Trace ID</span>
  <input class="mp-input" type="text" placeholder="TRC-0428" />
  <span class="mp-help">Stable identifier for a trace record.</span>
</label>
```

**Invalid**

- `aria-invalid="true"` on control
- 메시지: `mp-error`

**Search**

```html
<span class="mp-search">
  <svg class="mp-search__icon" viewBox="0 0 16 16" aria-hidden="true">…</svg>
  <input class="mp-input" type="search" placeholder="Find trace, gate, relic..." />
</span>
```

검색 아이콘은 inline SVG. emoji / icon font 사용 금지 (skill 준수).

**Toggle**

```html
<label class="mp-toggle">
  <input type="checkbox" />
  <span class="mp-toggle__track" aria-hidden="true"></span>
  Show verified path only
</label>
```

## 4. Navigation & structure

### 4.1 Link list

**Root:** `ul.mp-link-list`

| Modifier | Class |
| --- | --- |
| dense | `mp-link-list--dense` |
| quiet | `mp-link-list--quiet` |

| Element | Class |
| --- | --- |
| icon/index | `mp-link-list__icon` |
| meta | `mp-link-list__meta` |

```html
<ul class="mp-link-list mp-link-list--dense">
  <li>
    <a href="#">
      <span class="mp-link-list__icon">TR</span>
      Observe Input
      <span class="mp-link-list__meta">verified</span>
    </a>
  </li>
</ul>
```

### 4.2 Tabs

쇼케이스 기준 골격 (프레임워크 primitive 사용 시 동일 class 매핑):

| Element | Class |
| --- | --- |
| root | `mp-tabs` |
| tab | `mp-tabs__tab` |
| panel | `mp-tabs__panel` |

**A11y**

- 선택된 탭: `aria-selected="true"`, 나머지 `false`
- 탭 활성화는 클릭/키보드 (라이브러리 구현 시 arrow key 권장)

**Panel content hooks (showcase data attributes — optional for lib)**

- `data-tab-eyebrow`, `data-tab-title`, `data-tab-body` on tab
- panel 내부: `data-tab-panel-eyebrow`, `data-tab-panel-title`, `data-tab-panel-body`

라이브러리 API는 data attribute 대신 props를 써도 되나, **렌더 결과 class/aria는 유지**한다.

### 4.3 Sidebar

관련 클래스: `mp-sidebar*` (구현 파일 `sidebar.css`).

규칙:

- 현재 항목만 accent/selected wash
- 나머지는 muted text + interactive surface
- 앱 셸 너비 토큰/레이아웃은 concept 기준 sidebar ≈ 240px

### 4.4 Icon

**Root:** `span.mp-icon` (또는 inline SVG with currentColor)

- decorative: `aria-hidden="true"`
- 의미 있는 아이콘: 인접 텍스트 또는 `aria-label`

## 5. Data & workflow surfaces

### 5.1 Table

| Element | Class |
| --- | --- |
| table | `mp-table` |
| toolbar | `mp-table-toolbar` |
| toolbar title | `mp-table-toolbar__title` |
| toolbar meta | `mp-table-toolbar__meta` |
| mono cell | `mp-table__mono` |
| primary cell text | `mp-table__primary` |
| muted | `mp-table__muted` |
| action cell | `mp-table__action-cell` |
| actions cluster | `mp-table__actions` |

| Modifier | Class |
| --- | --- |
| dense | `mp-table--dense` |
| sticky header | `mp-table--sticky` |

**골격**

```html
<div class="table-shell">
  <div class="mp-table-toolbar">…</div>
  <div class="table-scroll">
    <table class="mp-table mp-table--dense mp-table--sticky">
      <thead>…</thead>
      <tbody>…</tbody>
    </table>
  </div>
</div>
```

참고: `table-shell`, `table-scroll`은 현재 쇼케이스 유틸에 가깝다.  
라이브러리화 시 `mp-table-shell` / `mp-table-scroll`로 승격할지 Phase 3에서 결정한다. (승격 전엔 문서상 transitional)

### 5.2 Timeline / Trace panel

**Timeline**

| Element | Class |
| --- | --- |
| list | `mp-timeline` |
| item | `mp-timeline__item` |
| active item | `mp-timeline__item--active` |
| header | `mp-timeline__header` |
| step | `mp-timeline__step` |
| time | `mp-timeline__time` |
| title | `mp-timeline__title` |
| meta | `mp-timeline__meta` |

**Compact trace panel**

| Element | Class |
| --- | --- |
| root | `trace-panel` → 향후 `mp-trace-panel` 승격 후보 |
| item | `trace-panel__item` |
| active | `trace-panel__item--active` |
| index | `trace-panel__index` |
| body | `trace-panel__body` |
| title | `trace-panel__title` |
| meta | `trace-panel__meta` |

> `trace-panel*` 는 현재 접두사 비일관. 라이브러리 Phase 3에서 `mp-trace-panel*` 로 정규화하는 것을 권장 (ADR-010 minor 후보, 사전 공지).

### 5.3 Inspector

| Element | Class (current) |
| --- | --- |
| demo shell | `inspector-demo` |
| object row | `inspector-object` |
| selected | `inspector-object--selected` |
| title | `inspector-object__title` |
| meta | `inspector-object__meta` |

Inspector 패널 본문은 `inspector.css`의 panel section 클래스를 따른다.  
Phase 3에서 `mp-inspector*` 로 정규화 검토.

**UX 규칙 (concept)**

- 분석 도구에서는 모달보다 우측 inspector 우선
- 섹션: Overview, Metadata, Status, Relations, Trace, Actions

### 5.4 Command input

| Element | Class |
| --- | --- |
| input | `mp-command` |
| suggestion active | `is-active` on suggestion control |

쇼케이스 behavior (라이브러리 재구현 스펙):

- suggestion 클릭 → input value 채움 + focus
- Enter → 실행 콜백 / 결과 영역 갱신
- keyboard-first

권장 골격은 `command.css`와 showcase 마크업을 따른다.  
프레임워크 API 예:

```ts
type CommandProps = {
  value: string
  onValueChange: (value: string) => void
  onSubmit: (value: string) => void
  suggestions?: { id: string; value: string; label: string }[]
}
```

### 5.5 Graph (visual contract only)

**상태 의미 (프로덕션 라이브러리도 동일 의미 유지)**

| State | Class / intent |
| --- | --- |
| node default | `mp-graph__node` |
| selected | `mp-graph__node--selected` |
| verified | `mp-graph__node--verified` |
| risk | `mp-graph__node--risk` |
| edge | `mp-graph__edge` |
| edge selected | `mp-graph__edge--selected` |
| edge muted | `mp-graph__edge--muted` |
| edge risk | `mp-graph__edge--risk` |

**규칙**

- accent scale = selected / trusted path emphasis
- red = risk path
- green = verified
- 엣지는 노드 경계에 연결 (중심 관통 지양)

좌표·drag 구현은 계약 밖 (ADR-008).

## 6. Domain convenience components (library-level)

CSS 계약 위의 편의 API. 렌더 결과는 §3–5 계약을 만족해야 한다.

| Component | 최소 props (초안) | 렌더 기반 |
| --- | --- | --- |
| `OracleCard` | title, confidence, summary, evidenceCount | `mp-card--oracle` |
| `TraceCard` | traceId, status, source, timestamp | `mp-card--trace` |
| `GateCard` | subject, permission, object, decision, path, reason | `mp-card--gate` |
| `RelicCard` | title, type, stability, lastVerified | `mp-card--relic` |

decision 표시값 예: `Granted` | `Denied` | `Partial` | `Unknown` | `Requires Approval`

## 7. Framework mapping notes

### React

- props: `variant`, `size`, `className`, native attr spread
- compound: `Card.Header` 등
- toast: `AlertProvider` + portal → `mp-toast-region--*`

### Svelte

- props: `variant`, `size`, `class`
- snippets/slots로 header/body/actions
- 동일 `mp-*` 문자열 출력

### Shared invariant

```text
same visual = same classes (+ same essential DOM roles)
```

## 8. Transitional class debt

라이브러리 작업 전 정리 후보 (breaking 최소화 위해 rename 시 별도 minor + 문서):

| Current | Issue | Proposal |
| --- | --- | --- |
| `field-group`, `form-grid` | `mp-` 접두 없음 | `mp-field`, `mp-form-grid` 검토 |
| `table-shell`, `table-scroll` | showcase utility | `mp-table-shell`, `mp-table-scroll` |
| `trace-panel*` | 접두 불일치 | `mp-trace-panel*` |
| `inspector-*` demo classes | 접두 불일치 | `mp-inspector*` |
| `graph-inspector*` | 반쯤 도메인 | `mp-graph-inspector*` 또는 inspector 통합 |

Phase 0에서는 **문서화만** 하고, rename은 CSS 패키지 정리 스프린트에서 수행한다.

## 9. Change control

계약 변경 절차:

1. 이 문서 수정 PR
2. CSS 구현 수정
3. showcase 마크업 동기화
4. React/Svelte 래퍼 동기화
5. skill 필요 시 갱신
6. CHANGELOG에 contract 섹션 기록

공개 `mp-*` 의미 변경은 ADR-010에 따라 major로 취급한다.

## 10. Checklist for new components

- [ ] CSS 파일 `packages/css` 또는 `src/styles/components`
- [ ] `mp-*` 네이밍
- [ ] 이 문서에 DOM/class 표 추가
- [ ] showcase 현실적 예시
- [ ] a11y 기본 (role, label, keyboard if interactive)
- [ ] concept tone / accent signal + stroke-less surface discipline
- [ ] 프레임워크 래퍼 (해당 Phase)

## 11. 요약

```text
Contract = tokens + mp-* + essential DOM + aria rules
Library  = typed API that always emits the contract
Showcase = living example of the contract
```
