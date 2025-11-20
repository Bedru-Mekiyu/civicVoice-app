import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  UserPlus,
  MessageSquare,
  BarChart3,
  Bell,
  Shield,
  Play,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { ThemeToggle } from "../components/ThemeToggle";
import LanguageSelector from "../components/LanguageSelector";

export default function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    {
      number: 1,
      title: "Create Your Account",
      description:
        "Sign up as a citizen to start engaging with government services and providing feedback",
      icon: <UserPlus className="w-8 h-8" />,
      details: [
        "Quick registration process",
        "Secure identity verification",
        "Access to all citizen features",
        "Privacy protection guaranteed",
      ],
    },
    {
      number: 2,
      title: "Submit Feedback",
      description:
        "Share your experiences with government services and suggest improvements",
      icon: <MessageSquare className="w-8 h-8" />,
      details: [
        "Rate services you've used",
        "Upload photos and documents",
        "Anonymous reporting option",
        "Multiple feedback categories",
      ],
    },
    {
      number: 3,
      title: "Track Progress",
      description:
        "Monitor how your feedback is being addressed and see real-time updates",
      icon: <BarChart3 className="w-8 h-8" />,
      details: [
        "Real-time status updates",
        "Government response tracking",
        "Impact measurement",
        "Community voting on issues",
      ],
    },
    {
      number: 4,
      title: "See Impact",
      description:
        "Watch as your voice contributes to meaningful changes in government services",
      icon: <CheckCircle className="w-8 h-8" />,
      details: [
        "Before/after comparisons",
        "Success story highlights",
        "Community impact metrics",
        "Recognition for contributions",
      ],
    },
  ];

  const features = [
    {
      title: "Real-time Notifications",
      description:
        "Get instant updates when your feedback receives responses or when issues you care about are resolved.",
      icon: <Bell className="w-6 h-6" />,
    },
    {
      title: "Data Security",
      description:
        "Your information is protected with bank-level security and complete transparency in data usage.",
      icon: <Shield className="w-6 h-6" />,
    },
    {
      title: "Anonymous Reporting",
      description:
        "Submit sensitive feedback anonymously while still being able to track progress and responses.",
      icon: <MessageSquare className="w-6 h-6" />,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            How CivicVoice Et Works
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Learn how to use our platform to make your voice heard and
            contribute to better government services for everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg">Get Started Now</Button>
            </Link>
            <Link to="/listings">
              <Button variant="outline" size="lg">
                Explore Services
              </Button>
            </Link>
          </div>
        </div>

        {/* Steps Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-semibold text-foreground text-center mb-16">
            Four Simple Steps to Make a Difference
          </h2>
          <div className="grid lg:grid-cols-2 gap-12">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                <Card className="group hover:shadow-lg transition-all duration-300 h-full">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                          {step.icon}
                        </div>
                        <div className="text-center">
                          <span className="text-2xl font-bold text-muted-foreground">
                            {step.number}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground mb-6">
                          {step.description}
                        </p>
                        <ul className="space-y-2">
                          {step.details.map((detail, idx) => (
                            <li
                              key={idx}
                              className="flex items-center gap-2 text-sm text-muted-foreground"
                            >
                              <CheckCircle className="w-4 h-4 text-primary" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {/* Arrow for desktop */}
                {index < steps.length - 1 && index % 2 === 0 && (
                  <div className="hidden lg:block absolute -right-6 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                    <ArrowRight className="w-8 h-8" />
                  </div>
                )}
                {index < steps.length - 1 && index % 2 === 1 && (
                  <div className="hidden lg:block absolute -left-6 top-1/2 transform -translate-y-1/2 text-muted-foreground rotate-180">
                    <ArrowRight className="w-8 h-8" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Key Features */}
        <section className="mb-20">
          <h2 className="text-3xl font-semibold text-foreground text-center mb-16">
            Platform Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 text-center"
              >
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Video Demo Section */}
        <section className="mb-20">
          <div className="bg-muted/50 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-semibold text-foreground mb-6">
              Watch CivicVoice Et in Action
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              See how citizens are using our platform to create positive change
              in their communities.
            </p>
            <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center mb-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-0 h-0 border-l-8 border-l-primary border-y-6 border-y-transparent ml-1"></div>
                </div>
                <p className="text-muted-foreground">Demo video coming soon</p>
              </div>
            </div>
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => {
                // Open demo video in new tab
                window.open(
                  "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                  "_blank"
                );
              }}
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Full Demo
            </Button>
          </div>
        </section>

        {/* FAQ Quick Links */}
        <section className="mb-20">
          <h2 className="text-3xl font-semibold text-foreground text-center mb-12">
            Common Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Is my feedback really anonymous?
              </h3>
              <p className="text-muted-foreground mb-4">
                Yes, we offer completely anonymous feedback options. Your
                identity is never shared unless you choose to include it.
              </p>
              <Link to="/faq">
                <Button variant="outline" size="sm">
                  Learn More
                </Button>
              </Link>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                How long does it take to see results?
              </h3>
              <p className="text-muted-foreground mb-4">
                Response times vary by issue type, but most feedback receives a
                government response within 5-10 business days.
              </p>
              <Link to="/faq">
                <Button variant="outline" size="sm">
                  View All FAQs
                </Button>
              </Link>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-semibold text-foreground mb-6">
            Ready to Make Your Voice Heard?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of citizens who are already using CivicVoice Et to
            create positive change in their communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg">
                Sign Up Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg">
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
