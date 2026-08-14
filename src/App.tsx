import { lazy, Suspense, useState } from 'react'
import { Navbar } from './components/Navbar'
import { BackToTop } from './components/BackToTop'
import { LotusPetalsCanvas } from './components/LotusPetalsCanvas'
import { RippleCanvas } from './components/RippleCanvas'
import { CardTiltEffect } from './components/CardTiltEffect'
import { TextLetterHover } from './components/TextLetterHover'
import type { UserChoice } from './components/intro3d/types'
import { Hero } from './sections/Hero'
import { Thesis } from './sections/Thesis'
import { ChuHieu } from './sections/ChuHieu'
import { GiaoTrinh } from './sections/GiaoTrinh'
import { GiaDinh } from './sections/GiaDinh'
import { ORieng } from './sections/ORieng'
import { Conclusion } from './sections/Conclusion'
import { Footer } from './sections/Footer'

const Intro3D = lazy(() =>
  import('./components/intro3d/Intro3D').then((m) => ({ default: m.Intro3D })),
)

function IntroLoader() {
  return (
    <div className="intro3d intro3d--loading">
      <div className="intro3d-brand">
        <span className="intro3d-brand__dot" aria-hidden="true" />
        <span>NẾP NHÀ MỚI</span>
      </div>
      <div className="intro3d-loader" aria-label="Đang tải">
        <span />
        <span />
        <span />
      </div>
    </div>
  )
}

function App() {
  const [entered, setEntered] = useState(false)
  const [choice, setChoice] = useState<UserChoice | null>(null)

  if (!entered) {
    return (
      <Suspense fallback={<IntroLoader />}>
        <Intro3D onEnter={(c) => { setChoice(c); setEntered(true) }} />
      </Suspense>
    )
  }

  return (
    <>
      <LotusPetalsCanvas />
      <RippleCanvas />
      <CardTiltEffect />
      <TextLetterHover />
      <Navbar />
      <BackToTop />
      <main>
        <Hero choice={choice} />
        <Thesis />
        <ChuHieu />
        <GiaoTrinh />
        <GiaDinh />
        <ORieng />
        <Conclusion />
      </main>
      <Footer />
    </>
  )
}

export default App
