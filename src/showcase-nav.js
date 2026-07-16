const GROUPS = [
  {
    label: 'Foundation',
    items: [
      ['button-title', '01', 'Button'],
      ['card-title', '02', 'Card'],
      ['link-list-title', '03', 'Link List'],
      ['badge-title', '04', 'Badge'],
      ['input-title', '05', 'Form Controls'],
      ['alert-title', '06', 'Alert'],
    ],
  },
  {
    label: 'Data',
    items: [
      ['table-title', '07', 'Table'],
      ['graph-title', '08', 'Graph'],
      ['timeline-title', '09', 'Timeline'],
      ['inspector-title', '10', 'Inspector'],
      ['icon-title', '11', 'Icons'],
      ['motion-title', '12', 'Motion'],
    ],
  },
  {
    label: 'Shell',
    items: [
      ['sidebar-title', '13', 'Sidebar'],
      ['tabs-title', '14', 'Tabs'],
      ['command-title', '15', 'Command'],
      ['gate-card-title', '16', 'Gate Card'],
      ['agent-panel-title', '17', 'Agent Panel'],
      ['divider-title', '18', 'Divider'],
      ['list-title', '19', 'List'],
    ],
  },
  {
    label: 'Identity',
    items: [
      ['confidence-meter-title', '20', 'Confidence'],
      ['decision-banner-title', '21', 'Decision'],
      ['evidence-list-title', '22', 'Evidence'],
      ['filter-bar-title', '23', 'Filter Bar'],
    ],
  },
  {
    label: 'System',
    items: [
      ['feedback-title', '24', 'Feedback'],
      ['navigation-extra-title', '25', 'Navigation'],
      ['overlay-title', '26', 'Overlay'],
      ['markdown-title', 'MD', 'Markdown'],
    ],
  },
]

export function renderShowcaseToc() {
  const parts = [
    '<nav class="showcase-toc" aria-label="Component index">',
    '<div class="showcase-toc__title">Components</div>',
    '<ul class="showcase-toc__list">',
  ]

  for (const group of GROUPS) {
    parts.push(`<li class="showcase-toc__group" aria-hidden="true">${group.label}</li>`)
    for (const [id, index, label] of group.items) {
      parts.push(
        `<li><a href="#${id}" data-toc-target="${id}"><span class="showcase-toc__index">${index}</span>${label}</a></li>`,
      )
    }
  }

  parts.push('</ul></nav>')
  return parts.join('')
}

export function setupShowcaseLayout() {
  const showcase = document.querySelector('.showcase')
  if (!showcase || showcase.querySelector('.showcase-shell')) return

  const hero = showcase.querySelector('.showcase-hero')
  const sections = [...showcase.querySelectorAll('.showcase-section')]
  if (!hero || !sections.length) return

  const shell = document.createElement('div')
  shell.className = 'showcase-shell'

  const tocWrap = document.createElement('div')
  tocWrap.innerHTML = renderShowcaseToc()
  const toc = tocWrap.firstElementChild

  const main = document.createElement('div')
  main.className = 'showcase-main'

  showcase.insertBefore(shell, hero)
  shell.append(toc, main)
  main.append(hero, ...sections)

  const links = [...toc.querySelectorAll('a[data-toc-target]')]
  const targets = links
    .map((link) => document.getElementById(link.dataset.tocTarget))
    .filter(Boolean)

  const setCurrent = (id) => {
    links.forEach((link) => {
      if (link.dataset.tocTarget === id) link.setAttribute('aria-current', 'true')
      else link.removeAttribute('aria-current')
    })
  }

  if (targets[0]) setCurrent(targets[0].id)

  if (typeof IntersectionObserver === 'function') {
    const sectionToId = new Map()
    targets.forEach((target) => {
      const section = target.closest('.showcase-section') ?? target
      sectionToId.set(section, target.id)
    })

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        const id = visible[0] ? sectionToId.get(visible[0].target) : null
        if (id) setCurrent(id)
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0.1, 0.25, 0.5],
      },
    )

    sectionToId.forEach((_, section) => observer.observe(section))
  }

  links.forEach((link) => {
    link.addEventListener('click', () => setCurrent(link.dataset.tocTarget))
  })
}
