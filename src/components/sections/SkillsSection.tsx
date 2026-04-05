import type { SkillCategory } from '@/types/resume'
import { SKILL_ACCENTS_CYCLE } from '@/lib/constants'
import { SkillCategoryCard } from '@/components/skills/SkillCategoryCard'

interface SkillsSectionProps {
  skills: SkillCategory[]
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section id="skills" className="py-24 px-8 md:px-24">
      <div className="mb-12 flex flex-col gap-4">
        <span className="font-mono text-xs text-white tracking-[0.5em] uppercase">
          [04] Skills
        </span>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between sm:gap-8 lg:gap-12">
          <h2 className="font-headline shrink-0 text-4xl font-black tracking-tighter uppercase">
            Skills
          </h2>
          <ul className="grid min-w-0 flex-1 list-none grid-cols-2 gap-x-6 gap-y-2 pl-0 text-sm text-neutral-400 sm:max-w-2xl lg:max-w-3xl">
            <li className="flex min-w-0 gap-2">
              <span className="shrink-0 font-mono text-neutral-400">&gt;</span>
              <span>High-availability data pipelines</span>
            </li>
            <li className="flex min-w-0 gap-2">
              <span className="shrink-0 font-mono text-neutral-400">&gt;</span>
              <span>Agentic AI &amp; LLM orchestration</span>
            </li>
            <li className="flex min-w-0 gap-2">
              <span className="shrink-0 font-mono text-neutral-400">&gt;</span>
              <span>Multi-cloud infrastructure</span>
            </li>
            <li className="flex min-w-0 gap-2">
              <span className="shrink-0 font-mono text-neutral-400">&gt;</span>
              <span>Real-time streaming &amp; analytics</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((cat, i) => (
          <SkillCategoryCard
            key={cat.category}
            category={cat}
            accent={SKILL_ACCENTS_CYCLE[i % SKILL_ACCENTS_CYCLE.length]}
          />
        ))}
      </div>
    </section>
  )
}
