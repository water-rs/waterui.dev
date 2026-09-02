import Nav from './components/Nav'
import Hero from './components/Hero'
import Targets from './components/Targets'
import Reactivity from './components/Reactivity'
import Previews from './components/Previews'
import QuickStart from './components/QuickStart'
import Gallery from './components/Gallery'
import Roadmap from './components/Roadmap'
import Footer from './components/Footer'

export default function App() {
  return (
    <div id="top" className="min-h-screen bg-paper text-ink">
      <Nav />
      <main>
        <Hero />
        <Targets />
        <Reactivity />
        <Previews />
        <QuickStart />
        <Gallery />
        <Roadmap />
      </main>
      <Footer />
    </div>
  )
}
