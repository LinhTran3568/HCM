import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Building2 } from 'lucide-react'
import { CharScene } from './CharScene'
import type { Phase, UserChoice } from './types'

type Intro3DProps = {
  onEnter: (choice: UserChoice) => void
}

export function Intro3D({ onEnter }: Intro3DProps) {
  const [phase, setPhase] = useState<Phase>('boot')
  const [choice, setChoice] = useState<UserChoice | null>(null)
  const done = useRef(false)
  const timers = useRef<number[]>([])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const timerList = timers.current
    const t1 = window.setTimeout(() => setPhase('ask'), 1300)
    timerList.push(t1)
    return () => {
      document.body.style.overflow = ''
      timerList.forEach((t) => window.clearTimeout(t))
    }
  }, [])

  const choose = (c: UserChoice) => {
    if (choice) return
    setChoice(c)
    setPhase('walk')
    timers.current.push(window.setTimeout(() => setPhase('exit'), 2700))
    timers.current.push(
      window.setTimeout(() => {
        if (done.current) return
        done.current = true
        window.scrollTo(0, 0)
        onEnter(c)
      }, 3550),
    )
  }

  return (
    <div className="intro3d" role="dialog" aria-modal="true" aria-label="Lựa chọn đáp án mở đầu">
      <div className="intro3d-canvas">
        <CharScene phase={phase} choice={choice} />
      </div>

      <header className="intro3d-top">
        <div className="intro3d-brand">
          <span className="intro3d-brand__dot" aria-hidden="true" />
          <span>NẾP NHÀ MỚI</span>
        </div>
        <span className="intro3d-kicker">TÌNH HUỐNG MỞ ĐẦU</span>
      </header>

      <AnimatePresence mode="wait">
        {phase === 'ask' && (
          <motion.div
            key="ask"
            className="intro3d-bottom"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 14 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className="intro3d-panel">
              <p className="intro3d-question">
                Bạn nghĩ mẹ chồng và nàng dâu nên <strong>ở chung</strong> một mái nhà hay{' '}
                <strong>ở riêng</strong> một gia đình nhỏ?
              </p>
              <div className="intro3d-actions">
                <button type="button" className="intro3d-btn intro3d-btn--chung" onClick={() => choose('chung')}>
                  <Home size={20} aria-hidden="true" />
                  <span className="intro3d-btn__text">
                    Ở CHUNG
                    <span className="intro3d-btn__sub">Một mái nhà ấm áp</span>
                  </span>
                </button>
                <button type="button" className="intro3d-btn intro3d-btn--rieng" onClick={() => choose('rieng')}>
                  <Building2 size={20} aria-hidden="true" />
                  <span className="intro3d-btn__text">
                    Ở RIÊNG
                    <span className="intro3d-btn__sub">Một gia đình nhỏ tự lập</span>
                  </span>
                </button>
              </div>
              <p className="intro3d-hint">Chọn một đáp án để bước vào câu chuyện</p>
            </div>
          </motion.div>
        )}

        {choice && (phase === 'walk' || phase === 'exit') && (
          <motion.div
            key="chosen"
            className="intro3d-bottom"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="intro3d-chosen">
              <span className={`intro3d-chosen__pill intro3d-chosen__pill--${choice}`}>
                {choice === 'chung' ? <Home size={15} aria-hidden="true" /> : <Building2 size={15} aria-hidden="true" />}
                BẠN CHỌN: {choice === 'chung' ? 'Ở CHUNG' : 'Ở RIÊNG'}
              </span>
              <span className="intro3d-chosen__hint">
                {phase === 'exit' ? 'Đang bắt đầu câu chuyện…' : 'Đưa các nhân vật về ngôi nhà…'}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="intro3d-fade"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'exit' ? 1 : 0 }}
        transition={{ duration: 0.9, ease: 'easeInOut' }}
      />
    </div>
  )
}
