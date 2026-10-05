import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './i18n'
import './index.css'
import App from './App'

const root = document.getElementById('root')
if (root === null) {
  throw new Error('index.html is missing the #root mount point')
}

createRoot(root).render(
  <StrictMode>
    {/* A visitor's locale other than English loads as its own chunk; the page renders once it arrives. */}
    <Suspense fallback={null}>
      <App />
    </Suspense>
  </StrictMode>,
)
