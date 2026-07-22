# ftiaxesite Sanity Studio

Content studio for [ftiaxesite.gr](https://ftiaxesite.gr/).

## Seed content

```bash
npm run seed
```

Re-runs are idempotent: documents use fixed `_id` values and `createOrReplace`.

Legal copy in `legalDoc` documents is **draft content for development only**. Have a qualified lawyer review privacy and cookie policies before launch.

## Scripts

| Script | Description |
|--------|-------------|
| `npm run seed` | Seed or update all redesign content |
| `npm run check-dashes` | Fail if en/em dashes appear in reference HTML or seed script |
