import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Code from './Code'
import { Box } from './inspector'
import { lineOf } from './snippet'
import { Caption, Frame, Heading } from './ui'
import counterSnippet from '../snippets/counter.rs?raw'
import contactsSnippet from '../snippets/contacts.rs?raw'

const points = ['binding', 'computed', 'collections'] as const

type Model = 'fine' | 'rebuild'

/** The views of counter.rs's body, in order, and whether each one reads `count`. */
const VIEWS = [
  { id: 'stack', kind: 'VStack', reads: false },
  { id: 'title', kind: 'Text', reads: false },
  { id: 'count', kind: 'Text', reads: true },
  { id: 'stepper', kind: 'Stepper', reads: true },
] as const

/**
 * The counter from the README, drawn as its view tree. Pressing the stepper
 * changes `count`; every view that does work for that change flashes. WaterUI
 * updates the readers of the binding. The comparison model is a framework that
 * re-evaluates the component's whole body and diffs the result.
 */
function UpdateFigure() {
  const { t } = useTranslation()
  const [count, setCount] = useState(3)
  const [model, setModel] = useState<Model>('fine')
  const [generation, setGeneration] = useState(0)

  const change = (delta: number) => {
    setCount((current) => current + delta)
    setGeneration((current) => current + 1)
  }
  // A fresh element per change restarts the flash animation without remounting the view it covers.
  const flash = (reads: boolean) =>
    generation > 0 && (model === 'rebuild' || reads) ? <span key={generation} data-inspector-overlay="" className="update-flash pointer-events-none absolute inset-0" aria-hidden /> : null
  const updated = VIEWS.filter((view) => model === 'rebuild' || view.reads).length

  const step = 'h-10 w-11 text-[20px] leading-none transition-colors select-none hover:bg-ink hover:text-paper'

  return (
    <figure className="flex h-full flex-col">
      <div role="radiogroup" aria-label={t('state.figure.model')} className="flex border border-rule font-mono text-[12px]">
        {(['fine', 'rebuild'] as const).map((candidate) => (
          <button
            key={candidate}
            type="button"
            role="radio"
            aria-checked={model === candidate}
            onClick={() => {
              setModel(candidate)
              setGeneration(0)
            }}
            className={`flex-1 px-3 py-2 transition-colors ${model === candidate ? 'bg-ink text-paper' : 'text-ink-2 hover:text-ink'}`}
          >
            {t(`state.figure.models.${candidate}`)}
          </button>
        ))}
      </div>

      <div className="mt-4 flex-1 border border-rule bg-raised p-4 sm:p-6">
        <Box kind="VStack" always className="flex flex-col gap-5 p-5 pt-9 sm:p-7 sm:pt-10">
          {flash(VIEWS[0].reads)}
          <Box kind="Text" always className="px-2 pt-6 pb-2">
            {flash(VIEWS[1].reads)}
            <p className="text-[26px] font-semibold tracking-[-0.02em]">Hello, WaterUI!</p>
          </Box>
          <Box kind="Text" always className="px-2 pt-6 pb-2">
            {flash(VIEWS[2].reads)}
            <p className="font-mono text-[17px] tabular-nums" aria-live="polite">Count: {count}</p>
          </Box>
          <Box kind="Stepper" always className="flex items-center justify-between gap-4 px-2 pt-7 pb-2">
            {flash(VIEWS[3].reads)}
            <span className="text-[16px]">Count</span>
            <span className="flex border border-ink/80">
              <button type="button" onClick={() => change(-1)} aria-label={t('state.figure.decrement')} className={step}>
                −
              </button>
              <button type="button" onClick={() => change(1)} aria-label={t('state.figure.increment')} className={`${step} border-l border-ink/80`}>
                +
              </button>
            </span>
          </Box>
        </Box>
      </div>

      <Caption tag={generation === 0 ? t('state.figure.idle') : t('state.figure.updated', { count: updated, total: VIEWS.length })}>{t('state.figure.caption')}</Caption>
    </figure>
  )
}

export default function Reactivity() {
  const { t } = useTranslation()

  const counterNotes = [
    { line: lineOf(counterSnippet, 'Binding::i32'), text: t('state.notes.binding') },
    { line: lineOf(counterSnippet, 'text!('), text: t('state.notes.reader') },
    { line: lineOf(counterSnippet, 'stepper('), text: t('state.notes.writer') },
  ]
  const contactsNotes = [
    { line: lineOf(contactsSnippet, '#[id]'), text: t('state.notes.collection') },
  ]

  return (
    <section id="state" className="border-t border-rule py-20 md:py-28">
      <Frame>
        <Heading number="02" label={t('state.label')} title={t('state.title')} lead={t('state.lead')} />

        <div className="mt-14 grid gap-10 md:mt-20 lg:grid-cols-2 lg:gap-8">
          <UpdateFigure />
          <figure>
            <Code code={counterSnippet} language="rust" title="src/lib.rs" notes={counterNotes} />
            <Caption>{t('state.figureCounter')}</Caption>
          </figure>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-8">
          <figure className="lg:col-span-7">
            <Code code={contactsSnippet} language="rust" title="contacts.rs" notes={contactsNotes} />
            <Caption>{t('state.figureContacts')}</Caption>
          </figure>
          <ol className="flex flex-col lg:col-span-5">
            {points.map((point, index) => (
              <li key={point} className="border-t border-rule py-5 first:pt-0 first:border-t-0 lg:first:pt-1">
                <p className="font-mono text-[12px] text-guide">0{index + 1}</p>
                <h3 className="mt-2 text-[19px] leading-tight font-semibold tracking-[-0.01em]">{t(`state.points.${point}.title`)}</h3>
                <p className="mt-1.5 text-[15.5px] leading-relaxed text-ink-2">{t(`state.points.${point}.body`)}</p>
              </li>
            ))}
          </ol>
        </div>
      </Frame>
    </section>
  )
}
