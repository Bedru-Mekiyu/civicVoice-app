// Analytics and tracking utilities for CivicVoice Et

interface AnalyticsEvent {
  event: string
  category: string
  action: string
  label?: string
  value?: number
  userId?: string
  timestamp: number
  sessionId: string
  userAgent: string
  url: string
  referrer: string
}

class Analytics {
  private sessionId: string
  private userId?: string
  private events: AnalyticsEvent[] = []
  private isEnabled: boolean = false

  constructor() {
    this.sessionId = this.generateSessionId()
    this.isEnabled = !window.location.hostname.includes('localhost')
    
    // Initialize user tracking
    this.initializeUser()
    
    // Track page views automatically
    this.trackPageView()
    
    // Setup beforeunload to send remaining events
    window.addEventListener('beforeunload', () => {
      this.flush()
    })
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private initializeUser(): void {
    // Get user ID from auth token if available
    const token = localStorage.getItem('gi_token')
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        this.userId = payload.sub || payload.id
      } catch (error) {
        console.warn('Failed to parse user token for analytics')
      }
    }
  }

  private createEvent(
    event: string,
    category: string,
    action: string,
    label?: string,
    value?: number
  ): AnalyticsEvent {
    return {
      event,
      category,
      action,
      label,
      value,
      userId: this.userId,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userAgent: navigator.userAgent,
      url: window.location.href,
      referrer: document.referrer || 'direct'
    }
  }

  // Core tracking methods
  track(event: string, category: string, action: string, label?: string, value?: number): void {
    if (!this.isEnabled) return

    const analyticsEvent = this.createEvent(event, category, action, label, value)
    this.events.push(analyticsEvent)

    // Send immediately for critical events
    if (this.isCriticalEvent(event)) {
      this.flush()
    }

    // Auto-flush after 10 events
    if (this.events.length >= 10) {
      this.flush()
    }
  }

  // Convenience methods for common events
  trackPageView(path?: string): void {
    this.track('page_view', 'Navigation', 'view', path || window.location.pathname)
  }

  trackUserAction(action: string, label?: string, value?: number): void {
    this.track('user_action', 'Engagement', action, label, value)
  }

  trackFormSubmission(formName: string, success: boolean): void {
    this.track('form_submission', 'Forms', success ? 'success' : 'error', formName)
  }

  trackError(error: string, context?: string): void {
    this.track('error', 'Errors', 'client_error', `${error} | ${context || 'unknown'}`)
  }

  trackPerformance(metric: string, value: number): void {
    this.track('performance', 'Performance', metric, undefined, value)
  }

  trackFeedbackSubmission(sector: string, rating: number): void {
    this.track('feedback_submission', 'Civic', 'submit_feedback', sector, rating)
  }

  trackLogin(method: string, success: boolean): void {
    this.track('login', 'Auth', success ? 'success' : 'failure', method)
  }

  trackLanguageChange(from: string, to: string): void {
    this.track('language_change', 'i18n', 'change', `${from}_to_${to}`)
  }

  // Performance tracking
  trackPageLoadTime(): void {
    if (typeof window !== 'undefined' && 'performance' in window) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const timing = performance.timing
          const loadTime = timing.loadEventEnd - timing.navigationStart
          this.trackPerformance('page_load_time', loadTime)
        }, 0)
      })
    }
  }

  trackLargestContentfulPaint(): void {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        this.trackPerformance('largest_contentful_paint', lastEntry.startTime)
      })

      try {
        observer.observe({ entryTypes: ['largest-contentful-paint'] })
      } catch (error) {
        // LCP not supported
      }
    }
  }

  // User engagement tracking
  trackTimeOnPage(): void {
    const startTime = Date.now()
    
    const sendTimeOnPage = () => {
      const timeSpent = Date.now() - startTime
      if (timeSpent > 1000) { // Only track if more than 1 second
        this.trackUserAction('time_on_page', window.location.pathname, Math.round(timeSpent / 1000))
      }
    }

    // Track when user leaves page
    window.addEventListener('beforeunload', sendTimeOnPage)
    
    // Track when page becomes hidden
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        sendTimeOnPage()
      }
    })
  }

  // Utility methods
  private isCriticalEvent(event: string): boolean {
    return ['error', 'form_submission', 'feedback_submission'].includes(event)
  }

  private async flush(): Promise<void> {
    if (this.events.length === 0 || !this.isEnabled) return

    const eventsToSend = [...this.events]
    this.events = []

    try {
      // Send to your analytics endpoint
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ events: eventsToSend }),
        keepalive: true // Important for beforeunload events
      })
    } catch (error) {
      console.warn('Failed to send analytics events:', error)
      // Put events back in queue for retry
      this.events.unshift(...eventsToSend)
    }
  }

  // Privacy and GDPR compliance
  setUserConsent(hasConsent: boolean): void {
    this.isEnabled = hasConsent
    localStorage.setItem('analytics_consent', hasConsent.toString())
  }

  getUserConsent(): boolean {
    const consent = localStorage.getItem('analytics_consent')
    return consent === 'true'
  }

  // Clear all stored data
  clearUserData(): void {
    this.events = []
    this.userId = undefined
    localStorage.removeItem('analytics_consent')
  }
}

// Create singleton instance
export const analytics = new Analytics()

// React hook for analytics
export const useAnalytics = () => {
  return {
    track: analytics.track.bind(analytics),
    trackPageView: analytics.trackPageView.bind(analytics),
    trackUserAction: analytics.trackUserAction.bind(analytics),
    trackFormSubmission: analytics.trackFormSubmission.bind(analytics),
    trackError: analytics.trackError.bind(analytics),
    trackFeedbackSubmission: analytics.trackFeedbackSubmission.bind(analytics),
    trackLogin: analytics.trackLogin.bind(analytics),
    trackLanguageChange: analytics.trackLanguageChange.bind(analytics),
    setUserConsent: analytics.setUserConsent.bind(analytics),
    getUserConsent: analytics.getUserConsent.bind(analytics)
  }
}

// Error boundary integration
export const trackError = (error: Error, errorInfo?: any): void => {
  analytics.trackError(error.message, error.stack || JSON.stringify(errorInfo))
}

export default analytics