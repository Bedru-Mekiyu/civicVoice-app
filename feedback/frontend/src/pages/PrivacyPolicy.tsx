import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  Shield,
  Lock,
  Eye,
  Database,
  UserCheck,
  Bell,
} from "lucide-react";
import { ThemeToggle } from "../components/ThemeToggle";
import LanguageSelector from "../components/LanguageSelector";

export default function PrivacyPolicy() {
  const sections = [
    {
      icon: <Database className="w-6 h-6" />,
      title: "Information We Collect",
      content: [
        "Personal information (name, email, phone number) provided during registration",
        "Feedback and comments submitted through our platform",
        "Usage data and interaction patterns with our services",
        "Device information and IP addresses for security purposes",
        "Cookies and similar tracking technologies for improved user experience",
      ],
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "How We Use Your Information",
      content: [
        "To provide and maintain our civic engagement services",
        "To process and route your feedback to relevant government departments",
        "To communicate updates about your submissions and government responses",
        "To improve our platform based on usage analytics",
        "To ensure security and prevent fraudulent activities",
        "To comply with legal obligations and government regulations",
      ],
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Data Protection & Security",
      content: [
        "End-to-end encryption for sensitive communications",
        "Regular security audits and vulnerability assessments",
        "Secure data centers with 24/7 monitoring",
        "Two-factor authentication for account protection",
        "Automatic session timeouts to prevent unauthorized access",
        "Compliance with international data protection standards (GDPR, CCPA)",
      ],
    },
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: "Your Rights",
      content: [
        "Right to access your personal data at any time",
        "Right to correct inaccurate or incomplete information",
        "Right to delete your account and associated data",
        "Right to export your data in a portable format",
        "Right to opt-out of marketing communications",
        "Right to withdraw consent for data processing",
      ],
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Information Sharing",
      content: [
        "We share feedback with relevant government departments for processing",
        "Anonymized data may be shared for public statistical analysis",
        "We do not sell personal information to third parties",
        "Legal authorities may access data when required by law",
        "Service providers bound by confidentiality agreements may access data",
        "Public feedback may be visible to other users unless marked private",
      ],
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: "Cookies & Tracking",
      content: [
        "Essential cookies for platform functionality",
        "Analytics cookies to understand user behavior (optional)",
        "Preference cookies to remember your settings",
        "You can manage cookie preferences in your browser",
        "Third-party cookies from embedded services may be present",
        "We use local storage for improved performance",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
            Your privacy is important to us. This policy explains how we
            collect, use, and protect your personal information.
          </p>
          <p className="text-sm text-muted-foreground">
            Last Updated: January 15, 2025
          </p>
        </div>

        {/* Important Notice */}
        <Card className="mb-12 border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-2">
              Our Commitment to Privacy
            </h2>
            <p className="text-muted-foreground">
              CivicVoice Et is committed to protecting your privacy and ensuring
              transparency in how we handle your data. We only collect
              information necessary to provide our services and never sell your
              personal information to third parties. Your trust is paramount to
              our mission of improving civic engagement.
            </p>
          </CardContent>
        </Card>

        {/* Policy Sections */}
        <div className="space-y-8 mb-12">
          {sections.map((section, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
                    {section.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-foreground mb-2">
                      {section.title}
                    </h2>
                  </div>
                </div>
                <ul className="space-y-3">
                  {section.content.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-muted-foreground"
                    >
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Information */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Data Retention
              </h3>
              <p className="text-muted-foreground mb-4">
                We retain your personal data only as long as necessary to
                provide our services and comply with legal obligations. Feedback
                submissions are archived after resolution but can be deleted
                upon request.
              </p>
              <p className="text-sm text-muted-foreground">
                Typical retention period: 3-7 years depending on data type and
                legal requirements.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                International Transfers
              </h3>
              <p className="text-muted-foreground mb-4">
                Your data is primarily stored within Ethiopia. If international
                transfers are necessary, we ensure appropriate safeguards are in
                place to protect your information.
              </p>
              <p className="text-sm text-muted-foreground">
                All transfers comply with applicable data protection
                regulations.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Contact Section */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Questions About Privacy?
            </h2>
            <p className="text-muted-foreground mb-6">
              If you have questions about this Privacy Policy or how we handle
              your data, please contact our Data Protection Officer.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact">
                <Button>Contact Us</Button>
              </Link>
              <Link to="/data-usage-policy">
                <Button variant="outline">View Data Usage Policy</Button>
              </Link>
              <Link to="/terms-of-service">
                <Button variant="outline">Terms of Service</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Changes to Policy */}
        <div className="bg-muted/50 rounded-lg p-6 text-center">
          <p className="text-sm text-muted-foreground">
            We may update this Privacy Policy from time to time. We will notify
            you of significant changes via email or platform notification.
            Continued use of our services after changes constitutes acceptance
            of the updated policy.
          </p>
        </div>
      </main>
    </div>
  );
}
