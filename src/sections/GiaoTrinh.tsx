import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { GIAO_TRINH, SECTION_IDS } from '../data/content'
import { SectionLabel } from '../components/SectionLabel'
import { Reveal } from '../components/Reveal'
import { Parallax } from '../components/Parallax'
import { ZoomOnScroll } from '../components/ZoomOnScroll'
import { SectionDivider } from '../components/SectionDivider'
import { BgReveal } from '../components/BgReveal'

const easeOut = [0.16, 1, 0.3, 1] as const

export function GiaoTrinh() {
  const [active, setActive] = useState(0)
  const reduce = useReducedMotion()
  const currentCard = GIAO_TRINH.cards[active]

  return (
    <section
      id={SECTION_IDS.giaoTrinh}
      className="section-giaotrinh dark-viewport book-page-section"
      aria-label="Căn cứ lý luận từ giáo trình"
    >
      {/* Background Image Layer */}
      <BgReveal>
        <Parallax className="parallax-bg-layer" zoom={1.24}>
          <div
            className="section-bg-photo"
            style={{ backgroundImage: `url('/images/am-tra.jpg')` }}
          />
        </Parallax>
        <div className="section-bg-dark-veil" />
        <SectionDivider />
        <div className="section-bottom-fade" />
      </BgReveal>

      <div className="container relative-z">
        <div className="giaotrinh-header">
          <Reveal>
            <SectionLabel num={GIAO_TRINH.num} tone="invert">
              {GIAO_TRINH.kicker}
            </SectionLabel>
          </Reveal>

          <Reveal as="h2" className="giaotrinh-title-dark" delay={80}>
            {GIAO_TRINH.title}
          </Reveal>

          <Reveal as="p" className="giaotrinh-subtitle-dark" delay={140}>
            {GIAO_TRINH.introTitle} — {GIAO_TRINH.introP}
          </Reveal>
        </div>

        {/* 3 Interactive Documentary Tabs */}
        <div className="giaotrinh-tabs-bar" role="tablist" aria-label="Ba luận điểm trong giáo trình">
          {GIAO_TRINH.tabs.map((tab, i) => (
            <button
              key={tab.num}
              type="button"
              role="tab"
              id={`tab-btn-${i}`}
              aria-selected={active === i}
              aria-controls={`tab-panel-${i}`}
              className={`giao-tab-btn${active === i ? ' is-active' : ''}`}
              onClick={() => setActive(i)}
            >
              <span className="tab-num-badge">{tab.num}</span>
              <span className="tab-label-text">{tab.label}</span>
              {active === i && (
                <motion.div
                  className="tab-active-indicator"
                  layoutId="tabIndicator"
                  transition={{ duration: 0.35, ease: easeOut }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Main Academic Layout: Large Portrait + BIG Quote Focus */}
        <Reveal as="div" className="giaotrinh-stage" amount={0.15} y={44}>

          <div className="giaotrinh-portrait-column">
            <ZoomOnScroll className="large-portrait-frame book-card-frame" zoom={1.08}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  key={currentCard.image}
                  src={currentCard.image}
                  alt={currentCard.imageAlt}
                  className="portrait-main-img"
                  loading="lazy"
                  initial={reduce ? false : { opacity: 0, scale: 1.06 }}
                  animate={reduce ? undefined : { opacity: 1, scale: 1 }}
                  exit={reduce ? undefined : { opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: easeOut }}
                />
              </AnimatePresence>
              <div className="portrait-caption-overlay">
                <span>{currentCard.imageCaption}</span>
              </div>
            </ZoomOnScroll>
          </div>

          <div
            className="giaotrinh-quote-column"
            role="tabpanel"
            id={`tab-panel-${active}`}
            aria-labelledby={`tab-btn-${active}`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                className="quote-display-card book-card-frame"
                initial={reduce ? false : { opacity: 0, scale: 0.98, y: 12 }}
                animate={reduce ? undefined : { opacity: 1, scale: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.98, y: -12 }}
                transition={{ duration: 0.45, ease: easeOut }}
              >
                <div className="card-top-meta">
                  <span className="card-luan-diem">{currentCard.no}</span>
                  <span className="card-src-page">Giáo trình {currentCard.src}</span>
                  {currentCard.isKey && <span className="card-key-tag">LUẬN ĐIỂM CHÌA KHÓA</span>}
                </div>

                <h3 className="card-headline">{currentCard.title}</h3>

                {/* Oversized Cinematic Quote Statement */}
                <blockquote className="big-textbook-quote">
                  {currentCard.quote}
                </blockquote>

                <div className="card-practical-apply">
                  <h4 className="apply-heading">SOI CHIẾU THỰC TIỄN THUYẾT TRÌNH</h4>
                  <p className="apply-text">{currentCard.apply}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
