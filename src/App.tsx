import Nav from './components/Nav'
import Hero from './components/Hero'
import Targets from './components/Targets'
import Reactivity from './components/Reactivity'
import Features from './components/Features'
import Previews from './components/Previews'
import QuickStart from './components/QuickStart'
import Gallery from './components/Gallery'
import Footer from './components/Footer'

export default function App() {
  return (
    <div id="top" className="min-h-screen bg-paper text-ink">
      <Nav />
      <main>
        <Hero />
        <Targets />
        <Reactivity />
        <Features />
        <Previews />
        <QuickStart />
        <Gallery />
      </main>
      <Footer />
    </div>
  )
}
