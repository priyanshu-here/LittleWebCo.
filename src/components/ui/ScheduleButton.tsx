import { links } from '@/data/site'
import { Button } from './Button'

interface ScheduleButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'md' | 'lg'
  className?: string
  onClick?: () => void
}

export function ScheduleButton({ variant = 'primary', size = 'md', className, onClick }: ScheduleButtonProps) {
  if (links.scheduleIsExternal) {
    return (
      <Button href={links.schedule} icon="external" variant={variant} size={size} className={className} onClick={onClick}>
        Schedule a Call
      </Button>
    )
  }
  return (
    <Button to={links.schedule} variant={variant} size={size} className={className} onClick={onClick}>
      Schedule a Call
    </Button>
  )
}
