import { useState, useEffect } from 'react'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import ValuePropBar from './components/ValuePropBar'
import QuickStart from './components/QuickStart'
import Features from './components/Features'
import Gallery from './components/Gallery'
import Architecture from './components/Architecture'
import Footer from './components/Footer'

function App() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[#F0F0F0] overflow-x-hidden">
      <Navigation />
      <Hero />
      <ValuePropBar />
      <QuickStart />
      <Features />
      <Gallery />
      <Architecture />
      <Footer />
    </div>
  )
}

export default App
