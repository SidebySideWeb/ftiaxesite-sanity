import {getCliClient} from 'sanity/cli'
import {loadProjectConfig} from './project-config'

const client = getCliClient({apiVersion: '2025-01-01'})
const cfg = loadProjectConfig()
const R = cfg.routes
const year = new Date().getFullYear()

const el = (text: string, en = '') => ({el: text, en})
const key = () => Math.random().toString(36).slice(2, 10)

async function seed() {
  const caseStudies = [
    {
      _id: 'caseStudy-casa-enastron',
      _type: 'caseStudy',
      title: 'CasaEnastron.gr',
      slug: {_type: 'slug', current: 'casa-enastron'},
      categoryBadge: el('Airbnb / Καταλύματα'),
      summary: el(
        'Πλήρης μεταφορά από ακριβή πλατφόρμα φιλοξενίας σε σύγχρονη υποδομή Cloudways — με σημαντική μείωση κόστους και βελτίωση ταχύτητας. Δημιουργήσαμε ένα custom περιβάλλον που επιτρέπει απευθείας κρατήσεις χωρίς προμήθειες τρίτων.',
      ),
      techStack: ['Astro', 'WordPress', 'Cloudways'],
      metricChips: [
        {_key: key(), icon: 'savings', label: el('Μείωση κόστους φιλοξενίας')},
        {_key: key(), icon: 'bolt', label: el('Βελτιωμένη ταχύτητα φόρτωσης')},
        {_key: key(), icon: 'calendar_today', label: el('Σύστημα κρατήσεων online')},
      ],
      featured: true,
      status: 'live',
      publishedDate: '2025-06-01',
    },
    {
      _id: 'caseStudy-coming-soon-ecommerce',
      _type: 'caseStudy',
      title: 'Σύντομα...',
      slug: {_type: 'slug', current: 'ecommerce-coming-soon'},
      categoryBadge: el('E-commerce'),
      summary: el('Ετοιμάζουμε την παρουσίαση αυτού του έργου.'),
      status: 'comingSoon',
    },
    {
      _id: 'caseStudy-coming-soon-professional-services',
      _type: 'caseStudy',
      title: 'Σύντομα...',
      slug: {_type: 'slug', current: 'professional-services-coming-soon'},
      categoryBadge: el('Professional Services'),
      summary: el('Ετοιμάζουμε την παρουσίαση αυτού του έργου.'),
      status: 'comingSoon',
    },
    {
      _id: 'caseStudy-coming-soon-corporate',
      _type: 'caseStudy',
      title: 'Σύντομα...',
      slug: {_type: 'slug', current: 'corporate-coming-soon'},
      categoryBadge: el('Corporate Site'),
      summary: el('Ετοιμάζουμε την παρουσίαση αυτού του έργου.'),
      status: 'comingSoon',
    },
  ]

  const siteSettings = {
    _id: 'siteSettings',
    _type: 'siteSettings',
    siteName: cfg.siteName,
    defaultSeoTitle: cfg.siteName,
    defaultSeoDescription:
      'Σχεδιάζουμε και αναπτύσσουμε custom ιστοσελίδες για μικρομεσαίες επιχειρήσεις στην Ελλάδα.',
    navLinks: [
      {_key: key(), label: el('Υπηρεσίες'), url: R.services},
      {_key: key(), label: el('Έργα'), url: R.portfolio},
      {_key: key(), label: el('Πώς Δουλεύουμε'), url: R.about},
      {_key: key(), label: el('Blog'), url: R.blog},
      {_key: key(), label: el('Επικοινωνία'), url: R.contact},
    ],
    navCtaLabel: el('Ζήτα Προσφορά'),
    navCtaUrl: R.quote,
    footerTagline: el(
      'Σχεδιάζουμε και αναπτύσσουμε ιστοσελίδες που λειτουργούν ως εργαλεία ανάπτυξης για την επιχείρησή σας.',
    ),
    footerColumns: [
      {
        _key: key(),
        columnTitle: el('Πλοήγηση'),
        links: [
          {_key: key(), label: el('Υπηρεσίες'), url: R.services},
          {_key: key(), label: el('Έργα'), url: R.portfolio},
          {_key: key(), label: el('Blog'), url: R.blog},
        ],
      },
      {
        _key: key(),
        columnTitle: el('Εταιρεία'),
        links: [
          {_key: key(), label: el('Πώς Δουλεύουμε'), url: R.about},
          {_key: key(), label: el('Επικοινωνία'), url: R.contact},
          {_key: key(), label: el(cfg.agencyName), url: cfg.agencyUrl},
          {_key: key(), label: el('Προσωπικά Δεδομένα'), url: '/privacy'},
        ],
      },
      {
        _key: key(),
        columnTitle: el('Social'),
        links: [
          {_key: key(), label: el('LinkedIn'), url: 'https://linkedin.com'},
          {_key: key(), label: el('Website'), url: cfg.siteUrl},
        ],
      },
    ],
    crossLinkText: el(cfg.agencyName),
    crossLinkUrl: cfg.agencyUrl,
    footerCopyrightLine: `© ${year} ${cfg.siteName}. All rights reserved.`,
    contactEmail: cfg.contactEmail,
    contactPhone: '+30 210 000 0000',
    contactAddress: 'Αθήνα, Ελλάδα',
  }

  const homePage = {
    _id: 'homePage',
    _type: 'homePage',
    heroBadgeIcon: 'verified',
    heroBadgeText: el('Εξειδικευμένοι στην Ελλάδα'),
    heroHeadingBefore: el('Ιστοσελίδες με'),
    heroHeadingHighlight: el('μεράκι'),
    heroHeadingAfter: el('και τεχνική αρτιότητα'),
    heroSubheading: el(
      'Σχεδιάζουμε και αναπτύσσουμε custom ιστοσελίδες για μικρομεσαίες επιχειρήσεις που θέλουν να ξεχωρίσουν στην ψηφιακή εποχή.',
    ),
    heroPrimaryCtaLabel: el('Ξεκινήστε το έργο σας'),
    heroPrimaryCtaUrl: R.quote,
    heroSecondaryCtaLabel: el('Δείτε το Portfolio'),
    heroSecondaryCtaUrl: R.portfolio,
    heroImageStatNumber: '10+',
    heroImageStatLabel: el('Χρόνια Εμπειρίας στον Σχεδιασμό'),
    trustBarHeading: el('Εμπιστεύονται την τεχνογνωσία μας'),
    trustBarClients: [
      {_key: key(), name: 'ALPHA TECH'},
      {_key: key(), name: 'RETAIL GREECE'},
      {_key: key(), name: 'MED LOGISTICS'},
      {_key: key(), name: 'CONSTRUCTION SA'},
    ],
    valuePropsHeading: el('Γιατί Astro + WordPress;'),
    valuePropsIntro: el(
      'Ο συνδυασμός της ταχύτητας του Astro με την ευκολία διαχείρισης του WordPress δημιουργεί το απόλυτο εργαλείο για την επιχείρησή σας.',
    ),
    valuePropItems: [
      {
        _key: key(),
        icon: 'bolt',
        title: el('Αστραπιαία Ταχύτητα'),
        description: el(
          'Οι ιστοσελίδες μας φορτώνουν σε λιγότερο από 1 δευτερόλεπτο, βελτιώνοντας το SEO και την εμπειρία του χρήστη.',
        ),
      },
      {
        _key: key(),
        icon: 'security',
        title: el('Απόλυτη Ασφάλεια'),
        description: el(
          'Με την αρχιτεκτονική Headless, η βάση δεδομένων σας παραμένει κρυφή και απρόσβλητη από εξωτερικές επιθέσεις.',
        ),
      },
      {
        _key: key(),
        icon: 'edit_note',
        title: el('Εύκολη Διαχείριση'),
        description: el(
          'Συνεχίστε να χρησιμοποιείτε το οικείο περιβάλλον του WordPress για να αλλάζετε κείμενα και εικόνες χωρίς τεχνικές γνώσεις.',
        ),
      },
    ],
    portfolioHeading: el('Πρόσφατα Έργα'),
    portfolioSubheading: el('Δείτε πώς βοηθήσαμε άλλες επιχειρήσεις να αναπτυχθούν.'),
    portfolioLinkLabel: el('Δείτε όλο το Portfolio'),
    portfolioLinkUrl: R.portfolio,
    portfolioPreviewItems: [
      {_key: key(), _type: 'reference', _ref: 'caseStudy-casa-enastron'},
      {_key: key(), _type: 'reference', _ref: 'caseStudy-coming-soon-ecommerce'},
    ],
    processHeading: el('Από τη στρατηγική στην υλοποίηση'),
    processIntro: el(
      'Ακολουθούμε μια δομημένη διαδικασία που εξασφαλίζει ότι το αποτέλεσμα θα είναι ανώτερο των προσδοκιών σας.',
    ),
    processSteps: [
      {
        _key: key(),
        number: '01',
        title: el('Στρατηγική & Έρευνα'),
        description: el('Αναλύουμε τον ανταγωνισμό και το κοινό σας για να θέσουμε τις σωστές βάσεις.'),
      },
      {
        _key: key(),
        number: '02',
        title: el('Σχεδιασμός UI/UX'),
        description: el('Δημιουργούμε μοναδικά designs που αντικατοπτρίζουν την ταυτότητα του brand σας.'),
      },
      {
        _key: key(),
        number: '03',
        title: el('Υλοποίηση & Test'),
        description: el('Αναπτύσσουμε την ιστοσελίδα με καθαρό κώδικα και πραγματοποιούμε εξαντλητικά tests.'),
      },
    ],
    ctaHeading: el('Είστε έτοιμοι για το επόμενο βήμα;'),
    ctaText: el(
      'Ελάτε να συζητήσουμε τις ανάγκες σας και να βρούμε την καλύτερη λύση για την ψηφιακή σας παρουσία.',
    ),
    ctaButtonLabel: el('Ξεκινήστε το έργο σας'),
    ctaButtonUrl: R.quote,
    ctaSubtext: el('Δωρεάν συμβουλευτική και προσφορά εντός 24 ωρών.'),
  }

  const servicesPage = {
    _id: 'servicesPage',
    _type: 'servicesPage',
    heroLabel: el('ΥΠΗΡΕΣΙΕΣ', 'SERVICES'),
    heroHeading: el('Βρες το σωστό site για την επιχείρησή σου'),
    heroSubheading: el(
      'Κάθε επιχείρηση έχει διαφορετικές ανάγκες. Δες τις κατηγορίες — η τελική τιμή διαμορφώνεται ανάλογα με το τι χρειάζεσαι.',
    ),
    serviceBlocks: [
      {
        _key: key(),
        title: el('Απλό Site Παρουσίασης'),
        body: el(
          'Ένα landing page ή μικρό site με λίγες ενότητες, χτισμένο με Astro για μέγιστη ταχύτητα. Περιλαμβάνει φιλοξενία, φόρμα επικοινωνίας και βασικό SEO setup.',
        ),
        idealForLabel: el(
          'Ιδανικό για: νέες επιχειρήσεις, ελεύθερους επαγγελματίες, καμπάνιες και προσωρινές ανάγκες.',
        ),
        priceNote: el('Ενδεικτικά από €500'),
        ctaLabel: el('Ζήτα Προσφορά για αυτό'),
        ctaUrl: R.quote,
      },
      {
        _key: key(),
        title: el('Site με Διαχείριση Περιεχομένου'),
        body: el(
          'Astro frontend με WordPress backend. Διαχειρίζεσαι μόνος σου περιεχόμενο, blog, και έως 10 σελίδες. Περιλαμβάνει εκπαίδευση χρήσης.',
        ),
        idealForLabel: el(
          'Ιδανικό για: επιχειρήσεις που θέλουν να ενημερώνουν μόνες τους το περιεχόμενό τους, χωρίς να εξαρτώνται από εμάς για κάθε αλλαγή.',
        ),
        priceNote: el('Ενδεικτικά από €1.200'),
        ctaLabel: el('Ζήτα Προσφορά για αυτό'),
        ctaUrl: R.quote,
      },
      {
        _key: key(),
        title: el('Σύνθετο Site / E-shop / Κρατήσεις'),
        body: el(
          'WooCommerce ή σύστημα κρατήσεων, πληρωμές online, και custom λειτουργίες προσαρμοσμένες στις ανάγκες της επιχείρησής σου.',
        ),
        idealForLabel: el('Ιδανικό για: e-shops, καταλύματα, υπηρεσίες με ραντεβού.'),
        priceNote: el('Ενδεικτικά από €1.800'),
        ctaLabel: el('Ζήτα Προσφορά για αυτό'),
        ctaUrl: R.quote,
        crossLinkNote: el(
          `Για πιο σύνθετα έργα με πολλούς εμπλεκόμενους ή ανάγκη για automations, δες και το ${cfg.agencyName}`,
        ),
      },
    ],
    addOnsHeading: el('Πρόσθετες υπηρεσίες κατόπιν συμφωνίας'),
    addOnsItems: [
      el('SEO βελτιστοποίηση'),
      el('Copywriting'),
      el('Εκπαίδευση χρήσης'),
      el('Μηνιαία συντήρηση'),
      el('Analytics setup'),
    ].map((item) => ({_key: key(), ...item})),
    faqHeading: el('Συχνές Ερωτήσεις'),
    faqItems: [
      {
        _key: key(),
        question: el('Θα μπορώ να διαχειρίζομαι το WordPress μόνος μου;'),
        answer: el(
          'Φυσικά! Στα πακέτα με διαχείριση περιεχομένου, περιλαμβάνεται εκπαίδευση χρήσης ώστε να μπορείτε να ανεβάζετε άρθρα, να αλλάζετε κείμενα και φωτογραφίες χωρίς να χρειάζεστε τεχνική βοήθεια για τα απλά.',
        ),
      },
      {
        _key: key(),
        question: el('Πόσος χρόνος χρειάζεται για την κατασκευή;'),
        answer: el(
          'Για ένα απλό site παρουσίασης χρειαζόμαστε 10-15 εργάσιμες. Για πιο σύνθετα projects, το χρονοδιάγραμμα καθορίζεται ανάλογα με τις ανάγκες και το υλικό που μας παρέχετε.',
        ),
      },
      {
        _key: key(),
        question: el('Περιλαμβάνεται το Hosting και το Domain;'),
        answer: el(
          'Η πρώτη χρονιά φιλοξενίας περιλαμβάνεται σε όλα μας τα πακέτα. Το Domain Name αποτελεί δική σας ιδιοκτησία και μπορούμε να σας βοηθήσουμε στη διαδικασία αγοράς ή μεταφοράς.',
        ),
      },
      {
        _key: key(),
        question: el('Τι υποστήριξη παρέχετε μετά το λανσάρισμα;'),
        answer: el(
          'Παραμένουμε δίπλα σας για οποιαδήποτε απορία ή πρόβλημα. Προσφέρουμε επίσης πακέτα μηνιαίας συντήρησης και αναβάθμισης για να είναι το site σας πάντα ασφαλές και ενημερωμένο.',
        ),
      },
      {
        _key: key(),
        question: el('Μπορώ να αλλάξω το design αργότερα;'),
        answer: el(
          'Ναι, η αρχιτεκτονική που χρησιμοποιούμε επιτρέπει την εύκολη ανανέωση του design ή την προσθήκη νέων λειτουργιών καθώς η επιχείρησή σας μεγαλώνει.',
        ),
      },
    ],
    bottomCtaHeading: el('Δεν ξέρεις τι χρειάζεσαι ακριβώς;'),
    bottomCtaText: el(
      'Πες μας λίγα λόγια για την επιχείρησή σου και θα σε καθοδηγήσουμε στην καλύτερη επιλογή.',
    ),
    bottomCtaButtonLabel: el('Ζήτα Προσφορά'),
  }

  const quotePage = {
    _id: 'quotePage',
    _type: 'quotePage',
    heroHeading: el('Πες μας για το project σου'),
    heroSubheading: el(
      'Κάθε προσφορά φτιάχνεται στα μέτρα της επιχείρησής σου. Συμπλήρωσε τη φόρμα — θα σου απαντήσουμε εντός 24 ωρών με μια αρχική εκτίμηση.',
    ),
    referenceHeading: el('Για να έχεις μια ιδέα:'),
    referenceItems: [
      {_key: key(), label: el('Απλό site παρουσίασης'), priceNote: el('από €500')},
      {_key: key(), label: el('Site με διαχείριση περιεχομένου (WordPress)'), priceNote: el('από €1.200')},
      {_key: key(), label: el('Σύνθετο site / e-shop / κρατήσεις'), priceNote: el('από €1.800')},
    ],
    referenceFootnote: el(
      'Η τελική τιμή εξαρτάται από τις ανάγκες σου — αριθμό σελίδων, λειτουργίες, χρονοδιάγραμμα.',
    ),
    nextStepsHeading: el('Τι γίνεται μετά;'),
    nextStepsItems: [
      el('Λαμβάνουμε το αίτημά σου και το μελετάμε'),
      el('Σου στέλνουμε μια αρχική πρόταση & εκτίμηση κόστους'),
      el('Αν προχωρήσουμε, ξεκινάμε με ένα σύντομο call'),
    ].map((item) => ({_key: key(), ...item})),
    bottomSectionHeading: el('Έχεις απορίες πριν ξεκινήσουμε;'),
    bottomSectionText: el(
      'Αν προτιμάς μια πιο άμεση επαφή, μπορείς να μας καλέσεις στο +30 210 000 0000 ή να μας στείλεις ένα email.',
    ),
    bottomSectionFaqLabel: el('Συχνές Ερωτήσεις'),
    bottomSectionFaqUrl: `${R.services}#faq`,
    bottomSectionPortfolioLabel: el('Δείτε τα Έργα μας'),
    bottomSectionPortfolioUrl: R.portfolio,
  }

  const portfolioPage = {
    _id: 'portfolioPage',
    _type: 'portfolioPage',
    heroHeading: el('Έργα που έχουμε υλοποιήσει'),
    heroSubheading: el(
      'Πραγματικά projects, πραγματικές επιχειρήσεις. Ανακαλύψτε πώς βοηθάμε τις εταιρείες να αναβαθμίσουν την ψηφιακή τους παρουσία με τεχνική αρτιότητα.',
    ),
    bottomCtaHeading: el('Θέλεις να είσαι το επόμενο case study μας;'),
    bottomCtaButtonLabel: el('Ζήτα Προσφορά'),
  }

  const howWeWorkPage = {
    _id: 'howWeWorkPage',
    _type: 'howWeWorkPage',
    heroHeading: el('Πώς δουλεύουμε'),
    heroSubheading: el(
      'Μια διαφανής, δομημένη διαδικασία από την πρώτη συζήτηση μέχρι το λανσάρισμα — ώστε να ξέρεις πάντα τι ακολουθεί.',
    ),
    timelineSteps: [
      {
        _key: key(),
        number: '01',
        icon: 'search',
        title: el('Ανακάλυψη & Στρατηγική'),
        description: el('Κατανοούμε τους στόχους, το κοινό και τις ανάγκες της επιχείρησής σας.'),
        duration: el('1 εβδομάδα'),
      },
      {
        _key: key(),
        number: '02',
        icon: 'palette',
        title: el('Σχεδιασμός UI/UX'),
        description: el('Σχεδιάζουμε τη δομή και την εμπειρία χρήστη πριν ξεκινήσει η ανάπτυξη.'),
        duration: el('1-2 εβδομάδες'),
      },
      {
        _key: key(),
        number: '03',
        icon: 'code',
        title: el('Ανάπτυξη'),
        description: el('Υλοποιούμε το site με καθαρό κώδικα, βελτιστοποίηση ταχύτητας και δοκιμές.'),
        duration: el('2-4 εβδομάδες'),
      },
      {
        _key: key(),
        number: '04',
        icon: 'rocket_launch',
        title: el('Λανσάρισμα & Υποστήριξη'),
        description: el('Παραδίδουμε το έργο, εκπαιδεύουμε την ομάδα σας και παραμένουμε δίπλα σας.'),
        duration: el('Συνεχής'),
      },
    ],
    alwaysIncludedHeading: el('Πάντα περιλαμβάνεται'),
    alwaysIncludedItems: [
      el('Βασικό SEO setup'),
      el('Responsive design'),
      el('Φιλοξενία πρώτου έτους'),
      el('Φόρμα επικοινωνίας'),
      el('Εκπαίδευση χρήσης (όπου εφαρμόζεται)'),
    ].map((item) => ({_key: key(), ...item})),
    bottomCtaHeading: el('Έτοιμος να ξεκινήσουμε;'),
    bottomCtaButtonLabel: el('Ζήτα Προσφορά'),
  }

  const blogIndexPage = {
    _id: 'blogIndexPage',
    _type: 'blogIndexPage',
    heroHeading: el('Blog'),
    heroSubheading: el('Συμβουλές, ιδέες και ενημερώσεις για ιστοσελίδες, SEO και ψηφιακή παρουσία.'),
    categories: [el('Όλα'), el('SEO'), el('Web Design'), el('WordPress'), el('Astro')].map((item) => ({
      _key: key(),
      ...item,
    })),
  }

  const contactPage = {
    _id: 'contactPage',
    _type: 'contactPage',
    heroHeading: el('Επικοινωνία'),
    heroSubheading: el('Στείλτε μας ένα μήνυμα — θα σας απαντήσουμε το συντομότερο δυνατό.'),
    infoCardEmail: cfg.contactEmail,
    infoCardLocation: el('Αθήνα, Ελλάδα'),
    infoCardResponseTime: el('Απάντηση εντός 24 ωρών'),
    infoCardPromptText: el('Προτιμάτε να μιλήσουμε απευθείας;'),
    infoCardCtaLabel: el('Ζήτα Προσφορά'),
  }

  const documents = [
    ...caseStudies,
    siteSettings,
    homePage,
    servicesPage,
    quotePage,
    portfolioPage,
    howWeWorkPage,
    blogIndexPage,
    contactPage,
  ]

  const transaction = client.transaction()
  for (const doc of documents) {
    transaction.createOrReplace(doc)
  }

  await transaction.commit()
  console.log(`Seeded ${documents.length} documents for ${cfg.siteName} (${cfg.sanity.projectId}/${cfg.sanity.dataset}).`)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
