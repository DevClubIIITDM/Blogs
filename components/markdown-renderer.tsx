"use client"

import React, { useEffect, useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'

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
          // Bold and italic (process first to handle them in headers)
          .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-100">$1</strong>')
          .replace(/\*(.*?)\*/g, '<em class="italic text-gray-100/90">$1</em>')
          
          // Headers (process after bold/italic to handle them within headers)
          .replace(/^### (.*$)/gim, '<h3 class="text-2xl font-bold text-gray-100 mb-4 mt-6">$1</h3>')
          .replace(/^## (.*$)/gim, '<h2 class="text-3xl font-bold text-gray-100 mb-4 mt-8">$1</h2>')
          .replace(/^# (.*$)/gim, '<h1 class="text-4xl font-bold text-gray-100 mb-6 mt-8">$1</h1>')
          
          // Links
          .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">$1</a>')
          
                     // Lists
           .replace(/^\* (.*$)/gim, '<li class="text-gray-100/90 mb-1">$1</li>')
           .replace(/^- (.*$)/gim, '<li class="text-gray-100/90 mb-1">$1</li>')
           .replace(/^\d+\. (.*$)/gim, '<li class="text-gray-100/90 mb-1">$1</li>')
          
          // Code blocks with language detection
          .replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
            const language = lang || 'text'
            return `<div class="my-6"><pre class="rounded-lg overflow-x-auto"><code class="language-${language}">${code.trim()}</code></pre></div>`
          })
          
          // Inline code
          .replace(/`([^`]+)`/g, '<code class="bg-gray-700 text-gray-100 px-2 py-1 rounded text-sm font-mono">$1</code>')
          
          // Paragraphs
          .replace(/\n\n/g, '</p><p class="text-gray-100/90 leading-relaxed mb-4">')
          
          // Line breaks
          .replace(/\n/g, '<br>')

        // Wrap in paragraph tags
        html = `<p class="text-gray-100/90 leading-relaxed mb-4">${html}</p>`
        
        // Clean up empty paragraphs
        html = html.replace(/<p class="text-gray-100\/90 leading-relaxed mb-4"><\/p>/g, '')
        
        setRenderedContent(html)
      } catch (error) {
        console.error('Error rendering markdown:', error)
        setRenderedContent(`<p class="text-gray-100/90">${content}</p>`)
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

// Enhanced markdown renderer with full GFM support
export function EnhancedMarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  const [renderedContent, setRenderedContent] = useState<string>('')

  useEffect(() => {
    const renderMarkdown = async () => {
      try {
        // Use remark with GFM for proper markdown parsing
        const processedContent = await remark()
          .use(remarkGfm) // GitHub Flavored Markdown support
          .use(remarkHtml, { sanitize: false }) // Allow HTML but be careful with XSS
          .process(content)
        
        let html = processedContent.toString()

        // Apply custom styling to parsed HTML
        html = html
          // Headers
          .replace(/<h1>/g, '<h1 class="text-4xl font-bold text-gray-100 mb-6 mt-8">')
          .replace(/<h2>/g, '<h2 class="text-3xl font-bold text-gray-100 mb-4 mt-8">')
          .replace(/<h3>/g, '<h3 class="text-2xl font-bold text-gray-100 mb-4 mt-6">')
          .replace(/<h4>/g, '<h4 class="text-xl font-bold text-gray-100 mb-3 mt-5">')
          .replace(/<h5>/g, '<h5 class="text-lg font-bold text-gray-100 mb-2 mt-4">')
          .replace(/<h6>/g, '<h6 class="text-base font-bold text-gray-100 mb-2 mt-3">')
          
          // Paragraphs
          .replace(/<p>/g, '<p class="text-gray-100/90 leading-relaxed mb-4">')
          
          // Links
          .replace(/<a href="/g, '<a href="')
          .replace(/<a /g, '<a class="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer" ')
          
          // Strong and emphasis
          .replace(/<strong>/g, '<strong class="font-bold text-gray-100">')
          .replace(/<em>/g, '<em class="italic text-gray-100/90">')
          
          // Inline code
          .replace(/<code>/g, '<code class="bg-gray-700 text-gray-100 px-2 py-1 rounded text-sm font-mono">')
          
          // Lists
          .replace(/<ul>/g, '<ul class="list-disc list-inside text-gray-100/90 mb-4 space-y-1 ml-4">')
          .replace(/<ol>/g, '<ol class="list-decimal list-inside text-gray-100/90 mb-4 space-y-1 ml-4">')
          .replace(/<li>/g, '<li class="text-gray-100/90">')
          
          // Blockquotes
          .replace(/<blockquote>/g, '<blockquote class="border-l-4 border-blue-400 pl-4 my-4 italic text-gray-100/80">')
          
          // Tables
          .replace(/<table>/g, '<table class="min-w-full border-collapse border border-gray-600 mb-4">')
          .replace(/<th>/g, '<th class="border border-gray-600 px-4 py-2 bg-gray-700 text-gray-100 font-bold text-left">')
          .replace(/<td>/g, '<td class="border border-gray-600 px-4 py-2 text-gray-100/90">')
          .replace(/<thead>/g, '<thead class="bg-gray-700">')
          .replace(/<tbody>/g, '<tbody class="bg-gray-800">')
          
          // Horizontal rules
          .replace(/<hr>/g, '<hr class="border-gray-600 my-8">')
          .replace(/<hr\/>/g, '<hr class="border-gray-600 my-8" />')
          
          // Strikethrough (from GFM)
          .replace(/<del>/g, '<del class="line-through text-gray-100/70">')

        // Handle code blocks with syntax highlighting
        html = html.replace(/<pre><code class="language-(\w+)">([\s\S]*?)<\/code><\/pre>/g, (match, lang, code) => {
          // Decode HTML entities in code
          const decodedCode = code
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&amp;/g, '&')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")

          return `<div class="my-6 code-block" data-language="${lang}" data-code="${encodeURIComponent(decodedCode)}"></div>`
        })

        // Handle plain code blocks
        html = html.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/g, (match, code) => {
          const decodedCode = code
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&amp;/g, '&')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")

          return `<div class="my-6 code-block" data-language="text" data-code="${encodeURIComponent(decodedCode)}"></div>`
        })

        // Sanitize potential XSS while keeping safe HTML
        html = html
          .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
          .replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, '')
          .replace(/on\w+="[^"]*"/gi, '')
          .replace(/javascript:/gi, '')

        setRenderedContent(html)
      } catch (error) {
        console.error('Error rendering markdown:', error)
        setRenderedContent(`<p class="text-gray-100/90">${content}</p>`)
      }
    }

    renderMarkdown()
  }, [content])

  // Add code syntax highlighting after HTML is rendered
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const timer = setTimeout(() => {
        const codeBlocks = document.querySelectorAll('.code-block')
        codeBlocks.forEach((block) => {
          const language = block.getAttribute('data-language') || 'text'
          const code = decodeURIComponent(block.getAttribute('data-code') || '')
          
          if (code && !block.querySelector('pre')) {
            const pre = document.createElement('pre')
            pre.style.margin = '0'
            pre.style.borderRadius = '8px'
            pre.style.fontSize = '14px'
            pre.style.lineHeight = '1.5'
            pre.style.background = '#2d3748'
            pre.style.color = '#e2e8f0'
            pre.style.padding = '1rem'
            pre.style.overflowX = 'auto'
            
            const codeElement = document.createElement('code')
            codeElement.textContent = code
            codeElement.className = `language-${language}`
            
            pre.appendChild(codeElement)
            block.innerHTML = ''
            block.appendChild(pre)
          }
        })
      }, 100)
      
      return () => clearTimeout(timer)
    }
  }, [renderedContent])

  return (
    <div 
      className={`markdown-content ${className} prose prose-invert max-w-none`}
      dangerouslySetInnerHTML={{ __html: renderedContent }}
    />
  )
} 