import './style.css'
import { setupAlertDemo } from './alert.js'
import { setupGraphDrag } from './graph.js'

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

  <section class="showcase-section" aria-labelledby="table-title">
    <div class="section-heading">
      <p class="eyebrow">Component 07</p>
      <h2 id="table-title">Table</h2>
      <p>Dense records for logs, permissions, documents, statuses, risk, and actions.</p>
    </div>

    <article class="mp-card">
      <div class="mp-card__header">
        <span class="mp-icon" aria-hidden="true">▤</span>
        <div>
          <p class="mp-card__eyebrow">Dense</p>
          <h3 class="mp-card__title">Permission Evaluation Log</h3>
        </div>
      </div>
      <div class="table-shell">
        <div class="mp-table-toolbar">
          <div>
            <strong class="mp-table-toolbar__title">Latest checks</strong>
            <div class="mp-table-toolbar__meta">6 records / sticky header ready</div>
          </div>
          <div class="button-row">
            <button type="button" class="mp-button mp-button--secondary mp-button--sm">Filter</button>
            <button type="button" class="mp-button mp-button--primary mp-button--sm">Export</button>
          </div>
        </div>
        <div class="table-scroll">
          <table class="mp-table mp-table--dense mp-table--sticky">
            <caption>Permission checks</caption>
            <thead>
              <tr>
                <th scope="col">Time</th>
                <th scope="col">Subject</th>
                <th scope="col">Permission</th>
                <th scope="col">Object</th>
                <th scope="col">Decision</th>
                <th scope="col">Risk</th>
                <th scope="col">Trace</th>
                <th scope="col" class="mp-table__action-cell"><span class="mp-table__muted">Action</span></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="mp-table__mono">18:42:10</td>
                <td><span class="mp-table__primary">user:alice</span></td>
                <td>read</td>
                <td>archive:alpha</td>
                <td><span class="mp-badge mp-badge--verified mp-badge--sm">GRANTED</span></td>
                <td><span class="mp-badge mp-badge--low mp-badge--sm">LOW</span></td>
                <td class="mp-table__mono">TRC-0428</td>
                <td class="mp-table__action-cell"><span class="mp-table__actions"><button type="button" class="mp-button mp-button--ghost mp-button--sm">View</button></span></td>
              </tr>
              <tr>
                <td class="mp-table__mono">18:41:33</td>
                <td><span class="mp-table__primary">agent:scribe</span></td>
                <td>write</td>
                <td>relic:briefing</td>
                <td><span class="mp-badge mp-badge--partial mp-badge--sm">PARTIAL</span></td>
                <td><span class="mp-badge mp-badge--medium mp-badge--sm">MEDIUM</span></td>
                <td class="mp-table__mono">TRC-0427</td>
                <td class="mp-table__action-cell"><span class="mp-table__actions"><button type="button" class="mp-button mp-button--ghost mp-button--sm">View</button></span></td>
              </tr>
              <tr>
                <td class="mp-table__mono">18:39:51</td>
                <td><span class="mp-table__primary">user:guest</span></td>
                <td>delete</td>
                <td>policy:gate-03</td>
                <td><span class="mp-badge mp-badge--error mp-badge--sm">DENIED</span></td>
                <td><span class="mp-badge mp-badge--high mp-badge--sm">HIGH</span></td>
                <td class="mp-table__mono">TRC-0426</td>
                <td class="mp-table__action-cell"><span class="mp-table__actions"><button type="button" class="mp-button mp-button--ghost mp-button--sm">View</button></span></td>
              </tr>
              <tr>
                <td class="mp-table__mono">18:37:04</td>
                <td><span class="mp-table__primary">system:indexer</span></td>
                <td>seal</td>
                <td>record:decision-12</td>
                <td><span class="mp-badge mp-badge--sealed mp-badge--sm">SEALED</span></td>
                <td><span class="mp-badge mp-badge--low mp-badge--sm">LOW</span></td>
                <td class="mp-table__mono">TRC-0425</td>
                <td class="mp-table__action-cell"><span class="mp-table__actions"><button type="button" class="mp-button mp-button--ghost mp-button--sm">View</button></span></td>
              </tr>
              <tr>
                <td class="mp-table__mono">18:34:22</td>
                <td><span class="mp-table__primary">agent:oracle</span></td>
                <td>evaluate</td>
                <td>source:batch-7</td>
                <td><span class="mp-badge mp-badge--pending mp-badge--sm">PENDING</span></td>
                <td><span class="mp-badge mp-badge--medium mp-badge--sm">MEDIUM</span></td>
                <td class="mp-table__mono">TRC-0424</td>
                <td class="mp-table__action-cell"><span class="mp-table__actions"><button type="button" class="mp-button mp-button--ghost mp-button--sm">View</button></span></td>
              </tr>
              <tr>
                <td class="mp-table__mono">18:31:09</td>
                <td><span class="mp-table__primary">user:min</span></td>
                <td>read</td>
                <td>document:concept</td>
                <td><span class="mp-badge mp-badge--verified mp-badge--sm">GRANTED</span></td>
                <td><span class="mp-badge mp-badge--low mp-badge--sm">LOW</span></td>
                <td class="mp-table__mono">TRC-0423</td>
                <td class="mp-table__action-cell"><span class="mp-table__actions"><button type="button" class="mp-button mp-button--ghost mp-button--sm">View</button></span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </article>

    <div class="example-grid example-grid--wide">
      <article class="mp-card">
        <div class="mp-card__header">
          <span class="mp-icon" aria-hidden="true">≋</span>
          <div>
            <p class="mp-card__eyebrow">Documents</p>
            <h3 class="mp-card__title">Archive Index</h3>
          </div>
        </div>
        <div class="table-shell">
          <div class="table-scroll">
            <table class="mp-table mp-table--dense">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Type</th>
                  <th scope="col">Confidence</th>
                  <th scope="col">Updated</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="mp-table__primary">Design Direction</td>
                  <td><span class="mp-badge mp-badge--type mp-badge--sm">ARCHIVE</span></td>
                  <td><span class="mp-badge mp-badge--verified mp-badge--sm">VERIFIED</span></td>
                  <td class="mp-table__mono">2026-07-09</td>
                </tr>
                <tr>
                  <td class="mp-table__primary">Permission Notes</td>
                  <td><span class="mp-badge mp-badge--type mp-badge--sm">POLICY</span></td>
                  <td><span class="mp-badge mp-badge--partial mp-badge--sm">PARTIAL</span></td>
                  <td class="mp-table__mono">2026-07-08</td>
                </tr>
                <tr>
                  <td class="mp-table__primary">Agent Flow</td>
                  <td><span class="mp-badge mp-badge--type mp-badge--sm">AGENT</span></td>
                  <td><span class="mp-badge mp-badge--pending mp-badge--sm">PENDING</span></td>
                  <td class="mp-table__mono">2026-07-07</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </article>

      <article class="mp-card">
        <div class="mp-card__header">
          <span class="mp-icon" aria-hidden="true">#</span>
          <div>
            <p class="mp-card__eyebrow">Compact</p>
            <h3 class="mp-card__title">Agent Runs</h3>
          </div>
        </div>
        <div class="table-shell">
          <div class="table-scroll">
            <table class="mp-table mp-table--dense">
              <thead>
                <tr>
                  <th scope="col">Run</th>
                  <th scope="col">Status</th>
                  <th scope="col">Trace</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="mp-table__mono">RUN-190</td>
                  <td><span class="mp-badge mp-badge--active mp-badge--sm">ACTIVE</span></td>
                  <td class="mp-table__mono">6 steps</td>
                </tr>
                <tr>
                  <td class="mp-table__mono">RUN-189</td>
                  <td><span class="mp-badge mp-badge--sealed mp-badge--sm">SEALED</span></td>
                  <td class="mp-table__mono">9 steps</td>
                </tr>
                <tr>
                  <td class="mp-table__mono">RUN-188</td>
                  <td><span class="mp-badge mp-badge--error mp-badge--sm">ERROR</span></td>
                  <td class="mp-table__mono">3 steps</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </article>
    </div>
  </section>

  <section class="showcase-section" aria-labelledby="graph-title">
    <div class="section-heading">
      <p class="eyebrow">Component 08</p>
      <h2 id="graph-title">Graph View</h2>
      <p>Permission paths, knowledge links, agent workflow states, and selected node inspection.</p>
    </div>

    <article class="mp-card">
      <div class="mp-card__header">
        <span class="mp-icon" aria-hidden="true">◎</span>
        <div>
          <p class="mp-card__eyebrow">Permission Graph</p>
          <h3 class="mp-card__title">Subject → Permission → Object → Decision</h3>
        </div>
      </div>
      <div class="graph-shell">
        <div class="graph-canvas">
          <svg class="mp-graph" viewBox="0 0 760 420" role="img" aria-labelledby="permission-graph-title permission-graph-desc">
            <title id="permission-graph-title">Permission graph example</title>
            <desc id="permission-graph-desc">A user node connects through group and policy nodes to a selected archive object. A risky external policy path is shown in red.</desc>
            <defs>
              <marker id="graph-arrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="rgb(175 205 235 / 0.55)"></path>
              </marker>
              <marker id="graph-arrow-risk" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="rgb(214 107 97 / 0.8)"></path>
              </marker>
            </defs>

            <path class="mp-graph__edge mp-graph__edge--selected" data-from="user" data-to="group" marker-end="url(#graph-arrow)"></path>
            <path class="mp-graph__edge mp-graph__edge--selected" data-from="group" data-to="archive" marker-end="url(#graph-arrow)"></path>
            <path class="mp-graph__edge" data-from="user" data-to="policy" marker-end="url(#graph-arrow)"></path>
            <path class="mp-graph__edge mp-graph__edge--muted" data-from="policy" data-to="trace" marker-end="url(#graph-arrow)"></path>
            <path class="mp-graph__edge mp-graph__edge--risk" data-from="group" data-to="external" data-curve="arc-up" marker-end="url(#graph-arrow-risk)"></path>
            <path class="mp-graph__edge mp-graph__edge--muted" data-from="trace" data-to="archive" marker-end="url(#graph-arrow)"></path>

            <g class="mp-graph__node mp-graph__node--verified" data-node-id="user" transform="translate(92 216)" tabindex="0">
              <circle r="54"></circle>
              <text y="-4">USER</text>
              <text y="12">alice</text>
            </g>
            <g class="mp-graph__node mp-graph__node--verified" data-node-id="group" transform="translate(362 148)" tabindex="0">
              <rect x="-48" y="-30" width="96" height="60" rx="8"></rect>
              <text y="-4">GROUP</text>
              <text y="12">editors</text>
            </g>
            <g class="mp-graph__node mp-graph__node--selected" data-node-id="archive" transform="translate(614 216)" tabindex="0">
              <circle r="58"></circle>
              <text y="-4">ARCHIVE</text>
              <text y="12">alpha</text>
            </g>
            <g class="mp-graph__node" data-node-id="policy" transform="translate(376 286)" tabindex="0">
              <rect x="-54" y="-30" width="108" height="60" rx="8"></rect>
              <text y="-4">POLICY</text>
              <text y="12">read-path</text>
            </g>
            <g class="mp-graph__node mp-graph__node--risk" data-node-id="external" transform="translate(514 92)" tabindex="0">
              <rect x="-54" y="-28" width="108" height="56" rx="8"></rect>
              <text y="-4">POLICY</text>
              <text y="12">external</text>
            </g>
            <g class="mp-graph__node" data-node-id="trace" transform="translate(614 340)" tabindex="0">
              <circle r="38"></circle>
              <text y="-4">TRACE</text>
              <text y="12">0428</text>
            </g>
          </svg>
        </div>

        <aside class="graph-inspector" aria-label="Selected graph node">
          <div class="graph-inspector__section">
            <span class="graph-inspector__label">Selected Node</span>
            <strong class="graph-inspector__value">archive:alpha</strong>
            <div class="badge-row">
              <span class="mp-badge mp-badge--verified mp-badge--sm">VERIFIED</span>
              <span class="mp-badge mp-badge--type mp-badge--sm">RESOURCE</span>
            </div>
          </div>
          <div class="graph-inspector__section">
            <span class="graph-inspector__label">Decision</span>
            <span class="graph-inspector__value">Access granted.</span>
          </div>
          <div class="graph-inspector__section">
            <span class="graph-inspector__label">Path</span>
            <span class="mp-table__mono">user:alice → group:editors → archive:alpha</span>
          </div>
          <div class="graph-inspector__section">
            <span class="graph-inspector__label">Legend</span>
            <div class="graph-legend">
              <span class="graph-legend__item"><span class="graph-legend__swatch graph-legend__swatch--selected"></span>selected</span>
              <span class="graph-legend__item"><span class="graph-legend__swatch graph-legend__swatch--verified"></span>verified</span>
              <span class="graph-legend__item"><span class="graph-legend__swatch graph-legend__swatch--risk"></span>risk</span>
            </div>
          </div>
          <div class="button-row">
            <button type="button" class="mp-button mp-button--secondary mp-button--sm">Show Verified Path</button>
            <button type="button" class="mp-button mp-button--ghost mp-button--sm">Inspect Trace</button>
          </div>
        </aside>
      </div>
    </article>
  </section>

  <section class="showcase-section" aria-labelledby="timeline-title">
    <div class="section-heading">
      <p class="eyebrow">Component 09</p>
      <h2 id="timeline-title">Timeline / Trace Panel</h2>
      <p>Decision traces, execution order, evidence links, actors, sources, and compact run steps.</p>
    </div>

    <div class="trace-layout">
      <article class="mp-card">
        <div class="mp-card__header">
          <span class="mp-icon" aria-hidden="true">↧</span>
          <div>
            <p class="mp-card__eyebrow">Vertical Timeline</p>
            <h3 class="mp-card__title">Verification Flow</h3>
          </div>
        </div>
        <ol class="mp-timeline">
          <li class="mp-timeline__item">
            <div class="mp-timeline__header">
              <span class="mp-timeline__step">01 Observe Input</span>
              <time class="mp-timeline__time">18:42:10</time>
            </div>
            <strong class="mp-timeline__title">Command received.</strong>
            <p class="mp-card__body">Analyze auth graph for user:alice and locate verified access path.</p>
            <div class="mp-timeline__meta">
              <span>actor:user:alice</span>
              <span>source:command</span>
              <span>trace:TRC-0428</span>
            </div>
          </li>
          <li class="mp-timeline__item">
            <div class="mp-timeline__header">
              <span class="mp-timeline__step">02 Retrieve Sources</span>
              <time class="mp-timeline__time">18:42:12</time>
            </div>
            <strong class="mp-timeline__title">Policy and archive records loaded.</strong>
            <p class="mp-card__body">Three related policies and two archive records were linked to the request.</p>
            <div class="badge-row">
              <span class="mp-badge mp-badge--type mp-badge--sm">POLICY</span>
              <span class="mp-badge mp-badge--type mp-badge--sm">ARCHIVE</span>
            </div>
          </li>
          <li class="mp-timeline__item mp-timeline__item--active">
            <div class="mp-timeline__header">
              <span class="mp-timeline__step">03 Verify Path</span>
              <time class="mp-timeline__time">18:42:15</time>
            </div>
            <strong class="mp-timeline__title">Path verified.</strong>
            <p class="mp-card__body">user:alice inherits read permission through group:editors.</p>
            <div class="badge-row">
              <span class="mp-badge mp-badge--verified mp-badge--sm">VERIFIED</span>
              <span class="mp-badge mp-badge--low mp-badge--sm">LOW</span>
            </div>
          </li>
          <li class="mp-timeline__item">
            <div class="mp-timeline__header">
              <span class="mp-timeline__step">04 Archive Result</span>
              <time class="mp-timeline__time">18:42:18</time>
            </div>
            <strong class="mp-timeline__title">Record sealed.</strong>
            <p class="mp-card__body">Decision and evidence were preserved for later inspection.</p>
            <div class="badge-row">
              <span class="mp-badge mp-badge--sealed mp-badge--sm">SEALED</span>
            </div>
          </li>
        </ol>
      </article>

      <article class="mp-card">
        <div class="mp-card__header">
          <span class="mp-icon" aria-hidden="true">≡</span>
          <div>
            <p class="mp-card__eyebrow">Compact Trace</p>
            <h3 class="mp-card__title">Agent Execution</h3>
          </div>
        </div>
        <div class="trace-panel">
          <div class="trace-panel__item">
            <span class="trace-panel__index">01</span>
            <div class="trace-panel__body">
              <strong class="trace-panel__title">Intent parsed</strong>
              <div class="trace-panel__meta">source:command</div>
            </div>
            <span class="mp-badge mp-badge--verified mp-badge--sm">OK</span>
          </div>
          <div class="trace-panel__item">
            <span class="trace-panel__index">02</span>
            <div class="trace-panel__body">
              <strong class="trace-panel__title">Plan generated</strong>
              <div class="trace-panel__meta">steps:4</div>
            </div>
            <span class="mp-badge mp-badge--verified mp-badge--sm">OK</span>
          </div>
          <div class="trace-panel__item trace-panel__item--active">
            <span class="trace-panel__index">03</span>
            <div class="trace-panel__body">
              <strong class="trace-panel__title">Tool observation linked</strong>
              <div class="trace-panel__meta">records:5</div>
            </div>
            <span class="mp-badge mp-badge--partial mp-badge--sm">PARTIAL</span>
          </div>
          <div class="trace-panel__item">
            <span class="trace-panel__index">04</span>
            <div class="trace-panel__body">
              <strong class="trace-panel__title">Decision archived</strong>
              <div class="trace-panel__meta">trace:TRC-0428</div>
            </div>
            <span class="mp-badge mp-badge--sealed mp-badge--sm">SEALED</span>
          </div>
        </div>
        <div class="mp-alert mp-alert--info" role="status">
          <span class="mp-alert__icon" aria-hidden="true">i</span>
          <div class="mp-alert__content">
            <strong class="mp-alert__title">No oracle without trace.</strong>
            <p class="mp-alert__message">Every agent step should leave an inspectable event.</p>
          </div>
        </div>
      </article>
    </div>
  </section>

  <section class="showcase-section" aria-labelledby="inspector-title">
    <div class="section-heading">
      <p class="eyebrow">Component 10</p>
      <h2 id="inspector-title">Inspector Panel</h2>
      <p>Right-side object inspection for selected nodes, permissions, documents, agents, and traces.</p>
    </div>

    <div class="inspector-demo">
      <article class="inspector-stage" aria-label="Selectable records">
        <div class="mp-card__header">
          <span class="mp-icon" aria-hidden="true">⌖</span>
          <div>
            <p class="mp-card__eyebrow">Selection Surface</p>
            <h3 class="mp-card__title">Objects</h3>
          </div>
        </div>
        <div class="inspector-object inspector-object--selected">
          <span class="mp-icon" aria-hidden="true">□</span>
          <div>
            <strong class="inspector-object__title">archive:alpha</strong>
            <div class="inspector-object__meta">resource / selected</div>
          </div>
          <span class="mp-badge mp-badge--verified mp-badge--sm">VERIFIED</span>
        </div>
        <div class="inspector-object">
          <span class="mp-icon" aria-hidden="true">⌁</span>
          <div>
            <strong class="inspector-object__title">TRC-0428</strong>
            <div class="inspector-object__meta">trace / linked</div>
          </div>
          <span class="mp-badge mp-badge--sealed mp-badge--sm">SEALED</span>
        </div>
        <div class="inspector-object">
          <span class="mp-icon" aria-hidden="true">#</span>
          <div>
            <strong class="inspector-object__title">policy:read-path</strong>
            <div class="inspector-object__meta">policy / inherited</div>
          </div>
          <span class="mp-badge mp-badge--low mp-badge--sm">LOW</span>
        </div>
        <div class="mp-alert mp-alert--info" role="status">
          <span class="mp-alert__icon" aria-hidden="true">i</span>
          <div class="mp-alert__content">
            <strong class="mp-alert__title">Inspector first.</strong>
            <p class="mp-alert__message">Use side inspection before modal interruption.</p>
          </div>
        </div>
      </article>

      <aside class="mp-inspector" aria-label="Inspector panel">
        <header class="mp-inspector__header">
          <span class="mp-inspector__eyebrow">Selected Resource</span>
          <strong class="mp-inspector__title">archive:alpha</strong>
          <div class="badge-row">
            <span class="mp-badge mp-badge--verified mp-badge--sm">VERIFIED</span>
            <span class="mp-badge mp-badge--type mp-badge--sm">RESOURCE</span>
          </div>
        </header>
        <div class="mp-inspector__body">
          <section class="mp-inspector__section">
            <span class="mp-inspector__label">Overview</span>
            <p class="mp-inspector__text">Archived design record with stable references and a verified permission path.</p>
          </section>
          <section class="mp-inspector__section">
            <span class="mp-inspector__label">Metadata</span>
            <dl class="mp-inspector__dl">
              <dt>Owner</dt>
              <dd>system:indexer</dd>
              <dt>Updated</dt>
              <dd>2026-07-09 18:42</dd>
              <dt>Stability</dt>
              <dd>high</dd>
            </dl>
          </section>
          <section class="mp-inspector__section">
            <span class="mp-inspector__label">Relations</span>
            <div class="badge-row">
              <span class="mp-badge mp-badge--type mp-badge--sm">TRC-0428</span>
              <span class="mp-badge mp-badge--type mp-badge--sm">policy:read</span>
              <span class="mp-badge mp-badge--type mp-badge--sm">group:editors</span>
            </div>
          </section>
          <section class="mp-inspector__section">
            <span class="mp-inspector__label">Trace</span>
            <p class="mp-inspector__text">user:alice → group:editors → archive:alpha</p>
          </section>
        </div>
        <footer class="mp-inspector__footer">
          <button type="button" class="mp-button mp-button--primary mp-button--sm">Open Record</button>
          <button type="button" class="mp-button mp-button--secondary mp-button--sm">View Trace</button>
          <button type="button" class="mp-button mp-button--ghost mp-button--sm">Copy ID</button>
        </footer>
      </aside>
    </div>
  </section>
</main>
`

setupAlertDemo({
  trigger: document.querySelector('#alert-demo-trigger'),
  placement: () => document.querySelector('#alert-demo-placement')?.value,
})

setupGraphDrag(document.querySelector('.mp-graph'))
