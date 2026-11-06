import type { ReactNode } from 'react'
import { handleExternalLinkClick } from '@/shared/lib'
import { AuroraBackground } from '@/shared/ui'
import { AppHeader } from './AppHeader'
import { BottomNav } from './BottomNav'

export const AppShell = ({ children }: { children: ReactNode }) => (
  <div className="app-viewport relative isolate flex flex-col overflow-x-clip">
    <AuroraBackground />
    <AppHeader />
    <main className="mx-auto w-full max-w-md flex-1 px-4 pt-4 pb-36 md:max-w-6xl md:px-8 md:pt-8 md:pb-20">{children}</main>
    <footer className="relative z-10 mx-auto w-full max-w-md px-4 pt-2 pb-28 md:max-w-6xl md:px-8 md:pb-10">
      <p className="text-center text-[10px] font-semibold tracking-[0.24em] text-muted/55 uppercase">
        сделано{' '}
        <a
          href="https://t.me/desmond333"
          target="_blank"
          rel="noreferrer"
          onClick={handleExternalLinkClick}
          className="underline decoration-accent/30 underline-offset-4 transition-colors duration-300 hover:text-accent hover:decoration-accent"
        >
          Tay Solutions
        </a>
      </p>
    </footer>
    <BottomNav />
  </div>
)
