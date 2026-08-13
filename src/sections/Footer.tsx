import { FOOTER } from '../data/content'
import { Reveal } from '../components/Reveal'

export function Footer() {
  return (
    <>
      <footer className="footer" aria-label="Chân trang">
        <div className="container">
          <Reveal as="h2" className="footer-brand">
            {FOOTER.brand}
          </Reveal>
          <Reveal as="p" className="footer-desc" delay={80}>
            {FOOTER.desc}
          </Reveal>
          <Reveal className="footer-tag" delay={140}>
            {FOOTER.tag}
          </Reveal>

          <div className="footer-grid">
            <Reveal className="footer-col" delay={160}>
              <h3 className="footer-col-label">Về bài thuyết trình</h3>
              <p className="footer-summary">{FOOTER.summary}</p>
            </Reveal>

            <Reveal className="footer-col" delay={200}>
              <h3 className="footer-col-label">Trích dẫn</h3>
              <p className="footer-summary">{FOOTER.bottom.line2}</p>
            </Reveal>
          </div>

          <div className="footer-bottom">
            <span>{FOOTER.bottom.line1}</span>
            <span>NẾP NHÀ MỚI — {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>
    </>
  )
}
