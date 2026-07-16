const BADGE_VARIANTS = new Set([
  'active',
  'verified',
  'low',
  'success',
  'pending',
  'medium',
  'warning',
  'inactive',
  'neutral',
  'error',
  'high',
  'danger',
  'critical',
  'sealed',
  'partial',
  'info',
  'type',
])

function readObjectData(item) {
  return {
    id: item.dataset.objectId || item.querySelector('.inspector-object__title')?.textContent?.trim() || '',
    eyebrow: item.dataset.objectEyebrow || 'Selected Resource',
    type: item.dataset.objectType || 'RESOURCE',
    badge: item.dataset.objectBadge || 'VERIFIED',
    badgeVariant: normalizeBadgeVariant(item.dataset.objectBadgeVariant),
    overview: item.dataset.objectOverview || '',
    owner: item.dataset.objectOwner || '—',
    updated: item.dataset.objectUpdated || '—',
    stability: item.dataset.objectStability || '—',
    relations: (item.dataset.objectRelations || '')
      .split('|')
      .map((value) => value.trim())
      .filter(Boolean),
    trace: item.dataset.objectTrace || '',
  }
}

function normalizeBadgeVariant(value) {
  const variant = String(value || 'verified').toLowerCase()
  return BADGE_VARIANTS.has(variant) ? variant : 'neutral'
}

function createBadge(label, variant) {
  const badge = document.createElement('span')
  badge.className = `mp-badge mp-badge--${normalizeBadgeVariant(variant)} mp-badge--sm`
  badge.textContent = label
  return badge
}

function replaceChildren(node, children) {
  if (!node) return
  node.replaceChildren(...children)
}

function updateInspectorPanel(panel, data) {
  if (!panel || !data) return

  const eyebrow = panel.querySelector('.mp-inspector__eyebrow')
  const title = panel.querySelector('.mp-inspector__title')
  const headerBadges = panel.querySelector('.mp-inspector__header .badge-row')
  const overview = panel.querySelector('.mp-inspector__section .mp-inspector__text')
  const dl = panel.querySelector('.mp-inspector__dl')
  const sections = panel.querySelectorAll('.mp-inspector__section')
  const relationRow = sections[2]?.querySelector('.badge-row')
  const trace = sections[3]?.querySelector('.mp-inspector__text')

  if (eyebrow) eyebrow.textContent = data.eyebrow
  if (title) title.textContent = data.id
  if (headerBadges) {
    replaceChildren(headerBadges, [
      createBadge(data.badge, data.badgeVariant),
      createBadge(data.type, 'type'),
    ])
  }
  if (overview) overview.textContent = data.overview
  if (dl) {
    const rows = [
      ['Owner', data.owner],
      ['Updated', data.updated],
      ['Stability', data.stability],
    ]
    const nodes = []
    for (const [label, value] of rows) {
      const dt = document.createElement('dt')
      dt.textContent = label
      const dd = document.createElement('dd')
      dd.textContent = value
      nodes.push(dt, dd)
    }
    replaceChildren(dl, nodes)
  }
  if (relationRow) {
    replaceChildren(
      relationRow,
      data.relations.map((label) => createBadge(label, 'type')),
    )
  }
  if (trace) trace.textContent = data.trace
}

/**
 * Minimal selection for inspector object rows.
 * Prefer native buttons with aria-pressed; no listbox keyboard contract.
 */
export function setupInspectorObjects(root, { panel, onSelect } = {}) {
  if (!root) return

  const items = [...root.querySelectorAll('.inspector-object')]
  if (!items.length) return

  const select = (item) => {
    items.forEach((entry) => {
      const active = entry === item
      entry.classList.toggle('inspector-object--selected', active)
      if (entry.matches('button, [role="button"]') || entry.hasAttribute('aria-pressed')) {
        entry.setAttribute('aria-pressed', active ? 'true' : 'false')
      }
    })

    const data = readObjectData(item)
    updateInspectorPanel(panel, data)
    onSelect?.(data)
  }

  items.forEach((item) => {
    if (item.tagName === 'BUTTON') {
      if (!item.hasAttribute('type')) item.type = 'button'
      if (!item.hasAttribute('aria-pressed')) {
        item.setAttribute(
          'aria-pressed',
          item.classList.contains('inspector-object--selected') ? 'true' : 'false',
        )
      }
    }

    item.addEventListener('click', () => select(item))
  })

  const initial = items.find((item) => item.classList.contains('inspector-object--selected')) || items[0]
  if (initial) select(initial)
}
