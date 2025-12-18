# Deployment Guide for Vercel

## Step 1: Initialize Git Repository

Run these commands in your terminal:

```bash
cd "/Users/yaozhou/My Portfolio"
git init
git add .
git commit -m "Initial commit - Portfolio ready for deployment"
```

## Step 2: Create GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the "+" icon in the top right → "New repository"
3. Name it (e.g., "portfolio" or "my-portfolio")
4. **Don't** initialize with README, .gitignore, or license (we already have these)
5. Click "Create repository"

## Step 3: Push to GitHub

After creating the repo, GitHub will show you commands. Run:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

(Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub username and repo name)

## Step 4: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up or log in (use "Continue with GitHub" for easiest setup)
3. Click "Add New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Next.js settings:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (leave as is)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)
6. Click "Deploy"

## Step 5: Add Custom Domain

1. In your Vercel project dashboard, go to **Settings** → **Domains**
2. Enter your custom domain (e.g., `yaozhou.me` or `www.yaozhou.me`)
3. Follow Vercel's DNS instructions:
   - Add an **A record** pointing to Vercel's IP (they'll provide it)
   - OR add a **CNAME record** pointing to `cname.vercel-dns.com`
4. Wait for DNS propagation (can take a few minutes to 48 hours)
5. Vercel will automatically provision SSL certificates

## Notes

- Vercel will automatically rebuild on every push to your main branch
- Your site will be live at a `*.vercel.app` URL immediately (you can share this while setting up custom domain)
- All builds happen on Vercel's servers, so local build issues won't affect deployment

