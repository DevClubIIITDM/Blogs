# GitHub Pages Deployment Guide

## Prerequisites
- GitHub account
- Git installed on your machine

## Steps to Deploy

### 1. Create GitHub Repository
1. Go to [GitHub](https://github.com) and create a new repository
2. Name it `tech-club-blog` (or your preferred name)
3. Make it public (required for free GitHub Pages)

### 2. Initialize Git and Push to GitHub
```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit"

# Add remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/tech-club-blog.git

# Push to GitHub
git push -u origin main
```

### 3. Deploy to GitHub Pages
```bash
# Install dependencies (if not already done)
pnpm install

# Deploy to GitHub Pages
pnpm run deploy
```

### 4. Configure GitHub Pages
1. Go to your repository on GitHub
2. Click on "Settings" tab
3. Scroll down to "Pages" section
4. Under "Source", select "Deploy from a branch"
5. Select "gh-pages" branch
6. Click "Save"

### 5. Access Your Site
Your site will be available at:
`https://YOUR_USERNAME.github.io/tech-club-blog/`

## Important Notes

- The site will be available at `https://YOUR_USERNAME.github.io/tech-club-blog/` (not just `github.io`)
- Make sure to replace `YOUR_USERNAME` with your actual GitHub username
- The `basePath` in `next.config.mjs` is set to `/tech-club-blog` for production
- If you change the repository name, update the `basePath` in `next.config.mjs`

## Troubleshooting

### If deployment fails:
1. Check that all dependencies are installed: `pnpm install`
2. Ensure the build works locally: `pnpm run build`
3. Check GitHub repository settings
4. Verify the repository name matches the `basePath` in config

### If images don't load:
- Make sure all images are in the `public/` directory
- Check that image paths are correct in your components

## Updating the Site
To update your site after making changes:
```bash
git add .
git commit -m "Update site"
git push
pnpm run deploy
``` 