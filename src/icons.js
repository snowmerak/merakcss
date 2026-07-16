/** Merak Protocol stroke icons — 24×24 viewBox, currentColor, open soft geometry. */

const PATHS = {
  // Protocol motifs
  star: '<path d="m12 3.2 2.2 5 5.4.5-4 3.7 1.2 5.3L12 15.1l-4.8 2.6 1.2-5.3-4-3.7 5.4-.5L12 3.2Z"/>',
  gate: '<path d="M5.5 19.5V8.2L12 4.5l6.5 3.7v11.3"/><path d="M9.2 19.5v-6.2a2.8 2.8 0 0 1 5.6 0v6.2"/><path d="M5.5 8.2h13"/>',
  eye: '<path d="M3.5 12s3.2-5.5 8.5-5.5S20.5 12 20.5 12s-3.2 5.5-8.5 5.5S3.5 12 3.5 12Z"/><circle cx="12" cy="12" r="2.4"/>',
  archive: '<path d="M5.5 8.5h13v10h-13z"/><path d="M7.5 8.5V5.8h9v2.7"/><path d="M9.5 12.5h5"/>',
  graph: '<circle cx="6.2" cy="12" r="2.3"/><circle cx="17.8" cy="6.5" r="2.3"/><circle cx="17.8" cy="17.5" r="2.3"/><path d="m8.2 10.9 7.2-3.3"/><path d="m8.2 13.1 7.2 3.3"/>',
  seal: '<path d="M12 3.5 5.5 6.2v4.8c0 4.3 2.6 7.3 6.5 9.4 3.9-2.1 6.5-5.1 6.5-9.4V6.2L12 3.5Z"/><path d="m9.4 12.1 1.7 1.7 3.5-3.8"/>',
  shield: '<path d="M12 3.5 5.5 6.2v4.8c0 4.3 2.6 7.3 6.5 9.4 3.9-2.1 6.5-5.1 6.5-9.4V6.2L12 3.5Z"/>',
  compass: '<circle cx="12" cy="12" r="7.5"/><path d="m15.2 8.8-2 4.6-4.5 1.8 2-4.6 4.5-1.8Z"/>',
  terminal: '<rect x="4.5" y="5.5" width="15" height="13" rx="2"/><path d="m8.2 10.2 2.6 1.8-2.6 1.8"/><path d="M12.8 14.8h3.5"/>',

  // Status
  info: '<circle cx="12" cy="12" r="7.5"/><path d="M12 11v4.8"/><path d="M12 8.1v.3"/>',
  success: '<circle cx="12" cy="12" r="7.5"/><path d="m8.6 12.2 2.2 2.2 4.6-4.8"/>',
  warning: '<path d="M12 4.8 19.6 18.5H4.4L12 4.8Z"/><path d="M12 10.2v3.8"/><path d="M12 16.2v.3"/>',
  error: '<circle cx="12" cy="12" r="7.5"/><path d="m9.2 9.2 5.6 5.6"/><path d="m14.8 9.2-5.6 5.6"/>',
  check: '<path d="m6 12.2 3.6 3.6 8.2-8.2"/>',

  // Actions / chrome
  search: '<circle cx="11" cy="11" r="5.25"/><path d="m15.2 15.2 3.3 3.3"/>',
  plus: '<path d="M12 7v10"/><path d="M7 12h10"/>',
  menu: '<path d="M6 8h12"/><path d="M6 12h12"/><path d="M6 16h12"/>',
  filter: '<path d="M5 7h14l-5.2 6.2V18l-3.6 1.6v-6.4L5 7Z"/>',
  close: '<path d="m8 8 8 8"/><path d="m16 8-8 8"/>',
  copy: '<path d="M9 9h9.5v11H9z"/><path d="M7 15H5.8V5.5H15V6.8"/>',
  revoke: '<path d="M12 3.5 5.5 6.2v4.8c0 4.3 2.6 7.3 6.5 9.4 3.9-2.1 6.5-5.1 6.5-9.4V6.2L12 3.5Z"/><path d="m9.2 9.2 5.6 5.6"/><path d="m14.8 9.2-5.6 5.6"/>',
  hash: '<path d="m10 5.5-1.8 13"/><path d="m15.8 5.5-1.8 13"/><path d="M5.5 9.2h13"/><path d="M4.8 14.8h13"/>',
  keyboard: '<rect x="3.8" y="6.8" width="16.4" height="10.4" rx="2"/><path d="M7.2 10h.2M11 10h.2M14.8 10h.2M7.2 13h.2M11 13h5.5"/>',
  paragraph: '<path d="M12 5.5h5.5"/><path d="M12 5.5v13"/><path d="M9.2 5.5H12"/><path d="M9.2 5.5a3.2 3.2 0 0 0 0 6.4H12"/>',
  switch: '<rect x="3.8" y="7.2" width="16.4" height="9.6" rx="4.8"/><circle cx="14.4" cy="12" r="2.8"/>',
  list: '<path d="M9.2 7.2h9.3"/><path d="M9.2 12h9.3"/><path d="M9.2 16.8h9.3"/><path d="M5.5 7.2h.3"/><path d="M5.5 12h.3"/><path d="M5.5 16.8h.3"/>',
  table: '<rect x="4.5" y="5.5" width="15" height="13" rx="1.5"/><path d="M4.5 10h15"/><path d="M4.5 14.5h15"/><path d="M10 5.5v13"/>',
  target: '<circle cx="12" cy="12" r="7.5"/><circle cx="12" cy="12" r="3.8"/><circle cx="12" cy="12" r="1"/>',
  crosshair: '<circle cx="12" cy="12" r="5.5"/><path d="M12 3.8v2.6"/><path d="M12 17.6v2.6"/><path d="M3.8 12h2.6"/><path d="M17.6 12h2.6"/>',
  diamond: '<path d="M12 3.8 19.6 12 12 20.2 4.4 12 12 3.8Z"/>',
  bolt: '<path d="M13 3.8 6.5 13h4.6l-.9 7.2L17.5 11h-4.6l1.1-7.2Z"/>',
  square: '<rect x="5.5" y="5.5" width="13" height="13" rx="1.5"/>',
  box: '<path d="M5.5 8.5h13v10h-13z"/><path d="M5.5 12h13"/><path d="M12 8.5v10"/>',
  waves: '<path d="M3.8 9.2c1.8 0 1.8 1.8 3.6 1.8s1.8-1.8 3.6-1.8 1.8 1.8 3.6 1.8 1.8-1.8 3.6-1.8"/><path d="M3.8 14.2c1.8 0 1.8 1.8 3.6 1.8s1.8-1.8 3.6-1.8 1.8 1.8 3.6 1.8 1.8-1.8 3.6-1.8"/>',
  circle: '<circle cx="12" cy="12" r="5.5"/>',
  circleDashed: '<circle cx="12" cy="12" r="6.5" stroke-dasharray="2.4 2.8"/>',
  arrowUp: '<path d="M12 18.2V6.2"/><path d="m7.5 10.2 4.5-4.5 4.5 4.5"/>',
  arrowDown: '<path d="M12 5.8v12"/><path d="m7.5 13.8 4.5 4.5 4.5-4.5"/>',
  chevronRight: '<path d="m9.2 6.5 5.6 5.5-5.6 5.5"/>',
  chevronLeft: '<path d="m14.8 6.5-5.6 5.5 5.6 5.5"/>',
  chevronDown: '<path d="m6.5 9.2 5.5 5.6 5.5-5.6"/>',
  chevronUp: '<path d="m6.5 14.8 5.5-5.6 5.5 5.6"/>',
  timeline: '<path d="M8 5.5v13"/><circle cx="8" cy="7.2" r="1.8"/><circle cx="8" cy="12" r="1.8"/><circle cx="8" cy="16.8" r="1.8"/><path d="M11.5 7.2h6.5"/><path d="M11.5 12h6.5"/><path d="M11.5 16.8h6.5"/>',
  panel: '<rect x="4.5" y="5.5" width="15" height="13" rx="1.5"/><path d="M10 5.5v13"/>',
  home: '<path d="m4.8 11 7.2-6.2 7.2 6.2"/><path d="M7 10.2v8.3h10v-8.3"/>',
  observe: '<path d="M3.5 12s3.2-5.5 8.5-5.5S20.5 12 20.5 12s-3.2 5.5-8.5 5.5S3.5 12 3.5 12Z"/><circle cx="12" cy="12" r="2.4"/>',
  risk: '<path d="M12 4.8 19.6 18.5H4.4L12 4.8Z"/><path d="M12 10.2v3.8"/><path d="M12 16.2v.3"/>',
  type: '<path d="M5.5 7.2h13"/><path d="M12 7.2v10"/><path d="M9.2 17.2h5.6"/>',
  layers: '<path d="m12 4.5 7.5 3.6L12 11.7 4.5 8.1 12 4.5Z"/><path d="m4.5 12 7.5 3.6 7.5-3.6"/><path d="m4.5 15.5 7.5 3.6 7.5-3.6"/>',
  resource: '<rect x="5.5" y="5.5" width="13" height="13" rx="1.5"/><path d="M5.5 10h13"/>',
  policy: '<path d="m10 5.5-1.8 13"/><path d="m15.8 5.5-1.8 13"/><path d="M5.5 9.2h13"/><path d="M4.8 14.8h13"/>',
  interactive: '<path d="m9.2 6.5 5.6 5.5-5.6 5.5"/>',
  external: '<path d="M10 5.5h8.5V14"/><path d="m9 15 9.5-9.5"/><path d="M6.5 8.5v10h10"/>',
  link: '<path d="M9.5 14.5 7.8 16.2a3 3 0 0 1-4.2-4.2l2.5-2.5a3 3 0 0 1 4.2 0"/><path d="M14.5 9.5 16.2 7.8a3 3 0 0 1 4.2 4.2l-2.5 2.5a3 3 0 0 1-4.2 0"/><path d="m9.8 14.2 4.4-4.4"/>',
  clock: '<circle cx="12" cy="12" r="7.5"/><path d="M12 8v4.5l3 2"/>',
  user: '<circle cx="12" cy="9" r="3"/><path d="M6.5 18.2c1.2-2.8 3-4.2 5.5-4.2s4.3 1.4 5.5 4.2"/>',
  lock: '<rect x="6.5" y="10.5" width="11" height="8.5" rx="1.5"/><path d="M9 10.5V8.2a3 3 0 0 1 6 0v2.3"/>',
  unlock: '<rect x="6.5" y="10.5" width="11" height="8.5" rx="1.5"/><path d="M9 10.5V8.2a3 3 0 0 1 5.7-1.3"/>',
  spark: '<path d="M12 4.5v3.2"/><path d="M12 16.3v3.2"/><path d="M4.5 12h3.2"/><path d="M16.3 12h3.2"/><path d="m7.2 7.2 2.2 2.2"/><path d="m14.6 14.6 2.2 2.2"/><path d="m16.8 7.2-2.2 2.2"/><path d="m9.4 14.6-2.2 2.2"/>',
}

const VARIANT_ICONS = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  error: 'error',
  danger: 'error',
}

function sizeClass(size) {
  if (size === 'sm') return 'mp-symbol--sm'
  if (size === 'lg') return 'mp-symbol--lg'
  return ''
}

/**
 * @param {string} name
 * @param {{ size?: 'sm'|'md'|'lg', className?: string, label?: string }} [opts]
 */
export function iconSvg(name, opts = {}) {
  const body = PATHS[name]
  if (!body) {
    console.warn(`[icons] unknown icon: ${name}`)
    return ''
  }

  const classes = ['mp-symbol', sizeClass(opts.size), opts.className]
    .filter(Boolean)
    .join(' ')
  if (opts.label) {
    return `<svg class="${classes}" viewBox="0 0 24 24" role="img" aria-label="${opts.label}">${body}</svg>`
  }
  return `<svg class="${classes}" viewBox="0 0 24 24" aria-hidden="true">${body}</svg>`
}

export function iconNode(name, opts = {}) {
  const template = document.createElement('template')
  template.innerHTML = iconSvg(name, opts).trim()
  return template.content.firstElementChild
}

export function statusIconName(variant = 'info') {
  return VARIANT_ICONS[variant] ?? VARIANT_ICONS.info
}

export function statusIconHtml(variant = 'info', size = 'sm') {
  return iconSvg(statusIconName(variant), { size })
}

export const iconNames = Object.keys(PATHS)
