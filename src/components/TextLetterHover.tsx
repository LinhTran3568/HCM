import { useEffect } from 'react'

const TARGET_SELECTOR = [
  '.hero-line',
  '.thesis-statement-part',
  '.chuhieu-main-title',
  '.giaotrinh-title-dark',
  '.giadinh-headline',
  '.wow-line',
  '.quote-line',
  '.nav-link .nav-label',
  '.brand-text',
].join(',')

const CHAR_CLASS = 'tlh-char'
const MAX_DELAY_INDEX = 14

function splitIntoLetters(el: Element) {
  if (el.hasAttribute('data-letters')) return
  el.setAttribute('data-letters', 'true')

  const originalText = (el.textContent ?? '').trim()
  if (originalText && !el.hasAttribute('aria-label')) {
    el.setAttribute('aria-label', originalText)
  }

  const textNodes = Array.from(el.childNodes).filter(
    (n): n is Text => n.nodeType === Node.TEXT_NODE,
  )

  for (const node of textNodes) {
    const text = node.textContent ?? ''
    if (!text.trim()) continue

    const frag = document.createDocumentFragment()
    let index = 0
    for (const ch of text) {
      const span = document.createElement('span')
      span.className = CHAR_CLASS
      span.setAttribute('aria-hidden', 'true')
      span.textContent = ch === ' ' ? '\u00A0' : ch
      span.style.setProperty('--char-i', String(Math.min(index, MAX_DELAY_INDEX)))
      index += 1
      frag.appendChild(span)
    }
    node.parentNode?.replaceChild(frag, node)
  }
}

/**
 * Site-wide letter-lift hover for the main headings and nav labels:
 * each character rises one-by-one while the heading is hovered.
 * Disabled for `prefers-reduced-motion`.
 */
export function TextLetterHover() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    document.querySelectorAll(TARGET_SELECTOR).forEach(splitIntoLetters)
  }, [])

  return null
}
