import type { Accent } from '@/types/resume'
import { LINK_BTN_THEME } from '@/lib/constants'

interface LinkButtonProps {
  href: string
  label: string
  accent: Accent
  flex?: boolean
}

export function LinkButton({ href, label, accent, flex = false }: LinkButtonProps) {
  const theme = LINK_BTN_THEME[accent]
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={[
        flex ? 'flex-1' : 'block w-full',
        'py-2.5 border border-outline/20',
        theme,
        'font-headline font-bold text-xs tracking-widest text-center transition-all uppercase',
      ].join(' ')}
    >
      {label}
    </a>
  )
}
