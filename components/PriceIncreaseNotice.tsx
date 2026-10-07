import Link from 'next/link'
import { ArrowRight, Megaphone } from 'lucide-react'
import { siteConfig } from '@/lib/config'

interface PriceIncreaseNoticeProps {
  variant:    'bar' | 'callout'
  showLink?:  boolean
  className?: string
}

export default function PriceIncreaseNotice({
  variant,
  showLink = true,
  className = '',
}: PriceIncreaseNoticeProps) {
  const notice = siteConfig.priceIncreaseNotice
  if (!notice.enabled) return null

  if (variant === 'bar') {
    return (
      <div className={`text-black ${className}`} style={{ background: '#FF6A00' }}>
        <p className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 text-center text-xs sm:text-sm font-semibold leading-snug">
          {notice.text}{' '}
          <Link href={notice.linkHref}
            className="inline-flex items-center gap-1 font-bold underline underline-offset-2 hover:no-underline whitespace-nowrap">
            {notice.linkLabel}
            <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
          </Link>
        </p>
      </div>
    )
  }

  return (
    <div
      className={`inline-flex items-start sm:items-center gap-3 px-4 py-3 rounded-xl text-left ${className}`}
      style={{ background: 'rgba(255,106,0,0.08)', border: '1px solid rgba(255,106,0,0.3)' }}
    >
      <Megaphone className="w-4 h-4 mt-0.5 sm:mt-0 flex-shrink-0" style={{ color: '#FF6A00' }} strokeWidth={2} />
      <p className="text-sm text-slate-200 leading-snug">
        {notice.text}
        {showLink && (
          <>
            {' '}
            <Link href={notice.linkHref} className="font-bold underline underline-offset-2" style={{ color: '#FF8A3D' }}>
              {notice.linkLabel}
            </Link>
          </>
        )}
      </p>
    </div>
  )
}
