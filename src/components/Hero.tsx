interface HeroProps {
  scrollY: number;
}

export default function Hero({ scrollY }: HeroProps) {
  return (
    <div className="relative min-h-[85vh] flex flex-col md:flex-row border-b-4 border-black">
      {/* Left Content */}
      <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center relative bg-white z-10">
        {/* Dot pattern background */}
        <div
          className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(#111 15%, transparent 16%), radial-gradient(#111 15%, transparent 16%)",
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 10px 10px",
          }}
        />

        <div className="inline-block bg-black text-white px-3 py-1 text-sm font-bold mb-6 w-max shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          v0.2.0 IS LIVE
        </div>

        <h1 className="text-6xl md:text-8xl font-black leading-none tracking-tight mb-6">
          WRITE <br />
          RUST <br />
          <span className="text-[#1E488F]">RUN NATIVE</span>
        </h1>

        <p className="text-xl md:text-2xl font-medium mb-8 max-w-md leading-relaxed">
          A modern UI framework for Rust. Reactive, performant, and truly
          native.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#playground"
            className="px-8 py-4 bg-[#D22730] text-white font-bold text-lg border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all text-center"
          >
            Quick Start
          </a>
          <a
            href="https://crates.io/crates/waterui"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-white text-black font-bold text-lg border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all text-center"
          >
            Crates.io
          </a>
        </div>
      </div>

      {/* Right Visuals (Bauhaus Composition) */}
      <div className="w-full md:w-1/2 bg-[#F0F0F0] relative overflow-hidden border-t-4 md:border-t-0 md:border-l-4 border-black flex items-center justify-center min-h-[400px]">
        {/* Geometric Elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-[#F1A814] rounded-full border-4 border-black z-10" />
        <div
          className="absolute bottom-20 left-20 w-48 h-48 bg-[#D22730] border-4 border-black z-0"
          style={{ transform: "rotate(45deg)" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#1E488F] rounded-full opacity-90 z-20"
          style={{
            transform: "translate(-50%, -50%)",
            mixBlendMode: "multiply",
          }}
        />

        {/* Floating Code Card */}
        <div
          className="relative z-30 bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-sm mx-4"
          style={{ transform: "rotate(-2deg)" }}
        >
          <div className="flex gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500 border border-black" />
            <div className="w-3 h-3 rounded-full bg-yellow-500 border border-black" />
            <div className="w-3 h-3 rounded-full bg-green-500 border border-black" />
          </div>
          <pre className="font-mono text-sm leading-relaxed">
            <code
              dangerouslySetInnerHTML={{
                __html: `<span style="color: #1E488F">use</span> waterui::prelude::*;

<span style="color: #1E488F">#[hot_reload]</span>
<span style="color: #1E488F">fn</span> <span style="color: #D22730">main</span>() -&gt; <span style="color: #1E488F">impl</span> View {
  vstack((
    text(<span style="color: #22863a">"Hello!"</span>)
      .size(<span style="color: #005cc5">24.0</span>)
      .bold(),
  ))
  .padding()
}`,
              }}
            />
          </pre>
        </div>
      </div>
    </div>
  );
}
