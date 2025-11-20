import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react"
import { useState, useEffect } from "react"
import { AuthApi } from "@/lib/api"
import { auth } from "@/lib/auth"
import { useLanguage } from '../contexts/LanguageContext'
import { loginSchema } from '@/lib/validation'
import { useFormValidation } from '@/hooks/useFormValidation'
import { toast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

export default function EnhancedLoginPage() {
  const navigate = useNavigate()
  const { t, translate } = useLanguage()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const { errors, validate, validateField, clearError } = useFormValidation(loginSchema)

  // Check if already logged in
  useEffect(() => {
    const token = auth.getToken()
    if (token) {
      navigate('/dashboard')
    }
  }, [navigate])

  // Load remembered email
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail')
    if (rememberedEmail) {
      setEmail(rememberedEmail)
      setRememberMe(true)
    }
  }, [])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    const formData = { email, password }
    if (!validate(formData)) {
      toast({
        title: translate('login.validation_error_title', 'Validation Error'),
        description: translate('login.validation_error_desc', 'Please check your input and try again.'),
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    
    try {
      // Try real API first
      const res = await AuthApi.signin({ email, password })
      if (res?.token) {
        auth.setToken(res.token)
        
        // Handle remember me
        if (rememberMe) {
          localStorage.setItem('rememberedEmail', email)
        } else {
          localStorage.removeItem('rememberedEmail')
        }
        
        // Route based on role
        try {
          const payload = JSON.parse(atob(res.token.split('.')?.[1] || ''))
          toast({
            title: translate('login.success_title', 'Welcome back!'),
            description: (translate('login.success_desc', 'Logged in as {email}')).replace('{email}', payload?.name || email),
          })
          
          if (payload?.isAdmin) {
            navigate("/dashboard")
          } else {
            navigate("/dashboard")
          }
        } catch {
          navigate("/dashboard")
        }
      } else {
        toast({
          title: translate('login.login_failed_title', 'Login Failed'),
          description: translate('login.login_failed_desc', 'Please verify your email and password.'),
          variant: "destructive",
        })
      }
    } catch (err: any) {
      // If real API fails, try mock auth
      console.info('API unavailable, using mock authentication')
      const { mockAuth } = await import('@/lib/mockAuth')
      const result = mockAuth.signin(email, password)
      
      if (result.success && result.token) {
        auth.setToken(result.token)
        
        if (rememberMe) {
          localStorage.setItem('rememberedEmail', email)
        } else {
          localStorage.removeItem('rememberedEmail')
        }
        
        try {
          const payload = JSON.parse(atob(result.token.split('.')?.[1] || ''))
          toast({
            title: translate('login.success_title', 'Welcome back!'),
            description: (translate('login.success_desc', 'Logged in as {email}')).replace('{email}', payload?.name || email),
          })
          
          if (payload?.isAdmin) {
            navigate("/dashboard")
          } else {
            navigate("/dashboard")
          }
        } catch {
          navigate("/dashboard")
        }
      } else {
        toast({
          title: translate('login.login_failed_title', 'Login Failed'),
          description: result.error || translate('login.login_failed_desc', 'Please verify your email and password.'),
          variant: "destructive",
        })
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
              <p className="text-sm text-muted-foreground mt-2">
                {translate('login.enter_credentials', 'Enter your credentials to access your account')}
              </p>
            </div>

            <form className="space-y-6" onSubmit={onSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">{t('login.email')}</label>
                  <div className="relative group">
                    <Input
                      type="email"
                      className={cn(
                        "w-full h-12 bg-muted/50 border-border/50 rounded-xl pr-10 focus:border-primary focus:bg-card transition-all duration-300 group-hover:border-primary/50",
                        errors.email && "border-destructive focus:border-destructive"
                      )}
                      placeholder={t('login.email_placeholder')}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        clearError('email')
                      }}
                      onBlur={() => validateField('email', email)}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    <Mail className={cn(
                      "absolute right-3 top-3 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors",
                      errors.email && "text-destructive"
                    )} />
                  </div>
                  {errors.email && (
                    <div id="email-error" className="flex items-center gap-1 mt-1 text-xs text-destructive">
                      <AlertCircle className="h-3 w-3" />
                      <span>{errors.email}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">{t('login.password')}</label>
                  <div className="relative group">
                    <Input
                      type={showPassword ? "text" : "password"}
                      className={cn(
                        "w-full h-12 bg-muted/50 border-border/50 rounded-xl pr-20 focus:border-primary focus:bg-card transition-all duration-300 group-hover:border-primary/50",
                        errors.password && "border-destructive focus:border-destructive"
                      )}
                      placeholder={t('login.password_placeholder')}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value)
                        clearError('password')
                      }}
                      onBlur={() => validateField('password', password)}
                      aria-invalid={!!errors.password}
                      aria-describedby={errors.password ? "password-error" : undefined}
                    />
                    <div className="absolute right-3 top-3 flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label={showPassword ? translate('common.hide_password', 'Hide password') : translate('common.show_password', 'Show password')}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                      <Lock className={cn(
                        "h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors",
                        errors.password && "text-destructive"
                      )} />
                    </div>
                  </div>
                  {errors.password && (
                    <div id="password-error" className="flex items-center gap-1 mt-1 text-xs text-destructive">
                      <AlertCircle className="h-3 w-3" />
                      <span>{errors.password}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-primary focus:ring-primary border-border rounded cursor-pointer"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-muted-foreground cursor-pointer">
                    {translate('login.remember_me', 'Remember me')}
                  </label>
                </div>
                <Link to="/forgot-password" className="text-sm text-primary hover:text-primary/80 transition-colors">
                  {t('login.forgot_password')}
                </Link>
              </div>

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
                <span className="px-2 bg-card text-muted-foreground">{translate('common.or', 'or')}</span>
              </div>
            </div>

            {/* Demo credentials helper */}
            <div className="p-4 bg-muted/30 rounded-xl space-y-2">
              <p className="text-xs font-medium text-foreground">{translate('login.demo_credentials_title', 'Demo Credentials:')}</p>
              <div className="text-xs text-muted-foreground space-y-1">
                <div>{translate('login.demo_admin', 'Admin: admin@civicvoice.et / admin123')}</div>
                <div>{translate('login.demo_user', 'User: demo@civicvoice.et / demo123')}</div>
              </div>
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
