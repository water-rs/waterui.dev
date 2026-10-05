import { useTranslation } from 'react-i18next'
import Code from './Code'
import { Box } from './inspector'
import { Caption, Frame, PrimaryLink, SecondaryLink } from './ui'
import { useCopy } from './useCopy'
import { lineOf } from './snippet'
import { hasLiveDemos } from './LiveDemo'
import installCommand from '../snippets/install.sh?raw'
import formSource from '../snippets/form.rs?raw'

const install = installCommand.trim()

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
      <Box kind={capture.platform} always className="bg-raised">
        <img src={capture.image} alt={alt} className="block h-auto w-full" style={{ aspectRatio: aspect }} />
      </Box>
      <figcaption className="mt-1.5 font-mono text-[11px] text-ink-3">{capture.realization}</figcaption>
    </figure>
  )
}

export default function Hero() {
  const { t } = useTranslation()
  const { copied, copy } = useCopy<'install'>()

  const notes = [
    { line: lineOf(formSource, '#[form]'), text: t('hero.notes.derive') },
    { line: lineOf(formSource, '::binding()'), text: t('hero.notes.binding') },
    { line: lineOf(formSource, 'form(&registration)'), text: t('hero.notes.render') },
  ]

  return (
    <section id="top" className="pt-4 pb-20 md:pt-8 md:pb-28">
      <Frame>
        <Box kind="VStack" stretch="Horizontal" always className="flex flex-col gap-10 p-4 pt-10 sm:p-8 sm:pt-12 md:gap-16 md:p-12 md:pt-14">
          <Box kind="Text" quiet>
            <h1 className="display text-[clamp(48px,8.6vw,128px)]">
              {t('hero.titleLine1')}
              <br />
              {t('hero.titleLine2')}
            </h1>
          </Box>

          <Box kind="HStack" quiet className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12">
            <div className="flex flex-col gap-8 lg:w-[42%] lg:shrink-0">
              <div>
                <p className="text-[clamp(19px,1.7vw,22px)] leading-[1.42]">{t('hero.lead')}</p>
                <p className="mt-4 font-mono text-[12px] text-ink-2">{t('hero.status')}</p>
              </div>
              <div className="flex flex-col gap-3">
                <p className="font-mono text-[12px] text-ink-2">{t('hero.install')}</p>
                <div className="flex items-stretch border border-ink/80 bg-raised">
                  <code className="flex-1 overflow-x-auto px-3 py-3 font-mono text-[12.5px] whitespace-nowrap">
                    <span className="mr-2 text-ink-3 select-none" aria-hidden>
                      $
                    </span>
                    {install}
                  </code>
                  <button
                    type="button"
                    onClick={() => void copy('install', install)}
                    className="shrink-0 border-l border-ink/80 px-4 text-[13px] font-semibold transition-colors hover:bg-ink hover:text-paper"
                    aria-label={`${t('common.copy')}: ${install}`}
                  >
                    {copied === 'install' ? t('common.copied') : t('common.copy')}
                  </button>
                </div>
                <div className="mt-2 flex flex-wrap gap-3">
                  <PrimaryLink href="#quick-start">{t('hero.ctaStart')}</PrimaryLink>
                  <SecondaryLink href="https://book.waterui.dev" external>
                    {t('hero.ctaBook')}
                  </SecondaryLink>
                  {hasLiveDemos ? <SecondaryLink href="#live">{t('hero.live')}</SecondaryLink> : null}
                </div>
              </div>
            </div>
            <div className="flex-1">
              <Code code={formSource} language="rust" title="examples/form/src/lib.rs" notes={notes} />
            </div>
          </Box>

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
        </Box>
      </Frame>
    </section>
  )
}
