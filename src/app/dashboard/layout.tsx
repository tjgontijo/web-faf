"use client"
import Sidebar from '@/components/Menu/Sidebar'


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen">
      <aside>
        <Sidebar />
      </aside>
      <main className='flex flex-1 w-full overflow-hidden py-8 px-4'>
        {children}
      </main>
    </div>
  )
}
