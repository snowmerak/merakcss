# Merak Protocol Design System

## 1. Design Direction

**Merak Protocol**은 기술 신뢰성, 추적 가능성, 권한 모델, AI 에이전트 워크플로우, 지식 아카이브를 위한 개인 디자인 시스템이다.

핵심 방향은 다음과 같다.

> 파스텔 다크·stroke-less·flat 면 계층 위에, 앨리스블루 scale을 신뢰·관찰·검증·선택의 신호로 쓰는 구조적 디자인 시스템.

장식적 신화성은 전면에 내세우지 않는다.
대신 명명법, 상태 표현, 아이콘, 그래프, 카드 구조에서 은근히 드러낸다.

## 2. Visual Identity

### Keywords

* Pastel Dark Surfaces
* Stroke-less Layers
* Alice Blue Signal Scale
* Traceability
* Permission Gate
* Archive
* Oracle
* System Graph
* Dense but Calm
* Practical Mythic Terminal

### Avoid

* 과한 판타지 장식
* 금색 중심 팔레트
* 과도한 네온 블루
* 게임 UI 같은 메탈릭 질감
* openSUSE처럼 보이는 녹색 중심 체계
* 너무 밝은 일반 SaaS 템플릿 느낌
* 카드 기본 hairline stroke / 기본 drop shadow로 레이어 흉내 내기
* info용 두 번째 파란 시스템 (accent와 충돌)

## 3. Color System

**값의 source of truth는 `src/styles/tokens.css` (`--mp-*`) 하나다.**  
이 문서는 역할과 사용 규칙만 적는다. hex/rgb를 여기 복제하지 말 것.

### Surfaces

| Token | Purpose |
| --- | --- |
| `--mp-bg-canvas` | 최외곽 배경 |
| `--mp-bg-base` | 앱 기본 배경 |
| `--mp-bg-surface` | 카드/패널 |
| `--mp-bg-inset` | 입력, table shell, sunken |
| `--mp-bg-elevated` | dialog, menu, float |
| `--mp-bg-interactive` | idle control fill |
| `--mp-bg-hover` | hover |
| `--mp-bg-selected` | selected/current |

현재 방향: **brighter lavender-gray pastel dark**, stroke-less, flat.

### Dividers

| Token | Purpose |
| --- | --- |
| `--mp-line-soft` | 매우 약한 구분 |
| `--mp-line-muted` | table/header/menu split |

구조용 카드 stroke가 아니다. divider에만 제한적으로 쓴다.

### Text

| Token | Purpose |
| --- | --- |
| `--mp-text-primary` | 제목, 핵심 수치 |
| `--mp-text-secondary` | 본문 |
| `--mp-text-tertiary` | 메타 |
| `--mp-text-muted` | hint, placeholder |
| `--mp-text-disabled` | disabled |
| `--mp-text-inverse` | strong accent 위 텍스트 |

### Alice Blue Scale

Raw steps: `--mp-accent-50` … `--mp-accent-700`.

Roles:

| Token | Role |
| --- | --- |
| `--mp-accent-strong` | primary fill |
| `--mp-accent-soft` | soft companion |
| `--mp-accent` | default signal |
| `--mp-accent-line` | icon / link / focus edge |
| `--mp-accent-deep` | subdued |
| `--mp-signal-wash` | selected wash helper |
| `--mp-signal-ring` | focus ring alpha helper |

### Semantic Palette

각 상태는 `weak` / `soft` / `base` / `text` 4단.

| Family | 용도 |
| --- | --- |
| success | 허용, 검증 완료 |
| warning | 대기, 수동 검토 |
| danger | 거부, 위험 |
| neutral | 미분류, 비활성 |
| info | 관찰 (accent family — 별도 파란 시스템 금지) |

예: `--mp-success-weak`, `--mp-success-soft`, `--mp-success-base`, `--mp-success-text`.

### Palette Principle

* 구조: surface tier 대비 (stroke-less, flat)
* 선택/포커스/신뢰: Alice Blue scale
* hover: interactive/hover surface (accent 금지)
* 위험/대기/성공: pastel semantic weak/soft + text
* float only shadow (`--mp-shadow-float`)
* 넓은 accent fill 금지 (primary button·strong signal 제외)
* 값 변경 시 `tokens.css`만 수정하고 문서 hex를 다시 적지 않는다

## 4. Typography

### Font Stack

```css
font-family:
  Pretendard,
  Inter,
  "Noto Sans KR",
  system-ui,
  sans-serif;
```

### Monospace Stack

```css
font-family:
  "JetBrains Mono",
  "Geist Mono",
  "SFMono-Regular",
  Consolas,
  monospace;
```

### Text Scale

| Token          | Size | Usage           |
| -------------- | ---: | --------------- |
| `text-xs`      | 12px | metadata, label |
| `text-sm`      | 14px | body compact    |
| `text-md`      | 16px | normal body     |
| `text-lg`      | 18px | section title   |
| `text-xl`      | 24px | page title      |
| `text-display` | 32px | hero title      |

### Typography Rule

문장은 감성 카피보다 판정문처럼 쓴다.

Good:

* `Trace verified.`
* `Access granted.`
* `Source confidence: partial.`
* `No oracle without trace.`
* `권한은 선언이 아니라 경로다.`

Avoid:

* `당신의 멋진 여정을 시작하세요`
* `더 스마트한 경험을 만나보세요`
* `혁신적인 미래를 함께하세요`

## 5. Layout System

### Grid

* Base spacing: `4px`
* Common spacing: `8 / 12 / 16 / 24 / 32 / 48`
* Card padding: `16px` or `20px`
* Dashboard gap: `16px`
* Sidebar width: `240px`
* Main content max width: 상황에 따라 `1280px ~ 1440px`

### Surface Hierarchy

1. `Base` — 앱 전체 배경
2. `Subtle` — 사이드바, 큰 영역
3. `Surface` — 카드, 폼, 패널
4. `Elevated` — 모달, 팝오버
5. `Accent` — selected, focus, primary action

### Border Radius

| Token         | Value | Usage             |
| ------------- | ----: | ----------------- |
| `radius-sm`   |   4px | badge, input      |
| `radius-md`   |   8px | button, card      |
| `radius-lg`   |  12px | large card, panel |
| `radius-full` | 999px | pill, avatar      |

전체적으로 너무 둥글게 만들지 않는다.
기술 문서, 콘솔, 관리 도구에 가까운 인상을 유지한다.

## 6. Core Components

## 6.1 App Shell

### Purpose

전체 웹 앱의 기본 구조.

### Structure

* Left Sidebar
* Top Header
* Main Content Area
* Optional Right Inspector Panel

### Sidebar Sections

* Foundation
* Components
* Traces
* Gates
* Relics
* Graphs
* Settings

### Sidebar Rule

현재 선택된 항목만 accent/selected wash로 강조한다.
나머지는 muted text + interactive surface로 억제한다.

---

## 6.2 Button

### Variants

#### Primary

주요 실행.
예: 저장, 실행, 승인, 분석 시작.

* Background: `--mp-accent-strong` 계열
* Text: `--mp-text-inverse`
* Hover: slightly brighter
* Disabled: muted text/surface

#### Secondary

보조 실행.

* Transparent or surface background
* Border: gray
* Text: primary text

#### Ghost

낮은 우선순위 액션.

* No border
* Transparent
* Hover only

#### Danger

삭제, 차단, 취소, 권한 회수.

* Border or background: danger red
* 기본은 outline 권장
* destructive action은 confirmation 필요

### Example Labels

* `Run Trace`
* `Verify`
* `Grant Access`
* `Revoke`
* `Archive`
* `View Record`

---

## 6.3 Card

### Variants

#### Oracle Card

요약 판단 카드.

Usage:

* 분석 결과
* 의사결정 요약
* AI 응답 요약
* 권장 액션

Fields:

* Title
* Confidence
* Summary
* Evidence count
* Primary action

#### Trace Card

근거와 추적 경로 카드.

Usage:

* 로그
* 소스
* 이벤트 체인
* RAG citation
* 변경 이력

Fields:

* Trace ID
* Source
* Timestamp
* Status
* Linked records

#### Gate Card

권한 판정 카드.

Usage:

* 접근 허용/거부
* 권한 위임
* Zanzibar-like permission check
* policy evaluation

Fields:

* Subject
* Permission
* Object
* Decision
* Path
* Reason

#### Relic Card

아카이브된 지식 카드.

Usage:

* 문서
* 오래된 결정
* 메모리
* 캐릭터 시트
* 세계관 설정
* 기술 기록

Fields:

* Title
* Type
* Stability
* Last verified
* Related traces

---

## 6.4 Badge

### Status Badges

| Label      | Meaning |
| ---------- | ------- |
| `ACTIVE`   | 정상 작동   |
| `PENDING`  | 대기      |
| `INACTIVE` | 비활성     |
| `ERROR`    | 오류      |
| `SEALED`   | 잠금/보존   |
| `PARTIAL`  | 일부만 검증됨 |
| `VERIFIED` | 검증 완료   |

### Risk Badges

| Label      | Meaning  |
| ---------- | -------- |
| `LOW`      | 낮음       |
| `MEDIUM`   | 중간       |
| `HIGH`     | 높음       |
| `CRITICAL` | 즉시 조치 필요 |

### Type Badges

| Label      | Meaning |
| ---------- | ------- |
| `USER`     | 사용자     |
| `SYSTEM`   | 시스템     |
| `AGENT`    | AI 에이전트 |
| `RESOURCE` | 리소스     |
| `POLICY`   | 정책      |
| `TRACE`    | 근거      |
| `ARCHIVE`  | 기록      |

Badge는 작고 건조해야 한다.
화려한 pill UI보다 “상태 라벨”에 가깝게 만든다.

---

## 6.5 Input

### Components

* Text Field
* Textarea
* Select
* Checkbox
* Radio
* Toggle
* Search Input
* Command Input

### Style

* 배경: surface
* 구조 stroke 없음 (inset fill)
* focus ring: accent-line / signal-ring
* placeholder: muted text

### Special Input

#### Command Input

에이전트, 검색, 명령 실행용 입력 컴포넌트.

Example:

```text
> analyze auth graph for user:alice
```

Features:

* prefix symbol
* command suggestions
* keyboard-first navigation
* recent commands
* validation hint

---

## 6.6 Alert

### Variants

#### Info

시스템 정보, 분석 진행.

#### Success

작업 성공, 검증 완료.

#### Warning

불완전한 근거, 잠재 위험.

#### Error

실패, 차단, 권한 없음.

### Alert Rule

문장을 길게 쓰지 않는다.

Good:

* `Trace partially verified.`
* `Access denied by policy.`
* `Record archived.`
* `Source confidence is low.`

---

## 6.7 Table

### Usage

* 사용자 목록
* 권한 목록
* 이벤트 로그
* 에이전트 실행 기록
* 문서 인덱스
* 위험 항목

### Table Features

* Dense mode 기본
* Sticky header optional
* Row hover
* Status badge column
* Last updated column
* Action menu

### Recommended Columns

For logs:

* Time
* Actor
* Event
* Target
* Status
* Trace

For permissions:

* Subject
* Permission
* Object
* Decision
* Source
* Updated

For documents:

* Title
* Type
* Stability
* Confidence
* Last Verified
* Owner

---

## 6.8 Graph View

### Purpose

관계, 권한 경로, 의존성, 지식 연결을 보여준다.

### Visual Style

* Background: canvas/inset
* Nodes: neutral muted
* Selected node: accent wash/stroke
* Risk node: danger pastel
* Verified node: success pastel
* Edge: thin accent/neutral line
* Directional edge: subtle arrow

### Graph Types

* Permission Graph
* Knowledge Graph
* Agent Workflow Graph
* Dependency Graph
* Character/Lore Relationship Graph

### Interaction

* node hover
* node detail panel
* path highlight
* filter by type
* show only verified path
* show risk path

---

## 6.9 Timeline / Trace Panel

### Purpose

사건, 판단, 근거, 실행 순서를 보여준다.

### Structure

* Timestamp
* Event title
* Actor
* Source
* Status
* Evidence link

### Variants

* Vertical timeline
* Compact event list
* Execution trace
* Decision trace

### Example

```text
01 Observe Input
02 Retrieve Sources
03 Verify Path
04 Evaluate Risk
05 Execute Action
06 Archive Result
```

---

## 6.10 Inspector Panel

### Purpose

선택한 객체의 세부 정보를 보여주는 우측 패널.

### Usage

* 선택된 노드
* 선택된 권한
* 선택된 문서
* 선택된 에이전트 실행
* 선택된 캐릭터 설정

### Sections

* Overview
* Metadata
* Status
* Relations
* Trace
* Actions

Inspector는 모달보다 우선한다.
이 시스템은 분석 도구 성향이 강하므로, 화면 전환보다 “선택 후 우측에서 검사”하는 UX가 더 맞다.

---

## 7. Product Patterns

## 7.1 Verification Flow

검증 중심 플로우.

```text
Input → Trace → Evaluate → Decision → Archive
```

사용처:

* AI 응답 검증
* 문서 근거 확인
* 보안 정책 판단
* 권한 체크
* 로그 분석

## 7.2 Permission Flow

권한 판단 플로우.

```text
Subject → Permission → Object → Path → Decision
```

Decision states:

* Granted
* Denied
* Partial
* Unknown
* Requires Approval

## 7.3 Agent Flow

AI 에이전트 실행 플로우.

```text
Intent → Plan → Tool Call → Observation → Decision → Result
```

각 단계는 Trace Panel에 남아야 한다.
“신탁”은 반드시 “근거”를 가져야 한다.

## 7.4 Archive Flow

지식 저장 플로우.

```text
Capture → Classify → Link → Verify → Seal
```

사용처:

* 기술 문서
* 결정 기록
* 캐릭터 설정
* 세계관 설정
* 프로젝트 메모리

---

## 8. Iconography

### Style

* Line icon
* 1.5px stroke
* 둥근 끝은 허용
* 채워진 아이콘은 최소화
* 장식적 심볼은 핵심 영역에만 사용

### Motifs

| Motif       | Meaning    |
| ----------- | ---------- |
| Star        | 기준점, 핵심 정보 |
| Gate        | 권한, 접근     |
| Eye         | 관찰, 검증     |
| Archive Box | 기록, 보존     |
| Graph Node  | 관계, 경로     |
| Seal        | 확정, 잠금     |
| Compass     | 방향, 탐색     |
| Terminal    | 실행, 명령     |

## 9. Motion

Motion은 적게 사용한다.

Allowed:

* hover transition
* focus ring
* panel slide
* graph path highlight
* loading shimmer
* command palette open

Avoid:

* 과한 bounce
* 화려한 particle
* game-like transition
* full-screen animated ritual effect

Motion duration:

* Fast: `120ms`
* Normal: `180ms`
* Slow: `240ms`

Easing:

```css
cubic-bezier(0.2, 0, 0, 1)
```

## 10. Voice and Copy

### Tone

* 짧음
* 단정함
* 근거 중심
* 시스템 메시지처럼 보이되 너무 기계적이지 않음

### Sentence Examples

* `No oracle without trace.`
* `Trace verified.`
* `Access granted.`
* `Access denied by policy.`
* `Source confidence is partial.`
* `Record sealed.`
* `Path unresolved.`
* `Manual review required.`

### Korean Examples

* `근거가 확인되었습니다.`
* `권한 경로가 없습니다.`
* `일부 출처만 검증되었습니다.`
* `기록이 보존되었습니다.`
* `수동 검토가 필요합니다.`
* `선언이 아니라 경로를 확인합니다.`

## 11. Recommended First Components to Build

Priority 1:

1. Color Tokens
2. Typography Tokens
3. Button
4. Input
5. Badge
6. Card
7. Alert

Priority 2:

8. Table
9. Sidebar
10. Tabs
11. Command Input
12. Inspector Panel

Priority 3:

13. Trace Panel
14. Graph View
15. Timeline
16. Permission Gate Card
17. Agent Execution Panel

## 12. Implementation Target

초기 구현은 React 기준으로 한다.

Recommended stack:

* React
* TypeScript
* Tailwind CSS or CSS Variables
* Radix UI
* Lucide Icons
* TanStack Table
* React Flow
* Framer Motion optional

초기에는 Tailwind theme extension과 CSS variables를 같이 쓰는 방식이 적합하다.

Design token은 CSS variable을 원천으로 두고, Tailwind가 이를 참조하게 만든다.

## 13. System Summary

Merak Protocol은 “멋있는 다크 UI”가 아니라, 다음 목적을 가진다.

1. 정보를 조밀하게 보여준다.
2. 근거와 판단을 분리한다.
3. 권한과 경로를 시각화한다.
4. AI 에이전트의 실행 과정을 추적 가능하게 만든다.
5. 기술 문서와 창작 세계관을 같은 구조로 다룬다.
6. 앨리스블루를 신뢰와 관찰의 신호로 사용한다.

최종 인상은 다음과 같아야 한다.

> 어둡지만 침침하지 않다.
> 차갑지만 무겁지 않다.
> 신화적이지만 장식적이지 않다.
> 개발자 도구처럼 실용적이지만, 개인의 세계관이 남아 있다.
