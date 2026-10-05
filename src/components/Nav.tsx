import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Mark } from './Logo'
import LanguageSwitch from './LanguageSwitch'
import ThemeToggle from './ThemeToggle'
import { Frame } from './ui'
import { InspectorSwitch } from './inspector'
import { hasLiveDemos } from './LiveDemo'

const links = [
  { key: 'book', href: 'https://book.waterui.dev', external: true },
  { key: 'api', href: 'https://docs.rs/waterui', external: true },
  { key: 'examples', href: '#examples', external: false },
  ...(hasLiveDemos ? [{ key: 'live', href: '#live', external: false } as const] : []),
  { key: 'github', href: 'https://github.com/water-rs/waterui', external: true },
] as const

const link = 'text-[15px] font-medium text-ink-2 transition-colors hover:text-ink'

export default function Nav() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  const items = links.map((item) => (
    <a
      key={item.key}
      href={item.href}
      target={item.external ? '_blank' : undefined}
      rel={item.external ? 'noopener noreferrer' : undefined}
      onClick={() => setOpen(false)}
      className={link}
    >
      {t(`nav.${item.key}`)}
    </a>
  ))

  return (
    <nav className="relative z-20">
      <Frame className="flex h-16 items-center justify-between gap-6">
        <a href="#top" className="flex items-center gap-2.5" aria-label="WaterUI">
          <Mark className="h-[17px] w-auto" />
          <span className="text-[17px] font-bold tracking-[-0.02em]">WaterUI</span>
        </a>

        <div className="hidden items-center gap-7 lg:flex">{items}</div>

        <div className="hidden items-center gap-2 lg:flex">
          <InspectorSwitch label={t('nav.inspect')} />
          <LanguageSwitch />
          <ThemeToggle />
          <a href="#quick-start" className="ml-2 flex h-9 items-center bg-ink px-4 text-[15px] font-semibold text-paper transition-colors hover:bg-guide hover:text-guide-ink">
            {t('nav.start')}
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="flex h-9 items-center border border-rule px-3 text-[15px] font-medium lg:hidden"
        >
          {open ? t('nav.closeMenu') : t('nav.menu')}
        </button>
      </Frame>

      <div id="mobile-menu" hidden={!open} className="border-y border-rule bg-paper lg:hidden">
        <Frame className="flex flex-col gap-4 py-5">
          {items}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <InspectorSwitch label={t('nav.inspect')} />
            <LanguageSwitch />
            <ThemeToggle />
          </div>
        </Frame>
      </div>
    </nav>
  )
}
