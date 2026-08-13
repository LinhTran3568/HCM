import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { NAV_LINKS, SECTION_IDS, type SectionId } from '../data/content'
import { scrollToSection } from '../lib/scroll'
import { HouseIcon } from './icons'

const easeOut = [0.16, 1, 0.3, 1] as const

export function Navbar() {
  const [solid, setSolid] = useState(false)
  const [active, setActive] = useState<SectionId>(SECTION_IDS.hero)
  const [menuOpen, setMenuOpen] = useState(false)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[]
    if (!sections.length) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId)
        })
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const go = (id: SectionId) => {
    setMenuOpen(false)
    scrollToSection(id)
  }

  return (
    <>
      <motion.div
        className="scroll-progress"
        style={{ scaleX: progress }}
        aria-hidden="true"
      />

      <header className={`nav${solid ? ' is-solid' : ''}`}>
        <div className="nav-inner">
          <a
            className="brand"
            href="#"
            onClick={(e) => {
              e.preventDefault()
              go(SECTION_IDS.hero)
            }}
          >
            <span className="brand-mark">
              <HouseIcon />
            </span>
            <span className="brand-text">NẾP NHÀ MỚI</span>
          </a>

          <nav className="nav-links" aria-label="Điều hướng chính">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`nav-link${active === link.id ? ' is-active' : ''}`}
                onClick={(e) => {
                  e.preventDefault()
                  go(link.id)
                }}
              >
                <span className="nav-num">{link.num}</span>
                <span className="nav-label">{link.label}</span>
              </a>
            ))}
          </nav>

          <button
            type="button"
            className={`nav-burger${menuOpen ? ' is-open' : ''}`}
            aria-label={menuOpen ? 'Đóng menu' : 'Mở menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu điều hướng"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <nav className="mobile-menu-inner" aria-label="Menu trên thiết bị di động">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  className="mob-link"
                  onClick={(e) => {
                    e.preventDefault()
                    go(link.id)
                  }}
                  initial={reduce ? false : { opacity: 0, y: 28 }}
                  animate={reduce ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.06, ease: easeOut }}
                >
                  <span className="mob-num">{link.num}</span>
                  <span className="mob-label">{link.label}</span>
                </motion.a>
              ))}
            </nav>

            <motion.p
              className="mobile-menu-foot"
              initial={reduce ? false : { opacity: 0 }}
              animate={reduce ? undefined : { opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              NẾP NHÀ MỚI — TỰ LẬP × TRÁCH NHIỆM × GẮN KẾT
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
