import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Lock } from "lucide-react"
import { useState } from "react"
import { AuthApi } from "@/lib/api"
import { auth } from "@/lib/auth"
import { useLanguage } from '../contexts/LanguageContext'

export default function LoginPage() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    
    try {
      // Try real API first
      const res = await AuthApi.signin({ email, password })
      if (res?.token) {
        auth.setToken(res.token)
        // Route based on role
        try {
          const payload = JSON.parse(atob(res.token.split('.')?.[1] || ''))
          if (payload?.isAdmin) {
            navigate("/dashboard")
          } else {
            navigate("/dashboard")
          }
        } catch {
          navigate("/dashboard")
        }
      } else {
        setError("Invalid response from server")
      }
    } catch (err: any) {
      // If real API fails, try mock auth
      console.log('Real API failed, using mock authentication')
      const { mockAuth } = await import('@/lib/mockAuth')
      const result = mockAuth.signin(email, password)
      
      if (result.success && result.token) {
        auth.setToken(result.token)
        try {
          const payload = JSON.parse(atob(result.token.split('.')?.[1] || ''))
          if (payload?.isAdmin) {
            navigate("/dashboard")
          } else {
            navigate("/dashboard")
          }
        } catch {
          navigate("/dashboard")
        }
      } else {
        setError(result.error || "Login failed. Try demo@civicvoice.et / demo123")
      }
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse top-10 left-10" />
        <div className="absolute w-64 h-64 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000 bottom-10 right-10" />
      </div>

      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
        <div className="w-full max-w-md relative z-10">
          {/* Glassmorphism card */}
          <div className="bg-card/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-border/50 hover:shadow-3xl transition-all duration-500 group">
            {/* Animated border gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-3xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            
            {/* Logo and branding */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold text-primary-foreground">CV</span>
              </div>
              <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t('landing.title')} <span>{t('landing.subtitle')}</span>
              </h1>
              <h2 className="text-xl font-semibold text-foreground">{t('login.welcome_back')}</h2>
              <p className="text-sm text-muted-foreground mt-2">Enter your credentials to access your account</p>
            </div>

            <form className="space-y-6" onSubmit={onSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">{t('login.email')}</label>
                  <div className="relative group">
                    <Input
                      type="email"
                      className="w-full h-12 bg-muted/50 border-border/50 rounded-xl pr-10 focus:border-primary focus:bg-card transition-all duration-300 group-hover:border-primary/50"
                      placeholder={t('login.email_placeholder')}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Mail className="absolute right-3 top-3 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">{t('login.password')}</label>
                  <div className="relative group">
                    <Input
                      type="password"
                      className="w-full h-12 bg-muted/50 border-border/50 rounded-xl pr-10 focus:border-primary focus:bg-card transition-all duration-300 group-hover:border-primary/50"
                      placeholder={t('login.password_placeholder')}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Lock className="absolute right-3 top-3 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-muted-foreground">
                    Remember me
                  </label>
                </div>
                <Link to="#" className="text-sm text-primary hover:text-primary/80 transition-colors">
                  {t('login.forgot_password')}
                </Link>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <Button 
                type="submit" 
                disabled={loading} 
                className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                    {t('login.signing_in')}
                  </>
                ) : (
                  t('login.sign_in')
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/50" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-muted-foreground">or</span>
              </div>
            </div>

            {/* Social login buttons */}
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full h-12 border-border/50 hover:border-primary/20 hover:bg-muted/50 transition-all duration-300"
                onClick={() => {
                  window.location.href = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/auth/google`
                }}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </Button>
            </div>

            {/* Register link */}
            <div className="text-center mt-6 p-4 rounded-xl bg-muted/30">
              <span className="text-muted-foreground">{t('login.no_account')} </span>
              <Link to="/register" className="text-primary hover:text-primary/80 font-medium transition-colors">
                {t('login.register')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

