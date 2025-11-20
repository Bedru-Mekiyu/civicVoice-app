import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Shield,
  Users,
  FileText,
  Settings,
  BarChart3,
  Bell,
  Lock,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { ThemeToggle } from "../components/ThemeToggle";
import LanguageSelector from "../components/LanguageSelector";
import Breadcrumb from "../components/Breadcrumb";

export default function GovernmentPortal() {
  const { t } = useLanguage();

  const portalFeatures = [
    {
      title: "Citizen Feedback Management",
      description:
        "View, respond to, and track citizen feedback across all government services",
      icon: <Users className="w-8 h-8" />,
      status: "Active",
      users: "247 officials",
    },
    {
      title: "Analytics Dashboard",
      description:
        "Real-time insights into service performance, citizen satisfaction, and trends",
      icon: <BarChart3 className="w-8 h-8" />,
      status: "Active",
      users: "89 analysts",
    },
    {
      title: "Document Management",
      description:
        "Secure storage and management of government documents and reports",
      icon: <FileText className="w-8 h-8" />,
      status: "Active",
      users: "156 users",
    },
    {
      title: "Notification Center",
      description:
        "Manage alerts, updates, and communications with citizens and departments",
      icon: <Bell className="w-8 h-8" />,
      status: "Active",
      users: "312 recipients",
    },
    {
      title: "User Management",
      description: "Administer user accounts, permissions, and access controls",
      icon: <Settings className="w-8 h-8" />,
      status: "Active",
      users: "23 administrators",
    },
    {
      title: "Security Center",
      description:
        "Monitor system security, audit logs, and data protection compliance",
      icon: <Shield className="w-8 h-8" />,
      status: "Active",
      users: "12 security officers",
    },
  ];

  const quickActions = [
    {
      title: "Review Pending Feedback",
      description: "23 new feedback submissions awaiting response",
      action: "Review Now",
      urgency: "high",
    },
    {
      title: "Generate Weekly Report",
      description: "Weekly performance report is ready to generate",
      action: "Generate",
      urgency: "medium",
    },
    {
      title: "Update Service Status",
      description: "5 services need status updates",
      action: "Update",
      urgency: "medium",
    },
    {
      title: "System Maintenance",
      description: "Scheduled maintenance window approaching",
      action: "View Schedule",
      urgency: "low",
    },
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "text-red-600 bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800";
      case "medium":
        return "text-orange-600 bg-orange-50 border-orange-200 dark:bg-orange-950 dark:border-orange-800";
      default:
        return "text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Government Administration Portal
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Secure, centralized platform for government officials to manage
            services, monitor performance, and respond to citizen feedback.
          </p>
        </div>

        {/* Access Notice */}
        <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-6 mb-12">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-amber-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-900 dark:text-amber-200 mb-2">
                Restricted Access Portal
              </h3>
              <p className="text-amber-800 dark:text-amber-300 text-sm">
                This portal is restricted to authorized government personnel
                only. All access is logged and monitored for security purposes.
                If you are a citizen looking to access services or submit
                feedback, please use the main platform.
              </p>
              <div className="flex gap-3 mt-4">
                <Link to="/admin-login">
                  <Button variant="secondary" size="sm">
                    Official Login
                  </Button>
                </Link>
                <Link to="/listings">
                  <Button variant="outline" size="sm">
                    Citizen Services
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-foreground mb-8">
            Quick Actions
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {quickActions.map((action, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {action.title}
                        </h3>
                        <Badge
                          className={`${getUrgencyColor(
                            action.urgency
                          )} border text-xs`}
                        >
                          {action.urgency}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        {action.description}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="ml-4">
                      {action.action}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Portal Features */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-foreground mb-8">
            Portal Features
          </h2>
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {portalFeatures.map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      {feature.icon}
                    </div>
                    <Badge className="bg-green-100 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800">
                      {feature.status}
                    </Badge>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {feature.description}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {feature.users}
                    </span>
                    <Button variant="outline" size="sm" disabled>
                      Access Restricted
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Security Information */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-foreground mb-8">
            Security & Compliance
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Data Protection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Bank-level encryption for all data
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Regular security audits and assessments
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    GDPR and local privacy law compliance
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Comprehensive audit logging
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Access Control
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Role-based access permissions
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Multi-factor authentication required
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Session timeout and monitoring
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    IP address restrictions
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contact Information */}
        <div className="bg-muted/50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Need Portal Access?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Government portal access is restricted to authorized personnel.
            Contact your IT administrator or department head to request access.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button variant="outline">Contact IT Support</Button>
            </Link>
            <Link to="/admin-login">
              <Button>Official Login</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
