export default function Navigation() {
  return (
    <nav className="w-full border-b-4 border-black bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-stretch">
        <div className="flex items-center px-6 py-4 bg-black text-white">
          <span className="text-2xl font-black tracking-tighter">
            WATER<span className="text-[#1E488F]">UI</span>
          </span>
        </div>
        <div className="hidden md:flex">
          <a
            href="https://book.waterui.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-6 hover:bg-[#1E488F] hover:text-white transition-colors font-bold border-l-4 border-black"
          >
            Book
          </a>
          <a
            href="https://discord.gg/8mtmNUyGRp"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-6 hover:bg-[#F1A814] hover:text-black transition-colors font-bold border-l-4 border-black"
          >
            Discord
          </a>
          <a
            href="https://github.com/water-rs/waterui"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-6 hover:bg-[#D22730] hover:text-white transition-colors font-bold border-l-4 border-black"
          >
            GitHub
          </a>
          <a
            href="https://twitter.com/waterui_dev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-6 hover:bg-[#F1A814] hover:text-black transition-colors font-bold border-l-4 border-black"
          >
            Twitter
          </a>
        </div>
        {/* Mobile Menu Button */}
        <button className="md:hidden px-6 bg-[#F1A814] border-l-4 border-black font-bold">
          MENU
        </button>
      </div>
    </nav>
  );
}
