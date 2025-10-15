import { useMemo, useState } from "react";

import { principles } from "../lib/content";

const accentSurface: Record<(typeof principles)[number]["accent"], string> = {
  blue: "bg-water-blue text-water-ivory",
  red: "bg-water-red text-water-ivory",
  yellow: "bg-water-yellow text-water-black"
};

const accentTag: Record<(typeof principles)[number]["accent"], string> = {
  blue: "bg-water-blue",
  red: "bg-water-red",
  yellow: "bg-water-yellow"
};

const PrinciplesSection = () => {
  const [active, setActive] = useState<(typeof principles)[number]["title"]>(principles[0].title);

  const selectedPrinciple = useMemo(() => {
    const match = principles.find((principle) => principle.title === active);

    if (!match) {
      throw new Error(`Unknown principle selected: ${active}`);
    }

    return match;
  }, [active]);

  const selectedSurface = accentSurface[selectedPrinciple.accent];
  const selectedTag = accentTag[selectedPrinciple.accent];

  return (
    <section className="grid gap-8 border border-water-black bg-water-ivory p-10">
      <header className="grid gap-3">
        <p className="text-xs uppercase tracking-[0.4em] text-water-black">Core principles</p>
        <h2 className="text-4xl font-semibold uppercase tracking-[0.25em] text-water-black md:text-5xl">
          Geometry that powers every interface
        </h2>
        <p className="max-w-2xl text-sm uppercase tracking-[0.3em] text-water-black/70">
          Choose a principle to reveal how WaterUI balances engineering clarity with Bauhaus precision.
        </p>
      </header>
      <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
        <div className="grid gap-3 lg:col-span-5">
          {principles.map((principle) => {
            const isActive = principle.title === active;
            const surface = accentSurface[principle.accent];

            return (
              <button
                key={principle.title}
                type="button"
                onClick={() => {
                  setActive(principle.title);
                }}
                className={`flex items-center justify-between border border-water-black px-5 py-4 text-left text-sm uppercase tracking-[0.2em] transition-transform ${
                  isActive ? `${surface} -translate-y-1` : "bg-water-ivory text-water-black"
                }`}
                aria-pressed={isActive}
              >
                <span>{principle.title}</span>
                <span className="text-xs">{isActive ? "active" : "view"}</span>
              </button>
            );
          })}
        </div>
        <article className={`grid gap-5 border border-water-black p-6 ${selectedSurface} lg:col-span-7`}>
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.35em]">
            <span className="border border-current px-3 py-1">{selectedPrinciple.title}</span>
            <span>WaterUI principle</span>
          </div>
          <div className={`h-2 w-24 ${selectedTag}`} aria-hidden />
          <p className="text-lg uppercase tracking-[0.25em]">
            {selectedPrinciple.description}
          </p>
          <p className="text-xs uppercase tracking-[0.35em] opacity-70">
            Form aligns with purpose. Each module maps to the same structure across native backends.
          </p>
        </article>
      </div>
    </section>
  );
};

export default PrinciplesSection;
