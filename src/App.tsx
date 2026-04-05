import { useResumeData } from '@/lib/use-resume-data'
import { Scanline } from '@/components/layout/Scanline'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/sections/HeroSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { WorkExperienceSection } from '@/components/sections/WorkExperienceSection'
import { EducationSection } from '@/components/sections/EducationSection'
import { SkillsSection } from '@/components/sections/SkillsSection'

export default function App() {
  const data = useResumeData()

  return (
    <>
      <Scanline />
      <Navbar />
      <main className="pt-16">
        <HeroSection />
        {data && (
          <>
            <ProjectsSection projects={data.projects} />
            <WorkExperienceSection jobs={data.work_experience} />
            <EducationSection education={data.education} />
            <SkillsSection skills={data.skills} />
          </>
        )}
      </main>
      <Footer />
    </>
  )
}
