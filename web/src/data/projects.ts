export type ShowcaseProject = {
  readonly id: string
  readonly name: string
  readonly url: string
  readonly size?: 'xl'
  readonly type: {readonly el: string; readonly en: string}
}

export const SHOWCASE_PROJECTS: readonly ShowcaseProject[] = [
  {
    id: 'baroque',
    name: 'Baroque le Bistrot',
    url: 'https://baroquelebistrot.gr',
    size: 'xl',
    type: {el: 'Εστιατόριο και μπιστρό, Κεφαλονιά', en: 'Restaurant and bistrot, Kefalonia'},
  },
  {
    id: 'casa-enastron',
    name: 'Casa Enastron',
    url: 'https://casaenastron.gr',
    type: {el: 'Βίλα με κρατήσεις, Κρήτη', en: 'Villa with bookings, Crete'},
  },
  {
    id: 'al-anastasiou',
    name: 'Al. Anastasiou',
    url: 'https://al-anastasiou.gr',
    type: {el: 'Κουφώματα αλουμινίου, Χαλκίδα', en: 'Aluminium windows and doors, Chalkida'},
  },
  {
    id: 'kallitechnia',
    name: 'Kallitechnia',
    url: 'https://kallitechnia.gr',
    type: {el: 'Γυμναστικός σύλλογος, Κεφαλονιά', en: 'Gymnastics club, Kefalonia'},
  },
  {
    id: 'moutaki',
    name: 'Moutaki',
    url: 'https://moutaki.com',
    type: {el: 'Ελληνική μάρκα γυναικείων ρούχων', en: 'Greek women\'s clothing brand'},
  },
]
