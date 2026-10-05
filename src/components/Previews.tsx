import { useTranslation } from 'react-i18next'
import Terminal from './Terminal'
import { Box } from './inspector'
import { Caption, Frame, Heading } from './ui'
import { previewShot } from '../data/examples'

export default function Previews() {
  const { t } = useTranslation()

  const commands = [
    { id: 'render', label: t('previews.commands.render'), command: 'water preview main --output preview.png' },
    { id: 'frame', label: t('previews.commands.frame'), command: 'water preview main --frame 800x600 --output preview.png' },
    { id: 'test', label: t('previews.commands.test'), command: 'water preview test' },
  ]

  return (
    <section id="previews" className="border-t border-rule py-20 md:py-28">
      <Frame>
        <Heading number="06" label={t('previews.label')} title={t('previews.title')} lead={t('previews.lead')} />
        <div className="mt-14 grid gap-10 md:mt-20 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Terminal commands={commands} title="#[preview]" />
          </div>
          <figure className="lg:col-span-7">
            <Box kind="Preview" always readout="900 × 640 @2x" className="border border-rule bg-raised">
              <img
                src={previewShot.image}
                width={previewShot.width}
                height={previewShot.height}
                alt={t('previews.figure', { example: previewShot.id })}
                loading="lazy"
                className="block h-auto w-full"
              />
            </Box>
            <Caption note="Hydrolysis">{t('previews.figure', { example: previewShot.id })}</Caption>
          </figure>
        </div>
      </Frame>
    </section>
  )
}
