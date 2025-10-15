const PhilosophySection = () => (
  <section className="grid gap-10 border border-water-black bg-water-ivory p-10 text-water-black lg:grid-cols-12 lg:items-center">
    <div className="max-w-2xl space-y-6 lg:col-span-8">
      <h2 className="text-4xl font-semibold uppercase tracking-[0.4em]">Design. Structure. Flow.</h2>
      <p className="text-lg text-water-black/80">
        WaterUI is crafted from Water’s core principles: strict geometry, purposeful motion, and consistent logic. Every component is a building block that composes into fluid experiences, whether you ship native apps, the web, or embedded displays.
      </p>
      <p className="text-lg text-water-black/80">
        Inspired by Bauhaus discipline and modern systems programming, WaterUI makes interfaces that feel engineered and expressive without ornamentation.
      </p>
    </div>
    <div className="grid gap-4 text-xs uppercase tracking-[0.3em] lg:col-span-4 lg:justify-self-end">
      <div className="flex h-20 w-full max-w-[12rem] items-center justify-center border border-water-black bg-water-blue text-water-ivory">
        Form
      </div>
      <div className="flex h-20 w-full max-w-[12rem] items-center justify-center border border-water-black bg-water-red text-water-ivory">
        Color
      </div>
      <div className="flex h-20 w-full max-w-[12rem] items-center justify-center border border-water-black bg-water-yellow text-water-black">
        Flow
      </div>
    </div>
  </section>
);

export default PhilosophySection;
