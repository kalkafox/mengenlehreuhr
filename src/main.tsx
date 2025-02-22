import '@/lib/i18n'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import LanguageDetector from 'i18next-browser-languagedetector'
import { Provider } from 'jotai'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app.tsx'
import { ThemeProvider } from './components/theme-provider.tsx'
import { Toaster } from './components/ui/toaster.tsx'
import './index.css'
import { languageAtom, store } from './lib/atom.ts'

const queryClient = new QueryClient()

const languageDetector = new LanguageDetector()

const language = languageDetector.detect()

if (language && !Array.isArray(language)) {
  store.set(languageAtom, language)
}

document.addEventListener('DOMContentLoaded', () => {
  const loading = document.getElementById('loading-bar')!

  loading.style.width = '100%'
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <QueryClientProvider client={queryClient}>
          <Toaster />
          <App />
        </QueryClientProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>
)
