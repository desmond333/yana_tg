import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const sdk = vi.hoisted(() => ({
  init: vi.fn(),
  isTMA: vi.fn(() => true),
  miniApp: { mount: vi.fn(), ready: vi.fn() },
  retrieveLaunchParams: vi.fn(() => ({
    tgWebAppData: { user: { id: 42, first_name: 'Яна' } },
    tgWebAppPlatform: 'tdesktop',
  })),
  themeParams: { mount: vi.fn(), bindCssVars: vi.fn() },
  viewport: { mount: vi.fn<() => Promise<void>>(() => Promise.resolve()), bindCssVars: vi.fn(), expand: vi.fn() },
}))

vi.mock('@tma.js/sdk', () => sdk)

describe('Telegram initialization', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  afterEach(() => vi.restoreAllMocks())

  it('binds viewport CSS variables after mounting completes', async () => {
    let completeMount: () => void = () => undefined
    sdk.viewport.mount.mockReturnValueOnce(new Promise<void>((resolve) => (completeMount = resolve)))
    const { initTelegram } = await import('./core')

    initTelegram()
    expect(sdk.viewport.bindCssVars).not.toHaveBeenCalled()
    expect(sdk.miniApp.ready).toHaveBeenCalledOnce()
    completeMount()
    await vi.waitFor(() => expect(sdk.viewport.bindCssVars).toHaveBeenCalledOnce())
  })

  it('handles viewport mount rejection', async () => {
    const warning = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
    sdk.viewport.mount.mockRejectedValueOnce(new Error('Viewport timeout'))
    const { initTelegram } = await import('./core')

    initTelegram()
    await vi.waitFor(() => expect(warning).toHaveBeenCalled())
    expect(sdk.viewport.bindCssVars).not.toHaveBeenCalled()
  })
})
