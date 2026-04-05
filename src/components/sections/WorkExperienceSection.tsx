import type { WorkExperience } from '@/types/resume'
import { JOB_ACCENTS } from '@/lib/constants'
import { WorkExperienceItem } from '@/components/work/WorkExperienceItem'
import { SectionHeader } from '@/components/layout/SectionHeader'

interface WorkExperienceSectionProps {
  jobs: WorkExperience[]
}

export function WorkExperienceSection({ jobs }: WorkExperienceSectionProps) {
  return (
    <section id="work_experience" className="py-24 px-8 md:px-24 bg-surface-container-low">
      <div className="max-w-4xl mx-auto">
        <SectionHeader index="02" label="Work_Experience" title="Work_Experience" withLine />

        <div className="space-y-12">
          {jobs.map(job => (
            <WorkExperienceItem
              key={job.id}
              job={job}
              accent={JOB_ACCENTS[job.id] ?? 'primary'}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
