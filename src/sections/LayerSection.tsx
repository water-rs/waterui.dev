import { useMemo, useState } from "react";
import { architectureLayers } from "../lib/content";

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
    <aside className="grid gap-5 border border-water-black bg-water-black p-6 text-water-ivory lg:col-span-4">
      <p className="text-xs uppercase tracking-[0.35em] text-water-ivory/80">
        Architecture layers
      </p>
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
                isActive
                  ? "bg-water-ivory text-water-black -translate-y-1"
                  : "bg-water-black text-water-ivory"
              }`}
              aria-pressed={isActive}
            >
              <span>{layer.title}</span>
            </button>
          );
        })}
      </div>
      <article className="grid gap-3 border border-water-ivory/40 bg-water-ivory p-5 text-water-black">
        <p className="text-xs uppercase tracking-[0.35em] text-water-black/70">
          Focus
        </p>
        <p className="text-lg uppercase tracking-[0.25em]">
          {selectedLayer.title}
        </p>
        <p className="text-sm text-water-black/80">{selectedLayer.detail}</p>
        <p className="text-xs uppercase tracking-[0.35em] text-water-black/60">
          Shared ownership between Rust crates keeps geometry and motion
          consistent across every backend.
        </p>
      </article>
    </aside>
  );
};

export default LayerSection;
