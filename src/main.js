import './style.css'
import { setupAlertDemo } from './alert.js'

document.querySelector('#app').innerHTML = `
<main class="showcase">
  <section class="showcase-hero">
    <div class="showcase-hero__mark" aria-hidden="true">
      <span>MERAK</span>
    </div>
    <div class="showcase-hero__content">
      <p class="eyebrow">Design System / Component Examples</p>
      <h1>Merak Protocol</h1>
      <p>
        Traceable interface primitives for verification, permission gates,
        archive records, and agent workflows.
      </p>
      <div class="button-row">
        <button type="button" class="mp-button mp-button--primary">Run Trace</button>
        <button type="button" class="mp-button mp-button--secondary">View Record</button>
      </div>
    </div>
  </section>

  <section class="showcase-section" aria-labelledby="button-title">
    <div class="section-heading">
      <p class="eyebrow">Component 01</p>
      <h2 id="button-title">Button</h2>
      <p>Primary, secondary, ghost, danger, disabled, compact, and icon actions.</p>
    </div>

    <div class="example-grid example-grid--wide">
      <article class="mp-card">
        <div class="mp-card__header">
          <div>
            <p class="mp-card__eyebrow">Variants</p>
            <h3 class="mp-card__title">Action Buttons</h3>
          </div>
        </div>
        <div class="button-stack">
          <div class="button-row">
            <button type="button" class="mp-button mp-button--primary">Primary Action</button>
            <button type="button" class="mp-button mp-button--secondary">Secondary Action</button>
            <button type="button" class="mp-button mp-button--ghost">Ghost Action</button>
          </div>
          <div class="button-row">
            <button type="button" class="mp-button mp-button--danger">Revoke Access</button>
            <button type="button" class="mp-button mp-button--secondary" disabled>Disabled</button>
            <button type="button" class="mp-button mp-button--primary mp-button--sm">Compact</button>
          </div>
        </div>
      </article>

      <article class="mp-card">
        <div class="mp-card__header">
          <div>
            <p class="mp-card__eyebrow">Icon</p>
            <h3 class="mp-card__title">Square Actions</h3>
          </div>
        </div>
        <div class="button-row">
          <button type="button" class="mp-button mp-button--icon" aria-label="Search">⌕</button>
          <button type="button" class="mp-button mp-button--icon" aria-label="Add">+</button>
          <button type="button" class="mp-button mp-button--icon" aria-label="Filter">≡</button>
          <button type="button" class="mp-button mp-button--icon mp-button--danger" aria-label="Delete">×</button>
        </div>
      </article>
    </div>
  </section>

  <section class="showcase-section" aria-labelledby="card-title">
    <div class="section-heading">
      <p class="eyebrow">Component 02</p>
      <h2 id="card-title">Card</h2>
      <p>Base cards plus oracle, trace, gate, and relic examples.</p>
    </div>

    <div class="example-grid">
      <article class="mp-card mp-card--oracle">
        <div class="mp-card__header">
          <span class="mp-icon" aria-hidden="true">◇</span>
          <div>
            <p class="mp-card__eyebrow">Oracle Card</p>
            <h3 class="mp-card__title">Source confidence: partial.</h3>
          </div>
        </div>
        <p class="mp-card__body">
          Judgment can proceed, but two sources require manual review.
        </p>
        <div class="mp-card__meta">
          <span>Confidence 72%</span>
          <span>Evidence 8</span>
        </div>
        <div class="mp-card__actions">
          <button type="button" class="mp-button mp-button--secondary mp-button--sm">Inspect</button>
        </div>
      </article>

      <article class="mp-card mp-card--trace">
        <div class="mp-card__header">
          <span class="mp-icon" aria-hidden="true">⌁</span>
          <div>
            <p class="mp-card__eyebrow">Trace Card</p>
            <h3 class="mp-card__title">TRC-0428 verified.</h3>
          </div>
        </div>
        <p class="mp-card__body">
          Event path links input, retrieval, policy check, and archive seal.
        </p>
        <div class="mp-card__meta">
          <span>2026-07-09</span>
          <span>4 records</span>
        </div>
        <div class="mp-card__actions">
          <button type="button" class="mp-button mp-button--ghost mp-button--sm">Open Trace</button>
        </div>
      </article>

      <article class="mp-card mp-card--gate">
        <div class="mp-card__header">
          <span class="mp-icon" aria-hidden="true">□</span>
          <div>
            <p class="mp-card__eyebrow">Gate Card</p>
            <h3 class="mp-card__title">Access granted.</h3>
          </div>
        </div>
        <p class="mp-card__body">
          Subject has read permission through project membership.
        </p>
        <div class="mp-card__meta">
          <span>user:alice</span>
          <span>document:alpha</span>
        </div>
        <div class="mp-card__actions">
          <button type="button" class="mp-button mp-button--secondary mp-button--sm">View Path</button>
        </div>
      </article>

      <article class="mp-card mp-card--relic">
        <div class="mp-card__header">
          <span class="mp-icon" aria-hidden="true">▣</span>
          <div>
            <p class="mp-card__eyebrow">Relic Card</p>
            <h3 class="mp-card__title">Record sealed.</h3>
          </div>
        </div>
        <p class="mp-card__body">
          Archived design decision with stable references and linked traces.
        </p>
        <div class="mp-card__meta">
          <span>Stability high</span>
          <span>Owner system</span>
        </div>
        <div class="mp-card__actions">
          <button type="button" class="mp-button mp-button--ghost mp-button--sm">View Record</button>
        </div>
      </article>
    </div>
  </section>

  <section class="showcase-section" aria-labelledby="link-list-title">
    <div class="section-heading">
      <p class="eyebrow">Component 03</p>
      <h2 id="link-list-title">Link List</h2>
      <p>Navigation lists for docs, traces, resources, and compact records.</p>
    </div>

    <div class="example-grid">
      <article class="mp-card">
        <div class="mp-card__header">
          <span class="mp-icon" aria-hidden="true">≋</span>
          <div>
            <p class="mp-card__eyebrow">Default</p>
            <h3 class="mp-card__title">Foundation</h3>
          </div>
        </div>
        <ul class="mp-link-list">
          <li><a href="#button-title"><span class="mp-link-list__icon">01</span> Buttons</a></li>
          <li><a href="#card-title"><span class="mp-link-list__icon">02</span> Cards</a></li>
          <li><a href="#link-list-title"><span class="mp-link-list__icon">03</span> Link Lists</a></li>
        </ul>
      </article>

      <article class="mp-card">
        <div class="mp-card__header">
          <span class="mp-icon" aria-hidden="true">⌖</span>
          <div>
            <p class="mp-card__eyebrow">Dense</p>
            <h3 class="mp-card__title">Trace Index</h3>
          </div>
        </div>
        <ul class="mp-link-list mp-link-list--dense">
          <li><a href="#"><span class="mp-link-list__icon">TR</span> Observe Input <span class="mp-link-list__meta">verified</span></a></li>
          <li><a href="#"><span class="mp-link-list__icon">EV</span> Evaluate Risk <span class="mp-link-list__meta">partial</span></a></li>
          <li><a href="#"><span class="mp-link-list__icon">AR</span> Archive Result <span class="mp-link-list__meta">sealed</span></a></li>
        </ul>
      </article>

      <article class="mp-card">
        <div class="mp-card__header">
          <span class="mp-icon" aria-hidden="true">◌</span>
          <div>
            <p class="mp-card__eyebrow">Quiet</p>
            <h3 class="mp-card__title">Resources</h3>
          </div>
        </div>
        <ul class="mp-link-list mp-link-list--quiet">
          <li><a href="#">Color Tokens <span class="mp-link-list__meta">12</span></a></li>
          <li><a href="#">Typography Tokens <span class="mp-link-list__meta">6</span></a></li>
          <li><a href="#">Surface Rules <span class="mp-link-list__meta">4</span></a></li>
        </ul>
      </article>
    </div>
  </section>

  <section class="showcase-section" aria-labelledby="badge-title">
    <div class="section-heading">
      <p class="eyebrow">Component 04</p>
      <h2 id="badge-title">Badge</h2>
      <p>Small dry labels for status, risk, type, and compact metadata.</p>
    </div>

    <div class="example-grid">
      <article class="mp-card">
        <div class="mp-card__header">
          <span class="mp-icon" aria-hidden="true">●</span>
          <div>
            <p class="mp-card__eyebrow">Status</p>
            <h3 class="mp-card__title">Operational State</h3>
          </div>
        </div>
        <div class="badge-row">
          <span class="mp-badge mp-badge--active">ACTIVE</span>
          <span class="mp-badge mp-badge--pending">PENDING</span>
          <span class="mp-badge mp-badge--inactive">INACTIVE</span>
          <span class="mp-badge mp-badge--error">ERROR</span>
          <span class="mp-badge mp-badge--sealed">SEALED</span>
          <span class="mp-badge mp-badge--partial">PARTIAL</span>
          <span class="mp-badge mp-badge--verified">VERIFIED</span>
        </div>
      </article>

      <article class="mp-card">
        <div class="mp-card__header">
          <span class="mp-icon" aria-hidden="true">!</span>
          <div>
            <p class="mp-card__eyebrow">Risk</p>
            <h3 class="mp-card__title">Evaluation Level</h3>
          </div>
        </div>
        <div class="badge-row">
          <span class="mp-badge mp-badge--low">LOW</span>
          <span class="mp-badge mp-badge--medium">MEDIUM</span>
          <span class="mp-badge mp-badge--high">HIGH</span>
          <span class="mp-badge mp-badge--critical">CRITICAL</span>
        </div>
      </article>

      <article class="mp-card">
        <div class="mp-card__header">
          <span class="mp-icon" aria-hidden="true">#</span>
          <div>
            <p class="mp-card__eyebrow">Type</p>
            <h3 class="mp-card__title">Record Category</h3>
          </div>
        </div>
        <div class="badge-row">
          <span class="mp-badge mp-badge--type">USER</span>
          <span class="mp-badge mp-badge--type">SYSTEM</span>
          <span class="mp-badge mp-badge--type">AGENT</span>
          <span class="mp-badge mp-badge--type">RESOURCE</span>
          <span class="mp-badge mp-badge--type">POLICY</span>
          <span class="mp-badge mp-badge--type">TRACE</span>
          <span class="mp-badge mp-badge--type">ARCHIVE</span>
        </div>
      </article>

      <article class="mp-card mp-card--trace">
        <div class="mp-card__header">
          <span class="mp-icon" aria-hidden="true">⌁</span>
          <div>
            <p class="mp-card__eyebrow">Inline Usage</p>
            <h3 class="mp-card__title">Trace record summary</h3>
          </div>
        </div>
        <p class="mp-card__body">
          Badges should stay compact and read like system labels, not decorative pills.
        </p>
        <div class="badge-row">
          <span class="mp-badge mp-badge--verified mp-badge--sm">VERIFIED</span>
          <span class="mp-badge mp-badge--type mp-badge--sm">TRACE</span>
          <span class="mp-badge mp-badge--medium mp-badge--sm">MEDIUM</span>
        </div>
      </article>
    </div>
  </section>

  <section class="showcase-section" aria-labelledby="input-title">
    <div class="section-heading">
      <p class="eyebrow">Component 05</p>
      <h2 id="input-title">Input</h2>
      <p>Text fields, textarea, select, checkbox, radio, toggle, search, and command input.</p>
    </div>

    <div class="example-grid example-grid--wide">
      <article class="mp-card">
        <div class="mp-card__header">
          <span class="mp-icon" aria-hidden="true">⌨</span>
          <div>
            <p class="mp-card__eyebrow">Fields</p>
            <h3 class="mp-card__title">Text Entry</h3>
          </div>
        </div>
        <div class="form-grid form-grid--two">
          <label class="field-group">
            <span class="mp-label">Trace ID</span>
            <input class="mp-input" type="text" placeholder="TRC-0428" value="TRC-0428">
            <span class="mp-help">Stable identifier for a trace record.</span>
          </label>
          <label class="field-group">
            <span class="mp-label">Disabled</span>
            <input class="mp-input" type="text" value="Record sealed" disabled>
            <span class="mp-help">Locked by archive state.</span>
          </label>
          <label class="field-group">
            <span class="mp-label">Policy Key</span>
            <input class="mp-input" type="text" value="gate:read:archive" aria-invalid="true">
            <span class="mp-error">Policy path is unresolved.</span>
          </label>
          <label class="field-group">
            <span class="mp-label">Source Type</span>
            <select class="mp-select">
              <option>Trace</option>
              <option>Policy</option>
              <option>Archive</option>
              <option>Agent</option>
            </select>
            <span class="mp-help">Used for classification.</span>
          </label>
        </div>
      </article>

      <article class="mp-card">
        <div class="mp-card__header">
          <span class="mp-icon" aria-hidden="true">⌕</span>
          <div>
            <p class="mp-card__eyebrow">Search</p>
            <h3 class="mp-card__title">Lookup</h3>
          </div>
        </div>
        <label class="field-group">
          <span class="mp-label">Search Records</span>
          <span class="mp-search">
            <svg class="mp-search__icon" viewBox="0 0 16 16" aria-hidden="true">
              <circle cx="7" cy="7" r="4.25"></circle>
              <path d="m10.25 10.25 3 3"></path>
            </svg>
            <input class="mp-input" type="search" placeholder="Find trace, gate, relic...">
          </span>
          <span class="mp-help">Search should feel quiet and keyboard-first.</span>
        </label>
      </article>
    </div>

    <div class="example-grid">
      <article class="mp-card">
        <div class="mp-card__header">
          <span class="mp-icon" aria-hidden="true">¶</span>
          <div>
            <p class="mp-card__eyebrow">Textarea</p>
            <h3 class="mp-card__title">Evidence Note</h3>
          </div>
        </div>
        <label class="field-group">
          <span class="mp-label">Summary</span>
          <textarea class="mp-textarea" placeholder="Describe the evidence path.">No oracle without trace. Two records support the current decision.</textarea>
          <span class="mp-help">Keep copy short and judgment-oriented.</span>
        </label>
      </article>

      <article class="mp-card">
        <div class="mp-card__header">
          <span class="mp-icon" aria-hidden="true">✓</span>
          <div>
            <p class="mp-card__eyebrow">Choices</p>
            <h3 class="mp-card__title">Checks and Radios</h3>
          </div>
        </div>
        <div class="form-grid">
          <div class="field-group">
            <span class="mp-label">Flags</span>
            <div class="field-row">
              <label class="mp-choice"><input class="mp-checkbox" type="checkbox" checked> Verified</label>
              <label class="mp-choice"><input class="mp-checkbox" type="checkbox"> Requires review</label>
            </div>
          </div>
          <div class="field-group">
            <span class="mp-label">Decision</span>
            <div class="field-row">
              <label class="mp-choice"><input class="mp-radio" type="radio" name="decision" checked> Granted</label>
              <label class="mp-choice"><input class="mp-radio" type="radio" name="decision"> Denied</label>
            </div>
          </div>
        </div>
      </article>

      <article class="mp-card">
        <div class="mp-card__header">
          <span class="mp-icon" aria-hidden="true">⎇</span>
          <div>
            <p class="mp-card__eyebrow">Toggle</p>
            <h3 class="mp-card__title">Execution Options</h3>
          </div>
        </div>
        <div class="form-grid">
          <label class="mp-toggle">
            <input type="checkbox" checked>
            <span class="mp-toggle__track" aria-hidden="true"></span>
            Show verified path only
          </label>
          <label class="mp-toggle">
            <input type="checkbox">
            <span class="mp-toggle__track" aria-hidden="true"></span>
            Require manual approval
          </label>
        </div>
      </article>

      <article class="mp-card mp-card--trace">
        <div class="mp-card__header">
          <span class="mp-icon" aria-hidden="true">&gt;</span>
          <div>
            <p class="mp-card__eyebrow">Command</p>
            <h3 class="mp-card__title">Agent Input</h3>
          </div>
        </div>
        <label class="field-group">
          <span class="mp-label">Command</span>
          <span class="mp-command-shell">
            <span class="mp-command-prefix">&gt;</span>
            <input class="mp-command" type="text" value="analyze auth graph for user:alice">
          </span>
          <span class="mp-help">Designed for agent actions, search, and command palettes.</span>
        </label>
      </article>
    </div>
  </section>

  <section class="showcase-section" aria-labelledby="alert-title">
    <div class="section-heading">
      <p class="eyebrow">Component 06</p>
      <h2 id="alert-title">Alert</h2>
      <p>Short system messages for information, success, warning, and error states.</p>
    </div>

    <div class="example-grid example-grid--wide">
      <article class="mp-card">
        <div class="mp-card__header">
          <span class="mp-icon" aria-hidden="true">i</span>
          <div>
            <p class="mp-card__eyebrow">Variants</p>
            <h3 class="mp-card__title">System Alerts</h3>
          </div>
        </div>
        <div class="alert-stack">
          <div class="mp-alert mp-alert--info" role="status">
            <span class="mp-alert__icon" aria-hidden="true">i</span>
            <div class="mp-alert__content">
              <strong class="mp-alert__title">Trace analysis running.</strong>
              <p class="mp-alert__message">Observation is in progress.</p>
            </div>
          </div>
          <div class="mp-alert mp-alert--success" role="status">
            <span class="mp-alert__icon" aria-hidden="true">✓</span>
            <div class="mp-alert__content">
              <strong class="mp-alert__title">Trace verified.</strong>
              <p class="mp-alert__message">Evidence path is complete.</p>
            </div>
          </div>
          <div class="mp-alert mp-alert--warning" role="status">
            <span class="mp-alert__icon" aria-hidden="true">!</span>
            <div class="mp-alert__content">
              <strong class="mp-alert__title">Source confidence is partial.</strong>
              <p class="mp-alert__message">Manual review is recommended.</p>
            </div>
          </div>
          <div class="mp-alert mp-alert--error" role="alert">
            <span class="mp-alert__icon" aria-hidden="true">×</span>
            <div class="mp-alert__content">
              <strong class="mp-alert__title">Access denied by policy.</strong>
              <p class="mp-alert__message">No permission path was found.</p>
            </div>
          </div>
        </div>
      </article>

      <article class="mp-card">
        <div class="mp-card__header">
          <span class="mp-icon" aria-hidden="true">≡</span>
          <div>
            <p class="mp-card__eyebrow">Compact</p>
            <h3 class="mp-card__title">Inline Review Queue</h3>
          </div>
        </div>
        <div class="alert-stack">
          <div class="mp-alert mp-alert--compact mp-alert--success" role="status">
            <span class="mp-alert__icon" aria-hidden="true">✓</span>
            <strong class="mp-alert__title">Record archived.</strong>
            <span class="mp-badge mp-badge--sealed mp-badge--sm">SEALED</span>
          </div>
          <div class="mp-alert mp-alert--compact mp-alert--warning" role="status">
            <span class="mp-alert__icon" aria-hidden="true">!</span>
            <strong class="mp-alert__title">Manual review required.</strong>
            <span class="mp-badge mp-badge--medium mp-badge--sm">MEDIUM</span>
          </div>
          <div class="mp-alert mp-alert--compact mp-alert--error" role="alert">
            <span class="mp-alert__icon" aria-hidden="true">×</span>
            <strong class="mp-alert__title">Path unresolved.</strong>
            <span class="mp-badge mp-badge--high mp-badge--sm">HIGH</span>
          </div>
        </div>
      </article>

      <article class="mp-card mp-card--trace">
        <div class="mp-card__header">
          <span class="mp-icon" aria-hidden="true">↥</span>
          <div>
            <p class="mp-card__eyebrow">Triggered</p>
            <h3 class="mp-card__title">Alert Runtime</h3>
          </div>
        </div>
        <p class="mp-card__body">
          The animation is CSS. The trigger uses a fixed toast region with selectable placement.
        </p>
        <label class="field-group">
          <span class="mp-label">Placement</span>
          <select id="alert-demo-placement" class="mp-select">
            <option value="top-left">Top left</option>
            <option value="top-center">Top center</option>
            <option value="top-right">Top right</option>
            <option value="center">Center</option>
            <option value="bottom-left">Bottom left</option>
            <option value="bottom-center">Bottom center</option>
            <option value="bottom-right" selected>Bottom right</option>
          </select>
        </label>
        <div class="button-row">
          <button id="alert-demo-trigger" type="button" class="mp-button mp-button--primary">
            Show Alert
          </button>
        </div>
      </article>
    </div>
  </section>
</main>
`

setupAlertDemo({
  trigger: document.querySelector('#alert-demo-trigger'),
  placement: () => document.querySelector('#alert-demo-placement')?.value,
})
