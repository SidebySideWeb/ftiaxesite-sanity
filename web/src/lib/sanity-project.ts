/**
 * Shared Sanity project identifiers for the Astro web app.
 * Values come from environment variables so each client project
 * can reuse the same codebase with a different .env / project.config.json.
 */
export const sanityProjectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID ?? '29vmuk87'
export const sanityDataset = import.meta.env.PUBLIC_SANITY_DATASET ?? 'production'
export const sanityApiVersion = '2024-01-01'
