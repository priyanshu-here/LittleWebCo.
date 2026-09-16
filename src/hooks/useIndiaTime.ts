import { useEffect, useState } from 'react'
import { site } from '@/data/site'

const formatter = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
  timeZone: site.location.timeZone,
})

export function useIndiaTime(): string {
  const [time, setTime] = useState(() => formatter.format(new Date()))
  useEffect(() => {
    const tick = () => setTime(formatter.format(new Date()))
    tick()
    const id = window.setInterval(tick, 60_000)
    return () => window.clearInterval(id)
  }, [])
  return time
}
