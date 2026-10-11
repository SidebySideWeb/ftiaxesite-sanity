/**
 * Replace homePage singleton with the live ftx lead-gen content.
 * Run: npx sanity exec scripts/seed-ftx-home.ts --with-user-token
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2025-01-01'})

const L = (el: string, en: string) => ({_type: 'localeString' as const, el, en})
const T = (el: string, en: string) => ({_type: 'localeText' as const, el, en})
const key = (prefix: string, i: number) => `${prefix}-${i}`

const homePage = {
  _id: 'homePage',
  _type: 'homePage',
  seoTitle: L(
    'Ιστοσελίδα σε 48 ώρες από 490 € | ftiaxesite.gr',
    'Website in 48 hours from €490 | ftiaxesite.gr',
  ),
  seoDescription: T(
    'Επαγγελματική ιστοσελίδα για μικρές επιχειρήσεις, από 490 €. Στείλε τα στοιχεία σου και δες το site σου online σε 48 ώρες από την παραλαβή του υλικού.',
    'A professional website for small businesses, from €490. Send us your details and see your site online within 48 hours of receiving your material.',
  ),
  header: {
    cta: L('Ζήτησε το site σου', 'Request your site'),
    callLabel: L('Κάλεσέ μας', 'Call us'),
    nav: [
      {_key: 'nav-0', label: L('Πακέτα', 'Packages'), href: '#paketo'},
      {_key: 'nav-1', label: L('Ερωτήσεις', 'FAQ'), href: '#erotiseis'},
    ],
  },
  hero: {
    eyebrow: L('ΚΑΤΑΣΚΕΥΗ ΙΣΤΟΣΕΛΙΔΑΣ · ΣΤΑΘΕΡΗ ΤΙΜΗ', 'WEBSITE BUILD · FIXED PRICE'),
    h1: L('Η ιστοσελίδα σου, έτοιμη σε 48 ώρες', 'Your website, ready in 48 hours'),
    sub: T(
      'Από <b>490 €</b>, σταθερή τιμή, χωρίς εκπλήξεις. Στείλε μας τα στοιχεία σου και δες το site σου online μέσα σε δύο μέρες.',
      'From <b>€490</b>, fixed price, no surprises. Send us your details and see your site online within two days.',
    ),
    cta: L('Ζήτησε το site σου', 'Request your site'),
    micro: L('Χωρίς δέσμευση. Απαντάμε μέσα σε λίγες ώρες.', 'No commitment. We reply within a few hours.'),
    conditionNote: T(
      'Τα 48 ώρες μετρούν από τη στιγμή που θα παραλάβουμε κείμενα και φωτογραφίες.',
      'The 48 hours start when we receive your texts and photos.',
    ),
  },
  marquee: {
    bandA: [
      L('Εστίαση', 'Food & drink'),
      L('Καταλύματα', 'Lodging'),
      L('Τεχνίτες', 'Trades'),
      L('Σύλλογοι', 'Clubs'),
      L('Τοπικές υπηρεσίες', 'Local services'),
      L('Μικροί επαγγελματίες', 'Small businesses'),
    ].map((label, i) => ({_key: key('mqa', i), ...label})),
    bandB: [
      L('Site σε 48 ώρες', 'Site in 48 hours'),
      L('Σταθερή τιμή', 'Fixed price'),
      L('Σωστό στο κινητό', 'Works on mobile'),
    ].map((label, i) => ({_key: key('mqb', i), ...label})),
    sr: T(
      'Για εστίαση, καταλύματα, τεχνίτες, συλλόγους, τοπικές υπηρεσίες και μικρούς επαγγελματίες.',
      'For food and drink, lodging, trades, clubs, local services and small businesses.',
    ),
  },
  steps: {
    eyebrow: L('ΠΩΣ ΔΟΥΛΕΥΕΙ', 'HOW IT WORKS'),
    title: L('Τρία βήματα. Δύο μέρες.', 'Three steps. Two days.'),
    noteBefore: L('Το χρονόμετρο των 48 ωρών ξεκινά ', 'The 48-hour timer starts '),
    noteBold: L(
      'όταν παραλάβουμε κείμενα και φωτογραφίες.',
      'when we receive your texts and photos.',
    ),
    cta: L('Ξεκίνα με το βήμα 1', 'Start with step 1'),
    marks: [L('0 ΩΡΕΣ', '0 HOURS'), L('24 ΩΡΕΣ', '24 HOURS'), L('48 ΩΡΕΣ', '48 HOURS')].map(
      (label, i) => ({_key: key('mark', i), ...label}),
    ),
    liveUrl: L('tositesou.gr', 'yoursite.gr'),
    items: [
      {
        _key: 'step-0',
        time: L('2 ΛΕΠΤΑ', '2 MIN'),
        title: L('Μας στέλνεις τα στοιχεία σου σε 2 λεπτά.', 'You send us your details in 2 minutes.'),
        ill: 'ill-form',
      },
      {
        _key: 'step-1',
        time: L('24 ΩΡΕΣ', '24 HOURS'),
        title: L('Σε 24 ώρες βλέπεις την πρώτη έκδοση.', 'In 24 hours you see the first version.'),
        ill: 'ill-prev',
      },
      {
        _key: 'step-2',
        time: L('48 ΩΡΕΣ', '48 HOURS'),
        title: L('Την εγκρίνεις και βγαίνει online.', 'You approve and it goes live.'),
        ill: 'ill-live',
      },
    ],
  },
  showcase: {
    title: L('Sites που έχουμε φτιάξει', 'Sites we have built'),
    sub: T(
      'Πραγματικά έργα, online. Άνοιξέ τα και δες τα και στο κινητό σου.',
      'Real projects, online. Open them and check them on your phone too.',
    ),
    open: L('Δες το site', 'View the site'),
    items: [
      {
        _key: 'sc-0',
        name: 'Baroque le Bistrot',
        url: 'https://baroquelebistrot.gr',
        type: L('ΕΣΤΙΑΣΗ', 'FOOD & DRINK'),
      },
      {
        _key: 'sc-1',
        name: 'Casa Enastron',
        url: 'https://casaenastron.gr',
        type: L('ΒΙΛΑ', 'VILLA'),
      },
      {
        _key: 'sc-2',
        name: 'Al. Anastasiou',
        url: 'https://al-anastasiou.gr',
        type: L('ΚΟΥΦΩΜΑΤΑ ΑΛΟΥΜΙΝΙΟΥ', 'ALUMINIUM JOINERY'),
      },
      {
        _key: 'sc-3',
        name: 'Kallitechnia',
        url: 'https://kallitechnia.gr',
        type: L('ΣΥΛΛΟΓΟΣ', 'CLUB'),
      },
      {
        _key: 'sc-4',
        name: 'Moutaki',
        url: 'https://moutaki.com',
        type: L('ΡΟΥΧΑ', 'FASHION'),
      },
    ],
  },
  included: {
    eyebrow: L('ΤΟ ΠΑΚΕΤΟ 48 ΩΡΩΝ', 'THE 48 HOUR PACKAGE'),
    title: L('Τι περιλαμβάνει η τιμή.', 'What the price includes.'),
    yesTitle: L('ΠΕΡΙΛΑΜΒΑΝΕΤΑΙ', 'INCLUDED'),
    noTitle: L('ΔΕΝ ΠΕΡΙΛΑΜΒΑΝΕΤΑΙ', 'NOT INCLUDED'),
    yes: [
      {label: L('Έως 5 ενότητες', 'Up to 5 sections'), icon: 'layers'},
      {label: L('Σωστή εμφάνιση στο κινητό', 'Looks right on mobile'), icon: 'phone'},
      {label: L('Φόρμα επικοινωνίας', 'Contact form'), icon: 'mail'},
      {label: L('Χάρτης Google', 'Google Map'), icon: 'pin'},
      {label: L('Βασικό SEO', 'Basic SEO'), icon: 'search'},
      {label: L('SSL', 'SSL'), icon: 'lock'},
    ].map((item, i) => ({_key: key('yes', i), ...item})),
    no: [
      {
        title: L('Κείμενα και φωτογραφίες', 'Texts and photos'),
        note: L('Τα φέρνεις εσύ.', 'You provide them.'),
      },
      {
        title: L('Ηλεκτρονικό κατάστημα', 'Online store'),
        note: L('Προσφέρεται ξεχωριστά.', 'Offered separately.'),
      },
      {
        title: L('Ειδικές λειτουργίες', 'Special features'),
        note: L('Προσφέρονται ξεχωριστά.', 'Offered separately.'),
      },
    ].map((item, i) => ({_key: key('no', i), ...item})),
    noFoot: L('Χρειάζεσαι κάτι από αυτά;', 'Need one of these?'),
    biggerLink: L('Δες τα μεγαλύτερα πακέτα', 'See the larger packages'),
    yearlyBefore: L('Domain και hosting: ', 'Domain and hosting: '),
    yearlyAfter: L('/έτος', '/year'),
    yearlyTail: L(', το γράφουμε από την αρχή.', ', we write it up front.'),
    yearlyTag: L('ΕΤΗΣΙΟ ΚΟΣΤΟΣ', 'YEARLY COST'),
    yearlyPrice: '150 €',
    priceTag: L('ΣΤΑΘΕΡΗ ΤΙΜΗ · ΕΤΟΙΜΟ ΣΕ 48 ΩΡΕΣ', 'FIXED PRICE · LIVE IN 48 HOURS'),
    cta: L('Το θέλω για τη δουλειά μου', 'I want this for my business'),
  },
  form: {
    title: L('Αίτημα για ιστοσελίδα', 'Website request'),
    sub: L('Τρία πεδία. Δύο λεπτά', 'Three fields. Two minutes'),
    eyebrow: L('ΖΗΤΗΣΕ ΤΟ SITE ΣΟΥ', 'REQUEST YOUR SITE'),
    nameField: {
      label: L('Όνομα', 'Name'),
      placeholder: L('Πώς σε λένε;', 'What should we call you?'),
      error: L('Γράψε το όνομά σου.', 'Please enter your name.'),
    },
    contactField: {
      label: L('Τηλέφωνο ή email', 'Phone or email'),
      placeholder: L('69xx xxx xxx ή το email σου', '69xx xxx xxx or your email'),
      error: L(
        'Γράψε ένα τηλέφωνο ή ένα email για να σε βρούμε.',
        'Please enter a phone number or an email so we can reach you.',
      ),
    },
    businessField: {
      label: L('Τι δουλειά κάνεις;', 'What do you do?'),
      placeholder: L(
        'π.χ. ταβέρνα, ηλεκτρολόγος, ενοικιαζόμενα',
        'e.g. tavern, electrician, rooms to let',
      ),
    },
    submit: L('Στείλε το αίτημα', 'Send the request'),
    sending: L('Στέλνεται…', 'Sending…'),
    consentLabel: T(
      'Συμφωνώ να χρησιμοποιηθούν τα στοιχεία μου μόνο για να απαντήσετε στο αίτημά μου. <a href="/privacy/">Πολιτική Απορρήτου</a>',
      'I agree that my details may be used only to reply to my request. <a href="/en/privacy/">Privacy Policy</a>',
    ),
    consentError: L(
      'Χρειάζεται η συγκατάθεσή σου για να στείλουμε το αίτημα.',
      'Your consent is required to send the request.',
    ),
    privacyNotice: T(
      'Στέλνοντας τη φόρμα, τα στοιχεία σου χρησιμοποιούνται μόνο για να απαντήσουμε στο αίτημά σου. Δες την <a href="/privacy/">Πολιτική Απορρήτου</a>.',
      'By sending this form, your details are used only to reply to your request. See our <a href="/en/privacy/">Privacy Policy</a>.',
    ),
    genericError: T(
      'Δεν στάλθηκε το αίτημα. Δοκίμασε ξανά ή κάλεσε μας στο +30 694 733 3086.',
      'Your request was not sent. Please try again or call us on +30 694 733 3086.',
    ),
    chips: [
      L('Εστίαση', 'Food & drink'),
      L('Κατάλυμα', 'Lodging'),
      L('Τεχνίτης', 'Trades'),
      L('Σύλλογος', 'Club'),
      L('Κατάστημα', 'Shop'),
    ].map((label, i) => ({_key: key('chip', i), ...label})),
    assure: [
      L('Σταθερή τιμή, από 490 €', 'Fixed price, from 490 €'),
      L('Online σε 48 ώρες', 'Online in 48 hours'),
      L('Χωρίς δέσμευση', 'No commitment'),
    ].map((label, i) => ({_key: key('assure', i), ...label})),
    success: {
      title: L('Το πήραμε. Ευχαριστούμε.', 'Got it. Thank you.'),
      text: T(
        'Σου απαντάμε το ίδιο βράδυ ή την επόμενη μέρα.',
        'We reply the same evening or the next day.',
      ),
      textHtml: T(
        'Σου απαντάμε <b>το ίδιο βράδυ ή την επόμενη μέρα.</b>',
        'We reply <b>the same evening or the next day.</b>',
      ),
      prompt: T(
        'Θες να κερδίσεις χρόνο; Κλείσε τώρα ένα τηλεφώνημα 15 λεπτών.',
        'Want to save time? Book a 15 minute call now.',
      ),
      callCta: L('Κλείσε τηλεφώνημα 15 λεπτών', 'Book a 15 minute call'),
    },
  },
  faq: {
    eyebrow: L('ΕΡΩΤΗΣΕΙΣ', 'QUESTIONS'),
    sideTitle: L('Πριν ξεκινήσεις.', 'Before you start.'),
    sidePrompt: T(
      'Έχεις άλλη ερώτηση; Πάρε μας τηλέφωνο.',
      'Another question? Call us.',
    ),
    items: [
      {
        _key: 'faq-0',
        id: 'faq-kostos',
        q: L('Πόσο κοστίζει συνολικά;', 'What is the total cost?'),
        a: T(
          '<b>490 € για την ιστοσελίδα, μία φορά.</b> Μετά πληρώνεις μόνο domain και hosting, <span class="ph">150 €</span> τον χρόνο. Σου το γράφουμε από την αρχή, για να ξέρεις τι θα δώσεις.',
          '<b>490 € for the website, once.</b> After that you only pay domain and hosting, <span class="ph">150 €</span> a year. We write it up front so you know what you will pay.',
        ),
      },
      {
        _key: 'faq-1',
        id: 'faq-ylika',
        q: L('Τι χρειάζεται να σας στείλω;', 'What do I need to send you?'),
        a: T(
          'Τα κείμενα για κάθε ενότητα, τις φωτογραφίες σου και το λογότυπο, αν έχεις. Και τα στοιχεία επικοινωνίας που θέλεις να φαίνονται. Μόλις τα έχουμε όλα, ξεκινά το χρονόμετρο των 48 ωρών.',
          'The texts for each section, your photos, and your logo if you have one. Plus the contact details you want shown. Once we have everything, the 48-hour timer starts.',
        ),
      },
      {
        _key: 'faq-2',
        id: 'faq-allages',
        q: L('Μπορώ να ζητήσω αλλαγές;', 'Can I ask for changes?'),
        a: T(
          'Ναι. Όταν δεις την πρώτη έκδοση, μας λες τι θέλεις να αλλάξει και το διορθώνουμε πριν βγει online.',
          'Yes. When you see the first version, tell us what you want changed and we fix it before it goes live.',
        ),
      },
      {
        _key: 'faq-3',
        id: 'faq-domain',
        q: L('Ποιος κατέχει το domain;', 'Who owns the domain?'),
        a: T(
          '<b>Εσύ.</b> Το domain κατοχυρώνεται στο όνομά σου.',
          '<b>You.</b> The domain is registered in your name.',
        ),
      },
      {
        _key: 'faq-4',
        id: 'faq-megalytero',
        q: L('Τι γίνεται αν θέλω κάτι μεγαλύτερο;', 'What if I need something bigger?'),
        a: T(
          'Για περισσότερες σελίδες, ηλεκτρονικό κατάστημα ή ειδικές λειτουργίες, δες τα <a href="#megalytera">μεγαλύτερα πακέτα</a> ή γράψ\' το στη φόρμα. Θα σου πούμε τι ταιριάζει.',
          'For more pages, an online store, or special features, see the <a href="#megalytera">larger packages</a> or write it in the form. We will tell you what fits.',
        ),
      },
    ],
  },
  packages: {
    eyebrow: L('ΜΕΓΑΛΥΤΕΡΑ ΕΡΓΑ', 'LARGER PROJECTS'),
    title: L('Χρειάζεσαι κάτι μεγαλύτερο;', 'Need something bigger?'),
    note: T(
      'Για εταιρείες, ειδικές λειτουργίες και ηλεκτρονικά καταστήματα.',
      'For companies, special features, and online stores.',
    ),
    cta: L('Ζήτησε προσφορά', 'Request a quote'),
    askLabel: L('Ρώτησέ μας', 'Ask us'),
    items: [
      {
        _key: 'pkg-0',
        name: L('Corporate Site', 'Corporate Site'),
        price: L('1.500 €', '€1,500'),
        text: T(
          'Για εταιρείες με περισσότερες σελίδες.',
          'For companies with more pages.',
        ),
      },
      {
        _key: 'pkg-1',
        name: L('Site με λειτουργίες', 'Site with features'),
        price: L('2.500 €', '€2,500'),
        text: T(
          'Με ειδικές λειτουργίες για τη δουλειά σου.',
          'With special features for your work.',
        ),
      },
      {
        _key: 'pkg-2',
        name: L('eShop', 'eShop'),
        price: L('3.500 €', '€3,500'),
        text: T(
          'Ηλεκτρονικό κατάστημα για να πουλάς online.',
          'An online store so you can sell online.',
        ),
      },
    ],
  },
  footer: {
    identity: L('Side By Side Web Ε.Ε., ΑΦΜ 802759510', 'Side By Side Web E.E., VAT ID 802759510'),
    address: L('Σμόλικα, Βούλα', 'Smolika, Voula'),
    contact: T(
      'Τηλέφωνο +30 694 733 3086, email dgeronikolos@sidebysideweb.gr',
      'Phone +30 694 733 3086, email dgeronikolos@sidebysideweb.gr',
    ),
    family: L(
      'Μέλος της οικογένειας sidebysideweb.gr',
      'Part of the sidebysideweb.gr family',
    ),
    links: [
      {
        _key: 'fl-0',
        label: L('Πολιτική Απορρήτου', 'Privacy Policy'),
        href: '/privacy/',
      },
      {
        _key: 'fl-1',
        label: L('Πολιτική Cookies', 'Cookie Policy'),
        href: '/cookies/',
      },
      {
        _key: 'fl-2',
        label: L('Όροι παροχής υπηρεσιών', 'Terms of service'),
        href: '/terms/',
      },
    ],
  },
  workEyebrow: L('Δείγματα Δουλειάς', 'Work'),
  workHeading: L('Ιστοσελίδες & eshop που έχω κατασκευάσει.', 'Websites and stores I have built.'),
  workIntro: T(
    'Πραγματικά έργα για επιχειρήσεις, καταλύματα, εστίαση και συλλόγους σε όλη την Ελλάδα.',
    'Real projects for businesses, accommodation, hospitality and clubs across Greece.',
  ),
}

async function main() {
  await client.createOrReplace(homePage)
  console.log('Seeded homePage (ftx lead-gen content).')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
