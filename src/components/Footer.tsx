import { useTranslation } from 'react-i18next'
import { Mark } from './Logo'

const links = [
  { key: 'book', href: 'https://book.waterui.dev' },
  { key: 'api', href: 'https://docs.rs/waterui' },
  { key: 'github', href: 'https://github.com/water-rs/waterui' },
  { key: 'discord', href: 'https://discord.gg/8mtmNUyGRp' },
  { key: 'twitter', href: 'https://twitter.com/waterui_dev' },
] as const

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <Mark className="h-8 w-auto text-ink" title="WaterUI" />
          <p className="mt-4 font-mono text-sm text-ink-muted">{t('footer.tagline')}</p>
        </div>
        <nav className="md:col-span-4" aria-label="Footer">
          <ul className="grid grid-cols-2 gap-2 font-mono text-sm">
            {links.map((link) => (
              <li key={link.key}>
                <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-ink-muted transition-colors hover:text-ink">
                  {t(`footer.${link.key}`)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-2 text-xs text-ink-faint md:col-span-3">
          <p>{t('footer.license')}</p>
          <p>{t('footer.contributing')}</p>
          <p>© {new Date().getFullYear()} WaterUI</p>
        </div>
      </div>
    </footer>
  )
}
