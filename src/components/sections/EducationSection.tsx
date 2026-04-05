import type { Education } from '@/types/resume'
import { SectionHeader } from '@/components/layout/SectionHeader'

interface EducationSectionProps {
  education: Education[]
}

function EducationCard({ edu, index }: { edu: Education; index: number }) {
  const isActive = edu.period.toLowerCase().includes('present')
  const accent = index === 0 ? 'primary' : 'tertiary'

  const styles = {
    primary: {
      hover: 'hover:border-primary-container hover:shadow-[0_0_20px_rgba(0,240,255,0.08)]',
      statusColor: 'text-primary-container',
      dot: 'bg-primary-container animate-pulse shadow-[0_0_6px_rgba(0,240,255,0.8)]',
      titleHover: 'group-hover:text-primary',
    },
    tertiary: {
      hover: 'hover:border-tertiary hover:shadow-[0_0_20px_rgba(233,255,168,0.06)]',
      statusColor: 'text-tertiary',
      dot: 'bg-tertiary shadow-[0_0_6px_rgba(233,255,168,0.6)]',
      titleHover: 'group-hover:text-tertiary',
    },
  }[accent]

  const shortDegree = edu.degree.includes('Computer Science')
    ? 'OMSCS'
    : edu.degree.includes('Physics')
    ? 'Physics'
    : ''

  const formattedPeriod = edu.period
    .replace('--', '—')
    .replace(/(\d{2})\/(\d{4})/g, (_, m, y) => {
      const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
      return months[parseInt(m,10)-1] + ' ' + y
    })

  return (
    <div className={`p-8 bg-surface border border-outline-variant/20 ${styles.hover} transition-all group`}>
      <div className="flex items-start justify-between mb-4">
        <span className={`font-mono text-[10px] ${styles.statusColor} tracking-widest uppercase`}>
          {isActive ? 'ACTIVE' : 'COMPLETED'}
        </span>
        <div className={`w-2 h-2 ${styles.dot}`} />
      </div>
      <h3 className={`font-headline text-xl font-bold text-on-surface mb-2 ${styles.titleHover} transition-colors`}>
        {edu.institution}
      </h3>
      <p className="font-body text-sm text-on-surface-variant mb-1">{edu.degree}</p>
      {shortDegree && (
        <p className="font-mono text-[10px] text-neutral-500 mb-4">{shortDegree}</p>
      )}
      <div className="h-px bg-outline-variant/20 mb-4" />
      <p className="font-mono text-[10px] text-neutral-500 tracking-widest">
        {formattedPeriod} &nbsp;//&nbsp; {edu.location}
      </p>
    </div>
  )
}

export function EducationSection({ education }: EducationSectionProps) {
  return (
    <section id="education" className="py-24 px-8 md:px-24 bg-surface-container-lowest relative">
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <SectionHeader index="03" label="Education" title="Education" />

        <div className="grid md:grid-cols-2 gap-8">
          {education.map((edu, i) => (
            <EducationCard key={edu.institution} edu={edu} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
