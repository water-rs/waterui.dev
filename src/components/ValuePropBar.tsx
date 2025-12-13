export default function ValuePropBar() {
  return (
    <section className="border-b-4 border-black grid grid-cols-1 md:grid-cols-3">
      <div className="p-8 bg-[#1E488F] text-white border-b-4 md:border-b-0 md:border-r-4 border-black">
        <h3 className="text-2xl font-bold mb-2">Native Rendering</h3>
        <p>UIKit/AppKit on Apple, Android View on Android. Zero compromise.</p>
      </div>
      <div className="p-8 bg-[#F1A814] text-black border-b-4 md:border-b-0 md:border-r-4 border-black">
        <h3 className="text-2xl font-bold mb-2">Rust Safety</h3>
        <p>Leverage the type system and memory safety guarantees.</p>
      </div>
      <div className="p-8 bg-[#D22730] text-white">
        <h3 className="text-2xl font-bold mb-2">Hot Reload</h3>
        <p>Instant feedback with WebSocket-based live code updates.</p>
      </div>
    </section>
  )
}
