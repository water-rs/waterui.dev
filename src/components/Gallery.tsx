const examples = [
  {
    id: 'form',
    title: 'Form',
    platform: 'macOS',
    image: '/examples/form-mac.png',
    description: 'Declarative forms with automatic validation',
    color: '#1E488F'
  },
  {
    id: 'markdown',
    title: 'Markdown',
    platform: 'iOS',
    image: '/examples/markdown-ios.png',
    description: 'Rich text rendering with markdown support',
    color: '#D22730'
  },
  {
    id: 'canvas',
    title: 'Canvas',
    platform: 'macOS',
    image: '/examples/canvas-macos.png',
    description: 'Custom graphics with drawing primitives',
    color: '#F1A814'
  },
  {
    id: 'flame',
    title: 'Flame',
    platform: 'iOS',
    image: '/examples/flame-ios.png',
    description: 'Animated particle effects',
    color: '#1E488F'
  },
  {
    id: 'gesture',
    title: 'Gesture',
    platform: 'macOS',
    image: '/examples/gesture-macos.png',
    description: 'Touch and gesture handling',
    color: '#D22730'
  },
  {
    id: 'video',
    title: 'Video Player',
    platform: 'Android',
    image: '/examples/video-player-android.png',
    description: 'Native media playback',
    color: '#F1A814'
  }
]

export default function Gallery() {
  return (
    <section id="gallery" className="border-t-4 border-black bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-5xl md:text-6xl font-black mb-4">
            EXAMPLES
          </h2>
          <p className="text-xl font-medium max-w-2xl">
            Real applications built with WaterUI. From forms to animations, all running on native platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {examples.map((example) => (
            <div
              key={example.id}
              className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all overflow-hidden"
            >
              <div
                className="h-3 border-b-4 border-black"
                style={{ backgroundColor: example.color }}
              />
              <div className="aspect-[4/3] bg-gray-100 overflow-hidden border-b-4 border-black">
                <img
                  src={example.image}
                  alt={`${example.title} example on ${example.platform}`}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-2xl font-black">{example.title}</h3>
                  <span className="px-3 py-1 bg-black text-white text-xs font-bold">
                    {example.platform}
                  </span>
                </div>
                <p className="text-sm font-medium leading-relaxed">
                  {example.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://github.com/water-rs/waterui/tree/main/examples"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-black text-white font-bold text-lg border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
          >
            View All Examples on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
