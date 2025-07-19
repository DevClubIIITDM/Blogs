import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import remarkGfm from 'remark-gfm'

const postsDirectory = path.join(process.cwd(), 'content/blog')

export interface BlogPost {
  id: string
  title: string
  date: string
  excerpt: string
  content: string
  author: {
    name: string
    avatar: string
    role: string
  }
  category: string
  readTime: string
  image: string
  tags?: string[]
}

export interface BlogPostMeta {
  id: string
  title: string
  date: string
  excerpt: string
  author: {
    name: string
    avatar: string
    role: string
  }
  category: string
  readTime: string
  image: string
  tags?: string[]
}

export function getSortedPostsData(): BlogPostMeta[] {
  try {
    // Check if directory exists
    if (!fs.existsSync(postsDirectory)) {
      console.warn(`Posts directory does not exist: ${postsDirectory}`)
      return []
    }

    // Get file names under /content/blog
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => {
        try {
          // Remove ".md" from file name to get id
          const id = fileName.replace(/\.md$/, '')

          // Read markdown file as string
          const fullPath = path.join(postsDirectory, fileName)
          const fileContents = fs.readFileSync(fullPath, 'utf8')

          // Use gray-matter to parse the post metadata section
          const matterResult = matter(fileContents)

          // Combine the data with the id
          return {
            id,
            ...(matterResult.data as Omit<BlogPostMeta, 'id'>),
          }
        } catch (error) {
          console.error(`Error processing file ${fileName}:`, error)
          return null
        }
      })
      .filter((post): post is BlogPostMeta => post !== null) // Remove null entries with proper typing

    // Sort posts by date
    return allPostsData.sort((a, b) => {
      if (a.date < b.date) {
        return 1
      } else {
        return -1
      }
    })
  } catch (error) {
    console.error('Error in getSortedPostsData:', error)
    return []
  }
}

export function getAllPostIds() {
  try {
    if (!fs.existsSync(postsDirectory)) {
      console.warn(`Posts directory does not exist: ${postsDirectory}`)
      return []
    }

    const fileNames = fs.readdirSync(postsDirectory)
    return fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => {
        return {
          params: {
            slug: fileName.replace(/\.md$/, ''),
          },
        }
      })
  } catch (error) {
    console.error('Error in getAllPostIds:', error)
    return []
  }
}

export async function getPostData(slug: string): Promise<BlogPost> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    
    if (!fs.existsSync(fullPath)) {
      throw new Error(`Post file not found: ${fullPath}`)
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
      .use(html)
      .use(remarkGfm)
      .process(matterResult.content)
    const contentHtml = processedContent.toString()

    // Combine the data with the id and contentHtml
    return {
      id: slug,
      content: contentHtml,
      ...(matterResult.data as Omit<BlogPost, 'id' | 'content'>),
    }
  } catch (error) {
    console.error(`Error in getPostData for slug ${slug}:`, error)
    throw error
  }
}

export function getPostsByCategory(category: string): BlogPostMeta[] {
  try {
    const allPosts = getSortedPostsData()
    return allPosts.filter((post) => post.category === category)
  } catch (error) {
    console.error('Error in getPostsByCategory:', error)
    return []
  }
}

export function searchPosts(query: string): BlogPostMeta[] {
  try {
    const allPosts = getSortedPostsData()
    const lowercaseQuery = query.toLowerCase()
    
    return allPosts.filter((post) => 
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.excerpt.toLowerCase().includes(lowercaseQuery) ||
      post.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    )
  } catch (error) {
    console.error('Error in searchPosts:', error)
    return []
  }
} 