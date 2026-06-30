@.cursorrules @wordpress-setup.json @project-specification.json

# Phase 5: WordPress Data Integration

Project: **ftiaxesite/web**

Extend the data layer so Astro pages can consume everything defined in `wordpress-setup.json`.

## Deliverables

1. **Fetch helpers** in `shared/wordpress-client/` (canonical) with explicit return types and graceful `[]` / `null` handling on failure
2. **Transforms** from raw REST shapes to clean interfaces (no leaking WordPress internals into components)
3. **Types** colocated with the client; the project re-exports through `src/types/` when needed
4. **Menus / options** fetchers if the spec calls for them

## Notes

- Prefer `_embed` only when it reduces round trips
- Never throw from network helpers used by pages at build time
- If a CPT is not registered yet, keep TypeScript interfaces ready and return empty arrays until the CMS exists

## Expected output

- Updated `api.ts`, `transforms.ts`, `types.ts`, and thin `src/lib/wordpress.ts` exports
- Example usage in one page per CPT to prove the wiring
