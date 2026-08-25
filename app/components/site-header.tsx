import { Icon } from '@/lib/icons'
import Link from 'next/link'
import { githubUrl } from '../lib/docs'
import { Brand } from './brand'
import { MobileNav } from './mobile-nav'
import { Search } from './search'
import { ThemeToggle } from './theme-toggle'

type SiteHeaderProps = {
  section?: 'home' | 'docs' | 'language' | 'skills' | 'tooling' | 'integrations' | 'examples'
}

const headerLinks = [
  { label: 'Docs', href: '/docs', section: 'docs', external: false },
  {
    label: 'Language',
    href: '/docs/language',
    section: 'language',
    external: false
  },
  {
    label: 'Skills',
    href: '/docs/skills',
    section: 'skills',
    external: false
  },
  {
    label: 'Tooling',
    href: '/docs/cli',
    section: 'tooling',
    external: false
  },
  {
    label: 'Integrations',
    href: '/docs/vite',
    section: 'integrations',
    external: false
  },
  {
    label: 'Examples',
    href: '/docs/examples',
    section: 'examples',
    external: false
  }
] as const

export function SiteHeader({ section = 'home' }: SiteHeaderProps) {
  return (
    <header suppressHydrationWarning className='site-header'>
      <div className='site-header-inner'>
        <div className='site-header-left'>
          <Brand />
          <nav className='header-nav font-okx' aria-label='Primary navigation'>
            {headerLinks.map((item) =>
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  className={section === item.section ? 'active' : undefined}
                  aria-current={section === item.section ? 'page' : undefined}
                  target='_blank'
                  rel='noreferrer'>
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={section === item.section ? 'active' : undefined}
                  aria-current={section === item.section ? 'page' : undefined}>
                  {item.label}
                </Link>
              )
            )}
          </nav>
        </div>

        <div className='site-header-actions'>
          <Search />
          <a
            href={githubUrl}
            target='_blank'
            rel='noreferrer'
            className='icon-button github-button'
            aria-label='Beast on GitHub'
            title='Beast on GitHub'>
            <Icon name='github' />
          </a>
          <ThemeToggle />
          {/*<span className='header-divider' aria-hidden='true' />
          <Link className='header-cta' href='/docs/get-started'>
            Get started
          </Link>*/}
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
