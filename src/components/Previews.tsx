import { useTranslation } from 'react-i18next'
import Section from './Section'
import Terminal from './Terminal'
import { previewShot } from '../data/examples'

export default function Previews() {
  const { t } = useTranslation()

  const commands = [
    { id: 'render', label: t('previews.commands.render'), command: 'water preview main --output preview.png' },
    { id: 'frame', label: t('previews.commands.frame'), command: 'water preview main --frame 800x600 --output preview.png' },
    { id: 'test', label: t('previews.commands.test'), command: 'water preview test' },
    { id: 'perf', label: t('previews.commands.perf'), command: 'water preview perf' },
  ]

  return (
    <Section id="previews" eyebrow={t('previews.eyebrow')} title={t('previews.title')} lead={t('previews.lead')}>
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Terminal commands={commands} title="#[preview]" />
          <p className="mt-5 text-sm text-ink-muted">
            <span className="mr-2 font-mono text-water" aria-hidden>
              #
            </span>
            {t('previews.dogfood')}
          </p>
        </div>
        <figure className="lg:col-span-7">
          <div className="overflow-hidden rounded-lg border border-line bg-surface p-2">
            <img
              src={previewShot.image}
              width={previewShot.width}
              height={previewShot.height}
              alt={t('previews.imageCaption', { example: previewShot.id })}
              loading="lazy"
              className="h-auto w-full rounded"
            />
          </div>
          <figcaption className="mt-3 font-mono text-xs text-ink-faint">
            {t('previews.imageCaption', { example: previewShot.id })}
          </figcaption>
        </figure>
      </div>
    </Section>
  )
}
