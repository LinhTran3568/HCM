import { CHU_HIEU, SECTION_IDS } from '../data/content'
import { SectionLabel } from '../components/SectionLabel'
import { Reveal } from '../components/Reveal'

export function ChuHieu() {
  return (
    <section id={SECTION_IDS.chuHieu} className="section-chuhieu" aria-label="Chữ hiếu, hai cách hiểu">
      <div className="container">
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
          <article className="comparison-panel comparison-panel--tradition">
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
          </article>

          {/* Right Panel: Hiện Đại */}
          <article className="comparison-panel comparison-panel--modern">
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
          </article>
        </div>

        {/* Big Editorial Quote Statement */}
        <div className="chuhieu-editorial-quote">
          <blockquote className="quote-text">
            “{CHU_HIEU.pullquote}”
          </blockquote>
          <cite className="quote-source">— {CHU_HIEU.pullquoteSrc}</cite>
        </div>
      </div>
    </section>
  )
}
