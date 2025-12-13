export default function Features() {
  return (
    <section id="features" className="border-t-4 border-black bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {/* Feature 1 */}
        <div className="border-b-4 lg:border-b-0 lg:border-r-4 border-black p-10 min-h-[300px] flex flex-col justify-between hover:bg-gray-50 transition-colors">
          <div>
            <svg className="w-12 h-12 mb-6 text-[#1E488F]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z"/>
            </svg>
            <h3 className="text-2xl font-bold mb-4">Declarative Architecture</h3>
          </div>
          <p className="text-sm font-medium leading-relaxed">
            Inspired by modern web frameworks. Build complex UIs with reusable, reactive components.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="border-b-4 lg:border-b-0 lg:border-r-4 border-black p-10 min-h-[300px] flex flex-col justify-between bg-[#D22730] text-white">
          <div>
            <svg className="w-12 h-12 mb-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
            <h3 className="text-2xl font-bold mb-4">Cross Platform</h3>
          </div>
          <p className="text-sm font-medium leading-relaxed opacity-90">
            One codebase, infinite screens. Native on iOS and Android with true platform widgets.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="border-b-4 md:border-b-0 lg:border-r-4 border-black p-10 min-h-[300px] flex flex-col justify-between hover:bg-gray-50 transition-colors">
          <div>
            <svg className="w-12 h-12 mb-6 text-[#F1A814]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="4" y="4" width="16" height="16" rx="2" ry="2"/>
              <rect x="9" y="9" width="6" height="6"/>
              <line x1="9" y1="1" x2="9" y2="4"/>
              <line x1="15" y1="1" x2="15" y2="4"/>
              <line x1="9" y1="20" x2="9" y2="23"/>
              <line x1="15" y1="20" x2="15" y2="23"/>
              <line x1="20" y1="9" x2="23" y2="9"/>
              <line x1="20" y1="14" x2="23" y2="14"/>
              <line x1="1" y1="9" x2="4" y2="9"/>
              <line x1="1" y1="14" x2="4" y2="14"/>
            </svg>
            <h3 className="text-2xl font-bold mb-4">Core Components</h3>
          </div>
          <p className="text-sm font-medium leading-relaxed">
            Batteries included. Layouts, controls, forms, and media ready to use out of the box.
          </p>
        </div>

        {/* Feature 4 */}
        <div className="p-10 min-h-[300px] flex flex-col justify-between hover:bg-gray-50 transition-colors">
          <div>
            <svg className="w-12 h-12 mb-6 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
            </svg>
            <h3 className="text-2xl font-bold mb-4">Powerful CLI</h3>
          </div>
          <p className="text-sm font-medium leading-relaxed">
            Scaffold, build, run, and package with the dedicated `water` command line tool.
          </p>
        </div>
      </div>
    </section>
  )
}
