import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// Force dynamic responses
export const dynamic = 'force-dynamic'
export const revalidate = 0

// File paths for persistent storage
const dataDir = path.join(process.cwd(), 'data')
const approvedArticlesFile = path.join(dataDir, 'approved-articles.json')

// Ensure data directory exists
const ensureDataDir = () => {
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
      console.log('Created data directory:', dataDir)
    }
  } catch (error) {
    console.error('Error creating data directory:', error)
  }
}

// Helper function to read data
const readData = (filePath: string, defaultValue: any[] = []) => {
  try {
    ensureDataDir()
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8')
      const parsed = JSON.parse(data)
      console.log(`Read ${parsed.length} approved articles from ${filePath}`)
      return parsed
    } else {
      console.log(`Approved articles file ${filePath} does not exist, returning empty array`)
      return defaultValue
    }
  } catch (error) {
    console.error('Error reading approved articles from', filePath, ':', error)
    return defaultValue
  }
}

export async function GET() {
  try {
    console.log('Fetching blog posts from:', approvedArticlesFile)
    
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
    
    console.log(`Returning ${blogPosts.length} blog posts`)
    
    return NextResponse.json({ 
      success: true, 
      posts: blogPosts 
    })
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to fetch blog posts', 
        error: error instanceof Error ? error.message : String(error) 
      },
      { status: 500 }
    )
  }
}

// Test endpoint to verify file system access
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action } = body
    
    if (action === 'test-write') {
      // Test writing to the file
      const testData = [{ id: 1, title: 'Test Article', content: 'Test content' }]
      try {
        ensureDataDir()
        fs.writeFileSync(approvedArticlesFile, JSON.stringify(testData, null, 2))
        return NextResponse.json({ success: true, message: 'Test write successful' })
      } catch (writeError) {
        return NextResponse.json({ success: false, message: 'Test write failed', error: writeError instanceof Error ? writeError.message : String(writeError) })
      }
    }
    
    if (action === 'test-read') {
      // Test reading from the file
      const articles = readData(approvedArticlesFile)
      return NextResponse.json({ success: true, articles })
    }
    
    return NextResponse.json({ success: false, message: 'Invalid action' })
  } catch (error) {
    console.error('Error in test endpoint:', error)
    return NextResponse.json(
      { success: false, message: 'Test failed', error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
} 