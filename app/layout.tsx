import type { Metadata } from 'next'
import { Barlow_Condensed, Inter, Caveat } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { siteConfig } from '@/lib/config'

const barlowCondensed = Barlow_Condensed({
  subsets:  ['latin'],
  weight:   ['600', '700', '800'],
  variable: '--font-barlow',
  display:  'swap',
})

const inter = Inter({
  subsets:  ['latin'],
  variable: '--font-inter',
  display:  'swap',
})

const caveat = Caveat({
  subsets:  ['latin'],
  weight:   ['600', '700'],
  variable: '--font-script',
  display:  'swap',
})

export const metadata: Metadata = {
  title:       siteConfig.seo.title,
  description: siteConfig.seo.description,
  keywords:    siteConfig.seo.keywords,
  openGraph: {
    title:       siteConfig.seo.title,
    description: siteConfig.seo.description,
    type:        'website',
  },
}

const GA4_ID = process.env.NEXT_PUBLIC_GA4_GP_MOBILE

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${barlowCondensed.variable} ${inter.variable} ${caveat.variable}`}>
      <body className="font-body antialiased">
        {GA4_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA4_ID}');
              `}
            </Script>
          </>
        )}
        {children}
      </body>
    </html>
  )
}
