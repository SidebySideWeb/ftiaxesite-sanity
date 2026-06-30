# Cursor prompt workflow — ftiaxesite/web

This folder contains **numbered Composer prompts** for taking a design export all the way to production. Run them **in order** unless your `project-specification.json` explicitly lets you parallelize work.

## Before you start

1. Open the **workspace repository** in Cursor so `@.cursorrules` resolves correctly.
2. Open the **project folder** under `projects/ftiaxesite/web/` (or your generated client project).
3. Ensure `design-analysis.json` exists (`npm run analyze-design -- ftiaxesite/web` from the workspace root).
4. Keep `.project-metadata.json` updated via `npm run status -- ftiaxesite/web complete <phase>` as you finish major milestones.

## Phase map

| File | Goal | Primary inputs |
|------|------|----------------|
| `01-analyze-design-detailed.md` | Freeze scope + architecture | `design-source/`, `design-analysis.json` |
| `02-generate-wordpress-config.md` | CMS plan + integrations | `project-specification.json` |
| `03-build-components.md` | UI library | HTML exports + spec |
| `04-build-pages.md` | Routes + layouts | Components + spec |
| `05-integrate-wordpress.md` | Data plumbing | `wordpress-setup.json` |
| `06-forms-booking-ecommerce.md` | Advanced flows | Spec + WP plugins |
| `07-seo-optimization.md` | SEO + performance | Live build + content |

## How to use each prompt

1. Create a **new Composer** thread.
2. Paste the prompt file contents **or** reference it with `@cursor-prompts/0X-....md`.
3. Attach the cited files (`@design-source/...`, `@wordpress-setup.json`, etc.).
4. Review the generated artifacts in Git before moving on.

## What “done” looks like

- **Phase 1:** `project-specification.json` exists and matches HTML reality.
- **Phase 2:** `wordpress-setup.json` is actionable by whoever manages WP.
- **Phase 3–4:** Astro build succeeds with static routes mirroring the sitemap.
- **Phase 5:** All pages that should be dynamic have fetchers + types.
- **Phase 6:** Optional features ship behind clear feature flags or env toggles.
- **Phase 7:** Lighthouse + Rank Math checks documented.

## Common issues

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| `@.cursorrules` not found | Wrong workspace root | Open the monorepo root in Cursor |
| `getStaticPaths` type errors | Generics with `<` in `.astro` frontmatter | Move types to `.ts` modules |
| Empty WordPress responses | Wrong `WORDPRESS_API_URL` or CPT not registered | Fix env + REST registry |
| Fonts/colors drift | Hard-coded Tailwind guesses | Re-read CSS/HTML exports |

## Marking progress

From the workspace root:

```bash
npm run status -- ftiaxesite/web                # dashboard
npm run status -- ftiaxesite/web complete design_analysis
```

Valid phase keys: `design_analysis`, `wordpress_config`, `components_built`, `pages_built`, `wordpress_integrated`, `features_integrated`, `seo_optimized`, `deployed`.

## When to regenerate prompts

Re-run `npm run generate-prompts -- ftiaxesite/web` after major changes to `design-analysis.json` so the “Detected pages” sections stay fresh.
