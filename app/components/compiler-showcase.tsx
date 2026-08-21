'use client'

import { ArrowRight, Braces, Cable, IndentIncrease } from 'lucide-react'
import { useState } from 'react'
import { CodeBlock } from './code-block'

const examples = [
  {
    id: 'authoring',
    label: 'Authoring',
    title: 'Write the structure',
    description: 'Indentation replaces closing tags while TypeScript stays beside the template it powers.',
    icon: IndentIncrease,
    input: {
      filename: 'Card.btsx',
      language: 'btsx',
      code: `props { user, messages }: Props

.card
  h1 Welcome, #{user.name}
  ul.messages
    each message in messages key message.id
      li #{message.text}`
    },
    output: {
      filename: 'Card.tsrx',
      language: 'tsrx',
      code: `export default function Card({ user, messages }: Props) @{
  <div className="card">
    <h1>Welcome, {user.name}</h1>
    <ul className="messages">
      @for (const message of messages; key message.id) {
        <li>{message.text}</li>
      }
    </ul>
  </div>
}`
    }
  },
  {
    id: 'control-flow',
    label: 'Control flow',
    title: 'Keep native semantics',
    description: 'Conditions, loops, switches, and boundaries stay as Octane template operations.',
    icon: Braces,
    input: {
      filename: 'Status.btsx',
      language: 'btsx',
      code: `switch status
  case "ready"
    Dashboard(data={data})
  case "loading"
    LoadingView
  default
    ErrorView

each item in items key item.id
  Result(item={item})
empty
  p No results yet.`
    },
    output: {
      filename: 'Status.tsrx',
      language: 'tsrx',
      code: `@switch (status) {
  @case ("ready") { <Dashboard data={data} /> }
  @case ("loading") { <LoadingView /> }
  @default { <ErrorView /> }
}

@for (const item of items; key item.id) {
  <Result item={item} />
} @empty {
  <p>No results yet.</p>
}`
    }
  },
  {
    id: 'tooling',
    label: 'Tooling',
    title: 'Use the tools you know',
    description: 'Beast runs before Octane in Vite, with normal imports, HMR, SSR, and production builds.',
    icon: Cable,
    input: {
      filename: 'vite.config.ts',
      language: 'ts',
      code: `import { defineConfig } from "vite";
import { beastOctane } from "beast-tsrx/vite";

export default defineConfig({
  plugins: [
    beastOctane({
      octane: { strong: true },
    }),
  ],
});`
    },
    output: {
      filename: 'src/main.ts',
      language: 'ts',
      code: `import App from "./App.btsx";
import { NativePanel } from "./NativePanel.tsrx";

// Beast transforms BTSX in memory.
// Octane validates and lowers both source types.
// Vite owns serving, HMR, SSR, and production.

export { App, NativePanel };`
    }
  }
] as const

export function CompilerShowcase() {
  const [activeId, setActiveId] = useState<(typeof examples)[number]['id']>('authoring')
  const active = examples.find((example) => example.id === activeId) ?? examples[0]
  const ActiveIcon = active.icon

  return (
    <div suppressHydrationWarning className='showcase-shell'>
      <div className='showcase-tabs' role='tablist' aria-label='Beast capabilities'>
        {examples.map((example) => {
          const Icon = example.icon
          const selected = example.id === activeId

          return (
            <button
              type='button'
              role='tab'
              aria-selected={selected}
              aria-controls={`showcase-panel-${example.id}`}
              id={`showcase-tab-${example.id}`}
              className={selected ? 'active' : undefined}
              key={example.id}
              onClick={() => setActiveId(example.id)}>
              <Icon size={15} aria-hidden='true' />
              {example.label}
            </button>
          )
        })}
      </div>

      <div
        className='showcase-panel'
        id={`showcase-panel-${active.id}`}
        role='tabpanel'
        aria-labelledby={`showcase-tab-${active.id}`}>
        <div className='showcase-heading'>
          <span className='feature-icon'>
            <ActiveIcon size={16} aria-hidden='true' />
          </span>
          <div>
            <h3>{active.title}</h3>
            <p>{active.description}</p>
          </div>
        </div>

        <div className='compiler-comparison'>
          <CodeBlock {...active.input} />
          <span className='compiler-arrow' aria-hidden='true'>
            <ArrowRight size={18} />
          </span>
          <CodeBlock {...active.output} />
        </div>
      </div>
    </div>
  )
}
