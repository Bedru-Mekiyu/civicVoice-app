import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Book,
  Code,
  Users,
  Zap,
  Search,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { ThemeToggle } from "../components/ThemeToggle";
import LanguageSelector from "../components/LanguageSelector";
import Breadcrumb from "../components/Breadcrumb";
import { useState } from "react";

export default function Documentation() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedCode, setCopiedCode] = useState("");

  const docSections = [
    {
      title: "Getting Started",
      description: "Quick start guide to using CivicVoice Et",
      icon: <Zap className="w-6 h-6" />,
      articles: [
        { title: "Platform Overview", type: "Guide", readTime: "5 min" },
        { title: "Creating Your Account", type: "Tutorial", readTime: "3 min" },
        {
          title: "Submitting Your First Feedback",
          type: "Tutorial",
          readTime: "7 min",
        },
        {
          title: "Understanding the Dashboard",
          type: "Guide",
          readTime: "8 min",
        },
      ],
    },
    {
      title: "User Guides",
      description: "Comprehensive guides for citizens and officials",
      icon: <Users className="w-6 h-6" />,
      articles: [
        {
          title: "Citizen Guide to Feedback",
          type: "Guide",
          readTime: "12 min",
        },
        {
          title: "Government Official Handbook",
          type: "Guide",
          readTime: "25 min",
        },
        {
          title: "Privacy and Data Protection",
          type: "Policy",
          readTime: "8 min",
        },
        { title: "Community Guidelines", type: "Policy", readTime: "6 min" },
      ],
    },
    {
      title: "API Documentation",
      description: "Technical documentation for developers",
      icon: <Code className="w-6 h-6" />,
      articles: [
        { title: "REST API Reference", type: "API", readTime: "15 min" },
        { title: "Authentication Guide", type: "API", readTime: "10 min" },
        { title: "Webhook Integration", type: "API", readTime: "12 min" },
        {
          title: "Rate Limits and Best Practices",
          type: "API",
          readTime: "8 min",
        },
      ],
    },
    {
      title: "Advanced Features",
      description: "In-depth guides for power users",
      icon: <Book className="w-6 h-6" />,
      articles: [
        { title: "Advanced Analytics", type: "Guide", readTime: "18 min" },
        { title: "Custom Reporting", type: "Tutorial", readTime: "22 min" },
        {
          title: "Data Export and Integration",
          type: "Guide",
          readTime: "15 min",
        },
        { title: "System Administration", type: "Guide", readTime: "30 min" },
      ],
    },
  ];

  const apiExamples = [
    {
      title: "Submit Feedback",
      description: "POST /api/feedback",
      code: `curl -X POST https://api.civicvoiceet.com/feedback \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -d '{
    "serviceId": "education",
    "rating": 4,
    "comment": "Great improvement in response time",
    "anonymous": false
  }'`,
    },
    {
      title: "Get Service List",
      description: "GET /api/services",
      code: `curl -X GET https://api.civicvoiceet.com/services \\
  -H "Authorization: Bearer YOUR_TOKEN"`,
    },
  ];

  const handleCopyCode = (code: string, title: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(title);
    setTimeout(() => setCopiedCode(""), 2000);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "API":
        return "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700";
      case "Tutorial":
        return "bg-green-100 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-700";
      case "Policy":
        return "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900 dark:text-purple-300 dark:border-purple-700";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            CivicVoice Et Documentation
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Everything you need to know about using CivicVoice Et, from basic
            user guides to advanced API integration.
          </p>

          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search documentation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && searchTerm.trim()) {
                  console.log("Searching documentation for:", searchTerm);
                  alert(
                    `Searching for: "${searchTerm}"\n\nSearch results will appear here once the feature is fully implemented.`
                  );
                }
              }}
              className="pl-10"
            />
          </div>
        </div>

        {/* Quick Links */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            Quick Start
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => (window.location.href = "/faq")}
            >
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mx-auto mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  Citizen Guide
                </h3>
                <p className="text-sm text-muted-foreground">
                  Learn how to submit feedback and track your requests
                </p>
              </CardContent>
            </Card>
            <Card
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() =>
                alert(
                  "API Reference\n\nComplete API documentation with endpoints, authentication, and examples. Feature coming soon!"
                )
              }
            >
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mx-auto mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <Code className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  API Reference
                </h3>
                <p className="text-sm text-muted-foreground">
                  Complete API documentation for developers
                </p>
              </CardContent>
            </Card>
            <Card
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() =>
                alert(
                  "Admin Guide\n\nGovernment official administration handbook with detailed instructions. Feature coming soon!"
                )
              }
            >
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mx-auto mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <Book className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  Admin Guide
                </h3>
                <p className="text-sm text-muted-foreground">
                  Government official administration handbook
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Documentation Sections */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-foreground mb-8">
            All Documentation
          </h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {docSections.map((section, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      {section.icon}
                    </div>
                    <div>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {section.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {section.description}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {section.articles.map((article, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 cursor-pointer group/item"
                        onClick={() => {
                          console.log("Opening article:", article.title);
                          if (article.type === "API") {
                            alert(
                              `${article.title}\n\nAPI documentation page will open here. Feature coming soon!`
                            );
                          } else if (article.type === "Tutorial") {
                            alert(
                              `${article.title}\n\nStep-by-step tutorial will be displayed here. Feature coming soon!`
                            );
                          } else if (article.type === "Guide") {
                            window.location.href = "/faq";
                          } else if (article.type === "Policy") {
                            window.location.href = "/privacy-policy";
                          }
                        }}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-foreground group-hover/item:text-primary transition-colors">
                              {article.title}
                            </span>
                            <Badge
                              className={`${getTypeColor(
                                article.type
                              )} text-xs border`}
                            >
                              {article.type}
                            </Badge>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {article.readTime}
                          </span>
                        </div>
                        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover/item:text-primary transition-colors" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* API Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-foreground mb-8">
            API Examples
          </h2>
          <div className="space-y-6">
            {apiExamples.map((example, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{example.title}</CardTitle>
                      <p className="text-sm text-muted-foreground font-mono">
                        {example.description}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleCopyCode(example.code, example.title)
                      }
                    >
                      {copiedCode === example.title ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm text-muted-foreground">
                      <code>{example.code}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Support CTA */}
        <div className="bg-muted/50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Still Need Help?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Can't find what you're looking for? Our support team is here to help
            you get the most out of CivicVoice Et.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/help-center">
              <Button>Visit Help Center</Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline">Contact Support</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
