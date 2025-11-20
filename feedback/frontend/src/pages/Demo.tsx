import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Upload, Video, CheckCircle, Clock, BookOpen } from "lucide-react"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import SEOHead from "@/components/SEOHead"

export default function Demo() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const { toast } = useToast()

  const tutorialVideos = [
    {
      id: 1,
      title: "Getting Started with CivicVoice Et",
      description: "Learn how to create your account and submit your first feedback",
      duration: "5:30",
      thumbnail: "/placeholder.svg",
      category: "basics",
      completed: true
    },
    {
      id: 2,
      title: "Submit Anonymous Feedback",
      description: "Step-by-step guide to submitting anonymous government feedback",
      duration: "4:15",
      thumbnail: "/placeholder.svg",
      category: "basics",
      completed: false
    },
    {
      id: 3,
      title: "Track Your Issues",
      description: "Monitor the status and progress of your submitted feedback",
      duration: "6:45",
      thumbnail: "/placeholder.svg",
      category: "features",
      completed: false
    },
    {
      id: 4,
      title: "Understanding Analytics Dashboard",
      description: "Navigate through civic engagement data and insights",
      duration: "8:20",
      thumbnail: "/placeholder.svg",
      category: "features",
      completed: false
    },
    {
      id: 5,
      title: "Government Portal Overview",
      description: "For government officials: How to manage citizen feedback",
      duration: "10:15",
      thumbnail: "/placeholder.svg",
      category: "government",
      completed: false
    },
    {
      id: 6,
      title: "Best Practices for Civic Engagement",
      description: "Tips and strategies for effective communication with government",
      duration: "7:50",
      thumbnail: "/placeholder.svg",
      category: "advanced",
      completed: false
    }
  ]

  const handleVideoUpload = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate upload progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setUploadProgress(progress)
      if (progress >= 100) {
        clearInterval(interval)
        toast({
          title: "Video uploaded successfully!",
          description: "Your tutorial video will be reviewed and published soon.",
        })
        setUploadProgress(0)
      }
    }, 300)
  }

  return (
    <>
      <SEOHead 
        title="Video Demos & Tutorials - CivicVoice Et"
        description="Watch comprehensive video tutorials to learn how to use CivicVoice Et platform for civic engagement and government feedback."
        keywords={["civic engagement tutorials", "government feedback demo", "CivicVoice videos", "platform guide"]}
      />
      
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary via-accent to-secondary py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Video className="w-5 h-5 text-primary-foreground" />
              <span className="text-primary-foreground font-medium">Interactive Tutorials</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Learn CivicVoice Et
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              Watch step-by-step video tutorials to master civic engagement and make your voice heard
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          <Tabs defaultValue="tutorials" className="space-y-8">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="tutorials">
                <Play className="w-4 h-4 mr-2" />
                Watch Tutorials
              </TabsTrigger>
              <TabsTrigger value="upload">
                <Upload className="w-4 h-4 mr-2" />
                Upload Video
              </TabsTrigger>
            </TabsList>

            {/* Tutorials Tab */}
            <TabsContent value="tutorials" className="space-y-8">
              {/* Featured Video */}
              {selectedVideo && (
                <Card className="overflow-hidden border-2 border-primary/20">
                  <div className="aspect-video bg-muted relative group">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button size="lg" className="rounded-full w-20 h-20 group-hover:scale-110 transition-transform">
                        <Play className="w-8 h-8" />
                      </Button>
                    </div>
                    <img 
                      src={tutorialVideos.find(v => v.id.toString() === selectedVideo)?.thumbnail} 
                      alt="Video thumbnail"
                      className="w-full h-full object-cover opacity-80"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{tutorialVideos.find(v => v.id.toString() === selectedVideo)?.title}</CardTitle>
                    <CardDescription>
                      {tutorialVideos.find(v => v.id.toString() === selectedVideo)?.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              )}

              {/* Video Categories */}
              <div className="space-y-6">
                {/* Basics */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <h2 className="text-2xl font-bold text-foreground">Getting Started</h2>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tutorialVideos.filter(v => v.category === 'basics').map(video => (
                      <Card 
                        key={video.id}
                        className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/30"
                        onClick={() => setSelectedVideo(video.id.toString())}
                      >
                        <div className="aspect-video bg-muted relative overflow-hidden">
                          <img 
                            src={video.thumbnail} 
                            alt={video.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                            {video.duration}
                          </div>
                          <Button 
                            size="sm" 
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Play className="w-4 h-4" />
                          </Button>
                          {video.completed && (
                            <div className="absolute top-2 left-2">
                              <CheckCircle className="w-6 h-6 text-green-500 fill-green-500" />
                            </div>
                          )}
                        </div>
                        <CardHeader>
                          <CardTitle className="text-lg group-hover:text-primary transition-colors">
                            {video.title}
                          </CardTitle>
                          <CardDescription className="line-clamp-2">
                            {video.description}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Video className="w-5 h-5 text-accent" />
                    <h2 className="text-2xl font-bold text-foreground">Platform Features</h2>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tutorialVideos.filter(v => v.category === 'features').map(video => (
                      <Card 
                        key={video.id}
                        className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-accent/30"
                        onClick={() => setSelectedVideo(video.id.toString())}
                      >
                        <div className="aspect-video bg-muted relative overflow-hidden">
                          <img 
                            src={video.thumbnail} 
                            alt={video.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                            {video.duration}
                          </div>
                          <Button 
                            size="sm" 
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Play className="w-4 h-4" />
                          </Button>
                        </div>
                        <CardHeader>
                          <CardTitle className="text-lg group-hover:text-accent transition-colors">
                            {video.title}
                          </CardTitle>
                          <CardDescription className="line-clamp-2">
                            {video.description}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Government & Advanced */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-5 h-5 text-secondary" />
                    <h2 className="text-2xl font-bold text-foreground">Advanced Topics</h2>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tutorialVideos.filter(v => ['government', 'advanced'].includes(v.category)).map(video => (
                      <Card 
                        key={video.id}
                        className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-secondary/30"
                        onClick={() => setSelectedVideo(video.id.toString())}
                      >
                        <div className="aspect-video bg-muted relative overflow-hidden">
                          <img 
                            src={video.thumbnail} 
                            alt={video.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                            {video.duration}
                          </div>
                          <Button 
                            size="sm" 
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Play className="w-4 h-4" />
                          </Button>
                        </div>
                        <CardHeader>
                          <CardTitle className="text-lg group-hover:text-secondary transition-colors">
                            {video.title}
                          </CardTitle>
                          <CardDescription className="line-clamp-2">
                            {video.description}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Upload Tab */}
            <TabsContent value="upload">
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle>Upload Tutorial Video</CardTitle>
                  <CardDescription>
                    Share your knowledge by creating tutorial videos for the community
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleVideoUpload} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="video-title">Video Title</Label>
                      <Input 
                        id="video-title" 
                        placeholder="e.g., How to Submit Feedback Effectively"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="video-description">Description</Label>
                      <textarea 
                        id="video-description"
                        className="w-full min-h-[100px] px-3 py-2 border border-input rounded-md bg-background"
                        placeholder="Describe what viewers will learn from this tutorial..."
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="video-category">Category</Label>
                      <select 
                        id="video-category"
                        className="w-full px-3 py-2 border border-input rounded-md bg-background"
                        required
                      >
                        <option value="">Select a category</option>
                        <option value="basics">Getting Started</option>
                        <option value="features">Platform Features</option>
                        <option value="government">Government Portal</option>
                        <option value="advanced">Advanced Topics</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="video-file">Video File</Label>
                      <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                        <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">
                          MP4, WebM or OGG (max. 500MB)
                        </p>
                        <Input 
                          id="video-file" 
                          type="file" 
                          accept="video/*"
                          className="hidden"
                          required
                        />
                      </div>
                    </div>

                    {uploadProgress > 0 && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Uploading...</span>
                          <span className="font-medium">{uploadProgress}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <Button type="submit" className="w-full" size="lg">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Tutorial Video
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Quick Links */}
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Documentation
                </CardTitle>
                <CardDescription>
                  Detailed guides and API references
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/documentation">
                  <Button variant="outline" className="w-full">
                    View Docs
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="w-5 h-5 text-accent" />
                  Live Demo
                </CardTitle>
                <CardDescription>
                  Try the platform with sample data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/listings">
                  <Button variant="outline" className="w-full">
                    Try Live Demo
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-secondary" />
                  Help Center
                </CardTitle>
                <CardDescription>
                  Get support and find answers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/help-center">
                  <Button variant="outline" className="w-full">
                    Get Help
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
