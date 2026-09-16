import { useCallback } from 'react'

/**
 * One shared IntersectionObserver for every scroll-reveal element on the page.
 * Elements get `.is-visible` once and are then unobserved, so nothing keeps running.
 */
let observer: IntersectionObserver | null = null

function getObserver(): IntersectionObserver | null {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return null
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer?.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.1 },
    )
  }
  return observer
}

/** Returns a ref callback that registers the element for reveal-on-scroll. */
export function useRevealRef() {
  return useCallback((el: HTMLElement | null) => {
    if (!el) return
    const io = getObserver()
    if (!io) {
      el.classList.add('is-visible')
      return
    }
    io.observe(el)
  }, [])
}
