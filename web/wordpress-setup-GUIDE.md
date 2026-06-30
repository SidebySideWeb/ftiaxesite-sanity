# WordPress setup guide — ftiaxesite/web

Generated from `wordpress-setup.json`. Treat this as a checklist for the CMS engineer.

## 1. Plugin installation checklist

```json
{
  "required": [
    {
      "slug": "advanced-custom-fields",
      "name": "Advanced Custom Fields",
      "purpose": "Editable page heroes, service/portfolio fields"
    },
    {
      "slug": "acf-to-rest-api",
      "name": "ACF to REST API",
      "purpose": "Expose ACF fields to Astro via REST"
    },
    {
      "slug": "seo-by-rank-math",
      "name": "Rank Math SEO",
      "purpose": "SEO metadata for headless frontend"
    },
    {
      "slug": "fluentform",
      "name": "Fluent Forms",
      "purpose": "Quote request / contact forms (already installed)"
    },
    {
      "slug": "safe-svg",
      "name": "Safe SVG",
      "purpose": "SVG uploads for portfolio logos"
    }
  ],
  "optional": []
}
```

## 2. Theme `functions.php` tasks

- Register CPTs, taxonomies, menus, image sizes, and REST exposure exactly as specified.
- Keep PHP in version control (child theme or custom plugin). Never edit vendor files.

### Suggested skeleton

```php
<?php
add_action('init', function () {
  // register_post_type(...)
  // register_taxonomy(...)
  // register_nav_menus([...])
});
```

## 3. ACF field groups

Export JSON from ACF or author JSON manually to match `wordpress-setup.json`. Sync on staging before production.

## 4. Menus

```json
{
  "locations": [
    {
      "slug": "primary",
      "label": "Primary Menu",
      "items": [
        "home",
        "services",
        "portfolio",
        "quote",
        "blog"
      ]
    },
    {
      "slug": "footer",
      "label": "Footer Menu",
      "items": [
        "services",
        "portfolio",
        "quote",
        "blog"
      ]
    },
    {
      "slug": "legal",
      "label": "Legal Menu",
      "items": []
    }
  ]
}
```

## 5. WPForms

For each form entry in the JSON spec: recreate fields, confirmations, notifications, and anti-spam.

## 6. WooCommerce (if applicable)

Configure store address, currency, shipping, tax, payment gateways, and webhooks as required.

## 7. Amelia (if applicable)

Import services, connect calendars, tune notifications, and test booking + cancellation flows.

## 8. Rank Math SEO

Set site-wide defaults, connect Search Console, and define templates for CPT archives/singles.

## 9. REST API smoke tests

Replace `https://cms.example.com` with your real WordPress host:

```text
GET /wp-json/
GET /wp-json/wp/v2/types
GET /wp-json/wp/v2/posts?per_page=5&_embed=1
```

## 10. CORS

Allow the Astro frontend origin (local + production). Prefer configuring at the reverse proxy when possible.

---

_This guide is intentionally generic until `wordpress-setup.json` is fully populated._
