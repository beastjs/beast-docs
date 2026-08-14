import { createHighlighter, type Highlighter } from 'shiki'
import btsxGrammar from './btsx.tmLanguage.json'

let highlighterPromise: Promise<Highlighter> | null = null

// tsrx is TSX + Octane directives (@if, @for, @switch, @try etc)
// We register a tiny wrapper that includes tsx plus extra keywords.
const tsrxGrammar = {
  scopeName: 'source.tsrx',
  name: 'TSRX',
  fileTypes: ['tsrx'],
  patterns: [
    { include: '#octaneDirective' },
    { include: 'source.tsx' }
  ],
  repository: {
    octaneDirective: {
      name: 'keyword.control.octane.tsrx',
      match: '@\\b(if|else|for|empty|switch|case|default|try|pending|catch)\\b'
    }
  }
} as unknown as { scopeName: string; patterns: unknown[] }

export async function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = (async () => {
      const btsxLang: any = {
        name: 'btsx',
        scopeName: 'source.btsx',
        grammar: btsxGrammar,
        aliases: ['beast']
      }
      const tsrxLang: any = {
        name: 'tsrx',
        scopeName: 'source.tsrx',
        grammar: tsrxGrammar
      }
      const hl = await createHighlighter({
        themes: ['github-dark', 'github-light'],
        langs: ['typescript', 'tsx', 'javascript', 'js', 'ts', 'css', 'json', 'bash', 'shell', 'text', 'html', btsxLang, tsrxLang]
      })
      return hl
    })()
  }
  return highlighterPromise
}

export function normalizeLanguage(lang?: string): string {
  if (!lang) return 'text'
  const l = lang.toLowerCase()
  if (l === 'btsx' || l === 'beast') return 'btsx'
  if (l === 'tsrx') return 'tsrx'
  if (l === 'shell' || l === 'bash' || l === 'sh') return 'bash'
  if (l === 'js' || l === 'javascript') return 'javascript'
  if (l === 'ts' || l === 'typescript') return 'typescript'
  if (l === 'tsx') return 'tsx'
  if (l === 'css') return 'css'
  if (l === 'json') return 'json'
  return l
}
