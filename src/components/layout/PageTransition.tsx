import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { EASE } from '@/lib/utils'

/** Page entrance: opacity + small translateY (transform only). */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6, transition: { duration: 0.2, ease: EASE } }}
      transition={{ duration: 0.4, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}
