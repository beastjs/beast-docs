import Link from 'next/link'
import { githubUrl } from '../lib/docs'
import { getBeastRelease } from '../lib/release'
import { Brand } from './brand'

export async function SiteFooter() {
  const release = await getBeastRelease()

  return (
    <footer className='site-footer'>
      <div className='footer-top'>
        <div className='footer-brand'>
          <Brand />
          <p>
            A compact authoring layer for explicit, native{' '}
            <a
              href='https://octanejs.dev'
              className='text-[#ff415a]! hover:underline! underline-offset-4 decoration-dashed'
              target='_blank'
              rel='noreferrer'>
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
            <Link href='/docs/vite'>Integration</Link>
            <Link href='/docs/examples'>Examples</Link>
          </div>
          <div>
            <p>Project</p>
            <a href={githubUrl} target='_blank' rel='noreferrer'>
              GitHub
            </a>
            <a href='https://github.com/phtn/nvim-treesitter/tree/add-beast-parser' target='_blank' rel='noreferrer'>
              Neovim parser
            </a>
            <a href='https://github.com/phtn/beast-ext' target='_blank' rel='noreferrer'>
              Zed extension
            </a>
            <a
              href={`https://marketplace.visualstudio.com/items?itemName=phtn.beastjs`}
              target='_blank'
              rel='noreferrer'>
              VS Code extension
            </a>
          </div>
        </div>
      </div>
      <div className='footer-bottom'>
        <span>Beast {release.version} is open source and currently in alpha.</span>
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
