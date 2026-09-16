import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes, useParams } from 'react-router'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import { SkipLink } from '@/components/layout/SkipLink'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { FloatingContactButtons } from '@/components/layout/FloatingContactButtons'
import { PageTransition } from '@/components/layout/PageTransition'
import { ContactProvider } from '@/components/contact/ContactContext'
import { ContactModal } from '@/components/contact/ContactModal'
import { ThemeProvider } from '@/hooks/useTheme'
import { useScrollManager } from '@/hooks/useScrollManager'
import { HomePage } from '@/pages/HomePage'
import { ServicesPage } from '@/pages/ServicesPage'
import { WorkPage } from '@/pages/WorkPage'
import { ProjectPage } from '@/pages/ProjectPage'
import { AboutPage } from '@/pages/AboutPage'
import { ContactPage } from '@/pages/ContactPage'

// Lower-traffic pages are code-split.
const ProcessPage = lazy(() => import('@/pages/ProcessPage').then((m) => ({ default: m.ProcessPage })))
const FAQPage = lazy(() => import('@/pages/FAQPage').then((m) => ({ default: m.FAQPage })))
const BlogPage = lazy(() => import('@/pages/BlogPage').then((m) => ({ default: m.BlogPage })))
const BlogPostPage = lazy(() => import('@/pages/BlogPostPage').then((m) => ({ default: m.BlogPostPage })))
const LegalPage = lazy(() => import('@/pages/LegalPage').then((m) => ({ default: m.LegalPage })))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })))

/** Old /projects/:slug URLs keep working. */
function ProjectRedirect() {
  const { slug } = useParams()
  return <Navigate to={slug ? `/work/${slug}` : '/work'} replace />
}

export default function App() {
  const { location, onExitComplete } = useScrollManager()

  return (
    <ThemeProvider>
      <ContactProvider>
        <MotionConfig reducedMotion="user">
          <SkipLink />
          <Navbar />
          <main id="main" tabIndex={-1} className="outline-none">
            <AnimatePresence mode="wait" initial={false} onExitComplete={onExitComplete}>
              <PageTransition key={location.pathname}>
                <Suspense fallback={<div className="min-h-[60svh]" aria-busy="true" />}>
                  <Routes location={location}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/services" element={<ServicesPage />} />
                    <Route path="/work" element={<WorkPage />} />
                    <Route path="/work/:slug" element={<ProjectPage />} />
                    <Route path="/projects" element={<Navigate to="/work" replace />} />
                    <Route path="/projects/:slug" element={<ProjectRedirect />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/process" element={<ProcessPage />} />
                    <Route path="/faq" element={<FAQPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/pricing" element={<Navigate to="/services" replace />} />
                    <Route path="/blog" element={<BlogPage />} />
                    <Route path="/blog/:slug" element={<BlogPostPage />} />
                    <Route path="/privacy-policy" element={<LegalPage />} />
                    <Route path="/terms-and-conditions" element={<LegalPage />} />
                    <Route path="/cookie-policy" element={<LegalPage />} />
                    <Route path="/disclaimer" element={<LegalPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </Suspense>
              </PageTransition>
            </AnimatePresence>
          </main>
          <Footer />
          <FloatingContactButtons />
          <ContactModal />
        </MotionConfig>
      </ContactProvider>
    </ThemeProvider>
  )
}
