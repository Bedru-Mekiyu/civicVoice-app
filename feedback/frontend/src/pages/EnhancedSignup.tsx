import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Mail, User, Lock, ShieldCheck, Eye, EyeOff, AlertCircle } from "lucide-react"
import { AuthApi } from "@/lib/api"
import { auth } from "@/lib/auth"
import { useLanguage } from "@/contexts/LanguageContext"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { registerSchema, otpSchema } from '@/lib/validation'
import { useFormValidation } from '@/hooks/useFormValidation'
import { PasswordStrengthMeter } from '@/components/PasswordStrengthMeter'
import { toast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

export default function EnhancedSignupPage() {
  const navigate = useNavigate()
  const { t, translate } = useLanguage()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [accepted, setAccepted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [stage, setStage] = useState<'register' | 'verify'>("register")
  const [otp, setOtp] = useState("")
  const { errors: regErrors, validate: validateReg, validateField: validateRegField, clearError: clearRegError } = useFormValidation(registerSchema)
  const { errors: otpErrors, validate: validateOtp } = useFormValidation(otpSchema)

  const verificationDescription = translate('signup.verification_desc', "We've sent a 6-digit verification code to {email}")
  const verificationDescriptionParts = verificationDescription.split('{email}')

  async function onRegister(e: React.FormEvent) {
    e.preventDefault()
    
    if (!accepted) {
      toast({
        title: translate('signup.validation_error_title', 'Validation Error'),
        description: translate('signup.error.accept_terms', 'Please accept the terms and conditions.'),
        variant: "destructive",
      })
      return
    }

    const formData = { name, email, password, confirmPassword }
    if (!validateReg(formData)) {
      toast({
        title: translate('signup.validation_error_title', 'Validation Error'),
        description: translate('signup.validation_error_desc', 'Please check your input and try again.'),
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      // Try real API first
      const res = await AuthApi.register({ name, email, password })
      if ((res as any)?.message) {
        toast({
          title: translate('signup.success_title', 'Check your email!'),
          description: translate('signup.success_desc', "We've sent a verification code to your email."),
        })
      }
      setStage("verify")
    } catch (err: any) {
      toast({
        title: translate('signup.registration_failed_title', 'Registration Failed'),
        description: err?.message || translate('signup.registration_failed_desc', 'An error occurred during registration.'),
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  async function onVerify(e: React.FormEvent) {
    e.preventDefault()
    
    const otpData = { otp }
    if (!validateOtp(otpData)) {
      toast({
        title: translate('signup.invalid_otp_title', 'Invalid OTP'),
        description: translate('signup.invalid_otp_desc', 'Please enter a valid 6-digit code.'),
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      // Try real API first
      const res = await AuthApi.activate({ email, otp })
      if ((res as any)?.token) {
        auth.setToken((res as any).token)
        toast({
          title: "Welcome to CivicVoice!",
          description: "Your account has been verified successfully.",
        })
        navigate("/dashboard")
      } else {
        toast({
          title: "Verification Failed",
          description: "Invalid server response",
          variant: "destructive",
        })
      }
    } catch (err: any) {
      toast({
        title: translate('signup.verification_failed_title', 'Verification Failed'),
        description: err?.message || translate('signup.verification_failed_desc', 'An error occurred during verification.'),
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse top-10 left-10" />
        <div className="absolute w-64 h-64 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000 bottom-10 right-10" />
      </div>

      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
        <div className="w-full max-w-md relative z-10">
          <div className="bg-card/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-border/50 hover:shadow-3xl transition-all duration-500 group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-3xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
        
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold text-primary-foreground">CV</span>
              </div>
              <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t('landing.title')} <span>{t('landing.subtitle')}</span>
              </h1>
              <h2 className="text-xl font-semibold text-foreground">{translate('signup.hero.title', 'Create Account')}</h2>
              <p className="text-sm text-muted-foreground mt-2">{translate('signup.hero.subtitle', 'Join thousands of engaged citizens')}</p>
            </div>

          {/* Registration / Verification */}
          {stage === "register" ? (
            <form className="space-y-4" onSubmit={onRegister}>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {translate('signup.full_name', 'Full Name')}
                </label>
                <div className="relative group">
                  <Input
                    type="text"
                    className={cn(
                      "w-full h-12 bg-muted/50 border-border/50 rounded-xl pr-10 focus:border-primary focus:bg-card transition-all duration-300 group-hover:border-primary/50",
                      regErrors.name && "border-destructive focus:border-destructive"
                    )}
                    placeholder={translate('signup.full_name_placeholder', 'Your name')}
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value)
                      clearRegError('name')
                    }}
                    onBlur={() => validateRegField('name', name)}
                    aria-invalid={!!regErrors.name}
                  />
                  <User className={cn(
                    "absolute right-3 top-3 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors",
                    regErrors.name && "text-destructive"
                  )} />
                </div>
                {regErrors.name && (
                  <div className="flex items-center gap-1 mt-1 text-xs text-destructive">
                    <AlertCircle className="h-3 w-3" />
                    <span>{regErrors.name}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">{t('login.email')}</label>
                <div className="relative group">
                  <Input
                    type="email"
                    className={cn(
                      "w-full h-12 bg-muted/50 border-border/50 rounded-xl pr-10 focus:border-primary focus:bg-card transition-all duration-300 group-hover:border-primary/50",
                      regErrors.email && "border-destructive focus:border-destructive"
                    )}
                    placeholder={t('login.email_placeholder')}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      clearRegError('email')
                    }}
                    onBlur={() => validateRegField('email', email)}
                    aria-invalid={!!regErrors.email}
                  />
                  <Mail className={cn(
                    "absolute right-3 top-3 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors",
                    regErrors.email && "text-destructive"
                  )} />
                </div>
                {regErrors.email && (
                  <div className="flex items-center gap-1 mt-1 text-xs text-destructive">
                    <AlertCircle className="h-3 w-3" />
                    <span>{regErrors.email}</span>
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
                      regErrors.password && "border-destructive focus:border-destructive"
                    )}
                    placeholder={t('login.password_placeholder')}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      clearRegError('password')
                    }}
                    onBlur={() => validateRegField('password', password)}
                    aria-invalid={!!regErrors.password}
                  />
                  <div className="absolute right-3 top-3 flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                    <Lock className={cn(
                      "h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors",
                      regErrors.password && "text-destructive"
                    )} />
                  </div>
                </div>
                {regErrors.password && (
                  <div className="flex items-center gap-1 mt-1 text-xs text-destructive">
                    <AlertCircle className="h-3 w-3" />
                    <span>{regErrors.password}</span>
                  </div>
                )}
                <PasswordStrengthMeter password={password} />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {translate('signup.confirm_password', 'Confirm Password')}
                </label>
                <div className="relative group">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    className={cn(
                      "w-full h-12 bg-muted/50 border-border/50 rounded-xl pr-20 focus:border-primary focus:bg-card transition-all duration-300 group-hover:border-primary/50",
                      regErrors.confirmPassword && "border-destructive focus:border-destructive"
                    )}
                    placeholder={t('login.password_placeholder')}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value)
                      clearRegError('confirmPassword')
                    }}
                    onBlur={() => validateRegField('confirmPassword', confirmPassword)}
                    aria-invalid={!!regErrors.confirmPassword}
                  />
                  <div className="absolute right-3 top-3 flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                    <Lock className={cn(
                      "h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors",
                      regErrors.confirmPassword && "text-destructive"
                    )} />
                  </div>
                </div>
                {regErrors.confirmPassword && (
                  <div className="flex items-center gap-1 mt-1 text-xs text-destructive">
                    <AlertCircle className="h-3 w-3" />
                    <span>{regErrors.confirmPassword}</span>
                  </div>
                )}
              </div>

              <div className="flex items-start gap-3 pt-2">
                <Checkbox id="terms" className="mt-1" checked={accepted} onCheckedChange={(v) => setAccepted(Boolean(v))} />
                <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                  {translate('signup.terms_prefix', 'I accept the ')}
                  <Link to="/terms-of-service" className="text-primary hover:underline">
                    {translate('signup.terms_conditions', 'terms and conditions')}
                  </Link>
                  {translate('signup.terms_and', ' and ')}
                  <Link to="/privacy-policy" className="text-primary hover:underline">
                    {translate('signup.privacy_policy', 'privacy policy')}
                  </Link>
                </label>
              </div>

              <Button type="submit" disabled={loading} className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                    {translate('signup.creating_account', 'Creating account...')}
                  </>
                ) : (
                  translate('signup.create_account', 'Create Account')
                )}
              </Button>
            </form>
          ) : (
            <form className="space-y-6" onSubmit={onVerify}>
              <div className="flex items-center gap-2 text-foreground mb-4 p-4 bg-muted/50 rounded-xl">
                <ShieldCheck className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-sm">
                  {translate('signup.verification_title', 'Check your email!')}{' '}
                  {verificationDescriptionParts[0] || ''}
                  <strong>{email}</strong>
                  {verificationDescriptionParts[1] || ''}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {translate('signup.enter_code', 'Enter Verification Code')}
                </label>
                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                  <InputOTPGroup className="w-full justify-center gap-2">
                    <InputOTPSlot index={0} className="w-12 h-12 text-lg" />
                    <InputOTPSlot index={1} className="w-12 h-12 text-lg" />
                    <InputOTPSlot index={2} className="w-12 h-12 text-lg" />
                    <InputOTPSlot index={3} className="w-12 h-12 text-lg" />
                    <InputOTPSlot index={4} className="w-12 h-12 text-lg" />
                    <InputOTPSlot index={5} className="w-12 h-12 text-lg" />
                  </InputOTPGroup>
                </InputOTP>
                {otpErrors.otp && (
                  <div className="flex items-center gap-1 mt-2 text-xs text-destructive justify-center">
                    <AlertCircle className="h-3 w-3" />
                    <span>{otpErrors.otp}</span>
                  </div>
                )}
                <p className="text-xs text-muted-foreground text-center mt-2">
                  {translate('signup.resend_prefix', "Didn't receive the code? Check your spam folder or")}{' '}
                  <button
                    type="button"
                    onClick={() => onRegister({ preventDefault: () => {} } as any)}
                    className="text-primary hover:underline"
                  >
                    {translate('signup.resend_action', 'resend code')}
                  </button>
                </p>
              </div>
              <Button type="submit" disabled={loading} className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                    {translate('signup.verifying', 'Verifying...')}
                  </>
                ) : (
                  translate('signup.verify_button', 'Verify & Continue')
                )}
              </Button>
            </form>
          )}

          <div className="text-center mt-6 p-4 rounded-xl bg-muted/30">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link to="/login" className="text-primary hover:text-primary/80 font-medium transition-colors">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
