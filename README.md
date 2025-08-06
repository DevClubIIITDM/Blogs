# Developers Blog

A modern, community-driven blog platform built with Next.js 15, designed for tech enthusiasts, developers, and innovators to share knowledge, insights, and connect with fellow developers.

## **Features**

### **Core Functionality**
- 📝 **Article Submission System** - Community members can submit articles through a rich editor
- 👤 **User Authentication** - Secure authentication powered by Clerk
- 🎨 **Rich Text Editor** - TipTap editor with markdown support for article creation
- 📱 **Responsive Design** - Mobile-first design with beautiful UI components
- 🌙 **Dark/Light Theme** - Theme switching with next-themes
- 📊 **Admin Dashboard** - Article review and management system
- 🔍 **Content Filtering** - Filter articles by categories and tags
- 📖 **Markdown Rendering** - Full markdown support with syntax highlighting

### **Technical Features**
- ⚡ **Next.js 15** - Latest Next.js with App Router
- 🎯 **TypeScript** - Full type safety
- 💅 **Tailwind CSS** - Modern styling with custom animations
- 🧩 **Radix UI** - Accessible UI components
- 🔐 **Middleware Protection** - Route protection and authentication
- 📁 **File Upload** - Support for markdown file uploads
- 🎭 **Component Library** - Reusable UI components

## **Tech Stack**

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Authentication**: Clerk
- **Editor**: TipTap
- **Markdown**: remark, gray-matter
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod

## **Getting Started**

### **Prerequisites**
- Node.js 18+ 
- npm, yarn, or pnpm

### **Installation**

1. **Clone the repository**
```bash
git clone <repository-url>
cd Blog
```

2. **Install dependencies**
```bash
> npm install
# or
> pnpm install
# or
> yarn install
```

3. **Set up environment variables**
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

4. **Run the development server**
```bash
> npm run dev
# or
> pnpm dev
# or
> yarn dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## **Project Structure**

```
Blogs/
├── app/                    # Next.js 15 App Router
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   ├── blog/              # Blog pages
│   ├── contact/           # Contact page
│   ├── login/             # Login page
│   ├── write-for-us/      # Article submission
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── ui/               # UI component library
│   ├── navbar.tsx        # Navigation component
│   ├── footer.tsx        # Footer component
│   └── ...               # Other components
├── data/                 # JSON data files
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Static assets
└── styles/               # Global styles
```

## **Available Scripts**

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## **Key Features Explained**

### **Article Submission**
- Users can submit articles through the "Write for Us" page
- Supports both file upload (.md files) and rich text editor
- Form validation with proper error handling
- Preview functionality for markdown content

### **Authentication**
- Clerk-based authentication system
- Protected routes with middleware
- User role management
- IIITDM email validation for submissions

### **Content Management**
- Admin approval system for submitted articles
- JSON-based storage for articles and submissions
- Category and tag-based organization
- Featured posts highlighting

### **UI/UX**
- Modern, responsive design
- Dark/light theme toggle
- Smooth animations and transitions
- Accessible components with Radix UI
- Mobile-optimized interface

## **Configuration**

### **Tailwind CSS**
The project uses a custom Tailwind configuration with:
- Custom color schemes
- Animation utilities
- Typography settings
- Responsive breakpoints

### **TypeScript**
Strict TypeScript configuration for:
- Type safety
- Better developer experience
- Improved code quality

## **Deployment**

### **Vercel (Recommended)**
```bash
> npm install -g vercel
> vercel
```

### **Other Platforms**
```bash
> npm run build
> npm run start
```

## **Environment Variables**

Required environment variables:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk public key
- `CLERK_SECRET_KEY` - Clerk secret key

## **Contributing**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## **License**

This project is licensed under the MIT License.

## **Support**

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

