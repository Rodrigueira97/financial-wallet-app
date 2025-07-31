import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import { QueryClientProvider } from '@tanstack/react-query'
import { Providers } from '@/components/providers'

export const metadata: Metadata = {
  title: 'FinancialWallet',
  description: 'Carteira digital moderna',
  generator: 'FinancialWallet',
  icons: {
    icon: '/dolar.png'
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {


  return (
    <html lang="pt-BR">
      <head>
        <style>{`
        html {
        font-family: ${GeistSans.style.fontFamily};
        --font-sans: ${GeistSans.variable};
        --font-mono: ${GeistMono.variable};
        }
        `}</style>
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
