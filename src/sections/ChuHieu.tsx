import { motion, useReducedMotion } from 'framer-motion'
import { CHU_HIEU, SECTION_IDS } from '../data/content'
import { SectionLabel } from '../components/SectionLabel'
import { Reveal } from '../components/Reveal'
import { Parallax } from '../components/Parallax'
import { SectionDivider } from '../components/SectionDivider'

const easeOut = [0.16, 1, 0.3, 1] as const

export function ChuHieu() {
  const reduce = useReducedMotion()

  return (
    <section id={SECTION_IDS.chuHieu} className="section-chuhieu book-page-section" aria-label="Chữ hiếu, hai cách hiểu">
      {/* Illustrated Background Image */}
      <div className="section-bg-image-layer" aria-hidden="true">
        <Parallax className="parallax-bg-layer" zoom={1.24}>
          <div
            className="section-bg-photo"
            style={{ backgroundImage: `url('/images/nha-tan-ky.jpg')` }}
          />
        </Parallax>
        <div className="section-bg-parchment-veil" />
        <SectionDivider />
        <div className="section-bottom-fade" />
      </div>

      <div className="container relative-z">
        <div className="chuhieu-header">
          <Reveal>
            <SectionLabel num={CHU_HIEU.num}>{CHU_HIEU.kicker}</SectionLabel>
          </Reveal>
          <Reveal as="h2" className="chuhieu-main-title" delay={80}>
            {CHU_HIEU.title}
          </Reveal>
          <Reveal as="p" className="chuhieu-main-sub" delay={140}>
            {CHU_HIEU.sub}
          </Reveal>
        </div>

        <div className="chuhieu-comparison-wrapper">
          <div className="comparison-vs-badge" aria-hidden="true">
            <span>VS</span>
          </div>

          {/* Left Panel: Truyền Thống */}
          <motion.article
            className="comparison-panel comparison-panel--tradition book-card-frame"
            initial={reduce ? false : { opacity: 0, y: 40 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.1, ease: easeOut }}
          >
            <div className="panel-image-container">
              <img
                src={CHU_HIEU.trad.image}
                alt={CHU_HIEU.trad.imageAlt}
                className="panel-bg-image"
                loading="lazy"
              />
              <div className="panel-image-overlay" />
              <div className="panel-meta-tag">
                <span className="panel-label-text">{CHU_HIEU.trad.label}</span>
                <span className="panel-person-group">{CHU_HIEU.trad.name}</span>
              </div>
            </div>

            <div className="panel-content-body">
              <span className="panel-badge-pill">{CHU_HIEU.trad.badge}</span>
              <h3 className="panel-belief-head">
                Chữ hiếu qua sự gắn kết đa thế hệ & phụng dưỡng trực tiếp
              </h3>
              <div className="panel-key-difference">
                <span className="diff-label">QUAN ĐIỂM CHỦ ĐẠO</span>
                <ul className="diff-list">
                  {CHU_HIEU.trad.items.map((item, idx) => (
                    <li key={idx}>
                      <span className="diff-bullet" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.article>

          {/* Right Panel: Hiện Đại */}
          <motion.article
            className="comparison-panel comparison-panel--modern book-card-frame"
            initial={reduce ? false : { opacity: 0, y: 40 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.25, ease: easeOut }}
          >
            <div className="panel-image-container">
              <img
                src={CHU_HIEU.modern.image}
                alt={CHU_HIEU.modern.imageAlt}
                className="panel-bg-image"
                loading="lazy"
              />
              <div className="panel-image-overlay" />
              <div className="panel-meta-tag panel-meta-tag--modern">
                <span className="panel-label-text">{CHU_HIEU.modern.label}</span>
                <span className="panel-person-group">{CHU_HIEU.modern.name}</span>
              </div>
            </div>

            <div className="panel-content-body">
              <span className="panel-badge-pill panel-badge-pill--modern">
                {CHU_HIEU.modern.badge}
              </span>
              <h3 className="panel-belief-head">
                Chữ hiếu qua sự tự lập tổ ấm & chủ động chăm sóc từ xa
              </h3>
              <div className="panel-key-difference">
                <span className="diff-label">QUAN ĐIỂM CHỦ ĐẠO</span>
                <ul className="diff-list">
                  {CHU_HIEU.modern.items.map((item, idx) => (
                    <li key={idx}>
                      <span className="diff-bullet diff-bullet--modern" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.article>
        </div>

        {/* Big Editorial Quote Statement */}
        <Reveal as="div" className="chuhieu-editorial-quote book-card-frame" delay={120} y={36}>

          <blockquote className="quote-text">
            “{CHU_HIEU.pullquote}”
          </blockquote>
          <cite className="quote-source">— {CHU_HIEU.pullquoteSrc}</cite>
        </Reveal>
      </div>
    </section>
  )
}
