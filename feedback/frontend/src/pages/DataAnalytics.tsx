import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Download,
  RefreshCw,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { ThemeToggle } from "../components/ThemeToggle";
import LanguageSelector from "../components/LanguageSelector";

export default function DataAnalytics() {
  const { t } = useLanguage();

  const dashboardCards = [
    {
      title: "Total Budget",
      value: "$2.4M",
      change: "+5.2%",
      trend: "up",
      description: "Government budget allocation",
    },
    {
      title: "Active Citizens",
      value: "12,847",
      change: "+12.3%",
      trend: "up",
      description: "Registered platform users",
    },
    {
      title: "Service Requests",
      value: "3,421",
      change: "-2.1%",
      trend: "down",
      description: "Monthly service requests",
    },
    {
      title: "Response Time",
      value: "2.3 days",
      change: "-8.7%",
      trend: "up",
      description: "Average response time",
    },
  ];

  const datasets = [
    {
      id: 1,
      name: "Government Spending Analysis",
      description:
        "Detailed breakdown of government expenditures by department and category",
      category: "Financial",
      lastUpdated: "2024-03-15",
      records: "45,231",
      format: "CSV, JSON",
      size: "12.3 MB",
    },
    {
      id: 2,
      name: "Citizen Engagement Metrics",
      description:
        "User interaction data, feedback patterns, and platform usage statistics",
      category: "Social",
      lastUpdated: "2024-03-18",
      records: "128,945",
      format: "CSV, JSON",
      size: "8.7 MB",
    },
    {
      id: 3,
      name: "Infrastructure Performance Data",
      description:
        "Road conditions, utility performance, and maintenance schedules",
      category: "Infrastructure",
      lastUpdated: "2024-03-14",
      records: "23,156",
      format: "CSV, JSON, GeoJSON",
      size: "15.2 MB",
    },
    {
      id: 4,
      name: "Public Health Statistics",
      description:
        "Healthcare system performance, patient satisfaction, and health outcomes",
      category: "Healthcare",
      lastUpdated: "2024-03-12",
      records: "67,892",
      format: "CSV, JSON",
      size: "6.4 MB",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Government Data Analytics
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore comprehensive data insights, trends, and analytics from
            government operations and citizen interactions.
          </p>
        </div>

        {/* Dashboard Overview */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            Key Metrics Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dashboardCards.map((card, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      {index === 0 && (
                        <DollarSign className="w-5 h-5 text-primary" />
                      )}
                      {index === 1 && (
                        <Users className="w-5 h-5 text-primary" />
                      )}
                      {index === 2 && (
                        <BarChart3 className="w-5 h-5 text-primary" />
                      )}
                      {index === 3 && (
                        <TrendingUp className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    <div
                      className={`flex items-center text-sm ${
                        card.trend === "up" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      <TrendingUp
                        className={`w-4 h-4 mr-1 ${
                          card.trend === "down" ? "rotate-180" : ""
                        }`}
                      />
                      {card.change}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-foreground">
                      {card.value}
                    </div>
                    <div className="text-sm font-medium text-foreground">
                      {card.title}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {card.description}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Interactive Visualizations */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            Interactive Visualizations
          </h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="h-80">
              <CardHeader>
                <CardTitle>Budget Allocation by Department</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center h-full">
                <div className="text-center text-muted-foreground">
                  <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Interactive pie chart visualization</p>
                  <p className="text-sm">(Chart component would render here)</p>
                </div>
              </CardContent>
            </Card>

            <Card className="h-80">
              <CardHeader>
                <CardTitle>Citizen Engagement Trends</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center h-full">
                <div className="text-center text-muted-foreground">
                  <TrendingUp className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Time series line chart</p>
                  <p className="text-sm">(Chart component would render here)</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Available Datasets */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-foreground">
              Available Datasets
            </h2>
            <Button
              onClick={() => {
                const dataStr = JSON.stringify(datasets, null, 2);
                const dataBlob = new Blob([dataStr], {
                  type: "application/json",
                });
                const url = URL.createObjectURL(dataBlob);
                const link = document.createElement("a");
                link.href = url;
                link.download = `all-datasets-${
                  new Date().toISOString().split("T")[0]
                }.json`;
                link.click();
                URL.revokeObjectURL(url);
              }}
            >
              <Download className="w-4 h-4 mr-2" />
              Export All Data
            </Button>
          </div>
          <div className="grid gap-6">
            {datasets.map((dataset) => (
              <Card
                key={dataset.id}
                className="group hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                          {dataset.name}
                        </h3>
                        <Badge variant="outline">{dataset.category}</Badge>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        {dataset.description}
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                        <div>
                          <span className="font-medium">Records:</span>{" "}
                          {dataset.records}
                        </div>
                        <div>
                          <span className="font-medium">Size:</span>{" "}
                          {dataset.size}
                        </div>
                        <div>
                          <span className="font-medium">Format:</span>{" "}
                          {dataset.format}
                        </div>
                        <div>
                          <span className="font-medium">Updated:</span>{" "}
                          {dataset.lastUpdated}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          window.open(
                            `/datasets/${dataset.id}/preview`,
                            "_blank"
                          )
                        }
                      >
                        Preview
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => {
                          const link = document.createElement("a");
                          link.href = `/api/datasets/${dataset.id}/download`;
                          link.download = `${dataset.name.replace(
                            /\s+/g,
                            "-"
                          )}.csv`;
                          link.click();
                        }}
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* API Access */}
        <div className="bg-muted/50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Need Programmatic Access?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Access our data through REST APIs for integration with your
            applications and services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/documentation">
              <Button variant="outline">API Documentation</Button>
            </Link>
            <Link to="/contact">
              <Button>Request API Access</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
