import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { scrollToTop } from '../lib/scroll'

/** Appears once the page is scrolled down; smooth-scrolls back to the top. */
export function BackToTop() {
  const [visible, setVisible] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          className="back-to-top"
          aria-label="Quay lại đầu trang"
          onClick={scrollToTop}
          initial={reduce ? false : { opacity: 0, y: 16, scale: 0.9 }}
          animate={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
          exit={reduce ? undefined : { opacity: 0, y: 16, scale: 0.9 }}
          whileHover={reduce ? undefined : { y: -3 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <ArrowUp size={18} aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
