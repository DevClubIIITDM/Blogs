import { Metadata } from "next";
import { notFound } from "next/navigation";

// Sample blog data - replace with your actual data source
const blogPosts = [
  {
    slug: "getting-started-with-react",
    title: "Getting Started with React",
    description: "Learn the basics of React and build your first component",
    content: `
# Getting Started with React

React is a powerful JavaScript library for building user interfaces. In this post, we'll explore the fundamentals and create your first React component.

## What is React?

React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called "components".

## Key Concepts

### Components
Components are the building blocks of React applications. They let you split the UI into independent, reusable pieces.

### JSX
JSX is a syntax extension for JavaScript that looks similar to XML or HTML. It allows you to write HTML-like code in JavaScript.

### Props
Props are used to pass data from parent components to child components.

## Getting Started

1. Create a new React project
2. Understand the project structure
3. Create your first component
4. Run the development server

## Conclusion

React provides a powerful foundation for building modern web applications. Start with these basics and gradually explore more advanced concepts.
    `,
    author: "TechClub Team",
    date: "2025-01-15",
    tags: ["React", "JavaScript", "Frontend"]
  },
  {
    slug: "ai-in-healthcare",
    title: "AI in Healthcare: Opportunities & Challenges",
    description: "Exploring the impact of artificial intelligence on healthcare",
    content: `
# AI in Healthcare: Opportunities & Challenges

Artificial Intelligence is revolutionizing healthcare, offering new possibilities for diagnosis, treatment, and patient care.

## Current Applications

### Medical Imaging
AI algorithms can analyze medical images with remarkable accuracy, helping radiologists detect diseases earlier.

### Drug Discovery
Machine learning models are accelerating the drug discovery process, reducing time and costs.

### Patient Care
AI-powered chatbots and virtual assistants are improving patient engagement and care coordination.

## Challenges

### Data Privacy
Healthcare data is highly sensitive, requiring robust privacy and security measures.

### Regulatory Compliance
AI applications in healthcare must meet strict regulatory requirements.

### Ethical Considerations
Decisions made by AI systems must be transparent and accountable.

## Future Prospects

The integration of AI in healthcare will continue to grow, offering new opportunities for improving patient outcomes and healthcare efficiency.
    `,
    author: "Dr. Sarah Johnson",
    date: "2025-01-10",
    tags: ["AI", "Healthcare", "Machine Learning"]
  }
];

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  
  if (!post) {
    return {
      title: "Blog Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author }],
    keywords: post.tags,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
        <div className="flex items-center text-gray-600 mb-4">
          <span>By {post.author}</span>
          <span className="mx-2">•</span>
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>
      
      <div className="prose prose-lg max-w-none">
        <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
          {post.content}
        </div>
      </div>
      
      <footer className="mt-12 pt-8 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-gray-600">
            <p>Written by {post.author}</p>
          </div>
          <a
            href="/blog"
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            ← Back to Blog
          </a>
        </div>
      </footer>
    </article>
  );
} 