import { motion, useReducedMotion } from 'framer-motion'
import { CONCLUSION, SECTION_IDS } from '../data/content'
import { SectionLabel } from '../components/SectionLabel'
import { Reveal } from '../components/Reveal'
import { Parallax } from '../components/Parallax'
import { SectionDivider } from '../components/SectionDivider'

const easeOut = [0.16, 1, 0.3, 1] as const

export function Conclusion() {
  const reduce = useReducedMotion()

  return (
    <section
      id={SECTION_IDS.conclusion}
      className="section-conclusion dark-viewport book-page-section"
      aria-label="Kết luận"
    >
      {/* Background Image Layer */}
      <div className="section-bg-image-layer" aria-hidden="true">
        <Parallax className="parallax-bg-layer" zoom={1.24}>
          <div
            className="section-bg-photo"
            style={{ backgroundImage: `url('/images/footer-bg.jpg')` }}
          />
        </Parallax>
        <div className="section-bg-dark-veil" />
        <SectionDivider />
        <div className="section-bottom-fade" />
      </div>

      <div className="container relative-z">
        <div className="conclusion-content">
          <Reveal>
            <SectionLabel num={CONCLUSION.num} tone="invert">
              {CONCLUSION.kicker}
            </SectionLabel>
          </Reveal>

          {/* Cinematic Very Large Quote */}
          <Reveal as="div" className="conclusion-quote-block" delay={80}>
            <h2 className="giant-conclusion-quote">
              <span className="quote-line">{CONCLUSION.quote1}</span>
              <span className="quote-line quote-line--gold">{CONCLUSION.quote2}</span>
            </h2>
            <p className="quote-source-dark">— {CONCLUSION.src}</p>
          </Reveal>

          <Reveal as="p" className="conclusion-own-statement" delay={160}>
            “{CONCLUSION.own}”
          </Reveal>

          <div className="conclusion-message-list">
            {CONCLUSION.message.map((msg, i) => (
              <motion.p
                key={msg}
                className="conclusion-msg-item"
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.15, ease: easeOut }}
              >
                {msg}
              </motion.p>
            ))}
          </div>

          {/* Final Documentary Reveal Tag */}
          <motion.div
            className="final-documentary-reveal book-card-frame"
            initial={reduce ? false : { opacity: 0, scale: 0.94 }}
            whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.85, delay: 0.6, ease: easeOut }}
          >
            <span className="reveal-formula">
              TỰ LẬP <span className="formula-x">×</span> TRÁCH NHIỆM <span className="formula-x">×</span> GẮN KẾT
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
