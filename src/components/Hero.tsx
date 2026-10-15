import { useTranslation } from 'react-i18next'
import Terminal from './Terminal'
import { Laptop, Phone, Stage, Tablet } from './Devices'
import { PlatformIcon, type PlatformId } from './icons'
import { Frame, PrimaryLink, SecondaryLink } from './ui'
import installCommand from '../snippets/install.sh?raw'

/** The `form` example's settled first frame on each device, each drawn by the backend that ships there. */
const captures = {
  ipados: { src: '/hero/ipad-form.webp', aspect: 2420 / 1668 },
  android: { src: '/hero/android-form.webp', aspect: 960 / 2142 },
  macos: { src: '/examples/macos/form.webp', aspect: 800 / 632 },
} as const

/** Each device of the stage, left to right, with the platform it stands for and the backend that drew it. */
const devices: { id: keyof typeof captures; icon: PlatformId; platform: string; backend: string }[] = [
  { id: 'macos', icon: 'apple', platform: 'macOS', backend: 'AppKit' },
  { id: 'ipados', icon: 'apple', platform: 'iPadOS', backend: 'UIKit' },
  { id: 'android', icon: 'android', platform: 'Android', backend: 'Hydrolysis' },
]

export default function Hero() {
  const { t } = useTranslation()
  const steps = [
    { id: 'install', command: installCommand.trim() },
    { id: 'create', command: 'water create counter' },
    { id: 'run', command: 'cd counter && water run' },
  ]
  const capture = (id: keyof typeof captures) => ({
    ...captures[id],
    alt: t('hero.captureAlt', { platform: devices.find((device) => device.id === id)?.platform }),
  })

  return (
    <section id="top" className="overflow-hidden pt-10 pb-20 md:pt-16 md:pb-28">
      <Frame>
        <h1 className="display text-[clamp(52px,9vw,136px)]">
          {t('hero.titleLine1')}
          <br />
          {t('hero.titleLine2')}
        </h1>

        <div className="mt-10 grid gap-10 md:mt-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <p className="text-[clamp(20px,1.9vw,24px)] leading-[1.4]">{t('hero.lead')}</p>
            <p className="mt-5 text-[15px] text-ink-2">{t('hero.status')}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PrimaryLink href="https://book.waterui.dev" external>
                {t('hero.ctaStart')}
              </PrimaryLink>
              <SecondaryLink href="#examples">{t('hero.live')}</SecondaryLink>
            </div>
          </div>
          <div className="lg:col-span-6">
            <Terminal commands={steps} title={t('hero.quickStart')} />
          </div>
        </div>

        <figure className="mt-16 md:mt-24">
          {/* The devices stand on one baseline: the laptop behind, the tablet in front of its right side, the phone at the tablet's edge. */}
          <Stage className="aspect-[100/43]">
            <Laptop capture={capture('macos')} className="bottom-[1.5cqw] left-[5cqw] w-[60cqw]" />
            <Tablet capture={capture('ipados')} className="bottom-[1.5cqw] left-[42cqw] w-[44cqw]" />
            <Phone capture={capture('android')} camera className="bottom-[1.5cqw] left-[84cqw] w-[13cqw]" />
          </Stage>
          <figcaption className="mt-8 flex flex-col items-center gap-5 md:mt-10">
            <ul className="flex flex-wrap justify-center gap-2.5">
              {devices.map((device) => (
                <li key={device.id} className="flex items-center gap-2 rounded-full border border-rule bg-raised py-1.5 pr-4 pl-3 text-[15px]">
                  <PlatformIcon id={device.icon} size={17} />
                  <span className="font-semibold">{device.platform}</span>
                  <span className="text-ink-2">{device.backend}</span>
                </li>
              ))}
            </ul>
            <p className="max-w-[60ch] text-center text-[15px] text-ink-2">{t('hero.figure')}</p>
          </figcaption>
        </figure>
      </Frame>
    </section>
  )
}
