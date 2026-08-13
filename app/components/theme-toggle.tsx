'use client'

import { Icon } from '@/lib/icons'

export function ThemeToggle() {
  function toggleTheme() {
    const root = document.documentElement
    const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark'
    root.dataset.theme = nextTheme
    localStorage.setItem('beast-theme', nextTheme)
  }

  return (
    <button
      type='button'
      className='icon-button theme-toggle'
      onClick={toggleTheme}
      aria-label='Toggle color theme'
      title='Toggle color theme'>
      <Icon name='theme' className='theme-icon theme-icon-dark' />
      <Icon name='theme' className='theme-icon theme-icon-light' />
    </button>
  )
}
