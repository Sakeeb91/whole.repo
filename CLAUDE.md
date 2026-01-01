# whole-website Project Instructions

## Deployment

**IMPORTANT:** Deploy to Cloudflare Pages, NOT Netlify (bandwidth limits).

- **Production URL:** https://whole-website.pages.dev
- **Project name:** `whole-website`

### Deploy Command

```bash
npm run build && wrangler pages deploy dist --project-name=whole-website
```

## Tech Stack

- React + Vite
- Tailwind CSS
- Lenis smooth scroll
