import { Route, Routes } from 'react-router-dom'
import MainNav from './components/nav/MainNav.jsx'
import TopBar from './components/nav/TopBar.jsx'
import Home from './pages/Home.jsx'
import Servicios from './pages/Servicios.jsx'

function App() {
  return (
    <div className="min-h-screen bg-bone text-ink">
      <TopBar />
      <MainNav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicios" element={<Servicios />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
