'use client'

import { Icon } from '@/lib/icons'
import { ArrowUpRight, CornerDownLeft } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import { searchItems } from '../lib/docs'

export function Search() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')

  function openSearch() {
    const dialog = dialogRef.current
    if (!dialog || dialog.open) return

    dialog.showModal()
    requestAnimationFrame(() => inputRef.current?.focus())
  }

  function closeSearch() {
    dialogRef.current?.close()
    setQuery('')
  }

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== '/' || dialogRef.current?.open) return

      event.preventDefault()
      event.stopPropagation()
      openSearch()
    }

    document.addEventListener('keydown', onKeyDown, true)
    return () => document.removeEventListener('keydown', onKeyDown, true)
  }, [])

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return searchItems

    return searchItems.filter((item) =>
      [item.label, item.description, item.group]
        .filter(Boolean)
        .some((value) => value?.toLowerCase().includes(normalized))
    )
  }, [query])

  return (
    <>
      <button type='button' className='search-trigger font-okx' onClick={openSearch} aria-keyshortcuts='/'>
        <Icon name='search' className='hidden xl:flex' />
        <span>Search docs</span>
        <Icon name='slash' className='' />
      </button>

      <dialog
        ref={dialogRef}
        className='search-dialog'
        aria-label='Search Beast documentation'
        onClick={(event) => {
          if (event.currentTarget === event.target) closeSearch()
        }}>
        <div className='search-panel font-okx'>
          <div className='search-input-wrap'>
            <Icon name='search' />
            <input
              ref={inputRef}
              type='search'
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder='Search Beast docs…'
              aria-label='Search Beast docs'
            />
            <button type='button' className='search-close' onClick={closeSearch} aria-label='Close search'>
              <Icon name='close' />
            </button>
          </div>

          <div className='search-results' role='listbox' aria-label='Results'>
            {results.length > 0 ? (
              results.map((item) => {
                const content = (
                  <>
                    <span className='search-result-icon'>
                      <Icon name='document' />
                    </span>
                    <span className='search-result-copy'>
                      <span className='search-result-label font-semibold'>{item.label}</span>
                      <span className='search-result-description'>{item.description}</span>
                    </span>
                    <span className='search-result-meta'>
                      <span>{item.group}</span>
                      {item.external ? (
                        <ArrowUpRight size={14} aria-hidden='true' />
                      ) : (
                        <CornerDownLeft size={14} aria-hidden='true' />
                      )}
                    </span>
                  </>
                )

                return item.external ? (
                  <a
                    className='search-result'
                    href={item.href}
                    target='_blank'
                    rel='noreferrer'
                    key={item.href}
                    onClick={closeSearch}>
                    {content}
                  </a>
                ) : (
                  <Link className='search-result' href={item.href} key={item.href} onClick={closeSearch}>
                    {content}
                  </Link>
                )
              })
            ) : (
              <div className='search-empty'>
                <span>No pages found</span>
                <p>Try a language feature, tool, or command.</p>
              </div>
            )}
          </div>

          <div className='search-footer'>
            <span className='text-mist-500'>
              <kbd className='bg-orange-300! font-semibold text-mist-700! border-mist-500!'>esc</kbd> close
            </span>
            <span className='text-mist-500'>
              <kbd className='bg-mist-300! font-semibold text-mist-700! border-mist-500! w-6 text-center'>↵</kbd> open
            </span>
          </div>
        </div>
      </dialog>
    </>
  )
}
