function selectTab(tabs, tab) {
  const panel = tabs.querySelector('.mp-tabs__panel')

  tabs.querySelectorAll('.mp-tabs__tab').forEach((candidate) => {
    candidate.setAttribute('aria-selected', String(candidate === tab))
  })

  if (!panel) return

  const eyebrow = panel.querySelector('[data-tab-panel-eyebrow]')
  const title = panel.querySelector('[data-tab-panel-title]')
  const body = panel.querySelector('[data-tab-panel-body]')

  if (eyebrow) eyebrow.textContent = tab.dataset.tabEyebrow
  if (title) title.textContent = tab.dataset.tabTitle
  if (body) body.textContent = tab.dataset.tabBody
}

export function setupTabs(tabGroups) {
  tabGroups.forEach((tabs) => {
    tabs.querySelectorAll('.mp-tabs__tab').forEach((tab) => {
      tab.addEventListener('click', () => selectTab(tabs, tab))
    })
  })
}
