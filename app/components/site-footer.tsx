import Link from 'next/link'
import { githubUrl } from '../lib/docs'
import { Brand } from './brand'

export function SiteFooter() {
  return (
    <footer className='site-footer'>
      <div className='footer-top'>
        <div className='footer-brand'>
          <Brand />
          <p>
            A compact authoring layer for explicit, native{' '}
            <a href='https://octanejs.dev' target='_blank' rel='noreferrer'>
              Octane
            </a>{' '}
            templates.
          </p>
        </div>
        <div className='footer-links'>
          <div>
            <p>Documentation</p>
            <Link href='/docs/get-started'>Quick start</Link>
            <Link href='/docs/language'>Language</Link>
            <Link href='/docs/vite'>Vite integration</Link>
            <Link href='/docs/examples'>Examples</Link>
          </div>
          <div>
            <p>Project</p>
            <a href={githubUrl} target='_blank' rel='noreferrer'>
              GitHub
            </a>
            <a href='https://github.com/phtn/beast-ext' target='_blank' rel='noreferrer'>
              Zed extension
            </a>
            <a href='https://github.com/phtn/nvim-treesitter/tree/add-beast-parser' target='_blank' rel='noreferrer'>
              Neovim parser
            </a>
            <a href={`${githubUrl}/blob/main/LICENSE`} target='_blank' rel='noreferrer'>
              ISC License
            </a>
          </div>
        </div>
      </div>
      <div className='footer-bottom'>
        <span>Beast is open source and currently in alpha.</span>
        <span>
          Made for{' '}
          <Link
            href='https://github.com/beast'
            className='hover:text-accent! hover:underline underline-offset-4 decoration-dotted font-medium'>
            <span>Beast</span>
          </Link>{' '}
          by{' '}
          <Link
            href='https://github.com/phtn'
            className='hover:text-accent! hover:underline underline-offset-4 decoration-dotted font-medium'>
            <span>phtn</span>
          </Link>
        </span>
      </div>
    </footer>
  )
}
