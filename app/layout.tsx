import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { headers } from 'next/headers'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export async function generateMetadata(): Promise<Metadata> {
  const incomingHeaders = await headers()
  const host = incomingHeaders.get('x-forwarded-host') ?? incomingHeaders.get('host') ?? 'localhost:3000'
  const protocol = incomingHeaders.get('x-forwarded-proto') ?? (host.startsWith('localhost') ? 'http' : 'https')
  const origin = `${protocol}://${host}`
  const socialImage = `/og/beast-dd-og.webp`

  return {
    metadataBase: new URL(origin),
    title: {
      default: 'Beast Developer Docs',
      template: '%s · Beast Docs'
    },
    openGraph: {
      title: 'Beast Developer Docs',
      description: 'Write the structure. Keep the types. Let Octane own rendering.',
      type: 'website',
      url: origin,
      images: [
        {
          url: socialImage,
          width: 1578,
          height: 996,
          alt: 'Beast Developer Docs — BTSX to TSRX'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Beast Developer Docs',
      description: 'Write the structure. Keep the types. Let Octane own rendering.',
      images: [socialImage]
    },
    icons: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '96x96',
        url: '/svg/icon1.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '180x180',
        url: '/svg/apple-icon.png'
      },
      {
        rel: 'icon',
        type: 'image/svg+xml',
        sizes: '192x192',
        url: '/svg/192.svg'
      }
    ],
    description:
      'Documentation for Beast, the indentation-first component language that compiles BTSX into native TSRX for Octane.',
    keywords: ['Beast', 'BTSX', 'TSRX', 'Octane', 'Vite', 'TypeScript']
  }
}

const themeScript = `
  try {
    const saved = localStorage.getItem("beast-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.dataset.theme = saved || (prefersDark ? "dark" : "light");
  } catch (_) {
    document.documentElement.dataset.theme = "light";
  }
`

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang='en' suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
