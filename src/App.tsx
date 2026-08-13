import { Navbar } from './components/Navbar'
import { LotusPetalsCanvas } from './components/LotusPetalsCanvas'
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
      <Navbar />
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
