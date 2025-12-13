export default function Footer() {
  return (
    <footer className="bg-white border-t-4 border-black py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center">
          <span className="text-2xl font-black tracking-tighter mr-2">
            WATER<span className="text-[#1E488F]">UI</span>
          </span>
          <span className="text-sm font-bold bg-black text-white px-2 py-0.5">
            v0.2.0
          </span>
        </div>

        <div className="flex gap-8 font-bold text-sm md:text-base">
          <a
            href="https://book.waterui.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#1E488F] underline decoration-2 underline-offset-4"
          >
            Book
          </a>
          <a
            href="https://discord.gg/8mtmNUyGRp"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#D22730] underline decoration-2 underline-offset-4"
          >
            Discord
          </a>
          <a
            href="https://twitter.com/waterui_dev"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#F1A814] underline decoration-2 underline-offset-4"
          >
            Twitter
          </a>
        </div>

        <p className="text-sm font-medium text-gray-500">
          &copy; 2025 WaterUI. Form follows function.
        </p>
      </div>
    </footer>
  );
}
