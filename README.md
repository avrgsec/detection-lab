# Detection Lab v2.0

A modern, minimal website for Detection Lab - Sigma detection rules organized by operating system with an integrated blog.

## ✨ Features

- 🎨 Clean, minimal grey aesthetic inspired by GreyNoise
- 🔍 Browse detections by operating system
- 📝 Integrated blog for technical writeups
- 🚀 Auto-generates pages from YAML detection files
- 📱 Fully responsive
- ⚡ Lightning fast (Astro-powered)
- 🎯 SEO optimized

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Visit `http://localhost:4321`

## 📁 Adding Content

### Detections
Add YAML files to `src/content/detections/[os]/` - pages auto-generate!

### Blog Posts
Create `.md` files in `src/content/blog/` with frontmatter

### Projects
Add `.md` files to `src/content/work/`

## 🌐 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import in Vercel
3. Deploy!

### GitHub Pages
See `SETUP.md` for detailed instructions

## 📚 Documentation

See [SETUP.md](./SETUP.md) for complete setup and deployment guide.

## 🛠️ Tech Stack

- [Astro](https://astro.build) - Framework
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [MDX](https://mdxjs.com) - Blog content

## 📝 License

MIT

## 🔗 Links

- [Detection Lab](https://avrgsec.github.io/detection-lab/)
- [GitHub](https://github.com/avrgsec/detection-lab)
- [Twitter](https://x.com/avrgsec_)
