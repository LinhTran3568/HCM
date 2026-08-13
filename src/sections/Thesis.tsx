import { motion, useReducedMotion } from 'framer-motion'
import { THESIS, SECTION_IDS } from '../data/content'
import { SectionLabel } from '../components/SectionLabel'
import { Reveal } from '../components/Reveal'
import { Parallax } from '../components/Parallax'
import { SectionDivider } from '../components/SectionDivider'

const easeOut = [0.16, 1, 0.3, 1] as const

export function Thesis() {
  const reduce = useReducedMotion()

  return (
    <section id={SECTION_IDS.thesis} className="section-thesis book-page-section" aria-label="Luận điểm chính">
      {/* Illustrated Background Image */}
      <div className="section-bg-image-layer" aria-hidden="true">
        <Parallax className="parallax-bg-layer" zoom={1.18}>
          <div
            className="section-bg-photo"
            style={{ backgroundImage: `url('/images/ruong-lua.jpg')` }}
          />
        </Parallax>
        <div className="section-bg-parchment-veil" />
        <SectionDivider />
        <div className="section-bottom-fade" />
      </div>

      <div className="container relative-z">
        <div className="thesis-header">
          <Reveal>
            <SectionLabel num={THESIS.num}>{THESIS.kicker}</SectionLabel>
          </Reveal>

          <Reveal as="h2" className="thesis-giant-statement" delay={80}>
            <span className="thesis-statement-part">Ở RIÊNG</span>
            <span className="thesis-statement-neq">≠</span>
            <span className="thesis-statement-part thesis-statement-accent">RỜI XA</span>
          </Reveal>

          <Reveal as="p" className="thesis-lead-subtitle" delay={140}>
            {THESIS.sub}
          </Reveal>
        </div>

        <div className="thesis-transform-container">
          <div className="thesis-flow-track" aria-hidden="true">
            <motion.div
              className="thesis-flow-line"
              initial={reduce ? false : { scaleY: 0 }}
              whileInView={reduce ? undefined : { scaleY: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.4, ease: easeOut }}
            />
          </div>

          <div className="thesis-flow-grid">
            {THESIS.flow.map((item, index) => (
              <motion.div
                key={item.num}
                className="thesis-flow-step"
                initial={reduce ? false : { opacity: 0, x: index % 2 === 0 ? -30 : 30, y: 20 }}
                whileInView={reduce ? undefined : { opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.75, delay: 0.15 + index * 0.18, ease: easeOut }}
              >
                <div className="thesis-step-connector">
                  <span className="thesis-step-num">{item.num}</span>
                  <div className="thesis-step-dot" />
                </div>
                <div className="thesis-step-card book-card-frame">
                  <h3 className="thesis-step-label">{item.label}</h3>
                  <p className="thesis-step-desc">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
