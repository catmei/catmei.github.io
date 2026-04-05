import { useState } from 'react'
import type { Project } from '@/types/resume'
import { PROJECT_ORDER, PROJECT_ACCENTS, PROJECT_DISPLAY_NAMES } from '@/lib/constants'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { ProjectModal } from '@/components/projects/ProjectModal'
import { SectionHeader } from '@/components/layout/SectionHeader'

interface ProjectsSectionProps {
  projects: Project[]
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [activeProject, setActiveProject] = useState<Project | null>(null)

  const projectMap = Object.fromEntries(projects.map(p => [p.id, p]))
  const ordered = PROJECT_ORDER.map(id => projectMap[id]).filter(Boolean)

  return (
    <section id="projects" className="py-24 px-8 md:px-24 bg-surface-container-lowest relative">
      <div className="absolute inset-0 grid-bg opacity-100 pointer-events-none" />

      <div className="relative z-10 mb-16">
        <SectionHeader index="01" label="Projects" title="Projects" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {ordered.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            accent={PROJECT_ACCENTS[project.id] ?? 'primary'}
            isLast={i === ordered.length - 1}
            onDetails={() => setActiveProject(project)}
          />
        ))}
      </div>

      <ProjectModal
        project={activeProject}
        displayName={activeProject ? (PROJECT_DISPLAY_NAMES[activeProject.id] ?? activeProject.name.toUpperCase()) : ''}
        onClose={() => setActiveProject(null)}
      />
    </section>
  )
}
