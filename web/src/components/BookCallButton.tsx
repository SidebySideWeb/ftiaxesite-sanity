import {getCalApi} from '@calcom/embed-react'
import {useEffect} from 'react'

export default function BookCallButton() {
  useEffect(() => {
    ;(async function () {
      const cal = await getCalApi({namespace: '15min'})
      cal('ui', {hideEventTypeDetails: false, layout: 'month_view'})
    })()
  }, [])

  return (
    <button
      type="button"
      className="inline-block w-full rounded-full bg-primary px-8 py-4 font-label-lg text-lg text-on-primary shadow-sm transition-all duration-300 hover:translate-y-[-1px] hover:shadow-md active:scale-95 sm:w-auto"
      data-cal-namespace="15min"
      data-cal-link="dimitris-geronikolos-z3h6en/15min"
      data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
    >
      Κλείσε ένα 15-λεπτο call →
    </button>
  )
}
