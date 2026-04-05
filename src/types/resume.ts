export interface Bullet {
  id: number
  title: string
  text: string
}

export interface WorkExperience {
  id: string
  company: string
  role: string
  period: string
  bullets: Bullet[]
}

export interface Project {
  id: string
  name: string
  url?: string
  github_url?: string
  github_frontend_url?: string
  period: string
  subtitle: string
  tech_stack: string[]
  award?: string | null
  bullets: Bullet[]
}

export interface SkillCategory {
  category: string
  tech_stack: string[]
}

export interface Education {
  institution: string
  location: string
  degree: string
  period: string
}

export interface Header {
  name: string
  email: string
  github_url: string
  linkedin_url: string
}

export interface ResumeData {
  header: Header
  work_experience: WorkExperience[]
  projects: Project[]
  skills: SkillCategory[]
  education: Education[]
}

export type Accent = 'primary' | 'secondary' | 'tertiary'
