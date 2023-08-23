
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
        <div className="flex">
          <aside>
            <Sidebar />
          </aside>
          <main className='bg-zinc-50 flex-1 m-16 p-4 border-1 rounded-md shadow-lg text-zinc-500'>
            {children}
          </main>    
        </div>    
      </body>
    </html>
  )
}
