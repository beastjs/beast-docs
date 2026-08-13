import { Icon } from '@/lib/icons'
import Link from 'next/link'
import { githubUrl } from '../lib/docs'
import { Brand } from './brand'
import { MobileNav } from './mobile-nav'
import { Search } from './search'
import { ThemeToggle } from './theme-toggle'

type SiteHeaderProps = {
  section?: 'home' | 'docs' | 'language' | 'tooling'
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
    label: 'Tooling',
    href: '/docs/vite',
    section: 'tooling',
    external: false
  },
  {
    label: 'Examples',
    href: `${githubUrl}/tree/main/examples`,
    section: 'examples',
    external: true
  }
] as const

export function SiteHeader({ section = 'home' }: SiteHeaderProps) {
  return (
    <header className='site-header'>
      <div className='site-header-inner'>
        <div className='site-header-left'>
          <Brand />
          <nav className='header-nav font-okx' aria-label='Primary navigation'>
            {headerLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={section === item.section ? 'active' : undefined}
                aria-current={section === item.section ? 'page' : undefined}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noreferrer' : undefined}>
                {item.label}
              </a>
            ))}
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
          <span className='header-divider' aria-hidden='true' />
          <Link className='header-cta' href='/docs/get-started'>
            Get started
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
