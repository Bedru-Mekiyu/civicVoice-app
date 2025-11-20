import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Send } from "lucide-react"

interface NewsletterSignupProps {
  className?: string
}

export default function NewsletterSignup({ className = "" }: NewsletterSignupProps) {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)
    
    // Simulate newsletter signup
    setTimeout(() => {
      toast({
        title: "Successfully subscribed!",
        description: "You'll receive updates about government initiatives and platform features.",
      })
      setEmail("")
      setLoading(false)
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="citizen@example.com"
        className="bg-muted/50 border-border/50 text-foreground placeholder:text-muted-foreground"
        required
      />
      <Button 
        type="submit" 
        disabled={loading}
        className="bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        {loading ? (
          <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            Subscribe
          </>
        )}
      </Button>
    </form>
  )
}