# Migrating from Detection Lab v1 to v2.0

## 🎯 Overview

Moving from your current GitHub Pages site to Detection Lab v2.0 is straightforward:
- Your YAML files work as-is (no changes needed!)
- You gain a blog system
- Better design & UX
- Faster builds
- Same GitHub hosting (if desired)

## 📋 Migration Steps

### 1. Setup New Site Locally

```bash
# Extract detection-lab-v2 folder
cd detection-lab-v2

# Install dependencies
npm install

# Test it works
npm run dev
```

Visit `http://localhost:4321` - you should see the example site!

### 2. Copy Your Detections

```bash
# From your current detection-lab directory
# Copy all YAML files to new structure

# Windows detections
cp path/to/current/detections/windows/*.yml src/content/detections/windows/

# Linux detections  
cp path/to/current/detections/linux/*.yml src/content/detections/linux/

# macOS detections
cp path/to/current/detections/macos/*.yml src/content/detections/macos/

# Repeat for other OS categories...
```

**Important:** Your YAML files need NO modifications! They work exactly as they are.

### 3. Update Site Configuration

Edit `astro.config.mjs`:

```javascript
export default defineConfig({
  integrations: [tailwind(), mdx()],
  site: 'https://avrgsec.github.io',  // Your GitHub Pages URL
  base: '/detection-lab',              // Your repo name
  // ... rest stays the same
});
```

### 4. Test Locally

```bash
npm run dev
```

Check:
- [ ] All detections appear on `/detections`
- [ ] Individual detection pages work
- [ ] Navigation works
- [ ] No console errors

### 5. Create Initial Blog Post

Create `src/content/blog/introducing-v2.md`:

```markdown
---
title: "Detection Lab v2.0 - Now with Blog!"
description: "Rebuilt Detection Lab with a modern design and integrated blog"
date: 2025-01-15
tags: ["announcement", "detection-lab"]
---

I've rebuilt Detection Lab from the ground up!

## What's New

- Modern, minimal design
- Integrated blog for testing writeups
- Faster page loads
- Better mobile experience
- Same great detections

All existing detections are still here, now with:
- Individual pages
- Better formatting
- MITRE ATT&CK links
- Download buttons

Check out the new site and let me know what you think!
```

### 6. Update GitHub Repository

**Option A: New Branch (Recommended)**
```bash
# In your current detection-lab repo
git checkout -b v2

# Copy all new files from detection-lab-v2/
# Commit
git add .
git commit -m "Detection Lab v2.0"
git push -u origin v2

# Test deployment
# Once happy, merge to main
```

**Option B: New Repository**
```bash
# Create new repo: detection-lab-v2
# Push all files there
# Update links
```

### 7. Update GitHub Pages Settings

In your repo:
1. Go to **Settings** → **Pages**
2. Source: **GitHub Actions**
3. The workflow in `.github/workflows/deploy.yml` will handle deployment

### 8. Push and Deploy!

```bash
git push
```

GitHub Actions will:
- Build your site
- Deploy to GitHub Pages
- Takes about 2-3 minutes

Visit: `https://avrgsec.github.io/detection-lab/`

## 🔄 What Changes

### Same
✅ All your detection YAML files
✅ GitHub hosting (can still use Pages)
✅ Free
✅ Same URLs structure (with redirects if needed)

### Better
✨ Modern, professional design
✨ Integrated blog system
✨ Auto-generated pages
✨ Better mobile experience
✨ Faster loading
✨ SEO optimized

### New
🎉 Blog for testing writeups
🎉 Projects showcase page
🎉 Better detection pages
🎉 Code syntax highlighting

## 🗺️ URL Mapping

### Old → New (Compatible!)

```
Old: /detections/macos.html
New: /detections (all OS listed)
     /detections#macos (filters to macOS)

Old: /index.html
New: / (homepage)

New URLs:
/blog                    → Blog listing
/blog/post-name          → Blog posts
/work                    → Projects
/about                   → About page
```

## 📝 Updating Links

If you've shared links, they'll mostly work! But you can add redirects if needed.

Create `public/_redirects`:
```
/detections/macos.html    /detections    301
/detections/windows.html  /detections    301
```

## ✅ Migration Checklist

Pre-migration:
- [ ] Backup current site (git tag v1.0)
- [ ] Install Node.js 18+
- [ ] Extract v2 files
- [ ] Run `npm install`

Migration:
- [ ] Copy all detection YAMLs
- [ ] Test locally (`npm run dev`)
- [ ] All detections appear?
- [ ] Create first blog post
- [ ] Update astro.config.mjs
- [ ] Build successfully (`npm run build`)

Deployment:
- [ ] Push to GitHub
- [ ] Enable GitHub Pages (Actions)
- [ ] Deployment succeeds?
- [ ] Site loads correctly?
- [ ] All pages work?

Post-migration:
- [ ] Update README
- [ ] Update social media links
- [ ] Announce on Twitter
- [ ] Write blog post about migration

## 🐛 Common Issues

### "YAML parsing error"
- Check YAML syntax
- Ensure proper indentation
- Use YAML validator

### "Page not found after deploy"
- Check `base` in astro.config.mjs
- Ensure GitHub Pages is enabled
- Wait 2-3 minutes for deployment

### "Detections not appearing"
- Check file location: `src/content/detections/[os]/*.yml`
- Check YAML format matches schema
- Check console for errors

## 🎉 You're Done!

Your Detection Lab v2.0 is live!

**Next steps:**
1. Write blog posts about testing
2. Add more detections
3. Share the new site
4. Enjoy the improved platform!

## 🔙 Rollback Plan

If anything goes wrong:

```bash
# Revert to v1
git checkout main
git merge --abort  # if in middle of merge

# Or if deployed v2:
git revert <commit-hash>
git push
```

Your old site will be back in minutes.

## 📚 Resources

- [SETUP.md](./SETUP.md) - Detailed setup guide
- [QUICKSTART.md](./QUICKSTART.md) - Quick reference
- [STRUCTURE.md](./STRUCTURE.md) - Folder structure

## ❓ Questions?

Common concerns:

**Q: Will my Google rankings be affected?**
A: No, same domain. Add redirects for changed URLs.

**Q: Can I keep both sites running?**
A: Yes! Deploy v2 to different domain/subdomain.

**Q: Is it faster?**
A: Yes! Astro is significantly faster than plain HTML generation.

**Q: Can I revert back?**
A: Yes, anytime. Your old code is in git history.

---

**Ready to migrate?** Start with step 1 and work through the checklist!
