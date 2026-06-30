@.cursorrules @wordpress-setup.json @project-specification.json

# Phase 6: Forms, Bookings, and E-commerce

Project: **ftiaxesite/web**

Implement user-facing flows only where Phase 1–2 approved them.

## Forms

- Astro components mirror the design system
- Server endpoints (Astro endpoints or dedicated API routes) validate payloads
- Never trust client-side validation alone
- Document how submissions map to WPForms/custom endpoints

## Booking (Amelia or alternative)

- Isolate integration in `src/lib/` with typed clients
- Handle empty states when the service API is offline

## WooCommerce

- Read-only catalog first, then cart/checkout if required
- Keep secrets server-side; use cookie/auth patterns appropriate to the stack

## Expected output

- Working happy paths + visible empty/error states
- README notes for store managers (how to change IDs/keys safely)
