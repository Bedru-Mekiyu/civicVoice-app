import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  AlertCircle,
  CheckCircle,
  Clock,
  Search,
  Plus,
  MessageSquare,
  ThumbsUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { ThemeToggle } from "../components/ThemeToggle";
import LanguageSelector from "../components/LanguageSelector";
import { useState } from "react";
import { toast } from "sonner";

export default function IssueTracking() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");

  const issues = [
    {
      id: "ISS-2024-001",
      title: "Broken streetlight on Main Street",
      description:
        "The streetlight near the intersection of Main St and Oak Ave has been out for 3 days",
      category: "Infrastructure",
      priority: "Medium",
      status: "In Progress",
      votes: 23,
      comments: 5,
      reporter: "John D.",
      dateReported: "2024-03-15",
      estimatedResolution: "2024-03-20",
    },
    {
      id: "ISS-2024-002",
      title: "Pothole causing traffic delays",
      description:
        "Large pothole on Highway 101 causing vehicle damage and traffic slowdowns",
      category: "Transportation",
      priority: "High",
      status: "Open",
      votes: 47,
      comments: 12,
      reporter: "Anonymous",
      dateReported: "2024-03-18",
      estimatedResolution: "2024-03-25",
    },
    {
      id: "ISS-2024-003",
      title: "Park playground equipment needs repair",
      description:
        "Several pieces of playground equipment at Central Park are damaged and unsafe",
      category: "Recreation",
      priority: "High",
      status: "Resolved",
      votes: 34,
      comments: 8,
      reporter: "Sarah M.",
      dateReported: "2024-02-28",
      estimatedResolution: "2024-03-10",
    },
    {
      id: "ISS-2024-004",
      title: "Water main leak on Elm Street",
      description:
        "Water leak causing flooding and disrupting water service to nearby homes",
      category: "Utilities",
      priority: "Critical",
      status: "In Progress",
      votes: 67,
      comments: 15,
      reporter: "Mike R.",
      dateReported: "2024-03-19",
      estimatedResolution: "2024-03-21",
    },
    {
      id: "ISS-2024-005",
      title: "Graffiti removal needed at bus stop",
      description:
        "Bus stop on Pine Avenue has been vandalized and needs cleaning",
      category: "Maintenance",
      priority: "Low",
      status: "Open",
      votes: 8,
      comments: 2,
      reporter: "Lisa K.",
      dateReported: "2024-03-17",
      estimatedResolution: "2024-03-30",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Resolved":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "In Progress":
        return <Clock className="w-4 h-4 text-blue-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-orange-600" />;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Resolved":
        return "default";
      case "In Progress":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "text-red-600 bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800";
      case "High":
        return "text-orange-600 bg-orange-50 border-orange-200 dark:bg-orange-950 dark:border-orange-800";
      case "Medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200 dark:bg-gray-950 dark:border-gray-800";
    }
  };

  const filteredIssues = issues.filter(
    (issue) =>
      issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Community Issue Tracking
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Report local issues, track their progress, and collaborate with your
            community to improve our neighborhoods.
          </p>
          <Link to="/feedback">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              <Plus className="w-5 h-5 mr-2" />
              Report New Issue
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <AlertCircle className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">12</div>
              <div className="text-sm text-muted-foreground">Open Issues</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">8</div>
              <div className="text-sm text-muted-foreground">In Progress</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">47</div>
              <div className="text-sm text-muted-foreground">Resolved</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <ThumbsUp className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">3.2</div>
              <div className="text-sm text-muted-foreground">
                Avg Days to Resolution
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search issues..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Issues List */}
        <div className="space-y-6">
          {filteredIssues.map((issue) => (
            <Card
              key={issue.id}
              className="group hover:shadow-lg transition-all duration-300"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-mono text-muted-foreground">
                        {issue.id}
                      </span>
                      <Badge
                        variant={getStatusVariant(issue.status)}
                        className="flex items-center gap-1"
                      >
                        {getStatusIcon(issue.status)}
                        {issue.status}
                      </Badge>
                      <Badge
                        className={`${getPriorityColor(issue.priority)} border`}
                      >
                        {issue.priority}
                      </Badge>
                      <Badge variant="outline">{issue.category}</Badge>
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors mb-2">
                      {issue.title}
                    </CardTitle>
                    <p className="text-muted-foreground">{issue.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-6">
                    <span>Reported by {issue.reporter}</span>
                    <span>on {issue.dateReported}</span>
                    {issue.estimatedResolution && (
                      <span>Est. resolution: {issue.estimatedResolution}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{issue.votes} votes</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      <span>{issue.comments} comments</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        toast.success(`Vote registered for "${issue.title}"!`, {
                          description: `Thank you for supporting ${issue.id}`,
                        });
                      }}
                    >
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      Vote
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        toast.info(`Comments for "${issue.title}"`, {
                          description: "Comment feature coming soon!",
                        });
                      }}
                    >
                      <MessageSquare className="w-4 h-4 mr-1" />
                      Comment
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-muted/50 rounded-2xl p-8 text-center mt-16">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Don't See Your Issue?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Help improve your community by reporting new issues. Every report
            helps us make our city better.
          </p>
          <Link to="/feedback">
            <Button size="lg">
              <Plus className="w-5 h-5 mr-2" />
              Report New Issue
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
