import type { ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
  as?: 'a' | 'button'
  href?: string
  onClick?: () => void
  variant?: 'outline-light' | 'solid' | 'text'
  className?: string
  ariaLabel?: string
}

export function Button({
  children,
  as = 'button',
  href,
  onClick,
  variant = 'outline-light',
  className = '',
  ariaLabel,
}: ButtonProps) {
  const Tag = as
  const classes = `btn btn--${variant} ${className}`.trim()

  if (Tag === 'a' && href) {
    return (
      <a href={href} className={classes} aria-label={ariaLabel} onClick={onClick}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} aria-label={ariaLabel} onClick={onClick}>
      {children}
    </button>
  )
}
