import HeroSection from "./sections/HeroSection";
import PrinciplesSection from "./sections/PrinciplesSection";
import CLISection from "./sections/CLISection";
import EcosystemSection from "./sections/EcosystemSection";
import RoadmapSection from "./sections/RoadmapSection";
import PhilosophySection from "./sections/PhilosophySection";
import EndnoteSection from "./sections/EndnoteSection";

const App = () => (
  <div className="min-h-screen bg-water-ivory text-water-black">
    <main className="mx-auto flex max-w-7xl flex-col gap-16 px-6 py-16 md:gap-20 md:px-10 md:py-24">
      <HeroSection />
      <PrinciplesSection />
      <CLISection />
      <EcosystemSection />
      <RoadmapSection />
      <PhilosophySection />
    </main>
    <EndnoteSection />
  </div>
);

export default App;
