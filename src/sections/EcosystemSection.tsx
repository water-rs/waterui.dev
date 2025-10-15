import { useMemo, useState } from "react";

import {
  architectureLayers,
  ecosystemResources,
  featureHighlights,
} from "../lib/content";

const featurePalette = [
  "bg-water-blue text-water-ivory",
  "bg-water-red text-water-ivory",
  "bg-water-yellow text-water-black",
] as const;

const EcosystemSection = () => {
  return (
    <section className="grid gap-12 border border-water-black bg-water-ivory p-10">
      <header className="grid gap-4">
        <p className="text-xs uppercase tracking-[0.4em] text-water-black">
          System Overview
        </p>
        <h2 className="text-4xl font-semibold uppercase tracking-[0.2em] text-water-black md:text-5xl">
          Ecosystem
        </h2>
        <p className="max-w-3xl text-base text-water-black/80">
          WaterUI is a constellation of crates that map code structure to visual
          form. Explore the layers that deliver native rendering, follow the
          resources that teach the stack, and combine primitives into
          architectural canvases.
        </p>
      </header>
      <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-10">
        <div className="grid gap-6 lg:col-span-8">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {featureHighlights.map((feature, index) => {
              const paletteIndex = index % featurePalette.length;
              const paletteClass = featurePalette[paletteIndex];

              if (!paletteClass) {
                throw new Error(
                  `Unknown palette index for feature highlight: ${feature.title}`
                );
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
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;
