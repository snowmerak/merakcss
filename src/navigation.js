export function setupSidebarDemo(shell) {
  if (!shell) return

  const items = [...shell.querySelectorAll('.mp-sidebar__item')]
  const currentLabel = shell.querySelector('[data-sidebar-current]')
  const description = shell.querySelector('[data-sidebar-preview-description]')

  items.forEach((item) => {
    item.addEventListener('click', (event) => {
      event.preventDefault()

      items.forEach((candidate) => candidate.removeAttribute('aria-current'))
      item.setAttribute('aria-current', 'page')

      if (currentLabel) currentLabel.textContent = item.dataset.sidebarTitle
      if (description) description.textContent = item.dataset.sidebarDescription
    })
  })
}
