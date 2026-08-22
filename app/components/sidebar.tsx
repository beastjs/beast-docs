import { ArrowUpRight, CircleDot } from 'lucide-react'
import Link from 'next/link'
import { navigation } from '../lib/docs'
import { getBeastRelease } from '../lib/release'

type SidebarProps = {
  currentHref?: string
}

export async function Sidebar({ currentHref = '' }: SidebarProps) {
  const release = await getBeastRelease()

  return (
    <div className='sidebar-column'>
      <aside className='sidebar'>
        <nav className='sidebar-nav font-okx' aria-label='Documentation'>
          {navigation.map((section) => (
            <section className='sidebar-section' key={section.label}>
              <p className='sidebar-label'>{section.label}</p>
              <ul>
                {section.items.map((item) => {
                  const active = currentHref === item.href
                  return (
                    <li key={item.href}>
                      {item.external ? (
                        <a className='sidebar-link' href={item.href} target='_blank' rel='noreferrer'>
                          <span>{item.label}</span>
                          <ArrowUpRight size={12} aria-hidden='true' />
                        </a>
                      ) : (
                        <Link
                          className={`sidebar-link${active ? ' active' : ''}`}
                          href={item.href}
                          aria-current={active ? 'page' : undefined}>
                          {item.label}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </section>
          ))}
        </nav>

        <div className='sidebar-status'>
          <span className='status-dot' aria-hidden='true'>
            <CircleDot size={13} />
          </span>
          <span>
            <strong>Beast {release.version}</strong>
            <small>Alpha release</small>
          </span>
        </div>
      </aside>
    </div>
  )
}
