import { Icon } from '@/lib/icons'
import Link from 'next/link'

type BrandProps = {
  compact?: boolean
}

export function Brand({ compact = false }: BrandProps) {
  return (
    <Link className='brand' href='/' aria-label='Beast documentation home'>
      <Icon name='beast' className='size-6 text-accent!' />
      {compact ? null : (
        <>
          <span className='brand-name'>Beast</span>
        </>
      )}
    </Link>
  )
}
