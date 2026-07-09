import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('renders the Merak component showcase', async ({ page }) => {
  await expect(page).toHaveTitle('Merak Protocol Design System')
  await expect(page.getByRole('heading', { name: 'Merak Protocol' })).toBeVisible()
  await expect(page.locator('#graph-title')).toBeVisible()
})

test('loads without browser runtime errors', async ({ page }) => {
  const errors = []

  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })

  await page.reload()
  await expect(page.getByRole('heading', { name: 'Merak Protocol' })).toBeVisible()
  expect(errors).toEqual([])
})

test('keeps representative surfaces visually stable', async ({ page }, testInfo) => {
  const sectionId = testInfo.project.name === 'chromium-mobile' ? 'input-title' : 'graph-title'
  const section = page.locator(`#${sectionId}`).locator('xpath=ancestor::section')

  await expect(section).toHaveScreenshot(`${sectionId}.png`, {
    animations: 'disabled',
  })
})

test('updates tabs, command results, and sidebar selection', async ({ page }) => {
  await page.getByRole('tab', { name: 'Trace', exact: true }).first().click()
  await expect(page.getByRole('tab', { name: 'Trace', exact: true }).first()).toHaveAttribute(
    'aria-selected',
    'true',
  )
  await expect(page.locator('[data-tab-panel-title]').first()).toHaveText('TRC-0428')

  const command = page.locator('[data-command-demo]')
  await command.getByRole('button', { name: /verify trace trc-0428/i }).click()
  await command.locator('input').press('Enter')
  await expect(page.locator('[data-command-result]')).toHaveText('verify trace TRC-0428')

  await page.getByRole('link', { name: /graphs/i }).click()
  await expect(page.getByRole('link', { name: /graphs/i })).toHaveAttribute('aria-current', 'page')
  await expect(page.locator('[data-sidebar-current]')).toHaveText('Graphs')
})

test('has no automatically detectable WCAG A/AA violations', async ({ page }) => {
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation: none !important;
        transition: none !important;
      }
    `,
  })

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze()

  expect(results.violations).toEqual([])
})
