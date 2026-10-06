import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Outline } from './outline'
import { demoSource, demoUrl } from '../data/demos'

/**
 * One example running in the page: Hydrolysis compiles the example crate to
 * WebAssembly and runs its real view tree on WebGPU. The bundle loads in an
 * iframe, so the runner's single canvas stays out of the page, and only once
 * the visitor asks for it. The modal `<dialog>` hands focus to the example,
 * so keys reach the app (Escape included); the Close button and a click on
 * the backdrop close it.
 */
export default function ExampleRunner({ example, onClose }: { example: string; onClose: () => void }) {
  const { t } = useTranslation()
  const dialog = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    dialog.current?.showModal()
  }, [])

  const link = 'font-mono text-[12.5px] underline underline-offset-4 hover:text-guide'
  return (
    <dialog
      ref={dialog}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialog.current) {
          dialog.current.close()
        }
      }}
      aria-label={t('gallery.runner.title', { example })}
      className="m-auto h-[min(820px,calc(100dvh-32px))] w-[min(1180px,calc(100vw-32px))] max-h-none max-w-none border border-rule bg-paper p-0 text-ink backdrop:bg-black/55 max-sm:h-dvh max-sm:w-screen max-sm:border-0"
    >
      <div className="flex h-full flex-col">
        <header className="flex flex-wrap items-center gap-x-5 gap-y-1 border-b border-rule px-4 py-3">
          <p className="font-mono text-[14px] font-semibold">{example}</p>
          <p className="font-mono text-[12px] text-ink-2">{t('gallery.runner.caption')}</p>
          <span className="ml-auto flex items-center gap-4">
            <a href={demoSource(example)} target="_blank" rel="noopener noreferrer" className={link}>
              {t('gallery.runner.source')} ↗
            </a>
            <a href={demoUrl(example)} target="_blank" rel="noopener noreferrer" className={link}>
              {t('gallery.runner.openFull')} ↗
            </a>
            <button
              type="button"
              onClick={() => dialog.current?.close()}
              className="flex h-8 items-center border border-ink/80 px-3 text-[13px] font-semibold transition-colors hover:bg-ink hover:text-paper"
            >
              {t('gallery.runner.close')}
            </button>
          </span>
        </header>
        <Outline className="min-h-0 flex-1">
          {/* Focus goes to the running example, so it takes keys and text as soon as it opens. */}
          <iframe src={demoUrl(example)} title={t('gallery.runner.title', { example })} autoFocus className="block h-full w-full" />
        </Outline>
      </div>
    </dialog>
  )
}
