function supportsPopover(element) {
  return Boolean(element && typeof element.showPopover === 'function')
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function positionSurface(trigger, surface, { gap = 6, prefer = 'bottom-start' } = {}) {
  if (!trigger || !surface) return

  const triggerRect = trigger.getBoundingClientRect()
  const surfaceRect = surface.getBoundingClientRect()
  const viewportPadding = 8
  const maxLeft = window.innerWidth - surfaceRect.width - viewportPadding
  const maxTop = window.innerHeight - surfaceRect.height - viewportPadding

  let left = triggerRect.left
  let top = triggerRect.bottom + gap

  if (prefer === 'bottom-start') {
    left = triggerRect.left
    top = triggerRect.bottom + gap
    if (top + surfaceRect.height > window.innerHeight - viewportPadding) {
      top = triggerRect.top - surfaceRect.height - gap
    }
  }

  left = clamp(left, viewportPadding, Math.max(viewportPadding, maxLeft))
  top = clamp(top, viewportPadding, Math.max(viewportPadding, maxTop))

  surface.style.position = 'fixed'
  surface.style.inset = 'auto'
  surface.style.margin = '0'
  surface.style.left = `${Math.round(left)}px`
  surface.style.top = `${Math.round(top)}px`
}

function bindAnchoredPopover(trigger, surface) {
  const place = () => positionSurface(trigger, surface)

  if (supportsPopover(surface)) {
    if (!surface.hasAttribute('popover')) surface.setAttribute('popover', 'auto')
    trigger.setAttribute('popovertarget', surface.id)

    surface.addEventListener('beforetoggle', (event) => {
      if (event.newState === 'open') {
        // Ensure geometry is available before paint.
        requestAnimationFrame(place)
      }
    })

    surface.addEventListener('toggle', (event) => {
      if (event.newState === 'open') place()
    })

    window.addEventListener('resize', () => {
      if (surface.matches?.(':popover-open')) place()
    })

    return { mode: 'native' }
  }

  const close = ({ restoreFocus = false } = {}) => {
    surface.hidden = true
    trigger.setAttribute('aria-expanded', 'false')
    if (restoreFocus) trigger.focus()
  }

  const open = () => {
    surface.hidden = false
    trigger.setAttribute('aria-expanded', 'true')
    place()
  }

  trigger.setAttribute('aria-expanded', 'false')
  trigger.setAttribute('aria-controls', surface.id)
  surface.hidden = true

  trigger.addEventListener('click', () => {
    if (surface.hidden) open()
    else close()
  })

  document.addEventListener('pointerdown', (event) => {
    if (trigger.contains(event.target) || surface.contains(event.target)) return
    close()
  })

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') close({ restoreFocus: true })
  })

  window.addEventListener('resize', () => {
    if (!surface.hidden) place()
  })

  return { mode: 'fallback', open, close }
}

export function setupDialog(root) {
  if (!root) return

  const dialog = root.querySelector('dialog.mp-dialog, dialog.mp-drawer')
  const openers = root.querySelectorAll('[data-dialog-open]')
  const closers = root.querySelectorAll('[data-dialog-close]')

  if (!dialog) return

  openers.forEach((button) => {
    button.addEventListener('click', () => {
      if (typeof dialog.showModal === 'function') dialog.showModal()
      else dialog.setAttribute('open', '')
    })
  })

  closers.forEach((button) => {
    button.addEventListener('click', () => {
      if (typeof dialog.close === 'function') dialog.close()
      else dialog.removeAttribute('open')
    })
  })

  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return
    if (typeof dialog.close === 'function') dialog.close()
    else dialog.removeAttribute('open')
  })
}

export function setupPopover(root) {
  if (!root) return

  const trigger = root.querySelector('[data-popover-trigger]')
  const popover = root.querySelector('.mp-popover')
  if (!trigger || !popover) return

  if (!popover.id) popover.id = `${root.id || 'popover'}-surface`
  bindAnchoredPopover(trigger, popover)
}

export function setupDropdownMenu(root) {
  if (!root) return

  const trigger = root.querySelector('[data-dropdown-trigger]')
  const menu = root.querySelector('.mp-dropdown-menu')
  const result = root.querySelector('[data-dropdown-result]')
  const items = [...root.querySelectorAll('.mp-dropdown-menu__item')]
  if (!trigger || !menu) return

  if (!menu.id) menu.id = `${root.id || 'dropdown'}-menu`

  const setExpanded = (open) => {
    trigger.setAttribute('aria-expanded', String(open))
  }

  const binding = bindAnchoredPopover(trigger, menu)

  if (binding.mode === 'native') {
    setExpanded(false)
    menu.addEventListener('toggle', (event) => {
      const open = event.newState === 'open'
      setExpanded(open)
      if (open) items[0]?.focus()
    })
  }

  const closeMenu = () => {
    if (supportsPopover(menu)) menu.hidePopover()
    else {
      menu.hidden = true
      setExpanded(false)
    }
  }

  items.forEach((item, index) => {
    item.addEventListener('click', () => {
      if (result) result.textContent = item.dataset.action ?? item.textContent.trim()
      closeMenu()
      trigger.focus()
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
        closeMenu()
        trigger.focus()
      }
    })
  })
}
