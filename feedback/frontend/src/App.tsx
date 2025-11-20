import { Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ThemeProvider } from 'next-themes'
import Landing from './pages/Landing'
import AdminLoginPage from './pages/AdminLogin'
import LoginPage from './pages/Login'
import EnhancedLogin from './pages/EnhancedLogin'
import RegisterPage from './pages/Signup'
import EnhancedSignup from './pages/EnhancedSignup'
import ServicesPage from './pages/Services'
import AdminDashboard from './pages/AdminDashboard'
import FeedbackPage from './pages/Feedback'
import About from './pages/About'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'
import GovernmentServices from './pages/GovernmentServices'
import PublicReports from './pages/PublicReports'
import IssueTracking from './pages/IssueTracking'
import DataAnalytics from './pages/DataAnalytics'
import ReportingTools from './pages/ReportingTools'
import GovernmentPortal from './pages/GovernmentPortal'
import HowItWorks from './pages/HowItWorks'
import Documentation from './pages/Documentation'
import HelpCenter from './pages/HelpCenter'
import OurMission from './pages/OurMission'
import TermsOfService from './pages/TermsOfService'
import PrivacyPolicy from './pages/PrivacyPolicy'
import DataUsagePolicy from './pages/DataUsagePolicy'
import Demo from './pages/Demo'
import AboutPlatform from './pages/AboutPlatform'
import UserProfile from './pages/UserProfile'
import Settings from './pages/Settings'
import CitizenDashboard from './pages/CitizenDashboard'
import ProtectedRoute from './components/ProtectedRoute'
import ErrorBoundary from './components/ErrorBoundary'
import PWAInstallPrompt from './components/PWAInstallPrompt'
import Navigation from './components/Navigation'
import { LanguageProvider } from './contexts/LanguageContext'
import { useToast } from './components/NotificationToast'
import NotFound from './pages/NotFound'

// Create a client instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
})

function AppContent() {
  const { ToastContainer } = useToast()

  return (
    <>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <Navigation />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/admin-login" element={<AdminLoginPage />} />
          <Route path="/login" element={<EnhancedLogin />} />
          <Route path="/register" element={<EnhancedSignup />} />
          <Route path="/listings" element={<ServicesPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/government-services" element={<GovernmentServices />} />
          <Route path="/public-reports" element={<PublicReports />} />
          <Route path="/issue-tracking" element={<IssueTracking />} />
          <Route path="/data-analytics" element={<DataAnalytics />} />
          <Route path="/reporting-tools" element={<ReportingTools />} />
          <Route path="/government-portal" element={<GovernmentPortal />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/our-mission" element={<OurMission />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/data-usage-policy" element={<DataUsagePolicy />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/about-platform" element={<AboutPlatform />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/settings" element={<Settings />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute adminOnly>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/citizen-dashboard"
            element={
              <ProtectedRoute>
                <CitizenDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/feedback"
            element={
              <ProtectedRoute>
                <FeedbackPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/feedback-on-:service"
            element={
              <ProtectedRoute>
                <FeedbackPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      
      {/* Global UI Components */}
      <Toaster />
      <Sonner />
      <ToastContainer />
      <PWAInstallPrompt />
    </>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <TooltipProvider delayDuration={200} skipDelayDuration={300}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={true}
          disableTransitionOnChange={false}
        >
          <QueryClientProvider client={queryClient}>
            <LanguageProvider>
              <AppContent />
            </LanguageProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </TooltipProvider>
    </ErrorBoundary>
  )
}

export default App