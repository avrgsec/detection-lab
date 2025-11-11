# Detection Lab v2.0 - Setup & Deployment Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Git installed
- GitHub account

### Installation Steps

1. **Extract the project files** to your local machine

2. **Install dependencies:**
```bash
cd detection-lab-v2
npm install
```

3. **Start development server:**
```bash
npm run dev
```

Visit `http://localhost:4321` to see your site!

---

## 📁 Project Structure

```
detection-lab-v2/
├── src/
│   ├── pages/              # All routes
│   ├── layouts/            # Page layouts
│   ├── components/         # Reusable components
│   └── content/            # Your content
│       ├── detections/     # YAML detection files
│       ├── blog/           # Markdown blog posts
│       └── work/           # Project writeups
├── public/                 # Static assets
├── astro.config.mjs        # Astro configuration
├── tailwind.config.cjs     # Styling configuration
└── package.json            # Dependencies
```

---

## 📝 Adding Content

### Adding Detections

1. Copy your existing YAML files to `src/content/detections/[os]/`
   - Example: `src/content/detections/macos/launchd-persistence.yml`

2. Ensure YAML format matches:
```yaml
title: Detection Name
id: unique-id
status: stable
description: What this detects
author: avrgsec
date: 2025-01-15
tags:
  - attack.t1543.004
  - attack.persistence
logsource:
  category: process_creation
  product: macos
detection:
  # Your detection logic
falsepositives:
  - Known false positives
level: medium
references:
  - https://example.com
```

3. Pages auto-generate! Just add the file and it appears.

### Adding Blog Posts

1. Create a new `.md` file in `src/content/blog/`
   - Example: `src/content/blog/my-post.md`

2. Add frontmatter:
```markdown
---
title: "Your Post Title"
description: "Brief description"
date: 2025-01-15
tags: ["detection-engineering", "splunk"]
draft: false
---

Your content here in Markdown...

## Subheading

- Bullet points
- Code blocks
- Images all supported!
```

3. Write your content in Markdown below the frontmatter

### Adding Projects

1. Create `.md` file in `src/content/work/`
2. Add frontmatter:
```markdown
---
title: "Project Name"
description: "Brief description"
order: 1
link: "https://github.com/..."
---

Detailed project description...
```

---

## 🎨 Customization

### Changing Colors

Edit `tailwind.config.cjs`:

```javascript
colors: {
  'bg-primary': '#0a0a0a',      // Main background
  'bg-secondary': '#1a1a1a',    // Cards/sections
  'border': '#2a2a2a',          // Borders
  'text-primary': '#ffffff',     // Main text
  'text-secondary': '#999999',   // Secondary text
  'accent': '#666666',           // Hover states
}
```

### Changing Site Info

Edit `astro.config.mjs`:
```javascript
site: 'https://yourdomain.com',
base: '/',  // or '/detection-lab' for GitHub Pages
```

### Changing Navigation

Edit `src/layouts/BaseLayout.astro` - find the `<nav>` section

---

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repo
5. Vercel auto-detects Astro
6. Click "Deploy"

**Done!** Your site is live with auto-deploys on push.

### Option 2: GitHub Pages

1. Update `astro.config.mjs`:
```javascript
site: 'https://avrgsec.github.io',
base: '/detection-lab',
```

2. Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        run: npm run build
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

3. Push to GitHub
4. Go to repo Settings → Pages
5. Source: GitHub Actions
6. Wait for deploy to complete

### Option 3: Netlify

1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect GitHub
5. Build settings auto-detect
6. Deploy!

---

## 🔧 Development Workflow

### Local Development
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Adding New Detection
1. Add YAML file to `src/content/detections/[os]/`
2. Refresh browser
3. New detection appears automatically

### Writing Blog Post
1. Create `.md` file in `src/content/blog/`
2. Add frontmatter
3. Write content
4. Refresh browser

### Publishing Changes
1. `git add .`
2. `git commit -m "Add new detection"`
3. `git push`
4. Site auto-deploys (if using Vercel/Netlify)

---

## 📊 Content Examples

### Example Detection YAML

Your existing format works! Just copy your current detections from:
`detections/macos/*.yml` → `src/content/detections/macos/*.yml`

### Example Blog Post

```markdown
---
title: "Testing macOS LaunchDaemon Persistence Detection"
description: "How I validated a detection rule in a live lab environment"
date: 2025-01-20
tags: ["macos", "persistence", "testing"]
---

# Testing macOS LaunchDaemon Persistence Detection

Today I'm testing my LaunchDaemon persistence detection rule...

## The Setup

I created a test environment with:
- macOS VM
- Splunk Universal Forwarder
- Sysmon for macOS

## The Attack

\`\`\`bash
# Creating malicious LaunchDaemon
sudo cp malware.plist /Library/LaunchDaemons/
\`\`\`

## The Detection

The rule fired successfully! Here's what it caught...

## Lessons Learned

- False positive from Homebrew
- Need to refine filter
- Added to false positives list
```

---

## 🎯 Migration from Current Site

### Step-by-Step Migration

1. **Copy detections:**
```bash
cp -r ../detection-lab/detections/* src/content/detections/
```

2. **No changes needed to YAML files!** They work as-is.

3. **Create blog posts** from any existing documentation

4. **Test locally:**
```bash
npm run dev
```

5. **Deploy** when ready

### What Gets Better

✅ Auto-generated pages from YAML
✅ Built-in blog system
✅ Better styling & UX
✅ Faster builds
✅ SEO optimized
✅ Mobile responsive
✅ Dark mode by default

---

## 🐛 Troubleshooting

### "Module not found" errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### Changes not showing
```bash
# Hard refresh browser (Ctrl+Shift+R)
# Or restart dev server
npm run dev
```

### Build fails
```bash
# Check for YAML syntax errors in detections
# Check frontmatter in blog posts
npm run build
```

---

## 📚 Resources

- [Astro Docs](https://docs.astro.build)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Sigma Specification](https://github.com/SigmaHQ/sigma-specification)
- [MITRE ATT&CK](https://attack.mitre.org)

---

## ✅ Checklist

Before deploying:
- [ ] All detections copied to `src/content/detections/`
- [ ] Created at least one blog post
- [ ] Updated About page with your info
- [ ] Tested locally with `npm run dev`
- [ ] Built successfully with `npm run build`
- [ ] Chosen deployment platform
- [ ] Pushed to GitHub
- [ ] Deployed!

---

## 🎉 You're Done!

Your Detection Lab v2.0 is ready to go!

**Need help?** 
- Check the Astro docs
- Review the component files for examples
- All code is commented

**Next steps:**
1. Add your detections
2. Write blog posts about testing
3. Share on Twitter
4. Watch it become a portfolio piece!
