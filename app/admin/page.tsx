"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  ArrowLeft, 
  Users, 
  FileText, 
  Settings, 
  BarChart3, 
  Shield, 
  CheckCircle, 
  XCircle,
  Edit,
  Trash2,
  Eye,
  Plus,
  Download,
  X,
  File,
  RefreshCw,
  AlertTriangle
} from "lucide-react"
import { BackgroundWrapper } from "@/components/background-wrapper"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { EnhancedMarkdownRenderer } from "@/components/markdown-renderer"
import { TipTapEditor } from "@/components/tiptap-editor"

// Mock data for admin dashboard
const mockStats = [
  { title: "Total Users", value: "1,247", icon: Users, color: "text-blue-400" },
  { title: "Published Articles", value: "89", icon: FileText, color: "text-green-400" },
  { title: "Pending Reviews", value: "12", icon: Eye, color: "text-yellow-400" },
  { title: "Active Sessions", value: "45", icon: BarChart3, color: "text-purple-400" },
]

const mockPendingArticles = [
  {
    id: 1,
    title: "Getting Started with React Hooks",
    author: "student1@iiitdm.ac.in",
    category: "Frontend Development",
    submittedAt: "2024-01-15",
    status: "pending",
    excerpt: "A comprehensive guide to React Hooks for beginners",
    tags: "React, JavaScript, Hooks",
    content: "# Getting Started with React Hooks\n\nReact Hooks are a powerful feature introduced in React 16.8...",
    fileUpload: {
      name: "react-hooks-guide.md",
      content: "# Getting Started with React Hooks\n\nReact Hooks are a powerful feature introduced in React 16.8...",
      size: 2048
    }
  },
  {
    id: 2,
    title: "Introduction to Docker Containers",
    author: "student2@iiitdm.ac.in",
    category: "DevOps",
    submittedAt: "2024-01-14",
    status: "pending",
    excerpt: "Learn the basics of Docker containerization",
    tags: "Docker, DevOps, Containers",
    content: "# Introduction to Docker Containers\n\nDocker has revolutionized the way we deploy applications...",
    fileUpload: {
      name: "docker-introduction.md",
      content: "# Introduction to Docker Containers\n\nDocker has revolutionized the way we deploy applications...",
      size: 3072
    }
  },
  {
    id: 3,
    title: "Machine Learning Basics",
    author: "faculty1@iiitdm.ac.in",
    category: "Machine Learning",
    submittedAt: "2024-01-13",
    status: "pending",
    excerpt: "Fundamental concepts of machine learning",
    tags: "Machine Learning, AI, Python",
    content: "# Machine Learning Basics\n\nMachine learning is a subset of artificial intelligence...",
    fileUpload: null
  }
]

export default function AdminPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const [isChecking, setIsChecking] = useState(true)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [pendingArticles, setPendingArticles] = useState<any[]>(mockPendingArticles)
  const [approvedArticles, setApprovedArticles] = useState<any[]>([])
  const [selectedArticle, setSelectedArticle] = useState<any>(null)
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [articleToDelete, setArticleToDelete] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState("")

  useEffect(() => {
    if (!isLoaded) return

    if (!user) {
      router.push('/login')
      return
    }

    const email = user.emailAddresses?.[0]?.emailAddress
    if (email !== 'devclub@iiitdm.ac.in') {
      router.push('/unauthorized')
      return
    }

    setIsAdmin(true)
    setIsChecking(false)
    
    // Fetch real submissions and approved articles
    fetchSubmissions()
    fetchApprovedArticles()
  }, [user, isLoaded, router])

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('/api/submit-article/')
      const data = await response.json()
      
      if (data.submissions && data.submissions.length > 0) {
        setPendingArticles(data.submissions)
      } else {
        setPendingArticles([])
      }
    } catch (error) {
      console.error('Error fetching submissions:', error)
    }
  }

  const fetchApprovedArticles = async () => {
    try {
      const response = await fetch('/api/submit-article/')
      const data = await response.json()
      
      if (data.approvedArticles && data.approvedArticles.length > 0) {
        setApprovedArticles(data.approvedArticles)
      } else {
        setApprovedArticles([])
      }
    } catch (error) {
      console.error('Error fetching approved articles:', error)
    }
  }

  const handleArticleAction = async (articleId: number, action: 'approve' | 'reject') => {
    try {
      const response = await fetch('/api/submit-article/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action, articleId }),
      });

      const result = await response.json();
      
      if (result.success) {
        console.log(`Article ${articleId} ${action}ed successfully`);
        // Refresh the submissions and approved articles lists
        fetchSubmissions();
        fetchApprovedArticles();
      } else {
        console.error(`Failed to ${action} article:`, result.message);
        alert(`Failed to ${action} article. Please try again.`);
      }
    } catch (error) {
      console.error(`Error ${action}ing article:`, error);
      alert(`Error ${action}ing article. Please try again.`);
    }
    
    setShowReviewModal(false);
    setSelectedArticle(null);
  }

  const handleDeleteArticle = async (article: any) => {
    setArticleToDelete(article)
    setShowDeleteModal(true)
  }

  const confirmDeleteArticle = async () => {
    if (!articleToDelete) return

    try {
      const response = await fetch(`/api/submit-article/?id=${articleToDelete.id}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      
      if (result.success) {
        console.log(`Article ${articleToDelete.id} deleted successfully`);
        // Refresh the approved articles list
        fetchApprovedArticles();
        alert('Article deleted successfully');
      } else {
        console.error('Failed to delete article:', result.message);
        alert(`Failed to delete article. Please try again.`);
      }
    } catch (error) {
      console.error('Error deleting article:', error);
      alert(`Error deleting article. Please try again.`);
    }
    
    setShowDeleteModal(false);
    setArticleToDelete(null);
  }

  const openReviewModal = (article: any) => {
    setSelectedArticle(article)
    setEditedContent(article.content || "")
    setIsEditing(false)
    setShowReviewModal(true)
  }

  const handleContentUpdate = (newContent: string) => {
    setEditedContent(newContent)
  }

  const handleSaveChanges = async () => {
    if (!selectedArticle) return

    try {
      // Update the article content
      const updatedArticle = {
        ...selectedArticle,
        content: editedContent
      }

      // Here you would typically save to your API
      // For now, we'll just update the local state
      if (selectedArticle.status === 'approved') {
        const updatedApprovedArticles = approvedArticles.map((article: any) => 
          article.id === selectedArticle.id ? updatedArticle : article
        )
        setApprovedArticles(updatedApprovedArticles)
      } else {
        const updatedPendingArticles = pendingArticles.map((article: any) => 
          article.id === selectedArticle.id ? updatedArticle : article
        )
        setPendingArticles(updatedPendingArticles)
      }

      setSelectedArticle(updatedArticle)
      setIsEditing(false)
      alert('Content updated successfully!')
    } catch (error) {
      console.error('Error updating content:', error)
      alert('Failed to update content. Please try again.')
    }
  }

  const downloadMarkdownFile = (article: any) => {
    if (!article.fileUpload) return
    
    const blob = new Blob([article.fileUpload.content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = article.fileUpload.name
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Show loading while checking admin status
  if (isChecking) {
    return (
      <BackgroundWrapper>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="glass-morphism">
              <CardContent className="pt-6">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                <p className="text-white/80">Verifying admin access...</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </BackgroundWrapper>
    )
  }

  // Show unauthorized if not admin
  if (!isAdmin) {
    return (
      <BackgroundWrapper>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="glass-morphism">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white mb-4">
                  Admin Access Required
                </CardTitle>
                <CardDescription className="text-white/80">
                  This page is only accessible to the Developers Club admin account.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button asChild className="w-full button-epic">
                  <Link href="/">
                    Return to Home
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </BackgroundWrapper>
    )
  }

  return (
    <BackgroundWrapper>
      {/* Back Button */}
      <section className="relative z-10">
        <div className="container mx-auto px-4 py-6">
          <Button asChild variant="ghost" className="text-white hover:text-blue-300">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </section>

      {/* Header */}
      <section className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shield className="h-8 w-8 text-blue-400" />
              <h1 className="text-4xl lg:text-5xl font-bold text-white">Admin Dashboard</h1>
            </div>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Manage the Developers Club platform, review articles, and monitor user activity
            </p>
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-400/30">
              Admin Access: {user?.emailAddresses?.[0]?.emailAddress}
            </Badge>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {[
              { id: "dashboard", label: "Dashboard", icon: BarChart3 },
              { id: "articles", label: "Pending Articles", icon: FileText },
              { id: "approved", label: "Approved Articles", icon: CheckCircle },
              { id: "users", label: "Users", icon: Users },
              { id: "settings", label: "Settings", icon: Settings },
            ].map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "outline"}
                className={`flex items-center gap-2 ${
                  activeTab === tab.id 
                    ? "bg-blue-600 hover:bg-blue-700" 
                    : "border-white/20 text-white hover:bg-white/10"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Tab */}
      {activeTab === "dashboard" && (
        <section className="relative z-10">
          <div className="container mx-auto px-4 py-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {mockStats.map((stat, index) => (
                <Card key={index} className="glass-morphism">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-white/60">{stat.title}</p>
                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                      </div>
                      <stat.icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <Card className="glass-morphism">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
                <CardDescription className="text-white/80">
                  Latest platform activities and updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <div>
                      <p className="text-white font-medium">Article approved: "React Best Practices"</p>
                      <p className="text-white/60 text-sm">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                    <Users className="h-5 w-5 text-blue-400" />
                    <div>
                      <p className="text-white font-medium">New user registered: student5@iiitdm.ac.in</p>
                      <p className="text-white/60 text-sm">4 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                    <FileText className="h-5 w-5 text-purple-400" />
                    <div>
                      <p className="text-white font-medium">Article submitted: "Docker for Beginners"</p>
                      <p className="text-white/60 text-sm">6 hours ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Articles Tab */}
      {activeTab === "articles" && (
        <section className="relative z-10">
          <div className="container mx-auto px-4 py-8">
            <Card className="glass-morphism">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Pending Articles</CardTitle>
                    <CardDescription className="text-white/80">
                      Review and manage submitted articles with markdown file support
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      size="sm"
                      className="button-epic"
                      onClick={fetchSubmissions}
                    >
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Refresh
                    </Button>
                    <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-300 border-yellow-400/30">
                      {pendingArticles.length} Pending
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingArticles.map((article) => (
                    <div key={article.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-white font-semibold mb-1">{article.title}</h3>
                          <p className="text-white/60 text-sm mb-2">By: {(article as any).submittedBy || article.author || 'Unknown'}</p>
                          <p className="text-white/70 text-sm mb-2">{article.excerpt}</p>
                          <div className="flex items-center gap-2 mb-3">
                            <Badge variant="outline" className="text-xs border-white/20 text-white/80">
                              {article.category}
                            </Badge>
                            <span className="text-white/40 text-xs">Submitted: {article.submittedAt}</span>
                            {article.fileUpload && (
                              <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 text-xs">
                                <File className="h-3 w-3 mr-1" />
                                Markdown File
                              </Badge>
                            )}
                            {article.fileUpload?.name && (
                              <Badge variant="outline" className="text-xs border-blue-400/30 text-blue-300">
                                ID: {article.fileUpload.name.replace('.md', '')}
                              </Badge>
                            )}
                          </div>
                          {article.tags && (
                            <div className="flex flex-wrap gap-1 mb-3">
                              {article.tags.split(',').map((tag: string, index: number) => (
                                <Badge key={index} variant="outline" className="text-xs border-white/10 text-white/60">
                                  {tag.trim()}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-blue-400/30 text-blue-300 hover:bg-blue-500/20"
                            onClick={() => openReviewModal(article)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Review
                          </Button>
                          {article.fileUpload && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-green-400/30 text-green-300 hover:bg-green-500/20"
                              onClick={() => downloadMarkdownFile(article)}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleArticleAction(article.id, 'approve')}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-400/30 text-red-300 hover:bg-red-500/20"
                            onClick={() => handleArticleAction(article.id, 'reject')}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {pendingArticles.length === 0 && (
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 text-white/40 mx-auto mb-4" />
                      <p className="text-white/60">No pending articles to review</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Approved Articles Tab */}
      {activeTab === "approved" && (
        <section className="relative z-10">
          <div className="container mx-auto px-4 py-8">
            <Card className="glass-morphism">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Approved Articles</CardTitle>
                    <CardDescription className="text-white/80">
                      Manage published articles. You can delete articles if needed.
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      size="sm"
                      className="button-epic"
                      onClick={fetchApprovedArticles}
                    >
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Refresh
                    </Button>
                    <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-400/30">
                      {approvedArticles.length} Published
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {approvedArticles.map((article: any) => (
                    <div key={article.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-white font-semibold mb-1">{article.title}</h3>
                          <p className="text-white/60 text-sm mb-2">By: {(article as any).submittedBy || article.author || 'Unknown'}</p>
                          <p className="text-white/70 text-sm mb-2">{article.excerpt}</p>
                          <div className="flex items-center gap-2 mb-3">
                            <Badge variant="outline" className="text-xs border-white/20 text-white/80">
                              {article.category}
                            </Badge>
                            <span className="text-white/40 text-xs">Approved: {article.approvedAt}</span>
                            <Badge variant="secondary" className="bg-green-500/20 text-green-300 text-xs">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Published
                            </Badge>
                            {article.fileIdentifier && (
                              <Badge variant="outline" className="text-xs border-blue-400/30 text-blue-300">
                                ID: {article.fileIdentifier}
                              </Badge>
                            )}
                          </div>
                          {article.tags && (
                            <div className="flex flex-wrap gap-1 mb-3">
                              {article.tags.split(',').map((tag: string, index: number) => (
                                <Badge key={index} variant="outline" className="text-xs border-white/10 text-white/60">
                                  {tag.trim()}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-blue-400/30 text-blue-300 hover:bg-blue-500/20"
                            onClick={() => openReviewModal(article)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          {article.fileUpload && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-green-400/30 text-green-300 hover:bg-green-500/20"
                              onClick={() => downloadMarkdownFile(article)}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-400/30 text-red-300 hover:bg-red-500/20"
                            onClick={() => handleDeleteArticle(article)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {approvedArticles.length === 0 && (
                    <div className="text-center py-8">
                      <CheckCircle className="h-12 w-12 text-white/40 mx-auto mb-4" />
                      <p className="text-white/60">No approved articles found</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Article Review Modal */}
      {showReviewModal && selectedArticle && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Review Article</h2>
                <Button
                  variant="ghost"
                  onClick={() => setShowReviewModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="space-y-6">
                {/* Article Header */}
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{selectedArticle.title}</h3>
                  <p className="text-gray-600 mb-2">By: {selectedArticle.submittedBy || selectedArticle.author}</p>
                  <p className="text-gray-700 mb-3">{selectedArticle.excerpt}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{selectedArticle.category}</Badge>
                    <span className="text-gray-500 text-sm">
                      {selectedArticle.status === 'approved' ? `Approved: ${selectedArticle.approvedAt}` : `Submitted: ${selectedArticle.submittedAt}`}
                    </span>
                  </div>
                </div>

                {/* File Information */}
                {selectedArticle.fileUpload && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Markdown File</h4>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-800">File: {selectedArticle.fileUpload.name}</p>
                        <p className="text-blue-600 text-sm">Size: {(selectedArticle.fileUpload.size / 1024).toFixed(1)} KB</p>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => downloadMarkdownFile(selectedArticle)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                )}

                {/* Article Content */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">Article Content</h4>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setIsEditing(!isEditing)}
                        className="border-blue-400 text-blue-600 hover:bg-blue-50"
                      >
                        {isEditing ? 'View' : 'Edit'}
                      </Button>
                      {isEditing && (
                        <Button
                          size="sm"
                          onClick={handleSaveChanges}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Save Changes
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {isEditing ? (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <TipTapEditor
                        content={editedContent}
                        onContentChange={handleContentUpdate}
                        placeholder="Edit article content..."
                        className="bg-white"
                      />
                    </div>
                  ) : (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-96 overflow-y-auto">
                      <EnhancedMarkdownRenderer 
                        content={selectedArticle.content}
                        className="text-gray-800"
                      />
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                  <Button
                    variant="outline"
                    onClick={() => setShowReviewModal(false)}
                  >
                    Close
                  </Button>
                  {selectedArticle.status !== 'approved' && (
                    <>
                      <Button
                        variant="outline"
                        className="border-red-400 text-red-600 hover:bg-red-50"
                        onClick={() => handleArticleAction(selectedArticle.id, 'reject')}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                      <Button
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleArticleAction(selectedArticle.id, 'approve')}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve & Publish
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && articleToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="h-6 w-6 text-red-500" />
                <h2 className="text-xl font-bold text-gray-900">Delete Article</h2>
              </div>
              
              <p className="text-gray-700 mb-6">
                Are you sure you want to delete "<strong>{articleToDelete.title}</strong>"? This action cannot be undone.
              </p>
              
              <div className="flex items-center justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-red-600 hover:bg-red-700"
                  onClick={confirmDeleteArticle}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === "users" && (
        <section className="relative z-10">
          <div className="container mx-auto px-4 py-8">
            <Card className="glass-morphism">
              <CardHeader>
                <CardTitle className="text-white">User Management</CardTitle>
                <CardDescription className="text-white/80">
                  Manage platform users and permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <h3 className="text-white font-semibold mb-2">User Statistics</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-white">1,247</p>
                        <p className="text-white/60 text-sm">Total Users</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-400">89</p>
                        <p className="text-white/60 text-sm">Active Writers</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-400">45</p>
                        <p className="text-white/60 text-sm">Online Now</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-400">12</p>
                        <p className="text-white/60 text-sm">New This Week</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <h3 className="text-white font-semibold mb-4">Recent Users</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div>
                          <p className="text-white font-medium">student1@iiitdm.ac.in</p>
                          <p className="text-white/60 text-sm">Joined 2 days ago</p>
                        </div>
                        <Badge variant="secondary" className="bg-green-500/20 text-green-300">
                          Active
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div>
                          <p className="text-white font-medium">faculty1@iiitdm.ac.in</p>
                          <p className="text-white/60 text-sm">Joined 1 week ago</p>
                        </div>
                        <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
                          Writer
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Settings Tab */}
      {activeTab === "settings" && (
        <section className="relative z-10">
          <div className="container mx-auto px-4 py-8">
            <Card className="glass-morphism">
              <CardHeader>
                <CardTitle className="text-white">Platform Settings</CardTitle>
                <CardDescription className="text-white/80">
                  Configure platform settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <h3 className="text-white font-semibold mb-4">General Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-white/80 text-sm mb-2 block">Platform Name</label>
                        <Input 
                          defaultValue="Developers Club" 
                          className="bg-[#191d2e] border-white/20 text-white placeholder:text-white/60 focus:border-white/40"
                        />
                      </div>
                      <div>
                        <label className="text-white/80 text-sm mb-2 block">Contact Email</label>
                        <Input 
                          defaultValue="devclub@iiitdm.ac.in" 
                          className="bg-[#191d2e] border-white/20 text-white placeholder:text-white/60 focus:border-white/40"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <h3 className="text-white font-semibold mb-4">Content Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-white/80 text-sm mb-2 block">Max File Size (MB)</label>
                        <Input 
                          type="number" 
                          defaultValue="5" 
                          className="bg-[#191d2e] border-white/20 text-white placeholder:text-white/60 focus:border-white/40"
                        />
                      </div>
                      <div>
                        <label className="text-white/80 text-sm mb-2 block">Auto-approve Articles</label>
                        <Select defaultValue="false">
                          <SelectTrigger className="bg-[#191d2e] border-white/20 text-white placeholder:text-white/60 focus:border-white/40">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="true">Yes</SelectItem>
                            <SelectItem value="false">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Save Settings
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}
    </BackgroundWrapper>
  )
} 