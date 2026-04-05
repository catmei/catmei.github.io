import { useState, useEffect } from 'react'

export function useScrollSpy(sectionIds: string[]): [string, (id: string) => void] {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    let raf: number
    let observer: IntersectionObserver | null = null
    const allIds = ['hero', ...sectionIds]

    const init = () => {
      const sections = allIds
        .map(id => document.getElementById(id))
        .filter(Boolean) as HTMLElement[]

      if (sections.length < allIds.length) {
        raf = requestAnimationFrame(init)
        return
      }

      observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id === 'hero' ? '' : entry.target.id)
            }
          })
        },
        { rootMargin: '-40% 0px -55% 0px' },
      )

      sections.forEach(s => observer!.observe(s))
    }

    raf = requestAnimationFrame(init)

    return () => {
      cancelAnimationFrame(raf)
      observer?.disconnect()
    }
  }, [sectionIds])

  return [activeSection, setActiveSection]
}
