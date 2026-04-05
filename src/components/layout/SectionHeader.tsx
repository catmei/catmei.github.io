interface SectionHeaderProps {
  index: string
  label: string
  title: string
  withLine?: boolean
}

export function SectionHeader({ index, label, title, withLine = false }: SectionHeaderProps) {
  if (withLine) {
    return (
      <div className="flex items-center gap-6 mb-16">
        <div>
          <span className="font-mono text-xs text-white tracking-[0.5em] mb-1 block uppercase">
            [{index}] {label}
          </span>
          <h2 className="font-headline text-4xl font-black tracking-tighter uppercase whitespace-nowrap">
            {title}
          </h2>
        </div>
        <div className="h-px w-full bg-outline-variant/20 hidden sm:block" />
      </div>
    )
  }

  return (
    <div className="mb-16">
      <span className="font-mono text-xs text-white tracking-[0.5em] mb-2 block uppercase">
        [{index}] {label}
      </span>
      <h2 className="font-headline text-4xl font-black tracking-tighter uppercase">
        {title}
      </h2>
    </div>
  )
}
