import { useMemo, useState } from "react";

import { roadmapMilestones } from "../lib/content";

type Accent = (typeof roadmapMilestones)[number]["accent"];

const accentSurface: Record<Accent, string> = {
  blue: "bg-water-blue text-water-ivory",
  red: "bg-water-red text-water-ivory",
  yellow: "bg-water-yellow text-water-black",
  black: "bg-water-black text-water-ivory"
};

const accentCopy: Record<Accent, string> = {
  blue: "text-water-ivory/80",
  red: "text-water-ivory/80",
  yellow: "text-water-black/80",
  black: "text-water-ivory/80"
};

const accentMarker: Record<Accent, string> = {
  blue: "bg-water-blue",
  red: "bg-water-red",
  yellow: "bg-water-yellow",
  black: "bg-water-black"
};

const accentList: Record<Accent, string> = {
  blue: "border-water-ivory/50 bg-water-ivory/10 text-water-ivory",
  red: "border-water-ivory/50 bg-water-ivory/10 text-water-ivory",
  yellow: "border-water-black/30 bg-water-black/5 text-water-black",
  black: "border-water-ivory/50 bg-water-ivory/10 text-water-ivory"
};

const accentSummary: Record<Accent, string> = {
  blue: "text-water-ivory/80",
  red: "text-water-ivory/80",
  yellow: "text-water-black/70",
  black: "text-water-ivory/80"
};

const RoadmapSection = () => {
  const [activeVersion, setActiveVersion] = useState<(typeof roadmapMilestones)[number]["version"]>(
    roadmapMilestones[1].version
  );

  const selectedMilestone = useMemo(() => {
    const match = roadmapMilestones.find((milestone) => milestone.version === activeVersion);

    if (!match) {
      throw new Error(`Unknown roadmap milestone selected: ${activeVersion}`);
    }

    return match;
  }, [activeVersion]);

  const activeIndex = useMemo(() => {
    const index = roadmapMilestones.findIndex((milestone) => milestone.version === activeVersion);

    if (index === -1) {
      throw new Error(`Roadmap milestone index missing for ${activeVersion}`);
    }

    return index;
  }, [activeVersion]);

  const progress = ((activeIndex + 1) / roadmapMilestones.length) * 100;
  const progressWidth = `${String(progress)}%`;
  const surface = accentSurface[selectedMilestone.accent];
  const copy = accentCopy[selectedMilestone.accent];

  return (
    <section className="grid gap-10 border border-water-black bg-water-ivory p-10">
      <header className="grid gap-3">
        <p className="text-xs uppercase tracking-[0.4em] text-water-black">Course Chart</p>
        <h2 className="text-4xl font-semibold uppercase tracking-[0.2em] text-water-black md:text-5xl">
          Roadmap
        </h2>
        <p className="max-w-2xl text-sm uppercase tracking-[0.25em] text-water-black/70">
          Built in public. Each release expands rendering depth, platform coverage, and tooling driven by the community.
        </p>
      </header>
      <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-10">
        <article className={`grid gap-5 border border-water-black p-6 ${surface} lg:col-span-5`}>
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.35em]">
            <span className="border border-current px-3 py-1">{selectedMilestone.version}</span>
            <span>{selectedMilestone.status}</span>
          </div>
          <div className={`h-2 w-20 ${accentMarker[selectedMilestone.accent]}`} aria-hidden />
          <p className="text-xs uppercase tracking-[0.35em]">{selectedMilestone.focus}</p>
          <p className={`text-sm ${copy}`}>{selectedMilestone.summary}</p>
          <ul className="grid gap-2 text-xs uppercase tracking-[0.3em]">
            {selectedMilestone.highlights.map((highlight) => (
              <li key={highlight} className={`px-3 py-2 ${accentList[selectedMilestone.accent]}`}>
                {highlight}
              </li>
            ))}
          </ul>
        </article>
        <div className="grid gap-6 lg:col-span-7">
          <div className="grid gap-3">
            <p className="text-xs uppercase tracking-[0.35em] text-water-black/70">Select a milestone</p>
            <div className="grid gap-3">
              {roadmapMilestones.map((milestone) => {
                const isActive = milestone.version === activeVersion;
                const accent = accentSurface[milestone.accent];

                return (
                  <button
                    key={milestone.version}
                    type="button"
                    onClick={() => {
                      setActiveVersion(milestone.version);
                    }}
                    className={`flex flex-col gap-2 border border-water-black px-4 py-4 text-left text-xs uppercase tracking-[0.3em] transition-transform ${
                      isActive ? `${accent} -translate-y-1` : "bg-water-ivory text-water-black"
                    }`}
                    aria-pressed={isActive}
                  >
                    <span>{milestone.version}</span>
                    <span
                      className={`text-[0.7rem] lowercase tracking-[0.05em] ${
                        isActive ? accentSummary[milestone.accent] : "text-water-black/70"
                      }`}
                    >
                      {milestone.summary}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="grid gap-2">
            <p className="text-xs uppercase tracking-[0.35em] text-water-black/70">Progress</p>
            <div className="h-2 w-full border border-water-black bg-water-black/5">
              <div
                className={`${accentMarker[selectedMilestone.accent]} h-full`}
                style={{ width: progressWidth }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
