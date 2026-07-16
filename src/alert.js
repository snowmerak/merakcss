const alertIcons = {
  info: 'i',
  success: '✓',
  warning: '!',
  error: '×',
  danger: '×',
}

const demoAlerts = [
  { variant: 'info', title: 'Trace analysis running.', message: 'Observation is in progress.' },
  { variant: 'success', title: 'Trace verified.', message: 'Evidence path is complete.' },
  { variant: 'warning', title: 'Source confidence is partial.', message: 'Manual review is recommended.' },
  { variant: 'error', title: 'Access denied by policy.', message: 'No permission path was found.' },
]

const demoToasts = [
  { variant: 'info', title: 'Trace analysis running.', message: 'Observation queue accepted.' },
  { variant: 'success', title: 'Record sealed.', message: 'archive:alpha is now immutable.' },
  { variant: 'warning', title: 'Source confidence is partial.', message: 'Two citations remain unverified.' },
  { variant: 'danger', title: 'Access denied by policy.', message: 'No path for delete on archive:beta.' },
]

function normalizeToastVariant(variant = 'info') {
  return variant === 'error' ? 'danger' : variant
}

function createAlert({ variant = 'info', title, message }) {
  const alert = document.createElement('div')
  alert.className = `mp-alert mp-alert--${variant} mp-alert--floating`

  const icon = document.createElement('span')
  icon.className = 'mp-alert__icon'
  icon.setAttribute('aria-hidden', 'true')
  icon.textContent = alertIcons[variant] ?? alertIcons.info

  const content = document.createElement('div')
  content.className = 'mp-alert__content'

  const titleElement = document.createElement('strong')
  titleElement.className = 'mp-alert__title'
  titleElement.textContent = title

  const messageElement = document.createElement('p')
  messageElement.className = 'mp-alert__message'
  messageElement.textContent = message

  content.append(titleElement, messageElement)
  alert.append(icon, content)
  return alert
}

function createToast({ variant = 'info', title, message, dismissible = true } = {}) {
  const resolved = normalizeToastVariant(variant)
  const toast = document.createElement('div')
  toast.className = `mp-toast mp-toast--${resolved}`

  const icon = document.createElement('span')
  icon.className = 'mp-toast__icon'
  icon.setAttribute('aria-hidden', 'true')
  icon.textContent = alertIcons[resolved] ?? alertIcons.info

  const body = document.createElement('div')
  body.className = 'mp-toast__body'

  const titleElement = document.createElement('strong')
  titleElement.className = 'mp-toast__title'
  titleElement.textContent = title
  body.append(titleElement)

  if (message) {
    const messageElement = document.createElement('p')
    messageElement.className = 'mp-toast__message'
    messageElement.textContent = message
    body.append(messageElement)
  }

  toast.append(icon, body)

  if (dismissible) {
    const close = document.createElement('button')
    close.type = 'button'
    close.className = 'mp-toast__close'
    close.setAttribute('aria-label', 'Dismiss notification')
    close.textContent = '×'
    close.addEventListener('click', () => dismissToast(toast))
    toast.append(close)
  }

  return toast
}

function dismissToast(toast) {
  if (!toast || toast.classList.contains('is-leaving')) return

  toast.classList.add('is-leaving')
  toast.addEventListener('animationend', () => toast.remove(), { once: true })
}

function dismissAlert(alert) {
  alert.classList.add('is-leaving')
  alert.addEventListener('animationend', () => alert.remove(), { once: true })
}

function setRegionPlacement(region, placement) {
  if (!region || !placement) return

  region.classList.remove(
    'mp-toast-region--top-left',
    'mp-toast-region--top-center',
    'mp-toast-region--top-right',
    'mp-toast-region--center',
    'mp-toast-region--bottom-left',
    'mp-toast-region--bottom-center',
    'mp-toast-region--bottom-right',
  )
  region.classList.add(`mp-toast-region--${placement}`)
}

function setRegionLiveMode(region, variant) {
  if (!region) return

  region.setAttribute(
    'aria-live',
    variant === 'danger' || variant === 'error' ? 'assertive' : 'polite',
  )
}

function getToastRegion(placement = 'bottom-right') {
  const id = `mp-toast-region-${placement}`
  const existingRegion = document.getElementById(id)

  if (existingRegion) return existingRegion

  const region = document.createElement('div')
  region.id = id
  region.className = `mp-toast-region mp-toast-region--${placement}`
  region.setAttribute('aria-live', 'polite')
  region.setAttribute('aria-relevant', 'additions text')
  region.setAttribute('aria-label', 'Notifications')
  document.body.append(region)

  return region
}

export function showAlert({
  region,
  placement = 'bottom-right',
  variant = 'info',
  title,
  message,
  duration = 3200,
} = {}) {
  const targetRegion = region ?? getToastRegion(placement)
  setRegionPlacement(targetRegion, placement)
  setRegionLiveMode(targetRegion, variant)

  const alert = createAlert({ variant, title, message })
  targetRegion.prepend(alert)

  if (duration > 0) window.setTimeout(() => dismissAlert(alert), duration)

  return alert
}

export function showToast({
  region,
  placement = 'bottom-right',
  variant = 'info',
  title,
  message,
  duration = 3600,
  dismissible = true,
} = {}) {
  const targetRegion = region ?? getToastRegion(placement)
  const resolved = normalizeToastVariant(variant)
  setRegionPlacement(targetRegion, placement)
  setRegionLiveMode(targetRegion, resolved)

  const toast = createToast({ variant: resolved, title, message, dismissible })
  targetRegion.prepend(toast)

  if (duration > 0) window.setTimeout(() => dismissToast(toast), duration)

  return toast
}

export function setupAlertDemo({ trigger, region, placement = 'bottom-right' }) {
  if (!trigger) return

  let nextAlert = 0
  trigger.addEventListener('click', () => {
    const selectedPlacement = typeof placement === 'function' ? placement() : placement
    showAlert({ region, placement: selectedPlacement, ...demoAlerts[nextAlert] })
    nextAlert = (nextAlert + 1) % demoAlerts.length
  })
}

export function setupToastDemo({ trigger, region, placement = 'bottom-right' }) {
  if (!trigger) return

  let nextToast = 0
  trigger.addEventListener('click', () => {
    const selectedPlacement = typeof placement === 'function' ? placement() : placement
    showToast({ region, placement: selectedPlacement, ...demoToasts[nextToast] })
    nextToast = (nextToast + 1) % demoToasts.length
  })
}
