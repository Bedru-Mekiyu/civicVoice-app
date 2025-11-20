import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import ErrorBoundary from './components/ErrorBoundary.tsx'
import LoadingSpinner from './components/LoadingSpinner.tsx'
import './index.css'
import './styles/animations.css'
import './styles/amharic-fix.css'

// Lazy load the main App component for better performance
const App = lazy(() => import('./App.tsx'))

// Initialize the app
const root = createRoot(document.getElementById('root')!)

root.render(
  <StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <BrowserRouter>
          <Suspense fallback={<LoadingSpinner />}>
            <App />
          </Suspense>
        </BrowserRouter>
      </HelmetProvider>
    </ErrorBoundary>
  </StrictMode>
)