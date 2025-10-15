import { useCallback, useMemo, useState, type ChangeEvent } from "react";

import Button from "../components/Button";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import { cliWorkflows } from "../lib/content";

const accentBackground: Record<
  (typeof cliWorkflows)[number]["accent"],
  string
> = {
  blue: "bg-water-blue text-water-ivory",
  red: "bg-water-red text-water-ivory",
  yellow: "bg-water-yellow text-water-black",
};

const accentStripe: Record<(typeof cliWorkflows)[number]["accent"], string> = {
  blue: "bg-water-blue",
  red: "bg-water-red",
  yellow: "bg-water-yellow",
};

const accentCopy: Record<(typeof cliWorkflows)[number]["accent"], string> = {
  blue: "text-water-ivory/80",
  red: "text-water-ivory/80",
  yellow: "text-water-black/80",
};

type Accent = keyof typeof accentBackground;

type WorkflowValue = (typeof cliWorkflows)[number]["value"];

const HeroSection = () => {
  const [flow, setFlow] = useState(72);
  const [activeWorkflow, setActiveWorkflow] = useState<WorkflowValue>(
    cliWorkflows[1].value
  );

  const selectedWorkflow = useMemo(() => {
    const match = cliWorkflows.find(
      (workflow) => workflow.value === activeWorkflow
    );

    if (!match) {
      throw new Error(`Unknown workflow selected: ${activeWorkflow}`);
    }

    return match;
  }, [activeWorkflow]);

  const flowStage = useMemo(() => {
    if (flow < 34) {
      return {
        label: "Prototype",
        description:
          "Sketch components and review layout metrics in real time.",
        accent: "blue" as Accent,
      };
    }

    if (flow < 67) {
      return {
        label: "Compose",
        description:
          "Align structure, motion, and bindings as teams pair design with Rust.",
        accent: "red" as Accent,
      };
    }

    return {
      label: "Ship",
      description:
        "Lock releases, export manifests, and hand builds to the `water` CLI for packaging.",
      accent: "yellow" as Accent,
    };
  }, [flow]);

  const flowWidth = useMemo(() => `${String(Math.max(6, flow))}%`, [flow]);

  const flowAccentClasses = accentBackground[flowStage.accent];
  const flowCopyClasses = accentCopy[flowStage.accent];
  const workflowAccentClasses = accentBackground[selectedWorkflow.accent];
  const workflowCopyClasses = accentCopy[selectedWorkflow.accent];

  return (
    <header className="relative overflow-hidden border border-water-black bg-water-ivory">
      <div
        className="absolute inset-x-0 top-0 grid h-6 grid-cols-3"
        aria-hidden
      >
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
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.4em] text-water-black"></div>
            </div>
            <div className="grid gap-6">
              <div className="grid gap-4">
                <p className="text-sm uppercase tracking-[0.35em] text-water-black/70">
                  Learn once, tune everywhere
                </p>
                <h1 className="text-5xl font-semibold uppercase leading-[0.9] tracking-tight text-water-black md:text-6xl lg:text-7xl">
                  Interfaces engineered with flow
                </h1>
              </div>
              <p className="max-w-2xl text-base leading-relaxed text-water-black/80 md:text-lg">
                WaterUI pairs strict Bauhaus geometry with the pragmatism of
                Rust. Compose responsive layouts, stream live reloads, and
                deliver native experiences across SwiftUI, Android, and the
                upcoming self-rendering engine.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button>Read the book</Button>
            <Button variant="ghost">Explore the roadmap</Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
