import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// File paths for persistent storage
const dataDir = path.join(process.cwd(), 'data')
const submissionsFile = path.join(dataDir, 'submissions.json')
const approvedArticlesFile = path.join(dataDir, 'approved-articles.json')

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

// Helper functions to read/write data
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

const writeData = (filePath: string, data: any) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
  } catch (error) {
    console.error('Error writing data:', error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const submissions = readData(submissionsFile)
    
    const submission = {
      id: Date.now(),
      ...body,
      status: 'pending',
      submittedAt: new Date().toISOString()
    }
    
    submissions.push(submission)
    writeData(submissionsFile, submissions)
    
    return NextResponse.json({ 
      success: true, 
      message: 'Article submitted successfully for review',
      submissionId: submission.id
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to submit article' },
      { status: 500 }
    )
  }
}

export async function GET() {
  const submissions = readData(submissionsFile)
  const approvedArticles = readData(approvedArticlesFile)
  
  return NextResponse.json({ submissions, approvedArticles })
}

// New endpoint to approve articles
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, articleId } = body
    
    const submissions = readData(submissionsFile)
    const approvedArticles = readData(approvedArticlesFile)
    
    const submissionIndex = submissions.findIndex((sub: any) => sub.id === articleId)
    
    if (submissionIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'Article not found' },
        { status: 404 }
      )
    }
    
    const article = submissions[submissionIndex]
    
    if (action === 'approve') {
      // Move to approved articles - use filename as identifier
      const filename = article.fileUpload?.name || article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      const fileIdentifier = filename.replace('.md', '')
      
      const approvedArticle = {
        ...article,
        status: 'approved',
        approvedAt: new Date().toISOString(),
        fileIdentifier: fileIdentifier
      }
      
      approvedArticles.push(approvedArticle)
      submissions.splice(submissionIndex, 1)
      
      writeData(approvedArticlesFile, approvedArticles)
      writeData(submissionsFile, submissions)
      
      return NextResponse.json({ 
        success: true, 
        message: 'Article approved and published',
        article: approvedArticle
      })
    } else if (action === 'reject') {
      // Remove from submissions
      submissions.splice(submissionIndex, 1)
      writeData(submissionsFile, submissions)
      
      return NextResponse.json({ 
        success: true, 
        message: 'Article rejected',
      })
    }
    
    return NextResponse.json(
      { success: false, message: 'Invalid action' },
      { status: 400 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to process action' },
      { status: 500 }
    )
  }
}

// New endpoint to delete approved articles
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const articleId = searchParams.get('id')
    
    if (!articleId) {
      return NextResponse.json(
        { success: false, message: 'Article ID is required' },
        { status: 400 }
      )
    }
    
    const approvedArticles = readData(approvedArticlesFile)
    const articleIndex = approvedArticles.findIndex((article: any) => article.id === parseInt(articleId))
    
    if (articleIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'Article not found' },
        { status: 404 }
      )
    }
    
    // Remove the article
    approvedArticles.splice(articleIndex, 1)
    writeData(approvedArticlesFile, approvedArticles)
    
    return NextResponse.json({ 
      success: true, 
      message: 'Article deleted successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to delete article' },
      { status: 500 }
    )
  }
} 