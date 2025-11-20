import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  FileText,
  Download,
  Eye,
  Search,
  Filter,
  TrendingUp,
  Users,
  DollarSign,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { ThemeToggle } from "../components/ThemeToggle";
import LanguageSelector from "../components/LanguageSelector";
import { useState } from "react";

export default function PublicReports() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");

  const reports = [
    {
      id: 1,
      title: "Annual Budget Report 2024",
      description:
        "Comprehensive overview of government spending and revenue allocation",
      category: "Budget",
      date: "2024-01-15",
      downloads: 2847,
      size: "2.3 MB",
      type: "PDF",
      featured: true,
    },
    {
      id: 2,
      title: "Infrastructure Development Progress",
      description:
        "Quarterly report on road, bridge, and public facility construction",
      category: "Infrastructure",
      date: "2024-03-01",
      downloads: 1523,
      size: "4.1 MB",
      type: "PDF",
      featured: false,
    },
    {
      id: 3,
      title: "Education Sector Performance",
      description:
        "Student achievement metrics and educational program outcomes",
      category: "Education",
      date: "2024-02-20",
      downloads: 987,
      size: "1.8 MB",
      type: "PDF",
      featured: true,
    },
    {
      id: 4,
      title: "Healthcare System Statistics",
      description: "Public health indicators and hospital performance data",
      category: "Healthcare",
      date: "2024-02-28",
      downloads: 1234,
      size: "3.2 MB",
      type: "PDF",
      featured: false,
    },
    {
      id: 5,
      title: "Environmental Impact Assessment",
      description:
        "Air quality, water resources, and conservation project updates",
      category: "Environment",
      date: "2024-01-30",
      downloads: 756,
      size: "5.4 MB",
      type: "PDF",
      featured: false,
    },
    {
      id: 6,
      title: "Crime and Safety Statistics",
      description: "Public safety metrics and law enforcement performance",
      category: "Safety",
      date: "2024-03-10",
      downloads: 654,
      size: "1.2 MB",
      type: "PDF",
      featured: false,
    },
  ];

  const featuredReports = reports.filter((report) => report.featured);
  const filteredReports = reports.filter(
    (report) =>
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Public Reports & Data
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Access transparent government reports, statistics, and public data
            to stay informed about civic matters.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <FileText className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">247</div>
              <div className="text-sm text-muted-foreground">Total Reports</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">12.5K</div>
              <div className="text-sm text-muted-foreground">
                Downloads This Month
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">3.2K</div>
              <div className="text-sm text-muted-foreground">
                Active Readers
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Featured Reports */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            Featured Reports
          </h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {featuredReports.map((report) => (
              <Card
                key={report.id}
                className="group hover:shadow-lg transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge className="bg-primary/10 text-primary border-primary/20">
                      Featured
                    </Badge>
                    <div className="text-sm text-muted-foreground">
                      {report.date}
                    </div>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {report.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {report.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-4">
                      <span>{report.size}</span>
                      <span>{report.downloads} downloads</span>
                    </div>
                    <Badge variant="outline">{report.category}</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() =>
                        window.open(`/reports/${report.id}/preview`, "_blank")
                      }
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        const link = document.createElement("a");
                        link.href = `/api/reports/${report.id}/download`;
                        link.download = `${report.title}.pdf`;
                        link.click();
                      }}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Search & Filter */}
        <section className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </section>

        {/* All Reports */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            All Reports
          </h2>
          <div className="grid gap-4">
            {filteredReports.map((report) => (
              <Card
                key={report.id}
                className="group hover:shadow-md transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                          {report.title}
                        </h3>
                        <Badge variant="outline">{report.category}</Badge>
                        {report.featured && (
                          <Badge className="bg-primary/10 text-primary border-primary/20">
                            Featured
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground mb-3">
                        {report.description}
                      </p>
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <span>{report.date}</span>
                        <span>{report.size}</span>
                        <span>{report.downloads} downloads</span>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          window.open(`/reports/${report.id}/preview`, "_blank")
                        }
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => {
                          const link = document.createElement("a");
                          link.href = `/api/reports/${report.id}/download`;
                          link.download = `${report.title}.pdf`;
                          link.click();
                        }}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
