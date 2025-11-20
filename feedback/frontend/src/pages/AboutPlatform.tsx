import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Target, 
  Heart, 
  Users, 
  Globe, 
  Shield, 
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Sparkles,
  MessageSquare,
  BarChart3,
  Vote
} from "lucide-react"
import { Link } from "react-router-dom"
import SEOHead from "@/components/SEOHead"

const goals = [
  {
    icon: Users,
    title: "Empower Citizens",
    description: "Give every citizen a voice in government decisions and policy-making processes",
    color: "text-primary"
  },
  {
    icon: Shield,
    title: "Ensure Transparency",
    description: "Make government operations visible and accountable to the public",
    color: "text-accent"
  },
  {
    icon: TrendingUp,
    title: "Drive Improvement",
    description: "Use data-driven insights to continuously enhance government services",
    color: "text-secondary"
  },
  {
    icon: Heart,
    title: "Build Trust",
    description: "Foster stronger relationships between citizens and government institutions",
    color: "text-red-500"
  }
]

const features = [
  {
    icon: MessageSquare,
    title: "Anonymous Feedback",
    description: "Submit feedback safely without fear of identification or retaliation"
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description: "Track civic engagement metrics and government response rates"
  },
  {
    icon: Vote,
    title: "Issue Tracking",
    description: "Monitor the progress of your reported issues from submission to resolution"
  },
  {
    icon: Globe,
    title: "Multi-language Support",
    description: "Access the platform in your preferred language for better accessibility"
  }
]

const impact = [
  { number: "50K+", label: "Active Citizens" },
  { number: "10K+", label: "Issues Resolved" },
  { number: "95%", label: "Response Rate" },
  { number: "4.8/5", label: "Satisfaction Score" }
]

export default function AboutPlatform() {
  return (
    <>
      <SEOHead 
        title="About Our Platform - CivicVoice Et"
        description="Learn about CivicVoice Et's mission to bridge the gap between citizens and government through transparent, accessible civic engagement."
        keywords={["civic engagement platform", "government transparency", "citizen participation", "Ethiopia civic tech"]}
      />
      
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary via-accent to-secondary py-20 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
              <span className="text-primary-foreground font-medium">Our Mission & Vision</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
              Bridging Citizens & Government
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
              CivicVoice Et is a revolutionary platform designed to transform civic engagement in Ethiopia, 
              making government more accessible, transparent, and responsive to citizen needs.
            </p>
          </div>
        </div>

        {/* Our Purpose */}
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <Target className="w-16 h-16 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why We Exist
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We believe that effective governance requires continuous dialogue between citizens and their government. 
              Our platform eliminates barriers to communication and creates a transparent feedback loop.
            </p>
          </div>

          {/* Goals Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {goals.map((goal) => (
              <Card 
                key={goal.title}
                className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30"
              >
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-muted rounded-lg group-hover:scale-110 transition-transform">
                      <goal.icon className={`w-8 h-8 ${goal.color}`} />
                    </div>
                    <div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {goal.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {goal.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* How It Works */}
          <div className="bg-muted/30 rounded-3xl p-8 md:p-12 mb-16">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              How CivicVoice Et Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Submit Feedback</h3>
                <p className="text-muted-foreground">
                  Share your concerns, suggestions, or experiences with government services anonymously or publicly
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Government Reviews</h3>
                <p className="text-muted-foreground">
                  Relevant government departments receive, review, and prioritize your feedback for action
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Track Progress</h3>
                <p className="text-muted-foreground">
                  Monitor the status of your issue and see real-time updates on government responses and actions
                </p>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              Platform Features
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature) => (
                <Card key={feature.title} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <feature.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg mb-2">{feature.title}</CardTitle>
                        <CardDescription>{feature.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          {/* Impact Stats */}
          <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 rounded-3xl p-8 md:p-12 mb-16">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              Our Impact
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {impact.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Our Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              Our Core Values
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Transparency</h3>
                <p className="text-muted-foreground">
                  Open communication and clear visibility into government processes
                </p>
              </Card>
              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <CheckCircle className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Accountability</h3>
                <p className="text-muted-foreground">
                  Ensuring government responsiveness to citizen needs and concerns
                </p>
              </Card>
              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <CheckCircle className="w-12 h-12 text-secondary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Accessibility</h3>
                <p className="text-muted-foreground">
                  Making civic engagement easy and available to all citizens
                </p>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-primary via-accent to-secondary rounded-3xl p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Join thousands of active citizens using CivicVoice Et to shape better government services
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" variant="secondary" className="group">
                  Get Started Today
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/demo">
                <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-primary-foreground hover:bg-white/20">
                  Watch Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}