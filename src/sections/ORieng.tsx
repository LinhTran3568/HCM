import { motion, useReducedMotion } from 'framer-motion'
import { O_RIENG, SECTION_IDS } from '../data/content'
import { SectionLabel } from '../components/SectionLabel'
import { Reveal } from '../components/Reveal'
import { Parallax } from '../components/Parallax'
import { ZoomOnScroll } from '../components/ZoomOnScroll'
import { SectionDivider } from '../components/SectionDivider'

const easeOut = [0.16, 1, 0.3, 1] as const

export function ORieng() {
  const reduce = useReducedMotion()

  return (
    <section id={SECTION_IDS.oRieng} className="section-orieng book-page-section" aria-label="Ở riêng nhưng không sống riêng">
      {/* Background Image Layer */}
      <div className="section-bg-image-layer" aria-hidden="true">
        <Parallax className="parallax-bg-layer" zoom={1.24}>
          <div
            className="section-bg-photo"
            style={{ backgroundImage: `url('/images/hoa-sen.jpg')` }}
          />
        </Parallax>
        <div className="section-bg-parchment-veil" />
        <SectionDivider />
        <div className="section-bottom-fade" />
      </div>

      <div className="container relative-z">
        {/* WOW Headline */}
        <div className="orieng-header">
          <Reveal>
            <SectionLabel num={O_RIENG.num}>{O_RIENG.kicker}</SectionLabel>
          </Reveal>

          <Reveal as="h2" className="orieng-wow-headline" delay={80}>
            <span className="wow-line">Ở RIÊNG,</span>
            <span className="wow-line wow-line--accent">NHƯNG KHÔNG SỐNG RIÊNG.</span>
          </Reveal>

          <Reveal as="p" className="orieng-position-text" delay={140}>
            {O_RIENG.position}
          </Reveal>
          <Reveal as="p" className="orieng-position-sub" delay={180}>
            {O_RIENG.positionSub}
          </Reveal>
        </div>

        {/* Visual Connected Relationship Diagram */}
        <div className="connected-relationship-diagram">
          {/* Left Wing: KHÔNG GIAN RIÊNG */}
          <div className="relationship-wing relationship-wing--left">
            <h3 className="wing-title">{O_RIENG.poles.leftLabel}</h3>
            <ul className="wing-list">
              {O_RIENG.poles.left.map((item, i) => (
                <motion.li
                  key={item.title}
                  className="wing-item book-card-frame"
                  initial={reduce ? false : { opacity: 0, x: -20 }}
                  whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: 0.1 * i, ease: easeOut }}
                >
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Central Connecting Node & SVG Animated Rays */}
          <div className="relationship-center-node">
            <svg
              className="connecting-svg-rays"
              viewBox="0 0 300 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {/* Left to Center Line */}
              <motion.path
                d="M 10 100 Q 80 40 150 100"
                stroke="var(--terracotta)"
                strokeWidth="2"
                strokeDasharray="6 6"
                initial={reduce ? false : { pathLength: 0 }}
                whileInView={reduce ? undefined : { pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: easeOut }}
              />
              {/* Right to Center Line */}
              <motion.path
                d="M 290 100 Q 220 160 150 100"
                stroke="var(--green)"
                strokeWidth="2"
                strokeDasharray="6 6"
                initial={reduce ? false : { pathLength: 0 }}
                whileInView={reduce ? undefined : { pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.2, ease: easeOut }}
              />
            </svg>

            <ZoomOnScroll className="center-photo-frame" zoom={1.1}>
              <img
                src={O_RIENG.poles.centerImage}
                alt={O_RIENG.poles.centerImageAlt}
                className="center-photo-img"
                loading="lazy"
              />
              <span className="center-photo-caption">{O_RIENG.poles.centerCaption}</span>
            </ZoomOnScroll>
            <div className="center-heart-tag">SỢI DÂY TÌNH THÂN</div>
          </div>

          {/* Right Wing: KẾT NỐI GIA ĐÌNH */}
          <div className="relationship-wing relationship-wing--right">
            <h3 className="wing-title">{O_RIENG.poles.rightLabel}</h3>
            <ul className="wing-list">
              {O_RIENG.poles.right.map((item, i) => (
                <motion.li
                  key={item.title}
                  className="wing-item book-card-frame"
                  initial={reduce ? false : { opacity: 0, x: 20 }}
                  whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: 0.1 * i, ease: easeOut }}
                >
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sequential Reveal of 6 Principles */}
        <div className="six-principles-section">
          <Reveal as="h3" className="principles-section-title">
            SÁU NGUYÊN TẮC CỦA NẾP NHÀ MỚI
          </Reveal>

          <div className="principles-timeline-list">
            {O_RIENG.values.map((value, i) => (
              <motion.div
                key={value.num}
                className="principle-row-item book-card-frame"
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.65, delay: i * 0.12, ease: easeOut }}
              >
                <div className="principle-num-col">
                  <span>{value.num}</span>
                </div>
                <div className="principle-content-col">
                  <h4 className="principle-title">{value.title}</h4>
                  <span className="principle-source">{value.source}</span>
                  <p className="principle-text">{value.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
