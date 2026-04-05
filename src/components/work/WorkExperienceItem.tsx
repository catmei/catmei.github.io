import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { WorkExperience, Accent } from '@/types/resume'
import { JOB_ACCENT_STYLES } from '@/lib/constants'
import { formatCompanyHeadline, formatPeriod, formatPlainLine, formatBulletText } from '@/lib/resume-utils'

interface WorkExperienceItemProps {
  job: WorkExperience
  accent: Accent
}

export function WorkExperienceItem({ job, accent }: WorkExperienceItemProps) {
  const [isOpen, setIsOpen] = useState(false)
  const st = JOB_ACCENT_STYLES[accent]
  const headline = formatCompanyHeadline(job.company)
  const period = formatPeriod(job.period)
  const role = formatPlainLine(job.role)

  return (
    <div className="experience-item relative pl-12 group" data-resume-id={job.id}>
      {/* Timeline line */}
      <div className={`absolute left-0 top-0 h-full w-px ${st.line} transition-colors`} />
      {/* Timeline dot */}
      <div className={`absolute left-[-4px] top-2 w-2 h-2 ${st.dot}`} />

      {/* Toggle button */}
      <button
        type="button"
        className="exp-toggle w-full text-left cursor-pointer"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(o => !o)}
      >
        <div className="mb-1 flex flex-wrap items-center justify-between gap-4">
          <h3 className="font-headline text-2xl font-bold text-on-surface">{headline}</h3>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] text-neutral-500">{period}</span>
            <motion.span
              className="exp-chevron font-mono text-[10px] text-white"
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              &gt;
            </motion.span>
          </div>
        </div>
        <p className={`font-mono text-[10px] ${st.roleClass} tracking-widest uppercase`}>{role}</p>
      </button>

      {/* Expandable bullets */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.ul
            className="exp-bullets mt-3 space-y-3 text-sm"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: 'hidden' }}
          >
            {job.bullets.map(b => (
              <li key={b.id}>
                <span className="font-mono text-[10px] text-white uppercase tracking-wider block mb-0.5">
                  {formatBulletText(b.title)}
                </span>
                <span className="text-on-surface-variant font-body leading-relaxed">
                  {formatBulletText(b.text)}
                </span>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
