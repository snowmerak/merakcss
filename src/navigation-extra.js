function visibleItems(root) {
  return [...root.querySelectorAll('[role="option"]')].filter((item) => !item.hidden)
}

function setActiveOption(items, index, input) {
  items.forEach((item, itemIndex) => {
    const active = itemIndex === index
    item.classList.toggle('is-active', active)
    item.setAttribute('aria-selected', String(active))
  })

  const activeItem = items[index]
  if (input) {
    if (activeItem?.id) input.setAttribute('aria-activedescendant', activeItem.id)
    else input.removeAttribute('aria-activedescendant')
  }

  activeItem?.scrollIntoView({ block: 'nearest' })
}

export function setupCommandPalette(root) {
  if (!root) return

  const openButton = root.querySelector('[data-command-palette-open]')
  const palette = root.querySelector('.mp-command-palette')
  const input = root.querySelector('.mp-command-palette__input')
  const listbox = root.querySelector('[role="listbox"]')
  const empty = root.querySelector('[data-command-palette-empty]')
  const result = root.querySelector('[data-command-palette-result]')
  const items = [...root.querySelectorAll('[role="option"]')]
  let open = root.getAttribute('data-open') !== 'false'
  let activeIndex = 0

  items.forEach((item, index) => {
    if (!item.id) item.id = `${root.id || 'command-palette'}-option-${index + 1}`
  })

  if (input && listbox?.id) {
    input.setAttribute('role', 'combobox')
    input.setAttribute('aria-autocomplete', 'list')
    input.setAttribute('aria-controls', listbox.id)
    input.setAttribute('aria-expanded', String(open))
  }

  const setOpen = (next, { focus = true } = {}) => {
    open = next
    root.setAttribute('data-open', String(open))
    if (palette) palette.hidden = !open
    input?.setAttribute('aria-expanded', String(open))

    if (open) {
      if (focus) input?.focus()
      const visible = visibleItems(root)
      activeIndex = 0
      if (visible.length) setActiveOption(visible, 0, input)
    } else {
      input?.removeAttribute('aria-activedescendant')
      if (focus) openButton?.focus()
    }
  }

  const filterItems = () => {
    const query = (input?.value ?? '').trim().toLowerCase()
    let visibleCount = 0

    items.forEach((item) => {
      const haystack = [item.dataset.command ?? '', item.textContent ?? ''].join(' ').toLowerCase()
      const match = !query || haystack.includes(query)
      item.hidden = !match
      if (match) visibleCount += 1
    })

    root.querySelectorAll('.mp-command-palette__group').forEach((group) => {
      const hasVisible = [...group.querySelectorAll('[role="option"]')].some((item) => !item.hidden)
      group.hidden = !hasVisible
    })

    if (empty) empty.hidden = visibleCount > 0

    const visible = visibleItems(root)
    activeIndex = 0

    if (!open) {
      items.forEach((item) => {
        item.classList.remove('is-active')
        item.setAttribute('aria-selected', 'false')
      })
      input?.removeAttribute('aria-activedescendant')
      return
    }

    if (visible.length) setActiveOption(visible, 0, input)
    else {
      items.forEach((item) => {
        item.classList.remove('is-active')
        item.setAttribute('aria-selected', 'false')
      })
      input?.removeAttribute('aria-activedescendant')
    }
  }

  const runCommand = (item) => {
    if (!item) return
    if (result) result.textContent = item.dataset.command ?? item.textContent.trim()
    setOpen(false)
  }

  openButton?.addEventListener('click', () => setOpen(true))
  input?.addEventListener('input', filterItems)

  input?.addEventListener('keydown', (event) => {
    if (!open && (event.key === 'ArrowDown' || event.key === 'Enter')) {
      event.preventDefault()
      setOpen(true)
      return
    }

    const visible = visibleItems(root)

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (!visible.length) return
      activeIndex = (activeIndex + 1) % visible.length
      setActiveOption(visible, activeIndex, input)
      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      if (!visible.length) return
      activeIndex = (activeIndex - 1 + visible.length) % visible.length
      setActiveOption(visible, activeIndex, input)
      return
    }

    if (event.key === 'Home') {
      event.preventDefault()
      if (!visible.length) return
      activeIndex = 0
      setActiveOption(visible, activeIndex, input)
      return
    }

    if (event.key === 'End') {
      event.preventDefault()
      if (!visible.length) return
      activeIndex = visible.length - 1
      setActiveOption(visible, activeIndex, input)
      return
    }

    if (event.key === 'Enter') {
      event.preventDefault()
      runCommand(visible[activeIndex])
      return
    }

    if (event.key === 'Escape') {
      event.preventDefault()
      setOpen(false)
    }
  })

  items.forEach((item) => {
    item.tabIndex = -1
    item.addEventListener('click', () => runCommand(item))
    item.addEventListener('mousemove', () => {
      if (!open) return
      const visible = visibleItems(root)
      const next = visible.indexOf(item)
      if (next < 0) return
      activeIndex = next
      setActiveOption(visible, activeIndex, input)
    })
  })

  root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && open) {
      event.preventDefault()
      setOpen(false)
    }
  })

  filterItems()
  setOpen(open, { focus: false })
}

export function setupPagination(root) {
  if (!root) return

  const pages = [...root.querySelectorAll('[data-page]')]
  const meta = root.querySelector('[data-pagination-meta]')
  const prev = root.querySelector('[data-pagination-prev]')
  const next = root.querySelector('[data-pagination-next]')
  const total = pages.length

  const setPage = (page) => {
    const current = Math.min(Math.max(page, 1), total)

    pages.forEach((button) => {
      const value = Number(button.dataset.page)
      const active = value === current
      if (active) button.setAttribute('aria-current', 'page')
      else button.removeAttribute('aria-current')
    })

    if (meta) meta.textContent = `Page ${current} / ${total}`
    if (prev) prev.disabled = current <= 1
    if (next) next.disabled = current >= total
  }

  pages.forEach((button) => {
    button.addEventListener('click', () => setPage(Number(button.dataset.page)))
  })

  prev?.addEventListener('click', () => {
    const current = Number(root.querySelector('[aria-current="page"]')?.dataset.page ?? 1)
    setPage(current - 1)
  })

  next?.addEventListener('click', () => {
    const current = Number(root.querySelector('[aria-current="page"]')?.dataset.page ?? 1)
    setPage(current + 1)
  })

  setPage(Number(root.querySelector('[aria-current="page"]')?.dataset.page ?? 1))
}

export function setupContextMenu(root) {
  if (!root) return

  const target = root.querySelector('[data-context-target]')
  const menu = root.querySelector('.mp-context-menu')
  const result = root.querySelector('[data-context-result]')
  const items = [...root.querySelectorAll('.mp-context-menu__item')]
  let open = false

  const closeMenu = ({ restoreFocus = false } = {}) => {
    if (!menu) return
    open = false
    menu.hidden = true
    if (restoreFocus) target?.focus()
  }

  const openMenu = (x = 16, y = 56) => {
    if (!menu) return
    open = true
    menu.hidden = false
    menu.style.left = `${Math.max(8, x)}px`
    menu.style.top = `${Math.max(8, y)}px`
    items[0]?.focus()
  }

  target?.addEventListener('contextmenu', (event) => {
    event.preventDefault()
    const bounds = root.getBoundingClientRect()
    openMenu(event.clientX - bounds.left, event.clientY - bounds.top)
  })

  target?.addEventListener('keydown', (event) => {
    if (event.key === 'ContextMenu' || (event.shiftKey && event.key === 'F10')) {
      event.preventDefault()
      openMenu()
    }
  })

  items.forEach((item, index) => {
    item.addEventListener('click', () => {
      if (result) result.textContent = item.dataset.action ?? item.textContent.trim()
      closeMenu({ restoreFocus: true })
    })

    item.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault()
        items[(index + 1) % items.length]?.focus()
      } else if (event.key === 'ArrowUp') {
        event.preventDefault()
        items[(index - 1 + items.length) % items.length]?.focus()
      } else if (event.key === 'Home') {
        event.preventDefault()
        items[0]?.focus()
      } else if (event.key === 'End') {
        event.preventDefault()
        items[items.length - 1]?.focus()
      } else if (event.key === 'Escape') {
        event.preventDefault()
        closeMenu({ restoreFocus: true })
      } else if (event.key === 'Tab') {
        closeMenu()
      }
    })
  })

  document.addEventListener('pointerdown', (event) => {
    if (!open) return
    if (root.contains(event.target)) return
    closeMenu()
  })

  closeMenu()
}
