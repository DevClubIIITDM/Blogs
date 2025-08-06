"use client"

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Quote, 
  Heading1, 
  Heading2, 
  Heading3,
  Link as LinkIcon,
  Download,
  Upload,
  Save,
  Send
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { EnhancedMarkdownRenderer } from './markdown-renderer'
import { Layout, LayoutGrid, Eye, Code, X } from 'lucide-react'

interface TipTapEditorProps {
  content?: string
  onContentChange?: (content: string) => void
  placeholder?: string
  className?: string
  readOnly?: boolean
  onClose?: () => void
  fullScreen?: boolean
  // New props for article submission
  formData?: {
    title: string
    excerpt: string
    category: string
    tags: string
  }
  onSubmitArticle?: (content: string) => Promise<void>
  isSubmitting?: boolean
}

export function TipTapEditor({ 
  content = '', 
  onContentChange, 
  placeholder = 'Start writing your article...',
  className = '',
  readOnly = false,
  onClose,
  fullScreen = false,
  formData,
  onSubmitArticle,
  isSubmitting = false
}: TipTapEditorProps) {
  const [markdownContent, setMarkdownContent] = useState(content || '')
  const [isSideBySide, setIsSideBySide] = useState(true)
  const [previewMode, setPreviewMode] = useState<'preview' | 'raw'>('preview')
  const [isMounted, setIsMounted] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Disable rich text formatting to preserve original markdown
        heading: false,
        bold: false,
        italic: false,
        bulletList: false,
        orderedList: false,
        blockquote: false,
        codeBlock: false,
        horizontalRule: false,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-500 underline cursor-pointer',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: content, // Use original content directly
    editable: !readOnly,
    immediatelyRender: false, // Fix SSR hydration issues
    onUpdate: ({ editor }) => {
      const markdown = editor.getText() // Get raw text to preserve original formatting
      setMarkdownContent(markdown)
      onContentChange?.(markdown)
    },
    editorProps: {
      attributes: {
        class: 'font-mono whitespace-pre leading-normal',
      },
    },
  })

  // Ensure component is mounted on client side
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Update content when props change
  useEffect(() => {
    if (content !== markdownContent) {
      setMarkdownContent(content)
      if (editor && content) {
        editor.commands.setContent(content)
      }
    }
  }, [content, editor, markdownContent])

  if (!editor || !isMounted) {
    return (
      <div className={`${className} ${fullScreen ? 'fixed inset-0 z-50' : 'w-full h-[90vh]'} bg-gray-800 border border-gray-700 rounded-lg flex flex-col`}>
        <div className="p-6 border-b border-gray-700 flex items-center justify-between">
          <h2 className="text-white text-xl font-semibold">Markdown Editor</h2>
          {onClose && (
            <Button
              size="sm"
              variant="outline"
              onClick={onClose}
              className="border-gray-600 text-gray-200 hover:bg-gray-600"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="flex-1 p-6 flex items-center justify-center">
          <div className="text-white/60">Loading editor...</div>
        </div>
      </div>
    )
  }

  const htmlToMarkdown = (html: string): string => {
    // Basic HTML to Markdown conversion
    let markdown = html
      // Headers
      .replace(/<h1[^>]*>(.*?)<\/h1>/g, '# $1\n\n')
      .replace(/<h2[^>]*>(.*?)<\/h2>/g, '## $1\n\n')
      .replace(/<h3[^>]*>(.*?)<\/h3>/g, '### $1\n\n')
      // Bold and italic
      .replace(/<strong[^>]*>(.*?)<\/strong>/g, '**$1**')
      .replace(/<b[^>]*>(.*?)<\/b>/g, '**$1**')
      .replace(/<em[^>]*>(.*?)<\/em>/g, '*$1*')
      .replace(/<i[^>]*>(.*?)<\/i>/g, '*$1*')
      // Links
      .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/g, '[$2]($1)')
      // Lists
      .replace(/<ul[^>]*>(.*?)<\/ul>/gs, (match, content) => {
        return content.replace(/<li[^>]*>(.*?)<\/li>/g, '* $1\n') + '\n'
      })
      .replace(/<ol[^>]*>(.*?)<\/ol>/gs, (match, content) => {
        let counter = 1
        return content.replace(/<li[^>]*>(.*?)<\/li>/g, () => `${counter++}. $1\n`) + '\n'
      })
      // Blockquotes
      .replace(/<blockquote[^>]*>(.*?)<\/blockquote>/g, '> $1\n\n')
      // Code blocks
      .replace(/<pre[^>]*><code[^>]*>(.*?)<\/code><\/pre>/gs, '```\n$1\n```\n\n')
      .replace(/<code[^>]*>(.*?)<\/code>/g, '`$1`')
      // Paragraphs
      .replace(/<p[^>]*>(.*?)<\/p>/g, '$1\n\n')
      // Remove remaining HTML tags
      .replace(/<[^>]*>/g, '')
      // Clean up extra newlines
      .replace(/\n{3,}/g, '\n\n')
      .trim()

    return markdown
  }

  const markdownToHtml = (markdown: string): string => {
    // Basic Markdown to HTML conversion
    let html = markdown
      // Headers
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      // Bold and italic
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
      // Lists
      .replace(/^\* (.*$)/gim, '<li>$1</li>')
      .replace(/^\d+\. (.*$)/gim, '<li>$1</li>')
      // Code blocks
      .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      // Paragraphs
      .replace(/\n\n/g, '</p><p>')

    // Wrap in paragraph tags
    html = `<p>${html}</p>`
    
    return html
  }

  const handleImportMarkdown = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      setMarkdownContent(content)
      const html = markdownToHtml(content)
      editor.commands.setContent(html)
      onContentChange?.(content)
    }
    reader.readAsText(file)
  }

  const handleExportMarkdown = () => {
    const blob = new Blob([markdownContent], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'article.md'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleSaveContent = async () => {
    if (onSubmitArticle && formData) {
      try {
        await onSubmitArticle(markdownContent)
      } catch (error) {
        console.error('Error submitting article:', error)
        alert('Failed to submit article. Please try again.')
      }
    } else {
      onContentChange?.(markdownContent)
    }
  }

  return (
    <>
      <style jsx>{`
        .tiptap {
          font-family: 'Courier New', monospace !important;
          white-space: pre !important;
          word-wrap: normal !important;
          line-height: 1.5 !important;
          tab-size: 2 !important;
          overflow-x: auto !important;
          height: 100% !important;
        }
        .tiptap p {
          margin: 0 !important;
          padding: 0 !important;
          white-space: pre !important;
        }
        .tiptap br {
          display: block !important;
          content: "" !important;
          margin-top: 0 !important;
        }
        .tiptap * {
          white-space: pre !important;
        }
        
        /* Custom scrollbar styling */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1F2937;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4B5563;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6B7280;
        }
        
        /* Firefox scrollbar */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #4B5563 #1F2937;
        }
        
        /* Responsive editor implementation */
        .editor-container {
          height: calc(100vh - 200px);
          min-height: 500px;
        }
        
        .scroll-textarea {
          height: calc(100vh - 250px) !important;
          min-height: 400px !important;
          overflow-y: scroll !important;
          overflow-x: hidden !important;
          resize: none !important;
        }
        
        .scroll-preview {
          height: calc(100vh - 250px) !important;
          min-height: 400px !important;
          overflow-y: scroll !important;
          overflow-x: hidden !important;
        }
        
        .stacked-textarea {
          height: calc(45vh - 120px) !important;
          min-height: 250px !important;
          overflow-y: scroll !important;
          overflow-x: hidden !important;
          resize: none !important;
        }
        
        .stacked-preview {
          height: calc(45vh - 120px) !important;
          min-height: 250px !important;
          overflow-y: scroll !important;
          overflow-x: hidden !important;
        }
        
        /* Mobile-specific responsive styles */
        @media (max-width: 768px) {
          .editor-container {
            height: calc(100vh - 120px);
            min-height: 400px;
          }
          
          .scroll-textarea {
            height: calc(100vh - 180px) !important;
            min-height: 300px !important;
            font-size: 14px !important;
          }
          
          .scroll-preview {
            height: calc(100vh - 180px) !important;
            min-height: 300px !important;
          }
          
          .stacked-textarea {
            height: calc(40vh - 80px) !important;
            min-height: 200px !important;
            font-size: 14px !important;
          }
          
          .stacked-preview {
            height: calc(40vh - 80px) !important;
            min-height: 200px !important;
          }
        }
        
        /* Tablet responsive styles */
        @media (max-width: 1024px) and (min-width: 769px) {
          .editor-container {
            height: calc(100vh - 160px);
            min-height: 450px;
          }
          
          .scroll-textarea {
            height: calc(100vh - 220px) !important;
            min-height: 350px !important;
          }
          
          .scroll-preview {
            height: calc(100vh - 220px) !important;
            min-height: 350px !important;
          }
        }
      `}</style>
      <div className={`${className} ${fullScreen ? 'fixed inset-0 z-50' : 'w-full h-[90vh]'} bg-gray-800 border border-gray-700 rounded-lg flex flex-col`}>
      <div className="p-3 sm:p-6 border-b border-gray-700 flex items-center justify-between">
        <h2 className="text-white text-lg sm:text-xl font-semibold">Markdown Editor</h2>
        {onClose && (
          <Button
            size="sm"
            variant="outline"
            onClick={onClose}
            className="border-gray-600 text-gray-200 hover:bg-gray-600"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex-1 p-3 sm:p-6 space-y-4 overflow-hidden">
        {/* Layout Toggle */}
        <div className="flex justify-end">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsSideBySide(!isSideBySide)}
            className="border-purple-400/30 text-purple-300 hover:bg-purple-500/20 hidden sm:flex"
          >
            {isSideBySide ? (
              <>
                <Layout className="h-4 w-4 mr-1" />
                Stacked
              </>
            ) : (
              <>
                <LayoutGrid className="h-4 w-4 mr-1" />
                Side by Side
              </>
            )}
          </Button>
        </div>

        {/* Hidden file input */}
        <input
          id="markdown-import"
          type="file"
          accept=".md"
          onChange={handleImportMarkdown}
          className="hidden"
        />

        {/* Editor and Preview Layout */}
        {isSideBySide ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-4 editor-container">
            {/* Raw Editor Content */}
            <div>
              <h4 className="text-green-400 font-semibold mb-2">Raw Editor</h4>
              <div className="border border-gray-600 rounded-lg bg-gray-900">
                <textarea
                  value={markdownContent}
                  onChange={(e) => {
                    setMarkdownContent(e.target.value)
                    onContentChange?.(e.target.value)
                  }}
                  className="w-full bg-gray-900 text-gray-100 text-sm font-mono border-none outline-none p-2 sm:p-4 custom-scrollbar scroll-textarea"
                  placeholder="Edit raw markdown here..."
                />
              </div>
            </div>

            {/* Preview Section */}
            <div>
              <h4 className="text-green-400 font-semibold mb-2">Preview</h4>
              <div className="border border-gray-600 rounded-lg bg-gray-900">
                <div className="custom-scrollbar scroll-preview">
                  <div className="p-2 sm:p-4 prose prose-invert max-w-none prose-sm sm:prose-base">
                    <EnhancedMarkdownRenderer 
                      content={markdownContent}
                      className="text-gray-100"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Raw Editor Content */}
            <div>
              <h4 className="text-green-400 font-semibold mb-2">Raw Editor</h4>
              <div className="border border-gray-600 rounded-lg bg-gray-900">
                <textarea
                  value={markdownContent}
                  onChange={(e) => {
                    setMarkdownContent(e.target.value)
                    onContentChange?.(e.target.value)
                  }}
                  className="w-full bg-gray-900 text-gray-100 text-sm font-mono border-none outline-none p-4 custom-scrollbar stacked-textarea"
                  placeholder="Edit raw markdown here..."
                />
              </div>
            </div>

            {/* Preview Section */}
            <div>
              <h4 className="text-green-400 font-semibold mb-2">Preview</h4>
              <div className="border border-gray-600 rounded-lg bg-gray-900">
                <div className="custom-scrollbar stacked-preview">
                  <div className="p-4 prose prose-invert max-w-none">
                    <EnhancedMarkdownRenderer 
                      content={markdownContent}
                      className="text-gray-100"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Submit Button for Blog Submission */}
      {onSubmitArticle && !readOnly && (
        <div className="flex justify-end mt-6">
          <Button
            type="button"
            className="button-epic"
            onClick={() => onSubmitArticle(markdownContent)}
            disabled={isSubmitting || !markdownContent.trim()}
          >
            <Send className="h-4 w-4 mr-2" />
            {isSubmitting ? 'Submitting...' : 'Submit Blog'}
          </Button>
        </div>
      )}
    </div>
    </>
  )
} 