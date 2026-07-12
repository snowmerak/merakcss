# Architecture Decision Records

> Merak Protocol 컴포넌트 라이브러리 확장과 관련된 의사결정 기록.
>
> 형식: 상태 / 맥락 / 결정 / 근거 / 결과 / 대안
>
> 관련 문서: [component-library-architecture.md](./component-library-architecture.md), [component-contract.md](./component-contract.md), [concept.md](./concept.md)

---

## ADR-001: CSS를 토큰·스타일 원천으로 유지한다

| 항목 | 내용 |
| --- | --- |
| 상태 | Accepted |
| 날짜 | 2026-07-10 |
| 태그 | css, tokens, architecture |

### 맥락

디자인 시스템은 이미 CSS variables와 `mp-*` 컴포넌트 클래스로 구현되어 있다. concept는 React + Tailwind 가능성을 언급하지만, 현재 npm 배포 단위는 CSS다.

### 결정

- 토큰 source of truth는 CSS custom properties로 유지한다.
- 컴포넌트 룩앤필 source of truth는 `src/styles` (향후 `packages/css`)로 유지한다.
- React/Svelte는 스타일을 복제하지 않고 className/class로 CSS 계약을 소비한다.

### 근거

- 프레임워크 비종속 소비 경로가 이미 동작한다.
- 이중 진실(Tailwind theme vs CSS vs JS theme object)을 피한다.
- skill/agent 워크플로가 CSS 파일 단위 확장과 잘 맞는다.

### 결과

- 모든 프레임워크 패키지는 CSS 패키지에 의존한다.
- 토큰 변경은 CSS 한 곳에서 수행한다.
- Tailwind를 쓸 경우에도 vars를 참조하는 방향만 허용한다.

### 대안

- JS theme object 원천 → SSR/CSS-first와 어긋남
- Tailwind-only 재작성 → 기존 CSS 자산 폐기 비용 큼

---

## ADR-002: 프레임워크별 하위 패키지로 라이브러리화한다

| 항목 | 내용 |
| --- | --- |
| 상태 | Accepted |
| 날짜 | 2026-07-10 |
| 태그 | monorepo, packaging, react, svelte |

### 맥락

CSS만으로는 props 타입, a11y 상태 기계, toast portal, command keyboard UX를 표준화하기 어렵다. 동시에 React 사용자에게 Svelte를 peer로 강제하면 안 된다.

### 결정

monorepo 안에 다음 경계를 둔다.

```text
packages/css
packages/react   → @merak/react
packages/svelte  → @merak/svelte
packages/core    → optional shared variants
```

각 프레임워크 패키지는 해당 프레임워크를 peerDependency로 갖는다.

### 근거

- 소비자 번들에 불필요한 프레임워크가 섞이지 않는다.
- 릴리스·이슈·API 진화를 패키지 단위로 분리할 수 있다.
- CSS 원천 공유로 시각 일관성을 유지할 수 있다.

### 결과

- 워크스페이스 도구(npm/pnpm)와 패키지별 빌드가 필요하다.
- 문서에 패키지별 install 경로를 명시해야 한다.
- 초기 구현 순서는 React 우선, Svelte 후속 대칭으로 한다. (concept §12)

### 대안

- 단일 패키지 multi-export → peer 오염·번들 복잡
- CSS만 유지 → 통합 DX 부족
- Web Components only → 초기 비용 대비 이득 불명확 (ADR-007)

---

## ADR-003: 쇼케이스 vanilla JS는 공개 런타임 API가 아니다

| 항목 | 내용 |
| --- | --- |
| 상태 | Accepted |
| 날짜 | 2026-07-10 |
| 태그 | api, showcase |

### 맥락

`alert.js`, `tabs.js`, `command.js`, `graph.js`, `navigation.js`, `motion.js` 등은 데모 페이지 배선용이다. DOM 전역 가정과 일회성 선택자에 의존한다.

### 결정

- 위 모듈을 패키지 public export로 승격하지 않는다.
- 라이브러리 동작은 React/Svelte idiomatic API로 재구현한다.
- 쇼케이스 마크업은 시각·DOM 계약의 참고 구현으로만 사용한다.

### 근거

- 데모 코드를 API로 고정하면 SSR, 테스트, 트리 쉐이킹, 버전 안정성이 나빠진다.
- 프레임워크 사용자가 `setupTabs(NodeList)` 형태의 API를 원하지 않는다.

### 결과

- `package.json` `files` / `exports`에서 쇼케이스 JS를 라이브러리 API처럼 노출하지 않도록 정리한다.
- 동작 스펙(토스트 placement, 탭 aria 등)은 contract/architecture 문서에 서술한다.

### 대안

- vanilla runtime 패키지 별도 제공 → 수요 확인 후 재검토 가능

---

## ADR-004: `mp-*` 클래스와 DOM 구조가 공개 계약이다

| 항목 | 내용 |
| --- | --- |
| 상태 | Accepted |
| 날짜 | 2026-07-10 |
| 태그 | contract, css, compatibility |

### 맥락

CSS-only 사용자와 프레임워크 사용자가 공존한다. 프레임워크 래퍼가 임의 DOM을 만들면 CSS-only 예시와 시각이 어긋난다.

### 결정

- 공개 스타일 계약은 `mp-*` (및 문서화된 상태 클래스, 예: `is-active`, `is-leaving`)다.
- 프레임워크 컴포넌트는 [component-contract.md](./component-contract.md)의 DOM 골격을 따른다.
- `showcase-*`, `example-grid`, 데모 전용 레이아웃 클래스는 계약 밖이다.

### 근거

- CSS-only 경로를 깨지 않고 프레임워크를 얹을 수 있다.
- 시각 회귀를 class 단위로 추적하기 쉽다.
- agent skill이 `mp-*` 중심으로 작성되어 있다.

### 결과

- breaking change 정의: 공개 `mp-*` 제거/의미 변경, 필수 DOM 골격 변경
- 내부 유틸 class rename은 계약 밖이면 minor 가능

### 대안

- CSS Modules / hashed class only → CSS-only DX 상실
- styled-components 등 CSS-in-JS 원천 → 현재 자산과 불일치

---

## ADR-005: 앱이 CSS를 명시적으로 import한다

| 항목 | 내용 |
| --- | --- |
| 상태 | Accepted |
| 날짜 | 2026-07-10 |
| 태그 | packaging, dx, css |

### 맥락

프레임워크 entry에서 `import "@merak/css/style.css"`를 side-effect로 넣으면 설치 직후 스타일이 붙어 DX가 좋다. 반면 SSR, 중복 번들, 소비 앱의 CSS 파이프라인 제어가 어려워질 수 있다.

### 결정

초기 정책은 **옵션 A**:

```ts
import "merak-protocol-design-system/style.css"
import { Button } from "@merak/react"
```

프레임워크 패키지는 기본적으로 CSS를 자동 import하지 않는다.  
문서와 skill에 필수 한 줄을 명시한다.

### 근거

- 스타일 로드 시점·횟수를 앱이 제어한다.
- CSS-only 사용자와 동일한 진입점을 공유한다.
- 번들러/SSR 환경 차이로 인한 이슈를 줄인다.

### 결과

- README / 패키지 README에 CSS import를 설치 절차 1번으로 둔다.
- 이후 DX 수요가 크면 ` /styles` 엔트리 등 보조 경로를 추가할 수 있다.

### 대안

- B: framework entry auto-import → 재검토 조건: 반복 온보딩 실패, 지원 비용 증가

---

## ADR-006: Headless primitive를 허용하고 스타일만 Merak이 소유한다

| 항목 | 내용 |
| --- | --- |
| 상태 | Accepted |
| 날짜 | 2026-07-10 |
| 태그 | a11y, react, svelte |

### 맥락

Tabs, Dialog, Checkbox, Combobox 등의 키보드·aria 구현을 전부 자체 작성하면 비용과 결함 위험이 크다. concept도 Radix 사용을 권장한다.

### 결정

- 단순 요소(Button, Badge, Card, static Alert/Input)는 네이티브 요소 wrapper로 구현한다.
- 복잡한 a11y 위젯은 Radix(React), bits-ui(Svelte) 등 unstyled primitive 위에 `mp-*`를 얹는다.
- Table 데이터 로직은 TanStack Table, Graph는 xyflow 계열을 후속 단계에서 검토한다.

### 근거

- 접근성 검증된 동작 + Merak 시각 언어 조합이 concept 목표와 맞다.
- 디자인 시스템 핵심 역량을 “동작 재발명”이 아니라 “신뢰·추적 UI 패턴”에 둔다.

### 결과

- 프레임워크 패키지에 optional/peer 또는 direct dependency로 primitive가 추가될 수 있다.
- dependency 선택은 패키지 README에 명시한다.
- primitive DOM이 contract와 어긋나면 Slot/`asChild`/class 매핑으로 맞춘다.

### 대안

- 전부 자체 구현 → 일정·a11y 리스크
- 완전 스타일 포함 3rd party UI 키트 → Merak 정체성 상실

---

## ADR-007: Web Components는 초기 범위에서 제외한다

| 항목 | 내용 |
| --- | --- |
| 상태 | Accepted |
| 날짜 | 2026-07-10 |
| 태그 | web-components, scope |

### 맥락

Web Components는 프레임워크 무관 배포에 매력적이다. 그러나 현재 수요는 React(concept 1차)와 이후 Svelte 대칭이다.

### 결정

- Phase 1–4에서 WC 패키지를 만들지 않는다.
- 필요 시 light DOM custom elements로 재검토한다.
- Shadow DOM으로 기존 전역 CSS를 가두는 방식은 채택하지 않는다.

### 근거

- CSS class 계약이 이미 보편 계층 역할을 한다.
- WC + SSR + form + React wrapper 비용이 초기 ROI를 낮춘다.

### 결과

- universal layer는 `mp-*` CSS 계약이 담당한다.
- 다중 프레임워크는 패키지 추가로 확장한다.

---

## ADR-008: Graph 데모 SVG를 프로덕션 API로 고정하지 않는다

| 항목 | 내용 |
| --- | --- |
| 상태 | Accepted |
| 날짜 | 2026-07-10 |
| 태그 | graph, api |

### 맥락

쇼케이스 Graph View는 정적 SVG + 소형 drag 스크립트로 시각 언어를 보여 준다. 실제 권한/지식 그래프는 팬·줌·레이아웃·대량 노드가 필요하다.

### 결정

- 쇼케이스 SVG는 시각 레퍼런스다.
- 라이브러리 Graph는 별도 단계에서 xyflow 등 에디터/뷰어 위에 Merak 노드·엣지 토큰을 적용한 래퍼로 제공한다.
- 초기 공개 API 범위에서 Graph를 필수 컴포넌트로 두지 않는다.

### 근거

- 데모 구현과 프로덕션 그래프 요구사항 차이가 크다.
- 토큰·노드 상태 색(selected/verified/risk)만 먼저 고정해도 가치가 있다.

### 결과

- Phase 4 advanced로 분류한다.
- contract에는 노드 상태 클래스/색 의미만 우선 문서화한다.

---

## ADR-009: 구현 순서 — 계약 문서 → CSS 경계 → React → Svelte

| 항목 | 내용 |
| --- | --- |
| 상태 | Accepted |
| 날짜 | 2026-07-10 |
| 태그 | roadmap |

### 맥락

동시에 monorepo 이관, 전 컴포넌트 래핑, 두 프레임워크 대칭을 진행하면 계약이 흔들린다.

### 결정

1. 문서: architecture / decisions / contract  
2. `packages/css` 경계 정리 (showcase CSS 분리 검토)  
3. `@merak/react` Phase 1 (Button, Badge, Card, Alert, Input)  
4. Phase 2 복합 표면 (domain cards, Tabs, Toast)  
5. `@merak/svelte` 동일 contract 대칭  
6. Table / Command / Inspector  
7. Graph 래퍼

### 근거

- concept의 React 우선 권장과 일치한다.
- 계약이 먼저 고정되어야 두 프레임워크 드리프트를 막을 수 있다.
- CSS 경계가 불명확하면 패키지 배포물이 비대해진다.

### 결과

- Svelte 사용자는 당분간 CSS-only 또는 후속 패키지를 사용한다.
- React 패키지에서 발견한 contract 수정은 Svelte 착수 전에 반영한다.

---

## ADR-010: 버전 정책 — CSS breaking과 프레임워크 API를 구분한다

| 항목 | 내용 |
| --- | --- |
| 상태 | Accepted |
| 날짜 | 2026-07-10 |
| 태그 | versioning, semver |

### 맥락

`mp-button--primary` 의미 변경은 CSS-only 사용자와 모든 프레임워크 사용자에게 영향을 준다. React prop rename은 React 사용자에게만 영향을 준다.

### 결정

| 변경 유형 | 버전 영향 |
| --- | --- |
| 공개 `mp-*` 제거/의미 변경, 필수 DOM 골격 변경 | CSS major (연계 프레임워크 major 검토) |
| 토큰 값 미세 조정 (의도된 시각 개선) | CSS minor |
| 새 variant / 새 컴포넌트 CSS | CSS minor |
| React/Svelte prop·export 변경 | 해당 패키지 semver |
| 쇼케이스 전용 코드 | 버전 계약 없음 |

0.x 기간에는 문서에 실험적 API를 명시하고, 1.0 전에 contract를 동결하는 것을 목표로 한다.

### 근거

- 소비자 영향 범위에 맞는 버전 신호를 준다.
- CSS 계약을 함부로 깨지 않게 한다.

### 결과

- CHANGELOG에 CSS contract / framework API 섹션을 나눈다.
- skill과 contract 문서를 breaking 시 함께 갱신한다.

---

## ADR-011: shared variant map은 필요 시 core로 승격한다

| 항목 | 내용 |
| --- | --- |
| 상태 | Accepted |
| 날짜 | 2026-07-10 |
| 태그 | core, variants |

### 맥락

React와 Svelte가 각각 variant → class 문자열을 복제하면 불일치가 생긴다.

### 결정

- Phase 1에서는 패키지 내부 variant 정의로 시작한다.
- 두 번째 프레임워크 착수 시점 또는 variant 수가 늘 때 `@merak/core`로 승격한다.
- core는 런타임 프레임워크 의존을 갖지 않는다.

### 근거

- 너무 이른 추상화보다 첫 React 구현 속도가 우선이다.
- 두 소비자가 생기는 순간 공유 가치가 확실해진다.

### 결과

- core 도입 전에도 contract 문서의 class 표가 단일 진실 역할을 한다.

---

## ADR-012: 아이콘은 inline SVG / currentColor 우선

| 항목 | 내용 |
| --- | --- |
| 상태 | Accepted |
| 날짜 | 2026-07-10 |
| 태그 | icons |

### 맥락

skill은 emoji·icon font·외부 아이콘 라이브러리 남용을 경계하고, line icon + currentColor를 권장한다. concept는 Lucide를 스택 후보로 언급한다.

### 결정

- 기본: inline SVG, `currentColor`, stroke ≈ 1.5px
- 검색 등 핵심 UI 아이콘은 인라인 SVG를 우선한다.
- Lucide 등 라이브러리는 앱 또는 선택적 아이콘 패키지에서 사용 가능하나, 핵심 라이브러리 필수 의존으로 두지 않는다.

### 근거

- skill과 쇼케이스 검색 아이콘 패턴 유지
- 필수 의존 최소화

### 결과

- 컴포넌트 API는 `icon` slot/prop으로 SVG 노드를 받도록 설계한다.

---

## 결정 인덱스

| ID | 제목 | 상태 |
| --- | --- | --- |
| ADR-001 | CSS를 토큰·스타일 원천으로 유지 | Accepted |
| ADR-002 | 프레임워크별 하위 패키지 | Accepted |
| ADR-003 | 쇼케이스 vanilla JS ≠ public API | Accepted |
| ADR-004 | `mp-*` + DOM이 공개 계약 | Accepted |
| ADR-005 | 앱이 CSS 명시 import | Accepted |
| ADR-006 | Headless primitive 허용 | Accepted |
| ADR-007 | Web Components 초기 제외 | Accepted |
| ADR-008 | Graph SVG ≠ production API | Accepted |
| ADR-009 | 구현 순서 React → Svelte | Accepted |
| ADR-010 | CSS / framework 버전 구분 | Accepted |
| ADR-011 | variant core 지연 승격 | Accepted |
| ADR-012 | inline SVG 아이콘 우선 | Accepted |

---

## 변경 이력

| 날짜 | 내용 |
| --- | --- |
| 2026-07-10 | 최초 ADR-001 ~ ADR-012 작성 |
