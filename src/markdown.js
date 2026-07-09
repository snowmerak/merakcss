import createDOMPurify from 'dompurify'
import { marked } from 'marked'

const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]))
const inline = (renderer, tokens) => renderer.parser.parseInline(tokens)

export function renderMerakMarkdown(markdown) {
  const renderer = new marked.Renderer()
  renderer.heading = function (token) { return `<h${token.depth}>${inline(this, token.tokens)}</h${token.depth}>\n` }
  renderer.paragraph = function (token) { return `<p>${inline(this, token.tokens)}</p>\n` }
  renderer.list = function (token) { const tag = token.ordered ? 'ol' : 'ul'; const task = token.items.some((item) => item.task); return `<${tag} class="mp-list${task ? ' mp-list--task' : ''}">${token.items.map((item) => this.listitem(item)).join('')}</${tag}>\n` }
  renderer.listitem = function (token) { const content = this.parser.parse(token.tokens).replace(/^<p>|<\/p>\n?$/g, '').replace(/^<input[^>]*>\s*/, ''); return token.task ? `<li><label><input type="checkbox"${token.checked ? ' checked' : ''} disabled><span>${content}</span></label></li>\n` : `<li>${content}</li>\n` }
  renderer.blockquote = function (token) { return `<aside class="mp-alert mp-alert--info" role="note"><span class="mp-alert__icon" aria-hidden="true">i</span><div class="mp-alert__content">${this.parser.parse(token.tokens)}</div></aside>\n` }
  renderer.code = function (token) { const language = token.lang ? escapeHtml(token.lang) : 'text'; return `<div class="mp-command-result"><span class="mp-command-result__label">${language}</span><code class="mp-command-result__value">${escapeHtml(token.text)}</code></div>\n` }
  renderer.hr = () => '<hr class="mp-divider">\n'
  renderer.table = function (token) { const header = token.header.map((cell) => `<th>${inline(this, cell.tokens)}</th>`).join(''); const rows = token.rows.map((row) => `<tr>${row.map((cell) => `<td>${inline(this, cell.tokens)}</td>`).join('')}</tr>`).join(''); return `<div class="table-shell"><table class="mp-table"><thead><tr>${header}</tr></thead><tbody>${rows}</tbody></table></div>\n` }
  renderer.html = () => ''
  const html = marked.parse(markdown, { gfm: true, renderer })
  return typeof window === 'undefined' ? html : createDOMPurify(window).sanitize(html, { USE_PROFILES: { html: true } })
}
