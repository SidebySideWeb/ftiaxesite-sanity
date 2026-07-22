import type {StructureResolver} from 'sanity/structure'

function orderedList(S: Parameters<StructureResolver>[0], schemaType: string, title: string) {
  return S.documentTypeList(schemaType)
    .title(title)
    .defaultOrdering([{field: 'order', direction: 'asc'}])
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('⚙️ Site Settings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),

      S.listItem()
        .title('🏠 Homepage')
        .child(S.document().schemaType('homePage').documentId('homePage')),

      S.divider(),

      S.listItem()
        .title('📦 Service Packages')
        .child(orderedList(S, 'servicePackage', 'Service Packages')),

      S.listItem()
        .title('🖼️ Projects')
        .child(orderedList(S, 'project', 'Projects')),

      S.listItem()
        .title('⭐ Value Propositions')
        .child(orderedList(S, 'valueProp', 'Value Propositions')),

      S.listItem()
        .title('🔄 Process Steps')
        .child(orderedList(S, 'processStep', 'Process Steps')),

      S.listItem()
        .title('🛠️ Tech Stack')
        .child(orderedList(S, 'techItem', 'Tech Stack')),

      S.listItem()
        .title('❓ FAQ Items')
        .child(orderedList(S, 'faqItem', 'FAQ Items')),

      S.listItem()
        .title('📜 Legal Documents')
        .child(S.documentTypeList('legalDoc').title('Legal Documents')),

      S.listItem()
        .title('✍️ Blog Posts')
        .child(
          S.documentTypeList('post')
            .title('Blog Posts')
            .defaultOrdering([{field: 'publishedAt', direction: 'desc'}]),
        ),

      S.divider(),

      S.listItem()
        .title('📥 Form Submissions')
        .child(
          S.documentTypeList('formSubmission')
            .title('Form Submissions')
            .defaultOrdering([{field: 'submittedAt', direction: 'desc'}]),
        ),
    ])
