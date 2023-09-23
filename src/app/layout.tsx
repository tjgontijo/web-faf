import Sidebar from '@/components/Menu/Sidebar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Plano de Ação Online',
  description: 'Sistema para criação e acompanhamento dos Planos de Ação',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className='h-screen items-center justify-center'>
          {children}
        </div>
      </body>
    </html>
  )
}
