import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db'; // Your Drizzle DB instance
import { Blogs, Users } from '@/db/schema'; // Your Blogs table schema
import { eq } from 'drizzle-orm';
import { getCurrentSession } from '@/lib/server/session';

/**
 * Helper function to generate a URL-friendly slug from a string.
 * @param title - The title to convert into a slug.
 * @returns A sanitized, lowercased, and hyphenated slug.
 */
const generateSlug = (title: string): string => {
  if (!title) return '';
  return title
    .toLowerCase()
    .replace(/&/g, 'and') // Replace & with 'and'
    .replace(/[^\w\s-]/g, '') // Remove all non-word, non-space, non-hyphen chars
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with a single hyphen
    .replace(/^-+|-+$/g, ''); // Trim leading/trailing hyphens
};

/**
 * POST: Handles the submission of a new article.
 * The article is added to the database with a status of 'pending' (approved = 0).
 */
export async function POST(request: NextRequest) {
  const { user } = await getCurrentSession();
  if (!user) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
  try {
    const body = await request.json();

    // Destructure the expected fields from the request body
    const { title, excerpt, category, tags, content } = body;

    // Basic validation to ensure required fields are present
    if (!title || !category || !content) {
      return NextResponse.json(
        { success: false, message: 'Title, category, and content are required.' },
        { status: 400 }
      );
    }

    const authorId = user.id;

    // Calculate reading time (average reading speed is ~200 WPM)
    const wordCount = content.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);

    const newArticleData = {
      authorId,
      title,
      excerpt,
      category,
      tags, // Stored as a single text string
      content,
      readingTime,
      approved: 0, // 0 for 'pending', 1 for 'approved'
      slug: null, // Slug is generated upon approval to ensure it's based on the final title
    };

    // Insert the new article into the database and get the inserted record
    const [insertedArticle] = await db.insert(Blogs).values(newArticleData).returning();

    return NextResponse.json({
      success: true,
      message: 'Article submitted successfully for review.',
      articleId: insertedArticle.id,
    });

  } catch (error) {
    console.error('Error submitting article:', error);
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred while submitting the article.' },
      { status: 500 }
    );
  }
}

/**
 * GET: Fetches all articles, separating them into 'submissions' (pending) and 'approved'.
 */
export async function GET() {
  const { user } = await getCurrentSession();
  if (!user) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
  try {
    // Fetch articles pending approval (approved = 0)
    const submissionsResults = await db.select().from(Blogs).where(eq(Blogs.approved, 0)).leftJoin(Users, eq(Blogs.authorId, Users.user_id));

    const submissions = submissionsResults.map(article => ({
      ...article.blogs,
      author: article.users?.name || 'Anonymous',
      submittedAt: article.blogs.createdAt,
    }))
      // Fetch approved articles (approved = 1)
    const approvedArticlesResults = await db.select().from(Blogs).where(eq(Blogs.approved, 1)).leftJoin(Users, eq(Blogs.authorId, Users.user_id));

    const approvedArticles = approvedArticlesResults.map(article => ({
      ...article.blogs,
      author: article.users?.name || 'Anonymous',
      submittedAt: article.blogs.createdAt,
    }))
    return NextResponse.json({ submissions, approvedArticles });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch articles.' },
      { status: 500 }
    );
  }
}

/**
 * PUT: Approves or rejects a submitted article.
 */
export async function PUT(request: NextRequest) {
  const { user } = await getCurrentSession();
  if (!user) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
  if (user.role !== 'A') {
    return NextResponse.json({ success: false, message: 'Forbidden: Admin access required.' }, { status: 403 });
  }
  try {
    const { action, articleId } = await request.json();

    if (!action || !articleId) {
      return NextResponse.json({ success: false, message: 'Action and Article ID are required.' }, { status: 400 });
    }

    // Retrieve the article to ensure it exists before proceeding
    const [article] = await db.select().from(Blogs).where(eq(Blogs.id, articleId));
    if (!article) {
      return NextResponse.json({ success: false, message: 'Article not found.' }, { status: 404 });
    }

    if (action === 'approve') {
      const slug = generateSlug(article.title);
      // NOTE: For a production app, you should check if this slug is already in use
      // and append a unique identifier if necessary.

      const [updatedArticle] = await db
        .update(Blogs)
        .set({ approved: 1, slug: slug })
        .where(eq(Blogs.id, articleId))
        .returning();

      return NextResponse.json({ success: true, message: 'Article approved and published.', article: updatedArticle });

    } else if (action === 'reject') {
      // If an article is rejected, it's deleted from the database.
      await db.delete(Blogs).where(eq(Blogs.id, articleId));
      return NextResponse.json({ success: true, message: 'Article rejected and deleted.' });
    }

    return NextResponse.json({ success: false, message: 'Invalid action specified.' }, { status: 400 });

  } catch (error) {
    console.error('Error processing action:', error);
    return NextResponse.json({ success: false, message: 'Failed to process action.' }, { status: 500 });
  }
}

/**
 * DELETE: Permanently deletes an article from the database.
 */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const articleIdParam = searchParams.get('id');

    if (!articleIdParam) {
      return NextResponse.json({ success: false, message: 'Article ID is required.' }, { status: 400 });
    }

    const articleId = parseInt(articleIdParam, 10);
    if (isNaN(articleId)) {
      return NextResponse.json({ success: false, message: 'Invalid Article ID format.' }, { status: 400 });
    }

    // Attempt to delete the article and get the result
    const result = await db.delete(Blogs).where(eq(Blogs.id, articleId));

    // The 'pg' driver returns rowCount. Check if a row was actually deleted.
    if (result.rowCount === 0) {
      return NextResponse.json({ success: false, message: 'Article not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Article deleted successfully.' });
  } catch (error) {
    console.error('Error deleting article:', error);
    return NextResponse.json({ success: false, message: 'Failed to delete article.' }, { status: 500 });
  }
}
