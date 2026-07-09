const tabIdPrefix = 'merak-tab'
const HTMLElementBase = globalThis.HTMLElement ?? class {}

function normalizeItems(items) {
  if (!Array.isArray(items)) return []

  return items.filter(
    (item) =>
      item &&
      typeof item.value === 'string' &&
      item.value.length > 0 &&
      typeof item.label === 'string',
  )
}

export class MerakTabs extends HTMLElementBase {
  static observedAttributes = ['value']

  #items = []
  #renderPanel = null
  #uid = `${tabIdPrefix}-${globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2)}`

  get items() {
    return [...this.#items]
  }

  set items(items) {
    this.#items = normalizeItems(items)

    if (!this.#items.some((item) => item.value === this.value)) {
      this.value = this.#items[0]?.value ?? ''
    }

    this.#render()
  }

  get value() {
    return this.getAttribute('value') ?? ''
  }

  set value(value) {
    const nextValue = typeof value === 'string' ? value : ''

    if (nextValue) this.setAttribute('value', nextValue)
    else this.removeAttribute('value')
  }

  get renderPanel() {
    return this.#renderPanel
  }

  set renderPanel(callback) {
    this.#renderPanel = typeof callback === 'function' ? callback : null
    this.#render()
  }

  connectedCallback() {
    this.classList.add('mp-tabs')
    this.#render()
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'value' && oldValue !== newValue) this.#render()
  }

  #select(value) {
    if (value === this.value || !this.#items.some((item) => item.value === value)) return

    this.value = value
    const detail = { value, item: this.#items.find((item) => item.value === value) }
    const event = new CustomEvent('merak-change', {
      bubbles: true,
      composed: true,
      detail,
    })

    this.dispatchEvent(event)
    this.onChange?.(detail, event)
  }

  #render() {
    if (!this.isConnected) return

    this.replaceChildren()
    const list = document.createElement('div')
    list.className = 'mp-tabs__list'
    list.setAttribute('role', 'tablist')
    list.setAttribute('aria-label', this.getAttribute('label') ?? 'Tabs')

    const activeItem = this.#items.find((item) => item.value === this.value) ?? this.#items[0]
    if (activeItem && activeItem.value !== this.value) this.value = activeItem.value

    this.#items.forEach((item, index) => {
      const tab = document.createElement('button')
      const panelId = `${this.#uid}-panel-${index}`
      const tabId = `${this.#uid}-tab-${index}`

      tab.type = 'button'
      tab.className = 'mp-tabs__tab'
      tab.id = tabId
      tab.textContent = item.label
      tab.disabled = Boolean(item.disabled)
      tab.setAttribute('role', 'tab')
      tab.setAttribute('aria-selected', String(item.value === this.value))
      tab.setAttribute('aria-controls', panelId)
      tab.tabIndex = item.value === this.value ? 0 : -1
      tab.addEventListener('click', () => this.#select(item.value))
      tab.addEventListener('keydown', (event) => this.#onKeydown(event, index))
      list.append(tab)
    })

    this.append(list)
    if (!activeItem) return

    const panel = document.createElement('section')
    panel.className = 'mp-tabs__panel'
    panel.id = `${this.#uid}-panel-${this.#items.indexOf(activeItem)}`
    panel.setAttribute('role', 'tabpanel')
    panel.setAttribute('aria-labelledby', `${this.#uid}-tab-${this.#items.indexOf(activeItem)}`)
    panel.tabIndex = 0

    const content = this.#renderPanel?.(activeItem)
    if (content instanceof Node) panel.append(content)
    else if (content !== undefined && content !== null) panel.textContent = String(content)

    this.append(panel)
  }

  #onKeydown(event, currentIndex) {
    const enabledItems = this.#items.filter((item) => !item.disabled)
    const currentItem = this.#items[currentIndex]
    const enabledIndex = enabledItems.indexOf(currentItem)
    let nextItem

    if (event.key === 'Home') nextItem = enabledItems[0]
    if (event.key === 'End') nextItem = enabledItems.at(-1)
    if (event.key === 'ArrowRight') nextItem = enabledItems[(enabledIndex + 1) % enabledItems.length]
    if (event.key === 'ArrowLeft') nextItem = enabledItems[(enabledIndex - 1 + enabledItems.length) % enabledItems.length]
    if (!nextItem) return

    event.preventDefault()
    this.#select(nextItem.value)
    this.querySelector(`[role="tab"][aria-selected="true"]`)?.focus()
  }
}

export function defineMerakTabs() {
  if (!globalThis.customElements) return

  if (!customElements.get('merak-tabs')) {
    customElements.define('merak-tabs', MerakTabs)
  }
}

defineMerakTabs()
