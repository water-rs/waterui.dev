import { useMemo, useState } from "react";
import { architectureLayers } from "../lib/content";

const layerAccents = ["#0047FF", "#FF2937", "#FFC700", "#F4F0E8"] as const;

const LayerSection = () => {
  const [activeLayer, setActiveLayer] = useState<
    (typeof architectureLayers)[number]["title"]
  >(architectureLayers[0].title);

  const selectedLayer = useMemo(() => {
    const match = architectureLayers.find(
      (layer) => layer.title === activeLayer
    );

    if (!match) {
      throw new Error(`Unknown ecosystem layer selected: ${activeLayer}`);
    }

    return match;
  }, [activeLayer]);
  return (
    <section className="grid gap-6 border border-water-black bg-water-black p-6 text-water-ivory lg:col-span-4">
      <header className="grid gap-2">
        <p className="text-xs uppercase tracking-[0.35em] text-water-ivory/70">
          Architecture layers
        </p>
        <h3 className="text-lg uppercase tracking-[0.25em] text-water-ivory">
          Layered runtime stack
        </h3>
        <p className="text-sm text-water-ivory/70">
          Explore how the platform composes from framework core to platform
          backends. Select a layer to surface the responsibilities that travel
          with it.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.8fr),minmax(0,1fr)] lg:items-start lg:gap-12">
        <div className="relative flex flex-col gap-4">
          <div
            className="relative flex h-[320px] w-full items-center justify-center lg:justify-start"
            style={{ perspective: "1600px" }}
          >
            <div className="relative h-[280px] w-full max-w-[320px] transform-gpu [transform-style:preserve-3d] lg:h-[320px] lg:max-w-[380px]">
              <div className="pointer-events-none absolute inset-0 rounded-[32px] border border-water-ivory/20 bg-gradient-to-b from-water-black/40 to-water-black/10 blur-3xl" />
              <div className="pointer-events-none absolute inset-x-6 bottom-2 h-8 rounded-full bg-gradient-to-r from-water-ivory/10 via-water-ivory/5 to-water-ivory/10 blur" />
              <div
                className="absolute inset-0 rounded-[32px] border border-water-ivory/30 bg-water-black/60 shadow-[0_25px_120px_rgba(0,0,0,0.55)]"
                style={{
                  transform: "rotateX(58deg) rotateZ(-2deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                {architectureLayers.map((layer, index) => {
                  const totalLayers = architectureLayers.length;
                  const accent =
                    layerAccents[index % layerAccents.length] ?? "#0047FF";
                  const isActive = layer.title === activeLayer;
                  const depthOffset = (totalLayers - index - 1) * 70;
                  const translateZ = -depthOffset;
                  const translateY = index * 32;
                  return (
                    <button
                      key={layer.title}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => {
                        setActiveLayer(layer.title);
                      }}
                      className="group absolute left-1/2 top-1/2 w-[82%] min-w-[200px] overflow-hidden rounded-2xl border border-water-ivory/40 px-6 py-5 text-left text-sm uppercase tracking-[0.2em] text-water-ivory/80 transition-all duration-500 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-water-ivory"
                      style={{
                        transform: `translate3d(-50%, -50%, ${translateZ}px) translateY(${translateY}px)`,
                        transformStyle: "preserve-3d",
                        background: isActive
                          ? `linear-gradient(145deg, ${accent} 0%, rgba(5,5,5,0.85) 65%)`
                          : "linear-gradient(145deg, rgba(244,240,232,0.15) 0%, rgba(5,5,5,0.75) 85%)",
                        borderColor: isActive
                          ? accent
                          : "rgba(244, 240, 232, 0.25)",
                        boxShadow: isActive
                          ? "0 25px 45px rgba(0,0,0,0.55), 0 0 45px rgba(255,255,255,0.08)"
                          : "0 16px 35px rgba(0,0,0,0.45)",
                        zIndex: isActive ? totalLayers + 10 : totalLayers - index,
                      }}
                    >
                      <span className="block text-[0.6rem] tracking-[0.3em] text-water-ivory/60">
                        Layer {index + 1}
                      </span>
                      <span className="block pt-2 text-base uppercase tracking-[0.18em] text-water-ivory">
                        {layer.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid gap-2 text-xs uppercase tracking-[0.3em] text-water-ivory/60 lg:hidden">
            {architectureLayers.map((layer) => {
              const isActive = layer.title === activeLayer;
              return (
                <button
                  key={layer.title}
                  type="button"
                  onClick={() => {
                    setActiveLayer(layer.title);
                  }}
                  className={`border border-water-ivory/20 px-3 py-2 text-left transition ${
                    isActive
                      ? "bg-water-ivory text-water-black"
                      : "bg-water-black text-water-ivory/70"
                  }`}
                  aria-pressed={isActive}
                >
                  {layer.title}
                </button>
              );
            })}
          </div>
        </div>

        <article className="grid gap-4 border border-water-ivory/30 bg-water-ivory p-6 text-water-black shadow-[0_12px_45px_rgba(0,0,0,0.45)]">
          <p className="text-xs uppercase tracking-[0.35em] text-water-black/70">
            Focus
          </p>
          <p className="text-lg uppercase tracking-[0.25em] text-water-black">
            {selectedLayer.title}
          </p>
          <p className="text-sm text-water-black/80">
            {selectedLayer.detail}
          </p>
          <p className="text-xs uppercase tracking-[0.35em] text-water-black/60">
            Shared ownership between Rust crates keeps geometry and motion
            consistent across every backend.
          </p>
        </article>
      </div>
    </section>
  );
};

export default LayerSection;
