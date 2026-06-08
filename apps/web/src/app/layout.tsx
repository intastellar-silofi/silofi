import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SiloFi',
  description: 'On-chain warehouse receipts for African agriculture.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
