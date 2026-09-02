import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Mark } from './Logo'
import LanguageSwitch from './LanguageSwitch'
import ThemeToggle from './ThemeToggle'

const links = [
  { key: 'book', href: 'https://book.waterui.dev', external: true },
  { key: 'api', href: 'https://docs.rs/waterui', external: true },
  { key: 'examples', href: '#examples', external: false },
  { key: 'github', href: 'https://github.com/water-rs/waterui', external: true },
] as const

export default function Nav() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  const items = links.map((link) => (
    <a
      key={link.key}
      href={link.href}
      target={link.external ? '_blank' : undefined}
      rel={link.external ? 'noopener noreferrer' : undefined}
      onClick={() => setOpen(false)}
      className="font-mono text-sm text-ink-muted transition-colors hover:text-ink"
    >
      {t(`nav.${link.key}`)}
    </a>
  ))

  return (
    <nav className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-3 text-ink" aria-label="WaterUI">
          <Mark className="h-6 w-auto" />
          <span className="font-mono text-base font-semibold tracking-tight">WaterUI</span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {items}
          <div className="ml-2 flex items-center gap-2 border-l border-line pl-6">
            <LanguageSwitch />
            <ThemeToggle />
          </div>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="inline-flex h-9 items-center rounded-md border border-line px-3 font-mono text-xs text-ink-muted md:hidden"
        >
          {open ? t('nav.closeMenu') : t('nav.menu')}
        </button>
      </div>

      <div id="mobile-menu" hidden={!open} className="border-t border-line md:hidden">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5">
          {items}
          <div className="flex items-center gap-2 pt-2">
            <LanguageSwitch />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}
