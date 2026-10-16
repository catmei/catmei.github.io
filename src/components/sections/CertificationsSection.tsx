import type { Certification } from '@/types/resume'
import { SKILL_ACCENTS_CYCLE, SKILL_CARD_STYLES } from '@/lib/constants'
import { LinkButton } from '@/components/shared/LinkButton'
import { SectionHeader } from '@/components/layout/SectionHeader'
import { formatPeriod, formatPlainLine } from '@/lib/resume-utils'

interface CertificationsSectionProps {
  certifications: Certification[]
}

export function CertificationsSection({ certifications }: CertificationsSectionProps) {
  if (certifications.length === 0) return null

  return (
    <section id="certifications" className="py-24 px-8 md:px-24 bg-surface-container-lowest relative">
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      <div className="relative z-10">
        <SectionHeader index="05" label="Certifications" title="Certifications" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, i) => {
            const accent = SKILL_ACCENTS_CYCLE[i % SKILL_ACCENTS_CYCLE.length]
            const styles = SKILL_CARD_STYLES[accent]
            return (
              <div
                key={cert.id}
                className={`p-6 bg-surface border border-outline-variant/20 ${styles.hoverBorder} transition-colors flex flex-col`}
              >
                <div className={`h-px w-8 mb-4 ${styles.line}`} />
                <span className={`font-mono text-[10px] tracking-widest uppercase mb-2 ${styles.label}`}>
                  {cert.issuer} &nbsp;//&nbsp; {formatPeriod(cert.period)}
                </span>
                <h3 className="font-headline text-lg font-bold tracking-tight text-on-surface mb-2">
                  {formatPlainLine(cert.name)}
                </h3>
                <p className="font-mono text-[10px] text-neutral-500 tracking-widest mb-6">{cert.skill}</p>
                {cert.url && (
                  <div className="mt-auto">
                    <LinkButton href={cert.url} label="Verify" accent={accent} />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
