import type { Accent } from '@/types/resume'

export const PROJECT_ORDER = [
  'basebro_ai',
  'carenav',
  'classmind',
  'lunar_lander',
  'redrugai',
  'snaplingo',
  'poker_nerd',
]

export const PROJECT_ACCENTS: Record<string, Accent> = {
  basebro_ai: 'primary',
  carenav: 'secondary',
  classmind: 'tertiary',
  lunar_lander: 'primary',
  redrugai: 'secondary',
  snaplingo: 'tertiary',
  poker_nerd: 'primary',
}

export const PROJECT_IMAGES: Record<string, string> = {
  basebro_ai: '/images/basebro.png',
  carenav: '/images/carenav.png',
  classmind: '/images/classmind.png',
  lunar_lander: '/images/lunarlander.png',
  redrugai: '/images/redrugai.png',
  snaplingo: '/images/snaplingo.png',
  poker_nerd: '/images/pokernerd.png',
}

export const PROJECT_DISPLAY_NAMES: Record<string, string> = {
  basebro_ai: 'BASEBRO_AI',
  carenav: 'CARENAV',
  classmind: 'CLASSMIND',
  lunar_lander: 'LUNAR_LANDER',
  redrugai: 'REDRUG_AI',
  snaplingo: 'SNAPLINGO',
  poker_nerd: 'POKER_NERD',
}

export const JOB_ACCENTS: Record<string, Accent> = {
  microsoft: 'primary',
  dentsu: 'secondary',
  micro_data_strategy: 'tertiary',
  teahouse: 'primary',
}

export const JOB_ACCENT_STYLES: Record<Accent, {
  line: string
  dot: string
  roleClass: string
}> = {
  primary: {
    line: 'bg-outline-variant/30 group-hover:bg-primary-container',
    dot: 'bg-primary-container shadow-[0_0_8px_rgba(0,240,255,0.8)]',
    roleClass: 'text-primary-container',
  },
  secondary: {
    line: 'bg-outline-variant/30 group-hover:bg-secondary',
    dot: 'bg-secondary shadow-[0_0_8px_rgba(254,0,254,0.8)]',
    roleClass: 'text-secondary',
  },
  tertiary: {
    line: 'bg-outline-variant/30 group-hover:bg-tertiary',
    dot: 'bg-tertiary shadow-[0_0_8px_rgba(187,234,0,0.8)]',
    roleClass: 'text-tertiary',
  },
}

export const ACCENT_CHIP: Record<Accent, string> = {
  primary: 'group-hover:border-primary-container',
  secondary: 'group-hover:border-secondary',
  tertiary: 'group-hover:border-tertiary',
}

export const LINK_BTN_THEME: Record<Accent, string> = {
  primary: 'hover:bg-primary-container hover:text-on-primary-container',
  secondary: 'hover:bg-secondary hover:text-on-secondary-container',
  tertiary: 'hover:bg-tertiary hover:text-on-tertiary-container',
}

export const SKILL_CARD_STYLES: Record<Accent, {
  hoverBorder: string
  line: string
  label: string
}> = {
  primary: {
    hoverBorder: 'hover:border-primary-container',
    line: 'bg-primary-container',
    label: 'text-primary-container',
  },
  secondary: {
    hoverBorder: 'hover:border-secondary',
    line: 'bg-secondary',
    label: 'text-secondary',
  },
  tertiary: {
    hoverBorder: 'hover:border-tertiary',
    line: 'bg-tertiary',
    label: 'text-tertiary',
  },
}

export const SKILL_ACCENTS_CYCLE: Accent[] = ['tertiary', 'secondary', 'primary']

export const CARD_HOVER_TITLE: Record<Accent, string> = {
  primary: 'group-hover:text-primary-container',
  secondary: 'group-hover:text-secondary',
  tertiary: 'group-hover:text-tertiary',
}

export const CARD_HOVER_BORDER: Record<Accent, string> = {
  primary: 'hover:border-primary-container',
  secondary: 'hover:border-secondary',
  tertiary: 'hover:border-tertiary',
}
