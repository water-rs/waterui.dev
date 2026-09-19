import { Highlight, type Language, type PrismTheme } from 'prism-react-renderer'

/**
 * Highlighting stays inside the site palette: keywords and macros take the water
 * accent, strings take the one secondary tone, everything else is ink at two weights.
 */
const theme: PrismTheme = {
  plain: { color: 'var(--ink)' },
  styles: [
    { types: ['comment', 'prolog', 'doctype', 'cdata'], style: { color: 'var(--ink-faint)', fontStyle: 'italic' } },
    { types: ['punctuation', 'operator'], style: { color: 'var(--ink-muted)' } },
    { types: ['keyword', 'macro', 'attribute', 'attr-name', 'lifetime-annotation'], style: { color: 'var(--water)' } },
    { types: ['string', 'char'], style: { color: 'var(--code-string)' } },
    { types: ['number', 'boolean'], style: { color: 'var(--ink)' } },
    { types: ['function', 'class-name', 'type-definition'], style: { color: 'var(--ink)', fontWeight: '600' } },
  ],
}

type CodeProps = {
  code: string
  language: Language
  title?: string
  className?: string
}

export default function Code({ code, language, title, className = '' }: CodeProps) {
  return (
    <figure className={`overflow-hidden rounded-md border border-line bg-surface ${className}`}>
      {title === undefined ? null : (
        <figcaption className="flex items-center gap-2 border-b border-line px-4 py-2 font-mono text-xs text-ink-muted">
          <span className="text-water" aria-hidden>
            #
          </span>
          {title}
        </figcaption>
      )}
      <Highlight theme={theme} code={code.trimEnd()} language={language}>
        {({ className: highlightClass, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={`${highlightClass} overflow-x-auto p-4 font-mono text-[13px] leading-6 md:text-sm`} style={style}>
            {tokens.map((line, index) => (
              <div key={index} {...getLineProps({ line })}>
                {line.map((token, tokenIndex) => (
                  <span key={tokenIndex} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </figure>
  )
}
