import type { ReactNode } from 'react'
import { useContact } from '@/components/contact/ContactContext'
import { Button } from './Button'

interface ContactButtonProps {
  children?: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'md' | 'lg'
  className?: string
}

/** Opens the contact overlay. Default label: "Start a Project". */
export function ContactButton({ children = 'Start a Project', variant = 'primary', size = 'md', className }: ContactButtonProps) {
  const { open } = useContact()
  return (
    <Button onClick={open} variant={variant} size={size} className={className}>
      {children}
    </Button>
  )
}
