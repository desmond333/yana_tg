import { BrowserRouter } from 'react-router-dom'
import { AppShell } from '@/widgets/app-shell'
import { ErrorBoundary, MotionProvider, TelegramProvider, ThemeSync } from './bootstrap'
import { AppRouter } from './router'

export const App = () => (
  <ErrorBoundary>
    <MotionProvider>
      <BrowserRouter>
        <TelegramProvider>
          <ThemeSync />
          <AppShell>
            <AppRouter />
          </AppShell>
        </TelegramProvider>
      </BrowserRouter>
    </MotionProvider>
  </ErrorBoundary>
)
