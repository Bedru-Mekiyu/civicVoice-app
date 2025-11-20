import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Mail, User, Lock, ShieldCheck } from "lucide-react"
import { AuthApi } from "@/lib/api"
import { auth } from "@/lib/auth"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

export default function RegisterPage() {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [accepted, setAccepted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [stage, setStage] = useState<'register' | 'verify'>("register")
  const [otp, setOtp] = useState("")

  async function onRegister(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!name.trim() || !email.trim() || !password) {
      setError("Please fill all required fields.")
      return
    }
    if (password !== confirm) {
      setError("Passwords do not match.")
      return
    }
    if (!accepted) {
      setError("Please accept the terms and conditions.")
      return
    }
    setLoading(true)
    try {
      // Try real API first
      const res = await AuthApi.register({ name, email, password })
      if ((res as any)?.message) {
        setStage("verify")
      } else {
        setStage("verify")
      }
    } catch (err: any) {
      setError(err?.message || "Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  async function onVerify(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!otp.trim()) {
      setError("Enter the 6-digit OTP sent to your email (also printed in server logs).")
      return
    }
    setLoading(true)
    try {
      // Try real API first
      const res = await AuthApi.activate({ email, otp })
      if ((res as any)?.token) {
        auth.setToken((res as any).token)
        navigate("/dashboard")
      } else {
        setError("Activation failed: invalid server response")
      }
    } catch (err: any) {
      setError(err?.message || "Activation failed. Please try again.")
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
                CivicVoice <span>Et</span>
              </h1>
              <h2 className="text-xl font-semibold text-foreground">Create Account</h2>
              <p className="text-sm text-muted-foreground mt-2">Join thousands of engaged citizens</p>
            </div>

          {/* Registration / Verification */}
          {stage === "register" ? (
            <form className="space-y-4" onSubmit={onRegister}>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                <div className="relative group">
                  <Input
                    type="text"
                    className="w-full h-12 bg-muted/50 border-border/50 rounded-xl pr-10 focus:border-primary focus:bg-card transition-all duration-300 group-hover:border-primary/50"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <User className="absolute right-3 top-3 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <div className="relative group">
                  <Input
                    type="email"
                    className="w-full h-12 bg-muted/50 border-border/50 rounded-xl pr-10 focus:border-primary focus:bg-card transition-all duration-300 group-hover:border-primary/50"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Mail className="absolute right-3 top-3 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Password</label>
                <div className="relative group">
                  <Input
                    type="password"
                    className="w-full h-12 bg-muted/50 border-border/50 rounded-xl pr-10 focus:border-primary focus:bg-card transition-all duration-300 group-hover:border-primary/50"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Lock className="absolute right-3 top-3 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Confirm Password</label>
                <div className="relative group">
                  <Input
                    type="password"
                    className="w-full h-12 bg-muted/50 border-border/50 rounded-xl pr-10 focus:border-primary focus:bg-card transition-all duration-300 group-hover:border-primary/50"
                    placeholder="••••••••"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                  />
                  <Lock className="absolute right-3 top-3 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2">
                <Checkbox id="terms" className="mt-1" checked={accepted} onCheckedChange={(v) => setAccepted(Boolean(v))} />
                <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
                  I accept the terms and conditions
                </label>
              </div>

              {error && <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20">
                <p className="text-sm text-destructive">{error}</p>
              </div>}

              <Button type="submit" disabled={loading} className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
                {loading ? "Creating account..." : "Create Account"}
              </Button>
            </form>
          ) : (
            <form className="space-y-6" onSubmit={onVerify}>
              <div className="flex items-center gap-2 text-foreground mb-4 p-4 bg-muted/50 rounded-xl">
                <ShieldCheck className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-sm">Check your email! We've sent a 6-digit verification code to <strong>{email}</strong></span>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Enter Verification Code</label>
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
                <p className="text-xs text-muted-foreground text-center mt-2">
                  Didn't receive the code? Check your spam folder or <button type="button" className="text-primary hover:underline">resend code</button>
                </p>
              </div>
              {error && <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20">
                <p className="text-sm text-destructive">{error}</p>
              </div>}
              <Button type="submit" disabled={loading} className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
                {loading ? "Verifying..." : "Verify & Continue"}
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
