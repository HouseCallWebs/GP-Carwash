interface LogoProps {
  className?:   string
  showTagline?: boolean
}

export default function Logo({ className, showTagline = true }: LogoProps) {
  return (
    <svg
      viewBox="0 0 340 118"
      className={className}
      role="img"
      aria-label="GP Mobile Car Wash & Detail — We Come to You!"
    >
      <text
        x="0" y="64"
        style={{ fontFamily: 'var(--font-barlow)' }}
        fontWeight={800}
        fontSize={68}
        fill="#FF6A00"
      >
        GP
      </text>
      <text
        x="98" y="34"
        style={{ fontFamily: 'var(--font-barlow)', paintOrder: 'stroke' }}
        fontWeight={800}
        fontSize={25}
        letterSpacing={1.5}
        fill="#FF6A00"
        stroke="#000000"
        strokeWidth={1.5}
      >
        MOBILE
      </text>
      <text
        x="98" y="60"
        style={{ fontFamily: 'var(--font-barlow)', paintOrder: 'stroke' }}
        fontWeight={800}
        fontSize={25}
        letterSpacing={0.5}
        fill="#FF6A00"
        stroke="#000000"
        strokeWidth={1.5}
      >
        DETAILING
      </text>
      {showTagline && (
        <text
          x="2" y="98"
          style={{ fontFamily: 'var(--font-script)' }}
          fontWeight={700}
          fontSize={38}
          fill="#ffffff"
        >
          We Come to You!
        </text>
      )}
    </svg>
  )
}
