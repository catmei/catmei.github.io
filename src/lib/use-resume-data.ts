import { useState, useEffect } from 'react'
import type { ResumeData } from '@/types/resume'

export function useResumeData(): ResumeData | null {
  const [data, setData] = useState<ResumeData | null>(null)

  useEffect(() => {
    fetch('/resume_data.yaml')
      .then(res => res.text())
      .then(text => {
        // Dynamic import of js-yaml
        import('js-yaml').then(({ load }) => {
          const parsed = load(text) as ResumeData
          setData(parsed)
        })
      })
      .catch(err => console.error('Failed to load resume data', err))
  }, [])

  return data
}
