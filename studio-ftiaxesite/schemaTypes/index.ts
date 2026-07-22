import {localeString, localeText, localeRichText} from './objects/locale'

import {siteSettings} from './documents/siteSettings'
import {homePage} from './documents/homePage'
import {servicePackage} from './documents/servicePackage'
import {project} from './documents/project'
import {faqItem} from './documents/faqItem'
import {processStep} from './documents/processStep'
import {valueProp} from './documents/valueProp'
import {techItem} from './documents/techItem'
import {legalDoc} from './documents/legalDoc'
import {post} from './documents/post'
import {formSubmission} from './documents/formSubmission'

export const schemaTypes = [
  localeString,
  localeText,
  localeRichText,

  siteSettings,
  homePage,
  servicePackage,
  project,
  faqItem,
  processStep,
  valueProp,
  techItem,
  legalDoc,
  post,
  formSubmission,
]
