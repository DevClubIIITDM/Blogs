import { db } from '@/db'
import { Blogs, Users } from '@/db/schema'
import { eq, and, desc, ilike } from 'drizzle-orm'

export interface BlogPost {
  id: string | null
  title: string
  date: string
  excerpt: string | null
  content: string | null
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
  id: string | null
  title: string
  date: string
  excerpt: string | null
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

export async function getSortedPostsData(): Promise<BlogPostMeta[]> {
  try {
    const rows = await db
      .select({
        id: Blogs.slug,
        title: Blogs.title,
        excerpt: Blogs.excerpt,
        createdAt: Blogs.createdAt,
        category: Blogs.category,
        readingTime: Blogs.readingTime,
        tags: Blogs.tags,
        author: {
          name: Users.name,
          picture: Users.picture,
        },
      })
      .from(Blogs)
      .innerJoin(Users, eq(Blogs.authorId, Users.user_id))
      .where(eq(Blogs.approved, 1))
      .orderBy(desc(Blogs.createdAt))

    return rows.map(post => ({
      id: post.id,
      title: post.title,
      excerpt: post.excerpt,
      date: post.createdAt?.toISOString() || new Date().toISOString(),
      category: post.category,
      readTime: `${post.readingTime} min read`,
      image: '/placeholder.jpg',
      tags: post.tags?.split(',').map(tag => tag.trim()),
      author: {
        name: post.author.name,
        avatar: post.author.picture,
        role: 'IIITDM Student',
      },
    }))
  } catch (error) {
    console.error('Error in getSortedPostsData:', error)
    return []
  }
}

export async function getAllPostIds() {
  try {
    const rows = await db.select({ slug: Blogs.slug }).from(Blogs).where(eq(Blogs.approved, 1))
    return rows.map(row => ({
      params: {
        slug: row.slug,
      },
    }))
  } catch (error) {
    console.error('Error in getAllPostIds:', error)
    return []
  }
}

export async function getPostData(slug: string): Promise<BlogPost> {
  try {
    const row = await db
      .select({
        id: Blogs.slug,
        title: Blogs.title,
        excerpt: Blogs.excerpt,
        content: Blogs.content,
        createdAt: Blogs.createdAt,
        category: Blogs.category,
        readingTime: Blogs.readingTime,
        tags: Blogs.tags,
        author: {
          name: Users.name,
          picture: Users.picture,
        },
      })
      .from(Blogs)
      .innerJoin(Users, eq(Blogs.authorId, Users.user_id))
      .where(and(eq(Blogs.slug, slug), eq(Blogs.approved, 1)))
      .then(rows => rows[0])

    if (!row) throw new Error('Post not found')

    return {
      id: row.id,
      title: row.title,
      excerpt: row.excerpt,
      content: row.content,
      date: row.createdAt?.toISOString() || new Date().toISOString(),
      category: row.category,
      readTime: `${row.readingTime} min read`,
      image: '/placeholder.jpg',
      tags: row.tags?.split(',').map(tag => tag.trim()),
      author: {
        name: row.author.name,
        avatar: row.author.picture,
        role: 'IIITDM Student',
      },
    }
  } catch (error) {
    console.error(`Error in getPostData for slug ${slug}:`, error)
    throw error
  }
}

export async function getPostsByCategory(category: string): Promise<BlogPostMeta[]> {
  try {
    const posts = await getSortedPostsData()
    return posts.filter(post => post.category === category)
  } catch (error) {
    console.error('Error in getPostsByCategory:', error)
    return []
  }
}

export async function searchPosts(query: string): Promise<BlogPostMeta[]> {
  try {
    const posts = await getSortedPostsData()
    const lowercaseQuery = query.toLowerCase()

    return posts.filter(post =>
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.excerpt?.toLowerCase().includes(lowercaseQuery) ||
      post.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    )
  } catch (error) {
    console.error('Error in searchPosts:', error)
    return []
  }
}
