export function setupCommandInput(root) {
  if (!root) return

  const input = root.querySelector('.mp-command')
  const suggestions = root.querySelectorAll('[data-command-value]')
  const result = document.querySelector('[data-command-result]')

  suggestions.forEach((suggestion) => {
    suggestion.addEventListener('click', () => {
      suggestions.forEach((candidate) => candidate.classList.remove('is-active'))
      suggestion.classList.add('is-active')

      input.value = suggestion.dataset.commandValue
      input.focus()
    })
  })

  input.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter') return

    event.preventDefault()

    if (result) {
      result.textContent = input.value.trim() || 'No command entered.'
    }
  })
}
