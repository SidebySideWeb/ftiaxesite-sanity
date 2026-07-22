import {spawnSync} from 'node:child_process'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2025-01-01'})

const L = (el: string, en: string) => ({_type: 'localeString' as const, el, en})
const T = (el: string, en: string) => ({_type: 'localeText' as const, el, en})

const VALID_TYPES = [
  'siteSettings',
  'homePage',
  'servicePackage',
  'project',
  'faqItem',
  'processStep',
  'valueProp',
  'techItem',
  'legalDoc',
  'post',
  'formSubmission',
] as const

function slug(current: string) {
  return {_type: 'slug' as const, current}
}

function legalBody(sections: Array<{heading: {el: string; en: string}; paragraphs: string[][]}>) {
  const build = (lang: 'el' | 'en') =>
    sections
      .map(({heading, paragraphs}) => {
        const body = paragraphs.map(([el, en]) => (lang === 'el' ? el : en)).join('\n')
        return `${heading[lang]}\n\n${body}`
      })
      .join('\n\n')

  return T(build('el'), build('en'))
}

const siteSettings = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  brandName: 'ftiaxesite.gr',
  tagline: T(
    'Επαγγελματική κατασκευή και ανακατασκευή ιστοσελίδων για ελληνικές επιχειρήσεις. Γρήγορα, ξεκάθαρα, χωρίς εκπλήξεις.',
    'Professional websites for Greek businesses. Fast, clear, no surprises.',
  ),
  familyBadge: 'Member of the sidebysideweb.gr family',
  navLinks: [
    {_key: 'nav-pricing', label: L('Υπηρεσίες & Τιμές', 'Services & Prices'), href: '#pricing'},
    {_key: 'nav-process', label: L('Πώς Δουλεύει', 'How it works'), href: '#process'},
    {_key: 'nav-work', label: L('Έργα', 'Work'), href: '#work'},
    {_key: 'nav-faq', label: L('Συχνές Ερωτήσεις', 'FAQ'), href: '#faq'},
    {_key: 'nav-contact', label: L('Επικοινωνία', 'Contact'), href: '#contact'},
  ],
  navCtaLabel: L('Ζήτησε Προσφορά', 'Get a quote'),
  email: 'dgeronikolos@sidebysideweb.gr',
  phone: '+30 694 733 3086',
  addressStreet: 'Κυθήρων 12',
  addressCity: 'Περιστέρι',
  addressPostal: '12133',
  addressRegion: 'Αττική',
  serviceArea: L('Αθήνα & Πανελλαδικά', 'Athens & all of Greece'),
  addressLine: T(
    'Κυθήρων 12, Περιστέρι 12133\nΑθήνα & Πανελλαδικά',
    '12 Kythiron St, Peristeri 12133\nAthens & all of Greece',
  ),
  footerServicesTitle: L('Υπηρεσίες', 'Services'),
  footerContactTitle: L('Επικοινωνία', 'Contact'),
  privacyLinkLabel: L('Πολιτική Απορρήτου', 'Privacy Policy'),
  cookiesLinkLabel: L('Πολιτική Cookies', 'Cookie Policy'),
  cookieSettingsLabel: L('Ρυθμίσεις cookies', 'Cookie settings'),
  copyrightLine: '© {year} ftiaxesite.gr. All rights reserved.',
  defaultSeoTitle: L(
    'Κατασκευή Ιστοσελίδων & Eshop | Το Site σου σε 2 Εβδομάδες | ftiaxesite.gr',
    'ftiaxesite.gr | Your website, live in 2 weeks',
  ),
  defaultSeoDescription: T(
    'Επαγγελματική κατασκευή και ανακατασκευή ιστοσελίδων για ελληνικές επιχειρήσεις. Ξεκάθαρες τιμές από 900 ευρώ, γρήγορη παράδοση σε 2 εβδομάδες, χωρίς κρυφές χρεώσεις.',
    'Professional websites for Greek businesses. Clear prices, fast delivery, no surprises.',
  ),
  socialLinks: [],
  calBookingUrl: 'https://cal.com/dimitris-geronikolos-z3h6en/chat-for-your-project',
}

const homePage = {
  _id: 'homePage',
  _type: 'homePage',
  heroEyebrow: L(
    'Επαγγελματική Κατασκευή & Ανακατασκευή Ιστοσελίδων',
    'Professional websites for Greek businesses',
  ),
  heroHeading: L(
    'Το site σου, έτοιμο και λειτουργικό σε',
    'Your website, live in',
  ),
  heroHighlight: L('2 εβδομάδες', '2 weeks'),
  heroBody: T(
    'Γρήγορη κατασκευή ιστοσελίδων και eshop για μικρές και μεσαίες ελληνικές επιχειρήσεις. Ξεκάθαρες τιμές, σύγχρονο design και μηδέν κρυφές χρεώσεις. Βλέπεις ακριβώς τι πληρώνεις πριν ξεκινήσουμε.',
    'Clear prices. Fast delivery. No hidden packages, no surprises. You see what you pay before you pay it.',
  ),
  ctaPrimaryLabel: L('Δες τις Τιμές', 'See the prices'),
  ctaSecondaryLabel: L('Ζήτησε Προσφορά', 'Get a quote'),
  receiptBadge: L('✓ Τελικές τιμές, χωρίς κρυφές χρεώσεις', '✓ Final prices, no hidden fees'),
  heroToolsLine: 'WordPress · Astro · React · Next.js · Sanity CMS',
  pricingEyebrow: L(
    'Υπηρεσίες & Τιμές Κατασκευής Ιστοσελίδας',
    'Transparent Web Design Services & Pricing',
  ),
  pricingHeading: L('Μία τιμή. Ένα χρονοδιάγραμμα. Καμία έκπληξη.', 'One price. One timeline. Zero surprises.'),
  pricingIntro: T(
    'Επιλογή πακέτου που ταιριάζει στις ανάγκες σου. Η τιμή που βλέπεις είναι η τελική τιμή που πληρώνεις.',
    'Choose the package that fits your business goals. The price you see is the price you pay.',
  ),
  pricingNote: T(
    'Ο χρόνος παράδοσης υπολογίζεται από τη στιγμή παραλαβής του υλικού, δηλαδή κειμένων και φωτογραφιών. Τελικές τιμές, χωρίς κρυφές χρεώσεις. Επιπλέον custom δυνατότητες τιμολογούνται πάντα κατόπιν δικής σου έγκρισης.',
    'Delivery time starts once your content, meaning texts and photos, has been received. Final prices, no hidden fees. Any extra custom features are always quoted and approved by you first.',
  ),
  popularBadgeLabel: L('Δημοφιλές', 'Popular'),
  packageCtaLabel: L('Το θέλω', 'I want this'),
  processEyebrow: L('Πώς Δουλεύει', 'How it works'),
  processHeading: L(
    'Τέσσερα βήματα για το νέο σου site, χωρίς άγχος.',
    'Four simple steps to your new website.',
  ),
  stackEyebrow: L('Τεχνολογία & Hosting', 'Tech Stack & Hosting'),
  stackHeading: L('Τα σωστά εργαλεία για τις δικές σου ανάγκες.', 'The right tools for your specific project.'),
  stackIntro: T(
    'Δεν σε περιορίζω σε μία πλατφόρμα επειδή είναι βολική για εμένα. Επιλέγω την τεχνολογία που ταιριάζει στο δικό σου site και σου εξηγώ το γιατί σε απλά ελληνικά.',
    'No forced one-size-fits-all platforms. I pick what makes your site fast, secure and easy to maintain, and I explain why in plain language.',
  ),
  stackTechHeading: L('Τεχνολογίες', 'Technologies'),
  stackTechIntro: T(
    'Από κλασικά WordPress sites μέχρι σύγχρονα headless έργα με Sanity CMS και γρήγορο front-end.',
    'From classic WordPress builds to modern headless stacks with Sanity CMS and a fast front-end.',
  ),
  stackHostingHeading: L('Hosting & Ασφάλεια', 'Hosting & Security'),
  stackHostingIntro: T(
    'Η φιλοσοφία μου είναι μηδέν συμβιβασμοί στην ταχύτητα. Το site σου φιλοξενείται σε κορυφαίους cloud servers, με αυτόματα backups και πιστοποιητικό SSL.',
    'Zero compromises on speed. Your site is hosted on enterprise cloud servers with automated backups and an SSL certificate.',
  ),
  workEyebrow: L('Δείγματα Δουλειάς', 'Work'),
  workHeading: L('Ιστοσελίδες & eshop που έχω κατασκευάσει.', 'Websites and stores I have built.'),
  workIntro: T(
    'Πραγματικά έργα για επιχειρήσεις, καταλύματα, εστίαση και συλλόγους σε όλη την Ελλάδα.',
    'Real projects for businesses, accommodation, hospitality and clubs across Greece.',
  ),
  faqEyebrow: L('Συχνές Ερωτήσεις', 'FAQ'),
  faqHeading: L(
    'Συχνές ερωτήσεις για την κατασκευή ιστοσελίδας',
    'Frequently asked questions',
  ),
  finalCtaEyebrow: L('Ξεκίνα Σήμερα', 'Start Today'),
  finalCtaHeading: L('Έτοιμος να αποκτήσεις το νέο σου site;', 'Ready to build or redesign your website?'),
  finalCtaBody: T(
    'Πες μου για την επιχείρησή σου και θα σου απαντήσω εντός 24 ωρών με ακριβή προσφορά και χρονοδιάγραμμα παράδοσης.',
    'Tell me about your business and get a clear, fixed proposal within 24 hours.',
  ),
  finalCtaPrimaryLabel: L('Ζήτησε Προσφορά', 'Get a quote'),
  finalCtaSecondaryLabel: L('694 733 3086', '694 733 3086'),
  quoteForm: {
    title: L('Πες μου για το project σου', 'Tell me about your project'),
    intro: T(
      'Κάθε προσφορά φτιάχνεται στα μέτρα της επιχείρησής σου. Συμπλήρωσε τη φόρμα και θα σου απαντήσω εντός 24 ωρών με μια αρχική εκτίμηση.',
      'Every quote is tailored to your business. Fill in the form and you will get an initial estimate within 24 hours.',
    ),
    nameLabel: L('Ονοματεπώνυμο', 'Full name'),
    emailLabel: L('Email', 'Email'),
    companyLabel: L('Επωνυμία επιχείρησης (προαιρετικά)', 'Company name (optional)'),
    packageLabel: L('Τι σε ενδιαφέρει', 'What are you interested in'),
    packagePlaceholder: L('Επίλεξε πακέτο', 'Choose a package'),
    otherPackageLabel: L('Κάτι άλλο, δεν είμαι σίγουρος', 'Something else, not sure yet'),
    hasSiteLabel: L('Έχω ήδη ιστοσελίδα και θέλω ανανέωση', 'I already have a website and want it redesigned'),
    existingUrlLabel: L('Διεύθυνση υπάρχουσας ιστοσελίδας', 'Existing website address'),
    descriptionLabel: L('Περιγραφή project', 'Project description'),
    timelineLabel: L('Επιθυμητό χρονοδιάγραμμα', 'Desired timeline'),
    timelinePlaceholder: L('Πότε το χρειάζεσαι;', 'When do you need it?'),
    timelineAsap: L('Άμεσα, εντός 1 μήνα', 'Immediately, within 1 month'),
    timelineSoon: L('Σύντομα, 1 έως 3 μήνες', 'Soon, 1 to 3 months'),
    timelineFlexible: L('Ευέλικτο, πάνω από 3 μήνες', 'Flexible, over 3 months'),
    submitLabel: L('Στείλε το αίτημα', 'Send request'),
    footnote: T(
      'Καμία δέσμευση. Θα λάβεις μια αρχική εκτίμηση εντός 24 ωρών.',
      'No commitment. You will receive an initial estimate within 24 hours.',
    ),
    successTitle: L('Ευχαριστώ, έλαβα το αίτημά σου', 'Thank you, I received your request'),
    successBody: T(
      'Καμία δέσμευση. Θα λάβεις μια αρχική εκτίμηση εντός 24 ωρών.',
      'No commitment. You will receive an initial estimate within 24 hours.',
    ),
    successCallPrompt: L('Θέλεις να μιλήσουμε πιο σύντομα;', 'Want to talk sooner?'),
    successCalLabel: L('Κλείσε ένα 15-λεπτο call →', 'Book a 15-minute call →'),
  },
  seoTitle: L(
    'Κατασκευή Ιστοσελίδων & Eshop | Το Site σου σε 2 Εβδομάδες | ftiaxesite.gr',
    'ftiaxesite.gr | Your website, live in 2 weeks',
  ),
  seoDescription: T(
    'Επαγγελματική κατασκευή και ανακατασκευή ιστοσελίδων για ελληνικές επιχειρήσεις. Ξεκάθαρες τιμές από 900 ευρώ, γρήγορη παράδοση σε 2 εβδομάδες, χωρίς κρυφές χρεώσεις.',
    'Professional websites for Greek businesses. Clear prices, fast delivery, no surprises.',
  ),
}

const servicePackages = [
  {
    _id: 'servicePackage-landing',
    _type: 'servicePackage',
    title: L('Landing Page', 'Landing Page'),
    slug: slug('landing'),
    description: T(
      'Μία δυνατή, γρήγορη σελίδα σχεδιασμένη να φέρνει πωλήσεις και αιτήματα. Ιδανικό για διαφημιστικές καμπάνιες, νέα προϊόντα ή προώθηση υπηρεσιών.',
      'High-converting single page for campaigns, events or lead generation.',
    ),
    price: 900,
    currency: 'EUR',
    deliveryDaysMin: 5,
    deliveryDaysMax: 10,
    features: [
      L('Fully responsive σε κινητά & desktop', 'Fully responsive on mobile & desktop'),
      L('Φόρμα επικοινωνίας & κουμπί άμεσης κλήσης', 'Contact form & click-to-call button'),
      L('Βασικό on-page SEO & speed optimization', 'Basic on-page SEO & speed optimization'),
      L('1 γύρος διορθώσεων', '1 revision round'),
    ],
    featured: false,
    order: 1,
  },
  {
    _id: 'servicePackage-corporate',
    _type: 'servicePackage',
    title: L('Εταιρικό Site', 'Corporate Website'),
    slug: slug('corporate'),
    description: T(
      'Ολοκληρωμένη κατασκευή ιστοσελίδας για την επιχείρησή σου, με παρουσίαση υπηρεσιών, εταιρικό προφίλ και blog.',
      'Complete business website with service pages, company profile and blog.',
    ),
    price: 1500,
    currency: 'EUR',
    deliveryDaysMin: 10,
    deliveryDaysMax: 14,
    features: [
      L('Έως 6 πλήρως σχεδιασμένες σελίδες', 'Up to 6 fully designed pages'),
      L('Εύκολο CMS για δικές σου ανανεώσεις', 'Easy CMS for your own updates'),
      L('Ενότητα blog / νέα & δομημένο SEO', 'Blog section & structured SEO'),
      L('2 γύροι διορθώσεων', '2 revision rounds'),
    ],
    featured: true,
    order: 2,
  },
  {
    _id: 'servicePackage-advanced',
    _type: 'servicePackage',
    title: L('Site με Δυνατότητες', 'Advanced Site'),
    slug: slug('advanced'),
    description: T(
      'Για επιχειρήσεις με ειδικές απαιτήσεις: online κρατήσεις, περιοχή μελών, πολυγλωσσία ή custom λειτουργίες.',
      'For businesses with special requirements: bookings, member areas, multilingual or custom features.',
    ),
    price: 2500,
    currency: 'EUR',
    deliveryDaysMin: 16,
    deliveryDaysMax: 21,
    features: [
      L('Όλα τα χαρακτηριστικά του Εταιρικού', 'Everything in Corporate'),
      L('Custom λειτουργικότητες & online booking', 'Custom features & online booking'),
      L('Διασύνδεση με CRM, newsletter & αυτοματισμούς', 'CRM, newsletter & automation integrations'),
      L('Πολυγλωσσική υποστήριξη (2 γλώσσες)', 'Multilingual support (2 languages)'),
    ],
    featured: false,
    order: 3,
  },
  {
    _id: 'servicePackage-eshop',
    _type: 'servicePackage',
    title: L('Ηλεκτρονικό Κατάστημα', 'E-shop'),
    slug: slug('eshop'),
    description: T(
      'Πλήρης κατασκευή eshop έτοιμου να δεχτεί παραγγελίες, με ασφαλείς πληρωμές και εύκολη διαχείριση.',
      'Turnkey online store ready to take orders, with secure payments and easy management.',
    ),
    price: 3500,
    currency: 'EUR',
    deliveryDaysMin: 16,
    deliveryDaysMax: 21,
    features: [
      L('WooCommerce ή custom e-shop', 'WooCommerce or custom store'),
      L('Σύνδεση με τράπεζες, Viva Wallet, IRIS & μεταφορικές', 'Bank, Viva Wallet, IRIS & courier integration'),
      L('Πλήρης διαχείριση προϊόντων & παραγγελιών', 'Full product & order management'),
      L('Εκπαίδευση χρήσης & οδηγός διαχείρισης', 'Hands-on training & admin guide'),
    ],
    featured: false,
    order: 4,
  },
]

const valueProps = [
  {
    _id: 'valueProp-1',
    _type: 'valueProp',
    title: L('Πιο γρήγορα από ένα agency', 'Faster than an agency'),
    description: T(
      'Παράδοση σε 2-3 εβδομάδες, όχι σε 2-3 μήνες. Ξεκινάς να προσελκύεις πελάτες πριν προλάβει ο ανταγωνισμός.',
      '2-3 weeks, not 2-3 months. You launch before the competition does.',
    ),
    order: 1,
  },
  {
    _id: 'valueProp-2',
    _type: 'valueProp',
    title: L('Πιο απλά από έναν freelancer', 'Simpler than a freelancer'),
    description: T(
      'Σαφές scope, συγκεκριμένο χρονοδιάγραμμα και σταθερή τιμή από την πρώτη μέρα. Ξέρεις ακριβώς τι παίρνεις.',
      'Clear scope and price from day one. You know exactly what you get.',
    ),
    order: 2,
  },
  {
    _id: 'valueProp-3',
    _type: 'valueProp',
    title: L('Καλύτερα από ένα έτοιμο template', 'Better than a template'),
    description: T(
      'Επαγγελματικό, custom design και εύκολο CMS που διαχειρίζεσαι εσύ, όχι αργά και φορτωμένα themes που κολλάνε.',
      'Professional design and a CMS you control, not a one-size-fits-all theme.',
    ),
    order: 3,
  },
]

const processSteps = [
  {
    _id: 'processStep-1',
    _type: 'processStep',
    title: L('Μιλάμε & Συμφωνούμε', 'We talk'),
    description: T(
      'Μου περιγράφεις τι χρειάζεσαι. Παίρνεις γραπτή προσφορά με σταθερή τιμή και ημερομηνία παράδοσης εντός 24 ωρών.',
      'Share your project details and receive a fixed-price quote within 24 hours.',
    ),
    order: 1,
  },
  {
    _id: 'processStep-2',
    _type: 'processStep',
    title: L('Σχεδιάζω', 'I design'),
    description: T(
      'Βλέπεις και εγκρίνεις το εικαστικό σχέδιο πριν γραφτεί η πρώτη γραμμή κώδικα.',
      'Review and approve the visual prototype before coding starts.',
    ),
    order: 2,
  },
  {
    _id: 'processStep-3',
    _type: 'processStep',
    title: L('Χτίζω', 'I build'),
    description: T(
      'Η ιστοσελίδα σου υλοποιείται με σύγχρονα, γρήγορα εργαλεία που προσφέρουν υψηλές ταχύτητες και ασφάλεια.',
      'Developed using modern, ultra-fast frameworks built to last.',
    ),
    order: 3,
  },
  {
    _id: 'processStep-4',
    _type: 'processStep',
    title: L('Παραδίδω & Εκπαιδεύω', 'I deliver'),
    description: T(
      'Το site βγαίνει στον αέρα. Το παραλαμβάνεις πλήρως λειτουργικό, μαζί με βίντεο-οδηγίες για να κάνεις αλλαγές μόνος σου.',
      'Your site goes live, complete with video training so you can manage it effortlessly.',
    ),
    order: 4,
  },
]

const techItems = [
  {id: 'wordpress', label: 'WordPress', group: 'technology', order: 1},
  {id: 'woocommerce', label: 'WooCommerce', group: 'technology', order: 2},
  {id: 'astro', label: 'Astro', group: 'technology', order: 3},
  {id: 'react', label: 'React', group: 'technology', order: 4},
  {id: 'nextjs', label: 'Next.js', group: 'technology', order: 5},
  {id: 'sanity', label: 'Sanity CMS', group: 'technology', order: 6},
  {id: 'digitalocean', label: 'DigitalOcean', group: 'hosting', order: 1},
  {id: 'vultr', label: 'Vultr', group: 'hosting', order: 2},
  {id: 'aws', label: 'AWS', group: 'hosting', order: 3},
  {id: 'gcp', label: 'Google Cloud', group: 'hosting', order: 4},
].map(({id, label, group, order}) => ({
  _id: `techItem-${id}`,
  _type: 'techItem',
  label,
  group,
  order,
}))

const projects = [
  {
    _id: 'project-moutaki',
    title: L('Moutaki', 'Moutaki'),
    slug: 'moutaki',
    liveUrl: 'https://moutaki.gr',
    category: L('Μόδα / E-commerce', 'Fashion / E-commerce'),
    description: T(
      'Εταιρική ιστοσελίδα μόδας με συλλογές και εύρεση καταστημάτων.',
      'Fashion brand website with collections and store finder.',
    ),
    gradientFrom: '#F2E3DC',
    gradientTo: '#DFC7BD',
    order: 1,
  },
  {
    _id: 'project-viartravel',
    title: L('ViaR Travel', 'ViaR Travel'),
    slug: 'viartravel',
    liveUrl: 'https://viartravel.gr',
    category: L('Τουρισμός / Μεταφορές', 'Travel / Transfers'),
    description: T(
      'Premium site για VIP μεταφορές και εξατομικευμένες εκδρομές.',
      'Premium site for VIP transfers and bespoke tours.',
    ),
    gradientFrom: '#1D3055',
    gradientTo: '#C7A15A',
    order: 2,
  },
  {
    _id: 'project-casaenastron',
    title: L('Casa Enastron', 'Casa Enastron'),
    slug: 'casaenastron',
    liveUrl: 'https://casaenastron.gr',
    category: L('Κατάλυμα / Τουρισμός', 'Accommodation / Tourism'),
    description: T(
      'Παραδοσιακή βίλα στην Κρήτη με σύστημα διαθεσιμότητας και κρατήσεων.',
      'Traditional Cretan villa with availability and booking system.',
    ),
    gradientFrom: '#1FA5B8',
    gradientTo: '#8FD3DC',
    order: 3,
  },
  {
    _id: 'project-baroquelebistrot',
    title: L('Baroque le Bistrot', 'Baroque le Bistrot'),
    slug: 'baroquelebistrot',
    liveUrl: 'https://baroquelebistrot.gr',
    category: L('Εστίαση', 'Hospitality'),
    description: T(
      'All day bar & bistrot στο Αργοστόλι, με online μενού και κρατήσεις.',
      'All-day bar and bistrot in Argostoli, with online menu and reservations.',
    ),
    gradientFrom: '#2A2318',
    gradientTo: '#B99248',
    order: 4,
  },
  {
    _id: 'project-al-anastasiou',
    title: L('AL. Anastasiou', 'AL. Anastasiou'),
    slug: 'al-anastasiou',
    liveUrl: 'https://al-anastasiou.gr',
    category: L('Κατασκευές', 'Construction'),
    description: T(
      'Κουφώματα αλουμινίου και ενεργειακή αναβάθμιση σε Εύβοια και Αττική.',
      'Aluminium frames and energy upgrades in Evia and Attica.',
    ),
    gradientFrom: '#141414',
    gradientTo: '#F5C518',
    order: 5,
  },
  {
    _id: 'project-kallitechnia',
    title: L('Γυμναστική Καλλιτεχνία', 'Gymnastiki Kallitechnia'),
    slug: 'kallitechnia',
    liveUrl: 'https://kallitechnia.gr',
    category: L('Αθλητισμός', 'Sports'),
    description: T(
      'Σύλλογος γυμναστικής Κεφαλονιάς, με τμήματα, νέα και εγγραφές.',
      'Kefalonia gymnastics club, with programmes, news and registrations.',
    ),
    gradientFrom: '#7B2FBE',
    gradientTo: '#E8622C',
    order: 6,
  },
  {
    _id: 'project-gaseunikis',
    title: L('ΓΑΣ Ευνίκη', 'GAS Eyniki'),
    slug: 'gaseunikis',
    liveUrl: 'https://gaseunikis.gr',
    category: L('Αθλητισμός', 'Sports'),
    description: T(
      'Σύλλογος ρυθμικής γυμναστικής, με τμήματα και online εγγραφή.',
      'Rhythmic gymnastics club, with programmes and online sign-up.',
    ),
    gradientFrom: '#E8206E',
    gradientTo: '#F7C6D9',
    order: 7,
  },
  {
    _id: 'project-sidebysideweb',
    title: L('Side by Side Web', 'Side by Side Web'),
    slug: 'sidebysideweb',
    liveUrl: 'https://sidebysideweb.gr',
    category: L('Συμβουλευτική', 'Consulting'),
    description: T(
      'Τεχνική συμβουλευτική, αρχιτεκτονική και custom εφαρμογές.',
      'Technical consulting, architecture and custom applications.',
    ),
    gradientFrom: '#16243D',
    gradientTo: '#E8622C',
    order: 8,
  },
].map((project) => ({
  _type: 'project',
  featured: true,
  ...project,
  slug: slug(project.slug),
}))

const faqItems = [
  {
    _id: 'faqItem-1',
    question: L(
      'Πόσο κοστίζει η κατασκευή ιστοσελίδας και τι περιλαμβάνει η τιμή;',
      'How much does a website cost and what does the price include?',
    ),
    answer: T(
      'Οι τιμές ξεκινούν από 900 ευρώ για Landing Page, 1.500 ευρώ για Εταιρικό Site, 2.500 ευρώ για Site με ειδικές λειτουργίες και 3.500 ευρώ για Ηλεκτρονικό Κατάστημα. Η τιμή είναι τελική και περιλαμβάνει σχεδιασμό, ανάπτυξη, προσαρμογή σε κινητά, βασικό SEO και εκπαίδευση διαχείρισης.',
      'Fixed packages start at 900 euros for a Landing Page, 1,500 euros for a Corporate Website, 2,500 euros for an Advanced Site and 3,500 euros for an E-shop. The price is final and covers design, development, mobile optimisation, basic SEO and admin training.',
    ),
    order: 1,
  },
  {
    _id: 'faqItem-2',
    question: L('Έχω ήδη site. Μπορώ να κάνω ανακατασκευή ιστοσελίδας;', 'I already have a website. Can you redesign it?'),
    answer: T(
      'Βεβαίως. Η ανακατασκευή ιστοσελίδας περιλαμβάνει τον επανασχεδιασμό του site σου σε σύγχρονη πλατφόρμα, τη μεταφορά των κειμένων και των προϊόντων σου, και τη διατήρηση των οργανικών σου θέσεων στο Google μέσω σωστών SEO redirects.',
      'Absolutely. A redesign covers rebuilding your site on a modern platform, migrating your texts and products, and preserving your organic Google rankings through proper SEO redirects.',
    ),
    order: 2,
  },
  {
    _id: 'faqItem-3',
    question: L('Πόσο σύντομα θα είναι έτοιμο το site μου;', 'How soon will my website be ready?'),
    answer: T(
      'Το σύνηθες χρονοδιάγραμμα είναι 5 έως 10 ημέρες για Landing Page, 10 έως 14 ημέρες για Εταιρικό Site και 16 έως 21 ημέρες για eshop ή πιο σύνθετα έργα. Ο χρόνος μετράει από τη στιγμή που θα παραληφθεί το υλικό, δηλαδή κείμενα και φωτογραφίες.',
      'The usual timeline is 5 to 10 days for a Landing Page, 10 to 14 days for a Corporate Website and 16 to 21 days for an e-shop or more complex build. Time counts from the moment your content, meaning texts and photos, is received.',
    ),
    order: 3,
  },
  {
    _id: 'faqItem-4',
    question: L('Θα μπορώ να αλλάζω τα κείμενα και τις φωτογραφίες μόνος μου;', 'Will I be able to update texts and photos myself?'),
    answer: T(
      'Ναι, εκατό τοις εκατό. Όλα τα sites παραδίδονται με εύχρηστο σύστημα διαχείρισης, όπως WordPress ή Sanity, και συνοδεύονται από βίντεο-εκπαίδευση ώστε να προσθέτεις νέες σελίδες, άρθρα ή προϊόντα χωρίς τεχνικές γνώσεις.',
      'Yes, entirely. Every site ships with an easy content management system such as WordPress or Sanity, plus video training so you can add pages, articles or products without technical knowledge.',
    ),
    order: 4,
  },
  {
    _id: 'faqItem-5',
    question: L('Υπάρχουν κρυφές ή μηνιαίες χρεώσεις;', 'Are there any hidden or monthly fees?'),
    answer: T(
      'Καμία απολύτως κρυφή χρέωση. Τα μόνα ετήσια έξοδα που έχει κάθε ιστοσελίδα στο διαδίκτυο είναι το όνομα, δηλαδή το domain name, και η φιλοξενία σε cloud server. Και τα δύο σου αναλύονται με πλήρη διαφάνεια πριν ξεκινήσουμε.',
      'Zero hidden fees. The only recurring costs any website has are the domain name and cloud hosting. Both are broken down for you transparently before we start.',
    ),
    order: 5,
  },
].map((item) => ({_type: 'faqItem', ...item}))

const legalDocs = [
  {
    _id: 'legalDoc-privacy',
    _type: 'legalDoc',
    type: 'privacy',
    title: L('Πολιτική Απορρήτου', 'Privacy Policy'),
    lastUpdated: '2026-07-01',
    body: legalBody([
      {
        heading: L('Ποιος είναι υπεύθυνος επεξεργασίας', 'Who is the data controller'),
        paragraphs: [
          [
            'Υπεύθυνος επεξεργασίας των δεδομένων σου είναι ο Δημήτρης Γερονικόλος, Κυθήρων 12, Περιστέρι 12133. Για οποιοδήποτε θέμα σχετικά με τα δεδομένα σου μπορείς να επικοινωνήσεις στο dgeronikolos@sidebysideweb.gr.',
            'The data controller is Dimitris Geronikolos, 12 Kythiron St, Peristeri 12133. For any matter regarding your data you can contact dgeronikolos@sidebysideweb.gr.',
          ],
        ],
      },
      {
        heading: L('Ποια δεδομένα συλλέγονται', 'What data is collected'),
        paragraphs: [
          [
            'Μέσω της φόρμας προσφοράς συλλέγονται μόνο όσα συμπληρώνεις εσύ:',
            'Through the quote form only the data you enter is collected:',
          ],
          ['- Ονοματεπώνυμο και διεύθυνση email', '- Full name and email address'],
          ['- Επωνυμία επιχείρησης, εφόσον τη δώσεις', '- Company name, if provided'],
          ['- Στοιχεία για το project σου και το χρονοδιάγραμμα', '- Details about your project and timeline'],
          [
            '- Τεχνικά δεδομένα περιήγησης μέσω των εργαλείων ανάλυσης',
            '- Technical browsing data through analytics tools',
          ],
        ],
      },
      {
        heading: L('Γιατί συλλέγονται', 'Why it is collected'),
        paragraphs: [
          [
            'Αποκλειστικά για να απαντήσω στο αίτημά σου, να ετοιμάσω προσφορά και να επικοινωνήσω μαζί σου για το συγκεκριμένο έργο. Νομική βάση είναι η λήψη μέτρων πριν από τη σύναψη σύμβασης, κατόπιν δικού σου αιτήματος.',
            'Solely to respond to your request, prepare a quote and communicate with you about that specific project. The legal basis is taking steps prior to entering into a contract, at your own request.',
          ],
        ],
      },
      {
        heading: L('Πού μοιράζονται', 'Who it is shared with'),
        paragraphs: [
          [
            'Τα δεδομένα σου δεν πωλούνται και δεν διαβιβάζονται σε τρίτους για διαφημιστικούς σκοπούς. Χρησιμοποιούνται πάροχοι υποδομής και εργαλεία όπως ο πάροχος φιλοξενίας, η υπηρεσία email και η πλατφόρμα κρατήσεων Cal.com, οι οποίοι επεξεργάζονται δεδομένα αποκλειστικά για λογαριασμό μου.',
            'Your data is never sold and is not passed to third parties for advertising. Infrastructure providers and tools are used, such as the hosting provider, the email service and the Cal.com booking platform, all processing data solely on my behalf.',
          ],
        ],
      },
      {
        heading: L('Πόσο διατηρούνται', 'How long it is kept'),
        paragraphs: [
          [
            'Τα αιτήματα που δεν εξελίσσονται σε συνεργασία διαγράφονται εντός 12 μηνών. Τα δεδομένα ενεργών ή ολοκληρωμένων έργων διατηρούνται όσο απαιτεί η φορολογική νομοθεσία.',
            'Requests that do not lead to a project are deleted within 12 months. Data from active or completed projects is kept for as long as tax legislation requires.',
          ],
        ],
      },
      {
        heading: L('Τα δικαιώματά σου', 'Your rights'),
        paragraphs: [
          [
            'Έχεις δικαίωμα πρόσβασης, διόρθωσης, διαγραφής, περιορισμού και φορητότητας των δεδομένων σου, καθώς και δικαίωμα εναντίωσης. Στείλε αίτημα στο dgeronikolos@sidebysideweb.gr και θα απαντήσω εντός 30 ημερών. Έχεις επίσης δικαίωμα καταγγελίας στην Αρχή Προστασίας Δεδομένων Προσωπικού Χαρακτήρα.',
            'You have the right to access, rectify, erase, restrict and port your data, as well as the right to object. Send a request to dgeronikolos@sidebysideweb.gr and I will reply within 30 days. You also have the right to lodge a complaint with the Hellenic Data Protection Authority.',
          ],
        ],
      },
    ]),
  },
  {
    _id: 'legalDoc-cookies',
    _type: 'legalDoc',
    type: 'cookies',
    title: L('Πολιτική Cookies', 'Cookie Policy'),
    lastUpdated: '2026-07-01',
    body: legalBody([
      {
        heading: L('Τι είναι τα cookies', 'What cookies are'),
        paragraphs: [
          [
            'Τα cookies είναι μικρά αρχεία κειμένου που αποθηκεύονται στη συσκευή σου όταν επισκέπτεσαι έναν ιστότοπο. Επιτρέπουν στη σελίδα να θυμάται επιλογές σου και βοηθούν στη μέτρηση της επισκεψιμότητας.',
            'Cookies are small text files stored on your device when you visit a website. They allow the site to remember your choices and help measure traffic.',
          ],
        ],
      },
      {
        heading: L('Απαραίτητα cookies', 'Necessary cookies'),
        paragraphs: [
          [
            'Χρειάζονται για τη βασική λειτουργία της σελίδας, όπως η αποθήκευση της γλώσσας που επέλεξες και η ασφαλής υποβολή της φόρμας. Δεν απαιτούν συγκατάθεση γιατί χωρίς αυτά η σελίδα δεν λειτουργεί σωστά.',
            'Required for the basic operation of the site, such as remembering your chosen language and securely submitting the form. They do not require consent because the site cannot work properly without them.',
          ],
        ],
      },
      {
        heading: L('Cookies στατιστικών', 'Analytics cookies'),
        paragraphs: [
          [
            'Χρησιμοποιείται το Google Tag Manager και τα συνδεδεμένα εργαλεία ανάλυσης, ώστε να γνωρίζω πόσοι επισκέπτονται τη σελίδα, από πού έρχονται και ποιες ενότητες διαβάζουν. Τα στοιχεία είναι συγκεντρωτικά και δεν σε ταυτοποιούν προσωπικά. Ενεργοποιούνται μόνο εφόσον δώσεις τη συγκατάθεσή σου.',
            'Google Tag Manager and connected analytics tools are used, so I can see how many people visit, where they come from and which sections they read. The data is aggregated and does not identify you personally. They are only activated if you give your consent.',
          ],
        ],
      },
      {
        heading: L('Πώς τα ελέγχεις', 'How to control them'),
        paragraphs: [
          [
            'Μπορείς να αλλάξεις ή να ανακαλέσεις τη συγκατάθεσή σου οποιαδήποτε στιγμή από τις ρυθμίσεις cookies στο κάτω μέρος της σελίδας. Μπορείς επίσης να διαγράψεις ή να αποκλείσεις cookies από τις ρυθμίσεις του browser σου, έχοντας υπόψη ότι ορισμένες λειτουργίες ίσως δεν δουλεύουν σωστά.',
            'You can change or withdraw your consent at any time from the cookie settings at the bottom of the page. You can also delete or block cookies from your browser settings, bearing in mind that some features may then not work correctly.',
          ],
        ],
      },
    ]),
  },
]

const seedDocuments = [
  siteSettings,
  homePage,
  ...servicePackages,
  ...valueProps,
  ...processSteps,
  ...techItems,
  ...projects,
  ...faqItems,
  ...legalDocs,
]

async function deleteObsoleteDocuments() {
  const candidates = await client.fetch<Array<{_id: string; _type: string}>>(
    `*[!(_type in $validTypes)]{_id, _type}`,
    {validTypes: VALID_TYPES},
  )

  const seedIds = new Set(seedDocuments.map((doc) => doc._id))
  const isSystemDoc = (id: string, type: string) =>
    id.startsWith('_.') ||
    id.startsWith('drafts.') ||
    type.startsWith('system.') ||
    type.startsWith('sanity.')
  const isAsset = (type: string) => type === 'sanity.imageAsset' || type === 'sanity.fileAsset'

  const deletable = candidates.filter(
    ({_id, _type}) => !seedIds.has(_id) && !isSystemDoc(_id, _type),
  )

  const sorted = [
    ...deletable.filter(({_type}) => !isAsset(_type)),
    ...deletable.filter(({_type}) => isAsset(_type)),
  ]

  if (sorted.length === 0) {
    console.log('No obsolete documents to delete.')
    return {deleted: [], failures: []}
  }

  console.log(`Deleting ${sorted.length} obsolete document(s)...`)
  const deleted: string[] = []
  const failures: string[] = []

  for (const { _id, _type } of sorted) {
    try {
      await client.delete(_id)
      deleted.push(_id)
      console.log(`  deleted ${_id} (${_type})`)
    } catch (error) {
      failures.push(_id)
      console.error(`  failed to delete ${_id} (${_type}):`, error instanceof Error ? error.message : error)
    }
  }

  return {deleted, failures}
}

function runDashCheck() {
  const scriptDir = dirname(fileURLToPath(import.meta.url))
  const result = spawnSync(process.execPath, [join(scriptDir, 'check-dashes.mjs')], {
    stdio: 'inherit',
  })
  if (result.status !== 0) {
    throw new Error('Dash check failed')
  }
}

async function seed() {
  runDashCheck()

  const transaction = client.transaction()
  for (const doc of seedDocuments) {
    transaction.createOrReplace(doc)
  }
  await transaction.commit()

  const seededIds = seedDocuments.map((doc) => doc._id)
  console.log(`Seeded ${seededIds.length} documents:`)
  for (const id of seededIds) {
    console.log(`  ${id}`)
  }

  const deletion = await deleteObsoleteDocuments()

  return {seededIds, deletion}
}

seed()
  .then(({seededIds, deletion}) => {
    console.log('\nSeed complete.')
    if (deletion.failures.length > 0) {
      console.warn(`Deletion skipped/failed for ${deletion.failures.length} document(s): ${deletion.failures.join(', ')}`)
    }
    console.log(`Deleted ${deletion.deleted.length} obsolete document(s).`)
    console.log(`Total seeded IDs: ${seededIds.length}`)
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
