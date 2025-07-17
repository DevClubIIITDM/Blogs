import { Metadata } from "next";
import { notFound } from "next/navigation";

// Sample blog data - replace with your actual data source
const blogPosts = [
  {
    slug: "linux-commands",
    title: "Linux Commands Documentation: Essential Commands for Developers",
    description: "A comprehensive guide to essential Linux commands that every developer should know. From file management to system administration, master the command line interface.",
    content: `
<h1>Linux Commands Documentation: Essential Commands for Developers</h1>

<p>Linux command line interface (CLI) is a powerful tool that every developer should master. This comprehensive guide covers essential Linux commands organized by category to help you navigate and manage your system effectively.</p>

<style>
h1 {
  font-size: 2.25rem;
  font-weight: 700;
  color: #111827;
  margin: 2rem 0 1rem 0;
  border-bottom: 3px solid #3b82f6;
  padding-bottom: 0.5rem;
}

h2 {
  font-size: 1.875rem;
  font-weight: 600;
  color: #1f2937;
  margin: 2rem 0 1rem 0;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 0.5rem;
}

h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #374151;
  margin: 1.5rem 0 1rem 0;
}

p {
  margin: 1rem 0;
  line-height: 1.75;
  color: #4b5563;
}

table {
  border-collapse: collapse;
  width: 100%;
  margin: 1rem 0;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
}

th {
  background-color: #f3f4f6;
  padding: 0.75rem;
  text-align: left;
  font-weight: 600;
  border-bottom: 2px solid #d1d5db;
  color: #374151;
}

td {
  padding: 0.75rem;
  border-bottom: 1px solid #e5e7eb;
  vertical-align: top;
}

tr:last-child td {
  border-bottom: none;
}

tr:hover {
  background-color: #f9fafb;
}

strong {
  color: #1f2937;
  font-weight: 600;
}
</style>

<h2>File and Directory Management</h2>

<h3>Navigation Commands</h3>

<table>
<thead>
<tr><th>Command</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><strong>pwd</strong></td><td>Print working directory</td></tr>
<tr><td><strong>ls</strong></td><td>List directory contents</td></tr>
<tr><td><strong>cd</strong></td><td>Change directory</td></tr>
<tr><td><strong>mkdir</strong></td><td>Create directory</td></tr>
<tr><td><strong>rmdir</strong></td><td>Remove empty directory</td></tr>
</tbody>
</table>

<h3>File Operations</h3>

<table>
<thead>
<tr><th>Command</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><strong>cp</strong></td><td>Copy files and directories</td></tr>
<tr><td><strong>mv</strong></td><td>Move or rename files</td></tr>
<tr><td><strong>rm</strong></td><td>Remove files and directories</td></tr>
<tr><td><strong>touch</strong></td><td>Create empty file or update timestamp</td></tr>
<tr><td><strong>cat</strong></td><td>Concatenate and display file contents</td></tr>
<tr><td><strong>less</strong></td><td>View file contents page by page</td></tr>
<tr><td><strong>head</strong></td><td>Display first lines of a file</td></tr>
<tr><td><strong>tail</strong></td><td>Display last lines of a file</td></tr>
</tbody>
</table>

<h3>File Permissions</h3>

<table>
<thead>
<tr><th>Command</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><strong>chmod</strong></td><td>Change file permissions</td></tr>
<tr><td><strong>chown</strong></td><td>Change file owner</td></tr>
<tr><td><strong>chgrp</strong></td><td>Change file group</td></tr>
</tbody>
</table>

<h2>System Information</h2>

<h3>System Status</h3>

<table>
<thead>
<tr><th>Command</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><strong>top</strong></td><td>Display system processes</td></tr>
<tr><td><strong>htop</strong></td><td>Interactive process viewer</td></tr>
<tr><td><strong>ps</strong></td><td>Report process status</td></tr>
<tr><td><strong>df</strong></td><td>Display disk space usage</td></tr>
<tr><td><strong>du</strong></td><td>Estimate file space usage</td></tr>
<tr><td><strong>free</strong></td><td>Display memory usage</td></tr>
<tr><td><strong>uname</strong></td><td>Print system information</td></tr>
<tr><td><strong>whoami</strong></td><td>Print effective user ID</td></tr>
</tbody>
</table>

<h3>Network Commands</h3>

<table>
<thead>
<tr><th>Command</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><strong>ping</strong></td><td>Test network connectivity</td></tr>
<tr><td><strong>netstat</strong></td><td>Network statistics</td></tr>
<tr><td><strong>ss</strong></td><td>Socket statistics</td></tr>
<tr><td><strong>ifconfig</strong></td><td>Configure network interface</td></tr>
<tr><td><strong>ip</strong></td><td>Show/manipulate routing</td></tr>
<tr><td><strong>wget</strong></td><td>Retrieve files from web</td></tr>
<tr><td><strong>curl</strong></td><td>Transfer data from/to server</td></tr>
</tbody>
</table>

<h2>Text Processing</h2>

<h3>File Viewing and Editing</h3>

<table>
<thead>
<tr><th>Command</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><strong>nano</strong></td><td>Simple text editor</td></tr>
<tr><td><strong>vim</strong></td><td>Advanced text editor</td></tr>
<tr><td><strong>grep</strong></td><td>Search text patterns</td></tr>
<tr><td><strong>sed</strong></td><td>Stream editor</td></tr>
<tr><td><strong>awk</strong></td><td>Pattern scanning and processing</td></tr>
<tr><td><strong>sort</strong></td><td>Sort lines of text files</td></tr>
<tr><td><strong>uniq</strong></td><td>Remove duplicate lines</td></tr>
<tr><td><strong>wc</strong></td><td>Word, line, and byte count</td></tr>
</tbody>
</table>

<h3>File Comparison</h3>

<table>
<thead>
<tr><th>Command</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><strong>diff</strong></td><td>Compare files line by line</td></tr>
<tr><td><strong>cmp</strong></td><td>Compare two files byte by byte</td></tr>
<tr><td><strong>comm</strong></td><td>Compare two sorted files</td></tr>
</tbody>
</table>

<h2>Package Management</h2>

<h3>Debian/Ubuntu (apt)</h3>

<table>
<thead>
<tr><th>Command</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><strong>apt update</strong></td><td>Update package list</td></tr>
<tr><td><strong>apt upgrade</strong></td><td>Upgrade packages</td></tr>
<tr><td><strong>apt install</strong></td><td>Install packages</td></tr>
<tr><td><strong>apt remove</strong></td><td>Remove packages</td></tr>
<tr><td><strong>apt search</strong></td><td>Search packages</td></tr>
</tbody>
</table>

<h3>Red Hat/CentOS (yum/dnf)</h3>

<table>
<thead>
<tr><th>Command</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><strong>yum update</strong></td><td>Update packages</td></tr>
<tr><td><strong>yum install</strong></td><td>Install packages</td></tr>
<tr><td><strong>yum remove</strong></td><td>Remove packages</td></tr>
<tr><td><strong>yum search</strong></td><td>Search packages</td></tr>
</tbody>
</table>

<h2>User and Group Management</h2>

<h3>User Commands</h3>

<table>
<thead>
<tr><th>Command</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><strong>useradd</strong></td><td>Create new user</td></tr>
<tr><td><strong>userdel</strong></td><td>Delete user</td></tr>
<tr><td><strong>passwd</strong></td><td>Change user password</td></tr>
<tr><td><strong>su</strong></td><td>Switch user</td></tr>
<tr><td><strong>sudo</strong></td><td>Execute command as superuser</td></tr>
<tr><td><strong>who</strong></td><td>Show who is logged in</td></tr>
<tr><td><strong>w</strong></td><td>Show who is logged in and what they are doing</td></tr>
</tbody>
</table>

<h3>Group Commands</h3>

<table>
<thead>
<tr><th>Command</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><strong>groupadd</strong></td><td>Create new group</td></tr>
<tr><td><strong>groupdel</strong></td><td>Delete group</td></tr>
<tr><td><strong>usermod</strong></td><td>Modify user account</td></tr>
</tbody>
</table>

<h2>Process Management</h2>

<h3>Process Control</h3>

<table>
<thead>
<tr><th>Command</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><strong>kill</strong></td><td>Terminate processes</td></tr>
<tr><td><strong>killall</strong></td><td>Kill processes by name</td></tr>
<tr><td><strong>pkill</strong></td><td>Kill processes by pattern</td></tr>
<tr><td><strong>nice</strong></td><td>Run program with modified priority</td></tr>
<tr><td><strong>renice</strong></td><td>Alter priority of running processes</td></tr>
<tr><td><strong>bg</strong></td><td>Resume job in background</td></tr>
<tr><td><strong>fg</strong></td><td>Resume job in foreground</td></tr>
<tr><td><strong>jobs</strong></td><td>List jobs</td></tr>
</tbody>
</table>

<h2>Archive and Compression</h2>

<h3>Compression Tools</h3>

<table>
<thead>
<tr><th>Command</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><strong>tar</strong></td><td>Tape archive</td></tr>
<tr><td><strong>gzip</strong></td><td>Compress files</td></tr>
<tr><td><strong>gunzip</strong></td><td>Decompress files</td></tr>
<tr><td><strong>zip</strong></td><td>Package and compress files</td></tr>
<tr><td><strong>unzip</strong></td><td>Extract compressed files</td></tr>
<tr><td><strong>7z</strong></td><td>High compression ratio archiver</td></tr>
</tbody>
</table>

<h2>System Administration</h2>

<h3>Service Management</h3>

<table>
<thead>
<tr><th>Command</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><strong>systemctl</strong></td><td>Control systemd system and service manager</td></tr>
<tr><td><strong>service</strong></td><td>Run a System V init script</td></tr>
<tr><td><strong>systemctl start</strong></td><td>Start a service</td></tr>
<tr><td><strong>systemctl stop</strong></td><td>Stop a service</td></tr>
<tr><td><strong>systemctl restart</strong></td><td>Restart a service</td></tr>
<tr><td><strong>systemctl status</strong></td><td>Show service status</td></tr>
<tr><td><strong>systemctl enable</strong></td><td>Enable a service</td></tr>
<tr><td><strong>systemctl disable</strong></td><td>Disable a service</td></tr>
</tbody>
</table>

<h3>System Monitoring</h3>

<table>
<thead>
<tr><th>Command</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><strong>iostat</strong></td><td>Report CPU and I/O statistics</td></tr>
<tr><td><strong>vmstat</strong></td><td>Report virtual memory statistics</td></tr>
<tr><td><strong>sar</strong></td><td>Collect, report, or save system activity</td></tr>
<tr><td><strong>lsof</strong></td><td>List open files</td></tr>
<tr><td><strong>fuser</strong></td><td>Identify processes using files or sockets</td></tr>
</tbody>
</table>

<h2>Advanced Commands</h2>

<h3>Shell and Scripting</h3>

<table>
<thead>
<tr><th>Command</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><strong>bash</strong></td><td>GNU Bourne-Again shell</td></tr>
<tr><td><strong>sh</strong></td><td>Shell command interpreter</td></tr>
<tr><td><strong>source</strong></td><td>Execute commands from file</td></tr>
<tr><td><strong>alias</strong></td><td>Create command alias</td></tr>
<tr><td><strong>export</strong></td><td>Set environment variable</td></tr>
<tr><td><strong>env</strong></td><td>Display environment variables</td></tr>
</tbody>
</table>

<h3>File System</h3>

<table>
<thead>
<tr><th>Command</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><strong>mount</strong></td><td>Mount file system</td></tr>
<tr><td><strong>umount</strong></td><td>Unmount file system</td></tr>
<tr><td><strong>fdisk</strong></td><td>Partition table manipulator</td></tr>
<tr><td><strong>fsck</strong></td><td>Check and repair file system</td></tr>
<tr><td><strong>dd</strong></td><td>Convert and copy files</td></tr>
</tbody>
</table>

<h2>Best Practices</h2>

<h3>Command Line Tips</h3>

<table>
<thead>
<tr><th>Tip</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><strong>Use tab completion</strong></td><td>Press Tab to auto-complete commands and file names</td></tr>
<tr><td><strong>Use history</strong></td><td>Press Up/Down arrows to navigate command history</td></tr>
<tr><td><strong>Use man pages</strong></td><td>Type 'man command' for detailed documentation</td></tr>
<tr><td><strong>Use --help</strong></td><td>Most commands support --help flag for quick help</td></tr>
<tr><td><strong>Use wildcards</strong></td><td>Use * and ? for pattern matching</td></tr>
<tr><td><strong>Use pipes</strong></td><td>Connect commands with | to create powerful combinations</td></tr>
<tr><td><strong>Use redirection</strong></td><td>Use > and < to redirect input/output</td></tr>
</tbody>
</table>

<h3>Safety Tips</h3>

<table>
<thead>
<tr><th>Tip</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><strong>Always backup important data</strong></td><td>Backup before running destructive commands</td></tr>
<tr><td><strong>Double-check commands</strong></td><td>Verify before executing, especially with rm and dd</td></tr>
<tr><td><strong>Use -i flag</strong></td><td>Use -i flag with rm for interactive deletion</td></tr>
<tr><td><strong>Test commands</strong></td><td>Test on non-critical files first</td></tr>
<tr><td><strong>Keep system updated</strong></td><td>Update regularly for security and stability</td></tr>
<tr><td><strong>Use sudo sparingly</strong></td><td>Understand what each command does before using sudo</td></tr>
</tbody>
</table>

<h2>Conclusion</h2>

<p>Mastering Linux commands is essential for developers working in Unix-like environments. This documentation provides a solid foundation of essential commands organized by category. Remember to practice regularly and explore the man pages for more detailed information about each command.</p>

<p>The command line interface offers unparalleled power and flexibility for system administration, development, and automation tasks. With these commands at your disposal, you'll be able to efficiently manage your Linux system and streamline your development workflow.</p>
    `,
    author: "Developers Club Team",
    date: "2025-01-20",
    tags: ["Linux", "Command Line", "System Administration", "DevOps"]
  },
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
    author: "Developers Club Team",
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
        <div 
          className="text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
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