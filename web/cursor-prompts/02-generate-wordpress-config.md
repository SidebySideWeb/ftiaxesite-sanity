@.cursorrules @project-specification.json

# Phase 2: WordPress Configuration Generator

Project: **ftiaxesite/web**

Generate `wordpress-setup.json` with a production-ready WordPress plan aligned to `project-specification.json`.

## Include

1. **Plugins** — required/optional with slugs (ACF, Rank Math, WPForms, WooCommerce, Amelia, etc. only if justified).
2. **Custom Post Types** — PHP registration snippets or clear registration spec.
3. **ACF** — JSON export style field group definitions.
4. **Menus** — theme locations and default structure.
5. **REST** — exposing CPTs and custom fields safely.
6. **CORS** — headers or allowed origins for the Astro origin.
7. **Forms** — WPForms (or chosen stack) configuration notes per form.
8. **WooCommerce / Amelia** — only if Phase 1 detected those needs.
9. **Rank Math** — baseline SEO defaults and content types to track.

## Expected output

- Updated `wordpress-setup.json`
- If PHP is generated, place snippets under `wordpress-snippets/` (new folder) with filenames that match featuresaxesite\app\web"
@'
{
  "version": 1,
  "projectName": "ftiaxesite/web",
  "generatedAt": "2026-06-02T00:00:00.000Z",
  "plugins": {
    "required": [],
    "optional": []
  },
  "custom_post_types": [],
  "acf_field_groups": [],
  "menus": {
    "locations": []
  },
  "forms": [],
  "rest_api": {
    "expose_acf": true,
    "cors_note": "Configure allowed origins for the Astro frontend URL."
  },
  "notes": "Populate this file during Phase 2 (WordPress configuration). Use cursor-prompts/02-generate-wordpress-config.md."
}
'@ | Set-Content -Encoding UTF8 "wordpress-setup.json"
Then run:

cd "C:\Users\dgero\Documents\Localhost-Project\wp-astro-tooling"
npm run wordpress-guide -- ftiaxesite web
If you want to do the full Phase 2 properly (not just bootstrap), open and follow:

C:\Users\dgero\Documents\Localhost-Project\ftiaxesite\app\web\cursor-prompts\02-generate-wordpress-config.md
and have Cursor fill wordpress-setup.json with your real plugins/CPT/ACF/menu/REST setup, then re-run wordpress-guide.

yes but what does this do npm run wordpress-guide -- ftiaxesite web

npm run wordpress-guide -- ftiaxesite web generates a human-readable setup checklist for WordPress based on your project config.

In plain terms:

It reads C:\Users\dgero\Documents\Localhost-Project\ftiaxesite\app\web\wordpress-setup.json
It converts that JSON into a markdown guide (plugins, CPTs, ACF, menus, REST/CORS, forms, SEO notes)
It writes a file like wordpress-setup-GUIDE.md inside your Astro project
It does not install plugins or change WordPress automatically
So this command is a documentation generator for implementation, not a deploy command.

For your flow:

Fill wordpress-setup.json (Phase 2)
Run wordpress-guide
Use generated guide to configure WP in ftiaxesite/app/public admin/codebase
If you want, I can help you create a solid first real wordpress-setup.json for ftiaxesite now.

Cross-check every requirement against `.cursorrules` (strict TypeScript on the Astro side, no banned identifier names in generated examples).
