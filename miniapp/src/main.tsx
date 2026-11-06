import '@fontsource-variable/onest'
import '@fontsource/playfair-display/latin-600.css'
import '@fontsource/playfair-display/cyrillic-600.css'
import '@fontsource/playfair-display/latin-600-italic.css'
import '@fontsource/playfair-display/cyrillic-600-italic.css'
import '@fontsource/playfair-display/latin-700.css'
import '@fontsource/playfair-display/cyrillic-700.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/app/styles/index.css'
import { App } from '@/app/App'
import { initTelegram } from '@/shared/lib'

initTelegram()

const rootElement = document.getElementById('root')

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
