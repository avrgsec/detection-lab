# Detection Lab v2.0 - Complete Folder Structure

```
detection-lab-v2/
│
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Pages deployment
│
├── public/                         # Static assets (images, etc.)
│   └── (add your images here)
│
├── src/
│   ├── components/                 # Reusable UI components
│   │   ├── BlogCard.astro         # Blog post preview card
│   │   └── DetectionCard.astro    # Detection preview card
│   │
│   ├── content/                    # Your content (auto-processed)
│   │   ├── config.ts              # Content schemas/validation
│   │   │
│   │   ├── detections/            # 🎯 DETECTION YAML FILES
│   │   │   ├── windows/
│   │   │   │   └── *.yml
│   │   │   ├── linux/
│   │   │   │   └── *.yml
│   │   │   ├── macos/
│   │   │   │   └── *.yml
│   │   │   ├── cloud/
│   │   │   │   └── *.yml
│   │   │   ├── network/
│   │   │   │   └── *.yml
│   │   │   └── cross-platform/
│   │   │       └── *.yml
│   │   │
│   │   ├── blog/                  # 📝 BLOG POSTS (.md files)
│   │   │   ├── introducing-detection-lab.md
│   │   │   └── *.md
│   │   │
│   │   └── work/                  # 💼 PROJECT WRITEUPS
│   │       └── *.md
│   │
│   ├── layouts/                   # Page layout wrappers
│   │   └── BaseLayout.astro      # Main layout (header/footer)
│   │
│   ├── pages/                     # Routes (URL structure)
│   │   ├── index.astro           # Homepage (/)
│   │   ├── about.astro           # About page (/about)
│   │   ├── work.astro            # Projects (/work)
│   │   │
│   │   ├── detections/
│   │   │   ├── index.astro       # All detections (/detections)
│   │   │   └── [os]/
│   │   │       └── [slug].astro  # Individual detection
│   │   │                         # (/detections/macos/detection-name)
│   │   │
│   │   └── blog/
│   │       ├── index.astro       # Blog listing (/blog)
│   │       └── [slug].astro      # Individual post
│   │                             # (/blog/post-name)
│   │
│   └── styles/
│       └── global.css            # Global styles
│
├── .gitignore                     # Git ignore rules
├── astro.config.mjs              # Astro configuration
├── package.json                  # Dependencies & scripts
├── tailwind.config.cjs           # Tailwind styling config
├── tsconfig.json                 # TypeScript config
│
├── README.md                      # Project overview
├── SETUP.md                       # Detailed setup guide
└── QUICKSTART.md                  # Quick reference
```

## 🎯 Key Directories Explained

### `/src/content/detections/`
**This is where your Sigma rules go!**
- Organized by OS (windows, linux, macos, etc.)
- YAML format (your existing format works!)
- Pages auto-generate from these files
- Example: `src/content/detections/macos/launchd-persistence.yml`
  → Creates: `/detections/macos/launchd-persistence`

### `/src/content/blog/`
**Your blog posts in Markdown**
- Each `.md` file = one blog post
- Frontmatter for metadata (title, date, tags)
- Markdown for content
- Example: `src/content/blog/my-post.md`
  → Creates: `/blog/my-post`

### `/src/content/work/`
**Project showcase writeups**
- Markdown files describing projects
- Appears on `/work` page
- Can link to external projects

### `/src/pages/`
**Route definitions (templates)**
- Files here create URL routes
- `[brackets]` = dynamic routes
- Don't need to edit these much
- They automatically process your content

### `/src/components/`
**Reusable UI pieces**
- DetectionCard: Preview card for detections
- BlogCard: Preview card for blog posts
- Used throughout the site

### `/src/layouts/`
**Page wrappers**
- BaseLayout: Main template (header, footer, nav)
- Wraps all pages for consistency

## 🔄 How It Works

1. **You add content:**
   ```
   src/content/detections/macos/my-detection.yml
   ```

2. **Astro processes it:**
   - Validates YAML schema
   - Extracts data
   - Generates page

3. **Creates URL:**
   ```
   /detections/macos/my-detection
   ```

4. **Uses template:**
   ```
   src/pages/detections/[os]/[slug].astro
   ```

**Everything is automatic!** Just add files and they appear on your site.

## 📝 Where to Start

1. **Copy your existing detections:**
   ```bash
   cp -r ~/detection-lab/detections/* src/content/detections/
   ```

2. **Create your first blog post:**
   ```bash
   # Create file
   src/content/blog/my-first-post.md
   
   # Add content (see QUICKSTART.md for template)
   ```

3. **Start dev server:**
   ```bash
   npm run dev
   ```

4. **Visit:**
   ```
   http://localhost:4321
   ```

## ✨ That's It!

The structure is designed to be simple:
- **Content goes in `/src/content/`**
- **Pages auto-generate**
- **Everything else is configuration**

Focus on writing detections and blog posts - the site handles the rest!
