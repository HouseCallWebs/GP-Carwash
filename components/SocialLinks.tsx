import { Facebook, Instagram, Youtube, Linkedin, X as XIcon } from 'lucide-react'
import TikTokIcon from '@/components/icons/TikTokIcon'
import { siteConfig } from '@/lib/config'

const links = [
  { href: siteConfig.social.facebook,  Icon: Facebook,   label: 'Facebook'    },
  { href: siteConfig.social.instagram, Icon: Instagram,  label: 'Instagram'   },
  { href: siteConfig.social.tiktok,    Icon: TikTokIcon, label: 'TikTok'      },
  { href: siteConfig.social.youtube,   Icon: Youtube,    label: 'YouTube'     },
  { href: siteConfig.social.x,         Icon: XIcon,      label: 'X (Twitter)' },
  { href: siteConfig.social.linkedin,  Icon: Linkedin,   label: 'LinkedIn'    },
]

interface SocialLinksProps {
  className?:     string
  itemClassName?: string
  iconClassName?: string
}

export default function SocialLinks({
  className     = 'flex items-center gap-2',
  itemClassName = 'w-7 h-7 rounded-lg border border-white/10 bg-white/3 flex items-center justify-center text-slate-400 hover:text-[#FF6A00] hover:border-[#FF6A00]/40 transition-colors',
  iconClassName = 'w-3.5 h-3.5',
}: SocialLinksProps) {
  return (
    <div className={className}>
      {links.map(({ href, Icon, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={itemClassName}
        >
          <Icon className={iconClassName} />
        </a>
      ))}
    </div>
  )
}
