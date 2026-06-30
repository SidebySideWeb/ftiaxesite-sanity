// Shared / object types
import {localeString, localeText, localeRichText} from './objects/locale'
import {navLink, footerColumn} from './objects/seoAndNav'
import {
  serviceCard,
  valuePropItem,
  stepItem,
  detailedStepItem,
  faqItem,
  referenceItem,
  serviceBlock,
  metricChip,
  clientLogo,
} from './objects/repeatableItems'

// Document types
import {siteSettings} from './documents/siteSettings'
import {homePage} from './documents/homePage'
import {servicesPage} from './documents/servicesPage'
import {quotePage} from './documents/quotePage'
import {howWeWorkPage} from './documents/howWeWorkPage'
import {portfolioPage, caseStudy} from './documents/portfolio'
import {blogIndexPage, blogPost} from './documents/blog'
import {contactPage} from './documents/contactPage'
import {formSubmission} from './documents/formSubmission'

export const schemaTypes = [
  // objects first
  localeString,
  localeText,
  localeRichText,
  navLink,
  footerColumn,
  serviceCard,
  valuePropItem,
  stepItem,
  detailedStepItem,
  faqItem,
  referenceItem,
  serviceBlock,
  metricChip,
  clientLogo,

  // documents
  siteSettings,
  homePage,
  servicesPage,
  quotePage,
  howWeWorkPage,
  portfolioPage,
  caseStudy,
  blogIndexPage,
  blogPost,
  contactPage,
  formSubmission,
]
