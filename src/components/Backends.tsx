import type { ReactNode } from 'react'
import { Droplets } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { PlatformIcon, type PlatformId } from './icons'
import { Frame, Heading } from './ui'

type BackendId = 'apple' | 'hydrolysis' | 'gtk' | 'winui'

type Backend = {
  id: BackendId
  mark: ReactNode
  /** The platforms the backend ships to, each with its own mark. */
  platforms: { icon: PlatformId; name: string }[]
}

const official: Backend[] = [
  {
    id: 'apple',
    mark: <PlatformIcon id="apple" size={28} />,
    platforms: [
      { icon: 'apple', name: 'iOS' },
      { icon: 'apple', name: 'iPadOS' },
      { icon: 'apple', name: 'macOS' },
    ],
  },
  {
    id: 'hydrolysis',
    mark: <Droplets size={28} aria-hidden />,
    platforms: [
      { icon: 'android', name: 'Android' },
      { icon: 'apple', name: 'macOS' },
      { icon: 'windows', name: 'Windows' },
      { icon: 'linux', name: 'Linux' },
      { icon: 'web', name: 'Web' },
    ],
  },
]

const experimental: Pick<Backend, 'id' | 'mark'>[] = [
  { id: 'gtk', mark: <PlatformIcon id="gtk" size={22} /> },
  { id: 'winui', mark: <PlatformIcon id="windows" size={22} /> },
]

function Platforms({ platforms }: { platforms: Backend['platforms'] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {platforms.map((platform) => (
        <li key={platform.name} className="flex items-center gap-2 rounded-full border border-rule px-3 py-1.5 text-[15px]">
          <PlatformIcon id={platform.icon} size={16} />
          {platform.name}
        </li>
      ))}
    </ul>
  )
}

/** The backends: the two officially supported ones as cards, then the experimental ones, set apart. */
export default function Backends() {
  const { t } = useTranslation()
  return (
    <section id="backends" className="border-t border-rule py-20 md:py-28">
      <Frame>
        <Heading
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
        <ul className="mt-14 grid gap-5 md:mt-20 md:grid-cols-2">
          {official.map((backend) => (
            <li key={backend.id} className="flex flex-col gap-8 rounded-2xl border border-rule bg-raised p-7 md:p-9">
              <div className="flex items-center gap-4">
                <span className="grid size-14 shrink-0 place-items-center rounded-xl bg-ink text-paper">{backend.mark}</span>
                <div>
                  <h3 className="text-[clamp(26px,2.4vw,32px)] leading-tight font-bold tracking-[-0.025em]">{t(`backends.items.${backend.id}.name`)}</h3>
                  <p className="mt-0.5 text-[17px] text-ink-2">{t(`backends.items.${backend.id}.renders`)}</p>
                </div>
              </div>
              <Platforms platforms={backend.platforms} />
            </li>
          ))}
        </ul>
        <div className="mt-12 flex flex-col gap-5 md:flex-row md:items-start md:gap-8">
          <div className="md:w-1/3">
            <h3 className="text-[19px] font-semibold">{t('backends.experimental')}</h3>
            <p className="mt-1.5 text-[16px] leading-snug text-ink-2">{t('backends.experimentalNote')}</p>
          </div>
          <ul className="grid flex-1 gap-5 sm:grid-cols-2">
            {experimental.map((backend) => (
              <li key={backend.id} className="flex items-center gap-4 rounded-2xl border border-rule p-5 text-ink-2">
                <span className="grid size-11 shrink-0 place-items-center rounded-lg border border-rule">{backend.mark}</span>
                <div>
                  <h4 className="text-[19px] font-semibold text-ink">{t(`backends.items.${backend.id}.name`)}</h4>
                  <p className="text-[15px]">
                    {t(`backends.items.${backend.id}.renders`)} · {t(`backends.items.${backend.id}.platforms`)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Frame>
    </section>
  )
}
