export default function Architecture() {
  return (
    <section className="flex flex-col md:flex-row border-t-4 border-black">
      {/* Architecture */}
      <div className="w-full md:w-1/2 p-12 bg-black text-white relative overflow-hidden">
        <h2 className="text-4xl font-bold mb-8">Architecture</h2>

        <div className="relative z-10 space-y-4">
          <div className="p-4 border-2 border-white rounded bg-gray-900">
            <span className="text-[#F1A814] font-bold block mb-1">waterui</span>
            <span className="text-sm text-gray-400">
              The main crate interface.
            </span>
          </div>

          <div className="ml-8 p-4 border-2 border-gray-600 rounded bg-gray-900">
            <span className="text-[#1E488F] font-bold block mb-1">
              waterui-core
            </span>
            <span className="text-sm text-gray-400">
              View trait, Environment, Reactivity.
            </span>
          </div>

          <div className="flex flex-wrap gap-4 ml-8">
            <div className="flex-1 p-4 border-2 border-gray-700 rounded bg-gray-900 min-w-[140px]">
              <span className="text-[#D22730] font-bold block mb-1">
                components/
              </span>
              <span className="text-xs text-gray-400">layout, form, media</span>
            </div>
            <div className="flex-1 p-4 border-2 border-gray-700 rounded bg-gray-900 min-w-[140px]">
              <span className="text-green-500 font-bold block mb-1">
                backends/
              </span>
              <span className="text-xs text-gray-400">apple, android</span>
            </div>
          </div>
        </div>

        {/* Decor */}
        <div className="absolute -bottom-10 -right-10 w-64 h-64 border-[20px] border-white rounded-full opacity-10" />
      </div>

      {/* Roadmap */}
      <div className="w-full md:w-1/2 p-12 bg-[#F0F0F0] text-black border-t-4 md:border-t-0 md:border-l-4 border-black">
        <h2 className="text-4xl font-bold mb-8">Roadmap</h2>

        <ul className="space-y-6">
          <li className="flex items-start">
            <div className="w-6 h-6 bg-[#D22730] mr-4 mt-1 flex-shrink-0 border-2 border-black" />
            <div>
              <h4 className="font-bold text-lg">Native Navigation</h4>
              <p className="text-gray-600">
                Enhanced navigation stack and routing capabilities.
              </p>
            </div>
          </li>
          <li className="flex items-start">
            <div className="w-6 h-6 bg-[#1E488F] mr-4 mt-1 flex-shrink-0 border-2 border-black" />
            <div>
              <h4 className="font-bold text-lg">Enhanced Forms</h4>
              <p className="text-gray-600">
                Improved form builder with validation and rich inputs.
              </p>
            </div>
          </li>
          <li className="flex items-start">
            <div className="w-6 h-6 bg-[#F1A814] mr-4 mt-1 flex-shrink-0 border-2 border-black" />
            <div>
              <h4 className="font-bold text-lg">WebGPU Media</h4>
              <p className="text-gray-600">
                GPU-accelerated media components for desktop.
              </p>
            </div>
          </li>
          <li className="flex items-start">
            <div className="w-6 h-6 bg-white mr-4 mt-1 flex-shrink-0 border-2 border-black" />
            <div>
              <h4 className="font-bold text-lg">Platform Expansion</h4>
              <p className="text-gray-600">
                WatchOS support and VSCode integration.
              </p>
            </div>
          </li>
        </ul>

        <div className="mt-8 pt-6 border-t-2 border-black">
          <a
            href="https://github.com/water-rs/waterui/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-black text-white font-bold border-2 border-black hover:bg-white hover:text-black transition-colors"
          >
            View All Issues →
          </a>
        </div>
      </div>
    </section>
  );
}
