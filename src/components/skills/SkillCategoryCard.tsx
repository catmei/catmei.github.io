import type { SkillCategory, Accent } from '@/types/resume'
import { SKILL_CARD_STYLES } from '@/lib/constants'
import { TechChip } from '@/components/shared/TechChip'
import { formatPlainLine } from '@/lib/resume-utils'

interface SkillCategoryCardProps {
  category: SkillCategory
  accent: Accent
}

export function SkillCategoryCard({ category, accent }: SkillCategoryCardProps) {
  const st = SKILL_CARD_STYLES[accent]
  const title = formatPlainLine(category.category)

  return (
    <div className={[
      'group bg-surface border border-outline-variant/20 p-1 flex flex-col',
      st.hoverBorder,
      'transition-colors duration-300',
    ].join(' ')}>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-4">
          <span className={`block w-4 h-px ${st.line}`} />
          <span className={`font-mono text-[10px] ${st.label} uppercase tracking-widest`}>{title}</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {category.tech_stack.map(tech => (
            <TechChip key={tech} label={tech} accent={accent} />
          ))}
        </div>
      </div>
    </div>
  )
}
