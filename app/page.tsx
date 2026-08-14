import { Icon } from '@/lib/icons'
import {
  ArrowRight,
  Braces,
  Cable,
  CircleCheck,
  Code2,
  FileCode2,
  Gauge,
  GitBranch,
  IndentIncrease,
  ScanText,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  Workflow,
  Zap
} from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'
import { CompilerShowcase } from './components/compiler-showcase'
import { CopyButton } from './components/copy-button'
import { CornerMarks } from './components/corner-marks'
import { Sidebar } from './components/sidebar'
import { SiteFooter } from './components/site-footer'
import { SiteHeader } from './components/site-header'
import { githubUrl } from './lib/docs'

export const metadata: Metadata = {
  title: 'Beast Documentation',
  description:
    'Documentation for Beast, the indentation-first component language that compiles BTSX into native TSRX for O',
  icons: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      sizes: '64x64',
      url: '/svg/logo.svg'
    }
  ]
}

const command = 'bun create beast@latest my-app'

const features = [
  {
    title: 'Indentation-first',
    description:
      'Write a component tree without closing tags. Spaces define structure and diagnostics point back to your source.',
    icon: IndentIncrease,
    color: 'blue'
  },
  {
    title: 'Native control flow',
    description: 'Conditions, keyed loops, switches, pending states, and catches compile to Octane operations.',
    icon: Braces,
    color: 'green'
  },
  {
    title: 'Types stay intact',
    description: 'Props, imports, setup code, and embedded expressions remain TypeScript source for final validation.',
    icon: ShieldCheck,
    color: 'violet'
  },
  {
    title: 'Made for Vite',
    description: 'Compile in memory before Octane, with normal imports, HMR, SSR transforms, and production builds.',
    icon: Zap,
    color: 'orange'
  }
]

const docsCards = [
  {
    eyebrow: 'Start here',
    title: 'Create your first Beast app',
    description: 'Scaffold a typed BTSX, Octane, and Vite project with Bun.',
    href: '/docs/get-started',
    icon: Sparkles
  },
  {
    eyebrow: 'Language',
    title: 'Elements and nesting',
    description: 'Learn selectors, attributes, text, interpolation, and roots.',
    href: '/docs/language',
    icon: ScanText
  },
  {
    eyebrow: 'Language',
    title: 'Control flow',
    description: 'Author branches, keyed loops, switches, and async boundaries.',
    href: '/docs/control-flow',
    icon: GitBranch
  },
  {
    eyebrow: 'Tooling',
    title: 'Vite integration',
    description: 'Add the complete Beast and Octane transform pipeline.',
    href: '/docs/vite',
    icon: Cable
  },
  {
    eyebrow: 'Reference',
    title: 'Compiler API',
    description: 'Compile source, inspect the AST, or build a project in code.',
    href: '/docs/compiler-api',
    icon: Code2
  },
  {
    eyebrow: 'Reference',
    title: 'Diagnostics',
    description: 'Understand stable errors, source spans, and remediation hints.',
    href: '/docs/diagnostics',
    icon: Gauge
  }
]

const pipeline = [
  { label: '.btsx', caption: 'Source', icon: FileCode2 },
  { label: 'Parser', caption: 'Indentation', icon: ScanText },
  { label: 'Beast AST', caption: 'Source-located', icon: Workflow },
  { label: '.tsrx', caption: 'Readable output', icon: Code2 },
  { label: 'Octane', caption: 'Validation', icon: CircleCheck },
  { label: 'Vite', caption: 'Application', icon: Zap }
]

export default function Home() {
  return (
    <>
      <SiteHeader section='home' />
      <div className='site-frame'>
        <Sidebar />

        <main id='main-content' className='landing-main'>
          <div className='blueprint-lines' aria-hidden='true' />
          <div className='landing-container'>
            <section className='hero' aria-labelledby='hero-title'>
              <div className='hero-kicker'>
                <span className='pulse-dot' aria-hidden='true' />
                <span>v0.1.0 · Alpha</span>
              </div>
              <h1 id='hero-title'>Beast Developer Docs</h1>
              <p>Write components with indentation. Keep the types. Let Octane own rendering.</p>
              <div className='hero-actions'>
                <Link href='/docs/get-started' className='button button-primary'>
                  Get started
                  <ArrowRight size={15} aria-hidden='true' />
                </Link>
                <a href={githubUrl} target='_blank' rel='noreferrer' className='button button-secondary'>
                  View on GitHub
                </a>
              </div>
              <div className='hero-meta' aria-label='Built with'>
                <span>BTSX</span>
                <i aria-hidden='true' />
                <span>TSRX</span>
                <i aria-hidden='true' />
                <span>Octane</span>
                <i aria-hidden='true' />
                <span>Vite</span>
              </div>
            </section>

            <section className='section install-section' aria-labelledby='install-title'>
              <div className='section-heading-row'>
                <div>
                  <span className='section-kicker opacity-80'>Quick start</span>
                  <h2 id='install-title'>A typed app, in one command</h2>
                </div>
                <Link className='text-link' href='/docs/get-started'>
                  Read the guide <ArrowRight size={14} aria-hidden='true' />
                </Link>
              </div>

              <div className='install-panel'>
                <CornerMarks />
                <div className='install-copy'>
                  <span className='feature-icon'>
                    <TerminalSquare size={17} aria-hidden='true' />
                  </span>
                  <div>
                    <h3>Start with the whole pipeline configured</h3>
                    <p>
                      The creator wires Beast, Octane, TSRX checking, and Vite into a small project you can inspect end
                      to end.
                    </p>
                  </div>
                </div>
                <div className='command-block'>
                  <span className='command-prompt font-okx dark:text-mist-500!' aria-hidden='true'>
                    $
                  </span>
                  <code>{command}</code>
                  <CopyButton value={command} label='' />
                </div>
                <div className='install-details'>
                  <span>
                    <Icon name='checkbox-checked' /> Typed starter
                  </span>
                  <span>
                    <Icon name='checkbox-checked' /> HMR ready
                  </span>
                  <span>
                    <Icon name='checkbox-checked' /> Production build
                  </span>
                </div>
              </div>
            </section>

            <section className='section' aria-labelledby='compiler-title'>
              <div className='section-heading'>
                <span className='section-kicker opacity-80'>The compiler</span>
                <h2 id='compiler-title'>Small syntax. Native output.</h2>
                <p>
                  Beast stays deliberately narrow: it makes templates compact, then gets out of the toolchain&apos;s
                  way.
                </p>
              </div>
              <CompilerShowcase />
            </section>

            <section className='section' aria-labelledby='features-title'>
              <div className='section-heading'>
                <span className='section-kicker'>Why Beast</span>
                <h2 id='features-title'>Built to remain transparent</h2>
                <p>Every layer is explicit—from the source you author to the TSRX Octane receives.</p>
              </div>
              <div className='feature-grid'>
                <CornerMarks />
                {features.map((feature) => {
                  const IconComp = feature.icon
                  return (
                    <article className='feature-card' key={feature.title}>
                      <span className={`feature-icon`}>
                        <IconComp size={17} aria-hidden='true' />
                      </span>
                      <h3>{feature.title}</h3>
                      <p>{feature.description}</p>
                    </article>
                  )
                })}
              </div>
            </section>

            <section className='section' aria-labelledby='pipeline-title'>
              <div className='section-heading-row pipeline-heading'>
                <div>
                  <span className='section-kicker'>How it works</span>
                  <h2 id='pipeline-title'>From source to browser</h2>
                </div>
                <Link className='text-link' href='/docs/how-it-works'>
                  Follow the pipeline <ArrowRight size={14} aria-hidden='true' />
                </Link>
              </div>
              <div className='pipeline'>
                <CornerMarks />
                {pipeline.map((step, index) => {
                  const Icon = step.icon
                  return (
                    <div className='pipeline-step' key={step.label}>
                      <span className='pipeline-index'>{String(index + 1).padStart(2, '0')}</span>
                      <Icon size={18} aria-hidden='true' />
                      <strong>{step.label}</strong>
                      <small>{step.caption}</small>
                    </div>
                  )
                })}
              </div>
            </section>

            <section className='section' aria-labelledby='explore-title'>
              <div className='section-heading'>
                <span className='section-kicker'>Explore the docs</span>
                <h2 id='explore-title'>Everything you need to build</h2>
                <p>
                  Start with the language, connect your toolchain, then reach for the compiler directly when you need
                  more control.
                </p>
              </div>
              <div className='docs-card-grid'>
                <CornerMarks />
                {docsCards.map((card) => {
                  const Icon = card.icon
                  return (
                    <Link className='docs-card' href={card.href} key={card.href}>
                      <div className='docs-card-top'>
                        <span className='feature-icon neutral'>
                          <Icon size={16} aria-hidden='true' />
                        </span>
                        <ArrowRight className='card-arrow' size={15} aria-hidden='true' />
                      </div>
                      <span className='docs-card-kicker'>{card.eyebrow}</span>
                      <h3>{card.title}</h3>
                      <p>{card.description}</p>
                    </Link>
                  )
                })}
              </div>
            </section>

            <section className='section status-section' aria-labelledby='status-title'>
              <div className='status-panel'>
                <CornerMarks />
                <div className='status-copy'>
                  <span className='section-kicker'>Project status</span>
                  <h2 id='status-title'>Early, focused, and tested</h2>
                  <p>
                    Beast is alpha software with a deliberately narrow language. The compiler, project builder, Vite
                    integration, and creator work today; the public API may still evolve.
                  </p>
                  <a
                    href={`${githubUrl}#project-status`}
                    target='_blank'
                    rel='noreferrer'
                    className='button button-secondary'>
                    Read project status
                    <ArrowRight size={15} aria-hidden='true' />
                  </a>
                </div>
                <div className='status-ascii' aria-hidden='true'>
                  <pre>{`┌─ BEAST ────────────┐
│ source   .btsx     │
│ output   .tsrx     │
│ runtime  Octane    │
│ status   alpha     │
└────────────────────┘`}</pre>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
      <SiteFooter />
    </>
  )
}
