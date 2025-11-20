import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  Database,
  BarChart3,
  Shield,
  Users,
  FileText,
  Zap,
} from "lucide-react";
import { ThemeToggle } from "../components/ThemeToggle";
import LanguageSelector from "../components/LanguageSelector";

export default function DataUsagePolicy() {
  const usageCategories = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Feedback Processing",
      description: "How we use your feedback data",
      items: [
        "Route submissions to appropriate government departments",
        "Track feedback status and resolution progress",
        "Generate automated acknowledgments and updates",
        "Archive resolved issues for future reference",
        "Quality assurance and service improvement",
      ],
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Analytics & Insights",
      description: "Aggregated data for public benefit",
      items: [
        "Identify trends in citizen concerns across sectors",
        "Measure government response times and efficiency",
        "Generate public reports and transparency dashboards",
        "Support policy development with data-driven insights",
        "Benchmark service quality across regions",
      ],
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "User Experience",
      description: "Personalization and improvements",
      items: [
        "Remember your preferences and settings",
        "Provide relevant service recommendations",
        "Optimize platform performance and loading times",
        "Customize notifications based on your interests",
        "A/B testing for feature improvements",
      ],
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Security & Fraud Prevention",
      description: "Protecting the platform and users",
      items: [
        "Detect and prevent spam or abusive submissions",
        "Monitor for suspicious account activities",
        "Verify user identity for sensitive operations",
        "Audit logs for compliance and investigation",
        "Rate limiting to prevent system abuse",
      ],
    },
  ];

  const dataTypes = [
    {
      type: "Personal Data",
      examples: "Name, email, phone, address",
      retention: "7 years after account closure",
      sharing: "Only with relevant government departments",
    },
    {
      type: "Feedback Content",
      examples: "Comments, ratings, attachments",
      retention: "Indefinitely (archived after resolution)",
      sharing:
        "Visible to assigned departments and public if not marked private",
    },
    {
      type: "Usage Analytics",
      examples: "Page views, clicks, session duration",
      retention: "2 years in detailed form, aggregated indefinitely",
      sharing: "Aggregated data may be published publicly",
    },
    {
      type: "Technical Data",
      examples: "IP address, browser, device type",
      retention: "90 days in logs",
      sharing: "Only for security investigations",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
            <Database className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Data Usage Policy
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
            Transparency in how we collect, process, and utilize your data to
            improve civic engagement and government services.
          </p>
          <p className="text-sm text-muted-foreground">
            Last Updated: January 15, 2025
          </p>
        </div>

        {/* Key Principles */}
        <Card className="mb-12 border-primary/20 bg-primary/5">
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Zap className="w-6 h-6 text-primary" />
              Our Data Usage Principles
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Transparency
                </h3>
                <p className="text-sm text-muted-foreground">
                  We clearly communicate what data we collect and why, with no
                  hidden practices.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Purpose Limitation
                </h3>
                <p className="text-sm text-muted-foreground">
                  Data is only used for the specific purposes disclosed at
                  collection time.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Data Minimization
                </h3>
                <p className="text-sm text-muted-foreground">
                  We only collect data that is necessary for our services to
                  function.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Usage Categories */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-foreground mb-8">
            How We Use Your Data
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {usageCategories.map((category, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-1">
                        {category.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {category.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Data Types Table */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-foreground mb-8">
            Data Types & Lifecycle
          </h2>
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50 border-b border-border">
                    <tr>
                      <th className="text-left p-4 font-semibold text-foreground">
                        Data Type
                      </th>
                      <th className="text-left p-4 font-semibold text-foreground">
                        Examples
                      </th>
                      <th className="text-left p-4 font-semibold text-foreground">
                        Retention Period
                      </th>
                      <th className="text-left p-4 font-semibold text-foreground">
                        Sharing Policy
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataTypes.map((data, index) => (
                      <tr
                        key={index}
                        className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                      >
                        <td className="p-4 font-medium text-foreground">
                          {data.type}
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">
                          {data.examples}
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">
                          {data.retention}
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">
                          {data.sharing}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Automated Decision Making */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Automated Decision Making
            </h2>
            <p className="text-muted-foreground mb-6">
              We use automated systems to enhance efficiency and user
              experience. Here's what happens automatically:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  ✓ Automated Processes
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Feedback routing to departments</li>
                  <li>• Spam and content filtering</li>
                  <li>• Duplicate detection</li>
                  <li>• Priority assignment based on urgency keywords</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  ✗ Not Automated (Human Review)
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Account suspension decisions</li>
                  <li>• Complex feedback resolution</li>
                  <li>• Policy violation adjudication</li>
                  <li>• Appeals and disputes</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Third-Party Services */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Third-Party Services
            </h2>
            <p className="text-muted-foreground mb-6">
              We use carefully vetted third-party services to provide our
              platform. All are bound by strict data processing agreements:
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                <div>
                  <p className="font-medium text-foreground">
                    Cloud Hosting (AWS/Azure)
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Secure infrastructure with Ethiopian data residency
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                <div>
                  <p className="font-medium text-foreground">
                    Email Service Provider
                  </p>
                  <p className="text-sm text-muted-foreground">
                    For notifications and updates (no marketing emails to third
                    parties)
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                <div>
                  <p className="font-medium text-foreground">
                    Analytics Platform
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Anonymized usage data only, no personal identifiers shared
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Your Control */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Your Control Over Your Data
            </h2>
            <p className="text-muted-foreground mb-6">
              You have full control over your personal data. Access your data
              management dashboard to:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-5 h-5 bg-primary/10 rounded flex items-center justify-center text-primary">
                  ✓
                </div>
                <span>Download all your data (JSON/CSV format)</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-5 h-5 bg-primary/10 rounded flex items-center justify-center text-primary">
                  ✓
                </div>
                <span>Delete specific feedback submissions</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-5 h-5 bg-primary/10 rounded flex items-center justify-center text-primary">
                  ✓
                </div>
                <span>Update your personal information</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-5 h-5 bg-primary/10 rounded flex items-center justify-center text-primary">
                  ✓
                </div>
                <span>Manage notification preferences</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-5 h-5 bg-primary/10 rounded flex items-center justify-center text-primary">
                  ✓
                </div>
                <span>Opt-out of analytics tracking</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-5 h-5 bg-primary/10 rounded flex items-center justify-center text-primary">
                  ✓
                </div>
                <span>Request complete account deletion</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact">
                <Button>Request Data Access</Button>
              </Link>
              <Link to="/privacy-policy">
                <Button variant="outline">Privacy Policy</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <div className="bg-muted/50 rounded-lg p-6 text-center">
          <p className="text-sm text-muted-foreground">
            This Data Usage Policy is part of our commitment to transparency.
            For complete information about data protection, please also review
            our{" "}
            <Link to="/privacy-policy" className="text-primary hover:underline">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link
              to="/terms-of-service"
              className="text-primary hover:underline"
            >
              Terms of Service
            </Link>
            .
          </p>
        </div>
      </main>
    </div>
  );
}
