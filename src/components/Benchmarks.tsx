import { useTranslation } from 'react-i18next'
import { Outline } from './outline'
import { Frame, Heading } from './ui'
import { frameworks, metrics, type Metric } from '../data/benchmarks'

const value = (row: Metric['rows'][number]) => (row.measured ? row.value : row.placeholder)

function Chart({ metric }: { metric: Metric }) {
  const { t } = useTranslation()
  const max = Math.max(...metric.rows.map(value))
  const measured = metric.rows.every((row) => row.measured)
  return (
    <figure>
      <Outline readout={measured ? metric.unit : t('numbers.placeholderTag')} className="border border-rule bg-raised px-4 pt-9 pb-4">
        <h3 className="text-[19px] font-semibold tracking-[-0.01em]">{t(`numbers.metrics.${metric.id}.title`)}</h3>
        <p className="mt-1 text-[15px] text-ink-2">{t(`numbers.metrics.${metric.id}.note`)}</p>
        <ol className="mt-5 space-y-2.5">
          {metric.rows.map((row) => {
            const ours = row.framework === 'waterui'
            return (
              <li key={row.framework} className="grid grid-cols-[7.5rem_1fr_3.5rem] items-center gap-3">
                <span className={`text-[15px] ${ours ? 'font-semibold' : 'text-ink-2'}`}>{frameworks[row.framework]}</span>
                <span className="h-4 bg-rule/40">
                  <span
                    className={`block h-full ${row.measured ? (ours ? 'bg-ink' : 'bg-ink-3') : ours ? 'hatch border border-guide' : 'hatch border border-ink-3/60'}`}
                    style={{ width: `${(value(row) / max) * 100}%` }}
                  />
                </span>
                <span className="text-right font-mono text-[12px] text-ink-2 tabular-nums">{row.measured ? `${row.value} ${metric.unit}` : '—'}</span>
              </li>
            )
          })}
        </ol>
      </Outline>
    </figure>
  )
}

/** The comparison with other frameworks. Until it is measured, every bar is a marked placeholder. */
export default function Benchmarks() {
  const { t } = useTranslation()
  const placeholder = metrics.some((metric) => metric.rows.some((row) => !row.measured))
  return (
    <section id="numbers" className="border-t border-rule py-20 md:py-28">
      <Frame>
        <Heading label={t('numbers.label')} title={t('numbers.title')} lead={t('numbers.lead')} />
        {placeholder ? (
          <p className="mt-12 flex max-w-[70ch] items-start gap-3 border border-guide bg-guide-soft px-5 py-4 text-[16px] leading-relaxed md:mt-16">
            <span className="readout mt-0.5 shrink-0 bg-guide px-1.5 text-guide-ink">{t('numbers.placeholderTag')}</span>
            {t('numbers.placeholderNote')}
          </p>
        ) : null}
        <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {metrics.map((metric) => (
            <Chart key={metric.id} metric={metric} />
          ))}
        </div>
      </Frame>
    </section>
  )
}
