const HTMLElementBase = globalThis.HTMLElement ?? class {}

const text = (value) => String(value ?? '').replace(/[&<>'"]/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
}[character]))

const badge = (label, variant = 'neutral') =>
  `<span class="mp-badge mp-badge--${text(variant)} mp-badge--sm">${text(label)}</span>`

class MerakDataElement extends HTMLElementBase {
  #data = null

  get data() { return this.#data }
  set data(value) { this.#data = value; this.render() }

  connectedCallback() { this.render() }
}

export class MerakTimeline extends MerakDataElement {
  render() {
    if (!this.isConnected) return
    if (this.data === null) return
    const events = Array.isArray(this.data) ? this.data : []
    this.innerHTML = `<ol class="mp-timeline">${events.map((event, index) => `
      <li class="mp-timeline__item${event.active ? ' mp-timeline__item--active' : ''}">
        <div class="mp-timeline__header"><span class="mp-timeline__step">${String(index + 1).padStart(2, '0')} ${text(event.step)}</span><time class="mp-timeline__time">${text(event.time)}</time></div>
        <strong class="mp-timeline__title">${text(event.title)}</strong>
        ${event.body ? `<p class="mp-card__body">${text(event.body)}</p>` : ''}
        <div class="badge-row">${(event.badges ?? []).map(({ label, variant }) => badge(label, variant)).join('')}</div>
      </li>`).join('')}</ol>`
  }
}

export class MerakGateCard extends MerakDataElement {
  render() {
    if (!this.isConnected) return
    if (this.data === null) return
    const gate = this.data ?? {}
    const decision = gate.decision ?? 'granted'
    this.className = `gate-card${decision === 'denied' ? ' gate-card--denied' : ''}`
    const nodes = [['Subject', gate.subject], ['Permission', gate.permission], ['Object', gate.object]]
    this.innerHTML = `<div class="gate-card__equation">${nodes.map(([label, value], index) => `<div class="gate-card__node"><span class="gate-card__label">${label}</span><strong class="gate-card__value">${text(value)}</strong></div>${index < 2 ? '<span class="gate-card__arrow">→</span>' : ''}`).join('')}</div>
      <div class="gate-card__details"><div class="gate-card__detail"><span class="gate-card__label">Decision</span>${badge(decision, decision === 'denied' ? 'error' : 'verified')}</div><div class="gate-card__detail"><span class="gate-card__label">Reason</span><strong class="gate-card__value">${text(gate.reason)}</strong></div></div>`
  }
}

export class MerakAgentPanel extends MerakDataElement {
  render() {
    if (!this.isConnected) return
    if (this.data === null) return
    const run = this.data ?? {}
    this.className = 'agent-panel'
    this.innerHTML = `<div class="agent-panel__summary"><div><p class="mp-card__eyebrow">${text(run.id ?? 'Agent Run')}</p><strong class="mp-card__title">${text(run.title)}</strong></div>${badge(run.status ?? 'ACTIVE', run.variant ?? 'active')}</div>
      <div class="agent-flow">${(run.steps ?? []).map((step, index) => `<div class="agent-flow__step${step.active ? ' agent-flow__step--active' : ''}"><span class="agent-flow__index">${String(index + 1).padStart(2, '0')}</span><div><strong class="agent-flow__title">${text(step.title)}</strong><div class="agent-flow__meta">${text(step.meta)}</div></div>${badge(step.status ?? 'OK', step.variant ?? 'verified')}</div>`).join('')}</div>
      ${run.observation ? `<div class="agent-panel__observation"><span class="mp-card__eyebrow">Observation</span><code class="agent-panel__log">${text(run.observation)}</code></div>` : ''}`
  }
}

export class MerakSidebar extends MerakDataElement {
  get value() { return this.getAttribute('value') ?? '' }
  set value(value) { this.setAttribute('value', value) }
  static observedAttributes = ['value']
  attributeChangedCallback() { this.render() }
  render() {
    if (!this.isConnected) return
    if (this.data === null) return
    const sidebar = this.data ?? {}
    this.className = 'mp-sidebar'
    this.innerHTML = `<div class="mp-sidebar__brand"><span class="mp-sidebar__mark">${text(sidebar.mark ?? 'M')}</span><div><strong class="mp-sidebar__title">${text(sidebar.title ?? 'MERAK')}</strong><div class="mp-sidebar__subtitle">${text(sidebar.subtitle ?? '')}</div></div></div><nav class="mp-sidebar__nav" aria-label="${text(sidebar.label ?? 'Navigation')}">${(sidebar.items ?? []).map((item) => `<button type="button" class="mp-sidebar__item" data-value="${text(item.value)}"${item.value === this.value ? ' aria-current="page"' : ''}>${text(item.label)}</button>`).join('')}</nav>`
    this.querySelectorAll('[data-value]').forEach((item) => item.addEventListener('click', () => { this.value = item.dataset.value; const detail = { value: this.value, item: (sidebar.items ?? []).find((entry) => entry.value === this.value) }; this.dispatchEvent(new CustomEvent('merak-change', { bubbles: true, composed: true, detail })); this.onChange?.(detail) }))
  }
}

const definitions = [['merak-timeline', MerakTimeline], ['merak-gate-card', MerakGateCard], ['merak-agent-panel', MerakAgentPanel], ['merak-sidebar', MerakSidebar]]
export function defineMerakDataComponents() { definitions.forEach(([name, component]) => { if (globalThis.customElements && !customElements.get(name)) customElements.define(name, component) }) }
defineMerakDataComponents()
