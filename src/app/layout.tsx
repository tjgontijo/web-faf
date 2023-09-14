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
        <div className="flex h-screen">
          <aside>
            <Sidebar />
          </aside>
          <main className='flex-auto'>
            <div className='flex flex-col bg-[#f8f8f8] m-12 p-6 border-1 rounded-md shadow-zinc-300 shadow-md box-border h-[90%]'>
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  )
}
