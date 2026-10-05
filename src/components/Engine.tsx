import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box } from './inspector'
import { Caption, Frame, Heading } from './ui'

const hydrolysisPoints = ['gpu', 'platforms', 'frames', 'accessibility', 'themes'] as const
const cherenkovPoints = ['slots', 'animation', 'colour'] as const

/** A display list as Cherenkov records it; `$radius` marks the commands that read the bound value. */
const COMMANDS = [
  { op: 'fill', shape: 'rect', target: 'background', slot: false },
  { op: 'shadow', shape: 'rrect', target: 'card · $radius', slot: true },
  { op: 'fill', shape: 'rrect', target: 'card · $radius', slot: true },
  { op: 'glyphs', shape: 'run', target: '"Storage"', slot: false },
  { op: 'glyphs', shape: 'run', target: '"23.4 GB of 64 GB"', slot: false },
  { op: 'fill', shape: 'rrect', target: 'track', slot: false },
  { op: 'fill', shape: 'rrect', target: 'bar', slot: false },
  { op: 'stroke', shape: 'line', target: 'divider', slot: false },
  { op: 'glyphs', shape: 'run', target: '"Manage"', slot: false },
] as const

/**
 * The value-slot model, illustrated: a corner radius bound to a signal. Moving
 * the slider changes the signal; only the recorded commands that read it are
 * regenerated, and the rest of the display list is reused as it was.
 */
function SlotFigure() {
  const { t } = useTranslation()
  const [radius, setRadius] = useState(18)
  const [generation, setGeneration] = useState(0)
  const regenerated = COMMANDS.filter((command) => command.slot).length

  return (
    <figure>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col justify-between gap-6 border border-rule bg-raised p-5">
          <div className="border border-rule bg-paper p-4 shadow-[0_10px_30px_-12px_rgb(0_0_0/0.6)]" style={{ borderRadius: radius }}>
            <p className="text-[15px] font-semibold">Storage</p>
            <p className="mt-0.5 font-mono text-[12px] text-ink-2">23.4 GB of 64 GB</p>
            <div className="mt-4 h-2 bg-rule" style={{ borderRadius: radius / 4 }}>
              <div className="h-full w-[37%] bg-ink" style={{ borderRadius: radius / 4 }} />
            </div>
            <p className="mt-4 border-t border-rule pt-3 text-[13px] text-ink-2">Manage</p>
          </div>
          <label className="block">
            <span className="flex justify-between font-mono text-[12px] text-ink-2">
              <span>radius: Binding&lt;f32&gt;</span>
              <span className="text-guide tabular-nums">{radius}</span>
            </span>
            <input
              type="range"
              min={0}
              max={36}
              value={radius}
              onChange={(event) => {
                setRadius(Number(event.target.value))
                setGeneration((current) => current + 1)
              }}
              className="mt-2 w-full accent-[var(--guide)]"
            />
          </label>
        </div>

        <Box kind="DisplayList" always className="border border-rule bg-raised pt-7 pb-2">
          <ol className="font-mono text-[12px]">
            {COMMANDS.map((command, index) => (
              <li key={index} className={`relative grid grid-cols-[2ch_7ch_6ch_1fr] gap-2 px-3 py-1 ${command.slot ? 'text-ink' : 'text-ink-3'}`}>
                {command.slot && generation > 0 ? <span key={generation} className="update-flash pointer-events-none absolute inset-0" aria-hidden /> : null}
                <span>{index + 1}</span>
                <span>{command.op}</span>
                <span>{command.shape}</span>
                <span className="truncate">{command.target}</span>
              </li>
            ))}
          </ol>
        </Box>
      </div>
      <Caption tag={t('engine.figure.tag', { count: regenerated, total: COMMANDS.length })}>{t('engine.figure.caption')}</Caption>
    </figure>
  )
}

/** Hydrolysis, WaterUI's own renderer, and Cherenkov, the 2D engine it is moving onto. */
export default function Engine() {
  const { t } = useTranslation()
  return (
    <section id="engine" className="band-dark py-20 md:py-28">
      <Frame>
        <Heading number="03" label={t('engine.label')} title={t('engine.title')} lead={t('engine.lead')} />

        <div className="mt-14 grid gap-14 md:mt-20 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p className="font-mono text-[12px] text-ink-2">Hydrolysis</p>
            <ul className="mt-4 border-t border-ink">
              {hydrolysisPoints.map((point) => (
                <li key={point} className="border-b border-rule py-4">
                  <h3 className="text-[17px] font-semibold tracking-[-0.01em]">{t(`engine.hydrolysis.${point}.title`)}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-ink-2">{t(`engine.hydrolysis.${point}.body`)}</p>
                </li>
              ))}
            </ul>
            <a href="https://github.com/water-rs/waterui/tree/dev/backends/hydrolysis" target="_blank" rel="noopener noreferrer" className="mt-5 inline-block font-mono text-[12.5px] underline underline-offset-4 hover:text-guide">
              backends/hydrolysis ↗
            </a>
          </div>

          <div className="lg:col-span-8">
            <p className="font-mono text-[12px] text-ink-2">Cherenkov</p>
            <h3 className="display mt-4 text-[clamp(30px,3.6vw,48px)]">{t('engine.cherenkov.title')}</h3>
            <p className="mt-4 max-w-[56ch] text-[17px] leading-relaxed text-ink-2">{t('engine.cherenkov.lead')}</p>
            <div className="mt-10">
              <SlotFigure />
            </div>
            <ol className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-6">
              {cherenkovPoints.map((point, index) => (
                <li key={point} className="border-t border-ink pt-4">
                  <p className="font-mono text-[12px] text-guide">0{index + 1}</p>
                  <h4 className="mt-2 text-[17px] font-semibold tracking-[-0.01em]">{t(`engine.cherenkov.points.${point}.title`)}</h4>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-ink-2">{t(`engine.cherenkov.points.${point}.body`)}</p>
                </li>
              ))}
            </ol>
            <p className="mt-10 border-t border-rule pt-4 text-[14.5px] leading-relaxed text-ink-2">
              {t('engine.cherenkov.status')}{' '}
              <a href="https://github.com/water-rs/waterui/tree/dev/graphics/cherenkov" target="_blank" rel="noopener noreferrer" className="font-mono text-[12.5px] whitespace-nowrap text-ink underline underline-offset-4 hover:text-guide">
                graphics/cherenkov ↗
              </a>
            </p>
          </div>
        </div>
      </Frame>
    </section>
  )
}
