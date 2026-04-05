export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center
                        px-8 md:px-24 overflow-hidden
                        border-b border-outline-variant/10">

      {/* Background glow right */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-l from-primary-container/30 to-transparent" />
      </div>
      {/* Background glow left */}
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 opacity-5 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-r from-secondary-container/20 to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-10 lg:gap-20">

        {/* Text content */}
        <div className="flex-1 min-w-0">
          {/* Version badge */}
          <div className="flex items-center gap-4 mb-8">
            <span className="px-3 py-1 bg-surface-container-high border-l-2 border-tertiary
                             text-tertiary font-mono text-xs tracking-widest">
              v2.0_STABLE
            </span>
            <div className="h-px flex-grow bg-outline-variant/20" />
            <span className="font-mono text-[10px] text-neutral-600 tracking-widest">
              SYS::BOOT_COMPLETE
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-headline text-5xl md:text-5xl lg:text-7xl xl:text-8xl font-bold
                         tracking-tighter leading-none mb-6">
            <span className="text-on-surface">Software_Engineer:</span><br />
            <span className="text-transparent bg-clip-text
                             bg-gradient-to-r from-primary-container via-secondary-container to-primary-container">
              CATVIN_HSIAO
            </span>
          </h1>

          {/* Bio */}
          <div className="font-body text-lg text-on-surface-variant mb-12
                          border-l-2 border-primary-container/40 pl-6">
            Building pipelines, AI agents, and full-stack analytics tools.<br />
            <span className="text-sm text-neutral-500">
              Georgia Tech OMSCS - AI.<br />
              Ex Microsoft Data Engineer.<br />
              Early-stage Blockchain Startup Engineer.
            </span>
          </div>

          {/* CTA */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="bg-primary-container text-on-primary-container px-8 py-4
                         font-headline font-bold tracking-widest text-sm
                         flex items-center gap-3 group hover:brightness-125 transition-all"
            >
              VIEW_PROJECTS
              <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </a>
          </div>
        </div>

        {/* Avatar */}
        <div className="hidden md:block flex-shrink-0 group">
          <div className="relative w-44 h-44 lg:w-56 lg:h-56 rounded-full overflow-hidden bg-surface-container-high
                          shadow-[0_0_32px_rgba(0,240,255,0.18),0_0_64px_rgba(0,240,255,0.06),inset_0_0_0_1px_rgba(255,255,255,0.12)]
                          ring-1 ring-white/[0.08]
                          group-hover:shadow-[0_0_44px_rgba(0,240,255,0.26),0_0_88px_rgba(0,240,255,0.1),inset_0_0_0_1px_rgba(255,255,255,0.18)]
                          transition-shadow duration-500">
            <img
              src="/images/avatar.JPG"
              alt=""
              className="w-full h-full object-cover object-[center_22%] scale-[1.02]
                         brightness-[0.88] contrast-[1.08] saturate-[0.88]
                         transition-all duration-700 ease-out
                         group-hover:brightness-100 group-hover:saturate-100 group-hover:scale-105"
            />
            {/* Diagonal scanlines */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.07] rounded-full"
              style={{
                background: `repeating-linear-gradient(
                  -45deg,
                  transparent,
                  transparent 3px,
                  rgba(0,240,255,0.5) 3px,
                  rgba(0,240,255,0.5) 4px
                )`,
              }}
            />
            {/* Sweep animation */}
            <div className="absolute inset-0 pointer-events-none avatar-sweep rounded-full" />
            {/* Radial vignette */}
            <div className="absolute inset-0 pointer-events-none rounded-full
                            bg-[radial-gradient(circle_at_50%_35%,transparent_0%,rgba(10,10,12,0.15)_55%,rgba(10,10,12,0.55)_100%)]" />
          </div>
        </div>
      </div>
    </section>
  )
}
