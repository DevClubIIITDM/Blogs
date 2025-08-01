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
  Save
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

  // Debug logging for scrolling issues
  useEffect(() => {
    console.log('🔍 Debug Info:')
    console.log('Content length:', markdownContent.length)
    console.log('Content lines:', markdownContent.split('\n').length)
    console.log('Is mounted:', isMounted)
    console.log('Is side by side:', isSideBySide)
    console.log('Preview mode:', previewMode)
  }, [markdownContent, isMounted, isSideBySide, previewMode])

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
        
        /* Ensure proper scrolling */
        .scrollable-container {
          height: 100% !important;
          overflow-y: auto !important;
          overflow-x: hidden !important;
        }
        
        /* Textarea scrolling */
        textarea.custom-scrollbar {
          height: 100% !important;
          min-height: 200px !important;
          overflow-y: auto !important;
        }
      `}</style>
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
      <div className="flex-1 p-6 space-y-4 overflow-hidden">
        {/* Toolbar */}
        {!readOnly && (
          <div className="flex flex-wrap gap-2 p-2 bg-gray-700 rounded-lg border border-gray-600">
            <Button
              size="sm"
              variant={editor.isActive('bold') ? 'default' : 'outline'}
              onClick={() => editor.chain().focus().toggleBold().run()}
              className="border-gray-600 text-gray-200 hover:bg-gray-600"
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant={editor.isActive('italic') ? 'default' : 'outline'}
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className="border-gray-600 text-gray-200 hover:bg-gray-600"
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant={editor.isActive('heading', { level: 1 }) ? 'default' : 'outline'}
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className="border-gray-600 text-gray-200 hover:bg-gray-600"
            >
              <Heading1 className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant={editor.isActive('heading', { level: 2 }) ? 'default' : 'outline'}
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className="border-gray-600 text-gray-200 hover:bg-gray-600"
            >
              <Heading2 className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant={editor.isActive('heading', { level: 3 }) ? 'default' : 'outline'}
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              className="border-gray-600 text-gray-200 hover:bg-gray-600"
            >
              <Heading3 className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant={editor.isActive('bulletList') ? 'default' : 'outline'}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className="border-gray-600 text-gray-200 hover:bg-gray-600"
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant={editor.isActive('orderedList') ? 'default' : 'outline'}
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className="border-gray-600 text-gray-200 hover:bg-gray-600"
            >
              <ListOrdered className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant={editor.isActive('blockquote') ? 'default' : 'outline'}
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className="border-gray-600 text-gray-200 hover:bg-gray-600"
            >
              <Quote className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                const url = window.prompt('Enter URL')
                if (url) {
                  editor.chain().focus().setLink({ href: url }).run()
                }
              }}
              className="border-gray-600 text-gray-200 hover:bg-gray-600"
            >
              <LinkIcon className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Action Buttons */}
        {!readOnly && (
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => document.getElementById('markdown-import')?.click()}
              className="border-blue-400/30 text-blue-300 hover:bg-blue-500/20"
            >
              <Upload className="h-4 w-4 mr-1" />
              Import .md
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleExportMarkdown}
              className="border-green-400/30 text-green-300 hover:bg-green-500/20"
            >
              <Download className="h-4 w-4 mr-1" />
              Export .md
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsSideBySide(!isSideBySide)}
              className="border-purple-400/30 text-purple-300 hover:bg-purple-500/20"
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
            <Button
              size="sm"
              onClick={handleSaveContent}
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
            >
              <Save className="h-4 w-4 mr-1" />
              {isSubmitting ? 'Submitting...' : 'Save'}
            </Button>
            
          </div>
        )}

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0 h-full">
            {/* Raw Editor Content */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-green-400 font-semibold">Raw Editor</h4>
              </div>
              <div className="flex-1 border border-gray-600 rounded-lg overflow-hidden bg-gray-900 flex flex-col">
                                  <textarea
                    value={markdownContent}
                    onChange={(e) => {
                      setMarkdownContent(e.target.value)
                      onContentChange?.(e.target.value)
                    }}
                    onScroll={(e) => {
                      console.log('📜 Textarea scroll event:', {
                        scrollTop: e.currentTarget.scrollTop,
                        scrollHeight: e.currentTarget.scrollHeight,
                        clientHeight: e.currentTarget.clientHeight,
                        maxScroll: e.currentTarget.scrollHeight - e.currentTarget.clientHeight
                      })
                    }}
                    onLoad={(e) => {
                      console.log('📝 Textarea loaded:', {
                        scrollHeight: e.currentTarget.scrollHeight,
                        clientHeight: e.currentTarget.clientHeight,
                        offsetHeight: e.currentTarget.offsetHeight
                      })
                    }}
                    className="flex-1 bg-gray-900 text-gray-100 text-sm font-mono whitespace-pre-wrap border-none outline-none resize-none p-4 overflow-y-auto custom-scrollbar"
                    placeholder="Edit raw markdown here..."
                  />
              </div>
            </div>

            {/* Preview Section */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-green-400 font-semibold">Preview</h4>
              </div>
              <div className="flex-1 border border-gray-600 rounded-lg overflow-hidden bg-gray-900 flex flex-col">
                <div 
                  className="flex-1 overflow-y-auto custom-scrollbar scrollable-container"
                  onScroll={(e) => {
                    console.log('📜 Preview scroll event:', {
                      scrollTop: e.currentTarget.scrollTop,
                      scrollHeight: e.currentTarget.scrollHeight,
                      clientHeight: e.currentTarget.clientHeight,
                      maxScroll: e.currentTarget.scrollHeight - e.currentTarget.clientHeight
                    })
                  }}
                  ref={(el) => {
                    if (el) {
                      console.log('📖 Preview container loaded:', {
                        scrollHeight: el.scrollHeight,
                        clientHeight: el.clientHeight,
                        offsetHeight: el.offsetHeight,
                        style: el.style.cssText
                      })
                    }
                  }}
                >
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
        ) : (
          <div className="space-y-4">
            {/* Raw Editor Content */}
            <div>
              <h4 className="text-green-400 font-semibold mb-2">Raw Editor</h4>
              <div className="border border-gray-600 rounded-lg overflow-hidden bg-gray-900">
                <textarea
                  value={markdownContent}
                  onChange={(e) => {
                    setMarkdownContent(e.target.value)
                    onContentChange?.(e.target.value)
                  }}
                  onScroll={(e) => {
                    console.log('📜 Stacked Textarea scroll event:', {
                      scrollTop: e.currentTarget.scrollTop,
                      scrollHeight: e.currentTarget.scrollHeight,
                      clientHeight: e.currentTarget.clientHeight,
                      maxScroll: e.currentTarget.scrollHeight - e.currentTarget.clientHeight
                    })
                  }}
                  onLoad={(e) => {
                    console.log('📝 Stacked Textarea loaded:', {
                      scrollHeight: e.currentTarget.scrollHeight,
                      clientHeight: e.currentTarget.clientHeight,
                      offsetHeight: e.currentTarget.offsetHeight
                    })
                  }}
                  className="w-full min-h-[400px] bg-gray-900 text-gray-100 text-sm font-mono whitespace-pre-wrap border-none outline-none resize-none p-4 overflow-y-auto custom-scrollbar"
                  placeholder="Edit raw markdown here..."
                />
              </div>
            </div>

            {/* Preview Section */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-green-400 font-semibold">Preview</h4>
              </div>
              <div className="border border-gray-600 rounded-lg overflow-hidden bg-gray-900">
                <div 
                  className="min-h-[400px] overflow-y-auto custom-scrollbar scrollable-container"
                  onScroll={(e) => {
                    console.log('📜 Stacked Preview scroll event:', {
                      scrollTop: e.currentTarget.scrollTop,
                      scrollHeight: e.currentTarget.scrollHeight,
                      clientHeight: e.currentTarget.clientHeight,
                      maxScroll: e.currentTarget.scrollHeight - e.currentTarget.clientHeight
                    })
                  }}
                  ref={(el) => {
                    if (el) {
                      console.log('📖 Stacked Preview container loaded:', {
                        scrollHeight: el.scrollHeight,
                        clientHeight: el.clientHeight,
                        offsetHeight: el.offsetHeight,
                        style: el.style.cssText
                      })
                    }
                  }}
                >
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
    </div>
    </>
  )
} 