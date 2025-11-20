import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  FileText,
  BarChart3,
  Download,
  Calendar,
  Filter,
  Settings,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { ThemeToggle } from "../components/ThemeToggle";
import LanguageSelector from "../components/LanguageSelector";

export default function ReportingTools() {
  const { t } = useLanguage();

  const reportTemplates = [
    {
      id: 1,
      title: "Citizen Feedback Summary",
      description:
        "Comprehensive overview of citizen feedback trends and satisfaction metrics",
      category: "Feedback",
      format: "PDF, Excel",
      frequency: "Monthly",
      lastGenerated: "March 2024",
    },
    {
      id: 2,
      title: "Service Performance Report",
      description:
        "Detailed analysis of government service delivery and response times",
      category: "Performance",
      format: "PDF, CSV",
      frequency: "Quarterly",
      lastGenerated: "Q1 2024",
    },
    {
      id: 3,
      title: "Budget Utilization Dashboard",
      description:
        "Visual breakdown of budget allocation and spending across departments",
      category: "Financial",
      format: "Interactive Dashboard",
      frequency: "Real-time",
      lastGenerated: "Live",
    },
    {
      id: 4,
      title: "Issue Resolution Analytics",
      description:
        "Track issue resolution rates, response times, and citizen satisfaction",
      category: "Analytics",
      format: "PDF, JSON",
      frequency: "Weekly",
      lastGenerated: "March 2024",
    },
  ];

  const tools = [
    {
      title: "Custom Report Builder",
      description: "Create custom reports with drag-and-drop interface",
      icon: <Settings className="w-6 h-6" />,
      features: [
        "Visual query builder",
        "Custom filters",
        "Multiple export formats",
        "Scheduled generation",
      ],
    },
    {
      title: "Data Visualization",
      description: "Interactive charts and graphs for data analysis",
      icon: <BarChart3 className="w-6 h-6" />,
      features: [
        "Real-time charts",
        "Multiple chart types",
        "Interactive filtering",
        "Export capabilities",
      ],
    },
    {
      title: "Automated Reporting",
      description:
        "Schedule reports to be generated and delivered automatically",
      icon: <Calendar className="w-6 h-6" />,
      features: [
        "Flexible scheduling",
        "Email delivery",
        "Multiple recipients",
        "Custom templates",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Advanced Reporting Tools
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Generate comprehensive reports, visualize data trends, and gain
            insights from government operations and citizen feedback.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <Card>
            <CardContent className="p-6 text-center">
              <FileText className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">47</div>
              <div className="text-sm text-muted-foreground">
                Report Templates
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <BarChart3 className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">12</div>
              <div className="text-sm text-muted-foreground">
                Live Dashboards
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Download className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">1,234</div>
              <div className="text-sm text-muted-foreground">
                Reports Generated
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Calendar className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">28</div>
              <div className="text-sm text-muted-foreground">
                Scheduled Reports
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reporting Tools */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-foreground mb-8">
            Available Tools
          </h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300"
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    {tool.icon}
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {tool.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    {tool.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {tool.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                    onClick={() => {
                      console.log("Launching tool:", tool.title);
                      alert(
                        `${tool.title} will be available soon. This feature is under development.`
                      );
                    }}
                  >
                    Launch Tool
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Report Templates */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-foreground">
              Report Templates
            </h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Customize
              </Button>
            </div>
          </div>
          <div className="grid gap-6">
            {reportTemplates.map((template) => (
              <Card
                key={template.id}
                className="group hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                          {template.title}
                        </h3>
                        <Badge variant="outline">{template.category}</Badge>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        {template.description}
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                        <div>
                          <span className="font-medium">Format:</span>{" "}
                          {template.format}
                        </div>
                        <div>
                          <span className="font-medium">Frequency:</span>{" "}
                          {template.frequency}
                        </div>
                        <div>
                          <span className="font-medium">Last Generated:</span>{" "}
                          {template.lastGenerated}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          console.log("Previewing report:", template.title);
                          alert(
                            `Preview: ${template.title}\n\nThis would show a preview of the report. Feature coming soon!`
                          );
                        }}
                      >
                        Preview
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => {
                          console.log("Generating report:", template.title);
                          alert(
                            `Generating ${template.title}...\n\nYour report will be ready in a few moments.`
                          );
                        }}
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Generate
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Custom Report Builder CTA */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Need a Custom Report?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Use our advanced report builder to create custom reports tailored to
            your specific needs and requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => {
                console.log("Launching report builder...");
                alert(
                  "Report Builder\n\nThe custom report builder is under development. This feature will allow you to create fully customized reports."
                );
              }}
            >
              <Settings className="w-5 h-5 mr-2" />
              Launch Report Builder
            </Button>
            <Link to="/contact">
              <Button variant="outline" size="lg">
                Request Custom Report
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
