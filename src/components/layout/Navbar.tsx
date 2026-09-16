import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { nav } from '@/data/site'
import { Container } from '@/components/ui/Container'
import { Wordmark } from '@/components/ui/Wordmark'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { ContactButton } from '@/components/ui/ContactButton'
import { Mail } from '@/components/ui/Icons'
import { useContact } from '@/components/contact/ContactContext'
import { useHeaderOverInverse } from '@/hooks/useHeaderTheme'
import { useTheme } from '@/hooks/useTheme'
import { cn, EASE } from '@/lib/utils'
import { MobileMenu } from './MobileMenu'

export function Navbar() {
  const { pathname } = useLocation()
  const { theme } = useTheme()
  const { open: openContact } = useContact()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const { scrollY } = useScroll()
  const overInverse = useHeaderOverInverse()
  const inverse = (overInverse && theme === 'light') || open

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 24)
    if (y > 320 && y > prev + 6) setHidden(true)
    else if (y < prev - 6 || y < 80) setHidden(false)
  })

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <>
      <motion.header
        {...(inverse ? { 'data-surface': 'inverse' } : {})}
        className="fixed inset-x-0 top-0 z-50 text-fg"
        initial={false}
        animate={{ y: hidden && !open ? '-100%' : '0%' }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        <div
          aria-hidden
          className={cn(
            'absolute inset-0 -z-10 border-b border-line-c bg-bg/85 backdrop-blur-md transition-opacity duration-300',
            scrolled && !open ? 'opacity-100' : 'opacity-0',
          )}
        />
        <Container className="flex h-16 items-center justify-between gap-4 md:h-20">
          <Link to="/" className="rounded-sm" aria-label="Little Web Company, home">
            <Wordmark className="text-[1.05rem] md:text-lg" />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'relative rounded-sm px-3 py-2 text-[0.9rem] tracking-[-0.005em] transition-fast',
                    isActive ? 'text-fg' : 'text-fg-muted hover:text-fg',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        aria-hidden
                        className="absolute inset-x-3 -bottom-px h-px bg-accent"
                        transition={{ duration: 0.35, ease: EASE }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-1 md:gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={openContact}
              aria-label="Contact us"
              title="Contact us"
              className="grid size-11 place-items-center rounded-full text-fg transition-fast hover:bg-fg/8"
            >
              <Mail className="size-5" />
            </button>
            <div className="hidden md:block">
              <ContactButton className="ml-1 h-11 px-5 text-sm" />
            </div>
            <button
              type="button"
              className="-mr-2 grid size-11 place-items-center rounded-full lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block h-3 w-6">
                <span
                  className={cn(
                    'absolute left-0 top-0 h-px w-6 bg-current transition-transform duration-300 ease-[var(--ease-out)]',
                    open && 'translate-y-[5.5px] rotate-45',
                  )}
                />
                <span
                  className={cn(
                    'absolute bottom-0 left-0 h-px w-6 bg-current transition-transform duration-300 ease-[var(--ease-out)]',
                    open && '-translate-y-[5.5px] -rotate-45',
                  )}
                />
              </span>
            </button>
          </div>
        </Container>
      </motion.header>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  )
}
