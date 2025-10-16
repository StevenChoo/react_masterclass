import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'React Masterclass - Slide Examples',
  description: 'Live demos from React Masterclass presentation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
