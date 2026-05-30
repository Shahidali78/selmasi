import './globals.css'

export const metadata = {
  title: 'Selmasi – Smart Business Automation',
  description: 'Selmasi helps businesses save time and avoid missed opportunities by replacing manual follow-up and admin processes with practical automation solutions.',
  icons: { icon: '/logo.png' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
