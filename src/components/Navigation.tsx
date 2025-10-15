import { navigation } from "../lib/content";

const Navigation = () => (
  <nav aria-label="Primary">
    <ul className="flex items-center gap-6 text-xs font-medium uppercase tracking-[0.2em]">
      {navigation.map((item) => (
        <li key={item.label}>
          <a
            className="hover:text-water-blue transition-colors"
            href={item.href}
            rel="noreferrer"
            target="_blank"
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  </nav>
);

export default Navigation;
