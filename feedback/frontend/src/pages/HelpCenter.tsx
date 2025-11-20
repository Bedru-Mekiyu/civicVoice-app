import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, MessageCircle, Phone, Mail, Clock, ChevronRight, HelpCircle, Book, Users, Shield, Video } from "lucide-react"
import { Link } from "react-router-dom"
import { useLanguage } from '../contexts/LanguageContext'
import { useState } from 'react'
import { toast } from "sonner"

export default function HelpCenter() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredArticles, setFilteredArticles] = useState<typeof popularArticles>([])

  const popularArticles = [
    {
      title: "How to submit feedback anonymously",
      category: "Privacy",
      views: "12.3k",
      helpful: 94
    },
    {
      title: "Tracking your feedback status",
      category: "Feedback",
      views: "8.7k", 
      helpful: 89
    },
    {
      title: "Understanding response times",
      category: "General",
      views: "6.2k",
      helpful: 92
    },
    {
      title: "Creating your citizen account",
      category: "Account",
      views: "15.1k",
      helpful: 96
    },
    {
      title: "Government service categories explained",
      category: "Services",
      views: "4.8k",
      helpful: 88
    }
  ]

  const helpCategories = [
    {
      title: "Getting Started",
      description: "New to CivicVoice Et? Start here for the basics",
      icon: <Book className="w-6 h-6" />,
      articles: 12,
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
    },
    {
      title: "Account & Privacy",
      description: "Manage your account and understand our privacy policies",
      icon: <Shield className="w-6 h-6" />,
      articles: 8,
      color: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
    },
    {
      title: "Submitting Feedback",
      description: "Learn how to effectively submit and track your feedback",
      icon: <MessageCircle className="w-6 h-6" />,
      articles: 15,
      color: "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300"
    },
    {
      title: "Government Services",
      description: "Information about available government services",
      icon: <Users className="w-6 h-6" />,
      articles: 20,
      color: "bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300"
    }
  ]

  const contactOptions = [
    {
      method: "Live Chat",
      description: "Chat with our support team in real-time",
      availability: "24/7",
      responseTime: "< 5 minutes",
      icon: <MessageCircle className="w-6 h-6" />,
      action: "Start Chat",
      primary: true
    },
    {
      method: "Email Support",
      description: "Send us a detailed message about your issue",
      availability: "24/7",
      responseTime: "< 4 hours",
      icon: <Mail className="w-6 h-6" />,
      action: "Send Email",
      primary: false
    },
    {
      method: "Phone Support",
      description: "Speak directly with a support representative",
      availability: "Mon-Fri 8AM-6PM",
      responseTime: "Immediate",
      icon: <Phone className="w-6 h-6" />,
      action: "Call Now",
      primary: false
    }
  ]

  const quickActions = [
    "Report a bug",
    "Request a feature",
    "Account issues",
    "Privacy concerns",
    "Technical problems",
    "Billing questions"
  ]

  // Initialize filtered articles
  useState(() => {
    setFilteredArticles(popularArticles)
  })

  // Filter articles based on search term
  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredArticles(popularArticles)
      toast.info("Please enter a search term")
      return
    }

    const filtered = popularArticles.filter(article => 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.category.toLowerCase().includes(searchTerm.toLowerCase())
    )

    setFilteredArticles(filtered)
    
    if (filtered.length === 0) {
      toast.info("No articles found", {
        description: `No results for "${searchTerm}". Try different keywords.`
      })
    } else {
      toast.success(`Found ${filtered.length} article${filtered.length > 1 ? 's' : ''}`)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
            <HelpCircle className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            How can we help you?
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Find answers to common questions, browse help articles, or get in touch with our support team.
          </p>
          
          {/* Search */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search for help articles, guides, or common issues..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch()
                }
              }}
              className="pl-12 h-14 text-lg"
            />
            <Button 
              className="absolute right-2 top-2 h-10"
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold text-foreground mb-6 text-center">
            Common Issues
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {quickActions.map((action, index) => (
              <Link key={index} to="/contact">
                <Button variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                  {action}
                </Button>
              </Link>
            ))}
          </div>
        </section>

        {/* Help Categories */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-foreground mb-8">Browse by Category</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {helpCategories.map((category, index) => (
              <Link key={index} to="/faq">
                <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {category.icon}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{category.articles} articles</span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </CardContent>
              </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Popular Articles */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-foreground">
              {searchTerm ? 'Search Results' : 'Popular Articles'}
            </h2>
            {searchTerm && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchTerm("")
                  setFilteredArticles(popularArticles)
                }}
              >
                Clear Search
              </Button>
            )}
          </div>
          <div className="space-y-4">
            {filteredArticles.map((article, index) => (
              <Link key={index} to="/faq">
                <Card className="group hover:shadow-md transition-all duration-300 cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {article.title}
                        </h3>
                        <Badge variant="outline">{article.category}</Badge>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <span>{article.views} views</span>
                        <span>{article.helpful}% found helpful</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </CardContent>
              </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Contact Support */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-foreground mb-8 text-center">
            Still Need Help? Contact Support
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {contactOptions.map((option, index) => (
              <Card key={index} className={`group hover:shadow-lg transition-all duration-300 ${option.primary ? 'ring-2 ring-primary/20' : ''}`}>
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 ${option.primary ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      {option.icon}
                    </div>
                    {option.primary && (
                      <Badge className="bg-primary/10 text-primary border-primary/20">Recommended</Badge>
                    )}
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {option.method}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">{option.description}</p>
                  <div className="space-y-2 mb-6 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Availability:</span>
                      <span className="font-medium">{option.availability}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Response time:</span>
                      <span className="font-medium">{option.responseTime}</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full"
                    variant={option.primary ? 'default' : 'outline'}
                    onClick={() => {
                      if (option.method === 'Live Chat') {
                        window.open('https://tawk.to/chat', '_blank')
                      } else if (option.method === 'Email Support') {
                        window.location.href = 'mailto:support@civicvoice.et'
                      } else if (option.method === 'Phone Support') {
                        window.location.href = 'tel:+251911234567'
                      }
                    }}
                  >
                    {option.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Status & Updates */}
        <div className="bg-muted/50 rounded-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                System Status
              </h2>
              <p className="text-muted-foreground">
                Current status of CivicVoice Et services
              </p>
            </div>
            <Badge className="bg-green-100 text-green-700 border-green-200 px-4 py-2 dark:bg-green-900 dark:text-green-300 dark:border-green-700">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              All Systems Operational
            </Badge>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground mb-1">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground mb-1">&lt; 2s</div>
              <div className="text-sm text-muted-foreground">Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground mb-1">0</div>
              <div className="text-sm text-muted-foreground">Active Issues</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}