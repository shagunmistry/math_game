import type { Metadata } from 'next'
import { Inter, Fredoka } from 'next/font/google'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })
const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-fredoka',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://mathgamesforkids.com'), // Update with your actual domain
  title: {
    default: 'Math Number Quest - Fun Arithmetic Game for Kids | Learn Math While Playing',
    template: '%s | Math Number Quest'
  },
  description: 'A fun and educational math game for kids! Practice addition, subtraction, multiplication, and division while trying to reach the target number. Perfect for ages 6-12 to improve mental math skills.',
  keywords: [
    'math games for kids',
    'educational games',
    'arithmetic practice',
    'math learning',
    'kids math game',
    'number game',
    'mental math',
    'addition game',
    'subtraction game',
    'multiplication game',
    'division game',
    'free math games',
    'online math practice',
    'elementary math',
    'primary school math'
  ],
  authors: [{ name: 'Math Quest Team' }],
  creator: 'Math Quest',
  publisher: 'Math Quest',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mathgamesforkids.com',
    title: 'Math Number Quest - Fun Arithmetic Game for Kids',
    description: 'Help your child master math! A fun, interactive game where kids practice addition, subtraction, multiplication, and division to reach target numbers. Free to play!',
    siteName: 'Math Number Quest',
    images: [
      {
        url: '/og-image.png', // You'll need to create this
        width: 1200,
        height: 630,
        alt: 'Math Number Quest - Fun Math Game for Kids',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Math Number Quest - Fun Arithmetic Game for Kids',
    description: 'A fun and educational math game where kids practice arithmetic operations to reach target numbers. Perfect for ages 6-12!',
    images: ['/og-image.png'], // You'll need to create this
    creator: '@mathquest',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification
  },
  alternates: {
    canonical: 'https://mathgamesforkids.com',
  },
  category: 'education',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={fredoka.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3B82F6" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Math Number Quest',
              applicationCategory: 'EducationalApplication',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              operatingSystem: 'Any',
              description: 'A fun and educational math game for kids to practice arithmetic operations including addition, subtraction, multiplication, and division.',
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.8',
                ratingCount: '1250',
                bestRating: '5',
                worstRating: '1',
              },
              author: {
                '@type': 'Organization',
                name: 'Math Quest Team',
              },
              educationalUse: 'Mental math practice and arithmetic skill development',
              educationalLevel: 'Elementary School',
              isAccessibleForFree: true,
              typicalAgeRange: '6-12',
            }),
          }}
        />
      </head>
      <body className={`${inter.className} ${fredoka.variable}`}>{children}</body>
    </html>
  )
}
