import type {Locale, LocalizedString} from '../lib/locale'
import type {HomePageDoc} from '../lib/types'

function pick(value: LocalizedString | undefined, locale: Locale): string {
  if (!value) return ''
  return (locale === 'en' ? value.en || value.el : value.el || value.en) || ''
}

function pickList(items: LocalizedString[] | undefined, locale: Locale): string[] {
  return (items ?? []).map((item) => pick(item, locale)).filter(Boolean)
}

function hostFromUrl(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url.replace(/^https?:\/\//, '').replace(/\/$/, '')
  }
}

function slugId(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/** Resolve a Sanity homePage document into locale-ready section blocks. */
export function resolveHomePage(doc: HomePageDoc, locale: Locale) {
  const form = doc.form
  return {
    meta: {
      title: pick(doc.seoTitle, locale),
      description: pick(doc.seoDescription, locale),
    },
    header: {
      cta: pick(doc.header?.cta, locale),
      callLabel: pick(doc.header?.callLabel, locale),
      nav: (doc.header?.nav ?? []).map((item) => ({
        label: pick(item.label, locale),
        href: item.href || '#',
      })),
    },
    hero: {
      eyebrow: pick(doc.hero?.eyebrow, locale),
      h1: pick(doc.hero?.h1, locale),
      sub: pick(doc.hero?.sub, locale),
      cta: pick(doc.hero?.cta, locale),
      micro: pick(doc.hero?.micro, locale),
      conditionNote: pick(doc.hero?.conditionNote, locale),
    },
    marquee: {
      bandA: pickList(doc.marquee?.bandA, locale),
      bandB: pickList(doc.marquee?.bandB, locale),
      sr: pick(doc.marquee?.sr, locale),
    },
    steps: {
      eyebrow: pick(doc.steps?.eyebrow, locale),
      title: pick(doc.steps?.title, locale),
      noteBefore: pick(doc.steps?.noteBefore, locale),
      noteBold: pick(doc.steps?.noteBold, locale),
      cta: pick(doc.steps?.cta, locale),
      marks: pickList(doc.steps?.marks, locale),
      liveUrl: pick(doc.steps?.liveUrl, locale),
      items: (doc.steps?.items ?? []).map((item) => ({
        time: pick(item.time, locale),
        title: pick(item.title, locale),
        ill: item.ill || 'ill-form',
      })),
    },
    showcase: {
      title: pick(doc.showcase?.title, locale),
      sub: pick(doc.showcase?.sub, locale),
      open: pick(doc.showcase?.open, locale),
      items: (doc.showcase?.items ?? []).map((item, index) => ({
        id: slugId(item.name || `project-${index}`),
        name: item.name || '',
        type: pick(item.type, locale),
        url: item.url || '#',
        host: hostFromUrl(item.url || ''),
        xl: index === 0,
      })),
    },
    included: {
      eyebrow: pick(doc.included?.eyebrow, locale),
      title: pick(doc.included?.title, locale),
      yesTitle: pick(doc.included?.yesTitle, locale),
      noTitle: pick(doc.included?.noTitle, locale),
      yes: (doc.included?.yes ?? []).map((item) => ({
        label: pick(item.label, locale),
        icon: item.icon || 'layers',
      })),
      no: (doc.included?.no ?? []).map((item) => ({
        title: pick(item.title, locale),
        note: pick(item.note, locale),
      })),
      noFoot: pick(doc.included?.noFoot, locale),
      biggerLink: pick(doc.included?.biggerLink, locale),
      yearlyBefore: pick(doc.included?.yearlyBefore, locale),
      yearlyAfter: pick(doc.included?.yearlyAfter, locale),
      yearlyTail: pick(doc.included?.yearlyTail, locale),
      yearlyTag: pick(doc.included?.yearlyTag, locale),
      yearlyPrice: doc.included?.yearlyPrice || '150 €',
      priceTag: pick(doc.included?.priceTag, locale),
      cta: pick(doc.included?.cta, locale),
    },
    form: {
      title: pick(form?.title, locale),
      sub: pick(form?.sub, locale),
      eyebrow: pick(form?.eyebrow, locale),
      fields: {
        name: {
          label: pick(form?.nameField?.label, locale),
          placeholder: pick(form?.nameField?.placeholder, locale),
          error: pick(form?.nameField?.error, locale),
        },
        contact: {
          label: pick(form?.contactField?.label, locale),
          placeholder: pick(form?.contactField?.placeholder, locale),
          error: pick(form?.contactField?.error, locale),
        },
        business: {
          label: pick(form?.businessField?.label, locale),
          placeholder: pick(form?.businessField?.placeholder, locale),
        },
      },
      submit: pick(form?.submit, locale),
      sending: pick(form?.sending, locale),
      consentLabel: pick(form?.consentLabel, locale),
      consentError: pick(form?.consentError, locale),
      privacyNotice: pick(form?.privacyNotice, locale),
      genericError: pick(form?.genericError, locale),
      chips: pickList(form?.chips, locale),
      assure: pickList(form?.assure, locale),
      success: {
        title: pick(form?.success?.title, locale),
        text: pick(form?.success?.text, locale),
        textHtml: pick(form?.success?.textHtml, locale),
        prompt: pick(form?.success?.prompt, locale),
        callCta: pick(form?.success?.callCta, locale),
      },
    },
    faq: {
      eyebrow: pick(doc.faq?.eyebrow, locale),
      sideTitle: pick(doc.faq?.sideTitle, locale),
      sidePrompt: pick(doc.faq?.sidePrompt, locale),
      items: (doc.faq?.items ?? []).map((item, index) => ({
        id: item.id || `faq-${index}`,
        q: pick(item.q, locale),
        a: pick(item.a, locale),
      })),
    },
    packages: {
      eyebrow: pick(doc.packages?.eyebrow, locale),
      title: pick(doc.packages?.title, locale),
      note: pick(doc.packages?.note, locale),
      cta: pick(doc.packages?.cta, locale),
      askLabel: pick(doc.packages?.askLabel, locale),
      items: (doc.packages?.items ?? []).map((item) => ({
        name: pick(item.name, locale),
        price: pick(item.price, locale),
        text: pick(item.text, locale),
      })),
    },
    footer: {
      identity: pick(doc.footer?.identity, locale),
      address: pick(doc.footer?.address, locale),
      contact: pick(doc.footer?.contact, locale),
      family: pick(doc.footer?.family, locale),
      links: (doc.footer?.links ?? []).map((item) => ({
        label: pick(item.label, locale),
        href: item.href || '/',
      })),
    },
  }
}

export type ResolvedHome = ReturnType<typeof resolveHomePage>
export type HomeSection = keyof ResolvedHome
