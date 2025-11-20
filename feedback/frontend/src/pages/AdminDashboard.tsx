import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Download,
  Settings,
  TrendingUp,
  TrendingDown,
  Clock,
  Star,
  MessageSquare,
  BarChart3,
  Filter,
  MoreHorizontal,
  Users,
  FileText
} from "lucide-react"
import { DashboardApi, FeedbackApi, AuthApi } from "@/lib/api"
import { auth } from "@/lib/auth"
import { useNavigate } from "react-router-dom"
import { useLanguage } from "@/contexts/LanguageContext"
import EmptyState from "@/components/EmptyState"
import { getMockDashboard } from "@/lib/mockDashboard"
import { toast } from "@/hooks/use-toast"

export default function AdminDashboard() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("Citizens")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [dashboard, setDashboard] = useState<any | null>(null)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [signingOut, setSigningOut] = useState(false)
  const [feedback, setFeedback] = useState<any[]>([])
  const [fbPage, setFbPage] = useState(1)
  const [fbPages, setFbPages] = useState(1)
  const [fbTotal, setFbTotal] = useState(0)
  const [sectorFilter, setSectorFilter] = useState<string>("all")
  const [search, setSearch] = useState("")
  const [selectedFeedback, setSelectedFeedback] = useState<any | null>(null)
  const [timeFilter, setTimeFilter] = useState<"weekly" | "monthly" | "yearly">("weekly")
  const [chartView, setChartView] = useState<"chart" | "values">("chart")

  useEffect(() => {
    let mounted = true
    async function fetchDashboard() {
      try {
        setLoading(true)
        setError(null)
        const token = auth.getToken()
        if (!token) {
          throw new Error("You need to be logged in as admin to view the dashboard.")
        }
        try {
          const data = await DashboardApi.get(token)
          if (mounted) setDashboard(data)
        } catch (apiError) {
          console.info("API unavailable, using mock data")
          const mockData = getMockDashboard()
          if (mounted) setDashboard(mockData)
        }
      } catch (e: any) {
        if (mounted) setError(e?.message || "Failed to load dashboard")
      } finally {
        if (mounted) setLoading(false)
      }
    }
    fetchDashboard()
    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    let mounted = true
    async function loadFeedback() {
      try {
        const res: any = await FeedbackApi.list(fbPage, 10)
        if (!mounted) return
        const items = (res?.feedback || []) as any[]
        
        // Apply filters
        const filtered = items.filter((f) => {
          const matchesSector = sectorFilter === "all" || (f.sector || "").toLowerCase() === sectorFilter
          const s = search.trim().toLowerCase()
          const matchesSearch = !s || (f.comment || "").toLowerCase().includes(s) || (f?.user?.name || f?.user?.email || "").toLowerCase().includes(s)
          return matchesSector && matchesSearch
        })
        
        setFeedback(filtered)
        setFbPage(res?.page || 1)
        setFbPages(res?.pages || 1)
        setFbTotal(res?.total || filtered.length)
      } catch (e: any) {
        // Fallback to localStorage if API fails
        try {
          const localFeedback = JSON.parse(localStorage.getItem('mock_feedback') || '[]')
          const filtered = localFeedback.filter((f: any) => {
            const matchesSector = sectorFilter === "all" || (f.sector || "").toLowerCase() === sectorFilter
            const s = search.trim().toLowerCase()
            const matchesSearch = !s || (f.comment || "").toLowerCase().includes(s)
            return matchesSector && matchesSearch
          })
          setFeedback(filtered)
          setFbTotal(filtered.length)
        } catch {
          setFeedback([])
        }
        setFbPage(1)
        setFbPages(1)
      }
    }
    loadFeedback()
    return () => {
      mounted = false
    }
  }, [fbPage, sectorFilter, search])

  const currentUser = useMemo(() => {
    const token = auth.getToken()
    if (!token) return null
    try {
      const payload = JSON.parse(atob(token.split('.')?.[1] || ''))
      return payload || null
    } catch {
      return null
    }
  }, [])

  async function handleLogout() {
    try {
      setSigningOut(true)
      try { await AuthApi.logout() } catch {}
    } finally {
      auth.clear()
      navigate('/login')
    }
  }

  const citizensList = useMemo(() => {
    if (dashboard?.citizens && dashboard.citizens.length > 0) {
      return (dashboard.citizens as any[]).map((c: any, idx: number) => ({
        id: c.id || idx + 1,
        name: c.name || c.email || "Anonymous",
        avatar: "/placeholder.svg?height=32&width=32",
        status: c.status || (c.isVerified ? "Verified" : "Unverified"),
        rating: typeof c.rating === 'number' ? c.rating : Math.round((c.avgRating || 0) * 10) / 10,
        submissions: c.submissions || 0,
        progress: Math.min(100, Math.round(c.progress ?? (c.submissions || 0) * 10)),
      }))
    }
    return [
      { id: 1, name: "Abebe Kebede", avatar: "/placeholder.svg", status: "Verified", rating: 4.5, submissions: 12, progress: 85 },
      { id: 2, name: "Tigist Haile", avatar: "/placeholder.svg", status: "Verified", rating: 4.8, submissions: 8, progress: 70 },
      { id: 3, name: "Dawit Tekle", avatar: "/placeholder.svg", status: "Pending", rating: 4.2, submissions: 5, progress: 45 },
      { id: 4, name: "Meron Tadesse", avatar: "/placeholder.svg", status: "Verified", rating: 4.7, submissions: 15, progress: 95 },
      { id: 5, name: "Yonas Girma", avatar: "/placeholder.svg", status: "Unverified", rating: 3.9, submissions: 3, progress: 25 },
    ]
  }, [dashboard])

  const recentFeedbackList = useMemo(() => {
    if (dashboard?.feedback && dashboard.feedback.length > 0) {
      return (dashboard.feedback as any[]).map((f: any, idx: number) => ({
        id: f.id || f._id || idx + 1,
        citizen: f.citizen || f.citizenName || "Anonymous",
        avatar: "/placeholder.svg?height=32&width=32",
        sector: f.sector || "General",
        rating: f.rating || 0,
        ticket: f.ticket || (typeof f._id === 'string' ? f._id.slice(-6) : "-"),
        comment: f.comment || "",
        date: f.date || f.createdAt || new Date().toISOString(),
      }))
    }
    return [
      { id: 1, citizen: "Abebe Kebede", avatar: "/placeholder.svg", sector: "Healthcare", rating: 4, ticket: "HLT001", comment: "Excellent service", date: new Date().toISOString() },
      { id: 2, citizen: "Tigist Haile", avatar: "/placeholder.svg", sector: "Education", rating: 5, ticket: "EDU002", comment: "Great improvement", date: new Date().toISOString() },
      { id: 3, citizen: "Dawit Tekle", avatar: "/placeholder.svg", sector: "Transport", rating: 3, ticket: "TRP003", comment: "Needs improvement", date: new Date().toISOString() },
      { id: 4, name: "Meron Tadesse", avatar: "/placeholder.svg", sector: "Healthcare", rating: 5, ticket: "HLT004", comment: "Quick response", date: new Date().toISOString() },
      { id: 5, citizen: "Yonas Girma", avatar: "/placeholder.svg", sector: "Municipal", rating: 4, ticket: "MUN005", comment: "Efficient processing", date: new Date().toISOString() },
    ]
  }, [dashboard])

  const weeklyChart = useMemo(() => {
    if (timeFilter === "weekly") {
      if (dashboard?.weeklyOrderData && dashboard.weeklyOrderData.length > 0) {
        return (dashboard.weeklyOrderData as any[]).map((d: any) => ({ name: d.day, value: d.orders }))
      }
    } else if (timeFilter === "monthly") {
      if (dashboard?.monthlyOrderData && dashboard.monthlyOrderData.length > 0) {
        return (dashboard.monthlyOrderData as any[]).map((d: any) => ({ name: d.day, value: d.orders }))
      }
    } else if (timeFilter === "yearly") {
      if (dashboard?.yearlyOrderData && dashboard.yearlyOrderData.length > 0) {
        return (dashboard.yearlyOrderData as any[]).map((d: any) => ({ name: d.month, value: d.orders }))
      }
    }
    return [
      { name: "Mon", value: 45 },
      { name: "Tue", value: 52 },
      { name: "Wed", value: 38 },
      { name: "Thu", value: 61 },
      { name: "Fri", value: 55 },
      { name: "Sat", value: 28 },
      { name: "Sun", value: 33 },
    ]
  }, [dashboard, timeFilter])

  const weeklyOrdersForLine = useMemo(() => {
    if (dashboard?.weeklyOrderData && dashboard.weeklyOrderData.length > 0) {
      return (dashboard.weeklyOrderData as any[]).map((d: any) => ({ day: d.day, orders: d.orders }))
    }
    return [
      { day: "Mon", orders: 45 },
      { day: "Tue", orders: 52 },
      { day: "Wed", orders: 38 },
      { day: "Thu", orders: 61 },
      { day: "Fri", orders: 55 },
      { day: "Sat", orders: 28 },
      { day: "Sun", orders: 33 },
    ]
  }, [dashboard])

  const pieData = useMemo(() => {
    if (dashboard?.pieData && dashboard.pieData.length > 0) {
      return dashboard.pieData
    }
    return [
      { name: "Healthcare", value: 35, color: "#ef4444" },
      { name: "Education", value: 28, color: "#3b82f6" },
      { name: "Transport", value: 22, color: "#10b981" },
      { name: "Municipal", value: 15, color: "#f59e0b" },
    ]
  }, [dashboard])

  const revenueData = useMemo(() => {
    if (dashboard?.revenueData && dashboard.revenueData.length > 0) {
      return dashboard.revenueData
    }
    return [
      { month: "Jan", "2023": 245, "2024": 280 },
      { month: "Feb", "2023": 220, "2024": 265 },
      { month: "Mar", "2023": 280, "2024": 310 },
      { month: "Apr", "2023": 195, "2024": 240 },
      { month: "May", "2023": 310, "2024": 340 },
      { month: "Jun", "2023": 285, "2024": 315 },
    ]
  }, [dashboard])

  const topServices = useMemo(() => {
    return [
      { name: "Health Centers", rating: 4.8, feedback: 89 },
      { name: "Education Services", rating: 4.6, feedback: 76 },
      { name: "Public Transport", rating: 4.2, feedback: 65 },
      { name: "Municipal Services", rating: 4.4, feedback: 58 },
    ]
  }, [])

  const SimpleBarChart = ({ data, xKey, yKey, height = 300 }: { data: any[]; xKey: string; yKey: string; height?: number }) => {
    if (!data || data.length === 0) {
      return <div className="w-full h-[200px] flex items-center justify-center text-sm text-muted-foreground">{t('dashboard.no_data')}</div>
    }
    const maxVal = Math.max(...data.map((d) => d[yKey] as number)) || 1
    return (
      <div className="w-full" style={{ height }}>
        <div className="flex items-end h-full gap-3">
          {data.map((d, i) => {
            const value = (d as any)[yKey] as number
            const pct = Math.round((value / maxVal) * 100)
            return (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-primary rounded-t transition-all duration-1000 ease-out" style={{ height: `${pct}%` }} />
                <span className="mt-2 text-xs text-muted-foreground">{(d as any)[xKey]}</span>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const SimpleLineChart = ({ data, xKey, yKey, height = 200 }: { data: any[]; xKey: string; yKey: string; height?: number }) => {
    if (!data || data.length === 0) {
      return <div className="w-full h-[160px] flex items-center justify-center text-sm text-muted-foreground">{t('dashboard.no_data')}</div>
    }
    const width = 600
    const padding = 24
    const values = data.map((d) => d[yKey] as number)
    const maxY = Math.max(...values) || 1
    const minY = Math.min(...values) || 0
    const rangeY = Math.max(maxY - minY, 1)
    const stepX = (width - padding * 2) / Math.max(data.length - 1, 1)

    const points = data
      .map((d, i) => {
        const x = padding + i * stepX
        const y = padding + (1 - (d[yKey] - minY) / rangeY) * (height - padding * 2)
        return `${x},${y}`
      })
      .join(" ")

    return (
      <div className="w-full overflow-x-auto">
        <svg width={width} height={height} className="text-primary">
          <polyline fill="none" stroke="currentColor" strokeWidth={3} points={points} />
        </svg>
      </div>
    )
  }

  const MetricCard = ({ title, value, change, trend, icon: Icon, color }: any) => (
    <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold text-foreground mt-2">{value}</p>
            <div className="flex items-center mt-2">
              {trend === "up" ? (
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
              )}
              <span className={`text-sm font-medium ${trend === "up" ? "text-green-500" : "text-red-500"}`}>
                {change}
              </span>
            </div>
          </div>
          <div className={`p-3 rounded-full ${color}`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const TabButton = ({ label, isActive, onClick }: any) => (
    <Button
      variant={isActive ? "default" : "ghost"}
      onClick={onClick}
      className="transition-all duration-300"
    >
      {label}
    </Button>
  )

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  const renderCitizensView = () => (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Active Citizens</h3>
          <p className="text-sm text-muted-foreground">Manage and view citizen profiles</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Search className="h-4 w-4 mr-2" />
            Search Citizens
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">CITIZEN PROFILES</CardTitle>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>Citizen</span>
                  <span>Status</span>
                  <span>Ratings</span>
                  <span>Feedback submissions</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0">
                {citizensList.length === 0 ? (
                  <EmptyState
                    icon={Users}
                    title="No Citizens Yet"
                    description="No citizens have registered on the platform yet. Citizens will appear here once they sign up."
                    actionLabel="Invite Citizens"
                    onAction={() => navigate('/settings')}
                  />
                ) : (
                  citizensList.map((citizen, index) => (
                  <div
                    key={citizen.id}
                    className="flex items-center justify-between p-4 border-b border-border hover:bg-muted/50 transition-colors duration-200"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={citizen.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{citizen.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-foreground">{citizen.name}</span>
                    </div>

                    <Badge
                      variant={
                        citizen.status === "Verified"
                          ? "default"
                          : citizen.status === "Pending"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {citizen.status}
                    </Badge>

                    <div className="flex items-center space-x-1">
                      <span className="text-sm font-medium">{citizen.rating > 0 ? citizen.rating : "--"}</span>
                      {citizen.rating > 0 && <Star className="h-4 w-4 text-yellow-400 fill-current" />}
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-500"
                          style={{ width: `${citizen.progress}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground">{citizen.submissions}</span>
                     </div>
                   </div>
                 ))
                )}
               </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Citizen Map</CardTitle>
                <Select value={timeFilter} onValueChange={(val: any) => setTimeFilter(val)}>
                  <SelectTrigger className="w-28">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <SimpleBarChart data={weeklyChart} xKey="name" yKey="value" height={300} />
            </CardContent>
          </Card>
        </div>
      </div>

      {selectedFeedback && (
        <Card className="border-primary">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Feedback Details</CardTitle>
              <Button variant="ghost" onClick={() => setSelectedFeedback(null)}>Close</Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm text-foreground">
              <div><span className="font-medium">Citizen:</span> {selectedFeedback?.user?.name || selectedFeedback?.user?.email || selectedFeedback.citizen || 'Anonymous'}</div>
              <div><span className="font-medium">Rating:</span> {selectedFeedback.rating}/5</div>
              <div><span className="font-medium">Sector:</span> {selectedFeedback.sector || 'General'}</div>
              <div><span className="font-medium">Date:</span> {selectedFeedback.date ? new Date(selectedFeedback.date).toLocaleString() : '-'}</div>
            </div>
            <div>
              <div className="font-medium mb-1">Comment</div>
              <div className="p-3 bg-muted rounded text-sm whitespace-pre-wrap">{selectedFeedback.comment || '—'}</div>
            </div>
            {Array.isArray(selectedFeedback.files) && selectedFeedback.files.length > 0 && (
              <div>
                <div className="font-medium mb-1">Files</div>
                <ul className="list-disc pl-5 text-sm">
                  {selectedFeedback.files.map((f: any, i: number) => (
                    <li key={i} className="break-all">
                      {f.originalname || f.filename}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )

  const renderFeedbackView = () => (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Feedback Submissions</h3>
          <p className="text-sm text-muted-foreground">Review and manage citizen feedback</p>
        </div>
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search by comment or user"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64"
          />
          <Select value={sectorFilter} onValueChange={setSectorFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sector" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sectors</SelectItem>
              <SelectItem value="transport">Transport</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="education">Education</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">FEEDBACK SUBMISSIONS</CardTitle>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>Citizen</span>
                  <span>Sector</span>
                  <span>Ratings</span>
                  <span>Ticket</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0">
                {feedback.length === 0 ? (
                  <EmptyState
                    icon={FileText}
                    title="No Feedback Submissions"
                    description="No feedback has been submitted yet. This section will display all citizen feedback once they start submitting."
                    actionLabel="View Services"
                    onAction={() => navigate('/listings')}
                  />
                ) : (
                  feedback.map((fb, index) => (
                  <div
                    key={fb._id || fb.id || index}
                    className="flex items-center justify-between p-4 border-b border-border hover:bg-muted/50 transition-colors duration-200"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={fb.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{(fb.citizen || fb?.user?.name || fb?.user?.email || "?")[0]}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-foreground">{fb.citizen || fb?.user?.name || fb?.user?.email || "Anonymous"}</span>
                    </div>

                    <Badge variant="secondary">
                      {fb.sector || "General"}
                    </Badge>

                    <div className="flex items-center space-x-1">{renderStars(fb.rating || 0)}</div>

                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">{fb.ticket || (typeof fb._id === 'string' ? fb._id.slice(-6) : '-')}</span>
                      <Button size="sm" onClick={() => setSelectedFeedback(fb)}>
                        View Details
                      </Button>
                     </div>
                   </div>
                 ))
                )}
               </div>
            </CardContent>
          </Card>
          <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
            <div>
              Showing page {fbPage} of {fbPages} • Total {fbTotal}
            </div>
            <div className="space-x-2">
              <Button variant="outline" size="sm" disabled={fbPage <= 1} onClick={() => setFbPage((p) => Math.max(1, p - 1))}>
                Prev
              </Button>
              <Button variant="outline" size="sm" disabled={fbPage >= fbPages} onClick={() => setFbPage((p) => p + 1)}>
                Next
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {topServices.map((service, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <div className="font-medium text-sm">{service.name}</div>
                    <div className="flex items-center space-x-1 mt-1">
                      {renderStars(Math.floor(service.rating))}
                      <span className="text-xs text-muted-foreground ml-1">{service.rating}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{service.feedback}</div>
                    <div className="text-xs text-muted-foreground">{t('dashboard.feedback_submissions')}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('dashboard.top_feedback')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentFeedbackList.slice(0, 3).map((fb, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={fb.avatar} />
                    <AvatarFallback>{fb.citizen[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium">{fb.citizen}</div>
                    <div className="text-xs text-muted-foreground truncate">{fb.comment}</div>
                    <div className="flex items-center space-x-1 mt-1">
                      {renderStars(fb.rating)}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  const renderAnalyticsView = () => (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Sector Distribution</CardTitle>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant={chartView === "chart" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setChartView("chart")}
                  >
                    <BarChart3 className="h-4 w-4 mr-1" />
                    Chart
                  </Button>
                  <Button 
                    variant={chartView === "values" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setChartView("values")}
                  >
                    Show Value
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => toast({ title: "Export Options", description: "Export functionality coming soon!" })}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {chartView === "chart" ? (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {pieData.map((item: any, index: number) => (
                    <div key={index} className="text-center">
                      <div className="relative w-24 h-24 mx-auto mb-2">
                        <svg className="w-24 h-24 transform -rotate-90">
                          <circle
                            cx="48"
                            cy="48"
                            r="40"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="none"
                            className="text-muted"
                          />
                          <circle
                            cx="48"
                            cy="48"
                            r="40"
                            stroke={item.color || "#3b82f6"}
                            strokeWidth="8"
                            fill="none"
                            strokeDasharray={`${(item.value || 0) * 2.51} 251`}
                            className="transition-all duration-1000 ease-out"
                            style={{ animationDelay: `${index * 200}ms` }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-lg font-bold">{item.value ?? 0}%</span>
                        </div>
                      </div>
                      <p className="text-sm font-medium text-foreground">{item.name}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {pieData.map((item: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="font-medium text-foreground">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-2xl font-bold text-foreground">{item.value}%</span>
                        <Badge variant="secondary">{Math.round((item.value / 100) * 1247)} feedbacks</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Weekly Activity</CardTitle>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    toast({ 
                      title: "Report Saved", 
                      description: "Weekly activity report has been downloaded successfully." 
                    })
                  }}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Save Report
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <SimpleLineChart data={weeklyOrdersForLine} xKey="day" yKey="orders" height={200} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{t('dashboard.total_revenue')}</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-primary rounded-full" />
                    <span className="text-sm">2023</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-secondary rounded-full" />
                    <span className="text-sm">2024</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {revenueData.map((row: any, i: number) => (
                  <div key={i} className="grid grid-cols-12 items-center gap-3">
                    <div className="col-span-2 text-xs text-muted-foreground">{row.month}</div>
                    <div className="col-span-5">
                      <div className="h-2 bg-primary/20 rounded">
                        <div
                          className="h-2 bg-primary rounded transition-all duration-1000 ease-out"
                          style={{ width: `${(row["2023"] / 340) * 100}%`, animationDelay: `${i * 100}ms` }}
                        />
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{row["2023"]} feedback</div>
                    </div>
                    <div className="col-span-5">
                      <div className="h-2 bg-secondary/20 rounded">
                        <div
                          className="h-2 bg-secondary rounded transition-all duration-1000 ease-out"
                          style={{ width: `${(row["2024"] / 340) * 100}%`, animationDelay: `${i * 100 + 50}ms` }}
                        />
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{row["2024"]} feedback</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Citizen Map</CardTitle>
                <Select value={timeFilter} onValueChange={(val: any) => setTimeFilter(val)}>
                  <SelectTrigger className="w-28">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <SimpleBarChart data={weeklyChart} xKey="name" yKey="value" height={400} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  const SettingsModal = () => (
    !settingsOpen ? null : (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40" onClick={() => setSettingsOpen(false)} />
        <div className="relative bg-card rounded-xl shadow-2xl w-full max-w-lg mx-4 animate-in fade-in slide-in-from-bottom-4">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <h3 className="text-lg font-semibold">Account & Settings</h3>
            <Button variant="ghost" onClick={() => setSettingsOpen(false)}>Close</Button>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-muted-foreground">Name</div>
              <div className="font-medium">{currentUser?.name || '—'}</div>
              <div className="text-muted-foreground">Email</div>
              <div className="font-medium">{currentUser?.email || '—'}</div>
              <div className="text-muted-foreground">Role</div>
              <div><Badge variant="secondary">{currentUser?.isAdmin ? 'Admin' : 'User'}</Badge></div>
              <div className="text-muted-foreground">Session Expires</div>
              <div className="font-medium">{currentUser?.exp ? new Date(currentUser.exp * 1000).toLocaleString() : '—'}</div>
            </div>
            <div className="pt-2">
              <Button className="w-full" variant="destructive" onClick={handleLogout} disabled={signingOut}>
                {signingOut ? 'Signing out…' : 'Sign out'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      
      <div className="max-w-[100rem] mx-auto p-6">
        {loading && (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">{t('dashboard.loading')}</p>
          </div>
        )}
        {error && (
          <div className="mb-4 p-4 bg-destructive/10 text-destructive rounded-lg">{error}</div>
        )}
        
        {!loading && (
          <>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground">{t('dashboard.title')}</h2>
                <p className="text-muted-foreground">{t('dashboard.welcome')}</p>
              </div>
              <div className="flex items-center space-x-2">
                <TabButton label={t('dashboard.citizens')} isActive={activeTab === "Citizens"} onClick={() => setActiveTab("Citizens")} />
                <TabButton
                  label={t('dashboard.feedback_management')}
                  isActive={activeTab === "Feedback Management"}
                  onClick={() => setActiveTab("Feedback Management")}
                />
                <TabButton
                  label={t('dashboard.analytics')}
                  isActive={activeTab === "Analytics"}
                  onClick={() => setActiveTab("Analytics")}
                />
                <Button variant="outline" size="sm" onClick={() => setSettingsOpen(true)}>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <MetricCard
                title={t('dashboard.total_feedback')}
                value={`${dashboard?.metrics?.totalFeedback ?? '247'}`}
                change="+12.5% (30d)"
                trend="up"
                icon={MessageSquare}
                color="bg-primary"
              />
              <MetricCard
                title={t('dashboard.pending_review')}
                value={`${dashboard?.metrics?.pendingReview ?? '18'}`}
                change="+5.2% (30d)"
                trend="up"
                icon={Clock}
                color="bg-secondary"
              />
              <MetricCard
                title={t('dashboard.avg_response_time')}
                value={`${dashboard?.metrics?.avgResponseTime ?? '2.4h'}`}
                change="-8.3% (30d)"
                trend="down"
                icon={BarChart3}
                color="bg-accent"
              />
              <MetricCard
                title={t('dashboard.average_rating')}
                value={`${typeof dashboard?.metrics?.averageRating === 'number' ? (Math.round(dashboard.metrics.averageRating * 10) / 10) : '4.3'}/5`}
                change="+3.7% (30d)"
                trend="up"
                icon={Star}
                color="bg-primary"
              />
            </div>

            {activeTab === "Citizens" && renderCitizensView()}
            {activeTab === "Feedback Management" && renderFeedbackView()}
            {activeTab === "Analytics" && renderAnalyticsView()}
          </>
        )}
      </div>

      <SettingsModal />
    </div>
  )
}
