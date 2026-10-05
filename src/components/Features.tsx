import { useTranslation } from 'react-i18next'
import Code from './Code'
import { lineOf } from './snippet'
import { Box } from './inspector'
import { Caption, Frame, Heading } from './ui'
import testingSnippet from '../snippets/testing.rs?raw'
import { stringList } from '../i18n'

const groups = ['layout', 'controls', 'navigation', 'graphics', 'media', 'icons'] as const
/** WaterKit as a Grid container: one capability per cell. */
function KitGrid({ items }: { items: string[] }) {
  return (
    <Box kind="Grid" always className="border border-rule bg-raised pt-6">
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
        {items.map((item) => (
          <li key={item} className="flex min-h-16 items-end border-t border-r border-rule p-2.5 text-[14px] leading-tight transition-colors hover:bg-guide-soft">
            {item}
          </li>
        ))}
      </ul>
    </Box>
  )
}

export default function Features() {
  const { t } = useTranslation()
  const kitItems = stringList(t('features.kit.items', { returnObjects: true }))
  const testingNotes = [
    { line: lineOf(testingSnippet, 'ui.mount'), text: t('features.testing.notes.mount') },
    { line: lineOf(testingSnippet, 'app.query()'), text: t('features.testing.notes.query') },
    { line: lineOf(testingSnippet, 'assert_eq!'), text: t('features.testing.notes.assert') },
  ]

  return (
    <section id="features" className="border-t border-rule py-20 md:py-28">
      <Frame>
        <Heading number="05" label={t('features.label')} title={t('features.title')} lead={t('features.lead')} />

        <div className="mt-14 grid border-t border-ink sm:grid-cols-2 md:mt-20 lg:grid-cols-3">
          {groups.map((group) => (
            <div key={group} className="border-b border-rule py-6 sm:pr-6 lg:[&:nth-child(3n+2)]:px-6 lg:[&:nth-child(3n+3)]:pl-6 lg:[&:nth-child(3n+2)]:border-x lg:[&:nth-child(3n+2)]:border-x-rule">
              <h3 className="font-mono text-[12px] text-ink-2">{t(`features.groups.${group}.title`)}</h3>
              <ul className="mt-4 space-y-1.5 text-[15.5px] leading-snug">
                {stringList(t(`features.groups.${group}.items`, { returnObjects: true })).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <h3 className="display text-[clamp(28px,3vw,40px)]">{t('features.kit.title')}</h3>
            <p className="mt-4 max-w-[38ch] text-[17px] leading-relaxed text-ink-2">{t('features.kit.lead')}</p>
          </div>
          <figure className="lg:col-span-8">
            <KitGrid items={kitItems} />
            <Caption>{t('features.kit.figure')}</Caption>
          </figure>
        </div>

        <div className="mt-20 grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <h3 className="display text-[clamp(28px,3vw,40px)]">{t('features.testing.title')}</h3>
            <p className="mt-4 max-w-[38ch] text-[17px] leading-relaxed text-ink-2">{t('features.testing.lead')}</p>
          </div>
          <figure className="lg:col-span-8">
            <Code code={testingSnippet} language="rust" title="tests/stepper.rs" notes={testingNotes} />
            <Caption>{t('features.testing.figure')}</Caption>
          </figure>
        </div>
      </Frame>
    </section>
  )
}
