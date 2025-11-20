import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  TrendingUp,
  MessageSquare,
  CheckCircle,
  Clock,
  Settings,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { useEffect, useState, useMemo } from "react";
import { auth } from "@/lib/auth";
import { API_BASE_URL, AuthApi } from "@/lib/api";

export default function UserProfile() {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any | null>(null);
  const [avatarUploading, setAvatarUploading] = useState(false);

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
    if (!currentUser) {
      navigate("/login");
      return;
    }

    const token = auth.getToken();
    if (!token) {
      navigate("/login");
      return;
    }

    const loadProfileAndFeedback = async () => {
      try {
        // Fetch latest profile (including avatar) from backend
        const me = await AuthApi.me(token);
        setProfile(me);

        // Load user's feedback from localStorage
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
      } catch (e) {
        console.error("Failed to load profile or feedback:", e);
        setProfile(null);
        setFeedback([]);
      } finally {
        setLoading(false);
      }
    };

    loadProfileAndFeedback();
  }, [currentUser, navigate]);

  const userStats = useMemo(() => {
    const resolved = feedback.filter((f) => f.status === "resolved").length;
    const pending = feedback.filter(
      (f) => !f.status || f.status === "pending"
    ).length;
    const avgRating =
      feedback.length > 0
        ? Math.round(
            (feedback.reduce((sum, f) => sum + (f.rating || 0), 0) /
              feedback.length) *
              10
          ) / 10
        : 0;

    return [
      {
        label: "Feedback Submitted",
        value: feedback.length.toString(),
        icon: MessageSquare,
        color: "text-primary",
      },
      {
        label: "Issues Resolved",
        value: resolved.toString(),
        icon: CheckCircle,
        color: "text-green-500",
      },
      {
        label: "Pending Reviews",
        value: pending.toString(),
        icon: Clock,
        color: "text-orange-500",
      },
      {
        label: "Average Rating",
        value: avgRating.toString(),
        icon: TrendingUp,
        color: "text-accent",
      },
    ];
  }, [feedback]);

  const recentActivity = useMemo(() => {
    return feedback.slice(0, 5).map((f, idx) => ({
      id: f.id || idx,
      type: "feedback",
      title:
        f.comment?.substring(0, 50) + (f.comment?.length > 50 ? "..." : "") ||
        "Feedback submitted",
      status:
        f.status === "resolved"
          ? "Resolved"
          : f.status === "in-progress"
          ? "In Progress"
          : "Under Review",
      date: f.timestamp || new Date().toISOString(),
      category: f.sector || "General",
    }));
  }, [feedback]);

  const achievements = useMemo(() => {
    const feedbackCount = feedback.length;
    return [
      {
        title: "Active Citizen",
        description: "Submitted 10+ feedback",
        icon: "🏆",
        earned: feedbackCount >= 10,
      },
      {
        title: "Problem Solver",
        description: "5 issues resolved",
        icon: "⭐",
        earned: feedback.filter((f) => f.status === "resolved").length >= 5,
      },
      {
        title: "Community Leader",
        description: "Helped improve 3 services",
        icon: "👑",
        earned: new Set(feedback.map((f) => f.sector)).size >= 3,
      },
      {
        title: "Engagement Champion",
        description: "Submit 20+ feedback",
        icon: "🔥",
        earned: feedbackCount >= 20,
      },
    ];
  }, [feedback]);

  const avatarUrl = profile?.avatar
    ? `${API_BASE_URL}${profile.avatar}`
    : "/placeholder.svg";

  const handleAvatarChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const token = auth.getToken();
    if (!token) {
      navigate("/login");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setAvatarUploading(true);
      const result = await AuthApi.uploadAvatar(formData, token);

      // Update token so navigation, etc. can see latest avatar
      if (result?.token) {
        auth.setToken(result.token);
      }

      if (result?.user) {
        setProfile(result.user);
      } else if (result?.avatar) {
        setProfile((prev: any) => ({ ...(prev || {}), avatar: result.avatar }));
      }
    } catch (e) {
      console.error("Failed to upload avatar:", e);
      // In a real app, surface a toast here
    } finally {
      setAvatarUploading(false);
    }
  };

  return (
    <>
      <SEOHead
        title="User Profile - CivicVoice Et"
        description="Manage your profile, track your civic engagement activities, and view your impact on improving government services."
        keywords={[
          "user profile",
          "civic engagement tracking",
          "citizen dashboard",
        ]}
      />

      <div className="min-h-screen bg-background">
        {loading ? (
          <div className="max-w-7xl mx-auto px-4 py-12 text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading profile...</p>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Profile Header */}
            <Card className="mb-8 border-2">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <Avatar className="w-24 h-24 border-4 border-primary">
                    <AvatarImage
                      src={avatarUrl}
                      alt={currentUser?.name || currentUser?.email || "User"}
                    />
                    <AvatarFallback className="text-2xl bg-gradient-to-br from-primary to-secondary text-primary-foreground">
                      {(currentUser?.name ||
                        currentUser?.email ||
                        "?")[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                      <h1 className="text-3xl font-bold text-foreground">
                        {currentUser?.name || currentUser?.email || "User"}
                      </h1>
                      <Badge
                        variant="secondary"
                        className="w-fit mx-auto md:mx-0"
                      >
                        <Award className="w-4 h-4 mr-1" />
                        Verified Citizen
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Active civic participant since{" "}
                      {new Date(
                        currentUser?.iat * 1000 || Date.now()
                      ).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </p>

                    <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {currentUser?.email || "Not provided"}
                      </div>
                      {currentUser?.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          {currentUser.phone}
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Addis Ababa, Ethiopia
                      </div>
                    </div>
                  </div>

                  <Link to="/settings">
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {userStats.map((stat, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <stat.icon className={`w-8 h-8 ${stat.color} mb-2`} />
                      <div className="text-3xl font-bold text-foreground mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {stat.label}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Tabs defaultValue="activity" className="space-y-6">
              <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3">
                <TabsTrigger value="activity">Recent Activity</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="settings">Profile Settings</TabsTrigger>
              </TabsList>

              {/* Recent Activity Tab */}
              <TabsContent value="activity" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Recent Submissions</CardTitle>
                    <CardDescription>
                      Track the status of your feedback and issues
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-start justify-between p-4 border border-border rounded-lg hover:border-primary/50 transition-colors"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-foreground">
                                {activity.title}
                              </h3>
                              <Badge
                                variant={
                                  activity.status === "Resolved"
                                    ? "default"
                                    : activity.status === "In Progress"
                                    ? "secondary"
                                    : "outline"
                                }
                              >
                                {activity.status}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {new Date(activity.date).toLocaleDateString()}
                              </span>
                              <Badge variant="outline">
                                {activity.category}
                              </Badge>
                            </div>
                          </div>
                          <Link to={`/issue-tracking`}>
                            <Button variant="ghost" size="sm">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Achievements Tab */}
              <TabsContent value="achievements">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Achievements</CardTitle>
                    <CardDescription>
                      Earn badges by actively participating in civic engagement
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {achievements.map((achievement, index) => (
                        <div
                          key={index}
                          className={`p-6 border-2 rounded-lg ${
                            achievement.earned
                              ? "border-primary bg-primary/5"
                              : "border-border bg-muted/30 opacity-60"
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <div className="text-4xl">{achievement.icon}</div>
                            <div>
                              <h3 className="font-semibold text-lg text-foreground mb-1">
                                {achievement.title}
                              </h3>
                              <p className="text-sm text-muted-foreground mb-2">
                                {achievement.description}
                              </p>
                              {achievement.earned ? (
                                <Badge variant="default">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Earned
                                </Badge>
                              ) : (
                                <Badge variant="outline">Locked</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Settings</CardTitle>
                    <CardDescription>
                      Update your personal information and preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" defaultValue="John" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" defaultValue="Doe" />
                        </div>
                      </div>

                      {/* Profile avatar upload */}
                      <div className="space-y-2">
                        <Label htmlFor="avatar">Profile Image</Label>
                        <div className="flex items-center gap-4">
                          <Avatar className="w-16 h-16 border-2 border-primary/30">
                            <AvatarImage
                              src={avatarUrl}
                              alt={
                                currentUser?.name ||
                                currentUser?.email ||
                                "User"
                              }
                            />
                            <AvatarFallback className="text-lg bg-gradient-to-br from-primary to-secondary text-primary-foreground">
                              {(currentUser?.name ||
                                currentUser?.email ||
                                "?")[0].toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="space-y-2">
                            <Input
                              id="avatar"
                              type="file"
                              accept="image/*"
                              onChange={handleAvatarChange}
                              disabled={avatarUploading}
                            />
                            <p className="text-xs text-muted-foreground">
                              PNG, JPG up to a few MB. Your image will be used
                              across your profile.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          defaultValue="john.doe@example.com"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          defaultValue="+251 91 234 5678"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          defaultValue="Addis Ababa, Ethiopia"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <textarea
                          id="bio"
                          className="w-full min-h-[100px] px-3 py-2 border border-input rounded-md bg-background"
                          placeholder="Tell us about yourself..."
                        />
                      </div>

                      <div className="flex items-center gap-4">
                        <Button type="submit">Save Changes</Button>
                        <Button type="button" variant="outline">
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </>
  );
}
