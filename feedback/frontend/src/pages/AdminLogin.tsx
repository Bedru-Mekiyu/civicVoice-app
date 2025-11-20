import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Lock, ShieldCheck } from "lucide-react"
import { useState } from "react"
import { AuthApi } from "@/lib/api"
import { auth } from "@/lib/auth"

export default function AdminLoginPage() {
  const navigate = useNavigate()
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
        navigate("/dashboard")
      } else {
        setError("Invalid response from server")
      }
    } catch (err: any) {
      // Fallback to mock auth
      console.log("API failed, using mock auth")
      const { mockAuth } = await import('@/lib/mockAuth')
      try {
        const result = mockAuth.signin(email, password)
        if (result.error) {
          setError(result.error)
        } else if (result.token) {
          auth.setToken(result.token)
          navigate("/dashboard")
        }
      } catch (mockErr: any) {
        setError(mockErr?.message || "Login failed")
      }
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
                <ShieldCheck className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Government Portal
              </h1>
              <h2 className="text-xl font-semibold text-foreground">Administrator Login</h2>
              <p className="text-sm text-muted-foreground mt-2">Secure access for government officials</p>
            </div>

            <form className="space-y-6" onSubmit={onSubmit}>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <div className="relative group">
                  <Input
                    type="email"
                    className="w-full h-12 bg-muted/50 border-border/50 rounded-xl pr-10 focus:border-primary focus:bg-card transition-all duration-300 group-hover:border-primary/50"
                    placeholder="admin@example.com"
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
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-border/50 space-y-3">
              <Link to="#" className="block text-center text-sm text-primary hover:text-primary/80 transition-colors">
                Forgot Password?
              </Link>
              <div className="text-center p-4 rounded-xl bg-muted/30">
                <p className="text-xs text-muted-foreground">
                  ⚠️ This portal is for verified government officials only. Unauthorized access is prohibited.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

