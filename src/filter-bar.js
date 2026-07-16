export function setupFilterBar(root) {
  if (!root) return

  const chips = [...root.querySelectorAll('.mp-filter-bar__chip')]
  const countEl = root.querySelector('[data-filter-count]')
  const clearBtn = root.querySelector('[data-filter-clear]')

  const sync = () => {
    const n = chips.filter((c) => c.getAttribute('aria-pressed') === 'true').length
    if (countEl) countEl.textContent = String(n)
  }

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const group = chip.closest('.mp-filter-bar__group')
      const exclusive = group?.hasAttribute('data-filter-exclusive')

      if (exclusive) {
        group.querySelectorAll('.mp-filter-bar__chip').forEach((sibling) => {
          sibling.setAttribute('aria-pressed', String(sibling === chip))
        })
      } else {
        const on = chip.getAttribute('aria-pressed') === 'true'
        chip.setAttribute('aria-pressed', String(!on))
      }

      sync()
    })
  })

  clearBtn?.addEventListener('click', () => {
    chips.forEach((c) => c.setAttribute('aria-pressed', 'false'))
    const input = root.querySelector('input[type="search"]')
    if (input) input.value = ''
    sync()
  })

  sync()
}
