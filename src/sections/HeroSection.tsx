import { useCallback, useMemo, useState, type ChangeEvent } from "react";

import Button from "../components/Button";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import { cliWorkflows, heroFacts } from "../lib/content";

const accentBackground: Record<(typeof cliWorkflows)[number]["accent"], string> = {
  blue: "bg-water-blue text-water-ivory",
  red: "bg-water-red text-water-ivory",
  yellow: "bg-water-yellow text-water-black"
};

const accentStripe: Record<(typeof cliWorkflows)[number]["accent"], string> = {
  blue: "bg-water-blue",
  red: "bg-water-red",
  yellow: "bg-water-yellow"
};

const accentCopy: Record<(typeof cliWorkflows)[number]["accent"], string> = {
  blue: "text-water-ivory/80",
  red: "text-water-ivory/80",
  yellow: "text-water-black/80"
};

type Accent = keyof typeof accentBackground;

type WorkflowValue = (typeof cliWorkflows)[number]["value"];

const HeroSection = () => {
  const [flow, setFlow] = useState(72);
  const [liveReload, setLiveReload] = useState(true);
  const [activeWorkflow, setActiveWorkflow] = useState<WorkflowValue>(cliWorkflows[1].value);

  const handleFlowChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setFlow(Number(event.currentTarget.value));
  }, []);

  const toggleLiveReload = useCallback(() => {
    setLiveReload((previous) => !previous);
  }, []);

  const handleWorkflowChange = useCallback((workflowValue: WorkflowValue) => {
    setActiveWorkflow(workflowValue);
  }, []);

  const selectedWorkflow = useMemo(() => {
    const match = cliWorkflows.find((workflow) => workflow.value === activeWorkflow);

    if (!match) {
      throw new Error(`Unknown workflow selected: ${activeWorkflow}`);
    }

    return match;
  }, [activeWorkflow]);

  const flowStage = useMemo(() => {
    if (flow < 34) {
      return {
        label: "Prototype",
        description: "Sketch components and review layout metrics in real time.",
        accent: "blue" as Accent
      };
    }

    if (flow < 67) {
      return {
        label: "Compose",
        description: "Align structure, motion, and bindings as teams pair design with Rust.",
        accent: "red" as Accent
      };
    }

    return {
      label: "Ship",
      description: "Lock releases, export manifests, and hand builds to the `water` CLI for packaging.",
      accent: "yellow" as Accent
    };
  }, [flow]);

  const flowWidth = useMemo(() => `${String(Math.max(6, flow))}%`, [flow]);

  const flowAccentClasses = accentBackground[flowStage.accent];
  const flowCopyClasses = accentCopy[flowStage.accent];
  const workflowAccentClasses = accentBackground[selectedWorkflow.accent];
  const workflowCopyClasses = accentCopy[selectedWorkflow.accent];

  return (
    <header className="relative overflow-hidden border border-water-black bg-water-ivory">
      <div className="absolute inset-x-0 top-0 grid h-6 grid-cols-3" aria-hidden>
        <div className="bg-water-blue" />
        <div className="bg-water-red" />
        <div className="bg-water-yellow" />
      </div>
      <div className="grid gap-12 px-6 pb-12 pt-14 md:px-10 lg:grid-cols-12 lg:gap-10">
        <div className="flex flex-col gap-10 lg:col-span-7">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-6 border-b border-water-black pb-6">
              <div className="flex flex-wrap items-center justify-between gap-6">
                <Logo />
                <Navigation />
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.4em] text-water-black">
                <span className="border border-water-black px-3 py-2">WaterUI</span>
                <span>Design System for Rust</span>
                <span className="hidden border border-water-black px-3 py-2 md:inline">@waterui_dev</span>
              </div>
            </div>
            <div className="grid gap-6">
              <div className="grid gap-4">
                <p className="text-sm uppercase tracking-[0.35em] text-water-black/70">
                  Build once, tune everywhere
                </p>
                <h1 className="text-5xl font-semibold uppercase leading-[0.9] tracking-tight text-water-black md:text-6xl lg:text-7xl">
                  Interfaces engineered with flow
                </h1>
              </div>
              <p className="max-w-2xl text-base leading-relaxed text-water-black/80 md:text-lg">
                WaterUI pairs strict Bauhaus geometry with the pragmatism of Rust. Compose responsive layouts, stream live reloads,
                and deliver native experiences across SwiftUI, GTK4, Android, and the upcoming self-rendering engine.
              </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {heroFacts.map((fact) => (
                <li
                  key={fact.label}
                  className="border border-water-black bg-water-ivory p-4 transition-transform hover:-translate-y-1"
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-water-black/60">{fact.label}</p>
                  <p className="mt-2 text-sm uppercase tracking-[0.15em] text-water-black">{fact.value}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button>Read the book</Button>
            <Button variant="ghost">Explore the roadmap</Button>
          </div>
        </div>
        <div className="grid gap-8 lg:col-span-5">
          <div className="grid gap-3 sm:grid-cols-6" aria-hidden>
            <div className="flex min-h-[7.5rem] flex-col justify-between border border-water-black bg-water-blue px-5 py-4 text-[0.65rem] uppercase tracking-[0.35em] text-water-ivory sm:col-span-4">
              <span>Scaffold</span>
              <span>Blueprint native shells</span>
            </div>
            <div className="flex min-h-[7.5rem] flex-col justify-between border border-water-black bg-water-black px-5 py-4 text-[0.65rem] uppercase tracking-[0.35em] text-water-ivory sm:col-span-2">
              <span>Active</span>
              <span>Rust pipelines</span>
            </div>
            <div className="min-h-[7.5rem] border border-water-black bg-water-yellow sm:col-span-3" />
            <div className="min-h-[7.5rem] border border-water-black bg-water-red sm:col-span-3" />
            <div className="flex min-h-[7.5rem] items-center justify-center border border-water-black bg-water-ivory text-[0.65rem] uppercase tracking-[0.35em] sm:col-span-6">
              Control Console
            </div>
          </div>
          <div className="grid gap-6 border border-water-black bg-water-ivory p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 text-[0.7rem] uppercase tracking-[0.35em]">
              <span>Interface Kit</span>
              <span>Live Build</span>
              <span>Water CLI</span>
            </div>
            <div className="grid gap-5">
              <label className="grid gap-3 text-xs uppercase tracking-[0.3em]">
                Flow control
                <div className="grid gap-2">
                  <input
                    aria-label="Flow control"
                    type="range"
                    min="0"
                    max="100"
                    value={flow}
                    onChange={handleFlowChange}
                    className="h-2 w-full appearance-none border border-water-black bg-water-black/10"
                    style={{ accentColor: "#0047FF" }}
                  />
                  <div className="h-2 w-full border border-water-black bg-water-black/5">
                    <div className={`${accentStripe[flowStage.accent]} h-full`} style={{ width: flowWidth }} />
                  </div>
                </div>
              </label>
              <div className={`grid gap-3 border border-water-black p-4 text-left text-xs uppercase tracking-[0.3em] ${flowAccentClasses}`}>
                <div className="flex items-center justify-between">
                  <span>{flowStage.label} mode</span>
                  <span>{flow}% flow</span>
                </div>
                <p className={`text-[0.75rem] normal-case tracking-[0.05em] ${flowCopyClasses}`}>
                  {flowStage.description}
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={liveReload}
                onClick={toggleLiveReload}
                className={`flex items-center justify-between border border-water-black px-4 py-3 text-xs uppercase tracking-[0.3em] transition-colors ${
                  liveReload ? "bg-water-blue text-water-ivory" : "bg-water-ivory text-water-black"
                }`}
              >
                <span>Live reload</span>
                <span>{liveReload ? "On" : "Off"}</span>
              </button>
              <p className="text-[0.7rem] uppercase tracking-[0.3em] text-water-black/70">
                Every control mirrors the `water` CLI flags, so terminals and design canvases stay synchronized.
              </p>
              <fieldset className="grid gap-4">
                <legend className="text-xs uppercase tracking-[0.3em] text-water-black">CLI workflows</legend>
                <div className="grid gap-3" role="group" aria-label="Select a CLI workflow">
                  {cliWorkflows.map((workflow) => {
                    const isActive = workflow.value === activeWorkflow;
                    const accentClasses = accentBackground[workflow.accent];

                    return (
                      <button
                        key={workflow.value}
                        type="button"
                        onClick={() => {
                          handleWorkflowChange(workflow.value);
                        }}
                        className={`flex items-center justify-between border border-water-black px-4 py-3 text-sm uppercase tracking-[0.2em] transition-transform ${
                          isActive ? `${accentClasses} -translate-y-1` : "bg-water-ivory text-water-black"
                        }`}
                        aria-pressed={isActive}
                      >
                        <span>{workflow.label}</span>
                        <span className="text-xs">{isActive ? "active" : "select"}</span>
                      </button>
                    );
                  })}
                </div>
                <div className={`grid gap-3 border border-water-black p-4 ${workflowAccentClasses}`}>
                  <p className="text-xs uppercase tracking-[0.3em]">{selectedWorkflow.title}</p>
                  <p className={`text-sm ${workflowCopyClasses}`}>{selectedWorkflow.description}</p>
                  <pre className="border border-current bg-water-ivory p-3 text-[0.75rem] uppercase tracking-[0.2em] text-water-black">
                    <code>{selectedWorkflow.command}</code>
                  </pre>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
