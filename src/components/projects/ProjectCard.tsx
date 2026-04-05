import type { Project, Accent } from '@/types/resume'
import { PROJECT_IMAGES, PROJECT_DISPLAY_NAMES, CARD_HOVER_BORDER, CARD_HOVER_TITLE } from '@/lib/constants'
import { TechChip } from '@/components/shared/TechChip'
import { LinkButton } from '@/components/shared/LinkButton'
import { formatPlainLine } from '@/lib/resume-utils'

interface ProjectCardProps {
  project: Project
  accent: Accent
  isLast?: boolean
  onDetails: () => void
}

function ProjectLinks({ project, accent }: { project: Project; accent: Accent }) {
  if (project.github_frontend_url && project.url) {
    return (
      <div className="flex gap-2 w-full">
        <LinkButton href={project.url} label="Backend" accent={accent} flex />
        <LinkButton href={project.github_frontend_url} label="Frontend" accent={accent} flex />
      </div>
    )
  }
  if (project.github_url && project.url && project.url !== project.github_url) {
    const secondLabel = project.url.includes('kaggle.com') ? 'Kaggle' : 'Link'
    return (
      <div className="flex gap-2 w-full">
        <LinkButton href={project.github_url} label="GitHub" accent={accent} flex />
        <LinkButton href={project.url} label={secondLabel} accent={accent} flex />
      </div>
    )
  }
  const href = project.url || project.github_url
  if (!href) return null
  const label = href.includes('github.com') ? 'GitHub' : 'Link'
  return <LinkButton href={href} label={label} accent={accent} />
}

export function ProjectCard({ project, accent, isLast = false, onDetails }: ProjectCardProps) {
  const img = PROJECT_IMAGES[project.id]
  const displayName = PROJECT_DISPLAY_NAMES[project.id] ?? project.name.toUpperCase()
  const hoverBorder = CARD_HOVER_BORDER[accent]
  const hoverTitle = CARD_HOVER_TITLE[accent]
  const year = project.period.split('/').pop() ?? project.period

  return (
    <div
      className={[
        'group bg-surface border border-outline-variant/20 p-1 flex flex-col',
        hoverBorder,
        'transition-colors duration-300',
        isLast ? 'md:col-span-2 lg:col-span-1' : '',
      ].join(' ')}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={img}
          alt={project.name}
          className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-3">
            <h3 className={[
              'font-headline text-lg font-bold tracking-tight text-on-surface transition-colors duration-300',
              hoverTitle,
            ].join(' ')}>
              {displayName}
            </h3>
            <button
              className="details-btn font-mono text-[10px] text-neutral-500 hover:text-white transition-colors uppercase tracking-widest"
              onClick={onDetails}
            >
              Details ↗
            </button>
          </div>
          <span className="text-[10px] font-mono text-neutral-500">{year}</span>
        </div>

        <p className="text-sm text-on-surface-variant font-body mb-4 line-clamp-2">
          {formatPlainLine(project.subtitle)}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech_stack.map(tech => (
            <TechChip key={tech} label={tech} accent={accent} />
          ))}
        </div>

        <div className="mt-auto">
          <ProjectLinks project={project} accent={accent} />
        </div>
      </div>
    </div>
  )
}
