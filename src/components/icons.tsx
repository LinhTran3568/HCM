import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

export function HouseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M3 11 12 3l9 8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.5 9.5V21h13V9.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 21v-6h4v6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
