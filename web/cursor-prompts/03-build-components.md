@.cursorrules @project-specification.json @design-source/

# Phase 3: Build Astro Components

Project: **ftiaxesite/web**

Convert HTML in `design-source/` into a structured Astro + Tailwind component library inside `src/components/`.

## Strategy

1. Atoms → molecules → organisms → templates
2. Match spacing, type scale, and color from the source HTML/CSS
3. Add explicit TypeScript `interface Props` for every component
4. Prepare components to accept WordPress-mapped props (even if mocked initially)

## Detected pages context

- **ftiaxesite.gr_gfs_didot_1** (code.html) → route `/ftiaxesite.gr_gfs_didot_1/` — @design-source/ftiaxesite.gr_gfs_didot_1/code.html
- **ftiaxesite.gr_gfs_didot_2** (code.html) → route `/ftiaxesite.gr_gfs_didot_2/` — @design-source/ftiaxesite.gr_gfs_didot_2/code.html
- **ftiaxesite.gr_gfs_didot_3** (code.html) → route `/ftiaxesite.gr_gfs_didot_3/` — @design-source/ftiaxesite.gr_gfs_didot_3/code.html
- **portfolio_ftiaxesite.gr_gfs_didot** (code.html) → route `/portfolio_ftiaxesite.gr_gfs_didot/` — @design-source/portfolio_ftiaxesite.gr_gfs_didot/code.html
- **stitch_ftiaxesite_studio_brand_identity** (code.html) → route `/stitch_ftiaxesite_studio_brand_identity/` — @design-source/stitch_ftiaxesite_studio_brand_identity/ftiaxesite.gr_gfs_didot_1/code.html

## Requirements

- Mobile-first Tailwind classes
- Semantic HTML + accessibility (focus rings, aria landmarks)
- No generic variable names forbidden by `.cursorrules`
- Extract repeated markup into shared partials

## Expected output

- Components under `src/components/` with predictable naming (`organisms/HeroSection.astro`, etc.)
- Shared tokens or utilities only if they reduce duplication (avoid over-abstracting)

Reference specific HTML files with `@design-source/<page>/index.html` in Composer for each conversion batch.
