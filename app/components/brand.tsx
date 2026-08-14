import { Icon } from '@/lib/icons'
import Link from 'next/link'

type BrandProps = {
  compact?: boolean
}

export function Brand({ compact = false }: BrandProps) {
  return (
    <Link className='brand' href='/' aria-label='Beast documentation home'>
      <Icon name='beast' className='size-6' />
      {compact ? null : (
        <div className='skew-2'>
          <span className='brand-name font-okx font-bold tracking-wider uppercase'>Beast</span>
        </div>
      )}
    </Link>
  )
}
