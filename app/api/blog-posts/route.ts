import { NextRequest, NextResponse } from 'next/server'
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

export async function GET() {
  try {
    // Read approved articles directly from file
    const approvedArticles = readData(approvedArticlesFile)
    
    // Transform approved articles to match blog post format
    const blogPosts = approvedArticles.map((article: any) => ({
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
    
    return NextResponse.json({ 
      success: true, 
      posts: blogPosts 
    })
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
} 