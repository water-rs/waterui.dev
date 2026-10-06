import { useTranslation } from 'react-i18next'
import Code from './Code'
import { Outline } from './outline'
import Terminal from './Terminal'
import { Caption, Frame, PrimaryLink, SecondaryLink } from './ui'
import { lineOf } from './snippet'
import { hasLiveDemos } from '../data/demos'
import installCommand from '../snippets/install.sh?raw'
import formSource from '../snippets/form.rs?raw'

type Capture = {
  id: string
  /** The platform and the toolkit or renderer that drew the frame. */
  platform: string
  realization: string
  image: string
  /** Portrait frames are cropped to the form; the desktop window is shown whole. */
  orientation: 'portrait' | 'landscape'
}

/**
 * The `form` example's settled first frame on each officially supported
 * backend: the native backends' end-to-end captures, and Hydrolysis's own
 * render of the same example.
 */
const captures: readonly Capture[] = [
  { id: 'ios', platform: 'iOS', realization: 'UIKit', image: '/examples/ios/form.webp', orientation: 'portrait' },
  { id: 'android', platform: 'Android', realization: 'Android Views', image: '/examples/android/form.webp', orientation: 'portrait' },
  { id: 'hydrolysis', platform: 'Hydrolysis', realization: 'GPU · Material 3', image: '/examples/hydrolysis/form.webp', orientation: 'portrait' },
  { id: 'macos', platform: 'macOS', realization: 'AppKit', image: '/examples/macos/form.webp', orientation: 'landscape' },
]

/** The capture's own aspect ratio; the strip sizes every frame to one height by giving each a matching flex share. */
const ASPECT: Record<Capture['orientation'], number> = { portrait: 402 / 874, landscape: 800 / 632 }

function CaptureFrame({ capture, alt }: { capture: Capture; alt: string }) {
  const aspect = ASPECT[capture.orientation]
  return (
    <figure className={capture.orientation === 'landscape' ? 'col-span-3 md:col-auto' : ''} style={{ flexGrow: aspect, flexBasis: 0 }}>
      <Outline label={capture.platform} className="bg-raised">
        <img src={capture.image} alt={alt} className="block h-auto w-full" style={{ aspectRatio: aspect }} />
      </Outline>
      <figcaption className="mt-1.5 font-mono text-[11px] text-ink-3">{capture.realization}</figcaption>
    </figure>
  )
}

export default function Hero() {
  const { t } = useTranslation()
  const steps = [
    { id: 'install', label: t('hero.steps.install'), command: installCommand.trim() },
    { id: 'create', label: t('hero.steps.create'), command: 'water create counter' },
    { id: 'run', label: t('hero.steps.run'), command: 'cd counter && water run' },
  ]

  const notes = [
    { line: lineOf(formSource, '#[form]'), text: t('hero.notes.derive') },
    { line: lineOf(formSource, '::binding()'), text: t('hero.notes.binding') },
    { line: lineOf(formSource, 'form(&registration)'), text: t('hero.notes.render') },
  ]

  return (
    <section id="top" className="pt-4 pb-20 md:pt-8 md:pb-28">
      <Frame>
        <Outline className="flex flex-col gap-10 p-4 pt-10 sm:p-8 sm:pt-12 md:gap-16 md:p-12 md:pt-14">
          <div>
            <h1 className="display text-[clamp(48px,8.6vw,128px)]">
              {t('hero.titleLine1')}
              <br />
              {t('hero.titleLine2')}
            </h1>
          </div>

          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12">
            <div className="flex flex-col gap-8 lg:w-[42%] lg:shrink-0">
              <div>
                <p className="text-[clamp(19px,1.7vw,22px)] leading-[1.42]">{t('hero.lead')}</p>
                <p className="mt-4 font-mono text-[12px] text-ink-2">{t('hero.status')}</p>
              </div>
              <div className="flex flex-col gap-5">
                <Terminal commands={steps} title={t('hero.quickStart')} />
                <div className="flex flex-wrap gap-3">
                  <PrimaryLink href="https://book.waterui.dev" external>
                    {t('hero.ctaStart')}
                  </PrimaryLink>
                  {hasLiveDemos ? <SecondaryLink href="#examples">{t('hero.live')}</SecondaryLink> : null}
                </div>
              </div>
            </div>
            <div className="flex-1">
              <Code code={formSource} language="rust" title="examples/form/src/lib.rs" notes={notes} />
            </div>
          </div>

          <figure>
            <div className="grid grid-cols-3 gap-x-3 gap-y-5 sm:gap-x-4 md:flex md:items-start md:gap-4">
              {captures.map((capture) => (
                <CaptureFrame key={capture.id} capture={capture} alt={t('hero.captureAlt', { platform: capture.platform })} />
              ))}
            </div>
            <Caption tag="form" className="mt-4 border-t border-rule">
              {t('hero.figure')}
            </Caption>
          </figure>
        </Outline>
      </Frame>
    </section>
  )
}
