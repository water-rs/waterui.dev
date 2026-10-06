import { useTranslation } from 'react-i18next'
import { Frame, Heading } from './ui'

type BackendId = 'apple' | 'android' | 'hydrolysis' | 'gtk' | 'winui'

const official: readonly BackendId[] = ['apple', 'android', 'hydrolysis']
const experimental: readonly BackendId[] = ['gtk', 'winui']

function Row({ id, muted }: { id: BackendId; muted: boolean }) {
  const { t } = useTranslation()
  return (
    <li className={`grid gap-x-8 gap-y-1.5 border-b border-rule py-5 last:border-b-0 sm:grid-cols-12 sm:items-baseline ${muted ? 'text-ink-2' : ''}`}>
      <p className={`sm:col-span-3 ${muted ? 'text-[20px] font-semibold' : 'text-[clamp(24px,2.4vw,32px)] font-bold tracking-[-0.025em]'}`}>{t(`backends.items.${id}.name`)}</p>
      <p className="text-[16px] leading-snug sm:col-span-5">{t(`backends.items.${id}.renders`)}</p>
      <p className="font-mono text-[12.5px] text-ink-2 sm:col-span-4">{t(`backends.items.${id}.platforms`)}</p>
    </li>
  )
}

/** The backends: the three officially supported ones, then the experimental ones, set apart. */
export default function Backends() {
  const { t } = useTranslation()
  return (
    <section id="backends" className="border-t border-rule py-20 md:py-28">
      <Frame>
        <Heading
          number="01"
          label={t('backends.label')}
          title={
            <>
              {t('backends.titleLine1')}
              <br />
              {t('backends.titleLine2')}
            </>
          }
          lead={t('backends.lead')}
        />
        <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-12 md:gap-8">
          <p className="font-mono text-[12px] text-ink-2 md:col-span-3 md:pt-6">{t('backends.official')}</p>
          <ul className="border-t border-ink md:col-span-9">
            {official.map((id) => (
              <Row key={id} id={id} muted={false} />
            ))}
          </ul>
          <div className="md:col-span-3 md:pt-6">
            <p className="font-mono text-[12px] text-ink-2">{t('backends.experimental')}</p>
            <p className="mt-2 max-w-[30ch] text-[14px] leading-snug text-ink-3">{t('backends.experimentalNote')}</p>
          </div>
          <ul className="border-t border-rule md:col-span-9">
            {experimental.map((id) => (
              <Row key={id} id={id} muted />
            ))}
          </ul>
        </div>
      </Frame>
    </section>
  )
}
