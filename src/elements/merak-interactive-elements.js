import { setupInspectorObjects } from '../inspector-objects.js'
import { showAlert } from '../alert.js'
import { setupCommandInput } from '../command.js'
import { setupGraphDrag } from '../graph.js'

const HTMLElementBase = globalThis.HTMLElement ?? class {}

class MerakCommand extends HTMLElementBase {
  connectedCallback() {
    setupCommandInput(this)
    this.querySelector('.mp-command')?.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') this.dispatchEvent(new CustomEvent('merak-execute', { bubbles: true, composed: true, detail: { value: event.currentTarget.value } }))
    })
  }
}

class MerakGraph extends HTMLElementBase {
  connectedCallback() {
    const graph = this.querySelector('.mp-graph')
    setupGraphDrag(graph)
    graph?.querySelectorAll('[data-node-id]').forEach((node) => node.addEventListener('click', () => {
      graph.querySelectorAll('[data-node-id]').forEach((item) => item.classList.toggle('mp-graph__node--selected', item === node))
      this.dispatchEvent(new CustomEvent('merak-node-select', { bubbles: true, composed: true, detail: { id: node.dataset.nodeId } }))
    }))
  }
}

class MerakInspector extends HTMLElementBase {
  connectedCallback() {
    const panel = this.querySelector('.mp-inspector') || this.closest('.inspector-demo')?.querySelector('.mp-inspector')
    setupInspectorObjects(this, {
      panel,
      onSelect: (data) => {
        this.dispatchEvent(
          new CustomEvent('merak-select', {
            bubbles: true,
            composed: true,
            detail: { id: data.id },
          }),
        )
      },
    })
  }
}

class MerakToastRegion extends HTMLElementBase {
  connectedCallback() {
    this.classList.add('mp-toast-region', `mp-toast-region--${this.getAttribute('placement') ?? 'bottom-right'}`)
    this.setAttribute('role', 'region')
    this.setAttribute('aria-live', 'polite')
  }
  notify(options) { return showAlert({ ...options, region: this }) }
}

for (const [name, component] of [['merak-command', MerakCommand], ['merak-graph', MerakGraph], ['merak-inspector', MerakInspector], ['merak-toast-region', MerakToastRegion]]) {
  if (globalThis.customElements && !customElements.get(name)) customElements.define(name, component)
}
