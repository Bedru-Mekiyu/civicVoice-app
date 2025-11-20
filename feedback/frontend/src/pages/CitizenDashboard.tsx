/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, MessageSquare, Clock, TrendingUp, Download } from "lucide-react";
import { FeedbackApi, AuthApi } from "@/lib/api";
import { auth } from "@/lib/auth";
import { useNavigate, Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CitizenDashboard() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<any[]>([]);
  const [selectedFeedback, setSelectedFeedback] = useState<any | null>(null);

  // Current user (decoded from JWT)
  const currentUser = useMemo(() => {
    const token = auth.getToken();
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split(".")?.[1] || ""));
      return payload || null;
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    async function loadUserFeedback() {
      try {
        setLoading(true);

        // Try API first
        try {
          const res: any = await FeedbackApi.list(1, 100);
          if (!mounted) return;
          const items = (res?.feedback || []) as any[];
          // Filter to show only current user's feedback
          const userFeedback = items.filter(
            (f) =>
              f?.user?.email === currentUser?.email ||
              f?.user?._id === currentUser?.sub ||
              f?.user?.id === currentUser?.sub
          );
          setFeedback(userFeedback);
        } catch (apiError) {
          // Fallback to localStorage
          const localFeedback = JSON.parse(
            localStorage.getItem("mock_feedback") || "[]"
          );
          const userFeedback = localFeedback.filter(
            (f: any) =>
              f?.userId === currentUser?.sub ||
              f?.userId === currentUser?.userId ||
              f?.userId === currentUser?.email
          );
          setFeedback(userFeedback);
        }
      } catch (e: any) {
        console.error("Failed to load feedback:", e);
        setFeedback([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    if (!currentUser) {
      navigate("/login");
      return;
    }

    loadUserFeedback();
    return () => {
      mounted = false;
    };
  }, [currentUser, navigate]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  const avgRating = useMemo(() => {
    if (feedback.length === 0) return 0;
    const sum = feedback.reduce((acc, f) => acc + (f.rating || 0), 0);
    return Math.round((sum / feedback.length) * 10) / 10;
  }, [feedback]);

  const MetricCard = ({ title, value, icon: Icon, color }: any) => (
    <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group border-border/50">
      <div
        className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10"
        style={{
          background: `linear-gradient(135deg, ${color}20, transparent)`,
        }}
      />
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">
              {title}
            </p>
            <p className="text-4xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent mt-2">
              {value}
            </p>
          </div>
          <div
            className={`p-4 rounded-2xl ${color} shadow-lg group-hover:scale-110 transition-transform duration-300`}
          >
            <Icon className="h-7 w-7 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/5 to-background">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-2xl blur-3xl -z-10" />
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border/50 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                  {t("dashboard.welcome")},{" "}
                  {currentUser?.name || currentUser?.email}
                </h1>
                <p className="text-muted-foreground text-lg">
                  Track and manage your civic engagement
                </p>
              </div>
              <div className="hidden md:block">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-xl">
                  <span className="text-3xl font-bold text-primary-foreground">
                    {(currentUser?.name ||
                      currentUser?.email ||
                      "?")[0].toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">{t("dashboard.loading")}</p>
          </div>
        )}

        {!loading && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <MetricCard
                title={t("dashboard.total_feedback")}
                value={feedback.length}
                icon={MessageSquare}
                color="bg-primary"
              />
              <MetricCard
                title={t("dashboard.average_rating")}
                value={`${avgRating}/5`}
                icon={Star}
                color="bg-secondary"
              />
              <MetricCard
                title="Recent Activity"
                value={
                  feedback.filter((f) => {
                    const date = new Date(f.createdAt || f.date);
                    const daysDiff =
                      (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24);
                    return daysDiff <= 7;
                  }).length
                }
                icon={Clock}
                color="bg-accent"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="border-border/50 shadow-lg backdrop-blur-sm bg-card/95">
                  <CardHeader className="border-b border-border/50">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-2xl flex items-center gap-2">
                        <MessageSquare className="w-6 h-6 text-primary" />
                        Your Feedback History
                      </CardTitle>
                      <Link to="/feedback">
                        <Button
                          size="sm"
                          className="shadow-md hover:shadow-lg transition-shadow"
                        >
                          <TrendingUp className="w-4 h-4 mr-2" />
                          Submit New Feedback
                        </Button>
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    {feedback.length === 0 ? (
                      <div className="p-8 text-center text-muted-foreground">
                        <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p className="mb-4">
                          You haven't submitted any feedback yet.
                        </p>
                        <Link to="/feedback">
                          <Button>Submit Your First Feedback</Button>
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-0">
                        {feedback.map((fb, index) => (
                          <div
                            key={fb._id || fb.id || index}
                            className="flex items-center justify-between p-4 border-b border-border hover:bg-muted/50 transition-colors duration-200 cursor-pointer"
                            onClick={() => setSelectedFeedback(fb)}
                          >
                            <div className="flex items-center space-x-3 flex-1">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src="/placeholder.svg" />
                                <AvatarFallback>
                                  {
                                    (currentUser?.name ||
                                      currentUser?.email ||
                                      "?")[0]
                                  }
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <Badge variant="secondary">
                                    {fb.sector || "General"}
                                  </Badge>
                                  <span className="text-xs text-muted-foreground">
                                    {new Date(
                                      fb.createdAt || fb.date
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                                <p className="text-sm text-foreground truncate">
                                  {fb.comment || "No comment"}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                {renderStars(fb.rating || 0)}
                              </div>
                              <Button size="sm" variant="outline">
                                View Details
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="border-border/50 shadow-lg backdrop-blur-sm bg-card/95">
                  <CardHeader className="border-b border-border/50">
                    <CardTitle className="text-xl">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 pt-6">
                    <Link to="/feedback">
                      <Button className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg hover:shadow-xl transition-all">
                        <MessageSquare className="w-5 h-5 mr-2" />
                        Submit Feedback
                      </Button>
                    </Link>
                    <Link to="/services">
                      <Button className="w-full h-12" variant="outline">
                        View Services
                      </Button>
                    </Link>
                    <Link to="/public-reports">
                      <Button className="w-full h-12" variant="outline">
                        Public Reports
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                {selectedFeedback && (
                  <Card className="border-primary/50 shadow-xl backdrop-blur-sm bg-card/95 animate-fade-in">
                    <CardHeader className="border-b border-primary/30 bg-primary/5">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl text-primary">
                          Feedback Details
                        </CardTitle>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedFeedback(null)}
                          className="hover:bg-primary/10"
                        >
                          Close
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Rating:</span>
                          <div className="flex items-center">
                            {renderStars(selectedFeedback.rating || 0)}
                          </div>
                        </div>
                        <div>
                          <span className="font-medium">Sector:</span>{" "}
                          {selectedFeedback.sector || "General"}
                        </div>
                        <div>
                          <span className="font-medium">Date:</span>{" "}
                          {new Date(
                            selectedFeedback.createdAt || selectedFeedback.date
                          ).toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium mb-2">Comment</div>
                        <div className="p-3 bg-muted rounded-lg text-sm whitespace-pre-wrap">
                          {selectedFeedback.comment || "—"}
                        </div>
                      </div>
                      {Array.isArray(selectedFeedback.files) &&
                        selectedFeedback.files.length > 0 && (
                          <div>
                            <div className="font-medium mb-2">Attachments</div>
                            <ul className="list-disc pl-5 text-sm space-y-1">
                              {selectedFeedback.files.map(
                                (f: any, i: number) => (
                                  <li
                                    key={i}
                                    className="break-all text-muted-foreground"
                                  >
                                    {f.originalname || f.filename}
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        )}
                      <Button className="w-full" size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Download Report
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
