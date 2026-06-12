import './globals.css'

export const metadata = {
  metadataBase: new URL('https://selmasi.africa'),
  title: 'Selmasi – Smart Business Automation for Growing Companies',
  description:
    'Selmasi helps businesses and schools automate customer responses, bookings, parent communication, follow-ups, and daily processes with simple digital systems built for real businesses.',
  keywords: ['business automation', 'school automation', 'WhatsApp automation', 'lead response', 'South Africa'],
  icons: { icon: '/logo.png' },
  openGraph: {
    title: 'Selmasi – Smart Business Automation',
    description:
      'Automate customer responses, bookings, school communication, and follow-ups with practical digital systems.',
    url: 'https://selmasi.africa',
    siteName: 'Selmasi',
    locale: 'en_ZA',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
