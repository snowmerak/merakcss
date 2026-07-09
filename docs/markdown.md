# Markdown Renderer

`renderMerakMarkdown()` converts Markdown into sanitized HTML composed from existing Merak classes.

```js
import 'merak-protocol-design-system/style.css'
import { renderMerakMarkdown } from 'merak-protocol-design-system/markdown'

target.innerHTML = renderMerakMarkdown(markdown)
```

Headings, paragraphs, links, inline code, tables, blockquotes, code blocks, dividers, and task lists map to the existing base styles and `mp-table`, `mp-alert`, `mp-command-result`, `mp-divider`, and `mp-list` components. Raw HTML from the Markdown source is removed.
