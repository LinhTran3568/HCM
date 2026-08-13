import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { HERO, SECTION_IDS } from '../data/content'
import { scrollToSection } from '../lib/scroll'

const easeOut = [0.16, 1, 0.3, 1] as const

export function Hero() {
  const reduce = useReducedMotion()

  return (
    <section id={SECTION_IDS.hero} className="hero" aria-label="Mở đầu câu chuyện">
      <div className="hero-bg" aria-hidden="true">
        <motion.div
          className="hero-photo"
          style={{ backgroundImage: `url(${HERO.image})` }}
          initial={reduce ? false : { scale: 1.06 }}
          animate={reduce ? undefined : { scale: 1 }}
          transition={{ duration: 2.2, ease: easeOut }}
        />
        <div className="hero-overlay" />
      </div>

      <div className="hero-container">
        <div className="hero-left-column">
          <motion.div
            className="hero-badge"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: easeOut }}
          >
            <span className="hero-num">01</span>
            <span className="hero-kicker">{HERO.kicker}</span>
          </motion.div>

          <motion.h1
            className="hero-title"
            initial={reduce ? false : 'hidden'}
            animate={reduce ? undefined : 'show'}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.12 } },
            }}
          >
            <motion.span
              className="hero-line"
              variants={{ hidden: { opacity: 0, y: 36 }, show: { opacity: 1, y: 0 } }}
            >
              SỐNG RIÊNG
            </motion.span>
            <motion.span
              className="hero-line"
              variants={{ hidden: { opacity: 0, y: 36 }, show: { opacity: 1, y: 0 } }}
            >
              SAU KHI KẾT HÔN
            </motion.span>
            <motion.span
              className="hero-line hero-line--accent"
              variants={{ hidden: { opacity: 0, y: 36 }, show: { opacity: 1, y: 0 } }}
            >
              LÀ TỰ LẬP
            </motion.span>
            <motion.span
              className="hero-line hero-line--accent"
              variants={{ hidden: { opacity: 0, y: 36 }, show: { opacity: 1, y: 0 } }}
            >
              HAY BẤT HIẾU?
            </motion.span>
          </motion.h1>

          <motion.p
            className="hero-description"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: easeOut }}
          >
            {HERO.sub}
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease: easeOut }}
          >
            <button
              type="button"
              className="btn btn--hero"
              onClick={() => scrollToSection(SECTION_IDS.thesis)}
              aria-label={HERO.cta}
            >
              <span>{HERO.cta}</span>
              <ArrowDown className="btn-ic" aria-hidden="true" />
            </button>
            <span className="hero-tagline">{HERO.tagline}</span>
          </motion.div>
        </div>

        <div className="hero-right-meta">
          <motion.div
            className="hero-scene-box"
            initial={reduce ? false : { opacity: 0, x: 20 }}
            animate={reduce ? undefined : { opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 1.2, ease: easeOut }}
          >
            <h3 className="hero-scene-title">BỐI CẢNH CÂU CHUYỆN</h3>
            <ul className="hero-scene-list">
              {HERO.scene.map((item, idx) => (
                <li key={idx} className="hero-scene-item">
                  <span className="hero-scene-num">0{idx + 1}</span>
                  <p>{item}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      <div className="hero-footer-bar">
        <span className="hero-caption-text">{HERO.imageCaption}</span>
        <button
          type="button"
          className="hero-scroll-trigger"
          onClick={() => scrollToSection(SECTION_IDS.thesis)}
        >
          <span>CUỘN ĐỂ KHÁM PHÁ</span>
          <ArrowDown size={14} />
        </button>
      </div>
    </section>
  )
}
