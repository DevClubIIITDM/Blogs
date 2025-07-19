"use client"

import React, { useEffect, useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface MarkdownRendererProps {
  content: string
  className?: string
}

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  const [renderedContent, setRenderedContent] = useState<string>('')

  useEffect(() => {
    const renderMarkdown = async () => {
      try {
        // Basic markdown to HTML conversion
        let html = content
          // Headers
          .replace(/^### (.*$)/gim, '<h3 class="text-2xl font-bold text-white mb-4 mt-6">$1</h3>')
          .replace(/^## (.*$)/gim, '<h2 class="text-3xl font-bold text-white mb-4 mt-8">$1</h2>')
          .replace(/^# (.*$)/gim, '<h1 class="text-4xl font-bold text-white mb-6 mt-8">$1</h1>')
          
          // Bold and italic
          .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-white">$1</strong>')
          .replace(/\*(.*?)\*/g, '<em class="italic text-white/90">$1</em>')
          
          // Links
          .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">$1</a>')
          
          // Lists
          .replace(/^\* (.*$)/gim, '<li class="text-white/90 mb-1">$1</li>')
          .replace(/^\d+\. (.*$)/gim, '<li class="text-white/90 mb-1">$1</li>')
          
          // Code blocks with language detection
          .replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
            const language = lang || 'text'
            return `<div class="my-6"><pre class="rounded-lg overflow-x-auto"><code class="language-${language}">${code.trim()}</code></pre></div>`
          })
          
          // Inline code
          .replace(/`([^`]+)`/g, '<code class="bg-white/10 text-white px-2 py-1 rounded text-sm font-mono">$1</code>')
          
          // Paragraphs
          .replace(/\n\n/g, '</p><p class="text-white/90 leading-relaxed mb-4">')
          
          // Line breaks
          .replace(/\n/g, '<br>')

        // Wrap in paragraph tags
        html = `<p class="text-white/90 leading-relaxed mb-4">${html}</p>`
        
        // Clean up empty paragraphs
        html = html.replace(/<p class="text-white\/90 leading-relaxed mb-4"><\/p>/g, '')
        
        setRenderedContent(html)
      } catch (error) {
        console.error('Error rendering markdown:', error)
        setRenderedContent(`<p class="text-white/90">${content}</p>`)
      }
    }

    renderMarkdown()
  }, [content])

  return (
    <div 
      className={`markdown-content ${className}`}
      dangerouslySetInnerHTML={{ __html: renderedContent }}
    />
  )
}

// Enhanced markdown renderer with syntax highlighting
export function EnhancedMarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  const [renderedContent, setRenderedContent] = useState<React.ReactElement[]>([])

  useEffect(() => {
    const renderMarkdown = () => {
      const lines = content.split('\n')
      const elements: React.ReactElement[] = []
      let currentList: string[] = []
      let inCodeBlock = false
      let codeBlockContent = ''
      let codeBlockLanguage = ''

      const flushList = () => {
        if (currentList.length > 0) {
          elements.push(
            <ul key={`list-${elements.length}`} className="list-disc list-inside text-white/90 mb-4 space-y-1">
              {currentList.map((item, index) => (
                <li key={index} className="text-white/90">{item}</li>
              ))}
            </ul>
          )
          currentList = []
        }
      }

      const flushCodeBlock = () => {
        if (codeBlockContent) {
          elements.push(
            <div key={`code-${elements.length}`} className="my-6">
              <SyntaxHighlighter
                language={codeBlockLanguage || 'text'}
                style={tomorrow}
                customStyle={{
                  margin: 0,
                  borderRadius: '8px',
                  fontSize: '14px',
                  lineHeight: '1.5'
                }}
              >
                {codeBlockContent.trim()}
              </SyntaxHighlighter>
            </div>
          )
          codeBlockContent = ''
          codeBlockLanguage = ''
        }
      }

      lines.forEach((line, index) => {
        // Handle code blocks
        if (line.startsWith('```')) {
          if (inCodeBlock) {
            flushCodeBlock()
            inCodeBlock = false
          } else {
            flushList()
            inCodeBlock = true
            codeBlockLanguage = line.slice(3).trim()
          }
          return
        }

        if (inCodeBlock) {
          codeBlockContent += line + '\n'
          return
        }

        // Handle headers
        if (line.startsWith('# ')) {
          flushList()
          elements.push(
            <h1 key={`h1-${index}`} className="text-4xl font-bold text-white mb-6 mt-8">
              {line.slice(2)}
            </h1>
          )
          return
        }

        if (line.startsWith('## ')) {
          flushList()
          elements.push(
            <h2 key={`h2-${index}`} className="text-3xl font-bold text-white mb-4 mt-8">
              {line.slice(3)}
            </h2>
          )
          return
        }

        if (line.startsWith('### ')) {
          flushList()
          elements.push(
            <h3 key={`h3-${index}`} className="text-2xl font-bold text-white mb-4 mt-6">
              {line.slice(4)}
            </h3>
          )
          return
        }

        // Handle lists
        if (line.startsWith('* ') || line.startsWith('- ')) {
          currentList.push(line.slice(2))
          return
        }

        if (/^\d+\. /.test(line)) {
          currentList.push(line.replace(/^\d+\. /, ''))
          return
        }

        // Handle empty lines
        if (line.trim() === '') {
          flushList()
          return
        }

        // Handle regular paragraphs
        flushList()
        let processedLine = line
          .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-white">$1</strong>')
          .replace(/\*(.*?)\*/g, '<em class="italic text-white/90">$1</em>')
          .replace(/`([^`]+)`/g, '<code class="bg-white/10 text-white px-2 py-1 rounded text-sm font-mono">$1</code>')
          .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">$1</a>')

        elements.push(
          <p key={`p-${index}`} className="text-white/90 leading-relaxed mb-4" 
             dangerouslySetInnerHTML={{ __html: processedLine }} />
        )
      })

      flushList()
      flushCodeBlock()
      setRenderedContent(elements)
    }

    renderMarkdown()
  }, [content])

  return (
    <div className={`markdown-content ${className}`}>
      {renderedContent}
    </div>
  )
} 