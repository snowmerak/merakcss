const alertIcons = {
  info: 'i',
  success: '✓',
  warning: '!',
  error: '×',
}

const demoAlerts = [
  {
    variant: 'info',
    title: 'Trace analysis running.',
    message: 'Observation is in progress.',
  },
  {
    variant: 'success',
    title: 'Trace verified.',
    message: 'Evidence path is complete.',
  },
  {
    variant: 'warning',
    title: 'Source confidence is partial.',
    message: 'Manual review is recommended.',
  },
  {
    variant: 'error',
    title: 'Access denied by policy.',
    message: 'No permission path was found.',
  },
]

function createAlert({ variant = 'info', title, message }) {
  const alert = document.createElement('div')
  alert.className = `mp-alert mp-alert--${variant} mp-alert--floating`
  alert.role = variant === 'error' ? 'alert' : 'status'

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

function dismissAlert(alert) {
  alert.classList.add('is-leaving')
  alert.addEventListener('animationend', () => alert.remove(), { once: true })
}

function getToastRegion(placement = 'bottom-right') {
  const id = `mp-toast-region-${placement}`
  const existingRegion = document.getElementById(id)

  if (existingRegion) return existingRegion

  const region = document.createElement('div')
  region.id = id
  region.className = `mp-toast-region mp-toast-region--${placement}`
  region.setAttribute('aria-live', 'polite')
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
  const alert = createAlert({ variant, title, message })

  targetRegion.prepend(alert)

  if (duration > 0) {
    window.setTimeout(() => dismissAlert(alert), duration)
  }

  return alert
}

export function setupAlertDemo({ trigger, region, placement = 'bottom-right' }) {
  if (!trigger) return

  let nextAlert = 0

  trigger.addEventListener('click', () => {
    const selectedPlacement =
      typeof placement === 'function' ? placement() : placement

    showAlert({
      region,
      placement: selectedPlacement,
      ...demoAlerts[nextAlert],
    })
    nextAlert = (nextAlert + 1) % demoAlerts.length
  })
}
