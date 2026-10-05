import { Highlight, type Language, type PrismTheme } from 'prism-react-renderer'

/**
 * Highlighting stays inside the page palette: keywords and macros take the
 * guide blue, strings the one secondary tone, everything else is ink.
 */
const theme: PrismTheme = {
  plain: { color: 'var(--ink)' },
  styles: [
    { types: ['comment', 'prolog', 'doctype', 'cdata'], style: { color: 'var(--ink-3)', fontStyle: 'italic' } },
    { types: ['punctuation', 'operator'], style: { color: 'var(--ink-2)' } },
    { types: ['keyword', 'macro', 'attribute', 'attr-name', 'lifetime-annotation'], style: { color: 'var(--guide)' } },
    { types: ['string', 'char'], style: { color: 'var(--code-string)' } },
    { types: ['number', 'boolean'], style: { color: 'var(--ink)' } },
    { types: ['function', 'class-name', 'type-definition'], style: { color: 'var(--ink)', fontWeight: '600' } },
  ],
}

/** A callout on one source line, printed in the margin the way an inspector labels a node. */
export type Note = { line: number; text: string }

type CodeProps = {
  code: string
  language: Language
  /** File name or command shown above the listing. */
  title: string
  notes?: readonly Note[]
  className?: string
}

/** A source listing with line numbers and, optionally, margin callouts on specific lines. */
export default function Code({ code, language, title, notes = [], className = '' }: CodeProps) {
  return (
    <figure className={`border border-rule bg-raised ${className}`}>
      <figcaption className="flex items-center justify-between border-b border-rule px-3 py-1.5 font-mono text-[11.5px] text-ink-2">
        <span>{title}</span>
        <span aria-hidden>{language}</span>
      </figcaption>
      <Highlight theme={theme} code={code.trimEnd()} language={language}>
        {({ className: highlightClass, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={`${highlightClass} overflow-x-auto py-3 font-mono text-[12.5px] leading-[1.7] md:text-[13px]`} style={style}>
            {tokens.map((line, index) => {
              const note = notes.find((candidate) => candidate.line === index + 1)
              return (
                <div key={index} {...getLineProps({ line })} className={`flex ${note ? 'bg-guide-soft' : ''}`}>
                  <span className="w-10 shrink-0 pr-3 text-right text-ink-3 select-none" aria-hidden>
                    {index + 1}
                  </span>
                  <span className="shrink-0 pr-4">
                    {line.map((token, tokenIndex) => (
                      <span key={tokenIndex} {...getTokenProps({ token })} />
                    ))}
                  </span>
                  {note === undefined ? null : (
                    <span className="flex shrink-0 items-center gap-2 pr-4 font-sans text-[12px] text-guide">
                      <span className="h-px w-6 bg-guide" aria-hidden />
                      <span className="h-1.5 w-1.5 rounded-full bg-guide" aria-hidden />
                      {note.text}
                    </span>
                  )}
                </div>
              )
            })}
          </pre>
        )}
      </Highlight>
    </figure>
  )
}
