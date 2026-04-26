import CtaBand from './components/cta/CtaBand.jsx'
import Footer from './components/footer/Footer.jsx'
import Hero from './components/hero/Hero.jsx'
import MainNav from './components/nav/MainNav.jsx'
import TopBar from './components/nav/TopBar.jsx'
import NewsSection from './components/news/NewsSection.jsx'
import NumbersBand from './components/numbers/NumbersBand.jsx'
import SectorsStrip from './components/sectors/SectorsStrip.jsx'
import ServicesSection from './components/services/ServicesSection.jsx'
import ValuesSection from './components/values/ValuesSection.jsx'

function App() {
  return (
    <div className="min-h-screen bg-bone text-ink">
      <TopBar />
      <MainNav />
      <main>
        <Hero />
        <ServicesSection />
        <SectorsStrip />
        <ValuesSection />
        <NumbersBand />
        <NewsSection />
        <CtaBand />
      </main>
      <Footer />
    </div>
  )
}

export default App
