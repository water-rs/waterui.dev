import { useTranslation } from 'react-i18next'
import { Mark } from './Logo'
import { Frame } from './ui'

const links = [
  { key: 'book', href: 'https://book.waterui.dev' },
  { key: 'api', href: 'https://docs.rs/waterui' },
  { key: 'github', href: 'https://github.com/water-rs/waterui' },
  { key: 'discord', href: 'https://discord.gg/8mtmNUyGRp' },
  { key: 'twitter', href: 'https://twitter.com/waterui_dev' },
] as const

/** The closing block: what it is, where to find more, and the terms it is published under. */
export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="border-t border-rule">
      <Frame className="py-14">
        <div className="grid border border-rule md:grid-cols-12">
          <div className="border-b border-rule p-5 md:col-span-5 md:border-r md:border-r-rule md:border-b-0">
            <Mark className="h-7 w-auto" title="WaterUI" />
            <p className="display mt-6 text-[clamp(30px,3.4vw,46px)]">{t('hero.titleLine1')} {t('hero.titleLine2')}</p>
          </div>
          <nav aria-label="Footer" className="border-b border-rule md:col-span-3 md:border-r md:border-r-rule md:border-b-0">
            <ul>
              {links.map((link) => (
                <li key={link.key} className="border-b border-rule last:border-b-0">
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="flex justify-between px-5 py-2.5 text-[15px] font-medium transition-colors hover:bg-ink hover:text-paper">
                    {t(`footer.${link.key}`)}
                    <span aria-hidden>↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex flex-col justify-between gap-6 p-5 text-[13.5px] leading-relaxed text-ink-2 md:col-span-4">
            <div className="space-y-2">
              <p>{t('footer.license')}</p>
              <p>{t('footer.contributing')}</p>
            </div>
            <p className="font-mono text-[12px]">© {new Date().getFullYear()} WaterUI · waterui.dev</p>
          </div>
        </div>
      </Frame>
    </footer>
  )
}
