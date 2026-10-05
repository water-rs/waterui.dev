import Nav from './components/Nav'
import Hero from './components/Hero'
import Backends from './components/Backends'
import Reactivity from './components/Reactivity'
import Engine from './components/Engine'
import Benchmarks from './components/Benchmarks'
import Features from './components/Features'
import Previews from './components/Previews'
import QuickStart from './components/QuickStart'
import Gallery from './components/Gallery'
import LiveDemo from './components/LiveDemo'
import Footer from './components/Footer'
import { InspectorProvider } from './components/inspector'

export default function App() {
  return (
    <InspectorProvider>
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
          <QuickStart />
          <Gallery />
          <LiveDemo />
        </main>
        <Footer />
      </div>
    </InspectorProvider>
  )
}
