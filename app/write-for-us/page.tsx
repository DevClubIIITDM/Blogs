"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, FileText, Users, Award, Send, CheckCircle, Upload, File, X, AlertCircle, Edit } from "lucide-react"
import { BackgroundWrapper } from "@/components/background-wrapper"
import { useUser } from "@clerk/nextjs"
import { useIIITDMValidation } from "@/hooks/use-iiitdm-validation"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { TipTapEditor } from "@/components/tiptap-editor"

const categories = [
  "Frontend Development",
  "Backend Development",
  "Mobile Development",
  "DevOps",
  "Machine Learning",
  "Cybersecurity",
  "Web Design",
  "Database",
  "Cloud Computing",
  "Other"
]

export default function WriteForUsPage() {
  const { isSignedIn, user } = useUser()
  const { isValid, isChecking } = useIIITDMValidation()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState("")
  const [fileContent, setFileContent] = useState("")
  const [fileError, setFileError] = useState("")
  const [useEditor, setUseEditor] = useState(false)
  const [editorContent, setEditorContent] = useState("")
  const [showPreview, setShowPreview] = useState(false)
  const [showFullScreenEditor, setShowFullScreenEditor] = useState(false)
  const [showOnlyEditor, setShowOnlyEditor] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    category: "",
    tags: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate that content is provided (either from file or editor)
    if (!useEditor && (!uploadedFile || !fileContent.trim())) {
      setFileError("Please upload a markdown (.md) file with content")
      return
    }
    
    if (useEditor && !editorContent.trim()) {
      alert("Please write some content in the editor")
      return
    }
    
    const finalContent = useEditor ? editorContent : fileContent
    
    const submissionData = {
      ...formData,
      content: finalContent, // Content from editor or markdown file
      fileUpload: {
        name: useEditor ? `${fileName || 'article'}.md` : fileName,
        content: finalContent,
        size: useEditor ? new Blob([finalContent]).size : (uploadedFile?.size || 0)
      },
      submittedBy: isSignedIn ? user?.emailAddresses?.[0]?.emailAddress : "Anonymous",
      submittedAt: new Date().toISOString()
    }
    
    try {
      const response = await fetch('/api/submit-article/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      })
      
      const result = await response.json()
      
      if (result.success) {
        console.log("Article submitted successfully:", result)
        setIsSubmitted(true)
      } else {
        alert('Failed to submit article. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting article:', error)
      alert('Failed to submit article. Please try again.')
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check if it's a markdown file
    if (!file.name.endsWith('.md')) {
      setFileError('Please upload a .md file')
      return
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setFileError('File size must be less than 5MB')
      return
    }

    setFileError("") // Clear any previous errors
    setUploadedFile(file)
    setFileName(file.name)

    // Read file content
    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      setFileContent(content)
      
      // Auto-fill title from filename if not already set
      if (!formData.title) {
        const titleFromFile = file.name.replace('.md', '').replace(/[-_]/g, ' ')
        setFormData(prev => ({ ...prev, title: titleFromFile }))
      }
      
      // Auto-extract excerpt from first paragraph if not set
      if (!formData.excerpt) {
        const lines = content.split('\n')
        const firstParagraph = lines.find(line => line.trim() && !line.startsWith('#'))
        if (firstParagraph) {
          const excerpt = firstParagraph.trim().substring(0, 150) + (firstParagraph.length > 150 ? '...' : '')
          setFormData(prev => ({ ...prev, excerpt }))
        }
      }

      // Automatically open the full-screen rich editor with the uploaded content
      setUseEditor(true)
      setEditorContent(content)
      setShowFullScreenEditor(true)
      setShowOnlyEditor(true)
    }
    reader.readAsText(file)
  }

  const removeFile = () => {
    setUploadedFile(null)
    setFileName("")
    setFileContent("")
    setFileError("")
    setShowPreview(false)
  }

  const handleEditFile = () => {
    setShowPreview(true)
  }

  const handleFileContentChange = (newContent: string) => {
    setFileContent(newContent)
  }

  const handleEditorContentChange = (newContent: string) => {
    setEditorContent(newContent)
    
    // Auto-fill title and excerpt from editor content
    if (!formData.title) {
      const lines = newContent.split('\n')
      const firstHeading = lines.find(line => line.startsWith('# '))
      if (firstHeading) {
        const title = firstHeading.replace('# ', '').trim()
        setFormData(prev => ({ ...prev, title }))
      }
    }
    
    if (!formData.excerpt) {
      const lines = newContent.split('\n')
      const firstParagraph = lines.find(line => line.trim() && !line.startsWith('#'))
      if (firstParagraph) {
        const excerpt = firstParagraph.trim().substring(0, 150) + (firstParagraph.length > 150 ? '...' : '')
        setFormData(prev => ({ ...prev, excerpt }))
      }
    }
  }

  const handleSubmitFromEditor = async (content: string) => {
    setIsSubmitting(true)
    
    try {
      // Validate required fields
      if (!formData.title.trim()) {
        alert('Please provide an article title')
        return
      }
      
      if (!formData.excerpt.trim()) {
        alert('Please provide an article excerpt')
        return
      }
      
      if (!formData.category.trim()) {
        alert('Please select a category')
        return
      }
      
      if (!content.trim()) {
        alert('Please write some content')
        return
      }
      
      const submissionData = {
        ...formData,
        content: content,
        fileUpload: {
          name: `${fileName || 'article'}.md`,
          content: content,
          size: new Blob([content]).size
        },
        submittedBy: isSignedIn ? user?.emailAddresses?.[0]?.emailAddress : "Anonymous",
        submittedAt: new Date().toISOString()
      }
      
      const response = await fetch('/api/submit-article/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      })
      
      const result = await response.json()
      
      if (result.success) {
        console.log("Article submitted successfully:", result)
        // Redirect to home page
        window.location.href = '/'
      } else {
        alert('Failed to submit article. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting article:', error)
      alert('Failed to submit article. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Show loading while checking validation
  if (isChecking) {
    return (
      <BackgroundWrapper>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="glass-morphism">
              <CardContent className="pt-6">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                <p className="text-white/80">Verifying your access...</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </BackgroundWrapper>
    )
  }

  // Show unauthorized if not IIITDM email
  if (!isValid) {
    return (
      <BackgroundWrapper>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="glass-morphism">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white mb-4">
                  Access Restricted
                </CardTitle>
                <CardDescription className="text-white/80">
                  This feature is only available to IIITDM students and staff with @iiitdm.ac.in email addresses.
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

  if (!isSignedIn) {
    return (
      <BackgroundWrapper>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="glass-morphism">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white mb-4">
                  Sign In to Contribute
                </CardTitle>
                <CardDescription className="text-white/80">
                  You need to be signed in to submit articles to our blog.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button asChild className="w-full button-epic">
                  <Link href="/api/auth/signin">
                    Sign In to Continue
                  </Link>
                </Button>
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

  // Show only the editor if a file has been uploaded
  if (showOnlyEditor && showFullScreenEditor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <TipTapEditor
          content={editorContent}
          onContentChange={handleEditorContentChange}
          placeholder="Write your article content here..."
          fullScreen={true}
          formData={formData}
          onSubmitArticle={handleSubmitFromEditor}
          isSubmitting={isSubmitting}
          onClose={() => {
            setShowOnlyEditor(false)
            setShowFullScreenEditor(false)
            setUseEditor(false)
            setEditorContent("")
            setFileContent("")
            setUploadedFile(null)
            setFileName("")
          }}
        />
      </div>
    )
  }

  if (isSubmitted) {
    return (
      <BackgroundWrapper>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="glass-morphism">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center mb-4">
                  <CheckCircle className="h-12 w-12 text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">Article Submitted Successfully!</h2>
                <p className="text-white/80 mb-6">
                  Thank you for your contribution! Your article has been submitted for review. 
                  Our admin team will review it and publish it if approved.
                </p>
                <div className="space-y-3">
                  <Button asChild className="w-full button-epic">
                    <Link href="/write-for-us" onClick={() => setIsSubmitted(false)}>
                      Submit Another Article
                    </Link>
                  </Button>
                  <Button asChild className="w-full button-epic">
                    <Link href="/">
                      Return to Home
                    </Link>
                  </Button>
                </div>
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
              <FileText className="h-8 w-8 text-blue-400" />
              <h1 className="text-4xl lg:text-5xl font-bold text-white">Write for Developers Blog</h1>
            </div>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Share your knowledge and contribute to our community blog. Upload your markdown file and let's publish your insights!
            </p>
            <div className="flex items-center justify-center gap-2">
              <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-400/30">
                <Users className="h-3 w-3 mr-1" />
                Community Writers
              </Badge>
              <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-400/30">
                <Award className="h-3 w-3 mr-1" />
                Quality Content
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Submission Form */}
      <section className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Card className="glass-morphism">
              <CardHeader>
                <CardTitle className="text-white">Submit Your Article</CardTitle>
                <CardDescription className="text-white/80">
                  Fill in article details first, then upload your markdown file or use the rich editor. The content will be automatically extracted and you can submit directly from the editor.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Article Title */}
                  <div className="space-y-2">
                    <label className="text-white font-medium">Article Title *</label>
                    <Input
                      type="text"
                      placeholder="Enter your article title"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="bg-[#191d2e] border-white/20 text-white placeholder:text-white/60 focus:border-white/40"
                      required
                    />
                  </div>

                  {/* Article Excerpt */}
                  <div className="space-y-2">
                    <label className="text-white font-medium">Article Excerpt *</label>
                    <Textarea
                      placeholder="Brief description of your article (will be auto-filled from markdown content)"
                      value={formData.excerpt}
                      onChange={(e) => handleInputChange('excerpt', e.target.value)}
                      className="bg-[#191d2e] border-white/20 text-white placeholder:text-white/60 focus:border-white/40 min-h-[80px]"
                      required
                    />
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <label className="text-white font-medium">Category *</label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger className="bg-[#191d2e] border-white/20 text-white placeholder:text-white/60 focus:border-white/40">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Tags */}
                  <div className="space-y-2">
                    <label className="text-white font-medium">Tags</label>
                    <Input
                      type="text"
                      placeholder="Enter tags separated by commas (e.g., React, JavaScript, Web Development)"
                      value={formData.tags}
                      onChange={(e) => handleInputChange('tags', e.target.value)}
                      className="bg-[#191d2e] border-white/20 text-white placeholder:text-white/60 focus:border-white/40"
                    />
                  </div>

                  {/* Editor Option */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-white font-medium">Content Creation</label>
                      <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 text-xs">
                        Optional
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <Button
                        type="button"
                        variant={!useEditor ? "default" : "outline"}
                        size="sm"
                        onClick={() => setUseEditor(false)}
                        className={!useEditor ? "bg-green-600 hover:bg-green-700" : "border-white/20 text-white hover:bg-white/10"}
                      >
                        <File className="h-4 w-4 mr-1" />
                        Upload .md File
                      </Button>
                      <Button
                        type="button"
                        variant={useEditor ? "default" : "outline"}
                        size="sm"
                        onClick={() => setUseEditor(true)}
                        className={useEditor ? "bg-blue-600 hover:bg-blue-700" : "border-white/20 text-white hover:bg-white/10"}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Use Rich Editor
                      </Button>
                    </div>
                  </div>

                  {/* Markdown File Upload - Required when not using editor */}
                  {!useEditor && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <label className="text-white font-medium">Markdown File *</label>
                      <Badge variant="secondary" className="bg-red-500/20 text-red-300 text-xs">
                        Required
                      </Badge>
                    </div>
                    <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-white/40 transition-colors">
                      {!uploadedFile ? (
                        <div>
                          <Upload className="h-12 w-12 text-white/40 mx-auto mb-4" />
                          <p className="text-white/80 mb-2">Upload your markdown (.md) file</p>
                          <p className="text-white/60 text-sm mb-4">Maximum file size: 5MB</p>
                          <Button
                            type="button"
                            className="button-epic"
                            onClick={() => document.getElementById('file-upload')?.click()}
                          >
                            <File className="h-4 w-4 mr-2" />
                            Choose File
                          </Button>
                          <input
                            id="file-upload"
                            type="file"
                            accept=".md"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                        </div>
                      ) : (
                        <div>
                          <div className="flex items-center justify-center gap-3 mb-4">
                            <File className="h-8 w-8 text-green-400" />
                            <div className="text-left">
                              <p className="text-white font-medium">{fileName}</p>
                              <p className="text-white/60 text-sm">{(uploadedFile.size / 1024).toFixed(1)} KB</p>
                              <p className="text-blue-300 text-xs">
                                File ID: {fileName.replace('.md', '')}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center justify-center gap-2 mb-4">
                            <Button
                              type="button"
                              size="sm"
                              className="button-epic"
                              onClick={() => document.getElementById('file-upload')?.click()}
                            >
                              <File className="h-4 w-4 mr-1" />
                              Change File
                            </Button>
                            <Button
                              type="button"
                              size="sm"
                              className="button-epic"
                              onClick={handleEditFile}
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Edit Content
                            </Button>
                            <Button
                              type="button"
                              size="sm"
                              className="button-epic"
                              onClick={removeFile}
                            >
                              <X className="h-4 w-4 mr-1" />
                              Remove
                            </Button>
                          </div>
                          
                          {/* File Content Preview */}
                          {!showPreview && fileContent && (
                            <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10">
                              <h5 className="text-white font-medium mb-2">File Content Preview:</h5>
                              <div className="max-h-32 overflow-y-auto">
                                <pre className="text-white/70 text-xs whitespace-pre-wrap">
                                  {fileContent.length > 500 
                                    ? fileContent.substring(0, 500) + '...' 
                                    : fileContent
                                  }
                                </pre>
                              </div>
                            </div>
                          )}
                          
                          <input
                            id="file-upload"
                            type="file"
                            accept=".md"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                        </div>
                      )}
                    </div>
                    {fileError && (
                      <div className="flex items-center gap-2 text-red-400 text-sm">
                        <AlertCircle className="h-4 w-4" />
                        {fileError}
                      </div>
                    )}
                  </div>

                  )}

                  {/* Content Preview */}
                  {(fileContent || editorContent) && (
                    <div className="space-y-2">
                      <label className="text-white font-medium">Final Content Preview</label>
                      <div className="bg-white/5 border border-white/10 rounded-lg p-4 max-h-48 overflow-y-auto">
                        <MarkdownRenderer 
                          content={(useEditor ? editorContent : fileContent).substring(0, 1000) + 
                            ((useEditor ? editorContent : fileContent).length > 1000 ? '...' : '')}
                          className="text-white/80 text-sm"
                        />
                      </div>
                      <p className="text-white/60 text-xs">
                        Preview of your article content. Full content will be available after approval.
                      </p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="flex items-center justify-end gap-4 pt-6 border-t border-white/10">
                    <Button
                      type="button"
                      className="button-epic"
                      onClick={() => {
                        setFormData({ title: "", excerpt: "", category: "", tags: "" })
                        removeFile()
                        setUseEditor(false)
                        setEditorContent("")
                        setShowPreview(false)
                      }}
                    >
                      Clear Form
                    </Button>
                    <Button
                      type="submit"
                      className="button-epic"
                      disabled={(!useEditor && (!uploadedFile || !fileContent.trim())) || (useEditor && !editorContent.trim())}
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Submit Article
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Guidelines */}
      <section className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Card className="glass-morphism">
              <CardHeader>
                <CardTitle className="text-white">Submission Guidelines</CardTitle>
                <CardDescription className="text-white/80">
                  Follow these guidelines to ensure your article gets approved quickly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-white font-semibold">Content Requirements</h3>
                    <ul className="space-y-2 text-white/80 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span>
                        Upload only .md (markdown) files
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span>
                        Minimum 500 words of content
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span>
                        Include proper markdown formatting
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span>
                        Provide clear, actionable insights
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-white font-semibold">Technical Guidelines</h3>
                    <ul className="space-y-2 text-white/80 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-1">•</span>
                        Maximum file size: 5MB
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-1">•</span>
                        Use descriptive file names
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-1">•</span>
                        Include code examples when relevant
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-1">•</span>
                        Add proper tags for discoverability
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </BackgroundWrapper>
  )
} 