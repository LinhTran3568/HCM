import type { ReactNode } from 'react'

type SectionLabelProps = {
  num?: string
  children: ReactNode
  tone?: 'dark' | 'light' | 'invert'
  className?: string
}

export function SectionLabel({ num, children, tone = 'dark', className = '' }: SectionLabelProps) {
  const toneClass = tone === 'light' ? 'tone-light' : tone === 'invert' ? 'tone-invert' : ''
  return (
    <p className={`section-label ${toneClass} ${className}`.trim()}>
      {num && <span className="label-num" aria-hidden="true">{num}</span>}
      <span className="label-rule" aria-hidden="true" />
      <span className="label-text">{children}</span>
    </p>
  )
}
