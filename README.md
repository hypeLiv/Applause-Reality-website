# Applause-Reality-website

Next.js (App Router, TypeScript, Tailwind v4) rebuild of [applausereality.com](https://www.applausereality.com), moving the site off Wix. Routes match the live Wix URLs so existing links and rankings carry over.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy (Netlify)

`netlify.toml` holds the build settings. Netlify adds its Next.js adapter automatically.

1. Netlify → Add new project → Import from Git → pick this repo. Leave base directory empty (`studio/` deploys separately with `sanity deploy`).
2. Project configuration → Environment variables: add the keys from `.env.example`. `NEXT_PUBLIC_*` values are baked in at build time, so redeploy after changing them.
3. Domain management → add `applausereality.com` and `www`. If you switch nameservers to Netlify DNS, recreate the MX records first so `concierge@` mail keeps arriving.
4. Point the Sanity webhook at `https://<your domain>/api/revalidate` with `SANITY_REVALIDATE_SECRET`.

## Structure

- `src/app/` — one route per page: `/`, `/locations`, `/projects`, `/about-applause-reality`, `/blog`, `/post/[slug]`, `/privacy-policy`
- `src/components/` — header, footer, shared sections, advisor form, video card
- `src/lib/site.ts` — phone numbers, email, WhatsApp links, nav
- `src/content/posts.ts` — blog posts
- `public/` — images, project videos and brochure PDFs downloaded from the Wix site

## Before launch

- **Blog posts:** article bodies still need importing from the Wix blog export (Blog → Settings → Export) into `src/content/posts.ts`.
- **Privacy policy:** paste the client's approved text into `src/app/privacy-policy/page.tsx`.
- **Advisor form:** currently opens a pre-filled WhatsApp chat; wire up email/CRM if enquiries should land in an inbox.
- **Large media:** `public/videos` and `public/brochures` are ~160 MB; consider moving them to a CDN.
