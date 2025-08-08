import { redirect } from 'next/navigation'
import { BackgroundWrapper } from '@/components/background-wrapper'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react'
import Link from 'next/link'
import { EnhancedMarkdownRenderer } from '@/components/markdown-renderer'
import { db } from '@/db'
import { Blogs, Users } from '@/db/schema'
import { eq, and } from 'drizzle-orm'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Fetch from DB if it's an approved article
  const articleData = await db
    .select({
      title: Blogs.title,
      excerpt: Blogs.excerpt,
      content: Blogs.content,
      category: Blogs.category,
      tags: Blogs.tags,
      createdAt: Blogs.createdAt,
      readingTime: Blogs.readingTime,
      author: {
        name: Users.name,
        picture: Users.picture,
      },
    })
    .from(Blogs)
    .innerJoin(Users, eq(Blogs.authorId, Users.user_id))
    .where(and(eq(Blogs.slug, slug), eq(Blogs.approved, 1)))
    .then(rows => rows[0])
  
  if (!articleData) {
    return redirect("/");
  }

  const post = {
      title: articleData.title,
      excerpt: articleData.excerpt,
      content: articleData.content,
      author: {
        name: articleData.author.name,
        avatar: articleData.author.picture,
        role: 'IIITDM Student'
      },
      category: articleData.category,
      createdAt: articleData.createdAt || new Date(),
      readTime: `${articleData.readingTime} min read`,
      image: '/placeholder.jpg',
      tags: articleData.tags ? articleData.tags.split(',').map((tag) => tag.trim()) : []
    }

  return (
    <BackgroundWrapper>
      <section className="relative z-10">
        <div className="container mx-auto px-4 py-6">
          <Button asChild variant="ghost">
            <Link href="/blog" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </section>

      <section className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          <article className="max-w-4xl mx-auto">
            <header className="mb-8">
              <div className="flex items-center gap-4 text-sm text-white/60 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
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
              <div className="mb-4">
                <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-500/20 text-blue-300 rounded-full">
                  {post.category}
                </span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                {post.title}
              </h1>
              <p className="text-xl text-white/80 mb-6">
                {post.excerpt}
              </p>
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 text-sm bg-white/10 text-white/70 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </header>

            <div className="prose prose-invert prose-lg max-w-none">
              <EnhancedMarkdownRenderer content={post.content || ''} className="text-white/90 leading-relaxed" />
            </div>

            <footer className="mt-12 pt-8 border-t border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={post.author.avatar || ""} />
                      <AvatarFallback>{post.author.name?.[0] ?? "U"}</AvatarFallback>
                    </Avatar>
                  <div>
                    <div className="text-white font-medium">{post.author.name}</div>
                    <div className="text-white/60 text-sm">{post.author.role}</div>
                  </div>
                </div>
                <Button asChild>
                  <Link href="/blog">Back to Blog</Link>
                </Button>
              </div>
            </footer>
          </article>
        </div>
      </section>
    </BackgroundWrapper>
  )
}
