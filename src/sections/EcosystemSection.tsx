import { useMemo, useState } from "react";

import {
  architectureLayers,
  ecosystemResources,
  featureHighlights
} from "../lib/content";

const featurePalette = [
  "bg-water-blue text-water-ivory",
  "bg-water-red text-water-ivory",
  "bg-water-yellow text-water-black"
] as const;

const EcosystemSection = () => {
  const [activeLayer, setActiveLayer] = useState<(typeof architectureLayers)[number]["title"]>(
    architectureLayers[0].title
  );

  const selectedLayer = useMemo(() => {
    const match = architectureLayers.find((layer) => layer.title === activeLayer);

    if (!match) {
      throw new Error(`Unknown ecosystem layer selected: ${activeLayer}`);
    }

    return match;
  }, [activeLayer]);

  return (
    <section className="grid gap-12 border border-water-black bg-water-ivory p-10">
      <header className="grid gap-4">
        <p className="text-xs uppercase tracking-[0.4em] text-water-black">System Overview</p>
        <h2 className="text-4xl font-semibold uppercase tracking-[0.2em] text-water-black md:text-5xl">
          Ecosystem
        </h2>
        <p className="max-w-3xl text-base text-water-black/80">
          WaterUI is a constellation of crates that map code structure to visual form. Explore the layers that deliver native
          rendering, follow the resources that teach the stack, and combine primitives into architectural canvases.
        </p>
      </header>
      <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-10">
        <div className="grid gap-6 lg:col-span-8">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {featureHighlights.map((feature, index) => {
              const paletteIndex = index % featurePalette.length;
              const paletteClass = featurePalette[paletteIndex];

              if (!paletteClass) {
                throw new Error(`Unknown palette index for feature highlight: ${feature.title}`);
              }

              return (
                <li
                  key={feature.title}
                  className={`border border-water-black p-6 text-xs uppercase tracking-[0.25em] transition-transform hover:-translate-y-1 ${paletteClass}`}
                >
                  <p className="font-semibold">{feature.title}</p>
                  <p className="mt-3 text-[0.75rem] normal-case tracking-[0.05em] opacity-80">
                    {feature.description}
                  </p>
                </li>
              );
            })}
          </ul>
          <div className="grid gap-4 border border-water-black bg-water-ivory p-6">
            <p className="text-xs uppercase tracking-[0.35em] text-water-black/70">Learn the system</p>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {ecosystemResources.map((resource) => (
                <li key={resource.label} className="grid gap-1 text-sm uppercase tracking-[0.2em]">
                  <a
                    className="border border-water-black bg-water-ivory px-4 py-3 transition-transform hover:-translate-y-1"
                    href={resource.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {resource.label}
                  </a>
                  <p className="text-[0.75rem] lowercase tracking-[0.05em] text-water-black/70">{resource.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <aside className="grid gap-5 border border-water-black bg-water-black p-6 text-water-ivory lg:col-span-4">
          <p className="text-xs uppercase tracking-[0.35em] text-water-ivory/80">Architecture layers</p>
          <div className="grid gap-3">
            {architectureLayers.map((layer) => {
              const isActive = layer.title === activeLayer;

              return (
                <button
                  key={layer.title}
                  type="button"
                  onClick={() => {
                    setActiveLayer(layer.title);
                  }}
                  className={`border border-water-ivory/50 px-4 py-3 text-left text-xs uppercase tracking-[0.25em] transition-transform ${
                    isActive ? "bg-water-ivory text-water-black -translate-y-1" : "bg-water-black text-water-ivory"
                  }`}
                  aria-pressed={isActive}
                >
                  <span>{layer.title}</span>
                </button>
              );
            })}
          </div>
          <article className="grid gap-3 border border-water-ivory/40 bg-water-ivory p-5 text-water-black">
            <p className="text-xs uppercase tracking-[0.35em] text-water-black/70">Focus</p>
            <p className="text-lg uppercase tracking-[0.25em]">{selectedLayer.title}</p>
            <p className="text-sm text-water-black/80">{selectedLayer.detail}</p>
            <p className="text-xs uppercase tracking-[0.35em] text-water-black/60">
              Shared ownership between Rust crates keeps geometry and motion consistent across every backend.
            </p>
          </article>
        </aside>
      </div>
    </section>
  );
};

export default EcosystemSection;
