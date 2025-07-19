import { notFound } from 'next/navigation'
import { getPostData, getAllPostIds } from '@/lib/markdown'
import { BackgroundWrapper } from '@/components/background-wrapper'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react'
import Link from 'next/link'
import { EnhancedMarkdownRenderer } from '@/components/markdown-renderer'
import fs from 'fs'
import path from 'path'

// File paths for persistent storage
const dataDir = path.join(process.cwd(), 'data')
const approvedArticlesFile = path.join(dataDir, 'approved-articles.json')

// Helper function to read data
const readData = (filePath: string, defaultValue: any[] = []) => {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8')
      return JSON.parse(data)
    }
  } catch (error) {
    console.error('Error reading data:', error)
  }
  return defaultValue
}

// Fetch approved articles directly from file
async function getApprovedArticles() {
  try {
    const approvedArticles = readData(approvedArticlesFile)
    
    // Transform to match expected format
    return approvedArticles.map((article: any) => ({
      fileIdentifier: article.fileIdentifier || article.fileUpload?.name?.replace('.md', ''),
      title: article.title,
      excerpt: article.excerpt,
      category: article.category,
      tags: article.tags,
      author: article.submittedBy,
      date: article.approvedAt,
      content: article.content,
      fileUpload: article.fileUpload
    }))
  } catch (error) {
    console.error('Error reading approved articles:', error)
    return []
  }
}

// Generate static params for both markdown posts and approved articles
export async function generateStaticParams() {
  const markdownPosts = getAllPostIds()
  const approvedArticles = await getApprovedArticles()
  
  const markdownParams = markdownPosts.map((post) => ({
    fileIdentifier: post.params.slug,
  }))
  
  const approvedParams = approvedArticles.map((article: any) => ({
    fileIdentifier: article.fileIdentifier,
  }))
  
  return [...markdownParams, ...approvedParams]
}

export default async function BlogPost({ params }: { params: Promise<{ fileIdentifier: string }> }) {
  const { fileIdentifier } = await params
  
  // First check if this is an approved article
  const approvedArticles = await getApprovedArticles()
  const approvedArticle = approvedArticles.find((article: any) => article.fileIdentifier === fileIdentifier)
  
  let post
  let isApprovedArticle = false
  
  if (approvedArticle) {
    // This is an approved article
    post = {
      id: approvedArticle.fileIdentifier,
      title: approvedArticle.title,
      excerpt: approvedArticle.excerpt,
      content: approvedArticle.content,
      date: approvedArticle.date,
      author: {
        name: approvedArticle.author,
        avatar: '/placeholder-user.jpg',
        role: 'Community Contributor'
      },
      category: approvedArticle.category,
      readTime: '5 min read',
      image: '/placeholder.jpg',
      tags: approvedArticle.tags ? approvedArticle.tags.split(',').map((tag: string) => tag.trim()) : []
    }
    isApprovedArticle = true
  } else {
    // Try to get markdown post
    try {
      post = await getPostData(fileIdentifier)
    } catch (error) {
      // If markdown post not found, return 404
      notFound()
    }
  }

  return (
    <BackgroundWrapper>
      {/* Back Button */}
      <section className="relative z-10">
        <div className="container mx-auto px-4 py-6">
          <Button asChild variant="ghost" className="text-white hover:text-blue-300">
            <Link href="/blog" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </section>

      {/* Article Content */}
      <section className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          <article className="max-w-4xl mx-auto">
            {/* Article Header */}
            <header className="mb-8">
              <div className="flex items-center gap-4 text-sm text-white/60 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{post.author.name}</span>
                </div>
              </div>

              {/* Category Badge */}
              <div className="mb-4">
                <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-500/20 text-blue-300 rounded-full">
                  {post.category}
                </span>
                {isApprovedArticle && (
                  <span className="inline-block px-3 py-1 text-sm font-medium bg-green-500/20 text-green-300 rounded-full ml-2">
                    Community Article
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                {post.title}
              </h1>

              {/* Excerpt */}
              <p className="text-xl text-white/80 mb-6">
                {post.excerpt}
              </p>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm bg-white/10 text-white/70 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </header>
      
            {/* Article Content - Now using enhanced markdown renderer */}
            <div className="prose prose-invert prose-lg max-w-none">
              {isApprovedArticle ? (
                // For approved articles, render the markdown content directly
                <EnhancedMarkdownRenderer 
                  content={post.content} 
                  className="text-white/90 leading-relaxed"
                />
              ) : (
                // For static markdown posts, use the existing HTML content
                <div 
                  className="text-white/90 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              )}
            </div>
      
            {/* Article Footer */}
            <footer className="mt-12 pt-8 border-t border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-medium">{post.author.name}</div>
                    <div className="text-white/60 text-sm">{post.author.role}</div>
                  </div>
                </div>
                
                <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <Link href="/blog">
                    Back to Blog
                  </Link>
                </Button>
              </div>
            </footer>
          </article>
        </div>
      </section>
    </BackgroundWrapper>
  )
} 