import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Project } from '@/types/resume'
import { formatBulletText } from '@/lib/resume-utils'

interface ProjectModalProps {
  project: Project | null
  displayName: string
  onClose: () => void
}

export function ProjectModal({ project, displayName, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={e => { if (e.target === e.currentTarget) onClose() }}
        >
          <motion.div
            className="relative w-full max-w-lg bg-surface border border-outline-variant/30 p-8 shadow-[0_0_40px_rgba(0,240,255,0.08)]"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 font-mono text-xs text-neutral-500 hover:text-white transition-colors uppercase tracking-widest"
            >
              ✕ Close
            </button>
            <h3 className="font-headline text-xl font-bold tracking-tight text-on-surface pr-10">
              {displayName}
            </h3>
            <ul className="exp-bullets pt-6">
              {project.bullets.map(b => (
                <li key={b.id} className="resume-bullet">
                  <span className="resume-bullet__title">{formatBulletText(b.title)}</span>
                  <span className="resume-bullet__desc">{formatBulletText(b.text)}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
