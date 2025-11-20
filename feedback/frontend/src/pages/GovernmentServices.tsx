import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Building2,
  FileText,
  Users,
  Calendar,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { ThemeToggle } from "../components/ThemeToggle";
import LanguageSelector from "../components/LanguageSelector";

export default function GovernmentServices() {
  const { t } = useLanguage();

  const services = [
    {
      id: 1,
      title: "Digital ID Services",
      description:
        "Apply for national ID, passport, and digital certificates online",
      category: "Identity",
      status: "Available",
      processing: "1-3 days",
      icon: <FileText className="w-6 h-6" />,
    },
    {
      id: 2,
      title: "Business Registration",
      description: "Register new businesses and manage business licenses",
      category: "Business",
      status: "Available",
      processing: "3-5 days",
      icon: <Building2 className="w-6 h-6" />,
    },
    {
      id: 3,
      title: "Tax Services",
      description:
        "File taxes, check refund status, and manage tax obligations",
      category: "Finance",
      status: "Available",
      processing: "Instant",
      icon: <FileText className="w-6 h-6" />,
    },
    {
      id: 4,
      title: "Social Benefits",
      description:
        "Apply for unemployment benefits, healthcare, and social assistance",
      category: "Social",
      status: "Available",
      processing: "5-10 days",
      icon: <Users className="w-6 h-6" />,
    },
    {
      id: 5,
      title: "Court Services",
      description:
        "Schedule court dates, access legal documents, and case tracking",
      category: "Legal",
      status: "Beta",
      processing: "Varies",
      icon: <Calendar className="w-6 h-6" />,
    },
    {
      id: 6,
      title: "Education Services",
      description:
        "School enrollment, transcript requests, and education records",
      category: "Education",
      status: "Coming Soon",
      processing: "TBD",
      icon: <FileText className="w-6 h-6" />,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Government Services Portal
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Access essential government services online. Fast, secure, and
            available 24/7 to serve citizens efficiently.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {services.map((service) => (
            <Card
              key={service.id}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    {service.icon}
                  </div>
                  <Badge
                    variant={
                      service.status === "Available"
                        ? "default"
                        : service.status === "Beta"
                        ? "secondary"
                        : "outline"
                    }
                    className="ml-2"
                  >
                    {service.status}
                  </Badge>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  {service.description}
                </p>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {service.processing}
                  </div>
                  <Badge variant="outline">{service.category}</Badge>
                </div>
                <Button
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                  variant={
                    service.status === "Available" ? "default" : "outline"
                  }
                  disabled={service.status === "Coming Soon"}
                >
                  {service.status === "Coming Soon"
                    ? "Coming Soon"
                    : "Access Service"}
                  {service.status !== "Coming Soon" && (
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Section */}
        <div className="bg-muted/50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Need Help Getting Started?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our support team is available to help you navigate government
            services and complete your applications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/help-center">
              <Button variant="outline">Visit Help Center</Button>
            </Link>
            <Link to="/contact">
              <Button>Contact Support</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
