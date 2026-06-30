import type {StructureResolver} from 'sanity/structure'

/**
 * Singleton document types — these should only ever have ONE document.
 * The structure below uses S.document() (not S.documentTypeList()) for these,
 * which prevents editors from accidentally creating a second "Homepage", etc.
 */
const SINGLETONS = [
  {id: 'siteSettings', title: 'Site Settings'},
  {id: 'homePage', title: 'Homepage'},
  {id: 'servicesPage', title: 'Services Page'},
  {id: 'quotePage', title: 'Get a Quote Page'},
  {id: 'howWeWorkPage', title: 'How We Work Page'},
  {id: 'portfolioPage', title: 'Portfolio Page'},
  {id: 'blogIndexPage', title: 'Blog Index Page'},
  {id: 'contactPage', title: 'Contact Page'},
]

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('⚙️ Site Settings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),

      S.divider(),

      S.listItem().title('📄 Pages').child(
        S.list()
          .title('Pages')
          .items(
            SINGLETONS.filter((s) => s.id !== 'siteSettings').map((s) =>
              S.listItem()
                .title(s.title)
                .child(S.document().schemaType(s.id).documentId(s.id)),
            ),
          ),
      ),

      S.divider(),

      S.listItem()
        .title('🧰 Case Studies')
        .child(S.documentTypeList('caseStudy').title('Case Studies')),

      S.listItem()
        .title('✍️ Blog Posts')
        .child(S.documentTypeList('blogPost').title('Blog Posts')),

      S.divider(),

      S.listItem()
        .title('📥 Form Submissions')
        .child(
          S.documentTypeList('formSubmission')
            .title('Form Submissions')
            .defaultOrdering([{field: 'submittedAt', direction: 'desc'}]),
        ),
    ])
