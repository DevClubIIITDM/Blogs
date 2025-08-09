import { NextResponse } from 'next/server';
import { db } from '@/db'; // Your Drizzle DB instance
import { Blogs, Users } from '@/db/schema'; // Your Drizzle table schemas
import { eq } from 'drizzle-orm';

// Force dynamic responses to ensure fresh data on every request
export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * GET: Fetches all approved blog posts for public display.
 * This endpoint queries the database for articles where 'approved' is 1,
 * joins with the Users table to get author information, and formats the
 * response to match the legacy structure to prevent breaking the frontend.
 */
export async function GET() {
  try {
    console.log('Fetching approved blog posts from the database...');

    // Query the database for all approved articles (approved = 1)
    // and join with the Users table to retrieve author details.
    const approvedArticles = await db
      .select({
        // Select specific columns to shape the final output
        slug: Blogs.slug,
        title: Blogs.title,
        excerpt: Blogs.excerpt,
        category: Blogs.category,
        tags: Blogs.tags,
        // --- NOTE: Schema Assumption ---
        // This assumes your `Users` table has a `name` column for the author's display name.
        // e.g., `name: varchar('name', { length: 255 })`
        author: Users.name, 
        // Use createdAt as the date. If you added an 'approvedAt' column, that would be better here.
        date: Blogs.createdAt, 
        // --- NOTE: Schema Assumption ---
        // This assumes your `Blogs` table has a `content` column.
        content: Blogs.content,
        created_at: Blogs.createdAt
      })
      .from(Blogs)
      .where(eq(Blogs.approved, 1)) // Filter for only approved articles
      .leftJoin(Users, eq(Blogs.authorId, Users.user_id)); // Join to get author info

    // Transform the database results into the specific JSON structure your frontend expects.
    const blogPosts = approvedArticles.map((article) => ({
      // Map 'slug' to 'fileIdentifier' to maintain compatibility with your existing code.
      fileIdentifier: article.slug,
      title: article.title,
      excerpt: article.excerpt,
      category: article.category,
      tags: article.tags,
      // Use the author's name from the joined Users table, with a fallback.
      author: article.author || 'Anonymous',
      date: article.date,
      content: article.content,
      submittedAt: article.created_at
    }));

    console.log(`Returning ${blogPosts.length} blog posts.`);

    return NextResponse.json({
      success: true,
      posts: blogPosts,
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch blog posts',
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
