import { useMemo, useState } from "react";

import {
  cliHighlights,
  cliPlaybooks,
  cliSignalBands,
  cliSurfaceChannels
} from "../lib/content";

const playbookAccentSurface: Record<(typeof cliPlaybooks)[number]["accent"], string> = {
  blue: "bg-water-blue text-water-ivory",
  red: "bg-water-red text-water-ivory",
  yellow: "bg-water-yellow text-water-black"
};

const playbookAccentCopy: Record<(typeof cliPlaybooks)[number]["accent"], string> = {
  blue: "text-water-ivory/80",
  red: "text-water-ivory/80",
  yellow: "text-water-black/80"
};

const highlightAccentSurface: Record<(typeof cliHighlights)[number]["accent"], string> = {
  blue: "border-water-black bg-water-blue text-water-ivory",
  red: "border-water-black bg-water-red text-water-ivory",
  yellow: "border-water-black bg-water-yellow text-water-black"
};

const highlightAccentCopy: Record<(typeof cliHighlights)[number]["accent"], string> = {
  blue: "text-water-ivory/80",
  red: "text-water-ivory/80",
  yellow: "text-water-black/80"
};

const playbookChip: Record<(typeof cliPlaybooks)[number]["accent"], string> = {
  blue: "border-water-ivory/50 bg-water-ivory/10 text-water-ivory",
  red: "border-water-ivory/50 bg-water-ivory/10 text-water-ivory",
  yellow: "border-water-black/40 bg-water-black/5 text-water-black"
};

const channelAccentSurface: Record<(typeof cliSurfaceChannels)[number]["accent"], string> = {
  blue: "border-water-blue bg-water-blue/20 text-water-blue",
  red: "border-water-red bg-water-red/20 text-water-red",
  yellow: "border-water-yellow bg-water-yellow/20 text-water-yellow",
  black: "border-water-black bg-water-black text-water-ivory"
};

const bandAccentSurface: Record<(typeof cliSignalBands)[number]["accent"], string> = {
  red: "bg-water-red text-water-ivory",
  yellow: "bg-water-yellow text-water-black",
  blue: "bg-water-blue text-water-ivory"
};

const CLISection = () => {
  const [activeHighlight, setActiveHighlight] = useState<(typeof cliHighlights)[number]["value"]>(
    cliHighlights[0].value
  );
  const [revealHighlightDetails, setRevealHighlightDetails] = useState(false);
  const [activePlaybook, setActivePlaybook] = useState<(typeof cliPlaybooks)[number]["value"]>(
    cliPlaybooks[0].value
  );
  const [showCommands, setShowCommands] = useState(false);
  const [syncLevel, setSyncLevel] = useState(72);
  const [selectedChannels, setSelectedChannels] = useState<(typeof cliSurfaceChannels)[number]["value"][]>(
    cliSurfaceChannels.map((channel) => channel.value)
  );

  const highlight = useMemo(() => {
    const match = cliHighlights.find((item) => item.value === activeHighlight);

    if (!match) {
      throw new Error(`Unknown CLI highlight selected: ${activeHighlight}`);
    }

    return match;
  }, [activeHighlight]);

  const playbook = useMemo(() => {
    const match = cliPlaybooks.find((item) => item.value === activePlaybook);

    if (!match) {
      throw new Error(`Unknown CLI playbook selected: ${activePlaybook}`);
    }

    return match;
  }, [activePlaybook]);

  const signalBand = useMemo(() => {
    const match = cliSignalBands.find((band) => syncLevel >= band.min && syncLevel <= band.max);

    if (!match) {
      throw new Error(`No CLI signal band matches value: ${String(syncLevel)}`);
    }

    return match;
  }, [syncLevel]);

  const highlightSurface = highlightAccentSurface[highlight.accent];
  const highlightCopy = highlightAccentCopy[highlight.accent];
  const playbookSurface = playbookAccentSurface[playbook.accent];
  const playbookCopy = playbookAccentCopy[playbook.accent];
  const bandSurface = bandAccentSurface[signalBand.accent];

  return (
    <section className="grid gap-12 border border-water-black bg-water-ivory p-8 md:p-10">
      <header className="grid gap-4">
        <p className="text-xs uppercase tracking-[0.4em] text-water-black">Command Surface</p>
        <h2 className="text-4xl font-semibold uppercase tracking-[0.2em] text-water-black md:text-5xl">
          `water` CLI
        </h2>
        <p className="max-w-3xl text-base text-water-black/80">
          Drive WaterUI projects from the console with Bauhaus precision. The `water` CLI weaves manifests, platforms, and
          release signals into one tactile workflow.
        </p>
      </header>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-start">
        <div className="grid gap-8">
          <div className="grid gap-4 border border-water-black bg-water-ivory p-6">
            <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.3em]" role="tablist">
              {cliHighlights.map((item) => {
                const isActive = item.value === activeHighlight;

                return (
                  <button
                    key={item.value}
                    type="button"
                    className={`border border-water-black px-4 py-2 transition-transform ${
                      isActive ? "-translate-y-1 bg-water-black text-water-ivory" : "bg-water-ivory text-water-black"
                    }`}
                    aria-selected={isActive}
                    role="tab"
                    onClick={() => {
                      setActiveHighlight(item.value);
                      setRevealHighlightDetails(false);
                    }}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
            <article className={`grid gap-4 border border-water-black p-6 ${highlightSurface}`}>
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.35em]">
                <span className="border border-current px-3 py-1">{highlight.label}</span>
                <span>Multi-surface</span>
              </div>
              <h3 className="text-2xl font-semibold uppercase tracking-[0.2em]">{highlight.title}</h3>
              <p className={`text-sm ${highlightCopy}`}>{highlight.summary}</p>
              {revealHighlightDetails && (
                <ul className={`grid gap-2 text-sm normal-case tracking-[0.05em] ${highlightCopy}`}>
                  {highlight.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              )}
              <button
                type="button"
                className="self-start border border-current px-4 py-2 text-xs uppercase tracking-[0.3em]"
                onClick={() => {
                  setRevealHighlightDetails((previous) => !previous);
                }}
              >
                {revealHighlightDetails ? "Hide details" : "View details"}
              </button>
            </article>
          </div>
          <div className="grid gap-5 border border-water-black bg-water-ivory p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-[0.35em] text-water-black">
              <span>Playbooks</span>
              <span>Rust pipelines</span>
              <span>Native output</span>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3" role="tablist" aria-label="Select CLI playbook">
                {cliPlaybooks.map((item) => {
                  const isActive = item.value === activePlaybook;
                  const surface = playbookAccentSurface[item.accent];

                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => {
                        setActivePlaybook(item.value);
                        setShowCommands(false);
                      }}
                      className={`border border-water-black px-4 py-3 text-left text-xs uppercase tracking-[0.25em] transition-transform ${
                        isActive ? `${surface} -translate-y-1` : "bg-water-ivory text-water-black"
                      }`}
                      aria-selected={isActive}
                      role="tab"
                    >
                      <div className="flex items-center justify-between">
                        <span>{item.label}</span>
                        <span>{isActive ? "active" : "queue"}</span>
                      </div>
                      <p
                        className={`mt-3 text-[0.75rem] normal-case tracking-[0.05em] ${
                          isActive ? playbookAccentCopy[item.accent] : "text-water-black/70"
                        }`}
                      >
                        {item.summary}
                      </p>
                    </button>
                  );
                })}
              </div>
              <article className={`grid gap-4 border border-water-black p-6 ${playbookSurface}`}>
                <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.35em]">
                  <span className="border border-current px-3 py-1">{playbook.label}</span>
                  <span>Water flow</span>
                </div>
                <h3 className="text-2xl font-semibold uppercase tracking-[0.2em]">{playbook.headline}</h3>
                <p className={`text-sm ${playbookCopy}`}>{playbook.summary}</p>
                <ul className="grid gap-2 text-xs uppercase tracking-[0.3em]">
                  {playbook.insights.map((insight) => (
                    <li key={insight} className={`px-3 py-2 ${playbookChip[playbook.accent]}`}>
                      {insight}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="self-start border border-current px-4 py-2 text-xs uppercase tracking-[0.3em]"
                  onClick={() => {
                    setShowCommands((previous) => !previous);
                  }}
                >
                  {showCommands ? "Hide commands" : "View commands"}
                </button>
                {showCommands && (
                  <pre className="border border-current bg-water-ivory p-4 text-sm uppercase tracking-[0.25em] text-water-black">
                    <code>{playbook.commands.join("\n")}</code>
                  </pre>
                )}
                <ul className={`grid gap-2 text-sm normal-case tracking-[0.05em] ${playbookCopy}`}>
                  {playbook.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </div>
        <aside className="grid gap-6 border border-water-black bg-water-black p-6 text-water-ivory">
          <header className="grid gap-2">
            <p className="text-xs uppercase tracking-[0.35em] text-water-ivory/80">Release signals</p>
            <div className={`grid gap-2 border border-water-ivory/40 p-4 text-water-black ${bandSurface}`}>
              <span className="text-xs uppercase tracking-[0.35em]">{signalBand.title}</span>
              <p className="text-sm normal-case tracking-[0.05em]">{signalBand.message}</p>
            </div>
          </header>
          <label className="grid gap-2 text-xs uppercase tracking-[0.3em]" htmlFor="signal-sync-slider">
            Sync window
            <input
              id="signal-sync-slider"
              type="range"
              min={0}
              max={100}
              value={syncLevel}
              onChange={(event) => {
                setSyncLevel(Number(event.target.value));
              }}
              className="accent-water-red"
            />
            <span className="text-base normal-case tracking-[0.05em] text-water-ivory/80">{syncLevel}% linked</span>
          </label>
          <div className="grid gap-3">
            <p className="text-xs uppercase tracking-[0.3em] text-water-ivory/70">Channels</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Select CLI channel">
              {cliSurfaceChannels.map((channel) => {
                const isActive = selectedChannels.includes(channel.value);

                return (
                  <button
                    key={channel.value}
                    type="button"
                    className={`border border-water-ivory px-3 py-2 text-xs uppercase tracking-[0.3em] transition-transform ${
                      isActive ? "-translate-y-1 bg-water-ivory text-water-black" : "bg-transparent text-water-ivory"
                    }`}
                    aria-pressed={isActive}
                    onClick={() => {
                      if (isActive) {
                        if (selectedChannels.length === 1) {
                          return;
                        }

                        setSelectedChannels((previous) => previous.filter((value) => value !== channel.value));
                        return;
                      }

                      setSelectedChannels((previous) => [...previous, channel.value]);
                    }}
                  >
                    {channel.label}
                  </button>
                );
              })}
            </div>
            <ul className="grid gap-3">
              {selectedChannels.map((value) => {
                const channel = cliSurfaceChannels.find((item) => item.value === value);

                if (!channel) {
                  throw new Error(`Unknown CLI surface channel: ${value}`);
                }

                const surface = channelAccentSurface[channel.accent];

                return (
                  <li
                    key={channel.value}
                    className={`grid gap-2 border px-4 py-4 text-xs uppercase tracking-[0.3em] ${surface}`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{channel.label}</span>
                      <span>{channel.signal}</span>
                    </div>
                    <p className="text-sm normal-case tracking-[0.05em]">{channel.description}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default CLISection;
