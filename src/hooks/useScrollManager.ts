import { useCallback, useEffect, useRef } from 'react'
import { useLocation } from 'react-router'

function scrollToHash(hash: string, behavior: ScrollBehavior) {
  const id = decodeURIComponent(hash.slice(1))
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior, block: 'start' })
}

/**
 * Scroll + focus management for route changes:
 * - new route: scroll to top (or to the hash target) once the exit animation finishes
 * - same route, new hash: smooth scroll to the target
 * - initial load with a hash: scroll once the page has rendered
 */
export function useScrollManager() {
  const location = useLocation()
  const prevPath = useRef(location.pathname)
  const pendingHash = useRef<string>('')

  useEffect(() => {
    if (location.hash) {
      const t = window.setTimeout(() => scrollToHash(location.hash, 'auto'), 150)
      return () => window.clearTimeout(t)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (prevPath.current === location.pathname) {
      if (location.hash) scrollToHash(location.hash, 'smooth')
    } else {
      pendingHash.current = location.hash
    }
    prevPath.current = location.pathname
  }, [location])

  const onExitComplete = useCallback(() => {
    const hash = pendingHash.current
    pendingHash.current = ''
    if (hash) {
      window.setTimeout(() => scrollToHash(hash, 'auto'), 60)
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
    const main = document.getElementById('main')
    main?.focus({ preventScroll: true })
  }, [])

  return { location, onExitComplete }
}
