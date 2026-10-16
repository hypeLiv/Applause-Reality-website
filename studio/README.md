# Applause Reality — Sanity Studio

Content editing for the photos, videos and brochures on applausereality.com. The website (the Next.js app in the parent folder) reads them from Sanity and falls back to its bundled `/public` files for anything empty, so the site works before and during setup.

## What's in here

| In the Studio | Holds | Shown on |
| --- | --- | --- |
| **Site settings** (one document) | Logos, browser icon, founder portrait, the four service photos, home hero photo, home walkthrough video, featured award, projects-page tour video and on-site photo, closing-banner photos | Every page |
| **Projects** | Main photo, logo, highlights sheet, film, brochure PDF | Projects page, project pages, home hero |
| **Blog posts** | Cover image | Blog list, article pages, share cards |
| **Partners** | Bank and developer logos | Home, Projects, About |
| **Awards** | Certificate and trophy photos, in display order | About, home (featured award) |

Projects and posts are matched to the website by their **URL key / slug**, so don't change those. Text (descriptions, article bodies) still lives in the website code.

## Setup (once credentials are available)

1. **Studio env** — copy `.env.example` to `.env` and set `SANITY_STUDIO_PROJECT_ID` (and the dataset if it isn't `production`). The dataset must be **public**, since the website reads it without a token.
2. **Run it** — `npm install`, `npx sanity login`, then `npm run dev` → http://localhost:3333.
3. **Import the current media** — `npm run seed:media` uploads every photo, video and brochure the site uses (~275 MB) and creates the documents above. `DRY_RUN=1 npm run seed:media` checks the files first without uploading. Re-running is safe.
4. **Point the website at it** — in `../.env.local` (and the host's env settings) set `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET`.
5. **Instant updates on publish** — in sanity.io/manage → API → Webhooks, add a webhook:
   - URL: `https://www.applausereality.com/api/revalidate`, trigger on create/update/delete
   - Filter: `_type in ["siteSettings", "project", "post", "partner", "award"]`
   - Secret: any random string, also set as `SANITY_REVALIDATE_SECRET` on the website.

   Without it, changes still appear within an hour.
6. **Host the Studio** — `npm run deploy` publishes it at https://applause-reality.sanity.studio (change `studioHost` in `sanity.cli.ts` if that name is taken).

## After schema changes

`npm run typegen` regenerates `../src/sanity/types.ts` from the schema and the website's GROQ queries.
