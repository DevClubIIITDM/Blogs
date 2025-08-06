# Edge Case Markdown Test File

This file contains various edge cases and complex markdown scenarios to test parsing capabilities.

## Table of Contents
- [Headers](#headers)
- [Text Formatting](#text-formatting)
- [Lists](#lists)
- [Code Blocks](#code-blocks)
- [Links and Images](#links-and-images)
- [Tables](#tables)
- [Special Characters](#special-characters)
- [Mixed Content](#mixed-content)

## Headers

# H1 with **bold** and *italic* text
## H2 with `inline code` and [link](https://example.com)
### H3 with ~~strikethrough~~ text
#### H4 with > blockquote syntax
##### H5 with | table | syntax |
###### H6 with multiple | pipes | and | special | chars |

### Headers with Special Characters
# Header with émojis 🚀 and unicode ñ
## Header with "quotes" and 'apostrophes'
### Header with <script>alert('xss')</script>
#### Header with [unclosed bracket
##### Header with )unopened parenthesis
###### Header with **unclosed bold

## Text Formatting

### Basic Formatting
**Bold text** and __also bold__
*Italic text* and _also italic_
***Bold and italic*** and ___also both___
~~Strikethrough text~~

### Nested Formatting
**Bold with *italic inside* bold**
*Italic with **bold inside** italic*
***All three with ~~strikethrough~~ inside***

### Edge Cases in Formatting
**Bold text with missing end
*Italic text with missing end
~~Strikethrough with missing end
**Bold text with ** double asterisks inside **
*Italic text with * single asterisk inside *

### Inline Code
`Simple inline code`
`Code with **bold** inside`
`Code with \`backticks\` inside`
``Code with `single backtick` inside``
```inline triple backticks```

## Lists

### Unordered Lists
- Item 1
- Item 2
  - Nested item 2.1
  - Nested item 2.2
    - Double nested 2.2.1
- Item 3

### Ordered Lists
1. First item
2. Second item
   1. Nested ordered 2.1
   2. Nested ordered 2.2
      1. Double nested 2.2.1
3. Third item

### Mixed Lists
1. Ordered item
   - Unordered nested
   - Another unordered
2. Another ordered
   1. Ordered nested
   - Mixed with unordered

### Lists with Complex Content
- Item with **bold** and *italic*
- Item with `inline code`
- Item with [link](https://example.com)
- Item with
  multiple lines
  continuing here
- Item with > blockquote inside

### Edge Cases in Lists
- Item with missing dash
+ Item with plus sign
* Item with asterisk
- Item with
no proper indentation
-Item with no space after dash
- Item with **unclosed bold
- Item with [unclosed bracket

## Code Blocks

### Basic Code Blocks
```
Plain code block
with multiple lines
and no language specified
```

### Language-Specific Code Blocks
```javascript
function testFunction() {
    console.log("Hello, World!");
    return true;
}

// Comment with special chars: éñü
const arrow = () => "ES6 syntax";
```

```python
def test_function():
    """Docstring with special chars: éñü"""
    print("Hello, World!")
    return True

# Comment
lambda x: x * 2
```

```sql
SELECT * FROM users 
WHERE name LIKE '%test%' 
  AND email IS NOT NULL;

-- Comment with special chars
CREATE TABLE test (
    id INT PRIMARY KEY,
    data VARCHAR(255)
);
```

### Edge Cases in Code Blocks
```
Code block with ``` backticks inside
```

````
Code block with four backticks
containing ```
triple backticks
````

```javascript
// Code with unclosed string
const str = "Hello
const valid = "World";
```

```
Code block with **markdown** formatting
*Should not* be processed
[Links](should-not-work)
```

## Links and Images

### Basic Links
[Simple link](https://example.com)
[Link with title](https://example.com "This is a title")
[Relative link](./relative-path)
[Email link](mailto:test@example.com)

### Reference Links
[Reference link][ref1]
[Another reference][ref2]

[ref1]: https://example.com "Reference 1"
[ref2]: https://example.com "Reference 2"

### Images
![Alt text](https://via.placeholder.com/150)
![Alt with title](https://via.placeholder.com/300 "Image title")
![Broken image](broken-link.jpg)

### Edge Cases
[Link with **bold** text](https://example.com)
[Link with `code` inside](https://example.com)
[Unclosed link bracket](https://example.com
[Link with (parentheses)](https://example.com)
[Link with "quotes"](https://example.com)

[Invalid reference][nonexistent]
![Image with [nested brackets]](image.jpg)

## Tables

### Basic Table
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |

### Table with Alignment
| Left | Center | Right |
|:-----|:------:|------:|
| L1   |   C1   |    R1 |
| L2   |   C2   |    R2 |

### Table with Complex Content
| Markdown | Code | Links |
|----------|------|-------|
| **Bold** | `code` | [Link](https://example.com) |
| *Italic* | ```block``` | ![Image](image.jpg) |
| ~~Strike~~ | `inline` | [Ref][ref1] |

### Edge Cases in Tables
| Uneven | columns |
|--------|---------|
| Too few | |
| Too many | cells | here | extra |

| Header |
|--------|
| Cell with | pipe | inside |
| Cell with "quotes" |
| Cell with \| escaped pipe |

## Special Characters

### HTML Entities
&lt; &gt; &amp; &quot; &#39; &nbsp;

### Unicode Characters
Émojis: 🚀 🎉 💻 📝 🌟
Accented: café, naïve, résumé
Math symbols: α β γ δ ∑ ∫ ∞
Currency: $ € ¥ £ ¢

### Escape Characters
\* \_ \` \# \[ \] \( \) \\ \|

### HTML Tags (Should be escaped)
<script>alert('xss')</script>
<div class="malicious">Content</div>
<img src="x" onerror="alert('xss')">

## Blockquotes

### Basic Blockquotes
> This is a blockquote
> with multiple lines

> Single line blockquote

### Nested Blockquotes
> Level 1 blockquote
> > Level 2 blockquote
> > > Level 3 blockquote

### Blockquotes with Content
> Blockquote with **bold** text
> 
> And `inline code`
> 
> - Even lists
> - Inside blockquotes

### Edge Cases
> Blockquote with
no proper continuation
> Missing space after >
>Another line without space
> Line with > multiple > arrows

## Horizontal Rules

---
***
___

Text before
---
Text after

## Mixed Content

### Complex Nested Structure
1. **Bold list item** with [link](https://example.com)
   - *Italic nested* with `code`
   - > Blockquote in list
     ```javascript
     // Code in blockquote in list
     console.log("Complex nesting");
     ```
2. Another item with ![image](test.jpg)

### Table with Complex Cells
| Column 1 | Column 2 |
|----------|----------|
| `code` with **bold** | > blockquote |
| - list<br>- items | ```<br>code<br>block<br>``` |

### Extreme Edge Cases
**Bold text with *italic and `code` inside* continuing bold**

[Link with **bold `code` text**](https://example.com "Title with 'quotes'")

> Blockquote with [link containing **bold** text](https://example.com)
> 
> ```javascript
> // Code in blockquote
> const markdown = "complex";
> ```

## Line Breaks and Spacing

Line with two spaces at end  
Should create line break

Line with backslash at end\
Should also create line break

Paragraph 1

Paragraph 2 with double line break

Paragraph 3


Paragraph 4 with triple line break

## Malformed Markdown

### Unclosed Elements
**Bold text without closing
*Italic text without closing
`Code without closing
[Link without closing
![Image without closing

### Invalid Syntax
### Header with no space
###Invalid header
[](Empty link)
![](Empty image)
[]()
![]()

## Performance Test

### Large Content Block
```
This is a very long code block with lots of content to test performance and rendering capabilities. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
```

### Repeated Elements
1. Item 1
2. Item 2
3. Item 3
4. Item 4
5. Item 5
6. Item 6
7. Item 7
8. Item 8
9. Item 9
10. Item 10
11. Item 11
12. Item 12
13. Item 13
14. Item 14
15. Item 15
16. Item 16
17. Item 17
18. Item 18
19. Item 19
20. Item 20

---

## Conclusion

This edge case file tests:
- ✅ Header variations and special characters
- ✅ Text formatting combinations and edge cases
- ✅ List nesting and mixed types
- ✅ Code block languages and content
- ✅ Link and image variations
- ✅ Table formatting and alignment
- ✅ Special characters and HTML escaping
- ✅ Blockquote nesting
- ✅ Mixed complex content
- ✅ Malformed markdown handling
- ✅ Performance with large content

Use this file to test markdown parsing robustness and identify potential issues in rendering or security vulnerabilities.