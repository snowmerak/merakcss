# Custom Elements

Merak custom elements are optional behavior layers on top of the CSS package. Import the CSS once, then import only the elements your page uses.

## `merak-tabs`

`merak-tabs` is a light DOM custom element. It uses the existing Merak CSS classes, so CSS variables and application-level overrides continue to work.

```js
import 'merak-protocol-design-system/style.css'
import 'merak-protocol-design-system/elements/merak-tabs'

const tabs = document.querySelector('merak-tabs')

tabs.items = [
  { value: 'overview', label: 'Overview' },
  { value: 'trace', label: 'Trace' },
  { value: 'decision', label: 'Decision', disabled: true },
]

tabs.renderPanel = (item) => `Selected: ${item.label}`
tabs.onChange = ({ value }) => console.log(value)

tabs.addEventListener('merak-change', (event) => {
  console.log(event.detail.value)
})
```

```html
<merak-tabs label="Record detail" value="overview"></merak-tabs>
```

`items`, `renderPanel`, and `onChange` are JavaScript properties because HTML attributes only represent strings. The element emits a bubbling, composed `merak-change` event with `{ value, item }` in `event.detail`.
