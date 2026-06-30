@.cursorrules @project-specification.json @design-source/

# Phase 4: Build Astro Pages

Project: **ftiaxesite/web**

Create `src/pages/**` routes that mirror the design exports.

## Route checklist

- **ftiaxesite.gr_gfs_didot_1** (code.html) → route `/ftiaxesite.gr_gfs_didot_1/` — @design-source/ftiaxesite.gr_gfs_didot_1/code.html
- **ftiaxesite.gr_gfs_didot_2** (code.html) → route `/ftiaxesite.gr_gfs_didot_2/` — @design-source/ftiaxesite.gr_gfs_didot_2/code.html
- **ftiaxesite.gr_gfs_didot_3** (code.html) → route `/ftiaxesite.gr_gfs_didot_3/` — @design-source/ftiaxesite.gr_gfs_didot_3/code.html
- **portfolio_ftiaxesite.gr_gfs_didot** (code.html) → route `/portfolio_ftiaxesite.gr_gfs_didot/` — @design-source/portfolio_ftiaxesite.gr_gfs_didot/code.html
- **stitch_ftiaxesite_studio_brand_identity** (code.html) → route `/stitch_ftiaxesite_studio_brand_identity/` — @design-source/stitch_ftiaxesite_studio_brand_identity/ftiaxesite.gr_gfs_didot_1/code.html

## Implementation notes

- Start from `BaseLayout.astro`; extend only when a page truly needs a different shell
- Static pages: match HTML section order and responsive behavior
- Blog: reuse existing starter patterns (`/blog/`, `/blog/[slug]/`) unless spec says otherwise
- Custom post types: add `src/pages/<type>/index.astro` and `[slug].astro` with `getStaticPaths` (mind Astro TSX `<` limitations—keep complex typings in `.ts` helpers)
- Fetch WordPress data via the shared client in `shared/wordpress-client` and thin `src/lib/wordpress.ts` exports

## Expected output

- Page-level `.astro` files wired to components
- No duplicate fetching logic scattered across pages—centralize per entity

## Quality bar

Pixel-perfect is less important than **accessible, resilient layouts** and clean data boundaries.
