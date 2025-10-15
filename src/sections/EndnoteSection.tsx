import { socials } from "../lib/content";

const EndnoteSection = () => (
  <footer className="border border-water-black bg-water-black text-water-ivory">
    <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-8 md:flex-row md:px-10">
      <div>
        <p className="text-xs uppercase tracking-[0.4em]">WaterUI © 2025</p>
        <p className="mt-2 text-sm text-water-ivory/80">Open to the world — maintained by the Water collective.</p>
      </div>
      <ul className="flex flex-wrap gap-6 text-xs uppercase tracking-[0.3em]">
        {socials.map((item) => (
          <li key={item.label}>
            <a className="transition-colors hover:text-water-yellow" href={item.href} rel="noreferrer" target="_blank">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </footer>
);

export default EndnoteSection;
