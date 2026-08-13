import { motion, useReducedMotion } from 'framer-motion'
import { GIA_DINH, SECTION_IDS } from '../data/content'
import { SectionLabel } from '../components/SectionLabel'
import { Reveal } from '../components/Reveal'
import { Parallax } from '../components/Parallax'
import { SectionDivider } from '../components/SectionDivider'

const easeOut = [0.16, 1, 0.3, 1] as const

export function GiaDinh() {
  const reduce = useReducedMotion()

  return (
    <section id={SECTION_IDS.giaDinh} className="section-giadinh book-page-section" aria-label="Truyền thống đến hạt nhân">
      {/* Background Image Layer */}
      <div className="section-bg-image-layer" aria-hidden="true">
        <Parallax className="parallax-bg-layer" zoom={1.18}>
          <div
            className="section-bg-photo"
            style={{ backgroundImage: `url('/images/part3-bg.jpg')` }}
          />
        </Parallax>
        <div className="section-bg-parchment-veil" />
        <SectionDivider />
        <div className="section-bottom-fade" />
      </div>

      <div className="container relative-z">
        <div className="giadinh-header">
          <Reveal>
            <SectionLabel num={GIA_DINH.num}>{GIA_DINH.kicker}</SectionLabel>
          </Reveal>

          <Reveal as="h2" className="giadinh-headline" delay={80}>
            CHUYỂN BIẾN MÔ HÌNH GIA ĐÌNH VIỆT NAM
          </Reveal>

          <Reveal as="p" className="giadinh-sub" delay={140}>
            {GIA_DINH.sub}
          </Reveal>
        </div>

        {/* Major Visual Transformation Flow */}
        <div className="transformation-hero-flow">
          <div className="transform-nodes-grid">
            {GIA_DINH.timeline.map((node, i) => (
              <motion.div
                key={node.num}
                className="transform-node-card book-card-frame"
                initial={reduce ? false : { opacity: 0, y: 30 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, delay: i * 0.2, ease: easeOut }}
              >
                <div className="node-num-tag">{node.num}</div>
                <h3 className="node-title">{node.title}</h3>
                <p className="node-desc">{node.desc}</p>
                {i < GIA_DINH.timeline.length - 1 && (
                  <div className="node-down-arrow" aria-hidden="true">
                    <span>↓</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="core-values-bar book-card-frame">
            <span className="core-values-label">GIÁ TRỊ VẪN ĐƯỢC GIỮ VỮNG:</span>
            <div className="core-values-pills">
              {GIA_DINH.timelineValues.map((val) => (
                <span key={val} className="value-pill">
                  {val}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Pros and Cons Comparison */}
        <div className="uv-comparison-grid">
          {GIA_DINH.uv.map((col, i) => (
            <Reveal key={col.name} className="uv-card-panel book-card-frame" delay={i * 120}>
              <h3 className="uv-panel-name">{col.name}</h3>
              <div className="uv-group-box">
                <h4 className="uv-heading uv-heading--good">ƯU ĐIỂM</h4>
                <ul className="uv-list-items">
                  {col.good.map((item, j) => (
                    <li key={j}>
                      <span className="good-ic">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="uv-group-box">
                <h4 className="uv-heading uv-heading--bad">THÁCH THỨC / HẠN CHẾ</h4>
                <ul className="uv-list-items">
                  {col.bad.map((item, j) => (
                    <li key={j}>
                      <span className="bad-ic">!</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Revealed Data Table Supporting Evidence */}
        <Reveal as="div" className="supporting-data-table-wrap book-card-frame" y={40}>

          <div className="table-caption-bar">
            <h3>DỮ LIỆU ĐỐI CHIẾU CHỨC NĂNG GIA ĐÌNH</h3>
            <p>Bảng tổng hợp chức năng duy trì giữa hai hình thức gia đình</p>
          </div>

          <table className="supporting-data-table">
            <thead>
              <tr>
                <th scope="col">CHỨC NĂNG GIA ĐÌNH</th>
                <th scope="col">GIA ĐÌNH TRUYỀN THỐNG</th>
                <th scope="col">GIA ĐÌNH HẠT NHÂN</th>
              </tr>
            </thead>
            <tbody>
              {GIA_DINH.table.map((row) => (
                <tr key={row.fn}>
                  <th scope="row">{row.fn}</th>
                  <td>
                    <span className={row.trad === 'Có' ? 'table-badge-yes' : ''}>{row.trad}</span>
                  </td>
                  <td>
                    <span className={row.modern === 'Có' ? 'table-badge-yes' : ''}>{row.modern}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="table-footer-quote">
            <p>
              {GIA_DINH.noteStart}
              <strong>"{GIA_DINH.noteGold}"</strong>
              {GIA_DINH.noteEnd}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
