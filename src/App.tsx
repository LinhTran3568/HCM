import { Navbar } from './components/Navbar'
import { BackToTop } from './components/BackToTop'
import { LotusPetalsCanvas } from './components/LotusPetalsCanvas'
import { RippleCanvas } from './components/RippleCanvas'
import { Hero } from './sections/Hero'
import { Thesis } from './sections/Thesis'
import { ChuHieu } from './sections/ChuHieu'
import { GiaoTrinh } from './sections/GiaoTrinh'
import { GiaDinh } from './sections/GiaDinh'
import { ORieng } from './sections/ORieng'
import { Conclusion } from './sections/Conclusion'
import { Footer } from './sections/Footer'

function App() {
  return (
    <>
      <LotusPetalsCanvas />
      <RippleCanvas />
      <Navbar />
      <BackToTop />
      <main>
        <Hero />
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
