import { useTheme } from '@/hooks/useTheme'
import { Moon, Sun } from './Icons'
import { cn } from '@/lib/utils'

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme()
  const next = theme === 'dark' ? 'light' : 'dark'
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      className={cn(
        'grid size-11 place-items-center rounded-full text-fg transition-fast hover:bg-fg/8 focus-visible:outline-offset-2',
        className,
      )}
    >
      {theme === 'dark' ? <Sun className="size-5" /> : <Moon className="size-5" />}
    </button>
  )
}
