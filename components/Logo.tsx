import Image from 'next/image'

interface LogoProps {
  className?: string
}

export default function Logo({ className }: LogoProps) {
  return (
    <Image
      src="/logo.png"
      alt="GP Mobile Car Wash & Detail"
      width={386}
      height={264}
      className={className}
      priority
    />
  )
}
