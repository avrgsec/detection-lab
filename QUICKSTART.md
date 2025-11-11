# Detection Lab v2.0 - Quick Reference

## 🚀 Commands

```bash
npm install          # Install dependencies
npm run dev          # Start development (localhost:4321)
npm run build        # Build for production
npm run preview      # Preview production build
```

## 📁 File Locations

```
src/content/detections/[os]/    → Detection YAML files
src/content/blog/               → Blog posts (.md files)
src/content/work/               → Project writeups
src/pages/                      → Page templates
src/components/                 → Reusable components
src/layouts/                    → Layout wrappers
```

## ➕ Adding Content

### New Detection
1. Add `detection-name.yml` to `src/content/detections/[os]/`
2. Refresh browser - page auto-generates!

### New Blog Post
1. Create `post-name.md` in `src/content/blog/`
2. Add frontmatter:
```markdown
---
title: "Post Title"
description: "Description"
date: 2025-01-15
tags: ["tag1", "tag2"]
draft: false
---

Content here...
```

### New Project
1. Create `project.md` in `src/content/work/`
2. Add frontmatter with title, description, order, link

## 🎨 Customization

### Colors
Edit `tailwind.config.cjs` → colors section

### Navigation
Edit `src/layouts/BaseLayout.astro` → `<nav>` section

### Site Info
Edit `astro.config.mjs` → site and base

## 🌐 Deployment

### Vercel
1. Push to GitHub
2. Import project in Vercel
3. Auto-deploys on push

### GitHub Pages
1. Enable Pages in repo settings
2. Source: GitHub Actions
3. Push triggers auto-deploy

## 📝 Content Format

### Detection YAML
```yaml
title: Detection Name
id: uuid-here
status: stable
description: What it detects
author: avrgsec
date: 2025-01-15
tags:
  - attack.tXXXX
  - attack.tactic
logsource:
  category: process_creation
  product: macos
detection:
  # Your logic
falsepositives:
  - Known FPs
level: medium
references:
  - https://...
```

### Blog Post
```markdown
---
title: "Title"
description: "Description"
date: 2025-01-15
tags: ["tag"]
---

# Heading

Content with **markdown**...

## Code blocks work:
\`\`\`bash
echo "hello"
\`\`\`
```

## 🐛 Troubleshooting

### Port already in use
```bash
kill -9 $(lsof -ti:4321)
npm run dev
```

### Build fails
- Check YAML syntax in detections
- Check frontmatter in blog posts
- Run `npm run build` to see errors

### Changes not showing
- Hard refresh: Ctrl+Shift+R
- Restart dev server

## 🔗 URLs

Development: `http://localhost:4321`

Pages structure:
- `/` - Homepage
- `/detections` - All detections
- `/detections/[os]/[slug]` - Individual detection
- `/blog` - Blog listing
- `/blog/[slug]` - Individual post
- `/work` - Projects
- `/about` - About page

## ✅ Pre-Deploy Checklist

- [ ] Copy all detections to `src/content/detections/`
- [ ] Write at least one blog post
- [ ] Update About page
- [ ] Test: `npm run dev`
- [ ] Build: `npm run build`
- [ ] Push to GitHub
- [ ] Deploy!

## 📚 Quick Links

- [Astro Docs](https://docs.astro.build)
- [Tailwind Docs](https://tailwindcss.com)
- [Markdown Guide](https://www.markdownguide.org)
- [YAML Validator](https://www.yamllint.com)
