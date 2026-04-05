import type { Accent } from '@/types/resume'
import { ACCENT_CHIP } from '@/lib/constants'
import { formatPlainLine } from '@/lib/resume-utils'

interface TechChipProps {
  label: string
  accent: Accent
}

export function TechChip({ label, accent }: TechChipProps) {
  const borderHover = ACCENT_CHIP[accent]
  return (
    <span
      className={[
        'px-2 py-0.5 bg-surface-container-high border-l border-white',
        borderHover,
        'transition-colors text-[10px] font-mono text-on-surface',
      ].join(' ')}
    >
      {formatPlainLine(label)}
    </span>
  )
}
