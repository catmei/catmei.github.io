import { useScrollSpy } from '@/lib/use-scroll-spy'

const NAV_LINKS = [
  { href: '#projects', label: 'PROJECTS', section: 'projects' },
  { href: '#work_experience', label: 'WORK_EXPERIENCE', section: 'work_experience' },
  { href: '#education', label: 'EDUCATION', section: 'education' },
  { href: '#skills', label: 'SKILLS', section: 'skills' },
]

const SECTION_IDS = NAV_LINKS.map(l => l.section)

export function Navbar() {
  const [activeSection, setActiveSection] = useScrollSpy(SECTION_IDS)

  return (
    <nav className="fixed top-0 w-full z-50 flex items-center justify-end px-6 md:px-8 h-16
                    bg-neutral-950/70 backdrop-blur-xl border-b border-white/10
                    shadow-[0_0_15px_rgba(0,240,255,0.08)]">

      {/* Centered nav links */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 hidden -translate-y-1/2 md:flex items-center justify-center">
        <div className="pointer-events-auto flex gap-8 items-center font-headline tracking-tight uppercase text-xs">
          {NAV_LINKS.map(link => {
            const isActive = activeSection === link.section
            return (
              <a
                key={link.section}
                href={link.href}
                data-section={link.section}
                onClick={() => setActiveSection(link.section)}
                className={[
                  'nav-link glitch transition-all',
                  isActive
                    ? 'text-cyan-400 border-b border-cyan-400 pb-0.5'
                    : 'text-neutral-400 hover:text-cyan-200',
                ].join(' ')}
              >
                {link.label}
              </a>
            )
          })}
        </div>
      </div>

      {/* Social icons */}
      <div className="relative z-10 flex items-center gap-4">
        <a
          href="https://github.com/catmei"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center text-neutral-500 transition-colors hover:text-cyan-400"
          aria-label="GitHub"
        >
          <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
        <a
          href="https://www.linkedin.com/in/catvin-hsiao/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center text-neutral-500 transition-colors hover:text-pink-400"
          aria-label="LinkedIn"
        >
          <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
        <a
          href="mailto:b02202040@gmail.com"
          className="inline-flex items-center justify-center text-neutral-500 transition-colors hover:text-tertiary"
          aria-label="Email"
        >
          <span className="material-symbols-outlined text-[16px] leading-none" aria-hidden="true">mail</span>
        </a>
      </div>
    </nav>
  )
}
