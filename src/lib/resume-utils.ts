import type { ReactNode } from 'react'
import { createElement, Fragment } from 'react'

export function decodeResumeText(s: string | null | undefined): string {
  if (s == null || s === '') return ''
  return String(s)
    .replace(/\\%/g, '%')
    .replace(/\\_/g, '_')
    .replace(/\\\$/g, '$')
    .replace(/\\&/g, '&')
    .replace(/\\'/g, "'")
    .replace(/\\to\b/g, '→')
    .replace(/\\times/g, '×')
    .replace(/\\gamma/g, 'γ')
    .replace(/\\sigma/g, 'σ')
}

export function normalizeForWeb(s: string): string {
  let t = String(s)
  for (let i = 0; i < 6; i++) {
    const next = t.replace(/\$([^$]+)\$/g, '$1')
    if (next === t) break
    t = next
  }
  t = t.replace(/(\w)--(\w)/g, '$1–$2')
  return t
}

export function formatPlainLine(raw: string | null | undefined): string {
  if (raw == null || raw === '') return ''
  return normalizeForWeb(decodeResumeText(raw))
}

const MONTH_ABBREVS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export function formatPeriod(period: string | null | undefined): string {
  if (period == null || period === '') return ''
  const s = formatPlainLine(period)
  const parts = s.split(/\s*(?:--|—|–)\s*/)
  if (parts.length < 2) return s

  function fmtSeg(seg: string): string {
    seg = String(seg).trim()
    const m = seg.match(/^(\d{1,2})\/(\d{4})$/)
    if (!m) return seg
    const mi = parseInt(m[1], 10) - 1
    if (mi < 0 || mi > 11) return seg
    return MONTH_ABBREVS[mi] + ' ' + m[2]
  }

  return fmtSeg(parts[0]) + ' — ' + fmtSeg(parts[1])
}

export function formatCompanyHeadline(company: string): string {
  if (company == null || company === '') return ''
  return String(company).trim().toUpperCase().replace(/\s+/g, '_')
}

/** Parse **bold** and `code` markdown into React nodes */
export function parseInlineMarkdown(text: string): ReactNode[] {
  const parts: ReactNode[] = []
  // Split on **bold** or `code`
  const regex = /(\*\*[^*]+\*\*|`[^`]+`)/g
  let last = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) {
      parts.push(text.slice(last, match.index))
    }
    const token = match[1]
    if (token.startsWith('**')) {
      parts.push(createElement('strong', { key: match.index }, token.slice(2, -2)))
    } else {
      parts.push(createElement('code', { key: match.index }, token.slice(1, -1)))
    }
    last = match.index + token.length
  }

  if (last < text.length) {
    parts.push(text.slice(last))
  }

  return parts
}

export function formatBulletText(raw: string | null | undefined): ReactNode {
  if (raw == null || raw === '') return null
  const plain = formatPlainLine(raw)
  const nodes = parseInlineMarkdown(plain)
  return createElement(Fragment, null, ...nodes)
}
