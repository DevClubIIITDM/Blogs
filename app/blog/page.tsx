import { BackgroundWrapper } from "@/components/background-wrapper"
import { BlogClient } from "@/components/blog-client"
import { getSortedPostsData } from "@/lib/markdown"

export default async function BlogPage() {
  // Load markdown posts
  const markdownPosts = await getSortedPostsData()
  
  return (
    <BackgroundWrapper>
      {/* Header */}
      <section className="relative z-10">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold text-white">Developers Blog</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Discover insights, tutorials, and innovations from our community of tech enthusiasts
            </p>
          </div>
        </div>
      </section>

      {/* Client component for dynamic content */}
      <BlogClient markdownPosts={markdownPosts} />
    </BackgroundWrapper>
  )
}
