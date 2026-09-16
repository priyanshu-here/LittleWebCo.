import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router'
import { cn } from '@/lib/utils'
import { ArrowUpRight, ArrowRight } from './Icons'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'md' | 'lg'

interface BaseProps {
  variant?: Variant
  size?: Size
  icon?: 'arrow' | 'external' | 'none'
  className?: string
  children: ReactNode
}

type ButtonProps = BaseProps &
  (
    | { to: string; href?: never; onClick?: () => void; type?: never; disabled?: never }
    | { href: string; to?: never; onClick?: () => void; type?: never; disabled?: never }
    | ({ to?: never; href?: never } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>)
  )

const variants: Record<Variant, string> = {
  primary: 'bg-fg text-bg border border-fg hover:bg-accent hover:border-accent hover:text-paper',
  secondary: 'bg-transparent text-fg border border-fg/25 hover:border-fg hover:bg-fg hover:text-bg',
  ghost: 'bg-transparent text-fg border border-transparent px-0! hover:text-accent-text',
}

const sizes: Record<Size, string> = {
  md: 'h-12 px-6 text-[0.9375rem]',
  lg: 'h-14 px-8 text-base',
}

/**
 * Site button. Hover = subtle lift (transform) + colour transition, 240ms.
 */
export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', icon = 'arrow', className, children } = props
  const classes = cn(
    'group inline-flex items-center justify-center gap-3 rounded-full font-medium tracking-[-0.01em] transition-ui select-none',
    variant !== 'ghost' && 'hover:-translate-y-0.5 active:translate-y-0',
    'disabled:pointer-events-none disabled:opacity-50',
    variants[variant],
    sizes[size],
    className,
  )

  const Icon = icon === 'external' ? ArrowUpRight : ArrowRight
  const content = (
    <>
      <span>{children}</span>
      {icon !== 'none' && (
        <Icon
          className={cn(
            'size-4 shrink-0 transition-fast',
            icon === 'external' ? 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5' : 'group-hover:translate-x-0.5',
          )}
        />
      )}
    </>
  )

  if ('to' in props && props.to) {
    return (
      <Link to={props.to} className={classes} onClick={props.onClick}>
        {content}
      </Link>
    )
  }
  if ('href' in props && props.href) {
    const external = /^https?:/.test(props.href)
    return (
      <a href={props.href} className={classes} onClick={props.onClick} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {content}
      </a>
    )
  }
  const { variant: _v, size: _s, icon: _i, className: _c, children: _ch, ...rest } = props as BaseProps &
    ButtonHTMLAttributes<HTMLButtonElement>
  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  )
}
