import { useEffect, useState } from 'react'

const INVERSE_SELECTOR = 'main [data-surface="inverse"], footer[data-surface="inverse"]'

/**
 * Reports whether an inverse (contrast) section currently sits beneath the fixed
 * header, so the header can adopt the inverse surface. Re-connects when page
 * content changes (route transitions) or the viewport resizes.
 */
export function useHeaderOverInverse(headerHeight = 80): boolean {
  const [over, setOver] = useState(false)

  useEffect(() => {
    let observer: IntersectionObserver | null = null
    let timer = 0
    const active = new Set<Element>()

    const connect = () => {
      observer?.disconnect()
      active.clear()
      const bottomMargin = Math.max(0, window.innerHeight - headerHeight)
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) active.add(entry.target)
            else active.delete(entry.target)
          }
          setOver(active.size > 0)
        },
        { rootMargin: `0px 0px -${bottomMargin}px 0px`, threshold: 0 },
      )
      const targets = document.querySelectorAll(INVERSE_SELECTOR)
      if (targets.length === 0) setOver(false)
      targets.forEach((el) => observer?.observe(el))
    }

    const schedule = () => {
      window.clearTimeout(timer)
      timer = window.setTimeout(connect, 80)
    }

    connect()
    const main = document.getElementById('main')
    const mutation = new MutationObserver(schedule)
    if (main) mutation.observe(main, { childList: true, subtree: true })
    window.addEventListener('resize', schedule)

    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('resize', schedule)
      mutation.disconnect()
      observer?.disconnect()
    }
  }, [headerHeight])

  return over
}
