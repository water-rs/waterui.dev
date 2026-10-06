import Nav from './components/Nav'
import Hero from './components/Hero'
import Backends from './components/Backends'
import Reactivity from './components/Reactivity'
import Engine from './components/Engine'
import Benchmarks from './components/Benchmarks'
import Features from './components/Features'
import Previews from './components/Previews'
import Gallery from './components/Gallery'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Nav />
      <main>
        <Hero />
        <Backends />
        <Reactivity />
        <Engine />
        <Benchmarks />
        <Features />
        <Previews />
        <Gallery />
      </main>
      <Footer />
    </div>
  )
}
